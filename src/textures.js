import * as THREE from 'three'

function mulberry32(a) {
  return function () {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

class TileNoise {
  constructor(seed, octaves = 5, base = 3) {
    this.layers = []
    const rand = mulberry32(seed)
    for (let o = 0; o < octaves; o++) {
      const size = base * Math.pow(2, o)
      const grid = new Float32Array(size * size)
      for (let i = 0; i < grid.length; i++) grid[i] = rand()
      this.layers.push({ size, grid, amp: Math.pow(0.5, o) })
    }
    this.total = this.layers.reduce((s, l) => s + l.amp, 0)
    this.rand = rand
  }

  sample(x, y) {
    let sum = 0
    for (const layer of this.layers) {
      const { size, grid, amp } = layer
      const gx = x * size
      const gy = y * size
      const x0 = Math.floor(gx)
      const y0 = Math.floor(gy)
      const fx = gx - x0
      const fy = gy - y0
      const sx = fx * fx * (3 - 2 * fx)
      const sy = fy * fy * (3 - 2 * fy)
      const ix0 = ((x0 % size) + size) % size
      const iy0 = ((y0 % size) + size) % size
      const ix1 = (ix0 + 1) % size
      const iy1 = (iy0 + 1) % size
      const a = grid[iy0 * size + ix0]
      const b = grid[iy0 * size + ix1]
      const c = grid[iy1 * size + ix0]
      const d = grid[iy1 * size + ix1]
      const top = a + (b - a) * sx
      const bottom = c + (d - c) * sx
      sum += (top + (bottom - top) * sy) * amp
    }
    return sum / this.total
  }
}

let rendererRef = null
export function setTextureRenderer(renderer) {
  rendererRef = renderer
}

function makeCanvas(size) {
  const c = document.createElement('canvas')
  c.width = size
  c.height = size
  return c
}

function finishTexture(canvas, { repeat = 1, srgb = false, aniso = 8 } = {}) {
  const tex = new THREE.CanvasTexture(canvas)
  tex.wrapS = THREE.RepeatWrapping
  tex.wrapT = THREE.RepeatWrapping
  tex.repeat.set(repeat, repeat)
  tex.colorSpace = srgb ? THREE.SRGBColorSpace : THREE.NoColorSpace
  tex.anisotropy = Math.min(aniso, rendererRef ? rendererRef.capabilities.getMaxAnisotropy() : 8)
  tex.needsUpdate = true
  return tex
}

function normalFromHeight(height, w, h, strength = 2.2) {
  const canvas = makeCanvas(w)
  const ctx = canvas.getContext('2d')
  const img = ctx.createImageData(w, h)
  const d = img.data
  for (let y = 0; y < h; y++) {
    const yp = ((y - 1 + h) % h) * w
    const yn = ((y + 1) % h) * w
    const yc = y * w
    for (let x = 0; x < w; x++) {
      const xp = (x - 1 + w) % w
      const xn = (x + 1) % w
      const dx = (height[yc + xn] - height[yc + xp]) * strength
      const dy = (height[yn + x] - height[yp + x]) * strength
      const nx = -dx
      const ny = -dy
      const nz = 1
      const len = Math.hypot(nx, ny, nz) || 1
      const i = (yc + x) * 4
      d[i] = (nx / len * 0.5 + 0.5) * 255
      d[i + 1] = (ny / len * 0.5 + 0.5) * 255
      d[i + 2] = (nz / len * 0.5 + 0.5) * 255
      d[i + 3] = 255
    }
  }
  ctx.putImageData(img, 0, 0)
  const tex = new THREE.CanvasTexture(canvas)
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping
  tex.colorSpace = THREE.NoColorSpace
  tex.anisotropy = Math.min(8, rendererRef ? rendererRef.capabilities.getMaxAnisotropy() : 8)
  return tex
}

function greyTexture(height, w, h, invert = false) {
  const canvas = makeCanvas(w)
  const ctx = canvas.getContext('2d')
  const img = ctx.createImageData(w, h)
  for (let i = 0; i < w * h; i++) {
    let v = height[i]
    if (invert) v = 1 - v
    const g = Math.max(0, Math.min(255, v * 255))
    img.data[i * 4] = g
    img.data[i * 4 + 1] = g
    img.data[i * 4 + 2] = g
    img.data[i * 4 + 3] = 255
  }
  ctx.putImageData(img, 0, 0)
  const tex = new THREE.CanvasTexture(canvas)
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping
  tex.colorSpace = THREE.NoColorSpace
  tex.anisotropy = Math.min(8, rendererRef ? rendererRef.capabilities.getMaxAnisotropy() : 8)
  return tex
}

function buildSand() {
  const size = 512
  const n1 = new TileNoise(101, 5, 3)
  const n2 = new TileNoise(202, 3, 8)
  const rand = mulberry32(77)
  const color = makeCanvas(size)
  const cctx = color.getContext('2d')
  const cimg = cctx.createImageData(size, size)
  const height = new Float32Array(size * size)
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const u = x / size
      const v = y / size
      const grain = n2.sample(u, v)
      const broad = n1.sample(u, v)
      const ripple = Math.sin((u * 9 + v * 5 + broad * 2.4) * Math.PI * 2) * 0.5 + 0.5
      let h = broad * 0.55 + grain * 0.28 + ripple * 0.17
      const pebble = grain > 0.78 && n2.sample(u * 2.1, v * 2.1) > 0.7
      let r = 172 + broad * 32 + grain * 22
      let g = 151 + broad * 28 + grain * 21
      let b = 120 + broad * 24 + grain * 18
      if (pebble) { r -= 38; g -= 34; b -= 28; h += 0.16 }
      const speck = rand()
      if (speck > 0.994) { r += 34; g += 30; b += 24; h += 0.2 }
      if (speck < 0.006) { r -= 42; g -= 38; b -= 30 }
      const i = (y * size + x) * 4
      cimg.data[i] = Math.max(0, Math.min(255, r))
      cimg.data[i + 1] = Math.max(0, Math.min(255, g))
      cimg.data[i + 2] = Math.max(0, Math.min(255, b))
      cimg.data[i + 3] = 255
      height[y * size + x] = h
    }
  }
  cctx.putImageData(cimg, 0, 0)
  cctx.globalAlpha = 0.16
  cctx.strokeStyle = '#6b5c45'
  cctx.lineWidth = 1.2
  for (let i = 0; i < 26; i++) {
    cctx.beginPath()
    let px = rand() * size
    let py = rand() * size
    cctx.moveTo(px, py)
    for (let s = 0; s < 3; s++) {
      px += (rand() - 0.5) * 90
      py += (rand() - 0.5) * 40
      cctx.lineTo(px, py)
    }
    cctx.stroke()
  }
  cctx.globalAlpha = 1
  return {
    map: finishTexture(color, { repeat: 1, srgb: true }),
    normalMap: normalFromHeight(height, size, size, 3.2),
    roughnessMap: greyTexture(height, size, size, false)
  }
}

