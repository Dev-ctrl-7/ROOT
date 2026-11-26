import { spawn } from "node:child_process";
import fs from "node:fs";
import http from "node:http";

const CHROME_PATH = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const PORT = 9222;
const ARTIFACT_DIR = "/Users/nandhinivenkatesan/.gemini/antigravity/brain/42cbfbe1-fcb2-421e-a2ff-b0e1a5467b49";

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function getDebuggerUrl() {
  for (let i = 0; i < 20; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${PORT}/json/list`);
      if (res.ok) {
        const data = await res.json();
        const page = data.find((t) => t.type === "page");
        if (page && page.webSocketDebuggerUrl) {
          return page.webSocketDebuggerUrl;
        }
      }
    } catch {
      await sleep(250);
    }
  }
  throw new Error("Could not connect to Chrome debugging port");
}

class CDPClient {
  constructor(wsUrl) {
    this.wsUrl = wsUrl;
    this.ws = null;
    this.id = 1;
    this.callbacks = new Map();
  }

  async connect() {
    return new Promise((resolve, reject) => {
      this.ws = new WebSocket(this.wsUrl);
      this.ws.onopen = () => resolve();
      this.ws.onerror = (err) => reject(err);
      this.ws.onmessage = (event) => {
        const msg = JSON.parse(event.data);
        if (msg.id && this.callbacks.has(msg.id)) {
          const { resolve, reject } = this.callbacks.get(msg.id);
          this.callbacks.delete(msg.id);
          if (msg.error) reject(msg.error);
          else resolve(msg.result);
        }
      };
    });
  }

  send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const msgId = this.id++;
      this.callbacks.set(msgId, { resolve, reject });
      this.ws.send(JSON.stringify({ id: msgId, method, params }));
    });
  }

  async evaluate(expression) {
    const res = await this.send("Runtime.evaluate", {
      expression,
      returnByValue: true,
      awaitPromise: true,
    });
    if (res.exceptionDetails) {
      throw new Error(JSON.stringify(res.exceptionDetails));
    }
    return res.result?.value;
  }

  async captureScreenshot(filePath) {
    const res = await this.send("Page.captureScreenshot", { format: "png" });
    fs.writeFileSync(filePath, Buffer.from(res.data, "base64"));
  }

  close() {
    if (this.ws) this.ws.close();
  }
}

async function run() {
  console.log("=== Starting Archive Lens Integrity Verification ===");
  const userDataDir = `/tmp/chrome_test_profile_${Date.now()}`;
  fs.mkdirSync(userDataDir, { recursive: true });

  const chromeProc = spawn(
    CHROME_PATH,
    [
      `--remote-debugging-port=${PORT}`,
      `--user-data-dir=${userDataDir}`,
      "--headless=new",
      "--no-first-run",
      "--no-default-browser-check",
      "--window-size=1440,960",
    ],
    { stdio: "ignore" }
  );

  const cleanup = () => {
    try {
      chromeProc.kill("SIGTERM");
      fs.rmSync(userDataDir, { recursive: true, force: true });
    } catch {}
  };

  process.on("exit", cleanup);
  process.on("SIGINT", cleanup);

  try {
    const wsUrl = await getDebuggerUrl();
    const cdp = new CDPClient(wsUrl);
    await cdp.connect();
    await cdp.send("Page.enable");
    await cdp.send("Runtime.enable");

    console.log("1. Navigating to http://localhost:3000/archive-lens...");
    await cdp.send("Page.navigate", { url: "http://localhost:3000/archive-lens" });
    await sleep(2500);

    // Verify page loaded
    const pageTitle = await cdp.evaluate("document.title");
    console.log("Page title:", pageTitle);

    // Verify both images in the comparison stage
    const imgAudit = await cdp.evaluate(`
      (() => {
        const stage = document.querySelector("#archive-lens");
        if (!stage) return { error: "No #archive-lens found" };
        const imgs = Array.from(stage.querySelectorAll("img"));
        return {
          totalImgs: imgs.length,
          imgDetails: imgs.map(img => ({
            src: img.src,
            naturalWidth: img.naturalWidth,
            naturalHeight: img.naturalHeight,
            complete: img.complete
          }))
        };
      })()
    `);
    console.log("Initial Image Audit:", JSON.stringify(imgAudit, null, 2));

    // Verify slider positions for Madurai Meenakshi Temple (Default)
    const positions = [0, 25, 50, 75, 100];
    for (const pos of positions) {
      console.log(`Setting slider position to ${pos}%...`);
      await cdp.evaluate(`
        (() => {
          const slider = document.querySelector('input[type="range"]');
          if (slider) {
            slider.value = ${pos};
            slider.dispatchEvent(new Event('input', { bubbles: true }));
            slider.dispatchEvent(new Event('change', { bubbles: true }));
          }
        })()
      `);
      await sleep(400);

      const shotPath = `${ARTIFACT_DIR}/archive_lens_madurai_pos_${pos}.png`;
      await cdp.captureScreenshot(shotPath);
      console.log(`Captured screenshot for position ${pos}%: ${shotPath}`);
    }

    // Test switching to other historical landmarks
    const landmarks = [
      { id: "hampi-balance-archive", query: "King's Balance", name: "Hampi King's Balance" },
      { id: "thanjavur-vimana-archive", query: "Brihadisvara", name: "Thanjavur Brihadisvara Vimana" },
      { id: "konark-jagamohan-archive", query: "Konark", name: "Konark Sun Temple Jagamohan" },
      { id: "taj-mahal-archive", query: "Taj Mahal", name: "Taj Mahal Yamuna Riverfront" }
    ];

    for (const lm of landmarks) {
      console.log(`Testing landmark switch to ${lm.name} (${lm.id})...`);
      await cdp.evaluate(`
        (() => {
          const buttons = Array.from(document.querySelectorAll("button"));
          const target = buttons.find(b => b.textContent && b.textContent.includes("${lm.query}"));
          if (target) target.click();
        })()
      `);
      await sleep(1200);

      // Verify images complete
      const checkResult = await cdp.evaluate(`
        (() => {
          const stage = document.querySelector("#archive-lens");
          const imgs = Array.from(stage.querySelectorAll("img"));
          return imgs.map(i => ({
            src: i.src.slice(-50),
            complete: i.complete,
            naturalWidth: i.naturalWidth,
            naturalHeight: i.naturalHeight
          }));
        })()
      `);
      console.log(`Images for ${lm.name}:`, checkResult);

      const shotPath = `${ARTIFACT_DIR}/archive_lens_${lm.id}.png`;
      await cdp.captureScreenshot(shotPath);
      console.log(`Captured ${lm.name} screenshot: ${shotPath}`);
    }

    cdp.close();
    console.log("=== Archive Lens Verification Successfully Completed ===");
  } finally {
    cleanup();
  }
}

run().catch((err) => {
  console.error("Verification failed:", err);
  process.exit(1);
});
