export function createAudio() {
  let ctx = null, master = null, reverbIn = null, ambientStarted = false, muted = false;
  const masterLevel = 0.85;

  function init() {
    if (ctx) { if (ctx.state === 'suspended') ctx.resume(); return true; }
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return false;
    ctx = new AC();
    master = ctx.createGain();
    master.gain.value = muted ? 0 : masterLevel;
    const comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -16; comp.knee.value = 22; comp.ratio.value = 8;
    comp.attack.value = 0.002; comp.release.value = 0.22;
    master.connect(comp); comp.connect(ctx.destination);

    const conv = ctx.createConvolver();
    conv.buffer = impulse(1.6, 2.6);
    const wet = ctx.createGain(); wet.gain.value = 0.22;
    conv.connect(wet); wet.connect(master);
    reverbIn = ctx.createGain(); reverbIn.gain.value = 1; reverbIn.connect(conv);
    return true;
  }

  function impulse(duration, decay) {
    const rate = ctx.sampleRate, len = rate * duration;
    const buf = ctx.createBuffer(2, len, rate);
    for (let c = 0; c < 2; c++) {
      const d = buf.getChannelData(c);
      for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, decay);
    }
    return buf;
  }

  let noise = null;
  function getNoise() {
    if (noise) return noise;
    const len = ctx.sampleRate * 2;
    noise = ctx.createBuffer(1, len, ctx.sampleRate);
    const d = noise.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
    return noise;
  }

  function env(gain, t0, peak, attack, decay) {
    gain.gain.setValueAtTime(0.0001, t0);
    gain.gain.exponentialRampToValueAtTime(Math.max(peak, 0.0002), t0 + attack);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + attack + decay);
  }

  function noiseHit({ dur = 0.15, freq = 1200, q = 0.8, gain = 0.3, type = 'bandpass', pan = 0, attack = 0.002, send = 0.2, time = null }) {
    if (!ctx) return;
    const t0 = time ?? ctx.currentTime;
    const src = ctx.createBufferSource(); src.buffer = getNoise(); src.loop = true;
    const f = ctx.createBiquadFilter(); f.type = type; f.frequency.value = freq; f.Q.value = q;
    const g = ctx.createGain();
    env(g, t0, gain, attack, dur);
    const p = ctx.createStereoPanner ? ctx.createStereoPanner() : null;
    if (p) { p.pan.value = pan; src.connect(f); f.connect(g); g.connect(p); p.connect(master); if (send) { const s = ctx.createGain(); s.gain.value = send * gain; p.connect(s); s.connect(reverbIn); } }
    else { src.connect(f); f.connect(g); g.connect(master); }
    src.start(t0); src.stop(t0 + attack + dur + 0.05);
    return { src, f, g };
  }

  function tone({ freq = 220, dur = 0.15, gain = 0.2, type = 'sine', slide = 0, time = null }) {
    if (!ctx) return;
    const t0 = time ?? ctx.currentTime;
    const o = ctx.createOscillator(); o.type = type; o.frequency.setValueAtTime(freq, t0);
    if (slide) o.frequency.exponentialRampToValueAtTime(Math.max(20, freq + slide), t0 + dur);
    const g = ctx.createGain(); env(g, t0, gain, 0.004, dur);
    o.connect(g); g.connect(master);
    o.start(t0); o.stop(t0 + dur + 0.05);
  }

  function gunshot(vol = 1, distant = false) {
    if (!ctx) return;
    const t0 = ctx.currentTime;
    if (distant) {
      noiseHit({ dur: 0.4, freq: 420, q: 0.5, gain: 0.12 * vol, type: 'lowpass', pan: (Math.random() - 0.5) * 0.7, attack: 0.01, send: 0.7, time: t0 });
      tone({ freq: 90, dur: 0.3, gain: 0.05 * vol, type: 'sine', slide: -50, time: t0 });
      return;
    }
    noiseHit({ dur: 0.24, freq: 2100, q: 0.55, gain: 0.55, type: 'bandpass', pan: 0.15, attack: 0.001, send: 0.45, time: t0 });
    noiseHit({ dur: 0.55, freq: 380, q: 0.7, gain: 0.42, type: 'lowpass', pan: 0.1, attack: 0.001, send: 0.6, time: t0 });
    tone({ freq: 120, dur: 0.18, gain: 0.38, type: 'sine', slide: -70, time: t0 });
    tone({ freq: 62, dur: 0.32, gain: 0.3, type: 'triangle', slide: -26, time: t0 });
    noiseHit({ dur: 0.05, freq: 6000, q: 1.2, gain: 0.16, type: 'highpass', pan: 0.2, attack: 0.0005, send: 0.15, time: t0 });
  }

  function enemyShot(dist = 10) {
    if (!ctx) return;
    const vol = Math.max(0.08, Math.min(1, 16 / (dist + 6)));
    gunshot(vol, true);
  }

  function reloadStart() {
    if (!ctx) return;
    const t0 = ctx.currentTime;
    noiseHit({ dur: 0.05, freq: 900, q: 2, gain: 0.22, pan: 0.25, time: t0 + 0.08, attack: 0.001 });
    noiseHit({ dur: 0.08, freq: 520, q: 1.4, gain: 0.16, pan: 0.2, time: t0 + 0.35, attack: 0.001 });
  }
  function reloadIn() {
    if (!ctx) return;
    const t0 = ctx.currentTime;
    noiseHit({ dur: 0.06, freq: 1300, q: 2, gain: 0.25, pan: 0.2, time: t0, attack: 0.001 });
    noiseHit({ dur: 0.12, freq: 430, q: 1.2, gain: 0.2, pan: 0.2, time: t0 + 0.05, attack: 0.001 });
  }
  function reloadEnd() {
    if (!ctx) return;
    const t0 = ctx.currentTime;
    noiseHit({ dur: 0.05, freq: 1700, q: 2.5, gain: 0.3, pan: 0.18, time: t0, attack: 0.001 });
    noiseHit({ dur: 0.1, freq: 700, q: 1.8, gain: 0.18, pan: 0.18, time: t0 + 0.09, attack: 0.001 });
  }
  function bolt() {
    if (!ctx) return;
    noiseHit({ dur: 0.05, freq: 2100, q: 3, gain: 0.18, pan: 0.2, attack: 0.001 });
  }

  function hit(head = false) {
    if (!ctx) return;
    tone({ freq: head ? 1550 : 1100, dur: 0.05, gain: 0.16, type: 'square', time: null });
    if (head) tone({ freq: 2100, dur: 0.07, gain: 0.12, type: 'sine' });
  }
  function kill() {
    if (!ctx) return;
    tone({ freq: 660, dur: 0.08, gain: 0.14, type: 'triangle' });
    setTimeout(() => tone({ freq: 990, dur: 0.12, gain: 0.12, type: 'triangle' }), 70);
  }
  function hurt() {
    if (!ctx) return;
    noiseHit({ dur: 0.2, freq: 260, q: 0.6, gain: 0.35, type: 'lowpass', attack: 0.002, send: 0.3 });
    tone({ freq: 70, dur: 0.25, gain: 0.18, type: 'sine', slide: -20 });
  }
  function footstep(sprint = false) {
    if (!ctx) return;
    noiseHit({ dur: sprint ? 0.1 : 0.13, freq: sprint ? 360 : 280, q: 0.7, gain: sprint ? 0.1 : 0.07, type: 'lowpass', pan: (Math.random() - 0.5) * 0.2, attack: 0.003, send: 0.05 });
    noiseHit({ dur: 0.05, freq: 3200, q: 1.1, gain: 0.015, type: 'highpass', attack: 0.001 });
  }
  function ui(high = false) {
    if (!ctx) return;
    tone({ freq: high ? 880 : 520, dur: 0.06, gain: 0.08, type: 'sine' });
  }
  function dryFire() {
    if (!ctx) return;
    noiseHit({ dur: 0.03, freq: 2400, q: 3, gain: 0.13, pan: 0.2, attack: 0.001 });
  }
  function waveStart() {
    if (!ctx) return;
    const t0 = ctx.currentTime;
    tone({ freq: 110, dur: 0.6, gain: 0.1, type: 'sine', time: t0 });
    tone({ freq: 165, dur: 0.6, gain: 0.08, type: 'sine', time: t0 + 0.08 });
    noiseHit({ dur: 0.7, freq: 300, q: 0.5, gain: 0.06, type: 'lowpass', attack: 0.05, send: 0.6, time: t0 });
  }
  function victory() {
    if (!ctx) return;
    [392, 523, 659, 784].forEach((f, i) => tone({ freq: f, dur: 0.3, gain: 0.09, type: 'triangle', time: ctx.currentTime + i * 0.13 }));
  }

  function startAmbient() {
    if (!ctx || ambientStarted) return;
    ambientStarted = true;
    const src = ctx.createBufferSource(); src.buffer = getNoise(); src.loop = true;
    const f = ctx.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = 480; f.Q.value = 0.6;
    const g = ctx.createGain(); g.gain.value = 0.045;
    const lfo = ctx.createOscillator(); lfo.frequency.value = 0.09;
    const lfoGain = ctx.createGain(); lfoGain.gain.value = 180;
    lfo.connect(lfoGain); lfoGain.connect(f.frequency);
    src.connect(f); f.connect(g); g.connect(master);
    src.start(); lfo.start();
    const rumble = () => {
      if (!ctx) return;
      setTimeout(() => {
        if (!ctx) return;
        noiseHit({ dur: 1.6, freq: 110, q: 0.5, gain: 0.02 + Math.random() * 0.025, type: 'lowpass', attack: 0.4, send: 0.5 });
        rumble();
      }, 9000 + Math.random() * 16000);
    };
    rumble();
  }

  function setMuted(m) {
    muted = m;
    if (master) master.gain.setTargetAtTime(m ? 0 : masterLevel, ctx.currentTime, 0.05);
  }
  function isMuted() { return muted; }

  return {
    init, gunshot, enemyShot, reloadStart, reloadIn, reloadEnd, bolt, hit, kill, hurt,
    footstep, ui, dryFire, waveStart, victory, startAmbient, setMuted, isMuted,
    get ready() { return !!ctx; },
  };
}
