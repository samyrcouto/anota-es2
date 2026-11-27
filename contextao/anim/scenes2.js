// Capítulos 3, 4 e 5
// ======== CAP 3: UM IMPÉRIO DESPREPARADO (74s) ========
const T3 = TAG(3, 'UM IMPÉRIO DESPREPARADO', '1865');
function brazilDots(t, proj, at, n = 18) { const pts = [[-47.9, -15.8], [-43.2, -22.9], [-46.6, -23.5], [-38.5, -12.9], [-34.9, -8.0], [-60.0, -3.1], [-48.5, -1.4], [-51.2, -30.0], [-49.3, -25.4], [-56.1, -15.6], [-44.3, -2.5], [-38.5, -3.7], [-40.3, -20.3], [-53.0, -29.7], [-42.8, -5.1], [-54.6, -20.4], [-63.9, -8.8], [-49.2, -16.7]]; pts.slice(0, n).forEach((c, i) => { const a = seg(t, at + i * .12, at + i * .12 + .4); if (a <= 0) return; const p = proj(c); ctx.save(); ctx.globalAlpha = a; person(p[0], p[1] + 20, .28, { ...CHAR.solBR }); ctx.restore(); }); }
sec('03-despreparo', [
  { d: 4, draw: (t, d) => titleCard(t, d, '3', 'UM IMPÉRIO DESPREPARADO', '1865') },
  { d: 12, draw: (t, d) => { const proj = drawMap(t, d, { view: 'sa', hi: [{ c: 'BR', color: C.blue, from: .3, alpha: .25 }, { c: 'PY', color: C.red, from: 6, alpha: .6 }], nameScale: 1.1 }); brazilDots(t, proj, 1);
    caption(t, 3.5, 'Menos de 20 mil homens', 'Um Exército pequeno, espalhado por um país enorme.', { y: 780, w: 560 }); const pa = seg(t, 6.5, 7.2); if (pa > 0) { const p = proj([-58.4, -23.3]); txt('preparado havia anos', p[0] - 60, p[1] + 10, { size: 30, weight: 800, color: C.red, al: 'right', alpha: pa, halo: C.paper }); } T3(t); watermark(); } },
  { d: 16, draw: (t, d) => { sky('#D8CFBA', '#EADFC8'); ground(860, '#C9B98E'); const a = fadeIO(t, d);
    ctx.save(); ctx.globalAlpha = a; ctx.translate(320, 500); ctx.rotate(-.03); ctx.fillStyle = C.white; ctx.strokeStyle = C.ink; ctx.lineWidth = 5; ctx.fillRect(-200, -260, 400, 520); ctx.strokeRect(-200, -260, 400, 520); txt('VOLUNTÁRIOS', 0, -180, { size: 52, weight: 900, al: 'center' }); txt('DA PÁTRIA', 0, -120, { size: 52, weight: 900, al: 'center', color: C.red }); drawFlag(-90, -60, 180, 120, 'BR', t * 2); txt('Alistem-se!', 0, 120, { size: 34, weight: 700, al: 'center' }); txt('janeiro de 1865', 0, 190, { size: 26, fam: 'IBM Plex Mono', weight: 500, al: 'center', color: C.muted }); ctx.restore();
    const coats = ['#6A4A30', '#3A3328', C.blue, '#7A6A50', C.blue, '#4A5A3A', C.blue, '#6A3A2A', C.blue, C.blue];
    for (let i = 0; i < 10; i++) { const x = ((t * 120 + i * 210) % 2400) - 200; const uniform = x < 1100; person(2100 - x, 880, 1.25, { coat: uniform ? C.blue : coats[i], pants: uniform ? C.white : '#5A4A38', hat: uniform ? 'kepi' : (i % 2 ? 'straw' : 'none'), hair: '#3A2A1A', rifle: uniform, walk: t * 6 + i, flip: true, skin: [C.skin, C.skin2, C.skin3][i % 3], buttons: uniform, flag: i === 4 && uniform ? 'BR' : null, flagWave: t * 4 }); }
    T3(t); caption(t, 8, null, 'Soldo, terra e prestígio para quem se alistasse.', { x: 1100, y: 120, w: 700 }); vignette(.2); watermark(a); } },
  { d: 8, draw: (t, d) => { paperBg(C.paper2); grainLines(11); const a = fadeIO(t, d);
    bigTitle('“VOLUNTÁRIO”', W / 2, 360, 120, a); const st = seg(t, 2, 2.6); ctx.save(); ctx.globalAlpha = a * st; ctx.strokeStyle = C.red; ctx.lineWidth = 14; ctx.beginPath(); ctx.moveTo(W / 2 - 480, 380); ctx.lineTo(W / 2 - 480 + 960 * st, 340); ctx.stroke(); ctx.restore();
    txt('com a guerra se arrastando, muitos foram recrutados à força', W / 2, 520, { size: 42, weight: 700, al: 'center', alpha: a * seg(t, 2.8, 3.4) });
    for (let i = 0; i < 5; i++) person(600 + i * 180, 980, 1.1, { ...CHAR.solBR, sad: true, skin: [C.skin, C.skin2, C.skin3][i % 3], walk: null }); T3(t); vignette(.2); } },
  { d: 20, draw: (t, d) => { paperBg(C.paper); grainLines(12); const a = fadeIO(t, d); const p2 = seg(t, 8, 9);
    ctx.globalAlpha = a; for (let i = 0; i < 6; i++) person(260 + i * 150, 960, 1.6, { coat: C.blue, pants: C.white, hat: 'kepi', rifle: true, skin: [C.skin3, C.skin2, C.skin3, C.skin3, C.skin2, C.skin3][i] }); ctx.globalAlpha = 1;
    txt('Muitos soldados brasileiros eram homens escravizados', 680, 280, { size: 40, weight: 800, al: 'center', alpha: a });
    const panel = (x, y, title, body, aa) => { if (aa <= 0) return; ctx.save(); ctx.globalAlpha = aa; ctx.fillStyle = C.white; ctx.strokeStyle = C.ink; ctx.lineWidth = 4; ctx.beginPath(); ctx.roundRect(x, y, 560, 230, 16); ctx.fill(); ctx.stroke(); ctx.restore(); txt(title, x + 30, y + 50, { size: 36, weight: 900, color: C.red, alpha: aa }); para(body, x + 30, y + 110, 500, { size: 28, weight: 500, alpha: aa }); };
    panel(1260, 260, 'Substitutos', 'Mandados para a guerra no lugar de filhos de famílias ricas.', a * seg(t, 3, 3.6));
    panel(1260, 540, 'Libertos para lutar', 'O governo libertou escravizados com a condição de que fossem para a guerra.', a * seg(t, 6, 6.6));
    caption(t, 12, 'Guarde isso', 'Homens que não eram livres no próprio país lutando em nome dele.', { x: 1260, y: 820, w: 560 }); T3(t); vignette(.2); } },
  { d: 14, draw: (t, d) => charCard(t, d, 'pedro', 'Dom Pedro II', '“VOLUNTÁRIO NÚMERO UM” · 1865', { bubble: { at: 3, s: 'O imperador foi pessoalmente até o Sul.', w: 460 } }) },
]);

