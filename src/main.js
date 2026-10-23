import * as THREE from 'three'
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js'
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js'
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js'
import { createWorld } from './world.js'
import { initTextures, setTextureRenderer } from './textures.js'
import { AudioEngine } from './audio.js'
import { Effects } from './effects.js'
import { Weapon } from './weapon.js'
import { EnemyManager } from './enemies.js'
import { InputManager } from './input.js'
import { HUD } from './hud.js'

const state = {
  mode: 'menu',
  wave: 1,
  score: 0,
  kills: 0,
  health: 100,
  time: 0,
  waveActive: false,
  intermission: 0,
  timeSinceDamage: 0,
  deathTime: 0,
  deathShown: false,
  waveCompleteShown: false
}

const isTouch = window.matchMedia('(pointer: coarse)').matches || navigator.maxTouchPoints > 0
const urlParams = new URLSearchParams(location.search)
const qualityParam = urlParams.get('quality')
const lowQuality = qualityParam === 'low' || (qualityParam !== 'high' && detectSoftwareRenderer())

function detectSoftwareRenderer() {
  try {
    const c = document.createElement('canvas')
    const gl = c.getContext('webgl2') || c.getContext('webgl')
    if (!gl) return true
    const ext = gl.getExtension('WEBGL_debug_renderer_info')
    const name = ext ? String(gl.getParameter(ext.UNMASKED_RENDERER_WEBGL)) : ''
    const lose = gl.getExtension('WEBGL_lose_context')
    if (lose) lose.loseContext()
    return /swiftshader|llvmpipe|software|basic render/i.test(name)
  } catch (e) {
    return false
  }
}

let renderer, scene, camera, composer, bloom, gradePass, world, effects, weapon, enemies, audio, input, hud
let viewScene, viewCamera, flashLight
let clock
let textureAssets
let menuTime = 0

const player = {
  pos: new THREE.Vector3(0, 0, 21),
  vel: new THREE.Vector3(),
  yaw: 0,
  pitch: 0,
  vY: 0,
  grounded: true,
  eye: 1.72,
  bobTime: 0,
  bobY: 0,
  bobX: 0,
  roll: 0,
  distance: 0,
  stepDist: 0,
  recoilPitch: 0,
  recoilYaw: 0,
  shake: 0,
  fov: 66,
  lastHealthShown: 100,
  moving: false,
  sprinting: false
}

const raycaster = new THREE.Raycaster()
const tempVec = new THREE.Vector3()
const tempVec2 = new THREE.Vector3()
const tempDir = new THREE.Vector3()

const callbacks = {
  onPlayerDamage: damagePlayer
}

function boot() {
  const canvas = document.getElementById('game-canvas')
  try {
    renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: !lowQuality,
      powerPreference: 'high-performance',
      stencil: false
    })
  } catch (err) {
    document.getElementById('boot-error').classList.remove('hidden')
    console.error(err)
    return
  }
  if (!renderer.capabilities.isWebGL2) {
    document.getElementById('boot-error').classList.remove('hidden')
    return
  }

  renderer.setPixelRatio(lowQuality ? 1 : Math.min(window.devicePixelRatio || 1, isTouch ? 1.6 : 2))
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.outputColorSpace = THREE.SRGBColorSpace
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 0.9
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap
  renderer.autoClear = false

  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(66, window.innerWidth / window.innerHeight, 0.05, 700)
  camera.rotation.order = 'YXZ'
  scene.add(camera)

  viewScene = new THREE.Scene()
  viewCamera = new THREE.PerspectiveCamera(52, window.innerWidth / window.innerHeight, 0.01, 12)

  setTextureRenderer(renderer)
  hud = new HUD()
  input = new InputManager()
  audio = new AudioEngine()

  document.getElementById('device-tag').textContent = isTouch ? 'MOBILE / TABLET' : 'DESKTOP'
  if (isTouch) {
    document.querySelectorAll('.desktop-only').forEach((el) => el.style.display = 'none')
    document.querySelectorAll('.mobile-only').forEach((el) => el.style.display = 'flex')
  }

  const deployBtn = document.getElementById('btn-deploy')
  const deployLabel = deployBtn.querySelector('.deploy-label')
  const deploySub = deployBtn.querySelector('.deploy-sub')
  deployLabel.textContent = 'CARREGANDO'
  deploySub.textContent = 'PREPARANDO O SETOR'
  deployBtn.disabled = true

  clock = new THREE.Clock()

  initGame().then(() => {
    deployLabel.textContent = 'IMPLANTAR'
    deploySub.textContent = 'TOQUE PARA INICIAR'
    deployBtn.disabled = false
    requestAnimationFrame(loop)
  }).catch((err) => {
    console.error(err)
    document.getElementById('boot-error').classList.remove('hidden')
  })
}

