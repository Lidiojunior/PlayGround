import * as THREE from 'three'

function makeCanvas(w, h = w) {
  const c = document.createElement('canvas')
  c.width = w
  c.height = h
  return c
}

function finish(canvas, renderer, { srgb = true, repeat = [1, 1], clamp = false } = {}) {
  const t = new THREE.CanvasTexture(canvas)
  t.wrapS = t.wrapT = clamp ? THREE.ClampToEdgeWrapping : THREE.RepeatWrapping
  t.repeat.set(repeat[0], repeat[1])
  t.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy())
  if (srgb) t.colorSpace = THREE.SRGBColorSpace
  t.needsUpdate = true
  return t
}

function noise(ctx, w, h, count, palette, size = 2) {
  for (let i = 0; i < count; i++) {
    const x = Math.random() * w
    const y = Math.random() * h
    const s = size * (0.4 + Math.random() * 1.6)
    ctx.fillStyle = palette[(Math.random() * palette.length) | 0]
    ctx.globalAlpha = 0.15 + Math.random() * 0.4
    ctx.fillRect(x, y, s, s)
  }
  ctx.globalAlpha = 1
}

function stains(ctx, w, h, count, color, alphaMax = 0.16) {
  for (let i = 0; i < count; i++) {
    const x = Math.random() * w
    const y = Math.random() * h
    const r = 12 + Math.random() * 90
    const g = ctx.createRadialGradient(x, y, 0, x, y, r)
    g.addColorStop(0, color)
    g.addColorStop(1, 'rgba(0,0,0,0)')
    ctx.globalAlpha = 0.25 + Math.random() * alphaMax
    ctx.fillStyle = g
    ctx.beginPath()
    ctx.arc(x, y, r, 0, Math.PI * 2)
    ctx.fill()
  }
  ctx.globalAlpha = 1
}

function cracks(ctx, w, h, count, color, width = 1.2) {
  ctx.strokeStyle = color
  ctx.lineCap = 'round'
  for (let i = 0; i < count; i++) {
    let x = Math.random() * w
    let y = Math.random() * h
    let a = Math.random() * Math.PI * 2
    ctx.lineWidth = width * (0.5 + Math.random())
    ctx.beginPath()
    ctx.moveTo(x, y)
    const steps = 4 + (Math.random() * 8) | 0
    for (let s = 0; s < steps; s++) {
      a += (Math.random() - 0.5) * 1.3
      const len = 6 + Math.random() * 22
      x += Math.cos(a) * len
      y += Math.sin(a) * len
      ctx.lineTo(x, y)
    }
    ctx.stroke()
  }
}

