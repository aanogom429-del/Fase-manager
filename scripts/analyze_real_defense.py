"""Descriptive real tracking audit. Never imports or changes the game engine.

Existing four Game 1 transition clips plus FIRST FOUR chronological Game 2
first-half shots, [-6,+2] seconds. No replacements after quality inspection.
Coordinates in the report are METRES, canonical own goal at x=0.
"""
import argparse
import csv
import gzip
import hashlib
import json
import math
from pathlib import Path
from import_metrica import read_team
from analyze_sequences import normalize_event

ROOT = Path(__file__).resolve().parents[1]
SELECTION = {'transitionIds': ['transition-blue', 'transition-red',
                             'transition-check', 'transition-roles-check'],
             'shotCount': 4, 'beforeSeconds': 6, 'afterSeconds': 2,
             'period': 1, 'replaceExcluded': False}


def sha(path):
    return hashlib.sha256(Path(path).read_bytes()).hexdigest()


def canonical(p, defending):
    x, y = p[0] * 1.05, p[1] * 68 / 64
    return [x, y] if defending == 0 else [105-x, 68-y]


def gap(p, a, b):
    dx, dy = b[0]-a[0], b[1]-a[1]
    ll = dx*dx+dy*dy
    if not ll:
        return None
    u = ((p[0]-a[0])*dx+(p[1]-a[1])*dy)/ll
    return math.hypot(p[0]-a[0]-u*dx, p[1]-a[1]-u*dy) if .08 < u < .95 else None


def measure(frame, defending):
    ps = frame['players']
    if (not frame.get('ball') or len(ps) != 22 or
            len({(p[0], p[1]) for p in ps}) != 22 or
            any(sum(p[0] == t for p in ps) != 11 for t in [0, 1])):
        return None
    ball = canonical(frame['ball'], defending)
    keepers = {0: 11, 1: 25}
    ds = [(p[1], canonical(p[2:], defending)) for p in ps
          if p[0] == defending and p[1] != keepers[defending]]
    distances = sorted((math.dist(p, ball), n) for n, p in ds)
    xs, ys = [p[0] for _, p in ds], [p[1] for _, p in ds]
    ray_gaps = [min((g for _, p in ds if (g := gap(p, ball, [0, y])) is not None),
                    default=None) for y in [30.34, 34, 37.66]]
    return {'time': frame['time'], 'ball': ball,
            'nearest': distances[0][1], 'nearestDistanceM': distances[0][0],
            'secondDistanceM': distances[1][0],
            'centroid': [sum(xs)/10, sum(ys)/10],
            'lengthM': max(xs)-min(xs), 'widthM': max(ys)-min(ys),
            'goalSideCount': sum(x < ball[0] for x in xs),
            'centralZoneCount': sum(x <= 25 and abs(y-34) <= 17 for x, y in zip(xs, ys)),
            'rayGapsM': ray_gaps,
            'geometricRaysAtRadius': {str(r): sum(g is not None and g < r for g in ray_gaps)
                                     for r in [1, 1.65, 2]},
            'defenders': [[n, *p] for n, p in ds]}


def summarize(samples, start, end, shot_time=None):
    valid = [s for s in samples if s is not None]
    if len(valid) < 2:
        return {'excluded': True, 'reason': 'Fewer than two complete frames'}
    first, last = valid[0], valid[-1]
    initial_id = first['nearest']
    a = next(p[1:] for p in first['defenders'] if p[0] == initial_id)
    b = next(p[1:] for p in last['defenders'] if p[0] == initial_id)
    dt = last['time']-first['time']
    # Integrate only adjacent valid observations. No bridging missing frames.
    paired = [(a, b) for a, b in zip(samples, samples[1:])
              if a is not None and b is not None and 0 < b['time']-a['time'] <= .25]
    observed_seconds = sum(b['time']-a['time'] for a, b in paired)
    closing = []
    for aa, bb in paired:
        pa = next(p[1:] for p in aa['defenders'] if p[0] == aa['nearest'])
        pb = next(p[1:] for p in bb['defenders'] if p[0] == aa['nearest'])
        dx, dy = aa['ball'][0]-pa[0], aa['ball'][1]-pa[1]
        length = math.hypot(dx, dy)
        closing.append(((pb[0]-pa[0])*dx+(pb[1]-pa[1])*dy)/length if length else 0)
    retreat = last['centroid'][0]-first['centroid'][0]
    result = {'excluded': False, 'requestedStart': start, 'requestedEnd': end,
              'firstMeasured': first['time'], 'lastMeasured': last['time'],
              'completeFrames': len(valid), 'totalFrames': len(samples),
              'pairedObservedSeconds': observed_seconds,
              'ballAdvanceTowardGoalM': first['ball'][0]-last['ball'][0],
              'centroidRetreatM': -retreat,
              'centroidLateralShiftM': last['centroid'][1]-first['centroid'][1],
              'nearestDistanceM': [first['nearestDistanceM'], last['nearestDistanceM']],
              'initialNearest': initial_id,
              'initialNearestDistanceM': [math.dist(a, first['ball']), math.dist(b, last['ball'])],
              'initialNearestDisplacementM': math.dist(a, b),
              'meanObservedNearestApproachMps': sum(closing)/observed_seconds if observed_seconds else None,
              'goalSideCount': [first['goalSideCount'], last['goalSideCount']],
              'centralZoneCount': [first['centralZoneCount'], last['centralZoneCount']],
              'blockLengthM': [first['lengthM'], last['lengthM']],
              'blockWidthM': [first['widthM'], last['widthM']],
              'measuredSpanSeconds': dt}
    if shot_time is not None:
        pre = [s for s in valid if s['time'] <= shot_time]
        result['lastBeforeShot'] = pre[-1] if pre else None
        pre_end = max((i for i, s in enumerate(samples)
                       if s is not None and s['time'] <= shot_time), default=-1)
        result['preShotSummary'] = summarize(
            samples[:pre_end+1], start, shot_time)
    return result


