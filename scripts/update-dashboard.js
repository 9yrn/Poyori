import fs from 'fs';
import path from 'path';

// 1. Update dashboard/dashboard.html
const htmlPath = path.resolve('dashboard/dashboard.html');
let html = fs.readFileSync(htmlPath, 'utf8');

// Add level badge next to pet display name
html = html.replace(
  `<span id="pet-display-name">Poyori</span>\n                  <span id="pet-display-branch" class="branch-pill">Denki</span>`,
  `<span id="pet-display-name">Poyori</span>\n                  <span id="pet-display-level" class="branch-pill" style="margin-left: 4px;">Lv. 1</span>\n                  <span id="pet-display-branch" class="branch-pill">Denki</span>`
);

// Add quick cure button to quick care actions
html = html.replace(
  `<div class="quick-care-actions">\n                <button id="btn-care-feed" class="action-btn">`,
  `<div class="quick-care-actions">\n                <button id="btn-care-cure" class="action-btn" style="display: none; background: #27ae60; color: #fff;"><span class="btn-p-icon" id="care-icon-cure"></span> Cure (薬草)</button>\n                <button id="btn-care-feed" class="action-btn">`
);

// Add Focus Session Card in Tab 1 (Overview)
const focusCardHtml = `
            <!-- Focus Session Accountability Card -->
            <div class="dash-card focus-card" style="margin-top: 20px; grid-column: span 2;">
              <h3>Focus Session (Pomodoro Accountability)</h3>
              <p class="section-desc">Commit to a focused study sprint. Poyori will track your browsing accountability and award substantial XP upon completion.</p>
              <div class="focus-controls-row" style="display: flex; gap: 12px; align-items: center; margin-top: 10px; flex-wrap: wrap;">
                <select id="dash-focus-discipline" style="padding: 6px 10px; font-family: monospace;">
                  <option value="coding">Denki / Coding (Cat)</option>
                  <option value="creative">Geijutsu / Creative Arts (Bird)</option>
                  <option value="literature">Bungaku / Literature (Fox)</option>
                  <option value="research">Kenkyū / Research (Owl)</option>
                  <option value="gaming">Yūgi / Gaming (Dragon)</option>
                  <option value="personal">Shūshin / Personal Dev (Shiba)</option>
                </select>
                <select id="dash-focus-duration" style="padding: 6px 10px; font-family: monospace;">
                  <option value="15">15 Minutes</option>
                  <option value="25" selected>25 Minutes</option>
                  <option value="45">45 Minutes</option>
                  <option value="60">60 Minutes</option>
                </select>
                <button id="dash-start-focus-btn" class="btn-primary" style="padding: 6px 14px;">Start Focus</button>
                <button id="dash-stop-focus-btn" class="btn-secondary" style="display: none; padding: 6px 14px; background: #c0392b; color: #fff;">Cancel Focus</button>
                <div id="dash-focus-countdown" style="font-size: 18px; font-weight: bold; margin-left: 10px; display: none;">25:00</div>
              </div>
            </div>`;

if (!html.includes('id="dash-start-focus-btn"')) {
  html = html.replace(
    '<!-- Vitals Card -->',
    focusCardHtml + '\n\n            <!-- Vitals Card -->'
  );
}

// Add Mochimori Market, Themes, and Roster in Tab 4 (Wardrobe & Shop)
const marketAndThemesHtml = `
          <div class="dash-card" style="margin-top: 20px;">
            <h3>Mochimori Market (Provisions & Medicine)</h3>
            <p class="section-desc">Stock up on favorite snacks and medicinal Yakusō herbs to keep your companion healthy.</p>
            <div id="market-items-grid" class="wardrobe-grid">
              <!-- Dynamically populated -->
            </div>
          </div>

          <div class="dash-card" style="margin-top: 20px;">
            <h3>Creature Color Theme Palettes</h3>
            <p class="section-desc">Unlocked at higher evolution stages (Stage 4+ and 6).</p>
            <div id="dash-creature-themes-row" class="palette-grid">
              <!-- Dynamically populated -->
            </div>
          </div>

          <div class="dash-card" style="margin-top: 20px;">
            <h3>Companion Roster & Swapping</h3>
            <p class="section-desc">Switch between companions you have raised across different disciplines.</p>
            <div id="dash-roster-grid" class="wardrobe-grid">
              <!-- Dynamically populated -->
            </div>
          </div>`;

