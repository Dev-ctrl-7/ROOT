import { NextResponse } from "next/server";
import { buildPostcardCloudinaryUrl, analyzeCloudinaryUrl } from "@/lib/cloudinary";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      imageUrl,
      recipient = "Dear Friend",
      message = "A memory of home",
      sender = "A traveler",
      postmarkCity = "MADURAI • 625 001",
      filter = "none",
      aspectRatio = "postcard",
    } = body;

    if (!imageUrl) {
      return NextResponse.json({ error: "imageUrl is required" }, { status: 400 });
    }

    const transformedUrl = buildPostcardCloudinaryUrl({
      imageUrl,
      recipient,
      message,
      sender,
      postmarkCity,
      filter,
      aspectRatio,
    });

    const breakdown = analyzeCloudinaryUrl(transformedUrl);

    return NextResponse.json({
      success: true,
      url: transformedUrl,
      breakdown,
      metadata: {
        recipient,
        sender,
        postmarkCity,
        filter,
        aspectRatio,
        generatedAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Postcard generation failed", details: String(error) },
      { status: 500 }
    );
  }
}
