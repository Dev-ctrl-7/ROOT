/**
 * Procedural Indian Temple & Monsoon Ambient Soundscape
 * Uses standard Web Audio API oscillators, bandpass filters, and noise buffers.
 * Completely zero-dependency, zero-bandwidth, and failsafe.
 */

class AmbientSoundEngine {
  private ctx: AudioContext | null = null;
  private isRunning: boolean = false;
  private masterGain: GainNode | null = null;
  private tanpuraOscs: OscillatorNode[] = [];
  private rainNoiseNode: AudioNode | null = null;
  private bellTimer: ReturnType<typeof setInterval> | null = null;

  private initContext() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.35, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
  }

  public async toggle(): Promise<boolean> {
    this.initContext();
    if (!this.ctx) return false;

    if (this.ctx.state === "suspended") {
      await this.ctx.resume();
    }

    if (this.isRunning) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public getStatus(): boolean {
    return this.isRunning;
  }

  public start() {
    this.initContext();
    if (!this.ctx || !this.masterGain || this.isRunning) return;

    this.isRunning = true;
    const now = this.ctx.currentTime;

    // 1. Tanpura Drone (Sa - Pa - Sa harmonics: ~146.8 Hz D3 root, ~220 Hz A3 fifth, ~293.6 Hz D4 octave)
    const baseFreqs = [146.83, 220.0, 293.66, 147.2];
    this.tanpuraOscs = baseFreqs.map((freq, idx) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();

      osc.type = idx % 2 === 0 ? "sawtooth" : "triangle";
      osc.frequency.setValueAtTime(freq, now);

      // Low pass filter for warmth
      const filter = this.ctx!.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(420 + idx * 40, now);

      // Gentle LFO for breathing effect
      const lfo = this.ctx!.createOscillator();
      const lfoGain = this.ctx!.createGain();
      lfo.frequency.setValueAtTime(0.15 + idx * 0.05, now);
      lfoGain.gain.setValueAtTime(0.04, now);
      lfo.connect(gain.gain);
      lfo.start(now);

      gain.gain.setValueAtTime(0.08, now);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain!);

      osc.start(now);
      return osc;
    });

    // 2. Monsoon Courtyard Rain (Pink Noise filtered)
    this.startRainAtmosphere();

    // 3. Periodic Bronze Temple Bell
    this.playTempleBell();
    this.bellTimer = setInterval(() => {
      if (this.isRunning && Math.random() > 0.3) {
        this.playTempleBell();
      }
    }, 14000);
  }

  private startRainAtmosphere() {
    if (!this.ctx || !this.masterGain) return;
    const bufferSize = this.ctx.sampleRate * 2;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);

    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
      output[i] *= 0.035; // quiet level
      b6 = white * 0.115926;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(950, this.ctx.currentTime);

    const rainGain = this.ctx.createGain();
    rainGain.gain.setValueAtTime(0.04, this.ctx.currentTime);

    whiteNoise.connect(filter);
    filter.connect(rainGain);
    rainGain.connect(this.masterGain);

    whiteNoise.start();
    this.rainNoiseNode = whiteNoise;
  }

  public playTempleBell() {
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;

    // Harmonic bell frequencies (pure bronze bell resonance)
    const partials = [
      { freq: 440, gain: 0.18, decay: 4.5 },
      { freq: 880, gain: 0.10, decay: 3.2 },
      { freq: 1320, gain: 0.06, decay: 2.1 },
      { freq: 1760, gain: 0.03, decay: 1.4 },
    ];

    partials.forEach((p) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(p.freq, now);

      gain.gain.setValueAtTime(p.gain, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + p.decay);

      osc.connect(gain);
      gain.connect(this.masterGain!);

      osc.start(now);
      osc.stop(now + p.decay);
    });
  }

  public playSealBreakSound() {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;

    // Crisp parchment paper rustle and wax snap
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.exponentialRampToValueAtTime(80, now + 0.25);

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.35);

    // Complement with high-order temple chime shimmer
    this.playTempleBell();
  }

  public stop() {
    if (!this.ctx) return;
    this.isRunning = false;

    if (this.bellTimer) {
      clearInterval(this.bellTimer);
      this.bellTimer = null;
    }

    this.tanpuraOscs.forEach((osc) => {
      try {
        osc.stop();
        osc.disconnect();
      } catch {
        // ignore already stopped
      }
    });
    this.tanpuraOscs = [];

    if (this.rainNoiseNode) {
      try {
        (this.rainNoiseNode as AudioBufferSourceNode).stop();
        this.rainNoiseNode.disconnect();
      } catch {
        // ignore
      }
      this.rainNoiseNode = null;
    }
  }
}

export const ambientSound = new AmbientSoundEngine();
