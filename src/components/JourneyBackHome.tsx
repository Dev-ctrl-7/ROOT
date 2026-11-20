"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ALL_INDIAN_STATES, StateData } from "@/lib/states-data";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import {
  Compass,
  Utensils,
  Sparkles,
  Heart,
  Mail,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Volume2,
  VolumeX,
  Play,
  Pause,
  MapPin,
  Clock,
  Landmark,
  Share2,
  Check,
  Award,
} from "lucide-react";
import confetti from "canvas-confetti";

const CHAPTERS = [
  { id: 1, title: "The Land", subtitle: "Architecture, Terrain & Sacred Waters", icon: Compass },
  { id: 2, title: "The Taste", subtitle: "Gastronomic Terroirs & Ancient Hearths", icon: Utensils },
  { id: 3, title: "The Celebration", subtitle: "Festivals, Sacred Rites & Folk Arts", icon: Sparkles },
  { id: 4, title: "The Memory", subtitle: "Childhood Games & Living Traditions", icon: Heart },
  { id: 5, title: "The Keepsake", subtitle: "A Personalized Postcard of Home", icon: Mail },
];

// Audio instrument mapping for cultural terroirs
const INSTRUMENT_MAP: Record<string, { name: string; file: string; description: string }> = {
  South: {
    name: "Nadaswaram & Mridangam",
    file: "/audio/instruments/nadaswaram.mp3",
    description: "Temple bell resonances and ancient rhythmic Carnatic percussion.",
  },
  North: {
    name: "Bansuri & Shehnai",
    file: "/audio/instruments/bansuri.mp3",
    description: "Soulful bamboo flute melodies echoing over Himalayan pine valleys.",
  },
  East: {
    name: "Classical Sitar",
    file: "/audio/instruments/sitar.mp3",
    description: "Intricate meditative string acoustics of the Gangetic plains.",
  },
  West: {
    name: "Saraswati Veena",
    file: "/audio/instruments/veena.mp3",
    description: "Aristocratic acoustic pluckings of Gujarat and Maharashtra courts.",
  },
  Central: {
    name: "Shehnai of the Heartlands",
    file: "/audio/instruments/shehnai.mp3",
    description: "Auspicious wedding and harvest tunes echoing across the Malwa plateau.",
  },
  "North-East": {
    name: "Himalayan Bansuri",
    file: "/audio/instruments/bansuri.mp3",
    description: "Pristine mountain wind flute carrying mist from the Brahmaputra.",
  },
};