function buildConcrete() {
  const size = 512
  const broad = new TileNoise(311, 5, 2)
  const detail = new TileNoise(412, 4, 6)
  const rand = mulberry32(933)
  const color = makeCanvas(size)
  const cctx = color.getContext('2d')
  const cimg = cctx.createImageData(size, size)
  const height = new Float32Array(size * size)
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const u = x / size
      const v = y / size
      const b = broad.sample(u, v)
      const d = detail.sample(u, v)
      const stain = Math.max(0, broad.sample(u * 0.7 + 0.2, v * 0.7 + 0.1) - 0.5) * 0.7
      const streak = Math.max(0, Math.sin(v * 22 + b * 6) - 0.86) * 0.25
      let base = 116 + b * 42 + d * 17
      base -= stain * 36 + streak * 30
      const grain = rand() * 12 - 6
      let r = base + 9 + grain
      let g = base + 6 + grain
      let bl = base + 2 + grain
      const patch = detail.sample(u * 3.1, v * 3.1)
      if (patch > 0.8) { r += 14; g += 13; bl += 11 }
      const h = 0.5 + d * 0.3 - stain * 0.2
      const i = (y * size + x) * 4
      cimg.data[i] = Math.max(0, Math.min(255, r))
      cimg.data[i + 1] = Math.max(0, Math.min(255, g))
      cimg.data[i + 2] = Math.max(0, Math.min(255, bl))
      cimg.data[i + 3] = 255
      height[y * size + x] = h
    }
  }
  cctx.putImageData(cimg, 0, 0)

  const heightCanvas = makeCanvas(size)
  const hctx = heightCanvas.getContext('2d')
  const himg = hctx.createImageData(size, size)
  for (let i = 0; i < size * size; i++) {
    const g = Math.max(0, Math.min(255, height[i] * 255))
    himg.data[i * 4] = g; himg.data[i * 4 + 1] = g; himg.data[i * 4 + 2] = g; himg.data[i * 4 + 3] = 255
  }
  hctx.putImageData(himg, 0, 0)

  for (let i = 0; i < 10; i++) {
    let px = rand() * size
    let py = rand() * size
    const len = 40 + rand() * 160
    const angle = rand() * Math.PI * 2
    cctx.strokeStyle = `rgba(38,36,32,${0.4 + rand() * 0.3})`
    cctx.lineWidth = 1 + rand() * 1.6
    cctx.beginPath()
    cctx.moveTo(px, py)
    hctx.strokeStyle = 'rgba(0,0,0,0.9)'
    hctx.lineWidth = cctx.lineWidth
    hctx.beginPath()
    hctx.moveTo(px, py)
    let a = angle
    for (let s = 0; s < 7; s++) {
      a += (rand() - 0.5) * 0.9
      px += Math.cos(a) * len / 7
      py += Math.sin(a) * len / 7
      cctx.lineTo(px, py)
      hctx.lineTo(px, py)
    }
    cctx.stroke()
    hctx.stroke()
  }

  cctx.globalAlpha = 0.08
  for (let i = 0; i < 60; i++) {
    cctx.fillStyle = rand() > 0.5 ? '#0d0d0c' : '#d8d4c9'
    const s = 2 + rand() * 14
    cctx.beginPath()
    cctx.arc(rand() * size, rand() * size, s, 0, Math.PI * 2)
    cctx.fill()
  }
  cctx.globalAlpha = 1

  const hctx2 = heightCanvas.getContext('2d')
  hctx2.putImageData(himg, 0, 0)
  hctx2.drawImage(heightCanvas, 0, 0)
  const normalCanvas = makeCanvas(size)
  const nctx = normalCanvas.getContext('2d')
  nctx.drawImage(color, 0, 0)

  return {
    map: finishTexture(color, { repeat: 1, srgb: true }),
    normalMap: normalFromHeight(height, size, size, 2.6),
    roughnessMap: greyTexture(height, size, size, false)
  }
}

