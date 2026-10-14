import fs from 'fs';
import path from 'path';

const spritesPath = path.resolve('content/sprites.js');
let content = fs.readFileSync(spritesPath, 'utf8');

// 1. Expand SPRITE_PALETTES with the 6 creature theme palettes
const oldPalettes = `const SPRITE_PALETTES = {
  default: {
    '#': '#0f380f', // outline
    '.': 'transparent',
    'y': '#ffd700', // yellow/gold
    'c': '#00f0ff', // cyan
    'g': '#306230', // green
    'v': '#9966cc', // violet
    'p': '#ba55d3', // purple
    'r': '#ff6b81', // pink/rose/red
    's': '#ffeaa7', // soft cream
    'b': '#2d3436', // dark/slate
    'w': '#f1f2f6', // white
    'z': '#70a1ff', // sleep zzz blue
    '*': '#ffeaa7', // sparkle
    'k': '#2f3542', // slate glitch
    'B': '#ff7675', // happy cheek blush
    'S': '#ff9ff3', // sweet blush glow
    'G': '#e17055'  // grumpy brow / irritation puff
  }
};`;

const newPalettes = `const SPRITE_PALETTES = {
  default: {
    '#': '#0f380f', // outline
    '.': 'transparent',
    'y': '#ffd700', // yellow/gold
    'c': '#00f0ff', // cyan
    'g': '#306230', // green
    'v': '#9966cc', // violet
    'p': '#ba55d3', // purple
    'r': '#ff6b81', // pink/rose/red
    's': '#ffeaa7', // soft cream
    'b': '#2d3436', // dark/slate
    'w': '#f1f2f6', // white
    'z': '#70a1ff', // sleep zzz blue
    '*': '#ffeaa7', // sparkle
    'k': '#2f3542', // slate glitch
    'B': '#ff7675', // happy cheek blush
    'S': '#ff9ff3', // sweet blush glow
    'G': '#e17055'  // grumpy brow / irritation puff
  },
  classic_default: {
    '#': '#0f380f',
    '.': 'transparent',
    'y': '#ffd700',
    'c': '#00f0ff',
    'g': '#306230',
    'v': '#9966cc',
    'p': '#ba55d3',
    'r': '#ff6b81',
    's': '#ffeaa7',
    'b': '#2d3436',
    'w': '#f1f2f6',
    'z': '#70a1ff',
    '*': '#ffeaa7',
    'k': '#2f3542',
    'B': '#ff7675',
    'S': '#ff9ff3',
    'G': '#e17055'
  },
  neon_cyber: {
    '#': '#050510',
    '.': 'transparent',
    'y': '#00ffcc', // neon teal
    'c': '#00f0ff', // electric cyan
    'g': '#39ff14', // neon green
    'v': '#bf00ff', // electric violet
    'p': '#ff007f', // hot neon pink
    'r': '#ff3366', // laser red
    's': '#e0ffff', // light cyan aura
    'b': '#111827',
    'w': '#ffffff',
    'z': '#38bdf8',
    '*': '#f0abfc',
    'k': '#0f172a',
    'B': '#ff007f',
    'S': '#f472b6',
    'G': '#ef4444'
  },
  sakura_pastel: {
    '#': '#4a2835',
    '.': 'transparent',
    'y': '#fff0f5', // lavender blush
    'c': '#e0f2fe', // soft cloud blue
    'g': '#bbf7d0', // mint pastel
    'v': '#f3e8ff', // pale lilac
    'p': '#fbcfe8', // pastel orchid
    'r': '#fda4af', // cherry blossom rose
    's': '#fff1f2', // sakura cream
    'b': '#581c87', // rich plum
    'w': '#ffffff',
    'z': '#bae6fd',
    '*': '#fef08a',
    'k': '#64748b',
    'B': '#f43f5e',
    'S': '#fb7185',
    'G': '#e11d48'
  },
  solar_gold: {
    '#': '#451a03',
    '.': 'transparent',
    'y': '#fbbf24', // radiant gold
    'c': '#fef08a', // sunbeam yellow
    'g': '#d97706', // amber green
    'v': '#f59e0b', // warm amber
    'p': '#b45309', // burnt gold
    'r': '#ea580c', // solar flare red
    's': '#fef3c7', // glowing cream
    'b': '#78350f', // deep bronze
    'w': '#ffffff',
    'z': '#fde68a',
    '*': '#ffffff',
    'k': '#92400e',
    'B': '#f97316',
    'S': '#fb923c',
    'G': '#c2410c'
  },
  abyssal_shadow: {
    '#': '#020617',
    '.': 'transparent',
    'y': '#64748b', // ghostly slate
    'c': '#38bdf8', // ethereal soul blue
    'g': '#10b981', // phantom teal
    'v': '#818cf8', // twilight indigo
    'p': '#a855f7', // abyssal violet
    'r': '#f43f5e', // crimson eye
    's': '#1e293b', // shadow dark
    'b': '#0f172a', // void black
    'w': '#e2e8f0', // spectral white
    'z': '#0284c7',
    '*': '#67e8f9',
    'k': '#090d16',
    'B': '#9333ea',
    'S': '#c084fc',
    'G': '#dc2626'
  },
  celestial_shiny: {
    '#': '#1e1b4b',
    '.': 'transparent',
    'y': '#fef08a', // starlight shimmer
    'c': '#67e8f9', // diamond cyan
    'g': '#86efac', // aurora green
    'v': '#c084fc', // celestial violet
    'p': '#f472b6', // supernova pink
    'r': '#fb7185', // rose nebula
    's': '#f8fafc', // pure diamond white
    'b': '#312e81', // cosmic night
    'w': '#ffffff', // blinding white
    'z': '#93c5fd',
    '*': '#fef9c3', // bright twinkle
    'k': '#4338ca',
    'B': '#ec4899',
    'S': '#f43f5e',
    'G': '#e11d48'
  }
};

/**
 * Mapping of 36 breed creature IDs to their pixel art sprite grid keys
 */
const CREATURE_SPRITE_KEY_MAP = {
  // ⚡ Coding (Cat Lineage)
  coding_tamago: 'egg_denki',
  coding_baby: 'pikoneko',
  coding_child: 'kikai_neko',
  coding_teen: 'bit_panther',
  coding_adult: 'raijin_drake',
  coding_radiant: 'komyo_raijin',

  // 🎨 Creative (Bird Lineage)
  creative_tamago: 'egg_monogatari',
  creative_baby: 'feather_pip',
  creative_child: 'hanabira_sprite',
  creative_teen: 'prism_falcon',
  creative_adult: 'phoenix_maestro',
  creative_radiant: 'komyo_suzaku',

  // 📜 Literature (Fox Lineage)
  literature_tamago: 'egg_monogatari',
  literature_baby: 'kitsune_pup',
  literature_child: 'kotoba_kitsune',
  literature_teen: 'shinshi_kitsune',
  literature_adult: 'monogatari_kitsune',
  literature_radiant: 'komyo_kitsune',

  // 🦉 Research (Owl Lineage)
  research_tamago: 'egg_chishiki',
  research_baby: 'fukuro_ko',
  research_child: 'owl_mage',
  research_teen: 'hoshi_sphinx',
  research_adult: 'hoshi_no_kenja',
  research_radiant: 'komyo_kenja',

  // 🐉 Gaming (Dragon Lineage)
  gaming_tamago: 'egg_denki',
  gaming_baby: 'drake_whelp',
  gaming_child: 'wyrmling',
  gaming_teen: 'hane_no_ryu',
  gaming_adult: 'boss_ryu',
  gaming_radiant: 'komyo_shinryu',

  // 🐕 Personal Development (Shiba Inu Lineage)
  personal_tamago: 'egg_gutara',
  personal_baby: 'mochi_blob',
  personal_child: 'gutara_slime',
  personal_teen: 'namakemono',
  personal_adult: 'daradara_oni',
  personal_radiant: 'komyo_daradara'
};

/**
 * Generates an idle3 receptive frame with sparkling particles for higher evolutions
 */
export function createIdle3Grid(baseGrid) {
  const newGrid = baseGrid.map(row => row.split(''));
  const h = newGrid.length;
  const w = newGrid[0].length;

  // Sparkles in corners or above shoulders
  if (newGrid[1] && newGrid[1][1] === '.') newGrid[1][1] = '*';
  if (newGrid[2] && newGrid[2][w - 2] === '.') newGrid[2][w - 2] = '*';
  if (newGrid[h - 3] && newGrid[h - 3][1] === '.') newGrid[h - 3][1] = '*';
  if (newGrid[h - 2] && newGrid[h - 2][w - 2] === '.') newGrid[h - 2][w - 2] = '*';

  return newGrid.map(r => r.join(''));
}`;