export function createAsphalt(renderer) {
  const S = 1024
  const color = makeCanvas(S)
  const c = color.getContext('2d')
  c.fillStyle = '#1a1b1d'
  c.fillRect(0, 0, S, S)
  noise(c, S, S, 34000, ['#0d0e10', '#26282b', '#33363a', '#151618', '#2c2e31'])
  stains(c, S, S, 26, 'rgba(6,8,10,0.9)', 0.3)
  stains(c, S, S, 12, 'rgba(70,62,50,0.5)', 0.15)
  cracks(c, S, S, 22, 'rgba(8,9,11,0.85)', 1.1)
  cracks(c, S, S, 36, 'rgba(48,50,53,0.35)', 0.7)

  const puddles = []
  for (let i = 0; i < 9; i++) {
    puddles.push({
      x: Math.random() * S,
      y: Math.random() * S,
      rx: 30 + Math.random() * 110,
      ry: 20 + Math.random() * 60,
      rot: Math.random() * Math.PI,
    })
  }
  for (const p of puddles) {
    c.save()
    c.translate(p.x, p.y)
    c.rotate(p.rot)
    const g = c.createRadialGradient(0, 0, 2, 0, 0, p.rx)
    g.addColorStop(0, 'rgba(8,12,17,0.92)')
    g.addColorStop(0.65, 'rgba(10,14,19,0.75)')
    g.addColorStop(1, 'rgba(10,14,19,0)')
    c.fillStyle = g
    c.beginPath()
    c.ellipse(0, 0, p.rx, p.ry, 0, 0, Math.PI * 2)
    c.fill()
    c.restore()
  }

  const bump = makeCanvas(512)
  const b = bump.getContext('2d')
  b.fillStyle = '#7d7d7d'
  b.fillRect(0, 0, 512, 512)
  noise(b, 512, 512, 12000, ['#4a4a4a', '#a8a8a8', '#666666'], 1.6)
  cracks(b, 512, 512, 14, 'rgba(35,35,35,0.9)', 0.9)
  for (const p of puddles) {
    b.save()
    b.translate(p.x / 2, p.y / 2)
    b.rotate(p.rot)
    b.fillStyle = '#6e6e6e'
    b.beginPath()
    b.ellipse(0, 0, p.rx / 2, p.ry / 2, 0, 0, Math.PI * 2)
    b.fill()
    b.restore()
  }

  const rough = makeCanvas(512)
  const r = rough.getContext('2d')
  r.fillStyle = '#b4b4b4'
  r.fillRect(0, 0, 512, 512)
  noise(r, 512, 512, 8000, ['#8a8a8a', '#d0d0d0'], 2)
  for (const p of puddles) {
    r.save()
    r.translate(p.x / 2, p.y / 2)
    r.rotate(p.rot)
    const g = r.createRadialGradient(0, 0, 2, 0, 0, p.rx / 2)
    g.addColorStop(0, '#1c1c1c')
    g.addColorStop(0.7, '#303030')
    g.addColorStop(1, '#b4b4b4')
    r.fillStyle = g
    r.beginPath()
    r.ellipse(0, 0, p.rx / 2, p.ry / 2, 0, 0, Math.PI * 2)
    r.fill()
    r.restore()
  }

  return {
    map: finish(color, renderer, { repeat: [22, 22] }),
    bumpMap: finish(bump, renderer, { srgb: false, repeat: [22, 22] }),
    roughnessMap: finish(rough, renderer, { srgb: false, repeat: [22, 22] }),
  }
}

export function createConcrete(renderer, tint = '#5f605b') {
  const S = 512
  const color = makeCanvas(S)
  const c = color.getContext('2d')
  c.fillStyle = tint
  c.fillRect(0, 0, S, S)
  noise(c, S, S, 16000, ['#4c4d49', '#6d6e68', '#7b7c74', '#54554f'])
  stains(c, S, S, 20, 'rgba(30,32,30,0.8)', 0.25)
  stains(c, S, S, 8, 'rgba(120,112,94,0.4)', 0.12)
  c.strokeStyle = 'rgba(40,42,40,0.55)'
  c.lineWidth = 2
  for (let i = 1; i < 4; i++) {
    c.beginPath()
    c.moveTo(0, (S / 4) * i + (Math.random() - 0.5) * 4)
    c.lineTo(S, (S / 4) * i + (Math.random() - 0.5) * 4)
    c.stroke()
  }
  cracks(c, S, S, 10, 'rgba(32,34,32,0.55)', 0.9)

  const bump = makeCanvas(256)
  const b = bump.getContext('2d')
  b.fillStyle = '#808080'
  b.fillRect(0, 0, 256, 256)
  noise(b, 256, 256, 6000, ['#585858', '#a2a2a2'], 1.5)

  return {
    map: finish(color, renderer, { repeat: [1, 1] }),
    bumpMap: finish(bump, renderer, { srgb: false, repeat: [1, 1] }),
  }
}