function buildMetal() {
  const size = 256
  const noise = new TileNoise(515, 4, 4)
  const rand = mulberry32(1201)
  const color = makeCanvas(size)
  const cctx = color.getContext('2d')
  const cimg = cctx.createImageData(size, size)
  const height = new Float32Array(size * size)
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const u = x / size
      const v = y / size
      const n = noise.sample(u, v)
      const scratch = Math.abs(Math.sin((u * 40 + n * 7) * Math.PI)) > 0.985 ? 22 : 0
      let base = 52 + n * 30 + scratch
      const rustMask = noise.sample(u * 0.5 + 0.1, v * 0.5 + 0.4)
      const rust = Math.max(0, rustMask - 0.62) * 2.4
      let r = base + rust * 66
      let g = base + rust * 32
      let b = base + rust * 8
      const i = (y * size + x) * 4
      cimg.data[i] = Math.min(255, r)
      cimg.data[i + 1] = Math.min(255, g)
      cimg.data[i + 2] = Math.min(255, b)
      cimg.data[i + 3] = 255
      height[y * size + x] = n * 0.4 + (scratch ? 0.3 : 0) + rust * 0.2
    }
  }
  cctx.putImageData(cimg, 0, 0)
  cctx.globalAlpha = 0.35
  for (let i = 0; i < 90; i++) {
    cctx.strokeStyle = rand() > 0.5 ? 'rgba(180,180,175,0.5)' : 'rgba(10,10,10,0.6)'
    cctx.lineWidth = 0.6 + rand()
    const x = rand() * size
    const y = rand() * size
    cctx.beginPath()
    cctx.moveTo(x, y)
    cctx.lineTo(x + (rand() - 0.5) * 80, y + (rand() - 0.5) * 20)
    cctx.stroke()
  }
  cctx.globalAlpha = 1
  return {
    map: finishTexture(color, { repeat: 1, srgb: true }),
    normalMap: normalFromHeight(height, size, size, 1.5),
    roughnessMap: greyTexture(height, size, size, true)
  }
}

