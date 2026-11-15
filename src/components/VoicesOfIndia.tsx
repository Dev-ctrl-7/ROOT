"use client";

import { useState, useRef, useEffect } from "react";
import {
  Volume2,
  VolumeX,
  Music,
  Play,
  Pause,
  RotateCcw,
  Loader2,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Disc3,
} from "lucide-react";
import { AUTHENTIC_INSTRUMENTS, AuthenticInstrument } from "@/lib/audio-data";

function formatTime(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

export function VoicesOfIndia() {
  const [activeTrackId, setActiveTrackId] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Stop playback when navigating away from the component
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
        audioRef.current = null;
      }
    };
  }, []);

  const stopCurrentAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setIsPlaying(false);
    setIsLoading(false);
  };

  const playInstrument = (inst: AuthenticInstrument) => {
    setErrorMessage(null);

    // If clicking the currently active track
    if (activeTrackId === inst.id && audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        setIsLoading(true);
        audioRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
            setIsLoading(false);
          })
          .catch((err) => {
            console.error("Audio playback error:", err);
            setErrorMessage("Playback blocked. Please click to interact.");
            setIsPlaying(false);
            setIsLoading(false);
          });
      }
      return;
    }

    // Switching to a new instrument: pause any active recording first
    stopCurrentAudio();
    setActiveTrackId(inst.id);
    setIsLoading(true);
    setCurrentTime(0);
    setDuration(inst.durationSeconds);

    if (!audioRef.current) {
      audioRef.current = new Audio();
    }

    const audio = audioRef.current;
    audio.src = inst.audioSrc;
    audio.load();

    audio.oncanplay = () => {
      setIsLoading(false);
      if (audio.duration && !isNaN(audio.duration)) {
        setDuration(Math.floor(audio.duration));
      }
    };

    audio.ontimeupdate = () => {
      setCurrentTime(audio.currentTime);
    };

    audio.onwaiting = () => {
      setIsLoading(true);
    };

    audio.onplaying = () => {
      setIsLoading(false);
      setIsPlaying(true);
    };

    audio.onended = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.onerror = () => {
      setIsLoading(false);
      setIsPlaying(false);
      setErrorMessage(`Failed to load authentic audio for ${inst.name}.`);
    };

    audio
      .play()
      .then(() => {
        setIsPlaying(true);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Audio play error:", err);
        setIsLoading(false);
        setIsPlaying(false);
        setErrorMessage("Click to allow audio playback in your browser.");
      });
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>, totalSeconds: number) => {
    if (!audioRef.current || !activeTrackId) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const progress = Math.max(0, Math.min(1, clickX / rect.width));
    const targetTime = progress * (totalSeconds || 100);
    audioRef.current.currentTime = targetTime;
    setCurrentTime(targetTime);
  };

  const handleReplay = (inst: AuthenticInstrument) => {
    if (audioRef.current && activeTrackId === inst.id) {
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
      if (!isPlaying) {
        audioRef.current.play().then(() => setIsPlaying(true));
      }
    } else {
      playInstrument(inst);
    }
  };

  return (
    <section
      id="voices-of-india"
      className="py-24 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto space-y-12 border-t border-[#C59B27]/25"
    >
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#C59B27]/40 bg-[#FAF8F5] dark:bg-[#1A1613] text-[#5B0E1B] dark:text-[#E5C378] text-[10px] uppercase tracking-[0.25em] font-mono shadow-xs">
          <Disc3 className="w-3.5 h-3.5 text-[#C59B27] dark:text-[#D4AF37] animate-spin-slow" />
          Acoustic Heritage &bull; Authentic Field &amp; Archival Recordings
        </div>
        <h2 className="font-serif text-4xl sm:text-5xl text-[#1C1814] dark:text-[#F5EFEB] font-normal tracking-tight">
          Voices &amp; Resonances of India
        </h2>
        <p className="font-sans text-xs sm:text-sm text-[#6E6255] dark:text-[#A89886] max-w-2xl mx-auto leading-relaxed font-light">
          Authentic master performances of the subcontinent&apos;s classical, temple, and devotional instruments.
          Recorded on location by cultural archives, master practitioners, and heritage custodians.
        </p>
      </div>

      {/* Instruments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {AUTHENTIC_INSTRUMENTS.map((inst) => {
          const isThisTrackActive = activeTrackId === inst.id;
          const isThisPlaying = isThisTrackActive && isPlaying;
          const isThisLoading = isThisTrackActive && isLoading;
          const currentTrackDuration = isThisTrackActive && duration > 0 ? duration : inst.durationSeconds;
          const activeProgress = isThisTrackActive && currentTrackDuration > 0 ? (currentTime / currentTrackDuration) * 100 : 0;

          return (
            <div
              key={inst.id}
              className={`rounded-2xl p-6 border transition-all duration-300 flex flex-col justify-between shadow-xs hover:shadow-xl ${
                isThisPlaying
                  ? "bg-white dark:bg-[#1E1915] border-[#C59B27] ring-2 ring-[#C59B27]/30 shadow-md"
                  : "bg-white/85 dark:bg-[#161210] hover:bg-white dark:hover:bg-[#1C1714] border-[#C59B27]/20 dark:border-[#C59B27]/35"
              }`}
            >
              <div className="space-y-4">
                {/* Header: Region & Native Script */}
                <div className="flex items-center justify-between pb-2 border-b border-[#C59B27]/15 dark:border-[#C59B27]/25">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#8C7E72] dark:text-[#A89886]">
                    {inst.region}
                  </span>
                  <span className="text-xs font-serif text-[#C59B27] dark:text-[#D4AF37] font-semibold">
                    {inst.nativeName}
                  </span>
                </div>

                {/* Instrument Name & Tradition */}
                <div>
                  <h3 className="font-serif text-2xl font-normal text-[#1C1814] dark:text-[#F5EFEB]">
                    {inst.name}
                  </h3>
                  <span className="text-xs font-mono uppercase text-[#5B0E1B] dark:text-[#E5C378] font-medium block mt-0.5">
                    {inst.tradition}
                  </span>
                </div>

                {/* Cultural Description */}
                <p className="text-xs text-[#54483C] dark:text-[#D9CEBF] font-sans leading-relaxed">
                  {inst.description}
                </p>

                {/* Performer & Archival Attribution Box */}
                <div className="p-3 rounded-xl bg-[#FAF6EE] dark:bg-[#1C1714] border border-[#C59B27]/20 text-[11px] space-y-1.5 font-sans">
                  <div className="flex items-start gap-1.5">
                    <Music className="w-3.5 h-3.5 text-[#C59B27] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-serif font-medium text-[#1C1814] dark:text-[#F5EFEB] block">
                        {inst.recordingTitle}
                      </span>
                      <span className="text-[#6E6255] dark:text-[#A89886] text-[10px] block">
                        Performer: <strong className="text-[#5B0E1B] dark:text-[#E5C378]">{inst.performer}</strong>
                      </span>
                    </div>
                  </div>

                  <div className="pt-1.5 border-t border-[#C59B27]/10 flex items-center justify-between text-[10px] text-[#8C7E72] dark:text-[#9A8D7E]">
                    <span className="truncate max-w-[190px]" title={inst.source}>
                      {inst.source.split("(")[0].trim()}
                    </span>
                    <a
                      href={inst.licenseUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[#8C5320] dark:text-[#C59B27] hover:underline shrink-0"
                    >
                      <span>{inst.license.split(" ")[0]}</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  </div>
                </div>

                {/* Scrubber / Progress Bar */}
                <div className="space-y-1.5 pt-1">
                  <div
                    onClick={(e) => isThisTrackActive && handleSeek(e, currentTrackDuration)}
                    className={`w-full h-2 rounded-full overflow-hidden transition-all ${
                      isThisTrackActive ? "bg-[#E6DEC8] dark:bg-[#2C241D] cursor-pointer" : "bg-[#EDE7DA] dark:bg-[#221C17]"
                    }`}
                    title={isThisTrackActive ? "Click to scrub playback" : ""}
                  >
                    <div
                      className="h-full bg-gradient-to-r from-[#8C5320] via-[#C59B27] to-[#5B0E1B] transition-all duration-150 rounded-full"
                      style={{ width: `${activeProgress}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[10px] font-mono text-[#8C7E72] dark:text-[#A89886]">
                    <span>{isThisTrackActive ? formatTime(currentTime) : "0:00"}</span>
                    <span>{inst.formattedDuration}</span>
                  </div>
                </div>

                {/* Error Banner if any */}
                {isThisTrackActive && errorMessage && (
                  <div className="flex items-center gap-1.5 text-[10px] text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 p-2 rounded-lg border border-red-200 dark:border-red-900/40">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}
              </div>

              {/* Player Control Actions */}
              <div className="mt-6 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => playInstrument(inst)}
                  className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-serif uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                    isThisPlaying
                      ? "bg-[#5B0E1B] text-white shadow-md"
                      : "bg-[#FAF5EE] dark:bg-[#231D18] hover:bg-[#5B0E1B] hover:text-white dark:hover:bg-[#5B0E1B] text-[#5B0E1B] dark:text-[#E5C378] border border-[#C59B27]/30"
                  }`}
                >
                  {isThisLoading ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Buffering Master Recording...</span>
                    </>
                  ) : isThisPlaying ? (
                    <>
                      <Pause className="w-3.5 h-3.5 fill-current" />
                      <span>Pause Performance</span>
                    </>
                  ) : isThisTrackActive && currentTime > 0 ? (
                    <>
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Resume Performance</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>{inst.buttonActionLabel}</span>
                    </>
                  )}
                </button>

                {isThisTrackActive && (
                  <button
                    type="button"
                    onClick={() => handleReplay(inst)}
                    title="Replay from start"
                    className="p-2.5 rounded-xl border border-[#C59B27]/30 bg-[#FAF5EE] dark:bg-[#231D18] text-[#5B0E1B] dark:text-[#E5C378] hover:bg-[#5B0E1B] hover:text-white transition-all shrink-0"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default VoicesOfIndia;
