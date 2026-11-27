# Uso: python3 voz/align_any.py ROTEIRO.json AUDIO.mp3 SAIDA_words.json
# Transcreve a narração com tempo por palavra e alinha ao texto do roteiro (chaves = capítulos, em ordem).
import json, re, sys, difflib, subprocess, numpy as np
from faster_whisper import WhisperModel
roteiro, audio_f, out_f = sys.argv[1:4]
txt = json.load(open(roteiro)); mine, owner = [], []
for k, v in txt.items():
    for w in v.split(): mine.append(w); owner.append(k)
raw = subprocess.run(['ffmpeg','-loglevel','error','-i',audio_f,'-f','f32le','-ac','1','-ar','16000','-'],capture_output=True).stdout
segs, _ = WhisperModel('small', device='cpu', compute_type='int8').transcribe(np.frombuffer(raw, np.float32), language='pt', word_timestamps=True)
ww = [(w.word.strip(), w.start, w.end) for s in segs for w in s.words]
norm = lambda w: re.sub(r'[^\wáéíóúâêôãõçàüñ]', '', w.lower())
sm = difflib.SequenceMatcher(None, [norm(w) for w in mine], [norm(w[0]) for w in ww], autojunk=False)
times, probs = [None] * len(mine), []
for tag, i1, i2, j1, j2 in sm.get_opcodes():
    if tag == 'equal':
        for d in range(i2 - i1): times[i1 + d] = (ww[j1 + d][1], ww[j1 + d][2])
    else:
        if i2 - i1 > 2 or j2 - j1 > 2: probs.append((tag, ' '.join(mine[i1:i2])[:80], ' '.join(w[0] for w in ww[j1:j2])[:80]))
        if j2 > j1 and i2 > i1:
            s0, e0, n = ww[j1][1], ww[j2 - 1][2], i2 - i1
            for d in range(n): times[i1 + d] = (s0 + (e0 - s0) * d / n, s0 + (e0 - s0) * (d + 1) / n)
for i in range(len(times)):
    if times[i] is None:
        prev = next((times[j][1] for j in range(i - 1, -1, -1) if times[j]), 0)
        nxt = next((times[j][0] for j in range(i + 1, len(times)) if times[j]), prev + .3)
        times[i] = (prev, nxt)
json.dump([{'w': w, 'k': k, 's': round(t[0], 3), 'e': round(t[1], 3)} for w, k, t in zip(mine, owner, times)], open(out_f, 'w'), ensure_ascii=False)
print('palavras', len(mine), 'transcritas', len(ww), 'match', round(sm.ratio(), 3))
for p in probs: print('DIF', p)
