import fs from 'fs';
import path from 'path';

const modalPath = path.resolve('ui/handheld-modal.js');
let code = fs.readFileSync(modalPath, 'utf8');

// 1. Update imports
code = code.replace(
  "import { STAGES, CREATURES, FOOD_ITEMS, ACCESSORIES, PALETTES, getTerm } from '../shared/constants.js';",
  "import { STAGES, CREATURES, FOOD_ITEMS, ACCESSORIES, PALETTES, BRANCHES, CREATURE_THEMES, getTerm } from '../shared/constants.js';"
);

// 2. Add focus tab to tabs bar
code = code.replace(
  `<button class="poyori-tab-btn \${this.activeTab === 'wardrobe' ? 'active' : ''}" data-tab="wardrobe" title="\${getTerm('tabWardrobe', mode)}">\${getPixelIconHtml('wardrobe_robe', 16)}</button>`,
  `<button class="poyori-tab-btn \${this.activeTab === 'wardrobe' ? 'active' : ''}" data-tab="wardrobe" title="\${getTerm('tabWardrobe', mode)}">\${getPixelIconHtml('wardrobe_robe', 16)}</button>\n            <button class="poyori-tab-btn \${this.activeTab === 'focus' ? 'active' : ''}" data-tab="focus" title="Focus Timer">\${getPixelIconHtml('spark', 16)}</button>`
);

// 3. Add focus to tab cycling array
code = code.replace(
  "const tabs = ['status', 'tasks', 'food', 'zukan', 'wardrobe', 'settings'];",
  "const tabs = ['status', 'tasks', 'food', 'zukan', 'wardrobe', 'focus', 'settings'];"
);

// 4. Add focus switch case in renderTabContent
code = code.replace(
  "case 'wardrobe':\n        return this.renderWardrobeTab(mode);",
  "case 'wardrobe':\n        return this.renderWardrobeTab(mode);\n      case 'focus':\n        return this.renderFocusTab(mode);"
);

// 5. Update renderStatusTab with Level, Breed, Given Name, Cure button, Species name
const oldStatusMeta = `          <!-- Left Screen Column: Stage and Mood Badges -->
          <div class="poyori-portrait-meta-left">
            <div class="poyori-badge-tag">\${stageTerm}</div>
            <div class="poyori-mood-tag \${mood}">\${getPixelIconHtml(moodIcon, 10)} \${getTerm('mood', mode)}: \${moodTerm}</div>
          </div>
          <!-- Center/Right Creature Sprite & Name Display -->
          <div class="poyori-portrait-creature-center">
            <img class="poyori-screen-sprite" src="\${spriteSvg}" alt="\${creature.name}">
            <div class="poyori-pet-name">\${pet.name} \${pet.isKomyo ? getPixelIconHtml('star', 12) : ''}</div>
          </div>`;

const newStatusMeta = `          <!-- Left Screen Column: Stage and Mood Badges -->
          <div class="poyori-portrait-meta-left">
            <div class="poyori-badge-tag">Lv. \${pet.level || 1}</div>
            <div class="poyori-badge-tag">\${stageTerm}</div>
            <div class="poyori-breed-tag">\${(creature.breedName || creature.breed || 'Pet').toUpperCase()}</div>
            <div class="poyori-mood-tag \${mood}">\${getPixelIconHtml(moodIcon, 10)} \${getTerm('mood', mode)}: \${moodTerm}</div>
          </div>
          <!-- Center/Right Creature Sprite & Name Display -->
          <div class="poyori-portrait-creature-center">
            <img class="poyori-screen-sprite" src="\${spriteSvg}" alt="\${creature.name}">
            <div class="poyori-pet-name">\${pet.name || creature.name} <button class="poyori-rename-btn" id="rename-pet-btn" title="Rename Companion" style="background:none;border:none;cursor:pointer;font-size:10px;">✏️</button> \${pet.isKomyo ? getPixelIconHtml('star', 12) : ''}</div>
            <div class="poyori-creature-species">\${creature.name} (\${creature.jaName})</div>
          </div>`;

code = code.replace(oldStatusMeta, newStatusMeta);

