/**
 * ROOTS — The Soul of India
 * Postcard Canvas Composite & PNG Download Engine
 *
 * Renders an authentic, high-resolution museum postcard incorporating:
 * 1. Selected photography with responsive focal crop and monochromatic/vintage filters
 * 2. Perforated postal stamp with state heritage motif and Indian denomination
 * 3. Circular postmark cancellation stamp with wavy dispatch lines
 * 4. Dedicated letter text with recipient dedication, wrapped memory, and gold signature
 * 5. Direct client-side lossless PNG export and download to the visitor's device.
 */

export interface PostcardCanvasOptions {
  imageUrl: string;
  stateId: string;
  stateName: string;
  nativeStateName?: string;
  recipient: string;
  message: string;
  sender: string;
  filter?: "monochromatic" | "golden" | "sepia" | "natural" | string;
  tintHex?: string;
  aspectRatio?: "postcard" | "square" | "story" | "landscape" | string;
}

/**
 * Loads an image safely into an HTMLImageElement, falling back to a local proxy
 * if cross-origin restrictions block direct canvas drawing.
 */
async function loadImageSafely(url: string): Promise<HTMLImageElement | null> {
  if (typeof window === "undefined") return null;

  // 1. Attempt direct anonymous CORS load
  const directImage = await new Promise<HTMLImageElement | null>((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = url;
    // Timeout after 6 seconds
    setTimeout(() => resolve(null), 6000);
  });

  if (directImage && directImage.width > 0) {
    return directImage;
  }

  // 2. Fall back to internal download proxy to ensure CORS compliance
  try {
    const proxyUrl = `/api/postcard/download?url=${encodeURIComponent(url)}`;
    const response = await fetch(proxyUrl);
    if (!response.ok) return null;
    const blob = await response.blob();
    const objectUrl = URL.createObjectURL(blob);

    const proxyImage = await new Promise<HTMLImageElement | null>((resolve) => {
      const img = new Image();
      img.onload = () => {
        URL.revokeObjectURL(objectUrl);
        resolve(img);
      };
      img.onerror = () => {
        URL.revokeObjectURL(objectUrl);
        resolve(null);
      };
      img.src = objectUrl;
    });

    return proxyImage;
  } catch (err) {
    console.warn("Proxy image load failed for postcard canvas:", err);
    return null;
  }
}

/**
 * Helper to draw a perforated vintage postal stamp on canvas.
 */
function drawPostalStamp(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  stateName: string,
  tintColor: string
) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate((3 * Math.PI) / 180); // 3 degree tilt for authentic hand-stamped angle

  // Shadow
  ctx.shadowColor = "rgba(0, 0, 0, 0.45)";
  ctx.shadowBlur = 10;
  ctx.shadowOffsetX = 3;
  ctx.shadowOffsetY = 4;

  // Stamp paper base
  ctx.fillStyle = "#FAF5EE";
  ctx.fillRect(0, 0, w, h);

  ctx.shadowColor = "transparent";

  // Perforated edge effect: Draw small circular notches along perimeter
  ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
  const notchRadius = 3;
  const notchSpacing = 10;

  // Top & Bottom notches
  for (let nx = notchSpacing; nx < w; nx += notchSpacing) {
    ctx.beginPath();
    ctx.arc(nx, 0, notchRadius, 0, Math.PI);
    ctx.fillStyle = "#1E1815";
    ctx.fill();

    ctx.beginPath();
    ctx.arc(nx, h, notchRadius, Math.PI, 0);
    ctx.fillStyle = "#1E1815";
    ctx.fill();
  }

  // Left & Right notches
  for (let ny = notchSpacing; ny < h; ny += notchSpacing) {
    ctx.beginPath();
    ctx.arc(0, ny, notchRadius, -Math.PI / 2, Math.PI / 2);
    ctx.fillStyle = "#1E1815";
    ctx.fill();

    ctx.beginPath();
    ctx.arc(w, ny, notchRadius, Math.PI / 2, -Math.PI / 2);
    ctx.fillStyle = "#1E1815";
    ctx.fill();
  }

  // Inner dashed border
  ctx.strokeStyle = "#8C5320";
  ctx.lineWidth = 1.5;
  ctx.setLineDash([3, 2]);
  ctx.strokeRect(6, 6, w - 12, h - 12);
  ctx.setLineDash([]);

  // Stamp Header
  ctx.textAlign = "center";
  ctx.font = "bold 9px 'Courier New', monospace";
  ctx.fillStyle = "#8C5320";
  ctx.fillText("INDIA POST", w / 2, 18);

  // State Name
  ctx.font = "bold 11px 'Georgia', serif";
  ctx.fillStyle = tintColor || "#5B0E1B";
  ctx.fillText(stateName.toUpperCase().slice(0, 14), w / 2, 32);

  // Crown / Heritage Motif Icon in center
  ctx.strokeStyle = tintColor || "#C59B27";
  ctx.lineWidth = 2;
  ctx.beginPath();
  const cx = w / 2;
  const cy = 54;
  // Stylized crown / arch
  ctx.moveTo(cx - 14, cy + 10);
  ctx.lineTo(cx - 14, cy - 4);
  ctx.lineTo(cx - 7, cy + 4);
  ctx.lineTo(cx, cy - 8);
  ctx.lineTo(cx + 7, cy + 4);
  ctx.lineTo(cx + 14, cy - 4);
  ctx.lineTo(cx + 14, cy + 10);
  ctx.closePath();
  ctx.fillStyle = tintColor || "#C59B27";
  ctx.fill();
  ctx.stroke();

  // Denomination & Footer
  ctx.font = "bold 9px 'Courier New', monospace";
  ctx.fillStyle = "#8C5320";
  ctx.fillText("HERITAGE", w / 2, 78);
  ctx.font = "bold 10px 'Courier New', monospace";
  ctx.fillStyle = "#5B0E1B";
  ctx.fillText("₹ 5.00", w / 2, 92);

  ctx.restore();
}

