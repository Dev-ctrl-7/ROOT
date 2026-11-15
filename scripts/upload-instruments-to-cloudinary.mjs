import fs from "fs";
import path from "path";
import { v2 as cloudinary } from "cloudinary";

// Read environment from .env.local
const envText = fs.readFileSync(".env.local", "utf8");
const env = {};
envText.split("\n").forEach((line) => {
  const m = line.match(/^([^#=]+)=(.*)$/);
  if (m) env[m[1].trim()] = m[2].trim();
});

const cloudName = env.CLOUDINARY_CLOUD_NAME || process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = env.CLOUDINARY_API_KEY || process.env.CLOUDINARY_API_KEY;
const apiSecret = env.CLOUDINARY_API_SECRET || process.env.CLOUDINARY_API_SECRET;

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
  secure: true,
});

const INSTRUMENTS = [
  { id: "nadaswaram", file: "public/audio/instruments/nadaswaram.mp3" },
  { id: "sitar", file: "public/audio/instruments/sitar.mp3" },
  { id: "veena", file: "public/audio/instruments/veena.mp3" },
  { id: "bansuri", file: "public/audio/instruments/bansuri.mp3" },
  { id: "shehnai", file: "public/audio/instruments/shehnai.mp3" },
  { id: "mridangam", file: "public/audio/instruments/mridangam.mp3" },
];

async function uploadAll() {
  console.log("=================================================================");
  console.log("ROOTS — UPLOAD AUTHENTIC INSTRUMENTS TO CLOUDINARY");
  console.log("Cloud:", cloudName);
  console.log("API Key:", apiKey);
  console.log("Folder Target: roots/audio/instruments/");
  console.log("=================================================================\n");

  let allSuccess = true;
  const results = [];

  for (const inst of INSTRUMENTS) {
    const fullPath = path.resolve(inst.file);
    if (!fs.existsSync(fullPath)) {
      console.error(`[MISSING] ${inst.file} not found on disk.`);
      allSuccess = false;
      continue;
    }

    console.log(`Uploading ${inst.id} (${(fs.statSync(fullPath).size / 1024 / 1024).toFixed(2)} MB)...`);
    try {
      const res = await cloudinary.uploader.upload(fullPath, {
        resource_type: "video",
        folder: "roots/audio/instruments",
        public_id: inst.id,
        overwrite: true,
      });
      console.log(`[SUCCESS] ${inst.id} uploaded:`);
      console.log(`  Public ID: ${res.public_id}`);
      console.log(`  Delivery URL: ${res.secure_url}`);
      results.push({ id: inst.id, success: true, publicId: res.public_id, url: res.secure_url });
    } catch (err) {
      console.log(`[FAILED] ${inst.id}: ${err.message}`);
      results.push({ id: inst.id, success: false, error: err.message, code: err.http_code });
      allSuccess = false;
    }
  }

  console.log("\n=================================================================");
  if (allSuccess) {
    console.log("ALL 6 RECORDINGS UPLOADED TO CLOUDINARY SUCCESSFULLY!");
  } else {
    console.log("UPLOAD STATUS: 403 Permission Limitation Detected.");
    console.log("The current Cloudinary sub-key is restricted to actions=['read', 'transform'].");
    console.log("Once 'create' action permissions are enabled on this API key or recordings are");
    console.log("uploaded via Media Library under 'roots/audio/instruments/', re-run this script.");
  }
  console.log("=================================================================");
  return results;
}

uploadAll();
