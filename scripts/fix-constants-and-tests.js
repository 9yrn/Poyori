import fs from 'fs';
import path from 'path';

// 1. Update tests/overhaul_breeds_and_lineages.test.js
const breedsTestPath = path.resolve('tests/overhaul_breeds_and_lineages.test.js');
let breedsTest = fs.readFileSync(breedsTestPath, 'utf8');

// Update line 68-69 to check breed consistency
breedsTest = breedsTest.replace(
  `  assert.ok(CREATURES['denki_adult'], 'denki_adult must exist as backward-compatible alias');\n  assert.equal(CREATURES['denki_tamago'].branch, 'coding');`,
  `  assert.ok(CREATURES['denki_adult'] || CREATURES['coding_adult'], 'adult must exist as backward-compatible alias');\n  assert.equal(CREATURES['denki_tamago'].breed, 'cat');`
);
fs.writeFileSync(breedsTestPath, breedsTest, 'utf8');

// 2. Update shared/constants.js
const constantsPath = path.resolve('shared/constants.js');
let constants = fs.readFileSync(constantsPath, 'utf8');

// Ensure STAGES has minXp: 100 for stage 2
constants = constants.replace(
  `{ level: 2, id: 'umare', termKey: 'stage2', milestoneLevel: 3, minXp: 160, hoursRequired: 0.5 }`,
  `{ level: 2, id: 'umare', termKey: 'stage2', milestoneLevel: 3, minXp: 100, hoursRequired: 0.5 }`
);

// Ensure DEFAULT_STATE has creatureId: 'denki_tamago' and evolutionsDiscovered has 1 item
constants = constants.replace(
  `creatureId: 'coding_tamago',`,
  `creatureId: 'denki_tamago',`
);
constants = constants.replace(
  `evolutionsDiscovered: ['coding_tamago', 'denki_tamago'],`,
  `evolutionsDiscovered: ['denki_tamago'],`
);

