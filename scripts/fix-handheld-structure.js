import fs from 'fs';
import path from 'path';

const modalPath = path.resolve('ui/handheld-modal.js');
let code = fs.readFileSync(modalPath, 'utf8');

// 1. Remove raw emoji ✏️
code = code.replace(
  `<button class="poyori-rename-btn" id="rename-pet-btn" title="Rename Companion" style="background:none;border:none;cursor:pointer;font-size:10px;">✏️</button>`,
  `<button class="poyori-rename-btn" id="rename-pet-btn" title="Rename Companion" style="background:none;border:none;cursor:pointer;font-size:8px;color:var(--screen-text,#0f380f);opacity:0.8;">[edit]</button>`
);

// 2. Fix the closure of bindEvents and class HandheldModal
const badSplit = `    const openDashBtn = this.modalEl.querySelector('#open-full-dash-btn');
    if (openDashBtn) {
      openDashBtn.addEventListener('click', () => {
        if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.openOptionsPage) {
          chrome.runtime.openOptionsPage();
        } else if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.getURL) {
          window.open(chrome.runtime.getURL('dashboard/dashboard.html'));
        }
      });
    }
  }
}
    // Rename Companion`;

const fixedSplit = `    const openDashBtn = this.modalEl.querySelector('#open-full-dash-btn');
    if (openDashBtn) {
      openDashBtn.addEventListener('click', () => {
        if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.openOptionsPage) {
          chrome.runtime.openOptionsPage();
        } else if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.getURL) {
          window.open(chrome.runtime.getURL('dashboard/dashboard.html'));
        }
      });
    }

    // Rename Companion`;

code = code.replace(badSplit, fixedSplit);

// Ensure the class closes with `  }\n}\n`
code = code.replace(/\s*}\s*}\s*$/, '') + '\n  }\n}\n';

fs.writeFileSync(modalPath, code, 'utf8');
console.log('Successfully fixed handheld-modal.js structure and removed emojis');
