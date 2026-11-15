import { NextResponse } from "next/server";
import crypto from "crypto";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const transformation = searchParams.get("transformation");
    const sourceUrl = searchParams.get("sourceUrl");

    if (!transformation || !sourceUrl) {
      return NextResponse.json(
        { error: "transformation and sourceUrl are required" },
        { status: 400 }
      );
    }

    const cloudName =
      process.env.CLOUDINARY_CLOUD_NAME ||
      process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ||
      "demo";
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    if (!apiSecret) {
      // Unsigned fetch fallback
      const url = `https://res.cloudinary.com/${cloudName}/image/fetch/${transformation}/${sourceUrl}`;
      return NextResponse.json({ url, signed: false });
    }

    // Cloudinary SHA1 signature for fetch URLs:
    // sha1(transformation + "/" + sourceUrl + apiSecret) -> base64 -> first 8 chars -> replace / with _ and + with -
    const toSign = `${transformation}/${sourceUrl}${apiSecret}`;
    const hash = crypto
      .createHash("sha1")
      .update(toSign)
      .digest("base64")
      .slice(0, 8)
      .replace(/\//g, "_")
      .replace(/\+/g, "-");

    const signedUrl = `https://res.cloudinary.com/${cloudName}/image/fetch/s--${hash}--/${transformation}/${sourceUrl}`;

    return NextResponse.json({ url: signedUrl, signature: `s--${hash}--`, signed: true });
  } catch (error) {
    console.error("Sign fetch error:", error);
    return NextResponse.json(
      { error: "Failed to generate signed Cloudinary URL" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { transformation, sourceUrl } = body;

    if (!transformation || !sourceUrl) {
      return NextResponse.json(
        { error: "transformation and sourceUrl are required" },
        { status: 400 }
      );
    }

    const cloudName =
      process.env.CLOUDINARY_CLOUD_NAME ||
      process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ||
      "demo";
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    if (!apiSecret) {
      const url = `https://res.cloudinary.com/${cloudName}/image/fetch/${transformation}/${sourceUrl}`;
      return NextResponse.json({ url, signed: false });
    }

    const toSign = `${transformation}/${sourceUrl}${apiSecret}`;
    const hash = crypto
      .createHash("sha1")
      .update(toSign)
      .digest("base64")
      .slice(0, 8)
      .replace(/\//g, "_")
      .replace(/\+/g, "-");

    const signedUrl = `https://res.cloudinary.com/${cloudName}/image/fetch/s--${hash}--/${transformation}/${sourceUrl}`;

    return NextResponse.json({ url: signedUrl, signature: `s--${hash}--`, signed: true });
  } catch (error) {
    console.error("Sign fetch error:", error);
    return NextResponse.json(
      { error: "Failed to generate signed Cloudinary URL" },
      { status: 500 }
    );
  }
}
