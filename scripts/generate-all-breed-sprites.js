import fs from 'fs';
import path from 'path';

/**
 * 16x16 Pixel Art Matrices for All 36 Mochimori Breed Creatures
 * Palette characters:
 *   # : Dark outline (#0f380f)
 *   . : Transparent
 *   y : Yellow / Gold (#ffd700)
 *   c : Cyan / Electric Blue (#00f0ff)
 *   g : Green (#306230)
 *   v : Violet (#9966cc)
 *   p : Purple / Magenta (#ba55d3)
 *   r : Red / Rose (#ff6b81)
 *   s : Soft cream / Fur (#ffeaa7)
 *   b : Slate / Dark grey (#2d3436)
 *   w : White (#f1f2f6)
 *   z : Sleep Zzz blue (#70a1ff)
 *   * : Sparkle / Twinkle (#ffeaa7)
 *   k : Dark shadow / Glitch slate (#2f3542)
 *   B : Blush cheek (#ff7675)
 *   S : Sweet glow (#ff9ff3)
 *   G : Grumpy brow (#e17055)
 */

export const NEW_BREED_GRIDS = {
  // ==========================================
  // ⚡ 1. CODING BRANCH (Breed: Cat / Neko)
  // ==========================================
  // coding_teen (Replaces Glitch Golem)
  bit_panther: [
    "...#.......#....",
    "..#b#.....#b#...",
    ".#bbb#####bbb#..",
    "#bbbbbbbbbbbbb#.",
    "#bb#cbbbbb#cbb#.",
    "#bb#cbbbbb#cbb#.",
    "#bbbbbb#bbbbbb#.",
    ".#bbbb###bbbb#..",
    "..#bbbbbbbbb#...",
    ".#bb#c#bb#c#bb#.",
    "#bbb#c#bb#c#bbb#",
    "#bbbbbbbbbbbbbb#",
    "#bb#bbbbbbbb#bb#",
    ".##.#bb###bb#.##",
    "....#bb#.#bb#..#",
    ".....##...##...#"
  ],

  // coding_adult
  raijin_nekomata: [
    "..#...#...#...#.",
    ".#y#.#b#.#b#.#y#",
    "#yy###bbb###yy#.",
    "#yy#bbbbbbb#yy#.",
    ".#bb#cbbb#cbb#..",
    ".#bb#cbbb#cbb#..",
    ".#bbbbb#bbbbb#..",
    "..#bbb###bbb#...",
    ".#bb#yyyyy#bb#..",
    "#bbb#yyyyy#bbb#.",
    "#bbbbbbbbbbbbb#.",
    "#bb#bb#.#bb#bb#.",
    ".##.##...##.##..",
    "..#y#.....#y#...",
    ".#yy#.....#yy#..",
    "..##.......##..."
  ],

  // ==========================================
  // 🎨 2. CREATIVE ARTS BRANCH (Breed: Bird / Tori)
  // ==========================================
  egg_creative: [
    ".....######.....",
    "...##pppppp##...",
    "..#pprrrrrrpp#..",
    ".#pprrrrrrrrpp#.",
    "#pprrrrrsssrrpp#",
    "#pprrrssssssrpp#",
    "#pprrssccccccpp#",
    "#pprrssccccccpp#",
    "#pprrssccccccpp#",
    "#pprrrssssssrpp#",
    "#pprrrrrsssrrpp#",
    ".#pprrrrrrrrpp#.",
    "..#pprrrrrrpp#..",
    "...##pppppp##...",
    ".....######.....",
    "................"
  ],

  feather_pip: [
    ".....######.....",
    "...##ssssss##...",
    "..#ssssssssss#..",
    ".#ss#b#ss#b#ss#.",
    ".#ss#b#ss#b#ss#.",
    ".#sssss##sssss#.",
    "..#sss#yy#sss#..",
    ".#rsss####sssr#.",
    "#rrssssssssssrr#",
    "#rrssssssssssrr#",
    ".#rssssssssssr#.",
    "..#ssssssssss#..",
    "...##########...",
    "....#yy#.#yy#...",
    ".....##...##....",
    "................"
  ],

  prism_finch: [
    "....#...###.....",
    "...#s#.#sss#....",
    "..#sss#sssss#...",
    ".#sssssssssss#..",
    ".#ss#b#ss#b#s#..",
    ".#sssss##sss#y#.",
    "..#sss####ss#y#.",
    ".#rsssssssss###.",
    "#rrrsssssssrrr#.",
    "#yyy#sssss#yyy#.",
    "#ccc#sssss#ccc#.",
    ".###sssssss###..",
    "...#sssssss#....",
    "....#yy#yy#.....",
    ".....##.##......",
    "................"
  ],

  origami_crane: [
    "......#.........",
    ".....#s#........",
    "....#sss#...#...",
    "...#sssss#.#s#..",
    "..#sssssss#sss#.",
    ".#wwwwwwwwwwss#.",
    "#wwwwwwwwwwwws#.",
    ".#wwwwwwwwww##..",
    "..#wwwwwwww#....",
    ".#wwwwwwwwww#...",
    "#wwwwwwwwwwww#..",
    ".#wwwwwwwwww#...",
    "..#wwwwwwww#....",
    "...#wwwwww#.....",
    "....######......",
    "................"
  ],

  suzaku_phoenix: [
    "...#...##...#...",
    "..#r#.#rr#.#r#..",
    ".#rrr##rr##rrr#.",
    "#rrrrrrrrrrrrrr#",
    "#rr#b#rrrr#b#rr#",
    "#rrrrrr##rrrrrr#",
    ".#rrrr#yy#rrrr#.",
    "#y#rrrr##rrrr#y#",
    "#yy#rrrrrrrr#yy#",
    "#yyy#rrrrrr#yyy#",
    "#yy#rrrrrrrr#yy#",
    ".##.###rr###.##.",
    "......#rr#......",
    ".....#rrrr#.....",
    "....#yy##yy#....",
    ".....##..##....."
  ],

  komyo_suzaku: [
    ".*..#..##..#..*.",
    ".*y#y#*yy*#y#y*.",
    "#yyyy##yy##yyyy#",
    "#yy*yyyyyyyy*yy#",
    "#yy#b#yyyy#b#yy#",
    "#yyyyyy##yyyyyy#",
    ".#yyyy#ww#yyyy#.",
    "*#*yyy####yyy*#*",
    "#yy#yyyyyyyy#yy#",
    "#yyy#yyyyyy#yyy#",
    "#yy#yyyyyyyy#yy#",
    ".**.*##yy##*.**.",
    ".....*#yy#*.....",
    "....*#yyyy#*....",
    "...*#yy##yy#*...",
    ".....**..**....."
  ],

  // ==========================================
  // 📜 3. LITERATURE BRANCH (Breed: Fox / Kitsune)
  // ==========================================
  egg_literature: [
    ".....######.....",
    "...##ssssss##...",
    "..#ssssssssss#..",
    ".#ssssssssssss#.",
    "#ssssss##ssssss#",
    "#sssss#rr#sssss#",
    "#ssss#rrrr#ssss#",
    "#sssss#rr#sssss#",
    "#ssssss##ssssss#",
    "#ssss#bbbb#ssss#",
    "#sssss#bb#sssss#",
    ".#ssssssssssss#.",
    "..#ssssssssss#..",
    "...##ssssss##...",
    ".....######.....",
    "................"
  ],

  ink_kit: [
    "...#........#...",
    "..#w#......#w#..",
    ".#www######www#.",
    "#ww#r#wwww#r#ww#",
    "#wwwwwwwwwwwwww#",
    "#ww#b#wwww#b#ww#",
    "#wwwwww##wwwwww#",
    ".#wwww#bb#wwww#.",
    "..#wwww##wwww#..",
    ".#wwwwwwwwwwww#.",
    "#wwwwwwwwwwwwww#",
    "#ww#bb#ww#bb#ww#",
    ".##.##....##.##.",
    ".........#bb#...",
    "........#bbbb#..",
    ".........####..."
  ],

  scroll_fox: [
    "...#........#...",
    "..#s#......#s#..",
    ".#sss######sss#.",
    "#ss#r#ssss#r#ss#",
    "#ssssssssssssss#",
    "#ss#b#ssss#b#ss#",
    "#ssssss##ssssss#",
    ".#ssss#bb#ssss#.",
    "..#ssss##ssss#..",
    ".#ssssssssssss#.",
    "#ssss#wwww#ssss#",
    "#sss#wwwwww#sss#",
    "#ss#wwwwwwww#ss#",
    ".##.###ww###.##.",
    "......#rr#......",
    ".......##......."
  ],

  mystic_kitsune: [
    "..#..........#..",
    ".#s#...##...#s#.",
    "#sss###ss###sss#",
    "#ss#r#ssss#r#ss#",
    "#ssssssssssssss#",
    "#ss#b#ssss#b#ss#",
    "#ssssss##ssssss#",
    ".#ssss#bb#ssss#.",
    "#c#sss####sss#c#",
    "#c#ssssssssss#c#",
    ".#ssssssssssss#.",
    "#ss#bb#ss#bb#ss#",
    ".##.##....##.##.",
    "#c#..........#c#",
    "#cc#...##...#cc#",
    ".##...#cc#...##."
  ],

  inari_tenko: [
    "..#...####...#..",
    ".#w#.#wwww#.#w#.",
    "#www#wwwwww#www#",
    "#ww#r#wwww#r#ww#",
    "#ww#r#wwww#r#ww#",
    "#ww#b#wwww#b#ww#",
    "#wwwwww##wwwwww#",
    ".#wwww#rr#wwww#.",
    "..#wwww##wwww#..",
    ".#wwwwwwwwwwww#.",
    "#wwwwwwwwwwwwww#",
    "#ww#rr#ww#rr#ww#",
    ".##.##....##.##.",
    "#w#..........#w#",
    "#ww#...##...#ww#",
    ".##...#yy#...##."
  ],

  komyo_kyubi: [
    ".*..#..##..#..*.",
    ".*y#y#*yy*#y#y*.",
    "#yy#r#yyyy#r#yy#",
    "#yy#r#yyyy#r#yy#",
    "#yy#b#yyyy#b#yy#",
    "#yyyyyy##yyyyyy#",
    ".#yyyy#rr#yyyy#.",
    "*#*yyy####yyy*#*",
    "#yy#yyyyyyyy#yy#",
    "#yyy#yyyyyy#yyy#",
    ".#yyyyyyyyyyyy#.",
    "#y#*#yy##yy#*#y#",
    "#yy*...**...*yy#",
    ".#yy*.*yy*.*yy#.",
    "..#yy#yyyy#yy#..",
    "...##.####.##..."
  ],

  // ==========================================
  // 🦉 4. RESEARCH BRANCH (Breed: Owl / Fukurō)
  // ==========================================
  egg_research: [
    ".....######.....",
    "...##bbbbbb##...",
    "..#bbccccccbb#..",
    ".#bbccccccccbb#.",
    "#bbccc*cccc*cbb#",
    "#bbcccc#yy#ccbb#",
    "#bbccc#yyyy#cbb#",
    "#bbccc#yyyy#cbb#",
    "#bbcccc#yy#ccbb#",
    "#bbccc*cccc*cbb#",
    "#bbccccccccccbb#",
    ".#bbccccccccbb#.",
    "..#bbccccccbb#..",
    "...##bbbbbb##...",
    ".....######.....",
    "................"
  ],

  curious_owlet: [
    "....########....",
    "...#bbbbbbbb#...",
    "..#b#bbbbbb#b#..",
    ".#bbbbbbbbbbbb#.",
    ".#b#w#bbbb#w#b#.",
    ".#b#b#bbbb#b#b#.",
    ".#bbbb####bbbb#.",
    "..#bbbb##bbbb#..",
    "..#bbb#yy#bbb#..",
    ".#bbbb####bbbb#.",
    "#bbbbbbbbbbbbbb#",
    "#bb#bbbbbbbb#bb#",
    ".#bbbbbbbbbbbb#.",
    "..#yy#....#yy#..",
    "...##......##...",
    "................"
  ],

  scholar_owl: [
    "....########....",
    "...#bbbbbbbb#...",
    "..#b#bbbbbb#b#..",
    ".#bb#yy#bb#w#b#.",
    ".#bb#yy#bb#b#b#.",
    ".#bb####bb####..",
    "..#bbb#yy#bbb#..",
    ".#bbbb####bbbb#.",
    "#bbbbbbbbbbbbbb#",
    "#bb#wwwwwwww#bb#",
    "#bb#w#bbbb#w#bb#",
    ".#b#w#bbbb#w#b#.",
    "..#wwwwwwwwww#..",
    "...#yy#..#yy#...",
    "....##....##....",
    "................"
  ],

  sage_strigid: [
    "..#..........#..",
    ".#b#...##...#b#.",
    "#bbb###bb###bbb#",
    "#bbbbbbbbbbbbbb#",
    "#bb#w#bbbb#w#bb#",
    "#bb#b#bbbb#b#bb#",
    ".#bbbb#yy#bbbb#.",
    "..#bbb####bbb#..",
    ".#bbbbbbbbbbbb#.",
    "#bb#cccccccc#bb#",
    "#bb#c#yyyy#c#bb#",
    ".#b#cccccccc#b#.",
    "..#bbbbbbbbbb#..",
    "...#yy#..#yy#...",
    "....##....##....",
    "................"
  ],

  chrono_aegolius: [
    "..#...####...#..",
    ".#b#.#bbbb#.#b#.",
    "#bbb#bbbbbb#bbb#",
    "#bb#c#bbbb#c#bb#",
    "#bb#w#bbbb#w#bb#",
    "#bb#b#bbbb#b#bb#",
    ".#bbbb#yy#bbbb#.",
    "#c#bbb####bbb#c#",
    "#c#bbbbbbbbbb#c#",
    "#c#b#yyyyyy#b#c#",
    ".#bb#y#cc#y#bb#.",
    "..#b#yyyyyy#b#..",
    "...#bbbbbbbb#...",
    "....#yy##yy#....",
    ".....##..##.....",
    "................"
  ],

  komyo_chronos: [
    ".*..#..##..#..*.",
    ".*y#y#*yy*#y#y*.",
    "#yy#*#yyyy#*#yy#",
    "#yy#c#yyyy#c#yy#",
    "#yy#w#yyyy#w#yy#",
    "#yy#b#yyyy#b#yy#",
    ".#yyyy#ww#yyyy#.",
    "*#*yyy####yyy*#*",
    "#yy#*yyyyyy*#yy#",
    "#yy#y#wwww#y#yy#",
    ".#y#y#w**w#y#y#.",
    "..#y#ywwwwy#y#..",
    "...#yyyyyyyy#...",
    "....*#yy##yy#*..",
    ".....**..**.....",
    "................"
  ],

  // ==========================================
  // 🐉 5. GAMING BRANCH (Breed: Dragon / Ryū)
  // ==========================================
  egg_gaming: [
    ".....######.....",
    "...##kkkkkk##...",
    "..#kkrrrrrrkk#..",
    ".#kkrrrrrrrrkk#.",
    "#kkrrr#gg#rrrkk#",
    "#kkrr#gggg#rrkk#",
    "#kkrr#gggg#rrkk#",
    "#kkrrr#gg#rrrkk#",
    "#kkrrr#cc#rrrkk#",
    "#kkrr#cccc#rrkk#",
    "#kkrrr#cc#rrrkk#",
    ".#kkrrrrrrrrkk#.",
    "..#kkrrrrrrkk#..",
    "...##kkkkkk##...",
    ".....######.....",
    "................"
  ],

  arcade_wyrmling: [
    "....#......#....",
    "...#y#....#y#...",
    "..#rrr####rrr#..",
    ".#rrrrrrrrrrrr#.",
    ".#rr#b#rr#b#rr#.",
    ".#rrrrrrrrrrrr#.",
    "..#rrr####rrr#..",
    ".#rrrr#ss#rrrr#.",
    "#r#rrr#ss#rrr#r#",
    "#rr#rr#ss#rr#rr#",
    ".#rrrrssssrrrr#.",
    "..#rrrrrrrrrr#..",
    "...#rrrrrrrr#...",
    "....#rr#..#rr#..",
    ".....##....##.#y",
    "...............#"
  ],

  pixel_drake: [
    "...#........#...",
    "..#y#......#y#..",
    ".#rrr######rrr#.",
    "#rrrrrrrrrrrrrr#",
    "#rr#c#rrrr#c#rr#",
    "#rrrrrrrrrrrrrr#",
    ".#rrrr####rrrr#.",
    "#y#rrr#ss#rrr#y#",
    "#yy#rr#ss#rr#yy#",
    "#yy#rr#ss#rr#yy#",
    ".#rrrrssssrrrr#.",
    "..#rrrrrrrrrr#..",
    "...#rr#..#rr#...",
    "....##....##.#y#",
    ".............#yy",
    "..............##"
  ],

  combo_wyvern: [
    "..#...####...#..",
    ".#y#.#rrrr#.#y#.",
    "#yy#rrrrrrrr#yy#",
    "#yy#r#c##c#r#yy#",
    ".#rrrrrrrrrrrr#.",
    "..#rrr####rrr#..",
    "#c#rrr#ss#rrr#c#",
    "#cc#rr#ss#rr#cc#",
    "#cc#rssssssr#cc#",
    ".#c#rssssssr#c#.",
    "..#rrrrrrrrrr#..",
    "...#rr#..#rr#...",
    "....##....##.#y#",
    "............#yy#",
    "...........#yyy#",
    "............###."
  ],

  shinryu_master: [
    "..#...#....#...#",
    ".#y#.#g#.#g#.#y#",
    "#yy###gg#gg###yy",
    "#yy#gggggggg#yy#",
    ".#gg#c#gggg#c#gg",
    ".#gggggggggggg#.",
    "..#ggg#wwww#gg#.",
    "#c#ggg#wwww#gg#.",
    "#cc#gggggggggg#.",
    ".#cc#ggg##ggg#..",
    "..#gggg#..#gggg#",
    ".#gggg#..#gggg#.",
    "#gggg#....#ggg#.",
    "#ggg#......#gg#.",
    ".#g#........#g#.",
    "..#..........#.."
  ],

  komyo_shinryu: [
    ".*..#..##..#..*.",
    ".*y#y#*yy*#y#y*.",
    "#yy###yyyy###yy#",
    "#yy#*yyyyyy*#yy#",
    "#yy#c#yyyy#c#yy#",
    "#yyyyyyyyyyyyyy#",
    ".#yyyy#wwww#yy#.",
    "*#*yyy#wwww#yy#*",
    "#yy#*yyyyyy*#yy#",
    ".#yy#yyyyyyyy#..",
    "..#yyyy#..#yyyy#",
    ".#yyyy#..#yyyy#.",
    "#yyyy#....#yyy#.",
    "#yyy#......#yy#.",
    ".#y#........#y#.",
    "..*..........*.."
  ],

  // ==========================================
  // 🐕 6. PERSONAL DEVELOPMENT BRANCH (Breed: Shiba Inu / Inu)
  // ==========================================
  egg_personal: [
    ".....######.....",
    "...##ssssss##...",
    "..#ssssssssss#..",
    ".#ssssssssssss#.",
    "#ssssss##ssssss#",
    "#sssss#rr#sssss#",
    "#ssss#rrrr#ssss#",
    "#ssss#ryyr#ssss#",
    "#ssss#rrrr#ssss#",
    "#sssss#rr#sssss#",
    "#ssssss##ssssss#",
    ".#ssssssssssss#.",
    "..#ssssssssss#..",
    "...##ssssss##...",
    ".....######.....",
    "................"
  ],

  loyal_pup: [
    "..#..........#..",
    ".#s#...##...#s#.",
    "#sss###ss###sss#",
    "#ss#b#ssss#b#ss#",
    "#ssssssssssssss#",
    "#ssss#bbbb#ssss#",
    ".#sss#bbbb#sss#.",
    ".#rrrrrrrrrrrr#.",
    "#rr#ssssssss#rr#",
    "#r#ssssssssss#r#",
    ".#ssssssssssss#.",
    "..#ssss##ssss#..",
    "..#ss#....#ss#..",
    "...##......##.#s",
    "..............#s",
    "...............#"
  ],

  zen_shiba: [
    "..#..........#..",
    ".#s#...##...#s#.",
    "#sss###ss###sss#",
    "#ss#b#ssss#b#ss#",
    "#ssssssssssssss#",
    "#ssss#bbbb#ssss#",
    ".#sss#bbbb#sss#.",
    "..#sss####sss#..",
    ".#ssssssssssss#.",
    "#ss#vvvvvvvv#ss#",
    "#ss#vv#yy#vv#ss#",
    "#ss#vvvvvvvv#ss#",
    ".#ssssssssssss#.",
    "..#ssssssssss#..",
    "...##########...",
    "................"
  ],

  guardian_inu: [
    "..#..........#..",
    ".#s#...##...#s#.",
    "#sss###ss###sss#",
    "#ss#b#ssss#b#ss#",
    "#ssssssssssssss#",
    "#ssss#bbbb#ssss#",
    ".#sss#bbbb#sss#.",
    "..#sss####sss#..",
    ".#rr#ssssss#rr#.",
    "#rrrr#ssss#rrrr#",
    "#rrrr#yyyy#rrrr#",
    "#rrrr#yyyy#rrrr#",
    ".#ss#ssssss#ss#.",
    "..#ss#....#ss#..",
    "...##......##.#s",
    "..............##"
  ],

  komainu_celestial: [
    "..##...##...##..",
    ".#ss#.#ss#.#ss#.",
    "#ssss#ssss#ssss#",
    "#sss#b#ss#b#sss#",
    "#ssssssssssssss#",
    "#sss#bbbbbb#sss#",
    ".#ss#b#ww#b#ss#.",
    "..#ss#bbbb#ss#..",
    ".#rr#wwwwww#rr#.",
    "#rrrr#wwww#rrrr#",
    "#rrrr#yyyy#rrrr#",
    "#rrrr#yyyy#rrrr#",
    ".#sss#ssss#sss#.",
    "..#ss#....#ss#..",
    "..#ss#....#ss#..",
    "...##......##..."
  ],

  komyo_komainu: [
    ".*..#..##..#..*.",
    ".*y#y#*yy*#y#y*.",
    "#yyy#*yyyy*#yyy#",
    "#yyy#b#yy#b#yyy#",
    "#yyyyyyyyyyyyyy#",
    "#yyy#bbbbbb#yyy#",
    ".#yy#b#ww#b#yy#.",
    "*#*yy#bbbb#yy*#*",
    "#yy#y#wwww#y#yy#",
    "#yyy#*yyyy*#yyy#",
    ".#yyyyyyyyyyyy#.",
    "..#yy#*..*#yy#..",
    "..#yy#....#yy#..",
    ".*#yy#....#yy#*.",
    "...##......##...",
    "....*......*...."
  ]
};

