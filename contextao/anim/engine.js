// Contextão — motor de cenas (canvas 1920x1080, tempo determinístico)
const W = 1920, H = 1080;
const cv = document.getElementById('c'), ctx = cv.getContext('2d');
const C = {
  paper: '#EFE4CF', paper2: '#E4D5B7', land: '#E8D9B9', sea: '#D9D2BE', ink: '#1E1B16', muted: '#6B5E4A',
  red: '#B3261E', gold: '#C9A227', water: '#5B7F95', waterD: '#3E6076', night: '#1B2430', night2: '#26354A',
  blue: '#2F4A7A', pyRed: '#B5382B', white: '#F4EFE4', skin: '#E2B48C', skin2: '#B9835A', skin3: '#7A5034',
  green: '#2E6B3A', yellow: '#E2B33C', grass: '#B9B27A', mud: '#7D6A4A', grey: '#8A8273'
};
const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
const ease = x => { x = clamp(x); return x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; };
const seg = (t, a, b) => ease((t - a) / (b - a));
const lin = (t, a, b) => clamp((t - a) / (b - a));
const lerp = (a, b, f) => a + (b - a) * f;
const fadeIO = (t, d, fi = .6, fo = .6) => Math.min(seg(t, 0, fi), 1 - seg(t, d - fo, d));

// ---------- texto ----------
function font(size, weight = 700, fam = 'Archivo') { return `${weight} ${size}px "${fam}", "Arial Narrow", sans-serif`; }
function txt(s, x, y, o = {}) {
  const { size = 28, weight = 700, color = C.ink, al = 'left', fam = 'Archivo', alpha = 1, spacing = 0, base = 'middle', halo = null, haloW = 7 } = o;
  if (alpha <= 0) return;
  ctx.save(); ctx.globalAlpha *= alpha; ctx.font = font(size, weight, fam); ctx.textAlign = al; ctx.textBaseline = base;
  if (spacing) ctx.letterSpacing = spacing + 'px';
  if (halo) { ctx.lineWidth = haloW; ctx.strokeStyle = halo; ctx.lineJoin = 'round'; ctx.strokeText(s, x, y); }
  ctx.fillStyle = color; ctx.fillText(s, x, y); ctx.restore();
}
function wrap(s, maxW, size, weight = 500, fam = 'Archivo') {
  ctx.save(); ctx.font = font(size, weight, fam); const words = s.split(' '); const lines = []; let cur = '';
  for (const w of words) { const t2 = cur ? cur + ' ' + w : w; if (ctx.measureText(t2).width > maxW && cur) { lines.push(cur); cur = w; } else cur = t2; }
  if (cur) lines.push(cur); ctx.restore(); return lines;
}
function para(s, x, y, maxW, o = {}) {
  const size = o.size || 30, lh = o.lh || size * 1.3; const lines = wrap(s, maxW, size, o.weight || 500, o.fam);
  lines.forEach((l, i) => txt(l, x, y + i * lh, { ...o, size })); return lines.length * lh;
}
function textW(s, size, weight = 700, fam = 'Archivo', spacing = 0) { ctx.save(); ctx.font = font(size, weight, fam); if (spacing) ctx.letterSpacing = spacing + 'px'; const w = ctx.measureText(s).width; ctx.restore(); return w; }

// ---------- fundo e moldura ----------
function paperBg(col = C.paper) { ctx.fillStyle = col; ctx.fillRect(0, 0, W, H); }
function vignette(a = .28) { const g = ctx.createRadialGradient(W / 2, H / 2, H * .2, W / 2, H / 2, H * .95); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, `rgba(60,40,10,${a})`); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); }
function grainLines(seed = 1) { ctx.save(); ctx.globalAlpha = .05; ctx.strokeStyle = C.ink; ctx.lineWidth = 1; for (let i = 0; i < 40; i++) { const y = ((i * 97 + seed * 31) % H); ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y + ((i * 13) % 7) - 3); ctx.stroke(); } ctx.restore(); }
function watermark(a = 1) { txt('CONTEXTÃO', W - 80, 90, { size: 30, weight: 900, color: C.ink, al: 'right', alpha: .5 * a, spacing: 3 }); }
function chapterTag(t, title, sub) {
  const a = seg(t, .2, .9); if (a <= 0) return;
  const w = Math.max(textW(title, 40, 900, 'Archivo', 2), textW(sub, 20, 500, 'IBM Plex Mono', 3)) + 52;
  ctx.globalAlpha = a; ctx.fillStyle = C.ink; ctx.fillRect(80, 70, w, 92); ctx.globalAlpha = 1;
  txt(title, 104, 104, { size: 40, weight: 900, color: C.paper, alpha: a, spacing: 2 });
  txt(sub, 106, 140, { size: 20, weight: 500, color: C.gold, fam: 'IBM Plex Mono', alpha: a, spacing: 3 });
}
function caption(t, t0, title, body, o = {}) {
  const a = seg(t, t0, t0 + .7); if (a <= 0) return;
  const x = o.x ?? 80, w = o.w ?? 620, yb = o.y ?? 760;
  const lines = body ? wrap(body, w - 60, 28, 500) : [];
  const h = (title ? 70 : 30) + lines.length * 38 + 20;
  const y = Math.min(yb, 905 - h) + 18 * (1 - a);
  ctx.globalAlpha = a * .94; ctx.fillStyle = C.ink; ctx.fillRect(x, y, w, h); ctx.globalAlpha = 1;
  if (title) txt(title, x + 30, y + 42, { size: 36, weight: 900, color: C.gold, alpha: a });
  lines.forEach((l, i) => txt(l, x + 30, y + (title ? 92 : 36) + i * 38, { size: 28, weight: 500, color: C.paper, alpha: a }));
}
function lowerThird(t, t0, name, role) {
  const a = seg(t, t0, t0 + .6); if (a <= 0) return;
  const w = Math.max(textW(name, 40, 900), textW(role, 22, 500, 'IBM Plex Mono')) + 70;
  const x = 80 - 30 * (1 - a), y = 770;
  ctx.globalAlpha = a; ctx.fillStyle = C.ink; ctx.fillRect(x, y, w, 112); ctx.fillStyle = C.gold; ctx.fillRect(x, y, 8, 112); ctx.globalAlpha = 1;
  txt(name, x + 34, y + 42, { size: 40, weight: 900, color: C.paper, alpha: a });
  txt(role, x + 36, y + 84, { size: 22, weight: 500, color: C.gold, fam: 'IBM Plex Mono', alpha: a });
}
function footnote(s, a = 1) { txt(s, W - 80, 128, { size: 16, weight: 500, color: C.muted, al: 'right', fam: 'IBM Plex Mono', alpha: a }); }
function bigTitle(s, x, y, size, a, o = {}) { txt(s, x, y, { size, weight: 900, color: o.color || C.ink, al: o.al || 'center', alpha: a, spacing: o.spacing ?? 2, halo: o.halo }); }