export function createFacade(renderer, variant = 0) {
  const S = 512
  const color = makeCanvas(S)
  const c = color.getContext('2d')
  const emissive = makeCanvas(S)
  const e = emissive.getContext('2d')
  e.fillStyle = '#000000'
  e.fillRect(0, 0, S, S)

  const wall = ['#34373a', '#3b3a36', '#2f3438', '#403a33'][variant % 4]
  c.fillStyle = wall
  c.fillRect(0, 0, S, S)
  noise(c, S, S, 14000, ['#25282a', '#4a4d4f', '#565a5c', '#2b2b28'])
  stains(c, S, S, 12, 'rgba(12,14,15,0.8)', 0.3)

  c.strokeStyle = 'rgba(12,14,15,0.6)'
  c.lineWidth = 4
  c.strokeRect(0, 0, S, S)

  const cols = 3
  const rows = 3
  const pad = 34
  const gap = 22
  const w = (S - pad * 2 - gap * (cols - 1)) / cols
  const h = (S - pad * 2 - gap * (rows - 1)) / rows

  const litColors = ['#ffc27a', '#ffd9a0', '#9fc4e8', '#ffe4b5', '#7fa8d8']

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const x = pad + col * (w + gap)
      const y = pad + row * (h + gap)
      const lit = Math.random() < 0.34

      c.fillStyle = '#1a1d20'
      c.fillRect(x - 4, y - 4, w + 8, h + 8)

      const g = c.createLinearGradient(x, y, x + w, y + h)
      if (lit) {
        g.addColorStop(0, '#3a3427')
        g.addColorStop(0.5, '#5a4a32')
        g.addColorStop(1, '#241f18')
      } else {
        g.addColorStop(0, '#10161c')
        g.addColorStop(0.45, '#1b252e')
        g.addColorStop(1, '#0a0e12')
      }
      c.fillStyle = g
      c.fillRect(x, y, w, h)

      c.strokeStyle = 'rgba(90,96,100,0.55)'
      c.lineWidth = 2
      c.strokeRect(x, y, w, h)
      c.beginPath()
      c.moveTo(x + w / 2, y)
      c.lineTo(x + w / 2, y + h)
      c.stroke()

      c.fillStyle = 'rgba(0,0,0,0.32)'
      c.fillRect(x, y, w, 3)

      if (lit) {
        e.fillStyle = litColors[(Math.random() * litColors.length) | 0]
        e.globalAlpha = 0.55 + Math.random() * 0.45
        e.fillRect(x + 3, y + 5, w - 6, h - 8)
        e.globalAlpha = 1
      }

      if (Math.random() < 0.18) {
        c.fillStyle = 'rgba(0,0,0,0.55)'
        c.fillRect(x + 8, y + h + 2, w - 16, 3)
      }
    }
  }

  return {
    map: finish(color, renderer, { repeat: [1, 1] }),
    emissiveMap: finish(emissive, renderer, { repeat: [1, 1] }),
  }
}

export function createContainer(renderer, variant = 0) {
  const S = 512
  const color = makeCanvas(S)
  const c = color.getContext('2d')
  const base = ['#6b352e', '#31504b', '#3a4a5c', '#5b5232'][variant % 4]
  c.fillStyle = base
  c.fillRect(0, 0, S, S)

  for (let x = 0; x < S; x += 10) {
    const light = 0.08 + 0.1 * Math.sin((x / S) * Math.PI * 16)
    c.fillStyle = `rgba(255,255,255,${light * 0.32})`
    c.fillRect(x, 0, 4, S)
    c.fillStyle = 'rgba(0,0,0,0.28)'
    c.fillRect(x + 6, 0, 3, S)
  }

  stains(c, S, S, 24, 'rgba(14,12,10,0.85)', 0.32)
  stains(c, S, S, 18, 'rgba(120,66,32,0.65)', 0.22)
  noise(c, S, S, 9000, ['#22201c', '#8a8f8c', '#5d4a3a'], 2)

  c.fillStyle = 'rgba(230,228,220,0.55)'
  c.font = 'bold 34px monospace'
  c.fillText('MK 407', 30, S - 38)
  c.font = 'bold 15px monospace'
  c.fillStyle = 'rgba(230,228,220,0.38)'
  c.fillText('CARGO • 30T', 30, S - 16)

  const bump = makeCanvas(256)
  const b = bump.getContext('2d')
  b.fillStyle = '#808080'
  b.fillRect(0, 0, 256, 256)
  for (let x = 0; x < 256; x += 6) {
    b.fillStyle = '#9a9a9a'
    b.fillRect(x, 0, 2, 256)
    b.fillStyle = '#666666'
    b.fillRect(x + 3, 0, 2, 256)
  }
  noise(b, 256, 256, 4000, ['#707070', '#909090'], 1.4)

  return {
    map: finish(color, renderer, { repeat: [1, 1] }),
    bumpMap: finish(bump, renderer, { srgb: false, repeat: [1, 1] }),
  }
}

