import * as THREE from 'three'
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js'

const HIP_POS = new THREE.Vector3(0.15, -0.16, -0.62)
const ADS_POS = new THREE.Vector3(0, -0.0507, -0.46)
const SPRINT_POS = new THREE.Vector3(0.20, -0.255, -0.60)
const HIP_ROT = { x: -0.02, y: 0.10, z: 0.025 }
const RELOAD_ROT = new THREE.Euler(-0.15, 0.4, 0.75)

export class Weapon {
  constructor({ viewScene, viewCamera, camera, audio, effects, textures, envMap, isMobile, callbacks }) {
    this.viewScene = viewScene
    this.viewCamera = viewCamera
    this.camera = camera
    this.audio = audio
    this.effects = effects
    this.isMobile = isMobile
    this.cb = callbacks
    this.T = textures

    this.magSize = 30
    this.mag = 30
    this.reserve = 120
    this.rpm = 720
    this.fireInterval = 60 / this.rpm
    this.lastShot = -10
    this.trigger = false
    this.triggerDownTime = 0
    this.ads = false
    this.adsBlend = 0
    this.sprinting = false
    this.reloading = false
    this.reloadTime = 0
    this.reloadDuration = 2.05
    this.reloadPhase = -1
    this.recoil = 0
    this.recoilRot = 0
    this.kickSide = 0
    this.swayX = 0
    this.swayY = 0
    this.lookSwayX = 0
    this.lookSwayY = 0
    this.bobTime = 0
    this.flashTime = 0
    this.flashLife = 0.055
    this.crosshairSpread = 0
    this.shotCount = 0

    this.group = new THREE.Group()
    this.group.position.copy(HIP_POS)
    viewScene.add(this.group)
    this.magMesh = null
    this.magHome = new THREE.Vector3()
    this.magAnim = 0
    this.charging = null

    this._m = new THREE.Matrix4()
    this._v = new THREE.Vector3()
    this.group.scale.setScalar(0.65)
    this.build()
    this.buildLighting(envMap)
    this.viewCamera.fov = 55
    this.viewCamera.updateProjectionMatrix()
  }

  buildLighting(envMap) {
    if (envMap) this.viewScene.environment = envMap
    const key = new THREE.DirectionalLight(0xffd2a0, 3.1)
    key.position.set(-2.5, 3.2, 2.2)
    this.viewScene.add(key)
    const rim = new THREE.DirectionalLight(0x7fa9c8, 1.6)
    rim.position.set(3.0, 1.2, -2.5)
    const frontFill = new THREE.DirectionalLight(0xffe5c0, 0.9)
    frontFill.position.set(0.4, 0.4, 2.5)
    this.viewScene.add(frontFill)
    this.viewScene.add(rim)
    const fill = new THREE.HemisphereLight(0x8e9dae, 0x3a3127, 0.55)
    this.viewScene.add(fill)
    this.flashLight = new THREE.PointLight(0xffc27a, 0, 3, 2)
    this.flashLight.position.set(0, 0.05, -0.6)
    this.viewScene.add(this.flashLight)
  }

