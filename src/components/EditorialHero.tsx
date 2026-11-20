"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Compass } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { buildCloudinaryUrl } from "@/lib/cloudinary";
import { useLanguage } from "@/lib/i18n/context";

interface EditorialHeroProps {
  onReplayEntrance?: () => void;
}

export function EditorialHero({ onReplayEntrance }: EditorialHeroProps = {}) {
  const { t, rootGlyph } = useLanguage();

  const tajMahalHeroUrl = buildCloudinaryUrl({
    sourceUrl: "https://images.unsplash.com/photo-1564507592333-c60657eea523?q=85&w=2000&auto=format&fit=crop",
    width: 2000,
    height: 1200,
    crop: "fill",
    gravity: "auto",
    format: "auto",
    quality: "auto",
  });

  return (
    <section
      id="prologue"
      className="relative min-h-[92vh] w-full flex flex-col justify-between overflow-hidden bg-[#FAF8F5] dark:bg-[#0C0A09] px-4 sm:px-8 lg:px-12 pt-16 lg:pt-10 pb-10 transition-colors duration-300"
    >
      {/* Editorial Jharokha Arch Backdrop Frame */}
      <div className="absolute inset-x-8 top-20 bottom-8 border border-[#C59B27]/30 dark:border-[#C59B27]/40 rounded-t-[140px] pointer-events-none select-none hidden md:block z-0" />

      {/* Atmospheric Cultural Photography Frame (Inspired by Moodboard #5: Sandstone arch & Taj Mahal) */}
      <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
        <Image
          src={tajMahalHeroUrl}
          alt="Taj Mahal framed through ancient sandstone jharokha archway"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center filter sepia-[0.35] contrast-[1.08]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FAF8F5] via-[#FAF8F5]/75 to-transparent dark:from-[#0C0A09] dark:via-[#0C0A09]/80 dark:to-transparent" />
      </div>

      {/* Editorial Decorative Canvas Borders */}
      <div className="absolute inset-4 sm:inset-8 border border-[#C59B27]/25 dark:border-[#C59B27]/35 pointer-events-none z-0 rounded-2xl sm:rounded-3xl">
        <div className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-[#FAF8F5] dark:bg-[#0C0A09] border border-[#C59B27]" />
        <div className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-[#FAF8F5] dark:bg-[#0C0A09] border border-[#C59B27]" />
        <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-[#FAF8F5] dark:bg-[#0C0A09] border border-[#C59B27]" />
        <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-[#FAF8F5] dark:bg-[#0C0A09] border border-[#C59B27]" />
      </div>

      {/* Top Header Eyebrow */}
      <div className="relative z-10 max-w-7xl mx-auto w-full pt-4 flex items-center justify-between text-xs font-mono tracking-widest uppercase text-[#8C5320] dark:text-[#E5C378]">
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#C59B27] animate-pulse"></span>
          {t.hero.badge}
        </span>
        <div className="flex items-center gap-3">
          {onReplayEntrance && (
            <button
              onClick={onReplayEntrance}
              className="text-[10px] font-mono tracking-widest uppercase text-[#8C5320] dark:text-[#D4AF37] hover:underline flex items-center gap-1 cursor-pointer"
              title="Re-open 30-Second Cinematic Museum Entrance"
            >
              <Sparkles className="w-3 h-3 text-[#C59B27]" />
              <span>Cinematic Entrance</span>
            </button>
          )}
          <span className="hidden sm:inline text-[#6E6255] dark:text-[#A89886]">
            A Digital Living Exhibition &bull; 2026
          </span>
        </div>
      </div>

      {/* Master Editorial Stage */}
      <div className="relative z-10 max-w-5xl mx-auto w-full text-center flex flex-col items-center justify-center my-auto py-8">
        {/* Dynamic Monogram Inscription */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="w-14 h-14 rounded-full border-2 border-[#C59B27] flex items-center justify-center bg-[#FAF5EE] dark:bg-[#1A1613] shadow-md mb-6"
        >
          <span className="font-serif text-2xl font-bold text-[#5B0E1B] dark:text-[#D4AF37]">
            {rootGlyph}
          </span>
        </motion.div>

        {/* Master Exhibition Typography */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="font-serif text-6xl sm:text-8xl lg:text-9xl tracking-tight text-[#1C1814] dark:text-[#F5EFEB] font-normal leading-[0.95] mb-4 select-none"
        >
          {t.siteTitle}
          <span className="block text-2xl sm:text-4xl lg:text-5xl italic font-serif text-[#8C5320] dark:text-[#D4AF37] font-normal tracking-normal mt-2">
            {t.tagline}
          </span>
        </motion.h1>

        {/* Concise Emotional Statement */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="font-serif italic text-lg sm:text-2xl text-[#423A32] dark:text-[#D9CEBF] max-w-2xl mx-auto mb-4 leading-relaxed"
        >
          &ldquo;{t.subTagline}&rdquo;
        </motion.p>

        {/* Narrative Description */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.55 }}
          className="font-sans text-xs sm:text-sm text-[#6E6255] dark:text-[#A89886] max-w-xl mx-auto mb-8 leading-relaxed font-light"
        >
          {t.hero.subtitle}
        </motion.p>

        {/* Action Buttons: Explore Atlas & Unseal Letter */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-col sm:flex-row items-center gap-3.5 flex-wrap justify-center"
        >
          <Link
            href="/journey"
            className="group relative inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#C59B27] via-[#D4AF37] to-[#C59B27] text-[#1C1814] font-sans font-semibold text-xs uppercase tracking-[0.22em] transition-all duration-300 hover:shadow-xl hover:shadow-[#C59B27]/40 hover:scale-[1.03] active:scale-[0.98]"
          >
            <Sparkles className="w-4 h-4 text-[#5B0E1B]" />
            <span>A Journey Back Home</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>

          <Link
            href="/atlas"
            className="group relative inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-white dark:bg-[#1A1613] hover:bg-[#FAF5EE] dark:hover:bg-[#251F1A] text-[#1C1814] dark:text-[#F5EFEB] border border-[#C59B27]/40 font-sans font-semibold text-xs uppercase tracking-[0.2em] transition-all duration-300 hover:border-[#5B0E1B] shadow-xs hover:scale-[1.02]"
          >
            <Compass className="w-3.5 h-3.5 text-[#5B0E1B] dark:text-[#E5C378]" />
            <span>{t.hero.primaryCta}</span>
          </Link>

          <Link
            href="/letter"
            className="group relative inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white dark:bg-[#1A1613] hover:bg-[#FAF5EE] dark:hover:bg-[#251F1A] text-[#5B0E1B] dark:text-[#E5C378] border border-[#C59B27]/30 font-sans font-semibold text-xs uppercase tracking-[0.18em] transition-all duration-300 hover:border-[#C59B27] shadow-xs hover:scale-[1.02]"
          >
            <span>{t.hero.secondaryCta}</span>
          </Link>
        </motion.div>

        <span className="text-[10px] text-[#8C5320] dark:text-[#C59B27] font-mono tracking-widest uppercase mt-4">
          {t.hero.statesCounter}
        </span>
      </div>
    </section>
  );
}

export default EditorialHero;
