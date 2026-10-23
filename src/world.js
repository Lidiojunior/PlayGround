import * as THREE from 'three'
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js'
import { initTextures } from './textures.js'

const SKY_VERT = /* glsl */`
varying vec3 vDir;
void main() {
  vDir = normalize(position);
  vec4 p = modelViewMatrix * vec4(position, 1.0);
  gl_Position = projectionMatrix * p;
}
`

const SKY_FRAG = /* glsl */`
varying vec3 vDir;
uniform vec3 sunDir;
uniform float time;
uniform float storm;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}
float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}
float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p = p * 2.02 + 13.1;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec3 dir = normalize(vDir);
  float h = dir.y;
  vec3 zenith = mix(vec3(0.045, 0.085, 0.16), vec3(0.10, 0.15, 0.24), 1.0 - storm);
  vec3 horizon = mix(vec3(0.66, 0.47, 0.31), vec3(0.44, 0.38, 0.34), storm);
  vec3 ground = vec3(0.13, 0.11, 0.09);
  float t = clamp(h, 0.0, 1.0);
  vec3 col = mix(horizon, zenith, pow(t, 0.52));
  col = mix(col, ground, smoothstep(0.002, -0.14, h));

  float sd = max(dot(dir, normalize(sunDir)), 0.0);
  col += vec3(1.0, 0.52, 0.20) * pow(sd, 7.0) * 0.34;
  col += vec3(1.0, 0.68, 0.32) * pow(sd, 90.0) * 0.75;
  col += vec3(1.0, 0.86, 0.58) * pow(sd, 900.0) * 2.4;

  vec2 cuv = dir.xz / (abs(dir.y) + 0.28);
  float cl = fbm(cuv * 0.9 + vec2(time * 0.004, time * 0.0015));
  cl = smoothstep(0.42, 0.82, cl) * smoothstep(0.01, 0.28, dir.y);
  float cl2 = fbm(cuv * 2.1 - vec2(time * 0.007, 0.0));
  cl2 = smoothstep(0.55, 0.9, cl2) * smoothstep(0.03, 0.4, dir.y);
  vec3 cloudCol = mix(vec3(0.72, 0.52, 0.40), vec3(0.26, 0.24, 0.24), storm);
  cloudCol += vec3(1.0, 0.55, 0.25) * pow(sd, 4.0) * 0.5;
  col = mix(col, cloudCol, cl * 0.55);
  col = mix(col, cloudCol * 0.86, cl2 * 0.35);

  float band = smoothstep(0.012, 0.0, abs(h - 0.005)) * (1.0 - storm * 0.5);
  col += vec3(0.9, 0.5, 0.24) * band * 0.16;
  float dither = (hash(gl_FragCoord.xy) - 0.5) / 255.0;
  gl_FragColor = vec4(col + dither, 1.0);
}
`

function cloneTex(tex, rx, ry) {
  if (!tex) return null
  const t = tex.clone()
  t.needsUpdate = true
  t.repeat.set(rx, ry)
  return t
}

function canvasTexture(w, h, draw, { srgb = true } = {}) {
  const canvas = document.createElement('canvas')
  canvas.width = w
  canvas.height = h
  const ctx = canvas.getContext('2d')
  draw(ctx, w, h)
  const t = new THREE.CanvasTexture(canvas)
  t.colorSpace = srgb ? THREE.SRGBColorSpace : THREE.NoColorSpace
  t.anisotropy = 4
  return t
}

function makeSignTexture(text, sub = '', opts = {}) {
  const w = 512
  const h = 256
  return canvasTexture(w, h, (ctx) => {
    ctx.fillStyle = opts.bg || '#b89a58'
    ctx.fillRect(0, 0, w, h)
    const g = ctx.createLinearGradient(0, 0, 0, h)
    g.addColorStop(0, 'rgba(255,255,255,0.08)')
    g.addColorStop(1, 'rgba(0,0,0,0.24)')
    ctx.fillStyle = g
    ctx.fillRect(0, 0, w, h)
    ctx.strokeStyle = opts.ink || '#171510'
    ctx.lineWidth = 14
    ctx.strokeRect(16, 16, w - 32, h - 32)
    ctx.fillStyle = opts.ink || '#171510'
    ctx.font = 'bold 74px Arial'
    ctx.textAlign = 'center'
    ctx.fillText(text, w / 2, h / 2 + 8)
    if (sub) {
      ctx.font = 'bold 28px monospace'
      ctx.fillText(sub, w / 2, h / 2 + 62)
    }
    for (let i = 0; i < 220; i++) {
      ctx.fillStyle = `rgba(${40 + Math.random() * 30},${34 + Math.random() * 24},${24 + Math.random() * 20},${Math.random() * 0.14})`
      ctx.fillRect(Math.random() * w, Math.random() * h, Math.random() * 26 + 2, Math.random() * 6 + 1)
    }
    ctx.strokeStyle = 'rgba(30,26,20,0.5)'
    ctx.lineWidth = 3
    for (let i = 0; i < 8; i++) {
      ctx.beginPath()
      ctx.moveTo(Math.random() * w, Math.random() * h)
      ctx.lineTo(Math.random() * w, Math.random() * h)
      ctx.stroke()
    }
  })
}

function makeCityTexture() {
  return canvasTexture(512, 512, (ctx, w, h) => {
    ctx.fillStyle = '#0b0d10'
    ctx.fillRect(0, 0, w, h)
    for (let y = 0; y < 26; y++) {
      for (let x = 0; x < 26; x++) {
        if (Math.random() > 0.72) continue
        const lit = Math.random() > 0.55
        ctx.fillStyle = lit ? `rgba(${220 + Math.random() * 30},${170 + Math.random() * 40},${90 + Math.random() * 40},${0.5 + Math.random() * 0.5})` : 'rgba(18,22,26,0.9)'
        ctx.fillRect(6 + x * 19, 6 + y * 19, 10, 11)
      }
    }
  })
}

function makeChainTexture() {
  return canvasTexture(128, 128, (ctx, w, h) => {
    ctx.clearRect(0, 0, w, h)
    ctx.strokeStyle = 'rgba(150,152,145,0.8)'
    ctx.lineWidth = 2
    for (let i = -4; i < 12; i++) {
      ctx.beginPath()
      ctx.moveTo(i * 16, 0)
      ctx.lineTo(i * 16 + h, h)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(i * 16, h)
      ctx.lineTo(i * 16 + h, 0)
      ctx.stroke()
    }
  })
}

function makeScorchTexture() {
  return canvasTexture(256, 256, (ctx, w, h) => {
    const g = ctx.createRadialGradient(w / 2, h / 2, 4, w / 2, h / 2, w / 2)
    g.addColorStop(0, 'rgba(8,7,6,0.9)')
    g.addColorStop(0.45, 'rgba(16,14,11,0.55)')
    g.addColorStop(1, 'rgba(20,18,14,0)')
    ctx.fillStyle = g
    ctx.fillRect(0, 0, w, h)
    ctx.strokeStyle = 'rgba(10,9,7,0.5)'
    for (let i = 0; i < 22; i++) {
      const a = Math.random() * Math.PI * 2
      ctx.lineWidth = 1 + Math.random() * 2
      ctx.beginPath()
      ctx.moveTo(w / 2, h / 2)
      ctx.lineTo(w / 2 + Math.cos(a) * (30 + Math.random() * 90), h / 2 + Math.sin(a) * (30 + Math.random() * 90))
      ctx.stroke()
    }
  })
}

function makeFlagTexture() {
  return canvasTexture(256, 160, (ctx, w, h) => {
    ctx.fillStyle = '#2c3128'
    ctx.fillRect(0, 0, w, h)
    ctx.fillStyle = 'rgba(190,170,120,0.85)'
    ctx.beginPath()
    ctx.arc(w * 0.32, h * 0.5, 26, 0, Math.PI * 2)
    ctx.fill()
    ctx.fillStyle = 'rgba(60,40,30,0.8)'
    ctx.fillRect(20, h * 0.7, w - 40, 8)
    ctx.fillStyle = 'rgba(220,220,205,0.65)'
    for (let i = 0; i < 40; i++) ctx.fillRect(Math.random() * w, Math.random() * h, Math.random() * 18, 1)
    ctx.fillStyle = 'rgba(0,0,0,0.35)'
    ctx.fillRect(0, 0, w, 12)
    ctx.fillRect(0, h - 12, w, 12)
  })
}

