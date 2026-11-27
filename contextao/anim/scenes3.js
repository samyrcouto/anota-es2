// Capítulos 6, 7, 8 e 9
// ======== CAP 6: CAXIAS (79s) ========
const T6 = TAG(6, 'CAXIAS', '1866–1868');
sec('06-caxias', [
  { d: 4, draw: (t, d) => titleCard(t, d, '6', 'CAXIAS', '1866 – 1868') },
  { d: 12, draw: (t, d) => charCard(t, d, 'caxias', 'Luís Alves de Lima e Silva', 'MARQUÊS DE CAXIAS · NO COMANDO A PARTIR DO FIM DE 1866', { bubble: { at: 4, s: 'Primeiro, arrumar a casa.', w: 420 } }) },
  { d: 10, draw: (t, d) => { paperBg(C.paper2); grainLines(14); const a = fadeIO(t, d); bigTitle('Antes de atacar', W / 2, 200, 76, a);
    [['food', 'abastecimento'], ['sick', 'hospitais'], ['target', 'treinamento'], ['eye', 'informação']].forEach(([k, l], i) => { const at = 1 + i * 1.6, aa = seg(t, at, at + .5) * a; iconBox(390 + i * 380, 520, 1.15 * (.85 + .15 * aa), k, aa); txt(l, 390 + i * 380, 680, { size: 34, weight: 800, al: 'center', alpha: aa }); });
    T6(t); vignette(.2); } },
  { d: 16, draw: (t, d) => { sky('#A9C3CF', '#E6DCC6'); const a = fadeIO(t, d); ground(860, '#6B7F4A'); for (let i = 0; i < 12; i++) bush(i * 170, 880, 1.6, i % 2 ? '#4F6B3A' : '#5E7A45');
    const by = lerp(760, 380, seg(t, .5, 6)) - 12 * Math.sin(t * .8); balloon(760, by, 1.6);
    const sp = seg(t, 7, 8); if (sp > 0) { ctx.save(); ctx.globalAlpha = sp; ctx.strokeStyle = C.gold; ctx.lineWidth = 3; ctx.setLineDash([10, 8]); ctx.beginPath(); ctx.moveTo(810, by + 150); ctx.lineTo(1500, 760); ctx.moveTo(810, by + 150); ctx.lineTo(1750, 700); ctx.stroke(); ctx.setLineDash([]); ctx.restore(); ctx.fillStyle = '#6E5A3C'; ctx.globalAlpha = sp; ctx.fillRect(1380, 740, 480, 40); ctx.globalAlpha = 1; for (let i = 0; i < 6; i++) person(1420 + i * 80, 760, .4, { ...CHAR.solPY }); txt('posições paraguaias', 1620, 700, { size: 28, weight: 800, al: 'center', alpha: sp, halo: C.paper, color: C.red }); }
    caption(t, 2, '1867', 'Balões de observação presos por cordas espiavam o inimigo por cima das matas.', { x: 1100, y: 120, w: 720 }); T6(t); vignette(.2); watermark(a); } },
  { d: 12, draw: (t, d) => { drawMap(t, d, { view: 'humaita', countryNames: false, markers: [{ p: 'humaita', at: .5, kind: 'fort', label: 'HUMAITÁ', size: 34 }], arrows: [{ pts: [[-58.4, -27.25], [-58.25, -27.15], [-58.2, -26.95], [-58.32, -26.85]], from: 2, to: 6, color: C.blue, width: 12, label: 'cercar e cortar o abastecimento', lp: [-58.05, -27.05], al: 'left', dx: 20 }], labels: [{ s: 'PARAGUAI', p: [-58.0, -26.75], at: .5, size: 34, color: C.red, spacing: 4 }] });
    caption(t, 7, 'Sem ataque de frente', 'A ideia agora era cercar a fortaleza e esperar.', { y: 780, w: 560 }); T6(t); watermark(); } },
  { d: 15, draw: (t, d) => { sky('#141B26', '#2A3548'); const a = fadeIO(t, d); ctx.fillStyle = '#E8E4D0'; for (let i = 0; i < 70; i++) { ctx.globalAlpha = .4 + .4 * Math.sin(i + t); ctx.fillRect((i * 263) % W, (i * 131) % 520, 2, 2); } ctx.globalAlpha = 1;
    ctx.fillStyle = '#1B2733'; ctx.fillRect(0, 560, W, 520); ctx.fillStyle = '#2B3B4E'; ctx.fillRect(0, 620, W, 400);
    ctx.fillStyle = '#20242A'; ctx.fillRect(0, 470, W, 110); for (let i = 0; i < 12; i++) cannon(80 + i * 160, 520, .5, false, ((t * 1.4 + i * .37) % 1.5) < .18 ? 1 : 0);
    for (let k = 0; k < 3; k++) { const x = lerp(-300 - k * 380, W + 300 - k * 380, lin(t, 1, 13)); ship(x, 800 + k * 40, .95, { iron: true, flag: 'BR', hull: '#3A414B', t, wave: t * 3 }); }
    for (let k = 0; k < 14; k++) { const ft = (t * 1.1 + k * .29) % 1.4; ctx.save(); ctx.globalAlpha = Math.max(0, 1 - ft * 2); ctx.fillStyle = '#F4C04E'; ctx.beginPath(); ctx.arc((k * 151 + 90) % W, 700 + (k * 61) % 220, 10 + ft * 30, 0, 7); ctx.fill(); ctx.restore(); }
    caption(t, 2, 'Fevereiro de 1868', 'Encouraçados brasileiros passam em frente a Humaitá sob fogo pesado.', { x: 80, y: 60, w: 720 }); vignette(.35); watermark(a); } },
  { d: 10, draw: (t, d) => { drawMap(t, d, { view: 'humaita', countryNames: false, markers: [{ p: 'humaita', at: .3, kind: 'fort', label: 'HUMAITÁ', size: 34 }], arrows: [{ pts: [P.humaita, [-58.3, -26.95], [-58.15, -26.8]], from: 2, to: 4.5, color: C.red, width: 10, label: 'retirada paraguaia', lp: [-58.05, -26.9], al: 'left', dx: 16 }] });
    caption(t, 4.5, 'Julho de 1868', 'A fortaleza que segurou a guerra por dois anos é abandonada.', { y: 780, w: 600 }); T6(t); watermark(); } },
]);

