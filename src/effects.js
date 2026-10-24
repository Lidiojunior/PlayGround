import * as THREE from 'three'
import {
  createFlashTexture,
  createSmokeTexture,
  createBulletHoleTexture,
  createDustTexture,
} from './textures.js'

const UP = new THREE.Vector3(0, 1, 0)

export class Effects {
  constructor(scene, renderer, mobile = false) {
    this.scene = scene
    this.renderer = renderer
    this.mobile = mobile
    this.sparks = []
    this.bloodParts = []
    this.puffs = []
    this.tracers = []
    this.flashes = []
    this.decals = []
    this.decalIndex = 0
    this._v = new THREE.Vector3()
    this._q = new THREE.Quaternion()

    this.buildPools()
  }

  buildPools() {
    const sparkGeo = new THREE.BoxGeometry(0.022, 0.022, 0.022)
    const sparkMat = new THREE.MeshBasicMaterial({ color: 0xffc06a, toneMapped: false })
    for (let i = 0; i < (this.mobile ? 70 : 120); i++) {
      const m = new THREE.Mesh(sparkGeo, sparkMat)
      m.visible = false
      m.frustumCulled = false
      this.scene.add(m)
      this.sparks.push({ mesh: m, vel: new THREE.Vector3(), ttl: 0, max: 1, gravity: 14, base: 1 })
    }

    const bloodGeo = new THREE.BoxGeometry(0.028, 0.028, 0.028)
    const bloodMat = new THREE.MeshBasicMaterial({ color: 0x5d0d0c, toneMapped: false })
    for (let i = 0; i < 60; i++) {
      const m = new THREE.Mesh(bloodGeo, bloodMat)
      m.visible = false
      m.frustumCulled = false
      this.scene.add(m)
      this.bloodParts.push({ mesh: m, vel: new THREE.Vector3(), ttl: 0, max: 1, gravity: 10, base: 1 })
    }

    const smokeTex = createSmokeTexture(this.renderer)
    for (let i = 0; i < 36; i++) {
      const mat = new THREE.SpriteMaterial({
        map: smokeTex,
        transparent: true,
        depthWrite: false,
        opacity: 0,
        color: 0x9a9a96,
      })
      const sprite = new THREE.Sprite(mat)
      sprite.visible = false
      sprite.frustumCulled = false
      this.scene.add(sprite)
      this.puffs.push({
        sprite,
        vel: new THREE.Vector3(),
        ttl: 0,
        max: 1,
        baseOpacity: 0.3,
        grow: 1.5,
        startScale: 0.3,
        spin: 0,
      })
    }

    const flashTex = createFlashTexture(this.renderer)
    for (let i = 0; i < 12; i++) {
      const mat = new THREE.SpriteMaterial({
        map: flashTex,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        opacity: 0,
        color: 0xffd9a0,
      })
      const sprite = new THREE.Sprite(mat)
      sprite.visible = false
      sprite.frustumCulled = false
      this.scene.add(sprite)
      this.flashes.push({ sprite, ttl: 0, max: 0.08, size: 0.5 })
    }

    const tracerGeo = new THREE.CylinderGeometry(0.014, 0.014, 1, 5, 1, true)
    this.tracerMats = {
      player: new THREE.MeshBasicMaterial({
        color: 0xffd9a0,
        transparent: true,
        opacity: 0.9,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        toneMapped: false,
      }),
      enemy: new THREE.MeshBasicMaterial({
        color: 0xff835c,
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        toneMapped: false,
      }),
    }
    for (let i = 0; i < 30; i++) {
      const m = new THREE.Mesh(tracerGeo, this.tracerMats.player)
      m.visible = false
      m.frustumCulled = false
      this.scene.add(m)
      this.tracers.push({ mesh: m, ttl: 0 })
    }

    const holeTex = createBulletHoleTexture(this.renderer)
    const holeMat = new THREE.MeshBasicMaterial({
      map: holeTex,
      transparent: true,
      depthWrite: false,
      polygonOffset: true,
      polygonOffsetFactor: -4,
      toneMapped: false,
      opacity: 0.95,
    })
    for (let i = 0; i < 56; i++) {
      const m = new THREE.Mesh(new THREE.PlaneGeometry(0.09, 0.09), holeMat)
      m.visible = false
      m.frustumCulled = false
      this.scene.add(m)
      this.decals.push(m)
    }

    this.dustTex = createDustTexture(this.renderer)
  }

