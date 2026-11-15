# ROOTS — India, Beyond the Postcard
> *"Every place has a story. Every story deserves to be felt."*

Built for the **Cloudinary November 2026 Mini-Hackathon: "Celebrate Where You're From"**  
Primary Cultural Focus: **Tamil Nadu, India** (with extensible architecture for pan-Indian heritage)  
Live Demo: Deployed on Vercel  

---

## 🏛️ Executive Summary & Product Vision

**ROOTS** is an interactive digital memory museum of India. Stepping far beyond standard tourist clichés and glossy commercial postcards, ROOTS immerses visitors in the living soul of Tamil Nadu:
- Walk through the nocturnal flower markets of **Madurai** before dawn.
- Listen to monsoon rain drumming on the handmade Athangudi tiles in **Chettinad** palatial courtyards.
- Feel the weight of a thousand years of granite engineering and lost-wax cast bronzes in **Thanjavur**.
- Journey through the blue mountain mists and Toda tribal embroidery of the **Nilgiris**.

Every cultural chapter features a **Sensory Matrix** (Scent, Sound, Taste, Touch), an **Archive Lens** comparing 19th-century archaeological survey plates with contemporary photography, an interactive **Cloudinary Postal Bureau** where visitors generate personalized cultural postcards with dynamic text overlays, and a hidden **Letter From Home** surprise experience sealed with an ancient Tamil wax seal.

---

## ✨ Core Features & Visitor Journey

### 1. Cinematic Prologue & Museum Entrance
- Editorial dark-mode aesthetic with custom palette inspired by temple granite (`#0d0c0a`), warm parchment (`#f8f4ec`), raw saffron (`#e87722`), and muted temple gold (`#c5a059`).
- Hero banner dynamically optimized and delivered via Cloudinary (`f_auto, q_auto, c_fill, g_auto`).
- Procedural **Indian Temple & Monsoon Soundscape** powered by zero-bandwidth Web Audio API (acoustic tanpura harmonics, gentle monsoon rain, and resonant bronze temple bells).

### 2. Four Living Cultural Chapters
- **Madurai**: The Jasmine Capital & City That Never Sleeps (Nayaka Thousand-Pillar Hall, nocturnal parotta masters, Sungudi tie-and-dye handlooms).
- **Chettinad**: The Silk Road of Spice Merchants & 1,000-Window Mansions (Burma teak courtyards, stone-cooked pepper gravies, Athangudi handmade tiles).
- **Thanjavur**: Imperial Chola Seat of Living Bronze & Gold Leaf (UNESCO Brihadisvara Great Temple, Cauvery harvest prasadam, Swamimalai lost-wax bronze casting).
- **Nilgiris**: Blue Mountain Mist & Heritage Steam (UNESCO rack-and-pinion mountain railway, Toda Pukhoor tribal embroidery, orthodox hill teas).
- **Cultural Expansion Horizon**: Scalable architecture ready for Kerala backwaters, Varanasi ghats, and Rajasthan havelis.

### 3. Archive Lens: Then & Now
- Interactive comparison slider contrasting late 19th-century albumen silver prints (Madras Presidency Photographic Survey / British Library Archives) with modern living photography.
- Cloudinary vintage filter toggle (`e_sepia:75` and `e_grayscale`).

### 4. Cloudinary Postal Bureau (Interactive Postcard Studio)
- Compose custom memory of home with recipient name, message, signature, and postmark city.
- Select from authentic heritage scenes or upload your own heirloom family photograph.
- Real-time Cloudinary filter selection:
  - Heritage Sepia (`e_sepia:70`)
  - Golden Hour (`e_saturation:25,e_contrast:15`)
  - Temple Dusk (`e_art:incognito`)
  - Monochrome Archive (`e_grayscale`)
  - Natural Daylight (`f_auto,q_auto`)
- Responsive aspect ratios: Classic Postcard (16:9), Postal Square (1:1), Memory Story (9:16).
- Download generated postcard or copy the live Cloudinary URL directly.
- Celebratory confetti burst and memory registry.

### 5. Surprise Experience: "A Letter From Home" (ஒரு தாயகக் கடிதம்)
- An intimate sealed envelope with an authentic wax seal stamped with the ancient Tamil glyph **வேர்** (*Roots*).
- Interactive wax break interaction: triggers paper snap sound, gold shimmer particle burst, and unfolds into warm textured parchment.
- Bilingual poetic prose (Tamil calligraphy and lyrical English translation) capturing the scent of wet red soil and the enduring memory of home.

---

## ☁️ Cloudinary Technical Architecture

Cloudinary is the core delivery and transformation backbone of ROOTS:

| # | Cloudinary Capability | Implementation Syntax | Project Application |
|---|---|---|---|
| **1** | **Automatic Format (f_auto)** | `f_auto` | Delivers AVIF/WebP depending on browser support, cutting image payload by over 60%. |
| **2** | **Automatic Quality (q_auto)** | `q_auto` | Intelligent perceptual compression maintaining museum-grade detail across high-DPI screens. |
| **3** | **Content-Aware Gravity (g_auto)** | `c_fill,g_auto`, `g_north`, `g_center` | Saliency detection centers temple gopurams and artisan portraits seamlessly across viewports. |
| **4** | **Dynamic Text Overlays (l_text)** | `l_text:<font>_<size>_<weight>:<encoded_text>,co_rgb:<hex>,g_<pos>,x_<n>,y_<n>` | Generates real-time custom postcards with user dedication, memory note, and postmark cancellation. |
| **5** | **Artistic Effects & Filters** | `e_sepia:70`, `e_art:incognito`, `e_grayscale` | Powers historical visual treatments in the Archive Lens and vintage postcard moods. |
| **6** | **Secure Signed Uploads** | `cloudinary.utils.api_sign_request` via `/api/cloudinary/sign` | Enables visitors to securely upload heirloom photographs with server-side signature verification. |

### Live Parameter Breakdown Inspector
Every visitor and judge can click the **Cloudinary Engine** pill in the navigation or beneath the postcard canvas to inspect the live transformation pipeline with parameter-by-parameter explanations.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Turbopack, React 19)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS v4, Custom CSS variables for heritage palettes
- **Animation**: [Framer Motion](https://motion.dev/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Sound**: Procedural Web Audio API soundscape synthesizer (zero external dependencies)
- **Cloud Delivery**: Cloudinary Node.js SDK & Edge Transformation Engine
- **Effects**: Canvas-Confetti

---

## 🚀 Getting Started

### Prerequisites
- Node.js 20+ (Node 24 recommended)
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/nandhinivenkatesan/roots-the-soul-of-india.git
cd roots-the-soul-of-india

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env.local
```

### Environment Variables
Configure `.env.local`:
```env
# Cloudinary Configuration
# (If left as 'demo', the app runs fully functional using Cloudinary's demo cloud transformation engine)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=demo
CLOUDINARY_CLOUD_NAME=demo
CLOUDINARY_API_KEY=your_api_key_here
CLOUDINARY_API_SECRET=your_api_secret_here
CLOUDINARY_URL=cloudinary://your_key:your_secret@your_cloud_name
```

### Running Locally

```bash
# Run development server
npm run dev

# Or build and run production server
npm run build
npm run start
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🚢 Deployment to Vercel

1. Push code to GitHub repository.
2. Import project into [Vercel](https://vercel.com).
3. Set Environment Variables in Vercel project settings:
   - `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`
   - `CLOUDINARY_CLOUD_NAME`
   - `CLOUDINARY_API_KEY` (optional for signed uploads)
   - `CLOUDINARY_API_SECRET` (optional for signed uploads)
4. Deploy! Next.js 16 App Router deploys zero-config on Vercel.

---

## 🛠️ Official Cloudinary Hackathon Toolkits Implemented

ROOTS incorporates all four official Cloudinary developer toolkits:

| Toolkit | Package / Component | Implementation in ROOTS |
|---|---|---|
| **1. Next.js Starter Kit** | `next-cloudinary` (v7.1.0) | Powers `CldImage` responsive delivery, image transformations, and server-side signature negotiation. |
| **2. React AI Starter Kit** | `@cloudinary/react` & `@cloudinary/url-gen` | Powers the **Cloudinary AI Heritage Lab** with Generative AI restoration (`e_gen_restore`), Generative fill/outpainting (`b_gen_fill`), and neural upscaling (`e_upscale`). |
| **3. Skills Pack** | `cloudinary-devs/skills` | Full 6-skill package installed in `.agents/skills/` (`cloudinary-next`, `cloudinary-react`, `cloudinary-docs`, `cloudinary-transformations`, `cloudinary-upload`, `cloudinary-video`). |
| **4. AI Power Start Prompt** | Automated Stack Orchestrator | Multi-stage AI setup pipeline executing framework detection, SDK configuration, SHA-1 signed fetch endpoint (`/api/cloudinary/sign-fetch`), and delivery validation. |

---

## 🏆 Hackathon Judging Alignment

| Criteria | ROOTS Implementation |
|---|---|
| **1. Cloudinary Integration** | Employs 6 distinct Cloudinary capabilities (`f_auto`, `q_auto`, `c_fill, g_auto`, `l_text` multi-layer overlays, `e_sepia`/`e_art` filters, and `/api/cloudinary/sign` signed upload security). Cloudinary is the indispensable engine powering the Postcard Bureau and Archive Lens. |
| **2. Creativity** | Transforms static heritage into an interactive digital memory museum. Features a Web Audio procedural soundscape, interactive 19th-century archive slider, and an unfolding tactile "Letter From Home" with wax seal mechanics. |
| **3. Storytelling** | Deep, authentic cultural narratives from Tamil Nadu (Madurai, Chettinad, Thanjavur, Nilgiris) with verified historical context, oral histories, Sangam poetry inscriptions, and sensory profiles (scent, sound, taste, touch). |
| **4. User Experience** | Editorial museum design, Apple-grade interaction polish, responsive typography (`Cormorant Garamond` + `Plus Jakarta Sans`), accessible contrast ratios, and instant URL sharing/downloads. |

---

## 📜 Cultural Attribution & Respect

Curated with deep reverence for the living artisans, Sthapatis, weavers, flower merchants, and storytellers of Tamil Nadu who have preserved these living traditions across millennia.

*Licensed under the MIT License.*
