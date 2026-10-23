import * as THREE from 'three'
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js'

const UP = new THREE.Vector3(0, 1, 0)

function angleLerp(a, b, t) {
  let d = ((b - a + Math.PI) % (Math.PI * 2)) - Math.PI
  if (d < -Math.PI) d += Math.PI * 2
  return a + d * t
}

function makeLimb(start, end, radius, mat, parent) {
  const dir = new THREE.Vector3().subVectors(end, start)
  const len = dir.length()
  const mesh = new THREE.Mesh(new THREE.CapsuleGeometry(radius, Math.max(0.02, len - radius * 2), 4, 8), mat)
  mesh.position.copy(start).addScaledVector(dir, 0.5)
  mesh.quaternion.setFromUnitVectors(UP, dir.clone().normalize())
  parent.add(mesh)
  return mesh
}

class Soldier {
  constructor(scene, textures, isMobile) {
    this.scene = scene
    this.T = textures
    this.isMobile = isMobile
    this.root = new THREE.Group()
    this.root.visible = false
    scene.add(this.root)
    this.hitMeshes = []
    this.state = 'idle'
    this.health = 100
    this.alive = false
    this.headshot = false

    const p = new THREE.MeshStandardMaterial({ color: 0x847a5b, roughness: 0.94, metalness: 0.02 })
    const ps = new THREE.MeshStandardMaterial({ color: 0x615c46, roughness: 0.95, metalness: 0.02 })
    const vest = new THREE.MeshStandardMaterial({ color: 0x2f3028, roughness: 0.86, metalness: 0.05 })
    const vest2 = new THREE.MeshStandardMaterial({ color: 0x2c2e26, roughness: 0.9, metalness: 0.04 })
    const tan = new THREE.MeshStandardMaterial({ color: 0x9c8863, roughness: 0.9, metalness: 0.03 })
    const skin = new THREE.MeshStandardMaterial({ color: 0x5b4132, roughness: 0.72, metalness: 0 })
    const glove = new THREE.MeshStandardMaterial({ color: 0x1d1e1a, roughness: 0.94 })
    const boot = new THREE.MeshStandardMaterial({ color: 0x1a1815, roughness: 0.82, metalness: 0.08 })
    const metal = new THREE.MeshStandardMaterial({ color: 0x282b28, roughness: 0.5, metalness: 0.75 })
    const lens = new THREE.MeshStandardMaterial({ color: 0x2a0402, emissive: 0xd42a12, emissiveIntensity: 3.0, roughness: 0.2, metalness: 0.4 })
    const radio = new THREE.MeshStandardMaterial({ color: 0x151713, roughness: 0.7, metalness: 0.2 })
    this.materials = [p, ps, vest, vest2, tan, skin, glove, boot, metal, lens, radio]
    this.lensMat = lens

    const add = (geo, mat, x, y, z, rx = 0, ry = 0, rz = 0, parent = this.root) => {
      const m = new THREE.Mesh(geo, mat)
      m.position.set(x, y, z)
      m.rotation.set(rx, ry, rz)
      m.castShadow = true
      m.receiveShadow = true
      parent.add(m)
      return m
    }
    const reg = (mesh, mult, part) => {
      mesh.userData.enemy = this
      mesh.userData.mult = mult
      mesh.userData.part = part
      this.hitMeshes.push(mesh)
      return mesh
    }

    // legs
    this.legs = []
    for (const side of [-1, 1]) {
      const hip = new THREE.Group()
      hip.position.set(side * 0.115, 0.95, 0)
      this.root.add(hip)
      const upper = add(new THREE.CapsuleGeometry(0.085, 0.30, 4, 8), ps, 0, -0.18, 0, 0, 0, 0, hip)
      reg(upper, 0.7, 'leg')
      add(new THREE.BoxGeometry(0.13, 0.1, 0.14), vest, 0, -0.36, -0.02, 0, 0, 0, hip)
      const knee = new THREE.Group()
      knee.position.set(0, -0.4, 0)
      hip.add(knee)
      const pad = add(new RoundedBoxGeometry(0.11, 0.12, 0.09, 2, 0.03), vest2, 0, 0.02, -0.06, 0, 0, 0, knee)
      reg(pad, 0.55, 'leg')
      const lower = add(new THREE.CapsuleGeometry(0.072, 0.30, 4, 8), ps, 0, -0.17, 0, 0, 0, 0, knee)
      reg(lower, 0.7, 'leg')
      const bootMesh = add(new RoundedBoxGeometry(0.13, 0.11, 0.26, 2, 0.03), boot, 0, -0.37, -0.05, 0, 0, 0, knee)
      reg(bootMesh, 0.6, 'leg')
      // straps
      add(new THREE.BoxGeometry(0.1, 0.02, 0.02), tan, 0, -0.33, 0.07, 0, 0, 0, knee)
      this.legs.push({ hip, knee, phase: side > 0 ? 0 : Math.PI })
    }

    // hips / belt
    add(new RoundedBoxGeometry(0.30, 0.18, 0.21, 2, 0.03), ps, 0, 1.02, 0)
    add(new THREE.BoxGeometry(0.32, 0.055, 0.23), vest, 0, 1.08, 0)
    for (let i = -1; i <= 1; i++) {
      add(new RoundedBoxGeometry(0.075, 0.10, 0.055, 2, 0.012), vest2, i * 0.085, 1.0, -0.13)
    }
    add(new RoundedBoxGeometry(0.13, 0.11, 0.06, 2, 0.015), vest, -0.16, 1.0, 0.02)

    // torso
    this.torso = new THREE.Group()
    this.torso.position.set(0, 1.12, 0)
    this.root.add(this.torso)
    const chest = add(new RoundedBoxGeometry(0.36, 0.42, 0.23, 3, 0.05), vest, 0, 0.2, 0, 0, 0, 0, this.torso)
    reg(chest, 1, 'body')
    add(new RoundedBoxGeometry(0.3, 0.26, 0.20, 2, 0.04), p, 0, 0.39, 0.01, 0, 0, 0, this.torso)
    // shoulder pads
    for (const side of [-1, 1]) {
      const pad = add(new RoundedBoxGeometry(0.14, 0.12, 0.2, 2, 0.035), vest2, side * 0.225, 0.38, 0, 0, 0, side * 0.18, this.torso)
      reg(pad, 0.8, 'body')
    }
    // chest pouches
    for (let i = 0; i < 3; i++) {
      add(new RoundedBoxGeometry(0.085, 0.1, 0.06, 2, 0.012), vest2, -0.1 + i * 0.1, 0.17, -0.145, 0, 0, 0, this.torso)
    }
    add(new RoundedBoxGeometry(0.1, 0.1, 0.045, 2, 0.01), tan, -0.115, 0.31, -0.145, 0, 0, 0, this.torso)
    add(new THREE.BoxGeometry(0.07, 0.09, 0.05), radio, 0.12, 0.3, -0.14, 0, 0, 0, this.torso)
    add(new THREE.CylinderGeometry(0.005, 0.005, 0.16, 5), metal, 0.145, 0.41, -0.14, 0, 0, 0.1, this.torso)
    // shoulder straps
    for (const side of [-1, 1]) {
      add(new THREE.BoxGeometry(0.045, 0.26, 0.02), tan, side * 0.11, 0.34, -0.135, 0, 0, side * 0.12, this.torso)
    }
    // backpack
    const pack = add(new RoundedBoxGeometry(0.3, 0.34, 0.16, 2, 0.04), ps, 0, 0.23, 0.17, 0, 0, 0, this.torso)
    reg(pack, 1, 'body')
    add(new THREE.BoxGeometry(0.24, 0.02, 0.02), tan, 0, 0.1, 0.255, 0, 0, 0, this.torso)
    add(new THREE.BoxGeometry(0.24, 0.02, 0.02), tan, 0, 0.34, 0.255, 0, 0, 0, this.torso)

    // head
    this.headGroup = new THREE.Group()
    this.headGroup.position.set(0, 0.55, 0)
    this.torso.add(this.headGroup)
    add(new THREE.CylinderGeometry(0.055, 0.06, 0.08, 8), skin, 0, 0.015, 0, 0, 0, 0, this.headGroup)
    const head = add(new THREE.SphereGeometry(0.105, 14, 12), skin, 0, 0.11, 0, 0, 0, 0, this.headGroup)
    reg(head, 3.6, 'head')
    // balaclava
    add(new THREE.SphereGeometry(0.108, 14, 10, 0, Math.PI * 2, 0, Math.PI * 0.68), vest, 0, 0.105, 0, 0, 0, 0, this.headGroup)
    // helmet
    const helmet = add(new THREE.SphereGeometry(0.135, 16, 10, 0, Math.PI * 2, 0, Math.PI * 0.56), tan, 0, 0.145, -0.005, 0, 0, 0, this.headGroup)
    helmet.scale.set(1, 0.86, 1.06)
    add(new THREE.TorusGeometry(0.132, 0.014, 6, 18), tan, 0, 0.115, 0, Math.PI / 2, 0, 0, this.headGroup)
    add(new THREE.BoxGeometry(0.06, 0.035, 0.05), metal, 0, 0.205, -0.08, 0.2, 0, 0, this.headGroup)
    const goggles = add(new RoundedBoxGeometry(0.155, 0.045, 0.05, 2, 0.012), metal, 0, 0.125, -0.1, 0, 0, 0, this.headGroup)
    goggles.scale.z = 1
    const lensMesh = add(new THREE.BoxGeometry(0.13, 0.028, 0.008), lens, 0, 0.125, -0.128, 0, 0, 0, this.headGroup)
    reg(lensMesh, 3.6, 'head')
    add(new THREE.BoxGeometry(0.02, 0.03, 0.03), metal, 0.083, 0.13, -0.085, 0, 0, 0, this.headGroup)
    add(new THREE.BoxGeometry(0.02, 0.03, 0.03), metal, -0.083, 0.13, -0.085, 0, 0, 0, this.headGroup)

    // rifle
    this.weapon = new THREE.Group()
    this.weapon.position.set(0.055, 0.2, -0.22)
    this.weapon.rotation.set(0.03, -0.03, 0)
    this.torso.add(this.weapon)
    add(new THREE.BoxGeometry(0.06, 0.075, 0.34), metal, 0, 0, -0.06, 0, 0, 0, this.weapon)
    add(new THREE.BoxGeometry(0.045, 0.05, 0.2), tan, 0, -0.015, -0.27, 0, 0, 0, this.weapon)
    add(new THREE.CylinderGeometry(0.012, 0.012, 0.26, 8), metal, 0, 0.012, -0.4, Math.PI / 2, 0, 0, this.weapon)
    add(new THREE.CylinderGeometry(0.018, 0.018, 0.05, 8), metal, 0, 0.012, -0.53, Math.PI / 2, 0, 0, this.weapon)
    add(new THREE.BoxGeometry(0.045, 0.13, 0.07), metal, 0, -0.11, -0.08, 0.16, 0, 0, this.weapon)
    add(new THREE.BoxGeometry(0.05, 0.08, 0.15), tan, 0, -0.005, 0.19, 0, 0, 0, this.weapon)
    add(new THREE.BoxGeometry(0.055, 0.045, 0.12), metal, 0, 0.062, -0.05, 0, 0, 0, this.weapon)
    add(new THREE.CylinderGeometry(0.023, 0.023, 0.06, 10), metal, 0, 0.083, -0.05, Math.PI / 2, 0, 0, this.weapon)
    // muzzle reference
    this.muzzle = new THREE.Object3D()
    this.muzzle.position.set(0, 0.012, -0.58)
    this.weapon.add(this.muzzle)
    // flash sprite
    this.flash = new THREE.Sprite(new THREE.SpriteMaterial({
      map: textures.flash, color: 0xffcf8a, transparent: true, opacity: 0,
      blending: THREE.AdditiveBlending, depthWrite: false
    }))
    this.flash.scale.setScalar(0.4)
    this.flash.position.set(0, 0.012, -0.62)
    this.weapon.add(this.flash)

    // arms
    this.arms = new THREE.Group()
    this.torso.add(this.arms)
    const rShoulder = new THREE.Vector3(0.215, 0.36, 0)
    const rElbow = new THREE.Vector3(0.15, 0.14, -0.16)
    const rHand = new THREE.Vector3(0.075, 0.055, -0.26)
    makeLimb(rShoulder, rElbow, 0.062, p, this.arms)
    makeLimb(rElbow, rHand, 0.052, p, this.arms)
    add(new THREE.SphereGeometry(0.068, 8, 6), p, rElbow.x, rElbow.y, rElbow.z, 0, 0, 0, this.arms)
    const rHandMesh = add(new RoundedBoxGeometry(0.07, 0.075, 0.08, 2, 0.02), glove, 0.075, 0.04, -0.255, 0, 0, 0, this.arms)
    reg(rHandMesh, 0.6, 'arm')
    const lShoulder = new THREE.Vector3(-0.215, 0.36, 0)
    const lElbow = new THREE.Vector3(-0.14, 0.12, -0.2)
    const lHand = new THREE.Vector3(-0.01, 0.09, -0.34)
    makeLimb(lShoulder, lElbow, 0.06, p, this.arms)
    makeLimb(lElbow, lHand, 0.05, p, this.arms)
    add(new THREE.SphereGeometry(0.066, 8, 6), p, lElbow.x, lElbow.y, lElbow.z, 0, 0, 0, this.arms)
    const lHandMesh = add(new RoundedBoxGeometry(0.065, 0.07, 0.09, 2, 0.02), glove, -0.005, 0.075, -0.34, 0, 0, 0, this.arms)
    reg(lHandMesh, 0.6, 'arm')

    this.root.traverse((o) => {
      if (o.isMesh) {
        o.castShadow = true
        o.receiveShadow = true
      }
    })

    this.flashTimer = 0
    this.hitFlash = 0
    this.deathTimer = 0
    this.deathRotation = 0
    this.removeTimer = 0
    this.walkPhase = Math.random() * 10
    this.shootCooldown = 1 + Math.random()
    this.burst = 0
    this.burstTimer = 0
    this.strafeDir = Math.random() > 0.5 ? 1 : -1
    this.strafeTimer = 0
    this.losTimer = 0
    this.hasLOS = false
    this.path = []
    this.pathIndex = 0
    this.pathTimer = 0
    this.baseMatEmissive = this.materials.map((m) => m.emissive.clone())
  }

