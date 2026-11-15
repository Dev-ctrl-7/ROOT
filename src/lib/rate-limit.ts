/**
 * Lightweight in-memory rate limiter for Next.js App Router API routes.
 * Tracks requests per client IP within a sliding time window.
 */

interface RateLimitRecord {
  count: number;
  resetTime: number;
}

const ipRequestMap = new Map<string, RateLimitRecord>();

// Clean up stale entries every 5 minutes
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [key, value] of ipRequestMap.entries()) {
      if (now > value.resetTime) {
        ipRequestMap.delete(key);
      }
    }
  }, 5 * 60 * 1000);
}

export function checkRateLimit(
  req: Request,
  options: { maxRequests: number; windowMs: number; endpointName?: string } = {
    maxRequests: 20,
    windowMs: 60 * 1000,
  }
): { allowed: boolean; remaining: number; resetInMs: number } {
  // Extract client IP from headers
  const forwardedFor = req.headers.get("x-forwarded-for");
  const realIp = req.headers.get("x-real-ip");
  const clientIp =
    (forwardedFor ? forwardedFor.split(",")[0].trim() : realIp) ||
    "127.0.0.1";

  const key = `${options.endpointName || "default"}:${clientIp}`;
  const now = Date.now();
  const record = ipRequestMap.get(key);

  if (!record || now > record.resetTime) {
    ipRequestMap.set(key, {
      count: 1,
      resetTime: now + options.windowMs,
    });
    return {
      allowed: true,
      remaining: options.maxRequests - 1,
      resetInMs: options.windowMs,
    };
  }

  if (record.count >= options.maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      resetInMs: Math.max(0, record.resetTime - now),
    };
  }

  record.count += 1;
  return {
    allowed: true,
    remaining: options.maxRequests - record.count,
    resetInMs: Math.max(0, record.resetTime - now),
  };
}