// 6. Update direct care bar to include Cure button when sick
const oldCareBar = `        <!-- In-Screen Direct Care Action Bar -->
        <div class="poyori-direct-care-bar">
          <button class="poyori-care-btn feed" id="care-feed-btn" title="Feed Pet">
            \${getPixelIconHtml('apple', 14)} <span>\${getTerm('feed', mode)}</span>
          </button>
          <button class="poyori-care-btn pet" id="care-pet-btn" title="Pet Poyori">
            \${getPixelIconHtml('hand_pet', 14)} <span>\${getTerm('pet', mode)}</span>
          </button>
          <button class="poyori-care-btn sleep" id="care-sleep-btn" title="\${pet.isSleeping ? getTerm('wake', mode) : getTerm('sleep', mode)}">
            \${getPixelIconHtml('sleep_zzz', 14)} <span>\${pet.isSleeping ? getTerm('wake', mode).split(' ')[0] : getTerm('sleep', mode).split(' ')[0]}</span>
          </button>
        </div>`;

const newCareBar = `        <!-- In-Screen Direct Care Action Bar -->
        <div class="poyori-direct-care-bar">
          \${pet.isSick ? \`
            <button class="poyori-care-btn cure pulse-sick" id="care-cure-btn" title="Administer Yakusō Herbal Medicine">
              \${getPixelIconHtml('cross', 14)} <span>薬草 Cure</span>
            </button>
          \` : ''}
          <button class="poyori-care-btn feed" id="care-feed-btn" title="Feed Pet">
            \${getPixelIconHtml('apple', 14)} <span>\${getTerm('feed', mode)}</span>
          </button>
          <button class="poyori-care-btn pet" id="care-pet-btn" title="Pet Poyori">
            \${getPixelIconHtml('hand_pet', 14)} <span>\${getTerm('pet', mode)}</span>
          </button>
          <button class="poyori-care-btn sleep" id="care-sleep-btn" title="\${pet.isSleeping ? getTerm('wake', mode) : getTerm('sleep', mode)}">
            \${getPixelIconHtml('sleep_zzz', 14)} <span>\${pet.isSleeping ? getTerm('wake', mode).split(' ')[0] : getTerm('sleep', mode).split(' ')[0]}</span>
          </button>
        </div>`;

code = code.replace(oldCareBar, newCareBar);

// 7. Add Level & EXP row in vitals
const oldVitalsExp = `          <div class="poyori-xp-bar-wrap">`;
const newVitalsExp = `          <div class="poyori-vital-row">
            <span class="v-label">Level:</span>
            <span class="v-val">Lv. \${pet.level || 1} (\${pet.xp} XP)</span>
          </div>
          <div class="poyori-xp-bar-wrap">`;

code = code.replace(oldVitalsExp, newVitalsExp);

