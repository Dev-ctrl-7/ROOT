"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { ArrowRight, Volume2, VolumeX } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";
import { ambientSound } from "@/lib/ambient-audio";

interface MuseumEntranceSequenceProps {
  forceOpen?: boolean;
  onClose?: () => void;
}

export function MuseumEntranceSequence({ forceOpen = false, onClose }: MuseumEntranceSequenceProps) {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isSkipped, setIsSkipped] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const { rootGlyph } = useLanguage();

  const skipTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Smooth dismiss handler
  const handleDismiss = useCallback(
    (immediate = false) => {
      if (skipTimerRef.current) clearTimeout(skipTimerRef.current);

      try {
        sessionStorage.setItem("roots_entrance_seen", "true");
        if (typeof document !== "undefined") {
          document.documentElement.removeAttribute("data-show-entrance");
          document.body.style.overflow = "";
        }
      } catch {
        // sessionStorage safety
      }

      if (immediate) {
        setIsCompleted(true);
        setIsActive(false);
        if (onClose) onClose();
      } else {
        setIsSkipped(true);
        // Clean 300ms smooth crossfade when user manually clicks skip
        skipTimerRef.current = setTimeout(() => {
          setIsCompleted(true);
          setIsActive(false);
          if (onClose) onClose();
        }, 300);
      }
    },
    [onClose]
  );

  // Initialize and check session / forceOpen
  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      handleDismiss(true);
      return;
    }

    let hasSeen = false;
    try {
      hasSeen = sessionStorage.getItem("roots_entrance_seen") === "true";
    } catch {
      hasSeen = false;
    }

    if (forceOpen) {
      document.documentElement.dataset.showEntrance = "true";
      setIsCompleted(false);
      setIsSkipped(false);
      setIsActive(true);
    } else if (!hasSeen) {
      setIsCompleted(false);
      setIsSkipped(false);
      setIsActive(true);
    } else {
      setIsCompleted(true);
      setIsActive(false);
    }
  }, [forceOpen, handleDismiss]);

  // Lock scrolling during entrance, unlock when dismissed or unmounted
  useEffect(() => {
    if (!isActive || isCompleted || isSkipped) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isActive, isCompleted, isSkipped]);

  // Keyboard navigation: Escape, Enter, or Space skips cleanly
  useEffect(() => {
    if (!isActive || isCompleted) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleDismiss(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isActive, isCompleted, handleDismiss]);

  const handleAudioToggle = async () => {
    try {
      const active = await ambientSound.toggle();
      setIsPlayingAudio(active);
    } catch {
      // Audio safety
    }
  };

  if (isCompleted && !forceOpen) return null;

  return (
    <div
      id="roots-museum-entrance"
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0C0A09] text-[#FAF8F5] select-none ${
        isSkipped
          ? "opacity-0 pointer-events-none transition-opacity duration-300 ease-out"
          : "animate-entrance-master"
      }`}
      onAnimationEnd={(e) => {
        // When master 5.4s CSS animation finishes, dismiss cleanly
        if (e.target === e.currentTarget && e.animationName === "museumEntranceFadeOut") {
          handleDismiss(true);
        }
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Cinematic Museum Opening"
    >
      {/* 1. ARCHITECTURAL GALLERY OVERHEAD SPOTLIGHT (0.0s - 1.0s warmth reveal) */}
      <div
        className="animate-museum-glow absolute top-0 left-1/2 -translate-x-1/2 w-[900px] max-w-full h-[550px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 65% 55% at 50% 15%, rgba(212, 175, 55, 0.13), rgba(197, 155, 39, 0.05) 50%, transparent 80%)",
        }}
      />

      {/* 2. SUBTLE ARCHIVAL FILIGREE BORDER (Gallery Architecture Frame) */}
      <div className="absolute inset-4 sm:inset-10 border border-[#C59B27]/20 rounded-2xl sm:rounded-[36px] pointer-events-none flex flex-col justify-between p-4 sm:p-8">
        <div className="flex justify-between w-full">
          <span className="w-3.5 h-3.5 border-t border-l border-[#D4AF37]/60" />
          <span className="w-3.5 h-3.5 border-t border-r border-[#D4AF37]/60" />
        </div>
        <div className="flex justify-between w-full">
          <span className="w-3.5 h-3.5 border-b border-l border-[#D4AF37]/60" />
          <span className="w-3.5 h-3.5 border-b border-r border-[#D4AF37]/60" />
        </div>
      </div>

      {/* 3. DISCREET GALLERY CONTROLS (Audio & Skip) */}
      <header className="absolute top-6 sm:top-10 inset-x-6 sm:inset-x-14 z-20 flex items-center justify-between">
        <button
          onClick={handleAudioToggle}
          type="button"
          className="px-3.5 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-[#C59B27]/30 text-[#D4AF37] text-[10px] font-mono uppercase tracking-[0.2em] flex items-center gap-2 transition-all cursor-pointer backdrop-blur-xs"
          title="Toggle Ambient Sitar & Tanpura"
        >
          {isPlayingAudio ? (
            <>
              <Volume2 className="w-3.5 h-3.5 text-[#E5C378]" />
              <span className="hidden sm:inline">Ambient: On</span>
            </>
          ) : (
            <>
              <VolumeX className="w-3.5 h-3.5 text-[#A89886]" />
              <span className="hidden sm:inline">Music: Off</span>
            </>
          )}
        </button>

        <button
          onClick={() => handleDismiss(false)}
          type="button"
          className="group px-4 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-[#C59B27]/35 hover:border-[#D4AF37] text-xs font-serif text-[#E5C378] flex items-center gap-2 transition-all cursor-pointer backdrop-blur-xs"
        >
          <span>Enter Museum</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#C59B27] group-hover:translate-x-0.5 transition-transform" />
        </button>
      </header>

      {/* 4. STATIC-LAYOUT CENTRAL STAGE (Zero Layout Shifts, Responsive & Perfectly Centered) */}
      <div className="relative z-10 max-w-2xl w-full mx-auto px-4 sm:px-6 text-center flex flex-col items-center justify-center">
        {/* Monogram Seal & Title Reveal (0.8s - 2.0s) */}
        <div className="animate-museum-wordmark flex flex-col items-center">
          <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-full border border-[#D4AF37]/70 flex items-center justify-center bg-[#151210] shadow-[0_0_35px_rgba(197,155,39,0.18)] mb-3 sm:mb-5">
            <span className="font-serif text-xl sm:text-3xl text-[#E5C378] font-bold">
              {rootGlyph}
            </span>
          </div>

          <span className="text-[9px] sm:text-[11px] font-mono uppercase tracking-[0.35em] text-[#C59B27] block mb-1.5 sm:mb-2">
            A Living Digital Museum
          </span>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal text-[#FAF8F5] leading-none mb-1 tracking-tight">
            ROOTS
          </h1>

          <p className="font-serif italic text-sm sm:text-base md:text-lg text-[#E5C378]/90 font-light tracking-wide">
            The Soul of India
          </p>
        </div>

        {/* Delicate Golden Divider Line (1.9s - 2.8s) */}
        <div className="animate-museum-line w-12 sm:w-16 h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent my-4 sm:my-6" />

        {/* Emotional Manifesto Reveal (2.1s - 3.8s) */}
        <div className="animate-museum-quote flex flex-col items-center space-y-2 sm:space-y-3">
          <p className="font-serif italic text-lg sm:text-2xl md:text-3xl text-[#EFE8DC] font-normal leading-relaxed max-w-lg px-2">
            &ldquo;Every place has a story.<br className="hidden sm:inline" /> Every story deserves to be felt.&rdquo;
          </p>

          <p className="text-[9px] sm:text-xs font-mono uppercase tracking-[0.25em] text-[#A89886] font-light pt-1 sm:pt-2">
            28 States &bull; 8 Union Territories &bull; 5,000 Years of Memory
          </p>
        </div>

        {/* 5. SUBTLE SEQUENCE PROGRESSION TIMELINE (0.0s - 3.8s) */}
        <div className="mt-8 sm:mt-10 flex flex-col items-center gap-2">
          <div className="w-32 sm:w-36 h-[1.5px] bg-white/10 rounded-full overflow-hidden">
            <div className="animate-museum-timeline w-full h-full bg-gradient-to-r from-[#C59B27] to-[#E5C378]" />
          </div>
          <span className="text-[8px] sm:text-[9px] font-mono tracking-widest text-[#6E6255] uppercase">
            Entering the Exhibition
          </span>
        </div>
      </div>
    </div>
  );
}

export default MuseumEntranceSequence;