function buildWood() {
  const size = 256
  const noise = new TileNoise(818, 4, 3)
  const rand = mulberry32(313)
  const color = makeCanvas(size)
  const cctx = color.getContext('2d')
  const planks = 5
  const pw = size / planks
  cctx.fillStyle = '#8a6b42'
  cctx.fillRect(0, 0, size, size)
  const height = new Float32Array(size * size)
  for (let x = 0; x < size; x++) {
    const p = Math.floor(x / pw)
    const px = (x % pw) / pw
    const tone = 0.78 + ((p * 37) % 11) / 38
    for (let y = 0; y < size; y++) {
      const u = x / size
      const v = y / size
      const grain = noise.sample(u * 0.4, v * 3.5 + p * 0.2)
      const fine = noise.sample(u * 1.5, v * 12)
      const edge = px < 0.06 || px > 0.94 ? 0 : 1
      let r = (128 + grain * 58 + fine * 10) * tone
      let g = (96 + grain * 42 + fine * 8) * tone
      let b = (59 + grain * 28 + fine * 5) * tone
      if (!edge) { r *= 0.34; g *= 0.32; b *= 0.3 }
      const i = (y * size + x) * 4
      cctx.fillStyle = `rgb(${r | 0},${g | 0},${b | 0})`
      // fill via image data below for speed
      height[y * size + x] = edge ? 0.6 + grain * 0.2 : 0.08
      void i
    }
  }
  const cimg = cctx.getImageData(0, 0, size, size)
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const p = Math.floor(x / pw)
      const px = (x % pw) / pw
      const u = x / size
      const v = y / size
      const grain = noise.sample(u * 0.4, v * 3.5 + p * 0.2)
      const fine = noise.sample(u * 1.5, v * 12)
      const tone = 0.78 + ((p * 37) % 11) / 38
      const edge = px < 0.06 || px > 0.94
      const nail = (Math.abs(v - 0.24) < 0.012 || Math.abs(v - 0.76) < 0.012) && (Math.abs(px - 0.5) < 0.03)
      let r = (128 + grain * 58 + fine * 10) * tone
      let g = (98 + grain * 42 + fine * 8) * tone
      let b = (62 + grain * 28 + fine * 5) * tone
      if (edge) { r *= 0.3; g *= 0.3; b *= 0.3 }
      if (nail) { r = 95; g = 92; b = 86 }
      const i = (y * size + x) * 4
      cimg.data[i] = r
      cimg.data[i + 1] = g
      cimg.data[i + 2] = b
      cimg.data[i + 3] = 255
      height[y * size + x] = nail ? 0.8 : (edge ? 0.1 : 0.62 + grain * 0.16)
    }
  }
  cctx.putImageData(cimg, 0, 0)
  cctx.globalAlpha = 0.2
  for (let i = 0; i < 60; i++) {
    cctx.strokeStyle = rand() > 0.5 ? '#3d2a17' : '#c9a36a'
    cctx.lineWidth = 0.6
    const x = rand() * size
    const y = rand() * size
    cctx.beginPath()
    cctx.moveTo(x, y)
    cctx.lineTo(x + (rand() - 0.5) * 30, y + (rand() - 0.5) * 4)
    cctx.stroke()
  }
  cctx.globalAlpha = 1
  return {
    map: finishTexture(color, { repeat: 1, srgb: true }),
    normalMap: normalFromHeight(height, size, size, 2.4)
  }
}

