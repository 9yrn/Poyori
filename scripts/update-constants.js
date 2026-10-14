import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const constantsPath = path.resolve(__dirname, '../shared/constants.js');

let code = fs.readFileSync(constantsPath, 'utf8');

const newCreaturesBlock = `/**
 * Complete Creature Bestiary across all 6 animal breed branches
 * Total: 36 unique consistent breed creatures + legacy aliases for backward compatibility
 */
export const CREATURES = {
  // ⚡ 1. CODING BRANCH (Breed: Cat / Neko)
  coding_tamago: {
    id: 'coding_tamago',
    branch: 'coding',
    breed: 'cat',
    stage: 1,
    name: 'Byte Egg',
    jaName: '電脳卵',
    desc: 'An egg crackling with digital pulses and feline whiskers on its shell.',
    spriteKey: 'egg_denki',
    specialTrick: 'Emits gentle electric purrs when held close.'
  },
  coding_baby: {
    id: 'coding_baby',
    branch: 'coding',
    breed: 'cat',
    stage: 2,
    name: 'Byte Kitten',
    jaName: 'ココネコ',
    desc: 'A curious 9-bit kitten with an antenna tail that twitches when code runs.',
    spriteKey: 'pikoneko',
    specialTrick: 'Paws at digital pixels on screen.'
  },
  coding_child: {
    id: 'coding_child',
    branch: 'coding',
    breed: 'cat',
    stage: 3,
    name: 'Cyber Cat',
    jaName: '電脳猫',
    desc: 'An agile feline wearing mechanical paw-guards and mini terminal visor.',
    spriteKey: 'kikai_neko',
    specialTrick: 'Bats around glowing neon debug cubes.'
  },
  coding_teen: {
    id: 'coding_teen',
    branch: 'coding',
    breed: 'cat',
    stage: 4,
    name: 'Bit Panther',
    jaName: 'ビット豹',
    desc: 'A sleek, lightning-fast cyber panther that stalks software bugs in compiled matrices.',
    spriteKey: 'bit_panther',
    specialTrick: 'Projects floating green terminal code and taps holographic keys.'
  },
  coding_adult: {
    id: 'coding_adult',
    branch: 'coding',
    breed: 'cat',
    stage: 5,
    name: 'Raijin Nekomata',
    jaName: '雷神猫又',
    desc: 'A twin-tailed mythical thunder cat cloaked in electric currents and logic auras.',
    spriteKey: 'raijin_nekomata',
    specialTrick: 'Summons twin lightning tails that dance in binary sparks.'
  },
  coding_radiant: {
    id: 'coding_radiant',
    branch: 'coding',
    breed: 'cat',
    stage: 6,
    isKomyo: true,
    name: 'Kōmyō Nekomata',
    jaName: '光明猫又',
    desc: 'The ascended golden thunder cat deity, blazing with 7-streak celestial lightning.',
    spriteKey: 'komyo_raijin',
    specialTrick: 'Creates a celestial matrix aura that illuminates the entire web page.'
  },

  // 🎨 2. CREATIVE ARTS BRANCH (Breed: Bird / Tori)
  creative_tamago: {
    id: 'creative_tamago',
    branch: 'creative',
    breed: 'bird',
    stage: 1,
    name: 'Prism Egg',
    jaName: '虹色卵',
    desc: 'A pastel egg bathed in shifting watercolor hues and soft down feathers.',
    spriteKey: 'egg_creative',
    specialTrick: 'Gently shifts colors to match your background.'
  },
  creative_baby: {
    id: 'creative_baby',
    branch: 'creative',
    breed: 'bird',
    stage: 2,
    name: 'Feather Pip',
    jaName: 'ピヨピヨ',
    desc: 'A fluffy avian chick whose chirps scatter colorful pastel sparkles.',
    spriteKey: 'feather_pip',
    specialTrick: 'Flutters tiny wings and leaves a trail of color dots.'
  },
  creative_child: {
    id: 'creative_child',
    branch: 'creative',
    breed: 'bird',
    stage: 3,
    name: 'Prism Finch',
    jaName: '虹雀',
    desc: 'A swift sparrow with rainbow-tipped wingtips that paints music in the breeze.',
    spriteKey: 'prism_finch',
    specialTrick: 'Performs an aerial loop and scatters rainbow confetti.'
  },
  creative_teen: {
    id: 'creative_teen',
    branch: 'creative',
    breed: 'bird',
    stage: 4,
    name: 'Origami Crane',
    jaName: '折鶴',
    desc: 'An exquisite geometric paper crane spirit folded with infinite artistic grace.',
    spriteKey: 'origami_crane',
    specialTrick: 'Folds itself into floating origami shapes.'
  },
  creative_adult: {
    id: 'creative_adult',
    branch: 'creative',
    breed: 'bird',
    stage: 5,
    name: 'Suzaku Phoenix',
    jaName: '朱雀',
    desc: 'The southern divine firebird of boundless inspiration, crowned with fiery plumes.',
    spriteKey: 'suzaku_phoenix',
    specialTrick: 'Spreads grand wings and casts an inspiring rainbow flame.'
  },
  creative_radiant: {
    id: 'creative_radiant',
    branch: 'creative',
    breed: 'bird',
    stage: 6,
    isKomyo: true,
    name: 'Kōmyō Suzaku',
    jaName: '光明朱雀',
    desc: 'The solar celestial phoenix radiating perpetual golden warmth and artistic brilliance.',
    spriteKey: 'komyo_suzaku',
    specialTrick: 'Rains golden solar feathers of infinite creative inspiration.'
  },

  // 📖 3. LITERATURE BRANCH (Breed: Fox / Kitsune)
  literature_tamago: {
    id: 'literature_tamago',
    branch: 'literature',
    breed: 'fox',
    stage: 1,
    name: 'Scroll Egg',
    jaName: '巻物卵',
    desc: 'An ancient parchment egg tied with red silk and inscribed with folklore haiku.',
    spriteKey: 'egg_literature',
    specialTrick: 'Whispers fragments of classical poetry.'
  },
  literature_baby: {
    id: 'literature_baby',
    branch: 'literature',
    breed: 'fox',
    stage: 2,
    name: 'Ink Kit',
    jaName: '墨狐',
    desc: 'A curious white fox cub with an ink-black brush tail that writes on the floor.',
    spriteKey: 'ink_kit',
    specialTrick: 'Swishes tail to draw tiny kanji glyphs.'
  },
  literature_child: {
    id: 'literature_child',
    branch: 'literature',
    breed: 'fox',
    stage: 3,
    name: 'Scroll Fox',
    jaName: '文狐',
    desc: 'A clever fox carrying an orbiting sutra scroll and bamboo writing brush.',
    spriteKey: 'scroll_fox',
    specialTrick: 'Unrolls a floating ancient scroll with proverb.'
  },
  literature_teen: {
    id: 'literature_teen',
    branch: 'literature',
    breed: 'fox',
    stage: 4,
    name: 'Mystic Kitsune',
    jaName: '妖狐',
    desc: 'A three-tailed mystical fox surrounded by glowing blue literary foxfire.',
    spriteKey: 'mystic_kitsune',
    specialTrick: 'Conjures foxfire lanterns that spell words in the air.'
  },
  literature_adult: {
    id: 'literature_adult',
    branch: 'literature',
    breed: 'fox',
    stage: 5,
    name: 'Inari Tenko',
    jaName: '天狐',
    desc: 'A celestial four-tailed white fox guardian of wisdom, poetry, and dramatic prose.',
    spriteKey: 'inari_tenko',
    specialTrick: 'Dances amidst swirling paper prayer cards.'
  },
  literature_radiant: {
    id: 'literature_radiant',
    branch: 'literature',
    breed: 'fox',
    stage: 6,
    isKomyo: true,
    name: 'Kōmyō Kyūbi',
    jaName: '光明九尾',
    desc: 'The legendary golden nine-tailed fox sovereign holding all of human imagination.',
    spriteKey: 'komyo_kyubi',
    specialTrick: 'Fans out nine glorious golden tails crowned in sacred orbs.'
  },

  // 🦉 4. RESEARCH BRANCH (Breed: Owl / Fukurō)
  research_tamago: {
    id: 'research_tamago',
    branch: 'research',
    breed: 'owl',
    stage: 1,
    name: 'Gnosi Egg',
    jaName: '知恵卵',
    desc: 'A speckled blue egg engraved with astrolabes and mathematical equations.',
    spriteKey: 'egg_research',
    specialTrick: 'Emits a rhythmic ticking like an antique pocket watch.'
  },
  research_baby: {
    id: 'research_baby',
    branch: 'research',
    breed: 'owl',
    stage: 2,
    name: 'Curious Owlet',
    jaName: 'フクロウ雛',
    desc: 'A round, fluffy owlet that rotates its head 270 degrees to inspect every detail.',
    spriteKey: 'curious_owlet',
    specialTrick: 'Bobs head in inquisitive circles.'
  },
  research_child: {
    id: 'research_child',
    branch: 'research',
    breed: 'owl',
    stage: 3,
    name: 'Scholar Owl',
    jaName: '学者梟',
    desc: 'A studious owl wearing an 8-bit monocle and clutching a leather-bound journal.',
    spriteKey: 'scholar_owl',
    specialTrick: 'Adjusts monocle and examines data runes.'
  },
  research_teen: {
    id: 'research_teen',
    branch: 'research',
    breed: 'owl',
    stage: 4,
    name: 'Sage Strigid',
    jaName: '賢者梟',
    desc: 'A majestic horned owl that perches upon an orbiting celestial armillary sphere.',
    spriteKey: 'sage_strigid',
    specialTrick: 'Spins the celestial sphere to chart constellations.'
  },
  research_adult: {
    id: 'research_adult',
    branch: 'research',
    breed: 'owl',
    stage: 5,
    name: 'Chrono Aegolius',
    jaName: '時空梟',
    desc: 'A master of temporal science and cosmic analysis, gazing across timelines.',
    spriteKey: 'chrono_aegolius',
    specialTrick: 'Slows down local particle time in a shimmering pulse.'
  },
  research_radiant: {
    id: 'research_radiant',
    branch: 'research',
    breed: 'owl',
    stage: 6,
    isKomyo: true,
    name: 'Kōmyō Chronos',
    jaName: '光明時空梟',
    desc: 'The ascended golden cosmic owl holding the ultimate unified truths of the universe.',
    spriteKey: 'komyo_chronos',
    specialTrick: 'Opens a golden temporal rift revealing shimmering stars.'
  },

  // 🐲 5. GAMING BRANCH (Breed: Dragon / Ryū)
  gaming_tamago: {
    id: 'gaming_tamago',
    branch: 'gaming',
    breed: 'dragon',
    stage: 1,
    name: 'Wyrm Egg',
    jaName: '竜の卵',
    desc: 'A scaly obsidian egg that rumbles with 8-bit chiptune basslines.',
    spriteKey: 'egg_gaming',
    specialTrick: 'Flashes glowing health-bar colors.'
  },
  gaming_baby: {
    id: 'gaming_baby',
    branch: 'gaming',
    breed: 'dragon',
    stage: 2,
    name: 'Arcade Wyrmling',
    jaName: 'コリュウ',
    desc: 'A chubby baby dragon with tiny wings that sneezes harmless pixel fireballs.',
    spriteKey: 'arcade_wyrmling',
    specialTrick: 'Hiccups an 8-bit fireball with sound effect.'
  },
  gaming_child: {
    id: 'gaming_child',
    branch: 'gaming',
    breed: 'dragon',
    stage: 3,
    name: 'Pixel Drake',
    jaName: '画素竜',
    desc: 'A horned drake sporting retro D-pad markings and high-voltage tail crystals.',
    spriteKey: 'pixel_drake',
    specialTrick: 'Performs a mini combat roll and fires pixel sparks.'
  },
  gaming_teen: {
    id: 'gaming_teen',
    branch: 'gaming',
    breed: 'dragon',
    stage: 4,
    name: 'Combo Wyvern',
    jaName: '連撃竜',
    desc: 'A swift, armored gaming wyvern driven by fighting game combos and rapid reflexes.',
    spriteKey: 'combo_wyvern',
    specialTrick: 'Strikes a fighting game victory pose with combo count.'
  },
  gaming_adult: {
    id: 'gaming_adult',
    branch: 'gaming',
    breed: 'dragon',
    stage: 5,
    name: 'Shinryū Master',
    jaName: '神竜',
    desc: 'A colossal serpentine dragon deity embodying mastery over all game worlds.',
    spriteKey: 'shinryu_master',
    specialTrick: 'Coils in the sky holding a glowing legendary high-score orb.'
  },
  gaming_radiant: {
    id: 'gaming_radiant',
    branch: 'gaming',
    breed: 'dragon',
    stage: 6,
    isKomyo: true,
    name: 'Kōmyō Shinryū',
    jaName: '光明神竜',
    desc: 'The supreme golden dragon sovereign blazing with 100% completion aura.',
    spriteKey: 'komyo_shinryu',
    specialTrick: 'Unleashes a majestic celestial dragon roar with fireworks.'
  },

  // 🐕 6. PERSONAL DEVELOPMENT BRANCH (Breed: Shiba Inu / Inu)
  personal_tamago: {
    id: 'personal_tamago',
    branch: 'personal',
    breed: 'shiba',
    stage: 1,
    name: 'Zen Egg',
    jaName: '心の卵',
    desc: 'A soothing warm cream egg wrapped in a miniature red prayer omamori.',
    spriteKey: 'egg_personal',
    specialTrick: 'Gives off a gentle relaxing heartbeat.'
  },
  personal_baby: {
    id: 'personal_baby',
    branch: 'personal',
    breed: 'shiba',
    stage: 2,
    name: 'Loyal Pup',
    jaName: '豆柴',
    desc: 'A determined little Shiba pup wearing a red hachimaki headband ready to work.',
    spriteKey: 'loyal_pup',
    specialTrick: 'Wags curled tail furiously and gives an encouraging yip.'
  },
  personal_child: {
    id: 'personal_child',
    branch: 'personal',
    breed: 'shiba',
    stage: 3,
    name: 'Zen Shiba',
    jaName: '座禅柴',
    desc: 'A disciplined canine meditating in zazen posture, cultivating iron mindfulness.',
    spriteKey: 'zen_shiba',
    specialTrick: 'Floats 2 inches off the ground in deep zen meditation.'
  },
  personal_teen: {
    id: 'personal_teen',
    branch: 'personal',
    breed: 'shiba',
    stage: 4,
    name: 'Guardian Inu',
    jaName: '守護犬',
    desc: 'An athletic, brave canine guardian dedicated to physical health and consistent habits.',
    spriteKey: 'guardian_inu',
    specialTrick: 'Does a brisk set of morning stretching exercises.'
  },
  personal_adult: {
    id: 'personal_adult',
    branch: 'personal',
    breed: 'shiba',
    stage: 5,
    name: 'Komainu Celestial',
    jaName: '狛犬',
    desc: 'A sacred lion-dog spirit guardian stationed at the gateway of personal achievement.',
    spriteKey: 'komainu_celestial',
    specialTrick: 'Strikes paws down to create a protective wellness barrier.'
  },
  personal_radiant: {
    id: 'personal_radiant',
    branch: 'personal',
    breed: 'shiba',
    stage: 6,
    isKomyo: true,
    name: 'Kōmyō Komainu',
    jaName: '光明狛犬',
    desc: 'The transcendent golden canine divinity of unshakeable willpower and inner peace.',
    spriteKey: 'komyo_komainu',
    specialTrick: 'Radiates a warm golden halo that fills the user with peaceful motivation.'
  },

  // Backward-compatibility aliases for legacy creature IDs
  denki_tamago: { id: 'denki_tamago', isAlias: true, branch: 'coding', breed: 'cat', stage: 1, name: 'Byte Egg', jaName: '電脳卵', desc: 'An egg crackling with digital energy.', spriteKey: 'egg_denki' },
  pikoneko: { id: 'pikoneko', isAlias: true, branch: 'coding', breed: 'cat', stage: 2, name: 'Byte Kitten', jaName: 'ココネコ', desc: 'A tiny pixel kitten.', spriteKey: 'pikoneko' },
  kikai_neko: { id: 'kikai_neko', isAlias: true, branch: 'coding', breed: 'cat', stage: 3, name: 'Cyber Cat', jaName: '電脳猫', desc: 'A cybernetic cat with paw-guards.', spriteKey: 'kikai_neko' },
  glitch_golem: { id: 'glitch_golem', isAlias: true, branch: 'coding', breed: 'cat', stage: 4, name: 'Bit Panther', jaName: 'ビット豹', desc: 'A sleek cyber panther.', spriteKey: 'bit_panther' },
  raijin_drake: { id: 'raijin_drake', isAlias: true, branch: 'coding', breed: 'cat', stage: 5, name: 'Raijin Nekomata', jaName: '雷神猫又', desc: 'Twin-tailed mythical thunder cat.', spriteKey: 'raijin_nekomata' },
  komyo_raijin: { id: 'komyo_raijin', isAlias: true, branch: 'coding', breed: 'cat', stage: 6, isKomyo: true, name: 'Kōmyō Nekomata', jaName: '光明猫又', desc: 'Radiant thunder cat deity.', spriteKey: 'komyo_raijin' },

  chishiki_tamago: { id: 'chishiki_tamago', isAlias: true, branch: 'research', breed: 'owl', stage: 1, name: 'Gnosi Egg', jaName: '知恵卵', desc: 'An egg inscribed with glyphs.', spriteKey: 'egg_research' },
  fukuro_ko: { id: 'fukuro_ko', isAlias: true, branch: 'research', breed: 'owl', stage: 2, name: 'Curious Owlet', jaName: 'フクロウ雛', desc: 'A tiny owlet with giant eyes.', spriteKey: 'curious_owlet' },
  owl_mage: { id: 'owl_mage', isAlias: true, branch: 'research', breed: 'owl', stage: 3, name: 'Scholar Owl', jaName: '学者梟', desc: 'A magical owl scholar.', spriteKey: 'scholar_owl' },
  hoshi_sphinx: { id: 'hoshi_sphinx', isAlias: true, branch: 'research', breed: 'owl', stage: 4, name: 'Sage Strigid', jaName: '賢者梟', desc: 'A celestial sage owl.', spriteKey: 'sage_strigid' },
  hoshi_no_kenja: { id: 'hoshi_no_kenja', isAlias: true, branch: 'research', breed: 'owl', stage: 5, name: 'Chrono Aegolius', jaName: '時空梟', desc: 'A master of temporal science.', spriteKey: 'chrono_aegolius' },
  komyo_kenja: { id: 'komyo_kenja', isAlias: true, branch: 'research', breed: 'owl', stage: 6, isKomyo: true, name: 'Kōmyō Chronos', jaName: '光明時空梟', desc: 'A radiant golden owl sage.', spriteKey: 'komyo_chronos' },

  yume_tamago: { id: 'yume_tamago', isAlias: true, branch: 'creative', breed: 'bird', stage: 1, name: 'Prism Egg', jaName: '虹色卵', desc: 'A dreamlike pastel egg.', spriteKey: 'egg_creative' },
  hanabira_sprite: { id: 'hanabira_sprite', isAlias: true, branch: 'creative', breed: 'bird', stage: 2, name: 'Feather Pip', jaName: 'ピヨピヨ', desc: 'A petal chick that scatters colors.', spriteKey: 'feather_pip' },
  kotoba_kitsune: { id: 'kotoba_kitsune', isAlias: true, branch: 'literature', breed: 'fox', stage: 3, name: 'Scroll Fox', jaName: '文狐', desc: 'A clever fox reading scrolls.', spriteKey: 'scroll_fox' },
  hane_no_ryu: { id: 'hane_no_ryu', isAlias: true, branch: 'gaming', breed: 'dragon', stage: 4, name: 'Combo Wyvern', jaName: '連撃竜', desc: 'A gaming wyvern.', spriteKey: 'combo_wyvern' },
  monogatari_kitsune: { id: 'monogatari_kitsune', isAlias: true, branch: 'literature', breed: 'fox', stage: 5, name: 'Inari Tenko', jaName: '天狐', desc: 'A celestial fox of lore.', spriteKey: 'inari_tenko' },
  komyo_kitsune: { id: 'komyo_kitsune', isAlias: true, branch: 'literature', breed: 'fox', stage: 6, isKomyo: true, name: 'Kōmyō Kyūbi', jaName: '光明九尾', desc: 'A radiant nine-tailed fox.', spriteKey: 'komyo_kyubi' },

  nemu_tamago: { id: 'nemu_tamago', isAlias: true, branch: 'personal', breed: 'shiba', stage: 1, name: 'Zen Egg', jaName: '心の卵', desc: 'A peaceful egg.', spriteKey: 'egg_personal' },
  mochi_blob: { id: 'mochi_blob', isAlias: true, branch: 'personal', breed: 'shiba', stage: 2, name: 'Loyal Pup', jaName: '豆柴', desc: 'A spirited Shiba pup.', spriteKey: 'loyal_pup' },
  gutara_slime: { id: 'gutara_slime', isAlias: true, branch: 'personal', breed: 'shiba', stage: 3, name: 'Zen Shiba', jaName: '座禅柴', desc: 'A meditating zen dog.', spriteKey: 'zen_shiba' },
  namakemono: { id: 'namakemono', isAlias: true, branch: 'personal', breed: 'shiba', stage: 4, name: 'Guardian Inu', jaName: '守護犬', desc: 'A brave canine guardian.', spriteKey: 'guardian_inu' },
  daradara_oni: { id: 'daradara_oni', isAlias: true, branch: 'personal', breed: 'shiba', stage: 5, name: 'Komainu Celestial', jaName: '狛犬', desc: 'A celestial lion-dog.', spriteKey: 'komainu_celestial' },
  komyo_daradara: { id: 'komyo_daradara', isAlias: true, branch: 'personal', breed: 'shiba', stage: 6, isKomyo: true, name: 'Kōmyō Komainu', jaName: '光明狛犬', desc: 'Radiant canine divinity.', spriteKey: 'komyo_komainu' }
};`;

// Replace from "export const CREATURES = {" up to "export const FOOD_ITEMS = {"
const startIdx = code.indexOf('export const CREATURES = {');
const endIdx = code.indexOf('export const FOOD_ITEMS = {');

if (startIdx !== -1 && endIdx !== -1) {
  code = code.slice(0, startIdx) + newCreaturesBlock + '\n\n' + code.slice(endIdx);
  fs.writeFileSync(constantsPath, code, 'utf8');
  console.log('Successfully replaced CREATURES in shared/constants.js!');
} else {
  console.error('Could not find indices:', { startIdx, endIdx });
}
