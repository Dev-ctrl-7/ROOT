# ROOTS — The Soul of India
## Hackathon Gap Analysis & Comprehensive Repository Audit (Phase 0)

**Competition**: Cloudinary November 2026 Mini-Hackathon — *"Celebrate Where You're From"*  
**Repository**: [https://github.com/Dev-ctrl-7/ROOT](https://github.com/Dev-ctrl-7/ROOT)  
**Branch**: `feature/hackathon-transformation`  
**Audit Date**: November 20, 2026  
**Auditor**: Principal Full-Stack Engineer, Creative Director & Cloudinary Solutions Architect  
**Benchmark Target**: `PRODHOSH/chennai-diorama` (interactivity, emotional storytelling, Cloudinary pipelines)

---

## 1. Executive Baseline & Repository Health

| Verification Check | Result | Details |
|---|---|---|
| **TypeScript Typecheck** | **PASS (0 errors)** | Next.js 16.4.5 + React 19 compilation across all 17 routes in 1371ms |
| **Production Build (`next build`)** | **PASS (17/17 routes)** | Static & dynamic routes compile cleanly with zero fatal errors |
| **ESLint (`npm run lint`)** | **PASS (0 errors, 66 warnings)** | Warnings restricted to unused variables and React useEffect hooks |
| **Local Server (`localhost:3000`)** | **RUNNING** | Next.js Turbopack dev server responsive |
| **Git Working Tree** | **CLEAN** | Switched to dedicated feature branch `feature/hackathon-transformation` |

---

## 2. In-Depth Feature Gap Matrix

| # | Feature / Subsystem | Relevant File Paths & Line Numbers | Current Implementation | Discovered Problem | Severity | Proposed Correction | Verification Criteria |
|---|---|---|---|---|---|---|---|
| **1** | **Postcard Studio Image Delivery** | `src/components/CustomPostcardStudio.tsx:70-82` | `AESTHETIC_GALLERY` array hardcodes 8 presets | **Karnataka Hampi Stone Chariot returns HTTP 404** (deleted upstream on Unsplash). **Punjab Harmandir Sahib displays an Off-White Nike sneaker** (`photo-1588099768531-a72d4a198538`) instead of the Golden Temple. | **CRITICAL (P0)** | Replace with authentic, verified signed Cloudinary URLs backed by repository assets (`/images/states/karnataka/hampi-stone-chariot.jpg` and `/images/states/punjab/harmandir-sahib.jpg`). Wrap gallery cards in `ImageWithFallback`. | Both images return HTTP 200; visual check confirms Hampi Chariot and Golden Temple render accurately in browser. |
| **2** | **Postcard Generation & Download Engine** | `src/app/api/postcard/generate/route.ts:21-36`, `src/lib/cloudinary.ts:364-436`, `src/components/CustomPostcardStudio.tsx:380-520` | `/api/postcard/generate` generates unsigned `/image/fetch/` URLs with `l_text` overlays | **Cloudinary returns HTTP 401 Unauthorized** because account `tecwmb40` enforces cryptographic signatures (`s--<hash>--`). The frontend `handleDownloadPostcard` secretly fell back to client-side `<canvas>` rather than delivering the real Cloudinary edge composite. | **CRITICAL (P0)** | Update `/api/postcard/generate` to sign the Cloudinary URL using `cloudinary.v2.url(..., { sign_url: true, type: "fetch" })` server-side with HMAC. Update download route `/api/postcard/download` to stream the real Cloudinary composite with personalization. | Generate postcard with unique name/message; verify Cloudinary URL returns HTTP 200; download file and confirm text is rasterized by Cloudinary. |
| **3** | **Archive Lens & Heritage Lab Broken References** | `src/components/ArchiveLens.tsx:167,189`, `src/components/CloudinaryAIHeritageLab.tsx:120`, `src/lib/cultural-data.ts:159,355` | Archival comparison sliders referencing deleted or mismatched Unsplash IDs | Line 189 in `ArchiveLens` references the Nike sneaker for Amritsar; line 167 references a Kerala canoe for Hampi; `CloudinaryAIHeritageLab:120` references the 404 Hampi ID. | **CRITICAL (P0)** | Update all monument comparisons to use authentic signed Cloudinary assets from the cultural archive. | All historical image sliders load both "Then" and "Now" images with HTTP 200 and zero broken tiles. |
| **4** | **Signature Experience: "A Journey Back Home"** | *New Feature (Phase 3)* | Not present in codebase. Users must jump between disconnected pages. | **Missing the emotional centerpiece of the hackathon submission.** No guided 5-chapter narrative (The Land, The Taste, The Celebration, The Memory, The Keepsake). | **HIGH (P1)** | Build `src/components/JourneyBackHome.tsx` and route `/journey`, driven by `ALL_INDIAN_STATES` data, with chapter progression, ambient audio, and direct tie-in to the Postcard Atelier. | Complete full 5-chapter journey on desktop and mobile for any chosen state. |
| **5** | **First 30 Seconds Opening Sequence** | `src/app/page.tsx`, `src/components/EditorialHero.tsx` | Homepage loads immediately into the hero section | Lacks an immersive, memorable museum-opening sequence with title reveal, the theme quote ("Every place has a story..."), and invitation ("Discover Your Roots"). | **HIGH (P1)** | Create `src/components/MuseumCurtainReveal.tsx`: a lightweight, skippable, accessible opening curtain with smooth transition into the Cultural Atlas. | First visit shows opening reveal; instantly skippable; respects `prefers-reduced-motion`. |
| **6** | **Cultural Passport Exploration Tracking** | `src/components/CulturalPassport.tsx:51-74`, `src/components/StateExhibitionView.tsx` | Passport stamps stored in `localStorage` under `roots_cultural_passport_stamps_v2` | Stamps can only be collected by manually clicking checkboxes on `/passport`. Exploring a state in the exhibition does not automatically stamp the passport. | **MEDIUM (P1/P2)** | Auto-record visited states when a user views a state in `StateExhibitionView` or finishes a state journey in `JourneyBackHome`. | Viewing an exhibition page increments passport stamp count automatically. |
| **7** | **Letter From Home State Coverage** | `src/components/LetterFromHome.tsx:25-110` | Hardcodes 6 state epistles (`tamil-nadu`, `rajasthan`, `kerala`, `punjab`, `west-bengal`, `kashmir`) | If a user selects any of the other 30 territories, it silently falls back to Tamil Nadu text instead of delivering a regionally authentic letter. | **MEDIUM (P2)** | Add dynamic regional letter generation engine pulling `epoch`, `taste.signatureDish`, `textiles.signatureWeave`, and `curatorQuote` for all 36 territories. | Selecting any of the 36 territories delivers an authentic regional letter and translation. |
| **8** | **Food Across India Card Truncation** | `src/components/FoodAcrossIndia.tsx:110` | Grid renders `filteredItems.slice(0, 12)` | Only displays 12 of India's 36 regions; remaining 24 regions are hidden unless searched. | **LOW (P2)** | Add "View All 36 Gastronomic Terroirs" button or responsive pagination. | User can view all 36 culinary regions without typing in the search box. |
| **9** | **Live Transformation Inspector Credibility** | `src/components/TransformationInspectorModal.tsx`, `src/lib/cloudinary.ts` | Modal shows parameters, explanations, and URLs | Cloudinary URLs must be guaranteed to return HTTP 200 and reflect real runtime transformations without broken assets. | **MEDIUM (P1)** | Audit every inspected preset in the modal; verify live status; display real payload headers. | Clicking "Inspect Cloudinary Pipeline" shows 100% live HTTP 200 signed URLs. |
| **10** | **Cross-Wing Visitor Flow Integration** | `src/components/Navigation.tsx`, `src/components/Footer.tsx` | Individual pages operate as isolated destinations | Visitors lack a clear curated pathway through the museum wings. | **MEDIUM (P2)** | Establish unified visitor journey: Atlas → State Exhibition → Journey Back Home → Postcard Atelier → Cultural Passport. | Each exhibition page includes an "Embark on Journey" CTA and "Send Postcard from Here" shortcut. |

---

## 3. Prioritized Implementation Roadmap

### Phase P0: Critical Integrity & Broken Asset Repairs (Immediate)
1. **Fix Postcard Atelier Gallery & Broken Presets**:
   - Update `AESTHETIC_GALLERY` in `CustomPostcardStudio.tsx` to replace Hampi 404 and Punjab sneaker with verified signed Cloudinary URLs.
   - Use `ImageWithFallback` for all gallery cards to prevent broken image icons.
2. **Server-Side HMAC Signed Postcard Generation & Real Download**:
   - Update `src/app/api/postcard/generate/route.ts` to generate cryptographically signed Cloudinary URLs via `cloudinary.v2.url` using server credentials.
   - Update `handleDownloadPostcard` in `CustomPostcardStudio.tsx` to download the real Cloudinary edge-rendered image via `/api/postcard/download`.
3. **Fix ArchiveLens & CloudinaryAIHeritageLab Asset References**:
   - Replace deleted and mismatched Unsplash URLs in `ArchiveLens.tsx`, `CloudinaryAIHeritageLab.tsx`, and `cultural-data.ts`.

### Phase P1: Core Differentiators & Signature Experience
4. **Build "A Journey Back Home" Signature Experience**:
   - Create `/journey` page and `src/components/JourneyBackHome.tsx`.
   - Implement the 5-chapter narrative engine (The Land, The Taste, The Celebration, The Memory, The Keepsake).
   - Integrate ambient sound and direct handoff to the Postcard Atelier.
5. **Implement First 30 Seconds Opening Sequence**:
   - Create `src/components/MuseumCurtainReveal.tsx` with title reveal, theme quote, and smooth entry into the Atlas.
6. **Live Transformation Inspector Enhancement**:
   - Ensure all inspected transformation URLs are verified live and display accurate technical breakdowns for hackathon judges.

### Phase P2: Experience Polish & Cohesive Navigation
7. **Synchronize Cultural Passport with Live Exploration**:
   - Automatically record stamps when visitors view state exhibitions or complete cultural journeys.
8. **Expand Letter From Home to All 36 Regions**:
   - Generate authentic dynamic epistles for all 36 states and union territories.
9. **Expand Food Across India**:
   - Add "View All 36 Regions" toggle to remove the 12-item slice limit.
10. **Unify Cross-Wing Visitor Flow**:
    - Add cohesive CTAs connecting Atlas → Exhibition → Journey → Postcard → Passport.

### Phase P3: Verification, Evidence & Submission Documentation
11. **Automated Verification Suite**:
    - Run unit tests, TypeScript compilation, and live URL checks.
12. **Generate Documentation**:
    - `docs/JUDGE_DEMO_SCRIPT.md` (3-minute demo script).
    - `docs/CLOUDINARY_EVIDENCE.md` (exact files, transformations, verified URLs).
    - `docs/FEATURE_VERIFICATION.md` (checklist of verified features).
    - `docs/ATTRIBUTIONS.md` (credits, licenses, and sources).
