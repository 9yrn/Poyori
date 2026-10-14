/**
 * Poyori (ポヨリ) — Extension Toolbar Popup Logic
 */

import { getState, saveState } from '../shared/storage.js';
import { CREATURES, STAGES, getTerm } from '../shared/constants.js';
import { PoyoriEngine } from '../shared/game-engine.js';
import { getCreatureSprite } from '../content/sprites.js';
import { getPixelIconHtml } from '../shared/pixel-icons.js';
import { audioSynth } from '../ui/audio.js';

let state = null;
let currentDomain = null;

async function initPopup() {
  state = await getState();

  // Populate UI icons with authentic 9-bit pixel art
  const streakIcon = document.getElementById('streak-icon');
  if (streakIcon) streakIcon.innerHTML = getPixelIconHtml('flame', 12);
  const iconOnaka = document.getElementById('icon-onaka');
  if (iconOnaka) iconOnaka.innerHTML = getPixelIconHtml('heart_full', 12);
  const iconGenki = document.getElementById('icon-genki');
  if (iconGenki) iconGenki.innerHTML = getPixelIconHtml('spark', 12);
  const iconKizuna = document.getElementById('icon-kizuna');
  if (iconKizuna) iconKizuna.innerHTML = getPixelIconHtml('sakura', 12);
  const tagDenki = document.getElementById('tag-icon-denki');
  if (tagDenki) tagDenki.innerHTML = getPixelIconHtml('spark', 12);
  const tagChishiki = document.getElementById('tag-icon-chishiki');
  if (tagChishiki) tagChishiki.innerHTML = getPixelIconHtml('book_zukan', 12);
  const tagDistract = document.getElementById('tag-icon-distract');
  if (tagDistract) tagDistract.innerHTML = getPixelIconHtml('sleep_zzz', 12);
  const btnDev = document.getElementById('btn-icon-device');
  if (btnDev) btnDev.innerHTML = getPixelIconHtml('handheld_device', 14);
  const btnDash = document.getElementById('btn-icon-dash');
  if (btnDash) btnDash.innerHTML = getPixelIconHtml('gear', 14);
  const btnFeed = document.getElementById('btn-icon-feed');
  if (btnFeed) btnFeed.innerHTML = getPixelIconHtml('apple', 14);
  const btnPet = document.getElementById('btn-icon-pet');
  if (btnPet) btnPet.innerHTML = getPixelIconHtml('hand_pet', 14);
  const btnCure = document.getElementById('btn-icon-cure');
  if (btnCure) btnCure.innerHTML = getPixelIconHtml('cross', 14);
  const iconSize = document.getElementById('icon-size');
  if (iconSize) iconSize.innerHTML = getPixelIconHtml('spark', 10);

  renderPet();

  // Get active tab domain
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0]?.url && !tabs[0].url.startsWith('chrome://')) {
      try {
        const urlObj = new URL(tabs[0].url);
        currentDomain = urlObj.hostname;
        renderDomainClassification();
      } catch (e) {
        document.getElementById('site-domain').textContent = 'System Page';
      }
    } else {
      document.getElementById('site-domain').textContent = 'Special Page';
    }
  });

  bindEvents();
}

function renderPet() {
  const pet = state.pet;
  const creature = CREATURES[pet.creatureId] || CREATURES.denki_tamago;
  const mode = state.settings.languageMode || 'bilingual';
  const stageMeta = STAGES[pet.stage - 1] || STAGES[0];

  document.getElementById('pet-sprite').src = getCreatureSprite(pet.creatureId, pet.isSleeping ? 'sleep' : (pet.isSick ? 'idle1' : 'idle1'), pet.accessory, pet.theme);
  document.getElementById('pet-name').innerHTML = `${pet.name} ${pet.isKomyo ? getPixelIconHtml('star', 12) : ''}`;
  const lvlEl = document.getElementById('pet-level');
  if (lvlEl) lvlEl.textContent = `Lv. ${pet.level || 1}`;
  document.getElementById('pet-stage').textContent = `${creature.name} (${getTerm(stageMeta.termKey, mode)})`;
  document.getElementById('val-onaka').textContent = pet.onaka;
  document.getElementById('val-genki').textContent = pet.genki;
  document.getElementById('val-kizuna').textContent = pet.kizuna;
  document.getElementById('streak-val').textContent = state.stats.currentStreak;

  // Cure illness button display
  const cureBtn = document.getElementById('quick-cure-btn');
  if (cureBtn) {
    cureBtn.style.display = pet.isSick ? 'flex' : 'none';
  }

  // Pet Size Selector UI
  const currentSize = state.settings?.petSize || 'normal';
  const sizeLabels = { small: 'Small (48px)', normal: 'Normal (64px)', large: 'Large (80px)', giant: 'Giant (96px)' };
  const sizeLabelEl = document.getElementById('pet-size-label');
  if (sizeLabelEl) sizeLabelEl.textContent = sizeLabels[currentSize] || 'Normal (64px)';
  document.querySelectorAll('.popup-size-btn').forEach(b => {
    if (b.dataset.size === currentSize) {
      b.classList.add('active');
      b.style.background = '#0f380f';
      b.style.color = '#fff';
      b.style.borderColor = '#0f380f';
    } else {
      b.classList.remove('active');
      b.style.background = '#fff';
      b.style.color = '#333';
      b.style.borderColor = '#aaa';
    }
  });

  // Active Focus Session mini display
  const focusCard = document.getElementById('focus-mini-card');
  if (focusCard) {
    if (state.focusSession && state.focusSession.isActive) {
      focusCard.style.display = 'block';
      const mins = Math.floor((state.focusSession.remainingSeconds || 0) / 60);
      const secs = (state.focusSession.remainingSeconds || 0) % 60;
      document.getElementById('focus-timer-val').textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
      document.getElementById('focus-discipline-name').textContent = (state.focusSession.discipline || 'coding').toUpperCase();
    } else {
      focusCard.style.display = 'none';
    }
  }
}

