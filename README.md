# ROOTS — The Soul of India
> *"Every place has a story. Every story deserves to be felt."*

Built for the **Cloudinary November 2026 Mini-Hackathon: "Celebrate Where You're From"**  
Primary Scope: **Pan-Indian Cultural Heritage Across All 36 States & Union Territories**  
Deployment: Next.js 16 App Router on Vercel  

---

## 🏛️ Executive Summary & Product Vision

**ROOTS — The Soul of India** is an interactive, digital memory museum celebrating the profound cultural tapestry of India. Moving far beyond tourist clichés and superficial postcards, ROOTS provides an immersive living archive spanning all **28 Indian States and 8 Union Territories**:

- **Cultural Atlas**: An interactive vector map and 36-territory curated exhibition dashboard.
- **State Exhibitions**: Monochromatic visual identities for each state (e.g., Tamil Nadu Temple Bronze, Rajasthan Royal Burgundy, Kerala Backwater Emerald).
- **Living Heritage Galleries**: Deep explorations of regional cuisine (Taste), handloom textiles (Textiles), indigenous childhood games (Play), and sacred calendar celebrations (Festivals).
- **Archive Lens & AI Heritage Lab**: Stationary temporal comparison sliders contrasting 19th-century Archaeological Survey of India (ASI) photographic plates with contemporary living worship, alongside Cloudinary Generative AI restoration (`e_gen_restore`, `b_gen_fill`) and cultural video streaming via `CldVideoPlayer`.
- **Postal Bureau (Postcard Studio)**: Interactive edge-rendered postcard generation chaining multi-layer typographic overlays (`l_text`), postal cancellation marks, and heritage sepia toning.
- **Epistle from Home**: An intimate letter sealed with an ancient Tamil wax seal (**வேர்** / *Roots*) with Web Audio acoustic tanpura harmonics and bronze temple bells.

---

## ☁️ Cloudinary Architecture & Edge Pipeline

Cloudinary acts as the computational visual engine of ROOTS, performing media optimization, color grading, multi-layer typographic composition, and video streaming dynamically at the edge:

| # | Cloudinary Feature | Transformation Syntax | Cultural Role in ROOTS |
|---|---|---|---|
| **1** | **Automatic Format (f_auto)** | `f_auto` | Delivers AVIF/WebP depending on client browser support, reducing image bandwidth by >95% (e.g. 66 KB vs 3.8 MB). |
| **2** | **Automatic Quality (q_auto)** | `q_auto` | Perceptual quality optimization preserving intricate temple stonework and fine handloom weaves across high-DPI screens. |
| **3** | **Content-Aware Gravity (g_auto)** | `c_fill,g_auto`, `g_north`, `g_center` | Saliency detection automatically centers temple gopurams, architectural carvings, and artisan portraits. |
| **4** | **State Color Tinting** | `e_tint:60:<HEX_COLOR>` | Grades regional photography with authentic Pantone palettes (e.g. `e_tint:60:7A2E16` for Tamil Nadu, `e_tint:60:5B0E1B` for Rajasthan). |
| **5** | **Archival Sepia & Halide** | `e_sepia:75`, `e_grayscale`, `e_vignette:30` | Recreates 1860s albumen silver survey plates in the Archive Lens and vintage postcard modes. |
| **6** | **Edge Typographic Overlays** | `l_text:<font>_<size>_<weight>:<text>,co_rgb:<hex>,g_<pos>,x_<n>,y_<n>` | Synthesizes custom postcards with postal cancellation marks, recipient dedications, and handwritten letters without client canvas rendering. |
| **7** | **AI Heritage Restoration** | `e_gen_restore`, `b_gen_fill,c_pad` | Generative restoration of scratches on ancient temple plates and 16:9 widescreen outpainting. |
| **8** | **Cultural Video Player** | `CldVideoPlayer` (adaptive streaming) | Streams sacred elephant temple culture (`samples/elephants`) with customized burgundy/gold branding. |

---

## 🔒 Security & Enterprise Hardening

1. **Server-Side Credential Protection**: `CLOUDINARY_API_SECRET` is strictly restricted to server-side Node.js execution and is never exposed in client bundles or public repositories.
2. **Restricted Upload Signing (`/api/cloudinary/sign`)**:
   - Locked to server-controlled destination folder `roots_user_memories`.
   - Strict MIME type enforcement: `jpg`, `png`, `webp`, `avif`.
   - Strict file size cap: `10,485,760` bytes (10 MB).
   - IP-based sliding-window rate limiting (10 requests per minute).
3. **SSRF-Protected Remote Fetch (`/api/cloudinary/sign-fetch`)**:
   - Strict HTTPS protocol enforcement.
   - Private and loopback IP blocking (prevents SSRF attacks targeting internal networks/cloud metadata).
   - Strict domain allowlist (`res.cloudinary.com`, `images.unsplash.com`, `upload.wikimedia.org`, `commons.wikimedia.org`, `i.pinimg.com`).
   - Transformation string regex allowlist preventing arbitrary compute abuse.
   - IP-based sliding-window rate limiting (30 requests per minute).
4. **Real Transactional Email Delivery (`/api/postcard/send`)**:
   - Native integration with Resend REST API.
   - Full HTML entity escaping (`escapeHtml`) preventing template injection/XSS.
   - Input length validation (names ≤ 80 chars, messages ≤ 500 chars).
   - Honest HTTP 503 response stating `"Email delivery is not configured yet"` when `RESEND_API_KEY` is omitted, eliminating false delivery claims.
5. **Reliable Postcard Download Proxy (`/api/postcard/download`)**:
   - Resolves browser cross-origin download restrictions on `res.cloudinary.com`.
   - Delivers generated postcards as binary attachments with sanitized `Content-Disposition` headers.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 20+ (Node 24 LTS recommended)
- npm or pnpm


---

## 🧪 Quality Assurance & Build Verification

ROOTS has been verified with strict production criteria:
- **TypeScript**: `npx tsc --noEmit` exits with **0 errors**.
- **ESLint**: `npm run lint` exits with **0 errors**.
- **Next.js Turbopack Build**: `npm run build` compiles **17/17 routes** with zero warnings or hydration errors.
- **API Tests**: Verified with `curl` across rate limits, SSRF protection, signed uploads, and email handling.

---

## 📜 Cultural Attribution & Respect

Curated with deep reverence for the living artisans, Sthapatis, weavers, farmers, and storytellers across all 28 Indian States and 8 Union Territories who have preserved these living traditions across millennia.

*Licensed under the MIT License.*