// ---------- mapa ----------
let GEO = null;
const COUNTRY = { BR: '076', AR: '032', UY: '858', PY: '600', BO: '068', CL: '152' };
const PLACES = {
  rio: [-43.2, -22.9], ba: [-58.38, -34.6], mvd: [-56.16, -34.9], asu: [-57.63, -25.28], cuiaba: [-56.1, -15.6], corumba: [-57.65, -19.0],
  humaita: [-58.5, -27.07], curupaiti: [-58.56, -27.13], tuiuti: [-58.37, -27.24], passo: [-58.57, -27.32], corrientes: [-58.83, -27.47], riachuelo: [-58.78, -27.58],
  uruguaiana: [-57.08, -29.75], saoborja: [-56.0, -28.66], concepcion: [-57.43, -23.41], dourados: [-54.8, -22.22], villeta: [-57.56, -25.5], itororo: [-57.5, -25.45], avai: [-57.52, -25.58], lomas: [-57.55, -25.53],
  piribebuy: [-56.93, -25.47], acosta: [-56.85, -25.36], cerrocora: [-55.95, -22.65], encarnacion: [-55.87, -27.33], salto: [-57.96, -31.38], paysandu: [-58.08, -32.32], portoalegre: [-51.22, -30.03]
};
const RIVER_ROUTE = [[-43.2, -22.9], [-42.6, -23.6], [-44.5, -25.2], [-47.6, -27.3], [-49.6, -30.2], [-52.2, -33.6], [-54.6, -35.4], [-56.8, -35.3], [-58.0, -34.75], [-58.6, -34.0], [-59.6, -33.6], [-60.6, -32.9], [-60.55, -31.7], [-59.6, -29.9], [-59.1, -28.6], [-58.8, -27.5], [-58.6, -27.3], [-58.5, -27.07], [-58.3, -26.86], [-57.95, -26.0], [-57.63, -25.28], [-57.55, -24.4], [-57.43, -23.4], [-57.75, -22.6], [-57.88, -21.7], [-57.9, -20.3], [-57.65, -19.0], [-57.3, -18.1], [-56.7, -17.2], [-56.1, -15.6]];
const VIEW = { sa: [[-82, -56], [-34, 12]], basin: [[-65, -36.5], [-41, -14]], south: [[-61.5, -32], [-53, -24]], humaita: [[-59.4, -27.7], [-57.7, -26.6]], asu: [[-58.6, -26.4], [-55.6, -22.0]], uy: [[-60.5, -35.3], [-51.5, -28.5]], mt: [[-60.5, -26.5], [-52, -14.5]] };
function lerpView(a, b, f) { return [[lerp(a[0][0], b[0][0], f), lerp(a[0][1], b[0][1], f)], [lerp(a[1][0], b[1][0], f), lerp(a[1][1], b[1][1], f)]]; }
function makeProj(view, ext = [[80, 40], [1840, 1040]]) { return d3.geoMercator().fitExtent(ext, { type: 'MultiPoint', coordinates: view }); }
function lineLen(p) { let L = 0; for (let i = 1; i < p.length; i++) L += Math.hypot(p[i][0] - p[i - 1][0], p[i][1] - p[i - 1][1]); return L; }
function partial(p, f) { if (f >= 1) return p; const L = lineLen(p) * f; let acc = 0, out = [p[0]]; for (let i = 1; i < p.length; i++) { const d = Math.hypot(p[i][0] - p[i - 1][0], p[i][1] - p[i - 1][1]); if (acc + d >= L) { const r = (L - acc) / (d || 1); out.push([p[i - 1][0] + (p[i][0] - p[i - 1][0]) * r, p[i - 1][1] + (p[i][1] - p[i - 1][1]) * r]); return out; } acc += d; out.push(p[i]); } return out; }
function poly(p) { ctx.beginPath(); p.forEach((q, i) => i ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1])); }
function smooth(pts, n = 8) { // catmull-rom
  if (pts.length < 3) return pts; const out = [];
  for (let i = 0; i < pts.length - 1; i++) { const p0 = pts[i - 1] || pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] || p2;
    for (let k = 0; k < n; k++) { const t = k / n, t2 = t * t, t3 = t2 * t; out.push([0, 1].map(j => .5 * ((2 * p1[j]) + (-p0[j] + p2[j]) * t + (2 * p0[j] - 5 * p1[j] + 4 * p2[j] - p3[j]) * t2 + (-p0[j] + 3 * p1[j] - 3 * p2[j] + p3[j]) * t3))); } }
  out.push(pts[pts.length - 1]); return out;
}
function arrowHead(p, q, size, color) { const ang = Math.atan2(q[1] - p[1], q[0] - p[0]); ctx.save(); ctx.translate(q[0], q[1]); ctx.rotate(ang); ctx.fillStyle = color; ctx.beginPath(); ctx.moveTo(size, 0); ctx.lineTo(-size * .8, size * .75); ctx.lineTo(-size * .8, -size * .75); ctx.closePath(); ctx.fill(); ctx.restore(); }