// ======== CAP 4: O RIO E A FRONTEIRA (86s) ========
const T4 = TAG(4, 'O RIO E A FRONTEIRA', '1865');
function sinking(x, y, s, f, o) { ctx.save(); ctx.translate(x, y + f * 140 * s); ctx.rotate(f * .35 * (o.flip ? -1 : 1)); ctx.globalAlpha = 1 - f * .7; ship(0, 0, s, { ...o, smoke: f < .3 }); ctx.restore(); }
sec('04-riachuelo', [
  { d: 4, draw: (t, d) => titleCard(t, d, '4', 'O RIO E A FRONTEIRA', '1865') },
  { d: 8, draw: (t, d) => { drawMap(t, d, { view: 'basin', view2: 'south', camFrom: 0, camTo: 5, markers: [{ p: 'riachuelo', at: 4, kind: 'battle', label: 'Riachuelo', dx: -36, al: 'right' }], cities: [{ p: 'corrientes', label: 'Corrientes', at: 3.5 }] }); caption(t, 5, '11 de junho de 1865', 'A primeira grande batalha foi na água.', { y: 780, w: 560 }); T4(t); watermark(); } },
  { d: 5, draw: (t, d) => charCard(t, d, 'barroso', 'Almirante Barroso', 'COMANDANTE DA ESQUADRA BRASILEIRA') },
  { d: 7, draw: (t, d) => quoteCard(t, d, 'O Brasil espera que cada um cumpra o seu dever.', 'sinal erguido por Barroso antes do combate') },
  { d: 22, draw: (t, d) => { sky('#B9C6C8', '#E2D8C2'); bush(150, 420, 2.2, '#5E7A45'); bush(700, 430, 2, '#5E7A45'); bush(1300, 420, 2.2, '#5E7A45'); bush(1800, 430, 2, '#5E7A45'); river(450, 630, t); const a = fadeIO(t, d, .6, .8);
    const ram = [[6, 1150, 700], [9.5, 1450, 860], [13, 1700, 680]];
    const ax = t < 5 ? lerp(300, 600, t / 5) : t < 6 ? lerp(600, 980, seg(t, 5, 6)) : t < 9.5 ? lerp(980, 1280, seg(t, 7.5, 9.5)) : t < 13 ? lerp(1280, 1530, seg(t, 11, 13)) : 1530;
    const ay = t < 9.5 ? lerp(760, 820, seg(t, 7, 9.5)) : t < 13 ? lerp(820, 720, seg(t, 11, 13)) : 720;
    ram.forEach(([tt, x, y], i) => { const f = seg(t, tt + .3, tt + 3); sinking(x, y, .9, f, { flip: true, hull: '#3A2A22', flag: 'PY', t, wave: t * 3 }); if (t > tt && t < tt + 1.2) { smokePuff(x - 140, y - 40, 60, 1 - (t - tt) / 1.2, '#E8D8B0'); } });
    ship(300, 880, .9, { flag: 'BR', paddle: true, t, wave: t * 3 }); ship(150, 640, .8, { flag: 'BR', paddle: true, t, wave: t * 3 });
    ship(ax, ay, 1.05, { flag: 'BR', paddle: true, t, wave: t * 3 }); txt('Amazonas', ax, ay - 230, { size: 30, weight: 900, al: 'center', halo: C.paper, alpha: a * (1 - seg(t, 15, 16)) });
    for (let k = 0; k < 6; k++) { const ft = (t * 1.3 + k * .37) % 3; if (t < 15) cannon(200 + k * 250, 470, .5, k % 2 === 1, ft < .4 ? 1 - ft / .4 : 0); }
    caption(t, 4.5, 'O navio como aríete', 'Barroso jogou a fragata Amazonas contra os navios paraguaios.', { x: 80, y: 60, w: 640 });
    const r = seg(t, 16.5, 17.3); if (r > 0) { ctx.globalAlpha = r * .92; ctx.fillStyle = C.ink; ctx.fillRect(W / 2 - 520, 300, 1040, 220); ctx.globalAlpha = 1; bigTitle('FROTA PARAGUAIA DESTRUÍDA', W / 2, 390, 60, r, { color: C.gold }); txt('Riachuelo, 11 de junho de 1865', W / 2, 460, { size: 30, weight: 500, fam: 'IBM Plex Mono', color: C.paper, al: 'center', alpha: r }); }
    vignette(.25); watermark(a); } },
  { d: 10, draw: (t, d) => { const proj = drawMap(t, d, { view: 'basin', hi: [{ c: 'PY', from: .3, alpha: .4 }], arrows: [{ pts: [P.ba, [-59.6, -33.6], [-60.6, -32.9], [-60.55, -31.7], [-59.6, -29.9], [-58.9, -27.8]], from: 1.5, to: 5, color: C.blue, width: 12, label: 'rios sob controle aliado', lp: [-60.6, -31.2], al: 'right', dx: -24 }], skipNames: ['ARGENTINA'] });
    caption(t, 5.5, null, 'O Paraguai não conseguia mais usar os rios para atacar.', { x: 1200, y: 820, w: 620 }); T4(t); watermark(); } },
  { d: 12, draw: (t, d) => { drawMap(t, d, { view: 'south', hi: [{ c: 'PY', from: .2, alpha: .4 }], arrows: [{ pts: [P.encarnacion, [-55.95, -28.2], P.saoborja, [-56.6, -29.1], P.uruguaiana], from: 1.5, to: 6, width: 12, label: 'coluna paraguaia', lp: [-55.3, -27.6], al: 'left', dx: 20 }], cities: [{ p: 'saoborja', label: 'São Borja', at: 3.5 }, { p: 'uruguaiana', label: 'Uruguaiana', at: 5.5, size: 30 }], labels: [{ s: 'RIO GRANDE DO SUL', p: [-54.3, -30.4], at: 1, size: 30, color: C.muted, spacing: 4 }] });
    caption(t, 7, 'Agosto de 1865', 'Tropas paraguaias tomam Uruguaiana.', { y: 820, w: 540 }); T4(t); watermark(); } },
  { d: 12, draw: (t, d) => { sky('#CFD6D0', '#EADFC8'); ground(720, '#B9B27A'); const a = fadeIO(t, d);
    ctx.fillStyle = '#C9B48E'; for (let i = 0; i < 9; i++) { const x = 640 + i * 75, h = 80 + (i * 37) % 70; ctx.fillRect(x, 720 - h, 64, h); ctx.fillStyle = '#8A3A2A'; ctx.beginPath(); ctx.moveTo(x - 6, 720 - h); ctx.lineTo(x + 32, 690 - h); ctx.lineTo(x + 70, 720 - h); ctx.fill(); ctx.fillStyle = '#C9B48E'; }
    txt('URUGUAIANA', 980, 400, { size: 44, weight: 900, al: 'center', alpha: a, halo: C.paper, spacing: 4 });
    for (let i = 0; i < 7; i++) person(140 + i * 60, 1000 - (i % 2) * 20, .9, { ...CHAR.solBR }); for (let i = 0; i < 7; i++) person(1420 + i * 60, 1000 - (i % 2) * 20, .9, { ...CHAR.solAR, flip: true });
    person(360, 1060, 1.3, { ...CHAR.pedro, flag: null }); txt('Pedro II', 360, 740, { size: 28, weight: 800, al: 'center', halo: C.paper, alpha: a });
    const wf = seg(t, 5, 6.5); if (wf > 0) { ctx.strokeStyle = '#5A4630'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(980, 640); ctx.lineTo(980, 640 - 180 * wf); ctx.stroke(); if (wf > .5) drawFlag(980, 640 - 180 * wf, 110, 70, 'white', t * 3); }
    caption(t, 7, '18 de setembro de 1865', 'As tropas paraguaias se rendem sem batalha final.', { x: 1100, y: 80, w: 700 }); T4(t); vignette(.2); } },
  { d: 6, draw: (t, d) => { paperBg(C.paper2); grainLines(13); const a = fadeIO(t, d); bigTitle('Fim de 1865', W / 2, 220, 80, a); checklist(t, ['frota paraguaia destruída', 'ofensiva em Corrientes fracassa', 'rendição em Uruguaiana'], 560, 420, { at: .6, step: 1 }); txt('Mato Grosso continua ocupado', W / 2, 760 + 120, { size: 32, weight: 600, fam: 'IBM Plex Mono', al: 'center', color: C.red, alpha: a * seg(t, 3.6, 4.2) }); vignette(.2); } },
]);

