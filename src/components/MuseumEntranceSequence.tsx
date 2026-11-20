"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Compass, Sparkles, ArrowRight, X, Volume2, VolumeX } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/context";
import { ambientSound } from "@/lib/ambient-audio";

interface MuseumEntranceSequenceProps {
  forceOpen?: boolean;
  onClose?: () => void;
}

export function MuseumEntranceSequence({ forceOpen = false, onClose }: MuseumEntranceSequenceProps) {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [step, setStep] = useState<number>(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const { rootGlyph } = useLanguage();

  useEffect(() => {
    // Check reduced motion preference
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      setPrefersReducedMotion(mediaQuery.matches);

      const hasSeen = sessionStorage.getItem("roots_entrance_seen");
      if (forceOpen || !hasSeen) {
        setIsVisible(true);
      }
    }
  }, [forceOpen]);

  // Stepped sequence progression
  useEffect(() => {
    if (!isVisible) return;

    if (prefersReducedMotion) {
      setStep(2); // Jump directly to final interactive stage
      return;
    }

    const timer1 = setTimeout(() => setStep(1), 800);
    const timer2 = setTimeout(() => setStep(2), 2200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [isVisible, prefersReducedMotion]);

  const handleDismiss = () => {
    sessionStorage.setItem("roots_entrance_seen", "true");
    setIsVisible(false);
    if (onClose) onClose();
  };

  const handleAudioToggle = async () => {
    const active = await ambientSound.toggle();
    setIsPlayingAudio(active);
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-[#090807] text-[#FAF8F5] overflow-hidden select-none"
        role="dialog"
        aria-modal="true"
        aria-label="Cinematic Museum Entrance"
      >
        {/* Archival Parchment Texture & Subtle Ambient Radial Light */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#1C1612] via-[#0D0B0A] to-[#050404] opacity-95 pointer-events-none" />

        {/* Traditional Sandstone Arch Geometry (Subtle Filigree) */}
        <div className="absolute inset-4 sm:inset-10 border border-[#C59B27]/30 rounded-2xl sm:rounded-[36px] pointer-events-none flex flex-col justify-between p-4 sm:p-8">
          <div className="flex justify-between w-full">
            <span className="w-4 h-4 border-t-2 border-l-2 border-[#D4AF37]" />
            <span className="w-4 h-4 border-t-2 border-r-2 border-[#D4AF37]" />
          </div>
          <div className="flex justify-between w-full">
            <span className="w-4 h-4 border-b-2 border-l-2 border-[#D4AF37]" />
            <span className="w-4 h-4 border-b-2 border-r-2 border-[#D4AF37]" />
          </div>
        </div>

        {/* Top Controls: Sound Toggle + Skip Action */}
        <header className="absolute top-6 sm:top-10 inset-x-6 sm:inset-x-14 z-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={handleAudioToggle}
              className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-[#C59B27]/30 text-[#D4AF37] text-[10px] font-mono uppercase tracking-widest flex items-center gap-2 transition-all cursor-pointer backdrop-blur-md"
              title="Toggle Sitar & Tanpura Ambient Tone"
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
          </div>

          <button
            onClick={handleDismiss}
            className="group px-4 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-[#C59B27]/30 hover:border-[#D4AF37] text-xs font-serif text-[#E5C378] flex items-center gap-1.5 transition-all cursor-pointer backdrop-blur-md"
          >
            <span>Enter Gallery</span>
            <X className="w-3.5 h-3.5 text-[#A89886] group-hover:text-[#D4AF37] transition-colors" />
          </button>
        </header>

        {/* Central Curatorial Stage */}
        <main className="relative z-10 max-w-3xl mx-auto px-6 text-center flex flex-col items-center">
          {/* 1. Monogram Reveal */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, ease: "easeOut" }}
            className="relative mb-6"
          >
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-[#D4AF37]/80 flex items-center justify-center bg-[#14110E] shadow-[0_0_40px_rgba(197,155,39,0.25)] relative">
              <span className="font-serif text-3xl sm:text-4xl text-[#E5C378] font-bold">
                {rootGlyph}
              </span>
              <div className="absolute -inset-1 rounded-full border border-dashed border-[#C59B27]/40 animate-[spin_40s_linear_infinite]" />
            </div>
          </motion.div>

          {/* 2. Title & Inscription */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: prefersReducedMotion ? 0 : 0.3 }}
            className="space-y-3"
          >
            <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.35em] text-[#C59B27] block">
              A Living Digital Museum
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal text-[#FAF8F5] tracking-tight leading-none">
              ROOTS
            </h1>
            <p className="font-serif italic text-lg sm:text-xl text-[#D4AF37]/90 font-light tracking-wide">
              The Soul of India
            </p>
          </motion.div>

          {/* 3. The Core Curatorial Manifesto */}
          <AnimatePresence>
            {step >= 1 && (
              <motion.div
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.0, ease: "easeOut" }}
                className="mt-8 mb-8 space-y-4 max-w-xl"
              >
                <div className="w-12 h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto" />
                <p className="font-serif text-xl sm:text-2xl md:text-3xl text-[#EFE8DC] font-normal italic leading-relaxed">
                  &ldquo;Every place has a story. Every story deserves to be felt.&rdquo;
                </p>
                <p className="font-sans text-xs sm:text-sm text-[#A89886] font-light leading-relaxed">
                  Across 28 states and 8 union territories — where sacred rivers carve civilizations into granite, where hearths carry ancient flavors, and where memory finds its voice.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 4. Interactive Call to Actions */}
          <AnimatePresence>
            {step >= 2 && (
              <motion.div
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="flex flex-col sm:flex-row items-center gap-4 mt-2"
              >
                {/* Primary Action: Discover Your Roots */}
                <button
                  onClick={handleDismiss}
                  className="group relative inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#C59B27] via-[#D4AF37] to-[#C59B27] text-[#1C1814] font-sans font-semibold text-xs uppercase tracking-[0.22em] transition-all duration-300 hover:shadow-xl hover:shadow-[#C59B27]/40 hover:scale-[1.03] active:scale-[0.98] cursor-pointer"
                >
                  <Compass className="w-4 h-4 text-[#5B0E1B]" />
                  <span>Discover Your Roots</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>

                {/* Signature Experience: A Journey Back Home */}
                <Link
                  href="/journey"
                  onClick={handleDismiss}
                  className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/15 text-[#E5C378] border border-[#C59B27]/50 hover:border-[#D4AF37] font-sans font-semibold text-xs uppercase tracking-[0.2em] transition-all duration-300 hover:scale-[1.02] shadow-sm backdrop-blur-md"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>A Journey Back Home</span>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Territorial Badge Footer */}
          <footer className="mt-12 text-[10px] font-mono tracking-widest text-[#8C7E72] uppercase">
            36 Cultural Territorials &bull; 8 Living Pillars &bull; Curated with Cloudinary
          </footer>
        </main>
      </motion.div>
    </AnimatePresence>
  );
}

export default MuseumEntranceSequence;
