import * as THREE from 'three';

class Pool {
  constructor(factory, n) {
    this.items = [];
    for (let i = 0; i < n; i++) this.items.push(factory());
    this.i = 0;
  }
  next() { const it = this.items[this.i]; this.i = (this.i + 1) % this.items.length; return it; }
}

export function createEffects(scene, tex, quality = {}) {
  const low = quality.low === true;
  const group = new THREE.Group();
  scene.add(group);

  // ---- sparks ----
  const SPARKS = low ? 180 : 380;
  const sPos = new Float32Array(SPARKS * 3);
  const sVel = new Float32Array(SPARKS * 3);
  const sCol = new Float32Array(SPARKS * 3);
  const sBase = new Float32Array(SPARKS * 3);
  const sLife = new Float32Array(SPARKS);
  const sMax = new Float32Array(SPARKS);
  const sGeo = new THREE.BufferGeometry();
  sGeo.setAttribute('position', new THREE.BufferAttribute(sPos, 3));
  sGeo.setAttribute('color', new THREE.BufferAttribute(sCol, 3));
  const sMat = new THREE.PointsMaterial({
    size: low ? 0.09 : 0.075, map: tex.flash, vertexColors: true, transparent: true,
    opacity: 1, depthWrite: false, blending: THREE.AdditiveBlending, sizeAttenuation: true,
  });
  const sparkPoints = new THREE.Points(sGeo, sMat);
  sparkPoints.frustumCulled = false;
  group.add(sparkPoints);
  let sIdx = 0;

  function sparkBurst(point, normal, count = 12, color = 0xffc477, speed = 4, spread = 0.9) {
    const c = new THREE.Color(color);
    for (let i = 0; i < count; i++) {
      const k = sIdx; sIdx = (sIdx + 1) % SPARKS;
      sPos[k * 3] = point.x; sPos[k * 3 + 1] = point.y; sPos[k * 3 + 2] = point.z;
      const n = normal ? normal.clone() : new THREE.Vector3(0, 1, 0);
      const dir = new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize();
      dir.multiplyScalar(spread).add(n.clone().multiplyScalar(0.6)).normalize();
      const sp = speed * (0.35 + Math.random() * 0.9);
      sVel[k * 3] = dir.x * sp; sVel[k * 3 + 1] = dir.y * sp + 1.2; sVel[k * 3 + 2] = dir.z * sp;
      const tint = 0.75 + Math.random() * 0.5;
      sBase[k * 3] = c.r * tint; sBase[k * 3 + 1] = c.g * tint; sBase[k * 3 + 2] = c.b * tint;
      sMax[k] = sLife[k] = 0.22 + Math.random() * 0.5;
    }
  }

  // ---- smoke puffs ----
  const PUFFS = low ? 22 : 44;
  const puffPool = new Pool(() => {
    const sp = new THREE.Sprite(new THREE.SpriteMaterial({
      map: tex.smoke, transparent: true, opacity: 0, depthWrite: false,
      color: 0xffffff, blending: THREE.NormalBlending,
    }));
    sp.visible = false; group.add(sp); return sp;
  }, PUFFS);
  const puffs = [];
  for (let i = 0; i < PUFFS; i++) puffs.push({ sprite: null, life: 0, max: 1, grow: 1, rise: 0.5, base: 0 });

  function smoke(point, scale = 0.6, color = 0xc7b79d, life = 1.2, opacity = 0.4, rise = 0.6) {
    const p = puffs[puffPool.i];
    const sp = puffPool.next();
    sp.visible = true;
    sp.position.copy(point);
    sp.scale.setScalar(scale);
    sp.material.color.setHex(color);
    sp.material.opacity = opacity;
    sp.material.rotation = Math.random() * Math.PI * 2;
    p.sprite = sp; p.life = p.max = life; p.grow = scale * 2.6; p.rise = rise; p.base = opacity;
  }

  // ---- tracers ----
  const TRACERS = low ? 12 : 22;
  const tracerGeo = new THREE.CylinderGeometry(0.014, 0.014, 1, 5, 1, true);
  tracerGeo.translate(0, 0.5, 0);
  const tracerPool = new Pool(() => {
    const mat = new THREE.MeshBasicMaterial({ color: 0xffd28a, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false });
    const m = new THREE.Mesh(tracerGeo, mat);
    m.visible = false; m.frustumCulled = false; group.add(m); return m;
  }, TRACERS);
  const tracers = [];
  for (let i = 0; i < TRACERS; i++) tracers.push({ life: 0, max: 0.07, mesh: null });
  let tIdx = 0;
  const up = new THREE.Vector3(0, 1, 0);

  function tracer(from, to, color = 0xffd28a, life = 0.065) {
    const mesh = tracerPool.next();
    const t = tracers[tIdx]; tIdx = (tIdx + 1) % TRACERS;
    const dir = new THREE.Vector3().subVectors(to, from);
    const len = dir.length();
    mesh.visible = true;
    mesh.position.copy(from);
    mesh.quaternion.setFromUnitVectors(up, dir.clone().normalize());
    mesh.scale.set(1, Math.max(0.4, len), 1);
    mesh.material.color.setHex(color);
    mesh.material.opacity = 0.95;
    t.mesh = mesh; t.life = t.max = life;
  }

  // ---- bullet holes ----
  const HOLES = low ? 24 : 48;
  const holeGeo = new THREE.PlaneGeometry(0.24, 0.24);
  const holePool = new Pool(() => {
    const m = new THREE.Mesh(holeGeo, new THREE.MeshBasicMaterial({
      map: tex.hole, transparent: true, depthWrite: false, polygonOffset: true,
      polygonOffsetFactor: -4, polygonOffsetUnits: -4, opacity: 0.95,
    }));
    m.visible = false; group.add(m); return m;
  }, HOLES);

  function bulletHole(point, normal) {
    const m = holePool.next();
    m.visible = true;
    m.position.copy(point).addScaledVector(normal, 0.012);
    m.lookAt(point.clone().add(normal));
    m.rotateZ(Math.random() * Math.PI * 2);
    const s = 0.65 + Math.random() * 0.6;
    m.scale.setScalar(s);
  }

  // ---- shell casings ----
  const CASINGS = low ? 10 : 20;
  const casingGeo = new THREE.CylinderGeometry(0.014, 0.016, 0.048, 7);
  const casingMat = new THREE.MeshStandardMaterial({ color: 0xc3a15a, metalness: 0.95, roughness: 0.28 });
  const casingPool = new Pool(() => {
    const m = new THREE.Mesh(casingGeo, casingMat);
    m.visible = false; m.castShadow = true; group.add(m); return m;
  }, CASINGS);
  const casings = [];
  for (let i = 0; i < CASINGS; i++) casings.push({ mesh: null, v: new THREE.Vector3(), av: new THREE.Vector3(), life: 0 });
  let cIdx = 0;

  function casing(pos, right, upDir) {
    const m = casingPool.next();
    const c = casings[cIdx]; cIdx = (cIdx + 1) % CASINGS;
    m.visible = true; m.position.copy(pos);
    m.rotation.set(Math.random() * 6, Math.random() * 6, Math.random() * 6);
    c.mesh = m; c.life = 2.2;
    c.v.copy(right).multiplyScalar(1.4 + Math.random() * 1.6).addScaledVector(upDir, 1.5 + Math.random()).add(new THREE.Vector3((Math.random() - 0.5) * 0.5, 0, (Math.random() - 0.5) * 0.5));
    c.av.set(Math.random() * 14, Math.random() * 14, Math.random() * 14);
  }

  // ---- impact composites ----
  function impact(point, normal, material = 'concrete', fromPlayer = true) {
    const sparks = material === 'metal' ? 16 : 9;
    sparkBurst(point, normal, sparks, material === 'metal' ? 0xffd79a : 0xffc477, material === 'metal' ? 5 : 3.4, 0.75);
    smoke(point, 0.28 + Math.random() * 0.22, material === 'metal' ? 0x9a9a96 : 0xc2b299, 0.9 + Math.random() * 0.5, 0.32, 0.7);
    if (material === 'metal' || material === 'concrete') bulletHole(point, normal);
  }

  function fleshHit(point, normal) {
    sparkBurst(point, normal, 10, 0x9e2b1c, 2.6, 0.55);
    smoke(point, 0.22, 0x6c2318, 0.7, 0.3, 0.3);
  }

  function update(dt) {
    // sparks
    for (let k = 0; k < SPARKS; k++) {
      if (sLife[k] <= 0) {
        if (sCol[k * 3] !== 0 || sCol[k * 3 + 1] !== 0 || sCol[k * 3 + 2] !== 0) {
          sCol[k * 3] = sCol[k * 3 + 1] = sCol[k * 3 + 2] = 0;
        }
        continue;
      }
      sLife[k] -= dt;
      const ratio = Math.max(0, sLife[k] / sMax[k]);
      sVel[k * 3 + 1] -= 9.8 * dt;
      sPos[k * 3] += sVel[k * 3] * dt;
      sPos[k * 3 + 1] += sVel[k * 3 + 1] * dt;
      sPos[k * 3 + 2] += sVel[k * 3 + 2] * dt;
      if (sPos[k * 3 + 1] < 0.02) { sPos[k * 3 + 1] = 0.02; sVel[k * 3 + 1] *= -0.3; sVel[k * 3] *= 0.6; sVel[k * 3 + 2] *= 0.6; }
      const f = ratio * ratio;
      sCol[k * 3] = sBase[k * 3] * f;
      sCol[k * 3 + 1] = sBase[k * 3 + 1] * f;
      sCol[k * 3 + 2] = sBase[k * 3 + 2] * f;
    }
    sGeo.attributes.position.needsUpdate = true;
    sGeo.attributes.color.needsUpdate = true;

    // smoke
    for (const p of puffs) {
      if (!p.sprite || p.life <= 0) continue;
      p.life -= dt;
      const t = Math.max(0, p.life / p.max);
      const sc = p.grow * (1 - t * 0.75);
      p.sprite.scale.setScalar(Math.max(sc, 0.01));
      p.sprite.material.opacity = p.base * Math.pow(t, 1.4);
      p.sprite.position.y += p.rise * dt;
      if (p.life <= 0) p.sprite.visible = false;
    }

    // tracers
    for (const t of tracers) {
      if (!t.mesh || t.life <= 0) continue;
      t.life -= dt;
      t.mesh.material.opacity = Math.max(0, t.life / t.max) * 0.9;
      if (t.life <= 0) t.mesh.visible = false;
    }

    // casings
    for (const c of casings) {
      if (!c.mesh || c.life <= 0) continue;
      c.life -= dt;
      c.v.y -= 12 * dt;
      c.mesh.position.addScaledVector(c.v, dt);
      c.mesh.rotation.x += c.av.x * dt; c.mesh.rotation.y += c.av.y * dt; c.mesh.rotation.z += c.av.z * dt;
      if (c.mesh.position.y < 0.03) {
        c.mesh.position.y = 0.03; c.v.y *= -0.35; c.v.x *= 0.5; c.v.z *= 0.5; c.av.multiplyScalar(0.65);
      }
      if (c.life <= 0) c.mesh.visible = false;
    }
  }

  function reset() {
    for (const p of puffs) { if (p.sprite) p.sprite.visible = false; p.life = 0; }
    for (const t of tracers) { if (t.mesh) t.mesh.visible = false; t.life = 0; }
    for (const c of casings) { if (c.mesh) c.mesh.visible = false; c.life = 0; }
  }

  return { group, sparkBurst, smoke, tracer, bulletHole, casing, impact, fleshHit, update, reset };
}