// 8. Add renderFocusTab method
const focusTabMethod = `
  renderFocusTab(mode) {
    const session = this.state.focusSession || { isActive: false, discipline: 'coding', durationMinutes: 25, remainingSeconds: 1500, distractionsCount: 0 };
    const activeDiscipline = this.selectedFocusDiscipline || session.discipline || (this.state.pet.activeDisciplines && this.state.pet.activeDisciplines[0]) || 'coding';
    const branches = BRANCHES || {};

    const mins = Math.floor((session.remainingSeconds || 0) / 60);
    const secs = (session.remainingSeconds || 0) % 60;
    const timeStr = \`\${String(mins).padStart(2, '0')}:\${String(secs).padStart(2, '0')}\`;

    if (session.isActive) {
      const branchInfo = branches[session.discipline] || {};
      return \`
        <div class="poyori-focus-view">
          <div class="poyori-subhead">\${getPixelIconHtml('spark', 14)} Focus Session Active</div>
          <div class="poyori-focus-timer-box">
            <div style="font-size: 8px; opacity: 0.8;">\${branchInfo.name || session.discipline} [\${(branchInfo.breed || '').toUpperCase()}]</div>
            <div class="poyori-focus-digits" id="focus-countdown">\${timeStr}</div>
            <div style="font-size: 7px; color: #27ae60;">\${getPixelIconHtml('check', 8)} Accountability Guard Active</div>
            <div style="font-size: 7px; margin-top: 4px; opacity: 0.8;">Distractions caught: \${session.distractionsCount || 0}</div>
            <button class="stop-focus-btn" id="stop-focus-btn">Stop Focus Session</button>
          </div>
        </div>
      \`;
    }

    const disciplinesHtml = Object.values(branches).map(b => \`
      <button class="discipline-btn \${activeDiscipline === b.id ? 'active' : ''}" data-discipline="\${b.id}">
        \${getPixelIconHtml(b.iconKey || 'spark', 12)} \${b.name.split(' ')[0]}
      </button>
    \`).join('');

    const dur = this.focusDuration || 25;

    return \`
      <div class="poyori-focus-view">
        <div class="poyori-subhead">\${getPixelIconHtml('spark', 14)} Focus Accountability Timer</div>
        <div class="poyori-focus-timer-box">
          <div style="font-size: 8px; margin-bottom: 4px;">Choose Focus Discipline:</div>
          <div class="poyori-discipline-grid">
            \${disciplinesHtml}
          </div>

          <div style="font-size: 8px; margin-top: 8px; margin-bottom: 4px;">Session Duration:</div>
          <div class="duration-selector">
            <button class="duration-btn \${dur === 15 ? 'active' : ''}" data-mins="15">15m</button>
            <button class="duration-btn \${dur === 25 ? 'active' : ''}" data-mins="25">25m</button>
            <button class="duration-btn \${dur === 45 ? 'active' : ''}" data-mins="45">45m</button>
            <button class="duration-btn \${dur === 60 ? 'active' : ''}" data-mins="60">60m</button>
          </div>

          <button class="start-focus-btn" id="start-focus-btn">Start Focus Session</button>
        </div>
      </div>
    \`;
  }
`;

// Insert renderFocusTab right before renderSettingsTab
code = code.replace('  renderSettingsTab(mode) {', focusTabMethod + '\n  renderSettingsTab(mode) {');

// 9. Update renderFoodTab to include buy buttons for Mochimori Market
code = code.replace(
  `<button class="feed-btn" \${count <= 0 ? 'disabled' : ''}>\${getTerm('feed', mode)}</button>`,
  `<button class="feed-btn" \${count <= 0 ? 'disabled' : ''}>\${getTerm('feed', mode)}</button>\n            <button class="buy-food-btn" data-id="\${item.id}" data-cost="\${item.cost || 10}" title="Buy with Koban" \${this.state.koban < (item.cost || 10) ? 'disabled' : ''}>\${getPixelIconHtml('coin', 10)} \${item.cost || 10}</button>`
);

// 10. Update renderWardrobeTab to include themes and roster
const wardrobeThemesAndRoster = `
        <div class="poyori-subhead" style="margin-top: 10px;">\${getPixelIconHtml('spark', 14)} Creature Theme Palettes</div>
        <div class="poyori-theme-grid">
          \${PoyoriEngine.getUnlockedCreatureThemes(pet).map(th => \`
            <button class="theme-swatch-btn \${pet.theme === th.id ? 'active' : ''}" data-theme="\${th.id}">
              \${th.name}
            </button>
          \`).join('')}
        </div>

        <div class="poyori-subhead" style="margin-top: 10px;">\${getPixelIconHtml('book_zukan', 14)} Companion Roster</div>
        <div class="poyori-roster-list">
          \${(this.state.roster || []).map((comp, idx) => \`
            <div class="poyori-roster-item">
              <div class="roster-info">
                <span class="roster-name">\${comp.name}</span>
                <span class="roster-stage">\${comp.creatureId} • Lv. \${comp.level || 1}</span>
              </div>
              <button class="switch-roster-btn" data-index="\${idx}" \${idx === (this.state.activeRosterIndex || 0) ? 'disabled' : ''}>
                \${idx === (this.state.activeRosterIndex || 0) ? 'Active' : 'Switch'}
              </button>
            </div>
          \`).join('')}
        </div>
`;

code = code.replace(
  `        <div class="poyori-palette-row">
          \${palettesHtml}
        </div>`,
  `        <div class="poyori-palette-row">
          \${palettesHtml}
        </div>` + wardrobeThemesAndRoster
);

