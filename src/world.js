import * as THREE from 'three'
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js'
import {
  createAsphalt,
  createConcrete,
  createFacade,
  createContainer,
  createCrate,
  createSandbag,
  createMetal,
  createLightPoolTexture,
  createDustTexture,
  createGlowTexture,
  createSmokeTexture,
} from './textures.js'

const SUN_DIR = new THREE.Vector3(-0.52, 0.14, -0.84).normalize()

function transformed(geo, x, y, z, rx = 0, ry = 0, rz = 0) {
  const g = geo.clone()
  const q = new THREE.Quaternion().setFromEuler(new THREE.Euler(rx, ry, rz))
  g.applyMatrix4(new THREE.Matrix4().compose(new THREE.Vector3(x, y, z), q, new THREE.Vector3(1, 1, 1)))
  return g
}

function mergeMesh(geos, material, cast = false, receive = true) {
  if (!geos.length) return null
  const merged = mergeGeometries(geos, false)
  for (const g of geos) g.dispose()
  if (!merged) return null
  const mesh = new THREE.Mesh(merged, material)
  mesh.castShadow = cast
  mesh.receiveShadow = receive
  return mesh
}

function circleShadowTexture(renderer) {
  return createGlowTexture(
    renderer,
    [
      [0, 'rgba(0,0,0,0.55)'],
      [0.55, 'rgba(0,0,0,0.28)'],
      [1, 'rgba(0,0,0,0)'],
    ],
    128
  )
}

export class World {
  constructor(renderer, scene, opts = {}) {
    this.renderer = renderer
    this.scene = scene
    this.mobile = !!opts.mobile
    this.colliders = []
    this.shootables = []
    this.spawnPoints = []
    this.lampLights = []
    this.lampHeads = []
    this.smoke = []
    this.time = 0
    this._tmpBox = new THREE.Box3()
    this.build()
  }

  build() {
    const scene = this.scene
    scene.fog = new THREE.FogExp2(0x151c25, 0.0115)

    this.buildSky()
    this.buildLights()
    this.buildGround()
    this.buildBuildings()
    this.buildProps()
    this.buildSkyline()
    this.buildDust()
    this.buildSmoke()
    this.buildSpawnPoints()
  }

  buildSky() {
    const scene = this.scene
    const uniforms = {
      uSun: { value: SUN_DIR.clone() },
      uTop: { value: new THREE.Color(0x070c15) },
      uMid: { value: new THREE.Color(0x1a2a3f) },
      uHorizon: { value: new THREE.Color(0x7a5440) },
      uSunColor: { value: new THREE.Color(0xffa963) },
    }
    const skyMat = new THREE.ShaderMaterial({
      uniforms,
      side: THREE.BackSide,
      depthWrite: false,
      fog: false,
      vertexShader: `
        varying vec3 vDir;
        void main() {
          vDir = normalize(position);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 uSun;
        uniform vec3 uTop;
        uniform vec3 uMid;
        uniform vec3 uHorizon;
        uniform vec3 uSunColor;
        varying vec3 vDir;
        float hash(vec2 p) {
          return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
        }
        void main() {
          vec3 d = normalize(vDir);
          float h = clamp(d.y, -0.2, 1.0);
          vec3 col = mix(uHorizon, uMid, smoothstep(-0.02, 0.28, h));
          col = mix(col, uTop, smoothstep(0.22, 0.85, h));

          float sd = max(dot(d, normalize(uSun)), 0.0);
          float glow = pow(sd, 42.0) * 0.9 + pow(sd, 7.0) * 0.22;
          col += uSunColor * glow;
          col += uSunColor * pow(sd, 420.0) * 3.2;

          float horizonHaze = exp(-abs(h) * 9.0) * 0.16;
          col += vec3(0.34, 0.24, 0.16) * horizonHaze;

          if (h > 0.12) {
            vec2 g = floor(d.xz / max(d.y, 0.08) * 90.0);
            float s = hash(g);
            float star = step(0.9965, s) * smoothstep(0.12, 0.5, h);
            col += vec3(0.75, 0.82, 0.95) * star * 0.55;
          }

          gl_FragColor = vec4(col, 1.0);
        }
      `,
    })
    const sky = new THREE.Mesh(new THREE.SphereGeometry(360, 32, 20), skyMat)
    sky.frustumCulled = false
    sky.renderOrder = -10
    scene.add(sky)
    this.sky = sky

    this.buildEnvironment(skyMat)
  }

  buildEnvironment(skyMat) {
    const envScene = new THREE.Scene()
    const sphere = new THREE.Mesh(new THREE.SphereGeometry(80, 24, 16), skyMat)
    envScene.add(sphere)

    const sun = new THREE.Mesh(
      new THREE.SphereGeometry(3.4, 16, 12),
      new THREE.MeshBasicMaterial({ color: 0xffd9a6 })
    )
    sun.position.copy(SUN_DIR).multiplyScalar(60)
    envScene.add(sun)

    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(300, 300),
      new THREE.MeshBasicMaterial({ color: 0x15171a })
    )
    ground.rotation.x = -Math.PI / 2
    ground.position.y = -4
    envScene.add(ground)

