/**
 * Poyori (ポヨリ) — Dynamic Content Script Loader
 * Boots the ES Module content script within isolated webpage contexts.
 */

(async () => {
  try {
    const src = chrome.runtime.getURL('content/content.js');
    await import(src);
  } catch (err) {
    console.error('Failed to load Poyori content module:', err);
  }
})();
