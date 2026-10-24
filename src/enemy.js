import * as THREE from 'three'

let ASSETS = null

function getAssets() {
  if (ASSETS) return ASSETS
  const geo = {
    hip: new THREE.BoxGeometry(0.34, 0.16, 0.22),
    abdomen: new THREE.BoxGeometry(0.35, 0.2, 0.21),
    chest: new THREE.BoxGeometry(0.42, 0.34, 0.24),
    vest: new THREE.BoxGeometry(0.455, 0.34, 0.29),
    pouch: new THREE.BoxGeometry(0.095, 0.115, 0.065),
    head: new THREE.BoxGeometry(0.19, 0.22, 0.2),
    helmet: new THREE.SphereGeometry(0.15, 12, 8),
    goggles: new THREE.BoxGeometry(0.175, 0.06, 0.05),
    backpack: new THREE.BoxGeometry(0.28, 0.32, 0.16),
    upperArm: new THREE.BoxGeometry(0.12, 0.34, 0.13),
    forearm: new THREE.BoxGeometry(0.1, 0.28, 0.11),
    hand: new THREE.BoxGeometry(0.078, 0.09, 0.09),
    upperLeg: new THREE.BoxGeometry(0.155, 0.42, 0.17),
    lowerLeg: new THREE.BoxGeometry(0.135, 0.4, 0.15),
    boot: new THREE.BoxGeometry(0.15, 0.1, 0.26),
    neck: new THREE.CylinderGeometry(0.055, 0.06, 0.08, 8),
    rifleBody: new THREE.BoxGeometry(0.055, 0.075, 0.32),
    rifleBarrel: new THREE.CylinderGeometry(0.014, 0.014, 0.32, 8),
    rifleMag: new THREE.BoxGeometry(0.04, 0.14, 0.07),
    rifleStock: new THREE.BoxGeometry(0.045, 0.06, 0.18),
    marker: new THREE.SphereGeometry(0.013, 6, 5),
    strobe: new THREE.SphereGeometry(0.022, 6, 5),
  }
  const mat = {
    uniform: new THREE.MeshStandardMaterial({ color: 0x5a604a, roughness: 0.94, metalness: 0.02 }),
    uniformDark: new THREE.MeshStandardMaterial({ color: 0x444a38, roughness: 0.95, metalness: 0.02 }),
    vest: new THREE.MeshStandardMaterial({ color: 0x2c2f27, roughness: 0.86, metalness: 0.06 }),
    helmet: new THREE.MeshStandardMaterial({ color: 0x353a2b, roughness: 0.6, metalness: 0.28 }),
    black: new THREE.MeshStandardMaterial({ color: 0x121417, roughness: 0.82, metalness: 0.1 }),
    skin: new THREE.MeshStandardMaterial({ color: 0x7a5c44, roughness: 0.88, metalness: 0 }),
    goggle: new THREE.MeshStandardMaterial({ color: 0x090d11, roughness: 0.14, metalness: 0.85, envMapIntensity: 1.4 }),
    gun: new THREE.MeshStandardMaterial({ color: 0x191b1d, roughness: 0.5, metalness: 0.72 }),
    boot: new THREE.MeshStandardMaterial({ color: 0x111214, roughness: 0.9, metalness: 0.05 }),
    marker: new THREE.MeshBasicMaterial({ color: 0xff2a1a, toneMapped: false }),
    strobe: new THREE.MeshBasicMaterial({ color: 0xff2418, toneMapped: false }),
  }
  const glowMat = new THREE.SpriteMaterial({
    map: makeStrobeTexture(),
    color: 0xff3a22,
    transparent: true,
    opacity: 0.42,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    toneMapped: false,
  })
  ASSETS = { geo, mat, glowMat }
  return ASSETS
}

function lerpAngle(a, b, t) {
  let d = ((b - a + Math.PI) % (Math.PI * 2)) - Math.PI
  if (d < -Math.PI) d += Math.PI * 2
  return a + d * t
}

