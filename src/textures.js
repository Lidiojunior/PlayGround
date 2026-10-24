import * as THREE from 'three';

function canvas(w, h = w) {
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  return c;
}

function tex(c, rx = 1, ry = 1, srgb = true) {
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(rx, ry);
  t.colorSpace = srgb ? THREE.SRGBColorSpace : THREE.NoColorSpace;
  t.anisotropy = 8;
  return t;
}

function rnd(a = 0, b = 1) { return a + Math.random() * (b - a); }

function grain(ctx, w, h, amount = 20, alpha = 0.5) {
  const img = ctx.getImageData(0, 0, w, h);
  const d = img.data;
  for (let i = 0; i < d.length; i += 4) {
    const n = (Math.random() - 0.5) * amount;
    d[i] = Math.max(0, Math.min(255, d[i] + n));
    d[i + 1] = Math.max(0, Math.min(255, d[i + 1] + n));
    d[i + 2] = Math.max(0, Math.min(255, d[i + 2] + n));
  }
  ctx.putImageData(img, 0, 0);
  if (alpha > 0) {
    ctx.globalAlpha = alpha * 0.08;
    for (let i = 0; i < w * h * 0.012; i++) {
      ctx.fillStyle = Math.random() > 0.5 ? '#fff' : '#000';
      ctx.fillRect(rnd(0, w), rnd(0, h), rnd(1, 3), rnd(1, 3));
    }
    ctx.globalAlpha = 1;
  }
}

function blotches(ctx, w, h, colors, count, minR, maxR, alpha = 0.12) {
  ctx.globalAlpha = alpha;
  for (let i = 0; i < count; i++) {
    const x = rnd(0, w), y = rnd(0, h), r = rnd(minR, maxR);
    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    const c = colors[(Math.random() * colors.length) | 0];
    g.addColorStop(0, c);
    g.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
  }
  ctx.globalAlpha = 1;
}

function cracks(ctx, w, h, count, color = 'rgba(20,18,15,0.55)', width = 1.5) {
  ctx.strokeStyle = color;
  for (let i = 0; i < count; i++) {
    let x = rnd(0, w), y = rnd(0, h);
    ctx.lineWidth = rnd(0.6, width);
    ctx.beginPath(); ctx.moveTo(x, y);
    const steps = 4 + (Math.random() * 6 | 0);
    for (let s = 0; s < steps; s++) {
      x += rnd(-w * 0.04, w * 0.04); y += rnd(-h * 0.04, h * 0.04);
      ctx.lineTo(x, y);
    }
    ctx.stroke();
    if (Math.random() > 0.4) {
      ctx.beginPath(); ctx.moveTo(x, y);
      ctx.lineTo(x + rnd(-w * 0.03, w * 0.03), y + rnd(-h * 0.03, h * 0.03));
      ctx.stroke();
    }
  }
}

function makeAsphalt() {
  const w = 1024, c = canvas(w), ctx = c.getContext('2d');
  ctx.fillStyle = '#4b4944'; ctx.fillRect(0, 0, w, w);
  blotches(ctx, w, w, ['#6a675f', '#35332f', '#57544e', '#75716a'], 55, 40, 260, 0.22);
  for (let i = 0; i < 9000; i++) {
    const v = 60 + Math.random() * 110 | 0;
    ctx.fillStyle = `rgba(${v},${v - 2},${v - 6},${rnd(0.08, 0.5)})`;
    ctx.fillRect(rnd(0, w), rnd(0, w), rnd(1, 3.4), rnd(1, 3.4));
  }
  cracks(ctx, w, w, 26, 'rgba(18,16,13,0.7)', 2.2);
  cracks(ctx, w, w, 60, 'rgba(30,28,24,0.35)', 1);
  ctx.globalAlpha = 0.12;
  for (let i = 0; i < 8; i++) {
    ctx.fillStyle = '#1d1c1a';
    ctx.save(); ctx.translate(rnd(0, w), rnd(0, w)); ctx.rotate(rnd(-0.4, 0.4));
    ctx.fillRect(0, 0, rnd(40, 160), rnd(5, 12)); ctx.restore();
  }
  ctx.globalAlpha = 1;
  grain(ctx, w, w, 26, 0.4);
  return c;
}

