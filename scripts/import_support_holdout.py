"""Import frozen windows without repairing missing points or replacing exclusions."""
import csv, json, argparse
from pathlib import Path
from import_metrica import read_team, ROOT
from analyze_sequences import normalize_event, summarize

def build(directory):
    root=Path(__file__).resolve().parents[1]
    plan=json.loads((root/'data/support-holdout-plan.json').read_text())
    directory=Path(directory)
    home,hq=read_team(directory/'Home.csv',0,205)
    away,aq=read_team(directory/'Away.csv',1,205)
    with (directory/'events.csv').open() as f:
        events=[normalize_event(r,i+1) for i,r in enumerate(csv.DictReader(f))]
    rotate=lambda p:[round(100-p[0],4),round(64-p[1],4)] if p else None
    for e in events:
        e['from'],e['to']=rotate(e['from']),rotate(e['to'])
        e['candidateSupports']=None
    clips=[]
    for w in plan['windows']:
        es=[e for e in events if e['period']==1 and w['start']<=e['start'] and e['end']<=w['end']]
        lo,hi=round(w['start']*25),round(w['end']*25)
        frames=[]
        for i in sorted(set(range(lo,hi+1,5))|{hi}|{v for e in es for v in [e['startFrame'],e['endFrame']]}):
            h,a=home[(1,i)],away[(1,i)]
            assert abs(h['time']-a['time'])<.001
            ball=h['ball'] or a['ball']
            if h['ball'] and a['ball'] and sum((x-y)**2 for x,y in zip(h['ball'],a['ball']))>.01: ball=None
            frames.append({'frame':i,'time':h['time'],'ball':rotate(ball),'players':[[p[0],p[1],*rotate(p[2:])] for p in h['players']+a['players']]})
        clips.append({**w,'title':'Contraste nuevo · '+str(w['start'])+'–'+str(w['end'])+' s','match':'Sample Game 2','frames':frames,'events':es,'summary':summarize(frames,es,w['team'])})
    return {'schemaVersion':1,'selection':plan['selection'],'source':ROOT+'/tree/master/data/Sample_Game_2','quality':{'home':hq,'away':aq},'clips':clips}

if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--directory',required=True);p.add_argument('--out',required=True);a=p.parse_args()
    Path(a.out).write_text(json.dumps(build(a.directory),ensure_ascii=False,separators=(',',':'))+'\n')