// ======== CAP 7: A DEZEMBRADA (48s) ========
const T7 = TAG(7, 'A DEZEMBRADA', 'DEZEMBRO DE 1868');
sec('07-dezembrada', [
  { d: 4, draw: (t, d) => titleCard(t, d, '7', 'A DEZEMBRADA', 'DEZEMBRO DE 1868') },
  { d: 8, draw: (t, d) => { drawMap(t, d, { view: [[-59.4, -27.6], [-56.2, -24.6]], countryNames: false, hi: [{ c: 'PY', from: 0, alpha: .3 }], arrows: [{ pts: [P.humaita, [-58.3, -26.86], [-57.95, -26.0], [-57.6, -25.55]], from: 1, to: 5, color: C.blue, width: 12, label: 'rumo à capital', lp: [-58.2, -26.4], al: 'right', dx: -20 }], cities: [{ p: 'asu', label: 'Assunção', at: .5, size: 30 }], markers: [{ p: 'humaita', at: .3, kind: 'fort', label: 'Humaitá' }] }); T7(t); watermark(); } },
  { d: 12, draw: (t, d) => { paperBg(C.paper); grainLines(15); const a = fadeIO(t, d); bigTitle('Três batalhas em pouco mais de três semanas', W / 2, 200, 54, a);
    timeline(t, [{ y: '6/12', label: 'Itororó', at: 1.5, pos: .1 }, { y: '11/12', label: 'Avaí', at: 3, pos: .4 }, { y: '21–27/12', label: 'Lomas Valentinas', at: 4.5, pos: .85 }], { x0: 260, x1: 1660, y: 600, alt: false, lw: 320 });
    caption(t, 7, null, 'O que restava do exército regular paraguaio foi destruído.', { x: 520, y: 880, w: 880 }); T7(t); vignette(.2); } },
  { d: 10, draw: (t, d) => { sky('#C7C2AE', '#E3D8BF'); const a = fadeIO(t, d); ground(700, '#9C9466'); river(760, 160, t, '#6B8A9A');
    ctx.fillStyle = '#6A4A30'; ctx.fillRect(560, 720, 800, 26); for (let i = 0; i < 9; i++) ctx.fillRect(580 + i * 95, 746, 12, 90);
    const adv = seg(t, 1, 8); person(lerp(300, 1000, adv), 726, 1.25, { ...CHAR.caxias, arm: 'sword', walk: t * 7 });
    for (let i = 0; i < 6; i++) person(lerp(120, 840, adv) - i * 70, 726 + (i % 2) * 6, 1, { ...CHAR.solBR, walk: t * 7 + i });
    caption(t, 2, 'Itororó', 'Segundo o relato que ficou famoso, Caxias, com mais de 60 anos, avançou com a tropa pela ponte.', { x: 1080, y: 120, w: 740 }); T7(t); vignette(.2); watermark(a); } },
  { d: 8, draw: (t, d) => { sky('#D4C9AE', '#EADFC8'); const a = fadeIO(t, d); ground(760, '#B9AD88');
    ctx.fillStyle = '#D9C7A4'; for (let i = 0; i < 12; i++) { const x = 300 + i * 115, h = 110 + (i * 53) % 120; ctx.fillRect(x, 760 - h, 96, h); ctx.fillStyle = '#9A4A32'; ctx.beginPath(); ctx.moveTo(x - 8, 760 - h); ctx.lineTo(x + 48, 720 - h); ctx.lineTo(x + 104, 760 - h); ctx.fill(); ctx.fillStyle = '#D9C7A4'; }
    ctx.strokeStyle = '#5A4630'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(1000, 560); ctx.lineTo(1000, 360); ctx.stroke(); drawFlag(1000, 360, 120, 80, 'BR', t * 3);
    txt('ASSUNÇÃO', 1000, 270, { size: 54, weight: 900, al: 'center', alpha: a, halo: C.paper, spacing: 6 }); caption(t, 1.5, 'Janeiro de 1869', 'Os aliados ocupam a capital. Caxias considera a guerra praticamente vencida e volta ao Brasil.', { x: 80, y: 780, w: 760 }); vignette(.2); watermark(a); } },
  { d: 6, draw: (t, d) => { drawMap(t, d, { view: 'asu', countryNames: false, hi: [{ c: 'PY', from: 0, alpha: .3 }], arrows: [{ pts: [P.asu, [-57.2, -25.35], [-56.95, -25.4]], from: .6, to: 3, color: C.red, width: 10, label: 'López foge para as serras', lp: [-56.9, -25.1], al: 'left', dx: 10 }], cities: [{ p: 'asu', label: 'Assunção', at: 0, al: 'right', dx: -16 }] }); T7(t); watermark(); } },
]);