function makeConcrete() {
  const w = 768, c = canvas(w), ctx = c.getContext('2d');
  ctx.fillStyle = '#918a7d'; ctx.fillRect(0, 0, w, w);
  blotches(ctx, w, w, ['#a59d8e', '#6f695e', '#b0a998', '#5f5a51'], 45, 30, 220, 0.2);
  ctx.strokeStyle = 'rgba(55,52,46,0.24)'; ctx.lineWidth = 2;
  for (let y = 0; y < w; y += 192) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); }
  for (let i = 0; i < 24; i++) {
    const x = rnd(0, w), y = rnd(0, w), r = rnd(3, 8);
    ctx.fillStyle = 'rgba(50,47,42,0.5)'; ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill();
    ctx.fillStyle = 'rgba(190,182,168,0.35)'; ctx.beginPath(); ctx.arc(x - 1.5, y - 2, r * 0.6, 0, 7); ctx.fill();
  }
  for (let i = 0; i < 34; i++) {
    const x = rnd(0, w), y = rnd(0, w);
    const g = ctx.createLinearGradient(x, y, x, y + rnd(40, 180));
    g.addColorStop(0, 'rgba(48,44,38,0.22)'); g.addColorStop(1, 'rgba(48,44,38,0)');
    ctx.fillStyle = g; ctx.fillRect(x, y, rnd(4, 26), rnd(40, 180));
  }
  cracks(ctx, w, w, 18, 'rgba(40,37,32,0.5)', 1.5);
  grain(ctx, w, w, 18, 0.5);
  return c;
}

function makeSand() {
  const w = 512, c = canvas(w), ctx = c.getContext('2d');
  ctx.fillStyle = '#b7a075'; ctx.fillRect(0, 0, w, w);
  blotches(ctx, w, w, ['#cbb489', '#8f7a53', '#d8c39a', '#a38c63'], 40, 20, 160, 0.25);
  for (let y = 0; y < w; y += rnd(7, 16)) {
    ctx.strokeStyle = `rgba(110,90,58,${rnd(0.04, 0.16)})`;
    ctx.lineWidth = rnd(1, 3); ctx.beginPath(); ctx.moveTo(0, y);
    for (let x = 0; x < w; x += 16) ctx.lineTo(x, y + Math.sin(x * 0.03 + y) * 3);
    ctx.stroke();
  }
  for (let i = 0; i < 5000; i++) {
    const v = 130 + Math.random() * 90 | 0;
    ctx.fillStyle = `rgba(${v},${v - 15},${v - 45},${rnd(0.1, 0.45)})`;
    ctx.fillRect(rnd(0, w), rnd(0, w), rnd(0.6, 2), rnd(0.6, 2));
  }
  grain(ctx, w, w, 16, 0.3);
  return c;
}

function makeMetal(base, rust = 0.55) {
  const w = 512, c = canvas(w), ctx = c.getContext('2d');
  ctx.fillStyle = base; ctx.fillRect(0, 0, w, w);
  blotches(ctx, w, w, ['#ffffff', '#000000', '#8d989e'], 24, 20, 140, 0.09);
  for (let i = 0; i < 40; i++) {
    const x = rnd(0, w), y = rnd(0, w), len = rnd(10, 120);
    const g = ctx.createLinearGradient(x, y, x + len, y + len * 0.3);
    g.addColorStop(0, `rgba(255,255,255,${rnd(0.02, 0.1)})`);
    g.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.strokeStyle = g; ctx.lineWidth = rnd(0.5, 2);
    ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + len, y + len * 0.3); ctx.stroke();
  }
  if (rust > 0) {
    for (let i = 0; i < 26 * rust; i++) {
      const x = rnd(0, w), y = rnd(0, w);
      const g = ctx.createLinearGradient(x, y, x + rnd(-4, 4), y + rnd(30, 150));
      g.addColorStop(0, `rgba(104,58,28,${rnd(0.15, 0.5)})`);
      g.addColorStop(1, 'rgba(104,58,28,0)');
      ctx.fillStyle = g; ctx.fillRect(x, y, rnd(2, 11), rnd(30, 150));
    }
    for (let i = 0; i < 55; i++) {
      ctx.fillStyle = `rgba(130,76,39,${rnd(0.15, 0.55)})`;
      ctx.beginPath(); ctx.arc(rnd(0, w), rnd(0, w), rnd(1, 5), 0, 7); ctx.fill();
    }
  }
  grain(ctx, w, w, 12, 0.2);
  return c;
}