content = content.replace(oldPalettes, newPalettes);

// 2. Update getCreatureSprite to accept theme and support mapped keys and idle3
const oldGetCreatureSprite = `export function getCreatureSprite(creatureId, action = 'idle1', accessory = 'none') {
  if (action === 'petted') {
    const baseKey = \`\${creatureId}_idle1\`;
    const baseGrid = GRIDS[baseKey] || GRIDS[creatureId] || GRIDS.mochi_blob_idle1;
    const pettedGrid = createPettedGrid(baseGrid);
    return createPixelSvg(pettedGrid[0].length, pettedGrid.length, pettedGrid, SPRITE_PALETTES.default);
  }

  if (action === 'grumpy') {
    const baseKey = \`\${creatureId}_idle1\`;
    const baseGrid = GRIDS[baseKey] || GRIDS[creatureId] || GRIDS.mochi_blob_idle1;
    const grumpyGrid = createGrumpyGrid(baseGrid);
    return createPixelSvg(grumpyGrid[0].length, grumpyGrid.length, grumpyGrid, SPRITE_PALETTES.default);
  }

  // Map creature + action to grid
  let key = \`\${creatureId}_\${action}\`;
  if (!GRIDS[key]) {
    key = \`\${creatureId}_idle1\`;
    if (!GRIDS[key]) {
      key = creatureId;
    }
  }

  const grid = GRIDS[key] || GRIDS.mochi_blob_idle1;
  const height = grid.length;
  const width = grid[0].length;

  return createPixelSvg(width, height, grid, SPRITE_PALETTES.default);
}`;