// ======== CAP 8: A CORDILHEIRA (65s) ========
const T8 = TAG(8, 'A CORDILHEIRA', '1869–1870');
sec('08-cordilheira', [
  { d: 4, draw: (t, d) => titleCard(t, d, '8', 'A CORDILHEIRA', '1869 – 1870') },
  { d: 9, draw: (t, d) => charCard(t, d, 'conde', 'Conde d’Eu', 'GENRO DE DOM PEDRO II · COMANDANTE EM 1869') },
  { d: 10, draw: (t, d) => { drawMap(t, d, { view: [[-58.1, -26.2], [-56.1, -24.8]], countryNames: false, hi: [{ c: 'PY', from: 0, alpha: .3 }], cities: [{ p: 'asu', label: 'Assunção', at: 0, al: 'right', dx: -16 }, { p: 'piribebuy', label: 'Piribebuy', at: 2, dy: -24 }], markers: [{ p: 'acosta', at: 4, kind: 'battle', label: 'Acosta Ñu', dy: 30, dx: 30 }], arrows: [{ pts: [P.asu, [-57.2, -25.45], P.piribebuy], from: 1, to: 3.5, color: C.blue, width: 10 }],
      labels: [{ s: 'serras do interior', p: [-56.55, -25.75], at: 1, size: 28, color: C.muted }] }); caption(t, 5, 'A fase mais triste da guerra', 'López reuniu o que sobrava do país: feridos, idosos e meninos.', { x: 1160, y: 780, w: 660 }); T8(t); watermark(); } },
  { d: 16, draw: (t, d) => { sky('#8F8878', '#BDB29A'); const a = fadeIO(t, d, 1, 1); ground(720, '#8A8466');
    ctx.save(); ctx.globalAlpha = a * .85; for (let i = 0; i < 14; i++) { const x = 200 + i * 115, ch = i % 3 !== 0; person(x, 900 + (i % 2) * 30, ch ? .75 : 1, { coat: '#6A6A64', pants: '#8A8A80', hat: 'none', hair: '#3A3A36', skin: '#9A9488', buttons: false, belt: false }); } ctx.restore();
    txt('16 de agosto de 1869', W / 2, 220, { size: 44, weight: 900, al: 'center', alpha: a }); txt('Batalha de Acosta Ñu (Campo Grande)', W / 2, 290, { size: 32, weight: 600, al: 'center', alpha: a, fam: 'IBM Plex Mono', color: C.ink });
    caption(t, 4, null, 'Boa parte dos combatentes paraguaios eram adolescentes e crianças. Alguns usavam barbas pintadas para parecer mais velhos.', { x: 460, y: 380, w: 1000 }); vignette(.35); } },
  { d: 6, draw: (t, d) => { paperBg(C.ink); const a = fadeIO(t, d, .8, .8); drawFlag(W / 2 - 120, 260, 240, 150, 'PY', t * 2); bigTitle('16 DE AGOSTO', W / 2, 560, 96, a, { color: C.paper }); txt('Dia da Criança no Paraguai, em memória deles', W / 2, 660, { size: 36, weight: 600, color: C.gold, al: 'center', alpha: a }); } },
  { d: 8, draw: (t, d) => { drawMap(t, d, { view: [[-58.4, -26.2], [-54.0, -21.6]], countryNames: false, hi: [{ c: 'PY', from: 0, alpha: .3 }], arrows: [{ pts: [P.piribebuy, [-56.4, -24.6], [-56.2, -23.5], P.cerrocora], from: .6, to: 4.5, color: C.blue, width: 10, label: 'perseguição', lp: [-56.0, -24.2], al: 'left', dx: 16 }], markers: [{ p: 'cerrocora', at: 4.2, kind: 'battle', label: 'Cerro Corá', dx: 34 }], cities: [{ p: 'asu', label: 'Assunção', at: 0, al: 'right', dx: -16 }] }); T8(t); watermark(); } },
  { d: 12, draw: (t, d) => { sky('#C96A3E', '#E8B77A'); const a = fadeIO(t, d, .8, 1); ctx.fillStyle = '#F2D08A'; ctx.beginPath(); ctx.arc(W / 2, 640, 150, 0, 7); ctx.fill(); ground(640, '#4A3A2A'); river(760, 90, t, '#7A6A5A');
    for (let i = 0; i < 9; i++) palm(80 + i * 230, 660 + (i % 2) * 20, .9 + (i % 3) * .15);
    caption(t, 1, '1º de março de 1870 · Cerro Corá', 'Solano López é cercado e morto à beira de um riacho.', { x: 80, y: 80, w: 760 });
    const q = seg(t, 5, 6); if (q > 0) { ctx.globalAlpha = q * .9; ctx.fillStyle = C.ink; ctx.fillRect(W / 2 - 520, 660, 1040, 180); ctx.globalAlpha = 1; txt('“Muero con mi patria.”', W / 2, 730, { size: 60, weight: 900, al: 'center', color: C.paper, alpha: q }); txt('“Morro com a minha pátria”, segundo a tradição', W / 2, 800, { size: 26, weight: 500, fam: 'IBM Plex Mono', color: C.gold, al: 'center', alpha: q }); }
    vignette(.4); } },
]);

