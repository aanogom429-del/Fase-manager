"""Exact-data diagrams; no invented positions or interpolation."""
import argparse
import gzip
import json
from pathlib import Path
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from matplotlib.patches import Rectangle, Circle
from analyze_real_defense import canonical


def plot(data, output):
    plt.rcParams.update({'font.family': 'DejaVu Sans', 'font.size': 10})
    fig, axes = plt.subplots(3, 2, figsize=(14, 16), facecolor='#f5f7fa')
    definitions = [
        ('transition-blue', 'Presión y balance', 'El balón se aleja 10,43 m; el bloque se acorta 5,63 m'),
        ('transition-roles-check', 'Temporización y contención', '8 jugadores del lado de portería al inicio y al final'),
        ('transition-check', 'Contención superada', 'Balón: 25,39 m hacia portería; bloque: 3,09 m hacia delante'),
        ('transition-red', 'Retroceso sin reorganización suficiente', 'Bloque: 19,14 m hacia atrás; balón: 43,21 m hacia portería'),
        ('game2-shot-199', 'Protección de finalización: gol', 'A 488,08 s: defensor más cercano a 0,67 m; solo 1 del lado de portería'),
        ('game2-shot-298', 'Protección de finalización: bloqueo', 'A 740,60 s: contacto etiquetado BLOCKED; geometría sensible al radio'),
    ]
    for ax, (ident, title, subtitle) in zip(axes.flat, definitions):
        c = next(c for c in data['clips'] if c['id'] == ident)
        t = c['defendingTeam']
        ax.set_facecolor('#eaf2ed')
        ax.add_patch(Rectangle((0, 0), 105, 68, fill=False, color='#789183'))
        ax.plot([52.5, 52.5], [0, 68], color='#a8b9ae', lw=.7)
        for x in [0, 88.5]:
            ax.add_patch(Rectangle((x, 13.84), 16.5, 40.32, fill=False, color='#a8b9ae', lw=.7))
        ax.plot([0, 0], [30.34, 37.66], color='#243a31', lw=4)
        valid = [f for f in c['frames'] if f['ball'] and len(f['players']) == 22]
        if c['kind'] == 'transition':
            first, last = valid[0], valid[-1]
            for p in first['players']:
                if p[0] != t or p[1] == (11 if t == 0 else 25):
                    continue
                q = next(q for q in last['players'] if q[:2] == p[:2])
                a, b = canonical(p[2:], t), canonical(q[2:], t)
                ax.scatter(*a, s=32, facecolors='none', edgecolors='#2266a1', alpha=.6)
                ax.annotate('', xy=b, xytext=a,
                            arrowprops={'arrowstyle': '->', 'color': '#2266a1', 'alpha': .45, 'lw': 1.1})
            positions = [canonical(f['ball'], t) for f in valid]
            ax.plot([p[0] for p in positions], [p[1] for p in positions], color='#ce8f04', lw=2.2)
            ax.scatter(*positions[0], s=65, facecolors='none', edgecolors='#b57e00', zorder=6)
            ax.scatter(*positions[-1], s=45, color='#ce8f04', zorder=6)
            time_label = f"{c['match']} · {c['start']:.2f}–{c['end']:.2f} s"
        else:
            last = max((f for f in valid if f['time'] <= c['shot']['start']), key=lambda f: f['time'])
            ball = canonical(last['ball'], t)
            ax.scatter(*ball, s=65, color='#ce8f04', zorder=6)
            for goal_y in [30.34, 34, 37.66]:
                ax.plot([ball[0], 0], [ball[1], goal_y], color='#ce8f04', alpha=.5, lw=.9, ls='--')
            ax.add_patch(Rectangle((0, 17), 25, 34, fill=False, color='#9b79a9', ls=':', lw=1.1))
            time_label = f"Sample Game 2 · {last['time']:.2f} s · {c['shot']['subtype']}"
        for p in last['players']:
            point = canonical(p[2:], t)
            if p[0] == t:
                keeper = p[1] == (11 if t == 0 else 25)
                ax.scatter(*point, s=42, c='#234b70' if not keeper else '#292e35',
                           marker='o' if not keeper else 's', zorder=4)
                if not keeper:
                    ax.annotate(str(p[1]), point, xytext=(3, 4), textcoords='offset points', fontsize=7, color='#163957')
            else:
                ax.scatter(*point, s=22, c='#bd6767', marker='x', alpha=.65)
        ax.set_xlim(-3, 108)
        ax.set_ylim(71, -3)
        ax.set_aspect('equal')
        ax.set_xticks([0, 25, 50, 75, 105])
        ax.set_yticks([0, 34, 68])
        ax.tick_params(labelsize=8, length=0, colors='#5c6770')
        for spine in ax.spines.values():
            spine.set_visible(False)
        ax.set_title(title, loc='left', fontsize=12, weight='bold', pad=26, color='#233543')
        ax.text(0, 1.035, time_label.replace('.', ','), transform=ax.transAxes, fontsize=9, color='#586570')
        ax.text(0, -.11, subtitle, transform=ax.transAxes, fontsize=9, color='#233543', wrap=True)
    fig.suptitle('Metrica · Defensa real y principios del juego', x=.065, ha='left', fontsize=20, weight='bold', color='#233543')
    fig.text(.065, .945, 'Portería propia siempre a la izquierda · Coordenadas en metros · Funciones compatibles, no etiquetas automáticas', fontsize=10, color='#586570')
    fig.text(.065, .035, 'Azul: defensores (círculo vacío = inicio; lleno = final) · Rojo: rivales al final · Ámbar: balón\n'
             'Los trazos de tiro son hipótesis geométricas, no vuelos observados. Fuente: Metrica Sports sample-data.\n'
             'Secuencias seleccionadas de dos partidos; no representan una validación general del motor.', fontsize=10, color='#586570', linespacing=1.6)
    fig.subplots_adjust(left=.065, right=.975, top=.91, bottom=.105, hspace=.46, wspace=.16)
    Path(output).parent.mkdir(parents=True, exist_ok=True)
    fig.savefig(output, dpi=145, facecolor=fig.get_facecolor())
    plt.close(fig)


if __name__ == '__main__':
    p = argparse.ArgumentParser()
    p.add_argument('--data', default='data/real-defense-principles.json.gz')
    p.add_argument('--out', default='docs/assets/metrica-defense-principles.png')
    args = p.parse_args()
    with gzip.open(args.data, 'rt') as stream:
        plot(json.load(stream), args.out)
