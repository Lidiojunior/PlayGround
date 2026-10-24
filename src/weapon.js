import * as THREE from 'three'
import { createFlashTexture, createGlowTexture } from './textures.js'

const V = new THREE.Vector3()
const Q = new THREE.Quaternion()
const UP = new THREE.Vector3(0, 1, 0)

export class Weapon {
  constructor(camera, scene, renderer, effects) {
    this.camera = camera
    this.scene = scene
    this.renderer = renderer
    this.effects = effects
    this.group = new THREE.Group()
    this.group.scale.setScalar(0.7)
    camera.add(this.group)

    this.hipPos = new THREE.Vector3(0.26, -0.22, -0.8)
    this.adsPos = new THREE.Vector3(0, -0.104, -0.72)
    this.hipRot = new THREE.Euler(0.028, -0.055, 0.018)
    this.adsRot = new THREE.Euler(0, 0, 0)

    this.aim = false
    this.aimT = 0
    this.sprintAmt = 0
    this.recoilPos = new THREE.Vector3()
    this.recoilRot = new THREE.Vector3()
    this.sway = new THREE.Vector2()
    this.bobT = 0
    this.flashT = 0
    this.reloadT = 0
    this.reloadDur = 0
    this.magBase = null
    this.shells = []
    this.shellTimer = 0
    this.time = 0

    this.materials = {
      metal: new THREE.MeshStandardMaterial({ color: 0x30343a, metalness: 0.82, roughness: 0.34, envMapIntensity: 1.15 }),
      dark: new THREE.MeshStandardMaterial({ color: 0x1b1e22, metalness: 0.55, roughness: 0.5 }),
      polymer: new THREE.MeshStandardMaterial({ color: 0x212427, metalness: 0.12, roughness: 0.72 }),
      accent: new THREE.MeshStandardMaterial({ color: 0x3d4247, metalness: 0.75, roughness: 0.38 }),
      glove: new THREE.MeshStandardMaterial({ color: 0x24221d, metalness: 0.04, roughness: 0.92 }),
      sleeve: new THREE.MeshStandardMaterial({ color: 0x2f3026, metalness: 0.02, roughness: 0.96 }),
      brass: new THREE.MeshStandardMaterial({ color: 0xb58a48, metalness: 0.9, roughness: 0.3 }),
      lens: new THREE.MeshBasicMaterial({ color: 0xff3a2a, toneMapped: false }),
    }

    this.buildRifle()
    this.buildMuzzle()
    this.buildShells()

    this.viewLight = new THREE.PointLight(0xa9c2e0, 1.7, 4.2, 2)
    this.viewLight.position.set(0.32, 0.15, 0.18)
    camera.add(this.viewLight)
  }

  mesh(geo, mat, x = 0, y = 0, z = 0, rx = 0, ry = 0, rz = 0) {
    const m = new THREE.Mesh(geo, mat)
    m.position.set(x, y, z)
    m.rotation.set(rx, ry, rz)
    return m
  }

