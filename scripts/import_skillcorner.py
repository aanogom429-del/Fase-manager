"""Download a predeclared sample; audit coverage, never infer hidden trajectories.
Usage: python scripts/import_skillcorner.py RAW_DIR OUTPUT_JSON
Credit: SkillCorner Open Data, https://github.com/SkillCorner/opendata (MIT).
"""
import concurrent.futures as cf
import csv
import statistics
import hashlib
import json
import sys
import urllib.request
from pathlib import Path

IDS=[1874553,1886347,1899585]  # First three chronological matches; third held out.
BASE='https://raw.githubusercontent.com/SkillCorner/opendata/master/'

def fetch(raw,mid,kind):
    name=f'{mid}_{kind}'
    target=raw/name
    url=BASE+f'data/matches/{mid}/{name}'
    if not target.exists():
        with urllib.request.urlopen(url,timeout=90) as response:
            content=response.read()
        if content.startswith(b'version https://git-lfs'):
            pointer=content.decode().splitlines()
            expected=next(v.split('sha256:')[1] for v in pointer if v.startswith('oid '))
            size=int(next(v.split()[1] for v in pointer if v.startswith('size ')))
            url=url.replace('raw.githubusercontent.com','media.githubusercontent.com/media')
            with urllib.request.urlopen(url,timeout=90) as response:content=response.read()
            if len(content)!=size or hashlib.sha256(content).hexdigest()!=expected:
                raise ValueError('LFS integrity mismatch: '+name)
        target.write_bytes(content)
    return dict(match=mid,file=name,bytes=target.stat().st_size,sha256=hashlib.sha256(target.read_bytes()).hexdigest(),source=url)

def audit(path):
    frames=detected=positions=0;periods=set();possessions={}
    for line in path.open():
        f=json.loads(line);frames+=1;periods.add(f['period'])
        for p in f['player_data']:
            positions+=1;detected+=bool(p.get('is_detected'))
        group=str((f.get('possession') or {}).get('group'))
        possessions[group]=possessions.get(group,0)+1
    return dict(frames=frames,periods=sorted(p for p in periods if p is not None),playerObservations=positions,detectedObservations=detected,detectedFraction=round(detected/max(positions,1),4),possessionFrameCounts=possessions)

def phases(path):
    groups={}
    for row in csv.DictReader(path.open()):
        key=row['team_in_possession_phase_type']
        group=groups.setdefault(key,dict(count=0,width=[],length=[]))
        group['count']+=1
        for metric in ['width','length']:
            value=row['team_in_possession_'+metric+'_start']
            if value and value.lower()!='nan':group[metric].append(float(value))
    return {k:dict(count=g['count'],**{m:dict(n=len(g[m]),median=round(statistics.median(g[m]),3) if g[m] else None) for m in ['width','length']}) for k,g in groups.items()}

if __name__=='__main__':
    raw=Path(sys.argv[1]);raw.mkdir(parents=True,exist_ok=True)
    tasks=[(mid,k) for mid in IDS for k in ['match.json','tracking_extrapolated.jsonl','dynamic_events.csv','phases_of_play.csv']]
    files=[]
    with cf.ThreadPoolExecutor(max_workers=4) as pool:
        for result in pool.map(lambda t:fetch(raw,*t),tasks):
            files.append(result);print(result['file'],result['bytes'],flush=True)
    result=dict(source='SkillCorner Open Data',selection='First three chronological matches in catalogue; two development, third uninspected holdout',development=IDS[:2],holdout=IDS[2],files=files,audits={str(i):audit(raw/f'{i}_tracking_extrapolated.jsonl') for i in IDS[:2]})
    result['providerPhaseMetrics']={str(i):phases(raw/f'{i}_phases_of_play.csv') for i in IDS[:2]}
    Path(sys.argv[2]).write_text(json.dumps(result,indent=2)+'\n')
    print(json.dumps(result['audits'],indent=2),flush=True)