if (!html.includes('id="market-items-grid"')) {
  html = html.replace(
    '</section>\n\n        <!-- TAB 5: WEBSITE TRACKING -->',
    marketAndThemesHtml + '\n        </section>\n\n        <!-- TAB 5: WEBSITE TRACKING -->'
  );
}

fs.writeFileSync(htmlPath, html, 'utf8');

// 2. Update dashboard/dashboard.js
const jsPath = path.resolve('dashboard/dashboard.js');
let js = fs.readFileSync(jsPath, 'utf8');

// Update renderOverview to show level, cure button, and focus countdown
const oldOverviewCode = `  const spriteImg = document.getElementById('overview-pet-img');
  spriteImg.src = getCreatureSprite(pet.creatureId, action, pet.accessory);`;

const newOverviewCode = `  const spriteImg = document.getElementById('overview-pet-img');
  spriteImg.src = getCreatureSprite(pet.creatureId, action, pet.accessory, pet.theme);

  const lvlEl = document.getElementById('pet-display-level');
  if (lvlEl) lvlEl.textContent = \`Lv. \${pet.level || 1}\`;

  const cureBtn = document.getElementById('btn-care-cure');
  if (cureBtn) {
    cureBtn.style.display = pet.isSick ? 'inline-block' : 'none';
    const cureIcon = document.getElementById('care-icon-cure');
    if (cureIcon) cureIcon.innerHTML = getPixelIconHtml('cross', 14);
    cureBtn.onclick = async () => {
      const inv = state.inventory || {};
      if (!inv.yakuso || inv.yakuso <= 0) {
        if (state.koban >= 15) {
          PoyoriEngine.buyFoodItem(state, 'yakuso');
        } else {
          alert('Need 15 Koban for Yakusō Medicine!');
          return;
        }
      }
      const res = PoyoriEngine.curePet(state);
      if (res.success) {
        audioSynth.shinkaFanfare();
        await saveState(state);
        renderAll();
      }
    };
  }

  // Focus Session Controls in Overview
  const focusCountdown = document.getElementById('dash-focus-countdown');
  const startFocusBtn = document.getElementById('dash-start-focus-btn');
  const stopFocusBtn = document.getElementById('dash-stop-focus-btn');
  const discSelect = document.getElementById('dash-focus-discipline');
  const durSelect = document.getElementById('dash-focus-duration');

  if (state.focusSession && state.focusSession.isActive) {
    if (focusCountdown) {
      focusCountdown.style.display = 'inline-block';
      const mins = Math.floor((state.focusSession.remainingSeconds || 0) / 60);
      const secs = (state.focusSession.remainingSeconds || 0) % 60;
      focusCountdown.textContent = \`\${String(mins).padStart(2, '0')}:\${String(secs).padStart(2, '0')}\`;
    }
    if (startFocusBtn) startFocusBtn.style.display = 'none';
    if (stopFocusBtn) {
      stopFocusBtn.style.display = 'inline-block';
      stopFocusBtn.onclick = async () => {
        PoyoriEngine.cancelFocusSession(state);
        audioSynth.boop();
        await saveState(state);
        renderAll();
      };
    }
  } else {
    if (focusCountdown) focusCountdown.style.display = 'none';
    if (stopFocusBtn) stopFocusBtn.style.display = 'none';
    if (startFocusBtn) {
      startFocusBtn.style.display = 'inline-block';
      startFocusBtn.onclick = async () => {
        const disc = discSelect.value || 'coding';
        const dur = parseInt(durSelect.value, 10) || 25;
        PoyoriEngine.startFocusSession(state, { discipline: disc, durationMinutes: dur });
        audioSynth.shinkaFanfare();
        await saveState(state);
        renderAll();
      };
    }
  }`;

