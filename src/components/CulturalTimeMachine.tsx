"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Landmark, Sparkles, BookOpen, Compass, ChevronRight } from "lucide-react";
import ImageWithFallback from "@/components/ImageWithFallback";
import { buildCloudinaryUrl } from "@/lib/cloudinary";

interface EraData {
  id: string;
  period: string;
  title: string;
  epoch: string;
  accentColor: string;
  image: string;
  fallbackImage: string;
  summary: string;
  milestones: {
    year: string;
    headline: string;
    detail: string;
    region: string;
  }[];
  philosophies: string[];
}

const ERAS: EraData[] = [
  {
    id: "ancient",
    period: "3000 BCE – 500 CE",
    title: "Vedic Dawn & Sangam Poetics",
    epoch: "Indus Saraswati, Early Dynasties & Classical Literature",
    accentColor: "#7A2E16",
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?q=85&w=1200&auto=format&fit=crop",
    fallbackImage: "https://images.unsplash.com/photo-1599661046289-e31897846e41?q=85&w=1200&auto=format&fit=crop",
    summary:
      "The primordial foundations of Indian civilization: town planning of Harappa, oral transmission of Rigvedic hymns along the Saraswati, the profound naturalist poetics of the Tamil Sangam academies, and the contemplative rock-cut monasteries of Ajanta.",
    milestones: [
      {
        year: "c. 2600 BCE",
        headline: "Dholavira Water Engineering & Terracotta Craft",
        detail: "Ingenious stone water reservoirs and bronze dancing figures in the Rann of Kutch.",
        region: "Gujarat",
      },
      {
        year: "c. 300 BCE – 300 CE",
        headline: "Tamil Sangam Literary Conclaves",
        detail: "Corpus of 2,381 poems categorizing human emotion into five natural landscapes (Thinai).",
        region: "Tamil Nadu",
      },
      {
        year: "c. 250 BCE",
        headline: "Ashoka's Lion Capital of Sarnath",
        detail: "Carved polished sandstone edicts radiating non-violence and ethical governance.",
        region: "Uttar Pradesh & Bihar",
      },
    ],
    philosophies: ["Dharma (Cosmic Order)", "Vasudhaiva Kutumbakam", "Thinai (Poetic Landscapes)"],
  },
  {
    id: "classical",
    period: "500 CE – 1500 CE",
    title: "The Temple Chariots & Sacred Granite",
    epoch: "Chola Maritime, Hoysala Sculptures & Classical Bhakti",
    accentColor: "#5B0E1B",
    image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?q=85&w=1200&auto=format&fit=crop",
    fallbackImage: "https://images.unsplash.com/photo-1564507592333-c60657eea523?q=85&w=1200&auto=format&fit=crop",
    summary:
      "An era of architectural audacity and devotional poetry. Monarchs carved entire granite mountains into interlocking stone temples without mortar, cast lost-wax Nataraja bronzes with cosmic proportions, and charted trade routes across the Bay of Bengal.",
    milestones: [
      {
        year: "1010 CE",
        headline: "Consecration of Brihadisvara Vimana",
        detail: "Rajaraja Chola I crowns Thanjavur with an 80-tonne monolithic granite cupola.",
        region: "Tamil Nadu",
      },
      {
        year: "1250 CE",
        headline: "Konark Sun Temple Surya Chariot",
        detail: "King Narasimhadeva I sculpts 24 monumental wheels functioning as astronomical sundials.",
        region: "Odisha",
      },
      {
        year: "1150 CE",
        headline: "Hoysala Chloritic Schist Filigree",
        detail: "Belur and Halebidu temples carved with the delicacy of ivory filigree.",
        region: "Karnataka",
      },
    ],
    philosophies: ["Bhakti Devotion", "Agama Sastra Architecture", "Lost-Wax Cosmic Geometry"],
  },
  {
    id: "courtly",
    period: "1500 CE – 1850 CE",
    title: "Miniature Palettes & Courtly Splendor",
    epoch: "Rajput Citadel Miniatures, Deccan Silks & Nathdwara Pichwai",
    accentColor: "#8B6508",
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?q=85&w=1200&auto=format&fit=crop",
    fallbackImage: "https://images.unsplash.com/photo-1599661046289-e31897846e41?q=85&w=1200&auto=format&fit=crop",
    summary:
      "A luminous cultural synthesis where crushed mineral pigments, real gold leaf, and intricate courtly etiquette flourished. Rajput and Pahari ateliers captured divine romance, Chettiar merchants laid Burmese teak and Italian marble courtyards, and Pashmina shawls were hand-spun in Kashmir.",
    milestones: [
      {
        year: "1650 CE",
        headline: "Pichwai Cloth Murals of Shrinathji",
        detail: "Devotional Krishna hangings created with natural lapis lazuli and pulverized gold.",
        region: "Rajasthan",
      },
      {
        year: "1720 CE",
        headline: "Peshwa Citadel & Paithani Silk Ateliers",
        detail: "Real gold zari weaves with peacock and parrot motifs worn across the Maratha Empire.",
        region: "Maharashtra",
      },
      {
        year: "1820 CE",
        headline: "Chettiar Ocean-Trading Mansions",
        detail: "Athangudi terra-cotta tile mansions built from spices and gemstone merchant fortunes.",
        region: "Tamil Nadu",
      },
    ],
    philosophies: ["Rasa & Bhava (Aesthetic Savor)", "Miniature Precision", "Merchant Stewardship"],
  },
  {
    id: "modern",
    period: "1850 CE – Present",
    title: "Living Heritage & Cultural Revival",
    epoch: "Swadeshi Handlooms, Tribal GI Recognition & Digital Archives",
    accentColor: "#0A4642",
    image: "https://images.unsplash.com/photo-1609137144813-7d9921338f24?q=85&w=1200&auto=format&fit=crop",
    fallbackImage: "https://images.unsplash.com/photo-1609137144813-7d9921338f24?q=85&w=1200&auto=format&fit=crop",
    summary:
      "The resilience of hand-crafted identity in the age of industrial speed. From Gandhi's charkha spinning freedom in khadi to the international recognition of Geographical Indications (GI) for 400+ ancestral crafts, India's soul remains living, breathing, and unbreakable.",
    milestones: [
      {
        year: "1921 CE",
        headline: "The Charkha as National Resistance",
        detail: "Homespun khadi transforms indigenous craft into an economic and spiritual revolution.",
        region: "Pan-India",
      },
      {
        year: "1999 CE",
        headline: "Geographical Indications Registry (GI)",
        detail: "Statutory safeguarding for Kanjeevaram, Pashmina, Darjeeling Tea, and Mysore Sandalwood.",
        region: "National Archive",
      },
      {
        year: "2026 CE",
        headline: "ROOTS: Digital Memory Museum",
        detail: "Preserving 36 states and union territories in real-time Cloudinary-powered archives.",
        region: "Digital Sphere",
      },
    ],
    philosophies: ["Ahimsa & Swadeshi", "Indigenous Knowledge Preservation", "The Eternal Living Archive"],
  },
];

