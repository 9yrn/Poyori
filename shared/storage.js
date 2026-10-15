/**
 * Poyori (ポヨリ) — Storage Manager
 *
 * This module handles persistent data synchronization with Google Chrome's local storage
 * (`chrome.storage.local`). It ensures that your pet's state, inventory, and stats are
 * safely saved across browser sessions, tabs, and window reloads.
 */

import { DEFAULT_STATE } from './constants.js';

// The primary storage key used to store Poyori's data in chrome.storage.local
const STORAGE_KEY = 'poyori_state';

/**
 * Retrieves the current game state from storage.
 * If no state exists yet (e.g. on first launch), it initializes and returns the default state.
 *
 * @returns {Promise<Object>} The latest Poyori game state.
 */
export async function getState() {
  return new Promise((resolve) => {
    // Graceful fallback for non-extension environments (e.g., automated tests or standalone dev)
    if (typeof chrome === 'undefined' || !chrome.storage || !chrome.storage.local) {
      try {
        const local = localStorage.getItem(STORAGE_KEY);
        resolve(local ? JSON.parse(local) : JSON.parse(JSON.stringify(DEFAULT_STATE)));
      } catch (e) {
        resolve(JSON.parse(JSON.stringify(DEFAULT_STATE)));
      }
      return;
    }

    // Read from Chrome's persistent local storage
    chrome.storage.local.get([STORAGE_KEY], (result) => {
      if (chrome.runtime.lastError || !result[STORAGE_KEY]) {
        // First-time setup: initialize and save default state
        const initial = JSON.parse(JSON.stringify(DEFAULT_STATE));
        chrome.storage.local.set({ [STORAGE_KEY]: initial }, () => {
          resolve(initial);
        });
      } else {
        // Deep merge with default state so any newly added settings/fields are populated
        const merged = deepMerge(DEFAULT_STATE, result[STORAGE_KEY]);
        resolve(merged);
      }
    });
  });
}

/**
 * Saves the updated game state to persistent storage.
 *
 * @param {Object} state - The complete Poyori state to persist.
 * @returns {Promise<Object>} Resolves with the saved state.
 */
export async function saveState(state) {
  return new Promise((resolve) => {
    if (typeof chrome === 'undefined' || !chrome.storage || !chrome.storage.local) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      } catch (e) {}
      resolve(state);
      return;
    }

    chrome.storage.local.set({ [STORAGE_KEY]: state }, () => {
      resolve(state);
    });
  });
}

/**
 * Updates specific properties on the pet object and saves immediately.
 *
 * @param {Object} petUpdates - Partial pet object containing properties to update.
 * @returns {Promise<Object>} The newly saved state.
 */
export async function updatePet(petUpdates) {
  const state = await getState();
  state.pet = { ...state.pet, ...petUpdates };
  return saveState(state);
}

/**
 * Listens for state changes broadcasted across different tabs or service workers.
 *
 * @param {Function} callback - Invoked whenever Poyori state changes in storage.
 * @returns {Function} An unsubscribe cleanup function.
 */
export function subscribeState(callback) {
  if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.onChanged) {
    const listener = (changes, areaName) => {
      if (areaName === 'local' && changes[STORAGE_KEY]) {
        callback(changes[STORAGE_KEY].newValue, changes[STORAGE_KEY].oldValue);
      }
    };
    chrome.storage.onChanged.addListener(listener);
    return () => chrome.storage.onChanged.removeListener(listener);
  }
  return () => {};
}

/**
 * Recursively merges source properties into target without mutating the original target.
 * Preserves nested default configuration when user state is loaded.
 * Handles arrays by treating the source array as the override value.
 */
function deepMerge(target, source) {
  const isObject = (item) => item !== null && typeof item === 'object' && !Array.isArray(item);

  if (!isObject(target) || !isObject(source)) {
    return source;
  }

  // Create an initial full clone of the target to avoid mutating it.
  const result = customClone(target);

  // Recursively apply source properties to the newly cloned result.
  function applyMerge(res, src) {
    for (const key of Object.keys(src)) {
      if (isObject(src[key]) && isObject(res[key])) {
        applyMerge(res[key], src[key]); // Mutate the clone directly
      } else {
        res[key] = customClone(src[key]); // Avoid leaking source references
      }
    }
  }

  applyMerge(result, source);
  return result;
}

/**
 * Creates a deep copy of an object or array.
 */
function customClone(obj) {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  if (Array.isArray(obj)) {
    const arr = new Array(obj.length);
    for (let i = 0; i < obj.length; i++) {
      arr[i] = customClone(obj[i]);
    }
    return arr;
  }
  const clonedObj = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      clonedObj[key] = customClone(obj[key]);
    }
  }
  return clonedObj;
}