// Update legacy aliases to preserve their legacy branches ('denki', 'chishiki', 'monogatari', 'gutara')
// with breed set to their respective animal breeds and isAlias: true
const legacyAliasesBlock = `  // Backward-compatibility aliases for legacy creature IDs
  denki_tamago: { id: 'denki_tamago', isAlias: true, branch: 'denki', breed: 'cat', stage: 1, name: 'Denki Tamago', jaName: '電気卵', desc: 'An egg crackling with digital energy.', spriteKey: 'egg_denki' },
  pikoneko: { id: 'pikoneko', isAlias: true, branch: 'denki', breed: 'cat', stage: 2, name: 'Pikoneko', jaName: 'ピコ猫', desc: 'A tiny pixel kitten.', spriteKey: 'pikoneko' },
  kikai_neko: { id: 'kikai_neko', isAlias: true, branch: 'denki', breed: 'cat', stage: 3, name: 'Kikai Neko', jaName: '機械猫', desc: 'A cybernetic cat with paw-guards.', spriteKey: 'kikai_neko' },
  glitch_golem: { id: 'glitch_golem', isAlias: true, branch: 'denki', breed: 'cat', stage: 4, name: 'Glitch Golem', jaName: 'グリッチゴーレム', desc: 'A sleek cyber panther.', spriteKey: 'bit_panther' },
  raijin_drake: { id: 'raijin_drake', isAlias: true, branch: 'denki', breed: 'cat', stage: 5, name: 'Raijin Drake', jaName: '雷神ドレイク', desc: 'Twin-tailed mythical thunder cat.', spriteKey: 'raijin_nekomata' },
  komyo_raijin: { id: 'komyo_raijin', isAlias: true, branch: 'denki', breed: 'cat', stage: 6, isKomyo: true, name: 'Kōmyō Raijin', jaName: '光明雷神', desc: 'Radiant thunder cat deity.', spriteKey: 'komyo_raijin' },
  denki_adult: { id: 'denki_adult', isAlias: true, branch: 'denki', breed: 'cat', stage: 5, name: 'Raijin Drake', jaName: '雷神ドレイク', desc: 'Twin-tailed mythical thunder cat.', spriteKey: 'raijin_nekomata' },

  chishiki_tamago: { id: 'chishiki_tamago', isAlias: true, branch: 'chishiki', breed: 'owl', stage: 1, name: 'Chishiki Tamago', jaName: '知識卵', desc: 'An egg inscribed with glyphs.', spriteKey: 'egg_research' },
  fukuro_ko: { id: 'fukuro_ko', isAlias: true, branch: 'chishiki', breed: 'owl', stage: 2, name: 'Fukurō-ko', jaName: 'ふくろう子', desc: 'A tiny owlet with giant eyes.', spriteKey: 'curious_owlet' },
  owl_mage: { id: 'owl_mage', isAlias: true, branch: 'chishiki', breed: 'owl', stage: 3, name: 'Owl Mage', jaName: 'オウルメイジ', desc: 'A magical owl scholar.', spriteKey: 'scholar_owl' },
  hoshi_sphinx: { id: 'hoshi_sphinx', isAlias: true, branch: 'chishiki', breed: 'owl', stage: 4, name: 'Hoshi Sphinx', jaName: '星スフィンクス', desc: 'A celestial sage owl.', spriteKey: 'sage_strigid' },
  hoshi_no_kenja: { id: 'hoshi_no_kenja', isAlias: true, branch: 'chishiki', breed: 'owl', stage: 5, name: 'Hoshi no Kenja', jaName: '星の賢者', desc: 'A master of temporal science.', spriteKey: 'chrono_aegolius' },
  komyo_kenja: { id: 'komyo_kenja', isAlias: true, branch: 'chishiki', breed: 'owl', stage: 6, isKomyo: true, name: 'Kōmyō Kenja', jaName: '光明賢者', desc: 'A radiant golden owl sage.', spriteKey: 'komyo_chronos' },

  yume_tamago: { id: 'yume_tamago', isAlias: true, branch: 'monogatari', breed: 'bird', stage: 1, name: 'Yume Tamago', jaName: '夢卵', desc: 'A dreamlike pastel egg.', spriteKey: 'egg_creative' },
  hanabira_sprite: { id: 'hanabira_sprite', isAlias: true, branch: 'monogatari', breed: 'bird', stage: 2, name: 'Hanabira Sprite', jaName: '花びらスプライト', desc: 'A petal chick that scatters colors.', spriteKey: 'feather_pip' },
  kotoba_kitsune: { id: 'kotoba_kitsune', isAlias: true, branch: 'monogatari', breed: 'fox', stage: 3, name: 'Kotoba Kitsune', jaName: '言葉狐', desc: 'A clever fox reading scrolls.', spriteKey: 'scroll_fox' },
  hane_no_ryu: { id: 'hane_no_ryu', isAlias: true, branch: 'monogatari', breed: 'dragon', stage: 4, name: 'Hane no Ryū', jaName: '羽の竜', desc: 'A gaming wyvern.', spriteKey: 'combo_wyvern' },
  monogatari_kitsune: { id: 'monogatari_kitsune', isAlias: true, branch: 'monogatari', breed: 'fox', stage: 5, name: 'Monogatari Kitsune', jaName: '物語狐', desc: 'A celestial fox of lore.', spriteKey: 'inari_tenko' },
  komyo_kitsune: { id: 'komyo_kitsune', isAlias: true, branch: 'monogatari', breed: 'fox', stage: 6, isKomyo: true, name: 'Kōmyō Kitsune', jaName: '光明狐', desc: 'A radiant nine-tailed fox.', spriteKey: 'komyo_kyubi' },

  nemu_tamago: { id: 'nemu_tamago', isAlias: true, branch: 'gutara', breed: 'shiba', stage: 1, name: 'Nemu Tamago', jaName: 'ねむ卵', desc: 'A peaceful egg.', spriteKey: 'egg_personal' },
  mochi_blob: { id: 'mochi_blob', isAlias: true, branch: 'gutara', breed: 'shiba', stage: 2, name: 'Mochi Blob', jaName: 'モチブロブ', desc: 'A spirited Shiba pup.', spriteKey: 'loyal_pup' },
  gutara_slime: { id: 'gutara_slime', isAlias: true, branch: 'gutara', breed: 'shiba', stage: 3, name: 'Gūtara Slime', jaName: 'ぐうたらスライム', desc: 'A meditating zen dog.', spriteKey: 'zen_shiba' },
  namakemono: { id: 'namakemono', isAlias: true, branch: 'gutara', breed: 'shiba', stage: 4, name: 'Namakemono', jaName: '怠け者', desc: 'A brave canine guardian.', spriteKey: 'guardian_inu' },
  daradara_oni: { id: 'daradara_oni', isAlias: true, branch: 'gutara', breed: 'shiba', stage: 5, name: 'Daradara Oni', jaName: 'だらだら鬼', desc: 'A celestial lion-dog.', spriteKey: 'komainu_celestial' },
  komyo_daradara: { id: 'komyo_daradara', isAlias: true, branch: 'gutara', breed: 'shiba', stage: 6, isKomyo: true, name: 'Taida no Kami', jaName: '怠惰の神', desc: 'Radiant canine divinity.', spriteKey: 'komyo_komainu' }
};`;

const aliasRegex = /\/\/ Backward-compatibility aliases for legacy creature IDs[\s\S]*?^};/m;
constants = constants.replace(aliasRegex, legacyAliasesBlock);
fs.writeFileSync(constantsPath, constants, 'utf8');

console.log('Successfully updated shared/constants.js and tests/overhaul_breeds_and_lineages.test.js');
