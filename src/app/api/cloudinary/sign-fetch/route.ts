import { NextResponse } from "next/server";
import crypto from "crypto";
import { checkRateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

// Host allowlist for remote image fetching
const ALLOWED_HOSTS = new Set([
  "images.unsplash.com",
  "upload.wikimedia.org",
  "commons.wikimedia.org",
  "res.cloudinary.com",
  "i.pinimg.com",
]);

// Private/internal IP prefixes to block (SSRF protection)
const PRIVATE_IP_PATTERNS = [
  /^127\./,
  /^10\./,
  /^172\.(1[6-9]|2[0-9]|3[0-1])\./,
  /^192\.168\./,
  /^169\.254\./,
  /^0\./,
  /^localhost$/i,
  /^\[?::1\]?$/,
  /^\[?fe80:/i,
];

// Allowlisted transformation tokens/patterns (supports canonical e_ prefixes and normalized variants)
const ALLOWED_TRANSFORM_SEGMENTS = [
  /^f_(auto|webp|avif|jpg|png)$/,
  /^q_(auto|auto:best|auto:good|auto:eco|auto:low|[0-9]{1,3})$/,
  /^c_(fill|fit|scale|pad|crop|thumb|limit)$/,
  /^g_(auto|center|north|south|east|west|face|faces)$/,
  /^w_[0-9]{1,4}$/,
  /^h_[0-9]{1,4}$/,
  /^ar_[0-9]+:[0-9]+$/,
  /^(e_)?sepia(:[0-9]{1,3})?$/,
  /^(e_)?tint:[0-9]{1,3}(:[0-9a-fA-F]{3,8}(:[0-9]{1,3})?)+$/,
  /^(e_)?vignette(:[0-9]{1,3})?$/,
  /^(e_)?contrast:[-0-9]{1,4}$/,
  /^(e_)?saturation:[-0-9]{1,4}$/,
  /^(e_)?colorize:[0-9]{1,3}$/,
  /^(e_)?grayscale$/,
  /^e_gen_restore$/,
  /^b_gen_fill$/,
  /^e_gen_background_replace(:prompt_[a-zA-Z0-9_\s%]+)?$/,
  /^e_upscale$/,
  /^e_enhance$/,
  /^l_text:[a-zA-Z0-9_%]+(:[a-zA-Z0-9_%-]+)*$/,
  /^co_(rgb:[0-9a-fA-F]{3,8}|[a-zA-Z]+)$/,
  /^b_rgb:[0-9a-fA-F]{3,8}$/,
  /^(e_)?gradient_fade(:[0-9]{1,3})?$/,
  /^x_[-0-9]{1,4}$/,
  /^y_[-0-9]{1,4}$/,
];

function normalizeTransformation(rawTransform: string): string {
  const segments = rawTransform
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const normalized = segments.map((seg) => {
    // Auto-prefix missing 'e_' for known Cloudinary effect parameters
    if (
      seg.startsWith("sepia:") ||
      seg === "sepia" ||
      seg.startsWith("tint:") ||
      seg.startsWith("vignette:") ||
      seg === "vignette" ||
      seg.startsWith("contrast:") ||
      seg.startsWith("saturation:") ||
      seg.startsWith("colorize:") ||
      seg === "grayscale"
    ) {
      return `e_${seg}`;
    }
    return seg;
  });

  return normalized.join(",");
}

function isSafeUrl(rawUrl: string): { valid: boolean; reason?: string } {
  try {
    const parsed = new URL(rawUrl);

    if (parsed.protocol !== "https:") {
      return { valid: false, reason: "Only HTTPS URLs are permitted" };
    }

    const hostname = parsed.hostname.toLowerCase();

    // Check private/internal IPs and localhost
    for (const pattern of PRIVATE_IP_PATTERNS) {
      if (pattern.test(hostname)) {
        return { valid: false, reason: "Access to private or local network hosts is prohibited" };
      }
    }

    // Check allowlisted hosts
    const hostAllowed = Array.from(ALLOWED_HOSTS).some(
      (allowed) => hostname === allowed || hostname.endsWith(`.${allowed}`)
    );

    if (!hostAllowed) {
      return {
        valid: false,
        reason: `Host '${hostname}' is not in the approved cultural media allowlist. Approved: Unsplash, Wikimedia Commons, Cloudinary, Pinterest images.`,
      };
    }

    return { valid: true };
  } catch {
    return { valid: false, reason: "Malformed URL" };
  }
}

function isSafeTransformation(transformation: string): { valid: boolean; reason?: string } {
  if (transformation.length > 600) {
    return { valid: false, reason: "Transformation string exceeds maximum allowable length" };
  }

  // Split comma-delimited segments
  const segments = transformation.split(",").map((s) => s.trim()).filter(Boolean);

  if (segments.length > 25) {
    return { valid: false, reason: "Too many transformation segments in request" };
  }

  for (const segment of segments) {
    const isAllowed = ALLOWED_TRANSFORM_SEGMENTS.some((pattern) => pattern.test(segment));
    if (!isAllowed) {
      return {
        valid: false,
        reason: `Unsupported or disallowed transformation parameter: '${segment}'`,
      };
    }
  }

  return { valid: true };
}

function generateSignedFetchUrl(
  cloudName: string,
  transformation: string,
  sourceUrl: string,
  apiSecret?: string
): { url: string; signed: boolean } {
  if (!apiSecret) {
    return {
      url: `https://res.cloudinary.com/${cloudName}/image/fetch/${transformation}/${encodeURIComponent(sourceUrl)}`,
      signed: false,
    };
  }

  // Cloudinary URL signature algorithm for fetch:
  // sha1(transformation + "/" + sourceUrl + apiSecret) -> base64 -> first 8 chars -> replace / with _ and + with -
  const toSign = `${transformation}/${sourceUrl}${apiSecret}`;
  const hash = crypto
    .createHash("sha1")
    .update(toSign)
    .digest("base64")
    .slice(0, 8)
    .replace(/\//g, "_")
    .replace(/\+/g, "-");

  return {
    url: `https://res.cloudinary.com/${cloudName}/image/fetch/s--${hash}--/${transformation}/${sourceUrl}`,
    signed: true,
  };
}

export async function GET(req: Request) {
  try {
    const rateLimit = checkRateLimit(req, {
      maxRequests: 30,
      windowMs: 60 * 1000,
      endpointName: "sign-fetch",
    });

    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: "Rate limit exceeded. Too many fetch requests." },
        { status: 429 }
      );
    }

    const { searchParams } = new URL(req.url);
    const transformation = searchParams.get("transformation");
    const sourceUrl = searchParams.get("sourceUrl");

    if (!transformation || !sourceUrl) {
      return NextResponse.json(
        { error: "Both 'transformation' and 'sourceUrl' query parameters are required" },
        { status: 400 }
      );
    }

    const urlCheck = isSafeUrl(sourceUrl);
    if (!urlCheck.valid) {
      return NextResponse.json(
        { error: "Invalid sourceUrl", details: urlCheck.reason },
        { status: 400 }
      );
    }

    const transformCheck = isSafeTransformation(transformation);
    if (!transformCheck.valid) {
      return NextResponse.json(
        { error: "Invalid transformation", details: transformCheck.reason },
        { status: 400 }
      );
    }

    const cloudName =
      process.env.CLOUDINARY_CLOUD_NAME ||
      process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ||
      "demo";
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    const normalizedTransform = normalizeTransformation(transformation);
    const result = generateSignedFetchUrl(cloudName, normalizedTransform, sourceUrl, apiSecret);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Sign fetch error:", error);
    return NextResponse.json(
      { error: "Failed to generate signed Cloudinary fetch URL" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const rateLimit = checkRateLimit(req, {
      maxRequests: 30,
      windowMs: 60 * 1000,
      endpointName: "sign-fetch",
    });

    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: "Rate limit exceeded. Too many fetch requests." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { transformation, sourceUrl } = body;

    if (!transformation || !sourceUrl) {
      return NextResponse.json(
        { error: "Both 'transformation' and 'sourceUrl' are required in request body" },
        { status: 400 }
      );
    }

    const urlCheck = isSafeUrl(sourceUrl);
    if (!urlCheck.valid) {
      return NextResponse.json(
        { error: "Invalid sourceUrl", details: urlCheck.reason },
        { status: 400 }
      );
    }

    const transformCheck = isSafeTransformation(transformation);
    if (!transformCheck.valid) {
      return NextResponse.json(
        { error: "Invalid transformation", details: transformCheck.reason },
        { status: 400 }
      );
    }

    const cloudName =
      process.env.CLOUDINARY_CLOUD_NAME ||
      process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ||
      "demo";
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    const normalizedTransform = normalizeTransformation(transformation);
    const result = generateSignedFetchUrl(cloudName, normalizedTransform, sourceUrl, apiSecret);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Sign fetch error:", error);
    return NextResponse.json(
      { error: "Failed to generate signed Cloudinary fetch URL" },
      { status: 500 }
    );
  }
}
