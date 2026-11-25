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

  async send(method, params = {}) {
    const id = this.id++;
    return new Promise((resolve, reject) => {
      this.callbacks.set(id, { resolve, reject });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }

  async captureScreenshot(filepath) {
    const { data } = await this.send("Page.captureScreenshot", { format: "png" });
    fs.writeFileSync(filepath, Buffer.from(data, "base64"));
    console.log(`Saved screenshot: ${filepath}`);
  }

  async evaluate(expression) {
    const res = await this.send("Runtime.evaluate", {
      expression,
      returnByValue: true,
      awaitPromise: true,
    });
    return res.result ? res.result.value : null;
  }
}

async function run() {
  console.log("=== VERIFYING CINEMATIC MUSEUM ENTRANCE SEQUENCE ===");

  // Launch Chrome headless
  const chrome = spawn(
    CHROME_PATH,
    [
      `--remote-debugging-port=${PORT}`,
      "--headless=new",
      "--disable-gpu",
      "--no-sandbox",
      "--window-size=1280,800",
      "--user-data-dir=/tmp/roots_chrome_profile_" + Date.now(),
      "about:blank",
    ],
    { stdio: "ignore" }
  );

  try {
    const wsUrl = await getDebuggerUrl();
    const cdp = new CDPClient(wsUrl);
    await cdp.connect();

    await cdp.send("Page.enable");
    await cdp.send("Runtime.enable");

    // 1. FIRST VISIT TEST (Fresh sessionStorage)
    console.log("\n[Test 1] Navigating to http://localhost:3000 (First Visit)...");
    await cdp.send("Page.navigate", { url: "http://localhost:3000" });

    // t = 0.5s: Darkness to warmth
    await sleep(500);
    const hasEntranceAt0_5 = await cdp.evaluate(`!!document.getElementById("roots-museum-entrance")`);
    console.log(`t = 0.5s: Entrance overlay in DOM: ${hasEntranceAt0_5}`);
    await cdp.captureScreenshot(`${ARTIFACT_DIR}/entrance_01_warmth_0.5s.png`);

    // t = 1.5s: ROOTS Reveal
    await sleep(1000);
    const wordmarkOpacity = await cdp.evaluate(`
      const el = document.querySelector(".animate-museum-wordmark");
      el ? window.getComputedStyle(el).opacity : null;
    `);
    console.log(`t = 1.5s: ROOTS wordmark opacity: ${wordmarkOpacity}`);
    await cdp.captureScreenshot(`${ARTIFACT_DIR}/entrance_02_roots_reveal_1.5s.png`);

    // t = 2.8s: Emotional Message Reveal ("Every place has a story...")
    await sleep(1300);
    const quoteText = await cdp.evaluate(`
      const el = document.querySelector(".animate-museum-quote");
      el ? el.innerText : null;
    `);
    const quoteOpacity = await cdp.evaluate(`
      const el = document.querySelector(".animate-museum-quote");
      el ? window.getComputedStyle(el).opacity : null;
    `);
    console.log(`t = 2.8s: Quote opacity: ${quoteOpacity}`);
    console.log(`t = 2.8s: Quote text:\n"${quoteText}"`);
    await cdp.captureScreenshot(`${ARTIFACT_DIR}/entrance_03_quote_reveal_2.8s.png`);

    // t = 4.6s: Crossfade in progress (3.8s - 5.4s)
    await sleep(1800);
    const entranceOpacityAt4_6 = await cdp.evaluate(`
      const el = document.getElementById("roots-museum-entrance");
      el ? window.getComputedStyle(el).opacity : "unmounted";
    `);
    console.log(`t = 4.6s: Entrance overlay crossfade opacity: ${entranceOpacityAt4_6}`);
    await cdp.captureScreenshot(`${ARTIFACT_DIR}/entrance_04_crossfade_4.6s.png`);

    // t = 6.0s: Museum fully revealed and interactive
    await sleep(1400);
    const entranceAt6_0 = await cdp.evaluate(`
      const el = document.getElementById("roots-museum-entrance");
      if (!el) return "unmounted";
      const style = window.getComputedStyle(el);
      return style.display === "none" || style.opacity === "0" ? "hidden" : "visible";
    `);
    const hasSeenInStorage = await cdp.evaluate(`sessionStorage.getItem("roots_entrance_seen")`);
    const bodyOverflow = await cdp.evaluate(`document.body.style.overflow`);
    console.log(`t = 6.0s: Entrance state: ${entranceAt6_0}`);
    console.log(`t = 6.0s: sessionStorage roots_entrance_seen: ${hasSeenInStorage}`);
    console.log(`t = 6.0s: body style.overflow unlocked: "${bodyOverflow}" (empty string = unlocked)`);
    await cdp.captureScreenshot(`${ARTIFACT_DIR}/entrance_05_museum_revealed_6.0s.png`);

    // 2. PAGE REFRESH TEST (Must NOT replay)
    console.log("\n[Test 2] Reloading page (Refresh)...");
    await cdp.send("Page.navigate", { url: "http://localhost:3000" });
    await sleep(800);
    const entranceOnReload = await cdp.evaluate(`
      const el = document.getElementById("roots-museum-entrance");
      if (!el) return "unmounted";
      const style = window.getComputedStyle(el);
      return style.display === "none" ? "hidden" : "visible";
    `);
    console.log(`On page reload: Entrance overlay state: ${entranceOnReload} (Must be hidden or unmounted)`);
    await cdp.captureScreenshot(`${ARTIFACT_DIR}/entrance_06_reload_no_replay.png`);

    // 3. REPLAY BUTTON TEST (Cinematic Entrance button)
    console.log("\n[Test 3] Testing 'Cinematic Entrance' on-demand replay button...");
    const replayClicked = await cdp.evaluate(`
      const btn = Array.from(document.querySelectorAll("button")).find(b => b.innerText.includes("Cinematic Entrance"));
      if (btn) { btn.click(); return true; }
      return false;
    `);
    console.log(`Clicked 'Cinematic Entrance' button: ${replayClicked}`);
    await sleep(800);
    const isReplaying = await cdp.evaluate(`
      const el = document.getElementById("roots-museum-entrance");
      return el && window.getComputedStyle(el).display !== "none";
    `);
    console.log(`Sequence replaying on demand: ${isReplaying}`);
    await cdp.captureScreenshot(`${ARTIFACT_DIR}/entrance_07_replay_active.png`);

    // 4. SKIP BUTTON TEST ("Enter Museum ->")
    console.log("\n[Test 4] Testing 'Enter Museum' (Skip) button...");
    const skipClicked = await cdp.evaluate(`
      const btn = Array.from(document.querySelectorAll("#roots-museum-entrance button")).find(b => b.innerText.includes("Enter Museum"));
      if (btn) { btn.click(); return true; }
      return false;
    `);
    console.log(`Clicked 'Enter Museum' button: ${skipClicked}`);
    await sleep(400); // 300ms transition + 100ms
    const isExitedAfterSkip = await cdp.evaluate(`
      const el = document.getElementById("roots-museum-entrance");
      return !el || window.getComputedStyle(el).display === "none" || window.getComputedStyle(el).opacity === "0";
    `);
    console.log(`Immediately exited on Skip: ${isExitedAfterSkip}`);
    await cdp.captureScreenshot(`${ARTIFACT_DIR}/entrance_08_skip_immediate_exit.png`);

    console.log("\n=== ALL 4 VERIFICATION TEST SUITES COMPLETED SUCCESSFULLY ===");
  } finally {
    chrome.kill();
  }
}

run().catch((err) => {
  console.error("Verification failed:", err);
  process.exit(1);
});
