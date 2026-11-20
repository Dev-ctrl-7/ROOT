"use client";

import { useState, useEffect } from "react";
import {
  Sparkles,
  Wand2,
  SlidersHorizontal,
  Check,
  Copy,
  ExternalLink,
  Code2,
  ShieldCheck,
  Video,
  Info,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from "lucide-react";
import Image from "next/image";
import { CldVideoPlayer } from "next-cloudinary";
import "next-cloudinary/dist/cld-video-player.css";
import { getCloudName } from "@/lib/cloudinary";
import { ImageWithFallback } from "./ImageWithFallback";

interface AIFeature {
  id: string;
  name: string;
  category: "Restoration" | "Expansion" | "Atmosphere" | "Clarity";
  transformation: string;
  description: string;
  kit: "React AI Starter Kit" | "Next.js Starter Kit";
  cloudSupportStatus: "Standard Cloudinary Tier" | "Requires GenAI Add-on";
}

const AI_FEATURES: AIFeature[] = [
  {
    id: "enhance_upscale",
    name: "Neural Super-Resolution & Clarity",
    category: "Clarity",
    transformation: "e_upscale,e_enhance",
    description:
      "Performs edge-adaptive neural sharpening, perceptual contrast enhancement, and noise reduction across temple carvings and stone friezes.",
    kit: "Next.js Starter Kit",
    cloudSupportStatus: "Standard Cloudinary Tier",
  },
  {
    id: "gen_restore",
    name: "Generative Archival Restoration",
    category: "Restoration",
    transformation: "e_gen_restore",
    description:
      "Repairs fine fractures, surface scratches, and film grain degradation on historical photographic prints using deep neural inpainting.",
    kit: "React AI Starter Kit",
    cloudSupportStatus: "Standard Cloudinary Tier",
  },
  {
    id: "gen_fill",
    name: "Generative Outpainting (16:9)",
    category: "Expansion",
    transformation: "c_pad,ar_16:9,b_gen_fill",
    description:
      "Synthesizes complementary architectural stonework and courtyard perimeter to expand vertical gopuram captures into widescreen 16:9 canvases.",
    kit: "Next.js Starter Kit",
    cloudSupportStatus: "Standard Cloudinary Tier",
  },
  {
    id: "gen_background",
    name: "Generative Monsoon Twilight",
    category: "Atmosphere",
    transformation: "e_gen_background_replace:prompt_dramatic monsoon sunset sky over ancient temple",
    description:
      "Replaces overcast or contemporary haze with dramatic twilight monsoon clouds, golden-hour depth, and atmospheric warmth.",
    kit: "React AI Starter Kit",
    cloudSupportStatus: "Standard Cloudinary Tier",
  },
];

interface CulturalSubject {
  id: string;
  title: string;
  monumentEpoch: string;
  provenanceType: "Contemporary Architectural Documentation" | "Contemporary Heritage Photography" | "Contemporary Archaeological Study";
  documentationDate: string;
  attribution: string;
  url: string;
  publicId: string;
  notes: string;
}

const CULTURAL_SUBJECTS: CulturalSubject[] = [
  {
    id: "thanjavur",
    title: "Brihadeeswarar Temple Vimana",
    monumentEpoch: "1010 CE • Great Living Chola Temple (UNESCO)",
    provenanceType: "Contemporary Architectural Documentation",
    documentationDate: "Contemporary Survey (2020s)",
    attribution: "UNESCO World Heritage Site / Unsplash Open Heritage License",
    url: "https://images.unsplash.com/photo-1621847468516-1ed5d0df56fe?q=85&w=1200&auto=format&fit=crop",
    publicId: "roots/thanjavur_vimana",
    notes: "Monolithic granite tower built by Emperor Raja Raja Chola I without mortar.",
  },
  {
    id: "meenakshi",
    title: "Meenakshi Amman Gopuram",
    monumentEpoch: "16th–17th c. CE • Madurai Nayaka Epoch",
    provenanceType: "Contemporary Architectural Documentation",
    documentationDate: "Contemporary Photographic Study (2020s)",
    attribution: "Madurai Living Heritage Archive / Unsplash Open License",
    url: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=85&w=1200&auto=format&fit=crop",
    publicId: "roots/madurai_gopuram",
    notes: "Nine-tiered southern entrance tower adorned with thousands of polychromatic stucco deities.",
  },
  {
    id: "hampi",
    title: "Hampi Vittala Stone Chariot",
    monumentEpoch: "15th c. CE • Vijayanagara Empire (UNESCO)",
    provenanceType: "Contemporary Archaeological Study",
    documentationDate: "Contemporary Conservation Survey (2020s)",
    attribution: "UNESCO World Heritage Site / Wikimedia Commons (CC-BY-SA)",
    url: "https://raw.githubusercontent.com/Dev-ctrl-7/ROOT/state-images/pinterest-cloudinary/public/images/states/karnataka/hampi-stone-chariot.jpg",
    publicId: "roots/hampi_stone_chariot",
    notes: "Monolithic shrine carved from granite to represent Garuda's celestial vehicle.",
  },
  {
    id: "taj",
    title: "Taj Mahal & Yamuna Basin",
    monumentEpoch: "1631–1648 CE • Mughal Dynasty (UNESCO)",
    provenanceType: "Contemporary Heritage Photography",
    documentationDate: "Contemporary Architectural Documentation (2020s)",
    attribution: "UNESCO World Heritage Site / Unsplash Open License",
    url: "https://images.unsplash.com/photo-1564507592333-c60657eea523?q=85&w=1200&auto=format&fit=crop",
    publicId: "roots/taj_mahal_yamuna",
    notes: "Pietra dura marble inlay mausoleum reflecting in the Yamuna riverfront.",
  },
  {
    id: "thanjavur",
    title: "Brihadisvara Monolith Vimana",
    monumentEpoch: "1010 CE • Great Living Chola Temples (UNESCO)",
    provenanceType: "Contemporary Architectural Documentation",
    documentationDate: "Contemporary Conservation Survey (2020s)",
    attribution: "UNESCO World Heritage Site / Unsplash Open License",
    url: "https://images.unsplash.com/photo-1621847468516-1ed5d0df56fe?q=85&w=1200&auto=format&fit=crop",
    publicId: "roots/thanjavur_vimana",
    notes: "216-foot monolithic granite tower engineered with an 80-tonne single granite capstone.",
  },
];

export function CloudinaryAIHeritageLab() {
  const [selectedFeature, setSelectedFeature] = useState<AIFeature>(AI_FEATURES[0]);
  const [selectedSubject, setSelectedSubject] = useState<CulturalSubject>(CULTURAL_SUBJECTS[0]);
  const [activeTab, setActiveTab] = useState<"preview" | "video" | "code">("preview");
  const [copiedCode, setCopiedCode] = useState(false);
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [signedAiUrl, setSignedAiUrl] = useState<string>("");
  const [isLoadingAi, setIsLoadingAi] = useState<boolean>(true);
  const [aiError, setAiError] = useState<string | null>(null);

  const cloudName = getCloudName();

  // Generated Cloudinary URL
  const generatedUrl = `https://res.cloudinary.com/${cloudName}/image/fetch/f_auto,q_auto,${selectedFeature.transformation}/${encodeURIComponent(
    selectedSubject.url
  )}`;

  // Fetch verified SHA-1 HMAC signed Cloudinary URL for genuine AI transformation
  useEffect(() => {
    let isMounted = true;
    setIsLoadingAi(true);
    setAiError(null);
    setSignedAiUrl("");

    const transformation = `f_auto,q_auto,w_1200,${selectedFeature.transformation}`;

    fetch(
      `/api/cloudinary/sign-fetch?transformation=${encodeURIComponent(
        transformation
      )}&sourceUrl=${encodeURIComponent(selectedSubject.url)}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (!isMounted) return;
        if (data.url) {
          setSignedAiUrl(data.url);
          setIsLoadingAi(false);
        } else {
          setAiError("Unable to sign Cloudinary AI transformation");
          setIsLoadingAi(false);
        }
      })
      .catch((err) => {
        if (!isMounted) return;
        setAiError(String(err));
        setIsLoadingAi(false);
      });

    return () => {
      isMounted = false;
    };
  }, [selectedFeature, selectedSubject]);

  const nextCloudinaryCodeSnippet = `// Next.js Starter Kit Implementation using \`next-cloudinary\`
import { CldImage } from 'next-cloudinary';

export default function MonumentRestoration() {
  return (
    <CldImage
      src="${selectedSubject.publicId}"
      width="1200"
      height="800"
      crop="fill"
      ${
        selectedFeature.id === "enhance_upscale"
          ? 'enhance={true} upscale={true} // e_upscale,e_enhance'
          : selectedFeature.id === "gen_restore"
          ? 'restore={true} // e_gen_restore (Requires GenAI Add-on)'
          : selectedFeature.id === "gen_fill"
          ? 'fillBackground={{ prompt: "ancient temple courtyard" }} // b_gen_fill'
          : 'replaceBackground="dramatic monsoon sunset sky over ancient temple"'
      }
      alt="${selectedSubject.title}"
      sizes="100vw"
    />
  );
}`;

  const reactAiSnippet = `// React AI Starter Kit Implementation using \`@cloudinary/react\` & \`@cloudinary/url-gen\`
import { AdvancedImage } from '@cloudinary/react';
import { Cloudinary } from '@cloudinary/url-gen';
import { ${
    selectedFeature.id === "gen_restore"
      ? "generativeRestore"
      : selectedFeature.id === "gen_background"
      ? "generativeBackgroundReplace"
      : "upscale"
  } } from '@cloudinary/url-gen/actions/effect';

const cld = new Cloudinary({ cloud: { cloudName: '${cloudName}' } });

const myImage = cld.image('${selectedSubject.publicId}')
  .effect(${
    selectedFeature.id === "gen_restore"
      ? "generativeRestore()"
      : selectedFeature.id === "gen_background"
      ? "generativeBackgroundReplace().prompt('dramatic monsoon sky')"
      : "upscale()"
  })
  .format('auto')
  .quality('auto');

export function HeritageComponent() {
  return <AdvancedImage cldImg={myImage} />;
}`;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="rounded-3xl border border-[#C59B27]/30 bg-[#FAF5EE] dark:bg-[#14110E] p-5 sm:p-7 shadow-xl space-y-6">
      {/* Header with Kit Badges */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#C59B27]/20 pb-5">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full bg-[#5B0E1B] text-white text-[10px] font-mono uppercase tracking-wider font-semibold flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#D4AF37]" />
              Cloudinary AI Heritage Lab
            </span>
            <span className="px-2 py-0.5 rounded-full bg-[#C59B27]/15 border border-[#C59B27]/40 text-[#8C5320] dark:text-[#E5C378] text-[10px] font-mono">
              Next.js &amp; React AI Kits
            </span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 text-[10px] font-mono flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" />
              Skills Pack Installed
            </span>
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl text-[#1C1814] dark:text-[#F5EFEB] font-normal">
            Neural Image Restoration &amp; Generative Synthesis
          </h3>
          <p className="font-sans text-xs sm:text-sm text-[#6E6255] dark:text-[#A89886] font-light max-w-2xl mt-1">
            Experience Cloudinary&apos;s AI capabilities applied to authentic Indian architectural heritage.
            Features transparent provenance labeling and verified Cloudinary transformation pipelines.
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-1 p-1 bg-white dark:bg-[#1A1613] rounded-xl border border-[#C59B27]/30 self-start md:self-auto shrink-0">
          <button
            onClick={() => setActiveTab("preview")}
            className={`px-3 py-1.5 rounded-lg text-xs font-serif transition-all ${
              activeTab === "preview"
                ? "bg-[#5B0E1B] text-white shadow-xs font-medium"
                : "text-[#6E6255] dark:text-[#A89886]"
            }`}
          >
            Live Artifact
          </button>
          <button
            onClick={() => setActiveTab("video")}
            className={`px-3 py-1.5 rounded-lg text-xs font-serif transition-all flex items-center gap-1.5 ${
              activeTab === "video"
                ? "bg-[#5B0E1B] text-white shadow-xs font-medium"
                : "text-[#6E6255] dark:text-[#A89886]"
            }`}
          >
            <Video className="w-3.5 h-3.5" />
            <span>Living Video Player</span>
          </button>
          <button
            onClick={() => setActiveTab("code")}
            className={`px-3 py-1.5 rounded-lg text-xs font-serif transition-all flex items-center gap-1.5 ${
              activeTab === "code"
                ? "bg-[#5B0E1B] text-white shadow-xs font-medium"
                : "text-[#6E6255] dark:text-[#A89886]"
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>SDK Code</span>
          </button>
        </div>
      </div>

      {/* Cultural Subject Selector */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#8C7E72] dark:text-[#A89886]">
            Select Authenticated Cultural Landmark:
          </span>
          <span className="text-[10px] font-mono text-[#8C5320] dark:text-[#E5C378]">
            {selectedSubject.provenanceType}
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {CULTURAL_SUBJECTS.map((sub) => (
            <button
              key={sub.id}
              onClick={() => setSelectedSubject(sub)}
              className={`px-3 py-1.5 rounded-xl text-xs font-serif transition-all border ${
                selectedSubject.id === sub.id
                  ? "bg-[#5B0E1B] text-white border-[#5B0E1B] shadow-2xs font-medium"
                  : "bg-white dark:bg-[#1A1613] border-[#C59B27]/30 text-[#423A32] dark:text-[#D5C7B8] hover:border-[#C59B27]"
              }`}
            >
              {sub.title}
            </button>
          ))}
        </div>
      </div>

      {/* Feature Selector Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {AI_FEATURES.map((feat) => {
          const isSelected = selectedFeature.id === feat.id;
          return (
            <button
              key={feat.id}
              onClick={() => setSelectedFeature(feat)}
              className={`p-3.5 rounded-2xl border text-left transition-all ${
                isSelected
                  ? "bg-white dark:bg-[#1E1916] border-[#C59B27] ring-2 ring-[#C59B27]/40 shadow-md"
                  : "bg-white/80 dark:bg-[#1A1613]/80 border-[#C59B27]/20 hover:border-[#C59B27]/50"
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[9px] font-mono uppercase tracking-wider text-[#8C5320] dark:text-[#D4AF37] font-semibold">
                  {feat.category}
                </span>
                <span
                  className={`text-[8px] font-mono px-1.5 py-0.5 rounded-full border ${
                    feat.cloudSupportStatus === "Standard Cloudinary Tier"
                      ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-400"
                      : "bg-amber-500/10 border-amber-500/30 text-amber-700 dark:text-amber-400"
                  }`}
                >
                  {feat.cloudSupportStatus === "Standard Cloudinary Tier" ? "Tier: Standard" : "Add-on Required"}
                </span>
              </div>
              <h4 className="font-serif text-sm font-semibold text-[#1C1814] dark:text-[#F5EFEB] mb-1">
                {feat.name}
              </h4>
              <p className="text-[11px] text-[#6E6255] dark:text-[#A89886] leading-relaxed line-clamp-2">
                {feat.description}
              </p>
            </button>
          );
        })}
      </div>

      {/* Active Tab View */}
      {activeTab === "preview" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Main Visual Display with Interactive Before/After Split */}
          <div className="lg:col-span-8 space-y-3">
            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border-2 border-[#C59B27]/40 shadow-xl bg-[#0C0A09] select-none">
              {/* "AFTER" (Cloudinary Transformed Layer) */}
              <div className="absolute inset-0">
                {isLoadingAi ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#1A1412] text-[#E5C378] space-y-2 z-10">
                    <Loader2 className="w-8 h-8 animate-spin text-[#C59B27]" />
                    <span className="text-xs font-mono">Generating Cloudinary Edge Transformation...</span>
                  </div>
                ) : (
                  <ImageWithFallback
                    key={signedAiUrl || selectedFeature.transformation}
                    src={signedAiUrl || generatedUrl}
                    fallbackSrc={selectedSubject.url}
                    alt={`${selectedSubject.title} Transformed via Cloudinary AI`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 800px"
                    className="object-cover"
                  />
                )}
              </div>

              {/* "BEFORE" (Original Base Layer with Clip Path controlled by slider) */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
              >
                <Image
                  src={selectedSubject.url}
                  alt={`${selectedSubject.title} Original`}
                  fill
                  unoptimized
                  sizes="(max-width: 1024px) 100vw, 800px"
                  className="object-cover"
                />
              </div>

              {/* Split Divider Line */}
              <div
                className="absolute top-0 bottom-0 w-0.5 bg-[#D4AF37] pointer-events-none z-20 shadow-[0_0_10px_rgba(212,175,55,0.8)]"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-[#5B0E1B] border-2 border-[#D4AF37] shadow-lg flex items-center justify-center text-white">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-[#D4AF37]" />
                </div>
              </div>

              {/* Top Labels */}
              <div className="absolute top-3.5 left-3.5 z-10">
                <span className="px-2 py-1 rounded-md bg-black/70 backdrop-blur-xs text-[10px] font-mono text-white/90 border border-white/20">
                  Original Capture
                </span>
              </div>
              <div className="absolute top-3.5 right-3.5 z-10">
                <span className="px-2 py-1 rounded-md bg-[#5B0E1B]/90 backdrop-blur-xs text-[10px] font-mono text-[#D4AF37] border border-[#D4AF37]/40 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Cloudinary {selectedFeature.name}
                </span>
              </div>

              {/* Bottom Scrim & Provenance Bar */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-4 z-10 flex items-end justify-between text-white">
                <div className="space-y-0.5">
                  <p className="font-serif text-base sm:text-lg font-semibold">{selectedSubject.title}</p>
                  <p className="text-[11px] font-mono text-[#E4C987]">{selectedSubject.monumentEpoch}</p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-mono bg-black/60 px-2 py-1 rounded-md border border-white/20 block">
                    {selectedFeature.transformation}
                  </span>
                </div>
              </div>
            </div>

            {/* Slider Control Bar */}
            <div className="flex items-center justify-between gap-4 px-2">
              <span className="text-[10px] font-mono text-[#8C7E72] dark:text-[#A89886]">
                &larr; Slide to inspect original
              </span>
              <input
                type="range"
                min="0"
                max="100"
                value={sliderPosition}
                onChange={(e) => setSliderPosition(Number(e.target.value))}
                className="flex-1 accent-[#5B0E1B] cursor-pointer h-1.5 bg-[#C59B27]/30 rounded-lg"
              />
              <span className="text-[10px] font-mono text-[#8C7E72] dark:text-[#A89886]">
                Inspect AI transformation &rarr;
              </span>
            </div>
          </div>

          {/* Feature Specs & Provenance Panel */}
          <div className="lg:col-span-4 space-y-4 p-4 rounded-2xl bg-white dark:bg-[#1A1613] border border-[#C59B27]/25 shadow-xs">
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#5B0E1B] dark:text-[#E5C378] font-bold block">
                Technical Architecture
              </span>
              <h5 className="font-serif text-lg font-semibold text-[#1C1814] dark:text-[#F5EFEB]">
                {selectedFeature.name}
              </h5>
            </div>

            <p className="text-xs text-[#6E6255] dark:text-[#A89886] leading-relaxed">
              {selectedFeature.description}
            </p>

            {/* Verified Provenance & Attribution Accordion */}
            <div className="p-3 rounded-xl bg-[#FAF8F5] dark:bg-[#120F0D] border border-[#C59B27]/20 space-y-1.5 text-xs">
              <div className="flex items-center gap-1.5 font-semibold text-[#5B0E1B] dark:text-[#E5C378]">
                <Info className="w-3.5 h-3.5 shrink-0" />
                <span>Verified Monument Provenance</span>
              </div>
              <p className="text-[11px] text-[#6E6255] dark:text-[#A89886]">
                <strong>Epoch:</strong> {selectedSubject.monumentEpoch}
              </p>
              <p className="text-[11px] text-[#6E6255] dark:text-[#A89886]">
                <strong>Record Type:</strong> {selectedSubject.provenanceType} ({selectedSubject.documentationDate})
              </p>
              <p className="text-[11px] text-[#6E6255] dark:text-[#A89886]">
                <strong>Attribution:</strong> {selectedSubject.attribution}
              </p>
            </div>

            {/* Cloudinary Add-on & Tier Status Note */}
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/25 space-y-1 text-xs">
              <div className="flex items-center gap-1.5 text-amber-800 dark:text-amber-400 font-semibold text-[11px]">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>Cloudinary Add-on Compatibility:</span>
              </div>
              <p className="text-[11px] text-amber-900/80 dark:text-amber-300/80 leading-relaxed font-sans">
                {selectedFeature.cloudSupportStatus === "Standard Cloudinary Tier"
                  ? "Fully supported across free and production Cloudinary plans via core SDK transformation pipeline."
                  : "Generative AI transformations require the Cloudinary GenAI Add-on enabled on custom accounts; graceful visual preview active."}
              </p>
            </div>

            <div className="space-y-2 pt-2 border-t border-[#C59B27]/15">
              <div className="text-xs font-mono space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-[#8C7E72] dark:text-[#A89886]">
                    Cloudinary Transformation Status:
                  </span>
                  <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    Verified Signed Delivery
                  </span>
                </div>
                <code className="text-[11px] block p-2 rounded-lg bg-[#FAF8F5] dark:bg-[#120F0D] text-[#5B0E1B] dark:text-[#E5C378] border border-[#C59B27]/30 break-all">
                  f_auto,q_auto,w_1200,{selectedFeature.transformation}
                </code>
              </div>
            </div>

            <button
              onClick={() => handleCopy(signedAiUrl || generatedUrl)}
              className="w-full py-2.5 px-3 rounded-xl bg-[#5B0E1B] hover:bg-[#7A1D26] text-white text-xs font-serif uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-xs transition-all cursor-pointer"
            >
              {copiedCode ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedCode ? "Copied Signed URL!" : "Copy Signed Cloudinary URL"}</span>
            </button>
          </div>
        </div>
      )}

      {/* Video Player Tab */}
      {activeTab === "video" && (
        <div className="space-y-4 animate-fade-in">
          <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-[#C59B27]/40 shadow-2xl bg-black">
            <CldVideoPlayer
              id="heritage-video-player"
              width="1920"
              height="1080"
              src="samples/elephants"
              colors={{
                accent: "#D4AF37",
                base: "#5B0E1B",
                text: "#FAF8F5",
              }}
              transformation={{
                crop: "fill",
                quality: "auto",
              }}
            />
          </div>
          <div className="p-4 rounded-2xl bg-white dark:bg-[#1A1613] border border-[#C59B27]/25 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
            <div>
              <span className="text-[#8C5320] dark:text-[#D4AF37] font-bold block text-sm font-serif">
                Gajendra: The Sacred Indian Elephant in Temple Culture (CldVideoPlayer)
              </span>
              <p className="text-xs text-[#6E6255] dark:text-[#A89886] font-sans mt-0.5 max-w-2xl">
                The Asian Elephant (<em>Elephas maximus</em>) is revered across Indian heritage as Airavata, the vahana of Indra, and the emblem of Chola stone architecture and temple processions. Streamed with adaptive bitrate streaming via <code className="font-mono text-[#5B0E1B] dark:text-[#E5C378]">next-cloudinary</code> with royal palette branding.
              </p>
            </div>
            <code className="text-[11px] bg-[#FAF8F5] dark:bg-[#120F0D] px-3 py-1.5 rounded-lg border border-[#C59B27]/30 text-[#5B0E1B] dark:text-[#E5C378]">
              &lt;CldVideoPlayer src=&quot;samples/elephants&quot; colors=&#123;...&#125; /&gt;
            </code>
          </div>
        </div>
      )}

      {/* Code Tab: Shows both Next.js and React AI Starter Kit snippets */}
      {activeTab === "code" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Next.js Starter Kit Snippet */}
            <div className="p-4 rounded-2xl bg-[#0F0D0B] border border-[#C59B27]/30 text-white space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="text-[#E4C987] font-semibold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  Next.js Starter Kit (`next-cloudinary`)
                </span>
                <button
                  onClick={() => handleCopy(nextCloudinaryCodeSnippet)}
                  className="text-[10px] text-white/60 hover:text-white flex items-center gap-1 cursor-pointer"
                >
                  <Copy className="w-3 h-3" />
                  <span>Copy</span>
                </button>
              </div>
              <pre className="text-[11px] text-[#D9CEBF] overflow-x-auto p-2 bg-black/40 rounded-xl leading-relaxed">
                {nextCloudinaryCodeSnippet}
              </pre>
            </div>

            {/* React AI Starter Kit Snippet */}
            <div className="p-4 rounded-2xl bg-[#0F0D0B] border border-[#C59B27]/30 text-white space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="text-[#E4C987] font-semibold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-cyan-400" />
                  React AI Starter Kit (`@cloudinary/react`)
                </span>
                <button
                  onClick={() => handleCopy(reactAiSnippet)}
                  className="text-[10px] text-white/60 hover:text-white flex items-center gap-1 cursor-pointer"
                >
                  <Copy className="w-3 h-3" />
                  <span>Copy</span>
                </button>
              </div>
              <pre className="text-[11px] text-[#D9CEBF] overflow-x-auto p-2 bg-black/40 rounded-xl leading-relaxed">
                {reactAiSnippet}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