function makeWood() {
  const w = 512, c = canvas(w), ctx = c.getContext('2d');
  ctx.fillStyle = '#7d5b38'; ctx.fillRect(0, 0, w, w);
  const plank = 128;
  for (let x = 0; x < w; x += plank) {
    const shade = rnd(-18, 18);
    ctx.fillStyle = `rgb(${125 + shade},${91 + shade},${56 + shade})`;
    ctx.fillRect(x + 2, 0, plank - 4, w);
    for (let i = 0; i < 40; i++) {
      ctx.strokeStyle = `rgba(52,33,18,${rnd(0.05, 0.25)})`;
      ctx.lineWidth = rnd(0.5, 2);
      ctx.beginPath();
      const yy = rnd(0, w);
      ctx.moveTo(x + 4, yy);
      ctx.bezierCurveTo(x + plank * 0.3, yy + rnd(-8, 8), x + plank * 0.7, yy + rnd(-8, 8), x + plank - 4, yy + rnd(-4, 4));
      ctx.stroke();
    }
  }
  ctx.fillStyle = 'rgba(40,25,12,0.45)';
  for (let x = 0; x < w; x += plank) ctx.fillRect(x, 0, 3, w);
  ctx.globalAlpha = 0.5;
  for (let i = 0; i < 18; i++) {
    ctx.fillStyle = '#333';
    ctx.beginPath(); ctx.arc(rnd(0, w), rnd(0, w), rnd(2, 4), 0, 7); ctx.fill();
  }
  ctx.globalAlpha = 1;
  grain(ctx, w, w, 20, 0.3);
  return c;
}

function makeSandbag() {
  const w = 256, c = canvas(w), ctx = c.getContext('2d');
  ctx.fillStyle = '#9a8964'; ctx.fillRect(0, 0, w, w);
  blotches(ctx, w, w, ['#b8a67c', '#77684a', '#c8b78d'], 20, 10, 80, 0.3);
  for (let y = 0; y < w; y += 4) {
    for (let x = 0; x < w; x += 4) {
      ctx.fillStyle = `rgba(${Math.random() > 0.5 ? 255 : 40},${Math.random() > 0.5 ? 250 : 40},${200},${rnd(0.02, 0.09)})`;
      ctx.fillRect(x, y, 2, 2);
    }
  }
  grain(ctx, w, w, 22, 0.3);
  return c;
}

function makeCamo() {
  const w = 512, c = canvas(w), ctx = c.getContext('2d');
  ctx.fillStyle = '#8b8066'; ctx.fillRect(0, 0, w, w);
  const cols = ['#5b5c47', '#a09272', '#3f4438', '#6f6650', '#c2b48f'];
  for (let i = 0; i < 170; i++) {
    ctx.fillStyle = cols[(Math.random() * cols.length) | 0];
    ctx.globalAlpha = rnd(0.55, 0.95);
    ctx.beginPath();
    const x = rnd(0, w), y = rnd(0, w), r = rnd(8, 46);
    ctx.moveTo(x + rnd(-r, r), y + rnd(-r, r));
    for (let k = 0; k < 6; k++) ctx.quadraticCurveTo(x + rnd(-r, r), y + rnd(-r, r), x + rnd(-r, r), y + rnd(-r, r));
    ctx.fill();
  }
  ctx.globalAlpha = 1;
  grain(ctx, w, w, 14, 0.1);
  return c;
}

