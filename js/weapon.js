import * as THREE from '../vendor/three.module.js';
import { gunSurfaceTexture, muzzleTexture, reticleTexture } from './textures.js';

const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const lerp = (a, b, t) => a + (b - a) * t;
const ease = (t) => 1 - Math.pow(1 - t, 3);

export class Weapon {
  constructor(scene, camera) {
    this.scene = scene;
    this.camera = camera;
    this.group = new THREE.Group();
    this.group.position.set(0.40, -0.31, -0.65);
    this.group.scale.setScalar(0.85);
    this.group.rotation.set(0.02, -0.045, 0.035);
    camera.add(this.group);

    this.adsT = 0;
    this.recoil = 0;
    this.flashTimer = 0;
    this.sway = new THREE.Vector2();
    this.bobPhase = 0;
    this.shells = [];
    this.shellPool = [];
    this.flashSeed = 0;
    this.adsHidden = [];

    this.materials = {
      metal: new THREE.MeshStandardMaterial({ color: 0x3c444c, metalness: 0.55, roughness: 0.5, envMapIntensity: 0.6 }),
      metalSoft: new THREE.MeshStandardMaterial({ color: 0x4d565f, metalness: 0.5, roughness: 0.55, envMapIntensity: 0.6 }),
      polymer: new THREE.MeshStandardMaterial({ color: 0x353b41, metalness: 0.1, roughness: 0.85, envMapIntensity: 0.35 }),
      fde: new THREE.MeshStandardMaterial({ color: 0x7d6949, metalness: 0.08, roughness: 0.78, envMapIntensity: 0.35 }),
      rubber: new THREE.MeshStandardMaterial({ color: 0x27292c, metalness: 0.08, roughness: 0.94 }),
      glove: new THREE.MeshStandardMaterial({ color: 0x3f3932, metalness: 0.05, roughness: 0.95 }),
      glovePad: new THREE.MeshStandardMaterial({ color: 0x564c3b, metalness: 0.08, roughness: 0.9 }),
      sleeve: new THREE.MeshStandardMaterial({ color: 0x2b3129, metalness: 0.02, roughness: 0.96 }),
      sleeveDark: new THREE.MeshStandardMaterial({ color: 0x1d221c, metalness: 0.02, roughness: 0.98 }),
      brass: new THREE.MeshStandardMaterial({ color: 0x9c7a42, metalness: 0.95, roughness: 0.32 }),
      glass: new THREE.MeshStandardMaterial({ color: 0x9fd8ef, metalness: 0.4, roughness: 0.08, transparent: true, opacity: 0.26, side: THREE.DoubleSide, depthWrite: false }),
      lens: new THREE.MeshBasicMaterial({ color: 0xd8ecff, toneMapped: false }),
      accent: new THREE.MeshBasicMaterial({ color: 0xff5a1f, toneMapped: false })
    };

    const grain = gunSurfaceTexture();
    for (const key of ['metal', 'metalSoft', 'polymer', 'fde']) {
      this.materials[key].bumpMap = grain;
      this.materials[key].bumpScale = key === 'fde' ? 0.0011 : 0.0016;
      this.materials[key].roughnessMap = grain;
    }

    this.buildBody();
    this.buildSight();
    this.buildHands();

    this.muzzle = new THREE.Object3D();
    this.muzzle.position.set(0, 0.045, -0.972);
    this.group.add(this.muzzle);

    this.muzzleLight = new THREE.PointLight(0xffb066, 0, 5.5, 2);
        this.muzzleLight.position.copy(this.muzzle.position);
    this.group.add(this.muzzleLight);

    this.flash = new THREE.Sprite(new THREE.SpriteMaterial({
      map: muzzleTexture(),
      color: 0xffc98a,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      depthTest: false,
      toneMapped: false
    }));
    this.flash.scale.set(0.36, 0.36, 1);
    this.flash.position.copy(this.muzzle.position);
    this.flash.renderOrder = 20;
    this.flash.visible = false;
    this.group.add(this.flash);

    this.smoke = new THREE.Sprite(new THREE.SpriteMaterial({
      map: muzzleTexture(),
      color: 0x8a8377,
      transparent: true,
      opacity: 0,
      blending: THREE.NormalBlending,
      depthWrite: false,
      toneMapped: false
    }));
    this.smoke.scale.set(0.12, 0.12, 1);
    this.smoke.position.copy(this.muzzle.position);
    this.smoke.visible = false;
    this.group.add(this.smoke);

    this.ejectPort = new THREE.Object3D();
    this.ejectPort.position.set(0.07, 0.06, -0.03);
    this.group.add(this.ejectPort);

    this.shellGeometry = new THREE.CylinderGeometry(0.007, 0.007, 0.032, 6);
    this.tempVec = new THREE.Vector3();
    this.tempVec2 = new THREE.Vector3();
    this.tempQuat = new THREE.Quaternion();
  }

