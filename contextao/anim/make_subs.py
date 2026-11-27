# Gera legendas (subs.json + .srt) a partir do roteiro de voz, distribuindo o tempo de cada capítulo pelas palavras.
import re, json, sys
voz = open('contextao/04-roteiro-de-voz.md').read()
scenes = json.load(open('anim/scenelist.json'))
starts, durs = {}, {}
for s in scenes:
    starts.setdefault(s['sec'], s['start']); durs[s['sec']] = durs.get(s['sec'], 0) + s['d']
keys = list(starts)
blocks = re.split(r'^## ', voz, flags=re.M)[1:]
def clean(t): return re.sub(r'\s+', ' ', t.replace('**', '').replace('*', '').replace(' / ', ' ').replace('//', '')).strip()
def chunks(sentence, maxc=84):
    words = sentence.split(); out, cur = [], []
    for w in words:
        if cur and len(' '.join(cur + [w])) > maxc: out.append(' '.join(cur)); cur = [w]
        else: cur.append(w)
        if cur and len(' '.join(cur)) > 40 and w[-1] in ',:;' and len(' '.join(cur)) < maxc: out.append(' '.join(cur)); cur = []
    if cur: out.append(' '.join(cur))
    return out
subs = []
for k, b in zip(keys, blocks):
    body = b.split('\n', 2)[2]
    paras = [clean(p) for p in body.split('\n\n') if clean(p)]
    sents = [s for p in paras for s in re.split(r'(?<=[.!?])\s+', p) if s]
    items = []
    for s in sents:
        cs = chunks(s)
        for i, c in enumerate(cs): items.append((c, len(c.split()) + (0.8 if i == len(cs) - 1 else 0.2)))
    t0, total = starts[k] + 0.4, durs[k] - 0.9
    wsum = sum(w for _, w in items); t = t0
    for c, w in items:
        d = total * w / wsum; subs.append({'s': round(t, 2), 'e': round(t + d - 0.08, 2), 'txt': c}); t += d
json.dump(subs, open('anim/subs.json', 'w'), ensure_ascii=False)
def ts(x): h = int(x // 3600); m = int(x % 3600 // 60); s = x % 60; return f"{h:02d}:{m:02d}:{int(s):02d},{int((s % 1) * 1000):03d}"
open('contextao/video01-legendas.srt', 'w').write('\n'.join(f"{i+1}\n{ts(x['s'])} --> {ts(x['e'])}\n{x['txt']}\n" for i, x in enumerate(subs)))
print(len(subs), 'legendas'); print(subs[:3])
