// Os dois lados, E o Brasil?, Fechamento
const TL = (t) => chapterTag(t, 'OS DOIS LADOS', 'O DEBATE DOS HISTORIADORES');
function book(x, y, w, h, col, title, author, a) { if (a <= 0) return; ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = col; ctx.fillRect(x, y, w, h); ctx.fillStyle = 'rgba(0,0,0,.2)'; ctx.fillRect(x, y, 14, h); ctx.restore(); para(title, x + 34, y + 70, w - 60, { size: 36, weight: 900, color: C.paper, alpha: a }); txt(author, x + 34, y + h - 50, { size: 22, weight: 500, fam: 'IBM Plex Mono', color: C.gold, alpha: a }); }
sec('10-dois-lados', [
  { d: 4, draw: (t, d) => titleCard(t, d, '', 'OS DOIS LADOS', 'POR QUE ATÉ HOJE SE DISCUTE ESSA GUERRA') },
  { d: 24, draw: (t, d) => { paperBg(C.paper2); grainLines(18); const a = fadeIO(t, d);
    txt('VERSÃO 1', 160, 230, { size: 34, weight: 900, color: C.red, alpha: a, spacing: 6 }); txt('“A Inglaterra provocou a guerra”', 160, 290, { size: 48, weight: 900, alpha: a }); txt('popular no Brasil nos anos 1970 e 80', 160, 345, { size: 26, weight: 500, fam: 'IBM Plex Mono', alpha: a, color: C.muted });
    const up = seg(t, 2, 3.5); drawFlag(1240, 150 - 60 * (1 - up), 200, 130, 'UK', t * 2); ctx.save(); ctx.globalAlpha = up; ctx.strokeStyle = C.ink; ctx.lineWidth = 2; [[1080, 600], [1520, 600]].forEach(([x, y]) => { ctx.beginPath(); ctx.moveTo(1340, 280); ctx.lineTo(x - 20, y); ctx.moveTo(1340, 280); ctx.lineTo(x + 20, y); ctx.stroke(); }); ctx.restore();
    const sway = Math.sin(t * 1.5) * 8; person(1080 + sway, 1000, 1.7, { ...CHAR.pedro, arm: 'point', flip: false }); person(1520 - sway, 1000, 1.7, { ...CHAR.mitre, arm: 'point', flip: true });
    txt('Brasil', 1080, 1040, { size: 26, weight: 800, al: 'center', alpha: a }); txt('Argentina', 1520, 1040, { size: 26, weight: 800, al: 'center', alpha: a });
    caption(t, 6, null, 'Os ingleses teriam usado Brasil e Argentina para destruir um Paraguai próspero e independente.', { x: 160, y: 470, w: 760 });
    caption(t, 13, null, 'Essa ideia apareceu em livros didáticos por muitos anos.', { x: 160, y: 740, w: 760 }); TL(t); vignette(.2); } },
  { d: 26, draw: (t, d) => { paperBg(C.paper); grainLines(19); const a = fadeIO(t, d);
    txt('VERSÃO 2', 160, 230, { size: 34, weight: 900, color: C.blue, alpha: a, spacing: 6 }); txt('O que os arquivos mostraram', 160, 290, { size: 48, weight: 900, alpha: a }); txt('pesquisas a partir dos anos 1990', 160, 345, { size: 26, weight: 500, fam: 'IBM Plex Mono', alpha: a, color: C.muted });
    book(1140, 200, 300, 400, C.red, 'Maldita Guerra', 'F. Doratioto · 2002', seg(t, 2, 2.6) * a); book(1500, 230, 300, 400, C.blue, 'The Paraguayan War', 'T. Whigham · 2002', seg(t, 3, 3.6) * a);
    txt('A guerra nasceu principalmente de disputas da própria região:', 160, 460, { size: 32, weight: 700, alpha: a * seg(t, 6, 6.6) });
    checklist(t, ['o controle dos rios', 'a política do Uruguai', 'as ambições de cada governo, incluindo López'], 160, 570, { at: 7, step: 1.6, size: 38 });
    caption(t, 14, null, 'Os pesquisadores não encontraram documentos que sustentassem a tese da Inglaterra.', { x: 1100, y: 700, w: 720 }); TL(t); vignette(.2); } },
  { d: 20, draw: (t, d) => { paperBg(C.paper2); grainLines(20); const a = fadeIO(t, d); const tilt = Math.sin(t * .8) * .03;
    ctx.save(); ctx.globalAlpha = a; ctx.translate(W / 2, 360); ctx.fillStyle = C.ink; ctx.fillRect(-8, 0, 16, 440); ctx.fillRect(-120, 430, 240, 20); ctx.rotate(tilt); ctx.fillRect(-460, -6, 920, 12); ctx.strokeStyle = C.ink; ctx.lineWidth = 3; [-440, 440].forEach(x => { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x - 120, 220); ctx.moveTo(x, 0); ctx.lineTo(x + 120, 220); ctx.stroke(); ctx.fillStyle = C.paper; ctx.beginPath(); ctx.ellipse(x, 225, 140, 24, 0, 0, 7); ctx.fill(); ctx.stroke(); }); ctx.restore();
    txt('violências dos aliados', W / 2 - 440, 650, { size: 32, weight: 800, al: 'center', alpha: a * seg(t, 1, 1.6), halo: C.paper2 }); txt('principalmente no fim da guerra', W / 2 - 440, 690, { size: 22, weight: 500, fam: 'IBM Plex Mono', al: 'center', alpha: a * seg(t, 1, 1.6) });
    txt('regime duríssimo de López', W / 2 + 440, 650, { size: 32, weight: 800, al: 'center', alpha: a * seg(t, 2.5, 3.1), halo: C.paper2 }); txt('com o próprio povo', W / 2 + 440, 690, { size: 22, weight: 500, fam: 'IBM Plex Mono', al: 'center', alpha: a * seg(t, 2.5, 3.1) });
    bigTitle('Ninguém sai como herói', W / 2, 200, 70, a * seg(t, .3, 1));
    caption(t, 8, null, 'Para a maioria dos historiadores, foi uma tragédia construída aqui mesmo, pelos interesses e erros de quem governava a região.', { x: 360, y: 880, w: 1200 }); TL(t); vignette(.2); } },
  { d: 12, draw: (t, d) => { paperBg(C.ink); const a = fadeIO(t, d); const bob = Math.sin(t * 2) * 6;
    ctx.save(); ctx.globalAlpha = a; ctx.translate(W / 2, 380 + bob); ctx.fillStyle = C.paper; ctx.beginPath(); ctx.roundRect(-260, -150, 520, 260, 30); ctx.fill(); ctx.beginPath(); ctx.moveTo(-120, 108); ctx.lineTo(-170, 190); ctx.lineTo(-40, 108); ctx.fill(); ctx.fillStyle = C.ink; [-120, 0, 120].forEach(x => { ctx.beginPath(); ctx.arc(x, -20, 22, 0, 7); ctx.fill(); }); ctx.restore();
    bigTitle('E você?', W / 2, 720, 90, a, { color: C.gold }); txt('Aprendeu a versão 1 na escola? Conta nos comentários.', W / 2, 820, { size: 40, weight: 600, color: C.paper, al: 'center', alpha: a * seg(t, 1, 1.6) }); } },
]);