  spawn(pos, tier = 1) {
    this.root.visible = true
    this.root.position.copy(pos)
    this.root.rotation.set(0, Math.random() * Math.PI * 2, 0)
    this.root.scale.setScalar(1)
    this.state = 'advance'
    this.alive = true
    this.health = 100 * (tier > 2 ? 1.25 : 1)
    this.headshot = false
    this.deathTimer = 0
    this.removeTimer = 0
    this.shootCooldown = 0.8 + Math.random() * 1.4
    this.burst = 0
    this.burstTimer = 0
    this.flashTimer = 0
    this.hitFlash = 0
    this.deathRotation = 0
    this.torso.rotation.set(0, 0, 0)
    this.torso.position.y = 1.12
    for (const m of this.materials) {
      m.emissive.setHex(0x000000)
      m.emissiveIntensity = 1
    }
    this.lensMat.emissive.setHex(0xb01a08)
    this.lensMat.emissiveIntensity = 2.2
    this.hitMeshes.forEach((m) => { m.visible = true; m.userData.enemy = this })
    this.flash.material.opacity = 0
    this.speed = 2.35 + Math.random() * 0.45 + tier * 0.09
    this.path.length = 0
    this.pathIndex = 0
    this.pathTimer = 0
  }

  muzzleWorld(target) {
    this.muzzle.updateWorldMatrix(true, false)
    return target.setFromMatrixPosition(this.muzzle.matrixWorld)
  }