async function initGame() {
  textureAssets = initTextures()
  world = await createWorld(scene, renderer, { mobile: isTouch })
  scene.environment = scene.environment

  effects = new Effects(scene, camera, textureAssets, isTouch)

  enemyManagerInit()

  // post processing (skipped when running on a software rasterizer)
  if (!lowQuality) {
    const size = renderer.getDrawingBufferSize(new THREE.Vector2())
    const rt = new THREE.WebGLRenderTarget(size.x, size.y, {
      type: THREE.HalfFloatType,
      samples: isTouch ? 0 : 4
    })
    composer = new EffectComposer(renderer, rt)
    composer.setPixelRatio(renderer.getPixelRatio())
    composer.setSize(window.innerWidth, window.innerHeight)
    composer.addPass(new RenderPass(scene, camera))
    bloom = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), isTouch ? 0.24 : 0.33, 0.62, 0.9)
    composer.addPass(bloom)
    composer.addPass(new OutputPass())
    gradePass = new ShaderPass(GradeShader)
    gradePass.uniforms.resolution.value.set(size.x, size.y)
    composer.addPass(gradePass)
  }

  flashLight = new THREE.PointLight(0xffc07a, 0, 18, 2)
  scene.add(flashLight)

  weapon = new Weapon({
    viewScene,
    viewCamera,
    camera,
    audio,
    effects,
    textures: textureAssets,
    envMap: scene.environment,
    isMobile: isTouch,
    callbacks: {
      onShoot: handleShot,
      onRecoil: (pitch, yaw) => {
        player.recoilPitch += pitch
        player.recoilYaw += yaw
      },
      onAmmoChange: (a) => hud.setAmmo(a),
      onReloadStart: () => hud.reloadStart(),
      onReloadEnd: () => hud.reloadEnd(),
      onADS: (v) => {
        hud.setCrosshairAim(v)
        if (isTouch) document.getElementById('btn-ads').classList.toggle('ads-on', v)
      },
      onMuzzleFlash: (muzzle) => {
        flashLight.position.copy(muzzle)
        flashLight.intensity = 55 + Math.random() * 25
      }
    }
  })
  weapon.group.visible = false

  enemies = new EnemyManager(scene, world, effects, audio, textureAssets, isTouch, callbacks)

  input.onPause = pauseGame
  input.onReload = () => { if (state.mode === 'playing') weapon.reload() }
  input.onFirstTouch = () => audio.resume()
  input.attach(renderer.domElement)
  if (!isTouch) input.isTouch = false

  setupUI()
  setupResize()
  setupVisibility()

  camera.position.set(8, 6, 26)
  camera.lookAt(0, 1.5, -6)
  hud.setAmmo({ mag: 30, reserve: 120 })
  hud.setHealth(100)
  hud.setScore(0, 0)
  hud.update(0, {
    yaw: 0, playerPos: player.pos, enemies: [], world, health: 100,
    reloading: false, reloadProgress: 0, ads: false, moving: false
  })
}

function enemyManagerInit() {
  // placeholder to keep boot order readable; real manager created after weapon
}

function setupUI() {
  document.getElementById('btn-deploy').addEventListener('click', () => {
    if (document.getElementById('btn-deploy').disabled) return
    startGame()
  })
  document.getElementById('btn-pause').addEventListener('click', () => {
    if (state.mode === 'playing') pauseGame()
  })
  document.getElementById('btn-resume').addEventListener('click', () => {
    resumeGame()
  })
  document.getElementById('btn-restart').addEventListener('click', () => {
    restartGame()
  })
  document.getElementById('btn-redeploy').addEventListener('click', () => {
    restartGame()
  })
  const rotate = document.getElementById('rotate-hint')
  rotate.addEventListener('click', () => rotate.classList.add('hidden'))
  updateRotateHint()
}

function updateRotateHint() {
  const rotate = document.getElementById('rotate-hint')
  if (!rotate) return
  const portrait = isTouch && window.matchMedia('(orientation: portrait)').matches && window.innerWidth <= 820
  rotate.classList.toggle('hidden', !portrait)
}