const TH = (t) => chapterTag(t, 'E O BRASIL?', 'DEPOIS DA GUERRA');
sec('11-e-o-brasil', [
  { d: 4, draw: (t, d) => titleCard(t, d, '', 'E O BRASIL?', 'O QUE A GUERRA MUDOU') },
  { d: 14, draw: (t, d) => { sky('#D8CFBA', '#EADFC8'); ground(820, '#C9B98E'); const a = fadeIO(t, d); const g = seg(t, 3, 7); const n = Math.round(lerp(3, 16, g));
    for (let i = 0; i < n; i++) { const r = Math.floor(i / 8), c = i % 8; person(560 + c * 110 + r * 40, 900 + r * 70, 1, { ...CHAR.solBR, walk: t * 5 + i }); }
    ctx.save(); ctx.globalAlpha = a * seg(t, 5, 6); drawFlag(380, 470, 130, 86, 'BR', t * 3); ctx.restore();
    iconBox(240, 320, 1, 'kepi', a); txt('O EXÉRCITO', 400, 300, { size: 52, weight: 900, alpha: a, spacing: 3 }); txt('entrou pequeno e desprezado…', 400, 360, { size: 30, weight: 600, alpha: a });
    caption(t, 7.5, null, '…e saiu grande, orgulhoso e insatisfeito com o governo imperial. Os oficiais passaram a se ver como força política.', { x: 1080, y: 140, w: 760 }); TH(t); vignette(.2); } },
  { d: 16, draw: (t, d) => { paperBg(C.paper); grainLines(21); const a = fadeIO(t, d); iconBox(240, 260, 1, 'chain', a); txt('A ESCRAVIDÃO', 400, 240, { size: 52, weight: 900, alpha: a, spacing: 3 }); txt('ficou difícil de justificar depois da guerra', 400, 300, { size: 30, weight: 600, alpha: a });
    timeline(t, [{ y: '1866', label: 'escravizados libertados para lutar', at: 2, pos: .05, color: C.muted }, { y: '1871', label: 'Lei do Ventre Livre', at: 5, pos: .5 }, { y: '1888', label: 'Abolição', at: 8, pos: .95, color: C.green }], { x0: 260, x1: 1660, y: 640, alt: false, lw: 380 }); TH(t); vignette(.2); } },
  { d: 18, draw: (t, d) => { const sw = seg(t, 9, 10); if (t < 10) { paperBg(C.paper2); grainLines(22); const a = fadeIO(t, 10, .6, .6); ctx.globalAlpha = a; person(W * .6, 1060, 3.1, { ...CHAR.deodoro, arm: 'sword' }); ctx.globalAlpha = 1; lowerThird(t, .5, 'Marechal Deodoro da Fonseca', 'VETERANO DA GUERRA DO PARAGUAI'); bigTitle('15 DE NOVEMBRO DE 1889', 520, 260, 54, a * seg(t, 2, 2.6), { color: C.red }); txt('Proclamação da República', 520, 330, { size: 36, weight: 700, al: 'center', alpha: a * seg(t, 2.4, 3) }); vignette(.2); }
    else { const tt = t - 10; sky('#B9C6C8', '#E2D8C2'); river(620, 460, t); const a = fadeIO(tt, 8, .6, .6); const x = lerp(900, 1500, lin(tt, 0, 8)); ship(x, 760, 1.2, { t, wave: t * 3 }); ctx.save(); ctx.translate(x - 60, 640); person(0, 0, .7, { ...CHAR.pedroOld }); ctx.restore(); caption(tt, .5, 'Exílio', 'Dom Pedro II, o “Voluntário Número Um”, deixa o Brasil.', { x: 80, y: 80, w: 680 }); vignette(.25); } TH(t); } },
  { d: 6, draw: (t, d) => quoteCard(t, d, 'A guerra que o Império venceu ajudou a acabar com o próprio Império.', null, { bg: C.paper }) },
]);