  takeDamage(amount, hitPoint, direction, headshot = false) {
    if (!this.alive) return false
    this.health -= amount
    this.hitFlash = 0.09
    for (const m of this.materials) {
      if (m === this.lensMat) continue
      m.emissive.setHex(0x8a1f0c)
      m.emissiveIntensity = 0.5
    }
    if (this.health <= 0) {
      this.die(headshot)
      return true
    }
    // flinch
    this.torso.rotation.z = (Math.random() - 0.5) * 0.12
    this.hitReaction = { point: hitPoint.clone(), dir: direction.clone(), headshot }
    return false
  }

  die(headshot = false) {
    this.alive = false
    this.state = 'dead'
    this.headshot = headshot
    this.health = 0
    this.deathTimer = 0
    this.removeTimer = 5.5
    this.burst = 0
    this.flash.material.opacity = 0
    // face down fall direction random
    this.fallSign = Math.random() > 0.5 ? 1 : -1
    this.hitMeshes.forEach((m) => { m.userData.enemy = null })
  }

  update(dt, ctx) {
    if (this.state === 'idle') return
    if (!this.alive) {
      this.updateDeath(dt)
      return
    }
    const player = ctx.playerPos
    const dx = player.x - this.root.position.x
    const dz = player.z - this.root.position.z
    const dist = Math.hypot(dx, dz)
    const targetAngle = Math.atan2(-dx, -dz)

    // LOS check every .25s
    this.losTimer -= dt
    if (this.losTimer <= 0) {
      this.losTimer = 0.22 + Math.random() * 0.1
      this.hasLOS = ctx.checkLOS(this.root.position, player)
    }
    const engaged = this.hasLOS && dist < 19

    // path planning while advancing
    if (!engaged) {
      this.pathTimer -= dt
      if (this.pathTimer <= 0 || this.path.length === 0) {
        this.path = ctx.world.findPath(this.root.position, player) || []
        this.pathIndex = 0
        this.pathTimer = 1.1 + Math.random() * 0.5
      }
    }

    // movement
    let moving = false
    const desired = engaged ? 0 : 1
    if (desired) {
      const speed = this.speed * (this.hasLOS ? 1.05 : 1.2) * (dist > 30 ? 1.35 : 1)
      let tx = dx
      let tz = dz
      if (this.path.length > 0) {
        while (this.pathIndex < this.path.length - 1) {
          const wp = this.path[this.pathIndex]
          if (Math.hypot(wp.x - this.root.position.x, wp.z - this.root.position.z) > 0.65) break
          this.pathIndex++
        }
        const wp = this.path[this.pathIndex]
        const wx = wp.x - this.root.position.x
        const wz = wp.z - this.root.position.z
        if (Math.hypot(wx, wz) > 0.01) { tx = wx; tz = wz }
      }
      const tl = Math.hypot(tx, tz) || 1
      let mx = tx / tl
      let mz = tz / tl
      // separation
      for (const other of ctx.enemies) {
        if (other === this || !other.alive) continue
        const ox = this.root.position.x - other.root.position.x
        const oz = this.root.position.z - other.root.position.z
        const od = Math.hypot(ox, oz)
        if (od < 1.3 && od > 0.001) {
          mx += (ox / od) * 0.8
          mz += (oz / od) * 0.8
        }
      }
      const ml = Math.hypot(mx, mz) || 1
      mx /= ml
      mz /= ml
      const step = speed * dt
      this.root.position.x += mx * step
      this.root.position.z += mz * step
      ctx.world.resolveCollisions(this.root.position, 0.38)
      moving = true
      this.root.rotation.y = angleLerp(this.root.rotation.y, Math.atan2(-mx, -mz), Math.min(1, dt * 5))
    } else {
      // strafe a little
      this.strafeTimer -= dt
      if (this.strafeTimer <= 0) {
        this.strafeTimer = 1.2 + Math.random() * 1.6
        this.strafeDir *= -1
      }
      if (dist < 20) {
        this.root.position.x += Math.cos(targetAngle) * this.strafeDir * dt * 0.85
        this.root.position.z += -Math.sin(targetAngle) * this.strafeDir * dt * 0.85
        ctx.world.resolveCollisions(this.root.position, 0.38)
        moving = true
      }
      this.root.rotation.y = angleLerp(this.root.rotation.y, targetAngle, Math.min(1, dt * 7))
    }

    // walk animation
    this.walkPhase += dt * (moving ? 7.5 : 2.2)
    const sw = moving ? 0.65 : 0.03
    this.legs[0].hip.rotation.x = Math.sin(this.walkPhase) * sw
    this.legs[1].hip.rotation.x = Math.sin(this.walkPhase + Math.PI) * sw
    this.legs[0].knee.rotation.x = Math.max(0, -Math.sin(this.walkPhase)) * (moving ? 0.9 : 0)
    this.legs[1].knee.rotation.x = Math.max(0, -Math.sin(this.walkPhase + Math.PI)) * (moving ? 0.9 : 0)
    this.root.position.y = Math.abs(Math.sin(this.walkPhase)) * (moving ? 0.035 : 0.008)
    this.torso.rotation.z *= Math.max(0, 1 - dt * 10)
    this.torso.position.y = 1.12 + Math.sin(this.walkPhase * 2) * (moving ? 0.012 : 0.004)

    // aim / firing
    this.shootCooldown -= dt
    if (engaged && this.shootCooldown <= 0 && this.burst <= 0) {
      this.burst = 1 + Math.floor(Math.random() * 3)
      this.burstTimer = 0.1
      this.shootCooldown = 2.4 + Math.random() * 2.0
    }
    if (this.burst > 0) {
      this.burstTimer -= dt
      if (this.burstTimer <= 0) {
        this.burst--
        this.burstTimer = 0.13 + Math.random() * 0.05
        this.fireAt(ctx, dist)
      }
    }

    // flash
    if (this.flashTimer > 0) {
      this.flashTimer -= dt
      this.flash.material.opacity = Math.max(0, this.flashTimer / 0.06)
      this.flash.scale.setScalar(0.35 + Math.random() * 0.2)
      if (this.flashTimer <= 0) this.flash.material.opacity = 0
    }
    if (this.hitFlash > 0) {
      this.hitFlash -= dt
      if (this.hitFlash <= 0) {
        for (const m of this.materials) {
          if (m === this.lensMat) continue
          m.emissive.setHex(0x000000)
          m.emissiveIntensity = 1
        }
      }
    }
  }

