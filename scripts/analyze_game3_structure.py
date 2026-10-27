"""Reproducible first-half structure audit; no training or causal attribution.
Usage: python scripts/analyze_game3_structure.py RAW_DIRECTORY OUTPUT_JSON
"""
import hashlib
import json
import math
import statistics as st
import sys
import xml.etree.ElementTree as ET
from pathlib import Path


def quantiles(values):
    v = sorted(values)
    def q(p):
        i = (len(v)-1)*p
        a = int(i)
        return round(v[a]+(v[min(a+1,len(v)-1)]-v[a])*(i-a), 3)
    return dict(n=len(v), p10=q(.1), median=q(.5), p90=q(.9)) if v else dict(n=0)


def analyze(raw):
    meta = ET.parse(raw/'metadata.xml').getroot()
    assert float(meta.findtext('.//FrameRate')) == 25
    assert meta.findtext('.//FieldSize/Width') == '105'
    assert meta.findtext('.//FieldSize/Height') == '68'
    channels = {p.attrib['id']:p.attrib['playerId'] for p in meta.findall('.//PlayerChannel')}
    spec = meta.find('.//DataFormatSpecification')
    ids = [channels[p.attrib['playerChannelId']] for p in spec.findall('.//PlayerChannelRef')][::2]
    players = {p.attrib['id']:dict(team=p.attrib['teamId'], keeper=any(x.findtext('Name')=='position_type' and x.findtext('Value')=='Goalkeeper' for x in p.findall('.//ProviderParameter'))) for p in meta.findall('.//Players/Player')}
    end = int(spec.attrib['endFrame'])
    frames = {}
    for line in (raw/'tracking.txt').open():
        f, coords, ball = line.strip().split(':')
        f = int(f)
        if f>end: break
        pairs = [[float(v) for v in c.split(',')] for c in coords.split(';')]
        assert len(pairs)==len(ids)
        frames[f] = ({pid:(v[0]*105,v[1]*68) for pid,v in zip(ids,pairs)}, tuple(float(v)*scale for v,scale in zip(ball.split(','),(105,68))))
    assert len(frames)==end
    events = [e for e in json.loads((raw/'events.json').read_text())['data'] if e['period']==1]
    # Consecutive same-team PASS/CARRY events, no gap > 1 s. No nearest-player possession inference.
    chains=[]; chain=[]
    for e in events:
        valid=e['type']['name'] in ('PASS','CARRY') and e['end']['frame']>=e['start']['frame']
        if chain and (not valid or e['team']['id']!=chain[-1]['team']['id'] or e['start']['frame']-chain[-1]['end']['frame']>25):
            chains.append(chain);chain=[]
        if valid: chain.append(e)
    if chain:chains.append(chain)
    rows=[];rejected=0;alignment=[]
    for chain in chains:
        team=chain[0]['team']['id']; roster=[p for p in ids if players[p]['team']==team and not players[p]['keeper']]
        keeper=next(p for p in ids if players[p]['team']==team and players[p]['keeper'])
        for start in range(chain[0]['start']['frame'],chain[-1]['end']['frame']-124,125):
            finish=start+125
            samples=[frames.get(f) for f in range(start,finish+1,25)]
            if len(roster)!=10 or any(s is None or not all(math.isfinite(v) for p in roster+[keeper] for v in s[0][p]) or not all(math.isfinite(v) for v in s[1]) for s in samples):
                rejected+=1;continue
            a,b=samples[0],samples[-1]
            cx=lambda s:st.mean(s[0][p][0] for p in roster)
            cy=lambda s:st.mean(s[0][p][1] for p in roster)
            dx,dy=cx(b)-cx(a),cy(b)-cy(a)
            direction=1 if a[0][keeper][0]<52.5 else -1
            width=st.mean(max(s[0][p][1] for p in roster)-min(s[0][p][1] for p in roster) for s in samples)
            depth=st.mean(max(s[0][p][0] for p in roster)-min(s[0][p][0] for p in roster) for s in samples)
            residual=st.mean(math.hypot(b[0][p][0]-a[0][p][0]-dx,b[0][p][1]-a[0][p][1]-dy) for p in roster)
            nearest=st.mean(min(math.dist(s[0][p],s[0][q]) for q in roster if q!=p) for s in samples for p in roster)
            rear=st.mean(sum((s[1][0]-s[0][p][0])*direction>2 and 3<=math.dist(s[0][p],s[1])<=25 for p in roster) for s in samples)
            # Lateral ordering only when separated by >2 m at both ends; not a role/formation detector.
            swaps=sum((a[0][p][1]-a[0][q][1])*(b[0][p][1]-b[0][q][1])<0 and abs(a[0][p][1]-a[0][q][1])>2 and abs(b[0][p][1]-b[0][q][1])>2 for i,p in enumerate(roster) for q in roster[i+1:])
            rows.append(dict(team=team,start=round(start/25,2),end=round(finish/25,2),widthM=width,depthM=depth,nearestMateM=nearest,rearCandidates=rear,residualDisplacementM=residual,lateralOrderSwaps=swaps,blockDxM=dx,blockDyM=dy,ballDxM=b[1][0]-a[1][0],ballDyM=b[1][1]-a[1][1],split='holdout' if start/25>=1800 else 'development'))
    for e in events:
        if e['type']['name']!='PASS' or e['start']['x'] is None:continue
        f=frames.get(e['start']['frame']);pid=(e.get('from') or {}).get('id')
        if f and pid in f[0] and all(math.isfinite(v) for v in f[0][pid]):
            alignment.append(math.dist(f[0][pid],(e['start']['x']*105,e['start']['y']*68)))
    keys=['widthM','depthM','nearestMateM','rearCandidates','residualDisplacementM','lateralOrderSwaps']
    summaries={}
    for split in ['development','holdout']:
        subset=[r for r in rows if r['split']==split]
        summaries[split]={k:quantiles([r[k] for r in subset]) for k in keys}
        summaries[split]['ballBlockGain']={axis:round(sum(r['ballD'+axis+'M']*r['blockD'+axis+'M'] for r in subset)/max(1e-9,sum(r['ballD'+axis+'M']**2 for r in subset)),3) for axis in ['x','y']}
    return dict(source='https://github.com/metrica-sports/sample-data/tree/master/data/Sample_Game_3',sha256={p.name:hashlib.sha256(p.read_bytes()).hexdigest() for p in [raw/'metadata.xml',raw/'events.json',raw/'tracking.txt']},firstHalfFrames=len(frames),sampleHz=1,windowSeconds=5,selection='All non-overlapping 5 s windows of consecutive same-team PASS/CARRY chains; gaps <=1 s; complete tracked outfield roster and ball. Development <1800 s; holdout >=1800 s. No result-based selection.',rejectedWindows=rejected,eventTrackingErrorM=quantiles(alignment),summaries=summaries,windows=[{k:round(v,4) if isinstance(v,float) else v for k,v in r.items()} for r in rows])


if __name__=='__main__':
    result=analyze(Path(sys.argv[1]))
    Path(sys.argv[2]).write_text(json.dumps(result,indent=2)+'\n')
    print(json.dumps({k:v for k,v in result.items() if k not in ['windows','sha256']},indent=2))
