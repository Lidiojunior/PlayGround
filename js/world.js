import * as THREE from '../vendor/three.module.js';
import {
  concreteTexture,
  wallTexture,
  targetTexture,
  signTexture,
  hazardTexture,
  crateTexture,
  glowTexture,
  dustTexture,
  laneNumberTexture
} from './textures.js';

const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

function mesh(scene, geometry, material, x, y, z, options = {}) {
  const object = new THREE.Mesh(geometry, material);
  object.position.set(x, y, z);
  if (options.rotation) object.rotation.set(options.rotation[0], options.rotation[1], options.rotation[2]);
  object.castShadow = Boolean(options.cast);
  object.receiveShadow = Boolean(options.receive);
  scene.add(object);
  return object;
}

function canvasPlane(scene, texture, width, height, x, y, z, options = {}) {
  const material = options.material ?? new THREE.MeshBasicMaterial({
    map: texture,
    transparent: options.transparent ?? false,
    opacity: options.opacity ?? 1,
    side: THREE.DoubleSide,
    depthWrite: options.depthWrite ?? true,
    blending: options.blending ?? THREE.NormalBlending,
    toneMapped: false
  });
  const object = new THREE.Mesh(new THREE.PlaneGeometry(width, height), material);
  object.position.set(x, y, z);
  if (options.rotation) object.rotation.set(options.rotation[0], options.rotation[1], options.rotation[2]);
  scene.add(object);
  return object;
}

class TargetField {
  constructor(scene) {
    this.scene = scene;
    this.rigs = [];
    this.boards = [];
    this.active = 0;
    this.activeMax = 5;
    this.spawnCooldown = 0;
    this.clock = 0;
    this.lanes = [
      { x: -6.5, z: -9.5 },
      { x: -3.3, z: -12.6 },
      { x: 0, z: -9.8 },
      { x: 3.4, z: -13.2 },
      { x: 6.5, z: -9.9 },
      { x: -6.9, z: -19.4 },
      { x: -2.9, z: -21.8 },
      { x: 2.8, z: -20.4 },
      { x: 6.9, z: -18.7 },
      { x: 0.2, z: -28.5 }
    ];
    this.metal = new THREE.MeshStandardMaterial({ color: 0x23272a, metalness: 0.72, roughness: 0.42 });
    this.paperSide = new THREE.MeshStandardMaterial({ color: 0x8f8775, roughness: 0.92, metalness: 0.02 });
    this.paperBack = new THREE.MeshStandardMaterial({ color: 0x5f594c, roughness: 0.95, metalness: 0.01 });
    this.ledMaterial = new THREE.MeshBasicMaterial({ color: 0xff3a1c, toneMapped: false });
    this.ledGlow = glowTexture('rgba(255,120,80,.95)', 'rgba(255,60,20,.55)');
    this.build();
  }