export class Enemy {
  constructor(scene, x, z, wave = 1) {
    const { geo, mat, glowMat } = getAssets()
    this.scene = scene
    this.root = new THREE.Group()
    this.root.position.set(x, 0, z)
    this.root.rotation.y = Math.atan2(-x, -z)
    this.body = new THREE.Group()
    this.root.add(this.body)

    this.hitMeshes = []
    this.dead = false
    this.remove = false
    this.deadTime = 0
    this.fallSign = -1
    this.health = 100
    this.maxHealth = 100
    this.time = Math.random() * 10
    this.phase = Math.random() * Math.PI * 2
    this.speed = 1.55 + Math.random() * 0.6 + (wave - 1) * 0.08
    this.engageRange = 8 + Math.random() * 7
    this.strafeDir = Math.random() < 0.5 ? -1 : 1
    this.strafeTimer = 1 + Math.random() * 2
    this.shootCd = 1.6 + Math.random() * 1.6
    this.telegraph = 0
    this.burst = 0
    this.burstTimer = 0
    this.muzzleT = 0
    this.flinch = 0
    this.wave = wave
    this.moving = false
    this.hasLOS = false
    this.lastHit = 0
    this.headshot = false

    const hit = (mesh, part) => {
      mesh.userData.enemy = this
      mesh.userData.part = part
      mesh.castShadow = false
      mesh.receiveShadow = true
      this.hitMeshes.push(mesh)
      return mesh
    }

    const hip = new THREE.Mesh(geo.hip, mat.uniformDark)
    hip.position.y = 0.93
    this.body.add(hip)
    hit(hip, 'body')

    const abdomen = new THREE.Mesh(geo.abdomen, mat.uniform)
    abdomen.position.y = 1.09
    this.body.add(abdomen)
    hit(abdomen, 'body')

    const chest = new THREE.Mesh(geo.chest, mat.uniform)
    chest.position.y = 1.34
    this.body.add(chest)
    hit(chest, 'body')

    const vest = new THREE.Mesh(geo.vest, mat.vest)
    vest.position.y = 1.34
    this.body.add(vest)
    hit(vest, 'body')

    for (const [px, py] of [[-0.13, 1.28], [0, 1.27], [0.13, 1.28]]) {
      const pouch = new THREE.Mesh(geo.pouch, mat.uniformDark)
      pouch.position.set(px, py, 0.16)
      this.body.add(pouch)
    }

    const backpack = new THREE.Mesh(geo.backpack, mat.vest)
    backpack.position.set(0, 1.33, -0.2)
    this.body.add(backpack)
    hit(backpack, 'body')

    const marker = new THREE.Mesh(geo.marker, mat.marker)
    marker.position.set(0.1, 1.45, 0.152)
    this.body.add(marker)

    const strobe = new THREE.Mesh(geo.strobe, mat.strobe)
    strobe.position.set(-0.075, 1.84, 0)
    this.body.add(strobe)

    const strobeGlow = new THREE.Sprite(glowMat)
    strobeGlow.position.copy(strobe.position)
    strobeGlow.scale.setScalar(0.24)
    this.body.add(strobeGlow)
    this.strobe = strobe
    this.strobeGlow = strobeGlow

    const neck = new THREE.Mesh(geo.neck, mat.black)
    neck.position.y = 1.54
    this.body.add(neck)

    const head = new THREE.Mesh(geo.head, mat.black)
    head.position.set(0, 1.65, 0.015)
    this.body.add(head)
    hit(head, 'head')

    const goggles = new THREE.Mesh(geo.goggles, mat.goggle)
    goggles.position.set(0, 1.675, 0.11)
    this.body.add(goggles)
    hit(goggles, 'head')

    const helmet = new THREE.Mesh(geo.helmet, mat.helmet)
    helmet.scale.set(1.12, 0.86, 1.2)
    helmet.position.set(0, 1.755, 0.005)
    this.body.add(helmet)
    hit(helmet, 'head')

    const skin = new THREE.Mesh(new THREE.BoxGeometry(0.085, 0.04, 0.02), mat.skin)
    skin.position.set(0, 1.62, 0.108)
    this.body.add(skin)

    this.shoulders = []
    for (const side of [-1, 1]) {
      const shoulder = new THREE.Group()
      shoulder.position.set(side * 0.275, 1.46, 0)
      shoulder.rotation.x = side === 1 ? -1.25 : -1.12
      shoulder.rotation.z = side * 0.14

      const upper = new THREE.Mesh(geo.upperArm, mat.uniform)
      upper.position.y = -0.17
      shoulder.add(upper)
      hit(upper, 'limb')

      const fore = new THREE.Mesh(geo.forearm, mat.uniform)
      fore.position.set(0, -0.34, 0.02)
      fore.rotation.x = 0.25
      shoulder.add(fore)
      hit(fore, 'limb')

      const hand = new THREE.Mesh(geo.hand, mat.black)
      hand.position.set(0, -0.5, 0.05)
      shoulder.add(hand)
      hit(hand, 'limb')

      this.body.add(shoulder)
      this.shoulders.push(shoulder)
    }

    this.legs = []
    for (const side of [-1, 1]) {
      const leg = new THREE.Group()
      leg.position.set(side * 0.115, 0.9, 0)

      const upper = new THREE.Mesh(geo.upperLeg, mat.uniform)
      upper.position.y = -0.21
      leg.add(upper)
      hit(upper, 'limb')

      const lower = new THREE.Mesh(geo.lowerLeg, mat.uniformDark)
      lower.position.y = -0.62
      leg.add(lower)
      hit(lower, 'limb')

      const boot = new THREE.Mesh(geo.boot, mat.boot)
      boot.position.set(0, -0.84, 0.05)
      leg.add(boot)
      hit(boot, 'limb')

      this.root.add(leg)
      this.legs.push(leg)
    }

    this.rifle = new THREE.Group()
    const rBody = new THREE.Mesh(geo.rifleBody, mat.gun)
    const rBarrel = new THREE.Mesh(geo.rifleBarrel, mat.gun)
    rBarrel.rotation.x = Math.PI / 2
    rBarrel.position.z = 0.3
    const rMag = new THREE.Mesh(geo.rifleMag, mat.gun)
    rMag.position.set(0, -0.09, -0.02)
    rMag.rotation.x = 0.15
    const rStock = new THREE.Mesh(geo.rifleStock, mat.gun)
    rStock.position.z = -0.23
    this.rifle.add(rBody, rBarrel, rMag, rStock)
    this.rifle.position.set(0.12, 1.3, 0.31)
    this.body.add(this.rifle)

    const muzzleMat = new THREE.SpriteMaterial({
      map: Enemy.flashTexture || (Enemy.flashTexture = makeFlashTexture()),
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      color: 0xffc890,
    })
    this.muzzleFlash = new THREE.Sprite(muzzleMat)
    this.muzzleFlash.position.set(0, 0, 0.48)
    this.muzzleFlash.scale.setScalar(0.34)
    this.muzzleFlash.visible = false
    this.rifle.add(this.muzzleFlash)

    const proxyMat = new THREE.MeshBasicMaterial({ colorWrite: false, depthWrite: false })
    this.shadowProxy = new THREE.Mesh(new THREE.CapsuleGeometry(0.3, 1.15, 3, 6), proxyMat)
    this.shadowProxy.position.y = 0.95
    this.shadowProxy.castShadow = true
    this.root.add(this.shadowProxy)

    this.root.traverse((o) => {
      if (o.isMesh) o.frustumCulled = true
    })

    scene.add(this.root)
    this.spawnPoint = new THREE.Vector3(x, 0, z)
  }