function buildFabric() {
  const size = 256
  const noise = new TileNoise(1919, 4, 4)
  const rand = mulberry32(441)
  const color = makeCanvas(size)
  const cctx = color.getContext('2d')
  const cimg = cctx.createImageData(size, size)
  const height = new Float32Array(size * size)
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const u = x / size
      const v = y / size
      const weave = Math.sin(u * Math.PI * 90) * Math.sin(v * Math.PI * 90) * 0.5 + 0.5
      const n = noise.sample(u, v)
      const stain = Math.max(0, noise.sample(u * 0.45 + 0.2, v * 0.45) - 0.55) * 0.7
      let r = 146 + n * 26 + weave * 13 - stain * 44
      let g = 128 + n * 23 + weave * 11 - stain * 38
      let b = 92 + n * 18 + weave * 8 - stain * 30
      if (rand() > 0.996) { r -= 30; g -= 26; b -= 20 }
      const i = (y * size + x) * 4
      cimg.data[i] = Math.max(0, Math.min(255, r))
      cimg.data[i + 1] = Math.max(0, Math.min(255, g))
      cimg.data[i + 2] = Math.max(0, Math.min(255, b))
      cimg.data[i + 3] = 255
      height[y * size + x] = 0.5 + weave * 0.3 + n * 0.2
    }
  }
  cctx.putImageData(cimg, 0, 0)
  cctx.globalAlpha = 0.12
  cctx.strokeStyle = '#4e422d'
  for (let i = 0; i < 15; i++) {
    cctx.beginPath()
    cctx.moveTo(rand() * size, 0)
    cctx.lineTo(rand() * size, size)
    cctx.stroke()
  }
  cctx.globalAlpha = 1
  return {
    map: finishTexture(color, { repeat: 1, srgb: true }),
    normalMap: normalFromHeight(height, size, size, 1.3)
  }
}

function buildGunMetal() {
  const size = 512
  const noise = new TileNoise(2727, 5, 5)
  const rand = mulberry32(808)
  const color = makeCanvas(size)
  const cctx = color.getContext('2d')
  const cimg = cctx.createImageData(size, size)
  const height = new Float32Array(size * size)
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const u = x / size
      const v = y / size
      const n = noise.sample(u, v)
      const n2 = noise.sample(u * 2.7 + 0.3, v * 2.7)
      const wear = Math.max(0, n2 - 0.56) * 1.8
      const base = 34 + n * 27
      let r = base + wear * 58
      let g = base + wear * 57
      let b = base + wear * 54
      const i = (y * size + x) * 4
      cimg.data[i] = Math.min(255, r)
      cimg.data[i + 1] = Math.min(255, g)
      cimg.data[i + 2] = Math.min(255, b)
      cimg.data[i + 3] = 255
      height[y * size + x] = n * 0.5 + wear * 0.3
    }
  }
  cctx.putImageData(cimg, 0, 0)
  cctx.globalAlpha = 0.5
  for (let i = 0; i < 160; i++) {
    const x = rand() * size
    const y = rand() * size
    cctx.strokeStyle = rand() > 0.55 ? 'rgba(156,158,152,0.5)' : 'rgba(6,6,6,0.55)'
    cctx.lineWidth = 0.5 + rand() * 0.9
    cctx.beginPath()
    cctx.moveTo(x, y)
    cctx.lineTo(x + (rand() - 0.5) * 30, y + (rand() - 0.5) * 5)
    cctx.stroke()
  }
  cctx.globalAlpha = 1
  return {
    map: finishTexture(color, { repeat: 1, srgb: true }),
    normalMap: normalFromHeight(height, size, size, 0.8),
    roughnessMap: greyTexture(height, size, size, true)
  }
}

