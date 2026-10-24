export class AudioEngine {
  constructor() {
    this.ctx = null
    this.master = null
    this.noiseBuffer = null
    this.started = false
    this.muted = false
    this.ambientTimer = 4
    this.stepToggle = false
  }

  init() {
    if (this.ctx) {
      this.resume()
      return
    }
    const AC = window.AudioContext || window.webkitAudioContext
    if (!AC) return
    this.ctx = new AC()
    this.master = this.ctx.createGain()
    this.master.gain.value = this.muted ? 0 : 0.6
    this.master.connect(this.ctx.destination)
    this.buildNoise()
    this.startAmbient()
    this.started = true
  }

  resume() {
    if (this.ctx && this.ctx.state === 'suspended') this.ctx.resume().catch(() => {})
  }

  setMuted(muted) {
    this.muted = muted
    if (this.master) {
      this.master.gain.cancelScheduledValues(this.ctx.currentTime)
      this.master.gain.setTargetAtTime(muted ? 0 : 0.6, this.ctx.currentTime, 0.05)
    }
    return this.muted
  }

  toggleMuted() {
    return this.setMuted(!this.muted)
  }

  buildNoise() {
    const len = this.ctx.sampleRate * 2
    const buf = this.ctx.createBuffer(1, len, this.ctx.sampleRate)
    const data = buf.getChannelData(0)
    for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1
    this.noiseBuffer = buf
  }

  noiseSource() {
    const src = this.ctx.createBufferSource()
    src.buffer = this.noiseBuffer
    src.loop = true
    return src
  }

  startAmbient() {
    const ctx = this.ctx
    const t = ctx.currentTime

    const wind = this.noiseSource()
    const windFilter = ctx.createBiquadFilter()
    windFilter.type = 'lowpass'
    windFilter.frequency.value = 360
    const windGain = ctx.createGain()
    windGain.gain.value = 0.05
    wind.connect(windFilter).connect(windGain).connect(this.master)
    wind.start(t)

    const lfo = ctx.createOscillator()
    lfo.frequency.value = 0.07
    const lfoGain = ctx.createGain()
    lfoGain.gain.value = 0.026
    lfo.connect(lfoGain).connect(windGain.gain)
    lfo.start(t)

    const deep = ctx.createOscillator()
    deep.type = 'sine'
    deep.frequency.value = 42
    const deepGain = ctx.createGain()
    deepGain.gain.value = 0.03
    deep.connect(deepGain).connect(this.master)
    deep.start(t)

    const hum = ctx.createOscillator()
    hum.type = 'sawtooth'
    hum.frequency.value = 58
    const humFilter = ctx.createBiquadFilter()
    humFilter.type = 'lowpass'
    humFilter.frequency.value = 140
    const humGain = ctx.createGain()
    humGain.gain.value = 0.012
    hum.connect(humFilter).connect(humGain).connect(this.master)
    hum.start(t)
  }

  update(dt) {
    if (!this.started) return
    this.ambientTimer -= dt
    if (this.ambientTimer <= 0) {
      this.ambientTimer = 5 + Math.random() * 10
      this.distantShot()
    }
  }

  distantShot() {
    if (!this.ctx) return
    const ctx = this.ctx
    const t = ctx.currentTime
    const src = this.noiseSource()
    const filter = ctx.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.value = 700 + Math.random() * 500
    const gain = ctx.createGain()
    gain.gain.setValueAtTime(0.0001, t)
    gain.gain.exponentialRampToValueAtTime(0.05 + Math.random() * 0.04, t + 0.01)
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.28)
    src.connect(filter).connect(gain)
    if (ctx.createStereoPanner) {
      const panner = ctx.createStereoPanner()
      panner.pan.value = Math.random() * 2 - 1
      gain.connect(panner).connect(this.master)
    } else {
      gain.connect(this.master)
    }
    src.start(t)
    src.stop(t + 0.32)
  }

  shot() {
    if (!this.ctx) return
    const ctx = this.ctx
    const t = ctx.currentTime

    const src = this.noiseSource()
    const bp = ctx.createBiquadFilter()
    bp.type = 'bandpass'
    bp.frequency.setValueAtTime(1900, t)
    bp.frequency.exponentialRampToValueAtTime(420, t + 0.12)
    bp.Q.value = 0.9
    const g = ctx.createGain()
    g.gain.setValueAtTime(0.0001, t)
    g.gain.exponentialRampToValueAtTime(0.85, t + 0.004)
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.2)
    src.connect(bp).connect(g).connect(this.master)
    src.start(t)
    src.stop(t + 0.22)

    const thump = ctx.createOscillator()
    thump.type = 'sine'
    thump.frequency.setValueAtTime(165, t)
    thump.frequency.exponentialRampToValueAtTime(42, t + 0.13)
    const tg = ctx.createGain()
    tg.gain.setValueAtTime(0.55, t)
    tg.gain.exponentialRampToValueAtTime(0.0001, t + 0.18)
    thump.connect(tg).connect(this.master)
    thump.start(t)
    thump.stop(t + 0.2)

    const tail = this.noiseSource()
    const lp = ctx.createBiquadFilter()
    lp.type = 'lowpass'
    lp.frequency.value = 1000
    const tailGain = ctx.createGain()
    tailGain.gain.setValueAtTime(0.14, t + 0.02)
    tailGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.5)
    tail.connect(lp).connect(tailGain).connect(this.master)
    tail.start(t)
    tail.stop(t + 0.55)
  }

  enemyShot(distance = 10) {
    if (!this.ctx) return
    const ctx = this.ctx
    const t = ctx.currentTime
    const vol = Math.max(0.06, 0.5 / (1 + distance * 0.09))
    const src = this.noiseSource()
    const filter = ctx.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.value = 1400
    const g = ctx.createGain()
    g.gain.setValueAtTime(0.0001, t)
    g.gain.exponentialRampToValueAtTime(vol, t + 0.006)
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.22)
    src.connect(filter).connect(g)
    if (ctx.createStereoPanner) {
      const panner = ctx.createStereoPanner()
      panner.pan.value = Math.random() * 1.2 - 0.6
      g.connect(panner).connect(this.master)
    } else {
      g.connect(this.master)
    }
    src.start(t)
    src.stop(t + 0.24)
  }

  mechanical(freq = 2400, dur = 0.03, vol = 0.18, delay = 0) {
    if (!this.ctx) return
    const ctx = this.ctx
    const t = ctx.currentTime + delay
    const src = this.noiseSource()
    const bp = ctx.createBiquadFilter()
    bp.type = 'bandpass'
    bp.frequency.value = freq
    bp.Q.value = 2.4
    const g = ctx.createGain()
    g.gain.setValueAtTime(0.0001, t)
    g.gain.exponentialRampToValueAtTime(vol, t + 0.003)
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur)
    src.connect(bp).connect(g).connect(this.master)
    src.start(t)
    src.stop(t + dur + 0.02)
  }

  reload() {
    if (!this.ctx) return
    this.mechanical(1400, 0.05, 0.22, 0.05)
    this.mechanical(900, 0.05, 0.18, 0.55)
    this.mechanical(2100, 0.04, 0.2, 1.25)
    this.mechanical(3200, 0.03, 0.2, 1.55)
    this.mechanical(2600, 0.03, 0.16, 1.68)
  }

  dryFire() {
    this.mechanical(3200, 0.025, 0.2)
  }

  hitMarker(head = false) {
    if (!this.ctx) return
    const ctx = this.ctx
    const t = ctx.currentTime
    const osc = ctx.createOscillator()
    osc.type = 'triangle'
    osc.frequency.setValueAtTime(head ? 2100 : 1450, t)
    osc.frequency.exponentialRampToValueAtTime(head ? 2600 : 1100, t + 0.06)
    const g = ctx.createGain()
    g.gain.setValueAtTime(0.0001, t)
    g.gain.exponentialRampToValueAtTime(head ? 0.2 : 0.12, t + 0.004)
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.12)
    osc.connect(g).connect(this.master)
    osc.start(t)
    osc.stop(t + 0.14)
  }

  hurt() {
    if (!this.ctx) return
    const ctx = this.ctx
    const t = ctx.currentTime
    const osc = ctx.createOscillator()
    osc.type = 'sine'
    osc.frequency.setValueAtTime(110, t)
    osc.frequency.exponentialRampToValueAtTime(38, t + 0.26)
    const g = ctx.createGain()
    g.gain.setValueAtTime(0.42, t)
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.32)
    osc.connect(g).connect(this.master)
    osc.start(t)
    osc.stop(t + 0.34)

    const src = this.noiseSource()
    const lp = ctx.createBiquadFilter()
    lp.type = 'lowpass'
    lp.frequency.value = 520
    const ng = ctx.createGain()
    ng.gain.setValueAtTime(0.2, t)
    ng.gain.exponentialRampToValueAtTime(0.0001, t + 0.18)
    src.connect(lp).connect(ng).connect(this.master)
    src.start(t)
    src.stop(t + 0.2)
  }

  footstep() {
    if (!this.ctx) return
    const ctx = this.ctx
    const t = ctx.currentTime
    this.stepToggle = !this.stepToggle
    const src = this.noiseSource()
    const bp = ctx.createBiquadFilter()
    bp.type = 'bandpass'
    bp.frequency.value = this.stepToggle ? 340 : 420
    bp.Q.value = 1.4
    const g = ctx.createGain()
    g.gain.setValueAtTime(0.0001, t)
    g.gain.exponentialRampToValueAtTime(0.055, t + 0.005)
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.1)
    src.connect(bp).connect(g).connect(this.master)
    src.start(t)
    src.stop(t + 0.12)
  }

  waveStart() {
    if (!this.ctx) return
    const ctx = this.ctx
    const t = ctx.currentTime
    ;[55, 82.5, 110, 164.8].forEach((f, i) => {
      const osc = ctx.createOscillator()
      osc.type = i === 3 ? 'triangle' : 'sawtooth'
      osc.frequency.value = f
      const filter = ctx.createBiquadFilter()
      filter.type = 'lowpass'
      filter.frequency.value = 320
      const g = ctx.createGain()
      g.gain.setValueAtTime(0.0001, t)
      g.gain.exponentialRampToValueAtTime(0.06, t + 0.25 + i * 0.04)
      g.gain.exponentialRampToValueAtTime(0.0001, t + 1.9)
      osc.connect(filter).connect(g).connect(this.master)
      osc.start(t)
      osc.stop(t + 2)
    })
  }

  waveClear() {
    if (!this.ctx) return
    const ctx = this.ctx
    const t = ctx.currentTime
    ;[440, 554, 659].forEach((f, i) => {
      const osc = ctx.createOscillator()
      osc.type = 'sine'
      osc.frequency.value = f
      const g = ctx.createGain()
      g.gain.setValueAtTime(0.0001, t + i * 0.09)
      g.gain.exponentialRampToValueAtTime(0.09, t + i * 0.09 + 0.03)
      g.gain.exponentialRampToValueAtTime(0.0001, t + i * 0.09 + 0.5)
      osc.connect(g).connect(this.master)
      osc.start(t + i * 0.09)
      osc.stop(t + i * 0.09 + 0.55)
    })
  }

  death() {
    if (!this.ctx) return
    const ctx = this.ctx
    const t = ctx.currentTime
    const osc = ctx.createOscillator()
    osc.type = 'sawtooth'
    osc.frequency.setValueAtTime(120, t)
    osc.frequency.exponentialRampToValueAtTime(24, t + 1.8)
    const filter = ctx.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.setValueAtTime(500, t)
    filter.frequency.exponentialRampToValueAtTime(90, t + 1.8)
    const g = ctx.createGain()
    g.gain.setValueAtTime(0.18, t)
    g.gain.exponentialRampToValueAtTime(0.0001, t + 2)
    osc.connect(filter).connect(g).connect(this.master)
    osc.start(t)
    osc.stop(t + 2.1)
  }

  uiClick() {
    this.mechanical(1800, 0.04, 0.12)
  }
}