// Validate that every grid is strictly 16x16 and uses valid palette characters
const VALID_CHARS = new Set('.#ycgvprsbwz*kBSG');
let errors = 0;

for (const [key, grid] of Object.entries(NEW_BREED_GRIDS)) {
  if (grid.length !== 16) {
    console.error(`ERROR: Grid ${key} has ${grid.length} rows instead of 16`);
    errors++;
  }
  grid.forEach((row, rIdx) => {
    if (row.length !== 16) {
      console.error(`ERROR: Grid ${key} row ${rIdx} has ${row.length} chars instead of 16: "${row}"`);
      errors++;
    }
    for (let cIdx = 0; cIdx < row.length; cIdx++) {
      const char = row[cIdx];
      if (!VALID_CHARS.has(char)) {
        console.error(`ERROR: Grid ${key} row ${rIdx} col ${cIdx} has invalid char '${char}'`);
        errors++;
      }
    }
  });
}

if (errors > 0) {
  console.error(`Validation failed with ${errors} errors!`);
  process.exit(1);
} else {
  console.log(`Validation passed! All ${Object.keys(NEW_BREED_GRIDS).length} grids are strictly 16x16 with valid palette characters.`);
}

// 2. Read content/sprites.js and inject the new grids and updated map
const spritesPath = path.resolve('content/sprites.js');
let spritesCode = fs.readFileSync(spritesPath, 'utf8');