function makeGunmetal() {
  const w = 256, c = canvas(w), ctx = c.getContext('2d');
  ctx.fillStyle = '#262729'; ctx.fillRect(0, 0, w, w);
  for (let i = 0; i < 350; i++) {
    ctx.strokeStyle = `rgba(${Math.random() > 0.5 ? 190 : 0},${Math.random() > 0.5 ? 190 : 0},${Math.random() > 0.5 ? 190 : 0},${rnd(0.02, 0.12)})`;
    ctx.lineWidth = rnd(0.4, 1.2);
    ctx.beginPath(); ctx.moveTo(rnd(0, w), rnd(0, w)); ctx.lineTo(rnd(0, w), rnd(0, w)); ctx.stroke();
  }
  grain(ctx, w, w, 8, 0);
  return c;
}

function makeFacade() {
  const w = 512, c = canvas(w), ctx = c.getContext('2d');
  ctx.fillStyle = '#9a8f7c'; ctx.fillRect(0, 0, w, w);
  blotches(ctx, w, w, ['#b4aa96', '#756c5d', '#8b8170'], 30, 30, 160, 0.25);
  const cols = 6, rows = 8, cw = w / cols, ch = w / rows;
  for (let r = 0; r < rows; r++) {
    for (let col = 0; col < cols; col++) {
      const x = col * cw + cw * 0.2, y = r * ch + ch * 0.18, ww = cw * 0.6, hh = ch * 0.55;
      ctx.fillStyle = '#2c2f2f'; ctx.fillRect(x - 3, y - 3, ww + 6, hh + 6);
      const lit = Math.random() > 0.78;
      const g = ctx.createLinearGradient(x, y, x, y + hh);
      if (lit) { g.addColorStop(0, '#ffd79b'); g.addColorStop(1, '#8d6b3d'); }
      else { g.addColorStop(0, '#4d5a61'); g.addColorStop(1, '#20262a'); }
      ctx.fillStyle = g; ctx.fillRect(x, y, ww, hh);
      ctx.fillStyle = 'rgba(230,225,210,0.35)'; ctx.fillRect(x + ww * 0.48, y, 2, hh);
      if (!lit) { ctx.fillStyle = 'rgba(20,22,24,0.5)'; ctx.fillRect(x, y, ww, hh * 0.25); }
      ctx.fillStyle = 'rgba(160,150,130,0.5)'; ctx.fillRect(x - 5, y + hh + 3, ww + 10, 5);
      if (Math.random() > 0.86) {
        ctx.fillStyle = '#6f6a60'; ctx.fillRect(x + ww * 0.15, y + hh * 0.6, ww * 0.28, hh * 0.35);
      }
    }
  }
  for (let i = 0; i < 26; i++) {
    const x = rnd(0, w), y = rnd(0, w);
    const g = ctx.createLinearGradient(x, y, x, y + rnd(50, 200));
    g.addColorStop(0, 'rgba(40,36,30,0.28)'); g.addColorStop(1, 'rgba(40,36,30,0)');
    ctx.fillStyle = g; ctx.fillRect(x, y, rnd(5, 30), rnd(50, 200));
  }
  cracks(ctx, w, w, 12, 'rgba(50,45,38,0.35)', 1.2);
  grain(ctx, w, w, 14, 0.4);
  return c;
}


function makeSandMask() {
  const w = 512, c = canvas(w), ctx = c.getContext('2d');
  ctx.fillStyle = '#000'; ctx.fillRect(0, 0, w, w);
  for (let i = 0; i < 90; i++) {
    const a = Math.random() * Math.PI * 2, rr = Math.random() * w * 0.30;
    const x = w / 2 + Math.cos(a) * rr, y = w / 2 + Math.sin(a) * rr;
    const r = rnd(w * 0.05, w * 0.16);
    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, 'rgba(255,255,255,0.95)');
    g.addColorStop(0.55, 'rgba(255,255,255,0.7)');
    g.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
  }
  const fade = ctx.createRadialGradient(w / 2, w / 2, w * 0.22, w / 2, w / 2, w * 0.5);
  fade.addColorStop(0, 'rgba(0,0,0,0)');
  fade.addColorStop(0.75, 'rgba(0,0,0,0.35)');
  fade.addColorStop(1, 'rgba(0,0,0,1)');
  ctx.fillStyle = fade; ctx.fillRect(0, 0, w, w);
  return c;
}