function setupResize() {
  const onResize = () => {
    const w = window.innerWidth
    const h = window.innerHeight
    camera.aspect = w / h
    camera.updateProjectionMatrix()
    viewCamera.aspect = w / h
    viewCamera.updateProjectionMatrix()
    renderer.setSize(w, h)
    if (composer) {
      composer.setPixelRatio(renderer.getPixelRatio())
      composer.setSize(w, h)
    }
    if (gradePass) gradePass.uniforms.resolution.value.set(w * renderer.getPixelRatio(), h * renderer.getPixelRatio())
    effects.setScale(renderer.domElement.height, camera.fov)
  }
  window.addEventListener('resize', onResize)
  window.addEventListener('orientationchange', onResize)
  onResize()
  updateRotateHint()
}

function setupVisibility() {
  document.addEventListener('visibilitychange', () => {
    if (document.hidden && state.mode === 'playing') pauseGame()
  })
  document.addEventListener('pointerlockchange', () => {
    if (state.mode === 'playing' && !isTouch && document.pointerLockElement === null) {
      pauseGame()
    }
  })
}

function startGame() {
  audio.init()
  if (isTouch) {
    const el = document.documentElement
    if (el.requestFullscreen) el.requestFullscreen().catch(() => {})
    if (screen.orientation?.lock) screen.orientation.lock('landscape').catch(() => {})
  } else {
    renderer.domElement.requestPointerLock?.()
  }
  document.getElementById('start-screen').classList.add('hidden')
  document.getElementById('btn-pause').classList.remove('hidden')
  hud.show()
  hud.showTouch(isTouch)
  hud.setAmmo({ mag: weapon.mag, reserve: weapon.reserve })
  hud.setHealth(100)
  hud.setScore(0, 0)
  input.setEnabled(true)
  player.pos.copy(world.playerSpawn)
  player.pos.y = 0
  player.yaw = 0
  player.pitch = -0.02
  player.vY = 0
  player.grounded = true
  state.mode = 'playing'
  state.wave = 0
  state.score = 0
  state.kills = 0
  state.health = 100
  state.timeSinceDamage = 0
  weapon.group.visible = true
  weapon.reset()
  enemies.reset()
  input.sensitivity = isTouch ? 0.0040 : 0.00215
  startWave(1)
  updateRotateHint()
}

function startWave(n) {
  state.wave = n
  state.waveActive = true
  state.waveCompleteShown = false
  state.intermission = 0
  const count = 4 + Math.min(11, Math.floor(n * 1.6))
  enemies.queueWave(count, n)
  hud.showWave(n, `${count} HOSTIS A CAMINHO`)
  hud.setObjective(`HOSTIS RESTANTES: ${count}`)
  audio.waveStart()
}

function completeWave() {
  state.waveActive = false
  state.intermission = 5.5
  state.waveCompleteShown = true
  state.score += 250 * state.wave
  hud.setScore(state.score, state.kills)
  hud.showWave(state.wave, 'SETOR LIMPO')
  hud.setObjective('PREPARANDO PRÓXIMA ONDA')
  audio.waveClear()
  weapon.refillReserve(60)
  state.health = Math.min(100, state.health + 25)
  hud.setHealth(state.health)
}

function pauseGame() {
  if (state.mode !== 'playing') return
  state.mode = 'paused'
  input.setEnabled(false)
  weapon.stopFire()
  if (!isTouch) document.exitPointerLock?.()
  hud.showPause(state.wave, state.kills, state.score)
}

function resumeGame() {
  if (state.mode !== 'paused') return
  state.mode = 'playing'
  input.setEnabled(true)
  hud.hidePause()
  if (!isTouch) renderer.domElement.requestPointerLock?.()
  audio.ui()
}

function restartGame() {
  hud.hidePause()
  hud.hideDeath()
  enemies.reset()
  weapon.reset()
  player.pos.copy(world.playerSpawn)
  player.pos.y = 0
  player.yaw = 0
  player.pitch = -0.02
  player.vY = 0
  player.recoilPitch = 0
  player.recoilYaw = 0
  player.grounded = true
  state.health = 100
  state.score = 0
  state.kills = 0
  state.timeSinceDamage = 0
  state.deathShown = false
  state.deathTime = 0
  state.waveActive = false
  state.intermission = 0
  hud.setAmmo({ mag: weapon.mag, reserve: weapon.reserve })
  hud.setHealth(100)
  hud.setScore(0, 0)
  hud.reloadEnd()
  hud.hideDeath()
  hud.show()
  hud.showTouch(isTouch)
  document.getElementById('btn-pause').classList.remove('hidden')
  input.setEnabled(true)
  if (!isTouch) renderer.domElement.requestPointerLock?.()
  else audio.resume()
  state.mode = 'playing'
  startWave(1)
  updateRotateHint()
}