// MAPA: cfg {view, view2, hi:[{c:'PY',color,from,to,alpha}], rivers:{from,to}, cities:[{p,label,at,dx,dy,al}], arrows:[{pts,color,from,to,width,label,lp}], markers:[{p,at,kind,label,dx,dy,al}], labels:[{s,p,at,size,color,rot}], countryNames:true, ellipses:[{p,rx,ry,at,color,label}], route:{pts,from,to}}
function drawMap(t, d, cfg) {
  const f = seg(t, cfg.camFrom ?? 0, cfg.camTo ?? d);
  const view = cfg.view2 ? lerpView(VIEW[cfg.view] || cfg.view, VIEW[cfg.view2] || cfg.view2, f) : (VIEW[cfg.view] || cfg.view);
  const proj = makeProj(view); const path = d3.geoPath(proj, ctx);
  ctx.fillStyle = cfg.night ? '#2A3140' : C.sea; ctx.fillRect(0, 0, W, H);
  ctx.save(); ctx.globalAlpha = .3; ctx.strokeStyle = C.muted; ctx.lineWidth = .8; ctx.setLineDash([4, 6]); ctx.beginPath(); path(d3.geoGraticule().step([5, 5])()); ctx.stroke(); ctx.setLineDash([]); ctx.restore();
  ctx.fillStyle = cfg.night ? '#4A4E55' : C.land; ctx.beginPath(); path(GEO.land); ctx.fill(); ctx.strokeStyle = C.muted; ctx.lineWidth = 1.4; ctx.stroke();
  (cfg.hi || []).forEach(h => { const a = (h.alpha ?? .5) * seg(t, h.from ?? 0, (h.from ?? 0) + .8) * (h.to ? 1 - seg(t, h.to, h.to + .6) : 1); if (a <= 0) return;
    const feat = GEO.countries.find(c => c.id === COUNTRY[h.c]); ctx.globalAlpha = a; ctx.fillStyle = h.color || C.red; ctx.beginPath(); path(feat); ctx.fill(); ctx.globalAlpha = Math.min(1, a * 2); ctx.strokeStyle = h.color || C.red; ctx.lineWidth = 3; ctx.stroke(); ctx.globalAlpha = 1; });
  ctx.strokeStyle = C.muted; ctx.globalAlpha = .7; ctx.lineWidth = 1.2; ctx.setLineDash([7, 5]); ctx.beginPath(); path(GEO.mesh); ctx.stroke(); ctx.setLineDash([]); ctx.globalAlpha = 1;
  if (cfg.rivers !== false) { const rf = cfg.rivers ? seg(t, cfg.rivers.from, cfg.rivers.to) : 1; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.strokeStyle = C.water; ctx.lineWidth = 3;
    Object.values(GEO.rivers).forEach(ls => ls.forEach(l => { const pts = l.map(p => proj(p)); poly(partial(pts, rf)); ctx.stroke(); })); }
  (cfg.ellipses || []).forEach(e => { const a = seg(t, e.at, e.at + .7); if (a <= 0) return; const p = proj(e.p); ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = e.color || C.red; ctx.lineWidth = 4; ctx.setLineDash([12, 8]); ctx.beginPath(); ctx.ellipse(p[0], p[1], e.rx * (0.8 + .2 * a), e.ry * (0.8 + .2 * a), 0, 0, 7); ctx.stroke(); ctx.restore();
    if (e.label) txt(e.label, p[0], p[1] - e.ry - 22, { size: 28, weight: 900, color: e.color || C.red, al: 'center', alpha: a, halo: C.paper, spacing: 2 }); });
  if (cfg.countryNames !== false) {
    const N = [['BRASIL', [-50.5, -17.5], 46], ['ARGENTINA', [-63.2, -30.5], 38], ['URUGUAI', [-55.9, -32.7], 24], ['BOLÍVIA', [-63.5, -16.5], 30], ['PARAGUAI', [-58.6, -23.0], 30]];
    N.forEach(([n, c, s]) => { if (cfg.skipNames && cfg.skipNames.includes(n)) return; const p = proj(c); txt(n, p[0], p[1], { size: s * (cfg.nameScale || 1), weight: 800, color: C.muted, al: 'center', alpha: .85 * seg(t, .3, 1.2), spacing: 6 }); });
  }
  if (cfg.route) { const rf = seg(t, cfg.route.from, cfg.route.to); if (rf > 0) { const pp = partial(cfg.route.pts.map(p => proj(p)), rf); ctx.strokeStyle = 'rgba(30,27,22,.25)'; ctx.lineWidth = 9; poly(pp); ctx.stroke(); ctx.strokeStyle = C.gold; ctx.lineWidth = 5; ctx.setLineDash([14, 10]); poly(pp); ctx.stroke(); ctx.setLineDash([]); const h = pp[pp.length - 1]; ctx.fillStyle = C.ink; ctx.beginPath(); ctx.arc(h[0], h[1], 11, 0, 7); ctx.fill(); ctx.fillStyle = C.gold; ctx.beginPath(); ctx.arc(h[0], h[1], 6, 0, 7); ctx.fill(); } }
  (cfg.arrows || []).forEach(ar => { const af = seg(t, ar.from, ar.to); if (af <= 0) return; const pts = smooth(ar.pts.map(p => proj(p)), 10); const pp = partial(pts, af); const col = ar.color || C.red;
    ctx.lineCap = 'round'; ctx.strokeStyle = 'rgba(30,27,22,.25)'; ctx.lineWidth = (ar.width || 10) + 6; poly(pp); ctx.stroke(); ctx.strokeStyle = col; ctx.lineWidth = ar.width || 10; poly(pp); ctx.stroke();
    if (pp.length > 1) arrowHead(pp[pp.length - 2], pp[pp.length - 1], (ar.width || 10) * 2.2, col);
    if (ar.label) { const lp = proj(ar.lp || ar.pts[Math.floor(ar.pts.length / 2)]); txt(ar.label, lp[0] + (ar.dx || 0), lp[1] + (ar.dy || 0), { size: ar.ls || 26, weight: 800, color: col, al: ar.al || 'center', alpha: seg(t, ar.to - .3, ar.to + .4), halo: C.paper }); } });
  (cfg.cities || []).forEach(c => { const a = seg(t, c.at ?? 0, (c.at ?? 0) + .5); if (a <= 0) return; const p = proj(PLACES[c.p] || c.p); ctx.globalAlpha = a; ctx.fillStyle = C.ink; ctx.beginPath(); ctx.arc(p[0], p[1], 8, 0, 7); ctx.fill(); ctx.fillStyle = C.paper; ctx.beginPath(); ctx.arc(p[0], p[1], 3.5, 0, 7); ctx.fill(); ctx.globalAlpha = 1;
    txt(c.label, p[0] + (c.dx ?? 16), p[1] + (c.dy ?? 4), { size: c.size || 26, weight: 700, al: c.al || 'left', alpha: a, halo: C.paper }); });
  (cfg.markers || []).forEach(m => { const a = seg(t, m.at, m.at + .5); if (a <= 0) return; const p = proj(PLACES[m.p] || m.p); const pulse = 1 + .15 * Math.sin((t - m.at) * 5) * (1 - lin(t, m.at, m.at + 3));
    ctx.save(); ctx.translate(p[0], p[1]); ctx.scale(a * pulse, a * pulse);
    if (m.kind === 'battle') { ctx.fillStyle = C.red; ctx.strokeStyle = C.paper; ctx.lineWidth = 4; ctx.beginPath(); for (let i = 0; i < 16; i++) { const r = i % 2 ? 11 : 26, an = i * Math.PI / 8; ctx.lineTo(Math.cos(an) * r, Math.sin(an) * r); } ctx.closePath(); ctx.stroke(); ctx.fill(); }
    else if (m.kind === 'fort') { ctx.fillStyle = C.ink; ctx.strokeStyle = C.paper; ctx.lineWidth = 3; ctx.beginPath(); ctx.rect(-20, -14, 40, 28); ctx.fill(); ctx.stroke(); for (let i = -2; i <= 2; i += 2) ctx.fillRect(i * 8 - 4, -22, 8, 9); }
    else if (m.kind === 'ship') { ctx.fillStyle = C.blue; ctx.beginPath(); ctx.moveTo(-24, -4); ctx.lineTo(24, -4); ctx.lineTo(16, 10); ctx.lineTo(-16, 10); ctx.closePath(); ctx.fill(); ctx.fillStyle = C.ink; ctx.fillRect(-4, -20, 8, 16); }
    else { ctx.fillStyle = C.ink; ctx.beginPath(); ctx.arc(0, 0, 10, 0, 7); ctx.fill(); }
    ctx.restore(); if (m.label) txt(m.label, p[0] + (m.dx ?? 34), p[1] + (m.dy ?? 0), { size: m.size || 28, weight: 800, al: m.al || 'left', alpha: a, halo: C.paper, color: m.color || C.ink }); });
  (cfg.labels || []).forEach(l => { const a = seg(t, l.at ?? 0, (l.at ?? 0) + .6) * (l.out ? 1 - seg(t, l.out, l.out + .5) : 1); if (a <= 0) return; const p = proj(l.p); ctx.save(); ctx.translate(p[0], p[1]); ctx.rotate((l.rot || 0) * Math.PI / 180); txt(l.s, 0, 0, { size: l.size || 28, weight: l.weight || 800, color: l.color || C.ink, al: 'center', alpha: a, halo: C.paper, spacing: l.spacing || 0 }); ctx.restore(); });
  vignette(); if (cfg.note !== false) footnote(cfg.note || 'Fronteiras atuais, apenas para referência · posições aproximadas', seg(t, .5, 1.2));
  return proj;
}

