"""Import all 25 Hz samples of the preselected owner-aware intervals; no replacement."""
import argparse, csv, hashlib, json
from pathlib import Path
from import_metrica import read_team, ROOT
from analyze_sequences import normalize_event

def build(directory):
    root=Path(__file__).resolve().parents[1]
    plan=json.loads((root/'data/owner-holdout-plan.json').read_text())
    directory=Path(directory)
    with (directory/'events.csv').open() as f:
        events=[normalize_event(r,i+1) for i,r in enumerate(csv.DictReader(f))]
    eligible=[]
    for a,b in zip(events,events[1:]):
        if (a['type']==b['type']=='PASS' and a['period']==b['period']==1
            and a['team']==b['team'] and a['receiver'] is not None and a['receiver']==b['sender']
            and 220<=a['end']<b['start']<=400 and 1<=b['start']-a['end']<=6):
            eligible.append((a,b))
    chosen=eligible[:3]
    assert len(chosen)==len(plan['windows'])
    for w,(a,b) in zip(plan['windows'],chosen):
        assert (w['team'],w['holder'],w['start'],w['end'])==(a['team'],a['receiver'],a['end'],b['start'])
    home,hq=read_team(directory/'Home.csv',0,max(w['end'] for w in plan['windows']))
    away,aq=read_team(directory/'Away.csv',1,max(w['end'] for w in plan['windows']))
    def rotate(p): return [round(100-p[0],4),round(64-p[1],4)] if p else None
    clips=[]
    for w,(a,b) in zip(plan['windows'],chosen):
        frames=[]
        for frame in range(round(w['start']*25),round(w['end']*25)+1):
            h,aw=home.get((1,frame)),away.get((1,frame))
            synchronized=bool(h and aw and abs(h['time']-aw['time'])<.001 and abs(h['time']-frame/25)<.001)
            ball=h['ball'] if h else None
            # Require agreement of both sources, without replacing a missing ball.
            if not synchronized or not ball or not aw['ball'] or sum((x-y)**2 for x,y in zip(ball,aw['ball']))>.01: ball=None
            ps=(h['players'] if h else [])+(aw['players'] if aw else [])
            frames.append({'frame':frame,'time':frame/25,'synchronized':synchronized,'ball':rotate(ball),
                           'players':[[p[0],p[1],*rotate(p[2:])] for p in ps]})
        clips.append({**w,'match':plan['match'],'events':[a,b],'frames':frames})
    return {'schemaVersion':1,'selection':plan['selection'],'source':ROOT+'/tree/master/data/Sample_Game_2',
            'rawSha256':{name:hashlib.sha256((directory/name).read_bytes()).hexdigest() for name in ['Home.csv','Away.csv','events.csv']},
            'quality':{'home':hq,'away':aq},'clips':clips}

if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--directory',required=True);p.add_argument('--out',required=True);a=p.parse_args()
    Path(a.out).write_text(json.dumps(build(a.directory),ensure_ascii=False,separators=(',',':'))+'\n')