function playerDie() {
  if (state.mode !== 'playing') return
  state.mode = 'dead'
  state.deathTime = 0
  input.setEnabled(false)
  weapon.stopFire()
  weapon.trigger = false
  hud.showTouch(false)
  document.getElementById('btn-pause').classList.add('hidden')
  if (!isTouch) document.exitPointerLock?.()
  hud.showDeath(state.wave, state.kills, state.score)
  state.deathShown = true
}

function damagePlayer(amount, source) {
  if (state.mode !== 'playing') return
  state.health = Math.max(0, state.health - amount)
  state.timeSinceDamage = 0
  player.shake = Math.min(0.045, player.shake + 0.018)
  hud.setHealth(state.health)
  hud.damage(amount, source, player.yaw, player.pos)
  audio.hurt()
  if (state.health <= 0) playerDie()
}

function handleShot(origin, dir, muzzle) {
  tempDir.copy(dir).normalize()
  raycaster.set(origin, tempDir)
  raycaster.near = 0.1
  raycaster.far = 240
  const enemyMeshes = enemies.getHitMeshes()
  const targets = enemyMeshes.concat(world.blockers)
  const hits = raycaster.intersectObjects(targets, false)
  let hitPoint = null
  let closest = null
  for (const h of hits) {
    if (!h.object.visible) continue
    if (h.object.userData.enemy || h.object.userData.part) {
      closest = h
      break
    }
    closest = h
    break
  }
  if (closest) {
    hitPoint = closest.point
    if (closest.object.userData.enemy) {
      const res = enemies.handleHit(closest.object, 34, closest.point, tempDir)
      if (res) {
        effects.bloodHit(closest.point, tempDir)
        hud.hitmarker(res.headshot, res.killed)
        audio.hitmarker(res.headshot)
        if (res.killed) {
          audio.kill()
          const bonus = res.headshot ? 150 : 100
          state.score += bonus
          state.kills++
          hud.setScore(state.score, state.kills)
          hud.killfeed(res.headshot)
          for (let i = 0; i < 6; i++) {
            effects.dust.spawn(closest.point.x, closest.point.y, closest.point.z,
              (Math.random() - 0.5) * 1.2, Math.random() * 1.2, (Math.random() - 0.5) * 1.2,
              { life: 0.7, size: 0.08, color: [0.3, 0.05, 0.02], gravity: 0.4, drag: 0.93, grow: 2 })
          }
        }
      }
    } else {
      const normal = closest.face ? closest.face.normal.clone().transformDirection(closest.object.matrixWorld) : new THREE.Vector3(0, 1, 0)
      const mat = closest.object.material
      const kind = mat && (mat.metalness > 0.4) ? 'metal' : 'concrete'
      effects.impact(closest.point, normal, kind)
      audio.impact((Math.random() - 0.5) * 0.4)
    }
    effects.tracer(muzzle, hitPoint)
  } else {
    hitPoint = origin.clone().addScaledVector(tempDir, 120)
    effects.tracer(muzzle, hitPoint)
  }
}

