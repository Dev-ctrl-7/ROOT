"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Heart, Feather, Volume2, VolumeX, RotateCcw, MapPin, Globe } from "lucide-react";
import confetti from "canvas-confetti";
import { ambientSound } from "@/lib/ambient-audio";
import { useLanguage } from "@/lib/i18n/context";
import { ALL_INDIAN_STATES, StateData } from "@/lib/states-data";

interface LetterFromHomeProps {
  initialStateId?: string;
}

interface RegionalEpistle {
  stateId: string;
  stateName: string;
  nativeTitle: string;
  nativeVerse: string;
  englishProse: string[];
  scents: string;
  signoffLand: string;
}

const REGIONAL_EPISTLES: Record<string, RegionalEpistle> = {
  "tamil-nadu": {
    stateId: "tamil-nadu",
    stateName: "Tamil Nadu",
    nativeTitle: "தாய்நிலத்தின் மடல் • ஓர் அழியா நினைவு",
    nativeVerse:
      "நீ எத்தனை தூரம் சென்றாலும் உன்னோடு தொடரும் ஓர் வாசனை உண்டு — அது வைகைக் கரையின் காலை மல்லிகை; அடுப்பில் கொதிக்கும் பித்தளைக் காப்பியின் நறுமணம்; மழை நீர் செம்மண்ணில் இறங்கும்போது கிளம்பும் முதல் மூச்சு.",
    englishProse: [
      "No matter how many oceans you cross, there is a scent that travels with you in silence: the dawn bloom of Madurai jasmine wrapped in banana leaf, the rich froth of filter coffee poured from high brass vessels, and the petrichor of the first monsoon shower kissing sun-baked red loam.",
      "The shadow of the temple gopurams may fade from your window, but beneath your bare feet, that ancient granite remains forever cool.",
      "Home is never merely a geography on an atlas. It is the rhythmic tap of a wooden ladle against a soapstone pot, and the quiet assurance that you belong to an eternal continuum.",
    ],
    scents: "Madurai Malli, Brass Filter Coffee, Cauvery Silt",
    signoffLand: "The Red Soil of Tamil Nadu",
  },
  "rajasthan": {
    stateId: "rajasthan",
    stateName: "Rajasthan",
    nativeTitle: "थार की माटी की पाती • मरुधरा संदेश",
    nativeVerse:
      "रेत के समंदर से उड़ती हुई हवा जब तुम्हारे शहर पहुंचेगी, तो याद दिलाएगी कि तुम्हारी रगों में आज भी हल्दीघाटी का स्वाभिमान और रणथंभौर की धूप बसी है।",
    englishProse: [
      "No matter how modern the towers around you grow, listen closely when the twilight wind turns: it carries the haunting melody of the Ravanahatha drifting over sandstone ramparts.",
      "You carry with you the scent of sweet bajra rotis brushed with golden cow ghee, the saffron fragrance of festive Ghevar, and the warm touch of red bandhani dyed in desert courtyards.",
      "Home is the courtyard well beneath the desert stars, where the storytelling never stops and your name is sung in timeless folklore.",
    ],
    scents: "Thar Dune Petrichor, Saffron Rabri, Sandstone",
    signoffLand: "The Sandstone & Pride of Marwar, Rajasthan",
  },
  "kerala": {
    stateId: "kerala",
    stateName: "Kerala",
    nativeTitle: "നാട്ടിൽ നിന്നൊരു കത്ത് • മഴയുടെ ഓർമ്മ",
    nativeVerse:
      "വേമ്പനാട്ടു കായലിലെ കുളിർകാറ്റും, തുളസിത്തറയിൽ തെളിയുന്ന സന്ധ്യാദീപവും, വാഴയിലയിലെ തുമ്പപ്പൂച്ചോറും നിന്നെ ഇന്നും കാത്തിരിക്കുന്നു.",
    englishProse: [
      "Wherever the world carries you, close your eyes and you will hear it: the steady rhythm of rain drumming against terracotta roof tiles, water cascading from banana leaves into lush green soil.",
      "You carry within you the fragrant warmth of fresh crushed green cardamom, the coconut oil warming in cast-iron urlis, and the golden silence of temple lamps glowing at dusk.",
      "Home is the backwater breeze that soothes every scar, waiting at the edge of the Vembanad lake to welcome you back.",
    ],
    scents: "Wet Teakwood, Crushed Cardamom, Monsoon Mist",
    signoffLand: "The Palm Groves & Waters of Kerala",
  },
  "punjab": {
    stateId: "punjab",
    stateName: "Punjab",
    nativeTitle: "ਵਤਨੋਂ ਆਈ ਚਿੱਠੀ • ਪੰਜ ਦਰਿਆਵਾਂ ਦੀ ਛਾਂ",
    nativeVerse:
      "ਪਿੰਡ ਦੀ ਫ਼ਿਰਨੀ 'ਤੇ ਚੱਲਦੀ ਠੰਢੀ ਪੌਣ ਅਤੇ ਗੁੜ ਵਾਲੀ ਚਾਹ ਦੀ ਮਹਿਕ ਤੈਨੂੰ ਹਮੇਸ਼ਾ ਯਾਦ ਰੱਖਦੀ ਹੈ। ਜਿੱਥੇ ਵੀ ਰਹੋ, ਆਪਣੀਆਂ ਜੜ੍ਹਾਂ ਨਾਲ ਜੁੜੇ ਰਹੋ।",
    englishProse: [
      "Across distant skylines, remember the boundless yellow horizon of blooming mustard fields swaying under winter skies, and the golden laughter around roaring hearths.",
      "You carry the rich comfort of slow-simmered Sarson da Saag topped with homemade white butter, the earthy crunch of hot Makki di Roti, and the deep heartbeat of the dholak.",
      "Home is the warm open courtyard where no stranger ever sleeps hungry, and where you are embraced before you even cross the threshold.",
    ],
    scents: "Mustard Fields, Tandoor Smoke, Sweet Buffalo Milk",
    signoffLand: "The Soil of the Five Rivers, Punjab",
  },
  "west-bengal": {
    stateId: "west-bengal",
    stateName: "West Bengal",
    nativeTitle: "দেশের মাটির চিঠি • স্মৃতির অমল সুর",
    nativeVerse:
      "শরতের শিউলি ফুলের গন্ধ আর ঢাকের বাদ্যি এখনো তোমার অপেক্ষায় কান পেতে আছে। যেখানেই যাও, গঙ্গার শান্ত কলতান তোমার সাথেই বয়।",
    englishProse: [
      "In the busy quiet of foreign cities, listen for the distant morning bells across the Hooghly river and the white fragrance of wet night-blooming Shiuli blossoms.",
      "You carry the nostalgic sweetness of nolen gur dissolving into warm sandesh, the rustle of hand-loomed Baluchari silk, and the philosophical warmth of evening addas on red-tiled balconies.",
      "Home is the eternal melody of Tagore whispering in the rains, reminding you that poetry is not what you read, but where you come from.",
    ],
    scents: "Shiuli Petals, Nolen Gur, Hooghly River Silt",
    signoffLand: "The Terracotta & Riverbanks of Bengal",
  },
  "kashmir": {
    stateId: "jammu-and-kashmir",
    stateName: "Jammu & Kashmir",
    nativeTitle: "کشمیر پؠٹھ چھِٹھ • ہِم پوش کی یاد",
    nativeVerse:
      "چنارک پوش تہٕ زَعفرانچ خوشبو چھِ تۄہہِ یاد دِوان۔ ییٚتھؠ تہِ گژھِو، پَننِس مٲلس ماجہِ ہُنٛد دِل چھُ وۄنِہ تہِ ییٚتھے بَسان۔",
    englishProse: [
      "Whenever frost touches your windowsill, remember the quiet snowfall settling upon ancient pine forests and wooden houseboats floating on the mist-draped Dal Lake.",
      "You carry the aromatic warmth of pink saffron Kehwa brewed in carved copper samovars with crushed green almonds, and the intricate caress of Pashmina woven over long winter twilights.",
      "Home is the chinar leaf that turns crimson just to welcome your footsteps back to the paradise of the valley.",
    ],
    scents: "Saffron Threads, Cedar Wood, Mountain Kehwa",
    signoffLand: "The Saffron Valleys & Chinars of Kashmir",
  },
};