  build() {
    const T = this.T
    const gm = new THREE.MeshStandardMaterial({
      map: T.gunmetal.map,
      normalMap: T.gunmetal.normalMap,
      roughnessMap: T.gunmetal.roughnessMap,
      color: 0x63665f,
      metalness: 0.78,
      roughness: 0.38,
      envMapIntensity: 1.1
    })
    const gunmetal = new THREE.MeshStandardMaterial({
      color: 0x353936, metalness: 0.8, roughness: 0.36, envMapIntensity: 1.3
    })
    const polymer = new THREE.MeshStandardMaterial({
      color: 0x171a18, metalness: 0.12, roughness: 0.68, envMapIntensity: 0.7
    })
    const tanPoly = new THREE.MeshStandardMaterial({
      color: 0x66573f, metalness: 0.08, roughness: 0.74, envMapIntensity: 0.6
    })
    const tanDark = new THREE.MeshStandardMaterial({
      color: 0x413828, metalness: 0.1, roughness: 0.8
    })
    const glove = new THREE.MeshStandardMaterial({
      color: 0x44412f, roughness: 0.9, metalness: 0.02
    })
    const glovePad = new THREE.MeshStandardMaterial({
      color: 0x25261f, roughness: 0.88, metalness: 0.02
    })
    const sleeve = new THREE.MeshStandardMaterial({
      color: 0x5c5842, roughness: 0.97, metalness: 0
    })
    const sleeveCamo = new THREE.MeshStandardMaterial({
      color: 0x494c3c, roughness: 0.98, metalness: 0
    })
    const lensMat = new THREE.MeshPhysicalMaterial({
      color: 0x240605, metalness: 0.1, roughness: 0.06, transmission: 0.0,
      emissive: 0x220000, emissiveIntensity: 1, envMapIntensity: 2.2, transparent: true, opacity: 0.92
    })
    const brass = new THREE.MeshStandardMaterial({ color: 0xb08b4a, metalness: 0.9, roughness: 0.32 })

    const add = (geo, mat, x, y, z, rx = 0, ry = 0, rz = 0, parent = this.group) => {
      const m = new THREE.Mesh(geo, mat)
      m.position.set(x, y, z)
      m.rotation.set(rx, ry, rz)
      m.castShadow = false
      m.receiveShadow = false
      parent.add(m)
      return m
    }

    // ---- receiver ----
    add(new RoundedBoxGeometry(0.074, 0.084, 0.30, 3, 0.012), gm, 0, 0.006, -0.075)
    add(new RoundedBoxGeometry(0.062, 0.058, 0.22, 2, 0.008), gunmetal, 0, -0.036, -0.045)
    // upper rail
    add(new THREE.BoxGeometry(0.036, 0.012, 0.30), gunmetal, 0, 0.053, -0.09)
    for (let i = 0; i < 7; i++) {
      add(new THREE.BoxGeometry(0.04, 0.006, 0.014), gunmetal, 0, 0.058, -0.2 + i * 0.038)
    }
    // ejection port + brass deflector
    add(new THREE.BoxGeometry(0.006, 0.028, 0.062), brass, 0.0375, 0.012, -0.045)
    add(new THREE.BoxGeometry(0.012, 0.02, 0.028), gunmetal, 0.041, 0.026, -0.095, 0, 0, 0.25)
    // charging handle
    add(new THREE.BoxGeometry(0.045, 0.012, 0.022), gunmetal, 0, 0.032, 0.072)
    // forward assist
    add(new THREE.CylinderGeometry(0.012, 0.012, 0.03, 8), gunmetal, 0.040, 0.012, -0.045, 0, 0, Math.PI / 2)
    // safety selector
    add(new THREE.CylinderGeometry(0.009, 0.009, 0.012, 10), gunmetal, -0.038, -0.028, -0.025, 0, 0, Math.PI / 2)
    // mag release
    add(new THREE.BoxGeometry(0.012, 0.018, 0.016), gunmetal, 0.038, -0.043, -0.045)

    // ---- handguard ----
    const hg = add(new RoundedBoxGeometry(0.078, 0.076, 0.25, 3, 0.012), tanPoly, 0, 0.004, -0.30)
    add(new THREE.BoxGeometry(0.058, 0.058, 0.255), gunmetal, 0, 0.004, -0.30)
    // side rails / slots
    for (let i = 0; i < 7; i++) {
      add(new THREE.BoxGeometry(0.082, 0.008, 0.02), tanDark, 0, 0.004, -0.395 + i * 0.03)
    }
    for (let i = 0; i < 3; i++) {
      add(new THREE.BoxGeometry(0.006, 0.05, 0.022), tanDark, -0.041, 0.004, -0.39 + i * 0.07)
      add(new THREE.BoxGeometry(0.006, 0.05, 0.022), tanDark, 0.041, 0.004, -0.39 + i * 0.07)
    }
    // top rail section
    add(new THREE.BoxGeometry(0.034, 0.011, 0.23), gunmetal, 0, 0.048, -0.30)
    for (let i = 0; i < 6; i++) {
      add(new THREE.BoxGeometry(0.038, 0.006, 0.012), gunmetal, 0, 0.054, -0.39 + i * 0.036)
    }

    // ---- barrel ----
    add(new THREE.CylinderGeometry(0.016, 0.017, 0.30, 12), gunmetal, 0, 0.006, -0.50, Math.PI / 2)
    add(new THREE.CylinderGeometry(0.021, 0.023, 0.065, 12), gunmetal, 0, 0.006, -0.625, Math.PI / 2)
    // muzzle brake slots
    for (let i = 0; i < 4; i++) {
      add(new THREE.BoxGeometry(0.048, 0.008, 0.008), gunmetal, 0, 0.021, -0.638 + i * 0.012)
    }
    add(new THREE.CylinderGeometry(0.011, 0.011, 0.02, 10), new THREE.MeshStandardMaterial({ color: 0x050505, roughness: 1 }), 0, 0.006, -0.66, Math.PI / 2)
    // gas block
    add(new THREE.BoxGeometry(0.03, 0.034, 0.035), gunmetal, 0, -0.003, -0.43)
    add(new THREE.CylinderGeometry(0.005, 0.005, 0.22, 6), gunmetal, 0, 0.016, -0.43, Math.PI / 2)

    // ---- stock ----
    add(new THREE.CylinderGeometry(0.016, 0.016, 0.1, 8), gunmetal, 0, -0.006, 0.10, Math.PI / 2)
    const stock = add(new RoundedBoxGeometry(0.055, 0.075, 0.20, 2, 0.012), tanPoly, 0, -0.012, 0.20)
    stock.rotation.x = -0.03
    add(new THREE.BoxGeometry(0.057, 0.078, 0.02), polymer, 0, -0.015, 0.305)
    add(new THREE.BoxGeometry(0.044, 0.013, 0.13), polymer, 0, 0.032, 0.19)
    add(new THREE.BoxGeometry(0.005, 0.02, 0.1), gunmetal, -0.029, -0.004, 0.21)
    add(new THREE.BoxGeometry(0.02, 0.036, 0.09), tanDark, 0, -0.048, 0.18)
    add(new THREE.BoxGeometry(0.035, 0.012, 0.06), tanDark, 0.031, -0.035, 0.16, 0, 0, -0.18)
    for (let i = 0; i < 3; i++) {
      add(new THREE.BoxGeometry(0.058, 0.006, 0.012), tanDark, 0, -0.042 + i * 0.016, 0.309)
    }
    add(new THREE.TorusGeometry(0.008, 0.0025, 5, 10), gunmetal, -0.028, -0.012, 0.135, 0, Math.PI / 2)
    // receiver / magwell detail
    add(new RoundedBoxGeometry(0.072, 0.062, 0.085, 2, 0.008), gunmetal, 0, -0.06, -0.075)
    add(new THREE.BoxGeometry(0.01, 0.016, 0.02), gunmetal, -0.041, -0.012, -0.02)
    add(new THREE.BoxGeometry(0.008, 0.026, 0.05), tanDark, 0.0405, 0.008, -0.105)
    add(new THREE.BoxGeometry(0.006, 0.02, 0.03), gunmetal, -0.0395, 0.022, -0.135)
    add(new THREE.CylinderGeometry(0.006, 0.006, 0.014, 8), gunmetal, -0.042, -0.028, -0.07, 0, 0, Math.PI / 2)
    // sling loop
    add(new THREE.TorusGeometry(0.011, 0.0035, 6, 10), gunmetal, -0.038, -0.012, 0.29, 0, Math.PI / 2)

    // ---- grip ----
    const grip = add(new RoundedBoxGeometry(0.048, 0.115, 0.062, 2, 0.01), polymer, 0, -0.098, 0.022)
    grip.rotation.x = -0.28
    for (let i = 0; i < 5; i++) {
      add(new THREE.BoxGeometry(0.05, 0.005, 0.006), tanDark, 0, -0.055 - i * 0.014, 0.052 + i * 0.004)
    }
    // trigger guard
    add(new THREE.TorusGeometry(0.026, 0.005, 6, 12, Math.PI), gunmetal, 0, -0.062, -0.005, 0, 0, Math.PI)
    add(new THREE.BoxGeometry(0.008, 0.024, 0.006), gunmetal, 0, -0.062, -0.03)

    // ---- magazine ----
    const magGroup = new THREE.Group()
    magGroup.position.set(0, -0.10, -0.055)
    this.group.add(magGroup)
    this.magMesh = magGroup
    this.magHome.copy(magGroup.position)
    const mag1 = new THREE.Mesh(new RoundedBoxGeometry(0.052, 0.15, 0.082, 2, 0.008), tanPoly)
    mag1.position.y = -0.035
    magGroup.add(mag1)
    for (let i = 0; i < 4; i++) {
      const rib = new THREE.Mesh(new THREE.BoxGeometry(0.054, 0.008, 0.084), tanDark)
      rib.position.set(0, -0.09 + i * 0.03, 0)
      magGroup.add(rib)
    }
    const mag2 = new THREE.Mesh(new RoundedBoxGeometry(0.05, 0.07, 0.078, 2, 0.008), tanPoly)
    mag2.position.set(0, -0.135, 0.012)
    mag2.rotation.x = 0.16
    magGroup.add(mag2)
    const floorPlate = new THREE.Mesh(new THREE.BoxGeometry(0.058, 0.014, 0.09), polymer)
    floorPlate.position.set(0, -0.172, 0.02)
    magGroup.add(floorPlate)

    // ---- optic (red dot) ----
    const optic = new THREE.Group()
    optic.position.set(0, 0.078, -0.055)
    this.group.add(optic)
    const mount = new THREE.Mesh(new THREE.BoxGeometry(0.032, 0.028, 0.085), gunmetal)
    mount.position.y = -0.024
    optic.add(mount)
    const tube = new THREE.Mesh(new THREE.CylinderGeometry(0.0205, 0.0205, 0.088, 16, 1, true), gunmetal)
    tube.rotation.x = Math.PI / 2
    optic.add(tube)
    const frontLens = new THREE.Mesh(new THREE.CircleGeometry(0.0185, 20), lensMat)
    frontLens.position.z = -0.045
    optic.add(frontLens)
    const backLens = new THREE.Mesh(new THREE.CircleGeometry(0.0185, 20), lensMat)
    backLens.position.z = 0.045
    backLens.rotation.y = Math.PI
    optic.add(backLens)
    const hoodTop = new THREE.Mesh(new THREE.CylinderGeometry(0.0235, 0.0235, 0.014, 16, 1, true), gunmetal)
    hoodTop.rotation.x = Math.PI / 2
    hoodTop.position.z = -0.042
    optic.add(hoodTop)
    for (const z of [-0.021, 0.021]) {
      const ring = new THREE.Mesh(new THREE.TorusGeometry(0.022, 0.0038, 6, 16), gunmetal)
      ring.position.z = z
      optic.add(ring)
    }
    const knob = new THREE.Mesh(new THREE.CylinderGeometry(0.010, 0.010, 0.014, 10), gunmetal)
    knob.position.set(0.024, 0.006, 0)
    knob.rotation.z = Math.PI / 2
    optic.add(knob)
    const knob2 = knob.clone()
    knob2.position.set(0, 0.024, 0)
    knob2.rotation.set(0, 0, 0)
    optic.add(knob2)
    this.reticle = new THREE.Sprite(new THREE.SpriteMaterial({
      map: this.T.glow, color: 0xff2a1a, transparent: true, opacity: 0.95,
      blending: THREE.AdditiveBlending, depthWrite: false, depthTest: false
    }))
    this.reticle.scale.setScalar(0.0065)
    this.reticle.position.set(0, 0, 0.044)
    optic.add(this.reticle)
    this.optic = optic

    // iron sights (front)
    add(new THREE.BoxGeometry(0.014, 0.03, 0.012), gunmetal, 0, 0.075, -0.60)
    add(new THREE.BoxGeometry(0.02, 0.007, 0.03), gunmetal, 0, 0.07, -0.585)
    for (const x of [-0.009, 0.009]) {
      add(new THREE.BoxGeometry(0.004, 0.03, 0.006), gunmetal, x, 0.09, -0.60)
    }

    // ---- hands ----
    const rightHand = new THREE.Group()
    rightHand.position.set(0.008, -0.098, 0.012)
    rightHand.scale.setScalar(0.85)
    this.group.add(rightHand)
    const rpalm = new THREE.Mesh(new RoundedBoxGeometry(0.062, 0.075, 0.078, 2, 0.018), glove)
    rpalm.rotation.x = -0.28
    rightHand.add(rpalm)
    const thumb = new THREE.Mesh(new RoundedBoxGeometry(0.018, 0.058, 0.022, 2, 0.008), glove)
    thumb.position.set(-0.03, 0.018, -0.045)
    thumb.rotation.set(0.25, 0.45, 0.3)
    rightHand.add(thumb)
    for (let i = 0; i < 4; i++) {
      const finger = new THREE.Mesh(new RoundedBoxGeometry(0.016, 0.036, 0.02, 2, 0.007), glovePad)
      finger.position.set(-0.022 + i * 0.0145, 0.012 - i * 0.002, -0.058)
      finger.rotation.set(-0.9, 0, 0.12 * (i - 1.5))
      rightHand.add(finger)
    }
    addLimbLocal(this.group, new THREE.Vector3(0.05, -0.11, 0.02), new THREE.Vector3(0.30, -0.52, 0.16), 0.037, sleeve)
    const rcuff = new THREE.Mesh(new THREE.CylinderGeometry(0.043, 0.039, 0.046, 10), sleeveCamo)
    rcuff.position.set(0.088, -0.19, 0.06)
    rcuff.rotation.set(0.9, 0, -0.62)
    this.group.add(rcuff)

    const leftHand = new THREE.Group()
    leftHand.position.set(-0.002, -0.042, -0.335)
    leftHand.scale.setScalar(0.9)
    this.group.add(leftHand)
    const lpalm = new THREE.Mesh(new RoundedBoxGeometry(0.052, 0.06, 0.095, 2, 0.016), glove)
    lpalm.rotation.set(0.05, 0.02, 0.1)
    leftHand.add(lpalm)
    const lthumb = new THREE.Mesh(new RoundedBoxGeometry(0.016, 0.05, 0.02, 2, 0.007), glove)
    lthumb.position.set(0.03, 0.024, 0.023)
    lthumb.rotation.set(-0.35, -0.5, 0.45)
    leftHand.add(lthumb)
    for (let i = 0; i < 4; i++) {
      const finger = new THREE.Mesh(new RoundedBoxGeometry(0.014, 0.028, 0.052, 2, 0.007), glovePad)
      finger.position.set(-0.024 + i * 0.016, 0.032, -0.018)
      finger.rotation.set(0.1, 0, -0.12)
      leftHand.add(finger)
    }
    addLimbLocal(this.group, new THREE.Vector3(-0.018, -0.065, -0.30), new THREE.Vector3(-0.27, -0.50, -0.02), 0.035, sleeveCamo)
    const lcuff = new THREE.Mesh(new THREE.CylinderGeometry(0.041, 0.037, 0.046, 10), sleeve)
    lcuff.position.set(-0.09, -0.19, -0.21)
    lcuff.rotation.set(1.05, 0, 0.6)
    this.group.add(lcuff)
    this.leftHand = leftHand

    // ---- muzzle flash ----
    this.flash = new THREE.Sprite(new THREE.SpriteMaterial({
      map: this.T.flash, color: 0xffd7a0, transparent: true, opacity: 0,
      blending: THREE.AdditiveBlending, depthWrite: false, depthTest: false
    }))
    this.flash.scale.setScalar(0.42)
    this.flash.position.set(0, 0.006, -0.68)
    this.group.add(this.flash)
    this.flash.visible = false

    this.muzzle = new THREE.Object3D()
    this.muzzle.position.set(0, 0.006, -0.68)
    this.group.add(this.muzzle)

    // warm glow from muzzle flash on the weapon
    this.flashGlow = new THREE.PointLight(0xffbb66, 0, 1.4, 2)
    this.flashGlow.position.set(0, 0.06, -0.5)
    this.group.add(this.flashGlow)

    this.group.traverse((o) => {
      if (o.isMesh) {
        o.castShadow = false
        o.receiveShadow = false
      }
    })
  }

