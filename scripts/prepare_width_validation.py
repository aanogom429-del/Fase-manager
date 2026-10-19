"""Freeze event-only selection separately before importing trajectories/evaluating."""
import argparse,csv,json
from pathlib import Path
from analyze_sequences import normalize_event
from import_owner_holdout import build
root=Path(__file__).resolve().parents[1]
p=argparse.ArgumentParser();p.add_argument('mode',choices=['select','import']);p.add_argument('directory');args=p.parse_args()
target=root/'data/width-validation-plan.json'
if args.mode=='select':
    if target.exists(): raise SystemExit('Selection already frozen; refusing overwrite')
    with (Path(args.directory)/'events.csv').open() as f: events=[normalize_event(r,i+1) for i,r in enumerate(csv.DictReader(f))]
    eligible=[(a,b) for a,b in zip(events,events[1:]) if a['type']==b['type']=='PASS' and a['period']==b['period']==1 and a['team']==b['team'] and a['receiver'] is not None and a['receiver']==b['sender'] and 400<=a['end']<b['start']<=600 and 1<=b['start']-a['end']<=6]
    windows=[dict(id='width-new-'+str(i+1),team=a['team'],holder=a['receiver'],start=a['end'],end=b['start']) for i,(a,b) in enumerate(eligible[:3])]
    assert len(windows)==3
    plan=dict(match='Sample_Game_2',rangeStart=400,rangeEnd=600,selection='First three chronological adjacent-pass ownership intervals in 400–600 s, duration 1–6 s. No replacement after exclusion. Same match, new windows; not independent match validation.',windows=windows)
    target.write_text(json.dumps(plan,indent=2)+'\n');print(json.dumps(windows))
else:
    plan=json.loads(target.read_text());data=build(args.directory,plan)
    (root/'data/width-validation-windows.json').write_text(json.dumps(data,separators=(',',':'))+'\n')
    print('Imported frozen selection')
