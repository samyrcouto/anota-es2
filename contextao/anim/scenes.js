// Contextão — Vídeo 01: A Guerra do Paraguai em 20 minutos
// Cada seção = um bloco do roteiro. Durações calculadas pela narração (~145 palavras/min).
const P = PLACES;
const S = []; // {sec, d, draw}
function sec(name, scenes) { scenes.forEach(s => S.push({ sec: name, ...s })); }
const TAG = (n, title, sub) => (t) => chapterTag(t, n + '. ' + title, sub);

// ======== GANCHO (45s) ========
sec('00-gancho', [
  { d: 12, draw: (t, d) => { drawMap(t, d, { view: 'sa', view2: 'basin', camFrom: 5, camTo: 11.5, nameScale: 1.1, skipNames: [], hi: [{ c: 'BR', color: C.blue, from: 2, alpha: .35 }, { c: 'AR', color: C.blue, from: 2.4, alpha: .35 }, { c: 'UY', color: C.blue, from: 2.8, alpha: .35 }, { c: 'PY', color: C.red, from: 3.6, alpha: .6 }], note: false });
    bigTitle('1864 – 1870', W / 2, 150, 90, seg(t, .5, 1.3) * (1 - seg(t, 4.5, 5.2)), { halo: C.paper });
    caption(t, 6.5, 'A maior guerra da América do Sul', null, { x: 80, y: 860, w: 760 }); watermark(); } },
  { d: 10, draw: (t, d) => { paperBg(C.paper2); grainLines(2); const a = fadeIO(t, d);
    ctx.globalAlpha = a; const kinds = [['solBR', 'BR'], ['solAR', 'AR'], ['solUY', 'UY']];
    kinds.forEach(([k, f], i) => { for (let j = 0; j < 3; j++) person(220 + i * 230 + j * 60, 860 + j * 8, 1.35, { ...CHAR[k], flag: j === 1 ? f : null, flagWave: t * 4 + i }); });
    for (let j = 0; j < 3; j++) person(1460 + j * 70, 860 + j * 8, 1.5, { ...CHAR.solPY, flip: true, flag: j === 1 ? 'PY' : null, flagWave: t * 4 }); ctx.globalAlpha = 1;
    bigTitle('3', 560, 260, 200, seg(t, 1, 1.6) * a, { color: C.blue }); txt('aliados', 560, 380, { size: 40, weight: 700, al: 'center', alpha: seg(t, 1.3, 1.9) * a });
    bigTitle('×', W / 2 + 120, 500, 140, seg(t, 2, 2.5) * a, { color: C.ink });
    bigTitle('1', 1530, 260, 200, seg(t, 2.6, 3.2) * a, { color: C.red }); txt('sem saída para o mar', 1530, 380, { size: 36, weight: 700, al: 'center', alpha: seg(t, 3, 3.6) * a });
    vignette(.2); watermark(a); } },
  { d: 12, draw: (t, d) => { paperBg(C.ink); const a = fadeIO(t, d); const pan = (i) => { const at = .3 + i * 3.6; return seg(t, at, at + .6); };
    const panel = (i, fn, label) => { const x = 80 + i * 600, y = 220, w = 560, h = 560; const p = pan(i); if (p <= 0) return; ctx.save(); ctx.globalAlpha = a * p; ctx.beginPath(); ctx.rect(x, y + 30 * (1 - p), w, h); ctx.clip(); ctx.translate(x, y + 30 * (1 - p)); ctx.scale(w / W, h / H * 1); fn(); ctx.restore(); ctx.strokeStyle = C.gold; ctx.globalAlpha = a * p; ctx.lineWidth = 4; ctx.strokeRect(x, y + 30 * (1 - p), w, h); ctx.globalAlpha = 1; txt(label, x + w / 2, 850, { size: 30, weight: 900, color: C.paper, al: 'center', alpha: a * p, spacing: 2 }); };
    panel(0, () => { sky('#C9D4D8', '#E8E0CC'); river(620, 460, t); ship(700, 700, 1.6, { flag: 'BR', paddle: true, t }); ship(1350, 760, 1.4, { flag: 'PY', flip: true, t, hull: '#3A2A22' }); }, 'BATALHAS NOS RIOS');
    panel(1, () => { sky('#8C8F86', '#B4AA8E'); ground(560, C.mud); ctx.fillStyle = '#5E4E36'; ctx.fillRect(0, 640, W, 120); for (let i = 0; i < 6; i++) person(250 + i * 280, 700, 2.2, { ...CHAR.solBR, rifle: true }); for (let i = 0; i < 40; i++) { ctx.fillStyle = 'rgba(200,210,220,.6)'; ctx.fillRect((i * 97 + t * 400) % W, (i * 53 + t * 900) % H, 3, 40); } }, 'TRINCHEIRAS E DOENÇA');
    panel(2, () => { sky('#9FC0D0', '#E8E0CC'); ground(900, '#6B7F4A'); for (let i = 0; i < 9; i++) bush(i * 240, 920, 2.4, '#4F6B3A'); balloon(W / 2, 420 - 30 * Math.sin(t), 2.4); }, 'BALÕES DE OBSERVAÇÃO');
    watermark(a * .7); } },
  { d: 7, draw: (t, d) => { paperBg(C.paper2); grainLines(4); const a = fadeIO(t, d);
    ctx.globalAlpha = a; person(620, 1000, 2.6, { ...CHAR.pedro, hat: 'crown' }); ctx.globalAlpha = a * seg(t, 2.2, 3); person(1300, 1000, 2.6, { ...CHAR.deodoro, arm: 'sword' }); ctx.globalAlpha = 1;
    txt('Dom Pedro II', 620, 330, { size: 44, weight: 900, al: 'center', alpha: a }); txt('Marechal Deodoro', 1300, 330, { size: 44, weight: 900, al: 'center', alpha: a * seg(t, 2.2, 3) });
    bigTitle('19 anos depois…', W / 2, 150, 72, a * seg(t, 3.5, 4.2), { halo: C.paper2, color: C.red }); vignette(.2); } },
  { d: 4, draw: (t, d) => { paperBg(C.paper); const a = fadeIO(t, d, .4, .4); logoClock(W / 2, 400, 120, a, t); bigTitle('CONTEXTÃO', W / 2, 640, 110, a, { spacing: 8 }); txt('A GUERRA DO PARAGUAI · SEM PULAR NADA', W / 2, 740, { size: 32, weight: 500, fam: 'IBM Plex Mono', al: 'center', color: C.red, alpha: a * seg(t, .6, 1.2), spacing: 4 }); vignette(.18); } },
]);