// ======== CAP 5: A GUERRA DE TRINCHEIRA (103s) ========
const T5 = TAG(5, 'A GUERRA DE TRINCHEIRA', '1866');
function rain(t, n = 80, a = .5) { ctx.save(); ctx.strokeStyle = `rgba(210,220,228,${a})`; ctx.lineWidth = 2; for (let i = 0; i < n; i++) { const x = (i * 97 + t * 300) % (W + 100) - 50, y = (i * 61 + t * 1300) % (H + 100) - 50; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x - 8, y + 34); ctx.stroke(); } ctx.restore(); }
function mosquitoes(t, cx, cy, n = 30) { ctx.fillStyle = C.ink; for (let i = 0; i < n; i++) { const an = t * (1.5 + i % 5 * .3) + i, r = 60 + (i * 37) % 220; ctx.beginPath(); ctx.arc(cx + Math.cos(an) * r, cy + Math.sin(an * 1.3) * r * .5, 3, 0, 7); ctx.fill(); } }
function trench(y, col = '#6E5A3C') { ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(0, y); for (let x = 0; x <= W; x += 80) ctx.lineTo(x, y - 30 - ((x / 80) % 3) * 8); ctx.lineTo(W, y + 60); ctx.lineTo(0, y + 60); ctx.fill(); }
sec('05-trincheiras', [
  { d: 4, draw: (t, d) => titleCard(t, d, '5', 'A GUERRA DE TRINCHEIRA', '1866') },
  { d: 14, draw: (t, d) => { drawMap(t, d, { view: 'south', view2: 'humaita', camFrom: 1, camTo: 6, countryNames: false, markers: [{ p: 'humaita', at: 6, kind: 'fort', label: 'HUMAITÁ', size: 34 }], cities: [{ p: 'corrientes', label: 'Corrientes', at: 2 }], arrows: [{ pts: [[-58.68, -27.45], [-58.6, -27.37], [-58.55, -27.3]], from: 8.5, to: 10.5, color: C.blue, width: 10, label: 'travessia (abril de 1866)', lp: [-58.4, -27.42], al: 'left', dx: 24 }], labels: [{ s: 'rio Paraguai', p: [-58.62, -26.85], rot: -70, at: 4, size: 26, color: C.waterD }, { s: 'rio Paraná', p: [-58.2, -27.48], rot: 6, at: 4, size: 26, color: C.waterD }, { s: 'PARAGUAI', p: [-58.0, -26.9], at: 5, size: 34, color: C.red, spacing: 4 }, { s: 'ARGENTINA', p: [-58.9, -27.62], at: 5, size: 30, color: C.muted, spacing: 4 }] });
    caption(t, 11, 'Rumo a Assunção', 'Para chegar à capital, era preciso subir o rio Paraguai… e passar por Humaitá.', { y: 760, w: 620 }); T5(t); watermark(); } },
  { d: 14, draw: (t, d) => { sky('#C8CFC9', '#E5DAC2'); const a = fadeIO(t, d); ctx.fillStyle = '#9FA36E'; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = C.water; ctx.beginPath(); ctx.moveTo(0, 820); ctx.bezierCurveTo(600, 760, 900, 300, 1500, 360); ctx.lineTo(W, 380); ctx.lineTo(W, 560); ctx.lineTo(1500, 540); ctx.bezierCurveTo(1100, 520, 900, 980, 0, 1040); ctx.fill();
    ctx.fillStyle = '#6E5A3C'; ctx.beginPath(); ctx.moveTo(980, 300); ctx.bezierCurveTo(1200, 230, 1500, 250, 1700, 300); ctx.lineTo(1700, 340); ctx.bezierCurveTo(1500, 300, 1200, 290, 1000, 350); ctx.fill();
    for (let i = 0; i < 8; i++) { const x = 1030 + i * 85, y = 300 - Math.sin(i * .5) * 30; cannon(x, y + 40, .45, false, ((t + i * .3) % 2.5) < .3 && t > 3 ? 1 : 0); }
    const ch = seg(t, 5, 7); if (ch > 0) { ctx.strokeStyle = '#3A3A3A'; ctx.lineWidth = 6; ctx.setLineDash([14, 6]); ctx.globalAlpha = ch; ctx.beginPath(); ctx.moveTo(1120, 420); ctx.quadraticCurveTo(1150, 520, 1120 + 0, 640 * ch + 420 * (1 - ch)); ctx.stroke(); ctx.setLineDash([]); ctx.globalAlpha = 1; txt('correntes de ferro no rio', 1180, 560, { size: 26, weight: 700, alpha: ch, halo: C.paper }); }
    for (let i = 0; i < 12; i++) bush(80 + i * 170, 120 + (i % 3) * 30, 1.2, '#4F6B3A');
    bigTitle('HUMAITÁ', 520, 300, 96, a, { halo: C.paper, color: C.ink, spacing: 8 }); txt('a “Sebastopol da América”', 520, 380, { size: 34, weight: 700, al: 'center', alpha: a * seg(t, 2, 2.6), halo: C.paper });
    T5(t); vignette(.3); watermark(a); } },
  { d: 8, draw: (t, d) => { sky('#A8AD9A', '#CFC6A6'); ground(620, '#7D6A4A'); const a = fadeIO(t, d); ctx.fillStyle = '#6B8A8E'; [[300, 760, 260, 50], [900, 860, 340, 60], [1500, 740, 280, 45], [1200, 980, 400, 50]].forEach(([x, y, rx, ry]) => { ctx.beginPath(); ctx.ellipse(x, y, rx, ry, 0, 0, 7); ctx.fill(); });
    ctx.strokeStyle = '#5E6B3A'; ctx.lineWidth = 4; for (let i = 0; i < 60; i++) { const x = (i * 73) % W, y = 640 + (i * 41) % 380; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + 6, y - 50); ctx.stroke(); }
    mosquitoes(t, 960, 420, 40); ['LAMA', 'MATA FECHADA', 'CALOR'].forEach((s, i) => bigTitle(s, 420 + i * 540, 260, 64, a * seg(t, .6 + i * 1.3, 1.2 + i * 1.3), { halo: C.paper })); T5(t); vignette(.3); } },
  { d: 20, draw: (t, d) => { sky('#C2C5B4', '#E0D6BE'); ground(560, '#A9A270'); const a = fadeIO(t, d); const adv = seg(t, 2, 7), ret = seg(t, 10, 15);
    for (let r = 0; r < 3; r++) for (let i = 0; i < 9; i++) { const x = 120 + i * 70 + r * 30, y = 700 + r * 120; person(x, y, .9, { ...CHAR.solBR, walk: null }); }
    for (let k = 0; k < 4; k++) cannon(760, 640 + k * 110, .55, false, ((t + k * .4) % 1.6) < .25 && t > 4 && t < 14 ? 1 : 0);
    for (let r = 0; r < 3; r++) for (let i = 0; i < 9; i++) { const base = 1300 + i * 70 + r * 30; const x = base - 320 * adv + 420 * ret, y = 700 + r * 120; person(x, y, .9, { ...CHAR.solPY, flip: !(ret > 0 && ret < 1) ? true : false, walk: (adv > 0 && adv < 1) || (ret > 0 && ret < 1) ? t * 8 + i : null }); }
    for (let k = 0; k < 8; k++) { const ft = (t * .9 + k * .41) % 2; if (t > 3 && t < 15) smokePuff(860 + (k * 97) % 400, 620 + (k * 53) % 320, 40, Math.max(0, .6 - ft * .3)); }
    caption(t, .5, '24 de maio de 1866 · Tuiuti', 'A maior batalha campal da história da América do Sul.', { x: 80, y: 190, w: 760 });
    caption(t, 8, null, 'Estimativas: entre 50 e 60 mil homens somando os dois lados.', { x: 1060, y: 60, w: 780 });
    const r = seg(t, 15.5, 16.3); if (r > 0) { ctx.globalAlpha = r * .92; ctx.fillStyle = C.ink; ctx.fillRect(W / 2 - 560, 420, 1120, 200); ctx.globalAlpha = 1; bigTitle('VITÓRIA ALIADA', W / 2, 495, 64, r, { color: C.gold }); txt('milhares de mortos paraguaios em um único dia', W / 2, 565, { size: 30, weight: 500, color: C.paper, al: 'center', alpha: r }); }
    T5(t); vignette(.25); } },
  { d: 18, draw: (t, d) => { sky('#B9B6A6', '#DCD1B8'); ground(520, '#9C9466'); const a = fadeIO(t, d); const adv = seg(t, 5, 10), stop = seg(t, 10, 11);
    ctx.fillStyle = '#6E5A3C'; ctx.beginPath(); ctx.moveTo(1250, 1080); ctx.lineTo(1250, 520); ctx.lineTo(1340, 470); ctx.lineTo(W, 470); ctx.lineTo(W, 1080); ctx.fill(); for (let i = 0; i < 6; i++) { person(1400 + i * 80, 560 + i * 90, .8, { ...CHAR.solPY, flip: true }); cannon(1330, 540 + i * 90, .45, true, ((t + i * .3) % 1.2) < .2 && t > 6 ? 1 : 0); }
    for (let r = 0; r < 4; r++) for (let i = 0; i < 7; i++) { const x = 120 + i * 80 + r * 40 + 520 * adv - 40 * stop; person(x, 640 + r * 110, .85, { ...(i % 2 ? CHAR.solAR : CHAR.solBR), walk: adv > 0 && adv < 1 ? t * 8 + i + r : null, sad: stop > .5 }); }
    for (let k = 0; k < 10; k++) { const ft = (t * .8 + k * .3) % 2; if (t > 6) smokePuff(1100 + (k * 71) % 200, 560 + (k * 89) % 420, 36, Math.max(0, .55 - ft * .3)); }
    if (t < 5.5) lowerThird(t, .3, 'Bartolomé Mitre', 'PRESIDENTE DA ARGENTINA · COMANDANTE ALIADO');
    caption(t, 6, '22 de setembro de 1866 · Curupaiti', 'Um ataque de frente contra trincheiras bem defendidas.', { x: 80, y: 190, w: 700 });
    const r = seg(t, 12, 12.8); if (r > 0) { ctx.globalAlpha = r * .92; ctx.fillStyle = C.red; ctx.fillRect(W / 2 - 560, 380, 1120, 200); ctx.globalAlpha = 1; bigTitle('UM DESASTRE', W / 2, 455, 72, r, { color: C.paper }); txt('milhares de baixas aliadas em poucas horas', W / 2, 525, { size: 30, weight: 500, color: C.paper, al: 'center', alpha: r }); }
    T5(t); vignette(.25); } },
  { d: 13, draw: (t, d) => { paperBg('#E4DACA'); ground(760, '#B9AD88'); const a = fadeIO(t, d); tent(560, 760, 2.2, true); tent(1400, 760, 1.8, true);
    for (let i = 0; i < 5; i++) lying(260 + i * 330, 900 + (i % 2) * 70, 1.1, i % 2 ? C.blue : '#4A6A8E');
    ['CÓLERA', 'DISENTERIA', 'VARÍOLA'].forEach((s, i) => { const aa = seg(t, 1 + i * .8, 1.5 + i * .8) * a; txt(s, 420 + i * 540, 260, { size: 54, weight: 900, al: 'center', color: C.red, alpha: aa, spacing: 4 }); });
    caption(t, 4.5, null, 'Nessa guerra, mais soldados morreram de doença do que em combate.', { x: 460, y: 340, w: 1000 }); T5(t); vignette(.25); } },
  { d: 12, draw: (t, d) => { sky('#8E9286', '#BDB49A'); const a = fadeIO(t, d); ground(560, '#8A7A56'); trench(560, '#5E4E36'); trench(900, '#6E5A3C');
    for (let i = 0; i < 10; i++) { person(150 + i * 180, 590, .55, { ...CHAR.solPY, walk: null }); person(120 + i * 180, 940, .7, { ...CHAR.solBR }); }
    rain(t, 60, .35); const months = ['set 1866', 'nov 1866', 'jan 1867', 'mar 1867', 'mai 1867', 'jul 1867']; const k = Math.min(5, Math.floor(lin(t, 1, 9) * 6));
    ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = C.white; ctx.strokeStyle = C.ink; ctx.lineWidth = 5; ctx.beginPath(); ctx.roundRect(W / 2 - 200, 140, 400, 220, 18); ctx.fill(); ctx.stroke(); ctx.fillStyle = C.red; ctx.fillRect(W / 2 - 200, 140, 400, 60); ctx.restore(); txt('a guerra parada', W / 2, 172, { size: 28, weight: 800, color: C.paper, al: 'center', alpha: a }); txt(months[k], W / 2, 280, { size: 64, weight: 900, al: 'center', alpha: a });
    caption(t, 6, null, 'Quase um ano enterrados em trincheiras, a poucos quilômetros um do outro.', { x: 560, y: 400, w: 800 }); T5(t); vignette(.3); } },
]);