// Replace glitch_golem grid directly with bit_panther to permanently retire Glitch Golem
const oldGolemRegex = /glitch_golem:\s*\[[\s\S]*?\],\n/m;
if (oldGolemRegex.test(spritesCode)) {
  const bitPantherStr = `  bit_panther: [\n` + NEW_BREED_GRIDS.bit_panther.map(r => `    "${r}"`).join(',\n') + `\n  ],\n  glitch_golem: [\n` + NEW_BREED_GRIDS.bit_panther.map(r => `    "${r}"`).join(',\n') + `\n  ],\n`;
  spritesCode = spritesCode.replace(oldGolemRegex, bitPantherStr);
  console.log('Replaced glitch_golem with bit_panther in GRIDS');
}

// Inject all new grids into GRIDS before the closing bracket of GRIDS
let injectedGridsStr = '\n  // ==========================================\n  // 🐾 36 CANONICAL BREED CREATURE MATRICES\n  // ==========================================\n';

for (const [key, grid] of Object.entries(NEW_BREED_GRIDS)) {
  // Avoid duplicating bit_panther if already injected
  if (key === 'bit_panther') continue;
  injectedGridsStr += `  ${key}: [\n` + grid.map(r => `    "${r}"`).join(',\n') + `\n  ],\n`;
  // Also provide an explicit _idle1 alias if useful
  injectedGridsStr += `  ${key}_idle1: [\n` + grid.map(r => `    "${r}"`).join(',\n') + `\n  ],\n`;
}