function balloon(x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.strokeStyle = '#4A3A2A'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(-40, 30); ctx.lineTo(-18, 110); ctx.moveTo(40, 30); ctx.lineTo(18, 110); ctx.stroke(); ctx.fillStyle = '#D8C9A0'; ctx.beginPath(); ctx.ellipse(0, -30, 80, 95, 0, 0, 7); ctx.fill(); ctx.strokeStyle = C.red; ctx.lineWidth = 6; ctx.beginPath(); ctx.ellipse(0, -30, 30, 95, 0, 0, 7); ctx.stroke(); ctx.fillStyle = '#6A4A30'; ctx.fillRect(-22, 108, 44, 30); ctx.fillStyle = C.skin; ctx.beginPath(); ctx.arc(0, 100, 10, 0, 7); ctx.fill(); ctx.strokeStyle = C.ink; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(8, 98); ctx.lineTo(30, 92); ctx.stroke(); ctx.strokeStyle = 'rgba(74,58,42,.8)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(0, 138); ctx.lineTo(60, 600); ctx.stroke(); ctx.restore(); }

// ======== CAP 1: O TABULEIRO (94s) ========
const T1 = TAG(1, 'O TABULEIRO', 'DÉCADA DE 1860');
sec('01-tabuleiro', [
  { d: 4, draw: (t, d) => titleCard(t, d, '1', 'O TABULEIRO', 'DÉCADA DE 1860') },
  { d: 14, draw: (t, d) => { drawMap(t, d, { view: 'basin', rivers: { from: 1, to: 6 }, labels: [{ s: 'rio Paraná', p: [-53.6, -22.0], rot: -52, at: 6, size: 26, color: C.waterD }, { s: 'rio Paraguai', p: [-57.15, -18.2], rot: -80, at: 6.3, size: 26, color: C.waterD }, { s: 'rio Uruguai', p: [-55.0, -28.9], rot: -38, at: 6.6, size: 26, color: C.waterD }, { s: 'RIO DA PRATA', p: [-56.6, -35.6], at: 8, size: 30, color: C.waterD, spacing: 3 }],
      cities: [{ p: 'ba', label: 'Buenos Aires', at: 9, al: 'right', dx: -16, dy: 24 }, { p: 'mvd', label: 'Montevidéu', at: 9.3, dy: -22 }] });
    T1(t); caption(t, 10.5, 'Bacia do Prata', 'Quem controlava os rios controlava o comércio, o transporte e a guerra.', { y: 740, w: 600 }); watermark(); } },
  { d: 14, draw: (t, d) => { drawMap(t, d, { view: 'basin', view2: [[-64.5, -35.2], [-52.5, -20.5]], camFrom: 0, camTo: 4, hi: [{ c: 'PY', from: 1 }], skipNames: ['PARAGUAI', 'ARGENTINA'], labels: [{ s: 'PARAGUAI', p: [-59.4, -22.6], at: 1.5, size: 44, color: C.red, spacing: 4 }, { s: 'sem saída para o mar', p: [-59.4, -23.4], at: 2.4, size: 26 }],
      arrows: [{ pts: [P.asu, [-58.3, -26.86], [-58.8, -27.5], [-59.6, -29.9], [-60.6, -32.9], [-59.6, -33.6], P.ba], from: 5, to: 9, color: C.gold, width: 8, label: 'tudo passava pela Argentina', lp: [-61.0, -31.2], al: 'right', dx: -24 }] });
    T1(t); watermark(); } },
  { d: 16, draw: (t, d) => { drawMap(t, d, { view: 'basin', ellipses: [{ p: [-56.6, -17], rx: 120, ry: 150, at: 1, label: 'MATO GROSSO', color: C.blue }], route: { pts: RIVER_ROUTE, from: 4, to: 12 }, cities: [{ p: 'rio', label: 'Rio de Janeiro', at: 3 }, { p: 'cuiaba', label: 'Cuiabá', at: 3.3 }, { p: 'asu', label: 'Assunção', at: 3.6, al: 'right', dx: -16 }] });
    T1(t); caption(t, 12, 'Rio de Janeiro → Cuiabá', 'O caminho mais prático era de navio, subindo os rios e passando pelo Paraguai.', { y: 740, w: 600 }); watermark(); } },
  { d: 10, draw: (t, d) => { drawMap(t, d, { view: 'basin', hi: [{ c: 'BR', color: C.blue, from: .5, alpha: .3 }, { c: 'AR', color: '#4A7AA8', from: 1.1, alpha: .3 }, { c: 'UY', color: '#2B5BB5', from: 1.7, alpha: .35 }, { c: 'PY', color: C.red, from: 2.3, alpha: .45 }] });
    T1(t); caption(t, 4, 'Quatro países, os mesmos rios', 'E nenhum queria que o vizinho mandasse sozinho neles.', { y: 760, w: 640 }); watermark(); } },
  { d: 12, draw: (t, d) => { paperBg(C.paper2); grainLines(6); const a = fadeIO(t, d); const sw = seg(t, 5.5, 6.5);
    ctx.globalAlpha = a * (1 - sw * .65); person(700, 1000, 2.4, { ...CHAR.carlos }); ctx.globalAlpha = a * sw; person(1220, 1000, 2.6, { ...CHAR.lopez }); ctx.globalAlpha = 1;
    txt('Carlos Antonio López', 700, 200, { size: 42, weight: 900, al: 'center', alpha: a * (1 - sw * .5) }); txt('governou até 1862', 700, 250, { size: 26, fam: 'IBM Plex Mono', weight: 500, color: C.muted, al: 'center', alpha: a * (1 - sw * .5) });
    txt('Francisco Solano López', 1220, 200, { size: 42, weight: 900, al: 'center', alpha: a * sw, color: C.red }); txt('presidente a partir de 1862', 1220, 250, { size: 26, fam: 'IBM Plex Mono', weight: 500, color: C.muted, al: 'center', alpha: a * sw });
    if (sw > 0) arrowHead([880, 600], [1000, 600], 30 * sw, C.gold);
    T1(t); txt('ilustração', W - 80, H - 40, { size: 16, fam: 'IBM Plex Mono', weight: 500, color: C.muted, al: 'right', alpha: a }); vignette(.2); } },
  { d: 14, draw: (t, d) => { paperBg(C.paper); grainLines(7); const a = fadeIO(t, d);
    bigTitle('Um Paraguai que se modernizava', W / 2, 250, 64, a); [['foundry', 'fundição de ferro'], ['shipyard', 'estaleiro'], ['telegraph', 'telégrafo'], ['train', 'ferrovia']].forEach(([k, l], i) => { const at = 1.2 + i * 1.4, aa = seg(t, at, at + .5) * a; iconBox(390 + i * 380, 560, 1.2 * (.85 + .15 * aa), k, aa); txt(l, 390 + i * 380, 720, { size: 32, weight: 700, al: 'center', alpha: aa }); });
    caption(t, 8, null, 'E um dos maiores exércitos da região em relação ao tamanho do país.', { x: 360, y: 840, w: 1200 }); T1(t); vignette(.2); } },
  { d: 10, draw: (t, d) => { drawMap(t, d, { view: 'basin', view2: 'uy', camFrom: .5, camTo: 5, hi: [{ c: 'UY', color: C.red, from: 2, alpha: .5 }], skipNames: ['URUGUAI'], labels: [{ s: 'URUGUAI', p: [-56, -32.6], at: 2.5, size: 50, color: C.red, spacing: 6 }] });
    const fl = seg(t, 5, 6); if (fl > 0) { const x = 1250, y = 520; ctx.save(); ctx.globalAlpha = fl; ctx.strokeStyle = C.ink; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(x - 120, y + 60); ctx.quadraticCurveTo(x - 60, y + 90, x, y); ctx.stroke(); const sp = Math.sin(t * 20) * 4; ctx.fillStyle = C.gold; ctx.beginPath(); ctx.arc(x + sp, y - sp, 12 + Math.abs(sp), 0, 7); ctx.fill(); ctx.fillStyle = C.red; ctx.beginPath(); ctx.arc(x, y, 6, 0, 7); ctx.fill(); ctx.restore(); }
    caption(t, 6, 'O pavio', 'Foi num vizinho pequeno que tudo começou.', { y: 800, w: 560 }); T1(t); watermark(); } },
]);

// ======== CAP 2: O PAVIO (107s) ========
const T2 = TAG(2, 'O PAVIO', '1864');
sec('02-pavio', [
  { d: 4, draw: (t, d) => titleCard(t, d, '2', 'O PAVIO', '1864') },
  { d: 14, draw: (t, d) => { paperBg(C.paper2); grainLines(8); const a = fadeIO(t, d); const pull = Math.sin(t * 2.2) * 30;
    ctx.strokeStyle = '#8A6A3A'; ctx.lineWidth = 10; ctx.globalAlpha = a; ctx.beginPath(); ctx.moveTo(620 + pull, 820); ctx.lineTo(1300 + pull, 820); ctx.stroke(); ctx.globalAlpha = 1;
    ctx.globalAlpha = a; person(560 + pull, 1000, 2.3, { ...CHAR.blanco, arm: 'point' }); person(1360 + pull, 1000, 2.3, { ...CHAR.flores, flip: true, arm: 'point' }); ctx.globalAlpha = 1;
    txt('BLANCOS', 560, 340, { size: 56, weight: 900, al: 'center', alpha: a, spacing: 4 }); txt('no governo em 1864', 560, 395, { size: 26, fam: 'IBM Plex Mono', weight: 500, color: C.muted, al: 'center', alpha: a });
    txt('COLORADOS', 1360, 340, { size: 56, weight: 900, al: 'center', color: C.red, alpha: a, spacing: 4 }); txt('Venancio Flores', 1360, 395, { size: 26, fam: 'IBM Plex Mono', weight: 500, color: C.muted, al: 'center', alpha: a });
    caption(t, 6, 'Guerra civil no Uruguai', 'Dois partidos disputavam o poder havia décadas.', { x: 640, y: 60, w: 640 }); T2(t); vignette(.2); } },
  { d: 14, draw: (t, d) => { drawMap(t, d, { view: 'uy', hi: [{ c: 'UY', color: C.red, from: .3, alpha: .3 }], arrows: [{ pts: [[-53.5, -31.0], [-54.6, -31.9], [-55.8, -33.4], [-56.16, -34.6]], from: 4, to: 8, color: C.blue, width: 12, label: 'Brasil invade (1864)', lp: [-53.2, -32.3], al: 'left', dx: 10 }], cities: [{ p: 'mvd', label: 'Montevidéu', at: 1, dy: -24 }, { p: 'portoalegre', label: 'Porto Alegre', at: 1.3 }], labels: [{ s: 'estancieiros gaúchos', p: [-54.6, -30.2], at: 1.8, size: 26, color: C.blue }] });
    caption(t, 9, 'Apoio aos Colorados', 'O Império pressionou o governo uruguaio e, sem resposta, entrou no país.', { y: 760, w: 640 }); T2(t); watermark(); } },
  { d: 12, draw: (t, d) => charCard(t, d, 'lopez', 'Francisco Solano López', 'ALIADO DOS BLANCOS', { bubble: { at: 2.5, s: 'Se o Brasil intervier no Uruguai, o Paraguai vai considerar uma ameaça.', w: 560 } }) },
  { d: 16, draw: (t, d) => { sky('#BFD0D4', '#EADFC8'); bush(100, 560, 2, '#5E7A45'); bush(500, 570, 1.8, '#5E7A45'); bush(1500, 560, 2.1, '#5E7A45'); bush(1850, 570, 1.7, '#5E7A45'); river(580, 500, t); const a = fadeIO(t, d);
    const xb = lerp(1500, 1150, seg(t, 0, 6)); ship(xb, 760, 1.4, { flag: 'BR', paddle: true, t: t * 0 + (t < 6 ? t : 6), wave: t * 3, smoke: t < 6 });
    const xp = lerp(-200, 650, seg(t, 3, 8)); ship(xp, 820, 1.2, { flag: 'PY', t, wave: t * 3, hull: '#3A2A22' });
    if (t > 8) { cannon(820, 760, .9, false, Math.max(0, 1 - (t - 8.4) * 2) * (t > 8.4 ? 1 : 0)); }
    const fl = seg(t, 9.5, 10.5); if (fl > 0) { ctx.save(); ctx.globalAlpha = fl; ctx.fillStyle = C.red; ctx.font = font(120, 900); ctx.textAlign = 'center'; ctx.translate(1150, 420); ctx.rotate(-.12); ctx.strokeStyle = C.red; ctx.lineWidth = 8; ctx.strokeRect(-330, -80, 660, 160); ctx.fillText('CAPTURADO', 0, 40); ctx.restore(); }
    txt('Marquês de Olinda', xb, 600, { size: 30, weight: 800, al: 'center', alpha: a * (1 - seg(t, 9, 9.5)), halo: C.paper });
    caption(t, 11, 'Novembro de 1864', 'A bordo estava o novo presidente do Mato Grosso. Ele morreu preso no Paraguai.', { y: 80, x: 80, w: 680 }); ctx.globalAlpha = 1; vignette(.2); watermark(a); } },
  { d: 12, draw: (t, d) => { drawMap(t, d, { view: 'mt', hi: [{ c: 'PY', from: .2, alpha: .45 }], ellipses: [{ p: [-56.6, -18.3], rx: 200, ry: 230, at: .8, label: 'MATO GROSSO', color: C.blue }], arrows: [{ pts: [P.concepcion, [-57.9, -21.6], [-57.7, -19.4]], from: 2, to: 5, width: 12, label: 'pelo rio', lp: [-58.2, -21.0], al: 'right', dx: -20 }, { pts: [P.concepcion, [-56.2, -22.6], [-54.9, -21.9]], from: 3, to: 6, width: 12, label: 'por terra', lp: [-55.6, -22.8], al: 'left', dx: 10 }], cities: [{ p: 'corumba', label: 'Corumbá', at: 1.2 }, { p: 'concepcion', label: 'Concepción', at: 1.3, al: 'right', dx: -16 }] });
    caption(t, 7, 'Dezembro de 1864', 'Tropas paraguaias invadem o Mato Grosso. A guerra começou.', { y: 780, w: 620 }); T2(t); watermark(); } },
  { d: 12, draw: (t, d) => { drawMap(t, d, { view: 'south', hi: [{ c: 'PY', from: .2, alpha: .45 }, { c: 'AR', color: '#4A7AA8', from: 1, alpha: .25 }], arrows: [{ pts: [[-58.4, -27.0], [-58.83, -27.47], [-59.0, -28.6], [-59.4, -29.6]], from: 3, to: 6.5, width: 12, label: 'Corrientes (abril de 1865)', lp: [-59.2, -28.6], al: 'right', dx: -24 }], cities: [{ p: 'corrientes', label: 'Corrientes', at: 1.5 }], labels: [{ s: 'a Argentina nega passagem', p: [-60.0, -26.6], at: 1.6, size: 28, color: C.ink }] });
    T2(t); watermark(); } },
  { d: 13, draw: (t, d) => { paperBg(C.ink); const a = fadeIO(t, d); const s = .9 + .1 * seg(t, 0, 1);
    ctx.save(); ctx.globalAlpha = a; ctx.translate(W / 2, 560); ctx.scale(s, s); ctx.rotate(-.02); ctx.fillStyle = C.paper; ctx.fillRect(-520, -440, 1040, 860); ctx.strokeStyle = C.muted; ctx.lineWidth = 2; ctx.strokeRect(-490, -410, 980, 800);
    txt('TRATADO DA', 0, -330, { size: 40, weight: 700, al: 'center', spacing: 8, fam: 'IBM Plex Mono' }); txt('TRÍPLICE ALIANÇA', 0, -250, { size: 86, weight: 900, al: 'center' }); txt('1º de maio de 1865', 0, -170, { size: 34, weight: 500, al: 'center', fam: 'IBM Plex Mono', color: C.red });
    ctx.strokeStyle = C.paper2; ctx.lineWidth = 3; for (let i = 0; i < 6; i++) { ctx.beginPath(); ctx.moveTo(-400, -100 + i * 36); ctx.lineTo(400 - (i % 3) * 60, -100 + i * 36); ctx.stroke(); }
    [['BR', 'Brasil'], ['AR', 'Argentina'], ['UY', 'Uruguai']].forEach(([f, n], i) => { const aa = seg(t, 2 + i * 1.1, 2.6 + i * 1.1); ctx.save(); ctx.globalAlpha *= aa; drawFlag(-370 + i * 280, 170, 120, 80, f); txt(n, -310 + i * 280, 300, { size: 32, weight: 800, al: 'center' }); ctx.strokeStyle = C.ink; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-400 + i * 280, 345); ctx.quadraticCurveTo(-330 + i * 280, 320 - 20 * Math.sin(i), -220 + i * 280, 345); ctx.stroke(); ctx.restore(); });
    const st = seg(t, 6, 6.4); if (st > 0) { ctx.save(); ctx.translate(400, -60); ctx.rotate(.2); ctx.scale(2 - st, 2 - st); ctx.globalAlpha *= st; ctx.fillStyle = C.red; ctx.beginPath(); ctx.arc(0, 0, 70, 0, 7); ctx.fill(); txt('3', 0, 6, { size: 80, weight: 900, color: C.paper, al: 'center' }); ctx.restore(); }
    ctx.restore(); caption(t, 8, null, 'Os três contra o Paraguai.', { x: 660, y: 950, w: 600 }); } },
  { d: 10, draw: (t, d) => { paperBg(C.paper2); grainLines(9); const a = fadeIO(t, d);
    const cal = (x, label, big, at) => { const aa = seg(t, at, at + .5) * a; if (aa <= 0) return; ctx.save(); ctx.globalAlpha = aa; ctx.fillStyle = C.white; ctx.strokeStyle = C.ink; ctx.lineWidth = 5; ctx.beginPath(); ctx.roundRect(x - 250, 300, 500, 420, 24); ctx.fill(); ctx.stroke(); ctx.fillStyle = C.red; ctx.fillRect(x - 250, 300, 500, 90); ctx.restore(); txt(label, x, 345, { size: 34, weight: 800, color: C.paper, al: 'center', alpha: aa }); txt(big, x, 560, { size: 104, weight: 900, al: 'center', alpha: aa }); };
    cal(620, 'O QUE ACHAVAM', 'meses', .5); cal(1300, 'O QUE ACONTECEU', '5 anos', 4);
    if (t > 4) { ctx.save(); ctx.globalAlpha = seg(t, 3.5, 4) * a; ctx.strokeStyle = C.red; ctx.lineWidth = 12; ctx.beginPath(); ctx.moveTo(420, 480); ctx.lineTo(820, 640); ctx.stroke(); ctx.restore(); }
    T2(t); vignette(.2); } },
]);
