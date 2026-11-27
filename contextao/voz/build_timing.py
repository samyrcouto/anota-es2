# Prende cada cena à frase que ela ilustra, monta a faixa de narração e as legendas.
import json, re, subprocess
W = json.load(open('voz/words_full.json')); scenes = json.load(open('anim/scenelist_orig.json'))
TITLE_GAP = 2.6   # pausa da voz durante o cartão de título
ANCH = {  # frase que abre cada cena (None = cartão de título com pausa; '^' = começo do capítulo)
 '00-gancho': ['^', 'De um lado', 'Foram mais de cinco', 'E o Brasil que saiu', 'Hoje você vai'],
 '01-tabuleiro': [None, '^', 'O Paraguai fica lá', 'E o Brasil tinha', 'Quatro países', 'No Paraguai mandava', 'O país tinha fundição', 'E foi num vizinho'],
 '02-pavio': [None, '^', 'Estancieiros gaúchos', 'Só que os Blancos', 'Em novembro de 1864', 'Em dezembro, tropas', 'Em abril de 1865', 'Em primeiro de maio', 'Todo mundo achou'],
 '03-despreparo': [None, '^', 'A solução foi', 'Com a guerra se', 'E muitos soldados', 'E o próprio Dom'],
 '04-riachuelo': [None, '^', 'O comandante brasileiro', 'O Brasil espera', 'Barroso usou', 'e os rios passaram', 'Por terra, uma', 'Cercada, e com', 'No fim daquele'],
 '05-trincheiras': [None, '^', 'No meio do caminho', 'Em volta, lama', 'Em vinte e quatro', 'Mas em setembro', 'E então chegaram', 'Por quase um ano'],
 '06-caxias': [None, '^', 'Antes de atacar', 'E aqui vem', 'Caxias decidiu', 'Em fevereiro de 1868', 'Em julho, os'],
 '07-dezembrada': [None, '^', 'Em dezembro de 1868', 'Em Itororó, segundo', 'Em janeiro de 1869', 'Mas Solano López'],
 '08-cordilheira': [None, '^', 'Começou a fase', 'Em dezesseis de agosto', 'Até hoje, o', 'Em primeiro de março', 'Segundo a tradição'],
 '09-conta': [None, '^', 'Para o Paraguai', 'O país ainda'],
 '10-dois-lados': ['^', 'Nos anos setenta', 'Mas, a partir', 'Ninguém sai como', 'E você, aprendeu'],
 '11-e-o-brasil': ['^', 'O Exército entrou', 'Ficou difícil explicar', 'E, em quinze', 'A guerra que o Império'],
 '12-fechamento': ['^', 'No próximo vídeo', 'Te vejo lá.'],
}
norm = lambda w: re.sub(r'[^\wáéíóúâêôãõçàüñ]', '', w.lower())
secs = list(ANCH)
idx = {k: [i for i, w in enumerate(W) if w['k'] == k] for k in secs}
def find(k, phrase):
    ids = idx[k]; ph = [norm(x) for x in phrase.split()]
    for p in range(len(ids) - len(ph) + 1):
        if all(norm(W[ids[p + q]]['w']) == ph[q] for q in range(len(ph))): return ids[p]
    raise SystemExit(f'âncora não achada: {k} / {phrase}')
# cortes do áudio: meio do silêncio entre capítulos
cuts = {}
for n, k in enumerate(secs):
    first, last = W[idx[k][0]], W[idx[k][-1]]
    a = 0.0 if n == 0 else (W[idx[secs[n-1]][-1]]['e'] + first['s']) / 2
    b = None if n == len(secs) - 1 else (last['e'] + W[idx[secs[n+1]][0]]['s']) / 2
    cuts[k] = (max(0, a), b)
TOTAL_AUDIO = float(subprocess.run(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0','voz/full.mp3'],capture_output=True,text=True).stdout)
plan, t, segs, subs = [], 0.0, [], []
bysec = {}
for i, s in enumerate(scenes): bysec.setdefault(s['sec'], []).append(i)
for k in secs:
    a, b = cuts[k]; b = b if b is not None else TOTAL_AUDIO
    gap = TITLE_GAP if ANCH[k][0] is None else 0.0
    sec_start = t; off = sec_start + gap - a   # tempo no vídeo = tempo no áudio + off
    if gap: segs.append(('sil', gap))
    segs.append(('aud', a, b))
    sec_len = gap + (b - a) + (3.0 if k == secs[-1] else 0)
    starts = []
    for j, an in enumerate(ANCH[k]):
        if an is None: starts.append(sec_start)
        elif an == '^': starts.append(sec_start + gap if j > 0 else sec_start)
        else: starts.append(max(sec_start, W[find(k, an)]['s'] + off - 0.25))
    ends = starts[1:] + [sec_start + sec_len]
    for j, i in enumerate(bysec[k]):
        L = max(0.6, ends[j] - starts[j]); plan.append({'i': i, 'sec': k, 'start': round(starts[j], 3), 'len': round(L, 3), 'f': round(L / scenes[i]['d'], 4)})
    # legendas
    chunk = []
    def flush():
        if chunk: subs.append({'s': round(chunk[0]['s'] + off, 2), 'e': round(chunk[-1]['e'] + off + .25, 2), 'txt': ' '.join(w['w'] for w in chunk)})
    for i in idx[k]:
        w = W[i]
        if chunk and len(' '.join(x['w'] for x in chunk + [w])) > 84: flush(); chunk = []
        chunk.append(w)
        if w['w'][-1] in '.?!' or (w['w'][-1] in ',:;' and len(' '.join(x['w'] for x in chunk)) > 45): flush(); chunk = []
    flush()
    t += sec_len
for x, y in zip(subs, subs[1:]):
    if x['e'] > y['s'] - .05: x['e'] = round(y['s'] - .05, 2)
json.dump(plan, open('anim/plan.json', 'w')); json.dump(subs, open('anim/subs.json', 'w'), ensure_ascii=False)
json.dump(segs, open('voz/segs.json', 'w'))
print('duração do vídeo', round(t, 1), 's |', len(subs), 'legendas')
fs = sorted(plan, key=lambda p: p['f']); print('cenas mais aceleradas', [(p['sec'], p['i'], p['f']) for p in fs[:5]]); print('mais lentas', [(p['sec'], p['i'], p['f']) for p in fs[-4:]])
