import * as THREE from 'three'
import { World } from './world.js'
import { Weapon } from './weapon.js'
import { Enemy } from './enemy.js'
import { Effects } from './effects.js'
import { Input } from './input.js'
import { HUD } from './hud.js'
import { AudioEngine } from './audio.js'

const params = new URLSearchParams(window.location.search)
const forceTouch = params.get('touch') === '1'
const isTouch =
  forceTouch ||
  (window.matchMedia && window.matchMedia('(pointer: coarse)').matches) ||
  navigator.maxTouchPoints > 0
const isMobile =
  isTouch ||
  /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent) ||
  Math.min(window.innerWidth, window.innerHeight) < 560

const clamp = (v, a, b) => Math.max(a, Math.min(b, v))
const lerp = (a, b, t) => a + (b - a) * t

class Game {
  constructor() {
    this.canvas = document.getElementById('game')
    this.hud = new HUD()
    this.audio = new AudioEngine()
    this.state = 'menu'
    this.elapsed = 0
    this.deathT = 0
    this.deathScreenShown = false
    this.menuT = 0
    this.enemies = []
    this.wave = 0
    this.toSpawn = 0
    this.waveActive = false
    this.waveCooldown = 0
    this.spawnTimer = 0
    this.spawnInterval = 1
    this.maxAlive = 5
    this.score = 0
    this.kills = 0
    this.shots = 0
    this.hits = 0
    this.mag = 30
    this.magSize = 30
    this.reserve = 120
    this.reloadTimer = 0
    this.reloadDuration = 2.05
    this.fireCd = 0
    this.bloom = 0
    this.shake = 0
    this.recoilPitch = 0
    this.recoilYaw = 0
    this.lastDamageAt = -99
    this.healthHudTimer = 0
    this.stepTimer = 0
    this.lowAmmoWarned = false
    this.waveBannerShown = false

    this.player = {
      pos: new THREE.Vector3(0, 0, 18.5),
      vel: new THREE.Vector2(0, 0),
      yaw: 0,
      pitch: 0,
      health: 100,
      speed: 0,
      bobT: 0,
    }

    this.raycaster = new THREE.Raycaster()
    this.raycaster.far = 220
    this._dir = new THREE.Vector3()
    this._right = new THREE.Vector3()
    this._up = new THREE.Vector3()
    this._muzzle = new THREE.Vector3()
    this._point = new THREE.Vector3()
    this._tmp = new THREE.Vector3()
    this._origin = new THREE.Vector3()

    this.initRenderer()
    this.initScene()
    this.initSystems()
    this.initEvents()
    this.hud.hide()

    this.lastTime = performance.now()
    this.loop = this.loop.bind(this)
    requestAnimationFrame(this.loop)

    setTimeout(() => {
      this.hud.hideLoader()
      window.__ready = true
    }, 450)

    if (params.get('play') === '1') {
      setTimeout(() => this.startGame(), 700)
    }
    window.__game = this
  }

