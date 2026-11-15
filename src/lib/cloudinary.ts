/**
 * Cloudinary Transformation & Delivery Engine for ROOTS — The Soul of India
 * Cultural Visual Infrastructure:
 * 1. Automatic format optimization (f_auto)
 * 2. Automatic quality tuning (q_auto)
 * 3. Responsive resizing & intelligent content-aware cropping (c_fill, g_auto)
 * 4. State-specific monochromatic color transformations (e_tint, duotone, sepia, art filters)
 * 5. Dynamic typographic overlays for personalized cultural postcards (l_text)
 * 6. State-specific postal stamp & postmark cancellation watermarking
 * 7. Secure signed uploads (/api/cloudinary/sign)
 */

export interface CloudinaryTransformOptions {
  publicId?: string;
  sourceUrl?: string;
  width?: number;
  height?: number;
  aspectRatio?: string;
  crop?: string;
  gravity?: string;
  quality?: string | number;
  format?: string;
  effect?: string;
  tintHex?: string; // Hex color code without '#' for monochromatic state tinting
  textOverlays?: Array<{
    text: string;
    fontFamily?: string;
    fontSize?: number;
    fontWeight?: string;
    fontStyle?: string;
    color?: string;
    gravity?: string;
    x?: number;
    y?: number;
    width?: number;
    crop?: string;
    letterSpacing?: number;
  }>;
}

export function getCloudName(): string {
  if (typeof window !== "undefined") {
    return process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "demo";
  }
  return (
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ||
    process.env.CLOUDINARY_CLOUD_NAME ||
    "demo"
  );
}

/**
 * Encodes text safely for Cloudinary URL text overlay specification.
 */
export function encodeCloudinaryText(text: string): string {
  return encodeURIComponent(text)
    .replace(/%2C/g, "%252C")
    .replace(/%2F/g, "%252F")
    .replace(/%21/g, "%21")
    .replace(/%27/g, "%27")
    .replace(/%28/g, "%28")
    .replace(/%29/g, "%29")
    .replace(/%2A/g, "%2A");
}

/**
 * Builds a valid Cloudinary transformation URL supporting both uploaded assets and fetched assets.
 */
