"use client";

import { useState, useRef } from "react";
import { Volume2, VolumeX, Music, Sparkles, Play, Square } from "lucide-react";

interface Instrument {
  id: string;
  name: string;
  nativeName: string;
  region: string;
  tradition: string;
  description: string;
  notes: number[]; // frequencies in Hz for melodic phrase
  waveform: OscillatorType;
  baseColor: string;
}

const INSTRUMENTS: Instrument[] = [
  {
    id: "nadaswaram",
    name: "Nadaswaram",
    nativeName: "நாதஸ்வரம்",
    region: "Tamil Nadu & South India",
    tradition: "Mangala Isai & Temple Ceremonies",
    description: "The world's most resonant non-brass acoustic wind instrument, carved from ancient ebony or aacha wood with silver bells.",
    notes: [293.66, 329.63, 392.00, 440.00, 493.88, 587.33], // Mohanam / Bhupali scale
    waveform: "sawtooth",
    baseColor: "#8C5320",
  },
  {
    id: "sitar",
    name: "Sitar",
    nativeName: "सितार",
    region: "Northern & Central India",
    tradition: "Hindustani Classical Ragas",
    description: "A plucked string instrument made from seasoned gourds and teakwood with sympathetic resonant strings producing shimmering overtones.",
    notes: [261.63, 293.66, 329.63, 392.00, 440.00, 523.25], // Bilawal / Shankarabharanam
    waveform: "triangle",
    baseColor: "#5B0E1B",
  },
  {
    id: "veena",
    name: "Saraswati Veena",
    nativeName: "ವೀಣೆ / வீணை",
    region: "Karnataka & Tamil Nadu",
    tradition: "Carnatic Classical Chamber Concerts",
    description: "One of the most ancient fretted lutes of India, carved from jackfruit wood, held in the lap of the goddess of arts Saraswati.",
    notes: [220.00, 246.94, 277.18, 329.63, 369.99, 440.00], // Kalyani raga
    waveform: "sine",
    baseColor: "#9E5C31",
  },
  {
    id: "bansuri",
    name: "Bansuri (Flute)",
    nativeName: "बांसुरी",
    region: "Pan-India & Vrindavan",
    tradition: "Pastoral Devotion & Classical Dhrupad",
    description: "A seamless transverse bamboo flute tuned to natural breath, evoking riverbanks, morning dew, and contemplative stillness.",
    notes: [329.63, 369.99, 415.30, 493.88, 554.37, 659.25], // Yaman / Kalyani
    waveform: "sine",
    baseColor: "#0A4642",
  },
  {
    id: "shehnai",
    name: "Shehnai",
    nativeName: "शहनाई",
    region: "Uttar Pradesh (Varanasi)",
    tradition: "Ghat Celebrations & Weddings",
    description: "A quadruple-reed instrument celebrated along the ghats of the Ganges, sanctified forever by Ustad Bismillah Khan.",
    notes: [349.23, 392.00, 440.00, 523.25, 587.33, 698.46], // Bhairav morning raga
    waveform: "sawtooth",
    baseColor: "#C59B27",
  },
  {
    id: "mridangam",
    name: "Mridangam",
    nativeName: "மிருதங்கம்",
    region: "South India",
    tradition: "Rhythmic Talam & Carnatic Ensemble",
    description: "The primary rhythmic accompaniment of South India, a two-headed drum carved from heavy jackwood tuned with black iron paste.",
    notes: [110, 165, 220, 165, 110, 220], // Low rhythmic pulses
    waveform: "triangle",
    baseColor: "#7A2E16",
  },
];

