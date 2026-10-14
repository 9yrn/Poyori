# Poyori (ポヨリ) — 8-Bit Virtual Web Companion

> A retro 90s Japanese virtual pet that roams across your webpages, evolving based on your real browsing activity, study habits, and productivity in the realm of **Mochimori (もちもり)**.

---

## 🚀 Quick Start: How to Install in Google Chrome (10 Seconds)

1. Open **Google Chrome** and enter `chrome://extensions` in the address bar.
2. In the top-right corner, toggle **Developer mode** to **ON**.
3. In the top-left corner, click the **Load unpacked** button.
4. Select the folder:
   ```
   tamagotchi-extension/
   ```
   *(e.g., `/Users/earanhunukumbura/Downloads/planner_262 2/tamagotchi-extension`)*
5. Click the puzzle icon in Chrome's toolbar and **Pin** 📌 **Poyori**!
6. Visit any website (e.g., GitHub, Wikipedia, MDN, or any news article) — **Poyori will appear roaming along the bottom of your screen!**

---

## 🌟 How Poyori Appears in Webpages (CSP-Immune Shadow DOM)

Poyori renders directly on the bottom edge of web pages inside an **isolated Shadow DOM** (`#poyori-root`).
- **Zero Style Interference**: Host webpage styles never affect Poyori, and Poyori never alters the page's styling.
- **CSP Immunity**: The bundled content script runs entirely within Chrome's Isolated World with inlined styles, meaning websites with strict Content Security Policies (like GitHub, Twitter/X, Google) cannot block Poyori from appearing.
- **Wander & Explore**: Poyori roams back and forth, sniffs around, blinks, and sleeps when you are idle.
- **Drag & Drop**: Click and hold Poyori to pick them up, carry them anywhere on the page, and let go.
- **Quick Speech Bubble**: Click Poyori once to open a quick speech bubble:
- **Quick Speech Bubble**: Click Poyori once to open a quick speech bubble:
  - **Feed (Gohan)**: Instantly feed a snack.
  - **Pet (Naderu)**: Shower Poyori with affection to raise **Kizuna (Bond)**.
  - **Device**: Launches the in-page retro handheld Tamagotchi device popout.
- **Website Classifier Badge**: Look at the bottom-right corner for the subtle classification pill (e.g. `Denki (+XP)` or `Distracting`). Click it once to cycle how that domain is tracked!

---

## 🎨 9-Bit Pixel Art System & Custom Petting Reactions

Poyori features a handcrafted, retro 90s visual design:
- **Zero Stock Unicode Emojis**: Every emoji across the extension has been replaced by custom **8-bit / 9-bit pixel art SVG icons** (food items, Koban coins, streak flames, vital hearts, energy sparks, sakura petals, books, scrolls, robes, and navigation icons).
- **Custom Minimal Petting Reactions (No Emojis)**: When you pet Poyori, they react organically through:
  - **In-Sprite Smiling Squint Eyes**: Eyes morph into happy retro curves (`^ ^`).
  - **Sweet Pink Cheek Blush**: Pink blush pixels (`#ff7675`) appear on their cheeks.
  - **Squish & Spring Physics**: Soft retro squash-and-stretch CSS animation.
  - **Procedural Chiptune Purr**: A gentle, ascending two-tone purr synthesised in real time using the Web Audio API.
  - **Zero Emoji Clutter**: No floating hearts or Unicode emojis obscure the creature.
- **Authentic Font**: Incorporates the user-provided **PixelOperator** retro font family (`PixelOperator8` and `PixelOperator`), embedded in Base64 directly into the Shadow DOM CSS for zero CSP blocking.
- **Warm RPG Aesthetic**: Inspired by classic 90s RPG parchment dialogue boxes, beveled pixel borders, and inset LCD screen bezels.

---

## 🖥️ Dedicated Mochimori Dashboard & Preferences Portal

Poyori includes a full-screen, retro-modern **Dashboard Page** (`dashboard/dashboard.html`) to manage all options and view stats:

