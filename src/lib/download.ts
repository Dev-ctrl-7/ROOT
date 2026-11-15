/**
 * Client-side helper to download images reliably.
 * Solves the cross-origin <a> download attribute limitation in modern browsers.
 */

export async function downloadImageReliably(
  imageUrl: string,
  filename: string
): Promise<{ success: boolean; error?: string }> {
  try {
    // 1. Try fetching as Blob first (works if CORS headers are present on Cloudinary CDN)
    try {
      const response = await fetch(imageUrl, { mode: "cors" });
      if (response.ok) {
        const blob = await response.blob();
        const blobUrl = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = blobUrl;
        link.download = filename.endsWith(".jpg") ? filename : `${filename}.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setTimeout(() => window.URL.revokeObjectURL(blobUrl), 1000);
        return { success: true };
      }
    } catch {
      // CORS fetch error or opaque response, fall back to server proxy
    }

    // 2. Fall back to the server-side download proxy with Content-Disposition: attachment
    const proxyUrl = `/api/postcard/download?url=${encodeURIComponent(
      imageUrl
    )}&filename=${encodeURIComponent(filename)}`;
    const link = document.createElement("a");
    link.href = proxyUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    return { success: true };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Download failed";
    console.error("Reliable download failed:", err);
    return { success: false, error: errorMsg };
  }
}