function makeLeaf() {
  const w = 256, h = 512, c = canvas(w, h), ctx = c.getContext('2d');
  ctx.clearRect(0, 0, w, h);
  const cx = w / 2;
  const grad = ctx.createLinearGradient(0, h, 0, 0);
  grad.addColorStop(0, '#3d4a24'); grad.addColorStop(1, '#7d8c45');
  ctx.strokeStyle = grad; ctx.lineWidth = 5;
  ctx.beginPath(); ctx.moveTo(cx, h); ctx.lineTo(cx, 10); ctx.stroke();
  for (let i = 0; i < 46; i++) {
    const t = i / 46;
    const y = h - 20 - t * (h - 30);
    const len = (1 - t * 0.75) * w * 0.48;
    const droop = 14 + t * 26;
    ctx.strokeStyle = grad; ctx.lineWidth = 2.2;
    ctx.beginPath(); ctx.moveTo(cx, y);
    ctx.quadraticCurveTo(cx - len * 0.55, y - droop * 0.4, cx - len, y + droop);
    ctx.stroke();
    ctx.beginPath(); ctx.moveTo(cx, y);
    ctx.quadraticCurveTo(cx + len * 0.55, y - droop * 0.4, cx + len, y + droop);
    ctx.stroke();
  }
  return c;
}

