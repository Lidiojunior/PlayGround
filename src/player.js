import * as THREE from 'three';
import { moveCircle } from './physics.js';

const V = (x, y, z) => new THREE.Vector3(x, y, z);
const clamp = THREE.MathUtils.clamp;

export function createPlayer(opts) {
  const { camera, world, effects, audio, weapon, hud, quality } = opts;
  const raycaster = new THREE.Raycaster();
  const tmpDir = new THREE.Vector3();
  const tmpRight = new THREE.Vector3();
  const tmpUp = new THREE.Vector3(0, 1, 0);
  const muzzle = new THREE.Vector3();
  const right = new THREE.Vector3();
  const eye = new THREE.Vector3();
  const low = quality.low === true;

  const P = {
    position: V(0, 0, 18),
    velocity: new THREE.Vector3(),
    yaw: 0, pitch: -0.02,
    health: 100, maxHealth: 100, alive: true,
    mag: 30, magSize: 30, reserve: 120, maxReserve: 180,
    reloading: false, reloadTimer: 0, reloadDuration: 2.35,
    fireCooldown: 0, spread: 0,
    recoilPitch: 0, recoilYaw: 0, shake: 0, damageShake: 0,
    bobT: 0, bobAmount: 0, walkDist: 0, footStepAcc: 0,
    grounded: true, jumpVel: 0, wasGrounded: true,
    speed: 0, moving: false, sprinting: false, ads: false,
    input: { x: 0, y: 0 }, fire: false, sprintKey: false, adsKey: false,
    lookDelta: { x: 0, y: 0 },
    lastDamage: -99, regenDelay: 6.5,
    score: 0, kills: 0, headshots: 0, shots: 0, hits: 0,
    enemySystem: null, paused: false,
    eyeHeight: 1.68, radius: 0.34,
    deaths: 0, time: 0,
  };

  camera.rotation.order = 'YXZ';
  camera.fov = 72; camera.updateProjectionMatrix();

  function setInput(x, y) { P.input.x = clamp(x, -1, 1); P.input.y = clamp(y, -1, 1); }
  function look(dx, dy) {
    const sens = (P.ads ? 0.00075 : 0.00155) * 1.0;
    P.lookDelta.x += dx * sens;
    P.lookDelta.y += dy * sens;
    P.yaw -= dx * sens;
    P.pitch -= dy * sens;
    P.pitch = clamp(P.pitch, -1.35, 1.32);
  }
  function setFire(v) { P.fire = !!v; }
  function setADS(v) { P.adsKey = !!v; }
  function setSprint(v) { P.sprintKey = !!v; }
  function jump() {
    if (P.alive && P.grounded && !P.paused) {
      P.jumpVel = 5.1; P.grounded = false; P.shake = Math.max(P.shake, 0.0015);
    }
  }

  function requestLock(canvas) {
    if (P.alive && !P.paused && canvas?.requestPointerLock) {
      try { canvas.requestPointerLock(); } catch {}
    }
  }

  function startReload() {
    if (!P.alive || P.reloading || P.mag >= P.magSize || P.reserve <= 0) return;
    P.reloading = true; P.reloadTimer = P.reloadDuration;
    P.reloadAudio = 0; audio.reloadStart();
  }

  function finishReload() {
    const need = P.magSize - P.mag;
    const take = Math.min(need, P.reserve);
    P.mag += take; P.reserve -= take;
    P.reloading = false; P.reloadTimer = 0;
    hud.setAmmo(P.mag, P.reserve);
    hud.hideReload();
    audio.reloadEnd();
  }

  function beginShot() {
    P.shots++;
    P.mag--;
    P.fireCooldown = 0.092;
    P.spread = Math.min(0.055, P.spread + 0.0085);
    weapon.addRecoil(1 + Math.random() * 0.25);
    weapon.flash();
    audio.gunshot();
    hud.setAmmo(P.mag, P.reserve);
    P.recoilPitch += 0.0125 + Math.random() * 0.005;
    P.recoilYaw += (Math.random() - 0.5) * 0.009;
    P.shake = Math.max(P.shake, 0.0022);
    P.lookDelta.x += (Math.random() - 0.5) * 2;
    P.lookDelta.y += 3;

    weapon.muzzleWorld(muzzle);
    weapon.ejectWorld(eye);
    camera.getWorldDirection(tmpDir);
    tmpRight.crossVectors(tmpDir, tmpUp).normalize();
    effects.casing(eye, tmpRight, tmpUp);
    if (Math.random() < 0.35) effects.smoke(muzzle.clone().addScaledVector(tmpDir, 0.1), 0.12, 0xcfc2a9, 0.5, 0.12, 0.25);

    const aiming = P.ads;
    const moveSpread = (P.moving ? (P.sprinting ? 0.035 : 0.016) : 0.004) * (aiming ? 0.25 : 1);
    const jumpSpread = P.grounded ? 0 : 0.035;
    const total = (aiming ? 0.0015 : 0.008) + moveSpread + jumpSpread + P.spread * (aiming ? 0.35 : 1);
    const a = Math.random() * Math.PI * 2;
    const r = Math.sqrt(Math.random()) * total;
    tmpDir.addScaledVector(tmpRight, Math.cos(a) * r);
    tmpDir.addScaledVector(tmpUp, Math.sin(a) * r);
    tmpDir.normalize();

    const origin = camera.getWorldPosition(eye).clone();
    raycaster.set(origin, tmpDir);
    raycaster.far = 160;
    const targets = [];
    if (P.enemySystem) {
      for (const e of P.enemySystem.enemies) {
        if (!e.alive) continue;
        for (const m of e.hitMeshes) targets.push(m);
      }
    }
    const hits = raycaster.intersectObjects(targets.concat(world.raycastTargets), false);
    let endpoint = origin.clone().addScaledVector(tmpDir, 90);
    if (hits.length) {
      const h = hits[0];
      endpoint = h.point.clone();
      const enemy = h.object.userData.enemy;
      if (enemy && enemy.alive) {
        P.hits++;
        const part = h.object.userData.part;
        const dmg = part === 'head' ? 130 : part === 'body' ? 36 : 23;
        const n = h.face ? h.face.normal.clone().transformDirection(h.object.matrixWorld) : tmpDir.clone().negate();
        const res = P.enemySystem.damage(enemy, dmg, part, h.point, n, P);
        effects.fleshHit(h.point, n);
        audio.hit(part === 'head');
        hud.hitmarker(part === 'head');
        if (res.killed) {
          P.kills++;
          if (res.headshot) P.headshots++;
          const gain = res.headshot ? 150 : 100;
          P.score += gain;
          hud.setScore(P.score, P.kills, P.headshots);
          hud.killfeed(res.headshot);
          audio.kill();
        }
      } else {
        const n = h.face ? h.face.normal.clone().transformDirection(h.object.matrixWorld) : tmpDir.clone().negate();
        const metal = (h.object.material?.metalness || 0) > 0.5;
        effects.impact(h.point, n, metal ? 'metal' : 'concrete');
      }
    }
    effects.tracer(muzzle, endpoint, 0xffdca0, 0.055);
  }

  function takeDamage(amount, fromPos) {
    if (!P.alive || P.paused) return;
    P.health -= amount;
    P.lastDamage = P.time;
    P.damageShake = Math.min(0.08, P.damageShake + amount * 0.0025);
    P.shake = Math.max(P.shake, 0.012);
    audio.hurt();
    hud.setHealth(Math.max(0, P.health));
    if (fromPos) hud.damage(fromPos, P);
    if (P.health <= 0) {
      P.health = 0; P.alive = false;
      const stats = { kills: P.kills, headshots: P.headshots, score: P.score, shots: P.shots, hits: P.hits };
      hud.setHealth(0);
      if (opts.onDeath) opts.onDeath(stats);
      audio.hurt();
    }
  }

  function update(dt, t) {
    P.time = t;
    if (P.paused) return;
    const alive = P.alive;

    if (alive) {
      const sprintInput = P.sprintKey || (Math.hypot(P.input.x, P.input.y) > 0.92 && !P.adsKey);
      P.sprinting = sprintInput && P.input.y > 0.25 && P.grounded && !P.adsKey;
      P.ads = P.adsKey && P.grounded && !P.sprinting;

      const targetSpeed = P.ads ? 2.55 : P.sprinting ? 7.0 : 4.35;
      const fwd = V(-Math.sin(P.yaw), 0, -Math.cos(P.yaw));
      const rt = V(Math.cos(P.yaw), 0, -Math.sin(P.yaw));
      const wish = V(
        fwd.x * P.input.y + rt.x * P.input.x,
        0,
        fwd.z * P.input.y + rt.z * P.input.x
      );
      const wl = wish.length();
      if (wl > 1) wish.multiplyScalar(1 / wl);
      const targetVel = wish.multiplyScalar(targetSpeed);
      const accel = P.grounded ? 13 : 3.2;
      P.velocity.x += (targetVel.x - P.velocity.x) * Math.min(1, accel * dt);
      P.velocity.z += (targetVel.z - P.velocity.z) * Math.min(1, accel * dt);
      P.speed = Math.hypot(P.velocity.x, P.velocity.z);
      P.moving = P.speed > 0.35;

      if (P.grounded) moveCircle(P.position, P.velocity.x * dt, P.velocity.z * dt, P.radius, world.colliders, world.bounds);

      if (!P.grounded) {
        P.jumpVel -= 16.5 * dt;
        P.position.y += P.jumpVel * dt;
        if (P.position.y <= 0) {
          P.position.y = 0; P.grounded = true;
          if (!P.wasGrounded) { P.shake = Math.max(P.shake, 0.006); P.damageShake = Math.max(P.damageShake, 0.01); audio.footstep(true); }
          P.jumpVel = 0;
        }
      }
      P.wasGrounded = P.grounded;

      // footsteps
      if (P.grounded && P.moving) {
        P.footStepAcc += P.speed * dt;
        const stride = P.sprinting ? 2.15 : 1.75;
        if (P.footStepAcc > stride) {
          P.footStepAcc = 0;
          audio.footstep(P.sprinting);
          P.shake = Math.max(P.shake, 0.0012);
        }
      }

      // firing / reloading
      P.fireCooldown -= dt;
      if (P.reloading) {
        P.reloadTimer -= dt;
        const prog = 1 - P.reloadTimer / P.reloadDuration;
        hud.setReload(prog);
        if (prog > 0.45 && P.reloadAudio < 1) { audio.reloadIn(); P.reloadAudio = 1; }
        if (prog > 0.85 && P.reloadAudio < 2) { audio.bolt(); P.reloadAudio = 2; }
        if (P.reloadTimer <= 0) finishReload();
      }
      if (!P.reloading && P.fire && P.fireCooldown <= 0) {
        if (P.mag > 0) beginShot();
        else {
          audio.dryFire();
          P.fireCooldown = 0.3;
          if (P.reserve > 0) startReload();
        }
      }
      if (P.mag === 0 && !P.reloading && P.reserve > 0 && !P.fire) startReload();

      // regen
      if (P.health < P.maxHealth && t - P.lastDamage > P.regenDelay) {
        P.health = Math.min(P.maxHealth, P.health + 8.5 * dt);
        hud.setHealth(P.health);
      }
    } else {
      P.moving = false; P.sprinting = false; P.ads = false;
      P.velocity.multiplyScalar(Math.pow(0.01, dt));
    }

    // recoil recovery
    P.recoilPitch *= Math.pow(0.002, dt);
    P.recoilYaw *= Math.pow(0.0015, dt);
    P.shake *= Math.pow(0.012, dt);
    P.damageShake *= Math.pow(0.008, dt);
    P.spread *= Math.pow(0.002, dt);

    // camera bob
    const bobTarget = P.moving && P.grounded ? (P.sprinting ? 1.15 : 0.7) * (1 - (P.ads ? 0.75 : 0)) : 0;
    P.bobAmount += (bobTarget - P.bobAmount) * Math.min(1, dt * 8);
    P.bobT += dt * (P.sprinting ? 11.5 : 8.2);
    const bobY = Math.sin(P.bobT * 2) * 0.012 * P.bobAmount;
    const bobX = Math.cos(P.bobT) * 0.018 * P.bobAmount;
    const strafeLean = P.input.x * 0.008;
    const shakeX = (Math.random() - 0.5) * P.shake + (Math.random() - 0.5) * P.damageShake;
    const shakeY = (Math.random() - 0.5) * P.shake + (Math.random() - 0.5) * P.damageShake;

    camera.position.set(P.position.x + bobX * 0.35 + shakeX * 0.5, P.position.y + P.eyeHeight + bobY + shakeY, P.position.z);
    camera.rotation.set(
      P.pitch + P.recoilPitch + (Math.random() - 0.5) * P.shake * 0.25,
      P.yaw + P.recoilYaw + (Math.random() - 0.5) * P.shake * 0.25,
      strafeLean + (Math.random() - 0.5) * P.shake * 0.15 - P.damageShake * 0.4
    );

    // apply damage roll / death tilt
    if (!P.alive) {
      camera.rotation.z += 0.35;
      camera.position.y = P.position.y + P.eyeHeight * 0.6;
    }

    // fov
    const targetFov = P.ads ? 46 : (P.sprinting ? 76 : 72);
    camera.fov += (targetFov - camera.fov) * Math.min(1, dt * 10);
    camera.updateProjectionMatrix();

    // weapon animation
    weapon.update(dt, {
      ads: P.ads,
      sprint: P.sprinting,
      move: P.bobAmount,
      time: t,
      lookX: P.lookDelta.x,
      lookY: P.lookDelta.y,
      reload: P.reloading ? clamp(1 - P.reloadTimer / P.reloadDuration, 0.01, 0.99) : 0,
    });
    P.lookDelta.x *= Math.pow(0.001, dt);
    P.lookDelta.y *= Math.pow(0.001, dt);

    // HUD crosshair
    const spreadPx = 10 + (P.spread * 900) + (P.moving ? 16 : 0) + (P.grounded ? 0 : 22) + (P.sprinting ? 18 : 0);
    hud.setCrosshair(P.ads, spreadPx, P.alive);
  }

  function reset() {
    P.position.set(0, 0, 18); P.velocity.set(0, 0, 0);
    P.yaw = 0; P.pitch = -0.02; P.health = P.maxHealth; P.alive = true;
    P.mag = 30; P.reserve = 120; P.reloading = false; P.reloadTimer = 0;
    P.fireCooldown = 0; P.spread = 0; P.recoilPitch = 0; P.recoilYaw = 0;
    P.shake = 0; P.damageShake = 0; P.bobAmount = 0; P.bobT = 0;
    P.grounded = true; P.jumpVel = 0; P.lastDamage = -99;
    P.score = 0; P.kills = 0; P.headshots = 0; P.shots = 0; P.hits = 0;
    P.input.x = P.input.y = 0; P.fire = false; P.adsKey = false; P.sprintKey = false;
    hud.setHealth(P.maxHealth); hud.setAmmo(P.mag, P.reserve); hud.setScore(0, 0, 0);
    hud.hideReload(); hud.setCrosshair(false, 12, true);
    camera.fov = 72; camera.updateProjectionMatrix();
  }

  // input wiring
  function bindDesktop(canvas) {
    window.addEventListener('keydown', ev => {
      if (ev.repeat) return;
      if (ev.code === 'KeyW') P.input.y = 1;
      if (ev.code === 'KeyS') P.input.y = -1;
      if (ev.code === 'KeyA') P.input.x = -1;
      if (ev.code === 'KeyD') P.input.x = 1;
      if (ev.code === 'ShiftLeft' || ev.code === 'ShiftRight') P.sprintKey = true;
      if (ev.code === 'KeyR') startReload();
      if (ev.code === 'Space') { ev.preventDefault(); jump(); }
    });
    window.addEventListener('keyup', ev => {
      if (ev.code === 'KeyW' && P.input.y > 0) P.input.y = 0;
      if (ev.code === 'KeyS' && P.input.y < 0) P.input.y = 0;
      if (ev.code === 'KeyA' && P.input.x < 0) P.input.x = 0;
      if (ev.code === 'KeyD' && P.input.x > 0) P.input.x = 0;
      if (ev.code === 'ShiftLeft' || ev.code === 'ShiftRight') P.sprintKey = false;
    });
    document.addEventListener('mousemove', ev => {
      if (document.pointerLockElement === canvas) look(ev.movementX, ev.movementY);
    });
    document.addEventListener('mousedown', ev => {
      if (document.pointerLockElement !== canvas) return;
      if (ev.button === 0) setFire(true);
      if (ev.button === 2) setADS(true);
    });
    document.addEventListener('mouseup', ev => {
      if (ev.button === 0) setFire(false);
      if (ev.button === 2) setADS(false);
    });
    document.addEventListener('contextmenu', ev => ev.preventDefault());
    window.addEventListener('wheel', ev => {}, { passive: true });
  }

  return {
    state: P, camera, position: P.position, setInput, look, setFire, setADS, setSprint,
    jump, startReload, requestLock, update, takeDamage, reset, bindDesktop, lookDelta: P.lookDelta,
  };
}
