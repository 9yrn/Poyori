import fs from 'fs';
import path from 'path';

// 1. Update dashboard/dashboard.html to feature the 6 modern branches in Bestiary filters
const dashHtmlPath = path.resolve('dashboard/dashboard.html');
let dashHtml = fs.readFileSync(dashHtmlPath, 'utf8');

const oldFilterChips = `<div class="branch-filter-row">
              <button class="filter-chip active" data-branch="all">All Branches</button>
              <button class="filter-chip" data-branch="denki">Denki (Cyber)</button>
              <button class="filter-chip" data-branch="chishiki">Chishiki (Scholar)</button>
              <button class="filter-chip" data-branch="monogatari">Monogatari (Story)</button>
              <button class="filter-chip" data-branch="gutara">Gūtara (Slacker)</button>
            </div>`;

const newFilterChips = `<div class="branch-filter-row">
              <button class="filter-chip active" data-branch="all">All Disciplines (36)</button>
              <button class="filter-chip" data-branch="coding">Coding (Cat)</button>
              <button class="filter-chip" data-branch="creative">Creative (Bird)</button>
              <button class="filter-chip" data-branch="literature">Literature (Fox)</button>
              <button class="filter-chip" data-branch="research">Research (Owl)</button>
              <button class="filter-chip" data-branch="gaming">Gaming (Dragon)</button>
              <button class="filter-chip" data-branch="personal">Personal (Shiba)</button>
            </div>`;

dashHtml = dashHtml.replace(oldFilterChips, newFilterChips);
fs.writeFileSync(dashHtmlPath, dashHtml, 'utf8');
console.log('Updated dashboard/dashboard.html filter chips');

// 2. Update dashboard/dashboard.js renderBestiary to filter canonical 36 models cleanly
const dashJsPath = path.resolve('dashboard/dashboard.js');
let dashJs = fs.readFileSync(dashJsPath, 'utf8');

const oldBestiaryFilter = `  const allCreatures = Object.values(CREATURES).filter(c => {
    if (activeBranchFilter === 'all') return true;
    return c.branch === activeBranchFilter;
  });`;

const newBestiaryFilter = `  const allCreatures = Object.values(CREATURES).filter(c => {
    if (c.isAlias) return false;
    if (activeBranchFilter === 'all') return true;
    return c.branch === activeBranchFilter;
  });`;

dashJs = dashJs.replace(oldBestiaryFilter, newBestiaryFilter);
fs.writeFileSync(dashJsPath, dashJs, 'utf8');
console.log('Updated dashboard/dashboard.js bestiary filter');

// 3. Update ui/handheld-modal.js renderZukanTab to filter canonical 36 models
const modalPath = path.resolve('ui/handheld-modal.js');
let modalCode = fs.readFileSync(modalPath, 'utf8');

const oldZukanFilter = `    const creaturesHtml = Object.values(CREATURES).map(c => {`;
const newZukanFilter = `    const creaturesHtml = Object.values(CREATURES).filter(c => !c.isAlias).map(c => {`;

if (modalCode.includes(oldZukanFilter)) {
  modalCode = modalCode.replace(oldZukanFilter, newZukanFilter);
  fs.writeFileSync(modalPath, modalCode, 'utf8');
  console.log('Updated ui/handheld-modal.js zukan filter');
}
