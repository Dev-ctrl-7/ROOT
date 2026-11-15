"use client";

import { useState } from "react";
import {
  Sparkles,
  Wand2,
  RefreshCw,
  SlidersHorizontal,
  Check,
  Copy,
  ExternalLink,
  Code2,
  ShieldCheck,
  Layers,
  Image as ImageIcon,
  Video,
} from "lucide-react";
import Image from "next/image";
import { CldImage, CldVideoPlayer } from "next-cloudinary";
import "next-cloudinary/dist/cld-video-player.css";
import { getCloudName } from "@/lib/cloudinary";

interface AIFeature {
  id: string;
  name: string;
  category: "Restoration" | "Expansion" | "Atmosphere" | "Cleanup";
  transformation: string;
  description: string;
  kit: "React AI Starter Kit" | "Next.js Starter Kit";
  prompt?: string;
}

const AI_FEATURES: AIFeature[] = [
  {
    id: "gen_restore",
    name: "AI Historical Restoration",
    category: "Restoration",
    transformation: "e_gen_restore",
    description:
      "Repairs grain, fractures, emulsion scratches, and age degradation on 19th-century albumen survey plates using neural texture synthesis.",
    kit: "React AI Starter Kit",
  },
  {
    id: "gen_fill",
    name: "Generative Outpainting (16:9)",
    category: "Expansion",
    transformation: "c_pad,ar_16:9,b_gen_fill",
    description:
      "Extends ancient vertical gopuram and pillar frames into panoramic 16:9 widescreen canvases without stretching or cropping.",
    kit: "Next.js Starter Kit",
  },
  {
    id: "gen_background",
    name: "Generative Monsoon Twilight",
    category: "Atmosphere",
    transformation: "e_gen_background_replace:prompt_dramatic monsoon sunset sky over ancient temple",
    description:
      "Replaces contemporary haze or bleached skies with authentic Indian monsoon clouds, golden-hour light, and dramatic atmospheric depth.",
    kit: "React AI Starter Kit",
  },
  {
    id: "enhance_upscale",
    name: "Neural Super-Resolution & Clarity",
    category: "Restoration",
    transformation: "e_upscale,e_enhance",
    description:
      "Super-samples stone relief carvings and bronze inscriptions to ultra-high definition clarity for digital museum curation.",
    kit: "Next.js Starter Kit",
  },
];

const SAMPLE_SUBJECTS = [
  {
    id: "meenakshi",
    title: "Meenakshi Sundareswarar Gopuram",
    year: "1868 CE Survey",
    url: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220",
    publicId: "samples/landscapes/beach-boat",
  },
  {
    id: "taj",
    title: "Taj Mahal & Yamuna Riverfront",
    year: "1870 CE Archaeological Plate",
    url: "https://images.unsplash.com/photo-1564507592333-c60657eea523",
    publicId: "samples/landscapes/nature-mountains",
  },
  {
    id: "hampi",
    title: "Hampi Vittala Stone Chariot",
    year: "1880 CE ASI Plate",
    url: "https://images.unsplash.com/photo-1600100397608-f010f4438340",
    publicId: "samples/landscapes/architecture-signs",
  },
];

