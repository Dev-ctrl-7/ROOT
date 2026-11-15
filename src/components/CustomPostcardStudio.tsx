"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ALL_INDIAN_STATES } from "@/lib/states-data";
import { buildPostcardCloudinaryUrl } from "@/lib/cloudinary";
import { downloadImageReliably } from "@/lib/download";
import { useLanguage } from "@/lib/i18n/context";
import {
  Sparkles,
  Camera,
  Upload,
  Mail,
  Send,
  Download,
  Copy,
  Check,
  RotateCw,
  RefreshCw,
  Stamp,
  Feather,
  MapPin,
  CheckCircle2,
  ExternalLink,
  AlertTriangle,
} from "lucide-react";
import confetti from "canvas-confetti";

interface CustomPostcardStudioProps {
  onOpenInspector: () => void;
}

const AESTHETIC_GALLERY = [
  {
    id: "amber-fort",
    title: "Amer Fort Court",
    region: "Rajasthan",
    url: "https://images.unsplash.com/photo-1599661046289-e31897846e41?q=85&w=1200&auto=format&fit=crop",
  },
  {
    id: "madurai-gopuram",
    title: "Meenakshi Gopuram",
    region: "Tamil Nadu",
    url: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=85&w=1200&auto=format&fit=crop",
  },
  {
    id: "kerala-backwaters",
    title: "Vembanad Backwaters",
    region: "Kerala",
    url: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=85&w=1200&auto=format&fit=crop",
  },
  {
    id: "taj-sandstone",
    title: "Taj Mahal Mist",
    region: "Uttar Pradesh",
    url: "https://images.unsplash.com/photo-1564507592333-c60657eea523?q=85&w=1200&auto=format&fit=crop",
  },
  {
    id: "dal-lake",
    title: "Dal Lake Shikara",
    region: "Kashmir",
    url: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?q=85&w=1200&auto=format&fit=crop",
  },
  {
    id: "pangong-tso",
    title: "Pangong Tso",
    region: "Ladakh",
    url: "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?q=85&w=1200&auto=format&fit=crop",
  },
  {
    id: "hampi-chariot",
    title: "Hampi Stone Chariot",
    region: "Karnataka",
    url: "https://images.unsplash.com/photo-1600100397608-f010f443a948?q=85&w=1200&auto=format&fit=crop",
  },
  {
    id: "golden-temple",
    title: "Harmandir Sahib",
    region: "Punjab",
    url: "https://images.unsplash.com/photo-1588099768531-a72d4a198538?q=85&w=1200&auto=format&fit=crop",
  },
];

const FILTERS = [
  { id: "heritage_sepia", name: "1890 Sepia Halide", tag: "e_sepia:80,e_vignette:25" },
  { id: "monsoon_teal", name: "Monsoon Peacock", tag: "e_tint:50:0A4642,e_contrast:15" },
  { id: "desert_gold", name: "Royal Gold", tag: "e_tint:50:C59B27,e_contrast:15" },
  { id: "burgundy_inferno", name: "Burgundy Velvet", tag: "e_tint:55:5B0E1B,e_contrast:20" },
  { id: "none", name: "Natural Editorial", tag: "" },
];