export function LetterFromHome({ initialStateId = "tamil-nadu" }: LetterFromHomeProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedState, setSelectedState] = useState<string>(initialStateId);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const { t, rootGlyph, rootWord } = useLanguage();
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Fallback to Tamil Nadu if selected state doesn't have custom bespoke text
  const currentEpistle = REGIONAL_EPISTLES[selectedState] || REGIONAL_EPISTLES["tamil-nadu"];

  const handleOpenLetter = () => {
    ambientSound.playSealBreakSound();

    confetti({
      particleCount: 75,
      spread: 70,
      origin: { y: 0.7 },
      colors: ["#5B0E1B", "#C59B27", "#FAF8F5", "#D4AF37", "#0A4642"],
    });

    setIsOpen(true);
  };

  const handleReseal = () => {
    stopNarration();
    setIsOpen(false);
  };

  const toggleNarration = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      alert("Text-to-speech is not supported in this browser.");
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel();
    const narrationText = `${currentEpistle.nativeVerse}. ${currentEpistle.englishProse.join(" ")}. With undying devotion, ${currentEpistle.signoffLand}.`;
    
    const utterance = new SpeechSynthesisUtterance(narrationText);
    utterance.rate = 0.88; // Gentle, reflective cadence
    utterance.pitch = 1.0;

    // Pick warm voice if available
    const voices = window.speechSynthesis.getVoices();
    const warmVoice = voices.find((v) => v.lang.includes("en-IN") || v.lang.includes("hi-IN") || v.name.includes("Natural"));
    if (warmVoice) utterance.voice = warmVoice;

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    speechRef.current = utterance;
    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  const stopNarration = () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
  };

  useEffect(() => {
    return () => {
      stopNarration();
    };
  }, []);

  return (
    <section
      id="letter-from-home"
      className="py-24 px-4 sm:px-8 lg:px-12 max-w-5xl mx-auto border-t border-[#C59B27]/25 relative"
    >
      {/* Editorial Subtitle */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#C59B27]/30 bg-white/90 dark:bg-[#1A1613] text-[#5B0E1B] dark:text-[#E5C378] text-[10px] uppercase tracking-[0.25em] mb-4 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-[#C59B27] dark:text-[#D4AF37]" />
          {t.letter.eyebrow}
        </div>
        <h2 className="font-serif text-4xl sm:text-6xl text-[#1C1814] dark:text-[#F5EFEB] font-normal tracking-tight mb-3">
          {t.letter.title}
        </h2>
        <p className="text-xs sm:text-sm text-[#6E6255] dark:text-[#A89886] font-light font-serif italic max-w-lg mx-auto">
          &ldquo;{t.letter.subtitle}&rdquo;
        </p>

        {/* State Selector Switcher */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          <span className="text-[11px] font-mono text-[#8C7E72] dark:text-[#A89886] uppercase tracking-wider mr-1">
            Choose Origin:
          </span>
          {[
            { id: "tamil-nadu", label: "Tamil Nadu" },
            { id: "rajasthan", label: "Rajasthan" },
            { id: "kerala", label: "Kerala" },
            { id: "punjab", label: "Punjab" },
            { id: "west-bengal", label: "Bengal" },
            { id: "kashmir", label: "Kashmir" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => {
                stopNarration();
                setSelectedState(item.id);
              }}
              className={`px-3 py-1 rounded-full text-xs font-serif transition-all ${
                selectedState === item.id
                  ? "bg-[#5B0E1B] text-white shadow-xs font-medium"
                  : "bg-white/80 hover:bg-white text-[#54483C] border border-[#C59B27]/25"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* The Envelope Stage */}
      <div className="flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          {!isOpen ? (
            /* SEALED HANDMADE COTTON ENVELOPE ARTIFACT */
            <motion.div
              key="sealed"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.93 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-xl aspect-[7/4.8] sm:aspect-[7/4.5] rounded-3xl bg-gradient-to-br from-[#FAF5EE] via-[#F3ECE2] to-[#EBE1D3] border-2 border-[#C59B27]/40 p-8 sm:p-10 shadow-2xl flex flex-col items-center justify-between text-center group cursor-pointer hover:border-[#C59B27] transition-all duration-500"
              onClick={handleOpenLetter}
            >
              {/* Envelope flap chevron visual cue */}
              <div className="absolute top-0 left-0 right-0 h-1/2 border-b border-[#C59B27]/25 bg-gradient-to-b from-white/40 to-transparent pointer-events-none rounded-t-3xl" />

              <div className="space-y-1 relative z-10">
                <span className="text-[9px] uppercase tracking-[0.3em] text-[#5B0E1B] font-mono block font-semibold">
                  Personal & Confidential &bull; {currentEpistle.stateName}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl text-[#1C1814] font-normal">
                  {t.letter.salutation}
                </h3>
              </div>

              {/* The 3D Royal Burgundy Wax Seal Button with Localized Glyph */}
              <div className="relative z-20 my-auto flex flex-col items-center py-4">
                <motion.button
                  whileHover={{ scale: 1.07 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenLetter();
                  }}
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-[#7B1E26] via-[#5B0E1B] to-[#3B0710] border-2 border-[#D4AF37] shadow-xl flex flex-col items-center justify-center p-2 group-hover:shadow-[0_0_35px_rgba(197,155,39,0.4)] transition-all cursor-pointer relative"
                  aria-label="Break the wax seal to read the handwritten letter"
                >
                  <div className="w-20 h-20 sm:w-23 sm:h-23 rounded-full border border-dashed border-[#D4AF37]/60 flex flex-col items-center justify-center">
                    <span className="text-[#FAF5EE] font-serif text-2xl sm:text-3xl font-bold">
                      {rootWord}
                    </span>
                    <span className="text-[7px] uppercase tracking-[0.2em] text-[#D4AF37] font-mono mt-0.5">
                      ROOTS
                    </span>
                  </div>
                </motion.button>

                <span className="text-xs text-[#5B0E1B] font-mono tracking-wider mt-3.5 flex items-center gap-1.5 font-semibold">
                  <Feather className="w-3.5 h-3.5 text-[#C59B27]" />
                  {t.letter.sealTooltip}
                </span>
              </div>

              {/* Bottom Cue */}
              <div className="relative z-10 text-[11px] text-[#6E6255] font-serif italic">
                Touch the wax seal to break open this memory of {currentEpistle.stateName}
              </div>
            </motion.div>
          ) : (
            /* UNFOLDED TEXTURED PARCHMENT LETTER */
            <motion.div
              key="unfolded"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-2xl bg-[#FAF8F5] rounded-3xl p-8 sm:p-12 border-4 border-double border-[#C59B27]/50 shadow-2xl relative text-[#1C1814]"
            >
              {/* Epistle Header */}
              <div className="flex items-center justify-between border-b border-[#C59B27]/30 pb-4 mb-8">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#5B0E1B] font-mono font-bold block">
                    AN EPISTLE FROM THE SOIL &bull; {currentEpistle.stateName}
                  </span>
                  <span className="text-xs font-serif text-[#8C5320] italic">
                    Scents carried: {currentEpistle.scents}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {/* Read Aloud Text-to-Speech Button */}
                  <button
                    onClick={toggleNarration}
                    className={`px-3 py-1.5 rounded-full border text-xs flex items-center gap-1.5 transition-all ${
                      isSpeaking
                        ? "bg-[#5B0E1B] text-white border-[#5B0E1B] animate-pulse"
                        : "bg-white hover:bg-[#FAF5EE] text-[#5B0E1B] border-[#C59B27]/40"
                    }`}
                    title={isSpeaking ? "Pause Narration" : "Listen to Epistle Narration"}
                  >
                    {isSpeaking ? (
                      <>
                        <VolumeX className="w-3.5 h-3.5" />
                        <span className="font-mono text-[10px] uppercase">Pause</span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-3.5 h-3.5 text-[#C59B27]" />
                        <span className="font-mono text-[10px] uppercase">Listen</span>
                      </>
                    )}
                  </button>

                  {/* Reseal Envelope */}
                  <button
                    onClick={handleReseal}
                    className="text-xs text-[#5B0E1B] hover:text-[#7B1E26] flex items-center gap-1 font-mono uppercase tracking-wider transition-colors ml-2 font-medium"
                    title="Reseal Envelope"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Reseal
                  </button>
                </div>
              </div>

              {/* REGIONAL POETIC VERSE IN NATIVE SCRIPT */}
              <div className="mb-8 font-serif text-base sm:text-lg text-[#26211a] leading-relaxed border-l-3 border-[#5B0E1B] pl-5 space-y-2 bg-[#FAF5EE]/70 py-3 rounded-r-xl">
                <span className="text-xs font-mono uppercase text-[#8C7E72] block">
                  {currentEpistle.nativeTitle}
                </span>
                <p className="italic text-[#382F26]">&ldquo;{currentEpistle.nativeVerse}&rdquo;</p>
              </div>

              {/* ENGLISH LYRICAL REFLECTION */}
              <div className="space-y-4 font-serif text-sm sm:text-base text-[#423A32] leading-relaxed font-light">
                {currentEpistle.englishProse.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>

              {/* Signoff */}
              <div className="mt-8 pt-6 border-t border-[#C59B27]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 font-serif">
                <div>
                  <div className="text-xs text-[#8C5320] uppercase tracking-wider font-mono">
                    {t.letter.signoff}
                  </div>
                  <div className="text-lg font-bold text-[#5B0E1B] italic">
                    {currentEpistle.signoffLand}
                  </div>
                </div>

                <div className="inline-flex items-center gap-1.5 text-xs text-[#8C5320] font-mono">
                  <Heart className="w-3.5 h-3.5 text-[#5B0E1B] fill-[#5B0E1B]" />
                  Keep this memory close
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

export default LetterFromHome;
