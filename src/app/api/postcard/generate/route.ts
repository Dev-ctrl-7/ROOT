import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { analyzeCloudinaryUrl } from "@/lib/cloudinary";

// Configure Cloudinary server-side SDK with private credentials
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "tecwmb40",
  api_key: process.env.CLOUDINARY_API_KEY || "227998285158289",
  api_secret: process.env.CLOUDINARY_API_SECRET || "RjfDvdz_GHYq-4wVgEQEL-TBi7I",
  secure: true,
});

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      imageUrl,
      recipient = "To someone longing for home,",
      message = "The scent of red soil and rain carries memories of our roots.",
      sender = "With love, A traveler",
      stateName = "INDIA",
      nativeName = "भारत",
      postmarkCity = "NEW DELHI • 110 001",
      filter = "heritage_sepia",
      aspectRatio = "postcard",
    } = body;

    if (!imageUrl) {
      return NextResponse.json({ error: "imageUrl is required" }, { status: 400 });
    }

    // Determine dimensions based on aspect ratio
    let width = 1200;
    let height = 750;
    if (aspectRatio === "square") {
      width = 1000;
      height = 1000;
    } else if (aspectRatio === "story") {
      width = 800;
      height = 1200;
    } else if (aspectRatio === "landscape") {
      width = 1200;
      height = 675;
    }

    // Base transformation layer
    const transformation: Record<string, unknown>[] = [
      { width, height, crop: "fill", gravity: "auto" },
      { fetch_format: "auto", quality: "auto" },
    ];

    // Filter styling
    if (filter === "heritage_sepia") {
      transformation.push({ effect: "sepia:70" });
    } else if (filter === "monsoon_teal") {
      transformation.push({ effect: "tint:50:0A4642" });
    } else if (filter === "desert_gold") {
      transformation.push({ effect: "tint:50:C59B27" });
    } else if (filter === "burgundy_inferno") {
      transformation.push({ effect: "tint:55:5B0E1B" });
    }

    // Top-Left Header: Postcard From State
    const headerText = `POSTCARD FROM ${stateName.toUpperCase()}${nativeName ? ` • ${nativeName}` : ""}`;
    transformation.push({
      overlay: {
        font_family: "Arial",
        font_size: width < 1000 ? 18 : 22,
        font_weight: "bold",
        text: headerText,
      },
      color: "rgb:E5C378",
      gravity: "north_west",
      x: 48,
      y: 48,
    });

    // Top-Right Dispatch / Postmark
    if (postmarkCity) {
      transformation.push({
        overlay: {
          font_family: "Courier New",
          font_size: width < 1000 ? 13 : 16,
          font_weight: "bold",
          text: `DISPATCH: ${postmarkCity}`,
        },
        color: "rgb:D4AF37",
        gravity: "north_east",
        x: 48,
        y: 48,
      });
    }

    // Bottom-Left Dedication / Recipient
    if (recipient) {
      transformation.push({
        overlay: {
          font_family: "Georgia",
          font_size: width < 1000 ? 24 : 30,
          font_weight: "bold",
          text: recipient,
        },
        color: "rgb:FAF7F0",
        gravity: "south_west",
        x: 48,
        y: 155,
      });
    }

    // Bottom-Left Message
    if (message) {
      // Truncate long messages for Cloudinary single overlay URL limit safety
      const safeMessage = message.length > 120 ? `${message.slice(0, 117)}...` : message;
      transformation.push({
        overlay: {
          font_family: "Arial",
          font_size: width < 1000 ? 18 : 22,
          font_style: "italic",
          text: `"${safeMessage}"`,
        },
        color: "rgb:EFE8DC",
        gravity: "south_west",
        x: 48,
        y: 95,
      });
    }

    // Bottom-Left Sender Signature
    if (sender) {
      transformation.push({
        overlay: {
          font_family: "Arial",
          font_size: width < 1000 ? 16 : 20,
          font_weight: "bold",
          text: sender.startsWith("-") ? sender : `- ${sender}`,
        },
        color: "rgb:D4AF37",
        gravity: "south_west",
        x: 48,
        y: 48,
      });
    }

    // Determine whether imageUrl is a public ID or remote URL
    const isRemoteUrl = imageUrl.startsWith("http://") || imageUrl.startsWith("https://");

    // Clean source asset URL: strip query parameters for remote fetch to prevent signature distortion
    let sourceAsset = imageUrl.trim();
    if (isRemoteUrl) {
      if (sourceAsset.includes("res.cloudinary.com/")) {
        const match = sourceAsset.match(/\/image\/fetch\/(?:s--[A-Za-z0-9_-]+--\/)?[^\/]+\/(https?:\/\/.+)$/);
        if (match) {
          sourceAsset = match[1];
        }
      }
      // Strip query parameters from remote source URLs so Cloudinary's HMAC signature matches
      sourceAsset = sourceAsset.split("?")[0];
    }

    // Generate cryptographically signed Cloudinary delivery URL
    const signedUrl = cloudinary.url(sourceAsset, {
      type: isRemoteUrl ? "fetch" : "upload",
      sign_url: true,
      transformation,
    });

    const breakdown = analyzeCloudinaryUrl(signedUrl);

    return NextResponse.json({
      success: true,
      url: signedUrl,
      breakdown,
      metadata: {
        stateName,
        nativeName,
        postmarkCity,
        recipient,
        sender,
        filter,
        aspectRatio,
        width,
        height,
        generatedAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("Cloudinary Postcard generation error:", error);
    return NextResponse.json(
      { error: "Postcard generation failed", details: String(error) },
      { status: 500 }
    );
  }
}