export function createCrate(renderer) {
  const S = 256
  const color = makeCanvas(S)
  const c = color.getContext('2d')
  c.fillStyle = '#5c4830'
  c.fillRect(0, 0, S, S)
  for (let i = 0; i < 5; i++) {
    const y = (S / 5) * i
    c.fillStyle = ['#63503a', '#584631', '#6a553a', '#5d4a35'][i % 4]
    c.fillRect(0, y + 2, S, S / 5 - 5)
    c.strokeStyle = 'rgba(30,22,14,0.55)'
    c.lineWidth = 2
    c.beginPath()
    c.moveTo(0, y + 1)
    c.lineTo(S, y + 1)
    c.stroke()
  }
  noise(c, S, S, 5000, ['#3f3120', '#7a6647', '#2f2518'], 1.6)
  stains(c, S, S, 6, 'rgba(25,18,10,0.7)', 0.2)
  c.strokeStyle = 'rgba(28,28,28,0.75)'
  c.lineWidth = 5
  c.strokeRect(4, 4, S - 8, S - 8)
  c.fillStyle = 'rgba(232,226,210,0.4)'
  c.font = 'bold 17px monospace'
  c.fillText('MUN 7.62', 26, S / 2 + 6)
  c.fillStyle = 'rgba(180,30,20,0.4)'
  c.fillRect(22, S - 52, 74, 26)
  c.fillStyle = 'rgba(240,238,230,0.55)'
  c.font = 'bold 13px monospace'
  c.fillText('FRÁGIL', 30, S - 34)

  return {
    map: finish(color, renderer, { repeat: [1, 1] }),
  }
}

export function createSandbag(renderer) {
  const S = 256
  const color = makeCanvas(S)
  const c = color.getContext('2d')
  c.fillStyle = '#7c7257'
  c.fillRect(0, 0, S, S)
  noise(c, S, S, 9000, ['#6b6249', '#8d8263', '#5c543f', '#96896a'], 1.8)
  stains(c, S, S, 10, 'rgba(40,35,22,0.65)', 0.22)
  c.strokeStyle = 'rgba(50,46,32,0.5)'
  c.lineWidth = 1
  for (let y = 8; y < S; y += 14) {
    c.beginPath()
    c.moveTo(0, y)
    c.lineTo(S, y + 2)
    c.stroke()
  }
  for (let x = 0; x < S; x += 20) {
    c.beginPath()
    c.moveTo(x, 0)
    c.lineTo(x + 3, S)
    c.stroke()
  }

  const bump = makeCanvas(256)
  const b = bump.getContext('2d')
  b.fillStyle = '#808080'
  b.fillRect(0, 0, 256, 256)
  noise(b, 256, 256, 14000, ['#5a5a5a', '#a6a6a6'], 2)

  return {
    map: finish(color, renderer, { repeat: [1, 1] }),
    bumpMap: finish(bump, renderer, { srgb: false, repeat: [1, 1] }),
  }
}

export function createMetal(renderer) {
  const S = 256
  const color = makeCanvas(S)
  const c = color.getContext('2d')
  c.fillStyle = '#4a4d50'
  c.fillRect(0, 0, S, S)
  noise(c, S, S, 6000, ['#3a3d40', '#5c6064', '#2e3032'], 1.4)
  stains(c, S, S, 9, 'rgba(110,60,30,0.5)', 0.2)
  c.strokeStyle = 'rgba(30,32,34,0.4)'
  c.lineWidth = 1
  for (let i = 0; i < 26; i++) {
    const y = Math.random() * S
    c.beginPath()
    c.moveTo(Math.random() * S, y)
    c.lineTo(Math.random() * S, y + Math.random() * 8)
    c.stroke()
  }
  return { map: finish(color, renderer, { repeat: [1, 1] }) }
}

function radial(size, stops, clamp = true) {
  const c = makeCanvas(size)
  const ctx = c.getContext('2d')
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
  for (const [o, col] of stops) g.addColorStop(o, col)
  ctx.fillStyle = g
  ctx.fillRect(0, 0, size, size)
  return { canvas: c, clamp }
}

export function createGlowTexture(renderer, stops = [[0, 'rgba(255,255,255,1)'], [0.4, 'rgba(255,255,255,0.35)'], [1, 'rgba(255,255,255,0)']], size = 128) {
  const { canvas } = radial(size, stops)
  return finish(canvas, renderer, { clamp: true })
}

