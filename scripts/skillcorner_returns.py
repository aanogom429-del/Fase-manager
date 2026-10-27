"""Local geometric departures/returns, not inferred tactical intentions.
Only the two development games; fixed detected cohort, no interpolated positions.
"""
import csv,json,math,statistics,sys
from pathlib import Path

def episodes(series,exit_radius=8,return_radius=4):
    ref=tuple(statistics.median(p[k] for p in series[:5]) for k in (0,1))
    distances=[math.dist(p,ref) for p in series]
    result=[];i=5
    while i<len(series)-1:
        if distances[i]>exit_radius and distances[i+1]>exit_radius:
            end=next((j for j in range(i+2,len(series)-1) if distances[j]<=return_radius and distances[j+1]<=return_radius),None)
            result.append(dict(exit=i,returned=end,reference=ref))
            if end is None:break
            i=end+2
        else:i+=1
    return result

def analyze(raw,mid):
    meta=json.loads((raw/f'{mid}_match.json').read_text())
    players={p['id']:p for p in meta['players']}
    frames={}
    for line in (raw/f'{mid}_tracking_extrapolated.jsonl').open():
        f=json.loads(line)
        if f['frame']%10==0:frames[f['frame']]=f
    counts=dict(candidateWindows=0,acceptedWindows=0,missingFrames=0,unstablePossession=0,insufficientDetectedCohort=0)
    observations=[]
    for phase in csv.DictReader((raw/f'{mid}_phases_of_play.csv').open()):
        if phase['team_in_possession_phase_type'] not in ['build_up','create']:continue
        team=int(phase['team_in_possession_id']);group='home team' if team==meta['home_team']['id'] else 'away team'
        for start in range(((int(phase['frame_start'])+9)//10)*10,int(phase['frame_end'])-199,210):
            counts['candidateWindows']+=1
            samples=[frames.get(f) for f in range(start,start+201,10)]
            if any(s is None for s in samples):counts['missingFrames']+=1;continue
            if len({s['period'] for s in samples})!=1 or any(s['possession']['group']!=group for s in samples):counts['unstablePossession']+=1;continue
            positions=[{p['player_id']:(p['x'],p['y']) for p in s['player_data'] if p['is_detected'] and p['player_id'] in players and players[p['player_id']]['team_id']==team and players[p['player_id']]['player_role']['acronym']!='GK' and all(isinstance(p[k],(int,float)) and math.isfinite(p[k]) for k in ['x','y'])} for s in samples]
            cohort=set.intersection(*(set(p) for p in positions))
            if len(cohort)<4:counts['insufficientDetectedCohort']+=1;continue
            counts['acceptedWindows']+=1
            centres=[tuple(statistics.mean(p[i][k] for i in cohort) for k in (0,1)) for p in positions]
            local={i:[(p[i][0]-c[0],p[i][1]-c[1]) for p,c in zip(positions,centres)] for i in cohort}
            for pid in sorted(cohort):
                for event in episodes(local[pid]):
                    end=event['returned'] if event['returned'] is not None else 20
                    cover=next((q for q in sorted(cohort-{pid}) if any(math.dist(local[q][j],event['reference'])<=4 and math.dist(local[q][j+1],event['reference'])<=4 for j in range(event['exit'],end))),None)
                    observations.append(dict(match=mid,frame=start,period=samples[0]['period'],phase=phase['team_in_possession_phase_type'],team=team,player=pid,cohortSize=len(cohort),exitSecond=event['exit'],returnSeconds=None if event['returned'] is None else event['returned']-event['exit'],possibleCover=cover,censored=event['returned'] is None))
    return dict(match=mid,quality=counts,events=observations)

if __name__=='__main__':
    result=dict(method='20 s windows; 1 Hz; build_up/create; fixed >=4 outfield teammates detected at every sample; local centroid-relative 5 s median reference; exit >8 m for 2 samples, return <=4 m for 2 samples. Censored means no observed return within window, NOT no return. Coverage geometric, not tactical.',matches=[analyze(Path(sys.argv[1]),i) for i in [1874553,1886347]],holdoutUntouched=1899585)
    Path(sys.argv[2]).write_text(json.dumps(result,indent=2)+'\n')
    for m in result['matches']:print(m['match'],m['quality'],'departures',len(m['events']),'returns',sum(not e['censored'] for e in m['events']),'possible covers',sum(e['possibleCover'] is not None for e in m['events']))