    const pmrem = new THREE.PMREMGenerator(this.renderer)
    pmrem.compileEquirectangularShader()
    const rt = pmrem.fromScene(envScene, 0.035)
    this.scene.environment = rt.texture
    this.scene.environmentIntensity = 1.1
    this.envRT = rt
    pmrem.dispose()
    sphere.geometry.dispose()
    sun.geometry.dispose()
    sun.material.dispose()
    ground.geometry.dispose()
    ground.material.dispose()
  }

  buildLights() {
    const hemi = new THREE.HemisphereLight(0x93a8c4, 0x4a4032, 1.32)
    this.scene.add(hemi)

    const sun = new THREE.DirectionalLight(0xffb277, 2.9)
    sun.position.copy(SUN_DIR).multiplyScalar(52)
    sun.castShadow = true
    const size = this.mobile ? 1024 : 2048
    sun.shadow.mapSize.set(size, size)
    sun.shadow.camera.left = -36
    sun.shadow.camera.right = 36
    sun.shadow.camera.top = 36
    sun.shadow.camera.bottom = -36
    sun.shadow.camera.near = 1
    sun.shadow.camera.far = 120
    sun.shadow.bias = -0.0005
    sun.shadow.normalBias = 0.035
    this.scene.add(sun)
    this.scene.add(sun.target)
    this.sun = sun

    const fill = new THREE.DirectionalLight(0x5c7ba8, 0.95)
    fill.position.set(24, 26, 30)
    this.scene.add(fill)

    const moon = new THREE.DirectionalLight(0xa9c2e0, 1.05)
    moon.position.set(-18, 34, 22)
    this.scene.add(moon)

    const ambient = new THREE.AmbientLight(0x33404f, 0.68)
    this.scene.add(ambient)
  }

  buildGround() {
    const asphalt = createAsphalt(this.renderer)
    const mat = new THREE.MeshStandardMaterial({
      map: asphalt.map,
      bumpMap: asphalt.bumpMap,
      bumpScale: 0.035,
      roughnessMap: asphalt.roughnessMap,
      roughness: 1,
      metalness: 0.08,
      envMapIntensity: 0.75,
    })
    const ground = new THREE.Mesh(new THREE.PlaneGeometry(120, 120), mat)
    ground.rotation.x = -Math.PI / 2
    ground.receiveShadow = true
    ground.name = 'ground'
    this.scene.add(ground)
    this.ground = ground
    this.shootables.push(ground)

    const apron = new THREE.Mesh(
      new THREE.CircleGeometry(27.5, 48),
      new THREE.MeshStandardMaterial({
        color: 0x2a2c2d,
        roughness: 0.78,
        metalness: 0.05,
        transparent: true,
        opacity: 0.55,
        depthWrite: false,
        polygonOffset: true,
        polygonOffsetFactor: -1,
      })
    )
    apron.rotation.x = -Math.PI / 2
    apron.position.y = 0.012
    apron.receiveShadow = true
    this.scene.add(apron)

    this.buildHelipadMark()
    this.buildManholes()

    const kerbMat = new THREE.MeshStandardMaterial({ color: 0x5b5b55, roughness: 0.92 })
    const kerbGeo = new THREE.BoxGeometry(1.4, 0.18, 0.42)
    const kerbs = []
    for (let i = 0; i < 18; i++) {
      const angle = (i / 18) * Math.PI * 2
      const r = 25.5
      kerbs.push(transformed(kerbGeo, Math.cos(angle) * r, 0.09, Math.sin(angle) * r, 0, -angle, 0))
    }
    const kerb = mergeMesh(kerbs, kerbMat, true, true)
    if (kerb) this.scene.add(kerb)
  }

  buildHelipadMark() {
    const c = document.createElement('canvas')
    c.width = c.height = 512
    const ctx = c.getContext('2d')
    ctx.translate(256, 256)
    ctx.strokeStyle = 'rgba(224,220,198,0.2)'
    ctx.lineWidth = 14
    ctx.beginPath()
    ctx.arc(0, 0, 196, 0, Math.PI * 2)
    ctx.stroke()
    ctx.lineWidth = 5
    ctx.beginPath()
    ctx.arc(0, 0, 160, 0, Math.PI * 2)
    ctx.stroke()
    ctx.fillStyle = 'rgba(224,220,198,0.19)'
    ctx.fillRect(-70, -86, 28, 172)
    ctx.fillRect(42, -86, 28, 172)
    ctx.fillRect(-42, -13, 84, 26)
    ctx.font = 'bold 52px monospace'
    ctx.textAlign = 'center'
    ctx.fillText('07', 0, 235)
    const tex = new THREE.CanvasTexture(c)
    tex.colorSpace = THREE.SRGBColorSpace
    tex.anisotropy = 8
    const mat = new THREE.MeshBasicMaterial({
      map: tex,
      transparent: true,
      depthWrite: false,
      opacity: 0.9,
      polygonOffset: true,
      polygonOffsetFactor: -2,
    })
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(13, 13), mat)
    mesh.rotation.x = -Math.PI / 2
    mesh.rotation.z = 0.4
    mesh.position.set(-1, 0.02, -2)
    this.scene.add(mesh)
  }

  buildManholes() {
    const metal = createMetal(this.renderer)
    const mat = new THREE.MeshStandardMaterial({
      map: metal.map,
      color: 0x55575a,
      roughness: 0.62,
      metalness: 0.55,
    })
    const geo = new THREE.CylinderGeometry(0.52, 0.52, 0.03, 20)
    const spots = [
      [-7, 6],
      [11, -4],
      [3, 14],
      [-14, -1],
    ]
    const geos = spots.map(([x, z]) => transformed(geo, x, 0.02, z))
    const merged = mergeMesh(geos, mat, false, true)
    if (merged) this.scene.add(merged)
  }

  buildBuildings() {
    const facades = [0, 1, 2, 3].map((v) => createFacade(this.renderer, v))
    const concrete = createConcrete(this.renderer)
    const roofMat = new THREE.MeshStandardMaterial({
      map: concrete.map,
      color: 0x4f504b,
      roughness: 0.94,
      metalness: 0.02,
      bumpMap: concrete.bumpMap,
      bumpScale: 0.02,
    })
    this.roofMat = roofMat

    const defs = [
      [-29, -30, 15, 10, 15, 0],
      [-11, -30, 13, 9, 22, 1],
      [5, -30, 12, 8, 12, 2],
      [19, -31, 14, 11, 18, 3],
      [30, -19, 10, 12, 16, 0],
      [30, -1, 10, 13, 22, 1],
      [30, 17, 10, 12, 13, 2],
      [-30, -16, 10, 12, 19, 3],
      [-30, 2, 10, 13, 14, 0],
      [-30, 19, 10, 12, 21, 1],
      [-22, 30, 14, 10, 16, 2],
      [-6, 30, 12, 9, 12, 3],
      [9, 30, 13, 10, 20, 0],
      [24, 30, 12, 10, 14, 1],
      [-2, -42, 30, 12, 26, 2],
      [0, 43, 36, 12, 18, 3],
    ]

    const shutterMat = new THREE.MeshStandardMaterial({
      color: 0x23282b,
      roughness: 0.72,
      metalness: 0.35,
    })
    const acMat = new THREE.MeshStandardMaterial({
      color: 0x8a8d88,
      roughness: 0.65,
      metalness: 0.35,
    })
    const tankMat = new THREE.MeshStandardMaterial({ color: 0x5a4636, roughness: 0.8, metalness: 0.2 })
    const parGeos = []
    const acGeos = []
    const tankGeos = []
    const doorGeos = []

    defs.forEach(([x, z, w, d, h, variant]) => {
      const src = facades[variant]
      const map = src.map.clone()
      const emap = src.emissiveMap.clone()
      const rx = Math.max(1.6, w / 7.6)
      const ry = Math.max(1.8, h / 7.2)
      map.repeat.set(rx, ry)
      emap.repeat.set(rx, ry)
      map.needsUpdate = emap.needsUpdate = true

      const mat = new THREE.MeshStandardMaterial({
        map,
        emissiveMap: emap,
        emissive: 0xffb070,
        emissiveIntensity: 1.35,
        roughness: 0.88,
        metalness: 0.04,
      })
      const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat)
      mesh.position.set(x, h / 2, z)
      mesh.castShadow = true
      mesh.receiveShadow = true
      this.scene.add(mesh)
      this.shootables.push(mesh)
      this.addCollider(mesh, 0)

      const parGeoY = new THREE.BoxGeometry(w + 0.3, 0.5, 0.35)
      const parGeoX = new THREE.BoxGeometry(0.35, 0.5, d + 0.3)
      parGeos.push(transformed(parGeoY, x, h + 0.25, z - d / 2))
      parGeos.push(transformed(parGeoY, x, h + 0.25, z + d / 2))
      parGeos.push(transformed(parGeoX, x - w / 2, h + 0.25, z))
      parGeos.push(transformed(parGeoX, x + w / 2, h + 0.25, z))
      parGeoY.dispose()
      parGeoX.dispose()

      acGeos.push(
        transformed(
          new THREE.BoxGeometry(1.4, 0.65, 1.1),
          x + (Math.random() - 0.5) * w * 0.4,
          h + 0.6,
          z + (Math.random() - 0.5) * d * 0.4
        )
      )

      if (Math.random() < 0.6) {
        tankGeos.push(
          transformed(
            new THREE.CylinderGeometry(0.75, 0.75, 1.5, 12),
            x + (Math.random() - 0.5) * w * 0.3,
            h + 1.1,
            z + (Math.random() - 0.5) * d * 0.3
          )
        )
      }

      const inward = new THREE.Vector3(-x, 0, -z).normalize()
      const faceX = Math.abs(inward.x) > Math.abs(inward.z)
      doorGeos.push(
        transformed(
          new THREE.BoxGeometry(faceX ? 0.1 : 2.6, 2.7, faceX ? 2.6 : 0.1),
          x + inward.x * ((faceX ? w : d) / 2 + 0.04),
          1.35,
          z + inward.z * ((faceX ? w : d) / 2 + 0.04)
        )
      )
    })

    for (const [geos, mat] of [
      [parGeos, roofMat],
      [acGeos, acMat],
      [tankGeos, tankMat],
      [doorGeos, shutterMat],
    ]) {
      const mesh = mergeMesh(geos, mat, false, true)
      if (mesh) this.scene.add(mesh)
    }
  }

  addCollider(mesh, pad = 0) {
    mesh.updateMatrixWorld(true)
    const box = this._tmpBox.setFromObject(mesh)
    this.colliders.push({
      minX: box.min.x - pad,
      maxX: box.max.x + pad,
      minZ: box.min.z - pad,
      maxZ: box.max.z + pad,
      minY: Math.max(0, box.min.y),
      maxY: box.max.y,
    })
  }

  addBoxCollider(x, z, w, d, h, pad = 0) {
    this.colliders.push({
      minX: x - w / 2 - pad,
      maxX: x + w / 2 + pad,
      minZ: z - d / 2 - pad,
      maxZ: z + d / 2 + pad,
      minY: 0,
      maxY: h,
    })
  }

  addContactShadow(x, z, size, opacity = 0.45) {
    if (!this.shadowTex) this.shadowTex = circleShadowTexture(this.renderer)
    const mat = new THREE.MeshBasicMaterial({
      map: this.shadowTex,
      transparent: true,
      opacity,
      depthWrite: false,
      polygonOffset: true,
      polygonOffsetFactor: -2,
    })
    const m = new THREE.Mesh(new THREE.PlaneGeometry(size, size), mat)
    m.rotation.x = -Math.PI / 2
    m.position.set(x, 0.014, z)
    m.renderOrder = 1
    this.scene.add(m)
  }

  buildProps() {
    this.buildContainers()
    this.buildCrates()
    this.buildBarrels()
    this.buildWalls()
    this.buildSandbags()
    this.buildBarriers()
    this.buildTruck()
    this.buildDumpster()
    this.buildLamps()
    this.buildPallets()
    this.buildFences()
  }

  buildContainers() {
    const defs = [
      [-10.5, -4.5, 0.16, 0],
      [10.2, 7.2, -0.42, 1],
      [13.5, -17.5, 1.42, 2],
    ]
    const metalTex = createMetal(this.renderer)
    const ribMat = new THREE.MeshStandardMaterial({
      map: metalTex.map,
      color: 0x6c6e70,
      roughness: 0.6,
      metalness: 0.45,
    })
    defs.forEach(([x, z, rot, variant]) => {
      const tex = createContainer(this.renderer, variant)
      const mat = new THREE.MeshStandardMaterial({
        map: tex.map,
        bumpMap: tex.bumpMap,
        bumpScale: 0.03,
        roughness: 0.72,
        metalness: 0.42,
      })
      const group = new THREE.Group()
      const body = new THREE.Mesh(new THREE.BoxGeometry(6.1, 2.6, 2.45), mat)
      body.position.y = 1.3
      body.castShadow = true
      body.receiveShadow = true
      group.add(body)
      this.shootables.push(body)

      const topRail = new THREE.Mesh(new THREE.BoxGeometry(6.2, 0.08, 2.55), ribMat)
      topRail.position.y = 2.64
      group.add(topRail)
      const bottomRail = topRail.clone()
      bottomRail.position.y = 0.06
      group.add(bottomRail)

      for (const side of [-1, 1]) {
        const door = new THREE.Mesh(new THREE.BoxGeometry(0.06, 2.3, 2.2), ribMat)
        door.position.set(side * 3.06, 1.3, 0)
        group.add(door)
        for (let i = 0; i < 2; i++) {
          const bar = new THREE.Mesh(new THREE.BoxGeometry(0.04, 2.3, 0.06), ribMat)
          bar.position.set(side * 3.1, 1.3, -0.55 + i * 1.1)
          group.add(bar)
        }
      }

      group.position.set(x, 0, z)
      group.rotation.y = rot
      this.scene.add(group)
      this.addContactShadow(x, z, 7.2, 0.4)
      this.addCollider(group, 0)
    })
  }

  buildCrates() {
    const crateTex = createCrate(this.renderer)
    const mat = new THREE.MeshStandardMaterial({
      map: crateTex.map,
      roughness: 0.85,
      metalness: 0.02,
    })
    const geo = new THREE.BoxGeometry(1.08, 1.08, 1.08)
    const stacks = [
      [-15.5, -1.5, 2, 0.1],
      [16.5, 12.5, 2, -0.2],
      [4.8, -14.5, 1, 0.35],
      [-7.5, 12.5, 1, -0.5],
      [18.5, 0.5, 1, 0.8],
    ]
    const geos = []
    for (const [x, z, count, rot] of stacks) {
      for (let i = 0; i < count; i++) {
        const r = rot + (Math.random() - 0.5) * 0.12
        geos.push(
          transformed(
            geo,
            x + (Math.random() - 0.5) * 0.1,
            0.54 + i * 1.09,
            z + (Math.random() - 0.5) * 0.1,
            0,
            r,
            0
          )
        )
      }
      this.addBoxCollider(x, z, 1.25, 1.25, count * 1.09)
      this.addContactShadow(x, z, 1.9, 0.5)
    }
    const mesh = mergeMesh(geos, mat, true, true)
    if (mesh) {
      this.scene.add(mesh)
      this.shootables.push(mesh)
    }
  }

  buildBarrels() {
    const metalTex = createMetal(this.renderer)
    const colors = [0x8a3c28, 0x2f5a6b, 0x6e6a34, 0x44484c]
    const geo = new THREE.CylinderGeometry(0.32, 0.32, 1.05, 16)
    const ringGeo = new THREE.TorusGeometry(0.325, 0.018, 6, 20)
    const ringMat = new THREE.MeshStandardMaterial({ color: 0x2b2c2c, roughness: 0.6, metalness: 0.5 })
    const spots = [
      [7.4, 14.8],
      [-12.2, 15.8],
      [16.2, -3.2],
      [-3.4, -17.8],
      [21.2, 9.2],
      [-19.2, 7.2],
      [-13.8, -13.2],
    ]
    const mats = colors.map(
      (color) =>
        new THREE.MeshStandardMaterial({
          map: metalTex.map,
          color,
          roughness: 0.78,
          metalness: 0.4,
        })
    )
    const bodyGeos = colors.map(() => [])
    const ringGeos = []
    spots.forEach(([x, z], i) => {
      const variant = i % colors.length
      bodyGeos[variant].push(transformed(geo, x, 0.525, z, 0, Math.random() * Math.PI, 0))
      for (const ry of [0.22, 0.5, 0.78]) {
        ringGeos.push(transformed(ringGeo, x, ry, z, Math.PI / 2, 0, 0))
      }
      this.addBoxCollider(x, z, 0.68, 0.68, 1.1)
      this.addContactShadow(x, z, 1.15, 0.55)
    })
    bodyGeos.forEach((geos, i) => {
      const mesh = mergeMesh(geos, mats[i], true, true)
      if (mesh) {
        this.scene.add(mesh)
        this.shootables.push(mesh)
      }
    })
    const rings = mergeMesh(ringGeos, ringMat, false, true)
    if (rings) this.scene.add(rings)
  }

  buildWalls() {
    const concrete = createConcrete(this.renderer)
    const mat = new THREE.MeshStandardMaterial({
      map: concrete.map,
      color: 0x77776f,
      roughness: 0.93,
      metalness: 0.01,
      bumpMap: concrete.bumpMap,
      bumpScale: 0.02,
    })
    const defs = [
      [-14.5, 9.5, 6.5, 0.2, 2.4],
      [13.8, -9.4, 5.5, 0.08, 2.2],
      [-20.5, -5.5, 4.2, -0.5, 2.6],
      [20.5, 17.2, 5.4, 0.1, 2.4],
      [1.5, -8.5, 3.2, Math.PI / 2, 1.9],
    ]
    const bodyGeos = []
    const markGeos = []
    const markMat = new THREE.MeshStandardMaterial({ color: 0x9a4032, roughness: 0.9 })
    for (const [x, z, len, rot, h] of defs) {
      bodyGeos.push(transformed(new THREE.BoxGeometry(len, h, 0.42), x, h / 2, z, 0, rot, 0))
      bodyGeos.push(transformed(new THREE.BoxGeometry(len + 0.15, 0.14, 0.56), x, h + 0.06, z, 0, rot, 0))
      for (let i = 0; i < 3; i++) {
        const lx = -len / 2 + 0.8 + i * (len / 3)
        markGeos.push(
          transformed(
            new THREE.PlaneGeometry(0.5, 0.5),
            x + Math.cos(rot) * lx + Math.sin(rot) * 0.215,
            h * 0.62,
            z - Math.sin(rot) * lx + Math.cos(rot) * 0.215,
            0,
            rot,
            0
          )
        )
      }
      this.addContactShadow(x, z, len + 1.2, 0.4)
      this.addBoxCollider(x, z, Math.abs(Math.cos(rot)) * len + Math.abs(Math.sin(rot)) * 0.5, Math.abs(Math.sin(rot)) * len + Math.abs(Math.cos(rot)) * 0.5, h)
    }
    const bodies = mergeMesh(bodyGeos, mat, true, true)
    if (bodies) {
      this.scene.add(bodies)
      this.shootables.push(bodies)
    }
    const marks = mergeMesh(markGeos, markMat, false, true)
    if (marks) this.scene.add(marks)
  }

  buildSandbags() {
    const tex = createSandbag(this.renderer)
    const mat = new THREE.MeshStandardMaterial({
      map: tex.map,
      bumpMap: tex.bumpMap,
      bumpScale: 0.02,
      roughness: 0.95,
      metalness: 0,
      color: 0xb4aa8c,
    })
    const geo = new THREE.BoxGeometry(0.88, 0.3, 0.52)
    const walls = [
      [4.5, 11.2, 0.15, 4],
      [-5.8, -11.6, -0.2, 5],
      [-17.5, 2.5, 1.2, 3],
      [15.8, 2.2, -0.3, 4],
      [8.2, -11.8, 0.55, 3],
    ]
    const geos = []
    for (const [cx, cz, rot, count] of walls) {
      for (let i = 0; i < count; i++) {
        const rows = 3
        for (let row = 0; row < rows; row++) {
          const offset = (i - (count - 1) / 2) * 0.92
          geos.push(
            transformed(
              geo,
              cx + Math.cos(rot) * offset + (row % 2 ? 0.05 : -0.05),
              0.16 + row * 0.29,
              cz - Math.sin(rot) * offset + (Math.random() - 0.5) * 0.05,
              0,
              rot + (Math.random() - 0.5) * 0.1,
              (Math.random() - 0.5) * 0.06
            )
          )
        }
      }
      this.addBoxCollider(cx, cz, Math.abs(Math.cos(rot)) * count * 0.92 + 0.5, Math.abs(Math.sin(rot)) * count * 0.92 + 0.5, 1.0, 0.05)
      this.addContactShadow(cx, cz, count * 1.1, 0.4)
    }
    const mesh = mergeMesh(geos, mat, true, true)
    if (mesh) {
      this.scene.add(mesh)
      this.shootables.push(mesh)
    }
  }

  buildBarriers() {
    const concrete = createConcrete(this.renderer)
    const mat = new THREE.MeshStandardMaterial({
      map: concrete.map,
      color: 0x8b8b82,
      roughness: 0.9,
      metalness: 0.02,
    })
    const defs = [
      [-2.8, 1.5, 0.15],
      [5.4, -4.4, -0.6],
      [-9.5, 6.5, 1.1],
      [9.2, 18.5, 0.2],
      [-17.5, -17.8, 0.4],
    ]
    const geos = []
    for (const [x, z, rot] of defs) {
      geos.push(transformed(new THREE.BoxGeometry(2.6, 0.5, 0.7), x, 0.25, z, 0, rot, 0))
      geos.push(transformed(new THREE.BoxGeometry(2.6, 0.55, 0.34), x, 0.78, z, 0, rot, 0))
      const c = Math.abs(Math.cos(rot))
      const s = Math.abs(Math.sin(rot))
      this.addBoxCollider(x, z, c * 2.7 + s * 0.8, s * 2.7 + c * 0.8, 1.05)
      this.addContactShadow(x, z, 3.1, 0.45)
    }
    const mesh = mergeMesh(geos, mat, true, true)
    if (mesh) {
      this.scene.add(mesh)
      this.shootables.push(mesh)
    }
  }

  buildTruck() {
    const metal = createMetal(this.renderer)
    const bodyMat = new THREE.MeshStandardMaterial({
      map: metal.map,
      color: 0x3d4a3f,
      roughness: 0.72,
      metalness: 0.35,
    })
    const darkMat = new THREE.MeshStandardMaterial({ color: 0x16181a, roughness: 0.9 })
    const glassMat = new THREE.MeshStandardMaterial({
      color: 0x0e1418,
      roughness: 0.18,
      metalness: 0.6,
      envMapIntensity: 1.2,
    })
    const group = new THREE.Group()
    const bed = new THREE.Mesh(new THREE.BoxGeometry(2.4, 1.9, 5.2), bodyMat)
    bed.position.set(0, 1.35, -0.7)
    bed.castShadow = true
    bed.receiveShadow = true
    group.add(bed)

    const cab = new THREE.Mesh(new THREE.BoxGeometry(2.3, 1.55, 2.1), bodyMat)
    cab.position.set(0, 1.2, 2.65)
    cab.castShadow = true
    group.add(cab)

    const windshield = new THREE.Mesh(new THREE.BoxGeometry(2.05, 0.75, 0.06), glassMat)
    windshield.position.set(0, 1.55, 3.72)
    windshield.rotation.x = -0.12
    group.add(windshield)

    const sideWin = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.6, 1.1), glassMat)
    sideWin.position.set(1.16, 1.6, 2.8)
    group.add(sideWin)
    const sideWin2 = sideWin.clone()
    sideWin2.position.x = -1.16
    group.add(sideWin2)

    const wheelGeo = new THREE.CylinderGeometry(0.48, 0.48, 0.34, 18)
    for (const [x, z] of [
      [-1.12, 2.4],
      [1.12, 2.4],
      [-1.12, -1.9],
      [1.12, -1.9],
      [-1.12, -3.0],
      [1.12, -3.0],
    ]) {
      const wheel = new THREE.Mesh(wheelGeo, darkMat)
      wheel.rotation.z = Math.PI / 2
      wheel.position.set(x, 0.48, z)
      wheel.castShadow = true
      group.add(wheel)
    }

    const lightMat = new THREE.MeshStandardMaterial({
      color: 0xffe6b0,
      emissive: 0xffc36b,
      emissiveIntensity: 0.4,
      roughness: 0.3,
    })
    for (const x of [-0.78, 0.78]) {
      const headlight = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.2, 0.08), lightMat)
      headlight.position.set(x, 0.85, 3.72)
      group.add(headlight)
    }

    group.position.set(14.8, 0, -14.2)
    group.rotation.y = -0.5
    this.scene.add(group)
    this.shootables.push(bed, cab)
    this.addCollider(group, 0)
    this.addContactShadow(14.8, -14.2, 7, 0.5)
  }

  buildDumpster() {
    const metal = createMetal(this.renderer)
    const mat = new THREE.MeshStandardMaterial({
      map: metal.map,
      color: 0x2e4b3d,
      roughness: 0.82,
      metalness: 0.35,
    })
    const group = new THREE.Group()
    const body = new THREE.Mesh(new THREE.BoxGeometry(2.3, 1.35, 1.4), mat)
    body.position.y = 0.75
    body.castShadow = true
    body.receiveShadow = true
    const lid = new THREE.Mesh(new THREE.BoxGeometry(2.36, 0.1, 1.46), mat)
    lid.position.y = 1.47
    lid.rotation.x = -0.06
    lid.castShadow = true
    group.add(body, lid)
    group.position.set(-18.2, 0, -10.8)
    group.rotation.y = 0.35
    this.scene.add(group)
    this.shootables.push(body)
    this.addCollider(group, 0)
    this.addContactShadow(-18.2, -10.8, 3.4, 0.5)
  }

  buildLamps() {
    const poleMat = new THREE.MeshStandardMaterial({ color: 0x2c3033, roughness: 0.55, metalness: 0.6 })
    const headMat = new THREE.MeshStandardMaterial({
      color: 0x2b2f31,
      roughness: 0.5,
      metalness: 0.55,
      emissive: 0xffb15e,
      emissiveIntensity: 5,
    })
    const poleGeo = new THREE.CylinderGeometry(0.09, 0.12, 6.4, 10)
    const armGeo = new THREE.BoxGeometry(1.5, 0.1, 0.12)
    const headGeo = new THREE.BoxGeometry(0.8, 0.18, 0.3)
    const poolTex = createLightPoolTexture(this.renderer)
    const poolMat = new THREE.MeshBasicMaterial({
      map: poolTex,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      opacity: 0.78,
    })

    const lamps = [
      [-18.5, -18.5],
      [18.5, -18.5],
      [-18.5, 18.5],
      [18.5, 18.5],
    ]
    lamps.forEach(([x, z], i) => {
      const group = new THREE.Group()
      const pole = new THREE.Mesh(poleGeo, poleMat)
      pole.position.y = 3.2
      pole.castShadow = true
      group.add(pole)

      const inwardX = -Math.sign(x)
      const inwardZ = -Math.sign(z)
      const arm = new THREE.Mesh(armGeo, poleMat)
      arm.position.set(inwardX * 0.72, 6.32, inwardZ * 0.72)
      arm.rotation.y = Math.atan2(inwardZ, inwardX)
      group.add(arm)

      const headMaterial = headMat.clone()
      const head = new THREE.Mesh(headGeo, headMaterial)
      head.position.set(inwardX * 1.4, 6.22, inwardZ * 1.4)
      head.lookAt(new THREE.Vector3(0, 6.22, 0))
      group.add(head)
      this.lampHeads.push({ mat: headMaterial, base: 5, phase: Math.random() * 10 })

      const pool = new THREE.Mesh(new THREE.PlaneGeometry(11, 11), poolMat)
      pool.rotation.x = -Math.PI / 2
      pool.position.set(inwardX * 1.6, 0.018, inwardZ * 1.6)
      group.add(pool)

      if (i < 3) {
        const light = new THREE.PointLight(0xffab5c, 32, 24, 2)
        light.position.set(inwardX * 1.4, 6.1, inwardZ * 1.4)
        group.add(light)
        this.lampLights.push({ light, base: 32, phase: Math.random() * 10 })
      }

      group.position.set(x, 0, z)
      this.scene.add(group)
      this.addContactShadow(x, z, 1.2, 0.5)
      this.addBoxCollider(x, z, 0.5, 0.5, 6.4)
    })
  }

  buildPallets() {
    const wood = new THREE.MeshStandardMaterial({ color: 0x6b5638, roughness: 0.92 })
    const geo = new THREE.BoxGeometry(1.1, 0.06, 0.14)
    const spots = [
      [-16.8, 7.2, 0.4],
      [11.8, -6.8, 1.1],
      [-4.5, 17.4, 0.1],
    ]
    const geos = []
    for (const [x, z, rot] of spots) {
      for (let i = 0; i < 5; i++) {
        const lz = (i - 2) * 0.22
        geos.push(
          transformed(geo, x + Math.sin(rot) * lz, 0.1, z + Math.cos(rot) * lz, 0, rot, 0)
        )
      }
      for (const px of [-0.4, 0.4]) {
        geos.push(
          transformed(
            new THREE.BoxGeometry(0.16, 0.12, 1.1),
            x + Math.cos(rot) * px,
            0.03,
            z - Math.sin(rot) * px,
            0,
            rot,
            0
          )
        )
      }
      this.addContactShadow(x, z, 1.5, 0.35)
    }
    const mesh = mergeMesh(geos, wood, true, true)
    if (mesh) {
      this.scene.add(mesh)
      this.shootables.push(mesh)
    }
  }

  buildFences() {
    const mat = new THREE.MeshStandardMaterial({ color: 0x3b3f40, roughness: 0.55, metalness: 0.65 })
    const postGeo = new THREE.BoxGeometry(0.08, 2.2, 0.08)
    const railGeo = new THREE.BoxGeometry(5.8, 0.05, 0.05)
    const segments = [
      [7.5, 22.6, 0],
      [-7.5, 22.6, 0],
      [-22.6, 11.5, Math.PI / 2],
      [22.6, -11.5, Math.PI / 2],
    ]
    const geos = []
    for (const [x, z, rot] of segments) {
      for (let i = 0; i < 4; i++) {
        const lx = -2.9 + i * 1.93
        geos.push(
          transformed(postGeo, x + Math.cos(rot) * lx, 1.1, z - Math.sin(rot) * lx, 0, rot, 0)
        )
      }
      for (const y of [0.35, 1.15, 2.1]) {
        geos.push(transformed(railGeo, x, y, z, 0, rot, 0))
      }
      this.addBoxCollider(x, z, rot === 0 ? 6 : 0.2, rot === 0 ? 0.2 : 6, 2.2)
      this.addContactShadow(x, z, 6, 0.22)
    }
    const mesh = mergeMesh(geos, mat, false, true)
    if (mesh) {
      this.scene.add(mesh)
      this.shootables.push(mesh)
    }
  }

  buildSkyline() {
    const mat = new THREE.MeshStandardMaterial({
      color: 0x0c1219,
      roughness: 0.95,
      metalness: 0.1,
    })
    const glowMat = new THREE.MeshBasicMaterial({ color: 0xff5a3c })
    const boxes = []
    const beacons = []
    for (let i = 0; i < 26; i++) {
      const angle = (i / 26) * Math.PI * 2 + Math.random() * 0.14
      const radius = 62 + Math.random() * 55
      const w = 5 + Math.random() * 12
      const d = 5 + Math.random() * 12
      const h = 8 + Math.random() * 34
      const bx = Math.cos(angle) * radius
      const bz = Math.sin(angle) * radius
      boxes.push(
        transformed(new THREE.BoxGeometry(w, h, d), bx, h / 2 - 1, bz, 0, Math.random() * Math.PI, 0)
      )
      if (Math.random() < 0.35) {
        beacons.push(transformed(new THREE.SphereGeometry(0.22, 6, 5), bx, h - 0.6, bz))
      }
    }
    const skyline = mergeMesh(boxes, mat, false, false)
    if (skyline) this.scene.add(skyline)
    const beaconMesh = mergeMesh(beacons, glowMat, false, false)
    if (beaconMesh) this.scene.add(beaconMesh)
    this.skylineMat = mat
  }

  buildDust() {
    const count = this.mobile ? 170 : 320
    const geo = new THREE.BufferGeometry()
    const pos = new Float32Array(count * 3)
    const speeds = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 70
      pos[i * 3 + 1] = Math.random() * 14 + 0.4
      pos[i * 3 + 2] = (Math.random() - 0.5) * 70
      speeds[i] = 0.04 + Math.random() * 0.16
    }
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    const mat = new THREE.PointsMaterial({
      size: 0.055,
      map: createDustTexture(this.renderer),
      transparent: true,
      opacity: 0.22,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      color: 0xffd9b0,
      sizeAttenuation: true,
    })
    const points = new THREE.Points(geo, mat)
    points.frustumCulled = false
    this.scene.add(points)
    this.dust = { points, speeds, count, phase: 0 }
  }

  buildSmoke() {
    const tex = createSmokeTexture(this.renderer)
    const spots = [
      [22, -27, 0],
      [-25, -22, 0],
      [27, 14, 0],
    ]
    spots.forEach(([x, z], idx) => {
      for (let i = 0; i < (this.mobile ? 4 : 7); i++) {
        const mat = new THREE.SpriteMaterial({
          map: tex,
          transparent: true,
          depthWrite: false,
          opacity: 0,
          color: idx === 0 ? 0x585b5d : 0x4c5052,
        })
        const sprite = new THREE.Sprite(mat)
        const base = new THREE.Vector3(x, 3 + Math.random() * 2, z)
        sprite.position.copy(base)
        sprite.scale.setScalar(2 + Math.random() * 2)
        this.scene.add(sprite)
        this.smoke.push({
          sprite,
          base,
          t: Math.random(),
          speed: 0.035 + Math.random() * 0.03,
          drift: (Math.random() - 0.5) * 0.4,
        })
      }
    })
  }

  buildSpawnPoints() {
    const candidates = [
      [0, -22], [-10, -22], [10, -22], [-22, -10], [-22, 6],
      [22, -8], [22, 8], [0, 22], [-12, 22], [12, 22],
      [-18, 0], [18, 14], [8, -16], [-8, 16], [-16, -15],
      [16, 16], [-20, 14], [20, -20], [-6, -18], [6, 20],
    ]
    this.spawnPoints = candidates.filter(([x, z]) => !this.collidesAt(x, z, 0.75))
  }

  collidesAt(x, z, radius = 0.36) {
    for (const c of this.colliders) {
      const nx = Math.max(c.minX, Math.min(x, c.maxX))
      const nz = Math.max(c.minZ, Math.min(z, c.maxZ))
      const dx = x - nx
      const dz = z - nz
      if (dx * dx + dz * dz < radius * radius) return true
    }
    return false
  }

  resolveMove(pos, dx, dz, radius = 0.36) {
    const limit = 25.4
    let nx = pos.x + dx
    if (Math.abs(nx) > limit) nx = Math.sign(nx) * limit
    if (!this.collidesAt(nx, pos.z, radius)) pos.x = nx
    let nz = pos.z + dz
    if (Math.abs(nz) > limit) nz = Math.sign(nz) * limit
    if (!this.collidesAt(pos.x, nz, radius)) pos.z = nz
  }

  hasLineOfSight(a, b) {
    for (const c of this.colliders) {
      if (this.segmentHitsBox(a, b, c)) return false
    }
    return true
  }

  segmentHitsBox(a, b, box) {
    const axes = ['x', 'y', 'z']
    let tmin = 0
    let tmax = 1
    for (const axis of axes) {
      const start = a[axis]
      const delta = b[axis] - a[axis]
      const min = axis === 'y' ? box.minY : box[`min${axis.toUpperCase()}`]
      const max = axis === 'y' ? box.maxY : box[`max${axis.toUpperCase()}`]
      if (Math.abs(delta) < 1e-6) {
        if (start < min || start > max) return false
      } else {
        let t1 = (min - start) / delta
        let t2 = (max - start) / delta
        if (t1 > t2) [t1, t2] = [t2, t1]
        tmin = Math.max(tmin, t1)
        tmax = Math.min(tmax, t2)
        if (tmin > tmax) return false
      }
    }
    return true
  }

  randomSpawnPoint(playerPos, minDistance = 13) {
    const valid = this.spawnPoints.filter(([x, z]) => {
      const dx = x - playerPos.x
      const dz = z - playerPos.z
      return dx * dx + dz * dz > minDistance * minDistance
    })
    const pool = valid.length ? valid : this.spawnPoints
    return pool[(Math.random() * pool.length) | 0] || [0, -20]
  }

  update(dt, elapsed) {
    this.time += dt

    if (this.dust) {
      const pos = this.dust.points.geometry.attributes.position
      const arr = pos.array
      for (let i = 0; i < this.dust.count; i++) {
        arr[i * 3 + 1] += this.dust.speeds[i] * dt
        arr[i * 3] += Math.sin(elapsed * 0.25 + i) * dt * 0.05
        if (arr[i * 3 + 1] > 15) {
          arr[i * 3 + 1] = 0.4
          arr[i * 3] = (Math.random() - 0.5) * 70
          arr[i * 3 + 2] = (Math.random() - 0.5) * 70
        }
      }
      pos.needsUpdate = true
    }

    for (const lamp of this.lampLights) {
      const flicker = 0.94 + Math.sin(this.time * 11 + lamp.phase) * 0.015 + Math.sin(this.time * 27 + lamp.phase) * 0.02
      lamp.light.intensity = lamp.base * flicker
    }
    for (const head of this.lampHeads) {
      const flicker = 0.95 + Math.sin(this.time * 9 + head.phase) * 0.05
      head.mat.emissiveIntensity = head.base * flicker
    }

    for (const s of this.smoke) {
      s.t += dt * s.speed
      if (s.t > 1) s.t -= 1
      const t = s.t
      s.sprite.position.set(
        s.base.x + t * 4 + Math.sin(t * 8 + s.drift) * 0.7,
        s.base.y + t * 7,
        s.base.z + t * 1.8
      )
      s.sprite.scale.setScalar(2 + t * 8)
      s.sprite.material.opacity = Math.sin(t * Math.PI) * 0.16
    }
  }
}