sec('12-fechamento', [
  { d: 8, draw: (t, d) => { paperBg(C.paper); grainLines(23); const a = fadeIO(t, d); bigTitle('A GUERRA DO PARAGUAI', W / 2, 180, 72, a, { spacing: 4 }); txt('1864 – 1870', W / 2, 250, { size: 34, weight: 500, fam: 'IBM Plex Mono', al: 'center', color: C.red, alpha: a, spacing: 6 });
    timeline(t, [{ y: '1864', label: 'Uruguai e invasão do Mato Grosso', at: .4, pos: 0 }, { y: '1865', label: 'Tríplice Aliança, Riachuelo e Uruguaiana', at: 1.2, pos: .2 }, { y: '1866', label: 'Tuiuti e Curupaiti', at: 2, pos: .4 }, { y: '1868', label: 'Humaitá e a Dezembrada', at: 2.8, pos: .6 }, { y: '1869', label: 'Assunção e a Cordilheira', at: 3.6, pos: .8 }, { y: '1870', label: 'Cerro Corá', at: 4.4, pos: 1 }], { x0: 220, x1: 1700, y: 600, lw: 230 }); vignette(.2); } },
  { d: 11, draw: (t, d) => { paperBg(C.ink); const a = fadeIO(t, d, .6, 1); txt('PRÓXIMO VÍDEO', 160, 240, { size: 34, weight: 500, fam: 'IBM Plex Mono', color: C.gold, alpha: a, spacing: 6 }); para('A história INTEIRA do Império Romano', 160, 340, 900, { size: 88, weight: 900, color: C.paper, alpha: a * seg(t, .4, 1), lh: 100 }); txt('de uma vila de pastores ao maior império do mundo antigo', 160, 700, { size: 32, weight: 500, color: C.paper2, alpha: a * seg(t, 1, 1.6) });
    ctx.save(); ctx.globalAlpha = a; person(1460, 980, 2.6, { coat: '#9A2A22', pants: '#C9A66B', skin: C.skin, hat: 'none', hair: '#3A2A1A', buttons: false, sash: C.gold, sword: true, arm: 'sword' }); ctx.translate(1460, 980); ctx.scale(2.6, 2.6); ctx.fillStyle = '#C9A227'; ctx.beginPath(); ctx.arc(0, -168, 24, Math.PI, 0); ctx.fill(); ctx.fillStyle = C.red; ctx.beginPath(); ctx.ellipse(0, -198, 30, 10, 0, 0, 7); ctx.fill(); ctx.restore(); } },
  { d: 8, draw: (t, d) => { paperBg(C.paper); const a = fadeIO(t, d, .5, .6); logoClock(W / 2, 380, 120, a, t); bigTitle('CONTEXTÃO', W / 2, 620, 110, a, { spacing: 8 }); txt('A HISTÓRIA INTEIRA, SEM PULAR NADA', W / 2, 720, { size: 32, weight: 500, fam: 'IBM Plex Mono', al: 'center', color: C.red, alpha: a * seg(t, .6, 1.2), spacing: 4 }); vignette(.18); } },
]);
