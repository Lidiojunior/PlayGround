import * as THREE from 'three'

const PARTICLE_VERT = /* glsl */`
attribute float aSize;
attribute float aAlpha;
attribute vec3 aColor;
varying float vAlpha;
varying vec3 vColor;
uniform float uScale;
void main() {
  vAlpha = aAlpha;
  vColor = aColor;
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  gl_PointSize = clamp(aSize * uScale / max(0.15, -mv.z), 0.0, 90.0);
  gl_Position = projectionMatrix * mv;
}
`

const PARTICLE_FRAG = /* glsl */`
varying float vAlpha;
varying vec3 vColor;
void main() {
  vec2 p = gl_PointCoord - 0.5;
  float d = length(p);
  float a = smoothstep(0.5, 0.06, d);
  gl_FragColor = vec4(vColor, a * vAlpha);
}
`

class ParticlePool {
  constructor(scene, max, blending) {
    this.max = max
    this.count = 0
    this.pos = new Float32Array(max * 3)
    this.col = new Float32Array(max * 3)
    this.size = new Float32Array(max)
    this.alpha = new Float32Array(max)
    this.vel = new Float32Array(max * 3)
    this.life = new Float32Array(max)
    this.maxLife = new Float32Array(max)
    this.gravity = new Float32Array(max)
    this.drag = new Float32Array(max)
    this.grow = new Float32Array(max)
    this.base = new Float32Array(max)

    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(this.pos, 3))
    geo.setAttribute('aColor', new THREE.BufferAttribute(this.col, 3))
    geo.setAttribute('aSize', new THREE.BufferAttribute(this.size, 1))
    geo.setAttribute('aAlpha', new THREE.BufferAttribute(this.alpha, 1))
    geo.setDrawRange(0, 0)
    this.geo = geo
    this.mat = new THREE.ShaderMaterial({
      vertexShader: PARTICLE_VERT,
      fragmentShader: PARTICLE_FRAG,
      uniforms: { uScale: { value: 700 } },
      transparent: true,
      depthWrite: false,
      blending
    })
    this.points = new THREE.Points(geo, this.mat)
    this.points.frustumCulled = false
    scene.add(this.points)
  }

  spawn(x, y, z, vx, vy, vz, { life = 0.6, size = 0.1, color = [1, 1, 1], gravity = 0, drag = 1, grow = 0 } = {}) {
    if (this.count >= this.max) return
    const i = this.count++
    this.pos[i * 3] = x; this.pos[i * 3 + 1] = y; this.pos[i * 3 + 2] = z
    this.vel[i * 3] = vx; this.vel[i * 3 + 1] = vy; this.vel[i * 3 + 2] = vz
    this.col[i * 3] = color[0]; this.col[i * 3 + 1] = color[1]; this.col[i * 3 + 2] = color[2]
    this.size[i] = size
    this.base[i] = size
    this.alpha[i] = 1
    this.life[i] = life
    this.maxLife[i] = life
    this.gravity[i] = gravity
    this.drag[i] = drag
    this.grow[i] = grow
  }

  update(dt) {
    let i = 0
    while (i < this.count) {
      this.life[i] -= dt
      if (this.life[i] <= 0) {
        const last = --this.count
        if (i !== last) {
          this.pos[i * 3] = this.pos[last * 3]; this.pos[i * 3 + 1] = this.pos[last * 3 + 1]; this.pos[i * 3 + 2] = this.pos[last * 3 + 2]
          this.vel[i * 3] = this.vel[last * 3]; this.vel[i * 3 + 1] = this.vel[last * 3 + 1]; this.vel[i * 3 + 2] = this.vel[last * 3 + 2]
          this.col[i * 3] = this.col[last * 3]; this.col[i * 3 + 1] = this.col[last * 3 + 1]; this.col[i * 3 + 2] = this.col[last * 3 + 2]
          this.size[i] = this.size[last]; this.base[i] = this.base[last]
          this.alpha[i] = this.alpha[last]
          this.life[i] = this.life[last]; this.maxLife[i] = this.maxLife[last]
          this.gravity[i] = this.gravity[last]; this.drag[i] = this.drag[last]; this.grow[i] = this.grow[last]
        }
        continue
      }
      const d = Math.pow(this.drag[i], dt * 60)
      this.vel[i * 3] *= d
      this.vel[i * 3 + 1] = this.vel[i * 3 + 1] * d - this.gravity[i] * dt
      this.vel[i * 3 + 2] *= d
      this.pos[i * 3] += this.vel[i * 3] * dt
      this.pos[i * 3 + 1] += this.vel[i * 3 + 1] * dt
      this.pos[i * 3 + 2] += this.vel[i * 3 + 2] * dt
      if (this.pos[i * 3 + 1] < 0.02) {
        this.pos[i * 3 + 1] = 0.02
        this.vel[i * 3 + 1] *= -0.3
        this.vel[i * 3] *= 0.6
        this.vel[i * 3 + 2] *= 0.6
      }
      const k = this.life[i] / this.maxLife[i]
      this.alpha[i] = Math.min(1, k / 0.14)
      this.size[i] = this.base[i] * (1 + (1 - k) * this.grow[i])
      i++
    }
    this.geo.setDrawRange(0, this.count)
    this.geo.attributes.position.needsUpdate = true
    this.geo.attributes.aColor.needsUpdate = true
    this.geo.attributes.aSize.needsUpdate = true
    this.geo.attributes.aAlpha.needsUpdate = true
  }
}

