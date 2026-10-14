"""Extract event-aligned examples and transparent descriptive measures (not training).
python scripts/analyze_sequences.py --home home.csv --away away.csv --events events.csv --out data/metrica-analysis.json
"""
import argparse
import csv
import json
import math
from pathlib import Path
from import_metrica import read_team, ROOT

def meters(p):
    return p[2] * 1.05, p[3] * 68 / 64

def distance(a, b):
    return math.dist(meters(a), meters(b))

def clearance(a, b, rivals):
    ax, ay = meters(a)
    bx, by = meters(b)
    vx, vy = bx - ax, by - ay
    length2 = vx * vx + vy * vy
    if length2 == 0:
        return 0
    gaps = []
    for r in rivals:
        rx, ry = meters(r)
        u = ((rx - ax) * vx + (ry - ay) * vy) / length2
        if .08 <= u <= .95:
            gaps.append(math.hypot(rx - ax - u * vx, ry - ay - u * vy))
    return min(gaps, default=100)

def support_candidates(players, team, sender):
    passer = next((p for p in players if p[:2] == [team, sender]), None)
    if passer is None or sum(p[0] != team for p in players) != 11:
        return None
    rivals = [p for p in players if p[0] != team]
    keeper = 11 if team == 0 else 25
    return [p[1] for p in players if p[0] == team and p[1] not in (sender, keeper)
            and 3 <= distance(passer, p) <= 30 and clearance(passer, p, rivals) >= 2]

def normalize_event(r, index):
    def number(key):
        value = r[key].replace("Player", "")
        return int(value) if value else None
    def point(x, y):
        xy = [float(r[x]), float(r[y])]
        return [round(xy[0] * 100, 4), round(xy[1] * 64, 4)] if all(math.isfinite(v) for v in xy) else None
    return {"id": index, "team": 0 if r["Team"] == "Home" else 1,
            "type": r["Type"], "subtype": r["Subtype"], "period": int(r["Period"]),
            "startFrame": int(r["Start Frame"]), "endFrame": int(r["End Frame"]),
            "start": float(r["Start Time [s]"]), "end": float(r["End Time [s]"]),
            "sender": number("From"), "receiver": number("To"),
            "from": point("Start X", "Start Y"), "to": point("End X", "End Y")}

def summarize(frames, events, team):
    first, last = frames[0], frames[-1]
    keeper = 11 if team == 0 else 25
    sign = 1 if team == 0 else -1
    end_by_id = {(p[0], p[1]): p for p in last["players"]}
    touched = {e[k] for e in events if e["team"] == team for k in ("sender", "receiver") if e[k] is not None}
    movements = []
    for p in first["players"]:
        q = end_by_id.get((p[0], p[1]))
        if p[0] != team or p[1] == keeper or q is None:
            continue
        movements.append({"player": p[1], "forwardM": round((q[2] - p[2]) * 1.05 * sign, 2),
                          "displacementM": round(distance(p, q), 2), "noRecordedTouch": p[1] not in touched})
    offball = [m for m in movements if m["noRecordedTouch"]]
    passes = [e for e in events if e["team"] == team and e["type"] == "PASS"]
    advance = None
    if passes and passes[0]["from"] and passes[-1]["to"]:
        advance = round((passes[-1]["to"][0] - passes[0]["from"][0]) * 1.05 * sign, 2)
    return {"team": team, "passCount": len(passes), "annotatedAdvanceM": advance,
            "blockAdvanceM": round(sum(m["forwardM"] for m in movements) / len(movements), 2) if movements else None,
            "outfieldMeasured": len(movements), "offBallMeasured": len(offball),
            "accompanying": sum(m["forwardM"] >= 2 for m in offball), "movements": movements,
            "completeFrames": sum(len(f["players"]) == 22 and f["ball"] is not None for f in frames)}