  initRenderer() {
    try {
      this.renderer = new THREE.WebGLRenderer({
        canvas: this.canvas,
        antialias: true,
        alpha: false,
        stencil: false,
        powerPreference: 'high-performance',
      })
    } catch (err) {
      const loader = document.getElementById('loader')
      loader.innerHTML =
        '<div class="loader-brand">OPERADOR</div><div class="loader-text" style="max-width:280px;text-align:center;line-height:2">SEU DISPOSITIVO NÃO SUPORTA WEBGL.<br>ATUALIZE O NAVEGADOR E TENTE NOVAMENTE.</div>'
      throw err
    }

    this.dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2)
    this.renderer.setPixelRatio(this.dpr)
    this.renderer.setSize(this.canvas.clientWidth || window.innerWidth, this.canvas.clientHeight || window.innerHeight, false)
    this.renderer.shadowMap.enabled = true
    this.renderer.shadowMap.type = THREE.PCFShadowMap
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping
    this.renderer.toneMappingExposure = 1.48
    this.renderer.outputColorSpace = THREE.SRGBColorSpace
    this.renderer.info.autoReset = true
  }

  initScene() {
    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(
      72,
      (this.canvas.clientWidth || window.innerWidth) / (this.canvas.clientHeight || window.innerHeight),
      0.055,
      520
    )
    this.camera.rotation.order = 'YXZ'
    this.camera.position.set(16, 5, 16)
    this.scene.add(this.camera)

    this.world = new World(this.renderer, this.scene, { mobile: isMobile })
    this.effects = new Effects(this.scene, this.renderer, isMobile)
    this.weapon = new Weapon(this.camera, this.scene, this.renderer, this.effects)
    this.weapon.show(false)
  }

  initSystems() {
    this.input = new Input(this.canvas, {
      forceTouch,
      onPauseRequest: () => this.pause(),
      onInteract: () => this.audio.init(),
    })

    this.hud.setHealth(100)
    this.hud.setAmmo(30, 120)
    this.hud.setStats(0, 0)
    this.hud.setWave(1, 0)
    this.hud.setSoundLabel(this.audio.muted)

    document.getElementById('btn-start').addEventListener('click', () => this.startGame())
    document.getElementById('btn-pause').addEventListener('click', () => this.pause())
    document.getElementById('btn-resume').addEventListener('click', () => this.resume())
    document.getElementById('btn-restart').addEventListener('click', () => this.restart())
    document.getElementById('btn-menu').addEventListener('click', () => this.toMenu())
    document.getElementById('btn-retry').addEventListener('click', () => this.restart())
    document.getElementById('btn-dead-menu').addEventListener('click', () => this.toMenu())
    document.getElementById('btn-sound').addEventListener('click', () => this.toggleSound())
    document.getElementById('btn-sound-pause').addEventListener('click', () => this.toggleSound())
  }

  initEvents() {
    window.addEventListener('resize', () => this.resize())
    window.addEventListener('orientationchange', () => setTimeout(() => this.resize(), 250))
    document.addEventListener('visibilitychange', () => {
      if (document.hidden && this.state === 'playing') this.pause()
    })
    window.addEventListener('blur', () => {
      if (this.state === 'playing' && !this.input.isTouch) this.pause()
    })
    this.canvas.addEventListener('webglcontextlost', (e) => {
      e.preventDefault()
      this.pause()
    })
  }

  resize() {
    const w = this.canvas.clientWidth || window.innerWidth
    const h = this.canvas.clientHeight || window.innerHeight
    if (w === 0 || h === 0) return
    this.camera.aspect = w / h
    this.camera.updateProjectionMatrix()
    this.renderer.setPixelRatio(this.dpr)
    this.renderer.setSize(w, h, false)
  }

  startGame() {
    if (this.state === 'playing') return
    this.audio.init()
    this.hud.toggleScreen('menu', false)
    this.hud.toggleScreen('pause', false)
    this.hud.toggleScreen('dead', false)
    this.resetRun()
    this.state = 'playing'
    this.hud.show()
    this.weapon.show(true)
    this.hud.fade(false)
    this.hud.showLookHint()
    this.input.setEnabled(true)
    this.startWave(1, true)
  }

  restart() {
    this.audio.init()
    this.hud.toggleScreen('pause', false)
    this.hud.toggleScreen('dead', false)
    this.hud.toggleScreen('menu', false)
    this.resetRun()
    this.state = 'playing'
    this.hud.show()
    this.weapon.show(true)
    this.input.setEnabled(true)
    this.startWave(1, true)
    this.hud.fade(false)
  }

  resetRun() {
    for (const e of this.enemies) this.scene.remove(e.root)
    this.enemies = []
    this.effects.reset()
    this.weapon.reset()
    this.player.pos.set(0, 0, 18.5)
    this.player.vel.set(0, 0)
    this.player.yaw = 0
    this.player.pitch = 0
    this.player.health = 100
    this.player.speed = 0
    this.player.bobT = 0
    this.health = 100
    this.score = 0
    this.kills = 0
    this.shots = 0
    this.hits = 0
    this.mag = 30
    this.reserve = 120
    this.reloadTimer = 0
    this.reloadDuration = 2.05
    this.fireCd = 0
    this.bloom = 0
    this.shake = 0
    this.recoilPitch = 0
    this.recoilYaw = 0
    this.lastDamageAt = -99
    this.deathT = 0
    this.deathScreenShown = false
    this.wave = 0
    this.toSpawn = 0
    this.waveActive = false
    this.waveCooldown = 0
    this.spawnTimer = 0
    this.attackers = new Set()
    this.attackSlots = 2
    this.lowAmmoWarned = false
    this.recoilYaw = 0
    this.weapon.setAiming(false)
    this.input.setAim(false)
    this.hud.setAiming(false)
    this.hud.setHealth(100)
    this.hud.setAmmo(30, 120)
    this.hud.setStats(0, 0)
    this.hud.setReloading(false)
    this.hud.setSpread(7)
    this.hud.setWave(1, 0)
    this.hud.setObjective('DEFENDA O PERÍMETRO')
    this.audio.resume()
    this.camera.rotation.set(0, 0, 0)
    this.camera.position.set(0, 1.66, 18.5)
    this.input.consumeLook()
  }

  toMenu() {
    this.state = 'menu'
    this.input.setEnabled(false)
    this.hud.toggleScreen('pause', false)
    this.hud.toggleScreen('dead', false)
    this.hud.toggleScreen('menu', true)
    this.hud.hide()
    this.weapon.show(false)
    this.effects.reset()
    for (const e of this.enemies) this.scene.remove(e.root)
    this.enemies = []
    if (document.pointerLockElement) document.exitPointerLock()
    this.menuT = 0
  }

  pause() {
    if (this.state !== 'playing') return
    this.state = 'paused'
    this.input.setEnabled(false)
    this.hud.setPauseStats(this.kills, this.wave, this.score)
    this.hud.toggleScreen('pause', true)
    if (document.pointerLockElement) document.exitPointerLock()
  }

  resume() {
    if (this.state !== 'paused') return
    this.audio.init()
    this.hud.toggleScreen('pause', false)
    this.state = 'playing'
    this.input.setEnabled(true)
    this.input.consumeLook()
    this.lastTime = performance.now()
  }

  toggleSound() {
    this.audio.init()
    const muted = this.audio.toggleMuted()
    this.hud.setSoundLabel(muted)
    document.getElementById('btn-sound').style.opacity = muted ? '0.45' : ''
  }

  startWave(n, first = false) {
    this.wave = n
    this.waveActive = true
    this.waveCooldown = 0
    this.toSpawn = Math.min(14, 3 + n * 2)
    this.maxAlive = Math.min(5, 2 + n)
    this.attackSlots = Math.min(3, 1 + n)
    this.attackers.clear()
    this.spawnTimer = first ? 1.6 : 0.6
    this.spawnInterval = Math.max(0.55, 1.05 - n * 0.04)
    const alive = this.aliveCount()
    this.hud.setWave(n, this.toSpawn + alive)
    this.hud.showBanner(`ONDA ${n}`, `${this.toSpawn} HOSTIS NO SETOR`, 2300)
    this.hud.setObjective(`ELIMINE OS HOSTIS — ONDA ${n}`)
    this.audio.waveStart()
    this.audio.init()
  }

  aliveCount() {
    let count = 0
    for (const e of this.enemies) if (!e.dead) count++
    return count
  }

  aliveEnemies() {
    return this.enemies.filter((e) => !e.dead)
  }

  updateWave(dt) {
    if (!this.waveActive) {
      if (this.waveCooldown > 0) {
        this.waveCooldown -= dt
        if (this.waveCooldown <= 0) this.startWave(this.wave + 1)
      }
      return
    }

    const alive = this.aliveCount()
    if (this.toSpawn > 0) {
      this.spawnTimer -= dt
      if (this.spawnTimer <= 0 && alive < this.maxAlive) {
        this.spawnEnemy()
        this.spawnTimer = this.spawnInterval + Math.random() * 0.55
      }
    }
    this.hud.setWave(this.wave, this.toSpawn + this.aliveCount())

    if (this.toSpawn === 0 && alive === 0 && this.waveActive) {
      this.waveActive = false
      this.waveCooldown = 4.5
      this.reserve = Math.min(260, this.reserve + 24)
      this.hud.setAmmo(this.mag, this.reserve)
      this.hud.showBanner('SETOR LIMPO', 'PREPARE-SE PARA A PRÓXIMA ONDA', 2600)
      this.hud.setObjective('PERÍMETRO SEGURO')
      this.audio.waveClear()
    }
  }

  spawnEnemy() {
    const [x, z] = this.world.randomSpawnPoint(this.player.pos, 13)
    const enemy = new Enemy(this.scene, x, z, this.wave)
    this.enemies.push(enemy)
    this.toSpawn--
    const p = new THREE.Vector3(x, 0, z)
    this.effects.dustBurst(p, 4)
  }

  damagePlayer(amount, origin) {
    if (this.state !== 'playing') return
    this.player.health = Math.max(0, this.player.health - amount)
    this.lastDamageAt = this.elapsed
    this.hud.setHealth(this.player.health)
    if (origin) this.hud.damageFrom(origin, this.player.pos, this.player.yaw)
    this.hud.flashDamage()
    this.audio.hurt()
    this.shake = Math.min(1.4, this.shake + 0.45)
    this.recoilPitch += 0.01
    if (this.player.health <= 0) this.die()
  }

  die() {
    if (this.state !== 'playing') return
    this.state = 'dead'
    this.deathT = 0
    this.deathScreenShown = false
    this.input.setEnabled(false)
    this.audio.death()
    if (document.pointerLockElement) document.exitPointerLock()
    const acc = this.shots > 0 ? (this.hits / this.shots) * 100 : 0
    this.hud.setDeadStats(this.wave, this.kills, acc, this.score)
    this.hud.setHealth(0)
    setTimeout(() => {
      if (this.state === 'dead') {
        this.hud.toggleScreen('dead', true)
        this.deathScreenShown = true
      }
    }, 1500)
  }

  startReload() {
    if (this.reloadTimer > 0 || this.mag >= this.magSize || this.reserve <= 0) return
    this.reloadTimer = this.reloadDuration
    this.weapon.startReload(this.reloadDuration)
    this.audio.reload()
    this.hud.setReloading(true, 0)
    this.weapon.setAiming(false)
    this.input.setAim(false)
    this.hud.setAiming(false)
  }

  finishReload() {
    const needed = this.magSize - this.mag
    const take = Math.min(needed, this.reserve)
    this.mag += take
    this.reserve -= take
    this.hud.setAmmo(this.mag, this.reserve)
    this.hud.setReloading(false)
    if (this.mag > 0) this.lowAmmoWarned = false
  }

  claimFire(enemy) {
    if (this.state !== 'playing') return false
    if (this.attackers.size >= this.attackSlots) return false
    this.attackers.add(enemy)
    return true
  }

  releaseFire(enemy) {
    this.attackers.delete(enemy)
  }

  handleKill(enemy, headshot) {
    this.attackers.delete(enemy)
    this.kills++
    const reward = headshot ? 150 : 100
    this.score += reward
    this.reserve = Math.min(260, this.reserve + 12)
    this.hud.setStats(this.score, this.kills)
    this.hud.killFeed(reward, headshot)
    this.hud.setAmmo(this.mag, this.reserve)
    this.shake = Math.min(1.2, this.shake + (headshot ? 0.12 : 0.07))
  }

  fire() {
    this.mag--
    this.shots++
    this.audio.shot()
    this.weapon.kick(1.05)
    this.hud.setAmmo(this.mag, this.reserve)
    this.bloom = Math.min(1, this.bloom + 0.22)
    this.recoilPitch += 0.0085 + Math.random() * 0.0035
    this.recoilYaw += (Math.random() - 0.5) * 0.0045
    this.shake = Math.min(1.1, this.shake + 0.12)

    const aiming = this.weapon.aim
    this._origin.copy(this.camera.position)
    this._dir.set(0, 0, -1).applyQuaternion(this.camera.quaternion)

    if (isTouch && !aiming) {
      const best = this.findAimAssistTarget(this._origin, this._dir)
      if (best) this._dir.lerp(best, 0.4).normalize()
    }

    const spread = (aiming ? 0.0035 : 0.0125) + this.bloom * 0.007
    this._right.set(1, 0, 0).applyQuaternion(this.camera.quaternion)
    this._up.set(0, 1, 0).applyQuaternion(this.camera.quaternion)
    this._dir
      .addScaledVector(this._right, (Math.random() - 0.5) * spread * 2)
      .addScaledVector(this._up, (Math.random() - 0.5) * spread * 2)
      .normalize()

    this.raycaster.set(this._origin, this._dir)
    const enemyHits = this.raycaster.intersectObjects(
      this.aliveEnemies().flatMap((e) => e.hitMeshes),
      false
    )
    const worldHits = this.raycaster.intersectObjects(this.world.shootables, false)
    const enemyHit = enemyHits[0]
    const worldHit = worldHits[0]
    const muzzle = this.weapon.getMuzzleWorld(this._muzzle)

    if (enemyHit && (!worldHit || enemyHit.distance < worldHit.distance)) {
      const enemy = enemyHit.object.userData.enemy
      const part = enemyHit.object.userData.part
      const point = enemyHit.point
      const headshot = part === 'head'
      const result = enemy.takeDamage(30, part, this._dir, point)
      this.effects.bloodAt(point, this._dir, headshot ? 14 : 9)
      this.effects.tracer(muzzle, point)
      this.hits++
      this.hud.hit(headshot)
      this.audio.hitMarker(headshot)
      if (result.killed) this.handleKill(enemy, result.headshot || headshot)
    } else if (worldHit) {
      const normal = worldHit.face
        ? worldHit.face.normal.clone().transformDirection(worldHit.object.matrixWorld)
        : new THREE.Vector3(0, 1, 0)
      this.effects.impact(worldHit.point, normal)
      this.effects.tracer(muzzle, worldHit.point)
    } else {
      this._point.copy(this._origin).addScaledVector(this._dir, 120)
      this.effects.tracer(muzzle, this._point)
    }
  }

  findAimAssistTarget(origin, dir) {
    let best = null
    let bestAngle = 0.055
    const chest = new THREE.Vector3()
    for (const enemy of this.aliveEnemies()) {
      enemy.getChest(chest)
      this._tmp.copy(chest).sub(origin)
      const dist = this._tmp.length()
      if (dist < 2 || dist > 34) continue
      this._tmp.normalize()
      const angle = this._tmp.angleTo(dir)
      if (angle < bestAngle) {
        if (!this.world.hasLineOfSight(origin, chest)) continue
        bestAngle = angle
        best = this._tmp.clone()
      }
    }
    return best
  }

  updatePlayer(dt) {
    const player = this.player
    const move = this.input.getMove()
    const look = this.input.consumeLook()
    const aiming = this.input.aim
    this.weapon.setAiming(aiming)

    const sensBase = isTouch ? 0.0042 : 0.0021
    const sens = sensBase * (aiming ? 0.55 : 1)
    player.yaw -= look.x * sens
    player.pitch -= look.y * sens * (isTouch ? 0.85 : 1)
    player.pitch = clamp(player.pitch, -1.32, 1.32)
    if (player.yaw > Math.PI) player.yaw -= Math.PI * 2
    if (player.yaw < -Math.PI) player.yaw += Math.PI * 2

    const sinY = Math.sin(player.yaw)
    const cosY = Math.cos(player.yaw)
    const forwardX = -sinY
    const forwardZ = -cosY
    const rightX = cosY
    const rightZ = -sinY

    let targetSpeed = 4.35
    if (move.sprint && !aiming) targetSpeed = 6.1
    if (aiming) targetSpeed = 2.7
    if (move.magnitude < 0.02) targetSpeed = 0

    const wishX = forwardX * move.y + rightX * move.x
    const wishZ = forwardZ * move.y + rightZ * move.x
    const wishLen = Math.hypot(wishX, wishZ)

    const targetVX = wishLen > 0.001 ? (wishX / wishLen) * targetSpeed * move.magnitude : 0
    const targetVZ = wishLen > 0.001 ? (wishZ / wishLen) * targetSpeed * move.magnitude : 0

    const accel = Math.min(1, dt * (movementConstrained(this) ? 10 : 14))
    player.vel.x = lerp(player.vel.x, targetVX, accel)
    player.vel.y = lerp(player.vel.y, targetVZ, accel)
    if (Math.abs(player.vel.x) < 0.02) player.vel.x = 0
    if (Math.abs(player.vel.y) < 0.02) player.vel.y = 0

    const beforeX = player.pos.x
    const beforeZ = player.pos.z
    this.world.resolveMove(player.pos, player.vel.x * dt, player.vel.y * dt, 0.37)
    const movedX = player.pos.x - beforeX
    const movedZ = player.pos.z - beforeZ
    player.speed = dt > 0 ? Math.hypot(movedX, movedZ) / dt : 0

    if (player.speed > 0.5) {
      player.bobT += dt * (4.8 + player.speed * 1.35)
      this.stepTimer -= dt
      if (this.stepTimer <= 0) {
        this.audio.footstep()
        this.stepTimer = move.sprint ? 0.32 : 0.44
      }
    } else {
      this.stepTimer = Math.min(this.stepTimer, 0.12)
    }

    const bobAmp = Math.min(1, player.speed / 4.2) * (aiming ? 0.35 : 1)
    const bobY = Math.abs(Math.sin(player.bobT)) * 0.032 * bobAmp
    const bobX = Math.sin(player.bobT * 0.5) * 0.025 * bobAmp

    this.recoilPitch *= Math.exp(-dt * 8.5)
    this.recoilYaw *= Math.exp(-dt * 8.5)
    this.shake = Math.max(0, this.shake - dt * 3.2)

    const t = this.elapsed
    const sh = this.shake
    const shakeX = (Math.sin(t * 53) + Math.sin(t * 37) * 0.6) * 0.006 * sh
    const shakeY = (Math.sin(t * 61) + Math.sin(t * 41) * 0.6) * 0.006 * sh
    const roll = Math.sin(player.bobT) * 0.006 * bobAmp + Math.sin(t * 29) * 0.02 * sh

    this.camera.position.set(
      player.pos.x + bobX * 0.4 + shakeX,
      1.66 + bobY * 0.5 + shakeY,
      player.pos.z
    )
    this.camera.rotation.y = player.yaw + this.recoilYaw + Math.sin(t * 43) * 0.015 * sh
    this.camera.rotation.x = player.pitch + this.recoilPitch + Math.sin(t * 47) * 0.02 * sh
    this.camera.rotation.z = roll

    const fovTarget = aiming ? 51 : 72
    const nextFov = lerp(this.camera.fov, fovTarget, Math.min(1, dt * 12))
    if (Math.abs(nextFov - this.camera.fov) > 0.01) {
      this.camera.fov = nextFov
      this.camera.updateProjectionMatrix()
    }

    const heading = ((-player.yaw * 180) / Math.PI + 36000) % 360
    this.hud.setHeading(heading)

    this.healthHudTimer -= dt
    if (this.elapsed - this.lastDamageAt > 7.5 && player.health < 100) {
      player.health = Math.min(100, player.health + 8 * dt)
      this.healthHudTimer -= dt
      if (this.healthHudTimer <= 0) {
        this.hud.setHealth(player.health)
        this.healthHudTimer = 0.18
      }
    }

    if (this.reloadTimer > 0) {
      this.reloadTimer -= dt
      const progress = 1 - this.reloadTimer / this.reloadDuration
      this.hud.setReloading(true, clamp(progress, 0, 1))
      if (this.reloadTimer <= 0) {
        this.reloadTimer = 0
        this.finishReload()
      }
    }

    if (this.input.consumeReload()) this.startReload()

    this.fireCd -= dt
    this.bloom = Math.max(0, this.bloom - dt * 2.4)
    const spreadPx = (aiming ? 3 : 7) + this.bloom * 9 + Math.min(6, player.speed * 0.7)
    this.hud.setSpread(spreadPx)

    if (this.input.firing) {
      if (this.reloadTimer > 0) {
        /* wait */
      } else if (this.mag <= 0) {
        if (this.fireCd <= 0) {
          this.audio.dryFire()
          this.fireCd = 0.28
          this.startReload()
        }
      } else if (this.fireCd <= 0) {
        this.fire()
        this.fireCd = 0.095
      }
    }

    this.camera.updateMatrixWorld(true)
    const weaponMoving = player.speed > 0.35
    this.weapon.update(dt, {
      moving: weaponMoving,
      speed: player.speed,
      sprinting: move.sprint && player.speed > 4.2,
      lookX: look.x * (isTouch ? 0.0042 : 0.0021),
      lookY: look.y * (isTouch ? 0.0042 : 0.0021),
    })
    this.hud.setAiming(aiming)
  }

  updateEnemies(dt) {
    if (!this.enemies.length) return
    const ctx = {
      playerPos: this.player.pos,
      playerEye: this.camera.position,
      playerSpeed: this.player.speed,
      world: this.world,
      effects: this.effects,
      audio: this.audio,
      enemies: this.enemies,
      wave: this.wave,
      canShoot: this.state === 'playing',
      claimFire: (enemy) => this.claimFire(enemy),
      releaseFire: (enemy) => this.releaseFire(enemy),
      damagePlayer: (dmg, origin) => this.damagePlayer(dmg, origin),
    }
    for (const enemy of this.enemies) {
      if (!enemy.remove) enemy.update(dt, ctx)
    }
    this.enemies = this.enemies.filter((e) => !e.remove)
  }

  updateMenu(dt) {
    this.menuT += dt
    const a = 0.75 + this.menuT * 0.055
    const r = 16.5
    this.camera.position.set(
      Math.cos(a) * r,
      4.6 + Math.sin(this.menuT * 0.35) * 0.25,
      Math.sin(a) * r
    )
    this.camera.lookAt(0, 1.9, 0)
    this.camera.rotation.z = Math.sin(this.menuT * 0.22) * 0.006
    this.camera.updateMatrixWorld(true)
  }

  updateDeath(dt) {
    this.deathT += dt
    const t = Math.min(1, this.deathT / 1.1)
    const ease = t * t * (3 - 2 * t)
    this.camera.position.set(this.player.pos.x, lerp(1.66, 0.55, ease), this.player.pos.z)
    this.camera.rotation.y = this.player.yaw
    this.camera.rotation.x = lerp(this.player.pitch, -0.35, ease)
    this.camera.rotation.z = lerp(0, 0.55, ease)
    this.camera.updateMatrixWorld(true)
  }

  update(dt) {
    this.elapsed += dt
    this.world.update(dt, this.elapsed)
    this.effects.update(dt)
    this.audio.update(dt)

    if (this.state === 'menu') {
      this.updateMenu(dt)
    } else if (this.state === 'playing') {
      this.updatePlayer(dt)
      this.updateEnemies(dt)
      this.updateWave(dt)
    } else if (this.state === 'dead') {
      this.updateDeath(dt)
      this.updateEnemies(dt)
    } else if (this.state === 'paused') {
      this.camera.updateMatrixWorld(true)
    }
  }

  loop() {
    requestAnimationFrame(this.loop)
    const now = performance.now()
    const dt = Math.min((now - this.lastTime) / 1000, 0.05)
    this.lastTime = now
    this.update(dt)
    this.renderer.render(this.scene, this.camera)
  }
}

function movementConstrained(game) {
  const move = game.input.getMove()
  return move.magnitude < 0.3
}

window.addEventListener('error', (e) => {
  console.error(e.message)
})

try {
  new Game()
} catch (err) {
  console.error(err)
}
