# Contextão

Canal de história no YouTube: **"a história inteira, sem pular nada"**.
Esta pasta guarda o que é preciso para produzir os vídeos: os roteiros, as animações feitas em código, a sincronização com a voz e as legendas.

## Estrutura

| Pasta | O que tem |
|---|---|
| `roteiros/` | Identidade do canal e pauta de 30 vídeos, roteiro completo do vídeo 01, guia de sincronização, roteiro de voz e as legendas `.srt` do vídeo 01 |
| `anim/` | Motor de animação (canvas 1920×1080), cenas de cada vídeo e os scripts de renderização |
| `voz/` | Textos de narração e os scripts que alinham a voz ao roteiro, palavra por palavra |

### Arquivos de animação

| Arquivo | Função |
|---|---|
| `anim/engine.js` | Base comum: textos, legendas, mapas, personagens, navios, cartões de título e de citação, linhas do tempo |
| `anim/engine_roma.js` | Extensões do vídeo 02: mapa do Mediterrâneo com fronteiras históricas, figurinos romanos, elefante, Coliseu, aqueduto etc. |
| `anim/scenes*.js` | Vídeo 01 (Guerra do Paraguai), 82 cenas |
| `anim/scenes_r1.js`, `anim/scenes_r2.js` | Vídeo 02 (Roma), 86 cenas. Cada cena tem `a`: a frase do roteiro em que ela começa |
| `anim/video.html` / `anim/video2.html` | Página que monta cada vídeo e aplica a sincronização (`plan*.json`) e as legendas (`subs*.json`) |
| `anim/rivers.json` | Rios da Bacia do Prata (Natural Earth) |
| `anim/romemaps.json` | Territórios de Roma, Cartago e vizinhos em 500 a.C., 200 a.C., 1 a.C., 100 e 400 d.C. (extraídos de [historical-basemaps](https://github.com/aourednik/historical-basemaps); fronteiras aproximadas) |

## Como produzir um vídeo

Requisitos: Node 18+, Python 3, ffmpeg e Chromium com Playwright.

```bash
cd contextao/anim
npm install                     # d3-geo, topojson-client, world-atlas
python3 -m http.server 8790     # deixe rodando em outro terminal

# 1) Prévia: um quadro de cada cena, montado numa folha de contato
PAGE=video2.html KEYS=keys2 node keys.js
python3 sheet2.py 0 24 previa.jpg keys2

# 2) Narração: gere o áudio do roteiro de voz (ElevenLabs, voz "Nassif") e alinhe cada palavra ao texto (faster-whisper)
cd .. && python3 voz/align_any.py voz/roteiro_video02.json voz2/full.mp3 voz2/words.json

# 3) Sincronização: prende cada cena à sua frase (campo `a` de cada cena) e gera o plano, as legendas e os trechos de áudio
#    (a lista de cenas vem de anim/scenelist2_orig.json, exportada da página com ?raw)
python3 voz/build_timing_any.py voz2/words.json anim/scenelist2_orig.json voz2/full.mp3 anim/plan2.json anim/subs2.json voz2/segs.json

# 4) Renderização (4 processos em paralelo, um arquivo por capítulo) e junção dos capítulos
cd anim && PAGE=video2.html node render_all.js ../saida
cd ../saida && ffmpeg -f concat -safe 0 -i lista.txt -c copy video_mudo.mp4

# 5) Narração dentro do vídeo (com pausa nos títulos de capítulo e volume no padrão do YouTube)
cd .. && python3 voz/mux.py voz2/full.mp3 voz2/segs.json saida/video_mudo.mp4 Contextao-02-FINAL.mp4
```

Os scripts `voz/align_full.py` e `voz/build_timing.py` são as versões usadas no vídeo 01 (âncoras fixas no código). Do vídeo 02 em diante, use as versões `_any`.

## Regras do canal (para não ser visto como conteúdo "inautêntico")

- Roteiro original, com pesquisa e fontes na descrição. Nunca tradução de vídeo de outro canal.
- Animação própria para cada vídeo, sem template repetido.
- A mesma voz em todos os vídeos. Marcar "conteúdo alterado ou sintético" no YouTube quando a voz for de IA.
- No bloco "Os dois lados", mostrar como os historiadores discordam, sem tomar partido político.