// ---------- personagens ----------
// p: {coat, pants, hat:'kepi'|'bicorne'|'crown'|'top'|'cap'|'none', hatCol, beard:null|'full'|'mustache'|'chin'|'side', beardCol, hair, skin, epaulets, sash, rifle, sword, child, walk(phase), arm:'up'|'point'|'down'|'sword', bandana}
function person(x, y, s, p = {}) {
  const ph = p.walk ?? null; const sw = ph == null ? 0 : Math.sin(ph); const bob = ph == null ? 0 : Math.abs(Math.cos(ph)) * 3;
  ctx.save(); ctx.translate(x, y - bob * s / 2); ctx.scale(s * (p.flip ? -1 : 1), s); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const coat = p.coat || C.blue, pants = p.pants || C.white, skin = p.skin || C.skin;
  // pernas
  ctx.strokeStyle = pants; ctx.lineWidth = 14;
  ctx.beginPath(); ctx.moveTo(-8, -60); ctx.lineTo(-8 + sw * 14, 0); ctx.stroke(); ctx.beginPath(); ctx.moveTo(8, -60); ctx.lineTo(8 - sw * 14, 0); ctx.stroke();
  ctx.fillStyle = C.ink; ctx.beginPath(); ctx.ellipse(-8 + sw * 14 + 4, 2, 10, 5, 0, 0, 7); ctx.fill(); ctx.beginPath(); ctx.ellipse(8 - sw * 14 + 4, 2, 10, 5, 0, 0, 7); ctx.fill();
  // corpo
  ctx.fillStyle = coat; ctx.beginPath(); ctx.moveTo(-22, -128); ctx.quadraticCurveTo(-26, -90, -20, -56); ctx.lineTo(20, -56); ctx.quadraticCurveTo(26, -90, 22, -128); ctx.quadraticCurveTo(0, -136, -22, -128); ctx.fill();
  if (p.belt !== false) { ctx.fillStyle = C.ink; ctx.fillRect(-21, -76, 42, 6); }
  if (p.sash) { ctx.strokeStyle = p.sash; ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(-20, -126); ctx.lineTo(18, -70); ctx.stroke(); }
  if (p.buttons !== false) { ctx.fillStyle = C.gold; for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.arc(0, -120 + i * 12, 2.2, 0, 7); ctx.fill(); } }
  if (p.epaulets) { ctx.fillStyle = C.gold; ctx.beginPath(); ctx.ellipse(-24, -126, 11, 5, -.2, 0, 7); ctx.fill(); ctx.beginPath(); ctx.ellipse(24, -126, 11, 5, .2, 0, 7); ctx.fill(); }
  // braços
  ctx.strokeStyle = coat; ctx.lineWidth = 12;
  const armL = p.arm === 'up' ? [-34, -170] : p.arm === 'point' ? [-62, -128] : p.arm === 'sword' ? [-30, -175] : [-26 - sw * 10, -72];
  ctx.beginPath(); ctx.moveTo(-20, -124); ctx.lineTo(armL[0], armL[1]); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(20, -124); ctx.lineTo(26 + sw * 10, -72); ctx.stroke();
  ctx.fillStyle = skin; ctx.beginPath(); ctx.arc(armL[0], armL[1], 6, 0, 7); ctx.fill(); ctx.beginPath(); ctx.arc(26 + sw * 10, -72, 6, 0, 7); ctx.fill();
  if (p.sword || p.arm === 'sword') { ctx.strokeStyle = '#D8D8D0'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(armL[0], armL[1]); ctx.lineTo(armL[0] + 18, armL[1] - 60); ctx.stroke(); }
  if (p.rifle) { ctx.strokeStyle = '#5A4630'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(28 + sw * 10, -66); ctx.lineTo(34 + sw * 10, -150); ctx.stroke(); ctx.strokeStyle = '#BFC2C4'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(34 + sw * 10, -150); ctx.lineTo(35 + sw * 10, -170); ctx.stroke(); }
  if (p.flag) { const fx = armL[0], fy = armL[1]; ctx.strokeStyle = '#5A4630'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(fx, fy + 20); ctx.lineTo(fx, fy - 90); ctx.stroke(); drawFlag(fx, fy - 90, 70, 46, p.flag, p.flagWave ?? 0); }
  // cabeça
  ctx.fillStyle = skin; ctx.fillRect(-6, -142, 12, 12);
  ctx.beginPath(); ctx.arc(0, -160, 22, 0, 7); ctx.fill();
  if (p.hair) { ctx.fillStyle = p.hair; ctx.beginPath(); ctx.arc(0, -166, 22, Math.PI * 1.05, Math.PI * 1.95); ctx.fill(); }
  ctx.fillStyle = C.ink; ctx.beginPath(); ctx.arc(-7, -162, 2.4, 0, 7); ctx.fill(); ctx.beginPath(); ctx.arc(7, -162, 2.4, 0, 7); ctx.fill();
  if (p.sad) { ctx.strokeStyle = C.ink; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(0, -144, 6, 1.15 * Math.PI, 1.85 * Math.PI); ctx.stroke(); }
  const bc = p.beardCol || '#4A3A2A';
  if (p.beard === 'full') { ctx.fillStyle = bc; ctx.beginPath(); ctx.moveTo(-21, -164); ctx.quadraticCurveTo(-22, -128, 0, -118); ctx.quadraticCurveTo(22, -128, 21, -164); ctx.quadraticCurveTo(12, -146, 0, -148); ctx.quadraticCurveTo(-12, -146, -21, -164); ctx.fill(); }
  if (p.beard === 'chin') { ctx.fillStyle = bc; ctx.beginPath(); ctx.moveTo(-12, -150); ctx.quadraticCurveTo(0, -122, 12, -150); ctx.quadraticCurveTo(0, -144, -12, -150); ctx.fill(); }
  if (p.beard === 'side') { ctx.fillStyle = bc; ctx.beginPath(); ctx.ellipse(-18, -154, 6, 12, 0, 0, 7); ctx.ellipse(18, -154, 6, 12, 0, 0, 7); ctx.fill(); }
  if (p.beard === 'mustache' || p.beard === 'side' || p.beard === 'full' || p.beard === 'chin') { ctx.fillStyle = bc; ctx.beginPath(); ctx.ellipse(-6, -150, 8, 3.5, .25, 0, 7); ctx.ellipse(6, -150, 8, 3.5, -.25, 0, 7); ctx.fill(); }
  // chapéu
  const hc = p.hatCol || coat;
  if (p.hat === 'kepi') { ctx.fillStyle = hc; ctx.beginPath(); ctx.moveTo(-19, -170); ctx.lineTo(-16, -198); ctx.lineTo(18, -194); ctx.lineTo(20, -170); ctx.closePath(); ctx.fill(); ctx.fillStyle = C.ink; ctx.fillRect(-22, -172, 34, 5); ctx.beginPath(); ctx.ellipse(-20, -169, 14, 4, 0, 0, 7); ctx.fill(); }
  if (p.hat === 'bicorne') { ctx.fillStyle = C.ink; ctx.beginPath(); ctx.ellipse(0, -180, 38, 14, 0, Math.PI, 0); ctx.fill(); ctx.fillRect(-38, -182, 76, 6); ctx.fillStyle = C.gold; ctx.beginPath(); ctx.arc(10, -186, 4, 0, 7); ctx.fill(); if (p.plume) { ctx.fillStyle = C.white; ctx.beginPath(); ctx.ellipse(0, -196, 20, 7, 0, 0, 7); ctx.fill(); } }
  if (p.hat === 'top') { ctx.fillStyle = C.ink; ctx.fillRect(-16, -214, 32, 38); ctx.fillRect(-26, -180, 52, 6); }
  if (p.hat === 'cap') { ctx.fillStyle = hc; ctx.beginPath(); ctx.ellipse(0, -178, 24, 9, 0, 0, 7); ctx.fill(); ctx.fillRect(-20, -182, 40, 8); ctx.fillStyle = C.ink; ctx.beginPath(); ctx.ellipse(-12, -172, 15, 4, 0, 0, 7); ctx.fill(); }
  if (p.hat === 'crown') { ctx.fillStyle = C.gold; ctx.beginPath(); ctx.moveTo(-18, -178); for (let i = 0; i < 5; i++) { ctx.lineTo(-18 + i * 9, -200); ctx.lineTo(-13.5 + i * 9, -186); } ctx.lineTo(18, -178); ctx.closePath(); ctx.fill(); }
  if (p.hat === 'straw') { ctx.fillStyle = '#C9A66B'; ctx.beginPath(); ctx.ellipse(0, -178, 36, 8, 0, 0, 7); ctx.fill(); ctx.fillRect(-16, -196, 32, 18); }
  if (p.bandana) { ctx.fillStyle = p.bandana; ctx.fillRect(-23, -178, 46, 8); }
  ctx.restore();
}
function drawFlag(x, y, w, h, kind, wave = 0) {
  ctx.save(); ctx.translate(x, y);
  const strip = 10; for (let i = 0; i < strip; i++) { const x0 = i * w / strip, dy = Math.sin(wave + i * .6) * 3 * (i / strip);
    ctx.save(); ctx.beginPath(); ctx.rect(x0, dy, w / strip + 1, h); ctx.clip(); ctx.translate(0, dy); flagArt(kind, w, h); ctx.restore(); }
  ctx.restore();
}
function flagArt(kind, w, h) {
  if (kind === 'BR') { ctx.fillStyle = C.green; ctx.fillRect(0, 0, w, h); ctx.fillStyle = C.yellow; ctx.beginPath(); ctx.moveTo(w / 2, 4); ctx.lineTo(w - 6, h / 2); ctx.lineTo(w / 2, h - 4); ctx.lineTo(6, h / 2); ctx.closePath(); ctx.fill(); ctx.fillStyle = C.green; ctx.beginPath(); ctx.arc(w / 2, h / 2, h * .2, 0, 7); ctx.fill(); }
  else if (kind === 'PY') { ctx.fillStyle = '#C8312B'; ctx.fillRect(0, 0, w, h / 3); ctx.fillStyle = '#FFF'; ctx.fillRect(0, h / 3, w, h / 3); ctx.fillStyle = '#2B4FA0'; ctx.fillRect(0, 2 * h / 3, w, h / 3); ctx.fillStyle = C.yellow; ctx.beginPath(); ctx.arc(w / 2, h / 2, h * .09, 0, 7); ctx.fill(); }
  else if (kind === 'AR') { ctx.fillStyle = '#7FB4E0'; ctx.fillRect(0, 0, w, h); ctx.fillStyle = '#FFF'; ctx.fillRect(0, h / 3, w, h / 3); ctx.fillStyle = C.yellow; ctx.beginPath(); ctx.arc(w / 2, h / 2, h * .1, 0, 7); ctx.fill(); }
  else if (kind === 'UY') { ctx.fillStyle = '#FFF'; ctx.fillRect(0, 0, w, h); ctx.fillStyle = '#2B5BB5'; for (let i = 1; i < 9; i += 2) ctx.fillRect(0, i * h / 9, w, h / 9); ctx.fillStyle = '#FFF'; ctx.fillRect(0, 0, w * .4, h * 5 / 9); ctx.fillStyle = C.yellow; ctx.beginPath(); ctx.arc(w * .2, h * .27, h * .14, 0, 7); ctx.fill(); }
  else if (kind === 'white') { ctx.fillStyle = '#FFF'; ctx.fillRect(0, 0, w, h); }
  else if (kind === 'red') { ctx.fillStyle = '#C8312B'; ctx.fillRect(0, 0, w, h); }
  else if (kind === 'UK') { ctx.fillStyle = '#25408F'; ctx.fillRect(0, 0, w, h); ctx.strokeStyle = '#FFF'; ctx.lineWidth = h * .2; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(w, h); ctx.moveTo(w, 0); ctx.lineTo(0, h); ctx.stroke(); ctx.strokeStyle = '#C8312B'; ctx.lineWidth = h * .08; ctx.stroke(); ctx.fillStyle = '#FFF'; ctx.fillRect(w * .42, 0, w * .16, h); ctx.fillRect(0, h * .38, w, h * .24); ctx.fillStyle = '#C8312B'; ctx.fillRect(w * .46, 0, w * .08, h); ctx.fillRect(0, h * .43, w, h * .14); }
}
const CHAR = {
  pedro: { coat: '#2A2E3A', pants: '#2A2E3A', beard: 'full', beardCol: '#8A7A66', hair: '#8A7A66', epaulets: true, sash: C.green, buttons: true },
  pedroOld: { coat: '#2A2E3A', pants: '#2A2E3A', beard: 'full', beardCol: '#E8E4DA', hair: '#E8E4DA', buttons: true },
  lopez: { coat: '#2B3A5C', pants: C.white, beard: 'full', beardCol: '#2A1E16', hair: '#2A1E16', hat: 'kepi', hatCol: '#2B3A5C', epaulets: true, sash: '#C8312B' },
  carlos: { coat: '#3A3328', pants: '#3A3328', hat: 'top', skin: C.skin, buttons: false },
  caxias: { coat: '#1F3557', pants: C.white, beard: 'side', beardCol: '#CFCAC0', hair: '#CFCAC0', hat: 'bicorne', plume: true, epaulets: true, sash: C.gold },
  barroso: { coat: '#1B2438', pants: '#1B2438', beard: 'full', beardCol: '#B9B3A6', hair: '#B9B3A6', hat: 'bicorne', epaulets: true },
  conde: { coat: '#1F3557', pants: C.white, beard: 'full', beardCol: '#8B6B3E', hair: '#8B6B3E', hat: 'kepi', hatCol: '#1F3557', epaulets: true },
  mitre: { coat: '#3B4E6B', pants: C.white, beard: 'full', beardCol: '#3A2E24', hair: '#3A2E24', hat: 'kepi', hatCol: '#3B4E6B', epaulets: true },
  deodoro: { coat: '#1F3557', pants: C.white, beard: 'full', beardCol: '#EDEAE2', hair: '#EDEAE2', hat: 'kepi', hatCol: '#1F3557', epaulets: true, sash: C.gold },
  flores: { coat: '#6A4A30', pants: '#3A3328', hat: 'straw', beard: 'full', beardCol: '#3A2E24', bandana: '#C8312B', buttons: false },
  blanco: { coat: '#6A5A44', pants: '#3A3328', hat: 'straw', beard: 'mustache', beardCol: '#3A2E24', bandana: '#F4F4F4', buttons: false },
  solBR: { coat: C.blue, pants: C.white, hat: 'kepi', rifle: true },
  solPY: { coat: C.pyRed, pants: C.white, hat: 'kepi', hatCol: '#2A2A2A', rifle: true, skin: C.skin2 },
  solAR: { coat: '#4A6A8E', pants: '#D9D4C4', hat: 'kepi', rifle: true },
  solUY: { coat: '#3D4E78', pants: '#E0DACA', hat: 'kepi', hatCol: '#2A2A2A', rifle: true }
};
function charCard(t, d, key, name, role, o = {}) { // retrato estilizado grande
  paperBg(o.bg || C.paper2); grainLines(3);
  const a = fadeIO(t, d, .5, .5); const s = 3.1 + .12 * lin(t, 0, d);
  ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = 'rgba(30,27,22,.08)'; ctx.beginPath(); ctx.arc(W * .62, 560, 330, 0, 7); ctx.fill();
  person(W * .6, 1060, s, { ...CHAR[key], ...(o.pose || {}) }); ctx.restore();
  if (o.bubble) speech(t, o.bubble.at, W * .62 + 150, 230, o.bubble.s, o.bubble.w || 520);
  lowerThird(t, .5, name, role); vignette(.22);
  txt('ilustração', W - 80, H - 40, { size: 16, fam: 'IBM Plex Mono', weight: 500, color: C.muted, al: 'right', alpha: a });
}
function speech(t, at, x, y, s, w = 520) {
  const a = seg(t, at, at + .5); if (a <= 0) return; const lines = wrap(s, w - 50, 32, 600); const h = lines.length * 42 + 40;
  ctx.save(); ctx.globalAlpha = a; ctx.translate(x, y); ctx.scale(.9 + .1 * a, .9 + .1 * a); ctx.fillStyle = C.white; ctx.strokeStyle = C.ink; ctx.lineWidth = 4;
  ctx.beginPath(); ctx.roundRect(0, 0, w, h, 18); ctx.fill(); ctx.stroke(); ctx.beginPath(); ctx.moveTo(40, h - 2); ctx.lineTo(10, h + 40); ctx.lineTo(80, h - 2); ctx.fill(); ctx.stroke(); ctx.fillStyle = C.white; ctx.fillRect(38, h - 6, 44, 6);
  lines.forEach((l, i) => txt(l, 25, 40 + i * 42, { size: 32, weight: 600 })); ctx.restore();
}

