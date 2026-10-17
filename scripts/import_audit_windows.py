"""Two fixed, previously unused Game 2 windows; never fill missing tracking.
Input files Home.csv, Away.csv, events.csv are original Metrica Game 2 CSVs.
Selection fixed from event timestamps before reading tracking or model errors.
"""
import csv, json, argparse
from pathlib import Path
from import_metrica import read_team, ROOT
from analyze_sequences import normalize_event, summarize

def build(directory):
    directory=Path(directory)
    home,hq=read_team(directory/'Home.csv',0,94)
    away,aq=read_team(directory/'Away.csv',1,94)
    with (directory/'events.csv').open() as f:
        events=[normalize_event(r,i+1) for i,r in enumerate(csv.DictReader(f))]
    rotate=lambda p:[round(100-p[0],4),round(64-p[1],4)] if p else None
    for e in events:
        e['from'],e['to']=rotate(e['from']),rotate(e['to'])
        e['candidateSupports']=None  # This importer does not infer passing options.
    clips=[]
    for ident,start,end in [('audit-game2-a',77.44,83.16),('audit-game2-b',87.96,92.8)]:
        es=[e for e in events if e['period']==1 and start<=e['start'] and e['end']<=end]
        lo,hi=round(start*25),round(end*25)
        frames=[]
        for i in sorted(set(range(lo,hi+1,5))|{hi}|{v for e in es for v in [e['startFrame'],e['endFrame']]}):
            h,a=home[(1,i)],away[(1,i)]
            assert abs(h['time']-a['time'])<.001
            ball=h['ball'] or a['ball']
            if h['ball'] and a['ball'] and sum((x-y)**2 for x,y in zip(h['ball'],a['ball']))>.01: ball=None
            frames.append({'frame':i,'time':h['time'],'ball':rotate(ball),'players':[[p[0],p[1],*rotate(p[2:])] for p in h['players']+a['players']]})
        clips.append({'id':ident,'title':'Contraste reservado · '+str(start)+'–'+str(end)+' s','match':'Sample Game 2','team':1,'start':start,'end':end,'reserved':True,'frames':frames,'events':es,'summary':summarize(frames,es,1)})
    return {'schemaVersion':1,'source':ROOT+'/tree/master/data/Sample_Game_2','selection':'Two Away pass chains selected before tracking inspection; same possession and match, not independent matches. No tuning or replacement based on results.','orientation':'Rotate original Game 2 first half 180 degrees: Home right/Away left.','quality':{'home':hq,'away':aq},'clips':clips}

if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--directory',required=True);p.add_argument('--out',required=True);a=p.parse_args()
    report=build(a.directory);Path(a.out).write_text(json.dumps(report,ensure_ascii=False,separators=(',',':'))+'\n')
    print([(c['id'],len(c['frames']),c['summary']['completeFrames']) for c in report['clips']])