export function VoicesOfIndia() {
  const [activePlayingId, setActivePlayingId] = useState<string | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const timeoutIdsRef = useRef<NodeJS.Timeout[]>([]);

  const stopAllAudio = () => {
    timeoutIdsRef.current.forEach((id) => clearTimeout(id));
    timeoutIdsRef.current = [];
    setActivePlayingId(null);
  };

  const playInstrumentMelody = (instrument: Instrument) => {
    stopAllAudio();
    setActivePlayingId(instrument.id);

    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioContextRef.current) {
        audioContextRef.current = new AudioCtx();
      }
      const ctx = audioContextRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      // Play each note in sequence with subtle envelope
      instrument.notes.forEach((freq, idx) => {
        const timeout = setTimeout(() => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();

          osc.type = instrument.waveform;
          osc.frequency.setValueAtTime(freq, ctx.currentTime);

          // Attack - Decay - Sustain - Release
          const now = ctx.currentTime;
          gain.gain.setValueAtTime(0.001, now);
          gain.gain.exponentialRampToValueAtTime(0.18, now + 0.08);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start(now);
          osc.stop(now + 0.46);

          if (idx === instrument.notes.length - 1) {
            const endTimeout = setTimeout(() => {
              setActivePlayingId(null);
            }, 500);
            timeoutIdsRef.current.push(endTimeout);
          }
        }, idx * 280);

        timeoutIdsRef.current.push(timeout);
      });
    } catch {
      setActivePlayingId(null);
    }
  };

  return (
    <section id="voices-of-india" className="py-24 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto space-y-12 border-t border-[#C59B27]/25">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#C59B27]/40 bg-[#FAF8F5] dark:bg-[#1A1613] text-[#5B0E1B] dark:text-[#E5C378] text-[10px] uppercase tracking-[0.25em] font-mono shadow-xs">
          <Music className="w-3.5 h-3.5 text-[#C59B27] dark:text-[#D4AF37]" />
          Acoustic Heritage of the Subcontinent
        </div>
        <h2 className="font-serif text-4xl sm:text-5xl text-[#1C1814] dark:text-[#F5EFEB] font-normal tracking-tight">
          Voices & Resonances of India
        </h2>
        <p className="font-sans text-xs sm:text-sm text-[#6E6255] dark:text-[#A89886] max-w-xl mx-auto leading-relaxed font-light">
          Listen to procedural classical microtonal cadences synthesized through the Web Audio API across India&apos;s most revered instruments.
        </p>
      </div>

      {/* Instruments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {INSTRUMENTS.map((inst) => {
          const isPlaying = activePlayingId === inst.id;

          return (
            <div
              key={inst.id}
              className={`rounded-2xl p-6 border transition-all duration-300 flex flex-col justify-between shadow-xs hover:shadow-lg ${
                isPlaying
                  ? "bg-white dark:bg-[#1E1915] border-[#C59B27] ring-2 ring-[#C59B27]/30"
                  : "bg-white/80 dark:bg-[#161210] hover:bg-white dark:hover:bg-[#1C1714] border-[#C59B27]/20 dark:border-[#C59B27]/35"
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-[#C59B27]/15 dark:border-[#C59B27]/25">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#8C7E72] dark:text-[#A89886]">
                    {inst.region}
                  </span>
                  <span className="text-xs font-serif text-[#C59B27] dark:text-[#D4AF37] font-semibold">
                    {inst.nativeName}
                  </span>
                </div>

                <div>
                  <h3 className="font-serif text-2xl font-normal text-[#1C1814] dark:text-[#F5EFEB]">
                    {inst.name}
                  </h3>
                  <span className="text-xs font-mono uppercase text-[#5B0E1B] dark:text-[#E5C378] font-medium block mt-0.5">
                    {inst.tradition}
                  </span>
                </div>

                <p className="text-xs text-[#54483C] dark:text-[#D9CEBF] font-sans leading-relaxed">
                  {inst.description}
                </p>
              </div>

              {/* Play / Stop Button */}
              <button
                onClick={() => {
                  if (isPlaying) {
                    stopAllAudio();
                  } else {
                    playInstrumentMelody(inst);
                  }
                }}
                className={`mt-6 w-full py-2.5 px-4 rounded-xl text-xs font-serif uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${
                  isPlaying
                    ? "bg-[#5B0E1B] text-white shadow-md animate-pulse"
                    : "bg-[#FAF5EE] hover:bg-[#5B0E1B] hover:text-white text-[#5B0E1B] border border-[#C59B27]/30"
                }`}
              >
                {isPlaying ? (
                  <>
                    <Square className="w-3.5 h-3.5 fill-current" />
                    <span>Resonating Raga...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Play Melodic Phrase</span>
                  </>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default VoicesOfIndia;