  build() {
    this.lanes.forEach((lane, index) => {
      const group = new THREE.Group();
      group.position.set(lane.x, 0, lane.z);
      group.rotation.y = Math.atan2(0 - lane.x, 2.6 - lane.z);
      this.scene.add(group);

      const base = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.09, 0.56), this.metal);
      base.position.y = 0.045;
      base.castShadow = true;
      base.receiveShadow = true;
      group.add(base);

      const foot = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.08, 0.72), this.metal);
      foot.position.y = 0.04;
      foot.castShadow = true;
      group.add(foot);

      const post = new THREE.Mesh(new THREE.BoxGeometry(0.07, 1.18, 0.07), this.metal);
      post.position.set(0, 0.62, -0.09);
      post.castShadow = true;
      group.add(post);

      const rail = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.04, 0.05), this.metal);
      rail.position.set(0, 0.24, -0.09);
      group.add(rail);

      const boardGroup = new THREE.Group();
      boardGroup.position.y = -1.5;
      group.add(boardGroup);

      const texture = targetTexture(index + 1);
      const front = new THREE.MeshStandardMaterial({ map: texture, roughness: 0.88, metalness: 0.02 });
      const materials = [this.paperSide, this.paperSide, this.paperSide, this.paperSide, front, this.paperBack];
      const board = new THREE.Mesh(new THREE.BoxGeometry(0.84, 1.3, 0.035), materials);
      board.castShadow = true;
      board.receiveShadow = true;
      board.userData.rig = null;
      boardGroup.add(board);

      const trim = new THREE.Mesh(
        new THREE.BoxGeometry(0.88, 0.035, 0.05),
        new THREE.MeshStandardMaterial({ color: 0x3a3f42, metalness: 0.72, roughness: 0.4 })
      );
      trim.position.set(0, -0.66, 0);
      boardGroup.add(trim);

      const led = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.024, 0.022), this.ledMaterial);
      led.position.set(0, 0.68, 0.026);
      boardGroup.add(led);

      const ledSprite = new THREE.Sprite(new THREE.SpriteMaterial({
        map: this.ledGlow,
        color: 0xff5a2a,
        transparent: true,
        opacity: 0.75,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        toneMapped: false
      }));
      ledSprite.scale.set(0.62, 0.26, 1);
      ledSprite.position.set(0, 0.68, 0.04);
      boardGroup.add(ledSprite);

      const rig = {
        group,
        base,
        boardGroup,
        board,
        led,
        ledSprite,
        state: 'down',
        targetY: -1.5,
        riseT: 0,
        fallT: 0,
        phase: Math.random() * Math.PI * 2,
        index
      };
      board.userData.rig = rig;
      this.boards.push(board);
      this.rigs.push(rig);
    });
  }

  reset() {
    this.active = 0;
    this.spawnCooldown = 0.6;
    this.rigs.forEach((rig) => {
      rig.state = 'down';
      rig.boardGroup.position.y = -1.5;
      rig.boardGroup.rotation.x = 0;
      rig.targetY = -1.5;
      rig.led.material = this.ledMaterial;
    });
    [1, 2, 3, 5, 7].forEach((index, order) => {
      const rig = this.rigs[index];
      rig.state = 'up';
      rig.boardGroup.position.y = 1.02;
      rig.boardGroup.rotation.x = 0;
      rig.targetY = 1.02;
      rig.ry = 1.02;
      rig.phase = order * 1.7;
      this.active++;
    });
  }

  preview() {
    this.rigs.forEach((rig, index) => {
      if ([1, 2, 3, 5, 7].includes(index)) {
        rig.state = 'up';
        rig.boardGroup.position.y = 1.02;
        rig.targetY = 1.02;
        rig.ry = 1.02;
      }
    });
    this.active = 5;
  }

  raiseRandom() {
    const candidates = this.rigs.filter((rig) => rig.state === 'down');
    if (!candidates.length) return;
    const rig = candidates[Math.floor(Math.random() * candidates.length)];
    rig.state = 'rising';
    rig.riseT = 0;
    rig.boardGroup.rotation.x = 0;
    rig.targetY = 1.02;
    rig.phase = Math.random() * Math.PI * 2;
    this.active++;
  }

  hit(hit) {
    const rig = hit.object.userData.rig;
    if (!rig) return null;
    const uv = hit.uv;
    const headshot = Boolean(uv && uv.y > 0.755);
    rig.state = 'falling';
    rig.fallT = 0;
    rig.targetY = -1.55;
    rig.hitTilt = -0.95;
    this.active = Math.max(0, this.active - 1);
    return { rig, headshot, point: hit.point };
  }

  intersect(raycaster) {
    const hits = raycaster.intersectObjects(this.boards, false);
    for (const hit of hits) {
      const rig = hit.object.userData.rig;
      if (!rig) continue;
      if ((rig.state === 'up' || rig.state === 'rising') && rig.boardGroup.position.y > 0.5) return hit;
    }
    return null;
  }

  update(dt) {
    this.clock += dt;
    for (const rig of this.rigs) {
      if (rig.state === 'rising') {
        rig.riseT += dt;
        const k = Math.min(1, rig.riseT / 0.34);
        rig.boardGroup.position.y = -1.5 + 2.52 * easeOutCubic(k);
        if (k >= 1) {
          rig.state = 'up';
          rig.boardGroup.position.y = 1.02;
          rig.led.visible = true;
        }
      } else if (rig.state === 'up') {
        rig.boardGroup.position.y = 1.02 + Math.sin(this.clock * 1.6 + rig.phase) * 0.008;
        rig.group.rotation.z = Math.sin(this.clock * 0.7 + rig.phase) * 0.008;
        const pulse = 0.72 + Math.sin(this.clock * 3.4 + rig.phase) * 0.2;
        rig.ledSprite.material.opacity = pulse;
        rig.led.material.color.setRGB(0.9 + pulse * 0.1, 0.16, 0.06);
      } else if (rig.state === 'falling') {
        rig.fallT += dt;
        const k = Math.min(1, rig.fallT / 0.42);
        rig.boardGroup.position.y = 1.02 - 2.57 * easeOutCubic(k);
        rig.boardGroup.rotation.x = (rig.hitTilt ?? -0.9) * easeOutCubic(k);
        rig.group.rotation.z *= 0.9;
        rig.ledSprite.material.opacity *= 0.7;
        if (k >= 1) {
          rig.state = 'down';
          rig.boardGroup.position.y = -1.55;
          rig.boardGroup.rotation.x = 0;
          rig.targetY = -1.5;
        }
      }
    }
    if (this.active < this.activeMax) {
      this.spawnCooldown -= dt;
      if (this.spawnCooldown <= 0) {
        this.raiseRandom();
        this.spawnCooldown = 0.55 + Math.random() * 1.1;
      }
    }
  }
}

