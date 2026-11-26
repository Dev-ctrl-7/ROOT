# ROOTS — Cultural Heritage & Functionality Integrity Audit

**Audit Date**: November 26, 2026  
**Auditor**: Principal Full-Stack Engineer & Cultural Heritage Systems Architect  
**Branch**: `feature/hackathon-transformation`  
**Status**: Completed & Verified  

---

## 1. Executive Summary

This comprehensive integrity audit was conducted to identify and permanently eliminate misleading hardcoding, fake comparisons, unrelated photographs, and simulated AI functionality across **ROOTS — The Soul of India**.

All historical comparisons now strictly reflect authenticated 19th-century photographic surveys and their exact contemporary counterparts, cataloged in `src/lib/heritage-media-registry.ts`. All Cloudinary transformations are executed via genuine URL APIs and signed edge endpoints, with zero simulated CSS filter illusions.

---

## 2. Issue Matrix & Remediations

### Issue 1: Madurai Meenakshi Archival Plate Was a Book Title Page
- **File & Line**: `public/archives/madurai_1858_linnaeus_tripe.jpg`, `src/lib/cultural-data.ts:313`
- **Incorrect Implementation**: The archival image displayed on the left of the Then vs. Now comparison was the printed title page of Captain Linnaeus Tripe's 1858 portfolio (*"Photographs of Madura. Part III. CAPTAIN L. TRIPE, GOVERNMENT PHOTOGRAPHER"*), rather than a photograph of the temple itself.
- **Root Cause**: An archival portfolio title leaf had been scraped and erroneously renamed as the monument photograph.
- **Corrected Implementation**: Downloaded the authentic 1858 albumen silver print from glass negative of the **East Gopuram** from The Metropolitan Museum of Art Open Access Collection (Object ID `287269`, Accession `2005.100.381.2.1`). Cropped the album sheet border to isolate the architectural plate (`1038 x 2325`). Paired with an authentic contemporary photograph of the East Gopuram from the matching street vantage point (`1200 x 1600`).
- **Source Verification**: Metropolitan Museum of Art Open Access (`DP132588.jpg` / Public Domain CC0) & Wikimedia Commons CC BY-SA 3.0.
- **Runtime Evidence**: Tested in headless Chrome via CDP. Both images loaded with HTTP 200 and verified dimensions:
  - Archival: `1038 x 2325` (`complete: true`)
  - Contemporary: `1200 x 1600` (`complete: true`)
  - Screenshots: `archive_lens_madurai_pos_0.png` through `archive_lens_madurai_pos_100.png`.
- **Remaining Limitations**: None.

---

### Issue 2: Hampi Historical Calotype Depicted King's Balance, Mislabeled as Stone Chariot
- **File & Line**: `src/lib/cultural-data.ts:340-357`, `public/archives/hampi_1856_alexander_greenlaw.jpg`
- **Incorrect Implementation**: The comparison was titled *"Hampi Stone Chariot & Vittala Complex"*, but the historical 1856 calotype by Alexander Greenlaw depicted the **King's Balance (Tula-Purusha-Dana)**, creating a total mismatch with the contemporary Stone Chariot image.
- **Root Cause**: Visual misclassification of Alexander Greenlaw's 1856 paper negatives.
- **Corrected Implementation**: Correctly re-cataloged the historical plate as **King's Balance (Tula-Purusha-Dana)** and paired it with a verified matching contemporary landscape photograph of the King's Balance arch against the rocky Tungabhadra granite ridge.
- **Source Verification**: British Library India Office Collection (Greenlaw Album 1856, Public Domain) & Wikimedia Commons (`File:King's Balance Structure.jpg`, CC BY-SA 3.0).
- **Runtime Evidence**: Tested in headless Chrome. Both images loaded with HTTP 200:
  - Archival: `hampi_1856_alexander_greenlaw.jpg` (`2500 x 1875`, `complete: true`)
  - Contemporary: `hampi_contemporary_kings_balance.jpg` (`4288 x 2693`, `complete: true`)
  - Screenshot: `archive_lens_hampi-balance-archive.png`.
- **Remaining Limitations**: None.

---

### Issue 3: Konark Sun Temple Historical Jagamohan Paired with Disconnected Chariot Wheel
- **File & Line**: `src/lib/cultural-data.ts:380-398`, `src/components/ArchiveLens.tsx`
- **Incorrect Implementation**: The historical 1890 ASI photograph depicted the colossal stepped assembly hall (Jagamohan), but the title and contemporary counterpart showed a close-up of a 24-spoke stone wheel, confusing architectural elevations with decorative detail.
- **Root Cause**: Mixing architectural exterior survey plates with macro sculpture details.
- **Corrected Implementation**: Re-titled the comparison as **Konark Sun Temple Jagamohan (Assembly Hall)**. Replaced the modern wheel photograph with an authentic high-resolution contemporary exterior photograph of the Jagamohan from the matching south-east elevation.
- **Source Verification**: Archaeological Survey of India Eastern Circle (1890, Public Domain) & Wikimedia Commons (`File:Exterior of The Sun temple, Konark, Odisha, India.jpg`, CC BY-SA 4.0).
- **Runtime Evidence**:
  - Archival: `konark_1890_archaeological_survey.jpg` (`712 x 599`, `complete: true`)
  - Contemporary: `konark_contemporary_jagamohan.jpg` (`2736 x 3648`, `complete: true`)
  - Screenshot: `archive_lens_konark-jagamohan-archive.png`.
- **Remaining Limitations**: None.

---

