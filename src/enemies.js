import * as THREE from 'three';
import { moveCircle } from './physics.js';

const V = (x, y, z) => new THREE.Vector3(x, y, z);
const rand = (a, b) => a + Math.random() * (b - a);

function limbBetween(from, to, r, mat) {
  const dir = new THREE.Vector3().subVectors(to, from);
  const len = dir.length();
  const g = new THREE.CapsuleGeometry(r, Math.max(0.01, len - r * 2), 4, 8);
  const m = new THREE.Mesh(g, mat);
  m.position.copy(from).addScaledVector(dir, 0.5);
  m.quaternion.setFromUnitVectors(V(0, 1, 0), dir.normalize());
  return m;
}

function mats(tex) {
  const m = {
    uniform: new THREE.MeshStandardMaterial({ map: tex.camo, color: 0xa79a7a, roughness: 0.92, metalness: 0.02 }),
    uniformDark: new THREE.MeshStandardMaterial({ map: tex.camo, color: 0x6d6a55, roughness: 0.95, metalness: 0.02 }),
    vest: new THREE.MeshStandardMaterial({ color: 0x5d5c48, roughness: 0.78, metalness: 0.08 }),
    helmet: new THREE.MeshStandardMaterial({ map: tex.camo, color: 0x8e8466, roughness: 0.86, metalness: 0.05 }),
    glove: new THREE.MeshStandardMaterial({ color: 0x24221e, roughness: 0.92 }),
    boot: new THREE.MeshStandardMaterial({ color: 0x2a2722, roughness: 0.9 }),
    mask: new THREE.MeshStandardMaterial({ color: 0x211f1c, roughness: 0.95 }),
    gun: new THREE.MeshStandardMaterial({ color: 0x27282a, metalness: 0.8, roughness: 0.42 }),
    gunTan: new THREE.MeshStandardMaterial({ color: 0x7c6e51, roughness: 0.75 }),
    goggle: new THREE.MeshStandardMaterial({ color: 0x2a2f2c, emissive: 0xff5a20, emissiveIntensity: 1.6, metalness: 0.6, roughness: 0.2 }),
    skin: new THREE.MeshStandardMaterial({ color: 0x6e513c, roughness: 0.85 }),
  };
  return m;
}

function tagParts(group, part, enemy, list) {
  group.traverse(o => {
    if (o.isMesh) {
      o.castShadow = true; o.receiveShadow = true;
      o.userData.enemy = enemy; o.userData.part = part;
      list.push(o);
    }
  });
}