  part(geometry, material, x, y, z, rx = 0, ry = 0, rz = 0) {
    const object = new THREE.Mesh(geometry, material);
    object.position.set(x, y, z);
    object.rotation.set(rx, ry, rz);
    this.group.add(object);
    return object;
  }

  box(w, h, d, material, x, y, z, rx = 0, ry = 0, rz = 0) {
    return this.part(new THREE.BoxGeometry(w, h, d), material, x, y, z, rx, ry, rz);
  }

  buildBody() {
    const m = this.materials;
    this.adsHidden.push(this.box(0.096, 0.115, 0.235, m.polymer, 0, 0.005, 0.19));
    this.adsHidden.push(this.box(0.106, 0.142, 0.036, m.rubber, 0, 0.002, 0.315));
    this.adsHidden.push(this.box(0.06, 0.04, 0.06, m.metalSoft, 0, 0.02, 0.29));
    this.part(new THREE.CylinderGeometry(0.021, 0.021, 0.2, 10), m.metal, 0, 0.03, 0.08, Math.PI / 2, 0, 0);
    this.box(0.034, 0.055, 0.19, m.polymer, 0, -0.005, 0.11);
    this.box(0.108, 0.108, 0.39, m.metal, 0, 0.032, -0.055);
    this.box(0.096, 0.054, 0.42, m.metalSoft, 0, 0.104, -0.07);
    this.box(0.056, 0.02, 0.53, m.metal, 0, 0.137, -0.08);
    for (let i = 0; i < 14; i++) {
      this.adsHidden.push(this.box(0.06, 0.008, 0.018, m.metalSoft, 0, 0.149, 0.15 - i * 0.037));
    }
    this.box(0.062, 0.016, 0.048, m.metal, 0, 0.1, 0.175);
    this.box(0.055, 0.018, 0.055, m.metalSoft, 0, 0.09, 0.16);
    this.box(0.008, 0.036, 0.085, m.rubber, 0.054, 0.055, -0.035);
    const ejection = this.box(0.004, 0.032, 0.07, m.accent, 0.0555, 0.075, -0.035);
    ejection.material = new THREE.MeshBasicMaterial({ color: 0x0a0b0c, toneMapped: false });

    this.box(0.098, 0.092, 0.355, m.fde, 0, 0.028, -0.39);
    this.box(0.102, 0.018, 0.36, m.metalSoft, 0, -0.02, -0.39);
    this.box(0.104, 0.02, 0.1, m.metal, 0, 0.06, -0.53);
    for (let i = 0; i < 4; i++) {
      this.box(0.004, 0.045, 0.055, m.rubber, 0.05, 0.025, -0.3 - i * 0.075);
      this.box(0.004, 0.045, 0.055, m.rubber, -0.05, 0.025, -0.3 - i * 0.075);
    }
    for (const sx of [-1, 1]) {
      for (const sy of [-1, 1]) {
        this.box(0.018, 0.018, 0.355, m.metalSoft, sx * 0.043, sy * 0.036, -0.39, 0, 0, Math.PI / 4);
      }
    }
    this.box(0.008, 0.006, 0.3, m.metalSoft, 0, 0.078, -0.39);
    this.box(0.052, 0.022, 0.09, m.metal, 0, -0.058, -0.52);
    this.box(0.062, 0.03, 0.055, m.metal, 0, -0.045, -0.545, 0.18, 0, 0);
    this.part(new THREE.CylinderGeometry(0.015, 0.015, 0.28, 12), m.metal, 0, 0.045, -0.63, Math.PI / 2, 0, 0);
    this.part(new THREE.CylinderGeometry(0.031, 0.033, 0.22, 18), m.metal, 0, 0.045, -0.79, Math.PI / 2, 0, 0);
    for (let i = 0; i < 4; i++) {
      this.part(new THREE.CylinderGeometry(0.0335, 0.0335, 0.012, 18), m.metalSoft, 0, 0.045, -0.73 - i * 0.035, Math.PI / 2, 0, 0);
    }
    this.box(0.058, 0.046, 0.075, m.metal, 0, 0.045, -0.925);
    for (let i = 0; i < 3; i++) this.box(0.061, 0.008, 0.012, m.rubber, 0, 0.045, -0.9 - i * 0.018);
    this.box(0.05, 0.045, 0.05, m.metalSoft, 0, 0.088, -0.5);
    this.box(0.018, 0.03, 0.035, m.metal, 0, 0.12, -0.5);
    this.box(0.032, 0.012, 0.055, m.metalSoft, 0, 0.128, -0.7);
    this.box(0.028, 0.014, 0.04, m.metalSoft, 0, 0.128, -0.45);

    this.mag = new THREE.Group();
    this.adsHidden.push(this.mag);
    this.mag.position.set(0, -0.075, -0.005);
    this.mag.rotation.x = -0.16;
    this.group.add(this.mag);
    const magBody = new THREE.Mesh(new THREE.BoxGeometry(0.072, 0.19, 0.104), m.fde);
    magBody.position.y = -0.04;
    this.mag.add(magBody);
    const magBase = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.022, 0.112), m.rubber);
    magBase.position.y = -0.14;
    this.mag.add(magBase);
    const magRib = new THREE.Mesh(new THREE.BoxGeometry(0.006, 0.15, 0.09), m.metalSoft);
    magRib.position.set(0.038, -0.04, 0);
    this.mag.add(magRib);

    this.adsHidden.push(this.box(0.06, 0.145, 0.078, m.polymer, 0, -0.085, 0.115, 0.34, 0, 0));
    this.adsHidden.push(this.box(0.064, 0.02, 0.084, m.rubber, 0, -0.155, 0.137, 0.34, 0, 0));
    for (const sx of [-1, 1]) {
      this.box(0.016, 0.016, 0.37, m.metalSoft, sx * 0.052, 0.081, -0.055, 0, 0, Math.PI / 4);
    }
    const guard = new THREE.Mesh(new THREE.TorusGeometry(0.026, 0.0045, 6, 14, Math.PI), m.metal);
    guard.position.set(0, -0.045, 0.055);
    guard.rotation.set(Math.PI / 2, 0, Math.PI);
    this.group.add(guard);
    this.box(0.008, 0.03, 0.008, m.metal, 0, -0.055, 0.06);
    this.box(0.016, 0.016, 0.024, m.metalSoft, 0.036, 0.06, 0.15);
    this.box(0.04, 0.012, 0.03, m.metal, -0.048, 0.04, -0.14, 0, 0.2, 0);
    this.box(0.042, 0.012, 0.09, m.metal, 0, -0.04, 0.055);
    this.box(0.01, 0.045, 0.02, m.metalSoft, 0, -0.055, 0.06, 0.2, 0, 0);
    this.box(0.02, 0.02, 0.06, m.metalSoft, 0, 0.06, 0.02);

    this.part(new THREE.CylinderGeometry(0.024, 0.024, 0.15, 12), m.metalSoft, -0.062, 0.04, -0.43, Math.PI / 2, 0, 0);
    this.part(new THREE.CylinderGeometry(0.027, 0.027, 0.022, 12), m.metal, -0.062, 0.04, -0.505, Math.PI / 2, 0, 0);
    const lens = new THREE.Mesh(new THREE.CircleGeometry(0.02, 16), m.lens);
    lens.position.set(-0.062, 0.04, -0.517);
    lens.rotation.y = Math.PI;
    this.group.add(lens);
    this.box(0.036, 0.038, 0.1, m.polymer, 0.058, 0.058, -0.36);
    this.box(0.012, 0.012, 0.01, m.accent, 0.058, 0.058, -0.413);

    this.box(0.048, 0.016, 0.05, m.accent, -0.052, 0.06, -0.26);
  }

  buildSight() {
    const m = this.materials;
    const firstChild = this.group.children.length;
    this.box(0.062, 0.026, 0.13, m.metal, 0, 0.123, -0.055);
    this.box(0.052, 0.014, 0.1, m.metalSoft, 0, 0.145, -0.055);
    this.box(0.012, 0.068, 0.09, m.metal, -0.034, 0.158, -0.055);
    this.box(0.012, 0.068, 0.09, m.metal, 0.034, 0.158, -0.055);
    this.box(0.08, 0.012, 0.09, m.metal, 0, 0.196, -0.055);
    this.box(0.006, 0.026, 0.03, m.metalSoft, -0.034, 0.18, -0.085);
    this.box(0.006, 0.026, 0.03, m.metalSoft, 0.034, 0.18, -0.085);
    const glass = new THREE.Mesh(new THREE.PlaneGeometry(0.058, 0.05), m.glass);
    glass.position.set(0, 0.157, -0.054);
    this.group.add(glass);
    const reticle = new THREE.Sprite(new THREE.SpriteMaterial({
      map: reticleTexture(),
      color: 0xffffff,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      depthTest: false,
      toneMapped: false
    }));
    reticle.scale.set(0.052, 0.052, 1);
    reticle.position.set(0, 0.157, -0.047);
    reticle.renderOrder = 12;
    this.group.add(reticle);
    this.reticle = reticle;
    this.box(0.064, 0.018, 0.05, m.metal, 0, 0.11, 0.02);
    this.box(0.014, 0.014, 0.014, m.accent, 0.03, 0.13, 0.045);
    const sightRig = new THREE.Group();
    sightRig.position.y = 0.075;
    for (const child of this.group.children.slice(firstChild)) sightRig.add(child);
    this.group.add(sightRig);
    this.box(0.05, 0.075, 0.062, m.metalSoft, 0, 0.165, -0.055);
    this.sightRig = sightRig;

    this.box(0.082, 0.009, 0.024, m.metal, 0, 0.152, 0.145);
    this.box(0.09, 0.016, 0.014, m.metalSoft, 0, 0.147, 0.158);
    for (const sx of [-1, 1]) this.box(0.012, 0.016, 0.022, m.metalSoft, sx * 0.05, 0.148, 0.15);
    this.box(0.014, 0.028, 0.034, m.metalSoft, -0.058, 0.03, 0.02);
    this.box(0.01, 0.022, 0.026, m.metal, 0.058, 0.058, -0.02);
    this.box(0.008, 0.02, 0.05, m.metalSoft, 0.058, 0.02, -0.01);
    const qd = new THREE.Mesh(new THREE.TorusGeometry(0.012, 0.004, 6, 10), m.metalSoft);
    qd.position.set(-0.056, -0.03, 0.145);
    qd.rotation.y = Math.PI / 2;
    this.group.add(qd);
    this.box(0.004, 0.034, 0.06, m.rubber, -0.058, 0.04, 0.075);
  }

  buildHands() {
    const m = this.materials;
    const capsule = (r, len, material, x, y, z, rx = 0, ry = 0, rz = 0) => {
      const mesh = new THREE.Mesh(new THREE.CapsuleGeometry(r, len, 4, 10), material);
      mesh.position.set(x, y, z);
      mesh.rotation.set(rx, ry, rz);
      this.group.add(mesh);
      return mesh;
    };

    this.adsHidden.push(this.box(0.075, 0.085, 0.105, m.glove, 0.005, -0.13, 0.16, 0.3, 0, 0.03));
    this.adsHidden.push(this.box(0.082, 0.045, 0.05, m.glovePad, 0.005, -0.155, 0.19, 0.3, 0, 0.03));
    this.adsHidden.push(this.box(0.078, 0.085, 0.16, m.glove, 0.01, -0.185, 0.27, 0.42, 0, 0.05));
    this.adsHidden.push(this.box(0.09, 0.085, 0.17, m.glove, 0.02, -0.24, 0.36, 0.62, 0, 0.06));
    this.adsHidden.push(this.box(0.075, 0.032, 0.05, m.glovePad, 0.005, -0.09, 0.125, 0.1, 0, 0.02));
    for (let i = 0; i < 3; i++) {
      this.adsHidden.push(this.box(0.026, 0.032, 0.04, m.glove, -0.032 + i * 0.026, -0.075, 0.098, 0.1, 0, 0));
    }
    this.adsHidden.push(capsule(0.052, 0.18, m.sleeve, 0.10, -0.33, 0.44, 0.95, 0.15, 0.25));
    this.adsHidden.push(capsule(0.039, 0.18, m.glove, 0.05, -0.17, 0.24, 0.95, 0.15, 0.25));
    this.adsHidden.push(capsule(0.04, 0.12, m.sleeveDark, 0.026, -0.115, 0.18, 0.95, 0.15, 0.25));

    this.adsHidden.push(this.box(0.088, 0.072, 0.13, m.glove, -0.018, -0.045, -0.405, 0.1, 0.1, 0));
    this.adsHidden.push(this.box(0.09, 0.03, 0.135, m.glovePad, -0.018, -0.014, -0.415, 0.1, 0.1, 0));
    this.adsHidden.push(this.box(0.03, 0.06, 0.11, m.glove, 0.028, -0.055, -0.41, 0, 0.1, 0));
    this.adsHidden.push(this.box(0.075, 0.085, 0.16, m.glove, -0.04, -0.1, -0.335, -0.3, 0.2, 0.18));
    this.adsHidden.push(this.box(0.09, 0.09, 0.2, m.glove, -0.07, -0.16, -0.27, -0.45, 0.28, 0.24));
    this.adsHidden.push(this.box(0.022, 0.026, 0.07, m.glovePad, 0.032, 0.005, -0.42, 0, 0.1, 0));

    for (let i = 0; i < 4; i++) {
      const finger = capsule(0.014, 0.045, m.glove, -0.032, 0.077, -0.365 - i * 0.031, 0, 0, Math.PI / 2.15);
      finger.scale.set(1, 1, 1);
      this.adsHidden.push(finger);
      this.adsHidden.push(this.box(0.05, 0.016, 0.02, m.glovePad, -0.045, 0.071, -0.365 - i * 0.031, 0, 0, 0.12));
    }
    this.adsHidden.push(capsule(0.017, 0.07, m.glove, -0.061, 0.028, -0.36, 0, 0, 1.35));
    this.adsHidden.push(capsule(0.052, 0.2, m.sleeve, -0.075, -0.185, -0.23, -0.75, 0.3, 0.35));
    this.adsHidden.push(capsule(0.043, 0.17, m.glove, -0.052, -0.095, -0.305, -0.75, 0.3, 0.35));
    this.adsHidden.push(this.box(0.075, 0.03, 0.075, m.glovePad, -0.052, -0.055, -0.315, 0.2, 0.15, 0.2));

    this.box(0.02, 0.03, 0.024, m.metal, 0.0, 0.02, 0.11);
    const strap = new THREE.Mesh(new THREE.TorusGeometry(0.038, 0.006, 6, 16), m.rubber);
    strap.position.set(-0.045, -0.12, -0.32);
    strap.rotation.set(0.2, 0.4, 1.2);
    this.group.add(strap);
  }

  kick(strength = 1) {
    this.recoil = Math.min(3.2, this.recoil + 1.15 * strength);
    this.flashTimer = 0.055;
    this.flashSeed = Math.random();
    this.muzzleLight.intensity = 38;
    this.flash.visible = true;
    this.flash.material.rotation = Math.random() * Math.PI * 2;
    const scale = 0.3 + Math.random() * 0.16;
    this.flash.scale.set(scale, scale, 1);
    this.smoke.visible = true;
    this.smoke.material.opacity = 0.16;
    this.smoke.position.copy(this.muzzle.position);
    this.smoke.scale.set(0.13, 0.13, 1);
    this.ejectShell();
  }

  ejectShell() {
    let shell = this.shellPool.pop();
    if (!shell) {
      shell = new THREE.Mesh(this.shellGeometry, this.materials.brass);
      shell.castShadow = false;
    }
    this.group.updateWorldMatrix(true, false);
    this.ejectPort.getWorldPosition(shell.position);
    this.scene.add(shell);
    shell.visible = true;
    shell.userData.velocity = new THREE.Vector3(
      (0.9 + Math.random() * 1.4),
      (1.1 + Math.random() * 0.9),
      (0.15 + Math.random() * 0.6)
    ).applyQuaternion(this.camera.getWorldQuaternion(this.tempQuat));
    shell.userData.spin = new THREE.Vector3(Math.random() * 9, Math.random() * 9, Math.random() * 9);
    shell.userData.life = 1.5;
    shell.rotation.set(Math.random() * 3, Math.random() * 3, Math.random() * 3);
    this.shells.push(shell);
  }

  getMuzzleWorld(target) {
    this.group.updateWorldMatrix(true, false);
    return this.muzzle.getWorldPosition(target);
  }

  applyViewShake(shake) {
    this.group.rotation.z += (Math.random() - 0.5) * shake * 0.004;
  }

  update(dt, time, params) {
    const targetAds = params.ads ? 1 : 0;
    this.adsT = lerp(this.adsT, targetAds, clamp(dt * 11, 0, 1));
    const ads = ease(this.adsT);
    this.recoil *= Math.exp(-13 * dt);
    if (this.recoil < 0.002) this.recoil = 0;

    this.sway.x = lerp(this.sway.x, clamp(-params.lookX * 0.55, -0.03, 0.03), clamp(dt * 9, 0, 1));
    this.sway.y = lerp(this.sway.y, clamp(-params.lookY * 0.55, -0.03, 0.03), clamp(dt * 9, 0, 1));

    const reload = params.reload ?? -1;
    let reloadX = 0;
    let reloadY = 0;
    let reloadZ = 0;
    let magDrop = 0;
    let magTilt = 0;
    if (reload >= 0) {
      if (reload < 0.16) {
        const k = ease(reload / 0.16);
        reloadX = 0.46 * k;
        reloadY = -0.075 * k;
        reloadZ = 0.03 * k;
        magDrop = 0.34 * k;
      } else if (reload < 0.42) {
        reloadX = 0.46;
        reloadY = -0.075;
        reloadZ = 0.03;
        magDrop = 0.34;
        magTilt = 0.22;
      } else if (reload < 0.58) {
        const k = ease((reload - 0.42) / 0.16);
        reloadX = 0.46;
        reloadY = -0.075 + 0.02 * k;
        reloadZ = 0.03;
        magDrop = 0.34 * (1 - k);
        magTilt = 0.22 * (1 - k);
      } else if (reload < 0.84) {
        const k = ease((reload - 0.58) / 0.26);
        reloadX = 0.46 * (1 - k);
        reloadY = -0.055 * (1 - k);
        reloadZ = 0.03 * (1 - k);
      }
    }

    const speed = params.speed ?? 0;
    this.bobPhase += dt * (3.2 + speed * 4.5);
    const bob = Math.sin(this.bobPhase) * (0.0022 + speed * 0.0065) * (1 - ads * 0.75);
    const swayX = this.sway.x * (1 - ads * 0.6);
    const swayY = this.sway.y * (1 - ads * 0.6);
    const breathe = Math.sin(time * 1.35) * 0.0018 * (1 - ads * 0.7);

    const portrait = this.camera.aspect < 0.85;
    const targetScale = portrait ? 0.7 : 0.85;
    const scale = lerp(this.group.scale.x, targetScale, clamp(dt * 8, 0, 1));
    this.group.scale.setScalar(scale);
    const hip = portrait
      ? new THREE.Vector3(0.10, -0.34, -0.85)
      : new THREE.Vector3(0.40, -0.31, -0.65);
    const adsPos = portrait
      ? new THREE.Vector3(0, -0.232 * scale, -0.72)
      : new THREE.Vector3(0, -0.197, -0.75);
    const pos = hip.lerp(adsPos, ads);
    pos.x += swayX + Math.cos(this.bobPhase * 0.5) * (0.0012 + speed * 0.003) * (1 - ads * 0.7);
    pos.y += swayY + bob + breathe;
    pos.z += this.recoil * 0.045 + reloadZ;
    pos.y += reloadY;
    this.group.position.copy(pos);

    const hipRot = new THREE.Euler(0.02 + this.recoil * 0.055, -0.045 + swayX * 0.8, 0.035 + swayY * 0.6);
    const adsRot = new THREE.Euler(this.recoil * 0.045, 0, 0);
    this.group.rotation.set(
      lerp(hipRot.x, adsRot.x, ads) + reloadX,
      lerp(hipRot.y, adsRot.y, ads),
      lerp(hipRot.z, adsRot.z, ads)
    );

    this.mag.position.y = -0.075 - magDrop;
    this.mag.rotation.x = -0.16 + magTilt;

    this.reticle.material.opacity = 0.16 + ads * 0.84;
    const hide = this.adsT > 0.55;
    if (hide !== this.adsHiddenState) {
      this.adsHiddenState = hide;
      for (const object of this.adsHidden) object.visible = !hide;
    }
    this.reticle.scale.setScalar(0.028 + ads * 0.018);

    if (this.flashTimer > 0) {
      this.flashTimer -= dt;
      this.flash.material.opacity = clamp(this.flashTimer / 0.055, 0, 1);
      this.muzzleLight.intensity = Math.max(0, this.flashTimer / 0.055) * 38;
      if (this.flashTimer <= 0) this.flash.visible = false;
    } else {
      this.muzzleLight.intensity *= Math.exp(-22 * dt);
    }
    if (this.smoke.material.opacity > 0) {
      this.smoke.material.opacity = Math.max(0, this.smoke.material.opacity - dt * 0.6);
      this.smoke.position.z -= dt * 0.45;
      this.smoke.position.y += dt * 0.05;
      this.smoke.scale.addScalar(dt * 0.22);
      if (this.smoke.material.opacity <= 0.01) this.smoke.visible = false;
    }

    for (let i = this.shells.length - 1; i >= 0; i--) {
      const shell = this.shells[i];
      const velocity = shell.userData.velocity;
      velocity.y -= 9.8 * dt;
      shell.position.addScaledVector(velocity, dt);
      shell.rotation.x += shell.userData.spin.x * dt;
      shell.rotation.y += shell.userData.spin.y * dt;
      shell.rotation.z += shell.userData.spin.z * dt;
      shell.userData.life -= dt;
      if (shell.position.y < 0.03) {
        shell.position.y = 0.03;
        velocity.set(velocity.x * 0.55, Math.abs(velocity.y) * 0.28, velocity.z * 0.55);
        shell.userData.spin.multiplyScalar(0.4);
      }
      if (shell.userData.life <= 0) {
        this.scene.remove(shell);
        this.shellPool.push(shell);
        this.shells.splice(i, 1);
      }
    }
  }
}
