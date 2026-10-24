import * as THREE from 'three';
import { Sky } from 'three/addons/objects/Sky.js';

const v3 = (x, y, z) => new THREE.Vector3(x, y, z);

function standard(map, opts = {}) {
  return new THREE.MeshStandardMaterial({ map, roughness: 0.92, metalness: 0.02, ...opts });
}

export function createWorld(scene, renderer, tex, quality = {}) {
  const low = quality.low === true;
  const root = new THREE.Group();
  scene.add(root);
  const colliders = [];
  const raycastTargets = [];
  const spawnPoints = [
    { x: 0, z: -26.5 }, { x: 26, z: -2 }, { x: -25.5, z: -4 },
    { x: 23, z: -19 }, { x: -23, z: -18 }, { x: 20, z: 19 }, { x: -20, z: 20 },
    { x: 2.5, z: -16.5 }, { x: -7, z: -18.5 }, { x: 12, z: -6.5 }, { x: -13, z: -11 },
    { x: 4.5, z: -3.5 }, { x: -8.5, z: 1.5 }, { x: 12, z: -14 },
  ];
  const tmpBox = new THREE.Box3();

  const M = {
    asphalt: standard(tex.asphalt, { bumpMap: tex.asphaltBump, bumpScale: 0.045, roughness: 0.95 }),
    sand: standard(tex.sand, { bumpMap: tex.sandBump, bumpScale: 0.03, roughness: 0.98 }),
    concrete: standard(tex.concrete, { bumpMap: tex.concreteBump, bumpScale: 0.04, roughness: 0.9 }),
    wall: standard(tex.concreteWall, { bumpMap: tex.concreteBump, bumpScale: 0.05, roughness: 0.93 }),
    sandbag: standard(tex.bag, { color: 0xb0a078, roughness: 0.96 }),
    wood: standard(tex.wood, { bumpMap: tex.woodBump, bumpScale: 0.05, roughness: 0.85 }),
    containerGreen: standard(tex.containerGreen, { metalness: 0.55, roughness: 0.55 }),
    containerBlue: standard(tex.containerBlue, { metalness: 0.55, roughness: 0.52 }),
    containerRed: standard(tex.containerRed, { metalness: 0.5, roughness: 0.6 }),
    metal: standard(tex.metalGray, { metalness: 0.75, roughness: 0.38, bumpMap: tex.metalBump, bumpScale: 0.02 }),
    darkMetal: new THREE.MeshStandardMaterial({ color: 0x2b2d2c, metalness: 0.8, roughness: 0.4 }),
    rubber: new THREE.MeshStandardMaterial({ color: 0x151616, roughness: 0.95 }),
    glass: new THREE.MeshStandardMaterial({ color: 0x17232a, metalness: 0.9, roughness: 0.16, emissive: 0x08141a, emissiveIntensity: 0.8 }),
    litGlass: new THREE.MeshStandardMaterial({ color: 0x6b5636, metalness: 0.3, roughness: 0.35, emissive: 0xffb45c, emissiveIntensity: 1.2 }),
    leaf: new THREE.MeshStandardMaterial({ map: tex.leaf, alphaTest: 0.42, side: THREE.DoubleSide, roughness: 0.9, color: 0x9aa06a }),
    trunk: new THREE.MeshStandardMaterial({ color: 0x5c4a36, roughness: 0.95 }),
    tarp: new THREE.MeshStandardMaterial({ color: 0x8a7a58, roughness: 0.9, side: THREE.DoubleSide }),
    emissiveWarm: new THREE.MeshStandardMaterial({ color: 0x2a2a2a, emissive: 0xffb35c, emissiveIntensity: 2.4 }),
    emissiveRed: new THREE.MeshStandardMaterial({ color: 0x220404, emissive: 0xff2a1a, emissiveIntensity: 3 }),
    wire: new THREE.MeshStandardMaterial({ color: 0x111212, roughness: 0.9 }),
  };

  function shootable(mesh) { mesh.userData.shootable = true; raycastTargets.push(mesh); return mesh; }

  function addBox(w, h, d, x, y, z, material, opts = {}) {
    const geo = new THREE.BoxGeometry(w, h, d);
    const m = new THREE.Mesh(geo, material);
    m.position.set(x, y, z);
    if (opts.ry) m.rotation.y = opts.ry;
    if (opts.rx) m.rotation.x = opts.rx;
    if (opts.rz) m.rotation.z = opts.rz;
    m.castShadow = opts.cast !== false;
    m.receiveShadow = opts.receive !== false;
    root.add(m);
    if (opts.collide !== false) {
      m.updateWorldMatrix(true, false);
      tmpBox.setFromObject(m);
      colliders.push(tmpBox.clone());
    }
    if (opts.target !== false) shootable(m);
    return m;
  }

  function addCyl(rt, rb, h, x, y, z, material, opts = {}) {
    const geo = new THREE.CylinderGeometry(rt, rb, h, opts.seg || 14, 1);
    const m = new THREE.Mesh(geo, material);
    m.position.set(x, y, z);
    if (opts.ry) m.rotation.y = opts.ry;
    if (opts.rx) m.rotation.x = opts.rx;
    if (opts.rz) m.rotation.z = opts.rz;
    m.castShadow = opts.cast !== false; m.receiveShadow = true;
    root.add(m);
    if (opts.collide) {
      m.updateWorldMatrix(true, false); tmpBox.setFromObject(m); colliders.push(tmpBox.clone());
    }
    if (opts.target !== false) shootable(m);
    return m;
  }

  // ---------- sky, light, atmosphere ----------
  const sky = new Sky();
  sky.scale.setScalar(4500);
  const sunPos = new THREE.Vector3();
  const elevation = 9.5, azimuth = 232;
  sunPos.setFromSphericalCoords(1, THREE.MathUtils.degToRad(90 - elevation), THREE.MathUtils.degToRad(azimuth));
  const uniforms = sky.material.uniforms;
  uniforms.turbidity.value = 5.6;
  uniforms.rayleigh.value = 2.1;
  uniforms.mieCoefficient.value = 0.0055;
  uniforms.mieDirectionalG.value = 0.82;
  uniforms.sunPosition.value.copy(sunPos);
  root.add(sky);

  scene.fog = new THREE.FogExp2(0xb5a184, low ? 0.0115 : 0.0082);
  scene.background = null;

  const hemi = new THREE.HemisphereLight(0x9db7cf, 0x655238, 0.5);
  root.add(hemi);

  const sun = new THREE.DirectionalLight(0xffcf94, 3.7);
  sun.position.copy(sunPos).multiplyScalar(85);
  sun.castShadow = true;
  sun.shadow.mapSize.set(low ? 1024 : 2048, low ? 1024 : 2048);
  sun.shadow.camera.left = -48; sun.shadow.camera.right = 48;
  sun.shadow.camera.top = 48; sun.shadow.camera.bottom = -48;
  sun.shadow.camera.near = 1; sun.shadow.camera.far = 220;
  sun.shadow.bias = -0.00035;
  sun.shadow.normalBias = 0.035;
  root.add(sun);
  root.add(sun.target);

  const fill = new THREE.DirectionalLight(0x7e9fc4, 0.32);
  fill.position.set(-40, 35, 45);
  root.add(fill);

  // ---------- ground ----------
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(220, 220), M.asphalt);
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;
  ground.userData.shootable = true;
  raycastTargets.push(ground);
  root.add(ground);

  const sandMat = new THREE.MeshStandardMaterial({
    map: tex.sandGround, alphaMap: tex.sandMask, transparent: true, opacity: 0.9,
    roughness: 0.99, metalness: 0, depthWrite: false, polygonOffset: true,
    polygonOffsetFactor: -1, polygonOffsetUnits: -1,
  });
  const sandZone = new THREE.Mesh(new THREE.PlaneGeometry(66, 66), sandMat);
  sandZone.rotation.x = -Math.PI / 2; sandZone.position.set(2, 0.012, 7); sandZone.receiveShadow = true;
  root.add(sandZone);

  const lineMat = new THREE.MeshStandardMaterial({ color: 0xc9a54f, roughness: 0.85, transparent: true, opacity: 0.55 });
  for (const [x, z, w, d, ry] of [[0, -4, 18, 0.22, 0], [0, -6, 18, 0.22, 0], [-8, 5, 0.2, 8, 0], [8, -13, 8, 0.2, Math.PI / 2]]) {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, d), lineMat);
    m.rotation.x = -Math.PI / 2; m.rotation.z = ry; m.position.set(x, 0.026, z); root.add(m);
  }

  // puddles / oil stains
  const oilMat = new THREE.MeshStandardMaterial({ color: 0x24272a, roughness: 0.16, metalness: 0.45, transparent: true, opacity: 0.5 });
  for (const [x, z, r] of [[-7.5, 7.5, 0.9], [10.5, -2.5, 1.2], [4.2, 12.5, 0.7], [-12, -6, 1.1]]) {
    const p = new THREE.Mesh(new THREE.CircleGeometry(r, 22), oilMat);
    p.rotation.x = -Math.PI / 2; p.scale.y = 0.62;
    p.position.set(x, 0.03, z); root.add(p);
  }

  // manhole + drain
  addCyl(0.55, 0.55, 0.06, -5, 0.03, 1, M.metal, { collide: false, target: false, cast: false });
  addBox(1.1, 0.05, 1.6, 10, 0.03, 14, M.darkMetal, { collide: false, target: false, cast: false });

  // ---------- perimeter walls ----------
  const wallH = 3.1, wallT = 0.55, B = 30;
  function wallSeg(cx, cz, len, ry) {
    addBox(len, wallH, wallT, cx, wallH / 2, cz, M.wall, { ry });
    for (let s = -len / 2 + 1.6; s <= len / 2 - 1.6; s += 4.2) {
      const px = ry ? cx : cx + s, pz = ry ? cz + s : cz;
      addBox(0.62, wallH + 0.45, 0.75, px, (wallH + 0.45) / 2, pz, M.concrete, { target: false });
    }
    // top cap
    addBox(len, 0.14, wallT + 0.22, cx, wallH + 0.07, cz, M.concrete, { ry, collide: false, target: false });
  }
  wallSeg(0, -B, 23.5, 0); wallSeg(18.25, -B, 23.5, 0);
  wallSeg(0, B, 23.5, 0); wallSeg(18.25, B, 23.5, 0);
  wallSeg(-B, 0, 28, 1); wallSeg(-B, 22, 16, 1);
  wallSeg(B, -22, 16, 1); wallSeg(B, 4, 24, 1);

  // gate frames and signs
  function gate(x, z, ry) {
    addBox(7.4, 0.55, 0.9, x, 3.4, z, M.concrete, { ry, collide: false, target: false });
    addBox(0.7, 3.6, 0.9, x - 3.5, 1.8, z, M.concrete, { ry, target: false });
    addBox(0.7, 3.6, 0.9, x + 3.5, 1.8, z, M.concrete, { ry, target: false });
    const signMat = new THREE.MeshStandardMaterial({ map: tex.signs.sector, roughness: 0.8 });
    const sign = new THREE.Mesh(new THREE.PlaneGeometry(3.4, 1.7), signMat);
    sign.position.set(x, 4.45, z + (z < 0 ? 0.46 : -0.46));
    if (ry) sign.rotation.y = z < 0 ? 0 : Math.PI;
    root.add(sign);
  }
  gate(0, -B, 0); gate(0, B, 0);

  // warning sign on wall
  const warn = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 1.2), new THREE.MeshStandardMaterial({ map: tex.signs.restricted, roughness: 0.85 }));
  warn.position.set(-14, 2.1, -B + 0.30); root.add(warn);
  const warn2 = warn.clone(); warn2.position.set(B - 0.30, 2.05, -6); warn2.rotation.y = -Math.PI / 2; root.add(warn2);

  // ---------- buildings ----------
  function building(x, z, w, d, h, opts = {}) {
    const bodyMat = opts.facade ? M.concrete : M.concrete;
    addBox(w, h, d, x, h / 2, z, bodyMat);
    addBox(w + 0.35, 0.35, d + 0.35, x, h + 0.17, z, M.concrete, { collide: false, target: false });
    // parapet
    const pw = 0.28;
    addBox(w + 0.2, 0.7, pw, x, h + 0.35, z - d / 2, M.concrete, { collide: false, target: false });
    addBox(w + 0.2, 0.7, pw, x, h + 0.35, z + d / 2, M.concrete, { collide: false, target: false });
    addBox(pw, 0.7, d, x - w / 2, h + 0.35, z, M.concrete, { collide: false, target: false });
    addBox(pw, 0.7, d, x + w / 2, h + 0.35, z, M.concrete, { collide: false, target: false });

    const glassMats = [M.glass, M.glass, M.glass, M.litGlass];
    const rows = Math.max(1, Math.floor((h - 2) / 2.6));
    const cols = Math.max(1, Math.floor((w - 1.8) / 2.1));
    const faces = opts.faces || ['front', 'right'];
    for (const face of faces) {
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const wy = 1.65 + r * 2.55;
          if (wy + 0.9 > h - 0.6) continue;
          const off = -w / 2 + 1.55 + c * 2.05;
          const gm = glassMats[(Math.random() * glassMats.length) | 0];
          if (face === 'front') {
            const win = new THREE.Mesh(new THREE.BoxGeometry(1.25, 1.3, 0.1), gm);
            win.position.set(x + off, wy, z + d / 2 + 0.06);
            root.add(win); shootable(win);
            addBox(1.45, 1.5, 0.14, x + off, wy, z + d / 2 + 0.02, M.concrete, { collide: false, target: false, cast: false });
          } else {
            const win = new THREE.Mesh(new THREE.BoxGeometry(0.1, 1.3, 1.25), gm);
            win.position.set(x + w / 2 + 0.06, wy, z + off * (d / w));
            root.add(win); shootable(win);
          }
        }
      }
    }
    // door
    addBox(1.5, 2.3, 0.12, x - w * 0.22, 1.15, z + d / 2 + 0.08, M.darkMetal, { collide: false, target: false });
    addBox(1.8, 0.18, 0.55, x - w * 0.22, 2.45, z + d / 2 + 0.26, M.darkMetal, { collide: false, target: false });
    // pipes
    addCyl(0.09, 0.09, h, x + w / 2 - 0.55, h / 2, z + d / 2 + 0.18, M.metal, { collide: false, seg: 8 });
    // AC units + roof clutter
    const acs = 1 + (Math.random() * 2 | 0);
    for (let i = 0; i < acs; i++) {
      const ax = x + (Math.random() - 0.5) * w * 0.7;
      const az = z + (Math.random() - 0.5) * d * 0.6;
      addBox(1.1, 0.75, 0.8, ax, h + 0.55, az, M.metal, { collide: false, target: false });
      addCyl(0.28, 0.28, 0.05, ax + 0.2, h + 0.55, az + 0.41, M.darkMetal, { rx: Math.PI / 2, collide: false, target: false, cast: false, seg: 10 });
    }
    if (opts.tank) {
      addCyl(1.05, 1.05, 1.9, x + w * 0.25, h + 1.55, z - d * 0.15, M.metal, { collide: false, seg: 18 });
      addBox(0.25, 1.1, 0.25, x + w * 0.25 - 0.65, h + 0.6, z - d * 0.15, M.darkMetal, { collide: false, target: false });
      addBox(0.25, 1.1, 0.25, x + w * 0.25 + 0.65, h + 0.6, z - d * 0.15, M.darkMetal, { collide: false, target: false });
    }
    if (opts.antenna) {
      addCyl(0.035, 0.06, 3.2, x - w * 0.3, h + 1.8, z - d * 0.3, M.darkMetal, { collide: false, target: false, seg: 6 });
      const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.09, 8, 8), M.emissiveRed);
      bulb.position.set(x - w * 0.3, h + 3.42, z - d * 0.3); root.add(bulb);
    }
    if (opts.awning) {
      addBox(3.2, 0.1, 1.6, x - w * 0.22, 2.65, z + d / 2 + 0.8, M.tarp, { collide: false, target: false, rx: 0.12 });
    }
    if (opts.balcony) {
      addBox(w * 0.55, 0.12, 1.2, x, 4.2, z + d / 2 + 0.5, M.concrete, { collide: false, target: false });
      addBox(w * 0.55, 0.85, 0.08, x, 4.65, z + d / 2 + 1.05, M.darkMetal, { collide: false, target: false });
    }
  }

  building(-18.5, -21.5, 12, 8.5, 8.2, { tank: true, antenna: true, faces: ['front', 'right'], balcony: true });
  building(19.5, -21, 9.5, 7.5, 6.3, { faces: ['front'], awning: true });
  building(-22.5, 8.5, 9, 10, 10.5, { tank: true, faces: ['right'], awning: true });
  building(21.5, 10.5, 10.5, 9, 7.4, { faces: ['front'], antenna: true });
  building(-6, -31.5, 13, 5, 9.5, { faces: ['front'], tank: true });

  // ---------- shipping containers ----------
  function container(x, z, ry, material, stack = 0) {
    const g = new THREE.Group();
    g.position.set(x, 1.28 + stack * 2.6, z); g.rotation.y = ry;
    const body = new THREE.Mesh(new THREE.BoxGeometry(6.1, 2.55, 2.45), material);
    body.castShadow = body.receiveShadow = true; body.userData.shootable = true;
    g.add(body); raycastTargets.push(body);
    for (const sx of [-3.08, 3.08]) {
      for (const sz of [-1.25, 1.25]) {
        const post = new THREE.Mesh(new THREE.BoxGeometry(0.18, 2.62, 0.18), M.darkMetal);
        post.position.set(sx, 0, sz); g.add(post);
      }
    }
    for (const sy of [-1.22, 1.22]) {
      const rail = new THREE.Mesh(new THREE.BoxGeometry(6.2, 0.12, 0.12), M.darkMetal);
      rail.position.set(0, sy, 1.26); g.add(rail);
    }
    const door = new THREE.Mesh(new THREE.BoxGeometry(0.1, 2.3, 2.2), M.darkMetal);
    door.position.set(3.09, 0, 0); g.add(door);
    for (const dz of [-0.6, 0.6]) {
      const bar = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 2.3, 6), M.metal);
      bar.position.set(3.17, 0, dz); g.add(bar);
    }
    root.add(g);
    g.updateWorldMatrix(true, true);
    tmpBox.setFromObject(g); colliders.push(tmpBox.clone());
    return g;
  }
  container(11, -11.5, 0.12, M.containerGreen);
  container(11.3, -11.4, 0.12, M.containerBlue, 1);
  container(-12.5, -2.5, -0.55, M.containerRed);
  container(15.5, 2, 1.55, M.containerGreen);

  // ---------- barriers, sandbags, crates ----------
  function jersey(x, z, ry) {
    const shape = new THREE.Shape();
    shape.moveTo(-0.44, 0); shape.lineTo(0.44, 0); shape.lineTo(0.17, 0.56);
    shape.lineTo(0.11, 0.96); shape.lineTo(-0.11, 0.96); shape.lineTo(-0.17, 0.56); shape.closePath();
    const geo = new THREE.ExtrudeGeometry(shape, { depth: 2.3, bevelEnabled: true, bevelSize: 0.025, bevelThickness: 0.025, bevelSegments: 1 });
    geo.translate(0, 0, -1.15);
    const m = new THREE.Mesh(geo, M.concrete);
    m.position.set(x, 0, z); m.rotation.y = ry; m.castShadow = m.receiveShadow = true;
    root.add(m); shootable(m);
    m.updateWorldMatrix(true, false); tmpBox.setFromObject(m); colliders.push(tmpBox.clone());
    return m;
  }
  jersey(-6, -9, 0.1); jersey(-3.2, -9.4, 0.16); jersey(6.5, -15.5, -0.2);
  jersey(8.2, -15.2, 0.1); jersey(-16, -7, 1.25); jersey(16.5, -5.5, 1.4);
  jersey(0, 13.5, 0.05); jersey(-2, 13.4, 0.2); jersey(14, 17, 1.35);

  function sandbagWall(x, z, ry, len = 3.4, rows = 3) {
    const geo = new THREE.SphereGeometry(0.5, 9, 6);
    geo.scale(1.05, 0.55, 0.62);
    const inst = new THREE.InstancedMesh(geo, M.sandbag, rows * Math.ceil(len / 0.82));
    inst.castShadow = inst.receiveShadow = true;
    const dummy = new THREE.Object3D();
    let n = 0;
    for (let r = 0; r < rows; r++) {
      const count = Math.ceil(len / 0.82) - (r === rows - 1 ? 1 : 0);
      for (let i = 0; i < count; i++) {
        const lx = -len / 2 + 0.45 + i * 0.82 + (r % 2) * 0.18;
        dummy.position.set(x + Math.cos(ry) * lx, 0.24 + r * 0.33, z - Math.sin(ry) * lx);
        dummy.rotation.set(0, ry + (Math.random() - 0.5) * 0.25, (Math.random() - 0.5) * 0.1);
        dummy.scale.setScalar(0.95 + Math.random() * 0.1);
        dummy.updateMatrix(); inst.setMatrixAt(n++, dummy.matrix);
      }
    }
    inst.count = n; root.add(inst);
    const col = new THREE.Box3(v3(x - len / 2, 0, z - 0.7), v3(x + len / 2, 1.25, z + 0.7));
    if (ry > 0.5) col.set(v3(x - 0.7, 0, z - len / 2), v3(x + 0.7, 1.25, z + len / 2));
    colliders.push(col);
  }
  sandbagWall(-11, 2.4, 0, 4.1); sandbagWall(-13.4, 3.1, 0.55, 2.8, 3); sandbagWall(4.5, 8.5, 0.08, 4.6, 4);
  sandbagWall(19, -10, 1.4, 3.2); sandbagWall(-3, -19.5, 0.15, 3.6, 4);

  function crate(x, z, s = 1, ry = 0, y = 0) {
    addBox(s, s, s, x, s / 2 + y, z, M.wood, { ry });
    addBox(s + 0.05, 0.1, 0.12, x, s * 0.18 + y, z + s / 2 + 0.02, M.darkMetal, { ry, collide: false, target: false, cast: false });
    addBox(s + 0.05, 0.1, 0.12, x, s * 0.82 + y, z + s / 2 + 0.02, M.darkMetal, { ry, collide: false, target: false, cast: false });
  }
  crate(5.2, -6.2, 1.1, 0.2); crate(6.4, -6.4, 0.9, -0.1); crate(5.5, -6.2, 0.75, 0.5, 1.1);
  crate(-8.4, 7.6, 1.2, -0.35); crate(-8.6, 7.7, 0.8, 0.2, 1.2);
  crate(16.8, 7.2, 1.15, 0.1); crate(17, 7.2, 0.9, -0.2, 1.15);
  crate(-19.5, -9.2, 1, 0.3);

  function barrel(x, z, col) {
    const mat = new THREE.MeshStandardMaterial({ color: col, metalness: 0.55, roughness: 0.55, map: tex.metalGray });
    addCyl(0.38, 0.38, 1.05, x, 0.53, z, mat, { collide: true, seg: 16 });
    addCyl(0.4, 0.4, 0.06, x, 0.75, z, M.darkMetal, { collide: false, target: false, cast: false, seg: 16 });
    addCyl(0.4, 0.4, 0.06, x, 0.3, z, M.darkMetal, { collide: false, target: false, cast: false, seg: 16 });
  }
  barrel(8.6, 9.8, 0x5a3c2c); barrel(9.4, 10.2, 0x3d4b55); barrel(-14.6, 11, 0x4e5a45); barrel(17.8, -1, 0x5a3c2c);

  // tires
  const tireGeo = new THREE.TorusGeometry(0.42, 0.16, 8, 16);
  for (let i = 0; i < 4; i++) {
    const t = new THREE.Mesh(tireGeo, M.rubber);
    t.rotation.x = Math.PI / 2; t.position.set(-6.5, 0.17 + i * 0.24, 17.5);
    t.castShadow = true; root.add(t);
  }
  addCyl(0.42, 0.42, 0.2, -6.5, 1.12, 17.5, M.rubber, { collide: false, target: false, cast: false, seg: 12 });

  // ---------- wrecked technical ----------
  (function truck() {
    const g = new THREE.Group();
    g.position.set(-5.2, 0, 4.2); g.rotation.y = 0.55;
    const bodyMat = new THREE.MeshStandardMaterial({ map: tex.containerRed, color: 0x7e8a80, metalness: 0.45, roughness: 0.62 });
    const rust = new THREE.MeshStandardMaterial({ map: tex.containerRed, color: 0x6b4c36, metalness: 0.35, roughness: 0.8 });
    const add = (w, h, d, x, y, z, mat = bodyMat, rx = 0) => {
      const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
      m.position.set(x, y, z); m.rotation.x = rx; m.castShadow = m.receiveShadow = true; g.add(m); return m;
    };
    add(2.05, 0.3, 4.4, 0, 0.62, 0);
    add(1.95, 1.05, 1.65, 0, 1.36, -0.55);
    add(1.85, 0.52, 1.1, 0, 1.1, -1.95);
    add(1.9, 0.5, 2.0, 0, 0.98, 1.2);
    add(0.08, 0.5, 1.9, 0.93, 1.28, 1.2);
    add(0.08, 0.5, 1.9, -0.93, 1.28, 1.2);
    add(1.9, 0.5, 0.08, 0, 1.28, 2.15);
    add(1.86, 0.06, 2.0, 0, 1.24, 1.2);
    add(0.02, 0.55, 0.9, 0.985, 1.53, -0.6, M.glass);
    add(0.02, 0.55, 0.9, -0.985, 1.53, -0.6, M.glass);
    add(1.6, 0.55, 0.02, 0, 1.53, -1.38, M.glass, -0.12);
    add(1.25, 0.5, 0.04, 0, 1.55, 0.3, M.darkMetal);
    // wheels
    for (const [wx, wz] of [[-0.98, -1.45], [0.98, -1.45], [-0.98, 1.35], [0.98, 1.35]]) {
      const tire = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.4, 0.28, 14), M.rubber);
      tire.rotation.z = Math.PI / 2; tire.position.set(wx, 0.42, wz); tire.castShadow = true; g.add(tire);
      const rim = new THREE.Mesh(new THREE.CylinderGeometry(0.19, 0.19, 0.3, 10), M.metal);
      rim.rotation.z = Math.PI / 2; rim.position.set(wx, 0.42, wz); g.add(rim);
    }
    // broken hood / tarp
    add(1.2, 0.04, 0.9, -0.2, 1.34, -1.55, M.tarp, -0.16);
    add(0.5, 0.08, 0.8, 0.3, 1.3, 1.35, rust);
    // soot & rust patches
    const smokeMat = new THREE.MeshBasicMaterial({ color: 0x1c1915, transparent: true, opacity: 0.55, depthWrite: false });
    for (let i = 0; i < 4; i++) {
      const sm = new THREE.Mesh(new THREE.PlaneGeometry(0.6, 0.4), smokeMat);
      sm.position.set(-1.03, 1.2 + Math.random(), -0.2 + Math.random() * 1.2);
      sm.rotation.y = -Math.PI / 2; sm.rotation.z = Math.random() * 3; g.add(sm);
    }
    root.add(g);
    g.updateWorldMatrix(true, true);
    tmpBox.setFromObject(g); colliders.push(tmpBox.clone());
    g.traverse(o => { if (o.isMesh) shootable(o); });
  })();

  // ---------- watchtower ----------
  (function tower() {
    const tx = 23, tz = 12, th = 4.4;
    for (const [dx, dz] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) {
      addCyl(0.1, 0.14, th, tx + dx, th / 2, tz + dz, M.darkMetal, { collide: false, seg: 6 });
    }
    addBox(2.6, 0.22, 2.6, tx, th, tz, M.wood, { collide: false });
    addBox(2.5, 1.1, 0.14, tx, th + 0.75, tz - 1.2, M.wood, { collide: false });
    addBox(2.5, 1.1, 0.14, tx, th + 0.75, tz + 1.2, M.wood, { collide: false });
    addBox(0.14, 1.1, 2.5, tx - 1.2, th + 0.75, tz, M.wood, { collide: false });
    addBox(0.14, 1.1, 2.5, tx + 1.2, th + 0.75, tz, M.wood, { collide: false });
    addBox(3, 0.1, 3, tx, th + 2.6, tz, M.tarp, { collide: false });
    for (const [dx, dz] of [[-1.4, 0], [1.4, 0], [0, -1.4], [0, 1.4]]) {
      addCyl(0.04, 0.04, 1.35, tx + dx, th + 1.9, tz + dz, M.darkMetal, { collide: false, target: false, seg: 6 });
    }
    addCyl(0.1, 0.1, 0.7, tx, th + 2.85, tz + 0.9, M.darkMetal, { collide: false, target: false, seg: 8 });
    addBox(1.8, 0.5, 0.7, tx - 0.8, th + 0.35, tz, M.wood, { collide: false, target: false });
    colliders.push(new THREE.Box3(v3(tx - 1.4, 0, tz - 1.4), v3(tx + 1.4, th + 3.1, tz + 1.4)));
  })();

  // ---------- street lamps ----------
  const lampGlows = [];
  function lamp(x, z, ry) {
    addCyl(0.09, 0.13, 6.4, x, 3.2, z, M.darkMetal, { seg: 8 });
    addBox(0.08, 0.08, 1.7, x + Math.sin(ry) * 0.85, 6.35, z + Math.cos(ry) * 0.85, M.darkMetal, { ry, collide: false, target: false });
    const hx = x + Math.sin(ry) * 1.65, hz = z + Math.cos(ry) * 1.65;
    addBox(0.55, 0.16, 0.3, hx, 6.25, hz, M.darkMetal, { ry, collide: false, target: false });
    const lampMat = new THREE.MeshStandardMaterial({ color: 0x222222, emissive: 0xffc27a, emissiveIntensity: 4 });
    const bulb = new THREE.Mesh(new THREE.BoxGeometry(0.44, 0.05, 0.2), lampMat);
    bulb.position.set(hx, 6.15, hz); bulb.rotation.y = ry; root.add(bulb);
    const light = new THREE.PointLight(0xffb56b, 9, 15, 2);
    light.position.set(hx, 5.95, hz); root.add(light);
    const glow = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex.smoke, color: 0xffb86b, transparent: true, opacity: 0.32, blending: THREE.AdditiveBlending, depthWrite: false }));
    glow.position.set(hx, 6.1, hz); glow.scale.setScalar(2.2); root.add(glow);
    lampGlows.push({ light, glow, base: 9 });
  }
  lamp(-13, 15, 0.5); lamp(12.5, -1.5, 2.3); lamp(-22, -12, 1.2);

  // burn barrel fire
  const fire = new THREE.Group(); fire.position.set(8.8, 0, 10);
  const fireLight = new THREE.PointLight(0xff7a2a, 14, 11, 2); fireLight.position.y = 1.5; fire.add(fireLight);
  const fireGlow = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex.flash, color: 0xff8a3a, transparent: true, opacity: 0.5, blending: THREE.AdditiveBlending, depthWrite: false }));
  fireGlow.position.y = 1.25; fireGlow.scale.set(1.7, 2.2, 1); fire.add(fireGlow);
  root.add(fire);

  // ---------- cables & antenna ----------
  function cable(a, b, sag, y) {
    const mid = new THREE.Vector3((a.x + b.x) / 2, y - sag, (a.z + b.z) / 2);
    const curve = new THREE.CatmullRomCurve3([new THREE.Vector3(a.x, y, a.z), mid, new THREE.Vector3(b.x, y, b.z)]);
    const geo = new THREE.TubeGeometry(curve, 18, 0.018, 4, false);
    const m = new THREE.Mesh(geo, M.wire); root.add(m);
  }
  cable({ x: -12.5, z: -25.6 }, { x: 14.7, z: -24.8 }, 0.7, 7.4);
  cable({ x: -12.9, z: -25.4 }, { x: 14.5, z: -24.6 }, 1.3, 7.0);
  cable({ x: -22, z: -6.2 }, { x: 6, z: -25.6 }, 1.1, 9.6);

  // ---------- palm trees ----------
  function palm(x, z, h = 7.5, lean = 0.18) {
    const g = new THREE.Group(); g.position.set(x, 0, z);
    const seg = low ? 4 : 6;
    let px = 0, pz = 0;
    for (let i = 0; i < seg; i++) {
      const t = i / seg;
      const rad = 0.2 * (1 - t * 0.35);
      const m = new THREE.Mesh(new THREE.CylinderGeometry(rad * 0.85, rad * 1.15, h / seg + 0.08, 8), M.trunk);
      px += Math.sin(lean) * (h / seg) * 0.55;
      m.position.set(px, (i + 0.5) * h / seg, pz + t * 0.1);
      m.castShadow = true; m.receiveShadow = true; g.add(m);
    }
    const top = new THREE.Group(); top.position.set(px, h, 0.1);
    const fronds = low ? 7 : 11;
    for (let i = 0; i < fronds; i++) {
      const pg = new THREE.PlaneGeometry(1.9, 4.5, 1, 8);
      pg.translate(0, 2.25, 0);
      const pos = pg.attributes.position;
      for (let k = 0; k < pos.count; k++) {
        const y = pos.getY(k), t = y / 4.5;
        pos.setZ(k, -Math.pow(t, 1.7) * 1.15);
        pos.setX(k, pos.getX(k) * (1 - t * 0.3));
      }
      pg.computeVertexNormals();
      const leaf = new THREE.Mesh(pg, M.leaf);
      leaf.rotation.order = 'YXZ';
      leaf.rotation.y = (i / fronds) * Math.PI * 2 + Math.random() * 0.2;
      leaf.rotation.x = -0.72 - Math.random() * 0.5;
      leaf.castShadow = true; top.add(leaf);
    }
    for (let i = 0; i < 4; i++) {
      const nut = new THREE.Mesh(new THREE.SphereGeometry(0.1, 7, 6), new THREE.MeshStandardMaterial({ color: 0x4a3a25, roughness: 0.9 }));
      nut.position.set(Math.cos(i * 1.7) * 0.2, -0.1, Math.sin(i * 1.7) * 0.2); top.add(nut);
    }
    g.add(top); root.add(g);
    colliders.push(new THREE.Box3(v3(x - 0.38, 0, z - 0.38), v3(x + 0.38, h * 0.9, z + 0.38)));
  }
  palm(-24.5, -14, 8.5, 0.22); palm(-9.5, 24, 7, -0.15); palm(24.5, -14.5, 9, 0.1);
  palm(27, 20, 7.6, -0.1); palm(-27, 17, 8, 0.18); palm(-16, -27, 7.4, 0.05);

  // ---------- rooftop antennas / distant skyline ----------
  const skylineMat = standard(tex.facade, { roughness: 0.95 });
  const skyline = [
    [-58, -70, 18, 26, 20], [-30, -76, 14, 18, 16], [-4, -82, 22, 30, 22],
    [24, -74, 16, 22, 18], [50, -66, 20, 24, 15], [-46, -48, 10, 14, 10],
    [58, -32, 12, 18, 12], [-64, -20, 12, 16, 13], [-52, 34, 16, 20, 12], [52, 44, 18, 22, 14],
  ];
  for (const [x, z, w, d, h] of skyline) {
    const mat = skylineMat.clone();
    mat.map = tex.facade.clone();
    mat.map.repeat.set(Math.max(1, w / 8), Math.max(1, h / 9));
    mat.map.needsUpdate = true;
    const b = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
    b.position.set(x, h / 2, z); b.castShadow = false; b.receiveShadow = true; root.add(b);
  }
  // minaret-like landmark
  addCyl(1.3, 1.7, 24, -40, 12, -62, skylineMat, { collide: false, target: false, cast: false, seg: 12 });
  addCyl(0.1, 1.5, 4, -40, 26, -62, M.concrete, { collide: false, target: false, cast: false, seg: 12 });
  addCyl(0.05, 0.05, 3, -40, 29.5, -62, M.darkMetal, { collide: false, target: false, cast: false, seg: 6 });

  // scattered debris
  const debrisMat = new THREE.MeshStandardMaterial({ color: 0x6a6253, roughness: 0.95 });
  for (let i = 0; i < 28; i++) {
    const s = 0.06 + Math.random() * 0.2;
    const d = new THREE.Mesh(new THREE.BoxGeometry(s * 2, s * 0.35, s), debrisMat);
    d.position.set((Math.random() - 0.5) * 48, s * 0.2, (Math.random() - 0.5) * 48);
    d.rotation.set(0, Math.random() * 6, 0); d.receiveShadow = true; root.add(d);
    if (Math.random() > 0.6) {
      const paper = new THREE.Mesh(new THREE.PlaneGeometry(0.32, 0.45), new THREE.MeshStandardMaterial({ color: 0xb9b09a, roughness: 1 }));
      paper.rotation.set(-Math.PI / 2, 0, Math.random() * 6);
      paper.position.set((Math.random() - 0.5) * 40, 0.035, (Math.random() - 0.5) * 40); root.add(paper);
    }
  }
  // ammo boxes
  for (const [x, z, ry] of [[2.5, 12, 0.2], [-4, 4, -0.4], [14, 13, 0.8]]) {
    addBox(0.7, 0.3, 0.42, x, 0.16, z, M.containerGreen, { ry });
    addBox(0.72, 0.04, 0.08, x, 0.33, z, M.darkMetal, { ry, collide: false, target: false, cast: false });
  }

  // ---------- dust motes ----------
  const dustCount = low ? 220 : 560;
  const dustGeo = new THREE.BufferGeometry();
  const dustPos = new Float32Array(dustCount * 3);
  for (let i = 0; i < dustCount; i++) {
    dustPos[i * 3] = (Math.random() - 0.5) * 70;
    dustPos[i * 3 + 1] = Math.random() * 12 + 0.3;
    dustPos[i * 3 + 2] = (Math.random() - 0.5) * 70;
  }
  dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));
  const dust = new THREE.Points(dustGeo, new THREE.PointsMaterial({
    map: tex.smoke, size: 0.14, transparent: true, opacity: 0.3, depthWrite: false,
    color: 0xd8c6a3, blending: THREE.NormalBlending, sizeAttenuation: true,
  }));
  root.add(dust);

  // fireflies / embers near barrel
  const emberCount = low ? 24 : 60;
  const emberGeo = new THREE.BufferGeometry();
  const emberPos = new Float32Array(emberCount * 3);
  const emberSeed = new Float32Array(emberCount);
  for (let i = 0; i < emberCount; i++) {
    emberPos[i * 3] = 8.8 + (Math.random() - 0.5) * 0.7;
    emberPos[i * 3 + 1] = 1.2 + Math.random() * 3;
    emberPos[i * 3 + 2] = 10 + (Math.random() - 0.5) * 0.7;
    emberSeed[i] = Math.random();
  }
  emberGeo.setAttribute('position', new THREE.BufferAttribute(emberPos, 3));
  const embers = new THREE.Points(emberGeo, new THREE.PointsMaterial({
    map: tex.flash, size: 0.12, transparent: true, opacity: 0.85, depthWrite: false,
    color: 0xff8a3a, blending: THREE.AdditiveBlending, sizeAttenuation: true,
  }));
  root.add(embers);

  // far haze layer / dust wall sprites
  for (let i = 0; i < 4; i++) {
    const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex.smoke, color: 0xc7b08c, transparent: true, opacity: 0.08, depthWrite: false }));
    s.position.set((Math.random() - 0.5) * 60, 6 + Math.random() * 8, -55 - Math.random() * 20);
    s.scale.set(60, 22, 1); root.add(s);
  }

  const clock = { t: 0 };
  function update(dt) {
    clock.t += dt;
    const t = clock.t;
    fireLight.intensity = 11 + Math.sin(t * 13) * 2.2 + Math.sin(t * 31.7) * 1.4;
    fireGlow.material.opacity = 0.42 + Math.sin(t * 11) * 0.08;
    for (const l of lampGlows) l.light.intensity = l.base + Math.sin(t * 2.1 + l.base) * 0.25;

    const p = dustGeo.attributes.position;
    for (let i = 0; i < dustCount; i++) {
      let y = p.getY(i) + dt * (0.08 + (i % 5) * 0.02);
      const x = p.getX(i) + dt * 0.22;
      if (y > 13) y = 0.2;
      p.setY(i, y);
      p.setX(i, x > 35 ? -35 : x);
    }
    p.needsUpdate = true;

    const e = emberGeo.attributes.position;
    for (let i = 0; i < emberCount; i++) {
      let y = e.getY(i) + dt * (0.4 + emberSeed[i] * 0.8);
      let x = e.getX(i) + Math.sin(t * 2 + emberSeed[i] * 9) * dt * 0.15;
      if (y > 4.5) { y = 1.15; x = 8.8 + (Math.random() - 0.5) * 0.7; }
      e.setY(i, y); e.setX(i, x);
    }
    e.needsUpdate = true;
  }

  // hide the "sky" from shadow map cost
  sky.castShadow = false;

  return {
    root, colliders, raycastTargets, spawnPoints, sun, sky, update,
    bounds: { minX: -28.5, maxX: 28.5, minZ: -28.5, maxZ: 28.5 },
    barrel: new THREE.Vector3(8.8, 0, 10),
    materials: M,
  };
}