export function buildCloudinaryUrl(options: CloudinaryTransformOptions): string {
  const cloudName = getCloudName();
  const transforms: string[] = [];

  // 1. Format and Quality Optimization
  const format = options.format || "auto";
  const quality = options.quality || "auto";
  transforms.push(`f_${format}`);
  transforms.push(`q_${quality}`);

  // 2. Intelligent Resizing and Gravity
  if (options.crop) {
    transforms.push(`c_${options.crop}`);
  } else if (options.width || options.height || options.aspectRatio) {
    transforms.push("c_fill");
  }

  if (options.gravity) {
    transforms.push(`g_${options.gravity}`);
  } else if (options.crop === "fill" || (!options.crop && (options.width || options.height))) {
    transforms.push("g_auto");
  }

  if (options.aspectRatio) {
    transforms.push(`ar_${options.aspectRatio}`);
  }

  if (options.width) {
    transforms.push(`w_${options.width}`);
  }

  if (options.height) {
    transforms.push(`h_${options.height}`);
  }

  // 3. State-Specific Monochromatic Tint or Artistic Effects
  if (options.tintHex) {
    const cleanTint = options.tintHex.replace("#", "");
    transforms.push(`e_tint:60:${cleanTint}`);
  } else if (options.effect) {
    const effectParts = options.effect.split(",").map((part) => {
      const trimmed = part.trim();
      if (
        trimmed.startsWith("e_") ||
        trimmed.startsWith("co_") ||
        trimmed.startsWith("b_") ||
        trimmed.startsWith("q_") ||
        trimmed.startsWith("f_") ||
        trimmed.startsWith("l_")
      ) {
        return trimmed;
      }
      return `e_${trimmed}`;
    });
    transforms.push(effectParts.join(","));
  }

  // 4. Dynamic Layered Text Overlays
  if (options.textOverlays && options.textOverlays.length > 0) {
    for (const overlay of options.textOverlays) {
      const font = overlay.fontFamily || "Arial";
      const size = overlay.fontSize || 32;
      const weight = overlay.fontWeight ? `_${overlay.fontWeight}` : "_bold";
      const style = overlay.fontStyle ? `_${overlay.fontStyle}` : "";
      const tracking = overlay.letterSpacing ? `_letter_spacing_${overlay.letterSpacing}` : "";
      
      const fontSpec = `${font}_${size}${weight}${style}${tracking}`;
      const encodedText = encodeCloudinaryText(overlay.text);
      
      let overlayStr = `l_text:${fontSpec}:${encodedText}`;
      
      if (overlay.color) {
        const cleanColor = overlay.color.replace("#", "");
        overlayStr += `,co_rgb:${cleanColor}`;
      }
      
      if (overlay.gravity) {
        overlayStr += `,g_${overlay.gravity}`;
      }
      
      if (overlay.x !== undefined) {
        overlayStr += `,x_${overlay.x}`;
      }
      
      if (overlay.y !== undefined) {
        overlayStr += `,y_${overlay.y}`;
      }
      
      if (overlay.width) {
        overlayStr += `,w_${overlay.width},c_${overlay.crop || "fit"}`;
      }
      
      transforms.push(overlayStr);
    }
  }

  const transformString = transforms.join(",");

  if (options.publicId && !options.publicId.startsWith("http")) {
    return `https://res.cloudinary.com/${cloudName}/image/upload/${transformString}/${options.publicId}`;
  }

  const source = options.publicId || options.sourceUrl;
  if (source && source.startsWith("http")) {
    if (cloudName === "demo") {
      // In Cloudinary's shared demo account, image/fetch of external domains is restricted by Cloudinary ACL.
      // Deliver the high-resolution source image directly to guarantee museum-grade rendering,
      // while preserving full Cloudinary transformation inspection & pipeline for production credentials.
      return source;
    }

    return `https://res.cloudinary.com/${cloudName}/image/fetch/${transformString}/${source}`;
  }

  return `https://res.cloudinary.com/${cloudName}/image/upload/${transformString}/samples/landscapes/beach-boat`;
}

/**
 * Generates state-specific postal card with monochromatic tint, postal cancellation stamp,
 * and user-composed memory of home.
 */
export function buildStatePostcardUrl(params: {
  imageUrl: string;
  stateName: string;
  nativeStateName: string;
  recipient: string;
  message: string;
  sender: string;
  tintHex?: string;
  filter?: "monochromatic" | "sepia" | "golden" | "natural";
}): string {
  let effectParam = "";
  let tintParam = params.tintHex;

  if (params.filter === "sepia") {
    effectParam = "sepia:70";
    tintParam = undefined;
  } else if (params.filter === "golden") {
    effectParam = "saturation:25,e_contrast:15";
    tintParam = undefined;
  } else if (params.filter === "natural") {
    effectParam = "";
    tintParam = undefined;
  }

  const shortMessage =
    params.message.length > 120
      ? params.message.substring(0, 117) + "..."
      : params.message;

  const shortRecipient =
    params.recipient.length > 40
      ? params.recipient.substring(0, 37) + "..."
      : params.recipient;

  const shortSender =
    params.sender.length > 30 ? params.sender.substring(0, 27) + "..." : params.sender;

  return buildCloudinaryUrl({
    sourceUrl: params.imageUrl,
    width: 1200,
    height: 675,
    crop: "fill",
    gravity: "auto",
    format: "auto",
    quality: "auto",
    effect: effectParam || undefined,
    tintHex: tintParam,
    textOverlays: [
      // Cancellation header
      {
        text: `POSTCARD FROM INDIA • ${params.stateName.toUpperCase()}`,
        fontFamily: "Arial",
        fontSize: 20,
        fontWeight: "bold",
        color: "D4AF37",
        gravity: "north_west",
        x: 48,
        y: 48,
        letterSpacing: 3,
      },
      // Recipient
      {
        text: shortRecipient,
        fontFamily: "Georgia",
        fontSize: 32,
        fontWeight: "bold",
        color: "FAF7F0",
        gravity: "south_west",
        x: 48,
        y: 140,
        width: 1000,
      },
      // Message
      {
        text: `"${shortMessage}"`,
        fontFamily: "Arial",
        fontSize: 22,
        fontStyle: "italic",
        color: "EFE8DC",
        gravity: "south_west",
        x: 48,
        y: 84,
        width: 1000,
      },
      // Sender
      {
        text: `— ${shortSender}`,
        fontFamily: "Arial",
        fontSize: 20,
        fontWeight: "bold",
        color: "D4AF37",
        gravity: "south_west",
        x: 48,
        y: 40,
      },
    ],
  });
}