  tracer(from, to, kind = 'player') {
    const slot = this.tracers.find((t) => t.ttl <= 0)
    if (!slot) return
    const mesh = slot.mesh
    const dir = this._v.copy(to).sub(from)
    const len = dir.length()
    if (len < 0.1) return
    dir.normalize()
    mesh.position.copy(from).addScaledVector(dir, len / 2)
    mesh.quaternion.setFromUnitVectors(UP, dir)
    mesh.scale.set(1, len, 1)
    mesh.material = kind === 'enemy' ? this.tracerMats.enemy : this.tracerMats.player
    mesh.visible = true
    slot.ttl = 0.07
  }

  flash(point, size = 0.5, color = 0xffd9a0, ttl = 0.075) {
    const slot = this.flashes.find((f) => f.ttl <= 0)
    if (!slot) return
    slot.sprite.position.copy(point)
    slot.sprite.material.color.setHex(color)
    slot.sprite.material.opacity = 0.95
    slot.sprite.material.rotation = Math.random() * Math.PI * 2
    slot.sprite.scale.setScalar(size)
    slot.sprite.visible = true
    slot.ttl = ttl
    slot.max = ttl
    slot.size = size
  }

  puff(point, opts = {}) {
    const slot = this.puffs.find((p) => p.ttl <= 0)
    if (!slot) return
    const {
      vel = new THREE.Vector3(0, 0.4, 0),
      scale = 0.4,
      ttl = 0.8,
      opacity = 0.28,
      color = 0x9a9a96,
      grow = 1.6,
      spin = (Math.random() - 0.5) * 2,
    } = opts
    slot.sprite.position.copy(point)
    slot.sprite.material.color.setHex(color)
    slot.sprite.material.rotation = Math.random() * Math.PI * 2
    slot.sprite.scale.setScalar(scale)
    slot.sprite.material.opacity = opacity
    slot.sprite.visible = true
    slot.vel.copy(vel)
    slot.ttl = ttl
    slot.max = ttl
    slot.baseOpacity = opacity
    slot.grow = grow
    slot.startScale = scale
    slot.spin = spin
  }

  sparksAt(point, normal, count = 9, color = null) {
    for (let i = 0; i < count; i++) {
      const slot = this.sparks.find((s) => s.ttl <= 0)
      if (!slot) break
      const dir = this._v.copy(normal)
      dir.x += (Math.random() - 0.5) * 1.8
      dir.y += (Math.random() - 0.2) * 1.6
      dir.z += (Math.random() - 0.5) * 1.8
      dir.normalize()
      const speed = 2 + Math.random() * 6.5
      slot.mesh.position.copy(point)
      slot.mesh.scale.setScalar(0.7 + Math.random() * 1.5)
      slot.mesh.visible = true
      if (color !== null) slot.mesh.material = slot.mesh.material
      slot.vel.copy(dir).multiplyScalar(speed)
      slot.ttl = 0.22 + Math.random() * 0.4
      slot.max = slot.ttl
      slot.gravity = 13
      slot.base = slot.mesh.scale.x
    }
  }

  bloodAt(point, dir, count = 10) {
    for (let i = 0; i < count; i++) {
      const slot = this.bloodParts.find((s) => s.ttl <= 0)
      if (!slot) break
      const d = this._v.copy(dir)
      d.x += (Math.random() - 0.5) * 1.1
      d.y += (Math.random() - 0.2) * 0.9
      d.z += (Math.random() - 0.5) * 1.1
      d.normalize()
      slot.mesh.position.copy(point)
      slot.mesh.scale.setScalar(0.6 + Math.random())
      slot.mesh.visible = true
      slot.vel.copy(d).multiplyScalar(1.2 + Math.random() * 3.4)
      slot.ttl = 0.3 + Math.random() * 0.35
      slot.max = slot.ttl
      slot.gravity = 9.5
      slot.base = slot.mesh.scale.x
    }
    this.puff(point, {
      vel: new THREE.Vector3(0, 0.35, 0),
      scale: 0.28,
      ttl: 0.55,
      opacity: 0.42,
      color: 0x7a1410,
      grow: 2.2,
    })
  }