  fireAt(ctx, dist) {
    const muzzle = this.muzzleWorld(new THREE.Vector3())
    const player = ctx.playerPos
    const accuracy = THREE.MathUtils.clamp(0.42 - dist * 0.012, 0.07, 0.36) * (ctx.playerMoving ? 0.82 : 1) * (ctx.playerSprinting ? 0.72 : 1)
    const hit = Math.random() < accuracy
    const target = new THREE.Vector3(player.x, player.y - 0.15, player.z)
    if (!hit) {
      target.x += (Math.random() - 0.5) * 2.6
      target.y += (Math.random() - 0.3) * 1.4
      target.z += (Math.random() - 0.5) * 2.6
    }
    this.flashTimer = 0.06
    this.flash.material.opacity = 1
    this.flash.scale.setScalar(0.35 + Math.random() * 0.2)
    ctx.effects.tracer(muzzle, target)
    ctx.effects.sparks.spawn(muzzle.x, muzzle.y, muzzle.z, (Math.random() - 0.5) * 0.4, 0.2, (Math.random() - 0.5) * 0.4, {
      life: 0.12, size: 0.05, color: [1, 0.7, 0.35], gravity: 1, drag: 0.9
    })
    const pan = THREE.MathUtils.clamp((this.root.position.x - player.x) / 20, -1, 1)
    ctx.audio.enemyShot(dist, pan)
    if (hit) {
      const dmg = 3 + Math.random() * 3
      ctx.damagePlayer(dmg, this.root.position)
    } else {
      ctx.audio.suppression(pan)
    }
  }

