import * as THREE from 'three'

export class AudioEngine {
  constructor() {
    this.ctx = null
    this.master = null
    this.noiseBuffer = null
    this.enabled = false
    this.wind = null
    this.lastStep = 0
  }

  init() {
    if (this.ctx) {
      if (this.ctx.state === 'suspended') this.ctx.resume()
      return
    }
    const Ctx = window.AudioContext || window.webkitAudioContext
    if (!Ctx) return
    this.ctx = new Ctx()
    const comp = this.ctx.createDynamicsCompressor()
    comp.threshold.value = -16
    comp.knee.value = 18
    comp.ratio.value = 6
    comp.attack.value = 0.003
    comp.release.value = 0.18
    this.master = this.ctx.createGain()
    this.master.gain.value = 0.7
    this.master.connect(comp)
    comp.connect(this.ctx.destination)

    const len = this.ctx.sampleRate * 2
    const buf = this.ctx.createBuffer(1, len, this.ctx.sampleRate)
    const data = buf.getChannelData(0)
    for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1
    this.noiseBuffer = buf
    this.enabled = true
    this.startAmbience()
  }

  resume() {
    if (this.ctx && this.ctx.state === 'suspended') this.ctx.resume()
  }

  noise(duration, { gain = 0.3, type = 'lowpass', freq = 1200, q = 1, attack = 0.002, pan = 0, when = 0 } = {}) {
    if (!this.enabled) return
    const t = this.ctx.currentTime + when
    const src = this.ctx.createBufferSource()
    src.buffer = this.noiseBuffer
    src.loop = true
    const filter = this.ctx.createBiquadFilter()
    filter.type = type
    filter.frequency.setValueAtTime(freq, t)
    filter.Q.value = q
    const env = this.ctx.createGain()
    env.gain.setValueAtTime(0.0001, t)
    env.gain.exponentialRampToValueAtTime(gain, t + attack)
    env.gain.exponentialRampToValueAtTime(0.0001, t + duration)
    const panner = this.ctx.createStereoPanner()
    panner.pan.value = THREE.MathUtils.clamp(pan, -1, 1)
    src.connect(filter)
    filter.connect(env)
    env.connect(panner)
    panner.connect(this.master)
    src.start(t)
    src.stop(t + duration + 0.02)
    return { filter, env, t }
  }

  tone(duration, { gain = 0.2, freq = 440, type = 'sine', attack = 0.005, pan = 0, when = 0, glideTo = null } = {}) {
    if (!this.enabled) return
    const t = this.ctx.currentTime + when
    const osc = this.ctx.createOscillator()
    osc.type = type
    osc.frequency.setValueAtTime(freq, t)
    if (glideTo) osc.frequency.exponentialRampToValueAtTime(glideTo, t + duration)
    const env = this.ctx.createGain()
    env.gain.setValueAtTime(0.0001, t)
    env.gain.exponentialRampToValueAtTime(gain, t + attack)
    env.gain.exponentialRampToValueAtTime(0.0001, t + duration)
    const panner = this.ctx.createStereoPanner()
    panner.pan.value = THREE.MathUtils.clamp(pan, -1, 1)
    osc.connect(env)
    env.connect(panner)
    panner.connect(this.master)
    osc.start(t)
    osc.stop(t + duration + 0.02)
  }

  startAmbience() {
    if (!this.enabled || this.wind) return
    const src = this.ctx.createBufferSource()
    src.buffer = this.noiseBuffer
    src.loop = true
    const filter = this.ctx.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.value = 380
    filter.Q.value = 0.6
    const gain = this.ctx.createGain()
    gain.gain.value = 0.045
    const lfo = this.ctx.createOscillator()
    lfo.frequency.value = 0.09
    const lfoGain = this.ctx.createGain()
    lfoGain.gain.value = 0.022
    lfo.connect(lfoGain)
    lfoGain.connect(gain.gain)
    src.connect(filter)
    filter.connect(gain)
    gain.connect(this.master)
    src.start()
    lfo.start()
    this.wind = { src, gain, lfo }
  }

  gunshot(pan = 0) {
    if (!this.enabled) return
    this.noise(0.14, { gain: 0.62, type: 'bandpass', freq: 1500, q: 0.7, pan, attack: 0.001 })
    this.noise(0.06, { gain: 0.5, type: 'highpass', freq: 4200, q: 0.5, pan, attack: 0.001 })
    this.tone(0.18, { gain: 0.52, freq: 132, type: 'sine', glideTo: 42, pan, attack: 0.002 })
    this.tone(0.05, { gain: 0.16, freq: 2400, type: 'square', glideTo: 900, pan, attack: 0.001 })
    this.noise(0.32, { gain: 0.09, type: 'lowpass', freq: 520, q: 0.4, pan, attack: 0.01, when: 0.02 })
  }

  enemyShot(distance = 20, pan = 0) {
    if (!this.enabled) return
    const att = THREE.MathUtils.clamp(1 - distance / 70, 0.12, 1)
    this.noise(0.16, { gain: 0.38 * att, type: 'bandpass', freq: 900 + Math.random() * 500, q: 0.8, pan, attack: 0.001 })
    this.tone(0.2, { gain: 0.22 * att, freq: 95, type: 'sine', glideTo: 40, pan, attack: 0.002 })
    this.noise(0.4, { gain: 0.1 * att, type: 'lowpass', freq: 420, q: 0.3, pan, attack: 0.01, when: 0.01 })
  }