export function CulturalTimeMachine() {
  const [selectedEraId, setSelectedEraId] = useState<string>("ancient");

  const currentEra = ERAS.find((e) => e.id === selectedEraId) || ERAS[0];

  return (
    <section id="time-machine" className="py-24 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto space-y-12 border-t border-[#C59B27]/25">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#C59B27]/40 bg-[#FAF8F5] text-[#5B0E1B] text-[10px] uppercase tracking-[0.25em] font-mono shadow-xs">
          <Clock className="w-3.5 h-3.5 text-[#C59B27]" />
          Temporal Curatorial Chronology
        </div>
        <h2 className="font-serif text-4xl sm:text-5xl text-[#1C1814] font-normal tracking-tight">
          The Cultural Time Machine
        </h2>
        <p className="font-sans text-xs sm:text-sm text-[#6E6255] max-w-xl mx-auto leading-relaxed font-light">
          Traverse 5,000 years of unbroken creative memory across four landmark epochs of the Indian subcontinent.
        </p>
      </div>

      {/* Epoch Stepper Buttons */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {ERAS.map((era) => {
          const isSelected = selectedEraId === era.id;
          return (
            <button
              key={era.id}
              onClick={() => setSelectedEraId(era.id)}
              className={`p-4 rounded-2xl text-left border transition-all duration-300 relative overflow-hidden ${
                isSelected
                  ? "bg-white shadow-lg border-[#C59B27] ring-1 ring-[#C59B27]/40"
                  : "bg-white/60 hover:bg-white border-[#C59B27]/20 text-[#6E6255]"
              }`}
            >
              <span className="text-[10px] font-mono tracking-widest uppercase block text-[#8C7E72] mb-1">
                {era.period}
              </span>
              <h3 className="font-serif text-base font-semibold text-[#1C1814] leading-snug">
                {era.title}
              </h3>
              {isSelected && (
                <div
                  className="absolute bottom-0 left-0 right-0 h-1"
                  style={{ backgroundColor: era.accentColor }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Main Epoch Stage */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentEra.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.4 }}
          className="rounded-3xl p-6 sm:p-10 border border-[#C59B27]/30 bg-gradient-to-b from-[#FFFDF9] via-[#FAF6F0] to-[#F5EFEB] shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
        >
          {/* Left Column: Epoch Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-mono uppercase tracking-widest text-[#8C7E72]">
                Epoch &bull; {currentEra.period}
              </span>
              <h3
                className="font-serif text-3xl sm:text-4xl text-[#1C1814] font-normal leading-tight"
                style={{ color: currentEra.accentColor }}
              >
                {currentEra.title}
              </h3>
              <p className="text-xs font-mono text-[#C59B27] uppercase tracking-wider">
                {currentEra.epoch}
              </p>
            </div>

            <p className="text-sm font-serif italic text-[#382F26] leading-relaxed">
              &ldquo;{currentEra.summary}&rdquo;
            </p>

            {/* Curated Milestones List */}
            <div className="space-y-3 pt-2">
              <span className="text-xs font-mono uppercase tracking-widest text-[#5B0E1B] block font-bold">
                Civilizational Milestones:
              </span>
              <div className="space-y-2.5">
                {currentEra.milestones.map((m, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-white/80 border border-[#C59B27]/20 flex items-start gap-3 shadow-2xs"
                  >
                    <span className="font-mono text-xs font-bold text-[#C59B27] shrink-0 pt-0.5">
                      {m.year}
                    </span>
                    <div>
                      <h4 className="font-serif text-sm font-semibold text-[#1C1814]">
                        {m.headline}
                      </h4>
                      <p className="text-xs text-[#6E6255] font-sans mt-0.5 leading-relaxed">
                        {m.detail}
                      </p>
                      <span className="inline-block mt-1 text-[10px] font-mono text-[#8C7E72] uppercase">
                        Origin: {m.region}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Philosophical Pillars */}
            <div className="flex items-center gap-2 flex-wrap pt-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#8C7E72]">
                Guiding Ethos:
              </span>
              {currentEra.philosophies.map((p, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-full text-xs font-serif bg-white border border-[#C59B27]/30 text-[#423A32]"
                >
                  {p}
                </span>
              ))}
            </div>
          </div>

          {/* Right Column: Visual Artifact Plate */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden border-2 border-[#C59B27]/40 shadow-2xl">
              <ImageWithFallback
                src={buildCloudinaryUrl({
                  sourceUrl: currentEra.image,
                  width: 900,
                  height: 1125,
                  crop: "fill",
                  gravity: "auto",
                  format: "auto",
                  quality: "auto",
                  effect:
                    currentEra.id === "ancient"
                      ? "sepia:60,contrast:15"
                      : currentEra.id === "medieval"
                      ? "tint:35:C59B27"
                      : currentEra.id === "colonial"
                      ? "sepia:80,vignette:25"
                      : "contrast:10",
                })}
                fallbackSrc={currentEra.fallbackImage}
                alt={currentEra.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent flex flex-col justify-end p-5 text-white">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#D4AF37]">
                  Archival Plate
                </span>
                <span className="font-serif text-lg leading-snug">
                  {currentEra.title}
                </span>
                <span className="text-xs font-sans text-white/80 mt-1">
                  Preserved in National Living Memory
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}

export default CulturalTimeMachine;