function buildHole() {
  const size = 128
  const canvas = makeCanvas(size)
  const ctx = canvas.getContext('2d')
  const rand = mulberry32(66)
  const g = ctx.createRadialGradient(size / 2, size / 2, 2, size / 2, size / 2, size * 0.48)
  g.addColorStop(0, 'rgba(0,0,0,0.98)')
  g.addColorStop(0.13, 'rgba(8,7,6,0.96)')
  g.addColorStop(0.3, 'rgba(28,25,21,0.72)')
  g.addColorStop(0.55, 'rgba(52,46,38,0.3)')
  g.addColorStop(1, 'rgba(52,46,38,0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, size, size)
  ctx.strokeStyle = 'rgba(20,18,16,0.55)'
  for (let i = 0; i < 12; i++) {
    const a = rand() * Math.PI * 2
    const l = 6 + rand() * 22
    ctx.lineWidth = 0.8 + rand() * 1.2
    ctx.beginPath()
    ctx.moveTo(size / 2 + Math.cos(a) * 4, size / 2 + Math.sin(a) * 4)
    ctx.lineTo(size / 2 + Math.cos(a) * l, size / 2 + Math.sin(a) * l)
    ctx.stroke()
  }
  const tex = new THREE.CanvasTexture(canvas)
  tex.colorSpace = THREE.SRGBColorSpace
  return tex
}

function softSprite(inner, outer, stops, size = 128) {
  const canvas = makeCanvas(size)
  const ctx = canvas.getContext('2d')
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
  for (const [o, c] of stops) g.addColorStop(o, c)
  ctx.fillStyle = g
  ctx.fillRect(0, 0, size, size)
  const tex = new THREE.CanvasTexture(canvas)
  tex.colorSpace = THREE.SRGBColorSpace
  return tex
}

function buildFlash() {
  const size = 256
  const canvas = makeCanvas(size)
  const ctx = canvas.getContext('2d')
  ctx.translate(size / 2, size / 2)
  const g = ctx.createRadialGradient(0, 0, 0, 0, 0, size / 2)
  g.addColorStop(0, 'rgba(255,255,245,1)')
  g.addColorStop(0.16, 'rgba(255,232,170,0.98)')
  g.addColorStop(0.38, 'rgba(255,160,60,0.55)')
  g.addColorStop(0.7, 'rgba(255,110,20,0.12)')
  g.addColorStop(1, 'rgba(255,80,0,0)')
  ctx.fillStyle = g
  ctx.beginPath()
  ctx.arc(0, 0, size / 2, 0, Math.PI * 2)
  ctx.fill()
  ctx.globalCompositeOperation = 'lighter'
  for (let i = 0; i < 7; i++) {
    const a = (i / 7) * Math.PI * 2 + 0.3
    const len = size * (0.24 + (i % 3) * 0.07)
    ctx.save()
    ctx.rotate(a)
    const sg = ctx.createLinearGradient(0, 0, len, 0)
    sg.addColorStop(0, 'rgba(255,240,200,0.9)')
    sg.addColorStop(1, 'rgba(255,120,20,0)')
    ctx.fillStyle = sg
    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.lineTo(len, -6)
    ctx.lineTo(len * 0.7, 0)
    ctx.lineTo(len, 6)
    ctx.closePath()
    ctx.fill()
    ctx.restore()
  }
  const tex = new THREE.CanvasTexture(canvas)
  tex.colorSpace = THREE.SRGBColorSpace
  return tex
}

function buildSmoke() {
  const size = 128
  const canvas = makeCanvas(size)
  const ctx = canvas.getContext('2d')
  const rand = mulberry32(9090)
  for (let i = 0; i < 14; i++) {
    const x = size / 2 + (rand() - 0.5) * 44
    const y = size / 2 + (rand() - 0.5) * 44
    const r = 14 + rand() * 26
    const g = ctx.createRadialGradient(x, y, 0, x, y, r)
    g.addColorStop(0, 'rgba(255,255,255,0.15)')
    g.addColorStop(0.5, 'rgba(255,255,255,0.07)')
    g.addColorStop(1, 'rgba(255,255,255,0)')
    ctx.fillStyle = g
    ctx.beginPath()
    ctx.arc(x, y, r, 0, Math.PI * 2)
    ctx.fill()
  }
  const tex = new THREE.CanvasTexture(canvas)
  tex.colorSpace = THREE.SRGBColorSpace
  return tex
}

export const textures = {}

export function initTextures() {
  if (textures.ready) return textures
  textures.sand = buildSand()
  textures.concrete = buildConcrete()
  textures.metal = buildMetal()
  textures.wood = buildWood()
  textures.fabric = buildFabric()
  textures.gunmetal = buildGunMetal()
  textures.hole = buildHole()
  textures.flash = buildFlash()
  textures.smoke = buildSmoke()
  textures.dust = softSprite(0, 1, [
    [0, 'rgba(255,255,255,0.55)'],
    [0.35, 'rgba(255,255,255,0.22)'],
    [1, 'rgba(255,255,255,0)']
  ], 64)
  textures.blood = softSprite(0, 1, [
    [0, 'rgba(120,10,6,0.85)'],
    [0.4, 'rgba(80,6,4,0.5)'],
    [1, 'rgba(40,2,1,0)']
  ], 64)
  textures.glow = softSprite(0, 1, [
    [0, 'rgba(255,220,160,0.9)'],
    [0.3, 'rgba(255,170,70,0.35)'],
    [1, 'rgba(255,120,20,0)']
  ], 128)
  textures.ready = true
  return textures
}

export function randomRange(rng, a, b) { return a + (rng ?? Math.random)() * (b - a) }