  getAmmoText() {
    return { mag: this.mag, reserve: this.reserve }
  }

  setADS(v) {
    if (this.reloading) return
    this.ads = v
    if (this.cb.onADS) this.cb.onADS(v)
  }

  toggleADS() {
    this.setADS(!this.ads)
  }

  startFire() {
    this.trigger = true
    this.triggerDownTime = performance.now() / 1000
  }

  stopFire() {
    this.trigger = false
  }

  reload() {
    if (this.reloading || this.mag >= this.magSize || this.reserve <= 0) return
    this.reloading = true
    this.reloadTime = 0
    this.reloadPhase = -1
    this.trigger = false
    this.ads = false
    this.ammoApplied = false
    if (this.cb.onReloadStart) this.cb.onReloadStart()
    this.audio.reloadStep(0)
  }

  refillReserve(amount = 60) {
    this.reserve = Math.min(240, this.reserve + amount)
    if (this.cb.onAmmoChange) this.cb.onAmmoChange(this.getAmmoText())
  }

  reset() {
    this.mag = this.magSize
    this.reserve = 120
    this.reloading = false
    this.reloadTime = 0
    this.ads = false
    this.adsBlend = 0
    this.trigger = false
    this.group.position.copy(HIP_POS)
    this.group.rotation.set(HIP_ROT.x, HIP_ROT.y, HIP_ROT.z)
    this.magMesh.position.copy(this.magHome)
    this.magMesh.rotation.set(0, 0, 0)
    this.recoil = 0
    this.recoilRot = 0
    if (this.cb.onAmmoChange) this.cb.onAmmoChange(this.getAmmoText())
    if (this.cb.onReloadEnd) this.cb.onReloadEnd()
  }