function updatePlayer(dt) {
  const look = input.consumeLook()
  const adsFactor = weapon.ads ? 0.55 : 1
  player.yaw -= look.x * adsFactor
  player.pitch -= look.y * adsFactor
  player.pitch = THREE.MathUtils.clamp(player.pitch, -1.42, 1.42)
  if (player.yaw > Math.PI) player.yaw -= Math.PI * 2
  if (player.yaw < -Math.PI) player.yaw += Math.PI * 2

  const move = input.moveVec
  const forwardAmt = -move.y
  const sprinting = (input.sprinting || (isTouch && input.sprint)) && !weapon.ads && forwardAmt > 0.25
  const speed = weapon.ads ? 2.4 : sprinting ? 7.1 : 4.5
  let wx = -Math.sin(player.yaw) * forwardAmt + Math.cos(player.yaw) * move.x
  let wz = -Math.cos(player.yaw) * forwardAmt - Math.sin(player.yaw) * move.x
  const wl = Math.hypot(wx, wz)
  if (wl > 1) { wx /= wl; wz /= wl }
  const accel = player.grounded ? 13 : 4
  player.vel.x += (wx * speed - player.vel.x) * Math.min(1, dt * accel)
  player.vel.z += (wz * speed - player.vel.z) * Math.min(1, dt * accel)

  if (input.jump && player.grounded) {
    player.vY = 4.6
    player.grounded = false
  }
  player.vY -= 13.5 * dt
  player.pos.x += player.vel.x * dt
  player.pos.z += player.vel.z * dt
  player.pos.y += player.vY * dt
  if (player.pos.y <= 0) {
    if (!player.grounded && player.vY < -3) player.shake = Math.min(0.05, player.shake + 0.012)
    player.pos.y = 0
    player.vY = 0
    player.grounded = true
  }
  world.resolveCollisions(player.pos, 0.34)

  const horizSpeed = Math.hypot(player.vel.x, player.vel.z)
  player.moving = horizSpeed > 0.35
  player.sprinting = sprinting && player.moving
  if (player.grounded && player.moving) {
    player.bobTime += dt * (player.sprinting ? 10.5 : 7.2) * Math.min(1.2, horizSpeed / 4)
    player.stepDist += horizSpeed * dt
    if (player.stepDist > (player.sprinting ? 2.0 : 1.55)) {
      player.stepDist = 0
      audio.footstep(player.sprinting)
      player.shake = Math.min(0.02, player.shake + 0.002)
    }
  }
  const bobBase = player.grounded && player.moving ? (player.sprinting ? 1.35 : 0.9) : 0
  player.bobY = Math.abs(Math.sin(player.bobTime)) * 0.026 * bobBase
  player.bobX = Math.sin(player.bobTime) * 0.017 * bobBase
  player.roll = -move.x * 0.012 * (weapon.ads ? 0.35 : 1)

  // recoil recovery
  player.recoilPitch *= Math.pow(0.002, dt)
  player.recoilYaw *= Math.pow(0.002, dt)
  player.shake *= Math.pow(0.0005, dt)

  // weapon
  weapon.trigger = input.firing
  weapon.update(dt, {
    moving: player.moving,
    sprinting: player.sprinting,
    grounded: player.grounded,
    lookX: look.x,
    lookY: look.y
  })

  // reload input
  if (input.reload) weapon.reload()

  // health regen
  state.timeSinceDamage += dt
  if (state.timeSinceDamage > 4.6 && state.health < 100 && state.mode === 'playing') {
    state.health = Math.min(100, state.health + 9 * dt)
    const shown = Math.round(state.health)
    if (shown !== player.lastHealthShown) {
      player.lastHealthShown = shown
      hud.setHealth(state.health)
    }
  }

  // ADS fov
  const targetFov = weapon.ads ? 46 : player.sprinting ? 70 : 66
  player.fov += (targetFov - player.fov) * Math.min(1, dt * 9)
  camera.fov = player.fov
  camera.updateProjectionMatrix()

  // camera transform
  const adsDip = weapon.adsBlend * 0.015
  const eyeY = player.eye + player.pos.y + player.bobY - adsDip
  camera.position.set(player.pos.x + player.bobX * 0.4, eyeY, player.pos.z)
  const shake = player.shake
  const shakeX = (Math.random() - 0.5) * shake
  const shakeY = (Math.random() - 0.5) * shake
  camera.position.x += shakeX
  camera.position.y += shakeY
  camera.rotation.set(
    player.pitch + player.recoilPitch + (Math.random() - 0.5) * shake * 0.6,
    player.yaw + player.recoilYaw + (Math.random() - 0.5) * shake * 0.6,
    player.roll + (Math.random() - 0.5) * shake * 0.4
  )

  // touch fire/ads
  if (input.ads !== weapon.ads) weapon.setADS(input.ads)

  // muzzle light decay
  if (flashLight.intensity > 0.01) {
    flashLight.intensity *= Math.pow(0.0001, dt)
  }

  // h
  if (state.waveActive) {
    const remaining = enemies.aliveCount + enemies.pendingCount
    hud.setObjective(`HOSTIS RESTANTES: ${remaining}`)
  }
}

function updateWaves(dt) {
  if (state.waveActive && enemies.aliveCount === 0 && enemies.pendingCount === 0) {
    completeWave()
  }
  if (!state.waveActive && state.intermission > 0) {
    state.intermission -= dt
    if (state.intermission <= 0) startWave(state.wave + 1)
  }
}