// 11. Add event listeners in bindEvents for rename, cure, focus, buy-food, themes, and roster
const extraEventListeners = `
    // Rename Companion
    const renameBtn = this.modalEl.querySelector('#rename-pet-btn');
    if (renameBtn) {
      renameBtn.addEventListener('click', () => {
        const currentName = this.state.pet.name || 'Poyori';
        const newName = window.prompt('Enter a custom name for your companion (1-20 characters):', currentName);
        if (newName) {
          const res = PoyoriEngine.setPetCustomName(this.state, newName);
          if (res.success) {
            audioSynth.chirp();
            this.onStateChange(this.state);
            this.render();
          } else {
            alert('Invalid name. Must be 1 to 20 characters.');
          }
        }
      });
    }

    // Direct Care: Cure Illness
    const careCureBtn = this.modalEl.querySelector('#care-cure-btn');
    if (careCureBtn) {
      careCureBtn.addEventListener('click', () => {
        const inv = this.state.inventory || {};
        if (!inv.yakuso || inv.yakuso <= 0) {
          // If out of medicine, offer to buy for 15 Koban
          if (this.state.koban >= 15) {
            PoyoriEngine.buyFoodItem(this.state, 'yakuso');
          } else {
            alert('You need 15 Koban to purchase Yakusō (Herbal Medicine) from the market!');
            return;
          }
        }
        const res = PoyoriEngine.curePet(this.state);
        if (res.success) {
          audioSynth.shinkaFanfare();
          this.onPetAction('cheer');
          this.onStateChange(this.state);
          this.render();
        }
      });
    }

    // Focus Session Controls
    this.modalEl.querySelectorAll('.discipline-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.selectedFocusDiscipline = btn.dataset.discipline;
        audioSynth.boop();
        this.render();
      });
    });

    this.modalEl.querySelectorAll('.duration-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.focusDuration = parseInt(btn.dataset.mins, 10);
        audioSynth.boop();
        this.render();
      });
    });

    const startFocusBtn = this.modalEl.querySelector('#start-focus-btn');
    if (startFocusBtn) {
      startFocusBtn.addEventListener('click', () => {
        const disc = this.selectedFocusDiscipline || (this.state.pet.activeDisciplines && this.state.pet.activeDisciplines[0]) || 'coding';
        const dur = this.focusDuration || 25;
        PoyoriEngine.startFocusSession(this.state, { discipline: disc, durationMinutes: dur });
        audioSynth.shinkaFanfare();
        this.onStateChange(this.state);
        this.render();
      });
    }

    const stopFocusBtn = this.modalEl.querySelector('#stop-focus-btn');
    if (stopFocusBtn) {
      stopFocusBtn.addEventListener('click', () => {
        PoyoriEngine.cancelFocusSession(this.state);
        audioSynth.boop();
        this.onStateChange(this.state);
        this.render();
      });
    }

    // Buy Food Item in Mochimori Market
    this.modalEl.querySelectorAll('.buy-food-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        const res = PoyoriEngine.buyFoodItem(this.state, id);
        if (res.success) {
          audioSynth.taskDone();
          this.onStateChange(this.state);
          this.render();
        } else {
          audioSynth.boop();
        }
      });
    });

    // Creature Theme Swatches
    this.modalEl.querySelectorAll('.theme-swatch-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const themeId = btn.dataset.theme;
        const res = PoyoriEngine.setCreatureTheme(this.state, themeId);
        if (res.success) {
          audioSynth.chirp();
          this.onStateChange(this.state);
          this.render();
        }
      });
    });

    // Switch Active Companion from Roster
    this.modalEl.querySelectorAll('.switch-roster-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.dataset.index, 10);
        const res = PoyoriEngine.switchActivePet(this.state, idx);
        if (res.success) {
          audioSynth.shinkaFanfare();
          this.onStateChange(this.state);
          this.render();
        }
      });
    });
`;

// Insert extra event listeners right before the end of bindEvents
const lastCatchIndex = code.indexOf('// Save settings on any change');
code = code.slice(0, lastCatchIndex) + extraEventListeners + '\n' + code.slice(lastCatchIndex);

fs.writeFileSync(modalPath, code, 'utf8');
console.log('Successfully updated ui/handheld-modal.js with all overhaul features');