  updateDeath(dt) {
    this.deathTimer += dt
    const k = Math.min(1, this.deathTimer / 0.75)
    const ease = 1 - Math.pow(1 - k, 3)
    this.root.rotation.z = this.fallSign * ease * Math.PI * 0.48
    this.root.rotation.x = -ease * 0.18
    this.root.position.y = ease * 0.06
    if (this.deathTimer > 1.2) {
      this.root.position.y -= dt * 0.04
    }
    this.removeTimer -= dt
    if (this.removeTimer <= 0) {
      this.state = 'idle'
      this.root.visible = false
    }
  }

  dispose() {
    this.scene.remove(this.root)
  }
}

export class EnemyManager {
  constructor(scene, world, effects, audio, textures, isMobile, callbacks) {
    this.scene = scene
    this.world = world
    this.effects = effects
    this.audio = audio
    this.isMobile = isMobile
    this.cb = callbacks
    this.maxEnemies = isMobile ? 8 : 10
    this.pool = []
    for (let i = 0; i < this.maxEnemies; i++) {
      this.pool.push(new Soldier(scene, textures, isMobile))
    }
    this.active = []
    this.raycaster = new THREE.Raycaster()
    this.tmpA = new THREE.Vector3()
    this.tmpB = new THREE.Vector3()
    this.tmpDir = new THREE.Vector3()
    this.spawnQueue = 0
    this.spawnTimer = 0
    this.playerPos = new THREE.Vector3()
    this.wave = 1
  }