/**
 * Helper to draw a circular postal cancellation mark.
 */
function drawPostmark(ctx: CanvasRenderingContext2D, x: number, y: number, radius: number) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate((-12 * Math.PI) / 180); // -12 degree angle

  ctx.strokeStyle = "rgba(212, 175, 55, 0.85)";
  ctx.lineWidth = 1.8;
  ctx.setLineDash([5, 3]);

  // Outer circle
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, Math.PI * 2);
  ctx.stroke();

  // Inner circle
  ctx.beginPath();
  ctx.arc(0, 0, radius - 8, 0, Math.PI * 2);
  ctx.stroke();

  ctx.setLineDash([]);

  // Postmark text
  ctx.fillStyle = "rgba(212, 175, 55, 0.95)";
  ctx.font = "bold 10px 'Courier New', monospace";
  ctx.textAlign = "center";
  ctx.fillText("POST INDIA", 0, -6);
  ctx.font = "8px 'Courier New', monospace";
  ctx.fillText("2026 • ROOTS", 0, 8);

  // Wavy postal cancellation lines extending to the right
  ctx.strokeStyle = "rgba(212, 175, 55, 0.75)";
  ctx.lineWidth = 1.2;
  for (let row = -16; row <= 16; row += 8) {
    ctx.beginPath();
    for (let wx = radius + 6; wx <= radius + 55; wx += 2) {
      const wy = row + Math.sin(wx * 0.25) * 2.5;
      if (wx === radius + 6) ctx.moveTo(wx, wy);
      else ctx.lineTo(wx, wy);
    }
    ctx.stroke();
  }

  ctx.restore();
}

/**
 * Wraps text for canvas drawing within a maximum width.
 */
function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number
): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let currentLine = "";

  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    const width = ctx.measureText(testLine).width;

    if (width > maxWidth && currentLine) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  }

  if (currentLine) {
    lines.push(currentLine);
  }

  return lines;
}

/**
 * Generates the complete postcard image on a high-resolution Canvas and returns a PNG Blob.
 */