export function createEnemies(scene, tex, world, effects, audio, quality = {}) {
  const low = quality.low === true;
  const enemies = [];
  const raycaster = new THREE.Raycaster();
  const colliders = world.colliders;

  function build(e) {
    const root = new THREE.Group();
    root.rotation.order = 'YXZ';
    const M = mats(tex);
    const hit = [];
    const flashMats = [M.uniform, M.uniformDark, M.vest, M.helmet, M.glove, M.boot, M.gunTan];
    const baseEmissive = flashMats.map(m => m.emissive.clone());

    // legs
    function leg(side) {
      const pivot = new THREE.Group(); pivot.position.set(side * 0.115, 0.92, 0);
      const thigh = new THREE.Mesh(new THREE.CapsuleGeometry(0.095, 0.26, 4, 8), M.uniform);
      thigh.position.y = -0.19; pivot.add(thigh);
      const knee = new THREE.Group(); knee.position.y = -0.4;
      const shin = new THREE.Mesh(new THREE.CapsuleGeometry(0.08, 0.25, 4, 8), M.uniformDark);
      shin.position.y = -0.18; knee.add(shin);
      const boot = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.13, 0.29), M.boot);
      boot.position.set(0, -0.37, -0.05); knee.add(boot);
      const kneePad = new THREE.Mesh(new THREE.BoxGeometry(0.13, 0.14, 0.08), M.vest);
      kneePad.position.set(0, -0.045, -0.06); knee.add(kneePad);
      pivot.add(knee);
      root.add(pivot);
      tagParts(pivot, 'limb', e, hit);
      return { pivot, knee };
    }
    const legL = leg(-1), legR = leg(1);

    const torso = new THREE.Group(); torso.position.y = 1.02; root.add(torso);
    const pelvis = new THREE.Mesh(new THREE.BoxGeometry(0.33, 0.2, 0.23), M.uniformDark);
    pelvis.position.y = -0.02; torso.add(pelvis);

    const chest = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.4, 0.26), M.uniform);
    chest.position.y = 0.31; torso.add(chest);
    const vest = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.34, 0.09), M.vest);
    vest.position.set(0, 0.3, 0.16); torso.add(vest);
    const backPack = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.4, 0.18), M.uniformDark);
    backPack.position.set(0, 0.28, -0.2); torso.add(backPack);
    const packTop = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.1, 0.12), M.vest);
    packTop.position.set(0, 0.51, -0.2); torso.add(packTop);
    for (let i = 0; i < 3; i++) {
      const pouch = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.12, 0.06), M.vest);
      pouch.position.set(-0.12 + i * 0.12, 0.22, 0.22); torso.add(pouch);
    }
    const radio = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.14, 0.06), M.glove);
    radio.position.set(-0.18, 0.4, 0.16); torso.add(radio);
    const antenna = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.01, 0.36, 5), M.gun);
    antenna.position.set(-0.18, 0.64, 0.15); torso.add(antenna);

    for (const s of [-1, 1]) {
      const pad = new THREE.Mesh(new THREE.SphereGeometry(0.115, 10, 8), M.vest);
      pad.scale.set(1.1, 0.8, 1.05); pad.position.set(s * 0.26, 0.47, 0); torso.add(pad);
    }
    tagParts(torso, 'body', e, hit);

    // head
    const head = new THREE.Group(); head.position.set(0, 0.62, 0);
    const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.07, 0.1, 8), M.mask);
    neck.position.y = -0.03; head.add(neck);
    const face = new THREE.Mesh(new THREE.BoxGeometry(0.165, 0.2, 0.175), M.mask);
    face.position.y = 0.1; head.add(face);
    const helmet = new THREE.Mesh(new THREE.SphereGeometry(0.155, 14, 10, 0, Math.PI * 2, 0, Math.PI * 0.62), M.helmet);
    helmet.scale.set(1.02, 0.95, 1.12); helmet.position.y = 0.145; head.add(helmet);
    const brim = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.055, 0.1), M.helmet);
    brim.position.set(0, 0.16, -0.16); brim.rotation.x = -0.12; head.add(brim);
    for (const s of [-1, 1]) {
      const lens = new THREE.Mesh(new THREE.CylinderGeometry(0.024, 0.024, 0.035, 10), M.goggle);
      lens.rotation.x = Math.PI / 2; lens.position.set(s * 0.04, 0.1, -0.095); head.add(lens);
    }
    const band = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.035, 0.16), M.glove);
    band.position.set(0, 0.12, -0.06); head.add(band);
    const mount = new THREE.Mesh(new THREE.BoxGeometry(0.035, 0.05, 0.06), M.gun);
    mount.position.set(0, 0.205, -0.1); head.add(mount);
    torso.add(head);
    tagParts(head, 'head', e, hit);

    // arms holding rifle
    const armR = new THREE.Group();
    armR.add(limbBetween(V(0.24, 0.45, 0.02), V(0.27, 0.27, -0.12), 0.055, M.uniform));
    armR.add(limbBetween(V(0.27, 0.27, -0.12), V(0.11, 0.28, -0.34), 0.046, M.uniform));
    const handR = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.08, 0.09), M.glove);
    handR.position.set(0.1, 0.28, -0.35); armR.add(handR);
    armR.add(limbBetween(V(-0.24, 0.45, 0.02), V(-0.25, 0.28, -0.14), 0.055, M.uniform));
    armR.add(limbBetween(V(-0.25, 0.28, -0.14), V(-0.08, 0.3, -0.43), 0.046, M.uniform));
    const handL = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.08, 0.09), M.glove);
    handL.position.set(-0.075, 0.3, -0.44); armR.add(handL);
    torso.add(armR);
    tagParts(armR, 'limb', e, hit);

    // rifle
    const rifle = new THREE.Group(); rifle.position.set(0.03, 0.32, -0.42); torso.add(rifle);
    const rBody = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.09, 0.38), M.gun); rifle.add(rBody);
    const rBarrel = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.014, 0.34, 8), M.gun);
    rBarrel.rotation.x = Math.PI / 2; rBarrel.position.z = -0.34; rifle.add(rBarrel);
    const rGuard = new THREE.Mesh(new THREE.BoxGeometry(0.055, 0.06, 0.2), M.gunTan);
    rGuard.position.set(0, -0.01, -0.2); rifle.add(rGuard);
    const rMag = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.15, 0.07), M.gunTan);
    rMag.position.set(0, -0.1, -0.04); rMag.rotation.x = 0.2; rifle.add(rMag);
    const rStock = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.075, 0.16), M.gun);
    rStock.position.set(0, -0.01, 0.24); rifle.add(rStock);
    const rScope = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.1, 8), M.gun);
    rScope.rotation.x = Math.PI / 2; rScope.position.set(0, 0.07, -0.02); rifle.add(rScope);
    tagParts(rifle, 'limb', e, hit);

    // muzzle flash sprite
    const flashMat = new THREE.SpriteMaterial({ map: tex.flash, color: 0xffb066, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, opacity: 0 });
    const flash = new THREE.Sprite(flashMat);
    flash.position.set(0.03, 0.32, -0.9); flash.scale.setScalar(0.4); flash.visible = false; torso.add(flash);

    scene.add(root);
    e.root = root; e.torso = torso; e.head = head; e.legL = legL; e.legR = legR;
    e.hitMeshes = hit; e.flash = flash; e.flashMats = flashMats; e.baseEmissive = baseEmissive;
    e.muzzleLocal = V(0.03, 0.32, -0.92);
    return root;
  }

  function spawn(x, z, wave = 1) {
    const e = {
      id: Math.random().toString(36).slice(2),
      position: V(x, 0, z),
      health: 100 + (wave - 1) * 12,
      maxHealth: 100 + (wave - 1) * 12,
      alive: true, deadT: 0, hitFlash: 0, flinch: 0,
      state: 'advance', fireTimer: rand(1.4, 2.6), burst: 0, burstTimer: 0,
      phase: Math.random() * Math.PI * 2, walk: 0, speed: rand(1.45, 1.85),
      strafeDir: Math.random() > 0.5 ? 1 : -1, strafeTimer: rand(1, 3), aimYaw: 0,
      wpn: wave, hasLOS: false, visible: true, spawnFlash: 0.4,
    };
    build(e);
    e.root.position.copy(e.position);
    e.root.rotation.y = Math.atan2(x, z);
    enemies.push(e);
    effects.smoke(V(x, 0.35, z), 0.8, 0xb6a17d, 1.4, 0.35, 0.8);
    return e;
  }

  function los(e, px, py, pz) {
    const eye = V(e.position.x, 1.55, e.position.z);
    const target = V(px, py + 1.4, pz);
    const dir = new THREE.Vector3().subVectors(target, eye);
    const dist = dir.length();
    if (dist < 0.2) return true;
    dir.normalize();
    raycaster.set(eye, dir);
    raycaster.far = dist - 0.4;
    const hits = raycaster.intersectObjects(world.raycastTargets, false);
    return hits.length === 0;
  }

  function shoot(e, player) {
    const muzzle = e.muzzleLocal.clone();
    e.torso.updateWorldMatrix(true, false);
    e.torso.localToWorld(muzzle);
    e.flash.visible = true; e.flash.material.opacity = 1; e.flash.material.rotation = Math.random() * 6;
    e.flash.scale.setScalar(0.3 + Math.random() * 0.2);
    e.spawnFlash = 0.05;
    audio.enemyShot(e.position.distanceTo(player.position));

    const dist = e.position.distanceTo(player.position);
    let acc = THREE.MathUtils.clamp(0.6 - dist * 0.0085, 0.18, 0.52) + (e.wpn - 1) * 0.035;
    if (player.moving) acc -= 0.09;
    if (player.sprinting) acc -= 0.07;
    const hit = Math.random() < acc;
    const target = V(player.position.x, player.position.y + 1.4, player.position.z);
    if (!hit) {
      target.x += rand(-1.2, 1.2); target.y += rand(-0.8, 1.4); target.z += rand(-1.2, 1.2);
    }
    effects.tracer(muzzle, target, 0xff9a52, 0.055);
    if (hit) {
      player.takeDamage(rand(5.5, 9.5) * (1 + (e.wpn - 1) * 0.18), e.position);
      effects.sparkBurst(player.position.clone().add(V(rand(-0.2, 0.2), rand(0.2, 0.8), rand(-0.2, 0.2))), null, 4, 0xbf5a3a, 2, 0.4);
    } else {
      const missPoint = target.clone().add(V(rand(-0.6, 0.6), rand(-0.5, 0.5), rand(-0.6, 0.6)));
      const groundY = 0.05;
      effects.sparkBurst(missPoint.setY(Math.max(groundY, missPoint.y - 0.4)), V(0, 1, 0), 5, 0xd7b07a, 2, 0.6);
      effects.smoke(missPoint.setY(0.15), 0.3, 0xb6a17d, 0.6, 0.24, 0.4);
    }
    return hit;
  }

  function damage(e, amount, part, point, normal, player) {
    if (!e.alive) return { killed: false };
    e.health -= amount;
    e.hitFlash = 0.09;
    e.flinch = Math.min(1, e.flinch + 0.5);
    if (e.health <= 0) {
      e.alive = false; e.deadT = 0; e.deathDir = Math.random() > 0.5 ? 1 : -1;
      effects.smoke(V(e.position.x, 0.3, e.position.z), 1.0, 0xa89472, 2.2, 0.4, 0.6);
      return { killed: true, headshot: part === 'head' };
    }
    return { killed: false };
  }

  function update(dt, player, time) {
    for (const e of enemies) {
      if (!e.alive) {
        e.deadT += dt;
        if (e.flash.visible) e.flash.visible = false;
        const t = Math.min(1, e.deadT / 0.65);
        const fall = t * t * (3 - 2 * t);
        e.root.rotation.x = -fall * (Math.PI / 2) * (e.deathDir || 1);
        if (e.deadT > 2.2) {
          const f = THREE.MathUtils.clamp(1 - (e.deadT - 2.2) / 1.3, 0, 1);
          e.root.traverse(o => {
            if (o.isMesh) {
              o.material.transparent = true;
              o.material.opacity = f;
            }
          });
          e.root.position.y = -0.15 * (1 - f);
        }
        if (e.deadT > 3.6) { e.root.visible = false; e.visible = false; }
        continue;
      }

      const dx = player.position.x - e.position.x;
      const dz = player.position.z - e.position.z;
      const dist = Math.hypot(dx, dz);
      e.root.position.copy(e.position);

      // face player
      const targetYaw = Math.atan2(-dx, -dz);
      let diff = targetYaw - e.aimYaw;
      while (diff > Math.PI) diff -= Math.PI * 2;
      while (diff < -Math.PI) diff += Math.PI * 2;
      e.aimYaw += diff * Math.min(1, dt * 6);
      e.root.rotation.y = e.aimYaw;

      e.hasLOS = dist < 46 && los(e, player.position.x, player.position.y, player.position.z);

      let moving = false;
      if (dist > 1.2 && player.alive) {
        let mx = 0, mz = 0;
        const nx = dx / (dist || 1), nz = dz / (dist || 1);
        if (!e.hasLOS || dist > 17) { mx = nx; mz = nz; }
        else if (dist < 6.5) { mx = -nx; mz = -nz; }
        else {
          e.strafeTimer -= dt;
          if (e.strafeTimer <= 0) { e.strafeTimer = rand(1.4, 3.4); e.strafeDir *= -1; }
          mx = -nz * e.strafeDir * 0.75; mz = nx * e.strafeDir * 0.75;
          if (dist > 12) { mx += nx * 0.35; mz += nz * 0.35; }
        }
        const ml = Math.hypot(mx, mz) || 1;
        const sp = e.speed * (e.hasLOS ? 0.55 : 1);
        moveCircle(e.position, (mx / ml) * sp * dt, (mz / ml) * sp * dt, 0.38, colliders, world.bounds);
        moving = true;
        e.walk += dt * (e.hasLOS ? 5.5 : 8.5);
      } else {
        e.walk += dt * 1.2;
      }

      // animate
      const swing = moving ? Math.sin(e.walk) * (e.hasLOS ? 0.32 : 0.55) : Math.sin(time * 1.4 + e.phase) * 0.04;
      e.legL.pivot.rotation.x = swing;
      e.legR.pivot.rotation.x = -swing;
      e.legL.knee.rotation.x = Math.max(0, -swing) * 0.9 + 0.06;
      e.legR.knee.rotation.x = Math.max(0, swing) * 0.9 + 0.06;
      e.torso.position.y = 1.02 + (moving ? Math.abs(Math.sin(e.walk)) * 0.035 : Math.sin(time * 1.8 + e.phase) * 0.012);
      e.torso.rotation.z = moving ? Math.sin(e.walk) * 0.025 : 0;
      e.torso.rotation.x = (moving ? 0.05 : 0.01) + e.flinch * 0.16;
      e.head.rotation.y = Math.sin(time * 0.7 + e.phase) * 0.08;

      // hit flash
      if (e.hitFlash > 0) {
        e.hitFlash -= dt;
        const f = Math.max(0, e.hitFlash / 0.09);
        e.flashMats.forEach((m, i) => { m.emissive.setRGB(0.5 * f, 0.05 * f, 0.02 * f); });
      } else {
        e.flashMats.forEach((m, i) => m.emissive.copy(e.baseEmissive[i]));
      }
      e.flinch *= Math.pow(0.001, dt);

      // muzzle flash
      if (e.flash.visible) {
        e.spawnFlash -= dt;
        if (e.spawnFlash <= 0) e.flash.visible = false;
      }

      // shooting
      if (player.alive) {
        e.fireTimer -= dt;
        if (e.burst > 0) {
          e.burstTimer -= dt;
          if (e.burstTimer <= 0) {
            if (e.hasLOS) shoot(e, player);
            e.burst--;
            e.burstTimer = 0.14;
          }
        } else if (e.fireTimer <= 0 && e.hasLOS && dist < 45) {
          e.burst = 2 + (Math.random() * 3 | 0) + (e.wpn > 2 ? 1 : 0);
          e.burstTimer = 0;
          e.fireTimer = rand(1.15, 2.1) / (1 + (e.wpn - 1) * 0.12);
        }
      }
    }
  }

  function activeCount() { return enemies.filter(e => e.alive).length; }
  function reset() {
    for (const e of enemies) {
      scene.remove(e.root);
      e.root.traverse(o => { if (o.isMesh) { o.geometry.dispose(); } });
    }
    enemies.length = 0;
  }

  return { spawn, update, damage, enemies, activeCount, reset };
}