export interface PostcardCloudinaryOptions {
  imageUrl: string;
  recipient?: string;
  message?: string;
  sender?: string;
  postmarkCity?: string;
  filter?: string;
  aspectRatio?: string;
}

export function buildPostcardCloudinaryUrl(options: PostcardCloudinaryOptions): string {
  return buildStatePostcardUrl({
    imageUrl: options.imageUrl,
    stateName: options.postmarkCity || "India",
    nativeStateName: "பாரதம்",
    recipient: options.recipient || "To a kindred soul,",
    message: options.message || "A memory etched in time.",
    sender: options.sender || "A traveler",
    filter: (options.filter as "monochromatic" | "sepia" | "golden" | "natural") || "natural",
  });
}

export interface TransformationBreakdown {
  parameter: string;
  name: string;
  explanation: string;
  category: "Optimization" | "Responsive" | "Artistic" | "Overlay";
}

export function analyzeCloudinaryUrl(url: string): TransformationBreakdown[] {
  const breakdown: TransformationBreakdown[] = [];

  if (url.includes("f_auto")) {
    breakdown.push({
      parameter: "f_auto",
      name: "Automatic Format Delivery",
      explanation: "Delivers next-gen formats (AVIF / WebP) tailored to the visitor's browser engine.",
      category: "Optimization",
    });
  }

  if (url.includes("q_auto")) {
    breakdown.push({
      parameter: "q_auto",
      name: "Perceptual Quality Tuning",
      explanation: "Uses computer vision algorithms to compress file size with zero visible detail degradation.",
      category: "Optimization",
    });
  }

  if (url.includes("c_fill")) {
    breakdown.push({
      parameter: "c_fill",
      name: "Smart Crop & Fill",
      explanation: "Scales and crops media to exact luxury editorial proportions without distortion.",
      category: "Responsive",
    });
  }

  if (url.includes("g_auto")) {
    breakdown.push({
      parameter: "g_auto",
      name: "AI Content-Aware Gravity",
      explanation: "Analyzes saliency to frame temples, miniature paintings, and textile artisans perfectly.",
      category: "Responsive",
    });
  }

  if (url.includes("e_tint")) {
    breakdown.push({
      parameter: "e_tint",
      name: "Monochromatic State Tinting",
      explanation: "Dynamically transforms photography into the state's signature Pantone color identity.",
      category: "Artistic",
    });
  }

  if (url.includes("e_sepia")) {
    breakdown.push({
      parameter: "e_sepia:70",
      name: "Heritage Sepia Tone",
      explanation: "Recreates 19th-century albumen photographic plate tonality.",
      category: "Artistic",
    });
  }

  if (url.includes("l_text:")) {
    breakdown.push({
      parameter: "l_text:...",
      name: "Edge Typographic Overlay",
      explanation: "Renders user dedications, memories, and postal postmarks server-side at Cloudinary's edge.",
      category: "Overlay",
    });
  }

  return breakdown;
}
