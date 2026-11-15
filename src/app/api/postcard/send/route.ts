import { NextResponse } from "next/server";
import { buildPostcardCloudinaryUrl, analyzeCloudinaryUrl } from "@/lib/cloudinary";
import { checkRateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

// HTML entity escaping to prevent email template injection / XSS
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email) && email.length <= 254;
}

function renderHeritageEmailTemplate(params: {
  recipientName: string;
  senderName: string;
  stateName: string;
  postmarkCity: string;
  letterMessage: string;
  postcardImageUrl: string;
}): string {
  const cleanRecipient = escapeHtml(params.recipientName);
  const cleanSender = escapeHtml(params.senderName);
  const cleanState = escapeHtml(params.stateName);
  const cleanPostmark = escapeHtml(params.postmarkCity);
  const cleanMessage = escapeHtml(params.letterMessage).replace(/\n/g, "<br/>");
  const cleanImageUrl = escapeHtml(params.postcardImageUrl);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>A Heritage Postcard from ${cleanState}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #F4EFE6; font-family: 'Georgia', 'Times New Roman', serif; color: #1C1814;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #F4EFE6; padding: 40px 15px;">
    <tr>
      <td align="center">
        <!-- Main Postcard Vessel Container -->
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width: 600px; width: 100%; background-color: #FAF8F5; border-radius: 18px; border: 1px solid #C59B27; overflow: hidden; box-shadow: 0 10px 30px rgba(91, 14, 27, 0.12);">
          
          <!-- Header Bar -->
          <tr>
            <td style="background-color: #5B0E1B; padding: 18px 28px; text-align: center; border-bottom: 2px solid #C59B27;">
              <span style="font-family: 'Courier New', monospace; font-size: 11px; letter-spacing: 3px; color: #E5C378; text-transform: uppercase; font-weight: bold;">
                INDIA POST &bull; THE CULTURAL MEMORY BUREAU
              </span>
              <h1 style="margin: 6px 0 0 0; color: #FAF8F5; font-size: 22px; font-weight: normal; font-family: 'Georgia', serif;">
                ROOTS &mdash; The Soul of India
              </h1>
            </td>
          </tr>

          <!-- Postcard Image (Cloudinary Transformed) -->
          <tr>
            <td style="padding: 24px 24px 0 24px; text-align: center;">
              <div style="border-radius: 12px; overflow: hidden; border: 1px solid #D4AF37; line-height: 0;">
                <img src="${cleanImageUrl}" alt="Postcard from ${cleanState}" width="552" style="width: 100%; max-width: 552px; height: auto; display: block; border: 0;" />
              </div>
            </td>
          </tr>

          <!-- Postal Cancellation Mark & Metadata -->
          <tr>
            <td style="padding: 16px 28px 8px 28px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="left" style="font-family: 'Courier New', monospace; font-size: 10px; color: #8C5320; letter-spacing: 1.5px; text-transform: uppercase;">
                    DISPATCH ORIGIN: ${cleanPostmark}
                  </td>
                  <td align="right" style="font-family: 'Courier New', monospace; font-size: 10px; color: #8C5320; letter-spacing: 1.5px; text-transform: uppercase;">
                    POSTAL REGION: ${cleanState}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Letter From Home -->
          <tr>
            <td style="padding: 12px 28px 24px 28px;">
              <div style="background-color: #FFFFFF; border-left: 3px solid #5B0E1B; border-radius: 6px; padding: 20px 24px; border: 1px solid #EADBCE; border-left-width: 4px; border-left-color: #5B0E1B;">
                <p style="margin: 0 0 12px 0; font-size: 16px; font-weight: bold; color: #5B0E1B;">
                  ${cleanRecipient},
                </p>
                <p style="margin: 0 0 16px 0; font-size: 14px; line-height: 1.7; color: #3A322B; font-style: italic;">
                  &ldquo;${cleanMessage}&rdquo;
                </p>
                <p style="margin: 0; font-size: 13px; font-weight: bold; color: #8C5320; text-align: right; font-family: 'Georgia', serif;">
                  &mdash; ${cleanSender}
                </p>
              </div>
            </td>
          </tr>

          <!-- Footer Seal & Cloudinary Engine Attribution -->
          <tr>
            <td style="background-color: #EFE8DC; padding: 16px 28px; text-align: center; border-top: 1px solid #D6C7B2;">
              <p style="margin: 0; font-family: 'Courier New', monospace; font-size: 11px; color: #6E6255; line-height: 1.5;">
                Transformed and delivered in real-time by Cloudinary Media Experience Cloud.<br/>
                Part of the <strong>ROOTS &mdash; The Soul of India</strong> Hackathon Exhibition.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export async function POST(req: Request) {
  try {
    // 1. Abuse Protection & Rate Limiting (5 dispatch requests/min per IP)
    const rateLimit = checkRateLimit(req, {
      maxRequests: 5,
      windowMs: 60 * 1000,
      endpointName: "postcard-send",
    });

    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          error: "Rate limit exceeded. Please wait a moment before sending another postcard.",
          retryAfterSeconds: Math.ceil(rateLimit.resetInMs / 1000),
        },
        { status: 429 }
      );
    }

    const body = await req.json();
    const {
      recipientEmail,
      recipientName = "Dear Friend",
      senderName = "A traveler",
      senderEmail,
      letterMessage = "A memory of home",
      stateName = "Tamil Nadu",
      postmarkCity = "MADURAI • 625 001",
      imageUrl,
      filter = "heritage_sepia",
      testMode = false,
    } = body;

    // 2. Strict Input Validation & Length Limits
    if (!imageUrl || typeof imageUrl !== "string") {
      return NextResponse.json({ error: "Image URL is required" }, { status: 400 });
    }

    if (!recipientEmail || !isValidEmail(String(recipientEmail).trim())) {
      return NextResponse.json(
        { error: "A valid recipient email address is required (e.g. name@example.com)" },
        { status: 400 }
      );
    }

    if (senderEmail && !isValidEmail(String(senderEmail).trim())) {
      return NextResponse.json(
        { error: "The provided sender email address is invalid" },
        { status: 400 }
      );
    }

    const trimmedRecipient = String(recipientName).trim().slice(0, 80);
    const trimmedSender = String(senderName).trim().slice(0, 80);
    const trimmedMessage = String(letterMessage).trim().slice(0, 500);

    if (trimmedMessage.length < 5) {
      return NextResponse.json(
        { error: "Postcard message must be at least 5 characters long" },
        { status: 400 }
      );
    }

    // 3. Build the Cloudinary transformed postcard URL
    const transformedPostcardUrl = buildPostcardCloudinaryUrl({
      imageUrl,
      recipient: trimmedRecipient,
      message: trimmedMessage,
      sender: trimmedSender,
      postmarkCity,
      filter,
      aspectRatio: "postcard",
    });

    const breakdown = analyzeCloudinaryUrl(transformedPostcardUrl);

    // 4. Check for Resend Transactional Email Provider Configuration
    const resendApiKey = process.env.RESEND_API_KEY;
    const fromEmail =
      process.env.RESEND_FROM_EMAIL || "ROOTS Postal Bureau <onboarding@resend.dev>";

    // Development Safe Testing Workflow:
    // If client requested testMode in development or if provider is intentionally in mock test mode
    if (testMode) {
      return NextResponse.json({
        success: true,
        testMode: true,
        message: `[TEST MODE] Postcard payload rendered successfully for ${recipientEmail}. Real email dispatch was skipped because testMode=true.`,
        postcardUrl: transformedPostcardUrl,
        breakdown,
      });
    }

    // If Resend API Key is NOT configured, report accurately to user:
    // NEVER falsely claim email delivery!
    if (!resendApiKey) {
      return NextResponse.json(
        {
          success: false,
          configured: false,
          error: "Email delivery is not configured yet.",
          details:
            "The email delivery provider (Resend) requires RESEND_API_KEY to be set in your server environment variables. Configure RESEND_API_KEY in .env.local to enable live transactional dispatch.",
          postcardUrl: transformedPostcardUrl,
          breakdown,
        },
        { status: 503 }
      );
    }

    // 5. Render Responsive Heritage HTML Email Template
    const emailHtml = renderHeritageEmailTemplate({
      recipientName: trimmedRecipient,
      senderName: trimmedSender,
      stateName,
      postmarkCity,
      letterMessage: trimmedMessage,
      postcardImageUrl: transformedPostcardUrl,
    });

    // 6. Execute Live Email Delivery via Resend API
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    try {
      const resendResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: fromEmail,
          to: [recipientEmail.trim()],
          reply_to: senderEmail ? senderEmail.trim() : undefined,
          subject: `A Heritage Postcard & Letter from ${stateName} — ROOTS Museum`,
          html: emailHtml,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const resendData = await resendResponse.json();

      if (!resendResponse.ok) {
        console.error("Resend delivery failed:", resendData);
        return NextResponse.json(
          {
            success: false,
            error: resendData.message || "Email provider failed to accept the message",
            providerDetails: resendData,
          },
          { status: resendResponse.status >= 400 && resendResponse.status < 500 ? 400 : 502 }
        );
      }

      // Return success ONLY after provider has verified acceptance with an ID
      return NextResponse.json({
        success: true,
        deliveryId: resendData.id,
        message: `Postcard and letter successfully dispatched to ${recipientEmail}!`,
        postcardUrl: transformedPostcardUrl,
        breakdown,
      });
    } catch (fetchError: unknown) {
      clearTimeout(timeoutId);
      if (fetchError instanceof Error && fetchError.name === "AbortError") {
        return NextResponse.json(
          { error: "Email delivery request timed out. Please try again." },
          { status: 504 }
        );
      }
      throw fetchError;
    }
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    console.error("Postcard dispatch error:", error);
    return NextResponse.json(
      { error: "Failed to dispatch postcard", details: errorMsg },
      { status: 500 }
    );
  }
}