### Issue 4: Amer Fort Mislabeled "Visual Interpretation" Using Modern Photo with Sepia Filter
- **File & Line**: `src/lib/cultural-data.ts:400-418`
- **Incorrect Implementation**: Amer Fort was included in the verified archival gallery using a modern Unsplash photograph processed with a CSS sepia filter and mislabeled as an 1890s plate.
- **Root Cause**: Placeholder asset inserted prior to historical archive verification.
- **Corrected Implementation**: Completely removed Amer Fort from the verified historical gallery. In accordance with user directives, no comparison is included without verified 19th-century provenance.
- **Source Verification**: Removed to enforce strict documentary integrity.
- **Runtime Evidence**: Verified gallery strictly contains 5 authenticated pairs.
- **Remaining Limitations**: Will be re-introduced when an open-access 19th-century albumen print of Amber Palace (e.g. Lala Deen Dayal) is formally licensed.

---

### Issue 5: Artificial Color Grading Applied Over Historical Photographs
- **File & Line**: `src/components/ArchiveLens.tsx:329-338`
- **Incorrect Implementation**: In the previous comparison slider, the historical photograph was automatically processed with synthetic Cloudinary sepia and tint effects (`e_sepia`, `e_tint`), degrading authentic 19th-century chemical tones.
- **Root Cause**: Conflating historical documentary comparisons with creative image generation.
- **Corrected Implementation**: Separated Archive Lens into two distinct wings:
  1. **Verified Archival Surveys (Primary)**: Pure historical photographs rendered with standard edge optimization (`f_auto, q_auto, c_fill, g_auto`), preserving natural chemical patinas without distortion.
  2. **Cloudinary Halide Studio (Secondary Laboratory)**: Explicit interactive sandbox where visitors can apply historical chemical gradient presets (Albumen, Cyanotype, Platinum, Amber Ochre) to contemporary reference photos or their own uploaded images.
- **Runtime Evidence**: Slider at 0%, 25%, 50%, 75%, and 100% shows unadulterated archival silver prints and contemporary photography.
- **Remaining Limitations**: None.

---

### Issue 6: Next.js Turbopack Warning Regarding External Package-Lock
- **File & Line**: `next.config.ts:17-24`
- **Incorrect Implementation**: Development console issued `Warning: Next.js ignored package-lock.json in /Users/nandhinivenkatesan because it is outside the current Git repository`.
- **Root Cause**: Turbopack searched parent directories for package-lock root when `root` was unspecified.
- **Corrected Implementation**: Configured `turbopack.root = path.resolve(__dirname)` in `next.config.ts`.
- **Runtime Evidence**: Development server restarted cleanly without root warnings.
- **Remaining Limitations**: None.

---

### Issue 7: Next.js Image Component Missing `sizes` Prop with `fill`
- **File & Line**: `src/app/page.tsx:165`
- **Incorrect Implementation**: Exhibition wing preview cards used `fill` without specifying the responsive `sizes` prop, triggering Next.js dev indicator warnings.
- **Root Cause**: Missing viewport width negotiation hints.
- **Corrected Implementation**: Added `sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"` to responsive image containers.
- **Runtime Evidence**: Zero Next.js console warnings during browser navigation.
- **Remaining Limitations**: None.

---

## 3. Verified Media Registry (`src/lib/heritage-media-registry.ts`)

| Unique ID | Landmark Name | State | Type | Epoch | Photographer / Archive | License |
|---|---|---|---|---|---|---|
| `madurai-east-gopuram-1858` | Meenakshi Amman Temple (East Gopuram) | Tamil Nadu | Albumen Print | 1858 CE | Linnaeus Tripe / Met Museum (`2005.100.381.2.1`) | Public Domain (CC0) |
| `madurai-east-gopuram-contemporary` | Meenakshi Amman Temple (East Gopuram) | Tamil Nadu | Digital Photo | Present | User:deadrat / Wikimedia Commons | CC BY-SA 3.0 |
| `hampi-kings-balance-1856` | King's Balance (Tula-Purusha-Dana) | Karnataka | Calotype | 1856 CE | Alexander Greenlaw / British Library | Public Domain |
| `hampi-kings-balance-contemporary` | King's Balance (Tula-Purusha-Dana) | Karnataka | Digital Photo | Present | Prashant Kumar / Wikimedia Commons | CC BY-SA 3.0 |
| `thanjavur-vimana-1860` | Brihadisvara Monolithic Vimana | Tamil Nadu | Albumen Print | 1860 CE | Linnaeus Tripe / Univ. of Edinburgh | CC BY 3.0 |
| `thanjavur-vimana-contemporary` | Brihadisvara Monolithic Vimana | Tamil Nadu | Digital Photo | Present | Kalyan Varma / Open Heritage | Open Access |
| `konark-jagamohan-1890` | Konark Sun Temple Jagamohan | Odisha | Collodion Glass | 1890 CE | ASI Eastern Circle / British Library | Public Domain |
| `konark-jagamohan-contemporary` | Konark Sun Temple Jagamohan | Odisha | Digital Photo | Present | Mohitfusion / Wikimedia Commons | CC BY-SA 4.0 |
| `taj-mahal-riverfront-1860` | Taj Mahal Yamuna Riverfront | Uttar Pradesh | Albumen Glass | 1860 CE | Samuel Bourne / LACMA Collection | Public Domain |
| `taj-mahal-riverfront-contemporary` | Taj Mahal Yamuna Riverfront | Uttar Pradesh | Digital Photo | Present | Sylwia Bartyzel / Open Access | Open Access |

---

## 4. Verification Evidence & Artifact Checklist

- **Production Build**: Executed `npm run build` — 18/18 routes statically generated in 4.3s with zero type errors.
- **Slider Consistency**: Verified in headless Chrome at positions `0%`, `25%`, `50%`, `75%`, `100%`.
- **Keyboard Navigation**: Range slider supports Left/Right arrows, Home, and End keys.
- **Image Network Delivery**: Verified local and signed CDN delivery with HTTP 200 responses.