### How to open the Dashboard:
1. **Via Toolbar Popup**: Click the Poyori extension icon in Chrome's toolbar, then click **Full Dashboard Portal**.
2. **Via In-Page Device**: Open the handheld device on any page, click the Settings tab, and click **Open Full Dashboard Page**.
3. **Via Chrome Extensions**: Right-click the Poyori extension icon in your toolbar and select **Options**.

### What you can do on the Dashboard:
- **Pet Overview**: High-resolution pixel LCD display, mood readout, and comprehensive meters for Onaka (Hunger), Genki (Energy), Kizuna (Bond), and Shinka XP.
- **Mochimori Zukan (Almanac)**: Browse all 24 creatures across all 4 branches, with filter chips and Kōmyō indicators.
- **Tasks & Trials (Shiren)**: Create custom to-dos with coin and food rewards, check off tasks with chiptune fanfare, and monitor daily automated quests.
- **Wardrobe & Shop (Kisekae)**: Buy and equip accessories (Headbands, Tanuki leaves, Scholar hats, Visors, Crowns) and switch screen palettes (Classic LCD, Game Boy Pocket, Cyber Neon, Sakura Mochi).
- **Website Tracking Manager**: Add custom domain rules for coding, academic, reading, or distracting categories.
- **Game Preferences**:
  - Switch terminology mode: **Bilingual**, **Japanese Only**, or **English Only**.
  - Toggle consequence mode: **Cozy Mode** (pet never dies) vs. **Hardcore Mode** (neglect consequences & Gūtara branch).
  - Adjust procedural 8-bit Web Audio volume or mute.
  - Set custom night bedtime hours (e.g. 10:30 PM to 07:30 AM).
  - Export and import save data (JSON) or reset back to a fresh egg.

---

## 🧪 Automated Requirement Test Suite

A comprehensive test suite is included to guarantee all requirements and game mechanics operate as specified without bias.

To run the tests:
```bash
cd tamagotchi-extension
npm test
```