def build(home_path, away_path, events_path):
    home, hq = read_team(home_path, 0, max_time=600.04)
    away, aq = read_team(away_path, 1, max_time=600.04)
    with open(events_path, newline="") as stream:
        events = [normalize_event(r, i + 1) for i, r in enumerate(csv.DictReader(stream))]
    # Fixed, auditable selections from consecutive same-team PASS chains in the first ten minutes.
    definitions = [
        ("away-progress", "Progresión roja", 1, 30.52, 40.40, False),
        ("home-progress", "Progresión azul", 0, 45.36, 50.64, False),
        ("circulation-loss", "Circulación y pérdida roja", 1, .04, 15.20, False),
        ("contrast-progress", "Progresión roja · reserva de contraste", 1, 463.44, 476.72, True),
        ("transition-blue", "Azul tras pérdida · 5 segundos", 0, 288.12, 293.12, False),
        ("transition-red", "Rojo tras pérdida · 5 segundos", 1, 374.16, 379.16, False),
    ]
    clips = []
    for ident, title, team, start, end, reserved in definitions:
        lo, hi = round(start * 25), round(end * 25)
        selected_events = [dict(e) for e in events if e["period"] == 1 and start <= e["start"] <= end and e["end"] <= end and e["type"] != "SET PIECE"]
        indices = sorted(set(range(lo, hi + 1, 5)) | {hi} |
                         {v for e in selected_events for v in (e["startFrame"], e["endFrame"]) if lo <= v <= hi})
        frames = []
        for i in indices:
            h, a = home.get((1, i)), away.get((1, i))
            if h is None or a is None or abs(h["time"] - a["time"]) > .001:
                raise ValueError("Missing or unsynchronized frame " + str(i))
            ball = h["ball"] or a["ball"]
            if h["ball"] and a["ball"] and math.dist(h["ball"], a["ball"]) > .1:
                ball = None
            frames.append({"frame": i, "time": h["time"], "players": h["players"] + a["players"], "ball": ball})
        for e in selected_events:
            if e["type"] == "PASS":
                frame = next((f for f in frames if f["frame"] == e["startFrame"]), None)
                e["candidateSupports"] = support_candidates(frame["players"], e["team"], e["sender"]) if frame else None
        clips.append({"id": ident, "title": title, "team": team, "start": start, "end": end,
                      "reserved": reserved, "frames": frames, "events": selected_events,
                      "summary": summarize(frames, selected_events, team),
                      "transition": {"defendingTeam": team, "anchor": start, "anchorEvent": "RECOVERY"} if ident.startswith("transition-") else None})
    return {"schemaVersion": 2, "provider": "Metrica Sports", "match": "Sample Game 1",
            "source": ROOT, "eventsSource": ROOT + "/blob/master/data/Sample_Game_1/Sample_Game_1_RawEventsData.csv",
            "sourceWindowSeconds": [0.04, 600.04], "sourcePitchMeters": [105, 68], "modelPitch": [100, 64],
            "selection": "Three offensive examples, one reserved contrast clip and two five-second windows after opponent RECOVERY events; not representative sampling.",
            "quality": {"home": hq, "away": aq}, "clips": clips,
            "definitions": {"supports": "At PASS onset: teammate excluding goalkeeper and sender, 3–30 m away; no rival within 2 m of the interior 8–95% of the segment. Geometric indicator, not a guaranteed pass.",
                            "offBall": "No From/To entry for that player in any selected event. Unrecorded touches cannot be excluded.",
                            "accompanying": "Forward displacement at least 2 m among players without a recorded touch; descriptive threshold, not tactical success.",
                            "block": "Mean signed longitudinal displacement of matched outfield players at both endpoints.",
                            "timing": "Original timestamps retained, including event boundaries; variable display intervals, no invented interpolation.",
                            "orientation": "First-half Home right/Away left, inferred from goalkeeper positions."}}

if __name__ == "__main__":
    p = argparse.ArgumentParser()
    for key in ("home", "away", "events", "out"):
        p.add_argument("--" + key, required=True)
    a = p.parse_args()
    result = build(a.home, a.away, a.events)
    Path(a.out).write_text(json.dumps(result, ensure_ascii=False, separators=(",", ":")) + "\n", encoding="utf-8")
    print(json.dumps([{"title": c["title"], "frames": len(c["frames"]), "summary": c["summary"]} for c in result["clips"]], ensure_ascii=False))
