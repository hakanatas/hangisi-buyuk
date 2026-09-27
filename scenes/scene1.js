/* SAHNE 1 — KİM DAHA ÇOK OKUDU? (0–10 s)  3/4, 0,7, %72, 2/3.
   The whole film's drawing lives in LI.world(t); each scene only sets the camera. */
(function (LI) {
  'use strict';
  const { seg, lerp, inOut } = LI.E;
  const KD = LI.KD, F = () => LI.Film, A = LI.Ang, Ink = LI.Ink;
  const END = (t) => 1 - seg(t, 90.4, 91.4);

  function win(t, a, b, fi = 0.4, fo = 0.4) { return seg(t, a, a + fi) * (1 - seg(t, b - fo, b)); }
  function exprs(ctx, t, P, list, sz) {
    const f = F();
    list.forEach(([a, b, items, hot]) => {
      const al = win(t, a, b); if (al <= 0) return;
      f.expr(ctx, typeof items === 'string' ? [items] : items, P.x, P.y, sz ?? P.s, { alpha: al, w: P.w, halo: true, color: hot ? A.amber : undefined });
    });
  }
  const at = (P, k, y) => ({ x: P.x, y: y ?? P.y[k], s: P.s, w: P.w });
  const amber = (a) => `rgba(${LI.AMBER_RGB},${a})`;
  const ink = (a) => `rgba(${LI.INK_RGB},${a})`;
  const fr = (n, d, h) => F().fr(n, d, h);

  const READERS = [['Ali', [fr(3, 4)], 0.75], ['Ece', ['0,7'], 0.7], ['Can', ['%72'], 0.72], ['Deniz', [fr(2, 3)], 2 / 3]];

  /** a strip split into d equal parts, n shaded */
  function strip(ctx, x0, y, w, h, n, d, a, seed, label) {
    if (a <= 0) return;
    const f = F();
    for (let i = 0; i < d; i++) {
      const x = x0 + i * w / d;
      if (i < n) { ctx.fillStyle = amber(0.6 * a); ctx.fillRect(x, y, w / d, h); }
      Ink.path(ctx, [[x, y], [x + w / d, y], [x + w / d, y + h], [x, y + h], [x, y]], { w: 3.5, alpha: a, seed: seed + i, taper: [0, 0] });
    }
    if (label) f.expr(ctx, label, x0 - 60, y + h / 2, 44, { alpha: a, halo: true });
  }
  /** a number line from lo to hi with points [value, label items, name] */
  function line(ctx, N, lo, hi, ticks, pts, a, s, seed) {
    if (a <= 0) return;
    const f = F(), X = (v) => lerp(N.x0, N.x1, (v - lo) / (hi - lo));
    Ink.path(ctx, [[N.x0 - 20, N.y], [N.x1 + 20, N.y]], { w: 4, alpha: a, seed, taper: [0, 0] });
    ticks.forEach(([v, lab], i) => { const x = X(v); if (x < N.x0 - 1 || x > N.x1 + 1) return; Ink.path(ctx, [[x, N.y - 12], [x, N.y + 12]], { w: 3, alpha: a, seed: seed + 1 + i, taper: [0, 0] }); if (lab) f.expr(ctx, lab, x, N.y + 42, s * 0.62, { alpha: a }); });
    pts.forEach(([v, lab, name, k], i) => {
      if (k <= 0) return; const x = X(v);
      ctx.fillStyle = amber(a * k); ctx.beginPath(); ctx.arc(x, N.y, 10, 0, Math.PI * 2); ctx.fill();
      const up = i % 2 ? 120 : 58;
      f.expr(ctx, lab, x, N.y - up, s * 0.95, { alpha: a * k, halo: true, color: A.amber });
      if (name) f.T(ctx, name, x, N.y - up - 52, { size: s * 0.62, alpha: a * k });
    });
  }

  function context(ctx, env, t) {
    exprs(ctx, t, KD.L(env).CX, [
      [4.4, 10.2, 'Kim kitabın daha büyük kısmını okudu?'],
      [10.6, 27.8, 'Varsayım: paydası büyük olan kesir daha büyüktür?'],
      [28.4, 45.8, 'Genellemeleri bulalım'],
      [46.4, 63.8, 'Farklı gösterimleri aynı gösterime çevirelim'],
      [64.4, 79.8, 'Tahmin için yarımla karşılaştır'],
    ]);
  }

  function figure(ctx, env, t) {
    const L = KD.L(env), f = F(), a = END(t), s = L.G.s;
    // 0–10: reading bars
    const rb = win(t, 4.6, 10.2) * a, R = L.RB;
    if (rb > 0) READERS.forEach(([name, lab, v], i) => {
      const k = seg(t, 5.0 + i * 0.5, 6.2 + i * 0.5), y = R.y[i];
      f.T(ctx, name, R.x0 - 30, y, { size: s * 0.7, alpha: rb, align: 'right' });
      ctx.fillStyle = amber(0.65 * rb); ctx.fillRect(R.x0, y - R.h / 2, R.w * v * k, R.h);
      Ink.path(ctx, [[R.x0, y - R.h / 2], [R.x0 + R.w, y - R.h / 2], [R.x0 + R.w, y + R.h / 2], [R.x0, y + R.h / 2], [R.x0, y - R.h / 2]], { w: 3.5, alpha: rb, seed: 3700 + i, taper: [0, 0] });
      f.expr(ctx, lab, R.x0 + R.w + 70, y, s * 0.95, { alpha: rb * seg(k, 0.8, 1), halo: true, color: A.amber });
    });
    // 10–28: 1/3 and 1/4
    const S = L.ST, s1 = win(t, 10.8, 27.8) * a;
    if (s1 > 0) { strip(ctx, S.x0, S.y[0], S.w, S.h, 1, 3, s1 * seg(t, 11.0, 11.6), 3710, [fr(1, 3)]); strip(ctx, S.x0, S.y[1], S.w, S.h, 1, 4, s1 * seg(t, 12.0, 12.6), 3720, [fr(1, 4)]); if (t > 14.6) f.T(ctx, '1/3 > 1/4', S.x0 + S.w / 2, S.y[1] + S.h + 50, Object.assign({ size: s * 0.9, alpha: s1 * seg(t, 14.6, 15.2), halo: true }, f.AMB)); }
    if (t > 18.6 && t < 27.8) f.crossInk(ctx, S.x0 + S.w + 70, S.y[0] - 30, 22, seg(t, 18.6, 19.4), win(t, 18.6, 27.8) * a);
    // 28–46: 3/8 and 5/8, then the number line
    const s2 = win(t, 28.6, 45.8) * a;
    if (s2 > 0) { strip(ctx, S.x0, S.y[0], S.w, S.h, 3, 8, s2 * seg(t, 29.0, 29.6), 3730, [fr(3, 8)]); strip(ctx, S.x0, S.y[1], S.w, S.h, 5, 8, s2 * seg(t, 29.8, 30.4), 3740, [fr(5, 8)]); }
    const n1 = win(t, 34.0, 45.8) * a;
    if (n1 > 0) line(ctx, L.NL, 0, 1, [[0, ['0']], [0.5, [fr(1, 2)]], [1, ['1']], [0.125], [0.25], [0.375], [0.625], [0.75], [0.875]].map((x) => [x[0], x[1]]), [[0.375, [fr(3, 8)], '', seg(t, 34.4, 34.8)], [0.625, [fr(5, 8)], '', seg(t, 35.0, 35.4)]], n1, s, 3750);
    // 46–64: all four readers, zooming into 0,6–0,8
    const n2 = win(t, 46.6, 63.8) * a;
    if (n2 > 0) {
      const z = inOut(seg(t, 49.0, 51.0)), lo = lerp(0, 0.6, z), hi = lerp(1, 0.8, z);
      const ticks = []; for (let v = 0; v <= 100; v += (z > 0.5 ? 1 : 10)) ticks.push([v / 100, v % 10 === 0 ? [`${(v / 100).toFixed(1).replace('.', ',')}`] : null]);
      line(ctx, L.NL, lo, hi, ticks, [[2 / 3, [fr(2, 3)], 'Deniz', seg(t, 51.4, 51.8)], [0.7, ['0,7'], 'Ece', seg(t, 52.0, 52.4)], [0.72, ['%72'], 'Can', seg(t, 52.6, 53.0)], [0.75, [fr(3, 4)], 'Ali', seg(t, 53.2, 53.6)]], n2, s, 3760);
      const c = win(t, 47.0, 63.8) * a, y0 = L.ST.y[0] - 10;
      if (c > 0) { f.expr(ctx, [fr(3, 4), ' = ', fr(75, 100), ' = %75 · 0,7 = %70'], (L.NL.x0 + L.NL.x1) / 2, y0, s * 0.95, { alpha: c, halo: true }); f.expr(ctx, [fr(2, 3), ' yaklaşık 0,67 = %67'], (L.NL.x0 + L.NL.x1) / 2, y0 + 75, s * 0.95, { alpha: c * seg(t, 48.0, 48.4), halo: true }); }
    }
    // 64–80: benchmark 1/2
    const n3 = win(t, 64.6, 79.8) * a;
    if (n3 > 0) {
      line(ctx, L.NL, 0, 1, [[0, ['0']], [0.5, [fr(1, 2, true)]], [1, ['1']]], [[3 / 7, [fr(3, 7)], '', seg(t, 66.6, 67.0)], [5 / 9, [fr(5, 9)], '', seg(t, 67.4, 67.8)]], n3, s, 3780);
      const c = seg(t, 68.6, 69.2) * n3, y0 = L.ST.y[0] - 10;
      if (c > 0) { f.expr(ctx, [fr(3, 7), ': 7’nin yarısı 3,5 · 3 < 3,5 → yarımdan az'], (L.NL.x0 + L.NL.x1) / 2, y0, s * 0.95, { alpha: c, halo: true, w: 1000 }); f.expr(ctx, [fr(5, 9), ': 9’un yarısı 4,5 · 5 > 4,5 → yarımdan fazla'], (L.NL.x0 + L.NL.x1) / 2, y0 + 80, s * 0.95, { alpha: c * seg(t, 70.0, 70.4), halo: true }); }
    }
  }

  function words(ctx, env, t) {
    const W = KD.L(env).W;
    exprs(ctx, t, at(W, 0), [[6.4, 10.2, 'Farklı gösterimler: karşılaştırmak zor görünüyor'], [11.4, 27.8, 'Deneyelim: 1/3 ile 1/4'],
      [29.4, 45.8, 'Paydalar aynıysa payı büyük olan büyüktür: 5/8 > 3/8'], [47.0, 63.8, 'Hepsini yüzdeye çevirdik: %67, %70, %72, %75'],
      [65.0, 79.8, 'Hangisi büyük: 3/7 mi, 5/9 mu?']]);
    exprs(ctx, t, at(W, 1), [[14.6, 27.8, 'Bütün daha çok parçaya bölününce parçalar küçülür'], [34.4, 45.8, 'Sayı doğrusunda sağdaki kesir daha büyüktür'],
      [53.8, 63.8, 'Sıralama: 2/3 < 0,7 < %72 < 3/4'], [70.4, 79.8, '3/7 < 1/2 < 5/9: 5/9 daha büyük']]);
    exprs(ctx, t, at(W, 2), [[18.6, 27.8, 'Varsayım yanlış: paylar aynıysa paydası küçük olan büyüktür', true],
      [38.4, 45.8, 'Farklı gösterimleri karşılaştırmak için aynı gösterime çevir', true], [57.4, 63.8, 'Kitabın en büyük kısmını Ali okudu', true],
      [73.8, 79.8, 'Yarımla karşılaştırmak, hesaplamadan hızlı tahmin sağlar', true]]);
  }

  function summary(ctx, env, t) {
    if (t < 80.4) return;
    const S = KD.L(env).SUM, f = F(), a = END(t);
    [['Payda aynı: payı büyük olan büyük', 80.6], ['Pay aynı: paydası küçük olan büyük', 81.6], ['Farklı gösterim: aynı gösterime çevir', 82.6], ['Tahmin için 1/2 ile karşılaştır!', 83.6, true]].forEach(([s, t0, hot], i) => {
      const al = seg(t, t0, t0 + 0.4) * a; if (al <= 0) return;
      f.expr(ctx, [s], S.x, S.y[i], S.s * (i === 3 ? 1.15 : 1), { alpha: al, w: S.w, halo: true, color: hot ? A.amber : undefined });
    });
  }

  LI.fireworks = function (ctx, env, t) {
    const k = seg(t, 84.4, 86.4);
    if (k <= 0 || t >= 91) return;
    const n = F().nokta(t, env), C = [n.x, n.y - 170];
    [30, 60, 90, 120, 150].forEach((d, i) => {
      const r = 150 + 30 * Math.sin(t * 2 + i);
      A.arc(ctx, C, r, d - 12, d + 12, { p: seg(k, i * 0.12, i * 0.12 + 0.4), alpha: 0.8 * (1 - seg(t, 90.2, 91)), w: 6, seed: 80 + i });
    });
  };

  LI.world = function (ctx, env, t) { context(ctx, env, t); figure(ctx, env, t); words(ctx, env, t); summary(ctx, env, t); };
  void ink;

  function camera(t, env) {
    const L = KD.L(env);
    return LI.Camera.breathe(LI.Camera.track([
      [0, KD.cam(env, { x: L.nx, y: env.V ? 380 : 140, zoom: 1.6 })],
      [3.0, KD.cam(env, { x: L.nx, y: env.V ? 380 : 140, zoom: 1.6 })],
      [4.8, KD.cam(env, { zoom: 1 })],
    ], t), t, 0.5);
  }
  function render(ctx, lt, env, t) { F().base(ctx, env, t, camera(t, env), () => LI.world(ctx, env, t)); }
  LI.registerScene({ id: 1, start: 0, end: 10, name: 'Who read more?', nameTr: 'Kim daha çok okudu?', concept: '3/4, 0,7, %72, 2/3', conceptTr: '3/4, 0,7, %72, 2/3', render });
})(window.LI = window.LI || {});