export function createFlashTexture(renderer) {
  const S = 256
  const c = makeCanvas(S)
  const ctx = c.getContext('2d')
  ctx.globalCompositeOperation = 'lighter'
  const g = ctx.createRadialGradient(S / 2, S / 2, 0, S / 2, S / 2, S / 2)
  g.addColorStop(0, 'rgba(255,255,245,1)')
  g.addColorStop(0.12, 'rgba(255,238,180,0.95)')
  g.addColorStop(0.32, 'rgba(255,170,70,0.55)')
  g.addColorStop(0.7, 'rgba(255,120,30,0.12)')
  g.addColorStop(1, 'rgba(255,90,10,0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, S, S)

  ctx.translate(S / 2, S / 2)
  for (let i = 0; i < 5; i++) {
    const a = (Math.PI * 2 * i) / 5 + Math.random() * 0.4
    const len = 55 + Math.random() * 70
    ctx.save()
    ctx.rotate(a)
    const lg = ctx.createLinearGradient(0, 0, len, 0)
    lg.addColorStop(0, 'rgba(255,240,190,0.85)')
    lg.addColorStop(1, 'rgba(255,150,40,0)')
    ctx.fillStyle = lg
    ctx.beginPath()
    ctx.moveTo(0, -5)
    ctx.lineTo(len, 0)
    ctx.lineTo(0, 5)
    ctx.closePath()
    ctx.fill()
    ctx.restore()
  }
  return finish(c, renderer, { clamp: true })
}

export function createSmokeTexture(renderer) {
  const S = 128
  const c = makeCanvas(S)
  const ctx = c.getContext('2d')
  for (let i = 0; i < 18; i++) {
    const x = S / 2 + (Math.random() - 0.5) * S * 0.5
    const y = S / 2 + (Math.random() - 0.5) * S * 0.5
    const r = 14 + Math.random() * S * 0.28
    const g = ctx.createRadialGradient(x, y, 0, x, y, r)
    g.addColorStop(0, 'rgba(160,160,158,0.32)')
    g.addColorStop(1, 'rgba(120,120,118,0)')
    ctx.fillStyle = g
    ctx.beginPath()
    ctx.arc(x, y, r, 0, Math.PI * 2)
    ctx.fill()
  }
  return finish(c, renderer, { clamp: true })
}

export function createBulletHoleTexture(renderer) {
  const S = 64
  const c = makeCanvas(S)
  const ctx = c.getContext('2d')
  ctx.translate(S / 2, S / 2)
  const g = ctx.createRadialGradient(0, 0, 1, 0, 0, 13)
  g.addColorStop(0, 'rgba(2,2,2,0.98)')
  g.addColorStop(0.55, 'rgba(12,12,12,0.9)')
  g.addColorStop(0.8, 'rgba(60,60,58,0.45)')
  g.addColorStop(1, 'rgba(80,78,74,0)')
  ctx.fillStyle = g
  ctx.beginPath()
  ctx.arc(0, 0, 13, 0, Math.PI * 2)
  ctx.fill()
  ctx.strokeStyle = 'rgba(180,175,165,0.18)'
  ctx.lineWidth = 1
  for (let i = 0; i < 7; i++) {
    const a = Math.random() * Math.PI * 2
    const l = 6 + Math.random() * 14
    ctx.beginPath()
    ctx.moveTo(Math.cos(a) * 7, Math.sin(a) * 7)
    ctx.lineTo(Math.cos(a) * l, Math.sin(a) * l)
    ctx.stroke()
  }
  return finish(c, renderer, { clamp: true })
}

export function createLightPoolTexture(renderer) {
  return createGlowTexture(
    renderer,
    [
      [0, 'rgba(255,196,120,0.65)'],
      [0.35, 'rgba(255,160,80,0.28)'],
      [1, 'rgba(255,140,60,0)'],
    ],
    256
  )
}

export function createDustTexture(renderer) {
  return createGlowTexture(
    renderer,
    [
      [0, 'rgba(255,240,215,0.9)'],
      [0.4, 'rgba(255,230,200,0.3)'],
      [1, 'rgba(255,220,180,0)'],
    ],
    32
  )
}