// ======== CAP 9: A CONTA (51s) ========
const T9 = TAG(9, 'A CONTA', '1870');
sec('09-conta', [
  { d: 4, draw: (t, d) => titleCard(t, d, '9', 'A CONTA', '1870') },
  { d: 16, draw: (t, d) => { paperBg(C.paper2); grainLines(16); const a = fadeIO(t, d); drawFlag(160, 200, 150, 96, 'BR', t * 2); txt('BRASIL', 340, 248, { size: 56, weight: 900, alpha: a, spacing: 4 });
    for (let r = 0; r < 4; r++) for (let i = 0; i < 14; i++) { const k = r * 14 + i, aa = seg(t, .8 + k * .05, 1.2 + k * .05) * a; if (aa <= 0) continue; ctx.save(); ctx.globalAlpha = aa; ctx.fillStyle = C.muted; ctx.fillRect(180 + i * 62, 420 + r * 80, 10, 50); ctx.fillRect(167 + i * 62, 434 + r * 80, 36, 10); ctx.restore(); }
    txt('cerca de 50 mil mortos', 620, 790, { size: 54, weight: 900, al: 'center', alpha: a * seg(t, 3.5, 4.2), color: C.red }); txt('boa parte por doença (estimativa mais citada)', 620, 850, { size: 26, weight: 500, fam: 'IBM Plex Mono', al: 'center', alpha: a * seg(t, 4, 4.6) });
    const b = seg(t, 8, 8.8) * a; iconBox(1460, 520, 1.6, 'coin', b); txt('dívida com bancos britânicos', 1460, 760, { size: 38, weight: 800, al: 'center', alpha: b }); T9(t); vignette(.2); } },
  { d: 19, draw: (t, d) => { paperBg(C.paper); grainLines(17); const a = fadeIO(t, d); drawFlag(160, 200, 150, 96, 'PY', t * 2); txt('PARAGUAI', 340, 248, { size: 56, weight: 900, alpha: a, spacing: 4 });
    txt('Quanto da população o país perdeu?', 160, 380, { size: 44, weight: 800, alpha: a });
    const x0 = 200, x1 = 1720, y = 580, X = p => lerp(x0, x1, p / 100); ctx.fillStyle = C.paper2; ctx.fillRect(x0, y - 40, x1 - x0, 80); ctx.strokeStyle = C.ink; ctx.lineWidth = 3; ctx.strokeRect(x0, y - 40, x1 - x0, 80);
    [0, 25, 50, 75, 100].forEach(p => { txt(p + '%', X(p), y + 80, { size: 26, fam: 'IBM Plex Mono', weight: 500, al: 'center', alpha: a, color: C.muted }); });
    const band = seg(t, 2, 5); if (band > 0) { const xa = X(15), xb = lerp(X(15), X(65), band); const g = ctx.createLinearGradient(xa, 0, X(65), 0); g.addColorStop(0, 'rgba(179,38,30,.45)'); g.addColorStop(1, 'rgba(179,38,30,.95)'); ctx.fillStyle = g; ctx.fillRect(xa, y - 40, xb - xa, 80); }
    const l1 = seg(t, 5, 5.6) * a, l2 = seg(t, 6.5, 7.1) * a; ctx.fillStyle = C.ink; ctx.globalAlpha = l1; ctx.fillRect(X(15) - 2, y - 80, 4, 40); ctx.globalAlpha = l2; ctx.fillRect(X(65) - 2, y - 80, 4, 40); ctx.globalAlpha = 1;
    txt('~15%', X(15), y - 110, { size: 40, weight: 900, al: 'center', alpha: l1 }); txt('estimativas mais baixas', X(15), y - 155, { size: 24, weight: 600, al: 'center', alpha: l1 });
    txt('60%+', X(65), y - 110, { size: 40, weight: 900, al: 'center', alpha: l2, color: C.red }); txt('estimativas mais altas', X(65), y - 155, { size: 24, weight: 600, al: 'center', alpha: l2 });
    caption(t, 9, 'Os historiadores não concordam', 'Sem censos confiáveis, as estimativas variam muito. Em qualquer cenário, uma geração inteira de homens desapareceu.', { x: 460, y: 760, w: 1000 }); T9(t); vignette(.2); } },
  { d: 12, draw: (t, d) => { drawMap(t, d, { view: [[-62.5, -28.5], [-53.0, -19.5]], hi: [{ c: 'PY', from: 0, alpha: .35 }], ellipses: [{ p: [-57.0, -21.6], rx: 90, ry: 50, at: 1.5, color: C.blue, label: 'para o Brasil' }, { p: [-59.6, -25.0], rx: 130, ry: 70, at: 3, color: '#4A7AA8', label: 'para a Argentina' }, { p: [-54.8, -27.0], rx: 70, ry: 80, at: 3.6, color: '#4A7AA8' }], labels: [{ s: 'territórios disputados', p: [-55.2, -25.4], at: 5, size: 28, color: C.ink }] });
    caption(t, 6.5, 'Ocupação até 1876', 'Tropas brasileiras ficaram no Paraguai até 1876. O país também perdeu territórios que disputava com os vizinhos.', { y: 760, w: 640 }); T9(t); watermark(); } },
]);