export async function createWorld(scene, renderer, settings) {
  const T = initTextures()
  const mobile = settings.mobile
  const colliders = []
  const blockers = []
  const spawnPoints = [
    new THREE.Vector3(0, 0, -28),
    new THREE.Vector3(-27, 0, -14),
    new THREE.Vector3(28, 0, -10),
    new THREE.Vector3(-26, 0, 20),
    new THREE.Vector3(27, 0, 18),
    new THREE.Vector3(-15, 0, -26),
    new THREE.Vector3(18, 0, -24),
    new THREE.Vector3(-20, 0, 14),
    new THREE.Vector3(20, 0, 11),
    new THREE.Vector3(-14, 0, 2),
    new THREE.Vector3(13, 0, -8),
    new THREE.Vector3(-2, 0, -20),
    new THREE.Vector3(23, 0, -2),
    new THREE.Vector3(-1, 0, -10),
    new THREE.Vector3(10, 0, -14),
    new THREE.Vector3(-12, 0, -12),
    new THREE.Vector3(14, 0, 4),
    new THREE.Vector3(-16, 0, 6),
    new THREE.Vector3(6, 0, -2),
    new THREE.Vector3(-6, 0, -2),
    new THREE.Vector3(10, 0, 3),
    new THREE.Vector3(-10, 0, 3),
    new THREE.Vector3(0, 0, -4)
  ]
  const playerSpawn = new THREE.Vector3(0, 1.72, 21)

  const sunDirection = new THREE.Vector3(-0.52, 0.26, -0.81).normalize()
  const skyUniforms = {
    sunDir: { value: sunDirection },
    time: { value: 0 },
    storm: { value: 0.22 }
  }

  const sky = new THREE.Mesh(
    new THREE.SphereGeometry(420, 48, 24),
    new THREE.ShaderMaterial({
      uniforms: skyUniforms,
      vertexShader: SKY_VERT,
      fragmentShader: SKY_FRAG,
      side: THREE.BackSide,
      depthWrite: false,
      fog: false
    })
  )
  sky.frustumCulled = false
  scene.add(sky)

  const envScene = new THREE.Scene()
  const envSky = new THREE.Mesh(new THREE.SphereGeometry(50, 32, 16), sky.material)
  envScene.add(envSky)
  const pmrem = new THREE.PMREMGenerator(renderer)
  pmrem.compileCubemapShader()
  const envRT = pmrem.fromScene(envScene, 0.04, 0.1, 100)
  scene.environment = envRT.texture
  scene.environmentIntensity = 0.42
  pmrem.dispose()
  envSky.geometry.dispose()

  scene.fog = new THREE.FogExp2(0x786653, mobile ? 0.0065 : 0.0048)

  const mats = {
    sand: new THREE.MeshStandardMaterial({
      map: cloneTex(T.sand.map, 34, 34),
      normalMap: cloneTex(T.sand.normalMap, 34, 34),
      roughnessMap: cloneTex(T.sand.roughnessMap, 34, 34),
      roughness: 0.98,
      metalness: 0,
      color: 0xd2bd9a,
      normalScale: new THREE.Vector2(0.85, 0.85),
      envMapIntensity: 0.55
    }),
    concretePad: new THREE.MeshStandardMaterial({
      map: cloneTex(T.concrete.map, 13, 13),
      normalMap: cloneTex(T.concrete.normalMap, 13, 13),
      roughnessMap: cloneTex(T.concrete.roughnessMap, 13, 13),
      roughness: 0.94,
      metalness: 0,
      color: 0xc4b6a0,
      normalScale: new THREE.Vector2(1.05, 1.05),
      envMapIntensity: 0.5
    }),
    wall: new THREE.MeshStandardMaterial({
      map: cloneTex(T.concrete.map, 3.2, 1.15),
      normalMap: cloneTex(T.concrete.normalMap, 3.2, 1.15),
      roughnessMap: cloneTex(T.concrete.roughnessMap, 3.2, 1.15),
      color: 0xbcb3a1,
      roughness: 0.92,
      metalness: 0,
      normalScale: new THREE.Vector2(1.1, 1.1),
      envMapIntensity: 0.5
    }),
    concrete: new THREE.MeshStandardMaterial({
      map: cloneTex(T.concrete.map, 1.6, 1.6),
      normalMap: cloneTex(T.concrete.normalMap, 1.6, 1.6),
      roughnessMap: cloneTex(T.concrete.roughnessMap, 1.6, 1.6),
      color: 0xb3ab9a,
      roughness: 0.9,
      metalness: 0.02,
      normalScale: new THREE.Vector2(1, 1),
      envMapIntensity: 0.55
    }),
    metal: new THREE.MeshStandardMaterial({
      map: cloneTex(T.metal.map, 1.6, 1.6),
      normalMap: cloneTex(T.metal.normalMap, 1.6, 1.6),
      roughnessMap: cloneTex(T.metal.roughnessMap, 1.6, 1.6),
      roughness: 0.52,
      metalness: 0.82,
      color: 0x8b8d85,
      envMapIntensity: 0.9
    }),
    darkMetal: new THREE.MeshStandardMaterial({
      map: cloneTex(T.metal.map, 1.2, 1.2),
      normalMap: cloneTex(T.metal.normalMap, 1.2, 1.2),
      roughness: 0.5,
      metalness: 0.85,
      color: 0x3c4039,
      envMapIntensity: 0.9
    }),
    rust: new THREE.MeshStandardMaterial({
      map: cloneTex(T.metal.map, 1, 1),
      normalMap: cloneTex(T.metal.normalMap, 1, 1),
      roughness: 0.78,
      metalness: 0.55,
      color: 0x9a6844,
      envMapIntensity: 0.7
    }),
    wood: new THREE.MeshStandardMaterial({
      map: cloneTex(T.wood.map, 1, 1),
      normalMap: cloneTex(T.wood.normalMap, 1, 1),
      roughness: 0.84,
      metalness: 0,
      envMapIntensity: 0.45
    }),
    fabric: new THREE.MeshStandardMaterial({
      map: cloneTex(T.fabric.map, 1, 1),
      normalMap: cloneTex(T.fabric.normalMap, 1, 1),
      roughness: 0.96,
      metalness: 0,
      envMapIntensity: 0.4
    }),
    sandbag: new THREE.MeshStandardMaterial({
      map: cloneTex(T.fabric.map, 0.45, 0.3),
      normalMap: cloneTex(T.fabric.normalMap, 0.45, 0.3),
      roughness: 0.98,
      metalness: 0,
      color: 0xb7a276,
      envMapIntensity: 0.35
    }),
    rubber: new THREE.MeshStandardMaterial({ color: 0x101110, roughness: 0.9, metalness: 0 }),
    paint: new THREE.MeshStandardMaterial({ color: 0x1f2420, roughness: 0.6, metalness: 0.15 }),
    hazard: new THREE.MeshStandardMaterial({ color: 0xb78b2f, roughness: 0.7, metalness: 0.1 }),
    glass: new THREE.MeshStandardMaterial({ color: 0x121a1c, roughness: 0.12, metalness: 0.65, envMapIntensity: 1.4 }),
    lamp: new THREE.MeshStandardMaterial({ color: 0x222222, emissive: 0xffd9a0, emissiveIntensity: 5, roughness: 0.4 }),
    lampRed: new THREE.MeshStandardMaterial({ color: 0x330000, emissive: 0xff2a12, emissiveIntensity: 4, roughness: 0.4 }),
    tarp: new THREE.MeshStandardMaterial({ color: 0x4a4a36, roughness: 0.9, metalness: 0, side: THREE.DoubleSide }),
    asphalt: new THREE.MeshStandardMaterial({ color: 0x2a2925, roughness: 0.92, metalness: 0.04 })
  }
  const cityTex = makeCityTexture()
  const cityMat = new THREE.MeshStandardMaterial({
    map: cityTex,
    emissiveMap: cityTex,
    emissive: 0xffc27a,
    emissiveIntensity: 0.7,
    color: 0x232a30,
    roughness: 0.85,
    metalness: 0.1,
    fog: true
  })

  const world = new THREE.Group()
  world.name = 'world'
  scene.add(world)

  function addMesh(mesh, { cast = true, receive = true, collide = false, blocker = false, ry = 0 } = {}) {
    mesh.castShadow = cast
    mesh.receiveShadow = receive
    if (ry) mesh.rotation.y = ry
    world.add(mesh)
    if (blocker) blockers.push(mesh)
    if (collide) {
      const sx = Math.abs(Math.cos(ry)) * (mesh.geometry.parameters?.width ?? 1) + Math.abs(Math.sin(ry)) * (mesh.geometry.parameters?.depth ?? 1)
      const sz = Math.abs(Math.sin(ry)) * (mesh.geometry.parameters?.width ?? 1) + Math.abs(Math.cos(ry)) * (mesh.geometry.parameters?.depth ?? 1)
      addCollider(mesh.position.x, mesh.position.z, sx, sz)
    }
    return mesh
  }

  function addCollider(cx, cz, w, d, pad = 0) {
    colliders.push({
      minX: cx - w / 2 - pad,
      maxX: cx + w / 2 + pad,
      minZ: cz - d / 2 - pad,
      maxZ: cz + d / 2 + pad
    })
  }

  function box(w, h, d, mat, x, y, z, ry = 0, opts = {}) {
    const geo = new THREE.BoxGeometry(w, h, d)
    const m = new THREE.Mesh(geo, mat)
    m.position.set(x, y, z)
    m.rotation.y = ry
    return addMesh(m, opts)
  }

  function cyl(rTop, rBot, h, seg, mat, x, y, z, ry = 0, opts = {}) {
    const m = new THREE.Mesh(new THREE.CylinderGeometry(rTop, rBot, h, seg), mat)
    m.position.set(x, y, z)
    m.rotation.y = ry
    return addMesh(m, opts)
  }

  // -------------------- ground --------------------
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(320, 320, 1, 1), mats.sand)
  ground.rotation.x = -Math.PI / 2
  ground.receiveShadow = true
  ground.castShadow = false
  ground.position.y = 0
  world.add(ground)
  blockers.push(ground)

  const pad = new THREE.Mesh(new THREE.PlaneGeometry(52, 52), mats.concretePad)
  pad.rotation.x = -Math.PI / 2
  pad.position.set(0, 0.015, 0)
  pad.receiveShadow = true
  world.add(pad)
  blockers.push(pad)

  // worn road running north
  const road = new THREE.Mesh(new THREE.PlaneGeometry(9, 76), mats.asphalt)
  road.rotation.x = -Math.PI / 2
  road.position.set(0, 0.02, -6)
  road.receiveShadow = true
  world.add(road)
  blockers.push(road)

  // scorch marks
  const scorchMat = new THREE.MeshBasicMaterial({
    map: makeScorchTexture(), transparent: true, opacity: 0.7, depthWrite: false, color: 0x0b0a08
  })
  for (const [x, z, s, r] of [[2.5, 5, 2.2, 0.4], [-8, -9, 1.5, 1.2], [13, -13, 2.8, 2.4], [-19, 14, 1.8, 0.2]]) {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(s, s), scorchMat)
    m.rotation.x = -Math.PI / 2
    m.rotation.z = r
    m.position.set(x, 0.03, z)
    world.add(m)
  }

  // puddles
  const puddleMat = new THREE.MeshStandardMaterial({ color: 0x0a0c0b, roughness: 0.3, metalness: 0.35, envMapIntensity: 0.55, transparent: true, opacity: 0.4 })
  for (const [x, z, s] of [[-4, 15, 1.6], [6, -3, 2.2], [17, 9, 1.2], [-13, 3, 1.4]]) {
    const m = new THREE.Mesh(new THREE.CircleGeometry(s, 20), puddleMat)
    m.rotation.x = -Math.PI / 2
    m.scale.y = 0.55
    m.position.set(x, 0.035, z)
    world.add(m)
  }

  // -------------------- perimeter walls --------------------
  const W = 31.5
  const wallH = 2.9
  const wallT = 0.55
  const wallSegments = [
    [-20.5, -W, 21, 0], [20.5, -W, 21, 0],
    [-25, W, 12, 0], [24, W, 14, 0],
    [-W, -18, 26, Math.PI / 2], [-W, 15, 18, Math.PI / 2],
    [W, -17, 24, Math.PI / 2], [W, 16, 20, Math.PI / 2]
  ]
  for (const [x, z, len, r] of wallSegments) {
    box(len, wallH, wallT, mats.wall, x, wallH / 2, z, r, { collide: true, blocker: true })
    const cap = box(len + 0.12, 0.1, wallT + 0.14, mats.concrete, x, wallH + 0.05, z, r, { cast: false })
    cap.receiveShadow = true
    for (let i = -1; i <= 1; i += 2) {
      const px = r === 0 ? x + i * len * 0.32 : x
      const pz = r === 0 ? z : z + i * len * 0.32
      box(0.28, wallH + 0.16, wallT + 0.1, mats.concrete, px, (wallH + 0.16) / 2, pz, r, { collide: false })
    }
  }

  // wall reinforcement / sand drifts
  const driftGeo = new THREE.SphereGeometry(1, 10, 6)
  const driftMat = new THREE.MeshStandardMaterial({ color: 0xa8916c, roughness: 1, metalness: 0, flatShading: true })
  const driftSpots = [
    [-22, -28.6, 2.4, 0.8], [-10, -30.5, 2.0, 0.7], [8, -30.2, 2.6, 0.9],
    [25, -28, 2.2, 0.8], [-28.5, -5, 2.5, 0.8], [29.5, 8, 2.3, 0.7], [-20, 29, 3, 0.8], [18, 29.5, 2.6, 0.7]
  ]
  for (const [x, z, sx, sy] of driftSpots) {
    const m = new THREE.Mesh(driftGeo, driftMat)
    m.position.set(x, 0.05, z)
    m.scale.set(sx, sy, sx * 0.7)
    m.receiveShadow = true
    world.add(m)
  }

  // signs
  const signA = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 1.2), new THREE.MeshStandardMaterial({ map: makeSignTexture('POSTO ALFA', 'SETOR 07 // RESTRITO'), roughness: 0.8, metalness: 0.05 }))
  signA.position.set(-4.4, 1.75, -30.7)
  world.add(signA)
  const signB = new THREE.Mesh(new THREE.PlaneGeometry(1.7, 0.85), new THREE.MeshStandardMaterial({ map: makeSignTexture('PERIGO', 'ZONA DE TIRO', { bg: '#a8823c' }), roughness: 0.8 }))
  signB.position.set(29.1, 1.5, -9)
  signB.rotation.y = -Math.PI / 2
  world.add(signB)

  // -------------------- barracks --------------------
  const bx = -19
  const bz = -17
  const bw = 12
  const bd = 7
  const bh = 4.1
  box(bw, 0.24, bd, mats.concrete, bx, 0.12, bz, 0, { collide: false })
  box(bw, bh, 0.4, mats.wall, bx, bh / 2, bz - bd / 2, 0, { collide: true, blocker: true })
  box(4.6, bh, 0.4, mats.wall, bx - 3.7, bh / 2, bz + bd / 2, 0, { collide: true, blocker: true })
  box(4.6, bh, 0.4, mats.wall, bx + 3.7, bh / 2, bz + bd / 2, 0, { collide: true, blocker: true })
  box(2.8, 1.1, 0.42, mats.wall, bx, bh - 0.55, bz + bd / 2, 0, { collide: false, blocker: true })
  box(0.4, bh, bd, mats.wall, bx - bw / 2, bh / 2, bz, 0, { collide: true, blocker: true })
  box(0.4, bh, bd, mats.wall, bx + bw / 2, bh / 2, bz, 0, { collide: true, blocker: true })
  box(bw + 0.7, 0.32, bd + 0.7, mats.concrete, bx, bh + 0.16, bz, 0, { cast: true })
  // interior floor
  box(bw - 0.8, 0.06, bd - 0.8, mats.concretePad, bx, 0.26, bz, 0, { cast: false })
  // window slits
  for (const ox of [-4.2, 0, 4.2]) {
    const win = new THREE.Mesh(new THREE.PlaneGeometry(1.5, 0.6), mats.glass)
    win.position.set(bx + ox, 2.5, bz + bd / 2 + 0.205)
    world.add(win)
    box(1.85, 0.12, 0.34, mats.concrete, bx + ox, 2.85, bz + bd / 2 + 0.02)
  }
  // door frame
  box(2.9, 0.16, 0.5, mats.darkMetal, bx, 2.58, bz + bd / 2, 0, { cast: false })
  // interior props
  box(2.2, 0.8, 0.9, mats.wood, bx - 3.5, 0.65, bz - 2.2)
  box(1.8, 0.75, 0.8, mats.metal, bx + 3.6, 0.62, bz - 2.4)
  box(0.5, 1.2, 0.5, mats.darkMetal, bx + 2.6, 0.85, bz - 1.5)
  const screens = new THREE.Group()
  for (let i = 0; i < 3; i++) {
    const scr = new THREE.Mesh(new THREE.PlaneGeometry(0.55, 0.35), new THREE.MeshBasicMaterial({ color: i === 1 ? 0x7fd8c5 : 0x375f56 }))
    scr.position.set(bx - 2.2 + i * 0.65, 1.85, bz - 3.44)
    screens.add(scr)
  }
  const radioBox = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.9, 0.6), mats.darkMetal)
  radioBox.position.set(bx - 1.6, 1.35, bz - 3.2)
  radioBox.castShadow = true
  world.add(radioBox)
  world.add(screens)
  const bulb = new THREE.PointLight(0xffc27a, mobile ? 12 : 18, 9, 2)
  bulb.position.set(bx, 3.2, bz)
  world.add(bulb)
  const bulbMesh = new THREE.Mesh(new THREE.SphereGeometry(0.07, 8, 8), mats.lamp)
  bulbMesh.position.copy(bulb.position)
  world.add(bulbMesh)

  // -------------------- comms shed --------------------
  const sx = 20
  const sz = -20
  box(8, 3.4, 6, mats.wall, sx, 1.7, sz, 0, { collide: true, blocker: true })
  box(8.4, 0.25, 6.4, mats.concrete, sx, 3.5, sz)
  box(2.2, 2.2, 0.2, mats.darkMetal, sx, 1.25, sz + 3.02, 0, { cast: false })
  const shedGlow = new THREE.PointLight(0x9fd8cc, 8, 6, 2)
  shedGlow.position.set(sx, 2.3, sz + 2.2)
  world.add(shedGlow)
  // antenna mast
  const mastX = sx + 2.6
  const mastZ = sz - 1.2
  cyl(0.09, 0.12, 9, 8, mats.darkMetal, mastX, 4.5, mastZ, 0, { collide: false })
  for (let i = 0; i < 5; i++) {
    const y = 3 + i * 1.4
    const arm = new THREE.Mesh(new THREE.BoxGeometry(1.6 - i * 0.14, 0.05, 0.05), mats.darkMetal)
    arm.position.set(mastX, y, mastZ)
    arm.rotation.y = i * 0.7
    world.add(arm)
    const tip = new THREE.Mesh(new THREE.SphereGeometry(0.045, 6, 6), mats.lampRed)
    tip.position.set(mastX + (1.6 - i * 0.14) / 2, y, mastZ)
    world.add(tip)
  }
  const dish = new THREE.Mesh(new THREE.SphereGeometry(0.8, 16, 10, 0, Math.PI * 2, 0, Math.PI / 2.6), mats.metal)
  dish.rotation.set(0.9, 0.8, 0)
  dish.position.set(sx - 1.2, 4.4, sz - 2.4)
  dish.castShadow = true
  world.add(dish)
  const dishArm = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 1.6, 6), mats.darkMetal)
  dishArm.position.set(sx - 1.2, 4.4, sz - 2.4)
  dishArm.rotation.z = 0.9
  world.add(dishArm)

  // -------------------- watchtower --------------------
  const tx = -7
  const tz = -27
  const legMat = mats.darkMetal
  for (const [ox, oz] of [[-1.4, -1.4], [1.4, -1.4], [-1.4, 1.4], [1.4, 1.4]]) {
    const leg = new THREE.Mesh(new THREE.BoxGeometry(0.22, 5.6, 0.22), legMat)
    leg.position.set(tx + ox, 2.8, tz + oz)
    leg.rotation.z = ox * 0.012
    leg.castShadow = true
    world.add(leg)
    addCollider(tx + ox, tz + oz, 0.34, 0.34)
    blockers.push(leg)
  }
  box(3.6, 0.28, 3.6, mats.wood, tx, 5.4, tz)
  for (const [ox, oz, w, d] of [[0, -1.7, 3.6, 0.12], [0, 1.7, 3.6, 0.12], [-1.7, 0, 0.12, 3.6], [1.7, 0, 0.12, 3.6]]) {
    box(w, 0.9, d, mats.darkMetal, tx + ox, 6.0, tz + oz)
  }
  box(4.0, 0.16, 4.0, mats.metal, tx, 7.15, tz)
  for (const [ox, oz] of [[-1.8, -1.8], [1.8, -1.8], [-1.8, 1.8], [1.8, 1.8]]) {
    box(0.14, 1.75, 0.14, mats.darkMetal, tx + ox, 6.25, tz + oz)
  }
  // ladder
  for (let i = 0; i < 10; i++) {
    const rung = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.05, 0.05), mats.darkMetal)
    rung.position.set(tx + 1.75, 0.7 + i * 0.5, tz + 1.75)
    world.add(rung)
  }
  box(0.06, 5.3, 0.06, mats.darkMetal, tx + 1.42, 2.9, tz + 1.75)
  box(0.06, 5.3, 0.06, mats.darkMetal, tx + 2.08, 2.9, tz + 1.75)
  // sandbags on platform
  const towerBag = new THREE.Mesh(new RoundedBoxGeometry(0.7, 0.28, 0.34, 2, 0.08), mats.sandbag)
  towerBag.position.set(tx - 0.9, 5.68, tz - 1.2)
  towerBag.castShadow = true
  world.add(towerBag)

  // -------------------- containers --------------------
  function container(x, z, ry, color) {
    const g = new THREE.Group()
    const bodyMat = new THREE.MeshStandardMaterial({
      map: cloneTex(T.metal.map, 3.4, 1.3),
      normalMap: cloneTex(T.metal.normalMap, 3.4, 1.3),
      roughness: 0.72,
      metalness: 0.6,
      color,
      envMapIntensity: 0.7
    })
    const body = new THREE.Mesh(new THREE.BoxGeometry(6.1, 2.6, 2.44), bodyMat)
    body.position.y = 1.3
    body.castShadow = body.receiveShadow = true
    g.add(body)
    for (let i = 0; i < 15; i++) {
      const rib = new THREE.Mesh(new THREE.BoxGeometry(0.08, 2.5, 0.06), mats.darkMetal)
      rib.position.set(-2.85 + i * 0.4, 1.3, 1.24)
      g.add(rib)
      const rib2 = rib.clone()
      rib2.position.z = -1.24
      g.add(rib2)
    }
    for (const ox of [-2.5, 2.5]) {
      const bar = new THREE.Mesh(new THREE.BoxGeometry(0.14, 2.5, 2.5), mats.darkMetal)
      bar.position.set(ox, 1.3, 0)
      g.add(bar)
    }
    for (const oz of [-1, 1]) {
      const bar = new THREE.Mesh(new THREE.BoxGeometry(6.1, 0.12, 0.12), mats.darkMetal)
      bar.position.set(0, oz > 0 ? 2.62 : 0.04, oz * 1.22)
      g.add(bar)
    }
    g.position.set(x, 0, z)
    g.rotation.y = ry
    g.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true } })
    world.add(g)
    addCollider(x, z, 6.5, 2.9)
    blockers.push(body)
    return g
  }
  container(12.5, 0.5, 0.06, 0x6c5b40)
  container(-23.5, 7.5, 1.25, 0x4a5347)
  container(23, 22, -0.18, 0x69503a)

  // -------------------- sandbag emplacements --------------------
  const bagGeo = new RoundedBoxGeometry(0.62, 0.26, 0.36, 2, 0.09)
  const bagPositions = []
  function sandbagWall(cx, cz, len, ry, rows = 3) {
    const count = Math.floor(len / 0.62)
    for (let r = 0; r < rows; r++) {
      for (let i = 0; i < count; i++) {
        const lx = -len / 2 + 0.31 + i * 0.62 + (r % 2 ? 0.16 : 0)
        const lz = (r - (rows - 1) / 2) * 0.28
        const px = cx + Math.cos(ry) * lx - Math.sin(ry) * lz
        const pz = cz + Math.sin(ry) * lx + Math.cos(ry) * lz
        bagPositions.push({
          x: px,
          y: 0.15 + r * 0.235,
          z: pz,
          ry: ry + (Math.random() - 0.5) * 0.18,
          rx: (Math.random() - 0.5) * 0.08,
          rz: (Math.random() - 0.5) * 0.08,
          s: 0.94 + Math.random() * 0.12
        })
      }
    }
    addCollider(cx, cz, Math.abs(Math.cos(ry)) * len + Math.abs(Math.sin(ry)) * rows * 0.3 + 0.2, Math.abs(Math.sin(ry)) * len + Math.abs(Math.cos(ry)) * rows * 0.3 + 0.2)
  }
  sandbagWall(-9, 8, 4.4, 0.12, 3)
  sandbagWall(9, 11, 4.6, -0.18, 3)
  sandbagWall(15, -7, 3.8, 0.9, 3)
  sandbagWall(-15, -3, 4.2, -0.9, 3)
  sandbagWall(0, -7, 3.2, 0, 2)
  sandbagWall(4.8, -6.8, 2.6, 1.1, 2)
  sandbagWall(-6, 19, 4.6, 0.02, 3)
  sandbagWall(20, 12, 3.4, -0.6, 2)
  const bagMesh = new THREE.InstancedMesh(bagGeo, mats.sandbag, bagPositions.length)
  bagMesh.castShadow = true
  bagMesh.receiveShadow = true
  const dummy = new THREE.Object3D()
  bagPositions.forEach((b, i) => {
    dummy.position.set(b.x, b.y, b.z)
    dummy.rotation.set(b.rx, b.ry, b.rz)
    dummy.scale.setScalar(b.s)
    dummy.updateMatrix()
    bagMesh.setMatrixAt(i, dummy.matrix)
  })
  bagMesh.instanceMatrix.needsUpdate = true
  world.add(bagMesh)
  blockers.push(bagMesh)

  // -------------------- crates --------------------
  function crate(x, z, size, y = 0, ry = 0, color = 0xffffff) {
    const mat = mats.wood
    const c = box(size, size, size, mat, x, y + size / 2, z, ry, { collide: false })
    c.material = mat
    const edge = 0.055
    for (const [ex, ey, ez, w, h, d] of [
      [0, size / 2 - edge, size / 2, size + 0.02, edge * 1.3, edge * 1.3],
      [0, -size / 2 + edge, size / 2, size + 0.02, edge * 1.3, edge * 1.3],
      [0, size / 2 - edge, -size / 2, size + 0.02, edge * 1.3, edge * 1.3],
      [0, -size / 2 + edge, -size / 2, size + 0.02, edge * 1.3, edge * 1.3],
      [size / 2, 0, 0, edge * 1.3, size, edge * 1.3],
      [-size / 2, 0, 0, edge * 1.3, size, edge * 1.3]
    ]) {
      const bar = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mats.darkMetal)
      bar.position.set(ex, ey, ez)
      if (ex === 0 && Math.abs(ez) > 0) bar.scale.set(1, 1, 1)
      c.add(bar)
    }
    return c
  }
  const crateSpots = [
    [22, 14, 1.3, 0, 0.1], [23.4, 14.3, 1.05, 0, 0.5], [22.4, 14.1, 1.1, 1.3, 0.25],
    [-20, 20, 1.2, 0, -0.2], [-18.7, 20.6, 1.0, 0, 0.4], [-21.2, 21.4, 1.3, 0, 0.15],
    [5, -14, 1.15, 0, 0.3], [6.2, -13.8, 0.95, 0, 0.9], [5.1, -14.1, 0.9, 1.15, 0.1],
    [16, 20, 1.2, 0, -0.3], [15, 20.8, 1.0, 0, 0.2],
    [-8, 23.5, 1.1, 0, 0.5], [-9.2, 23.2, 1.35, 0, 0.05]
  ]
  for (const [x, z, s, y, r] of crateSpots) crate(x, z, s, y, r)
  addCollider(22.5, 14.2, 3.4, 2.2)
  addCollider(-20, 21, 3.4, 2.4)
  addCollider(5.5, -14, 2.6, 2.2)
  addCollider(15.5, 20.4, 3, 2.2)
  addCollider(-8.6, 23.3, 3, 2.2)

  // -------------------- barrels --------------------
  function barrel(x, z, burnt = false) {
    const mat = burnt ? mats.rust : mats.metal
    const b = cyl(0.34, 0.34, 0.92, 14, mat, x, 0.46, z)
    for (const y of [0.25, 0.68]) {
      const ring = new THREE.Mesh(new THREE.TorusGeometry(0.345, 0.022, 5, 16), mats.darkMetal)
      ring.rotation.x = Math.PI / 2
      ring.position.set(0, y - 0.46, 0)
      b.add(ring)
    }
    if (!burnt) {
      const band = new THREE.Mesh(new THREE.CylinderGeometry(0.345, 0.345, 0.22, 14, 1, true), mats.hazard)
      band.position.y = 0.03
      b.add(band)
    }
    addCollider(x, z, 0.74, 0.74)
    blockers.push(b)
  }
  const barrelSpots = [[18.5, -4.2], [19.4, -3.3], [18.9, -3.6, true], [-5.8, 17.2], [-6.7, 17.9], [10.4, 24.4], [26, 5], [26.8, 5.6, true], [-24, -6], [-22.5, 13]]
  for (const [x, z, b] of barrelSpots) barrel(x, z, !!b)

  // burning barrel
  const fireX = 11.5
  const fireZ = -3.6
  barrel(fireX, fireZ, true)
  const fireLight = new THREE.PointLight(0xff6a1e, mobile ? 20 : 34, 12, 2)
  fireLight.position.set(fireX, 1.2, fireZ)
  world.add(fireLight)
  const fireSprites = []
  const fireMat = new THREE.SpriteMaterial({
    map: T.glow, color: 0xffa044, transparent: true, opacity: 0.9,
    blending: THREE.AdditiveBlending, depthWrite: false
  })
  for (let i = 0; i < 3; i++) {
    const sp = new THREE.Sprite(fireMat.clone())
    sp.position.set(fireX + (Math.random() - 0.5) * 0.15, 1.0 + i * 0.18, fireZ + (Math.random() - 0.5) * 0.15)
    sp.scale.setScalar(0.75 - i * 0.12)
    world.add(sp)
    fireSprites.push(sp)
  }
  const smokeSprites = []
  const smokeMat = new THREE.SpriteMaterial({
    map: T.smoke, color: 0x2b2a27, transparent: true, opacity: 0.16,
    depthWrite: false
  })
  for (let i = 0; i < 7; i++) {
    const sp = new THREE.Sprite(smokeMat.clone())
    sp.position.set(fireX + (Math.random() - 0.5) * 0.7, 1.4 + i * 0.9, fireZ + (Math.random() - 0.5) * 0.7)
    sp.scale.setScalar(1.3 + i * 0.55)
    world.add(sp)
    smokeSprites.push({ sp, baseX: sp.position.x, baseZ: sp.position.z, phase: Math.random() * 10, speed: 0.22 + Math.random() * 0.16 })
  }

  // -------------------- barriers / jersey blocks --------------------
  const hazardMat = new THREE.MeshStandardMaterial({ color: 0xb08631, roughness: 0.8, metalness: 0.05 })
  function jersey(x, z, ry) {
    const g = new THREE.Group()
    const lower = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.35, 0.8), hazardMat)
    lower.position.y = 0.175
    const upper = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.62, 0.42), hazardMat)
    upper.position.y = 0.66
    const top = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.12, 0.28), mats.concrete)
    top.position.y = 1.02
    for (const m of [lower, upper, top]) { m.castShadow = true; m.receiveShadow = true; g.add(m) }
    g.position.set(x, 0, z)
    g.rotation.y = ry
    world.add(g)
    addCollider(x, z, Math.abs(Math.cos(ry)) * 2.1 + Math.abs(Math.sin(ry)) * 0.9, Math.abs(Math.sin(ry)) * 2.1 + Math.abs(Math.cos(ry)) * 0.9)
    blockers.push(lower)
    // hazard stripes
    for (let i = 0; i < 4; i++) {
      const stripe = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.6, 0.02), mats.paint)
      stripe.position.set(-0.75 + i * 0.5, 0.66, 0.22)
      stripe.rotation.z = 0.35
      g.add(stripe)
    }
  }
  jersey(-2.4, 13.5, 0.06)
  jersey(3.2, 2.5, 0.12)
  jersey(0.5, -12.5, -0.08)
  jersey(-11.5, -10.5, 1.1)
  jersey(24, 4.5, 1.45)

  // -------------------- floodlights --------------------
  const floodLights = []
  function floodlight(x, z, targetX, targetZ, withLight = true) {
    const g = new THREE.Group()
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.13, 7, 8), mats.darkMetal)
    pole.position.y = 3.5
    pole.castShadow = true
    g.add(pole)
    const head = new THREE.Group()
    head.position.set(0, 6.9, 0)
    head.rotation.y = Math.atan2(targetX - x, targetZ - z)
    head.rotation.x = 0.42
    const housing = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.5, 0.3), mats.darkMetal)
    housing.castShadow = true
    head.add(housing)
    const lamp = new THREE.Mesh(new THREE.PlaneGeometry(0.7, 0.36), mats.lamp)
    lamp.position.z = 0.16
    head.add(lamp)
    const glow = new THREE.Sprite(new THREE.SpriteMaterial({ map: T.glow, color: 0xffd9a0, transparent: true, opacity: 0.55, blending: THREE.AdditiveBlending, depthWrite: false }))
    glow.scale.setScalar(2.6)
    glow.position.z = 0.25
    head.add(glow)
    g.add(head)
    g.position.set(x, 0, z)
    world.add(g)
    addCollider(x, z, 0.35, 0.35)
    blockers.push(pole)
    if (withLight) {
      const light = new THREE.SpotLight(0xffc98c, mobile ? 70 : 110, 30, 0.62, 0.55, 1.6)
      light.position.set(x, 6.9, z)
      light.target.position.set(targetX, 0, targetZ)
      light.castShadow = false
      world.add(light)
      world.add(light.target)
      // beam cone
      const dir = new THREE.Vector3(targetX - x, -6.9, targetZ - z)
      const len = dir.length()
      const cone = new THREE.Mesh(
        new THREE.ConeGeometry(len * Math.tan(0.34), len, 22, 1, true),
        new THREE.MeshBasicMaterial({ color: 0xffc98c, transparent: true, opacity: 0.035, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide })
      )
      cone.position.set((x + targetX) / 2, 3.45, (z + targetZ) / 2)
      cone.quaternion.setFromUnitVectors(new THREE.Vector3(0, -1, 0), dir.clone().normalize())
      world.add(cone)
      floodLights.push({ light, glow, cone })
    }
  }
  floodlight(-24.5, -24.5, -18, -14)
  floodlight(24.5, -24.5, 19, -15)
  floodlight(24.5, 24.5, 18, 16, !mobile)
  floodlight(-24.5, 24.5, -18, 16, !mobile)

  // -------------------- wires --------------------
  const wireMat = new THREE.LineBasicMaterial({ color: 0x101110, transparent: true, opacity: 0.8 })
  function wire(a, b, sag = 1.2) {
    const mid = a.clone().lerp(b, 0.5)
    mid.y -= sag
    const curve = new THREE.CatmullRomCurve3([a, mid, b])
    const geo = new THREE.BufferGeometry().setFromPoints(curve.getPoints(16))
    const line = new THREE.Line(geo, wireMat)
    world.add(line)
  }
  wire(new THREE.Vector3(-24.5, 6.9, -24.5), new THREE.Vector3(-7, 7.1, -27), 0.9)
  wire(new THREE.Vector3(24.5, 6.9, -24.5), new THREE.Vector3(23, 3.6, -20), 0.7)
  wire(new THREE.Vector3(-24.5, 6.9, -24.5), new THREE.Vector3(-28, 5.2, -26), 0.4)
  wire(new THREE.Vector3(24.5, 6.9, 24.5), new THREE.Vector3(24.5, 7.1, -24.5), 3.2)

  // -------------------- rubble & debris --------------------
  const rubbleGeo = new THREE.DodecahedronGeometry(0.18, 0)
  const rubbleMat = new THREE.MeshStandardMaterial({ color: 0x7f7461, roughness: 0.95, metalness: 0.02, flatShading: true })
  const rubbleCount = mobile ? 90 : 160
  const rubble = new THREE.InstancedMesh(rubbleGeo, rubbleMat, rubbleCount)
  const rr = mulberry32(4242)
  for (let i = 0; i < rubbleCount; i++) {
    const a = rr() * Math.PI * 2
    const rad = 6 + rr() * 24
    dummy.position.set(Math.cos(a) * rad, 0.06 + rr() * 0.05, Math.sin(a) * rad)
    dummy.rotation.set(rr() * 3, rr() * 3, rr() * 3)
    dummy.scale.set(0.4 + rr() * 1.3, 0.3 + rr() * 0.8, 0.4 + rr() * 1.3)
    dummy.updateMatrix()
    rubble.setMatrixAt(i, dummy.matrix)
  }
  rubble.castShadow = true
  rubble.receiveShadow = true
  world.add(rubble)

  const paperGeo = new THREE.PlaneGeometry(0.22, 0.3)
  const paperMat = new THREE.MeshStandardMaterial({ color: 0xb8b09a, roughness: 0.9, side: THREE.DoubleSide })
  const papers = new THREE.InstancedMesh(paperGeo, paperMat, 30)
  for (let i = 0; i < 30; i++) {
    dummy.position.set((rr() - 0.5) * 40, 0.045, (rr() - 0.5) * 40)
    dummy.rotation.set(-Math.PI / 2, 0, rr() * 6)
    dummy.scale.setScalar(0.7 + rr() * 0.8)
    dummy.updateMatrix()
    papers.setMatrixAt(i, dummy.matrix)
  }
  papers.receiveShadow = true
  world.add(papers)

  // shell casings on ground
  const casingGeo = new THREE.CylinderGeometry(0.018, 0.018, 0.055, 6)
  const casingMat = new THREE.MeshStandardMaterial({ color: 0xb08a45, metalness: 0.9, roughness: 0.35 })
  const casings = new THREE.InstancedMesh(casingGeo, casingMat, 46)
  for (let i = 0; i < 46; i++) {
    dummy.position.set((rr() - 0.5) * 14 - 2, 0.05, 4 + (rr() - 0.5) * 8)
    dummy.rotation.set(Math.PI / 2, rr() * 6, rr() * 6)
    dummy.scale.setScalar(0.8 + rr() * 0.5)
    dummy.updateMatrix()
    casings.setMatrixAt(i, dummy.matrix)
  }
  world.add(casings)

  // -------------------- chain-link fence around generator --------------------
  const chainTex = makeChainTexture()
  chainTex.wrapS = chainTex.wrapT = THREE.RepeatWrapping
  chainTex.repeat.set(4, 1.2)
  const chainMat = new THREE.MeshStandardMaterial({
    map: chainTex, transparent: true, alphaTest: 0.15, side: THREE.DoubleSide,
    roughness: 0.5, metalness: 0.7, color: 0x8d9086
  })
  for (const [x, z, ry, len] of [[13.5, -23, 0, 8], [13.5, -27, 0, 8], [9.5, -25, Math.PI / 2, 4], [17.5, -25, Math.PI / 2, 4]]) {
    const fence = new THREE.Mesh(new THREE.PlaneGeometry(len, 2.0), chainMat)
    fence.position.set(x, 1.0, z)
    fence.rotation.y = ry
    fence.castShadow = false
    world.add(fence)
    for (let i = -len / 2; i <= len / 2; i += 2) {
      const px = x + Math.cos(ry) * i
      const pz = z + Math.sin(ry) * i
      const post = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 2.1, 6), mats.darkMetal)
      post.position.set(px, 1.05, pz)
      world.add(post)
    }
    addCollider(x, z, ry === 0 ? len : 0.15, ry === 0 ? 0.15 : len)
  }
  // generator
  box(2.4, 1.3, 1.2, mats.metal, 15.5, 0.65, -25, 0.1, { collide: false })
  cyl(0.1, 0.1, 0.9, 8, mats.darkMetal, 16.2, 1.75, -25.2)
  const genLight = new THREE.Mesh(new THREE.SphereGeometry(0.05, 6, 6), mats.lampRed)
  genLight.position.set(14.5, 1.2, -24.7)
  world.add(genLight)

  // -------------------- flags / tarps --------------------
  const flagMat = new THREE.MeshStandardMaterial({ map: makeFlagTexture(), side: THREE.DoubleSide, roughness: 0.95, metalness: 0 })
  const flag = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 1.5, 12, 6), flagMat)
  flag.position.set(-19, 5.0, -13.4)
  flag.castShadow = true
  world.add(flag)
  const flagBase = flag.geometry.attributes.position.array.slice()
  const tarp = new THREE.Mesh(new THREE.PlaneGeometry(4.2, 2.6, 6, 4), mats.tarp)
  tarp.position.set(17.8, 1.7, 14.6)
  tarp.rotation.set(-0.6, 0.2, 0.1)
  tarp.castShadow = true
  world.add(tarp)

  // -------------------- distant city & mountains --------------------
  const cityGroup = new THREE.Group()
  const cr = mulberry32(99)
  for (let i = 0; i < 46; i++) {
    const a = -Math.PI * 0.15 + (i / 46) * Math.PI * 1.3
    const dist = 100 + cr() * 48
    const w = 5 + cr() * 12
    const h = 6 + cr() * 30
    const b = new THREE.Mesh(new THREE.BoxGeometry(w, h, 4 + cr() * 8), cityMat)
    b.position.set(Math.cos(a) * dist, h / 2 - 1, Math.sin(a) * dist)
    b.rotation.y = -a
    cityGroup.add(b)
  }
  cityGroup.position.y = 0
  world.add(cityGroup)

  const mountainMat = new THREE.MeshStandardMaterial({ color: 0x4a4138, roughness: 1, metalness: 0, flatShading: true, side: THREE.DoubleSide })
  const mountainMat2 = new THREE.MeshStandardMaterial({ color: 0x5c4c40, roughness: 1, metalness: 0, flatShading: true, side: THREE.DoubleSide })
  function ridge(radius, height, seed, mat, segments = 44) {
    const rand = mulberry32(seed)
    const positions = []
    const indices = []
    for (let i = 0; i <= segments; i++) {
      const a = (i / segments) * Math.PI * 2
      const jitter = radius + (rand() - 0.5) * 18
      const hh = height * (0.35 + rand() * 0.9)
      positions.push(Math.cos(a) * jitter, 0, Math.sin(a) * jitter)
      positions.push(Math.cos(a) * (jitter + 6), hh, Math.sin(a) * (jitter + 6))
    }
    for (let i = 0; i < segments; i++) {
      const a = i * 2
      indices.push(a, a + 1, a + 2, a + 1, a + 3, a + 2)
    }
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    geo.setIndex(indices)
    geo.computeVertexNormals()
    const mesh = new THREE.Mesh(geo, mat)
    mesh.position.y = -1
    world.add(mesh)
    return mesh
  }
  ridge(190, 26, 71, mountainMat, 52)
  ridge(160, 18, 33, mountainMat2, 46)

  // -------------------- dust motes --------------------
  const dustCount = mobile ? 500 : 900
  const dustGeo = new THREE.BufferGeometry()
  const dustPos = new Float32Array(dustCount * 3)
  const dustPhase = new Float32Array(dustCount)
  for (let i = 0; i < dustCount; i++) {
    dustPos[i * 3] = (Math.random() - 0.5) * 44
    dustPos[i * 3 + 1] = Math.random() * 8
    dustPos[i * 3 + 2] = (Math.random() - 0.5) * 44
    dustPhase[i] = Math.random() * 10
  }
  dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3))
  dustGeo.setAttribute('aPhase', new THREE.BufferAttribute(dustPhase, 1))
  const dustMat = new THREE.PointsMaterial({
    map: T.dust, color: 0xe8d6b4, size: mobile ? 0.06 : 0.045,
    transparent: true, opacity: 0.35, depthWrite: false,
    blending: THREE.AdditiveBlending, sizeAttenuation: true
  })
  const dust = new THREE.Points(dustGeo, dustMat)
  dust.frustumCulled = false
  scene.add(dust)

  // -------------------- lights --------------------
  const hemi = new THREE.HemisphereLight(0x8798ad, 0x7c6a50, 0.48)
  scene.add(hemi)

  const sun = new THREE.DirectionalLight(0xffc987, 2.35)
  sun.position.copy(sunDirection).multiplyScalar(70)
  sun.target.position.set(0, 0, 0)
  sun.castShadow = true
  sun.shadow.mapSize.set(mobile ? 1024 : 2048, mobile ? 1024 : 2048)
  sun.shadow.camera.left = -38
  sun.shadow.camera.right = 38
  sun.shadow.camera.top = 38
  sun.shadow.camera.bottom = -38
  sun.shadow.camera.near = 1
  sun.shadow.camera.far = 160
  sun.shadow.bias = -0.00035
  sun.shadow.normalBias = 0.025
  sun.shadow.radius = 2
  scene.add(sun)
  scene.add(sun.target)

  const fill = new THREE.DirectionalLight(0x4d6a86, 0.28)
  fill.position.set(20, 12, 30)
  scene.add(fill)

  // sun glow sprite
  const sunSprite = new THREE.Sprite(new THREE.SpriteMaterial({
    map: T.glow, color: 0xffc07a, transparent: true, opacity: 0.3,
    blending: THREE.AdditiveBlending, depthWrite: false
  }))
  sunSprite.scale.setScalar(20)
  sunSprite.position.copy(sunDirection).multiplyScalar(220)
  scene.add(sunSprite)

  // -------------------- update --------------------
  const flagPos = flag.geometry.attributes.position
  let t = 0
  function update(dt, camera) {
    t += dt
    skyUniforms.time.value = t
    sky.position.copy(camera.position)
    dust.position.x = camera.position.x
    dust.position.z = camera.position.z
    dust.rotation.y = t * 0.004
    sunSprite.position.copy(camera.position).addScaledVector(sunDirection, 220)
    // flag waves
    for (let i = 0; i < flagPos.count; i++) {
      const x = flagBase[i * 3]
      const y = flagBase[i * 3 + 1]
      const k = (x + 1.2) / 2.4
      flagPos.setZ(i, Math.sin(k * 5 + t * 2.4) * 0.12 * k)
      flagPos.setY(i, y + Math.sin(k * 4 + t * 1.8) * 0.05 * k)
    }
    flagPos.needsUpdate = true
    // fire
    const flicker = 0.72 + Math.sin(t * 21) * 0.14 + Math.sin(t * 37) * 0.08 + Math.random() * 0.06
    fireLight.intensity = (mobile ? 20 : 34) * flicker
    fireSprites.forEach((sp, i) => {
      sp.scale.setScalar(0.55 + (Math.sin(t * 9 + i * 2) * 0.5 + 0.5) * 0.35)
      sp.position.y = 0.95 + i * 0.15 + Math.sin(t * 13 + i) * 0.05
      sp.material.opacity = 0.5 + flicker * 0.4
    })
    for (const s of smokeSprites) {
      const k = ((t * s.speed + s.phase) % 7) / 7
      s.sp.position.y = 1.2 + k * 6.5
      s.sp.position.x = s.baseX + Math.sin(t * 0.8 + s.phase) * (0.3 + k * 1.2)
      s.sp.position.z = s.baseZ + Math.cos(t * 0.6 + s.phase) * (0.3 + k * 1.2)
      s.sp.scale.setScalar(1.2 + k * 3.4)
      s.sp.material.opacity = Math.max(0, 0.19 * (1 - k))
    }
    for (const f of floodLights) {
      f.glow.material.opacity = 0.45 + Math.sin(t * 3 + f.light.position.x) * 0.04
    }
  }

  // colliders debug helper
  function resolveCollisions(pos, radius) {
    for (const c of colliders) {
      const nx = Math.max(c.minX, Math.min(pos.x, c.maxX))
      const nz = Math.max(c.minZ, Math.min(pos.z, c.maxZ))
      const dx = pos.x - nx
      const dz = pos.z - nz
      const d2 = dx * dx + dz * dz
      if (d2 < radius * radius) {
        const d = Math.sqrt(d2) || 0.0001
        const push = radius - d
        pos.x += (dx / d) * push
        pos.z += (dz / d) * push
      }
    }
    pos.x = THREE.MathUtils.clamp(pos.x, -29.6, 29.6)
    pos.z = THREE.MathUtils.clamp(pos.z, -29.6, 29.6)
  }


  // -------------------- navigation grid --------------------
  const NAV_MIN = -30
  const NAV_N = 60
  const NAV_CELL = 1
  const navBlocked = new Uint8Array(NAV_N * NAV_N)
  for (let gz = 0; gz < NAV_N; gz++) {
    for (let gx = 0; gx < NAV_N; gx++) {
      const wx = NAV_MIN + (gx + 0.5) * NAV_CELL
      const wz = NAV_MIN + (gz + 0.5) * NAV_CELL
      let blocked = false
      if (Math.abs(wx) > 29.4 || Math.abs(wz) > 29.4) blocked = true
      if (!blocked) {
        for (const c of colliders) {
          if (wx > c.minX - 0.46 && wx < c.maxX + 0.46 && wz > c.minZ - 0.46 && wz < c.maxZ + 0.46) {
            blocked = true
            break
          }
        }
      }
      navBlocked[gz * NAV_N + gx] = blocked ? 1 : 0
    }
  }

  function navCell(x, z) {
    return {
      x: THREE.MathUtils.clamp(Math.floor((x - NAV_MIN) / NAV_CELL), 0, NAV_N - 1),
      z: THREE.MathUtils.clamp(Math.floor((z - NAV_MIN) / NAV_CELL), 0, NAV_N - 1)
    }
  }
  function navFree(cx, cz) {
    return cx >= 0 && cz >= 0 && cx < NAV_N && cz < NAV_N && !navBlocked[cz * NAV_N + cx]
  }
  function navNearest(cx, cz) {
    if (navFree(cx, cz)) return { x: cx, z: cz }
    for (let r = 1; r < 9; r++) {
      for (let dz = -r; dz <= r; dz++) {
        for (let dx = -r; dx <= r; dx++) {
          if (Math.abs(dx) !== r && Math.abs(dz) !== r) continue
          if (navFree(cx + dx, cz + dz)) return { x: cx + dx, z: cz + dz }
        }
      }
    }
    return null
  }
  function navLineClear(a, b) {
    let x0 = a.x, z0 = a.z
    const x1 = b.x, z1 = b.z
    const dx = Math.abs(x1 - x0), dz = Math.abs(z1 - z0)
    const sx = x0 < x1 ? 1 : -1, sz = z0 < z1 ? 1 : -1
    let err = dx - dz
    let guard = 0
    while (guard++ < 200) {
      if (!navFree(x0, z0)) return false
      if (x0 === x1 && z0 === z1) return true
      const e2 = 2 * err
      if (e2 > -dz) { err -= dz; x0 += sx }
      if (e2 < dx) { err += dx; z0 += sz }
    }
    return true
  }

  function findPath(start, goal) {
    const s = navNearest(navCell(start.x, start.z).x, navCell(start.x, start.z).z)
    const g = navNearest(navCell(goal.x, goal.z).x, navCell(goal.x, goal.z).z)
    if (!s || !g) return null
    const startIdx = s.z * NAV_N + s.x
    const goalIdx = g.z * NAV_N + g.x
    if (startIdx === goalIdx) return [{ x: NAV_MIN + (g.x + 0.5), z: NAV_MIN + (g.z + 0.5) }]
    const total = NAV_N * NAV_N
    const gScore = new Float32Array(total).fill(Infinity)
    const came = new Int32Array(total).fill(-1)
    const closed = new Uint8Array(total)
    const heap = []
    const h = (idx) => {
      const x = idx % NAV_N
      const z = (idx / NAV_N) | 0
      const dx = Math.abs(x - g.x)
      const dz = Math.abs(z - g.z)
      return (dx + dz) + (Math.SQRT2 - 2) * Math.min(dx, dz)
    }
    const push = (idx) => {
      heap.push(idx)
      let i = heap.length - 1
      while (i > 0) {
        const p = (i - 1) >> 1
        if (gScore[heap[p]] + h(heap[p]) <= gScore[heap[i]] + h(heap[i])) break
        const t = heap[p]; heap[p] = heap[i]; heap[i] = t
        i = p
      }
    }
    const pop = () => {
      const top = heap[0]
      const last = heap.pop()
      if (heap.length > 0) {
        heap[0] = last
        let i = 0
        while (true) {
          const l = i * 2 + 1, r = l + 1
          let best = i
          if (l < heap.length && gScore[heap[l]] + h(heap[l]) < gScore[heap[best]] + h(heap[best])) best = l
          if (r < heap.length && gScore[heap[r]] + h(heap[r]) < gScore[heap[best]] + h(heap[best])) best = r
          if (best === i) break
          const t = heap[best]; heap[best] = heap[i]; heap[i] = t
          i = best
        }
      }
      return top
    }
    gScore[startIdx] = 0
    push(startIdx)
    const dirs = [[1,0,1],[-1,0,1],[0,1,1],[0,-1,1],[1,1,Math.SQRT2],[1,-1,Math.SQRT2],[-1,1,Math.SQRT2],[-1,-1,Math.SQRT2]]
    let found = false
    let guard = 0
    while (heap.length > 0 && guard++ < 5000) {
      const cur = pop()
      if (closed[cur]) continue
      if (cur === goalIdx) { found = true; break }
      closed[cur] = 1
      const cx = cur % NAV_N
      const cz = (cur / NAV_N) | 0
      for (const [dx, dz, cost] of dirs) {
        const nx = cx + dx, nz = cz + dz
        if (!navFree(nx, nz)) continue
        if (dx !== 0 && dz !== 0 && (!navFree(cx + dx, cz) || !navFree(cx, cz + dz))) continue
        const ni = nz * NAV_N + nx
        if (closed[ni]) continue
        const ng = gScore[cur] + cost
        if (ng < gScore[ni]) {
          gScore[ni] = ng
          came[ni] = cur
          push(ni)
        }
      }
    }
    if (!found) return null
    const raw = []
    let cur = goalIdx
    let guard2 = 0
    while (cur !== -1 && guard2++ < 500) {
      raw.push({ x: cur % NAV_N, z: (cur / NAV_N) | 0 })
      if (cur === startIdx) break
      cur = came[cur]
    }
    raw.reverse()
    const toWorld = (c) => ({ x: NAV_MIN + (c.x + 0.5) * NAV_CELL, z: NAV_MIN + (c.z + 0.5) * NAV_CELL })
    const out = []
    let i = 0
    while (i < raw.length - 1) {
      out.push(toWorld(raw[i]))
      let next = i + 1
      for (let j = raw.length - 1; j > i; j--) {
        if (navLineClear(raw[i], raw[j])) { next = j; break }
      }
      i = next
    }
    out.push(toWorld(raw[raw.length - 1]))
    return out
  }

  function nearestWalkable(x, z) {
    const c = navCell(x, z)
    const n = navNearest(c.x, c.z)
    if (!n) return new THREE.Vector3(x, 0, z)
    return new THREE.Vector3(NAV_MIN + (n.x + 0.5) * NAV_CELL, 0, NAV_MIN + (n.z + 0.5) * NAV_CELL)
  }

  return {
    world,
    colliders,
    findPath,
    nearestWalkable,
    blockers,
    spawnPoints,
    playerSpawn,
    sunDirection,
    sun,
    dust,
    update,
    resolveCollisions,
    mats,
    textures: T
  }
}

function mulberry32(a) {
  return function () {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}
