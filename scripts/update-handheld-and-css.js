import fs from 'fs';
import path from 'path';

// 1. Update ui/handheld-modal.css with focus, cure, theme, and roster styles
const cssPath = path.resolve('ui/handheld-modal.css');
let css = fs.readFileSync(cssPath, 'utf8');

const newCssRules = `
/* Cure Medicine Button */
.poyori-care-btn.cure {
  background: #27ae60;
  box-shadow: inset 1px 1px 0 #2ecc71, inset -1px -1px 0 #196f3d, 0 2px 0 #140b07;
  animation: pulse-cure 1.2s infinite ease-in-out;
}
.poyori-care-btn.cure:hover { background: #2ecc71; }

@keyframes pulse-cure {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.04); box-shadow: 0 0 6px #2ecc71; }
}

/* Breed & Level Tags */
.poyori-breed-tag {
  font-family: 'PixelOperator8', monospace;
  font-size: 7px;
  background: rgba(0, 0, 0, 0.15);
  color: var(--screen-text, #0f380f);
  padding: 2px 5px;
  border-radius: 2px;
  border: 1px solid var(--screen-card-border, rgba(0, 0, 0, 0.2));
  letter-spacing: 0.5px;
}

.poyori-creature-species {
  font-family: 'PixelOperator8', monospace;
  font-size: 8px;
  color: var(--screen-text, #0f380f);
  opacity: 0.85;
  margin-top: 2px;
}

/* Focus Session Tab */
.poyori-focus-view {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.poyori-focus-timer-box {
  background: var(--screen-card-bg, rgba(0, 0, 0, 0.08));
  border: 2px solid var(--screen-card-border, rgba(0, 0, 0, 0.2));
  border-radius: 4px;
  padding: 10px;
  text-align: center;
}

.poyori-focus-digits {
  font-family: 'PixelOperator8', monospace;
  font-size: 22px;
  font-weight: bold;
  letter-spacing: 2px;
  color: var(--screen-text, #0f380f);
  margin: 6px 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.poyori-discipline-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 4px;
  margin-top: 6px;
}

.discipline-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 4px;
  font-family: 'PixelOperator8', monospace;
  font-size: 7px;
  background: var(--screen-card-bg, rgba(0, 0, 0, 0.05));
  border: 1px solid var(--screen-card-border, rgba(0, 0, 0, 0.2));
  border-radius: 3px;
  cursor: pointer;
  color: var(--screen-text, #0f380f);
  transition: all 0.1s;
}

.discipline-btn.active {
  background: #2980b9;
  color: #ffffff;
  border-color: #1a5276;
  text-shadow: 1px 1px 0 rgba(0, 0, 0, 0.4);
}

.duration-selector {
  display: flex;
  gap: 5px;
  margin-top: 6px;
}

.duration-btn {
  flex: 1;
  padding: 5px 2px;
  font-family: 'PixelOperator8', monospace;
  font-size: 7px;
  border: 1px solid var(--screen-card-border, rgba(0, 0, 0, 0.2));
  border-radius: 3px;
  background: var(--screen-card-bg, rgba(0, 0, 0, 0.05));
  color: var(--screen-text, #0f380f);
  cursor: pointer;
}

.duration-btn.active {
  background: #e67e22;
  color: #ffffff;
  border-color: #b95d08;
}

.start-focus-btn {
  width: 100%;
  padding: 8px;
  margin-top: 8px;
  font-family: 'PixelOperator8', monospace;
  font-size: 9px;
  font-weight: bold;
  background: #27ae60;
  color: #ffffff;
  border: 2px solid #140b07;
  border-radius: 3px;
  cursor: pointer;
  box-shadow: 0 2px 0 #140b07;
  text-shadow: 1px 1px 0 #140b07;
}

.stop-focus-btn {
  width: 100%;
  padding: 8px;
  margin-top: 8px;
  font-family: 'PixelOperator8', monospace;
  font-size: 9px;
  font-weight: bold;
  background: #c0392b;
  color: #ffffff;
  border: 2px solid #140b07;
  border-radius: 3px;
  cursor: pointer;
  text-shadow: 1px 1px 0 #140b07;
}

.poyori-theme-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 4px;
  margin-top: 6px;
}

.theme-swatch-btn {
  padding: 5px 4px;
  font-family: 'PixelOperator8', monospace;
  font-size: 7px;
  border: 1px solid var(--screen-card-border, rgba(0, 0, 0, 0.2));
  border-radius: 3px;
  cursor: pointer;
  text-align: center;
}

.theme-swatch-btn.active {
  border: 2px solid #ffffff;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.4);
}

.poyori-roster-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: 6px;
}

.poyori-roster-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 8px;
  background: var(--screen-card-bg, rgba(0, 0, 0, 0.05));
  border: 1px solid var(--screen-card-border, rgba(0, 0, 0, 0.2));
  border-radius: 3px;
}

.roster-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.roster-name {
  font-family: 'PixelOperator8', monospace;
  font-size: 8px;
  font-weight: bold;
  color: var(--screen-text, #0f380f);
}

.roster-stage {
  font-family: 'PixelOperator8', monospace;
  font-size: 7px;
  opacity: 0.8;
  color: var(--screen-text, #0f380f);
}
`;

if (!css.includes('/* Cure Medicine Button */')) {
  css += '\n' + newCssRules;
  fs.writeFileSync(cssPath, css, 'utf8');
  console.log('Updated ui/handheld-modal.css');
}