// Find the end of GRIDS
const gridsEndIndex = spritesCode.indexOf('const SPRITE_PALETTES = {');
if (gridsEndIndex !== -1) {
  // Find the closing bracket of GRIDS before SPRITE_PALETTES
  const lastBraceBeforePalettes = spritesCode.lastIndexOf('};', gridsEndIndex);
  if (lastBraceBeforePalettes !== -1) {
    spritesCode = spritesCode.slice(0, lastBraceBeforePalettes) + injectedGridsStr + spritesCode.slice(lastBraceBeforePalettes);
    console.log('Successfully injected all breed grids into GRIDS');
  }
}

// Update CREATURE_SPRITE_KEY_MAP
const oldKeyMapRegex = /const CREATURE_SPRITE_KEY_MAP = \{[\s\S]*?\};/m;
const newKeyMapStr = `const CREATURE_SPRITE_KEY_MAP = {
  // ⚡ Coding (Cat Lineage)
  coding_tamago: 'egg_denki',
  coding_baby: 'pikoneko',
  coding_child: 'kikai_neko',
  coding_teen: 'bit_panther',
  coding_adult: 'raijin_nekomata',
  coding_radiant: 'komyo_raijin',

  // 🎨 Creative (Bird Lineage)
  creative_tamago: 'egg_creative',
  creative_baby: 'feather_pip',
  creative_child: 'prism_finch',
  creative_teen: 'origami_crane',
  creative_adult: 'suzaku_phoenix',
  creative_radiant: 'komyo_suzaku',

  // 📜 Literature (Fox Lineage)
  literature_tamago: 'egg_literature',
  literature_baby: 'ink_kit',
  literature_child: 'scroll_fox',
  literature_teen: 'mystic_kitsune',
  literature_adult: 'inari_tenko',
  literature_radiant: 'komyo_kyubi',

  // 🦉 Research (Owl Lineage)
  research_tamago: 'egg_research',
  research_baby: 'curious_owlet',
  research_child: 'scholar_owl',
  research_teen: 'sage_strigid',
  research_adult: 'chrono_aegolius',
  research_radiant: 'komyo_chronos',

  // 🐉 Gaming (Dragon Lineage)
  gaming_tamago: 'egg_gaming',
  gaming_baby: 'arcade_wyrmling',
  gaming_child: 'pixel_drake',
  gaming_teen: 'combo_wyvern',
  gaming_adult: 'shinryu_master',
  gaming_radiant: 'komyo_shinryu',

  // 🐕 Personal Development (Shiba Inu Lineage)
  personal_tamago: 'egg_personal',
  personal_baby: 'loyal_pup',
  personal_child: 'zen_shiba',
  personal_teen: 'guardian_inu',
  personal_adult: 'komainu_celestial',
  personal_radiant: 'komyo_komainu',

  // Legacy mappings
  glitch_golem: 'bit_panther',
  raijin_drake: 'raijin_nekomata',
  fukuro_ko: 'curious_owlet',
  owl_mage: 'scholar_owl',
  hoshi_sphinx: 'sage_strigid',
  hoshi_no_kenja: 'chrono_aegolius',
  komyo_kenja: 'komyo_chronos',
  kotoba_kitsune: 'scroll_fox',
  monogatari_kitsune: 'inari_tenko',
  komyo_kitsune: 'komyo_kyubi',
  hane_no_ryu: 'combo_wyvern',
  mochi_blob: 'loyal_pup'
};`;

if (oldKeyMapRegex.test(spritesCode)) {
  spritesCode = spritesCode.replace(oldKeyMapRegex, newKeyMapStr);
  console.log('Successfully updated CREATURE_SPRITE_KEY_MAP');
}

fs.writeFileSync(spritesPath, spritesCode, 'utf8');
console.log('Saved updated content/sprites.js');
