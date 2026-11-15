"use client";

import { useState, useTransition, useEffect } from "react";
import {
  Mail,
  Download,
  Copy,
  Check,
  Send,
  UploadCloud,
  X,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import confetti from "canvas-confetti";
import { POSTCARD_PRESETS } from "@/lib/cultural-data";
import { PostcardPreset, PostcardFilterType } from "@/lib/types";
import {
  buildPostcardCloudinaryUrl,
  analyzeCloudinaryUrl,
  TransformationBreakdown,
} from "@/lib/cloudinary";
import { downloadImageReliably } from "@/lib/download";
import { downloadPostcardAsPng } from "@/lib/postcard-canvas";
import { useLanguage } from "@/lib/i18n/context";

interface PostcardStudioProps {
  initialRegionId?: string;
  onOpenInspector: () => void;
}

export function PostcardStudio({ initialRegionId, onOpenInspector }: PostcardStudioProps) {
  const { rootGlyph } = useLanguage();
  const [selectedPresetId, setSelectedPresetId] = useState<string>("madurai-dusk");
  const [recipient, setRecipient] = useState<string>("To someone longing for home,");
  const [message, setMessage] = useState<string>(
    "The monsoon just arrived in the central courtyard. The Athangudi tiles feel silky cool under bare feet, and the aroma of roasted star anise and meter coffee fills the house."
  );
  const [sender, setSender] = useState<string>("With love, Ananya");
  const [postmarkCity, setPostmarkCity] = useState<string>("MADURAI • 625 001");
  const [filter, setFilter] = useState<PostcardFilterType>("heritage_sepia");
  const [aspectRatio, setAspectRatio] = useState<"postcard" | "square" | "story">("postcard");

  // Custom user image state
  const [customImageUrl, setCustomImageUrl] = useState<string>("");
  const [isUploadModalOpen, setIsUploadModalOpen] = useState<boolean>(false);
  const [uploadStatus, setUploadStatus] = useState<string>("");

  // Copy feedback & download
  const [copiedUrl, setCopiedUrl] = useState<boolean>(false);
  const [sentSuccess, setSentSuccess] = useState<boolean>(false);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState<boolean>(false);
  const [recipientEmail, setRecipientEmail] = useState<string>("");
  const [isSendingEmail, setIsSendingEmail] = useState<boolean>(false);
  const [emailStatus, setEmailStatus] = useState<{
    success?: boolean;
    configured?: boolean;
    message: string;
    details?: string;
  } | null>(null);
  const [, startTransition] = useTransition();

  useEffect(() => {
    if (initialRegionId) {
      const match = POSTCARD_PRESETS.find((p) => p.regionId === initialRegionId);
      if (match) {
        setSelectedPresetId(match.id);
        setPostmarkCity(match.postmarkCity);
        setMessage(match.defaultMessage);
        setRecipient(match.defaultRecipient);
      }
    }
  }, [initialRegionId]);

  const activePreset: PostcardPreset =
    POSTCARD_PRESETS.find((p) => p.id === selectedPresetId) || POSTCARD_PRESETS[0];

  const currentSourceImage = customImageUrl || activePreset.imageFallback;

  const transformedUrl = buildPostcardCloudinaryUrl({
    imageUrl: currentSourceImage,
    recipient,
    message,
    sender,
    postmarkCity,
    filter,
    aspectRatio,
  });

  const breakdown: TransformationBreakdown[] = analyzeCloudinaryUrl(transformedUrl);

  const handleSelectPreset = (preset: PostcardPreset) => {
    startTransition(() => {
      setSelectedPresetId(preset.id);
      setCustomImageUrl("");
      setPostmarkCity(preset.postmarkCity);
      setRecipient(preset.defaultRecipient);
      setMessage(preset.defaultMessage);
    });
  };

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(transformedUrl);
      setCopiedUrl(true);
      setTimeout(() => setCopiedUrl(false), 2500);
    } catch (err) {
      console.error("Clipboard copy failed", err);
    }
  };

  const handleDownloadPostcard = async () => {
    setIsDownloading(true);
    try {
      const filename = `roots-postcard-${activePreset.regionId}.png`;
      const result = await downloadPostcardAsPng(
        {
          imageUrl: currentSourceImage,
          stateId: activePreset.regionId,
          stateName: activePreset.regionName,
          recipient,
          message,
          sender,
          filter,
          aspectRatio,
        },
        filename
      );

      if (!result.success) {
        await downloadImageReliably(transformedUrl, filename);
      }
    } catch {
      await downloadImageReliably(transformedUrl, `roots-postcard-${activePreset.regionId}.png`);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleSendPostcardSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipientEmail || !recipientEmail.includes("@")) {
      setEmailStatus({
        success: false,
        message: "Please enter a valid recipient email address.",
      });
      return;
    }

    setIsSendingEmail(true);
    setEmailStatus(null);

    try {
      const res = await fetch("/api/postcard/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recipientEmail,
          recipientName: recipient,
          senderName: sender,
          letterMessage: message,
          stateId: activePreset.regionId,
          stateName: activePreset.regionName,
          postmarkCity,
          imageUrl: currentSourceImage,
          filter,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setEmailStatus({
          success: true,
          configured: true,
          message: data.message || "Postcard successfully dispatched!",
        });
        confetti({
          particleCount: 75,
          spread: 70,
          origin: { y: 0.65 },
          colors: ["#e4c987", "#e06d1b", "#f7f4ee", "#b04925"],
        });
      } else {
        setEmailStatus({
          success: false,
          configured: data.configured !== false,
          message: data.error || "Failed to dispatch postcard.",
          details: data.details,
        });
      }
    } catch {
      setEmailStatus({
        success: false,
        message: "Network connection error while contacting postal dispatch service.",
      });
    } finally {
      setIsSendingEmail(false);
    }
  };

  const handleCustomImageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customImageUrl) {
      setIsUploadModalOpen(false);
      setUploadStatus("Custom photograph applied to Cloudinary transformation pipeline.");
      setTimeout(() => setUploadStatus(""), 4000);
    }
  };

  return (
    <section
      id="postcard-studio"
      className="py-28 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto border-t border-[#1c1916]"
    >
      {/* Editorial Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-20">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#bfa052]/30 bg-[#12100e] text-[#e4c987] text-[10px] uppercase tracking-[0.25em] mb-4">
          <Mail className="w-3.5 h-3.5" />
          The Cloudinary Postal Bureau
        </div>
        <h2 className="font-serif text-4xl sm:text-6xl text-[#f7f4ee] font-light tracking-tight mb-4">
          Send a Memory Across Time
        </h2>
        <p className="text-xs sm:text-sm text-[#e7ddcc]/70 font-light max-w-xl mx-auto leading-relaxed">
          Select an authentic Indian cultural setting, write a personal reflection of home,
          and watch Cloudinary dynamically generate, filter, and stamp your custom postcard in real time.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* LEFT COLUMN: The Correspondence Desk */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 sm:p-7 rounded-2xl border border-[#1c1916] bg-[#0f0d0b] space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#1c1916] pb-4">
              <h3 className="font-serif text-xl text-[#f7f4ee] font-normal">
                Correspondence Desk
              </h3>
              <button
                onClick={() => setIsUploadModalOpen(true)}
                className="text-xs text-[#e4c987] hover:text-[#f7f4ee] font-mono flex items-center gap-1.5 underline underline-offset-4 transition-colors"
              >
                <UploadCloud className="w-3.5 h-3.5 text-[#e06d1b]" />
                Upload Heirloom
              </button>
            </div>

            {/* Step 1: Setting Selector */}
            <div>
              <label className="text-[10px] uppercase tracking-[0.2em] text-[#9e8038] font-mono font-bold block mb-2">
                1. Select Cultural Setting
              </label>
              <div className="grid grid-cols-2 gap-2">
                {POSTCARD_PRESETS.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => handleSelectPreset(p)}
                    className={`p-3 rounded-lg text-left text-xs transition-all border flex flex-col justify-between ${
                      selectedPresetId === p.id && !customImageUrl
                        ? "bg-[#1c1916] border-[#bfa052] text-[#e4c987] shadow-md"
                        : "bg-[#12100e] border-[#1c1916] text-[#e7ddcc]/70 hover:border-[#bfa052]/30"
                    }`}
                  >
                    <span className="font-medium block truncate text-[11px]">{p.title}</span>
                    <span className="text-[9px] text-[#9e8038] font-mono block mt-1">{p.regionName}</span>
                  </button>
                ))}
              </div>
              {customImageUrl && (
                <div className="mt-2 p-2 rounded bg-[#141210] border border-[#e06d1b]/50 text-xs text-[#e06d1b] flex items-center justify-between">
                  <span className="truncate">Using custom photograph</span>
                  <button
                    onClick={() => setCustomImageUrl("")}
                    className="text-xs underline hover:text-[#f7f4ee] ml-2 shrink-0"
                  >
                    Reset
                  </button>
                </div>
              )}
            </div>

            {/* Step 2: Recipient Dedication */}
            <div>
              <label className="text-[10px] uppercase tracking-[0.2em] text-[#9e8038] font-mono font-bold block mb-1.5">
                2. Recipient or Dedication
              </label>
              <input
                type="text"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                maxLength={45}
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#141210] border border-[#1c1916] text-[#f7f4ee] text-xs sm:text-sm focus:outline-none focus:border-[#bfa052] transition-colors"
                placeholder="e.g. To my grandparents in Madurai,"
              />
            </div>

            {/* Step 3: Message / Memory */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-[10px] uppercase tracking-[0.2em] text-[#9e8038] font-mono font-bold">
                  3. A Memory of Home
                </label>
                <span className="text-[10px] text-[#e7ddcc]/40 font-mono">
                  {message.length}/150
                </span>
              </div>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                maxLength={150}
                rows={3}
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#141210] border border-[#1c1916] text-[#f7f4ee] text-xs sm:text-sm focus:outline-none focus:border-[#bfa052] leading-relaxed resize-none font-serif transition-colors"
                placeholder="Describe a scent, a rain shower, a taste, or someone you miss..."
              />
            </div>

            {/* Step 4: Sender */}
            <div>
              <label className="text-[10px] uppercase tracking-[0.2em] text-[#9e8038] font-mono font-bold block mb-1.5">
                4. Sign Your Postcard
              </label>
              <input
                type="text"
                value={sender}
                onChange={(e) => setSender(e.target.value)}
                maxLength={35}
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#141210] border border-[#1c1916] text-[#f7f4ee] text-xs sm:text-sm focus:outline-none focus:border-[#bfa052] transition-colors"
                placeholder="e.g. With love, Anand"
              />
            </div>

            {/* Step 5: Postmark City */}
            <div>
              <label className="text-[10px] uppercase tracking-[0.2em] text-[#9e8038] font-mono font-bold block mb-1.5">
                5. Postal Cancellation Origin
              </label>
              <select
                value={postmarkCity}
                onChange={(e) => setPostmarkCity(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#141210] border border-[#1c1916] text-[#f7f4ee] text-xs sm:text-sm focus:outline-none focus:border-[#bfa052] transition-colors cursor-pointer"
              >
                <option value="MADURAI • 625 001">MADURAI • 625 001</option>
                <option value="KARAIKUDI • 630 001">KARAIKUDI (CHETTINAD) • 630 001</option>
                <option value="THANJAVUR • 613 001">THANJAVUR • 613 001</option>
                <option value="OOTY • 643 001">OOTY (NILGIRIS) • 643 001</option>
                <option value="CHENNAI • 600 001">CHENNAI CENTRAL • 600 001</option>
              </select>
            </div>

            {/* Step 6: Cloudinary Filter Switcher */}
            <div>
              <label className="text-[10px] uppercase tracking-[0.2em] text-[#9e8038] font-mono font-bold block mb-1.5">
                6. Cloudinary Heritage Filter
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "heritage_sepia", name: "Sepia 70", param: "e_sepia:70" },
                  { id: "golden_hour", name: "Golden Sun", param: "e_sat:25" },
                  { id: "temple_dusk", name: "Temple Dusk", param: "e_art:incognito" },
                  { id: "monochrome", name: "Silver B&W", param: "e_grayscale" },
                  { id: "none", name: "Natural", param: "f_auto, q_auto" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setFilter(item.id as PostcardFilterType)}
                    className={`p-2 rounded-lg text-xs font-mono text-center border transition-all ${
                      filter === item.id
                        ? "bg-[#1c1916] border-[#bfa052] text-[#e4c987] shadow-sm"
                        : "bg-[#141210] border-[#1c1916] text-[#e7ddcc]/60 hover:text-[#f7f4ee]"
                    }`}
                  >
                    <span className="block font-sans font-medium text-[11px] truncate">
                      {item.name}
                    </span>
                    <span className="text-[9px] text-[#9e8038]">{item.param}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 7: Aspect Ratio */}
            <div>
              <label className="text-[10px] uppercase tracking-[0.2em] text-[#9e8038] font-mono font-bold block mb-1.5">
                7. Aspect Ratio & Crop
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "postcard", label: "Postcard 16:9" },
                  { id: "square", label: "Square 1:1" },
                  { id: "story", label: "Story 9:16" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setAspectRatio(item.id as "postcard" | "square" | "story")}
                    className={`py-2 px-1 rounded-lg text-xs font-medium text-center border transition-all ${
                      aspectRatio === item.id
                        ? "bg-[#1c1916] border-[#bfa052] text-[#e4c987]"
                        : "bg-[#141210] border-[#1c1916] text-[#e7ddcc]/60 hover:text-[#f7f4ee]"
                    }`}
                  >
                    <span className="block text-[11px]">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: The Physical Postcard Presentation Canvas */}
        <div className="lg:col-span-7 space-y-6">
          <div className="relative rounded-2xl overflow-hidden border-2 border-[#bfa052]/30 bg-[#0f0d0b] p-4 sm:p-6 shadow-2xl">
            {/* The Actual Rendered Card */}
            <div
              className={`relative w-full rounded-xl overflow-hidden border border-[#1c1916] transition-all duration-500 shadow-2xl ${
                aspectRatio === "postcard"
                  ? "aspect-[16/9]"
                  : aspectRatio === "square"
                  ? "aspect-square max-w-[520px] mx-auto"
                  : "aspect-[9/16] max-w-[360px] mx-auto"
              }`}
            >
              {/* Cloudinary Transformed Image */}
              <Image
                src={transformedUrl}
                alt="Personalized Cloudinary Cultural Postcard"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover"
              />

              {/* Scrim Overlay for Typographic Contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#090807]/95 via-[#090807]/35 to-black/20 pointer-events-none" />

              {/* Top Left: Cancellation Header */}
              <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-10">
                <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.25em] text-[#e4c987] font-semibold drop-shadow-md">
                  POSTCARD FROM INDIA &bull; {postmarkCity}
                </span>
              </div>

              {/* Top Right: Postage Stamp & Postmark Rubber Cancel */}
              <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 flex items-center gap-2.5">
                {/* Cancellation Circle */}
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-dashed border-[#e4c987]/80 flex flex-col items-center justify-center text-[7px] sm:text-[8px] font-mono text-[#e4c987] uppercase tracking-tighter text-center leading-none select-none rotate-[-10deg] bg-black/40 backdrop-blur-xs">
                  <span>POST</span>
                  <span className="font-bold my-0.5">INDIA</span>
                  <span>{new Date().getFullYear()}</span>
                </div>

                {/* Perforated Stamp */}
                <div className="w-12 h-16 sm:w-14 sm:h-18 bg-[#f3ede2] text-[#090807] p-1.5 rounded-xs shadow-lg flex flex-col justify-between border border-dashed border-[#9e8038] rotate-[2deg] select-none">
                  <div className="text-[6px] font-serif uppercase tracking-wider font-bold text-center border-b border-[#9e8038]/30 pb-0.5">
                    {activePreset?.title.split(" ")[0] || "INDIA"}
                  </div>
                  <div className="text-center font-serif text-base sm:text-lg leading-none font-bold text-[#b04925]">
                    {rootGlyph}
                  </div>
                  <div className="text-[6px] font-mono text-center font-semibold text-[#903515]">
                    HERITAGE
                  </div>
                </div>
              </div>

              {/* Bottom Body Content */}
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 z-10 space-y-1.5">
                <h4 className="font-serif text-base sm:text-2xl text-[#f7f4ee] font-medium tracking-tight drop-shadow-md">
                  {recipient}
                </h4>

                <p className="font-serif text-xs sm:text-sm text-[#e7ddcc]/95 italic leading-relaxed max-w-lg drop-shadow-sm">
                  &ldquo;{message}&rdquo;
                </p>

                <div className="pt-1 flex items-center justify-between">
                  <span className="text-xs sm:text-sm font-sans font-medium text-[#e4c987] drop-shadow-sm">
                    — {sender}
                  </span>
                  <span className="text-[9px] text-[#e7ddcc]/60 font-mono">
                    Cloudinary Dynamic Synthesis
                  </span>
                </div>
              </div>
            </div>

            {/* Actions Bar */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#1c1916]">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleDownloadPostcard}
                  disabled={isDownloading}
                  className="px-4 py-2.5 rounded-lg bg-[#bfa052] hover:bg-[#e4c987] text-[#090807] text-xs uppercase tracking-wider font-medium flex items-center gap-1.5 transition-colors shadow-md shadow-[#bfa052]/20 cursor-pointer disabled:opacity-50"
                >
                  <Download className="w-3.5 h-3.5" />
                  {isDownloading ? "Downloading..." : "Download Postcard"}
                </button>
                <button
                  onClick={() => setIsEmailModalOpen(true)}
                  className="px-4 py-2.5 rounded-lg bg-[#e06d1b] hover:bg-[#f28b38] text-[#f7f4ee] text-xs uppercase tracking-wider font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  Dispatch by Email
                </button>
              </div>

              <button
                onClick={handleCopyUrl}
                className="px-3.5 py-2.5 rounded-lg border border-[#1c1916] bg-[#12100e] hover:border-[#bfa052]/40 text-xs text-[#e7ddcc] flex items-center gap-1.5 transition-colors"
                title="Copy Direct Cloudinary Transformed URL"
              >
                {copiedUrl ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied URL!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[#e4c987]" />
                    <span>Copy Cloudinary URL</span>
                  </>
                )}
              </button>
            </div>

            {/* Success Notification */}
            {sentSuccess && (
              <div className="mt-3 p-3 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-emerald-200 text-xs flex items-center gap-2 animate-fade-in">
                <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
                Postcard generated and stamped! Your memory is immortalized in the ROOTS registry.
              </div>
            )}
          </div>

          {/* CLOUDINARY TRANSFORMATION PIPELINE INSPECTION BOX */}
          <div className="p-5 rounded-2xl border border-[#1c1916] bg-[#0f0d0b] space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#e06d1b] animate-ping" />
                <h4 className="font-mono text-xs uppercase tracking-wider text-[#e4c987] font-semibold">
                  Live Cloudinary Transformation Pipeline
                </h4>
              </div>
              <button
                onClick={onOpenInspector}
                className="text-[10px] text-[#9e8038] hover:text-[#e4c987] underline underline-offset-2 font-mono flex items-center gap-1"
              >
                Inspect All Architecture &rarr;
              </button>
            </div>

            {/* Full Transformed URL Display */}
            <div className="p-3 rounded-lg bg-[#141210] border border-[#1c1916] font-mono text-[11px] text-[#e7ddcc]/80 break-all select-all flex items-start justify-between gap-3">
              <span className="leading-relaxed">{transformedUrl}</span>
              <a
                href={transformedUrl}
                target="_blank"
                rel="noreferrer"
                className="shrink-0 text-[#e4c987] hover:text-[#f7f4ee] p-1"
                title="Open Cloudinary URL directly in new tab"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Breakdown Badges */}
            <div className="flex flex-wrap gap-2">
              {breakdown.map((item, idx) => (
                <div
                  key={idx}
                  className="px-2.5 py-1 rounded-md bg-[#12100e] border border-[#bfa052]/20 text-[10px] font-mono text-[#e4c987] flex items-center gap-1.5"
                  title={item.explanation}
                >
                  <span className="text-[#9e8038] font-sans text-[9px]">{item.category}:</span>
                  <span className="font-semibold">{item.parameter}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* UPLOAD HEIRLOOM MODAL */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="bg-[#0f0d0b] border border-[#bfa052]/40 rounded-2xl p-6 sm:p-8 max-w-lg w-full space-y-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-xl text-[#f7f4ee] flex items-center gap-2">
                <UploadCloud className="w-5 h-5 text-[#e4c987]" />
                Upload Heirloom Photo of Home
              </h3>
              <button
                onClick={() => setIsUploadModalOpen(false)}
                className="text-[#e7ddcc]/60 hover:text-[#f7f4ee] p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-[#e7ddcc]/70 leading-relaxed font-light">
              Add your photograph of home (ancestral home, village street, heirloom craft, or family
              cooking). Cloudinary will automatically optimize, apply smart crop gravity, and overlay
              your custom message.
            </p>

            <form onSubmit={handleCustomImageSubmit} className="space-y-4">
              <div>
                <label className="text-[10px] uppercase tracking-wider text-[#9e8038] font-mono font-bold block mb-1.5">
                  Direct Image URL (e.g. Unsplash, Wikimedia, or hosted file)
                </label>
                <input
                  type="url"
                  value={customImageUrl}
                  onChange={(e) => setCustomImageUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  required
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#141210] border border-[#1c1916] text-[#f7f4ee] text-xs focus:outline-none focus:border-[#bfa052]"
                />
              </div>

              <div className="p-3 rounded-lg bg-[#141210] border border-[#1c1916] text-[11px] text-[#e7ddcc]/60 font-mono">
                <span className="text-[#e4c987] font-bold block mb-1">Signed Uploads Available:</span>
                Backend route <code className="text-[#e06d1b]">/api/cloudinary/sign</code> generates
                secure signatures for direct Cloudinary upload when API credentials are configured.
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsUploadModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-[#1c1916] text-xs text-[#e7ddcc]/70 hover:text-[#f7f4ee]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-[#bfa052] hover:bg-[#e4c987] text-[#090807] text-xs uppercase tracking-wider font-semibold transition-colors"
                >
                  Apply To Postcard
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EMAIL DISPATCH MODAL */}
      {isEmailModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="bg-[#0f0d0b] border border-[#bfa052]/40 rounded-2xl p-6 sm:p-8 max-w-lg w-full space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#1c1916] pb-3">
              <h3 className="font-serif text-xl text-[#f7f4ee] flex items-center gap-2">
                <Mail className="w-5 h-5 text-[#e4c987]" />
                Dispatch Postcard via Email
              </h3>
              <button
                onClick={() => {
                  setIsEmailModalOpen(false);
                  setEmailStatus(null);
                }}
                className="text-[#e7ddcc]/60 hover:text-[#f7f4ee] p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-[#e7ddcc]/80 leading-relaxed font-light">
              Send this personalized cultural postcard and letter from <strong>{activePreset.regionName}</strong> directly to a loved one&apos;s inbox.
            </p>

            <form onSubmit={handleSendPostcardSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] font-mono text-[#e4c987] uppercase tracking-wider mb-1.5">
                  Recipient Email Address
                </label>
                <input
                  type="email"
                  value={recipientEmail}
                  onChange={(e) => setRecipientEmail(e.target.value)}
                  placeholder="recipient@example.com"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#1c1916] bg-[#141210] text-[#f7f4ee] placeholder-[#e7ddcc]/30 text-xs focus:outline-none focus:border-[#bfa052]"
                />
              </div>

              {emailStatus && (
                <div
                  className={`p-3.5 rounded-xl border text-xs space-y-1 ${
                    emailStatus.success
                      ? "bg-emerald-950/60 border-emerald-500/40 text-emerald-200"
                      : emailStatus.configured === false
                      ? "bg-amber-950/50 border-amber-500/40 text-amber-200"
                      : "bg-red-950/60 border-red-500/40 text-red-200"
                  }`}
                >
                  <p className="font-semibold">{emailStatus.message}</p>
                  {emailStatus.details && (
                    <p className="text-[11px] opacity-90 leading-relaxed font-sans">{emailStatus.details}</p>
                  )}
                </div>
              )}

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsEmailModalOpen(false);
                    setEmailStatus(null);
                  }}
                  className="px-4 py-2 rounded-lg border border-[#1c1916] text-xs text-[#e7ddcc]/70 hover:text-[#f7f4ee] cursor-pointer"
                >
                  Close
                </button>
                <button
                  type="submit"
                  disabled={isSendingEmail}
                  className="px-5 py-2 rounded-lg bg-[#e06d1b] hover:bg-[#f28b38] text-white text-xs uppercase tracking-wider font-semibold transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  {isSendingEmail ? "Dispatching..." : "Send Postcard"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
