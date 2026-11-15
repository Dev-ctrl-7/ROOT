import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { folder = "roots_user_memories" } = body;

    const cloudName = process.env.CLOUDINARY_CLOUD_NAME || process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    // Check if real credentials are provided
    if (!cloudName || !apiKey || !apiSecret) {
      return NextResponse.json(
        {
          authenticated: false,
          message:
            "Cloudinary credentials (CLOUDINARY_API_KEY / SECRET) not configured in .env.local. Demo transformation mode remains active.",
          cloudName: cloudName || "demo",
        },
        { status: 200 }
      );
    }

    cloudinary.config({
      cloud_name: cloudName,
      api_key: apiKey,
      api_secret: apiSecret,
      secure: true,
    });

    const timestamp = Math.round(new Date().getTime() / 1000);
    const signature = cloudinary.utils.api_sign_request(
      {
        timestamp,
        folder,
      },
      apiSecret
    );

    return NextResponse.json({
      authenticated: true,
      signature,
      timestamp,
      cloudName,
      apiKey,
      folder,
    });
  } catch (error) {
    console.error("Cloudinary signing error:", error);
    return NextResponse.json(
      { error: "Failed to generate signature", details: String(error) },
      { status: 500 }
    );
  }
}