  addDecal(point, normal) {
    const m = this.decals[this.decalIndex]
    this.decalIndex = (this.decalIndex + 1) % this.decals.length
    m.position.copy(point).addScaledVector(normal, 0.022)
    m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal)
    m.rotateZ(Math.random() * Math.PI * 2)
    m.scale.setScalar(0.7 + Math.random() * 0.8)
    m.visible = true
  }

  impact(point, normal) {
    this.flash(point, 0.32, 0xffcf87, 0.06)
    this.sparksAt(point, normal, 8)
    this.puff(point.clone().addScaledVector(normal, 0.08), {
      vel: new THREE.Vector3(0, 0.5, 0),
      scale: 0.24,
      ttl: 0.7,
      opacity: 0.22,
      color: 0x8e8c85,
      grow: 2.4,
    })
    this.addDecal(point, normal)
  }

  dustBurst(point, count = 6) {
    for (let i = 0; i < count; i++) {
      this.puff(
        new THREE.Vector3(
          point.x + (Math.random() - 0.5) * 0.8,
          0.15 + Math.random() * 0.5,
          point.z + (Math.random() - 0.5) * 0.8
        ),
        {
          vel: new THREE.Vector3((Math.random() - 0.5) * 0.5, 0.5 + Math.random() * 0.6, (Math.random() - 0.5) * 0.5),
          scale: 0.4,
          ttl: 1 + Math.random() * 0.6,
          opacity: 0.24,
          color: 0x8b8577,
          grow: 3,
        }
      )
    }
  }

  update(dt) {
    for (const s of this.sparks) {
      if (s.ttl <= 0) continue
      s.ttl -= dt
      if (s.ttl <= 0) {
        s.mesh.visible = false
        continue
      }
      s.vel.y -= s.gravity * dt
      s.mesh.position.addScaledVector(s.vel, dt)
      const k = s.ttl / s.max
      s.mesh.scale.setScalar(s.base * k)
    }

    for (const s of this.bloodParts) {
      if (s.ttl <= 0) continue
      s.ttl -= dt
      if (s.ttl <= 0) {
        s.mesh.visible = false
        continue
      }
      s.vel.y -= s.gravity * dt
      s.mesh.position.addScaledVector(s.vel, dt)
      const k = s.ttl / s.max
      s.mesh.scale.setScalar(s.base * k)
    }

    for (const p of this.puffs) {
      if (p.ttl <= 0) continue
      p.ttl -= dt
      if (p.ttl <= 0) {
        p.sprite.visible = false
        continue
      }
      const k = p.ttl / p.max
      p.sprite.position.addScaledVector(p.vel, dt)
      p.vel.multiplyScalar(1 - dt * 0.8)
      p.sprite.scale.setScalar(p.startScale + (1 - k) * p.grow)
      p.sprite.material.opacity = p.baseOpacity * k
      p.sprite.material.rotation += p.spin * dt
    }

    for (const t of this.tracers) {
      if (t.ttl <= 0) continue
      t.ttl -= dt
      if (t.ttl <= 0) t.mesh.visible = false
    }

    for (const f of this.flashes) {
      if (f.ttl <= 0) continue
      f.ttl -= dt
      if (f.ttl <= 0) {
        f.sprite.visible = false
        continue
      }
      const k = f.ttl / f.max
      f.sprite.material.opacity = k
      f.sprite.scale.setScalar(f.size * (0.7 + (1 - k) * 0.8))
    }
  }

  reset() {
    for (const s of this.sparks) { s.ttl = 0; s.mesh.visible = false }
    for (const s of this.bloodParts) { s.ttl = 0; s.mesh.visible = false }
    for (const p of this.puffs) { p.ttl = 0; p.sprite.visible = false }
    for (const t of this.tracers) { t.ttl = 0; t.mesh.visible = false }
    for (const f of this.flashes) { f.ttl = 0; f.sprite.visible = false }
    for (const d of this.decals) d.visible = false
  }
}
