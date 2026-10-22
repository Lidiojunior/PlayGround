import * as THREE from '../vendor/three.module.js';

function seeded(seed) {
  let t = seed >>> 0;
  return () => {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

export function canvasTexture(width, height, draw, options = {}) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  draw(ctx, width, height);
  const texture = new THREE.CanvasTexture(canvas);
  if (options.srgb !== false) texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = options.anisotropy ?? 8;
  if (options.repeat) {
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(options.repeat[0], options.repeat[1]);
  }
  texture.needsUpdate = true;
  return texture;
}

function noise(ctx, width, height, count, alpha, rand) {
  for (let i = 0; i < count; i++) {
    const value = Math.floor(rand() * 110 + 70);
    ctx.fillStyle = `rgba(${value},${value},${value},${alpha * (0.35 + rand() * 0.65)})`;
    const size = rand() < 0.85 ? 1 : 2;
    ctx.fillRect(rand() * width, rand() * height, size, size);
  }
}

export function concreteTexture(options = {}) {
  const size = options.size ?? 512;
  const rand = seeded(options.seed ?? 7);
  return canvasTexture(size, size, (ctx, w, h) => {
    ctx.fillStyle = options.base ?? '#3d4144';
    ctx.fillRect(0, 0, w, h);
    for (let i = 0; i < 90; i++) {
      const x = rand() * w;
      const y = rand() * h;
      const radius = 18 + rand() * 120;
      const shade = 20 + Math.floor(rand() * 35);
      const grad = ctx.createRadialGradient(x, y, 0, x, y, radius);
      grad.addColorStop(0, `rgba(${shade},${shade + 2},${shade + 3},${0.09 + rand() * 0.12})`);
      grad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = grad;
      ctx.fillRect(x - radius, y - radius, radius * 2, radius * 2);
    }
    for (let i = 0; i < 30; i++) {
      ctx.beginPath();
      const x = rand() * w;
      const y = rand() * h;
      ctx.moveTo(x, y);
      let cx = x;
      let cy = y;
      const steps = 2 + Math.floor(rand() * 5);
      for (let s = 0; s < steps; s++) {
        cx += (rand() - 0.5) * 72;
        cy += rand() * 46;
        ctx.lineTo(cx, cy);
      }
      ctx.strokeStyle = `rgba(14,16,17,${0.18 + rand() * 0.25})`;
      ctx.lineWidth = 0.6 + rand() * 1.2;
      ctx.stroke();
    }
    for (let i = 0; i < 16; i++) {
      const x = rand() * w;
      const y = rand() * h;
      ctx.beginPath();
      ctx.ellipse(x, y, 12 + rand() * 40, 3 + rand() * 9, rand() * Math.PI, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(22,24,25,${0.05 + rand() * 0.08})`;
      ctx.fill();
    }
    noise(ctx, w, h, 9000, 0.1, rand);
    ctx.strokeStyle = 'rgba(24,27,29,.5)';
    ctx.lineWidth = 2;
    ctx.strokeRect(1, 1, w - 2, h - 2);
    ctx.beginPath();
    ctx.moveTo(w / 2, 0);
    ctx.lineTo(w / 2, h);
    ctx.moveTo(0, h / 2);
    ctx.lineTo(w, h / 2);
    ctx.strokeStyle = 'rgba(24,27,29,.28)';
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }, { repeat: options.repeat ?? [1, 1], anisotropy: 8 });
}

export function wallTexture() {
  const rand = seeded(23);
  return canvasTexture(512, 512, (ctx, w, h) => {
    ctx.fillStyle = '#31363a';
    ctx.fillRect(0, 0, w, h);
    for (let i = 0; i < 60; i++) {
      const x = rand() * w;
      const y = rand() * h;
      const radius = 30 + rand() * 140;
      const shade = 18 + Math.floor(rand() * 24);
      const grad = ctx.createRadialGradient(x, y, 0, x, y, radius);
      grad.addColorStop(0, `rgba(${shade},${shade + 2},${shade + 3},${0.12 + rand() * 0.14})`);
      grad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = grad;
      ctx.fillRect(x - radius, y - radius, radius * 2, radius * 2);
    }
    ctx.fillStyle = 'rgba(255,255,255,.025)';
    ctx.fillRect(0, 8, w, 6);
    ctx.fillStyle = 'rgba(0,0,0,.35)';
    ctx.fillRect(0, 14, w, 3);
    ctx.strokeStyle = 'rgba(10,12,13,.6)';
    ctx.lineWidth = 4;
    ctx.strokeRect(0, 0, w, 128);
    ctx.strokeStyle = 'rgba(10,12,13,.45)';
    ctx.lineWidth = 2;
    ctx.strokeRect(4, 4, w - 8, 120);
    for (let i = 0; i < 14; i++) {
      ctx.fillStyle = 'rgba(8,10,11,.55)';
      ctx.beginPath();
      ctx.arc(14 + rand() * (w - 28), 16 + rand() * (h - 32), 2.4, 0, Math.PI * 2);
      ctx.fill();
    }
    for (let i = 0; i < 22; i++) {
      ctx.beginPath();
      let x = rand() * w;
      let y = rand() * h;
      ctx.moveTo(x, y);
      for (let s = 0; s < 4; s++) {
        x += (rand() - 0.5) * 90;
        y += rand() * 30;
        ctx.lineTo(x, y);
      }
      ctx.strokeStyle = `rgba(15,17,19,${0.15 + rand() * 0.2})`;
      ctx.lineWidth = 0.7 + rand() * 1.1;
      ctx.stroke();
    }
    const streak = ctx.createLinearGradient(0, 0, 0, h);
    streak.addColorStop(0, 'rgba(0,0,0,0)');
    streak.addColorStop(0.7, 'rgba(0,0,0,.06)');
    streak.addColorStop(1, 'rgba(0,0,0,.22)');
    ctx.fillStyle = streak;
    ctx.fillRect(0, 0, w, h);
    noise(ctx, w, h, 7000, 0.09, rand);
  }, { repeat: [4, 1] });
}

export function targetTexture(number) {
  const rand = seeded(100 + number * 17);
  return canvasTexture(320, 480, (ctx, w, h) => {
    ctx.fillStyle = '#c7bda6';
    ctx.fillRect(0, 0, w, h);
    const paper = ctx.createLinearGradient(0, 0, w, h);
    paper.addColorStop(0, 'rgba(255,255,255,.18)');
    paper.addColorStop(0.5, 'rgba(0,0,0,0)');
    paper.addColorStop(1, 'rgba(75,63,45,.24)');
    ctx.fillStyle = paper;
    ctx.fillRect(0, 0, w, h);
    for (let i = 0; i < 26; i++) {
      ctx.beginPath();
      ctx.ellipse(rand() * w, rand() * h, 6 + rand() * 38, 2 + rand() * 10, rand() * Math.PI, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(99,84,62,${0.03 + rand() * 0.06})`;
      ctx.fill();
    }
    ctx.fillStyle = '#b7251b';
    ctx.fillRect(0, 0, w, 30);
    ctx.fillStyle = 'rgba(255,255,255,.9)';
    ctx.font = '700 18px "Arial Narrow", Arial, sans-serif';
    ctx.textBaseline = 'middle';
    ctx.fillText('HOSTIL', 12, 16);
    ctx.textAlign = 'right';
    ctx.fillText('Nº ' + String(number).padStart(2, '0'), w - 12, 16);
    ctx.textAlign = 'left';
    ctx.fillStyle = '#16191a';
    ctx.beginPath();
    ctx.arc(w / 2, 86, 34, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillRect(w / 2 - 13, 112, 26, 28);
    ctx.beginPath();
    ctx.moveTo(w / 2 - 72, 150);
    ctx.quadraticCurveTo(w / 2 - 60, 134, w / 2 - 24, 138);
    ctx.lineTo(w / 2 + 24, 138);
    ctx.quadraticCurveTo(w / 2 + 60, 134, w / 2 + 72, 150);
    ctx.lineTo(w / 2 + 66, 330);
    ctx.quadraticCurveTo(w / 2 + 54, 352, w / 2 + 26, 356);
    ctx.lineTo(w / 2 - 26, 356);
    ctx.quadraticCurveTo(w / 2 - 54, 352, w / 2 - 66, 330);
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(w / 2 - 64, 158);
    ctx.lineTo(w / 2 - 92, 286);
    ctx.lineTo(w / 2 - 70, 294);
    ctx.lineTo(w / 2 - 42, 178);
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(w / 2 + 64, 158);
    ctx.lineTo(w / 2 + 92, 286);
    ctx.lineTo(w / 2 + 70, 294);
    ctx.lineTo(w / 2 + 42, 178);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = 'rgba(104,92,73,.55)';
    ctx.lineWidth = 1.4;
    for (let r = 20; r <= 60; r += 20) {
      ctx.beginPath();
      ctx.arc(w / 2, 240, r, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.beginPath();
    ctx.moveTo(w / 2 - 78, 240);
    ctx.lineTo(w / 2 + 78, 240);
    ctx.moveTo(w / 2, 178);
    ctx.lineTo(w / 2, 326);
    ctx.strokeStyle = 'rgba(104,92,73,.35)';
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.fillStyle = 'rgba(24,26,26,.8)';
    ctx.font = '700 10px "Arial Narrow", Arial, sans-serif';
    ctx.fillText('BLACKSITE / RANGE 07', 12, h - 26);
    ctx.textAlign = 'right';
    ctx.fillText('CQB-IV', w - 12, h - 26);
    ctx.textAlign = 'left';
    ctx.strokeStyle = 'rgba(70,62,48,.4)';
    ctx.lineWidth = 1;
    ctx.strokeRect(9, 38, w - 18, h - 74);
    for (let i = 0; i < 8; i++) {
      ctx.beginPath();
      ctx.arc(rand() * w, rand() * h, 1 + rand() * 2.5, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(35,30,24,.35)';
      ctx.fill();
    }
    noise(ctx, w, h, 1800, 0.06, rand);
  });
}

export function signTexture(label = 'BLACKSITE', sub = 'TACTICAL TRAINING COMPLEX') {
  const rand = seeded(64);
  return canvasTexture(1024, 256, (ctx, w, h) => {
    ctx.fillStyle = '#0a0c0d';
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = 'rgba(255,255,255,.025)';
    ctx.fillRect(0, 0, w, 4);
    for (let i = 0; i < 6; i++) {
      ctx.fillStyle = i % 2 ? '#d2491a' : '#141617';
      ctx.save();
      ctx.translate(i * 18, 0);
      ctx.beginPath();
      ctx.moveTo(0, h);
      ctx.lineTo(10, h);
      ctx.lineTo(48, 0);
      ctx.lineTo(38, 0);
      ctx.fill();
      ctx.restore();
    }
    ctx.save();
    ctx.translate(84, 0);
    ctx.fillStyle = '#e9e5dc';
    ctx.font = '800 132px "Barlow Condensed", "Arial Narrow", Impact, sans-serif';
    ctx.textBaseline = 'middle';
    ctx.fillText(label, 12, h / 2 + 8);
    ctx.fillStyle = '#ff5a1f';
    ctx.font = '700 25px "Share Tech Mono", monospace';
    ctx.fillText('// ' + sub, 20, h - 26);
    ctx.strokeStyle = 'rgba(255,90,31,.65)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(20, h - 46);
    ctx.lineTo(w - 40, h - 46);
    ctx.stroke();
    ctx.fillStyle = 'rgba(255,255,255,.3)';
    ctx.font = '400 14px "Share Tech Mono", monospace';
    ctx.textAlign = 'right';
    ctx.fillText('R-07', w - 46, 42);
    ctx.fillText('OPS / 24H', w - 46, 66);
    ctx.restore();
    ctx.strokeStyle = 'rgba(255,255,255,.1)';
    ctx.lineWidth = 2;
    ctx.strokeRect(3, 3, w - 6, h - 6);
    noise(ctx, w, h, 1200, 0.05, rand);
  });
}

export function hazardTexture() {
  const rand = seeded(31);
  return canvasTexture(512, 128, (ctx, w, h) => {
    ctx.fillStyle = '#d39b22';
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = '#141516';
    for (let i = -2; i < 12; i++) {
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(i * 64, h);
      ctx.lineTo(i * 64 + 26, h);
      ctx.lineTo(i * 64 + 90, 0);
      ctx.lineTo(i * 64 + 64, 0);
      ctx.fill();
      ctx.restore();
    }
    for (let i = 0; i < 18; i++) {
      ctx.fillStyle = `rgba(10,10,10,${rand() * 0.14})`;
      ctx.fillRect(rand() * w, rand() * h, 20 + rand() * 80, 2 + rand() * 6);
    }
    ctx.fillStyle = 'rgba(255,255,255,.04)';
    ctx.fillRect(0, 0, w, 10);
    noise(ctx, w, h, 1600, 0.1, rand);
  }, { repeat: [3, 1] });
}

export function crateTexture() {
  const rand = seeded(93);
  return canvasTexture(256, 256, (ctx, w, h) => {
    ctx.fillStyle = '#5b4a35';
    ctx.fillRect(0, 0, w, h);
    for (let i = 0; i < 5; i++) {
      const y = i * (h / 5);
      ctx.fillStyle = i % 2 ? '#4a3c2b' : '#564532';
      ctx.fillRect(0, y + 2, w, h / 5 - 4);
      ctx.fillStyle = 'rgba(0,0,0,.25)';
      ctx.fillRect(0, y, w, 2);
      ctx.fillStyle = 'rgba(255,255,255,.04)';
      ctx.fillRect(0, y + 3, w, 2);
    }
    ctx.strokeStyle = '#2c231a';
    ctx.lineWidth = 8;
    ctx.strokeRect(0, 0, w, h);
    ctx.strokeStyle = 'rgba(255,255,255,.08)';
    ctx.lineWidth = 2;
    ctx.strokeRect(6, 6, w - 12, h - 12);
    ctx.fillStyle = 'rgba(20,18,14,.6)';
    ctx.font = '700 15px "Arial Narrow", Arial, sans-serif';
    ctx.fillText('BLACKSITE', 20, 38);
    ctx.font = '400 11px "Share Tech Mono", monospace';
    ctx.fillText('7.62 MM / LOT 04', 20, 54);
    for (let i = 0; i < 30; i++) {
      ctx.fillStyle = `rgba(20,16,12,${rand() * 0.1})`;
      ctx.fillRect(rand() * w, rand() * h, 1 + rand() * 28, 1);
    }
    for (let i = 0; i < 8; i++) {
      ctx.beginPath();
      ctx.arc(rand() * w, rand() * h, 1.5, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(30,24,18,.6)';
      ctx.fill();
    }
  });
}

export function glowTexture(inner = 'rgba(255,255,255,1)', mid = 'rgba(255,190,110,.55)') {
  return canvasTexture(128, 128, (ctx, w, h) => {
    const g = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w / 2);
    g.addColorStop(0, inner);
    g.addColorStop(0.18, mid);
    g.addColorStop(0.55, 'rgba(255,120,40,.12)');
    g.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
  }, { srgb: true });
}

export function muzzleTexture() {
  return canvasTexture(256, 256, (ctx, w, h) => {
    const cx = w / 2;
    const cy = h / 2;
    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, w / 2);
    grad.addColorStop(0, 'rgba(255,255,240,1)');
    grad.addColorStop(0.12, 'rgba(255,226,150,.95)');
    grad.addColorStop(0.34, 'rgba(255,132,38,.4)');
    grad.addColorStop(1, 'rgba(255,70,10,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = 'rgba(255,255,235,.95)';
    for (let i = 0; i < 6; i++) {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate((i / 6) * Math.PI * 2);
      ctx.beginPath();
      ctx.moveTo(0, -4);
      ctx.lineTo(w * 0.46, 0);
      ctx.lineTo(0, 4);
      ctx.fill();
      ctx.restore();
    }
  });
}

export function reticleTexture() {
  return canvasTexture(128, 128, (ctx, w, h) => {
    ctx.clearRect(0, 0, w, h);
    ctx.strokeStyle = 'rgba(255,80,30,.95)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(w / 2, h / 2, 26, 0, Math.PI * 2);
    ctx.stroke();
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgba(255,140,90,.55)';
    ctx.beginPath();
    ctx.arc(w / 2, h / 2, 34, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fillStyle = 'rgba(255,70,20,1)';
    ctx.beginPath();
    ctx.arc(w / 2, h / 2, 2.6, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = 'rgba(255,90,30,.9)';
    ctx.lineWidth = 2;
    for (const angle of [0, Math.PI / 2, Math.PI, Math.PI * 1.5]) {
      ctx.save();
      ctx.translate(w / 2, h / 2);
      ctx.rotate(angle);
      ctx.beginPath();
      ctx.moveTo(0, -42);
      ctx.lineTo(0, -34);
      ctx.stroke();
      ctx.restore();
    }
  });
}

export function bulletHoleTexture() {
  const rand = seeded(12);
  return canvasTexture(64, 64, (ctx, w, h) => {
    ctx.clearRect(0, 0, w, h);
    const g = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, 22);
    g.addColorStop(0, 'rgba(3,3,3,.98)');
    g.addColorStop(0.35, 'rgba(8,8,8,.9)');
    g.addColorStop(0.7, 'rgba(20,18,16,.55)');
    g.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = 'rgba(10,9,8,.5)';
    ctx.lineWidth = 0.8;
    for (let i = 0; i < 7; i++) {
      const a = rand() * Math.PI * 2;
      const len = 10 + rand() * 18;
      ctx.beginPath();
      ctx.moveTo(w / 2 + Math.cos(a) * 4, h / 2 + Math.sin(a) * 4);
      ctx.lineTo(w / 2 + Math.cos(a) * len, h / 2 + Math.sin(a) * len);
      ctx.stroke();
    }
  });
}

export function softParticleTexture() {
  return canvasTexture(64, 64, (ctx, w, h) => {
    const g = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w / 2);
    g.addColorStop(0, 'rgba(255,255,255,.9)');
    g.addColorStop(0.4, 'rgba(255,255,255,.3)');
    g.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
  });
}

export function dustTexture() {
  return canvasTexture(32, 32, (ctx, w, h) => {
    const g = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w / 2);
    g.addColorStop(0, 'rgba(255,245,225,.9)');
    g.addColorStop(0.5, 'rgba(255,235,205,.2)');
    g.addColorStop(1, 'rgba(255,220,180,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
  });
}

export function laneNumberTexture(number) {
  return canvasTexture(128, 256, (ctx, w, h) => {
    ctx.clearRect(0, 0, w, h);
    ctx.strokeStyle = 'rgba(255,170,70,.8)';
    ctx.lineWidth = 3;
    ctx.strokeRect(8, 8, w - 16, h - 16);
    ctx.fillStyle = 'rgba(255,180,90,.95)';
    ctx.font = '700 26px "Share Tech Mono", monospace';
    ctx.textAlign = 'center';
    ctx.fillText('LANE', w / 2, 52);
    ctx.font = '700 104px "Barlow Condensed", "Arial Narrow", sans-serif';
    ctx.fillText(String(number).padStart(2, '0'), w / 2, 172);
    ctx.strokeStyle = 'rgba(255,170,70,.5)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(20, 205);
    ctx.lineTo(w - 20, 205);
    ctx.stroke();
    ctx.fillStyle = 'rgba(255,190,120,.75)';
    ctx.font = '400 13px "Share Tech Mono", monospace';
    ctx.fillText('CQB / 07', w / 2, 230);
  });
}

export function gunSurfaceTexture() {
  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#ececec';
  ctx.fillRect(0, 0, size, size);
  for (let i = 0; i < 9000; i++) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    const v = Math.random() > 0.5 ? 255 : 0;
    ctx.fillStyle = `rgba(${v},${v},${v},${0.03 + Math.random() * 0.07})`;
    ctx.fillRect(x, y, 1 + Math.random() * 1.6, 1 + Math.random() * 1.6);
  }
  for (let i = 0; i < 70; i++) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    const len = 4 + Math.random() * 34;
    const a = Math.random() * Math.PI;
    ctx.strokeStyle = Math.random() > 0.45 ? 'rgba(255,255,255,0.16)' : 'rgba(0,0,0,0.14)';
    ctx.lineWidth = 0.6 + Math.random();
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + Math.cos(a) * len, y + Math.sin(a) * len);
    ctx.stroke();
  }
  for (let i = 0; i < 24; i++) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    const r = 2 + Math.random() * 9;
    const grad = ctx.createRadialGradient(x, y, 0, x, y, r);
    grad.addColorStop(0, 'rgba(40,40,40,0.09)');
    grad.addColorStop(1, 'rgba(40,40,40,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(x - r, y - r, r * 2, r * 2);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2.5, 2.5);
  texture.anisotropy = 4;
  return texture;
}