  reset() {
    for (const e of this.active) {
      e.state = 'idle'
      e.alive = false
      e.root.visible = false
    }
    this.active = []
    this.spawnQueue = 0
    this.spawnTimer = 0
  }

  get aliveCount() {
    let n = 0
    for (const e of this.active) if (e.alive) n++
    return n
  }

  get pendingCount() {
    return this.spawnQueue
  }

  queueWave(count, tier) {
    this.spawnQueue = count
    this.spawnTimer = 0
    this.tier = tier
  }

  spawnOne(playerPos) {
    const candidate = this.pool.find((e) => e.state === 'idle')
    if (!candidate) return false
    let best = null
    let bestScore = -Infinity
    for (const p of this.world.spawnPoints) {
      const d = p.distanceTo(playerPos)
      if (d < 14) continue
      const frontBias = p.z < playerPos.z - 6 ? 7 : 0
      let score = -Math.abs(d - 26) + frontBias + Math.random() * 8
      for (const other of this.active) {
        if (!other.alive) continue
        const od = Math.hypot(other.root.position.x - p.x, other.root.position.z - p.z)
        if (od < 6) score -= (6 - od) * 2.5
      }
      if (score > bestScore) {
        bestScore = score
        best = p
      }
    }
    if (!best) best = this.world.spawnPoints[0]
    const spot = this.world.nearestWalkable(best.x, best.z)
    candidate.spawn(spot, this.tier || 1)
    this.active.push(candidate)
    for (let i = 0; i < 5; i++) {
      this.effects.dust.spawn(spot.x + (Math.random() - 0.5), 0.3 + Math.random() * 1.5, spot.z + (Math.random() - 0.5),
        (Math.random() - 0.5) * 0.8, 0.2, (Math.random() - 0.5) * 0.8,
        { life: 0.8, size: 0.25, color: [0.45, 0.4, 0.32], gravity: -0.2, drag: 0.94, grow: 2 })
    }
    return true
  }

