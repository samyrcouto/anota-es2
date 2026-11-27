# Uso: python3 voz/build_timing_any.py WORDS.json SCENELIST.json AUDIO.mp3 PLAN.json SUBS.json SEGS.json
# SCENELIST vem da página (sceneList() com ?raw): cada cena tem sec, d e a (âncora: null = título com pausa, '^' = início do capítulo, ou uma frase do roteiro).
import json, re, subprocess, sys
words_f, scenes_f, audio_f, plan_f, subs_f, segs_f = sys.argv[1:7]
W = json.load(open(words_f)); scenes = json.load(open(scenes_f)); TITLE_GAP, TAIL = 2.6, 3.0
norm = lambda w: re.sub(r'[^\wáéíóúâêôãõçàüñ]', '', w.lower())
secs = list(dict.fromkeys(s['sec'] for s in scenes))
idx = {k: [i for i, w in enumerate(W) if w['k'] == k] for k in secs}
bysec = {}
for i, s in enumerate(scenes): bysec.setdefault(s['sec'], []).append(i)
def find(k, phrase):
    ids, ph = idx[k], [norm(x) for x in phrase.split()]
    for p in range(len(ids) - len(ph) + 1):
        if all(norm(W[ids[p + q]]['w']) == ph[q] for q in range(len(ph))): return ids[p]
    raise SystemExit(f'âncora não achada: {k} / {phrase}')
total = float(subprocess.run(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0',audio_f],capture_output=True,text=True).stdout)
plan, segs, subs, t = [], [], [], 0.0
for n, k in enumerate(secs):
    first, last = W[idx[k][0]], W[idx[k][-1]]
    a = 0.0 if n == 0 else (W[idx[secs[n-1]][-1]]['e'] + first['s']) / 2
    b = total if n == len(secs) - 1 else (last['e'] + W[idx[secs[n+1]][0]]['s']) / 2
    anch = [scenes[i].get('a') for i in bysec[k]]
    gap = TITLE_GAP if anch[0] is None else 0.0
    start = t; off = start + gap - a
    if gap: segs.append(['sil', gap])
    segs.append(['aud', a, b if n < len(secs) - 1 else None])
    L = gap + (b - a) + (TAIL if n == len(secs) - 1 else 0)
    st = []
    for j, an in enumerate(anch):
        if an is None: st.append(start)
        elif an == '^': st.append(start + gap if j > 0 else start)
        else: st.append(max(start, W[find(k, an)]['s'] + off - 0.25))
    en = st[1:] + [start + L]
    for j, i in enumerate(bysec[k]):
        Ln = max(0.6, en[j] - st[j]); plan.append({'i': i, 'sec': k, 'start': round(st[j], 3), 'len': round(Ln, 3), 'f': round(Ln / scenes[i]['d'], 4)})
    chunk = []
    def flush():
        if chunk: subs.append({'s': round(chunk[0]['s'] + off, 2), 'e': round(chunk[-1]['e'] + off + .25, 2), 'txt': ' '.join(w['w'] for w in chunk)})
    for i in idx[k]:
        w = W[i]
        if chunk and len(' '.join(x['w'] for x in chunk + [w])) > 84: flush(); chunk = []
        chunk.append(w)
        if w['w'][-1] in '.?!' or (w['w'][-1] in ',:;' and len(' '.join(x['w'] for x in chunk)) > 45): flush(); chunk = []
    flush(); t += L
for x, y in zip(subs, subs[1:]):
    if x['e'] > y['s'] - .05: x['e'] = round(y['s'] - .05, 2)
json.dump(plan, open(plan_f, 'w')); json.dump(subs, open(subs_f, 'w'), ensure_ascii=False); json.dump(segs, open(segs_f, 'w'))
print('vídeo', round(t, 1), 's |', len(subs), 'legendas')
fs = sorted(plan, key=lambda p: p['f']); print('mais aceleradas', [(p['sec'], p['i'], p['f']) for p in fs[:5]]); print('mais lentas', [(p['sec'], p['i'], p['f']) for p in fs[-3:]])