export function JourneyBackHome() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // State selection (defaults to Tamil Nadu or URL param)
  const initialParam = searchParams.get("state") || "tamil-nadu";
  const [selectedStateId, setSelectedStateId] = useState<string>(initialParam);
  const [currentChapter, setCurrentChapter] = useState<number>(1);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const selectedState: StateData =
    ALL_INDIAN_STATES.find((s) => s.id === selectedStateId) || ALL_INDIAN_STATES[0];

  const zoneAudio = INSTRUMENT_MAP[selectedState.zone] || INSTRUMENT_MAP.South;

  // Sync state selection with URL without reloading
  const handleStateChange = (newId: string) => {
    setSelectedStateId(newId);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("state", newId);
      window.history.replaceState({}, "", url.toString());
    }
    // Stop audio on state switch
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlayingAudio(false);
    }
  };

  // Keyboard navigation: ArrowLeft / ArrowRight
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" && currentChapter < 5) {
        setCurrentChapter((prev) => prev + 1);
      } else if (e.key === "ArrowLeft" && currentChapter > 1) {
        setCurrentChapter((prev) => prev - 1);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentChapter]);

  // Audio Playback Handler
  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (isPlayingAudio) {
      audioRef.current.pause();
      setIsPlayingAudio(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlayingAudio(true))
        .catch((err) => console.log("Audio playback deferred:", err));
    }
  };

  const handleCopyShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  // Trigger celebration on completing all 5 chapters
  useEffect(() => {
    if (currentChapter === 5) {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
        colors: ["#C59B27", "#5B0E1B", "#FAF8F5", "#D4AF37"],
      });
    }
  }, [currentChapter]);

  return (
    <div className="min-h-screen bg-[#FAF8F5] dark:bg-[#0C0A09] text-[#1C1814] dark:text-[#F5EFEB] selection:bg-[#C59B27] selection:text-[#FAF8F5] transition-colors duration-300">
      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        src={zoneAudio.file}
        loop
        onEnded={() => setIsPlayingAudio(false)}
      />

      {/* 1. Curatorial Header & State Passport Bar */}
      <header className="sticky top-0 z-40 bg-[#FAF8F5]/90 dark:bg-[#0C0A09]/90 backdrop-blur-md border-b border-[#C59B27]/25 px-4 sm:px-8 py-3.5 flex flex-wrap items-center justify-between gap-3">
        {/* State Selector & Breadcrumb */}
        <div className="flex items-center gap-3 min-w-0">
          <Link
            href="/"
            className="text-xs font-serif uppercase tracking-widest text-[#8C5320] dark:text-[#D4AF37] hover:underline shrink-0"
          >
            &larr; Museum Home
          </Link>
          <span className="text-[#C59B27]/40">/</span>
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#8C7E72] dark:text-[#A89886] hidden sm:inline">
              Selected Soil:
            </span>
            <select
              value={selectedStateId}
              onChange={(e) => handleStateChange(e.target.value)}
              className="px-3 py-1 rounded-full border border-[#C59B27]/40 bg-white dark:bg-[#1A1613] text-xs font-serif font-bold text-[#5B0E1B] dark:text-[#E5C378] focus:outline-none focus:ring-1 focus:ring-[#C59B27] truncate cursor-pointer shadow-2xs"
            >
              <optgroup label="28 States of India">
                {ALL_INDIAN_STATES.filter((s) => s.category === "state").map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.nativeName}) — {s.zone} India
                  </option>
                ))}
              </optgroup>
              <optgroup label="8 Union Territories">
                {ALL_INDIAN_STATES.filter((s) => s.category === "union-territory").map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.nativeName}) — {s.zone} India
                  </option>
                ))}
              </optgroup>
            </select>
          </div>
        </div>

        {/* Audio Ambient Toggle & Share Link */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleAudio}
            className={`px-3 py-1 rounded-full border text-[11px] font-mono uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer ${
              isPlayingAudio
                ? "bg-[#5B0E1B] text-white border-[#5B0E1B]"
                : "bg-white dark:bg-[#1A1613] text-[#8C5320] dark:text-[#D4AF37] border-[#C59B27]/30 hover:border-[#C59B27]"
            }`}
            title={`Listen to ${zoneAudio.name}`}
          >
            {isPlayingAudio ? (
              <>
                <Volume2 className="w-3.5 h-3.5 animate-pulse text-[#E5C378]" />
                <span className="hidden md:inline">{zoneAudio.name}</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-[#8C7E72]" />
                <span className="hidden md:inline">Play Audio</span>
              </>
            )}
          </button>

          <button
            onClick={handleCopyShare}
            className="p-1.5 rounded-full border border-[#C59B27]/30 bg-white dark:bg-[#1A1613] text-[#5B0E1B] dark:text-[#D4AF37] hover:bg-[#FAF5EE] dark:hover:bg-[#251F1A] transition-colors"
            title="Share this cultural journey"
          >
            {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* 2. Visual Chapter Progress Strip */}
      <nav aria-label="Journey Chapters" className="border-b border-[#C59B27]/20 bg-[#FAF5EE]/70 dark:bg-[#120F0D]/70 px-4 sm:px-8 py-3">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-2 overflow-x-auto no-scrollbar">
          {CHAPTERS.map((ch) => {
            const Icon = ch.icon;
            const isActive = currentChapter === ch.id;
            const isCompleted = currentChapter > ch.id;

            return (
              <button
                key={ch.id}
                onClick={() => setCurrentChapter(ch.id)}
                className={`flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full text-xs font-serif transition-all shrink-0 cursor-pointer ${
                  isActive
                    ? "bg-[#5B0E1B] text-white shadow-md font-semibold scale-105"
                    : isCompleted
                    ? "bg-[#C59B27]/20 text-[#5B0E1B] dark:text-[#E5C378] border border-[#C59B27]/30"
                    : "text-[#8C7E72] dark:text-[#A89886] hover:bg-white/60 dark:hover:bg-[#1A1613]"
                }`}
              >
                <span
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono ${
                    isActive
                      ? "bg-white text-[#5B0E1B] font-bold"
                      : isCompleted
                      ? "bg-[#C59B27] text-white"
                      : "bg-[#C59B27]/20 text-[#1C1814] dark:text-white"
                  }`}
                >
                  {isCompleted ? "✓" : ch.id}
                </span>
                <span className="hidden sm:inline font-sans uppercase tracking-wider text-[11px]">
                  {ch.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Linear Progress Bar */}
        <div className="max-w-5xl mx-auto mt-2 h-1 bg-[#C59B27]/15 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#C59B27] to-[#5B0E1B] transition-all duration-500 rounded-full"
            style={{ width: `${(currentChapter / 5) * 100}%` }}
          />
        </div>
      </nav>

      {/* 3. Main Chapter Display Canvas */}
      <main className="max-w-5xl mx-auto px-4 sm:px-8 py-8 md:py-12">
        <AnimatePresence mode="wait">
          {/* ============================================================== */}
          {/* CHAPTER 1: THE LAND */}
          {/* ============================================================== */}
          {currentChapter === 1 && (
            <motion.section
              key="chapter-1-land"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              {/* Chapter Header */}
              <div className="text-center max-w-2xl mx-auto space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#C59B27] font-bold block">
                  Chapter 01 &bull; The Soil & The Monolith
                </span>
                <h1 className="font-serif text-3xl sm:text-5xl text-[#1C1814] dark:text-[#F5EFEB] font-normal">
                  The Land of {selectedState.name}
                </h1>
                <p className="font-serif italic text-base sm:text-lg text-[#8C5320] dark:text-[#D4AF37]">
                  {selectedState.nativeName} &bull; {selectedState.epoch}
                </p>
              </div>

              {/* Landscape Hero Showcase */}
              <div className="relative aspect-[16/10] sm:aspect-[21/10] rounded-2xl sm:rounded-3xl overflow-hidden border border-[#C59B27]/30 shadow-xl group">
                <ImageWithFallback
                  src={selectedState.places.heroImage}
                  alt={selectedState.places.heroCaption}
                  fill
                  priority
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 1000px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-8 right-4 sm:right-8 text-white space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#E5C378] block">
                    Heritage Horizon &bull; {selectedState.places.architecturalStyle}
                  </span>
                  <p className="font-serif italic text-xs sm:text-sm text-[#EFE8DC]">
                    {selectedState.places.heroCaption}
                  </p>
                </div>
              </div>

              {/* Curatorial Inscription Card */}
              <div className="p-6 rounded-2xl bg-white dark:bg-[#151210] border border-[#C59B27]/30 shadow-xs space-y-3">
                <div className="w-8 h-px bg-[#D4AF37]" />
                <p className="font-serif text-lg sm:text-xl italic text-[#423A32] dark:text-[#EFE8DC] leading-relaxed">
                  &ldquo;{selectedState.curatorQuote}&rdquo;
                </p>
                <div className="flex items-center justify-between text-xs font-mono text-[#8C5320] dark:text-[#D4AF37]">
                  <span>— {selectedState.curatorAuthor}</span>
                  <span>Capital: {selectedState.atlas.capital}</span>
                </div>
              </div>

              {/* Terroir Landmarks Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-white dark:bg-[#151210] border border-[#C59B27]/20 space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#5B0E1B] dark:text-[#E5C378] block">
                    Iconic Monument
                  </span>
                  <p className="font-serif text-sm font-semibold text-[#1C1814] dark:text-white">
                    {selectedState.places.iconicMonument}
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-white dark:bg-[#151210] border border-[#C59B27]/20 space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#5B0E1B] dark:text-[#E5C378] block">
                    Natural Wonder
                  </span>
                  <p className="font-serif text-sm font-semibold text-[#1C1814] dark:text-white">
                    {selectedState.places.naturalWonder}
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-white dark:bg-[#151210] border border-[#C59B27]/20 space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#5B0E1B] dark:text-[#E5C378] block">
                    Sacred Rivers & Waters
                  </span>
                  <p className="font-serif text-sm font-semibold text-[#1C1814] dark:text-white">
                    {selectedState.atlas.majorRivers.join(" • ")}
                  </p>
                </div>
              </div>
            </motion.section>
          )}

          {/* ============================================================== */}
          {/* CHAPTER 2: THE TASTE */}
          {/* ============================================================== */}
          {currentChapter === 2 && (
            <motion.section
              key="chapter-2-taste"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <div className="text-center max-w-2xl mx-auto space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#C59B27] font-bold block">
                  Chapter 02 &bull; The Sacred Hearth
                </span>
                <h1 className="font-serif text-3xl sm:text-5xl text-[#1C1814] dark:text-[#F5EFEB] font-normal">
                  {selectedState.taste.title}
                </h1>
                <p className="font-serif italic text-base sm:text-lg text-[#8C5320] dark:text-[#D4AF37]">
                  Ancient Gastronomic Wisdom of {selectedState.name}
                </p>
              </div>

              {/* Split Culinary Stage */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-5">
                  <div className="p-5 rounded-2xl bg-white dark:bg-[#151210] border border-[#C59B27]/25 shadow-xs space-y-2">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#5B0E1B] dark:text-[#E5C378] font-bold block">
                      The Culinary Legend
                    </span>
                    <p className="font-serif text-sm sm:text-base text-[#423A32] dark:text-[#D5C7B8] leading-relaxed">
                      {selectedState.taste.foodStory}
                    </p>
                  </div>

                  {/* Culinary Triquetra */}
                  <div className="space-y-3">
                    <div className="p-3.5 rounded-xl bg-white dark:bg-[#151210] border border-[#C59B27]/20 flex items-start gap-3">
                      <span className="w-2 h-2 rounded-full bg-[#5B0E1B] mt-1.5 shrink-0" />
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-wider text-[#8C5320] dark:text-[#D4AF37] block">
                          Signature Regional Dish
                        </span>
                        <p className="font-serif text-sm sm:text-base font-bold text-[#1C1814] dark:text-white">
                          {selectedState.taste.signatureDish}
                        </p>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-white dark:bg-[#151210] border border-[#C59B27]/20 flex items-start gap-3">
                      <span className="w-2 h-2 rounded-full bg-[#C59B27] mt-1.5 shrink-0" />
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-wider text-[#8C5320] dark:text-[#D4AF37] block">
                          Famous Traditional Sweet
                        </span>
                        <p className="font-serif text-sm sm:text-base font-bold text-[#1C1814] dark:text-white">
                          {selectedState.taste.famousSweet}
                        </p>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-white dark:bg-[#151210] border border-[#C59B27]/20 flex items-start gap-3">
                      <span className="w-2 h-2 rounded-full bg-[#7A2E16] mt-1.5 shrink-0" />
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-wider text-[#8C5320] dark:text-[#D4AF37] block">
                          Quintessential Breakfast
                        </span>
                        <p className="font-serif text-sm sm:text-base font-bold text-[#1C1814] dark:text-white">
                          {selectedState.taste.traditionalBreakfast}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Kitchen Ingredients Tags */}
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#8C5320] dark:text-[#D4AF37] block mb-2">
                      Iconic Kitchen Ingredients:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {selectedState.taste.iconicIngredients.map((ing: string, idx: number) => (
                        <span
                          key={idx}
                          className="px-3 py-1 rounded-full text-xs font-mono bg-white dark:bg-[#1A1613] border border-[#C59B27]/30 text-[#1C1814] dark:text-[#EFE8DC]"
                        >
                          {ing}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Verified Regional Dish Photograph */}
                <div className="lg:col-span-5">
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-[#C59B27]/30 shadow-2xl group">
                    <ImageWithFallback
                      src={selectedState.taste.heroImage}
                      alt={selectedState.taste.heroCaption}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 1024px) 100vw, 450px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
                    <div className="absolute bottom-4 left-4 right-4 text-xs font-serif italic text-white">
                      {selectedState.taste.heroCaption}
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>
          )}

          {/* ============================================================== */}
          {/* CHAPTER 3: THE CELEBRATION */}
          {/* ============================================================== */}
          {currentChapter === 3 && (
            <motion.section
              key="chapter-3-celebration"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <div className="text-center max-w-2xl mx-auto space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#C59B27] font-bold block">
                  Chapter 03 &bull; The Spirit of Celebration
                </span>
                <h1 className="font-serif text-3xl sm:text-5xl text-[#1C1814] dark:text-[#F5EFEB] font-normal">
                  {selectedState.celebration.majorFestival}
                </h1>
                <p className="font-serif italic text-base sm:text-lg text-[#8C5320] dark:text-[#D4AF37]">
                  Sacred Rituals & Community Ecstasy
                </p>
              </div>

              {/* Festival Showcase Photo */}
              <div className="relative aspect-[16/10] sm:aspect-[21/10] rounded-2xl sm:rounded-3xl overflow-hidden border border-[#C59B27]/30 shadow-xl group">
                <ImageWithFallback
                  src={selectedState.celebration.heroImage}
                  alt={selectedState.celebration.heroCaption}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 1000px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-8 right-4 sm:right-8 text-white space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#E5C378] block">
                    Festive Inscription &bull; {selectedState.name}
                  </span>
                  <p className="font-serif italic text-xs sm:text-sm text-[#EFE8DC]">
                    {selectedState.celebration.heroCaption}
                  </p>
                </div>
              </div>

              {/* Festival Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 rounded-2xl bg-white dark:bg-[#151210] border border-[#C59B27]/25 space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#5B0E1B] dark:text-[#E5C378] font-bold block">
                    Sacred Celebration Ritual
                  </span>
                  <p className="font-serif text-sm sm:text-base text-[#423A32] dark:text-[#D5C7B8] leading-relaxed">
                    {selectedState.celebration.celebrationRitual}
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white dark:bg-[#151210] border border-[#C59B27]/25 space-y-3">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#8C5320] dark:text-[#D4AF37] block">
                      Classical / Folk Dance Form
                    </span>
                    <p className="font-serif text-sm sm:text-base font-bold text-[#1C1814] dark:text-white">
                      {selectedState.celebration.danceForm}
                    </p>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#8C5320] dark:text-[#D4AF37] block">
                      Folk Music & Traditional Instruments
                    </span>
                    <p className="font-serif text-sm sm:text-base font-bold text-[#1C1814] dark:text-white">
                      {selectedState.celebration.folkMusic}
                    </p>
                  </div>
                </div>
              </div>
            </motion.section>
          )}

          {/* ============================================================== */}
          {/* CHAPTER 4: THE MEMORY */}
          {/* ============================================================== */}
          {currentChapter === 4 && (
            <motion.section
              key="chapter-4-memory"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <div className="text-center max-w-2xl mx-auto space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#C59B27] font-bold block">
                  Chapter 04 &bull; Games, Crafts & Whispers of Childhood
                </span>
                <h1 className="font-serif text-3xl sm:text-5xl text-[#1C1814] dark:text-[#F5EFEB] font-normal">
                  Memories of {selectedState.name}
                </h1>
                <p className="font-serif italic text-base sm:text-lg text-[#8C5320] dark:text-[#D4AF37]">
                  Childhood Games & Ancient Craftsmanship
                </p>
              </div>

              {/* Childhood Game Feature Box */}
              <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-white to-[#FAF5EE] dark:from-[#151210] dark:to-[#1A1613] border border-[#C59B27]/30 shadow-md space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#5B0E1B] dark:text-[#E5C378] font-bold block">
                      Traditional Childhood Game
                    </span>
                    <h2 className="font-serif text-2xl sm:text-3xl text-[#1C1814] dark:text-white">
                      {selectedState.games.name} &bull;{" "}
                      <span className="font-serif text-lg text-[#8C5320] dark:text-[#D4AF37]">
                        {selectedState.games.localName}
                      </span>
                    </h2>
                  </div>
                  <span className="px-3 py-1 rounded-full text-[10px] font-mono uppercase bg-[#C59B27]/20 text-[#5B0E1B] dark:text-[#E5C378] border border-[#C59B27]/30">
                    {selectedState.games.category}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-white/80 dark:bg-black/30 border border-[#C59B27]/20 space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#8C5320] dark:text-[#D4AF37] block">
                      How We Played
                    </span>
                    <p className="font-serif text-xs sm:text-sm text-[#423A32] dark:text-[#D5C7B8] leading-relaxed">
                      {selectedState.games.instructions}
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/80 dark:bg-black/30 border border-[#C59B27]/20 space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#8C5320] dark:text-[#D4AF37] block">
                      Cultural Significance
                    </span>
                    <p className="font-serif text-xs sm:text-sm text-[#423A32] dark:text-[#D5C7B8] leading-relaxed">
                      {selectedState.games.culturalSignificance}
                    </p>
                  </div>
                </div>
              </div>

              {/* Handloom & Oral Legend Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 rounded-2xl bg-white dark:bg-[#151210] border border-[#C59B27]/25 space-y-3">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#5B0E1B] dark:text-[#E5C378] font-bold block">
                    Heirloom Textile & Attire
                  </span>
                  <p className="font-serif text-base font-bold text-[#1C1814] dark:text-white">
                    {selectedState.textiles.signatureWeave}
                  </p>
                  <p className="font-serif text-xs text-[#6E6255] dark:text-[#A89886] leading-relaxed">
                    {selectedState.textiles.craftTechnique}
                  </p>
                  <p className="font-mono text-[11px] text-[#8C5320] dark:text-[#D4AF37]">
                    Traditional Attire: {selectedState.textiles.traditionalAttire}
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white dark:bg-[#151210] border border-[#C59B27]/25 space-y-3">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#5B0E1B] dark:text-[#E5C378] font-bold block">
                    Oral Legend & Living Heritage
                  </span>
                  <p className="font-serif text-sm italic text-[#423A32] dark:text-[#D5C7B8] leading-relaxed">
                    &ldquo;{selectedState.livingHeritage.oralLegend}&rdquo;
                  </p>
                  <div className="pt-1 text-[11px] font-mono text-[#8C5320] dark:text-[#D4AF37] flex justify-between">
                    <span>Craft: {selectedState.livingHeritage.traditionalCraft}</span>
                    <span>Lang: {selectedState.livingHeritage.regionalLanguage}</span>
                  </div>
                </div>
              </div>
            </motion.section>
          )}

          {/* ============================================================== */}
          {/* CHAPTER 5: THE KEEPSAKE */}
          {/* ============================================================== */}
          {currentChapter === 5 && (
            <motion.section
              key="chapter-5-keepsake"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <div className="text-center max-w-2xl mx-auto space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#C59B27] font-bold block">
                  Chapter 05 &bull; The Keepsake
                </span>
                <h1 className="font-serif text-3xl sm:text-5xl text-[#1C1814] dark:text-[#F5EFEB] font-normal">
                  Carry Home a Fragment of {selectedState.name}
                </h1>
                <p className="font-serif italic text-base sm:text-lg text-[#8C5320] dark:text-[#D4AF37]">
                  Preserve your roots with a personalized Cloudinary-powered keepsake
                </p>
              </div>

              {/* Culmination Keepsake Card */}
              <div className="p-6 sm:p-10 rounded-3xl bg-white dark:bg-[#151210] border-2 border-[#C59B27]/40 shadow-2xl text-center space-y-6 max-w-2xl mx-auto">
                <div className="w-16 h-16 rounded-full border-2 border-[#D4AF37] flex items-center justify-center bg-[#FAF5EE] dark:bg-[#1A1613] mx-auto shadow-md">
                  <Mail className="w-7 h-7 text-[#5B0E1B] dark:text-[#D4AF37]" />
                </div>

                <div className="space-y-2">
                  <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#1C1814] dark:text-white">
                    Postcard From {selectedState.name.toUpperCase()}
                  </h2>
                  <p className="font-serif italic text-sm text-[#8C5320] dark:text-[#D4AF37]">
                    Dispatched from {selectedState.atlas.capital} &bull; {selectedState.zone} India
                  </p>
                  <p className="font-sans text-xs sm:text-sm text-[#6E6255] dark:text-[#A89886] max-w-md mx-auto leading-relaxed font-light">
                    Your passage through the soil, flavors, and rituals of {selectedState.name} is now complete. Enter the Postcard Atelier to write your reflection, affix your state postal stamp, and download your Cloudinary edge keepsake.
                  </p>
                </div>

                {/* State Kept Image Preview */}
                <div className="relative aspect-[16/10] rounded-xl overflow-hidden border border-[#C59B27]/30 shadow-md max-w-md mx-auto">
                  <ImageWithFallback
                    src={selectedState.places.heroImage}
                    alt={selectedState.name}
                    fill
                    className="object-cover"
                    sizes="450px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4 text-left text-white">
                    <span className="text-[9px] font-mono uppercase tracking-widest text-[#E5C378] block">
                      POSTCARD FROM INDIA &bull; {selectedState.name.toUpperCase()}
                    </span>
                    <span className="text-xs font-serif italic text-white/90">
                      {selectedState.places.iconicMonument}
                    </span>
                  </div>
                </div>

                {/* Direct Action Into Postcard Studio */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Link
                    href={`/postcard?state=${selectedState.id}`}
                    className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-[#C59B27] via-[#D4AF37] to-[#C59B27] text-[#1C1814] font-sans font-semibold text-xs uppercase tracking-[0.2em] transition-all hover:scale-105 hover:shadow-xl hover:shadow-[#C59B27]/40 shadow-sm"
                  >
                    Open Postcard Atelier for {selectedState.name} &rarr;
                  </Link>

                  <button
                    onClick={() => setCurrentChapter(1)}
                    className="w-full sm:w-auto px-6 py-3.5 rounded-full border border-[#C59B27]/30 text-xs font-serif text-[#5B0E1B] dark:text-[#E5C378] hover:bg-[#FAF5EE] dark:hover:bg-[#1A1613] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Begin Journey Again</span>
                  </button>
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* 4. Bottom Chapter Controls (Previous & Next) */}
        <footer className="mt-12 pt-6 border-t border-[#C59B27]/20 flex items-center justify-between">
          <button
            onClick={() => setCurrentChapter((prev) => Math.max(1, prev - 1))}
            disabled={currentChapter === 1}
            className="px-5 py-2 rounded-full border border-[#C59B27]/30 text-xs font-serif text-[#5B0E1B] dark:text-[#E5C378] hover:bg-[#FAF5EE] dark:hover:bg-[#1A1613] disabled:opacity-30 disabled:pointer-events-none flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous Chapter</span>
          </button>

          <span className="text-[11px] font-mono text-[#8C7E72] dark:text-[#A89886] uppercase tracking-widest hidden sm:inline">
            Chapter {currentChapter} of 5 &bull; {CHAPTERS[currentChapter - 1].title}
          </span>

          <button
            onClick={() => setCurrentChapter((prev) => Math.min(5, prev + 1))}
            disabled={currentChapter === 5}
            className="px-6 py-2 rounded-full bg-[#5B0E1B] hover:bg-[#7A1D26] text-white text-xs font-serif disabled:opacity-30 disabled:pointer-events-none flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
          >
            <span>Next Chapter</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </footer>
      </main>
    </div>
  );
}

export default JourneyBackHome;