  getChest(target = new THREE.Vector3()) {
    return target.set(this.root.position.x, 1.38, this.root.position.z)
  }

  getHead(target = new THREE.Vector3()) {
    return target.set(this.root.position.x, 1.68, this.root.position.z)
  }

  getMuzzleWorld(target = new THREE.Vector3()) {
    this.root.updateWorldMatrix(true, false)
    return target.set(0, 0, 0.48).applyMatrix4(this.rifle.matrixWorld)
  }

  takeDamage(amount, part, hitDir, hitPoint) {
    if (this.dead) return { killed: false, headshot: false }
    const mult = part === 'head' ? 2.8 : part === 'limb' ? 0.62 : 1
    const dmg = amount * mult
    this.health -= dmg
    this.flinch = Math.min(0.34, 0.12 + dmg / 260)
    this.lastHit = part
    if (this.health <= 0) {
      this.die(hitDir)
      return { killed: true, headshot: part === 'head' }
    }
    return { killed: false, headshot: part === 'head' }
  }

  die(hitDir) {
    this.dead = true
    this.deadTime = 0
    this.telegraph = 0
    this.burst = 0
    this.muzzleFlash.visible = false
    this.strobe.visible = false
    this.strobeGlow.visible = false
    const forward = new THREE.Vector3(Math.sin(this.root.rotation.y), 0, Math.cos(this.root.rotation.y))
    this.fallSign = hitDir && hitDir.dot(forward) > 0 ? 1 : -1
    this.deathSpin = (Math.random() - 0.5) * 0.3
    for (const m of this.hitMeshes) {
      m.userData.enemy = this
      m.userData.part = 'dead'
    }
  }