  suppression(pan = 0) {
    if (!this.enabled) return
    this.noise(0.09, { gain: 0.2, type: 'bandpass', freq: 2600, q: 2, pan, attack: 0.001 })
    this.tone(0.08, { gain: 0.07, freq: 3200, type: 'sine', pan, attack: 0.001, glideTo: 1400 })
  }

  impact(pan = 0) {
    if (!this.enabled) return
    this.noise(0.05, { gain: 0.12, type: 'bandpass', freq: 2200, q: 1.4, pan, attack: 0.001 })
  }

  reloadStep(step) {
    if (!this.enabled) return
    if (step === 0) {
      this.noise(0.04, { gain: 0.18, type: 'bandpass', freq: 900, q: 2, attack: 0.001 })
      this.tone(0.05, { gain: 0.1, freq: 240, type: 'square', attack: 0.001 })
    } else if (step === 1) {
      this.noise(0.06, { gain: 0.25, type: 'bandpass', freq: 600, q: 1.5, attack: 0.001 })
      this.tone(0.07, { gain: 0.14, freq: 150, type: 'sine', attack: 0.001, glideTo: 70 })
    } else {
      this.noise(0.07, { gain: 0.22, type: 'highpass', freq: 3000, q: 1, attack: 0.001 })
      this.tone(0.05, { gain: 0.08, freq: 720, type: 'square', attack: 0.001 })
      this.noise(0.05, { gain: 0.16, type: 'bandpass', freq: 1200, q: 2, attack: 0.001, when: 0.09 })
    }
  }

  empty() {
    if (!this.enabled) return
    this.noise(0.03, { gain: 0.18, type: 'highpass', freq: 3000, attack: 0.001 })
    this.tone(0.03, { gain: 0.07, freq: 380, type: 'square', attack: 0.001 })
  }

  footstep(running = false) {
    if (!this.enabled) return
    const now = performance.now()
    if (now - this.lastStep < (running ? 250 : 330)) return
    this.lastStep = now
    this.noise(running ? 0.1 : 0.08, { gain: running ? 0.16 : 0.1, type: 'lowpass', freq: 340 + Math.random() * 140, q: 0.8, attack: 0.003 })
    this.noise(0.03, { gain: 0.05, type: 'bandpass', freq: 1500, q: 1.2, attack: 0.001 })
  }

  hitmarker(head = false) {
    if (!this.enabled) return
    this.tone(0.055, { gain: head ? 0.2 : 0.13, freq: head ? 1750 : 1250, type: 'triangle', attack: 0.001 })
    if (head) this.tone(0.09, { gain: 0.12, freq: 2350, type: 'sine', attack: 0.001, when: 0.03 })
  }

  kill() {
    if (!this.enabled) return
    this.tone(0.09, { gain: 0.16, freq: 820, type: 'triangle', attack: 0.001 })
    this.tone(0.16, { gain: 0.14, freq: 1080, type: 'sine', attack: 0.002, when: 0.05 })
  }

  hurt() {
    if (!this.enabled) return
    this.noise(0.2, { gain: 0.32, type: 'lowpass', freq: 280, q: 0.7, attack: 0.002 })
    this.tone(0.45, { gain: 0.16, freq: 72, type: 'sine', glideTo: 44, attack: 0.005 })
    this.tone(0.9, { gain: 0.035, freq: 3100, type: 'sine', attack: 0.01, glideTo: 2600 })
  }

  waveStart() {
    if (!this.enabled) return
    this.tone(1.2, { gain: 0.16, freq: 58, type: 'sine', attack: 0.02, glideTo: 52 })
    this.tone(0.18, { gain: 0.12, freq: 620, type: 'square', attack: 0.002, when: 0.25 })
    this.tone(0.18, { gain: 0.12, freq: 620, type: 'square', attack: 0.002, when: 0.55 })
    this.tone(0.34, { gain: 0.14, freq: 930, type: 'square', attack: 0.002, when: 0.85 })
  }

  waveClear() {
    if (!this.enabled) return
    this.tone(0.4, { gain: 0.14, freq: 440, type: 'triangle', attack: 0.01 })
    this.tone(0.5, { gain: 0.14, freq: 660, type: 'triangle', attack: 0.01, when: 0.18 })
    this.tone(0.7, { gain: 0.12, freq: 880, type: 'sine', attack: 0.01, when: 0.36 })
  }

  ui() {
    if (!this.enabled) return
    this.tone(0.04, { gain: 0.08, freq: 900, type: 'square', attack: 0.001 })
  }

  distantBattle() {
    if (!this.enabled) return
    const pan = Math.random() * 1.6 - 0.8
    this.tone(0.5 + Math.random() * 0.5, { gain: 0.05 + Math.random() * 0.04, freq: 50 + Math.random() * 30, type: 'sine', glideTo: 34, pan, attack: 0.01 })
    this.noise(0.25, { gain: 0.035, type: 'lowpass', freq: 250, q: 0.5, pan, attack: 0.01 })
  }
}