  update(dt, playerPos, playerMoving, playerSprinting) {
    this.playerPos.copy(playerPos)
    if (this.spawnQueue > 0) {
      this.spawnTimer -= dt
      if (this.spawnTimer <= 0) {
        if (this.spawnOne(playerPos)) {
          this.spawnQueue--
          this.spawnTimer = 0.7 + Math.random() * 1.2
        } else {
          this.spawnTimer = 0.3
        }
      }
    }
    const ctx = {
      playerPos,
      playerMoving,
      playerSprinting,
      enemies: this.active,
      world: this.world,
      effects: this.effects,
      audio: this.audio,
      damagePlayer: (amount, source) => this.cb.onPlayerDamage(amount, source),
      checkLOS: (from, to) => this.checkLOS(from, to)
    }
    for (const e of this.active) {
      if (e.state !== 'idle') e.update(dt, ctx)
    }
    // clean idle dead after a while
    this.active = this.active.filter((e) => e.state !== 'idle')
  }

  checkLOS(from, to) {
    this.tmpA.set(from.x, 1.55, from.z)
    this.tmpB.copy(to)
    this.tmpDir.subVectors(this.tmpB, this.tmpA)
    const dist = this.tmpDir.length()
    if (dist < 0.5) return true
    this.tmpDir.normalize()
    this.raycaster.set(this.tmpA, this.tmpDir)
    this.raycaster.far = dist - 0.4
    const hits = this.raycaster.intersectObjects(this.world.blockers, false)
    return hits.length === 0
  }

  handleHit(mesh, damage, hitPoint, direction) {
    const enemy = mesh.userData.enemy
    if (!enemy || !enemy.alive) return null
    const mult = mesh.userData.mult || 1
    const headshot = mesh.userData.part === 'head'
    const killed = enemy.takeDamage(damage * mult, hitPoint, direction, headshot)
    return { enemy, headshot, killed, part: mesh.userData.part }
  }

  getHitMeshes() {
    const list = []
    for (const e of this.active) {
      if (!e.alive) continue
      for (const m of e.hitMeshes) {
        if (m.userData.enemy) list.push(m)
      }
    }
    return list
  }
}
