import * as THREE from 'three';

const V = (x, y, z) => new THREE.Vector3(x, y, z);
const lerp = THREE.MathUtils.lerp;

function makeLimb(from, to, radius, mat) {
  const dir = new THREE.Vector3().subVectors(to, from);
  const len = dir.length();
  const geo = new THREE.CapsuleGeometry(radius, Math.max(0.01, len - radius * 2), 4, 8);
  const mesh = new THREE.Mesh(geo, mat);
  mesh.position.copy(from).addScaledVector(dir, 0.5);
  mesh.quaternion.setFromUnitVectors(V(0, 1, 0), dir.normalize());
  return mesh;
}

export function createWeapon(tex, quality = {}) {
  const low = quality.low === true;
  const group = new THREE.Group();
  group.matrixAutoUpdate = true;

  const gunMat = new THREE.MeshStandardMaterial({
    map: tex.gunmetal, bumpMap: tex.gunmetal, bumpScale: 0.005,
    color: 0x5b6063, metalness: 0.82, roughness: 0.34,
  });
  const darkMat = new THREE.MeshStandardMaterial({
    map: tex.gunmetal, color: 0x2c3032, metalness: 0.62, roughness: 0.5,
  });
  const polymerMat = new THREE.MeshStandardMaterial({ color: 0x333637, roughness: 0.66, metalness: 0.14 });
  const tanMat = new THREE.MeshStandardMaterial({ color: 0x7c6f52, roughness: 0.78, metalness: 0.06, map: tex.camo });
  const accentMat = new THREE.MeshStandardMaterial({ color: 0xa8936a, roughness: 0.55, metalness: 0.2 });
  const gloveMat = new THREE.MeshStandardMaterial({ color: 0x38362f, roughness: 0.88, metalness: 0.03 });
  const sleeveMat = new THREE.MeshStandardMaterial({ color: 0x6a6147, roughness: 0.94, map: tex.camo });
  const glassMat = new THREE.MeshStandardMaterial({ color: 0x183038, metalness: 0.6, roughness: 0.08, transparent: true, opacity: 0.5, emissive: 0x0b2b2e, emissiveIntensity: 0.6 });

  const model = new THREE.Group();
  // receiver + stock
  const box = (w, h, d, x, y, z, mat, rx = 0, ry = 0, rz = 0) => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
    m.position.set(x, y, z); m.rotation.set(rx, ry, rz); model.add(m); return m;
  };
  box(0.07, 0.092, 0.36, 0, 0, 0.015, gunMat);
  box(0.064, 0.022, 0.34, 0, 0.058, 0.005, darkMat);
  box(0.078, 0.024, 0.12, 0, 0.074, 0.10, darkMat);
  // rail slots
  for (let i = 0; i < 8; i++) box(0.066, 0.007, 0.022, 0, 0.071, -0.15 + i * 0.04, darkMat);
  // handguard
  box(0.064, 0.068, 0.26, 0, 0.004, -0.285, tanMat);
  for (let i = 0; i < 6; i++) box(0.07, 0.01, 0.03, 0, 0.043, -0.40 + i * 0.043, darkMat);
  box(0.048, 0.048, 0.09, 0, -0.04, -0.265, tanMat);
  // barrel + brake
  const barrel = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.016, 0.30, 12), gunMat);
  barrel.rotation.x = Math.PI / 2; barrel.position.set(0, 0.01, -0.54); model.add(barrel);
  const brake = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.02, 0.08, 10), darkMat);
  brake.rotation.x = Math.PI / 2; brake.position.set(0, 0.01, -0.70); model.add(brake);
  for (let i = 0; i < 3; i++) {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.023, 0.005, 6, 12), gunMat);
    ring.rotation.y = Math.PI / 2; ring.position.set(0, 0.01, -0.68 - i * 0.02); model.add(ring);
  }
  box(0.03, 0.04, 0.05, 0, 0.045, -0.39, darkMat);
  box(0.01, 0.035, 0.012, 0, 0.075, -0.39, darkMat);
  box(0.02, 0.02, 0.01, 0, 0.09, -0.40, accentMat);
  // grip + trigger guard
  box(0.05, 0.14, 0.065, 0, -0.095, 0.15, polymerMat, -0.28);
  box(0.04, 0.09, 0.055, 0, -0.155, 0.17, polymerMat, -0.28);
  box(0.03, 0.01, 0.09, 0, -0.055, 0.085, darkMat, 0.2);
  // magazine
  const magGroup = new THREE.Group();
  magGroup.position.set(0, -0.095, 0.045);
  const mag = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.17, 0.075), tanMat);
  mag.position.set(0, -0.04, 0); mag.rotation.x = 0.16; magGroup.add(mag);
  const magBase = new THREE.Mesh(new THREE.BoxGeometry(0.055, 0.018, 0.08), accentMat);
  magBase.position.set(0, -0.128, -0.012); magBase.rotation.x = 0.16; magGroup.add(magBase);
  model.add(magGroup);
  // stock
  box(0.045, 0.08, 0.18, 0, -0.012, 0.23, polymerMat);
  box(0.05, 0.11, 0.03, 0, -0.035, 0.33, polymerMat);
  box(0.04, 0.03, 0.13, 0, 0.03, 0.22, tanMat);
  // optic
  const optic = new THREE.Group(); optic.position.set(0, 0.108, 0.0);
  const tube = new THREE.Mesh(new THREE.CylinderGeometry(0.027, 0.027, 0.13, 16, 1, true), darkMat);
  tube.rotation.x = Math.PI / 2; optic.add(tube);
  const lensFront = new THREE.Mesh(new THREE.CircleGeometry(0.024, 20), glassMat);
  lensFront.position.z = -0.066; lensFront.rotation.y = Math.PI; optic.add(lensFront);
  const lensBack = new THREE.Mesh(new THREE.CircleGeometry(0.024, 20), glassMat);
  lensBack.position.z = 0.066; optic.add(lensBack);
  const dot = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex.flash, color: 0xff3a1f, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, opacity: 0.95 }));
  dot.scale.setScalar(0.009); dot.position.z = -0.065; optic.add(dot);
  for (const z of [-0.045, 0.045]) {
    const mount = new THREE.Mesh(new THREE.BoxGeometry(0.042, 0.03, 0.025), darkMat);
    mount.position.set(0, -0.04, z); optic.add(mount);
  }
  const knob = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.03, 10), gunMat);
  knob.position.set(0, 0.042, 0.015); optic.add(knob);
  model.add(optic);
  // flashlight
  const fl = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.017, 0.10, 10), darkMat);
  fl.rotation.x = Math.PI / 2; fl.position.set(0.048, -0.005, -0.31); model.add(fl);
  const flLens = new THREE.Mesh(new THREE.CircleGeometry(0.016, 12), new THREE.MeshStandardMaterial({ color: 0xeeeeee, emissive: 0xbcd3d8, emissiveIntensity: 0.3 }));
  flLens.position.set(0.048, -0.005, -0.361); flLens.rotation.y = Math.PI; model.add(flLens);
  box(0.016, 0.024, 0.026, 0.05, 0.022, -0.31, darkMat);
  // laser module
  box(0.026, 0.026, 0.05, -0.046, 0.012, -0.33, darkMat);
  const laserLens = new THREE.Mesh(new THREE.CircleGeometry(0.008, 10), new THREE.MeshStandardMaterial({ color: 0x300000, emissive: 0xff2010, emissiveIntensity: 2 }));
  laserLens.position.set(-0.046, 0.012, -0.356); laserLens.rotation.y = Math.PI; model.add(laserLens);
  // charging handle + bolt
  const boltHandle = box(0.016, 0.016, 0.05, 0.05, 0.045, 0.09, gunMat);
  box(0.011, 0.024, 0.024, 0.061, 0.04, 0.105, accentMat);

  // hands / arms
  const handR = new THREE.Group(); handR.position.set(0.005, -0.125, 0.16);
  const gloveR = new THREE.Mesh(new THREE.BoxGeometry(0.075, 0.095, 0.09), gloveMat);
  gloveR.rotation.x = -0.3; handR.add(gloveR);
  for (let i = 0; i < 3; i++) {
    const finger = new THREE.Mesh(new THREE.BoxGeometry(0.018, 0.034, 0.026), gloveMat);
    finger.position.set(-0.025 + i * 0.021, 0.045, -0.033); finger.rotation.x = -0.5; handR.add(finger);
  }
  const knuckle = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.02, 0.05), darkMat);
  knuckle.position.set(0, 0.055, 0.01); handR.add(knuckle);
  model.add(handR);

  const handL = new THREE.Group(); handL.position.set(0.0, -0.055, -0.30);
  const gloveL = new THREE.Mesh(new THREE.BoxGeometry(0.095, 0.07, 0.11), gloveMat);
  gloveL.rotation.z = 0.2; handL.add(gloveL);
  for (let i = 0; i < 3; i++) {
    const finger = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.03, 0.05), gloveMat);
    finger.position.set(0.045, -0.005, -0.045 + i * 0.028); finger.rotation.z = -0.3; handL.add(finger);
  }
  const pad = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.015, 0.06), darkMat);
  pad.position.set(-0.02, 0.04, 0); handL.add(pad);
  model.add(handL);

  const armR = new THREE.Group();
  const shoulderR = V(0.27, -0.38, 0.03);
  const elbowR = V(0.175, -0.27, 0.11);
  armR.add(makeLimb(shoulderR, elbowR, 0.03, sleeveMat));
  armR.add(makeLimb(elbowR, V(0.02, -0.145, 0.15), 0.026, sleeveMat));
  model.add(armR);
  const armL = new THREE.Group();
  const shoulderL = V(-0.25, -0.37, 0.04);
  const elbowL = V(-0.15, -0.25, -0.13);
  armL.add(makeLimb(shoulderL, elbowL, 0.028, sleeveMat));
  armL.add(makeLimb(elbowL, V(-0.02, -0.078, -0.28), 0.025, sleeveMat));
  model.add(armL);

  model.traverse(o => { if (o.isMesh) { o.castShadow = false; o.receiveShadow = false; o.frustumCulled = false; } });
  group.add(model);
  group.scale.setScalar(0.92);

  // muzzle flash + light
  const muzzle = new THREE.Object3D(); muzzle.position.set(0, 0.012, -0.75); model.add(muzzle);
  const eject = new THREE.Object3D(); eject.position.set(0.07, 0.035, 0.05); model.add(eject);
  const flashMat = new THREE.SpriteMaterial({ map: tex.flash, color: 0xffc477, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, opacity: 0 });
  const flashSprite = new THREE.Sprite(flashMat);
  flashSprite.position.set(0, 0.012, -0.78); flashSprite.scale.setScalar(0.42); flashSprite.visible = false;
  model.add(flashSprite);
  const flashLight = new THREE.PointLight(0xffb066, 0, 12, 2);
  flashLight.position.set(0, 0.02, -0.73); model.add(flashLight);
  const flashCore = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex.flash, color: 0xfff4d0, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, opacity: 0 }));
  flashCore.position.set(0, 0.012, -0.77); flashCore.scale.setScalar(0.16); flashCore.visible = false;
  model.add(flashCore);

  // dynamic state
  const state = {
    ads: 0, sprint: 0, move: 0, bobT: 0, kick: 0, kickYaw: 0, kickPitch: 0,
    flash: 0, reload: 0, lookX: 0, lookY: 0, swayX: 0, swayY: 0,
  };
  const hip = V(0.23, -0.235, -0.48);
  const adsPos = V(0, -0.112, -0.36);
  const sprintPos = V(0.29, -0.30, -0.42);

  function flash() {
    state.flash = 0.055;
    flashSprite.visible = true; flashCore.visible = true;
    flashSprite.scale.setScalar(0.32 + Math.random() * 0.22);
    flashSprite.material.rotation = Math.random() * Math.PI * 2;
    flashCore.scale.setScalar(0.1 + Math.random() * 0.1);
    flashLight.intensity = 22 + Math.random() * 12;
  }

  function addRecoil(amount = 1) {
    state.kick += 0.028 * amount;
    state.kickYaw += (Math.random() - 0.5) * 0.018 * amount;
    state.kickPitch += (Math.random() * 0.6 + 0.4) * 0.05 * amount;
  }

  function update(dt, s = {}) {
    const t = s.time || 0;
    const adsTarget = s.ads ? 1 : 0;
    state.ads += (adsTarget - state.ads) * Math.min(1, dt * 12);
    state.sprint += ((s.sprint ? 1 : 0) - state.sprint) * Math.min(1, dt * 8);
    state.move += ((s.move || 0) - state.move) * Math.min(1, dt * 7);
    state.bobT += dt * (s.sprint ? 11 : 8.5);
    state.lookX += ((s.lookX || 0) - state.lookX) * Math.min(1, dt * 9);
    state.lookY += ((s.lookY || 0) - state.lookY) * Math.min(1, dt * 9);

    state.kick *= Math.pow(0.0025, dt);
    state.kickYaw *= Math.pow(0.0015, dt);
    state.kickPitch *= Math.pow(0.0015, dt);
    if (state.flash > 0) {
      state.flash -= dt;
      const f = Math.max(0, state.flash / 0.055);
      flashSprite.material.opacity = f;
      flashCore.material.opacity = f;
      flashSprite.scale.setScalar((0.3 + (1 - f) * 0.16) * (1 + f * 0.15));
      flashLight.intensity = 20 * f;
      if (state.flash <= 0) { flashSprite.visible = false; flashCore.visible = false; flashLight.intensity = 0; }
    }

    const ads = state.ads;
    const sprint = state.sprint;
    const bobAmp = (1 - ads * 0.82) * state.move;
    const bobX = Math.sin(state.bobT) * 0.006 * bobAmp;
    const bobY = Math.abs(Math.cos(state.bobT)) * 0.006 * bobAmp;

    const basePos = hip.clone().lerp(adsPos, ads);
    basePos.lerp(sprintPos, sprint * (1 - ads));
    basePos.x += bobX + state.lookX * 0.0012 * (1 - ads * 0.7);
    basePos.y += -bobY + state.lookY * 0.0008 + Math.sin(t * 0.9) * 0.0022 * (1 - ads);
    basePos.z += state.kick * (1 - ads * 0.5);

    let rx = state.kickPitch * 0.55 + Math.sin(t * 0.7) * 0.003 * (1 - ads) - sprint * 0.22;
    let ry = state.kickYaw + state.lookX * 0.0007 + Math.sin(t * 0.5) * 0.004 * (1 - ads);
    let rz = sprint * 0.38 + Math.sin(t * 1.1) * 0.004 * (1 - ads) - ads * 0.00;
    ry += state.kickYaw;

    // reload animation
    const r = s.reload ?? 0;
    if (r > 0) {
      const down = Math.sin(Math.PI * Math.min(1, r / 0.9)) * 0.9;
      basePos.y -= 0.11 * down;
      basePos.z += 0.05 * down;
      rx -= 0.55 * down;
      rz += 0.38 * down;
      // magazine out/in
      let magDrop = 0;
      if (r > 0.12 && r < 0.55) magDrop = Math.sin(((r - 0.12) / 0.43) * Math.PI) * 0.32;
      magGroup.position.y = -0.095 - magDrop;
      magGroup.visible = !(r > 0.25 && r < 0.34);
      // charging handle
      const ch = r > 0.55 && r < 0.8 ? Math.sin(((r - 0.55) / 0.25) * Math.PI) * 0.035 : 0;
      boltHandle.position.z = 0.09 - ch;
    } else {
      magGroup.position.y = -0.095;
      magGroup.visible = true;
      boltHandle.position.z = 0.09;
    }

    group.position.copy(basePos);
    group.rotation.set(rx, ry, rz);
    group.updateWorldMatrix(true, true);
  }

  function muzzleWorld(out = new THREE.Vector3()) { return muzzle.getWorldPosition(out); }
  function ejectWorld(out = new THREE.Vector3()) { return eject.getWorldPosition(out); }
  function worldScale() { return 1; }

  return { group, model, muzzle, eject, update, flash, addRecoil, muzzleWorld, ejectWorld, state, worldScale };
}
