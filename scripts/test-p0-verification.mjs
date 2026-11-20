const BASE_URL = "http://localhost:3000";

async function runTests() {
  console.log("=== STARTING P0 RUNTIME VERIFICATION SUITE ===\n");
  let passed = 0;
  let failed = 0;

  const testCases = [
    {
      state: "Karnataka",
      nativeName: "ಕರ್ನಾಟಕ",
      postmark: "HAMPI • 583 239",
      imageUrl: "https://raw.githubusercontent.com/Dev-ctrl-7/ROOT/state-images/pinterest-cloudinary/public/images/states/karnataka/hampi-stone-chariot.jpg",
      recipient: "Dear Amma and Appa,",
      message: "Thinking of you among the stone pillars of Vittala.",
      sender: "Nandhini",
      filter: "heritage_sepia",
      aspectRatio: "postcard"
    },
    {
      state: "Punjab",
      nativeName: "ਪੰਜਾਬ",
      postmark: "AMRITSAR • 143 001",
      imageUrl: "https://raw.githubusercontent.com/Dev-ctrl-7/ROOT/state-images/pinterest-cloudinary/public/images/states/punjab/harmandir-sahib.jpg",
      recipient: "Dear Family,",
      message: "Peace at the sacred Amrit Sarovar at dusk.",
      sender: "Harpreet",
      filter: "desert_gold",
      aspectRatio: "postcard"
    },
    {
      state: "Rajasthan",
      nativeName: "राजस्थान",
      postmark: "JAIPUR • 302 001",
      imageUrl: "https://images.unsplash.com/photo-1599661046289-e31897846e41",
      recipient: "Dear Friends,",
      message: "Twilight over the pink sandstone ramparts of Amber.",
      sender: "Dev",
      filter: "burgundy_inferno",
      aspectRatio: "postcard"
    }
  ];

  for (const tc of testCases) {
    console.log(`--- Testing State: ${tc.state} ---`);
    // 1. Test POST /api/postcard/generate
    const genRes = await fetch(`${BASE_URL}/api/postcard/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tc)
    });

    if (!genRes.ok) {
      console.error(`FAIL: /api/postcard/generate returned HTTP ${genRes.status}`);
      failed++;
      continue;
    }

    const genData = await genRes.json();
    if (!genData.success || !genData.url) {
      console.error(`FAIL: /api/postcard/generate success is false:`, genData);
      failed++;
      continue;
    }
    console.log(`✓ /api/postcard/generate returned signed URL`);
    console.log(`  URL: ${genData.url}`);

    // Check that secret is not in the URL or payload
    if (JSON.stringify(genData).includes("RjfDvdz_GHYq-4wVgEQEL-TBi7I")) {
      console.error(`CRITICAL SECURITY FAIL: CLOUDINARY_API_SECRET found in response!`);
      failed++;
      continue;
    }

    // 2. Test Direct Cloudinary Edge Fetch
    const cldRes = await fetch(genData.url, { method: "HEAD" });
    const cldStatus = cldRes.status;
    const cldContentType = cldRes.headers.get("content-type");
    const cldContentLength = cldRes.headers.get("content-length");
    console.log(`✓ Cloudinary Edge Response: HTTP ${cldStatus}, Content-Type: ${cldContentType}, Size: ${cldContentLength} bytes`);

    if (cldStatus !== 200 || !cldContentType?.includes("image/")) {
      console.error(`FAIL: Cloudinary edge did not return 200 image. Status: ${cldStatus}`);
      failed++;
      continue;
    }

    // 3. Test /api/postcard/download Proxy Endpoint
    const dlUrl = `${BASE_URL}/api/postcard/download?url=${encodeURIComponent(genData.url)}&filename=roots-postcard-${tc.state.toLowerCase()}.jpg`;
    const dlRes = await fetch(dlUrl);
    const dlStatus = dlRes.status;
    const dlDisposition = dlRes.headers.get("content-disposition");
    const dlType = dlRes.headers.get("content-type");
    const dlBuffer = await dlRes.arrayBuffer();

    console.log(`✓ Download Proxy Response: HTTP ${dlStatus}, Content-Type: ${dlType}, Bytes: ${dlBuffer.byteLength}`);
    console.log(`  Header: ${dlDisposition}`);

    if (dlStatus === 200 && dlBuffer.byteLength > 50000 && dlDisposition?.includes("attachment")) {
      console.log(`✓ PASS: ${tc.state} Postcard successfully generated, edge-delivered, and downloaded!\n`);
      passed++;
    } else {
      console.error(`FAIL: Download proxy failed for ${tc.state}\n`);
      failed++;
    }
  }

  console.log(`=== TEST SUMMARY: ${passed} PASSED, ${failed} FAILED ===`);
  if (failed > 0) process.exit(1);
}

runTests().catch((err) => {
  console.error("Test execution failed:", err);
  process.exit(1);
});