### What is tested (33 automated test cases):
- **Stages & Terminology**: Verifies stages 1–6 (Tamago → Umare → Kodama → Seishin → Shinju → Shin'en) and bilingual terminology dictionaries.
- **Creatures & Branches**: Verifies all 4 branches (Denki, Chishiki, Monogatari, Gūtara) and all 24 creature definitions.
- **Game Mechanics**: Tests feeding, inventory consumption, task rewards, XP gains, distraction fatigue, sleep triggers, and dominant branch selection.
- **Endgame Progressions**: Verifies 7-day streak unlocking the radiant Kōmyō (光明) form.
- **Consequences**: Verifies Cozy mode safety vs. Hardcore mode runaway penalties and Gūtara branch steering.
- **9-Bit Pixel Art Icons System**: Verifies all 33 icon grids, Base64 SVG generation, crispEdges rendering, and emoji automatic resolution.
- **Minimal Petting Reactions**: Verifies in-sprite squint smiling face, cheek blush palette token, and zero emoji emotes.
- **Zero Stock Emoji Audit**: Confirms dashboard, popup, and handheld device contain zero raw Unicode emojis.
- **In-Page Website Presence**: Simulates real webpage DOM injection to verify `#poyori-root`, open Shadow DOM, wandering pet, speech bubble, classifier badge, and handheld device.
- **Architecture**: Validates Manifest V3 compliance, options page integration, and asset integrity.

---

## 🧬 Life Stages (生命の段階)

| Level | Japanese Stage | Romaji | Meaning |
|---|---|---|---|
| **1** | **卵** | **Tamago** | Mysterious egg crackling with digital energy |
| **2** | **生まれ** | **Umare** | Birth / Hatchling taking first steps |
| **3** | **木霊** | **Kodama** | Young spirit forming personality |
| **4** | **精神** | **Seishin** | Developing mind & identity |
| **5** | **神獣** | **Shinju** | Majestic adult divine beast |
| **6** | **神焔** | **Shin'en** | Ascended mythic flame |

---

## ⚡ The 4 Evolution Branches

Your real browsing habits dictate which path Poyori follows:

1. **⚡ Denki Branch (電気) — Cyber & Tech**: Coding, engineering, programming (GitHub, StackOverflow, MDN, LeetCode).
   - *Denki Tamago* → *Pikoneko (ピコ猫)* → *Kikai Neko (機械猫)* → *Glitch Golem* → *Raijin Drake (雷神ドレイク)* → **Kōmyō Raijin (光明雷神)**.
2. **📚 Chishiki Branch (知識) — Scholar & Science**: Academics, math, research (Wikipedia, arXiv, Coursera, JSTOR).
   - *Chishiki Tamago* → *Fukurō-ko (ふくろう子)* → *Owl Mage* → *Hoshi Sphinx (星スフィンクス)* → *Hoshi no Kenja (星の賢者)* → **Kōmyō Kenja (光明賢者)**.
3. **📖 Monogatari Branch (物語) — Story & Language**: Literature, language learning, reading (Duolingo, Medium, Substack, Goodreads).
   - *Yume Tamago (夢卵)* → *Hanabira Sprite (花びらスプライト)* → *Kotoba Kitsune (言葉狐)* → *Hane no Ryū (羽の竜)* → *Monogatari Kitsune (物語狐)* → **Kōmyō Kitsune (光明狐)**.
4. **💤 Gūtara Branch (ぐうたら) — Slacker (Hardcore Neglect Path)**: Heavy idleness and time on distracting sites (YouTube, Reddit, TikTok).
   - *Nemu Tamago (ねむ卵)* → *Mochi Blob* → *Gūtara Slime* → *Namakemono (怠け者)* → *Daradara Oni (だらだら鬼)* → **Taida no Kami (怠惰の神)**.

---

## 🛠️ Developer Access Port (God Mode & Verification)

To allow the author to test and verify every single feature (all 24 creatures, unlimited Koban, all foods, all accessories, instant evolutions, vitals overrides) without having dev cheats visible or freely accessible to regular users when pushed to GitHub, Poyori features a **Gated Dev Access Port**.

### Why an Authenticated Dev Port instead of a Duplicate Project?
Maintaining a duplicate codebase leads to git merge conflicts and divergent bugs. Instead, the Dev Port is **completely locked and hidden by default** (`devMode = false`). Regular users see the normal game constraints (10 starting Koban, locked cosmetics, normal progression).

### How to Unlock the Dev Access Port:
Choose any of the following 4 developer methods:

1. **Direct Standalone Portal**:
   - Open `dashboard/dev-portal.html` directly in Chrome.
2. **URL Parameter in Dashboard**:
   - Visit `dashboard/dashboard.html?dev=true` or append `#dev`.
3. **Secret 7-Tap Developer Gesture**:
   - Tap the roaming **Poyori companion pet 7 times** on any webpage, or click the Dashboard / Handheld title banner 7 times.
   - A prompt will request the developer key. Access is gated by one-way **SHA-256 cryptographic hashes**, ensuring no developer passwords are ever stored or exposed in plaintext in the codebase or GitHub repository.
4. **Developer Hotkey**:
   - Press **`Ctrl + Shift + D`** (or **`Cmd + Shift + D`** on macOS) anywhere on the dashboard.

### Features Available in Dev Port:
- **Instant God Mode**: Grants 99,999 Koban, discovers all 24 creatures in Zukan, unlocks all 5 accessories + all palettes, maxes food inventory (x99), and advances streak to 7 days.
- **24-Creature Morpher**: Instant dropdown to morph your active companion into ANY of the 24 creatures across all branches and stages, with live sprite preview.
- **Unlimited Koban**: Buttons to add `+1,000`, `+10,000`, `Set 99,999`, or `Reset 0`.
- **Granary Control**: `+50 All Food Items` or individual +10 snack boosts.
- **Vitals & Mood Simulator**: Force starvation (0% Onaka), exhaustion (0% Genki), sickness, or grumpy mood.
- **Time Machine**: Fast-forward streaks (+1 day, +7 days for Kōmyō) or simulate 12h/48h neglect periods.
- **Test Celebratory Fanfares**: Instantly trigger cosmetic purchase plaque, egg hatching fanfare, evolution fanfare, or mythic Kōmyō ascension alert.
- **Lock & Reset**: Click **"Lock Dev Port"** or reset to clean player default before taking public screenshots or committing.

