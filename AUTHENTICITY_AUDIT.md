# ROOTS — The Soul of India
## Comprehensive Line-by-Line Repository Authenticity & Architecture Audit

**Audit Date**: November 15, 2026  
**Auditor**: Principal Full-Stack Engineer, Cloudinary Solutions Architect & Cultural Heritage Researcher  
**Branch**: `remediation/authenticity-and-production`  
**Repository**: [https://github.com/Dev-ctrl-7/ROOT](https://github.com/Dev-ctrl-7/ROOT)  
**Hackathon Event**: Cloudinary November 2026 Mini-Hackathon ("Celebrate Where You're From")

---

## 1. Executive Summary & Audit Methodology

Every application source file (`58` source files across Next.js 16 App Router, React 19 components, API endpoints, and TypeScript libraries) was read, audited line-by-line, and cataloged.

Each hardcoded value, asset source, API integration, and architectural claim was classified into one of seven strict categories:
- **[A] Legitimate Fixed Configuration**: Sanctioned parameters (rate limit windows, server timeouts, Cloudinary cloud configuration).
- **[B] Legitimate Curated Cultural Content**: Curated anthropological and historical descriptions, regional capitals, GI tags, and living heritage records.
- **[C] Temporary Placeholder**: Demo assets or temporary stubs needing replacement with authenticated production assets.
- **[D] Simulated Functionality**: Browser-side CSS or mock routines mimicking backend/Cloudinary processing.
- **[E] Broken or Incomplete Integration**: Features wired to missing endpoints, misconfigured parameters, or unhandled promise chains.
- **[F] Misleading or Unsupported Claim**: Marketing text, UI badges, or modal cards asserting capabilities that are not executed or verified.
- **[G] Security or Reliability Defect**: SSRF risks, uncontrolled client parameters, missing MIME validation, or unhandled error cascades.

---

## 2. Line-by-Line Inventory & Defect Classification

### I. Cloudinary Media Core (`src/lib/cloudinary.ts`)

| Line(s) | Code Element | Classification | Severity | Impact & Recommendation |
| :--- | :--- | :---: | :---: | :--- |
| **L173–178** | `if (cloudName === "demo") return source;` | **[E] Broken Integration / [F] Misleading Claim** | **HIGH** | Silently returns the raw external image URL while the UI claims Cloudinary transformation succeeded. **Correction**: Explicitly label demo/raw fallbacks and provide transparent status flags. |
| **L183** | `samples/landscapes/beach-boat` fallback | **[C] Temporary Placeholder / [F] Misleading Claim** | **HIGH** | Replaces missing Indian cultural assets with a generic tropical beach boat. **Correction**: Remove generic non-Indian fallbacks; provide authentic monument fallbacks with clear provenance. |
| **L165** | `transforms.join(",")` with `l_text` | **[E] Broken Integration** | **HIGH** | Multiple `l_text` text overlays placed in a single comma-separated component instead of slash-separated `/` components violate Cloudinary transformation grammar. **Correction**: Segment text overlays into separate chained transformation components. |
| **L303** | `nativeStateName: "பாரதம்"` | **[F] Misleading Claim / [B] Content Bug** | **MEDIUM** | Hardcodes Tamil script ("பாரதம்") for every postcard regardless of state. **Correction**: Dynamically resolve the authentic native script for each of the 36 territories from `states-data.ts`. |
| **L198–212** | `filter === "sepia" / "golden" / "natural"` | **[E] Broken Integration** | **HIGH** | Postcard studio filter IDs (`heritage_sepia`, `monsoon_teal`, `desert_gold`, `burgundy_inferno`) failed equality checks, resulting in zero transformation. **Correction**: Support all filter IDs and generate real `e_sepia`, `e_tint`, `e_vignette`, and `e_contrast` parameters. |

---

### II. AI Heritage Lab (`src/components/CloudinaryAIHeritageLab.tsx`)

| Line(s) | Code Element | Classification | Severity | Impact & Recommendation |
| :--- | :--- | :---: | :---: | :--- |
| **L31, L44, L55, L66, L77** | `cssSimulatedEffect` on `AIFeature` | **[D] Simulated Functionality / [F] Misleading Claim** | **CRITICAL** | The interactive slider's "Transformed" layer applies CSS browser filters (`filter: selectedFeature.cssSimulatedEffect`) over the original image, pretending to be Cloudinary GenAI. **Correction**: Remove CSS simulation; call authentic Cloudinary AI transformations (`e_upscale`, `e_enhance`, `e_gen_restore`, `b_gen_fill`) when supported, and honestly display "Cloudinary GenAI add-on required" when unavailable. |
| **L405–408** | Badge: `"Cloudinary {selectedFeature.name}"` | **[F] Misleading Claim** | **HIGH** | Claims the CSS-filtered image is a verified Cloudinary AI output. **Correction**: Display genuine execution badge based on signed response status. |
| **L100** | Attribution: `"Archaeological Survey of India Protected Monument"` | **[F] Misleading Claim** | **MEDIUM** | Uses Unsplash tourism photos while claiming direct ASI archival provenance. **Correction**: Distinguish living contemporary documentation from official ASI glass-plate archival records. |

---

### III. Archive Lens & Historical Comparisons (`src/components/ArchiveLens.tsx`, `src/lib/cultural-data.ts`)

| Line(s) | Code Element | Classification | Severity | Impact & Recommendation |
| :--- | :--- | :---: | :---: | :--- |
| **cultural-data.ts: L310, L312, L326, L328, L342, L344, L358, L360, L374, L376, L389, L391** | Identical `imageThenFallback` & `imageNowFallback` | **[D] Simulated Functionality / [F] Misleading Claim** | **CRITICAL** | Every one of the 6 historical comparisons uses the exact same contemporary Unsplash image for both "THEN (1868–1892 CE)" and "NOW (Present Day)". **Correction**: Source authentic 19th-century public domain archival photographs (Linnaeus Tripe, Samuel Bourne, Lala Deen Dayal) for "THEN", pair with separate contemporary photographs for "NOW", and label any single-photo vintage grading mode as "Historical Visual Interpretation". |
| **ArchiveLens.tsx: L290–297** | Bare transformation tokens without `e_` | **[E] Broken Integration** | **HIGH** | `sepia:${sepia},tint:${intensity}:${hex}` lacked `e_`, causing `/api/cloudinary/sign-fetch` to reject requests with HTTP 400. **Correction**: Normalize and prefix canonical `e_sepia`, `e_tint`, `e_vignette`, `e_contrast`. |
| **ArchiveLens.tsx: L236** | `signedThenUrl` stale state | **[E] Broken Integration** | **MEDIUM** | Switching presets did not clear prior signed URLs, causing lag or fallback to raw images. **Correction**: Key `<ImageWithFallback>` by transformation state and reset signed URLs on preset selection. |

---

### IV. Camera & File Upload Pipelines (`src/components/CustomPostcardStudio.tsx`, `PostcardStudio.tsx`)

| Line(s) | Code Element | Classification | Severity | Impact & Recommendation |
| :--- | :--- | :---: | :---: | :--- |
| **CustomPostcardStudio.tsx: L190, L217** | `canvas.toDataURL("image/jpeg")`, `reader.readAsDataURL` | **[D] Simulated Functionality / [E] Broken Integration** | **HIGH** | Camera captures and file uploads produce `data:image/jpeg` strings kept in local React state, never uploaded to Cloudinary. The UI claims "Cloudinary Postal Atelier". **Correction**: Implement authenticated upload pipeline calling `/api/cloudinary/sign`, uploading to Cloudinary via multipart form-data, receiving genuine `public_id` and `secure_url`, and applying transformations server-side. Provide honest client-side fallback if the API key lacks upload privileges. |
| **CustomPostcardStudio.tsx: L622** | Unsigned `transformedUrl` directly rendered | **[E] Broken Integration** | **HIGH** | When unsigned fetch fails against Cloudinary's ACL, `imageLoadError` locks to `true` and renders raw un-graded images. **Correction**: Use `/api/cloudinary/sign-fetch` to authenticate fetch URLs with SHA-1 HMAC signatures. |
| **CustomPostcardStudio.tsx: L278–285** | Postcard download & copy | **[E] Broken Integration** | **MEDIUM** | Downloads raw or unsigned URLs rather than the finalized personalized artifact. **Correction**: Deliver signed Cloudinary URL with full graphic overlays. |

---

### V. Postcard Download & Personalization Pipeline (`src/app/api/postcard/download/route.ts`, `generate/route.ts`)

| Line(s) | Code Element | Classification | Severity | Impact & Recommendation |
| :--- | :--- | :---: | :---: | :--- |
| **download/route.ts: L80** | Hardcoded `Content-Type: image/jpeg` | **[G] Reliability Defect** | **LOW** | Always sets JPEG headers even when serving WebP or PNG assets. **Correction**: Detect and stream actual content type from upstream Cloudinary response. |
| **CustomPostcardStudio.tsx: L630–670** | Browser-only HTML/CSS overlays | **[D] Simulated Functionality** | **HIGH** | Postcard postal stamp, postmark cancellation ring, and recipient salutations are rendered as HTML divs over an image. Downloading the image directly from Cloudinary misses these client-only visual layers. **Correction**: Build a unified postcard generation pipeline that renders text overlays and postmarks via Cloudinary `l_text` and `l_` layers, or provides a composite canvas export so the downloaded image matches the on-screen preview 1:1. |

---

### VI. Email Dispatch & Test Mode Security (`src/app/api/postcard/send/route.ts`)

| Line(s) | Code Element | Classification | Severity | Impact & Recommendation |
| :--- | :--- | :---: | :---: | :--- |
| **send/route.ts: L206** | `if (testMode)` controlled by client request body | **[G] Security & Integrity Defect** | **HIGH** | Public clients can pass `testMode: true` in production to fabricate a successful email response without sending emails. **Correction**: Restrict `testMode` strictly to server-controlled development environments (`process.env.NODE_ENV !== "production"` or explicit server flag). |
| **send/route.ts: L219** | Mock dispatch claims in legacy code | **[F] Misleading Claim** | **MEDIUM** | Previously claimed mock dispatch ID `rec_mock_postcard_dispatch_2026`. **Correction**: Return honest 503 response with `configured: false` when `RESEND_API_KEY` is not present, explaining that email dispatch requires an active Resend key. |

---

### VII. Transformation Inspector & Verification Claims (`src/components/TransformationInspectorModal.tsx`)

| Line(s) | Code Element | Classification | Severity | Impact & Recommendation |
| :--- | :--- | :---: | :---: | :--- |
| **L39, L50, L61, L80** | Hardcoded status: `"Installed & Active"`, `"Installed & Verified"`, `"Verified & Executed"` | **[F] Misleading Claim** | **HIGH** | Displays unconditional green checkmarks regardless of actual SDK initialization, API key permissions, or runtime environment status. **Correction**: Derive statuses dynamically based on actual runtime checks (Package Installed, Configured in Environment, Runtime Verified, Permission Restricted). |
| **L44, L55** | Code snippets with unexecuted examples | **[F] Misleading Claim** | **MEDIUM** | Shows `CldUploadWidget` and `@cloudinary/url-gen` code snippets that are not executed on the page. **Correction**: Clarify that code snippets demonstrate architectural SDK patterns, while displaying actual active transformation pipelines for the currently viewed asset. |

---

### VIII. 36 States & Union Territories Dataset (`src/lib/states-data.ts`)

| Line(s) | Code Element | Classification | Severity | Impact & Recommendation |
| :--- | :--- | :---: | :---: | :--- |
| **L1–1500** | 180 image slots using only 47 unique URLs | **[C] Temporary Placeholder / [F] Misleading Claim** | **HIGH** | Heavy image reuse across distinct states (e.g. Rajasthan desert photography assigned to other states, or generic food photography reused across different regional cuisines). **Correction**: Provide authentic, culturally accurate imagery for hero, culinary, textile, and landmark destinations across all 36 territories with documented provenance. |
| **L1–1500** | Curator quotations and folklore attribution | **[B] Curated Cultural Content / [F] Unverified Attribution** | **MEDIUM** | Some quotations attributed to ancient texts or folk proverbs lack specific verse citations. **Correction**: Clearly attribute authentic Sangam/Vedic/Gurbani/Bhakti verses with specific source texts, and designate modern interpretive reflections as original ROOTS curatorial commentary. |

---

### IX. Other Heritage Components & Sensory Storytelling

| File & Line(s) | Code Element | Classification | Severity | Impact & Recommendation |
| :--- | :--- | :---: | :---: | :--- |
| **LetterFromHome.tsx: L120** | `REGIONAL_EPISTLES[selectedState] || REGIONAL_EPISTLES["tamil-nadu"]` | **[E] Incomplete Integration / [F] Misleading Fallback** | **MEDIUM** | Selecting states outside the 6 written epistles silently displays the Tamil Nadu letter ("தாய்நிலத்தின் மடல்") without informing the visitor. **Correction**: Provide bespoke epistles or display an honest notice: *"Curated Heritage Epistle: Tamil Nadu (Bespoke letter for {state} in compilation)"*. |
| **VoicesOfIndia.tsx: L87–200** | Web Audio API oscillator synthesis | **[B] Content / [F] Misleading Presentation** | **MEDIUM** | Generates microtonal frequencies via synth oscillators (`sawtooth`, `triangle`, `sine`) without labeling them as synthesized sound. **Correction**: Add explicit badge: *"Microtonal Acoustic Synthesis (Web Audio Oscillator Emulation)"* explaining that frequencies emulate classical ragas (Mohanam, Bhupali, Yaman). |
| **CulturalPassport.tsx: L150–220** | `localStorage` visitor stamp progress | **[A] Valid Local Storage / [F] Scope Claim** | **LOW** | Passport stamps are stored in client `localStorage`. **Correction**: Transparently label as *"Locally Saved Visitor Exploration Journal (Session/Browser Storage)"*. |

---

## 3. Remediation Roadmap

1. **Phase 2**: Rebuild `src/lib/cloudinary.ts` media engine (eliminate silent source/beach-boat fallbacks, chain overlays properly with `/`, support dynamic native script names).
2. **Phase 3**: Wire real camera/upload workflows in `CustomPostcardStudio.tsx` and `PostcardStudio.tsx` with server signing and honest fallback handling.
3. **Phase 4**: Rebuild `ArchiveLens.tsx` with authentic independent 19th-century public domain archival photographs vs separate modern photographs, with clear labeling for "Historical Visual Interpretation" mode.
4. **Phase 5**: Remove `cssSimulatedEffect` in `CloudinaryAIHeritageLab.tsx`, honestly displaying Cloudinary GenAI status and available live transformations.
5. **Phase 6**: Build canonical postcard generation pipeline with exportable composite rendering matching the on-screen preview 1:1.
6. **Phase 7**: Lock `testMode` in `/api/postcard/send/route.ts` to server-only environments and preserve content types in `/api/postcard/download/route.ts`.
7. **Phase 8**: Rebuild `TransformationInspectorModal.tsx` with evidence-based status indicators.
8. **Phase 9 & 10**: Audit all 36 state assets in `states-data.ts`, fix silent fallbacks in `LetterFromHome.tsx`, and add explicit synthesized labels in `VoicesOfIndia.tsx`.
9. **Phase 11 & 12**: Security hardening and comprehensive automated test suite.
10. **Phase 13 & 14**: Final verification reports and GitHub branch publication.