function makeSmoke() {
  const w = 128, c = canvas(w), ctx = c.getContext('2d');
  const g = ctx.createRadialGradient(w / 2, w / 2, 0, w / 2, w / 2, w / 2);
  g.addColorStop(0, 'rgba(255,255,255,0.9)');
  g.addColorStop(0.35, 'rgba(255,255,255,0.45)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = g; ctx.fillRect(0, 0, w, w);
  return c;
}

function makeFlash() {
  const w = 256, c = canvas(w), ctx = c.getContext('2d');
  ctx.clearRect(0, 0, w, w);
  const g = ctx.createRadialGradient(w / 2, w / 2, 0, w / 2, w / 2, w / 2);
  g.addColorStop(0, 'rgba(255,255,235,1)');
  g.addColorStop(0.15, 'rgba(255,220,150,0.95)');
  g.addColorStop(0.45, 'rgba(255,150,50,0.35)');
  g.addColorStop(1, 'rgba(255,100,20,0)');
  ctx.fillStyle = g; ctx.fillRect(0, 0, w, w);
  ctx.translate(w / 2, w / 2);
  for (let i = 0; i < 7; i++) {
    ctx.rotate(Math.PI / 3.5);
    const lg = ctx.createLinearGradient(0, 0, w * 0.48, 0);
    lg.addColorStop(0, 'rgba(255,245,210,0.9)'); lg.addColorStop(1, 'rgba(255,140,40,0)');
    ctx.fillStyle = lg;
    ctx.beginPath(); ctx.moveTo(0, -4); ctx.lineTo(w * 0.48, 0); ctx.lineTo(0, 4); ctx.fill();
  }
  return c;
}

function makeBulletHole() {
  const w = 128, c = canvas(w), ctx = c.getContext('2d');
  ctx.clearRect(0, 0, w, w);
  const g = ctx.createRadialGradient(w / 2, w / 2, 0, w / 2, w / 2, w / 2);
  g.addColorStop(0, 'rgba(10,9,8,0.95)');
  g.addColorStop(0.22, 'rgba(25,22,19,0.9)');
  g.addColorStop(0.5, 'rgba(55,50,44,0.45)');
  g.addColorStop(1, 'rgba(70,64,56,0)');
  ctx.fillStyle = g; ctx.fillRect(0, 0, w, w);
  ctx.strokeStyle = 'rgba(25,22,18,0.7)';
  for (let i = 0; i < 9; i++) {
    const a = Math.random() * 6.28, r = rnd(12, 26);
    ctx.lineWidth = rnd(0.8, 2);
    ctx.beginPath(); ctx.moveTo(w / 2 + Math.cos(a) * 8, w / 2 + Math.sin(a) * 8);
    ctx.lineTo(w / 2 + Math.cos(a) * r, w / 2 + Math.sin(a) * r); ctx.stroke();
  }
  return c;
}

function makeSign(title, sub, accent = '#d9a13a') {
  const w = 512, h = 256, c = canvas(w, h), ctx = c.getContext('2d');
  ctx.fillStyle = '#2b2c29'; ctx.fillRect(0, 0, w, h);
  blotches(ctx, w, h, ['#4a4a42', '#191a18', '#6a5c46'], 20, 20, 110, 0.25);
  ctx.strokeStyle = 'rgba(200,190,160,0.5)'; ctx.lineWidth = 6;
  ctx.strokeRect(12, 12, w - 24, h - 24);
  ctx.fillStyle = accent; ctx.font = 'bold 54px Arial Narrow, Arial'; ctx.textAlign = 'center';
  ctx.fillText(title, w / 2, h / 2 - 8);
  ctx.fillStyle = '#cfc6ae'; ctx.font = '24px Arial Narrow, Arial';
  ctx.fillText(sub, w / 2, h / 2 + 50);
  ctx.globalAlpha = 0.25;
  for (let i = 0; i < 40; i++) {
    ctx.fillStyle = '#000'; ctx.fillRect(rnd(0, w), rnd(0, h), rnd(2, 22), rnd(2, 10));
  }
  ctx.globalAlpha = 1;
  grain(ctx, w, h, 12, 0.3);
  return c;
}

export function createTextures() {
  const asphaltC = makeAsphalt();
  const concreteC = makeConcrete();
  const sandC = makeSand();
  const metalGreenC = makeMetal('#4e5b4e', 0.8);
  const metalBlueC = makeMetal('#3e5563', 0.6);
  const metalRedC = makeMetal('#7a4a3a', 0.9);
  const metalGrayC = makeMetal('#60666a', 0.35);
  const woodC = makeWood();
  const bagC = makeSandbag();
  const camoC = makeCamo();
  const gunC = makeGunmetal();
  const facadeC = makeFacade();
  const leafC = makeLeaf();
  const smokeC = makeSmoke();
  const flashC = makeFlash();
  const holeC = makeBulletHole();
  const maskC = makeSandMask();

  return {
    asphalt: tex(asphaltC, 26, 26),
    asphaltBump: tex(asphaltC, 26, 26, false),
    concrete: tex(concreteC, 2, 2),
    concreteBump: tex(concreteC, 2, 2, false),
    concreteWall: tex(concreteC, 7, 1.6),
    sand: tex(sandC, 18, 18),
    sandBump: tex(sandC, 18, 18, false),
    sandPatch: tex(sandC, 3, 3),
    sandGround: tex(sandC, 9, 9),
    sandMask: tex(maskC, 1, 1, false),
    containerGreen: tex(metalGreenC, 4, 1.4),
    containerBlue: tex(metalBlueC, 4, 1.4),
    containerRed: tex(metalRedC, 4, 1.4),
    metalGray: tex(metalGrayC, 2, 2),
    metalBump: tex(metalGrayC, 4, 4, false),
    wood: tex(woodC, 1, 1),
    woodBump: tex(woodC, 1, 1, false),
    bag: tex(bagC, 1, 1),
    camo: tex(camoC, 1.6, 1.6),
    gunmetal: tex(gunC, 1, 1),
    facade: tex(facadeC, 1, 1),
    facadeBump: tex(facadeC, 1, 1, false),
    leaf: tex(leafC, 1, 1),
    smoke: tex(smokeC, 1, 1),
    flash: tex(flashC, 1, 1),
    hole: tex(holeC, 1, 1),
    signs: {
      restricted: tex(makeSign('RESTRICTED', 'AUTHORIZED PERSONNEL ONLY', '#d9a13a'), 1, 1),
      sector: tex(makeSign('SECTOR 07', 'FORWARD OPERATING BASE', '#d5c8a5'), 1, 1),
      danger: tex(makeSign('DANGER', 'LIVE FIRE RANGE', '#c95d3a'), 1, 1),
    },
  };
}