  update(dt, ctx) {
    this.time += dt
    if (this.flinch > 0) this.flinch = Math.max(0, this.flinch - dt * 0.9)
    if (this.muzzleT > 0) {
      this.muzzleT -= dt
      if (this.muzzleT <= 0) this.muzzleFlash.visible = false
    }

    if (this.dead) {
      this.deadTime += dt
      const fall = Math.min(1, this.deadTime / 0.55)
      const ease = fall * fall * (3 - 2 * fall)
      this.root.rotation.x = this.fallSign * 1.5 * ease
      this.root.rotation.z = this.deathSpin * ease
      this.root.position.y = -0.02 * ease
      if (this.deadTime > 5.5) {
        this.root.position.y -= dt * 0.7
        if (this.deadTime > 7.2) {
          this.scene.remove(this.root)
          this.remove = true
        }
      }
      return
    }

    const player = ctx.playerPos
    const eye = ctx.playerEye
    const dx = player.x - this.root.position.x
    const dz = player.z - this.root.position.z
    const dist = Math.sqrt(dx * dx + dz * dz)
    const dirX = dist > 0.001 ? dx / dist : 0
    const dirZ = dist > 0.001 ? dz / dist : 1

    const targetYaw = Math.atan2(dirX, dirZ)
    this.root.rotation.y = lerpAngle(this.root.rotation.y, targetYaw, Math.min(1, dt * 7))

    const chest = this.getChest(new THREE.Vector3())
    this.hasLOS = ctx.world.hasLineOfSight(chest, eye)

    let moveX = 0
    let moveZ = 0
    this.moving = false

    if (!this.hasLOS || dist > 30) {
      moveX = dirX
      moveZ = dirZ
      this.moving = true
    } else {
      this.strafeTimer -= dt
      if (this.strafeTimer <= 0) {
        this.strafeTimer = 1.4 + Math.random() * 2.2
        this.strafeDir *= -1
      }
      if (dist > this.engageRange + 3) {
        moveX = dirX
        moveZ = dirZ
        this.moving = true
      } else if (dist < 5.5) {
        moveX = -dirX
        moveZ = -dirZ
        this.moving = true
      } else {
        moveX = -dirZ * this.strafeDir * 0.55
        moveZ = dirX * this.strafeDir * 0.55
        this.moving = true
      }
    }

    if (ctx.enemies) {
      for (const other of ctx.enemies) {
        if (other === this || other.dead) continue
        const ox = this.root.position.x - other.root.position.x
        const oz = this.root.position.z - other.root.position.z
        const d2 = ox * ox + oz * oz
        if (d2 < 1.35 && d2 > 0.0001) {
          const inv = 1 / Math.sqrt(d2)
          moveX += ox * inv * 0.9
          moveZ += oz * inv * 0.9
        }
      }
    }

    const moveLen = Math.hypot(moveX, moveZ)
    if (moveLen > 0.001 && this.moving) {
      const vx = (moveX / moveLen) * this.speed * dt
      const vz = (moveZ / moveLen) * this.speed * dt
      const beforeX = this.root.position.x
      const beforeZ = this.root.position.z
      ctx.world.resolveMove(this.root.position, vx, vz, 0.4)
      const moved = Math.hypot(this.root.position.x - beforeX, this.root.position.z - beforeZ)
      this.phase += dt * (4.4 + this.speed * 1.4)
      const swing = Math.sin(this.phase) * 0.52
      this.legs[0].rotation.x = swing
      this.legs[1].rotation.x = -swing
      this.legs[0].position.y = 0.9 + Math.abs(Math.sin(this.phase)) * 0.015
      this.legs[1].position.y = 0.9 + Math.abs(Math.cos(this.phase)) * 0.015
      this.body.position.y = Math.abs(Math.sin(this.phase)) * 0.022
      this.body.rotation.z = Math.sin(this.phase) * 0.018 + this.flinch * (Math.random() - 0.5)
      if (moved < 0.0004) {
        this.legs[0].rotation.x *= 0.8
        this.legs[1].rotation.x *= 0.8
      }
    } else {
      this.legs[0].rotation.x *= Math.max(0, 1 - dt * 8)
      this.legs[1].rotation.x *= Math.max(0, 1 - dt * 8)
      this.body.position.y *= Math.max(0, 1 - dt * 8)
      this.body.rotation.z = this.flinch * (Math.random() - 0.5)
    }

    this.body.rotation.z += this.flinch * (Math.random() - 0.5) * dt * 6
    this.body.rotation.x = 0

    if (this.hasLOS && dist < 36 && ctx.canShoot !== false) {
      if (this.telegraph > 0) {
        this.telegraph -= dt
        if (this.telegraph <= 0) {
          this.burst = 3 + ((Math.random() * 3) | 0)
          this.burstTimer = 0
        }
      } else if (this.burst > 0) {
        this.burstTimer -= dt
        if (this.burstTimer <= 0) {
          this.fire(ctx, dist)
          this.burst--
          this.burstTimer = 0.11 + Math.random() * 0.04
          if (this.burst === 0) {
            ctx.releaseFire?.(this)
            this.shootCd = 2.1 + Math.random() * 1.8 - Math.min(0.5, this.wave * 0.05)
          }
        }
      } else {
        this.shootCd -= dt
        if (this.shootCd <= 0) {
          if (!ctx.claimFire || ctx.claimFire(this)) {
            this.telegraph = 0.55 + Math.random() * 0.5
          } else {
            this.shootCd = 0.75 + Math.random() * 0.5
          }
        }
      }
    } else {
      this.telegraph = 0
      this.burst = 0
      this.burstTimer = 0
      ctx.releaseFire?.(this)
    }
  }

