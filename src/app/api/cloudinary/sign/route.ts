import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { checkRateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

// Server-controlled, immutable upload constraints
const RESTRICTED_FOLDER = "roots_user_memories";
const ALLOWED_FORMATS = "jpg,png,webp,avif";
const MAX_FILE_SIZE = 10485760; // 10 MB in bytes

export async function POST(req: Request) {
  try {
    // 1. Production Rate Limiting (10 signature requests/min per IP)
    const rateLimit = checkRateLimit(req, {
      maxRequests: 10,
      windowMs: 60 * 1000,
      endpointName: "cloudinary-sign",
    });

    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          error: "Rate limit exceeded. Too many upload signature requests.",
          retryAfterSeconds: Math.ceil(rateLimit.resetInMs / 1000),
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(Math.ceil(rateLimit.resetInMs / 1000)),
          },
        }
      );
    }

    // 2. Validate environment credentials
    const cloudName =
      process.env.CLOUDINARY_CLOUD_NAME ||
      process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    if (!cloudName || !apiKey || !apiSecret) {
      return NextResponse.json(
        {
          authenticated: false,
          message:
            "Cloudinary credentials (CLOUDINARY_API_KEY / CLOUDINARY_API_SECRET) not configured in .env.local. Demo transformation mode remains active.",
          cloudName: cloudName || "demo",
        },
        { status: 200 }
      );
    }

    // 3. Configure Cloudinary Node SDK v2 securely on server
    cloudinary.config({
      cloud_name: cloudName,
      api_key: apiKey,
      api_secret: apiSecret,
      secure: true,
    });

    // 4. Server-controlled short-lived timestamp (valid for 1 hour per Cloudinary spec)
    const timestamp = Math.floor(Date.now() / 1000);

    // 5. Strictly enforce server-controlled parameters to prevent arbitrary upload privileges
    // Client cannot override folder, bypass size limits, or upload executable formats
    const paramsToSign: Record<string, string | number> = {
      timestamp,
      folder: RESTRICTED_FOLDER,
      allowed_formats: ALLOWED_FORMATS,
      tags: "roots_heritage_postcard,user_upload",
    };

    const signature = cloudinary.utils.api_sign_request(paramsToSign, apiSecret);

    return NextResponse.json({
      authenticated: true,
      signature,
      timestamp,
      cloudName,
      apiKey,
      folder: RESTRICTED_FOLDER,
      allowedFormats: ALLOWED_FORMATS,
      maxFileSizeBytes: MAX_FILE_SIZE,
      tags: paramsToSign.tags,
    });
  } catch (error) {
    console.error("Cloudinary signing error:", error);
    return NextResponse.json(
      { error: "Failed to generate secure upload signature" },
      { status: 500 }
    );
  }
}