export function CloudinaryAIHeritageLab() {
  const [selectedFeature, setSelectedFeature] = useState<AIFeature>(AI_FEATURES[0]);
  const [selectedSubject, setSelectedSubject] = useState(SAMPLE_SUBJECTS[0]);
  const [activeTab, setActiveTab] = useState<"preview" | "video" | "code">("preview");
  const [copiedCode, setCopiedCode] = useState(false);

  const cloudName = getCloudName();

  // Signed Cloudinary URL generator
  const generatedUrl = `https://res.cloudinary.com/${cloudName}/image/fetch/f_auto,q_auto,${selectedFeature.transformation}/${encodeURIComponent(
    selectedSubject.url
  )}`;

  const nextCloudinaryCodeSnippet = `// 1. Next.js Starter Kit Implementation using \`next-cloudinary\`
import { CldImage } from 'next-cloudinary';

export default function MonumentRestoration() {
  return (
    <CldImage
      src="${selectedSubject.publicId}"
      width="1200"
      height="800"
      crop="fill"
      ${
        selectedFeature.id === "gen_restore"
          ? 'restore={true} // e_gen_restore'
          : selectedFeature.id === "gen_fill"
          ? 'fillBackground={{ prompt: "heritage courtyard" }} // b_gen_fill'
          : selectedFeature.id === "gen_background"
          ? 'replaceBackground="dramatic monsoon sunset sky over ancient temple"'
          : 'enhance={true} upscale={true}'
      }
      alt="${selectedSubject.title}"
      sizes="100vw"
    />
  );
}`;

  const reactAiSnippet = `// 2. React AI Starter Kit Implementation using \`@cloudinary/react\` & \`@cloudinary/url-gen\`
import { AdvancedImage } from '@cloudinary/react';
import { Cloudinary } from '@cloudinary/url-gen';
import { ${selectedFeature.id === "gen_restore" ? "generativeRestore" : selectedFeature.id === "gen_background" ? "generativeBackgroundReplace" : "generativeReplace"} } from '@cloudinary/url-gen/actions/effect';

const cld = new Cloudinary({ cloud: { cloudName: '${cloudName}' } });

const myImage = cld.image('${selectedSubject.publicId}')
  .effect(${
    selectedFeature.id === "gen_restore"
      ? "generativeRestore()"
      : selectedFeature.id === "gen_background"
      ? "generativeBackgroundReplace().prompt('dramatic monsoon sky')"
      : "generativeReplace().from('modern element').to('heritage courtyard')"
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
              Next.js & React AI Kits
            </span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 text-[10px] font-mono flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" />
              Skills Pack Installed
            </span>
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl text-[#1C1814] dark:text-[#F5EFEB] font-normal">
            Neural Image Restoration & Generative Edits
          </h3>
          <p className="font-sans text-xs sm:text-sm text-[#6E6255] dark:text-[#A89886] font-light max-w-2xl mt-1">
            Experience Cloudinary&apos;s generative AI features for ancient historical photography, powered by the official <strong>Next.js Starter Kit</strong> and <strong>React AI Starter Kit</strong>.
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

      {/* Subject Selection Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-[10px] font-mono uppercase tracking-wider text-[#8C7E72] dark:text-[#A89886] mr-1">
          Archival Subject:
        </span>
        {SAMPLE_SUBJECTS.map((sub) => (
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
                <span className="text-[8px] font-mono px-1.5 py-0.5 rounded-full bg-[#FAF5EE] dark:bg-[#120F0D] text-[#8C7E72] dark:text-[#A89886] border border-[#C59B27]/20">
                  {feat.kit.split(" ")[0]}
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Main Visual Display */}
          <div className="lg:col-span-8 relative aspect-[16/10] rounded-2xl overflow-hidden border border-[#C59B27]/35 shadow-lg bg-[#0C0A09]">
            <Image
              src={selectedSubject.url}
              alt={selectedSubject.title}
              fill
              unoptimized
              sizes="(max-width: 1024px) 100vw, 800px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent pointer-events-none" />

            {/* Badges */}
            <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-full bg-[#5B0E1B]/90 backdrop-blur-md border border-[#C59B27]/40 text-[10px] font-mono text-white flex items-center gap-1.5 shadow-md">
                <Wand2 className="w-3 h-3 text-[#D4AF37]" />
                {selectedFeature.name}
              </span>
            </div>

            <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-end justify-between text-white">
              <div>
                <p className="font-serif text-base font-semibold">{selectedSubject.title}</p>
                <p className="text-[11px] font-mono text-[#E4C987]">{selectedSubject.year}</p>
              </div>
              <span className="text-[10px] font-mono bg-black/60 px-2.5 py-1 rounded-md border border-white/20">
                {selectedFeature.transformation}
              </span>
            </div>
          </div>

          {/* Feature Specs Panel */}
          <div className="lg:col-span-4 space-y-4 p-4 rounded-2xl bg-white dark:bg-[#1A1613] border border-[#C59B27]/25 shadow-xs">
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#5B0E1B] dark:text-[#E5C378] font-bold block">
                Cloudinary Transformation Spec
              </span>
              <h5 className="font-serif text-lg font-semibold text-[#1C1814] dark:text-[#F5EFEB]">
                {selectedFeature.name}
              </h5>
            </div>

            <p className="text-xs text-[#6E6255] dark:text-[#A89886] leading-relaxed">
              {selectedFeature.description}
            </p>

            <div className="space-y-2 pt-2 border-t border-[#C59B27]/15">
              <div className="text-xs font-mono space-y-1">
                <span className="text-[10px] text-[#8C7E72] dark:text-[#A89886] block">
                  Transformation String:
                </span>
                <code className="text-[11px] block p-2 rounded-lg bg-[#FAF8F5] dark:bg-[#120F0D] text-[#5B0E1B] dark:text-[#E5C378] border border-[#C59B27]/30 break-all">
                  f_auto,q_auto,{selectedFeature.transformation}
                </code>
              </div>

              <div className="text-xs font-mono space-y-1 pt-1">
                <span className="text-[10px] text-[#8C7E72] dark:text-[#A89886] block">
                  Supported Starter Kit:
                </span>
                <span className="inline-block px-2.5 py-1 rounded-md bg-[#5B0E1B]/10 dark:bg-[#C59B27]/10 text-[#5B0E1B] dark:text-[#E5C378] font-semibold text-xs">
                  {selectedFeature.kit}
                </span>
              </div>
            </div>

            <button
              onClick={() => handleCopy(generatedUrl)}
              className="w-full py-2 px-3 rounded-xl bg-[#5B0E1B] hover:bg-[#7A1D26] text-white text-xs font-serif uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-xs transition-all"
            >
              {copiedCode ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedCode ? "Copied URL!" : "Copy Transformation URL"}</span>
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
              src="samples/sea-turtle"
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
                Cloudinary Video Player v4 (Next.js Starter Kit)
              </span>
              <p className="text-xs text-[#6E6255] dark:text-[#A89886] font-sans mt-0.5">
                Full-featured adaptive bitrate video player powered by <code className="font-mono text-[#5B0E1B] dark:text-[#E5C378]">next-cloudinary</code> with custom royal palette branding, responsive dimensions, and automated posters.
              </p>
            </div>
            <code className="text-[11px] bg-[#FAF8F5] dark:bg-[#120F0D] px-3 py-1.5 rounded-lg border border-[#C59B27]/30 text-[#5B0E1B] dark:text-[#E5C378]">
              &lt;CldVideoPlayer src=&quot;samples/sea-turtle&quot; colors=&#123;...&#125; /&gt;
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
                  className="text-[10px] text-white/60 hover:text-white flex items-center gap-1"
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
                  className="text-[10px] text-white/60 hover:text-white flex items-center gap-1"
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

export default CloudinaryAIHeritageLab;