const newGetCreatureSprite = `export function getCreatureSprite(creatureId, action = 'idle1', accessory = 'none', theme = 'classic_default') {
  const palette = SPRITE_PALETTES[theme] || SPRITE_PALETTES.default;
  const mappedId = (typeof CREATURE_SPRITE_KEY_MAP !== 'undefined' && CREATURE_SPRITE_KEY_MAP[creatureId]) ? CREATURE_SPRITE_KEY_MAP[creatureId] : creatureId;

  if (action === 'petted') {
    const baseKey = \`\${mappedId}_idle1\`;
    const baseGrid = GRIDS[baseKey] || GRIDS[mappedId] || GRIDS[\`\${creatureId}_idle1\`] || GRIDS[creatureId] || GRIDS.mochi_blob_idle1;
    const pettedGrid = createPettedGrid(baseGrid);
    return createPixelSvg(pettedGrid[0].length, pettedGrid.length, pettedGrid, palette);
  }

  if (action === 'grumpy') {
    const baseKey = \`\${mappedId}_idle1\`;
    const baseGrid = GRIDS[baseKey] || GRIDS[mappedId] || GRIDS[\`\${creatureId}_idle1\`] || GRIDS[creatureId] || GRIDS.mochi_blob_idle1;
    const grumpyGrid = createGrumpyGrid(baseGrid);
    return createPixelSvg(grumpyGrid[0].length, grumpyGrid.length, grumpyGrid, palette);
  }

  if (action === 'idle3') {
    const baseKey = \`\${mappedId}_idle1\`;
    const baseGrid = GRIDS[\`\${mappedId}_idle3\`] || GRIDS[baseKey] || GRIDS[mappedId] || GRIDS.mochi_blob_idle1;
    const idle3Grid = createIdle3Grid(baseGrid);
    return createPixelSvg(idle3Grid[0].length, idle3Grid.length, idle3Grid, palette);
  }

  // Map creature + action to grid
  let key = \`\${mappedId}_\${action}\`;
  if (!GRIDS[key]) {
    key = \`\${creatureId}_\${action}\`;
    if (!GRIDS[key]) {
      key = \`\${mappedId}_idle1\`;
      if (!GRIDS[key]) {
        key = \`\${creatureId}_idle1\`;
        if (!GRIDS[key]) {
          key = mappedId;
          if (!GRIDS[key]) key = creatureId;
        }
      }
    }
  }

  const grid = GRIDS[key] || GRIDS.mochi_blob_idle1;
  const height = grid.length;
  const width = grid[0].length;

  return createPixelSvg(width, height, grid, palette);
}`;

content = content.replace(oldGetCreatureSprite, newGetCreatureSprite);

fs.writeFileSync(spritesPath, content, 'utf8');
console.log('Successfully updated content/sprites.js with 6 themes and 36 breed mappings');