function updateMenuCamera(dt) {
  menuTime += dt
  const t = menuTime
  camera.position.set(Math.cos(t * 0.055) * 25, 5.4 + Math.sin(t * 0.07) * 1.2, Math.sin(t * 0.055) * 25)
  camera.lookAt(0, 1.4, -5)
  camera.fov = 55
  camera.updateProjectionMatrix()
}

function updateDeath(dt) {
  state.deathTime += dt
  const k = Math.min(1, state.deathTime / 1.4)
  const ease = k * k
  camera.position.y = player.eye - ease * 1.25
  camera.rotation.set(player.pitch - ease * 0.5, player.yaw + ease * 0.25, player.roll + ease * 1.05)
  if (flashLight.intensity > 0.01) flashLight.intensity *= Math.pow(0.0001, dt)
}

let lastHudHealth = 100
function loop() {
  requestAnimationFrame(loop)
  const dt = Math.min(0.05, clock.getDelta())
  state.time += dt

  if (state.mode === 'menu') {
    updateMenuCamera(dt)
    world.update(dt, camera)
    effects.update(dt)
  } else if (state.mode === 'playing') {
    updatePlayer(dt)
    updateWaves(dt)
    enemies.update(dt, tempVec.set(player.pos.x, player.eye + player.pos.y, player.pos.z), player.moving, player.sprinting)
    if (input.pauseRequested) { input.pauseRequested = false }
    effects.update(dt)
    world.update(dt, camera)
    hud.update(dt, {
      yaw: player.yaw,
      playerPos: player.pos,
      enemies: enemies.active,
      world,
      health: state.health,
      reloading: weapon.reloading,
      reloadProgress: weapon.reloadTime / weapon.reloadDuration,
      ads: weapon.ads,
      moving: player.moving
    })
    if (Math.round(state.health) !== lastHudHealth) {
      lastHudHealth = Math.round(state.health)
      hud.setHealth(state.health)
    }
    if (state.mode === 'playing' && audio.enabled && Math.random() < dt * 0.035) {
      audio.distantBattle()
    }
  } else if (state.mode === 'paused') {
    world.update(dt * 0.15, camera)
    effects.update(dt * 0.15)
  } else if (state.mode === 'dead') {
    updateDeath(dt)
    enemies.update(dt * 0.25, tempVec.set(player.pos.x, player.eye + player.pos.y, player.pos.z), false, false)
    effects.update(dt * 0.4)
    world.update(dt * 0.3, camera)
  }

  if (gradePass) gradePass.uniforms.time.value = state.time
  renderer.setRenderTarget(null)
  if (composer) composer.render(dt)
  else { renderer.clear(); renderer.render(scene, camera) }

  if (state.mode !== 'menu') {
    renderer.clearDepth()
    renderer.render(viewScene, viewCamera)
  }
}


const GradeShader = {
  uniforms: {
    tDiffuse: { value: null },
    time: { value: 0 },
    resolution: { value: new THREE.Vector2(1, 1) }
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D tDiffuse;
    uniform float time;
    uniform vec2 resolution;
    varying vec2 vUv;
    float rand(vec2 co) {
      return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453);
    }
    void main() {
      vec4 src = texture2D(tDiffuse, vUv);
      vec3 col = src.rgb;
      float l = dot(col, vec3(0.2126, 0.7152, 0.0722));
      col = mix(vec3(l), col, 1.13);
      col = (col - 0.5) * 1.075 + 0.5;
      col += vec3(-0.010, 0.002, 0.014) * (1.0 - smoothstep(0.02, 0.42, l));
      col += vec3(0.010, 0.003, -0.006) * smoothstep(0.55, 1.0, l);
      float d = distance(vUv, vec2(0.5));
      col *= 1.0 - 0.26 * smoothstep(0.3, 0.92, d);
      col += (rand(vUv * resolution + time) - 0.5) * 0.022;
      gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
    }
  `
}

boot()

window.__dustline = {
  get quality() { return lowQuality ? 'low' : 'high' },
  get state() { return state },
  get player() { return player },
  get camera() { return camera },
  get weapon() { return weapon },
  get input() { return input },
  get hud() { return hud },
  handleShot,
  get enemies() { return enemies },
  get world() { return world },
  startGame,
  restartGame,
  pauseGame,
  resumeGame
}