if (!js.includes('btn-care-cure')) {
  js = js.replace(oldOverviewCode, newOverviewCode);
}

// Update renderWardrobe to populate Mochimori Market, Themes, and Roster
const marketRenderCode = `
  // Render Mochimori Market (Food & Medicine)
  const marketGrid = document.getElementById('market-items-grid');
  if (marketGrid) {
    const inv = state.inventory || {};
    marketGrid.innerHTML = Object.values(FOOD_ITEMS).map(food => {
      const count = inv[food.id] || 0;
      return \`
        <div class="wardrobe-card">
          <div class="wardrobe-card-icon">\${getPixelIconHtml(food.iconKey || 'apple', 24)}</div>
          <strong>\${food.name} (\${food.jaName})</strong>
          <small>\${food.desc}</small>
          <div style="font-size: 11px; margin-top: 4px;">In Stock: x\${count}</div>
          <button class="btn-primary market-buy-btn" data-id="\${food.id}" data-cost="\${food.cost || 10}" \${state.koban < (food.cost || 10) ? 'disabled' : ''}>
            \${getPixelIconHtml('coin', 12)} \${food.cost || 10} Koban
          </button>
        </div>
      \`;
    }).join('');

    marketGrid.querySelectorAll('.market-buy-btn').forEach(btn => {
      btn.onclick = async () => {
        const id = btn.dataset.id;
        const res = PoyoriEngine.buyFoodItem(state, id);
        if (res.success) {
          audioSynth.taskDone();
          await saveState(state);
          renderAll();
        }
      };
    });
  }

  // Render Creature Themes
  const themesRow = document.getElementById('dash-creature-themes-row');
  if (themesRow) {
    const unlockedThemes = PoyoriEngine.getUnlockedCreatureThemes(pet);
    themesRow.innerHTML = unlockedThemes.map(th => \`
      <button class="palette-btn \${pet.theme === th.id ? 'active' : ''} theme-choice-btn" data-theme="\${th.id}">
        <strong>\${th.name}</strong>
        <small>\${th.desc}</small>
      </button>
    \`).join('');

    themesRow.querySelectorAll('.theme-choice-btn').forEach(btn => {
      btn.onclick = async () => {
        const themeId = btn.dataset.theme;
        PoyoriEngine.setCreatureTheme(state, themeId);
        audioSynth.chirp();
        await saveState(state);
        renderAll();
      };
    });
  }

  // Render Companion Roster
  const rosterGrid = document.getElementById('dash-roster-grid');
  if (rosterGrid) {
    const roster = state.roster || [];
    rosterGrid.innerHTML = roster.map((comp, idx) => \`
      <div class="wardrobe-card">
        <strong>\${comp.name}</strong>
        <small>\${comp.creatureId} • Lv. \${comp.level || 1}</small>
        <button class="btn-primary dash-switch-roster-btn" data-index="\${idx}" \${idx === (state.activeRosterIndex || 0) ? 'disabled' : ''}>
          \${idx === (state.activeRosterIndex || 0) ? 'Active Companion' : 'Switch Active'}
        </button>
      </div>
    \`).join('');

    rosterGrid.querySelectorAll('.dash-switch-roster-btn').forEach(btn => {
      btn.onclick = async () => {
        const idx = parseInt(btn.dataset.index, 10);
        PoyoriEngine.switchActivePet(state, idx);
        audioSynth.shinkaFanfare();
        await saveState(state);
        renderAll();
      };
    });
  }
`;

const endOfWardrobe = `  paletteGrid.querySelectorAll('.palette-btn').forEach(b => {
    b.onclick = async () => {
      pet.palette = b.dataset.palette;
      audioSynth.chirp();
      await saveState(state);
      renderAll();
    };
  });`;

if (!js.includes('market-items-grid')) {
  js = js.replace(endOfWardrobe, endOfWardrobe + '\n' + marketRenderCode);
}

fs.writeFileSync(jsPath, js, 'utf8');
console.log('Successfully updated dashboard HTML and JS');