  buildRifle() {
    const g = this.group
    const M = this.materials

    const receiver = this.mesh(new THREE.BoxGeometry(0.072, 0.092, 0.38), M.metal, 0, 0, -0.02)
    g.add(receiver)

    const upper = this.mesh(new THREE.BoxGeometry(0.066, 0.05, 0.34), M.metal, 0, 0.064, -0.045)
    g.add(upper)

    const rail = this.mesh(new THREE.BoxGeometry(0.05, 0.013, 0.43), M.dark, 0, 0.092, -0.055)
    g.add(rail)
    const toothGeo = new THREE.BoxGeometry(0.052, 0.01, 0.012)
    for (let i = 0; i < 13; i++) {
      const tooth = this.mesh(toothGeo, M.dark, 0, 0.101, 0.1 - i * 0.028)
      g.add(tooth)
    }

    const handguard = this.mesh(new THREE.BoxGeometry(0.064, 0.078, 0.3), M.polymer, 0, 0.008, -0.37)
    g.add(handguard)
    for (let i = 0; i < 7; i++) {
      const slot = this.mesh(new THREE.BoxGeometry(0.07, 0.012, 0.02), M.dark, 0, 0.008, -0.26 - i * 0.032)
      g.add(slot)
    }
    const sideRail = this.mesh(new THREE.BoxGeometry(0.012, 0.03, 0.2), M.dark, 0.038, 0.026, -0.36)
    g.add(sideRail)

    const barrel = this.mesh(
      new THREE.CylinderGeometry(0.0135, 0.0135, 0.3, 10),
      M.metal,
      0,
      0.012,
      -0.61,
      Math.PI / 2
    )
    g.add(barrel)

    const gasBlock = this.mesh(new THREE.BoxGeometry(0.034, 0.052, 0.045), M.dark, 0, 0.052, -0.55)
    g.add(gasBlock)

    const brake = this.mesh(
      new THREE.CylinderGeometry(0.024, 0.026, 0.082, 12),
      M.accent,
      0,
      0.012,
      -0.775,
      Math.PI / 2
    )
    g.add(brake)
    for (let i = 0; i < 3; i++) {
      const ring = this.mesh(
        new THREE.TorusGeometry(0.0255, 0.004, 6, 12),
        M.dark,
        0,
        0.012,
        -0.75 - i * 0.024,
        Math.PI / 2
      )
      g.add(ring)
    }

    const stock = this.mesh(new THREE.BoxGeometry(0.052, 0.075, 0.29), M.polymer, 0, -0.012, 0.29)
    g.add(stock)
    const cheek = this.mesh(new THREE.BoxGeometry(0.05, 0.025, 0.2), M.dark, 0, 0.03, 0.27)
    g.add(cheek)
    const pad = this.mesh(new THREE.BoxGeometry(0.058, 0.115, 0.035), M.dark, 0, -0.018, 0.445)
    pad.rotation.x = -0.06
    g.add(pad)
    const stockRod = this.mesh(new THREE.BoxGeometry(0.036, 0.032, 0.12), M.metal, 0, 0.008, 0.16)
    g.add(stockRod)

    const grip = this.mesh(new THREE.BoxGeometry(0.048, 0.155, 0.072), M.polymer, 0, -0.115, 0.08)
    grip.rotation.x = -0.22
    g.add(grip)
    const gripBase = this.mesh(new THREE.BoxGeometry(0.052, 0.025, 0.08), M.dark, 0, -0.19, 0.095)
    g.add(gripBase)

    const guard = this.mesh(new THREE.BoxGeometry(0.044, 0.012, 0.115), M.dark, 0, -0.062, -0.005)
    g.add(guard)
    const trigger = this.mesh(new THREE.BoxGeometry(0.012, 0.038, 0.014), M.accent, 0, -0.078, 0.005, 0.3)
    g.add(trigger)

    this.mag = new THREE.Group()
    const magBody = this.mesh(new THREE.BoxGeometry(0.045, 0.17, 0.088), M.polymer, 0, -0.05, 0)
    magBody.rotation.x = 0.13
    const magPlate = this.mesh(new THREE.BoxGeometry(0.048, 0.022, 0.095), M.dark, 0, -0.142, -0.005)
    magPlate.rotation.x = 0.13
    this.mag.add(magBody, magPlate)
    this.mag.position.set(0, -0.112, -0.055)
    g.add(this.mag)
    this.magBase = this.mag.position.clone()

    const opticMount = this.mesh(new THREE.BoxGeometry(0.042, 0.022, 0.115), M.dark, 0, 0.112, -0.025)
    g.add(opticMount)
    const opticBody = this.mesh(
      new THREE.CylinderGeometry(0.031, 0.031, 0.12, 14),
      M.dark,
      0,
      0.148,
      -0.02,
      Math.PI / 2
    )
    g.add(opticBody)
    const opticFront = this.mesh(
      new THREE.CylinderGeometry(0.036, 0.03, 0.02, 14),
      M.accent,
      0,
      0.148,
      -0.078,
      Math.PI / 2
    )
    g.add(opticFront)
    const opticRear = this.mesh(
      new THREE.CylinderGeometry(0.034, 0.029, 0.02, 14),
      M.accent,
      0,
      0.148,
      0.04,
      Math.PI / 2
    )
    g.add(opticRear)

    const dotTex = createGlowTexture(
      this.renderer,
      [
        [0, 'rgba(255,90,60,1)'],
        [0.3, 'rgba(255,50,30,0.55)'],
        [1, 'rgba(255,40,20,0)'],
      ],
      64
    )
    this.dot = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: dotTex,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        color: 0xff5a3a,
      })
    )
    this.dot.position.set(0, 0.148, 0.052)
    this.dot.scale.setScalar(0.028)
    g.add(this.dot)

    const handle = this.mesh(new THREE.BoxGeometry(0.03, 0.014, 0.055), M.accent, 0.046, 0.058, 0.11)
    g.add(handle)
    const bolt = this.mesh(new THREE.CylinderGeometry(0.006, 0.006, 0.05, 6), M.accent, 0.042, 0.012, -0.1, 0, 0, Math.PI / 2)
    g.add(bolt)

    const slingLoop = this.mesh(new THREE.TorusGeometry(0.012, 0.003, 5, 10), M.accent, 0, -0.03, 0.36, 0, Math.PI / 2)
    g.add(slingLoop)

    this.buildHands(g)
  }

  buildHands(g) {
    const M = this.materials
    const glove = M.glove
    const sleeve = M.sleeve

    const rightHand = new THREE.Group()
    const rPalm = this.mesh(new THREE.BoxGeometry(0.058, 0.085, 0.082), glove, 0, 0, 0)
    rightHand.add(rPalm)
    for (let i = 0; i < 3; i++) {
      const finger = this.mesh(new THREE.BoxGeometry(0.018, 0.06, 0.023), glove, -0.025 + i * 0.019, 0.02, -0.05)
      finger.rotation.x = 0.55
      rightHand.add(finger)
    }
    const thumb = this.mesh(new THREE.BoxGeometry(0.022, 0.055, 0.024), glove, -0.036, 0.012, 0.02)
    thumb.rotation.z = 0.5
    rightHand.add(thumb)
    rightHand.position.set(0.002, -0.135, 0.085)
    rightHand.rotation.set(-0.24, 0.1, 0.05)
    g.add(rightHand)

    const rightWrist = this.mesh(new THREE.BoxGeometry(0.055, 0.16, 0.07), sleeve, 0.05, -0.26, 0.18)
    rightWrist.rotation.set(-0.32, 0.16, 0.25)
    g.add(rightWrist)

    const leftHand = new THREE.Group()
    const lPalm = this.mesh(new THREE.BoxGeometry(0.062, 0.052, 0.095), glove, 0, 0, 0)
    leftHand.add(lPalm)
    for (let i = 0; i < 4; i++) {
      const finger = this.mesh(new THREE.BoxGeometry(0.03, 0.018, 0.04), glove, 0.03, 0.014, -0.03 + i * 0.022)
      leftHand.add(finger)
    }
    const lThumb = this.mesh(new THREE.BoxGeometry(0.05, 0.02, 0.028), glove, 0.005, 0.042, -0.045)
    leftHand.add(lThumb)
    leftHand.position.set(-0.005, -0.072, -0.36)
    leftHand.rotation.set(0.08, -0.12, 0.04)
    g.add(leftHand)

    const leftWrist = this.mesh(new THREE.BoxGeometry(0.052, 0.15, 0.075), sleeve, -0.04, -0.19, -0.31)
    leftWrist.rotation.set(0.45, -0.2, -0.22)
    g.add(leftWrist)
  }

  buildMuzzle() {
    const tex = createFlashTexture(this.renderer)
    this.flashMat = new THREE.SpriteMaterial({
      map: tex,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      color: 0xffd9a0,
    })
    this.flash = new THREE.Sprite(this.flashMat)
    this.flash.position.set(0, 0.012, -0.83)
    this.flash.scale.setScalar(0.42)
    this.flash.visible = false
    this.group.add(this.flash)

    this.light = new THREE.PointLight(0xffb267, 0, 9, 2)
    this.light.position.set(0, 0.012, -0.83)
    this.group.add(this.light)
  }

  buildShells() {
    const geo = new THREE.CylinderGeometry(0.008, 0.008, 0.032, 6)
    for (let i = 0; i < 14; i++) {
      const m = new THREE.Mesh(geo, this.materials.brass)
      m.visible = false
      m.castShadow = false
      this.scene.add(m)
      this.shells.push({ mesh: m, vel: new THREE.Vector3(), spin: new THREE.Vector3(), ttl: 0 })
    }
  }

  setAiming(value) {
    this.aim = value
  }

  getMuzzleWorld(target = new THREE.Vector3()) {
    this.group.updateWorldMatrix(true, false)
    return target.set(0, 0.012, -0.84).applyMatrix4(this.group.matrixWorld)
  }

  getEjectWorld(target = new THREE.Vector3()) {
    this.group.updateWorldMatrix(true, false)
    return target.set(0.05, 0.04, -0.02).applyMatrix4(this.group.matrixWorld)
  }

  kick(strength = 1) {
    this.recoilPos.z += 0.05 * strength
    this.recoilPos.y += 0.008 * strength
    this.recoilRot.x -= 0.085 * strength
    this.recoilRot.z += (Math.random() - 0.5) * 0.04 * strength
    this.flashT = 0.045
    this.flash.visible = true
    this.flash.material.rotation = Math.random() * Math.PI * 2
    this.flash.scale.setScalar((0.32 + Math.random() * 0.18) * (this.aim ? 0.8 : 1))
    this.light.intensity = 22
    this.ejectShell()

    const muzzle = this.getMuzzleWorld(V)
    this.effects.puff(muzzle.clone(), {
      vel: new THREE.Vector3((Math.random() - 0.5) * 0.25, 0.25 + Math.random() * 0.25, (Math.random() - 0.5) * 0.25),
      scale: 0.07,
      ttl: 0.45,
      opacity: 0.2,
      color: 0x9c988f,
      grow: 1.2,
    })
  }

  ejectShell() {
    const slot = this.shells.find((s) => s.ttl <= 0)
    if (!slot) return
    const p = this.getEjectWorld(new THREE.Vector3())
    slot.mesh.position.copy(p)
    slot.mesh.visible = true
    slot.mesh.rotation.set(Math.random() * 3, Math.random() * 3, Math.random() * 3)
    const q = this.camera.getWorldQuaternion(Q)
    const right = new THREE.Vector3(1, 0, 0).applyQuaternion(q)
    const up = new THREE.Vector3(0, 1, 0).applyQuaternion(q)
    slot.vel
      .copy(right)
      .multiplyScalar(1.4 + Math.random() * 1.5)
      .addScaledVector(up, 1.6 + Math.random())
      .addScaledVector(new THREE.Vector3(0, 0, 1).applyQuaternion(q), 0.6)
    slot.spin.set((Math.random() - 0.5) * 22, (Math.random() - 0.5) * 22, (Math.random() - 0.5) * 22)
    slot.ttl = 1.6
  }

  startReload(duration) {
    this.reloadDur = duration
    this.reloadT = duration
  }

  cancelReload() {
    this.reloadT = 0
    this.reloadDur = 0
    if (this.mag) this.mag.position.copy(this.magBase)
  }

  isReloading() {
    return this.reloadT > 0
  }

  reloadProgress() {
    if (this.reloadDur <= 0) return 0
    return 1 - this.reloadT / this.reloadDur
  }

  show(visible) {
    this.group.visible = visible
  }

  reset() {
    this.recoilPos.set(0, 0, 0)
    this.recoilRot.set(0, 0, 0)
    this.sway.set(0, 0)
    this.aimT = 0
    this.aim = false
    this.sprintAmt = 0
    this.flashT = 0
    this.flash.visible = false
    this.light.intensity = 0
    this.cancelReload()
    for (const s of this.shells) {
      s.ttl = 0
      s.mesh.visible = false
    }
    this.group.position.copy(this.hipPos)
    this.group.rotation.copy(this.hipRot)
  }

  update(dt, state) {
    this.time += dt
    const aiming = this.aim
    this.aimT += ((aiming ? 1 : 0) - this.aimT) * Math.min(1, dt * 11)
    const aimEase = this.aimT * this.aimT * (3 - 2 * this.aimT)

    const sprintTarget = state.sprinting && !aiming ? 1 : 0
    this.sprintAmt += (sprintTarget - this.sprintAmt) * Math.min(1, dt * 7)

    const swayTargetX = THREE.MathUtils.clamp(-state.lookX * 0.9, -0.032, 0.032)
    const swayTargetY = THREE.MathUtils.clamp(-state.lookY * 0.9, -0.028, 0.028)
    this.sway.x += (swayTargetX - this.sway.x) * Math.min(1, dt * 9)
    this.sway.y += (swayTargetY - this.sway.y) * Math.min(1, dt * 9)

    const speed = state.speed || 0
    const moving = state.moving ? 1 : 0
    this.bobT += dt * (5.5 + speed * 0.9) * moving
    const bobAmt = Math.min(1, speed / 4.5) * (aiming ? 0.25 : 1) * (1 - this.sprintAmt * 0.3)
    const bobX = Math.sin(this.bobT) * 0.007 * bobAmt
    const bobY = Math.abs(Math.cos(this.bobT)) * 0.009 * bobAmt

    const target = V.copy(this.hipPos).lerp(this.adsPos, aimEase)
    target.x += bobX + this.sway.x
    target.y += bobY + this.sway.y
    target.z += 0
    target.y -= this.sprintAmt * 0.075
    target.z += this.sprintAmt * 0.04

    let reloadAmt = 0
    if (this.reloadT > 0) {
      this.reloadT = Math.max(0, this.reloadT - dt)
      const p = this.reloadProgress()
      reloadAmt = Math.sin(Math.min(1, p * 1.35) * Math.PI)
      target.y -= reloadAmt * 0.09
      target.x -= reloadAmt * 0.02
      if (this.mag) {
        const drop = Math.sin(Math.min(1, p * 2.2) * Math.PI)
        this.mag.position.copy(this.magBase)
        this.mag.position.y -= drop * 0.16
        this.mag.position.z -= drop * 0.05
        this.mag.visible = !(p > 0.62 && p < 0.78)
      }
      if (this.reloadT === 0 && this.mag) {
        this.mag.position.copy(this.magBase)
        this.mag.visible = true
      }
    } else if (this.mag) {
      this.mag.position.copy(this.magBase)
      this.mag.visible = true
    }

    target.x += this.recoilPos.x
    target.y += this.recoilPos.y
    target.z += this.recoilPos.z

    this.group.position.lerp(target, Math.min(1, dt * 22))

    const rot = this.group.rotation
    const baseX = this.hipRot.x + (this.adsRot.x - this.hipRot.x) * aimEase
    const baseY = this.hipRot.y + (this.adsRot.y - this.hipRot.y) * aimEase
    const baseZ = this.hipRot.z + (this.adsRot.z - this.hipRot.z) * aimEase
    const targetRotX = baseX + this.sway.y * 0.8 + this.sprintAmt * 0.17 - reloadAmt * 0.3 + this.recoilRot.x
    const targetRotY = baseY + this.sway.x * 0.7 + this.sprintAmt * 0.08 + this.recoilRot.y
    const targetRotZ = baseZ + this.sprintAmt * 0.14 - reloadAmt * 0.42 + this.recoilRot.z

    rot.x += (targetRotX - rot.x) * Math.min(1, dt * 20)
    rot.y += (targetRotY - rot.y) * Math.min(1, dt * 20)
    rot.z += (targetRotZ - rot.z) * Math.min(1, dt * 20)

    const decay = Math.exp(-dt * 16)
    this.recoilPos.multiplyScalar(decay)
    this.recoilRot.multiplyScalar(decay)

    if (this.flashT > 0) {
      this.flashT -= dt
      if (this.flashT <= 0) {
        this.flash.visible = false
        this.light.intensity = 0
      } else {
        this.light.intensity = Math.max(0, this.light.intensity - dt * 700)
      }
    }

    const dotScale = (aiming ? 0.03 : 0.024) + Math.sin(this.time * 3.2) * 0.002
    this.dot.scale.setScalar(dotScale)

    for (const s of this.shells) {
      if (s.ttl <= 0) continue
      s.ttl -= dt
      if (s.ttl <= 0) {
        s.mesh.visible = false
        continue
      }
      s.vel.y -= 12 * dt
      s.mesh.position.addScaledVector(s.vel, dt)
      s.mesh.rotation.x += s.spin.x * dt
      s.mesh.rotation.y += s.spin.y * dt
      s.mesh.rotation.z += s.spin.z * dt
      if (s.mesh.position.y < 0.02) {
        s.mesh.position.y = 0.02
        s.vel.set(0, 0, 0)
        s.spin.set(0, 0, 0)
        s.ttl = Math.min(s.ttl, 0.6)
      }
    }
  }
}
