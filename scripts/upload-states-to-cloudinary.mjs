/**
 * ROOTS — The Soul of India
 * Script: upload-states-to-cloudinary.mjs
 *
 * Uploads all 36 user-selected state images to Cloudinary Media Library
 * under roots/states/{state-id}/hero.
 *
 * Usage:
 *   node scripts/upload-states-to-cloudinary.mjs
 */

import fs from "fs";
import path from "path";
import { v2 as cloudinary } from "cloudinary";

// Load environment variables from .env.local
const envPath = path.resolve(process.cwd(), ".env.local");
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf8");
  envContent.split("\n").forEach((line) => {
    const match = line.match(/^([^#=]+)=(.*)$/);
    if (match) {
      process.env[match[1].trim()] = match[2].trim();
    }
  });
}

const cloudName = process.env.CLOUDINARY_CLOUD_NAME || process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

if (!cloudName || !apiKey || !apiSecret) {
  console.error("Missing Cloudinary credentials in .env.local");
  process.exit(1);
}

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
  secure: true,
});

const manifestPath = path.resolve(process.cwd(), "state_manifest_data.json");
if (!fs.existsSync(manifestPath)) {
  console.error("Missing state_manifest_data.json");
  process.exit(1);
}

const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));

async function uploadAll() {
  console.log(`\n=================================================================`);
  console.log(`ROOTS — Uploading 36 State Images to Cloudinary`);
  console.log(`Cloud: ${cloudName}`);
  console.log(`Target: roots/states/{state-id}/hero`);
  console.log(`=================================================================\n`);

  const results = [];

  for (let i = 0; i < manifest.length; i++) {
    const item = manifest[i];
    const folder = `roots/states/${item.stateId}`;
    const publicId = "hero";
    const fullPublicId = `${folder}/${publicId}`;

    console.log(`[${i + 1}/${manifest.length}] Uploading ${item.stateName} (${item.stateId})...`);
    console.log(`   Source: ${item.resolvedSourceUrl}`);

    try {
      const res = await cloudinary.uploader.upload(item.resolvedSourceUrl, {
        folder,
        public_id: publicId,
        overwrite: true,
        invalidate: true,
        tags: ["roots", "state-hero", item.stateId],
        context: {
          state: item.stateName,
          state_id: item.stateId,
          source_title: item.title,
          pinterest_url: item.pinterestUrl,
        },
      });

      console.log(`   ✓ Uploaded: ${res.public_id} (${res.bytes} bytes, ${res.format})`);
      console.log(`   ✓ Delivery: ${res.secure_url}`);

      results.push({
        stateId: item.stateId,
        stateName: item.stateName,
        status: "UPLOADED",
        publicId: res.public_id,
        secureUrl: res.secure_url,
        format: res.format,
        bytes: res.bytes,
      });
    } catch (err) {
      console.error(`   ✗ Error uploading ${item.stateId}: ${err.message}`);
      results.push({
        stateId: item.stateId,
        stateName: item.stateName,
        status: "ERROR",
        error: err.message,
      });
    }
  }

  const successCount = results.filter((r) => r.status === "UPLOADED").length;
  console.log(`\n=================================================================`);
  console.log(`Upload Complete: ${successCount}/${manifest.length} succeeded.`);
  console.log(`=================================================================\n`);

  fs.writeFileSync("cloudinary_upload_report.json", JSON.stringify(results, null, 2));
}

uploadAll().catch(console.error);