  muzzleWorld(target) {
    this.muzzle.updateWorldMatrix(true, false)
    target.setFromMatrixPosition(this.muzzle.matrixWorld)
    this.camera.localToWorld(target)
    return target
  }

  fire() {
    const now = performance.now() / 1000
    if (this.reloading || now - this.lastShot < this.fireInterval) return
    if (this.mag <= 0) {
      this.audio.empty()
      this.lastShot = now
      this.trigger = false
      if (this.reserve > 0) this.reload()
      return
    }
    this.lastShot = now
    this.mag--
    this.shotCount++
    if (this.cb.onAmmoChange) this.cb.onAmmoChange(this.getAmmoText())
    this.audio.gunshot((Math.random() - 0.5) * 0.1)

    const dir = new THREE.Vector3(0, 0, -1).applyQuaternion(this.camera.quaternion)
    const right = new THREE.Vector3(1, 0, 0).applyQuaternion(this.camera.quaternion)
    const up = new THREE.Vector3(0, 1, 0).applyQuaternion(this.camera.quaternion)
    const movement = this.isMobile ? 1 : 0
    const base = this.ads ? 0.0011 : 0.0105
    const spread = base + (this.sprinting ? 0.02 : 0) + movement * 0.002
    dir.addScaledVector(right, (Math.random() - 0.5) * spread * 2)
    dir.addScaledVector(up, (Math.random() - 0.5) * spread * 2)
    dir.normalize()

    const origin = this.camera.getWorldPosition(new THREE.Vector3())
    this.muzzleWorld(this._v)
    const muzzle = this._v.clone()
    if (this.cb.onShoot) this.cb.onShoot(origin, dir, muzzle)

    // recoil impulses
    const recoilAmount = this.ads ? 0.7 : 1
    this.recoil += 0.023 * recoilAmount
    this.recoilRot += 0.055 * recoilAmount
    this.kickSide += (Math.random() - 0.5) * 0.02 * recoilAmount
    this.crosshairSpread = Math.min(1, this.crosshairSpread + 0.34)

    // camera kick
    if (this.cb.onRecoil) this.cb.onRecoil(0.0055 * recoilAmount, (Math.random() - 0.5) * 0.0022)

    // muzzle flash
    this.flashTime = this.flashLife
    this.flash.visible = true
    this.flash.material.rotation = Math.random() * Math.PI * 2
    this.flash.scale.setScalar((0.32 + Math.random() * 0.22) * (this.ads ? 0.8 : 1))
    this.flashGlow.intensity = 25
    if (this.cb.onMuzzleFlash) this.cb.onMuzzleFlash(muzzle)

    // particles
    const fwd = new THREE.Vector3(0, 0, -1).applyQuaternion(this.camera.quaternion)
    this.effects.muzzleSmoke(muzzle, fwd)
    const right2 = new THREE.Vector3(1, 0, 0).applyQuaternion(this.camera.quaternion)
    const up2 = new THREE.Vector3(0, 1, 0).applyQuaternion(this.camera.quaternion)
    this.effects.spawnCasing(muzzle.clone().addScaledVector(fwd, -0.28).addScaledVector(right2, 0.06).addScaledVector(up2, 0.02), right2, up2)

    if (this.mag === 0 && this.reserve > 0) {
      // let the last shot breathe before auto reload
      setTimeout(() => { if (this.mag === 0 && !this.reloading && this.reserve > 0) this.reload() }, 380)
    }
  }