export function CustomPostcardStudio({ onOpenInspector }: CustomPostcardStudioProps) {
  const { rootGlyph } = useLanguage();

  // State
  const [selectedPhotoUrl, setSelectedPhotoUrl] = useState<string>(AESTHETIC_GALLERY[0].url);
  const [selectedStateId, setSelectedStateId] = useState<string>("tamil-nadu");
  const [filter, setFilter] = useState<string>("heritage_sepia");
  const [aspectRatio, setAspectRatio] = useState<"postcard" | "square" | "story" | "landscape">("postcard");
  const [activeTab, setActiveTab] = useState<"gallery" | "camera" | "upload" | "pinterest">("gallery");
  const [pinterestInputUrl, setPinterestInputUrl] = useState<string>("");
  const [pinterestError, setPinterestError] = useState<string>("");
  const [pinterestSuccess, setPinterestSuccess] = useState<string>("");
  const [imageLoadError, setImageLoadError] = useState<boolean>(false);
  const [signedPostcardUrl, setSignedPostcardUrl] = useState<string>("");
  const [uploadNotice, setUploadNotice] = useState<{
    type: "success" | "info" | "warning";
    message: string;
  } | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  // Sign Cloudinary fetch URL whenever photo or color grade filter changes
  useEffect(() => {
    let isMounted = true;
    setImageLoadError(false);

    let w = 1200;
    let h = 750;
    if (aspectRatio === "square") { w = 1000; h = 1000; }
    else if (aspectRatio === "story") { w = 800; h = 1200; }
    else if (aspectRatio === "landscape") { w = 1200; h = 675; }

    const activeFilterObj = FILTERS.find((f) => f.id === filter);
    const filterEffect = activeFilterObj?.tag ? `,${activeFilterObj.tag}` : "";
    const transformation = `f_auto,q_auto,c_fill,g_auto,w_${w},h_${h}${filterEffect}`;

    if (selectedPhotoUrl && selectedPhotoUrl.startsWith("http")) {
      fetch(
        `/api/cloudinary/sign-fetch?transformation=${encodeURIComponent(
          transformation
        )}&sourceUrl=${encodeURIComponent(selectedPhotoUrl)}`
      )
        .then((res) => res.json())
        .then((data) => {
          if (isMounted && data.url) {
            setSignedPostcardUrl(data.url);
          }
        })
        .catch(() => {});
    } else {
      setSignedPostcardUrl("");
    }

    return () => {
      isMounted = false;
    };
  }, [selectedPhotoUrl, filter, aspectRatio]);

  const handleLoadPinterestUrl = () => {
    const url = pinterestInputUrl.trim();
    if (!url) return;
    setPinterestError("");
    setPinterestSuccess("");

    // Check if user pasted a pin.it shortlink or a pinterest.com pin page link (these are HTML web pages, not image files)
    if (url.includes("pin.it") || (url.includes("pinterest.com") && !url.includes("i.pinimg.com"))) {
      setPinterestError("pin_page_detected");
      return;
    }

    // Direct image URL provided
    setSelectedPhotoUrl(url);
    setImageLoadError(false);
    setPinterestSuccess("Pinterest direct image loaded successfully!");
  };

  // Letter content
  const [recipientName, setRecipientName] = useState<string>("To someone longing for home,");
  const [letterMessage, setLetterMessage] = useState<string>(
    "The afternoon rain has just kissed the courtyard tiles. The scent of red soil and jasmine is carried by the breeze, reminding me of our roots."
  );
  const [senderName, setSenderName] = useState<string>("With love, A traveler");
  const [recipientEmail, setRecipientEmail] = useState<string>("");

  // Camera state
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Mail sending & download state
  const [isSending, setIsSending] = useState<boolean>(false);
  const [sendSuccess, setSendSuccess] = useState<boolean>(false);
  const [sendError, setSendError] = useState<string>("");
  const [sendErrorDetails, setSendErrorDetails] = useState<string>("");
  const [sendIsUnconfigured, setSendIsUnconfigured] = useState<boolean>(false);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  // Selected State details for postal stamp
  const selectedState = ALL_INDIAN_STATES.find((s) => s.id === selectedStateId) || ALL_INDIAN_STATES[0];
  const postmarkCity = `${selectedState.atlas.capital.toUpperCase()} • INDIA`;

  // Build Cloudinary URL
  const transformedUrl = buildPostcardCloudinaryUrl({
    imageUrl: selectedPhotoUrl,
    recipient: recipientName,
    message: letterMessage,
    sender: senderName,
    stateId: selectedState.id,
    stateName: selectedState.name,
    nativeStateName: selectedState.nativeName,
    postmarkCity,
    filter: filter as any,
    aspectRatio,
  });

  // Camera Handlers
  const startCamera = async () => {
    try {
      setIsCameraActive(true);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch {
      alert("Unable to access camera. Please check browser permissions.");
      setIsCameraActive(false);
    }
  };

  const handleMediaUpload = async (fileOrBlob: File | Blob) => {
    // 1. Client file size check (10MB limit)
    if (fileOrBlob.size > 10 * 1024 * 1024) {
      setUploadNotice({
        type: "warning",
        message: "File exceeds 10MB size limit. Please choose a smaller photo.",
      });
      return;
    }

    setIsUploading(true);
    setUploadNotice({ type: "info", message: "Connecting to Cloudinary Upload API..." });

    try {
      // 2. Request secure signature from server
      const signRes = await fetch("/api/cloudinary/sign", { method: "POST" });
      const signData = await signRes.json();

      if (signRes.ok && signData.authenticated) {
        // 3. Attempt signed upload to Cloudinary
        const formData = new FormData();
        formData.append("file", fileOrBlob);
        formData.append("api_key", signData.apiKey);
        formData.append("timestamp", String(signData.timestamp));
        formData.append("signature", signData.signature);
        formData.append("folder", signData.folder);
        formData.append("allowed_formats", signData.allowedFormats);
        formData.append("tags", signData.tags);

        const uploadRes = await fetch(
          `https://api.cloudinary.com/v1_1/${signData.cloudName}/image/upload`,
          { method: "POST", body: formData }
        );

        if (uploadRes.ok) {
          const uploadData = await uploadRes.json();
          setSelectedPhotoUrl(uploadData.secure_url);
          setUploadNotice({
            type: "success",
            message: "Uploaded and registered in Cloudinary Media Library.",
          });
          setIsUploading(false);
          return;
        }
      }

      // 4. Honest graceful fallback when API key lacks 'create' action permissions
      const localUrl = URL.createObjectURL(fileOrBlob);
      setSelectedPhotoUrl(localUrl);
      setUploadNotice({
        type: "info",
        message:
          "Cloudinary credentials operate in Read/Transform mode (actions=['create'] restricted). Switched to Local Photographic Stage for interactive preview & composite export.",
      });
    } catch {
      const localUrl = URL.createObjectURL(fileOrBlob);
      setSelectedPhotoUrl(localUrl);
      setUploadNotice({
        type: "info",
        message: "Switched to Local Photographic Stage for interactive preview & composite export.",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const capturePhoto = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth || 800;
    canvas.height = videoRef.current.videoHeight || 600;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      stopCamera();
      canvas.toBlob((blob) => {
        if (blob) handleMediaUpload(blob);
      }, "image/jpeg", 0.92);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  // File Upload Handler
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleMediaUpload(file);
    }
  };

  // Mail Dispatch via Cloudinary API
  const handleSendMail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipientEmail || !recipientEmail.includes("@")) {
      setSendError("Please enter a valid recipient email address.");
      return;
    }

    setIsSending(true);
    setSendError("");
    setSendErrorDetails("");
    setSendIsUnconfigured(false);
    setSendSuccess(false);

    try {
      const res = await fetch("/api/postcard/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recipientEmail,
          recipientName,
          senderName,
          letterMessage,
          stateId: selectedState.id,
          stateName: selectedState.name,
          postmarkCity,
          imageUrl: selectedPhotoUrl,
          filter,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSendSuccess(true);
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#C59B27", "#5B0E1B", "#FAF8F5", "#D4AF37"],
        });
      } else {
        setSendError(data.error || "Failed to dispatch postcard.");
        if (data.details) setSendErrorDetails(data.details);
        if (data.configured === false) setSendIsUnconfigured(true);
      }
    } catch {
      setSendError("Network error. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  const handleDownloadPostcard = async () => {
    setIsDownloading(true);
    try {
      // Generate authentic high-res composite postcard with borders, postmarks, and stamps
      const canvas = document.createElement("canvas");
      let w = 1200;
      let h = 750;
      if (aspectRatio === "square") {
        w = 1000;
        h = 1000;
      } else if (aspectRatio === "story") {
        w = 800;
        h = 1200;
      } else if (aspectRatio === "landscape") {
        w = 1200;
        h = 675;
      }

      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas context failed");

      // Draw background image
      const img = new (window as any).Image();
      img.crossOrigin = "anonymous";
      img.src = selectedPhotoUrl;

      await new Promise((resolve) => {
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
      });

      if (img.width > 0) {
        // Draw image scaled to cover canvas
        const scale = Math.max(w / img.width, h / img.height);
        const nw = img.width * scale;
        const nh = img.height * scale;
        const nx = (w - nw) / 2;
        const ny = (h - nh) / 2;
        ctx.drawImage(img, nx, ny, nw, nh);
      } else {
        ctx.fillStyle = "#1A1412";
        ctx.fillRect(0, 0, w, h);
      }

      // Apply filter tint layer if applicable
      if (filter === "heritage_sepia") {
        ctx.fillStyle = "rgba(122, 88, 53, 0.45)";
        ctx.fillRect(0, 0, w, h);
      } else if (filter === "monsoon_teal") {
        ctx.fillStyle = "rgba(10, 70, 66, 0.4)";
        ctx.fillRect(0, 0, w, h);
      } else if (filter === "desert_gold") {
        ctx.fillStyle = "rgba(197, 155, 39, 0.35)";
        ctx.fillRect(0, 0, w, h);
      } else if (filter === "burgundy_inferno") {
        ctx.fillStyle = "rgba(91, 14, 27, 0.45)";
        ctx.fillRect(0, 0, w, h);
      }

      // Draw dark gradient scrim at bottom
      const gradient = ctx.createLinearGradient(0, h * 0.4, 0, h);
      gradient.addColorStop(0, "rgba(0,0,0,0)");
      gradient.addColorStop(1, "rgba(15,10,8,0.92)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, h * 0.35, w, h * 0.65);

      // Gold border
      ctx.strokeStyle = "#D4AF37";
      ctx.lineWidth = 4;
      ctx.strokeRect(16, 16, w - 32, h - 32);

      // Header text
      ctx.font = "bold 16px 'Courier New', monospace";
      ctx.fillStyle = "#E5C378";
      ctx.fillText(`POSTCARD FROM ${selectedState.name.toUpperCase()} • ${selectedState.nativeName}`, 36, 44);
      ctx.textAlign = "right";
      ctx.fillText(`DISPATCH: ${postmarkCity}`, w - 36, 44);

      // Recipient
      ctx.textAlign = "left";
      ctx.font = "bold 26px 'Georgia', serif";
      ctx.fillStyle = "#FAF7F0";
      ctx.fillText(recipientName, 44, h - 140);

      // Message
      ctx.font = "italic 18px 'Arial', sans-serif";
      ctx.fillStyle = "#EFE8DC";
      const words = letterMessage.split(" ");
      let line = "";
      let lineY = h - 100;
      for (const word of words) {
        const testLine = line + word + " ";
        if (ctx.measureText(testLine).width > w - 280) {
          ctx.fillText(line, 44, lineY);
          line = word + " ";
          lineY += 24;
          if (lineY > h - 45) break;
        } else {
          line = testLine;
        }
      }
      ctx.fillText(line, 44, lineY);

      // Sender
      ctx.font = "bold 16px 'Georgia', serif";
      ctx.fillStyle = "#D4AF37";
      ctx.fillText(`— ${senderName}`, 44, h - 36);

      // Stamp badge (Right bottom)
      ctx.fillStyle = "rgba(91, 14, 27, 0.9)";
      ctx.fillRect(w - 180, h - 140, 140, 95);
      ctx.strokeStyle = "#D4AF37";
      ctx.lineWidth = 2;
      ctx.strokeRect(w - 180, h - 140, 140, 95);
      ctx.fillStyle = "#FAF8F5";
      ctx.font = "bold 11px 'Courier New', monospace";
      ctx.textAlign = "center";
      ctx.fillText("INDIA POST", w - 110, h - 118);
      ctx.font = "bold 13px 'Georgia', serif";
      ctx.fillStyle = "#E5C378";
      ctx.fillText(selectedState.name.substring(0, 12), w - 110, h - 94);
      ctx.font = "10px 'Courier New', monospace";
      ctx.fillStyle = "#D4AF37";
      ctx.fillText("₹ 5.00 HERITAGE", w - 110, h - 68);

      // Trigger download
      canvas.toBlob((blob) => {
        if (blob) {
          const dlUrl = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = dlUrl;
          a.download = `roots-postcard-${selectedState.id}.png`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(dlUrl);
        }
      }, "image/png");
    } catch {
      await downloadImageReliably(signedPostcardUrl || transformedUrl, `roots-postcard-${selectedState.id}.png`);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleCopyPostcardUrl = () => {
    navigator.clipboard.writeText(signedPostcardUrl || transformedUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <section id="custom-postcard-studio" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Editorial Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2.5">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#C59B27]/40 bg-[#FAF8F5] dark:bg-[#1A1613] text-[#5B0E1B] dark:text-[#E5C378] text-[10px] uppercase tracking-[0.22em] font-mono shadow-2xs">
          <Mail className="w-3 h-3 text-[#C59B27] dark:text-[#D4AF37]" />
          Postal Heritage Atelier &bull; Cloudinary
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl text-[#1C1814] dark:text-[#F5EFEB] font-normal tracking-tight">
          Craft & Send a Cultural Postcard
        </h2>
        <p className="font-sans text-xs sm:text-sm text-[#6E6255] dark:text-[#A89886] max-w-lg mx-auto leading-relaxed font-light">
          Choose an aesthetic Indian landmark or snap your own photo, affix a state stamp from all 36 territories, compose your intimate letter, and dispatch via email.
        </p>
      </div>

      {/* Balanced 2-Column Atelier Layout - Zero Wasted Space */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Creator Workshop (Canvas + Stamp + Letter) */}
        <div className="lg:col-span-6 space-y-4">
          {/* Card 1: Photographic Canvas */}
          <div className="p-4 rounded-2xl bg-white dark:bg-[#1A1613] border border-[#C59B27]/25 dark:border-[#C59B27]/20 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#5B0E1B] dark:text-[#E5C378] font-bold">
                1. Photographic Canvas
              </span>
              <div className="flex items-center gap-1 text-[11px] font-sans flex-wrap justify-end">
                <button
                  onClick={() => {
                    stopCamera();
                    setActiveTab("gallery");
                  }}
                  className={`py-1 px-2 rounded-lg border transition-all ${
                    activeTab === "gallery"
                      ? "bg-[#5B0E1B] text-white border-[#5B0E1B] font-medium"
                      : "bg-[#FAF8F5] dark:bg-[#14110E] hover:bg-white dark:hover:bg-[#201C18] text-[#423A32] dark:text-[#D5C7B8] border-[#C59B27]/20"
                  }`}
                >
                  Gallery
                </button>
                <button
                  onClick={() => {
                    stopCamera();
                    setActiveTab("pinterest");
                  }}
                  className={`py-1 px-2 rounded-lg border transition-all ${
                    activeTab === "pinterest"
                      ? "bg-[#5B0E1B] text-white border-[#5B0E1B] font-medium"
                      : "bg-[#FAF8F5] dark:bg-[#14110E] hover:bg-white dark:hover:bg-[#201C18] text-[#423A32] dark:text-[#D5C7B8] border-[#C59B27]/20"
                  }`}
                >
                  Pinterest
                </button>
                <button
                  onClick={() => {
                    setActiveTab("camera");
                    startCamera();
                  }}
                  className={`py-1 px-2 rounded-lg border transition-all flex items-center gap-1 ${
                    activeTab === "camera"
                      ? "bg-[#5B0E1B] text-white border-[#5B0E1B] font-medium"
                      : "bg-[#FAF8F5] dark:bg-[#14110E] hover:bg-white dark:hover:bg-[#201C18] text-[#423A32] dark:text-[#D5C7B8] border-[#C59B27]/20"
                  }`}
                >
                  <Camera className="w-3 h-3" />
                  <span>Camera</span>
                </button>
                <label
                  className={`py-1 px-2 rounded-lg border transition-all flex items-center gap-1 cursor-pointer ${
                    activeTab === "upload"
                      ? "bg-[#5B0E1B] text-white border-[#5B0E1B] font-medium"
                      : "bg-[#FAF8F5] dark:bg-[#14110E] hover:bg-white dark:hover:bg-[#201C18] text-[#423A32] dark:text-[#D5C7B8] border-[#C59B27]/20"
                  }`}
                >
                  <Upload className="w-3 h-3" />
                  <span>Upload</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      setActiveTab("upload");
                      stopCamera();
                      handleFileUpload(e);
                    }}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* Pinterest Link Input */}
            {activeTab === "pinterest" && (
              <div className="space-y-2.5 pt-1">
                <p className="text-[11px] text-[#6E6255] dark:text-[#A89886] font-sans">
                  Paste the <strong>Direct Image Address</strong> from Pinterest (starts with <code className="font-mono text-[#5B0E1B] dark:text-[#E5C378]">https://i.pinimg.com/...</code>):
                </p>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={pinterestInputUrl}
                    onChange={(e) => {
                      setPinterestInputUrl(e.target.value);
                      setPinterestError("");
                      setPinterestSuccess("");
                    }}
                    placeholder="https://i.pinimg.com/originals/... or web image"
                    className="flex-1 px-3 py-1.5 rounded-xl border border-[#C59B27]/30 bg-[#FAF8F5] dark:bg-[#14110E] text-xs text-[#1C1814] dark:text-[#F5EFEB] placeholder-[#8C7E72] dark:placeholder-[#7A6E63] focus:outline-none"
                  />
                  <button
                    onClick={handleLoadPinterestUrl}
                    className="px-3.5 py-1.5 rounded-xl bg-[#5B0E1B] hover:bg-[#7A1D26] text-white text-xs font-serif uppercase tracking-wider transition-all shadow-2xs"
                  >
                    Load Photo
                  </button>
                </div>

                {/* Friendly explanation when a pin.it or pinterest.com page URL is entered */}
                {pinterestError === "pin_page_detected" && (
                  <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-700/60 text-xs space-y-2">
                    <div className="flex items-center gap-1.5 font-bold text-amber-900 dark:text-amber-200">
                      <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                      <span>Pinterest Page Link Detected (`pin.it`)</span>
                    </div>
                    <p className="text-[11px] text-amber-800 dark:text-amber-300 leading-relaxed">
                      Pinterest share links (like <code className="font-mono font-semibold">pin.it</code>) are webpage links rather than direct image files.
                    </p>
                    <div className="space-y-1.5 text-[11px] text-amber-900 dark:text-amber-200">
                      <div className="flex items-start gap-1.5">
                        <span className="font-bold text-[#5B0E1B] dark:text-[#E5C378]">&bull;</span>
                        <span>
                          <strong>Option 1 (Copy Image Address)</strong>: Open the pin on Pinterest, <strong>right-click (or tap & hold) directly on the picture</strong>, and choose <strong>&ldquo;Copy Image Address&rdquo;</strong> (it starts with <code className="font-mono">https://i.pinimg.com/...</code>).
                        </span>
                      </div>
                      <div className="flex items-start gap-1.5">
                        <span className="font-bold text-[#5B0E1B] dark:text-[#E5C378]">&bull;</span>
                        <span>
                          <strong>Option 2 (Easiest)</strong>: Save/download the picture from Pinterest, then click <strong>&ldquo;Upload&rdquo;</strong> to pick it directly from your computer or phone!
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setActiveTab("upload");
                        setPinterestError("");
                      }}
                      className="w-full py-1.5 rounded-lg bg-[#5B0E1B] hover:bg-[#7A1D26] text-white text-[11px] font-serif uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-2xs"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Switch to Upload Image from Device</span>
                    </button>
                  </div>
                )}

                {pinterestSuccess && (
                  <div className="flex items-center gap-1.5 text-xs text-emerald-700 dark:text-emerald-400 font-mono">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{pinterestSuccess}</span>
                  </div>
                )}
              </div>
            )}

            {/* Gallery Grid */}
            {activeTab === "gallery" && (
              <div className="grid grid-cols-4 gap-2 pt-1">
                {AESTHETIC_GALLERY.map((img) => (
                  <button
                    key={img.id}
                    onClick={() => setSelectedPhotoUrl(img.url)}
                    className={`group relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                      selectedPhotoUrl === img.url
                        ? "border-[#5B0E1B] dark:border-[#D4AF37] ring-2 ring-[#C59B27]/50 scale-[1.02]"
                        : "border-transparent opacity-80 hover:opacity-100 hover:border-[#C59B27]/40"
                    }`}
                    title={`${img.title} (${img.region})`}
                  >
                    <Image src={img.url} alt={img.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-1 text-[9px] font-sans text-white truncate text-left">
                      {img.region}
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* Live Camera Viewfinder */}
            {activeTab === "camera" && isCameraActive && (
              <div className="space-y-2 pt-1">
                <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-black border border-[#C59B27]/30">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2 bg-red-600 text-white text-[9px] font-mono px-2 py-0.5 rounded-full uppercase tracking-wider animate-pulse flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                    Live Viewfinder
                  </div>
                </div>
                <button
                  onClick={capturePhoto}
                  className="w-full py-2 rounded-xl bg-[#5B0E1B] hover:bg-[#7A1D26] text-white text-xs font-serif uppercase tracking-widest flex items-center justify-center gap-2 shadow-xs transition-all"
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>Capture Photo Frame</span>
                </button>
              </div>
            )}

            {/* Aspect Ratio Selector */}
            <div className="pt-2 border-t border-[#C59B27]/15 dark:border-[#C59B27]/10 flex flex-wrap items-center gap-1.5">
              <span className="text-[10px] font-mono uppercase text-[#8C7E72] dark:text-[#A89886] mr-1">
                Aspect Ratio:
              </span>
              {[
                { id: "postcard", label: "Postcard (8:5 • 1200×750)" },
                { id: "landscape", label: "Widescreen (16:9 • 1200×675)" },
                { id: "square", label: "Square (1:1 • 1000×1000)" },
                { id: "story", label: "Portrait (2:3 • 800×1200)" },
              ].map((ar) => (
                <button
                  key={ar.id}
                  onClick={() => setAspectRatio(ar.id as any)}
                  className={`text-[10px] font-serif px-2.5 py-1 rounded-full border transition-all ${
                    aspectRatio === ar.id
                      ? "bg-[#C59B27] text-white border-[#C59B27] font-semibold"
                      : "bg-[#FAF8F5] dark:bg-[#14110E] text-[#423A32] dark:text-[#D5C7B8] border-[#C59B27]/25 hover:border-[#C59B27]"
                  }`}
                >
                  {ar.label}
                </button>
              ))}
            </div>

            {/* Upload Notice Banner */}
            {uploadNotice && (
              <div
                className={`p-2.5 rounded-xl border text-[11px] font-sans flex items-center gap-2 ${
                  uploadNotice.type === "success"
                    ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-800 dark:text-emerald-300"
                    : uploadNotice.type === "warning"
                    ? "bg-amber-500/10 border-amber-500/30 text-amber-800 dark:text-amber-300"
                    : "bg-blue-500/10 border-blue-500/30 text-blue-800 dark:text-blue-300"
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                <span className="flex-1">{uploadNotice.message}</span>
                <button
                  onClick={() => setUploadNotice(null)}
                  className="text-xs hover:opacity-75 cursor-pointer font-bold ml-1"
                >
                  &times;
                </button>
              </div>
            )}

            {/* Artistic Filter Chips */}
            <div className="pt-2 border-t border-[#C59B27]/15 dark:border-[#C59B27]/10 flex flex-wrap items-center gap-1.5">
              <span className="text-[10px] font-mono uppercase text-[#8C7E72] dark:text-[#A89886] mr-1">
                Color Grade:
              </span>
              {FILTERS.map((f) => (
                <button
                  key={f.id}
                  onClick={() => {
                    setFilter(f.id);
                    setImageLoadError(false);
                    setSignedPostcardUrl("");
                  }}
                  className={`px-2.5 py-0.5 rounded-full text-[11px] transition-all ${
                    filter === f.id
                      ? "bg-[#C59B27] dark:bg-[#D4AF37] text-white dark:text-[#0C0A09] font-medium shadow-2xs"
                      : "bg-[#FAF5EE] dark:bg-[#14110E] text-[#423A32] dark:text-[#D5C7B8] border border-[#C59B27]/20 hover:bg-white dark:hover:bg-[#201C18]"
                  }`}
                >
                  {f.name}
                </button>
              ))}
            </div>
          </div>

          {/* Card 2: State Stamp Selector (No Color Names!) */}
          <div className="p-4 rounded-2xl bg-white dark:bg-[#1A1613] border border-[#C59B27]/25 dark:border-[#C59B27]/20 shadow-xs space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#5B0E1B] dark:text-[#E5C378] font-bold">
                2. Territorial Stamp (All 36 Territories)
              </span>
              <Stamp className="w-3.5 h-3.5 text-[#C59B27] dark:text-[#D4AF37]" />
            </div>

            <select
              value={selectedStateId}
              onChange={(e) => setSelectedStateId(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-[#C59B27]/30 dark:border-[#C59B27]/20 bg-[#FAF8F5] dark:bg-[#14110E] text-xs font-serif text-[#1C1814] dark:text-[#F5EFEB] focus:outline-none focus:ring-2 focus:ring-[#C59B27]/50"
            >
              <optgroup label="States (28)">
                {ALL_INDIAN_STATES.filter((s) => s.category === "state").map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.nativeName}) — {s.atlas.capital}
                  </option>
                ))}
              </optgroup>
              <optgroup label="Union Territories (8)">
                {ALL_INDIAN_STATES.filter((s) => s.category === "union-territory").map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.nativeName}) — {s.atlas.capital}
                  </option>
                ))}
              </optgroup>
            </select>

            {/* Pure postmark and territorial region - NO COLOR THEME NAME */}
            <div className="text-[10px] font-mono text-[#8C7E72] dark:text-[#A89886] flex items-center justify-between pt-0.5">
              <span>Postmark: {postmarkCity}</span>
              <span className="text-[#8C5320] dark:text-[#D4AF37] font-medium">
                {selectedState.atlas.capital} &bull; {selectedState.zone} India
              </span>
            </div>
          </div>

          {/* Card 3: The Letter Inside the Postcard */}
          <div className="p-4 rounded-2xl bg-white dark:bg-[#1A1613] border border-[#C59B27]/25 dark:border-[#C59B27]/20 shadow-xs space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#5B0E1B] dark:text-[#E5C378] font-bold">
                3. The Letter Inside the Card
              </span>
              <Feather className="w-3.5 h-3.5 text-[#C59B27] dark:text-[#D4AF37]" />
            </div>

            <input
              type="text"
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
              placeholder="Salutation (e.g. To my dearest family,)"
              className="w-full px-3 py-2 rounded-xl border border-[#C59B27]/25 dark:border-[#C59B27]/20 text-xs font-serif text-[#1C1814] dark:text-[#F5EFEB] bg-[#FAF8F5] dark:bg-[#14110E] placeholder-[#8C7E72] dark:placeholder-[#7A6E63] focus:outline-none"
            />

            <textarea
              rows={3}
              value={letterMessage}
              onChange={(e) => setLetterMessage(e.target.value)}
              placeholder="Write your reflection, memory of home, or love note..."
              className="w-full px-3 py-2 rounded-xl border border-[#C59B27]/25 dark:border-[#C59B27]/20 text-xs font-serif text-[#1C1814] dark:text-[#F5EFEB] bg-[#FAF8F5] dark:bg-[#14110E] placeholder-[#8C7E72] dark:placeholder-[#7A6E63] focus:outline-none resize-none leading-relaxed"
            />

            <input
              type="text"
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
              placeholder="Signoff (e.g. With everlasting love, Priya)"
              className="w-full px-3 py-2 rounded-xl border border-[#C59B27]/25 dark:border-[#C59B27]/20 text-xs font-serif text-[#1C1814] dark:text-[#F5EFEB] bg-[#FAF8F5] dark:bg-[#14110E] placeholder-[#8C7E72] dark:placeholder-[#7A6E63] focus:outline-none"
            />
          </div>
        </div>

        {/* Right Column: Live Artifact Preview + Mail Dispatch (Zero Wasted Space) */}
        <div className="lg:col-span-6 space-y-4">
          {/* Postcard Artifact Card Container */}
          <div className="p-4 rounded-2xl bg-white dark:bg-[#1A1613] border border-[#C59B27]/25 dark:border-[#C59B27]/20 shadow-xs space-y-3">
            {/* Artifact Bar */}
            <div className="flex items-center justify-between pb-1">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#8C7E72] dark:text-[#A89886]">
                  Live Postcard Artifact
                </span>
              </div>
              <button
                onClick={() => setIsFlipped(!isFlipped)}
                className="text-xs font-serif text-[#5B0E1B] dark:text-[#E5C378] hover:text-[#7A1D26] flex items-center gap-1.5 bg-[#FAF8F5] dark:bg-[#14110E] px-3 py-1 rounded-full border border-[#C59B27]/30 shadow-2xs transition-all"
              >
                <RotateCw className="w-3.5 h-3.5" />
                <span>{isFlipped ? "View Card Front" : "View Reverse Letter"}</span>
              </button>
            </div>

            {/* The Physical Postcard Vessel */}
            <div className="w-full aspect-[16/10] relative rounded-xl overflow-hidden border-2 border-[#C59B27]/40 shadow-xl bg-[#090807] transition-all">
              {!isFlipped ? (
                /* FRONT: Transformed Image + State Postal Stamp + Overlay Text */
                <div className="relative w-full h-full">
                  <Image
                    key={signedPostcardUrl || `${filter}-${selectedPhotoUrl}`}
                    src={signedPostcardUrl || (imageLoadError ? selectedPhotoUrl : transformedUrl)}
                    alt="Postcard Artifact"
                    fill
                    unoptimized={true}
                    onError={() => setImageLoadError(true)}
                    className="object-cover transition-opacity duration-300"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />

                  {/* Scrim Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/20 pointer-events-none" />

                  {/* Top Left: Cancellation Header */}
                  <div className="absolute top-3.5 left-3.5 z-10">
                    <span className="text-[9px] font-mono uppercase tracking-[0.22em] text-[#E4C987] font-semibold drop-shadow-md">
                      POSTCARD FROM INDIA &bull; {selectedState.name.toUpperCase()}
                    </span>
                  </div>

                  {/* Top Right: Custom Perforated State Stamp & Circular Cancel Mark */}
                  <div className="absolute top-3 right-3 z-10 flex items-center gap-2">
                    {/* Postal Cancel Mark Ring */}
                    <div className="w-10 h-10 rounded-full border border-dashed border-[#E4C987]/90 flex flex-col items-center justify-center text-[7px] font-mono text-[#E4C987] uppercase tracking-tighter text-center leading-none select-none rotate-[-8deg] bg-black/40 backdrop-blur-xs">
                      <span>POST</span>
                      <span className="font-bold my-0.5">{selectedState.atlas.capital.substring(0, 5)}</span>
                      <span>{new Date().getFullYear()}</span>
                    </div>

                    {/* Perforated Postal Stamp for Selected State */}
                    <div
                      className="w-12 h-16 bg-[#FAF5EE] text-[#1C1814] p-1 rounded-xs shadow-xl flex flex-col justify-between border-2 border-dashed select-none rotate-[2deg]"
                      style={{ borderColor: selectedState.theme.primary }}
                    >
                      <div
                        className="text-[6px] font-serif uppercase tracking-wider font-bold text-center border-b pb-0.5 truncate"
                        style={{ color: selectedState.theme.primary, borderColor: `${selectedState.theme.primary}40` }}
                      >
                        {selectedState.name}
                      </div>
                      <div
                        className="text-center font-serif text-base leading-none font-bold"
                        style={{ color: selectedState.theme.primary }}
                      >
                        {selectedState.nativeName.substring(0, 2)}
                      </div>
                      <div className="text-[5px] font-mono text-center font-semibold text-[#8C5320]">
                        ₹5.00 POST
                      </div>
                    </div>
                  </div>

                  {/* Bottom Body Message Overlay */}
                  <div className="absolute bottom-3 left-3.5 right-3.5 z-10 space-y-1">
                    <h4 className="font-serif text-base sm:text-lg text-white font-medium tracking-tight drop-shadow-md truncate">
                      {recipientName}
                    </h4>
                    <p className="font-serif text-xs text-white/90 italic leading-relaxed line-clamp-2 drop-shadow-sm">
                      &ldquo;{letterMessage}&rdquo;
                    </p>
                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[10px] font-mono text-[#E4C987] tracking-wider uppercase">
                        {senderName}
                      </span>
                      <span className="text-[9px] font-mono text-white/70">
                        {postmarkCity}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                /* REVERSE: The Handwritten Letter on Aged Parchment */
                <div className="w-full h-full bg-[#FAF5EE] p-5 flex flex-col justify-between text-[#1C1814] relative">
                  {/* Center dividing vertical rule */}
                  <div className="absolute top-5 bottom-5 left-1/2 w-[1px] bg-[#C59B27]/30 hidden sm:block" />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-full">
                    {/* Left Half: The Handwritten Letter */}
                    <div className="space-y-2.5 font-serif pr-2">
                      <span className="text-[9px] font-mono uppercase tracking-widest text-[#5B0E1B] block font-bold">
                        Letter of Memory &bull; {selectedState.name}
                      </span>
                      <p className="text-xs sm:text-sm font-semibold text-[#5B0E1B]">{recipientName}</p>
                      <p className="text-xs text-[#423A32] italic leading-relaxed">
                        &ldquo;{letterMessage}&rdquo;
                      </p>
                      <p className="text-xs text-[#8C5320] font-medium pt-1">{senderName}</p>
                    </div>

                    {/* Right Half: Address Lines + Perforated Stamp + Wax Seal */}
                    <div className="space-y-3 pl-0 sm:pl-3 flex flex-col justify-between">
                      <div className="flex justify-end">
                        <div className="w-11 h-14 bg-white border-2 border-dashed border-[#5B0E1B] p-1 flex flex-col justify-between text-center shadow-xs">
                          <span className="text-[6px] font-serif uppercase tracking-tighter truncate font-bold text-[#5B0E1B]">
                            {selectedState.name}
                          </span>
                          <span className="text-sm font-bold text-[#5B0E1B]">
                            {rootGlyph}
                          </span>
                          <span className="text-[5px] font-mono text-[#8C5320]">
                            INDIA POST
                          </span>
                        </div>
                      </div>

                      {/* Lined Address Section */}
                      <div className="space-y-1.5 text-xs font-mono text-[#8C7E72]">
                        <div className="border-b border-[#C59B27]/30 pb-0.5 truncate">
                          Deliver to: {recipientEmail || "Recipient Mailbox"}
                        </div>
                        <div className="border-b border-[#C59B27]/30 pb-0.5">
                          Land: {selectedState.name}, Republic of India
                        </div>
                        <div className="border-b border-[#C59B27]/30 pb-0.5">
                          Postal Pin: {postmarkCity}
                        </div>
                      </div>

                      <div className="flex items-center justify-end">
                        <div className="w-8 h-8 rounded-full bg-[#5B0E1B] text-[#D4AF37] border border-[#D4AF37] flex items-center justify-center font-serif text-xs font-bold shadow-md">
                          {rootGlyph}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Action Buttons Row */}
            <div className="flex items-center justify-between gap-2 pt-1">
              <button
                onClick={handleCopyPostcardUrl}
                className="flex-1 py-1.5 px-2.5 rounded-xl bg-[#FAF8F5] dark:bg-[#14110E] hover:bg-white dark:hover:bg-[#201C18] text-[#5B0E1B] dark:text-[#E5C378] border border-[#C59B27]/30 text-xs font-serif flex items-center justify-center gap-1.5 shadow-2xs transition-all"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedLink ? "Copied!" : "Copy Link"}</span>
              </button>

              <button
                onClick={handleDownloadPostcard}
                disabled={isDownloading}
                className="flex-1 py-1.5 px-2.5 rounded-xl bg-[#FAF8F5] dark:bg-[#14110E] hover:bg-[#5B0E1B] hover:text-white dark:hover:bg-[#5B0E1B] dark:hover:text-white text-[#5B0E1B] dark:text-[#E5C378] border border-[#C59B27]/30 text-xs font-serif flex items-center justify-center gap-1.5 shadow-2xs transition-all cursor-pointer disabled:opacity-50"
              >
                {isDownloading ? (
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Download className="w-3.5 h-3.5" />
                )}
                <span>{isDownloading ? "Downloading..." : "Download"}</span>
              </button>

              <button
                onClick={onOpenInspector}
                className="py-1.5 px-2.5 rounded-xl bg-[#FAF8F5] dark:bg-[#14110E] hover:bg-white dark:hover:bg-[#201C18] text-[#8C5320] dark:text-[#D4AF37] border border-[#C59B27]/30 text-xs font-mono flex items-center justify-center gap-1 shadow-2xs transition-all"
                title="Inspect Cloudinary transformations"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#C59B27]" />
                <span className="hidden sm:inline">Inspect API</span>
              </button>
            </div>
          </div>

          {/* Postal Mail Dispatch Station (Fills the right column perfectly!) */}
          <form
            onSubmit={handleSendMail}
            className="p-4 rounded-2xl bg-gradient-to-br from-[#FAF5EE] to-[#F5ECE0] dark:from-[#1A1613] dark:to-[#14110E] border border-[#C59B27]/35 dark:border-[#C59B27]/25 shadow-xs space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#5B0E1B] dark:text-[#E5C378] font-bold block">
                4. Dispatch via Mail Service
              </span>
              <span className="text-[9px] font-mono text-[#8C7E72] dark:text-[#A89886]">
                Cloudinary API
              </span>
            </div>

            <p className="text-[11px] text-[#6E6255] dark:text-[#A89886] font-sans">
              Enter the recipient&apos;s email address. We will generate your custom postcard and dispatch the cultural letter directly.
            </p>

            <div className="flex gap-2">
              <input
                type="email"
                value={recipientEmail}
                onChange={(e) => setRecipientEmail(e.target.value)}
                placeholder="Recipient Email (e.g. friend@heritage.in)"
                required
                className="flex-1 px-3 py-2 rounded-xl border border-[#C59B27]/30 dark:border-[#C59B27]/25 text-xs bg-white dark:bg-[#0C0A09] text-[#1C1814] dark:text-[#F5EFEB] placeholder-[#8C7E72] dark:placeholder-[#7A6E63] focus:outline-none"
              />
              <button
                type="submit"
                disabled={isSending}
                className="px-4 py-2 rounded-xl bg-[#5B0E1B] hover:bg-[#7A1D26] text-white text-xs font-serif uppercase tracking-wider flex items-center gap-1.5 shadow-sm transition-all disabled:opacity-50"
              >
                {isSending ? (
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Send className="w-3.5 h-3.5" />
                )}
                <span>Send Mail</span>
              </button>
            </div>

            {sendError && (
              <div
                className={`p-3 rounded-xl border text-xs space-y-1 ${
                  sendIsUnconfigured
                    ? "bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-700 text-amber-900 dark:text-amber-200"
                    : "bg-red-50 dark:bg-red-950/40 border-red-300 dark:border-red-850 text-red-700 dark:text-red-300"
                }`}
              >
                <div className="font-semibold flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>{sendError}</span>
                </div>
                {sendErrorDetails && (
                  <p className="text-[11px] opacity-90 leading-relaxed font-sans">{sendErrorDetails}</p>
                )}
              </div>
            )}

            {sendSuccess && (
              <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-300 space-y-0.5">
                <div className="font-semibold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  Postcard & Letter dispatched successfully!
                </div>
                <p className="text-[11px] text-emerald-700 dark:text-emerald-400/90">
                  Cloudinary generated artifact prepared and dispatched for {recipientEmail}.
                </p>
              </div>
            )}

            <div className="flex items-center justify-between pt-1 text-[10px] font-mono text-[#8C7E72] dark:text-[#A89886]">
              <span>Dynamic Node.js URL API</span>
              <a
                href={`mailto:${recipientEmail}?subject=${encodeURIComponent(`Postcard & Letter from ${selectedState.name}`)}&body=${encodeURIComponent(`${recipientName}\n\n${letterMessage}\n\n${senderName}\n\nView Postcard: ${transformedUrl}`)}`}
                className="text-[#5B0E1B] dark:text-[#E5C378] underline hover:text-[#7A1D26] flex items-center gap-1"
              >
                <span>Open in Email App</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default CustomPostcardStudio;
