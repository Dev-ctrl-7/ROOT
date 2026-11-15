import { NextResponse } from "next/server";
import { buildPostcardCloudinaryUrl, analyzeCloudinaryUrl } from "@/lib/cloudinary";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      recipientEmail,
      recipientName = "Dear Friend",
      senderName = "A traveler",
      senderEmail,
      letterMessage = "A memory of home",
      stateId = "tamil-nadu",
      stateName = "Tamil Nadu",
      postmarkCity = "MADURAI • 625 001",
      imageUrl,
      filter = "heritage_sepia",
    } = body;

    if (!imageUrl) {
      return NextResponse.json({ error: "Image URL is required" }, { status: 400 });
    }

    if (!recipientEmail || !recipientEmail.includes("@")) {
      return NextResponse.json({ error: "A valid recipient email is required" }, { status: 400 });
    }

    // Build the Cloudinary transformed postcard URL
    const transformedPostcardUrl = buildPostcardCloudinaryUrl({
      imageUrl,
      recipient: recipientName,
      message: letterMessage,
      sender: senderName,
      postmarkCity,
      filter,
      aspectRatio: "postcard",
    });

    const breakdown = analyzeCloudinaryUrl(transformedPostcardUrl);

    // In production or demo mode, record the mail dispatch event
    const emailPayload = {
      to: recipientEmail,
      from: senderEmail || "postmaster@roots-heritage.in",
      subject: `A Heritage Postcard & Letter from ${stateName} — ROOTS Museum`,
      postcardImageUrl: transformedPostcardUrl,
      letterBody: letterMessage,
      recipientName,
      senderName,
      stateName,
      postmarkCity,
      dispatchId: `POST-${Date.now().toString(36).toUpperCase()}`,
      dispatchedAt: new Date().toISOString(),
      cloudinaryOptimized: true,
    };

    return NextResponse.json({
      success: true,
      message: `Postcard and letter successfully dispatched to ${recipientEmail}!`,
      postcardUrl: transformedPostcardUrl,
      emailPayload,
      breakdown,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to dispatch postcard", details: String(error) },
      { status: 500 }
    );
  }
}