export async function generatePostcardCanvasBlob(
  options: PostcardCanvasOptions
): Promise<Blob | null> {
  if (typeof window === "undefined") return null;

  // Dimensions: 1600x1000 (16:10 luxurious editorial postcard proportion)
  let w = 1600;
  let h = 1000;

  if (options.aspectRatio === "square") {
    w = 1200;
    h = 1200;
  } else if (options.aspectRatio === "story") {
    w = 1000;
    h = 1500;
  } else if (options.aspectRatio === "landscape") {
    w = 1600;
    h = 900;
  }

  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;

  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  // 1. Load Background Image
  const img = await loadImageSafely(options.imageUrl);

  if (img && img.width > 0) {
    // Cover scale & center
    const scale = Math.max(w / img.width, h / img.height);
    const nw = img.width * scale;
    const nh = img.height * scale;
    const nx = (w - nw) / 2;
    const ny = (h - nh) / 2;
    ctx.drawImage(img, nx, ny, nw, nh);
  } else {
    // Fallback luxurious textured gradient background
    const bgGrad = ctx.createLinearGradient(0, 0, w, h);
    bgGrad.addColorStop(0, "#2D1810");
    bgGrad.addColorStop(0.5, "#1B1311");
    bgGrad.addColorStop(1, "#0D0A09");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, w, h);
  }

  // 2. Artistic Filter Tint Layer
  if (options.filter === "monochromatic") {
    const tint = options.tintHex || "5B0E1B";
    const cleanTint = tint.replace("#", "");
    const r = parseInt(cleanTint.substring(0, 2), 16) || 91;
    const g = parseInt(cleanTint.substring(2, 4), 16) || 14;
    const b = parseInt(cleanTint.substring(4, 6), 16) || 27;
    ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.45)`;
    ctx.fillRect(0, 0, w, h);
  } else if (options.filter === "golden" || options.filter === "desert_gold") {
    ctx.fillStyle = "rgba(197, 155, 39, 0.35)";
    ctx.fillRect(0, 0, w, h);
  } else if (options.filter === "sepia" || options.filter === "heritage_sepia") {
    ctx.fillStyle = "rgba(122, 88, 53, 0.45)";
    ctx.fillRect(0, 0, w, h);
  } else if (options.filter === "monsoon_teal") {
    ctx.fillStyle = "rgba(10, 70, 66, 0.40)";
    ctx.fillRect(0, 0, w, h);
  }

  // 3. Bottom Scrim Gradient for Letter Legibility
  const scrim = ctx.createLinearGradient(0, h * 0.35, 0, h);
  scrim.addColorStop(0, "rgba(0, 0, 0, 0)");
  scrim.addColorStop(0.35, "rgba(12, 9, 8, 0.45)");
  scrim.addColorStop(0.7, "rgba(12, 9, 8, 0.82)");
  scrim.addColorStop(1, "rgba(12, 9, 8, 0.95)");
  ctx.fillStyle = scrim;
  ctx.fillRect(0, h * 0.35, w, h * 0.65);

  // 4. Double Gold Border & Corner Accents
  ctx.strokeStyle = "rgba(212, 175, 55, 0.40)";
  ctx.lineWidth = 2;
  ctx.strokeRect(20, 20, w - 40, h - 40);

  ctx.strokeStyle = "#D4AF37";
  ctx.lineWidth = 1;
  ctx.strokeRect(26, 26, w - 52, h - 52);

  // 5. Postal Stamp (Top Right)
  const stampW = 100;
  const stampH = 120;
  const stampX = w - stampW - 40;
  const stampY = 36;
  drawPostalStamp(ctx, stampX, stampY, stampW, stampH, options.stateName, options.tintHex || "#5B0E1B");

  // 6. Circular Postmark Stamp (Beside Stamp)
  drawPostmark(ctx, stampX - 60, stampY + 50, 42);

  // 7. Postcard Letter & Dedication (Bottom Left)
  const marginX = 64;
  let textY = h - 230;

  // Eyebrow
  ctx.font = "bold 13px 'Courier New', monospace";
  ctx.fillStyle = "#E5C378";
  ctx.textAlign = "left";
  const eyebrow = `POSTCARD FROM ${options.stateName.toUpperCase()}${
    options.nativeStateName ? " • " + options.nativeStateName : ""
  }`;
  ctx.fillText(eyebrow, marginX, textY);

  // Recipient Dedication
  textY += 36;
  ctx.font = "bold 28px 'Georgia', serif";
  ctx.fillStyle = "#FAF7F0";
  ctx.fillText(options.recipient || "To someone longing for home,", marginX, textY);

  // Message / Letter
  textY += 30;
  ctx.font = "italic 18px 'Georgia', serif";
  ctx.fillStyle = "#EFE8DC";

  const messageText = options.message.startsWith('"') || options.message.startsWith('“')
    ? options.message
    : `“${options.message}”`;

  const maxTextWidth = w - 240;
  const wrappedLines = wrapText(ctx, messageText, maxTextWidth).slice(0, 3);

  for (const line of wrappedLines) {
    ctx.fillText(line, marginX, textY);
    textY += 26;
  }

  // Sender Signature
  textY += 8;
  ctx.font = "bold 17px 'Georgia', serif";
  ctx.fillStyle = "#D4AF37";
  ctx.fillText(`— ${options.sender || "With affection, A Traveler"}`, marginX, textY);

  // Bottom Right Museum Archive Attribution
  ctx.textAlign = "right";
  ctx.font = "11px 'Courier New', monospace";
  ctx.fillStyle = "rgba(255, 255, 255, 0.60)";
  ctx.fillText("ROOTS • CLOUDINARY EDGE SYNTHESIS", w - marginX, h - 40);

  // 8. Return lossless PNG Blob
  return new Promise<Blob | null>((resolve) => {
    canvas.toBlob(
      (blob) => {
        resolve(blob);
      },
      "image/png",
      1.0
    );
  });
}

/**
 * Triggers a direct client download of the composite postcard as a PNG file.
 */
export async function downloadPostcardAsPng(
  options: PostcardCanvasOptions,
  filename?: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const blob = await generatePostcardCanvasBlob(options);
    if (!blob) {
      throw new Error("Canvas generation failed to produce PNG blob");
    }

    const defaultName = `roots-${options.stateId || "india"}-postcard.png`;
    const finalFilename = filename
      ? filename.endsWith(".png")
        ? filename
        : `${filename}.png`
      : defaultName;

    const blobUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = finalFilename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => {
      URL.revokeObjectURL(blobUrl);
    }, 1500);

    return { success: true };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    console.error("Failed to download postcard as PNG:", err);
    return { success: false, error: errorMsg };
  }
}
