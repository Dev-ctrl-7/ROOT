"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Compass,
  Sparkles,
  MapPin,
  Clock,
  Volume2,
  Layers,
  Flame,
  Feather,
  Quote,
  Send,
  SlidersHorizontal,
  Flower2,
  Bell,
  Coffee,
} from "lucide-react";
import Image from "next/image";
import { REGIONS, CULTURAL_HORIZON } from "@/lib/cultural-data";
import { RegionChapter } from "@/lib/types";
import { buildCloudinaryUrl } from "@/lib/cloudinary";
import { ambientSound } from "@/lib/ambient-audio";

interface ChapterViewerProps {
  onSelectPostcardRegion: (regionId: string) => void;
}

export function ChapterViewer({ onSelectPostcardRegion }: ChapterViewerProps) {
  const [activeRegionId, setActiveRegionId] = useState<string>("madurai");
  const [activePillar, setActivePillar] = useState<"architecture" | "culinary" | "craft">("architecture");
  const [cropGravity, setCropGravity] = useState<string>("auto");

  const activeRegion: RegionChapter =
    REGIONS.find((r) => r.id === activeRegionId) || REGIONS[0];

  const pillarData = activeRegion[activePillar];
  const dynamicImageUrl = buildCloudinaryUrl({
    sourceUrl: pillarData.imageFallback,
    width: 1400,
    height: 950,
    crop: "fill",
    gravity: cropGravity === "auto" ? pillarData.cloudinaryCropGravity || "auto" : cropGravity,
    format: "auto",
    quality: "auto",
  });

  const handlePlayBell = () => {
    ambientSound.playTempleBell();
  };

  return (
    <section id="chapters" className="py-28 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto">
      {/* Editorial Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-20">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#bfa052]/30 bg-[#12100e] text-[#e4c987] text-[10px] uppercase tracking-[0.25em] mb-5">
          <Compass className="w-3.5 h-3.5" />
          The Cultural Chapters
        </div>
        <h2 className="font-serif text-4xl sm:text-6xl text-[#f7f4ee] font-light tracking-tight mb-5">
          Four Living Sanctuaries
        </h2>
        <p className="text-xs sm:text-sm text-[#e7ddcc]/70 font-light max-w-xl mx-auto leading-relaxed">
          Four distinct civilizations within Tamil Nadu, where stone masonry, spice routes,
          and pit-loom weaving have preserved their heartbeat across centuries.
        </p>
      </div>

      {/* Exhibition Room Switcher (Desktop and Mobile Optimized) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-16">
        {REGIONS.map((region, idx) => {
          const isSelected = region.id === activeRegionId;
          const indexStr = `0${idx + 1}`;
          return (
            <button
              key={region.id}
              onClick={() => {
                setActiveRegionId(region.id);
                setCropGravity("auto");
              }}
              className={`p-4 sm:p-5 rounded-xl text-left transition-all duration-400 border flex flex-col justify-between group relative overflow-hidden ${
                isSelected
                  ? "bg-[#141210] border-[#bfa052] shadow-xl shadow-[#090807]"
                  : "bg-[#0f0d0b] border-[#1c1916] hover:border-[#bfa052]/40 hover:bg-[#12100e]"
              }`}
            >
              {/* Subtle active indicator bar */}
              {isSelected && (
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#bfa052] via-[#e4c987] to-[#e06d1b]" />
              )}

              <div className="flex items-center justify-between w-full mb-3">
                <span className="font-mono text-[11px] text-[#9e8038]">
                  {indexStr}
                </span>
                <span className="font-serif text-sm font-bold text-[#e4c987]/70">
                  {region.tamilName}
                </span>
              </div>

              <div>
                <span className="font-serif text-lg sm:text-xl text-[#f7f4ee] block font-normal group-hover:text-[#e4c987] transition-colors">
                  {region.name}
                </span>
                <span className="text-[10px] text-[#e7ddcc]/55 uppercase tracking-wider block mt-0.5 truncate">
                  {region.location.split(",")[0]}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Region Master Stage */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeRegion.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.45 }}
          className="space-y-16"
        >
          {/* Region Overview Banner */}
          <div className="relative rounded-2xl overflow-hidden border border-[#1c1916] bg-[#0f0d0b] p-6 sm:p-10 lg:p-12 shadow-2xl">
            {/* Giant Background Watermark */}
            <div className="absolute top-2 right-4 opacity-5 font-serif text-8xl sm:text-9xl select-none pointer-events-none text-[#e4c987]">
              {activeRegion.tamilName}
            </div>

            <div className="relative z-10 max-w-3xl space-y-4">
              <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-[#e4c987]">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#e06d1b]" />
                  {activeRegion.location}
                </span>
                <span className="text-[#1c1916]">&bull;</span>
                <span className="flex items-center gap-1.5 text-[#e7ddcc]/70">
                  <Clock className="w-3.5 h-3.5 text-[#9e8038]" />
                  {activeRegion.epoch}
                </span>
                <span className="text-[#1c1916]">&bull;</span>
                <span className="text-[#9e8038]">{activeRegion.geoCoordinates}</span>
              </div>

              <h3 className="font-serif text-4xl sm:text-5xl text-[#f7f4ee] font-normal leading-tight">
                {activeRegion.name}
              </h3>

              <p className="font-serif italic text-lg sm:text-xl text-[#e4c987] font-normal">
                &ldquo;{activeRegion.tagline}&rdquo;
              </p>

              <p className="font-sans text-xs sm:text-sm text-[#e7ddcc]/80 font-light leading-relaxed pt-1">
                {activeRegion.overview}
              </p>

              {/* Classical Poetry Inscription */}
              <div className="mt-4 border-l-2 border-[#bfa052] pl-4 py-1.5 italic font-serif text-xs sm:text-sm text-[#e7ddcc]/90 bg-[#141210]/60 rounded-r-lg pr-4">
                <Quote className="w-4 h-4 text-[#bfa052] inline mr-2 opacity-80" />
                {activeRegion.heroQuote}
                <span className="block mt-1 text-[11px] text-[#e4c987] not-italic font-sans font-medium">
                  — {activeRegion.quoteAuthor}
                </span>
              </div>
            </div>
          </div>

          {/* SENSORY MATRIX (Tactile Storytelling Matrix) */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h4 className="font-serif text-xl sm:text-2xl text-[#f7f4ee] flex items-center gap-2 font-normal">
                <Sparkles className="w-4 h-4 text-[#e4c987]" />
                The Sensory Matrix
              </h4>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#9e8038] font-mono">
                Authentic Perceptions
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Scent */}
              <div className="p-6 rounded-xl border border-[#1c1916] bg-[#0f0d0b] hover:border-[#bfa052]/40 transition-all duration-300">
                <Flower2 className="w-6 h-6 text-[#bfa052] mb-3" />
                <span className="text-[9px] uppercase tracking-[0.25em] text-[#e06d1b] font-mono font-bold block mb-1">
                  Scent Profile
                </span>
                <h5 className="font-serif text-base text-[#f7f4ee] font-medium mb-2">
                  {activeRegion.sensory.scent.title}
                </h5>
                <p className="text-xs text-[#e7ddcc]/70 leading-relaxed font-light">
                  {activeRegion.sensory.scent.description}
                </p>
              </div>

              {/* Sound */}
              <div className="p-6 rounded-xl border border-[#1c1916] bg-[#0f0d0b] hover:border-[#bfa052]/40 transition-all duration-300">
                <Bell className="w-6 h-6 text-[#bfa052] mb-3" />
                <span className="text-[9px] uppercase tracking-[0.25em] text-[#e06d1b] font-mono font-bold block mb-1">
                  Acoustic Memory
                </span>
                <h5 className="font-serif text-base text-[#f7f4ee] font-medium mb-2">
                  {activeRegion.sensory.sound.title}
                </h5>
                <p className="text-xs text-[#e7ddcc]/70 leading-relaxed font-light">
                  {activeRegion.sensory.sound.description}
                </p>
              </div>

              {/* Taste */}
              <div className="p-6 rounded-xl border border-[#1c1916] bg-[#0f0d0b] hover:border-[#bfa052]/40 transition-all duration-300">
                <Coffee className="w-6 h-6 text-[#bfa052] mb-3" />
                <span className="text-[9px] uppercase tracking-[0.25em] text-[#e06d1b] font-mono font-bold block mb-1">
                  Flavors of Home
                </span>
                <h5 className="font-serif text-base text-[#f7f4ee] font-medium mb-2">
                  {activeRegion.sensory.taste.title}
                </h5>
                <p className="text-xs text-[#e7ddcc]/70 leading-relaxed font-light">
                  {activeRegion.sensory.taste.description}
                </p>
              </div>

              {/* Touch */}
              <div className="p-6 rounded-xl border border-[#1c1916] bg-[#0f0d0b] hover:border-[#bfa052]/40 transition-all duration-300">
                <Sparkles className="w-5 h-5 text-[#bfa052] mb-3" />
                <span className="text-[9px] uppercase tracking-[0.25em] text-[#e06d1b] font-mono font-bold block mb-1">
                  Tactile Material
                </span>
                <h5 className="font-serif text-base text-[#f7f4ee] font-medium mb-2">
                  {activeRegion.sensory.touch.title}
                </h5>
                <p className="text-xs text-[#e7ddcc]/70 leading-relaxed font-light">
                  {activeRegion.sensory.touch.description}
                </p>
              </div>
            </div>
          </div>

          {/* DEEP CULTURAL PILLARS: Architecture, Culinary, Craft */}
          <div className="rounded-2xl border border-[#1c1916] bg-[#0f0d0b] p-6 sm:p-8 lg:p-10 shadow-2xl">
            {/* Pillar Selector & Cloudinary Gravity Control */}
            <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#1c1916] pb-6 mb-8 gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setActivePillar("architecture")}
                  className={`px-4 py-2 rounded-lg text-xs uppercase tracking-wider font-medium transition-all flex items-center gap-2 ${
                    activePillar === "architecture"
                      ? "bg-[#1c1916] text-[#e4c987] border border-[#bfa052]/50 shadow-md"
                      : "text-[#e7ddcc]/65 hover:text-[#f7f4ee]"
                  }`}
                >
                  <Layers className="w-3.5 h-3.5 text-[#bfa052]" />
                  Architecture
                </button>
                <button
                  onClick={() => setActivePillar("culinary")}
                  className={`px-4 py-2 rounded-lg text-xs uppercase tracking-wider font-medium transition-all flex items-center gap-2 ${
                    activePillar === "culinary"
                      ? "bg-[#1c1916] text-[#e4c987] border border-[#bfa052]/50 shadow-md"
                      : "text-[#e7ddcc]/65 hover:text-[#f7f4ee]"
                  }`}
                >
                  <Flame className="w-3.5 h-3.5 text-[#e06d1b]" />
                  Culinary Alchemy
                </button>
                <button
                  onClick={() => setActivePillar("craft")}
                  className={`px-4 py-2 rounded-lg text-xs uppercase tracking-wider font-medium transition-all flex items-center gap-2 ${
                    activePillar === "craft"
                      ? "bg-[#1c1916] text-[#e4c987] border border-[#bfa052]/50 shadow-md"
                      : "text-[#e7ddcc]/65 hover:text-[#f7f4ee]"
                  }`}
                >
                  <Feather className="w-3.5 h-3.5 text-[#bfa052]" />
                  Living Craft
                </button>
              </div>

              {/* Interactive Cloudinary Crop Gravity Switcher */}
              <div className="flex items-center gap-2 text-xs text-[#e7ddcc]/70 bg-[#141210] px-3.5 py-1.5 rounded-lg border border-[#1c1916]">
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#9e8038]" />
                <span className="text-[#9e8038] font-mono text-[11px]">Cloudinary Gravity:</span>
                <select
                  value={cropGravity}
                  onChange={(e) => setCropGravity(e.target.value)}
                  className="bg-transparent text-[#e4c987] font-mono text-xs focus:outline-none cursor-pointer"
                  title="Test Cloudinary Content-Aware Gravity"
                >
                  <option value="auto" className="bg-[#141210]">g_auto (AI Saliency)</option>
                  <option value="north" className="bg-[#141210]">g_north (Gopuram / Spire)</option>
                  <option value="center" className="bg-[#141210]">g_center (Symmetric)</option>
                  <option value="faces" className="bg-[#141210]">g_faces (Artisan / Portrait)</option>
                </select>
              </div>
            </div>

            {/* Split Pillar Exhibition */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-5 space-y-4">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#e06d1b] font-mono font-bold">
                  {pillarData.subtitle}
                </span>
                <h4 className="font-serif text-2xl sm:text-3xl text-[#f7f4ee] font-normal leading-snug">
                  {pillarData.title}
                </h4>
                <p className="text-xs sm:text-sm text-[#e7ddcc]/75 leading-relaxed font-light">
                  {pillarData.description}
                </p>

                {/* Tactile Highlight Box */}
                <div className="p-4 rounded-xl bg-[#141210] border border-[#bfa052]/20 text-xs text-[#e7ddcc]/90">
                  <span className="text-[#e4c987] font-medium block mb-1">
                    Tactile Artifact Detail:
                  </span>
                  {pillarData.tactileDetail}
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => onSelectPostcardRegion(activeRegion.id)}
                    className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#e4c987] hover:text-[#f7f4ee] font-medium transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" />
                    Turn {activeRegion.name} into a Postcard &rarr;
                  </button>
                </div>
              </div>

              {/* Transformed Photography Frame */}
              <div className="lg:col-span-7">
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-[#1c1916] group shadow-2xl">
                  <Image
                    src={dynamicImageUrl}
                    alt={pillarData.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 55vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090807]/90 via-transparent to-transparent opacity-80" />

                  {/* Cloudinary Live Transformation Badge */}
                  <div className="absolute top-3 left-3 bg-[#090807]/85 backdrop-blur-md px-3 py-1 rounded text-[10px] font-mono text-[#e4c987] border border-[#bfa052]/30">
                    Cloudinary: c_fill, g_{cropGravity === "auto" ? pillarData.cloudinaryCropGravity || "auto" : cropGravity}, f_auto, q_auto
                  </div>

                  {/* Caption */}
                  <div className="absolute bottom-3 left-4 right-4 text-xs text-[#e7ddcc]/90 italic font-serif">
                    {pillarData.caption}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* LIVING ORAL MEMORY RECORDING */}
          <div className="p-6 sm:p-8 rounded-2xl border border-[#bfa052]/25 bg-gradient-to-br from-[#141210] via-[#0f0d0b] to-[#090807] relative overflow-hidden shadow-xl">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4">
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#e06d1b] font-mono font-bold">
                  Oral Custodian Archive &bull; Recorded {activeRegion.livingMemory.recordedYear}
                </span>
                <h4 className="font-serif text-xl sm:text-2xl text-[#f7f4ee] font-normal mt-0.5">
                  {activeRegion.livingMemory.title}
                </h4>
                <p className="text-xs text-[#9e8038] font-sans">
                  Narrated by {activeRegion.livingMemory.storyteller}
                </p>
              </div>

              <button
                onClick={handlePlayBell}
                className="px-4 py-2 rounded-full border border-[#bfa052]/35 bg-[#090807]/60 hover:bg-[#bfa052]/20 text-xs text-[#e4c987] flex items-center gap-2 transition-colors"
                title="Ring Memorial Bronze Bell"
              >
                <Volume2 className="w-3.5 h-3.5 text-[#e4c987]" />
                <span>Resonate Bell</span>
              </button>
            </div>

            <p className="text-xs sm:text-sm text-[#e7ddcc]/85 font-serif italic leading-relaxed border-l-2 border-[#e4c987] pl-4">
              &ldquo;{activeRegion.livingMemory.narrative}&rdquo;
            </p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* CULTURAL EXPANSION HORIZON (Scalable Architecture) */}
      <div className="mt-24 pt-12 border-t border-[#1c1916]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-2">
          <div>
            <h4 className="font-serif text-xl sm:text-2xl text-[#f7f4ee] font-normal">
              Cultural Expansion Horizon
            </h4>
            <p className="text-xs text-[#e7ddcc]/60">
              The ROOTS architecture dynamically scales across the Indian subcontinent.
            </p>
          </div>
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#9e8038] font-mono">
            Upcoming Exhibitions
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {CULTURAL_HORIZON.map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-xl border border-[#1c1916] bg-[#0f0d0b]/70 hover:border-[#bfa052]/30 transition-all"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] uppercase tracking-wider text-[#e06d1b] font-mono font-semibold">
                  {item.region}
                </span>
                <span className="text-[9px] uppercase px-2 py-0.5 rounded bg-[#1c1916] text-[#e7ddcc]/70 font-mono">
                  {item.status}
                </span>
              </div>
              <h5 className="font-serif text-base text-[#f7f4ee] mb-1 font-normal">{item.name}</h5>
              <p className="text-xs text-[#e7ddcc]/60 leading-relaxed font-light">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
