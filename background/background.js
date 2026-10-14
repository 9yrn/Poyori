/**
 * Poyori (ポヨリ) — Background Service Worker
 * Manages active tab time tracking, idle detection, tick alarms, and streak calculations.
 */

import { getState, saveState } from '../shared/storage.js';
import { PoyoriEngine } from '../shared/game-engine.js';

let activeDomain = null;
let activeDomainStartTime = Date.now();

// 1. Extension Lifecycle
chrome.runtime.onInstalled.addListener(async (details) => {
  console.log('Poyori Service Worker Installed.');
  await getState(); // Ensure default state is stored

  // Periodic 1-minute alarm for vitals tick
  chrome.alarms.create('poyori_tick', { periodInMinutes: 1 });

  // Open Mochimori Dashboard on initial fresh install for onboarding tutorial
  if (details && details.reason === 'install') {
    try {
      chrome.tabs.create({ url: chrome.runtime.getURL('dashboard/dashboard.html') });
    } catch (e) {
      console.warn('Could not open initial dashboard onboarding tab:', e);
    }
  }
});


// 2. Alarm Listener
chrome.alarms.onAlarm.addListener(async (alarm) => {
  if (alarm.name === 'poyori_tick') {
    const state = await getState();
    
    // Process current active tab time
    flushBrowsingTime(state);

    // Process pet vitals tick
    const { changed, event } = PoyoriEngine.processTick(state);
    
    // Check daily streaks
    PoyoriEngine.checkDailyStreak(state);

    if (changed || event) {
      await saveState(state);
    }
  }
});

// 3. Tab Activity Tracking
chrome.tabs.onActivated.addListener(async (activeInfo) => {
  try {
    const tab = await chrome.tabs.get(activeInfo.tabId);
    handleTabChange(tab);
  } catch (e) {}
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.active) {
    handleTabChange(tab);
  }
});

async function handleTabChange(tab) {
  if (!tab || !tab.url || tab.url.startsWith('chrome://') || tab.url.includes('blocked/blocked.html')) return;

  const state = await getState();
  flushBrowsingTime(state);

  try {
    const urlObj = new URL(tab.url);
    activeDomain = urlObj.hostname;
    activeDomainStartTime = Date.now();

    // Check if domain is blocked by NSFW filter or custom blocked sites
    if (PoyoriEngine.isBlocked(activeDomain, state)) {
      const blockedUrl = chrome.runtime.getURL('blocked/blocked.html?domain=' + encodeURIComponent(activeDomain));
      chrome.tabs.update(tab.id, { url: blockedUrl }).catch(() => {});
      return;
    }
  } catch (e) {
    activeDomain = null;
  }
}

function flushBrowsingTime(state) {
  if (!activeDomain) return;

  const now = Date.now();
  const durationSecs = Math.floor((now - activeDomainStartTime) / 1000);
  if (durationSecs >= 5) {
    const result = PoyoriEngine.recordBrowsing(state, activeDomain, durationSecs);
    activeDomainStartTime = now;

    if (result && result.evolved) {
      // Notify active tab of evolution
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0]?.id) {
          chrome.tabs.sendMessage(tabs[0].id, {
            action: 'shinka_evolved',
            creature: result.creature
          }).catch(() => {});
        }
      });
    }
  }
}

// 4. Idle Detection
chrome.idle.onStateChanged.addListener(async (newState) => {
  const state = await getState();
  if (newState === 'idle' || newState === 'locked') {
    state.pet.isSleeping = true;
    await saveState(state);
  } else if (newState === 'active') {
    // If not bedtime, wake pet up
    if (!PoyoriEngine.isBedtime(state.settings.bedtimeStart, state.settings.bedtimeEnd)) {
      state.pet.isSleeping = false;
      await saveState(state);
    }
  }
});

// 5. Message Listener for Safe Navigation & Tab Creation
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action === 'open_dev_portal') {
    const devUrl = chrome.runtime.getURL('dashboard/dev-portal.html?auth=gesture');
    chrome.tabs.create({ url: devUrl });
    sendResponse({ success: true, url: devUrl });
    return true;
  }
  if (msg.action === 'open_dashboard') {
    const dashUrl = chrome.runtime.getURL('dashboard/dashboard.html');
    chrome.tabs.create({ url: dashUrl });
    sendResponse({ success: true, url: dashUrl });
    return true;
  }
});
