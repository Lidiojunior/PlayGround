export class SoundEngine {
  constructor() {
    this.ctx = null;
    this.master = null;
    this.noise = null;
    this.muted = false;
  }

  init() {
    if (this.ctx) {
      if (this.ctx.state === 'suspended') this.ctx.resume();
      return;
    }
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    this.ctx = new AudioContext();
    this.master = this.ctx.createGain();
    this.master.gain.value = this.muted ? 0 : 0.42;
    const compressor = this.ctx.createDynamicsCompressor();
    compressor.threshold.value = -16;
    compressor.knee.value = 14;
    compressor.ratio.value = 8;
    compressor.attack.value = 0.002;
    compressor.release.value = 0.22;
    this.master.connect(compressor);
    compressor.connect(this.ctx.destination);
    this.noise = this.createNoise(1.2);
    this.drone();
  }

  createNoise(seconds) {
    const rate = this.ctx.sampleRate;
    const buffer = this.ctx.createBuffer(1, rate * seconds, rate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
    return buffer;
  }

  setMuted(value) {
    this.muted = value;
    if (this.master) this.master.gain.setTargetAtTime(value ? 0 : 0.42, this.ctx.currentTime, 0.03);
  }

  toggle() {
    this.setMuted(!this.muted);
    return this.muted;
  }

  drone() {
    const ctx = this.ctx;
    const gain = ctx.createGain();
    gain.gain.value = 0.022;
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 190;
    const oscA = ctx.createOscillator();
    oscA.type = 'sawtooth';
    oscA.frequency.value = 43;
    const oscB = ctx.createOscillator();
    oscB.type = 'sine';
    oscB.frequency.value = 64.5;
    oscA.connect(filter);
    oscB.connect(filter);
    filter.connect(gain);
    gain.connect(this.master);
    oscA.start();
    oscB.start();
    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.08;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 55;
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);
    lfo.start();
  }

  noiseBurst(duration, filterType, frequency, q, volume, fade = 0.9) {
    if (!this.ctx) return;
    const ctx = this.ctx;
    const now = ctx.currentTime;
    const source = ctx.createBufferSource();
    source.buffer = this.noise;
    source.playbackRate.value = 1;
    const filter = ctx.createBiquadFilter();
    filter.type = filterType;
    filter.frequency.setValueAtTime(frequency, now);
    filter.frequency.exponentialRampToValueAtTime(Math.max(60, frequency * 0.18), now + duration * fade);
    filter.Q.value = q;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(volume, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
    source.connect(filter);
    filter.connect(gain);
    gain.connect(this.master);
    source.start(now);
    source.stop(now + duration + 0.02);
  }

  tone(frequency, duration, volume, type = 'sine', endFrequency = null, delay = 0) {
    if (!this.ctx) return;
    const ctx = this.ctx;
    const now = ctx.currentTime + delay;
    const osc = ctx.createOscillator();
    osc.type = type;
    osc.frequency.setValueAtTime(frequency, now);
    if (endFrequency) osc.frequency.exponentialRampToValueAtTime(endFrequency, now + duration);
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(volume, now + 0.006);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
    osc.connect(gain);
    gain.connect(this.master);
    osc.start(now);
    osc.stop(now + duration + 0.02);
  }

  shoot() {
    if (!this.ctx) return;
    this.noiseBurst(0.16, 'bandpass', 2100, 0.8, 0.9);
    this.noiseBurst(0.32, 'lowpass', 700, 0.7, 0.5, 1);
    this.tone(155, 0.16, 0.55, 'triangle', 42);
    this.tone(78, 0.24, 0.42, 'sine', 34);
    this.tone(3400, 0.03, 0.12, 'square', 900);
  }

  dry() {
    this.noiseBurst(0.04, 'highpass', 2800, 1.2, 0.16);
    this.tone(1800, 0.03, 0.06, 'square', 700);
  }

  hit(headshot) {
    if (headshot) {
      this.tone(1480, 0.14, 0.16, 'sine', 1120);
      this.tone(2200, 0.1, 0.09, 'sine', 1700, 0.02);
      this.tone(620, 0.09, 0.08, 'triangle', 440);
    } else {
      this.tone(920, 0.09, 0.1, 'sine', 760);
      this.tone(430, 0.06, 0.06, 'triangle', 330);
    }
  }

  target() {
    this.noiseBurst(0.09, 'lowpass', 620, 1, 0.15);
    this.tone(120, 0.12, 0.09, 'sine', 64);
    this.tone(310, 0.05, 0.03, 'square', 220);
  }

  reload() {
    const steps = [0, 0.28, 0.52, 0.86, 1.12, 1.38];
    steps.forEach((delay, index) => {
      this.noiseBurst(0.045, 'highpass', 2600 + index * 210, 1.4, 0.1);
      this.tone(280 + index * 90, 0.03, 0.05, 'square', 160, delay);
      if (index === 1 || index === 4) this.tone(90, 0.07, 0.1, 'triangle', 55, delay);
    });
  }

  start() {
    this.tone(220, 0.09, 0.1, 'square');
    this.tone(330, 0.09, 0.09, 'square', null, 0.12);
    this.tone(660, 0.22, 0.09, 'square', 520, 0.24);
    this.noiseBurst(0.4, 'lowpass', 320, 0.6, 0.14);
  }

  end() {
    this.tone(220, 0.7, 0.16, 'sawtooth', 110);
    this.tone(110, 1.1, 0.13, 'sine', 55, 0.05);
    this.tone(164, 0.9, 0.07, 'triangle', 82, 0.12);
  }

  ui() {
    this.tone(640, 0.03, 0.045, 'square', 820);
  }
}