// ---------- cenários ----------
function sky(top, bot) { const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, top); g.addColorStop(1, bot); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); }
function ground(y, col) { ctx.fillStyle = col; ctx.fillRect(0, y, W, H - y); }
function river(y, h, t, col = C.water) { ctx.fillStyle = col; ctx.fillRect(0, y, W, h); ctx.strokeStyle = 'rgba(255,255,255,.35)'; ctx.lineWidth = 3; for (let i = 0; i < 14; i++) { const yy = y + 20 + (i * 53) % (h - 30), xx = ((i * 211 + t * 60) % (W + 200)) - 100; ctx.beginPath(); ctx.moveTo(xx, yy); ctx.quadraticCurveTo(xx + 30, yy - 6, xx + 60, yy); ctx.stroke(); } }
function smokePuff(x, y, r, a, col = '#8E8A82') { ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = col; for (let i = 0; i < 5; i++) { ctx.beginPath(); ctx.arc(x + Math.cos(i * 1.3) * r * .5, y + Math.sin(i * 1.7) * r * .35, r * (.55 + .1 * i % 3), 0, 7); ctx.fill(); } ctx.restore(); }
function ship(x, y, s, o = {}) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s * (o.flip ? -1 : 1), s);
  const hull = o.hull || '#2A2E36';
  if (o.iron) { ctx.fillStyle = hull; ctx.beginPath(); ctx.moveTo(-150, -10); ctx.lineTo(150, -10); ctx.lineTo(130, 22); ctx.lineTo(-140, 22); ctx.closePath(); ctx.fill(); ctx.fillStyle = '#3B414B'; ctx.beginPath(); ctx.moveTo(-60, -10); ctx.lineTo(-45, -48); ctx.lineTo(45, -48); ctx.lineTo(60, -10); ctx.fill(); ctx.fillStyle = C.ink; ctx.fillRect(-10, -88, 22, 40); }
  else { ctx.fillStyle = hull; ctx.beginPath(); ctx.moveTo(-170, -20); ctx.lineTo(170, -20); ctx.lineTo(140, 24); ctx.lineTo(-150, 24); ctx.closePath(); ctx.fill();
    ctx.fillStyle = o.deck || '#D8CBB0'; ctx.fillRect(-150, -32, 290, 12); ctx.fillStyle = C.ink; ctx.fillRect(-12, -110, 24, 80);
    ctx.strokeStyle = '#4A3A2A'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(-90, -30); ctx.lineTo(-90, -170); ctx.moveTo(90, -30); ctx.lineTo(90, -150); ctx.stroke();
    if (o.paddle) { ctx.fillStyle = '#4A3A2A'; ctx.beginPath(); ctx.arc(40, -10, 42, Math.PI, 0); ctx.fill(); } }
  if (o.flag) { ctx.strokeStyle = '#4A3A2A'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(o.iron ? 130 : 150, -20); ctx.lineTo(o.iron ? 130 : 150, -90); ctx.stroke(); drawFlag(o.iron ? 130 : 150, -90, 54, 36, o.flag, o.wave || 0); }
  ctx.restore();
  if (o.smoke !== false) { for (let i = 0; i < 4; i++) { const k = ((o.t || 0) * .6 + i / 4) % 1; smokePuff(x + (o.flip ? 1 : -1) * k * 120 * s, y - (o.iron ? 95 : 120) * s - k * 90 * s, (18 + k * 30) * s, .5 * (1 - k)); } }
}
function palm(x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.strokeStyle = '#5A4630'; ctx.lineWidth = 10; ctx.beginPath(); ctx.moveTo(0, 0); ctx.quadraticCurveTo(10, -80, 0, -160); ctx.stroke(); ctx.fillStyle = '#4F6B3A'; for (let i = 0; i < 6; i++) { ctx.save(); ctx.translate(0, -160); ctx.rotate(-2.6 + i * .95); ctx.beginPath(); ctx.ellipse(45, 0, 50, 10, 0, 0, 7); ctx.fill(); ctx.restore(); } ctx.restore(); }
function bush(x, y, s, col = '#5E7A45') { ctx.fillStyle = col; ctx.beginPath(); ctx.arc(x, y, 40 * s, 0, 7); ctx.arc(x + 40 * s, y + 6 * s, 32 * s, 0, 7); ctx.arc(x - 38 * s, y + 8 * s, 30 * s, 0, 7); ctx.fill(); }
function cannon(x, y, s, flip = false, fire = 0) { ctx.save(); ctx.translate(x, y); ctx.scale(s * (flip ? -1 : 1), s); ctx.fillStyle = '#2B2B2B'; ctx.save(); ctx.rotate(-.15); ctx.fillRect(-10, -14, 90, 22); ctx.restore(); ctx.fillStyle = '#5A4630'; ctx.beginPath(); ctx.arc(0, 8, 20, 0, 7); ctx.fill(); ctx.restore(); if (fire > 0) { ctx.save(); ctx.globalAlpha = fire; ctx.fillStyle = '#F4C04E'; ctx.beginPath(); ctx.arc(x + (flip ? -1 : 1) * 95 * s, y - 14 * s, 22 * s * fire, 0, 7); ctx.fill(); ctx.restore(); smokePuff(x + (flip ? -1 : 1) * 110 * s, y - 20 * s, 34 * s, fire * .7); } }
function tent(x, y, s, cross) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = '#D8CBB0'; ctx.beginPath(); ctx.moveTo(-120, 0); ctx.lineTo(0, -110); ctx.lineTo(120, 0); ctx.closePath(); ctx.fill(); ctx.fillStyle = '#B8A988'; ctx.beginPath(); ctx.moveTo(-20, 0); ctx.lineTo(0, -60); ctx.lineTo(20, 0); ctx.fill(); if (cross) { ctx.fillStyle = C.red; ctx.fillRect(-8, -95, 16, 44); ctx.fillRect(-22, -81, 44, 16); } ctx.restore(); }
function lying(x, y, s, col = C.blue) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = '#D8CBB0'; ctx.fillRect(-90, -8, 190, 14); ctx.fillStyle = col; ctx.fillRect(-60, -26, 100, 22); ctx.fillStyle = C.skin; ctx.beginPath(); ctx.arc(-74, -20, 16, 0, 7); ctx.fill(); ctx.fillStyle = '#C8C0B0'; ctx.fillRect(40, -24, 50, 18); ctx.restore(); }
function iconBox(x, y, s, kind, a) {
  if (a <= 0) return; ctx.save(); ctx.globalAlpha = a; ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = C.white; ctx.strokeStyle = C.ink; ctx.lineWidth = 4; ctx.beginPath(); ctx.roundRect(-90, -90, 180, 180, 20); ctx.fill(); ctx.stroke(); ctx.fillStyle = C.ink; ctx.strokeStyle = C.ink; ctx.lineWidth = 8; ctx.lineCap = 'round';
  if (kind === 'train') { ctx.fillRect(-60, -20, 80, 40); ctx.fillRect(10, -50, 40, 70); ctx.fillRect(-50, -50, 16, 30); ctx.beginPath(); ctx.arc(-35, 30, 14, 0, 7); ctx.arc(30, 30, 14, 0, 7); ctx.fill(); }
  if (kind === 'telegraph') { ctx.beginPath(); ctx.moveTo(0, 60); ctx.lineTo(0, -60); ctx.moveTo(-40, -40); ctx.lineTo(40, -40); ctx.moveTo(-30, -15); ctx.lineTo(30, -15); ctx.stroke(); ctx.beginPath(); ctx.moveTo(-70, -30); ctx.quadraticCurveTo(-40, -20, -40, -40); ctx.moveTo(40, -40); ctx.quadraticCurveTo(60, -20, 80, -30); ctx.lineWidth = 3; ctx.stroke(); }
  if (kind === 'foundry') { ctx.fillRect(-60, -10, 120, 70); ctx.fillRect(20, -70, 24, 60); ctx.fillStyle = C.red; ctx.fillRect(-40, 15, 30, 30); smokePuff(40, -85, 22, .8, '#8E8A82'); }
  if (kind === 'shipyard') { ctx.beginPath(); ctx.moveTo(-60, 10); ctx.lineTo(60, 10); ctx.lineTo(40, 40); ctx.lineTo(-45, 40); ctx.closePath(); ctx.fill(); ctx.fillRect(-4, -50, 8, 60); ctx.beginPath(); ctx.moveTo(-70, 60); ctx.lineTo(70, 60); ctx.stroke(); }
  if (kind === 'kepi') { ctx.beginPath(); ctx.moveTo(-50, 30); ctx.lineTo(-40, -40); ctx.lineTo(45, -30); ctx.lineTo(50, 30); ctx.closePath(); ctx.fill(); ctx.fillRect(-60, 26, 80, 14); }
  if (kind === 'chain') { ctx.lineWidth = 10; ctx.beginPath(); ctx.ellipse(-35, 0, 26, 16, 0, 0, 7); ctx.stroke(); ctx.beginPath(); ctx.ellipse(35, 0, 26, 16, 0, -2.6, 2.6); ctx.stroke(); ctx.strokeStyle = C.red; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(-5, -40); ctx.lineTo(5, 40); ctx.stroke(); }
  if (kind === 'crown') { ctx.beginPath(); ctx.moveTo(-60, 30); ctx.lineTo(-60, -30); ctx.lineTo(-30, 0); ctx.lineTo(0, -40); ctx.lineTo(30, 0); ctx.lineTo(60, -30); ctx.lineTo(60, 30); ctx.closePath(); ctx.fillStyle = C.gold; ctx.fill(); }
  if (kind === 'coin') { ctx.fillStyle = C.gold; ctx.beginPath(); ctx.arc(0, 0, 55, 0, 7); ctx.fill(); txt('£', 0, 4, { size: 70, weight: 900, al: 'center' }); }
  if (kind === 'book') { ctx.fillStyle = C.red; ctx.fillRect(-50, -60, 100, 120); ctx.fillStyle = C.paper; ctx.fillRect(-40, -45, 80, 10); ctx.fillRect(-40, -25, 60, 6); }
  if (kind === 'scroll') { ctx.fillStyle = C.paper2; ctx.fillRect(-50, -60, 100, 120); ctx.strokeStyle = C.muted; ctx.lineWidth = 4; for (let i = 0; i < 5; i++) { ctx.beginPath(); ctx.moveTo(-35, -40 + i * 20); ctx.lineTo(35, -40 + i * 20); ctx.stroke(); } }
  if (kind === 'sick') { ctx.fillStyle = C.red; ctx.fillRect(-15, -55, 30, 110); ctx.fillRect(-55, -15, 110, 30); }
  if (kind === 'food') { ctx.beginPath(); ctx.arc(0, 10, 50, 0, Math.PI); ctx.fill(); ctx.fillRect(-60, 6, 120, 8); }
  if (kind === 'target') { ctx.lineWidth = 8; ctx.beginPath(); ctx.arc(0, 0, 50, 0, 7); ctx.stroke(); ctx.beginPath(); ctx.arc(0, 0, 25, 0, 7); ctx.stroke(); ctx.beginPath(); ctx.arc(0, 0, 6, 0, 7); ctx.fill(); }
  if (kind === 'eye') { ctx.lineWidth = 8; ctx.beginPath(); ctx.ellipse(0, 0, 60, 32, 0, 0, 7); ctx.stroke(); ctx.beginPath(); ctx.arc(0, 0, 16, 0, 7); ctx.fill(); }
  ctx.restore();
}
function titleCard(t, d, num, title, date) {
  paperBg(C.ink); const a = fadeIO(t, d, .4, .4);
  ctx.save(); ctx.globalAlpha = .08 * a; ctx.strokeStyle = C.paper; ctx.lineWidth = 1; for (let i = 0; i < 24; i++) { ctx.beginPath(); ctx.moveTo(0, i * 50); ctx.lineTo(W, i * 50 + 30); ctx.stroke(); } ctx.restore();
  const lw = 700 * seg(t, .2, 1.2); ctx.fillStyle = C.gold; ctx.globalAlpha = a; ctx.fillRect(W / 2 - lw / 2, 640, lw, 4); ctx.globalAlpha = 1;
  if (num) txt(num, W / 2, 380, { size: 64, weight: 500, color: C.gold, al: 'center', fam: 'IBM Plex Mono', alpha: a });
  const ts = Math.min(120, 120 * 1680 / textW(title, 120, 900, 'Archivo', 2)); bigTitle(title, W / 2, 520, ts, a * seg(t, .1, .8), { color: C.paper });
  if (date) txt(date, W / 2, 710, { size: 34, weight: 500, color: C.gold, al: 'center', fam: 'IBM Plex Mono', alpha: a * seg(t, .5, 1.1), spacing: 6 });
}
function quoteCard(t, d, q, who, o = {}) {
  paperBg(o.bg || C.paper2); grainLines(5); const a = fadeIO(t, d, .6, .5);
  txt('“', 260, 330, { size: 260, weight: 900, color: C.gold, alpha: a });
  const lines = wrap(q, 1300, 70, 800); const y0 = 540 - lines.length * 45;
  lines.forEach((l, i) => txt(l, 340, y0 + i * 92, { size: 70, weight: 800, alpha: a * seg(t, .3 + i * .3, .9 + i * .3) }));
  if (who) txt('— ' + who, 344, y0 + lines.length * 92 + 40, { size: 32, weight: 500, color: C.muted, fam: 'IBM Plex Mono', alpha: a * seg(t, 1.2, 1.8) });
  vignette(.2);
}
function timeline(t, events, o = {}) { // events [{y:'1864',label,at,color}]
  const x0 = o.x0 ?? 200, x1 = o.x1 ?? 1720, yy = o.y ?? 560; const lw = (x1 - x0) * seg(t, 0, o.drawTo ?? 1.2);
  ctx.fillStyle = C.ink; ctx.fillRect(x0, yy - 3, lw, 6);
  events.forEach((e, i) => { const x = lerp(x0, x1, e.pos ?? i / (events.length - 1)); const a = seg(t, e.at, e.at + .5); if (a <= 0) return; const up = (o.alt ?? true) ? i % 2 === 0 : true;
    ctx.globalAlpha = a; ctx.fillStyle = e.color || C.red; ctx.beginPath(); ctx.arc(x, yy, 14, 0, 7); ctx.fill(); ctx.strokeStyle = C.ink; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, yy); ctx.lineTo(x, yy + (up ? -70 : 70)); ctx.stroke(); ctx.globalAlpha = 1;
    txt(e.y, x, yy + (up ? -100 : 100), { size: 40, weight: 900, al: 'center', alpha: a, color: e.color || C.red });
    const ls = wrap(e.label, o.lw || 260, 24, 600); ls.forEach((l, k) => txt(l, x, yy + (up ? -150 - (ls.length - 1 - k) * 30 : 145 + k * 30), { size: 24, weight: 600, al: 'center', alpha: a })); });
}
function checklist(t, items, x, y, o = {}) { items.forEach((s, i) => { const at = (o.at ?? .5) + i * (o.step ?? .9); const a = seg(t, at, at + .4); if (a <= 0) return; ctx.globalAlpha = a; ctx.fillStyle = o.boxCol || C.ink; ctx.fillRect(x, y + i * 90 - 24, 48, 48); ctx.globalAlpha = 1; if (o.check !== false) { ctx.save(); ctx.globalAlpha = seg(t, at + .2, at + .5); ctx.strokeStyle = C.gold; ctx.lineWidth = 8; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x + 10, y + i * 90); ctx.lineTo(x + 21, y + i * 90 + 12); ctx.lineTo(x + 40, y + i * 90 - 12); ctx.stroke(); ctx.restore(); } txt(s, x + 76, y + i * 90, { size: o.size || 40, weight: 700, alpha: a }); }); }
function logoClock(x, y, r, a, t = 0) { ctx.save(); ctx.globalAlpha = a; ctx.translate(x, y); ctx.fillStyle = C.gold; ctx.beginPath(); ctx.arc(0, -r - 14, 12, 0, 7); ctx.fill(); ctx.fillStyle = C.ink; ctx.beginPath(); ctx.arc(0, 0, r, 0, 7); ctx.fill(); ctx.strokeStyle = C.gold; ctx.lineWidth = r * .08; ctx.beginPath(); ctx.arc(0, 0, r * .86, 0, 7); ctx.stroke(); for (let i = 0; i < 12; i++) { const an = i * Math.PI / 6; ctx.beginPath(); ctx.moveTo(Math.cos(an) * r * .7, Math.sin(an) * r * .7); ctx.lineTo(Math.cos(an) * r * .78, Math.sin(an) * r * .78); ctx.stroke(); } ctx.rotate(t * 2); ctx.lineWidth = r * .07; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, -r * .6); ctx.stroke(); ctx.rotate(-t * 2 + t * .2); ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(r * .4, 0); ctx.stroke(); txt('C', 0, r * .05, { size: r * .7, weight: 900, color: C.paper, al: 'center' }); ctx.restore(); }

// ---------- legendas das falas ----------
let SUBS = [];
function drawSubs(gt) {
  const s = SUBS.find(x => gt >= x.s && gt <= x.e); if (!s) return;
  const a = Math.min(1, (gt - s.s) / .12, (s.e - gt) / .12);
  const lines = wrap(s.txt, 1360, 42, 700); const lh = 54; const h = lines.length * lh + 26;
  const w = Math.max(...lines.map(l => textW(l, 42, 700))) + 64; const y = 1052 - h;
  ctx.save(); ctx.globalAlpha = .86 * a; ctx.fillStyle = '#14120E'; ctx.beginPath(); ctx.roundRect(W / 2 - w / 2, y, w, h, 12); ctx.fill(); ctx.restore();
  lines.forEach((l, i) => txt(l, W / 2, y + 13 + lh / 2 + i * lh, { size: 42, weight: 700, color: '#FFFFFF', al: 'center', alpha: a }));
}