  update(dt, { moving = false, sprinting = false, grounded = true, lookX = 0, lookY = 0 } = {}) {
    this.sprinting = sprinting && !this.ads && !this.reloading

    if (this.trigger && !this.reloading) this.fire()

    // ADS blend
    const targetADS = this.ads ? 1 : 0
    const speed = this.reloading ? 9 : 12
    this.adsBlend += (targetADS - this.adsBlend) * Math.min(1, dt * speed)
    if (this.adsBlend < 0.001) this.adsBlend = 0

    // reload timeline
    if (this.reloading) {
      this.reloadTime += dt
      const k = this.reloadTime / this.reloadDuration
      if (this.reloadPhase === -1 && k > 0.22) {
        this.reloadPhase = 0
        this.audio.reloadStep(1)
      }
      if (!this.ammoApplied && k > 0.58) {
        this.ammoApplied = true
        const need = this.magSize - this.mag
        const take = Math.min(need, this.reserve)
        this.mag += take
        this.reserve -= take
        this.audio.reloadStep(2)
        if (this.cb.onAmmoChange) this.cb.onAmmoChange(this.getAmmoText())
      }
      if (k >= 1) {
        this.reloading = false
        this.reloadTime = 0
        this.reloadPhase = -1
        if (this.cb.onReloadEnd) this.cb.onReloadEnd()
      }
      // magazine animation
      const drop = THREE.MathUtils.smoothstep(k, 0.1, 0.35) * (1 - THREE.MathUtils.smoothstep(k, 0.38, 0.55))
      this.magMesh.position.y = this.magHome.y - drop * 0.28
      this.magMesh.position.z = this.magHome.z - drop * 0.05
      this.magMesh.rotation.x = drop * 0.8
    }

    // recoil spring
    this.recoil += (0 - this.recoil) * Math.min(1, dt * 16)
    this.recoilRot += (0 - this.recoilRot) * Math.min(1, dt * 12)
    this.kickSide += (0 - this.kickSide) * Math.min(1, dt * 10)

    // look sway with lag
    this.lookSwayX += (THREE.MathUtils.clamp(-lookX * 0.02, -0.035, 0.035) - this.lookSwayX) * Math.min(1, dt * 9)
    this.lookSwayY += (THREE.MathUtils.clamp(-lookY * 0.02, -0.03, 0.03) - this.lookSwayY) * Math.min(1, dt * 9)

    // bob
    if (moving && grounded) this.bobTime += dt * (sprinting ? 11 : 7.5)
    const bobAmp = (moving && grounded ? (sprinting ? 0.017 : 0.009) : 0) * (1 - this.adsBlend * 0.82)
    const bobX = Math.sin(this.bobTime) * bobAmp
    const bobY = Math.abs(Math.cos(this.bobTime)) * bobAmp * 0.9

    // idle breathing
    const breathe = Math.sin(performance.now() * 0.0012) * 0.0025 * (1 - this.adsBlend * 0.7)

    // target pose
    const hip = HIP_POS
    const adsP = ADS_POS
    let px = THREE.MathUtils.lerp(hip.x, adsP.x, this.adsBlend)
    let py = THREE.MathUtils.lerp(hip.y, adsP.y, this.adsBlend)
    let pz = THREE.MathUtils.lerp(hip.z, adsP.z, this.adsBlend)
    if (this.sprinting) {
      px = THREE.MathUtils.lerp(px, SPRINT_POS.x, 0.7)
      py = THREE.MathUtils.lerp(py, SPRINT_POS.y, 0.7)
      pz = THREE.MathUtils.lerp(pz, SPRINT_POS.z, 0.7)
    }
    px += bobX + this.lookSwayX + this.kickSide
    py += bobY + breathe + this.lookSwayY
    pz += this.recoil

    let rx = HIP_ROT.x - this.recoilRot + this.lookSwayY * 0.5 + (sprinting ? 0.32 : 0)
    let ry = HIP_ROT.y + this.lookSwayX * 1.6 + (sprinting ? 0.16 : 0)
    let rz = HIP_ROT.z + this.kickSide * 1.6 + (sprinting ? 0.22 : 0)

    if (this.reloading) {
      const rk = Math.min(1, this.reloadTime / 0.3)
      const rk2 = Math.min(1, (this.reloadTime - 1.45) / 0.35)
      const blend = k01(rk) * (1 - k01(rk2))
      px = THREE.MathUtils.lerp(px, 0.13, blend)
      py = THREE.MathUtils.lerp(py, -0.31, blend)
      pz = THREE.MathUtils.lerp(pz, -0.34, blend)
      rx = THREE.MathUtils.lerp(rx, RELOAD_ROT.x, blend)
      ry = THREE.MathUtils.lerp(ry, RELOAD_ROT.y, blend)
      rz = THREE.MathUtils.lerp(rz, RELOAD_ROT.z, blend)
    }

    const s = 1 - Math.pow(0.0008, dt)
    this.group.position.x += (px - this.group.position.x) * s * 1.6
    this.group.position.y += (py - this.group.position.y) * s * 1.6
    this.group.position.z += (pz - this.group.position.z) * s * 1.6
    this.group.rotation.x += (rx - this.group.rotation.x) * s * 1.3
    this.group.rotation.y += (ry - this.group.rotation.y) * s * 1.3
    this.group.rotation.z += (rz - this.group.rotation.z) * s * 1.3

    // FOV
    const targetFov = this.ads ? 40 : 55
    if (Math.abs(this.viewCamera.fov - targetFov) > 0.05) {
      this.viewCamera.fov += (targetFov - this.viewCamera.fov) * Math.min(1, dt * 10)
      this.viewCamera.updateProjectionMatrix()
    }

    // flash timing
    if (this.flashTime > 0) {
      this.flashTime -= dt
      if (this.flashTime <= 0) {
        this.flash.visible = false
        this.flashGlow.intensity = 0
      } else {
        this.flashGlow.intensity = 18 * (this.flashTime / this.flashLife)
      }
    }

    // reticle visibility
    this.reticle.material.opacity = this.adsBlend > 0.7 ? 0.95 : 0.15
    this.reticle.scale.setScalar(this.adsBlend > 0.7 ? 0.008 : 0.006)

    // crosshair spread decay
    this.crosshairSpread = Math.max(0, this.crosshairSpread - dt * 2.2)

    // flashlight
    this.flashGlow.position.set(0, 0.06, -0.5)
  }
}

function addLimbLocal(parent, start, end, radius, mat) {
  const dir = new THREE.Vector3().subVectors(end, start)
  const len = dir.length()
  const mesh = new THREE.Mesh(new THREE.CapsuleGeometry(radius, Math.max(0.02, len - radius * 2), 4, 8), mat)
  mesh.position.copy(start).addScaledVector(dir, 0.5)
  mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.clone().normalize())
  parent.add(mesh)
  return mesh
}

function k01(x) {
  return THREE.MathUtils.smoothstep(x, 0, 1)
}
