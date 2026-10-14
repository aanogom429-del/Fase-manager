"""Add fixed restart windows from a second Metrica match; no parameter fitting.
Run after analyze_sequences.py. --directory contains the three original Game 2 CSVs.
"""
import argparse
import csv
import json
import math
from pathlib import Path
from import_metrica import read_team, ROOT
from analyze_sequences import normalize_event, support_candidates, summarize

def build(directory):
    directory = Path(directory)
    home, hq = read_team(directory / 'Sample_Game_2_RawTrackingData_Home_Team.csv', 0, max_time=430)
    away, aq = read_team(directory / 'Sample_Game_2_RawTrackingData_Away_Team.csv', 1, max_time=430)
    with (directory / 'Sample_Game_2_RawEventsData.csv').open() as f:
        events = [normalize_event(r, i + 1) for i, r in enumerate(csv.DictReader(f))]
    # Goalkeepers #11 right and #25 left in the original first half: rotate 180 degrees.
    rotate = lambda b: [round(100-b[0], 4), round(64-b[1], 4)] if b is not None else None
    for e in events:
        e['from'], e['to'] = rotate(e['from']), rotate(e['to'])
    definitions = [('game2-throw', 'Partido 2 · Apoyos tras saque de banda', 1, 26.88, 36.88, 'THROW IN'),
                   ('game2-corner', 'Partido 2 · Movimientos tras córner', 0, 418.52, 428.52, 'CORNER KICK')]
    clips = []
    for ident, title, team, start, end, subtype in definitions:
        es = [e for e in events if e['period']==1 and start<=e['start']<=end and e['end']<=end]
        assert any(e['type']=='SET PIECE' and e['subtype']==subtype and e['start']==start for e in es)
        lo, hi = round(start*25), round(end*25)
        indices = sorted(set(range(lo, hi+1, 5)) | {hi} | {v for e in es for v in (e['startFrame'],e['endFrame']) if lo<=v<=hi})
        frames=[]
        for i in indices:
            h,a=home[(1,i)],away[(1,i)]
            assert abs(h['time']-a['time'])<.001
            ball=h['ball'] or a['ball']
            if h['ball'] and a['ball'] and math.dist(h['ball'],a['ball'])>.1: ball=None
            ps=[[p[0],p[1],*rotate(p[2:])] for p in h['players']+a['players']]
            frames.append({'frame':i,'time':h['time'],'players':ps,'ball':rotate(ball)})
        for e in es:
            if e['type']=='PASS':
                frame=next(f for f in frames if f['frame']==e['startFrame'])
                e['candidateSupports']=support_candidates(frame['players'],e['team'],e['sender'])
        clips.append({'id':ident,'title':title,'team':team,'start':start,'end':end,'reserved':False,
                      'match':'Sample Game 2','restartObservation':subtype,'frames':frames,'events':es,
                      'summary':summarize(frames,es,team),'transition':None})
    return clips, {'home':hq,'away':aq}

if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--directory',required=True);p.add_argument('--out',required=True)
    args=p.parse_args();clips,quality=build(args.directory)
    dest=Path(args.out);data=json.loads(dest.read_text())
    data['clips']=[c for c in data['clips'] if not c['id'].startswith('game2-')]+clips
    data['additionalSources']=[{'match':'Sample Game 2','source':ROOT+'/tree/master/data/Sample_Game_2',
        'selection':'Two fixed 10-second windows from annotated THROW IN and CORNER KICK; descriptive, not representative or used to fit the engine.',
        'orientation':'Original first-half Home left/Away right inferred from keepers #11/#25. All coordinates and events rotated 180 degrees for Home right/Away left display.',
        'quality':quality}]
    dest.write_text(json.dumps(data,ensure_ascii=False,separators=(',',':'))+'\n')
    print(json.dumps([{'id':c['id'],'frames':len(c['frames']),'summary':c['summary']} for c in clips],ensure_ascii=False))
