import { NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

export async function GET(req: Request) {
  try {
    const rateLimit = checkRateLimit(req, {
      maxRequests: 30,
      windowMs: 60 * 1000,
      endpointName: "postcard-download",
    });

    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: "Too many download requests. Please wait a moment." },
        { status: 429 }
      );
    }

    const { searchParams } = new URL(req.url);
    const imageUrl = searchParams.get("url");
    const rawFilename = searchParams.get("filename") || "roots-cultural-postcard.jpg";

    if (!imageUrl) {
      return NextResponse.json({ error: "Missing image url parameter" }, { status: 400 });
    }

    // Validate URL to ensure it only proxies from trusted Cloudinary CDN or approved domains
    let parsedUrl: URL;
    try {
      parsedUrl = new URL(imageUrl);
    } catch {
      return NextResponse.json({ error: "Invalid URL provided" }, { status: 400 });
    }

    const allowedHosts = ["res.cloudinary.com", "images.unsplash.com"];
    const hostAllowed = allowedHosts.some(
      (h) => parsedUrl.hostname === h || parsedUrl.hostname.endsWith(`.${h}`)
    );

    if (!hostAllowed || parsedUrl.protocol !== "https:") {
      return NextResponse.json(
        { error: "Download proxy only allows approved Cloudinary or media hosts over HTTPS" },
        { status: 400 }
      );
    }

    // Sanitize filename
    const safeFilename = rawFilename
      .replace(/[^a-zA-Z0-9_-]/g, "_")
      .replace(/_+/g, "_")
      .slice(0, 60);
    const finalFilename = safeFilename.endsWith(".jpg") ? safeFilename : `${safeFilename}.jpg`;

    // Fetch the asset
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12000);

    const response = await fetch(imageUrl, { signal: controller.signal });
    clearTimeout(timeout);

    if (!response.ok) {
      return NextResponse.json(
        { error: `Upstream media server returned error: ${response.status}` },
        { status: response.status >= 400 && response.status < 500 ? 400 : 502 }
      );
    }

    const contentType = response.headers.get("content-type") || "image/jpeg";
    const arrayBuffer = await response.arrayBuffer();

    return new Response(arrayBuffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `attachment; filename="${finalFilename}"`,
        "Cache-Control": "public, max-age=86400, stale-while-revalidate=43200",
      },
    });
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    console.error("Postcard download proxy error:", error);
    return NextResponse.json(
      { error: "Failed to download postcard", details: errorMsg },
      { status: 500 }
    );
  }
}