export function buildWorld(scene) {
  const collidables = [];
  const floorTexture = concreteTexture({ base: '#3c4043', repeat: [7, 17], seed: 4 });
  const floorBump = floorTexture.clone();
  floorBump.colorSpace = THREE.NoColorSpace;
  floorBump.needsUpdate = true;
  const floor = mesh(
    scene,
    new THREE.PlaneGeometry(21, 49),
    new THREE.MeshStandardMaterial({ map: floorTexture, bumpMap: floorBump, bumpScale: 0.035, roughness: 0.94, metalness: 0.04, color: 0xa8adb1 }),
    0, 0, -13,
    { rotation: [-Math.PI / 2, 0, 0], receive: true }
  );
  collidables.push(floor);

  const ceiling = mesh(
    scene,
    new THREE.PlaneGeometry(21, 49),
    new THREE.MeshStandardMaterial({ color: 0x131619, roughness: 1, metalness: 0.1 }),
    0, 5.65, -13,
    { rotation: [Math.PI / 2, 0, 0], receive: false }
  );

  const wallTex = wallTexture();
  const wallMaterial = new THREE.MeshStandardMaterial({ map: wallTex, roughness: 0.9, metalness: 0.08, color: 0x9ba0a4 });
  const leftWall = mesh(scene, new THREE.BoxGeometry(0.5, 5.7, 49), wallMaterial, -10.55, 2.85, -13, { cast: true, receive: true });
  const rightWall = mesh(scene, new THREE.BoxGeometry(0.5, 5.7, 49), wallMaterial, 10.55, 2.85, -13, { cast: true, receive: true });
  const backWall = mesh(scene, new THREE.BoxGeometry(21, 5.7, 0.6), wallMaterial, 0, 2.85, -37.3, { cast: true, receive: true });
  const frontWall = mesh(scene, new THREE.BoxGeometry(21, 5.7, 0.6), new THREE.MeshStandardMaterial({ color: 0x191d20, roughness: 0.95 }), 0, 2.85, 10.6, { receive: true });
  collidables.push(leftWall, rightWall, backWall, frontWall);

  const steel = new THREE.MeshStandardMaterial({ color: 0x2b3034, metalness: 0.8, roughness: 0.34 });
  const darkSteel = new THREE.MeshStandardMaterial({ color: 0x1c2023, metalness: 0.78, roughness: 0.42 });
  const rubber = new THREE.MeshStandardMaterial({ color: 0x111315, roughness: 0.9, metalness: 0.1 });
  const orange = new THREE.MeshBasicMaterial({ color: 0xff5a1f, toneMapped: false });
  const fixtureMat = new THREE.MeshBasicMaterial({ color: 0xffd2a0, toneMapped: false });

  for (let z = 8; z > -36; z -= 5.4) {
    mesh(scene, new THREE.BoxGeometry(20.6, 0.24, 0.2), darkSteel, 0, 5.44, z, { cast: true });
    mesh(scene, new THREE.BoxGeometry(0.24, 0.24, 48), darkSteel, -10.3, 5.44, -13, { cast: true });
    mesh(scene, new THREE.BoxGeometry(0.24, 0.24, 48), darkSteel, 10.3, 5.44, -13, { cast: true });
  }

  const fixtures = [];
  [-27, -18, -9, 1].forEach((z, index) => {
    const fixture = mesh(scene, new THREE.BoxGeometry(2.2, 0.06, 0.3), fixtureMat, index % 2 ? 3 : -3, 5.34, z);
    fixtures.push(fixture);
    const sprite = new THREE.Sprite(new THREE.SpriteMaterial({
      map: glowTexture('rgba(255,240,220,.9)', 'rgba(255,206,150,.5)'),
      color: 0xffd9b0,
      transparent: true,
      opacity: 0.24,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      toneMapped: false
    }));
    sprite.position.set(index % 2 ? 3 : -3, 5.2, z);
    sprite.scale.set(3.4, 1.3, 1);
    scene.add(sprite);
  });

  const pipes = new THREE.MeshStandardMaterial({ color: 0x2d3337, metalness: 0.65, roughness: 0.48 });
  for (const x of [-8.9, -7.9]) {
    const pipe = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 47, 10), pipes);
    pipe.rotation.x = Math.PI / 2;
    pipe.position.set(x, 4.85, -13);
    scene.add(pipe);
  }
  for (const x of [8.6, 9.4]) {
    const pipe = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 47, 8), pipes);
    pipe.rotation.x = Math.PI / 2;
    pipe.position.set(x, 4.95, -13);
    scene.add(pipe);
  }

  const hazard = hazardTexture();
  const hazardMaterial = new THREE.MeshStandardMaterial({ map: hazard, roughness: 0.65, metalness: 0.25 });
  const counter = new THREE.Group();
  scene.add(counter);
  const counterBody = new THREE.Mesh(new THREE.BoxGeometry(6.6, 0.94, 0.92), new THREE.MeshStandardMaterial({ color: 0x22272a, metalness: 0.55, roughness: 0.55 }));
  counterBody.position.set(0, 0.47, 1.25);
  counterBody.castShadow = true;
  counterBody.receiveShadow = true;
  counter.add(counterBody);
  const counterTop = new THREE.Mesh(new THREE.BoxGeometry(6.9, 0.09, 1.04), steel);
  counterTop.position.set(0, 0.98, 1.25);
  counterTop.castShadow = true;
  counterTop.receiveShadow = true;
  counter.add(counterTop);
  const counterStripe = new THREE.Mesh(new THREE.PlaneGeometry(6.45, 0.24), hazardMaterial);
  counterStripe.position.set(0, 0.58, 1.715);
  counter.add(counterStripe);
  const counterEdge = new THREE.Mesh(new THREE.BoxGeometry(6.9, 0.014, 0.04), new THREE.MeshStandardMaterial({ color: 0x111417, metalness: 0.8, roughness: 0.35 }));
  counterEdge.position.set(0, 1.035, 0.745);
  counter.add(counterEdge);
  collidables.push(counterBody, counterTop);

  const boothMat = new THREE.MeshStandardMaterial({ color: 0x2c3135, metalness: 0.4, roughness: 0.7 });
  for (const x of [-3.55, 3.55]) {
    const partition = mesh(scene, new THREE.BoxGeometry(0.1, 1.55, 2.8), boothMat, x, 0.78, 2.15, { cast: true, receive: true });
    mesh(scene, new THREE.BoxGeometry(0.18, 0.05, 2.9), steel, x, 1.58, 2.15, { cast: true });
    mesh(scene, new THREE.BoxGeometry(0.11, 0.2, 2.8), rubber, x, 0.1, 2.15);
    const top = new THREE.Mesh(new THREE.PlaneGeometry(0.14, 0.1), orange);
    top.position.set(x, 1.55, 0.76);
    top.rotation.y = -Math.PI / 2 * Math.sign(x);
    scene.add(top);
    collidables.push(partition);
  }

  const stripe = new THREE.Mesh(new THREE.PlaneGeometry(19, 0.34), hazardMaterial);
  stripe.rotation.x = -Math.PI / 2;
  stripe.position.set(0, 0.004, 2.05);
  stripe.receiveShadow = true;
  scene.add(stripe);

  const laneLineMat = new THREE.MeshBasicMaterial({ color: 0xd98b2b, transparent: true, opacity: 0.24, toneMapped: false });
  for (const x of [-6.5, -3.3, 0, 3.4, 6.5]) {
    const line = new THREE.Mesh(new THREE.PlaneGeometry(0.035, 28), laneLineMat);
    line.rotation.x = -Math.PI / 2;
    line.position.set(x, 0.006, -13.5);
    scene.add(line);
  }

  const boothSign = new THREE.Group();
  const sign = new THREE.Mesh(new THREE.PlaneGeometry(5.4, 1.35), new THREE.MeshBasicMaterial({ map: signTexture(), toneMapped: false }));
  sign.position.set(0, 3.55, -36.92);
  boothSign.add(sign);
  scene.add(boothSign);

  const backHazard = new THREE.Mesh(new THREE.PlaneGeometry(19, 0.5), hazardMaterial);
  backHazard.position.set(0, 0.28, -36.92);
  scene.add(backHazard);
  const backPlate = mesh(scene, new THREE.BoxGeometry(18.8, 1.6, 0.28), new THREE.MeshStandardMaterial({ color: 0x24292d, metalness: 0.72, roughness: 0.38 }), 0, 1.02, -36.78, { cast: true, receive: true });
  collidables.push(backPlate);

  const laneSigns = [
    { x: -6.3, n: 1 },
    { x: -2.1, n: 2 },
    { x: 2.1, n: 3 },
    { x: 6.3, n: 4 }
  ];
  laneSigns.forEach((entry) => {
    const texture = laneNumberTexture(entry.n);
    const plane = new THREE.Mesh(new THREE.PlaneGeometry(0.58, 1.16), new THREE.MeshBasicMaterial({ map: texture, transparent: true, opacity: 0.82, toneMapped: false, side: THREE.DoubleSide }));
    plane.position.set(entry.x, 3.7, -4.6);
    scene.add(plane);
    const rodMat = new THREE.MeshStandardMaterial({ color: 0x25292c, metalness: 0.8, roughness: 0.35 });
    for (const offset of [-0.22, 0.22]) {
      const rod = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.008, 1.35, 5), rodMat);
      rod.position.set(entry.x + offset, 4.6, -4.6);
      scene.add(rod);
    }
  });

  const crateMap = crateTexture();
  const crateMat = new THREE.MeshStandardMaterial({ map: crateMap, roughness: 0.86, metalness: 0.05 });
  const crateSpots = [
    [-8.3, 0.44, -4.1, 0.15],
    [-7.45, 0.44, -4.7, -0.08],
    [-7.9, 1.32, -4.35, 0.06],
    [8.25, 0.44, -14.2, -0.12],
    [7.45, 0.44, -13.4, 0.18],
    [7.85, 1.32, -13.8, -0.04],
    [8.5, 0.44, -28.3, 0.2],
    [-8.35, 0.44, -25.6, -0.15]
  ];
  for (const [x, y, z, ry] of crateSpots) {
    const crate = mesh(scene, new THREE.BoxGeometry(0.88, 0.88, 0.88), crateMat, x, y, z, { cast: true, receive: true, rotation: [0, ry, 0] });
    collidables.push(crate);
  }

  const barrelMat = new THREE.MeshStandardMaterial({ color: 0x27342d, metalness: 0.55, roughness: 0.5 });
  const barrelRim = new THREE.MeshStandardMaterial({ color: 0x171b1a, metalness: 0.7, roughness: 0.4 });
  const barrelSpots = [
    [-9.2, -8.2], [-8.6, -9.1], [9.1, -19.6], [8.6, -20.4], [-9.15, -30.4], [9.05, -26.2]
  ];
  for (const [x, z] of barrelSpots) {
    const barrel = mesh(scene, new THREE.CylinderGeometry(0.3, 0.31, 0.92, 16), barrelMat, x, 0.46, z, { cast: true, receive: true });
    collidables.push(barrel);
    mesh(scene, new THREE.CylinderGeometry(0.315, 0.315, 0.06, 16), barrelRim, x, 0.86, z, { cast: true });
  }

  const ammoBox = mesh(scene, new THREE.BoxGeometry(0.34, 0.2, 0.2), new THREE.MeshStandardMaterial({ color: 0x4a4c3c, metalness: 0.35, roughness: 0.65 }), -1.2, 1.12, 1.35, { cast: true, receive: true });
  collidables.push(ammoBox);
  const ammoLatch = mesh(scene, new THREE.BoxGeometry(0.36, 0.03, 0.04), steel, -1.2, 1.23, 1.26);
  collidables.push(ammoLatch);

  scene.fog = new THREE.FogExp2(0x05080a, 0.024);
  scene.background = new THREE.Color(0x05080a);

  const hemi = new THREE.HemisphereLight(0x6d8298, 0x121110, 0.78);
  scene.add(hemi);
  const ambient = new THREE.AmbientLight(0x39434a, 0.5);
  scene.add(ambient);

  const mainSpot = new THREE.SpotLight(0xffd9ae, 430, 40, 0.64, 0.72, 1.2);
  mainSpot.position.set(0, 5.2, 0.8);
  mainSpot.target.position.set(0, 0, -10);
  mainSpot.castShadow = true;
  mainSpot.shadow.mapSize.set(1024, 1024);
  mainSpot.shadow.camera.near = 0.5;
  mainSpot.shadow.camera.far = 42;
  mainSpot.shadow.bias = -0.0006;
  mainSpot.shadow.normalBias = 0.02;
  scene.add(mainSpot, mainSpot.target);

  const spotB = new THREE.SpotLight(0xbfd7ff, 300, 32, 0.72, 0.85, 1.35);
  spotB.position.set(-6.4, 5.1, -11);
  spotB.target.position.set(-6, 0, -16);
  scene.add(spotB, spotB.target);

  const spotC = new THREE.SpotLight(0xffcfa3, 310, 34, 0.72, 0.85, 1.3);
  spotC.position.set(6.2, 5.1, -21);
  spotC.target.position.set(5.6, 0, -26);
  scene.add(spotC, spotC.target);

  const spotD = new THREE.SpotLight(0xa8c6e8, 240, 30, 0.74, 0.9, 1.45);
  spotD.position.set(0, 5.1, -30);
  spotD.target.position.set(0, 0, -33);
  scene.add(spotD, spotD.target);

  const washLights = [
    [-7.6, 3.7, -5.2, 0x8fb1d6, 62],
    [7.6, 3.7, -12.4, 0x8fb1d6, 58],
    [-7.6, 3.6, -22.6, 0xffb27a, 48],
    [7.6, 3.6, -30.2, 0x8fb1d6, 44],
    [0, 2.4, 1.2, 0xffc18a, 30]
  ];
  for (const [x, y, z, color, intensity] of washLights) {
    const light = new THREE.PointLight(color, intensity, 18, 2);
    light.position.set(x, y, z);
    scene.add(light);
  }

  const glowTex = glowTexture();

  const wallLampMat = new THREE.MeshBasicMaterial({ color: 0xff5a1f, toneMapped: false });
  for (let z = 6; z > -36; z -= 6.2) {
    for (const x of [-10.24, 10.24]) {
      const lamp = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.07, 0.36), wallLampMat);
      lamp.position.set(x, 0.32, z);
      scene.add(lamp);
      const glow = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTex, color: 0xff6a2a, transparent: true, opacity: 0.5, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false }));
      glow.position.set(x + (x < 0 ? 0.06 : -0.06), 0.32, z);
      glow.scale.set(1.1, 1.1, 1);
      scene.add(glow);
    }
  }

  const dustCount = 460;
  const dustPositions = new Float32Array(dustCount * 3);
  const dustVelocities = new Float32Array(dustCount);
  const rand = (() => {
    let s = 9182;
    return () => {
      s = (s * 16807) % 2147483647;
      return s / 2147483647;
    };
  })();
  for (let i = 0; i < dustCount; i++) {
    dustPositions[i * 3] = (rand() - 0.5) * 19;
    dustPositions[i * 3 + 1] = rand() * 5.2 + 0.1;
    dustPositions[i * 3 + 2] = 8 - rand() * 44;
    dustVelocities[i] = 0.02 + rand() * 0.09;
  }
  const dustGeometry = new THREE.BufferGeometry();
  dustGeometry.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3));
  const dustPoints = new THREE.Points(dustGeometry, new THREE.PointsMaterial({
    map: dustTexture(),
    size: 0.055,
    transparent: true,
    opacity: 0.55,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    color: 0xffe3c4,
    toneMapped: false
  }));
  scene.add(dustPoints);

  const targets = new TargetField(scene);

  const world = {
    collidables,
    targets,
    mainSpot,
    fixtureMat,
    dustPoints,
    dustVelocities,
    dustPositions,
    update(dt, time) {
      targets.update(dt);
      const position = dustGeometry.attributes.position.array;
      for (let i = 0; i < dustCount; i++) {
        position[i * 3 + 1] += dustVelocities[i] * dt;
        position[i * 3] += Math.sin(time * 0.12 + i) * 0.0006;
        if (position[i * 3 + 1] > 5.4) position[i * 3 + 1] = 0.1;
      }
      dustGeometry.attributes.position.needsUpdate = true;
      mainSpot.intensity = 425 + Math.sin(time * 13.7) * 6 + Math.sin(time * 5.2) * 5;
      fixtureMat.color.setRGB(1, 0.9 + Math.sin(time * 9.3) * 0.006, 0.76 + Math.sin(time * 7.1) * 0.01);
    }
  };
  return world;
}