def build(raw_dir):
    directory = Path(raw_dir)
    data_path = ROOT/'data/metrica-analysis.json'
    data = json.loads(data_path.read_text())
    clips = []
    for ident in SELECTION['transitionIds']:
        c = next(c for c in data['clips'] if c['id'] == ident)
        t = c['transition']['defendingTeam']
        assert not c['reserved']
        samples = [measure(f, t) for f in c['frames']]
        clips.append({'id': ident, 'match': 'Sample Game 1', 'defendingTeam': t,
                      'start': c['start'], 'end': c['end'], 'kind': 'transition',
                      'events': c['events'], 'frames': c['frames'], 'samples': samples,
                      'summary': summarize(samples, c['start'], c['end'])})
    with (directory/'events.csv').open() as stream:
        events = [normalize_event(r, i+1) for i, r in enumerate(csv.DictReader(stream))]
    shots = [e for e in events if e['period'] == 1 and e['type'] == 'SHOT'][:SELECTION['shotCount']]
    assert len(shots) == SELECTION['shotCount']
    max_time = max(e['start']+SELECTION['afterSeconds'] for e in shots)
    home, hq = read_team(directory/'Home.csv', 0, max_time)
    away, aq = read_team(directory/'Away.csv', 1, max_time)
    # Raw Game 2 first-half Home attacks LEFT; verify keeper ordering before rotation.
    h0, a0 = home[min(home)], away[min(away)]
    hk = next(p[2] for p in h0['players'] if p[1] == 11)
    ak = next(p[2] for p in a0['players'] if p[1] == 25)
    assert hk > ak, 'Unexpected raw Game 2 orientation'
    rotate = lambda point: [100-point[0], 64-point[1]] if point else None
    for event in shots:
        start, end = event['start']-SELECTION['beforeSeconds'], event['start']+SELECTION['afterSeconds']
        frames = []
        for i in range(round(start*25), round(end*25)+1):
            h, a = home.get((1, i)), away.get((1, i))
            sync = h and a and abs(h['time']-a['time']) < .001
            ball = h['ball'] if sync and h['ball'] and a['ball'] and math.dist(h['ball'], a['ball']) <= .1 else None
            players = (h['players'] if h else [])+(a['players'] if a else [])
            frames.append({'frame': i, 'time': i/25, 'ball': rotate(ball),
                           'players': [[p[0], p[1], *rotate(p[2:])] for p in players]})
        t = 1-event['team']
        samples = [measure(f, t) for f in frames]
        # Event coordinates are normalized with the SAME rotation as tracking.
        clip_events = [{**e, 'from': rotate(e['from']), 'to': rotate(e['to'])}
                       for e in events if e['period'] == 1 and start <= e['start'] <= end]
        clips.append({'id': 'game2-shot-'+str(event['id']), 'match': 'Sample Game 2',
                      'kind': 'pre-shot', 'defendingTeam': t, 'start': start, 'end': end,
                      'shot': {**event, 'from': rotate(event['from']), 'to': rotate(event['to'])},
                      'events': clip_events, 'frames': frames, 'samples': samples,
                      'summary': summarize(samples, start, end, event['start'])})
    return {'schemaVersion': 1, 'selection': SELECTION,
            'source': 'https://github.com/metrica-sports/sample-data',
            'pitchMeters': [105, 68], 'canonical': 'Own goal x=0, y=34 for BOTH defenders; no body-angle inference',
            'sourcesSha256': {'data/metrica-analysis.json': sha(data_path),
                             **{'Game2/'+n: sha(directory/n) for n in ['Home.csv', 'Away.csv', 'events.csv']}},
            'recipeSha256': sha(__file__), 'quality': {'home': hq, 'away': aq},
            'limitations': ['Selected observational clips, not a representative sample or new held-out test',
                            'No body orientation, attention, intention, reaction or communication inferred',
                            'Nearest defender is geometry, not an assigned pressing role',
                            'Ray overlap is planar geometry, not proven shot blocking; no ball height',
                            'Central zone 25x34 m and ray radii are descriptive operational choices, not universal principles',
                            'All four shots retained including missing frames; no interpolation or replacement'],
            'clips': clips}


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--raw-directory', required=True)
    parser.add_argument('--out', required=True)
    args = parser.parse_args()
    result = build(args.raw_directory)
    content = (json.dumps(result, ensure_ascii=False, separators=(',', ':'))+'\n').encode()
    Path(args.out).write_bytes(gzip.compress(content, mtime=0) if args.out.endswith('.gz') else content)
    print(json.dumps([{'id': c['id'], **c['summary']} for c in result['clips']], ensure_ascii=False, indent=2))


if __name__ == '__main__':
    main()