let feedbackTimer = null;
function showFeedback(msg) {
  const el = document.getElementById('site-feedback');
  if (!el) return;
  el.innerHTML = `${getPixelIconHtml('check', 10)} ${msg}`;
  el.classList.add('show');
  if (feedbackTimer) clearTimeout(feedbackTimer);
  feedbackTimer = setTimeout(() => {
    el.classList.remove('show');
  }, 2200);
}

function renderDomainClassification() {
  if (!currentDomain) return;
  document.getElementById('site-domain').textContent = currentDomain;
  const cat = PoyoriEngine.classifyDomain(currentDomain, state);

  const tagEl = document.getElementById('site-tag');
  tagEl.className = `site-tag ${cat}`;

  // Trigger pop bounce animation
  tagEl.classList.remove('pop');
  void tagEl.offsetWidth; // force DOM reflow
  tagEl.classList.add('pop');

  let icon = 'neutral_dot';
  let label = 'Neutral';
  if (cat === 'denki') { icon = 'spark'; label = 'Coding (+XP)'; }
  else if (cat === 'chishiki') { icon = 'book_zukan'; label = 'Study (+XP)'; }
  else if (cat === 'monogatari') { icon = 'tasks_scroll'; label = 'Story (+XP)'; }
  else if (cat === 'distracting') { icon = 'sleep_zzz'; label = 'Distracting'; }
  tagEl.innerHTML = `${getPixelIconHtml(icon, 12)} ${label}`;

  // Update visual active state on the 3 classification buttons
  document.querySelectorAll('.tag-btn').forEach(btn => {
    if (btn.dataset.cat === cat) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}

function bindEvents() {
  // Classification buttons
  document.querySelectorAll('.tag-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      if (!currentDomain) return;
      const cleanDomain = currentDomain.toLowerCase().replace(/^https?:\/\//, '').replace(/^www\./, '').split('/')[0].split(':')[0];
      const targetCat = btn.dataset.cat;
      const currentCat = PoyoriEngine.classifyDomain(currentDomain, state);

      // Remove existing overrides for this domain
      state.settings.customEducational = (state.settings.customEducational || []).filter(e => {
        if (!e || !e.domain) return false;
        const cleanE = e.domain.toLowerCase().replace(/^https?:\/\//, '').replace(/^www\./, '').split('/')[0].split(':')[0];
        return cleanE !== cleanDomain;
      });
      state.settings.customDistracting = (state.settings.customDistracting || []).filter(d => {
        if (!d) return false;
        const cleanD = (typeof d === 'string' ? d : d.domain || '').toLowerCase().replace(/^https?:\/\//, '').replace(/^www\./, '').split('/')[0].split(':')[0];
        return cleanD !== cleanDomain;
      });

      let feedbackMsg = '';
      if (currentCat === targetCat) {
        // Toggle OFF back to neutral
        audioSynth.boop();
        feedbackMsg = `${cleanDomain} reset to Neutral`;
      } else {
        // Apply newly selected category
        if (targetCat === 'distracting') {
          state.settings.customDistracting.push(cleanDomain);
        } else {
          state.settings.customEducational.push({ domain: cleanDomain, category: targetCat });
        }
        audioSynth.chirp();
        const catLabels = { denki: 'Coding (+XP)', chishiki: 'Study (+XP)', distracting: 'Distracting' };
        feedbackMsg = `${cleanDomain} set to ${catLabels[targetCat] || targetCat}!`;
      }

      await saveState(state);
      renderDomainClassification();
      showFeedback(feedbackMsg);

      // Notify content script in current tab so pet immediately reacts
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0]?.id) {
          chrome.tabs.sendMessage(tabs[0].id, {
            action: 'classification_updated',
            domain: cleanDomain,
            category: currentCat === targetCat ? 'neutral' : targetCat
          }).catch(() => {});
        }
      });
    });
  });

  // Open Handheld Device In-Page
  document.getElementById('open-device-btn').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]?.id) {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'open_device' }).catch(() => {});
        window.close();
      }
    });
  });

  // Open Full Mochimori Dashboard Page
  document.getElementById('open-dashboard-btn').addEventListener('click', () => {
    if (chrome.runtime.openOptionsPage) {
      chrome.runtime.openOptionsPage();
    } else {
      window.open(chrome.runtime.getURL('dashboard/dashboard.html'));
    }
  });

  // Quick Feed
  document.getElementById('quick-feed-btn').addEventListener('click', async () => {
    const inv = state.inventory;
    const itemToFeed = Object.keys(inv).find(k => inv[k] > 0) || 'ringo';
    const res = PoyoriEngine.feed(state, itemToFeed);
    if (res.success) {
      await saveState(state);
      renderPet();
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0]?.id) {
          chrome.tabs.sendMessage(tabs[0].id, { action: 'feed' }).catch(() => {});
        }
      });
    }
  });

  // Quick Pet
  document.getElementById('quick-pet-btn').addEventListener('click', async () => {
    PoyoriEngine.pet(state);
    await saveState(state);
    renderPet();
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]?.id) {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'pet' }).catch(() => {});
      }
    });
  });

  // Rename Companion
  const renameBtn = document.getElementById('popup-rename-btn');
  if (renameBtn) {
    renameBtn.addEventListener('click', async () => {
      const curName = state.pet.name || 'Poyori';
      const newName = window.prompt('Enter a custom name for your companion (1-20 characters):', curName);
      if (newName && newName.trim()) {
        PoyoriEngine.setPetCustomName(state, newName.trim());
        await saveState(state);
        renderPet();
        showFeedback(`Renamed to "${newName.trim()}"!`);
      }
    });
  }

  // Adjust Tamagotchi Display Size
  document.querySelectorAll('.popup-size-btn').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      const size = e.currentTarget.dataset.size;
      PoyoriEngine.setPetSize(state, size);
      await saveState(state);
      renderPet();
      showFeedback(`Size set to ${size.toUpperCase()}!`);
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0]?.id) {
          chrome.tabs.sendMessage(tabs[0].id, { action: 'set_pet_size', size }).catch(() => {});
        }
      });
    });
  });

  // Quick Cure Medicine
  const quickCureBtn = document.getElementById('quick-cure-btn');
  if (quickCureBtn) {
    quickCureBtn.addEventListener('click', async () => {
      const inv = state.inventory || {};
      if (!inv.yakuso || inv.yakuso <= 0) {
        if (state.koban >= 15) {
          PoyoriEngine.buyFoodItem(state, 'yakuso');
        } else {
          showFeedback('Need 15 Koban for Yakusō Medicine!');
          return;
        }
      }
      const res = PoyoriEngine.curePet(state);
      if (res.success) {
        await saveState(state);
        audioSynth.shinkaFanfare();
        renderPet();
        showFeedback('Poyori was cured with Yakusō!');
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          if (tabs[0]?.id) {
            chrome.tabs.sendMessage(tabs[0].id, { action: 'cheer' }).catch(() => {});
          }
        });
      }
    });
  }

  // Secret 7-tap gesture on popup logo / pet sprite to launch Dev Access Port
  let popupLogoClicks = 0;
  let lastLogoClickTime = 0;
  const brandEl = document.querySelector('.brand');
  const petSpriteEl = document.getElementById('pet-sprite');

  const onLogoTap = () => {
    const now = Date.now();
    if (now - lastLogoClickTime < 1500) {
      popupLogoClicks++;
    } else {
      popupLogoClicks = 1;
    }
    lastLogoClickTime = now;

    if (popupLogoClicks >= 4 && popupLogoClicks < 7) {
      audioSynth.boop();
      showFeedback(`${7 - popupLogoClicks} more taps for Dev Mode...`);
    } else if (popupLogoClicks >= 7) {
      popupLogoClicks = 0;
      audioSynth.shinkaFanfare();
      showFeedback('DEV MODE ACTIVATED!');
      const devUrl = chrome.runtime.getURL('dashboard/dev-portal.html?auth=gesture');
      if (chrome.tabs && chrome.tabs.create) {
        chrome.tabs.create({ url: devUrl });
      } else if (chrome.runtime && chrome.runtime.sendMessage) {
        chrome.runtime.sendMessage({ action: 'open_dev_portal', auth: 'gesture' });
      }
      setTimeout(() => window.close(), 600);
    }
  };

  if (brandEl) {
    brandEl.style.cursor = 'pointer';
    brandEl.title = 'Poyori';
    brandEl.addEventListener('click', onLogoTap);
  }
  if (petSpriteEl) {
    petSpriteEl.style.cursor = 'pointer';
    petSpriteEl.addEventListener('click', onLogoTap);
  }
}

initPopup();
