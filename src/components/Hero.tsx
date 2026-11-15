"use client";

import { motion } from "framer-motion";
import { ArrowDown, Sparkles } from "lucide-react";
import Image from "next/image";
import { buildCloudinaryUrl } from "@/lib/cloudinary";

export function Hero() {
  const heroImageUrl = buildCloudinaryUrl({
    sourceUrl: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=85&w=2000&auto=format&fit=crop",
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
      className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-[#090807] film-grain px-4 sm:px-8 lg:px-12"
    >
      {/* Cinematic Full-Bleed Imagery with Architectural Vignette */}
      <div className="absolute inset-0 z-0">
        <motion.div
          initial={{ scale: 1.08, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.38 }}
          transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full h-full"
        >
          <Image
            src={heroImageUrl}
            alt="Towering Gopuram of Madurai Meenakshi Temple in the twilight mist"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center filter saturate-[0.85] contrast-[1.08]"
          />
        </motion.div>

        {/* Multi-layered Cinema Scrims */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#090807] via-[#090807]/60 to-black/30" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#090807]/40 to-[#090807]" />
      </div>

      {/* Cloudinary Live Transformation Badge (Top Right) */}
      <div className="relative z-10 pt-24 sm:pt-28 max-w-7xl mx-auto w-full flex justify-end">
        <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#12100e]/75 border border-[#bfa052]/30 text-[10px] font-mono text-[#e4c987] backdrop-blur-md">
          <span className="w-1.5 h-1.5 rounded-full bg-[#e06d1b] animate-pulse"></span>
          <span>Cloudinary Edge Delivery: f_auto, q_auto, c_fill, g_auto</span>
        </div>
      </div>

      {/* Centered Editorial Masterstage */}
      <div className="relative z-10 max-w-4xl mx-auto w-full text-center flex flex-col items-center justify-center my-auto py-8 sm:py-12">
        {/* Curatorial Header Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#bfa052]/35 bg-[#12100e]/80 mb-6 sm:mb-8 backdrop-blur-md max-w-[90vw]"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#e4c987] shrink-0" />
          <span className="text-[9px] sm:text-[11px] uppercase tracking-[0.2em] sm:tracking-[0.32em] text-[#e7ddcc] font-medium font-sans truncate">
            Tamil Nadu &bull; Digital Memory Museum
          </span>
        </motion.div>

        {/* Master Exhibition Typography */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-5xl sm:text-8xl lg:text-9xl tracking-tight text-[#f7f4ee] font-light leading-[1] mb-5 sm:mb-6 select-none"
        >
          ROOTS
          <span className="block text-xl sm:text-4xl lg:text-5xl italic font-serif text-[#e4c987] font-normal tracking-normal mt-2 sm:mt-3">
            India, Beyond the Postcard
          </span>
        </motion.h1>

        {/* Concise Emotional Opening Hook */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.55 }}
          className="font-serif italic text-base sm:text-2xl text-[#f7f4ee]/90 max-w-2xl mx-auto mb-4 sm:mb-5 leading-snug sm:leading-relaxed"
        >
          &ldquo;Every place has a story. Every story deserves to be felt.&rdquo;
        </motion.p>

        {/* Narrative Orientation */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.7 }}
          className="font-sans text-xs sm:text-sm text-[#e7ddcc]/70 max-w-xl mx-auto mb-8 sm:mb-10 leading-relaxed font-light px-2"
        >
          Step beyond the commercial souvenir into the breathing soul of Tamil Nadu.
          Walk dawn flower markets, listen to courtyard monsoons, and touch millennium-old granite.
        </motion.p>

        {/* ONE UNMISTAKABLE PRIMARY CALL TO ACTION */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-col items-center"
        >
          <a
            href="#chapters"
            className="group relative inline-flex items-center gap-2.5 sm:gap-3 px-7 sm:px-9 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-[#d4b568] via-[#e4c987] to-[#bfa052] text-[#090807] font-sans font-medium text-[11px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] transition-all duration-300 hover:shadow-[0_0_40px_-5px_rgba(228,201,135,0.45)] hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Enter The Exhibition</span>
            <ArrowDown className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-1" />
          </a>
          <span className="text-[9px] sm:text-[10px] text-[#e7ddcc]/40 font-mono tracking-widest uppercase mt-3">
            Interactive Cultural Journey
          </span>
        </motion.div>
      </div>

      {/* Exhibition Chapters Quick Bar (Bottom) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 1.1 }}
        className="relative z-10 w-full max-w-7xl mx-auto pb-6 sm:pb-8 pt-4 border-t border-[#1c1916]/80 flex flex-wrap items-center justify-between gap-4 text-xs font-mono"
      >
        <div className="flex items-center space-x-4 sm:space-x-10 text-[10px] sm:text-[11px] text-[#e7ddcc]/65 overflow-x-auto pb-1 max-w-full">
          <a href="#chapters" className="hover:text-[#e4c987] transition-colors whitespace-nowrap">
            <span className="text-[#9e8038] mr-1">01</span> MADURAI
          </a>
          <span className="text-[#1c1916]">•</span>
          <a href="#chapters" className="hover:text-[#e4c987] transition-colors whitespace-nowrap">
            <span className="text-[#9e8038] mr-1">02</span> CHETTINAD
          </a>
          <span className="text-[#1c1916]">•</span>
          <a href="#chapters" className="hover:text-[#e4c987] transition-colors whitespace-nowrap">
            <span className="text-[#9e8038] mr-1">03</span> THANJAVUR
          </a>
          <span className="text-[#1c1916]">•</span>
          <a href="#chapters" className="hover:text-[#e4c987] transition-colors whitespace-nowrap">
            <span className="text-[#9e8038] mr-1">04</span> NILGIRIS
          </a>
        </div>

        <div className="text-[10px] text-[#9e8038] uppercase tracking-widest hidden md:block">
          Scroll Down to Begin Exhibition &darr;
        </div>
      </motion.div>
    </section>
  );
}