  fire(ctx, dist) {
    this.muzzleFlash.visible = true
    this.muzzleFlash.material.rotation = Math.random() * Math.PI * 2
    this.muzzleFlash.scale.setScalar(0.26 + Math.random() * 0.16)
    this.muzzleT = 0.05

    const muzzle = this.getMuzzleWorld(new THREE.Vector3())
    const eye = ctx.playerEye
    const target = new THREE.Vector3(eye.x, eye.y - 0.1, eye.z)

    let chance = 0.4 - dist * 0.01 + this.wave * 0.012
    if (ctx.playerSpeed > 2.5) chance -= 0.09
    if (ctx.playerSpeed > 4.8) chance -= 0.11
    chance = Math.max(0.06, Math.min(0.46, chance))
    const hit = Math.random() < chance

    if (!hit) {
      target.x += (Math.random() - 0.5) * 1.8
      target.y += (Math.random() - 0.2) * 1.1
      target.z += (Math.random() - 0.5) * 1.8
    }

    if (!hit && dist > 6) {
      const dir = target.clone().sub(muzzle).normalize()
      const end = muzzle.clone().addScaledVector(dir, Math.max(2, dist - 4.5))
      ctx.effects.tracer(muzzle, end, 'enemy')
    }
    ctx.effects.flash(muzzle, 0.32, 0xffc07a, 0.05)
    ctx.audio.enemyShot(dist)

    if (hit) {
      const dmg = (5 + Math.random() * 3.5) * (1 + (this.wave - 1) * 0.04)
      ctx.damagePlayer(dmg, muzzle)
    }
  }
}

function makeStrobeTexture() {
  const c = document.createElement('canvas')
  c.width = c.height = 64
  const ctx = c.getContext('2d')
  const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32)
  g.addColorStop(0, 'rgba(255,110,80,1)')
  g.addColorStop(0.28, 'rgba(255,60,36,0.62)')
  g.addColorStop(1, 'rgba(255,30,18,0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, 64, 64)
  const tex = new THREE.CanvasTexture(c)
  tex.colorSpace = THREE.SRGBColorSpace
  return tex
}

function makeFlashTexture() {
  const c = document.createElement('canvas')
  c.width = c.height = 128
  const ctx = c.getContext('2d')
  ctx.globalCompositeOperation = 'lighter'
  const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64)
  g.addColorStop(0, 'rgba(255,255,240,1)')
  g.addColorStop(0.2, 'rgba(255,230,170,0.9)')
  g.addColorStop(0.55, 'rgba(255,150,60,0.35)')
  g.addColorStop(1, 'rgba(255,120,30,0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, 128, 128)
  const tex = new THREE.CanvasTexture(c)
  tex.colorSpace = THREE.SRGBColorSpace
  return tex
}