export class Effects {
  constructor(scene, camera, textures, isMobile) {
    this.scene = scene
    this.camera = camera
    this.T = textures
    this.mobile = isMobile
    this.sparks = new ParticlePool(scene, isMobile ? 260 : 460, THREE.AdditiveBlending)
    this.dust = new ParticlePool(scene, isMobile ? 240 : 420, THREE.NormalBlending)
    this.blood = new ParticlePool(scene, isMobile ? 180 : 300, THREE.NormalBlending)

    this.decals = []
    this.maxDecals = isMobile ? 34 : 70
    this.decalGeo = new THREE.PlaneGeometry(1, 1)
    this.decalMat = new THREE.MeshBasicMaterial({
      map: textures.hole,
      transparent: true,
      depthWrite: false,
      polygonOffset: true,
      polygonOffsetFactor: -2,
      polygonOffsetUnits: -2,
      color: 0xffffff
    })

    this.tracers = []
    this.tracerPool = []
    for (let i = 0; i < (isMobile ? 10 : 18); i++) {
      const mat = new THREE.MeshBasicMaterial({
        color: 0xffc27a, transparent: true, opacity: 0,
        blending: THREE.AdditiveBlending, depthWrite: false, fog: false
      })
      const m = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 1, 5, 1, true), mat)
      m.visible = false
      m.frustumCulled = false
      scene.add(m)
      this.tracerPool.push({ mesh: m, life: 0, max: 0.075 })
    }

    this.casings = []
    const casingGeo = new THREE.CylinderGeometry(0.011, 0.011, 0.038, 6)
    const casingMat = new THREE.MeshStandardMaterial({ color: 0xc29a52, metalness: 0.9, roughness: 0.3 })
    for (let i = 0; i < 18; i++) {
      const m = new THREE.Mesh(casingGeo, casingMat)
      m.visible = false
      m.castShadow = false
      scene.add(m)
      this.casings.push({ mesh: m, vel: new THREE.Vector3(), life: 0, spin: new THREE.Vector3() })
    }

    this.smokePuffs = []
    for (let i = 0; i < 14; i++) {
      const sp = new THREE.Sprite(new THREE.SpriteMaterial({
        map: textures.smoke, color: 0xbbb3a3, transparent: true, opacity: 0,
        depthWrite: false
      }))
      sp.visible = false
      sp.scale.setScalar(0.1)
      scene.add(sp)
      this.smokePuffs.push({ sp, vel: new THREE.Vector3(), life: 0, max: 1, size: 0.4 })
    }

    this._tmp = new THREE.Vector3()
    this._q = new THREE.Quaternion()
    this._up = new THREE.Vector3(0, 1, 0)
  }

  setScale(height, fov) {
    const scale = height / (2 * Math.tan((fov * Math.PI) / 360))
    this.sparks.mat.uniforms.uScale.value = scale
    this.dust.mat.uniforms.uScale.value = scale
    this.blood.mat.uniforms.uScale.value = scale
  }

  addDecal(point, normal) {
    const m = new THREE.Mesh(this.decalGeo, this.decalMat)
    m.position.copy(point).addScaledVector(normal, 0.012)
    m.scale.setScalar(0.11 + Math.random() * 0.09)
    m.lookAt(this._tmp.copy(point).add(normal))
    m.rotateZ(Math.random() * Math.PI * 2)
    this.scene.add(m)
    this.decals.push(m)
    if (this.decals.length > this.maxDecals) {
      const old = this.decals.shift()
      this.scene.remove(old)
    }
  }

  impact(point, normal, kind = 'concrete') {
    const count = this.mobile ? 4 : 7
    const baseColor = kind === 'metal' ? [1.0, 0.72, 0.3] : [0.62, 0.55, 0.43]
    for (let i = 0; i < count; i++) {
      const v = new THREE.Vector3(
        normal.x + (Math.random() - 0.5) * 1.3,
        normal.y + Math.random() * 1.2,
        normal.z + (Math.random() - 0.5) * 1.3
      ).normalize().multiplyScalar(2 + Math.random() * 5)
      this.sparks.spawn(point.x, point.y, point.z, v.x, v.y, v.z, {
        life: 0.18 + Math.random() * 0.3,
        size: 0.035 + Math.random() * 0.05,
        color: baseColor,
        gravity: 9,
        drag: 0.98,
        grow: 0
      })
    }
    for (let i = 0; i < (this.mobile ? 3 : 5); i++) {
      const v = new THREE.Vector3(
        normal.x * 0.7 + (Math.random() - 0.5) * 0.9,
        normal.y * 0.7 + Math.random() * 0.8,
        normal.z * 0.7 + (Math.random() - 0.5) * 0.9
      ).multiplyScalar(0.5 + Math.random() * 1.2)
      this.dust.spawn(point.x, point.y, point.z, v.x, v.y, v.z, {
        life: 0.7 + Math.random() * 0.9,
        size: 0.12 + Math.random() * 0.16,
        color: kind === 'metal' ? [0.4, 0.38, 0.35] : [0.55, 0.5, 0.4],
        gravity: -0.5,
        drag: 0.94,
        grow: 2.2
      })
    }
    this.addDecal(point, normal)
  }

  bloodHit(point, direction) {
    const n = this.mobile ? 6 : 10
    for (let i = 0; i < n; i++) {
      const v = new THREE.Vector3(
        direction.x * 1.5 + (Math.random() - 0.5) * 2.2,
        Math.random() * 1.6,
        direction.z * 1.5 + (Math.random() - 0.5) * 2.2
      )
      this.blood.spawn(point.x, point.y, point.z, v.x, v.y, v.z, {
        life: 0.35 + Math.random() * 0.5,
        size: 0.05 + Math.random() * 0.08,
        color: [0.33, 0.02, 0.015],
        gravity: 7,
        drag: 0.96,
        grow: 1.2
      })
    }
    for (let i = 0; i < 3; i++) {
      this.dust.spawn(point.x, point.y, point.z, (Math.random() - 0.5) * 0.4, Math.random() * 0.3, (Math.random() - 0.5) * 0.4, {
        life: 0.5, size: 0.09, color: [0.24, 0.05, 0.03], gravity: -0.3, drag: 0.92, grow: 2
      })
    }
  }

  tracer(from, to) {
    const item = this.tracerPool.find((t) => !t.mesh.visible)
    if (!item) return
    const dir = this._tmp.copy(to).sub(from)
    const dist = dir.length()
    if (dist < 0.1) return
    item.mesh.visible = true
    item.mesh.position.copy(from).addScaledVector(dir, 0.5)
    item.mesh.scale.set(1, dist, 1)
    this._q.setFromUnitVectors(this._up, dir.clone().normalize())
    item.mesh.quaternion.copy(this._q)
    item.mesh.material.opacity = 0.85
    item.life = item.max
  }

  spawnCasing(position, right, up) {
    const c = this.casings.find((x) => !x.mesh.visible)
    if (!c) return
    c.mesh.visible = true
    c.mesh.position.copy(position)
    c.vel.set(
      right.x * (1.2 + Math.random()) + up.x * 0.6 + (Math.random() - 0.5) * 0.4,
      up.y * 0.9 + 1.4 + Math.random() * 0.8,
      right.z * (1.2 + Math.random()) + up.z * 0.6 + (Math.random() - 0.5) * 0.4
    )
    c.spin.set(Math.random() * 20, Math.random() * 20, Math.random() * 20)
    c.life = 2.4 + Math.random()
    c.mesh.rotation.set(Math.random() * 3, Math.random() * 3, 0)
  }

  smoke(position, direction, count = 1, scale = 0.3) {
    for (let i = 0; i < count; i++) {
      const c = this.smokePuffs.find((x) => !x.sp.visible)
      if (!c) return
      c.sp.visible = true
      c.sp.position.copy(position).add(new THREE.Vector3((Math.random() - 0.5) * 0.12, (Math.random() - 0.5) * 0.12, (Math.random() - 0.5) * 0.12))
      c.vel.set(
        direction.x * (0.5 + Math.random()) + (Math.random() - 0.5) * 0.4,
        direction.y * 0.4 + 0.4 + Math.random() * 0.4,
        direction.z * (0.5 + Math.random()) + (Math.random() - 0.5) * 0.4
      )
      c.life = c.max = 0.7 + Math.random() * 0.6
      c.size = scale * (0.7 + Math.random() * 0.7)
      c.sp.scale.setScalar(c.size)
      c.sp.material.opacity = 0.24
    }
  }

  muzzleSmoke(position, direction) {
    this.smoke(position, direction, this.mobile ? 1 : 2, 0.22)
  }

  update(dt) {
    this.sparks.update(dt)
    this.dust.update(dt)
    this.blood.update(dt)

    for (const t of this.tracerPool) {
      if (!t.mesh.visible) continue
      t.life -= dt
      if (t.life <= 0) {
        t.mesh.visible = false
      } else {
        t.mesh.material.opacity = (t.life / t.max) * 0.9
      }
    }

    for (const c of this.casings) {
      if (!c.mesh.visible) continue
      c.life -= dt
      if (c.life <= 0) { c.mesh.visible = false; continue }
      c.vel.y -= 12 * dt
      c.mesh.position.addScaledVector(c.vel, dt)
      c.mesh.rotation.x += c.spin.x * dt
      c.mesh.rotation.y += c.spin.y * dt
      c.mesh.rotation.z += c.spin.z * dt
      if (c.mesh.position.y < 0.03) {
        c.mesh.position.y = 0.03
        c.vel.y *= -0.38
        c.vel.x *= 0.72
        c.vel.z *= 0.72
        c.spin.multiplyScalar(0.7)
      }
    }

    for (const p of this.smokePuffs) {
      if (!p.sp.visible) continue
      p.life -= dt
      if (p.life <= 0) { p.sp.visible = false; continue }
      const k = 1 - p.life / p.max
      p.sp.position.addScaledVector(p.vel, dt)
      p.vel.multiplyScalar(0.97)
      p.vel.y += 0.15 * dt
      p.sp.scale.setScalar(p.size * (1 + k * 3.2))
      p.sp.material.opacity = 0.24 * (1 - k) * Math.min(1, k * 8)
    }
  }
}
