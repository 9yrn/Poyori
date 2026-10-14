import fs from 'fs';
import path from 'path';

const enginePath = path.resolve('shared/game-engine.js');
let code = fs.readFileSync(enginePath, 'utf8');

// 1. Update imports to include CREATURE_THEMES and BRANCHES
code = code.replace(
  "import { STAGES, CREATURES, FOOD_ITEMS, ACCESSORIES, DOMAIN_PRESETS, NSFW_DOMAINS, NSFW_KEYWORDS, BLOCKED_SILLY_QUOTES } from './constants.js';",
  "import { STAGES, CREATURES, FOOD_ITEMS, ACCESSORIES, DOMAIN_PRESETS, NSFW_DOMAINS, NSFW_KEYWORDS, BLOCKED_SILLY_QUOTES, CREATURE_THEMES, BRANCHES } from './constants.js';"
);

// 2. Update checkEvolution to support milestone levels and consistent breed branches
const oldCheckEvolution = `    // Conditions to advance to next stage:
    // Need enough XP (or forced hatching for Stage 1 -> 2)
    const canEvolve = forceHatch || (pet.xp >= nextStageMeta.minXp);

    if (!canEvolve) return { evolved: false };

    // Determine branch based on dominant study time
    const branch = this.determineDominantBranch(state);
    pet.chosenBranch = branch;
    pet.stage = nextStageMeta ? nextStageMeta.level : pet.stage;

    // Find creature matching branch and new stage
    const newCreature = Object.values(CREATURES).find(
      c => c.branch === branch && c.stage === pet.stage && !c.isKomyo
    );`;

const newCheckEvolution = `    // Conditions to advance to next stage:
    // Need enough XP, milestone level reached, or forced hatching
    const canEvolve = forceHatch || this.isEligibleForEvolution(pet) || (pet.xp >= nextStageMeta.minXp);

    if (!canEvolve) return { evolved: false };

    // Determine branch based on dominant study time or consistent breed lineage
    const currentCreature = CREATURES[pet.creatureId];
    let branch = (currentCreature && currentCreature.branch) || pet.chosenBranch || (pet.activeDisciplines && pet.activeDisciplines[0]) || this.determineDominantBranch(state);
    const branchMap = { denki: 'coding', chishiki: 'research', monogatari: 'literature' };
    branch = branchMap[branch] || branch;
    pet.chosenBranch = branch;
    pet.stage = nextStageMeta ? nextStageMeta.level : pet.stage;

    // Find creature matching branch and new stage
    const newCreature = Object.values(CREATURES).find(
      c => (c.branch === branch || branchMap[c.branch] === branch) && c.stage === pet.stage && !c.isKomyo
    ) || Object.values(CREATURES).find(c => c.stage === pet.stage && !c.isKomyo);`;

if (!code.includes(oldCheckEvolution)) {
  console.error('Could not find oldCheckEvolution block');
  process.exit(1);
}
code = code.replace(oldCheckEvolution, newCheckEvolution);

// 3. New methods to add to PoyoriEngine
const newMethods = `
  /**
   * Exponential XP calculation for next level
   * Formula: floor(80 * Level^1.5)
   */
  static getXpForNextLevel(level) {
    const lvl = Math.max(1, parseInt(level, 10) || 1);
    return Math.floor(80 * Math.pow(lvl, 1.5));
  }

  /**
   * Cumulative XP required to reach a specific target level from Level 1
   */
  static getCumulativeXpForLevel(targetLevel) {
    const target = Math.max(1, parseInt(targetLevel, 10) || 1);
    let total = 0;
    for (let l = 1; l < target; l++) {
      total += this.getXpForNextLevel(l);
    }
    return total;
  }

  /**
   * Calculates current level from total accumulated XP
   */
  static calculateLevel(xp) {
    const totalXp = Math.max(0, parseInt(xp, 10) || 0);
    let lvl = 1;
    let cumulative = 0;
    while (true) {
      const nextReq = this.getXpForNextLevel(lvl);
      if (cumulative + nextReq <= totalXp) {
        cumulative += nextReq;
        lvl++;
      } else {
        break;
      }
    }
    return lvl;
  }

  /**
   * Evaluates if pet has reached milestone level to evolve to the next stage
   */
  static isEligibleForEvolution(pet) {
    if (!pet || pet.stage >= 6) return false;
    const nextStageMeta = STAGES.find(s => s.level === pet.stage + 1);
    if (!nextStageMeta) return false;
    const milestone = nextStageMeta.milestoneLevel || 1;
    return (pet.level || 1) >= milestone;
  }

  /**
   * Multi-discipline selection (up to 3 simultaneous study tracks)
   */
  static setActiveDisciplines(state, disciplines) {
    if (!state || !state.pet) return { success: false, reason: 'no_state' };
    if (!Array.isArray(disciplines) || disciplines.length === 0) {
      return { success: false, reason: 'invalid_disciplines' };
    }
    if (disciplines.length > 3) {
      return { success: false, reason: 'max_3_disciplines' };
    }
    state.pet.activeDisciplines = [...disciplines];
    return { success: true, activeDisciplines: state.pet.activeDisciplines };
  }

  /**
   * Starts a focused study / work Pomodoro session with chosen discipline
   */
  static startFocusSession(state, { discipline = 'coding', durationMinutes = 25 } = {}) {
    if (!state) return { success: false, reason: 'no_state' };
    const durationSeconds = Math.max(1, parseInt(durationMinutes, 10) || 25) * 60;
    state.focusSession = {
      isActive: true,
      discipline: discipline,
      durationSeconds: durationSeconds,
      remainingSeconds: durationSeconds,
      distractionsCount: 0,
      startTime: Date.now()
    };
    return { success: true, session: state.focusSession };
  }

  /**
   * Real-time website accountability tick during active focus sessions
   */
  static processFocusTick(state, currentHostname = '', elapsedSeconds = 60) {
    if (!state || !state.focusSession || !state.focusSession.isActive) {
      return { success: false, reason: 'no_active_session' };
    }

    const session = state.focusSession;
    const discipline = session.discipline || 'coding';
    const branchMeta = (BRANCHES && BRANCHES[discipline]) || {};
    const disciplineName = branchMeta.name || (discipline.charAt(0).toUpperCase() + discipline.slice(1));

    const cleanHost = (currentHostname || '').toLowerCase().replace(/^https?:\\/\\//, '').replace(/^www\\./, '').split('/')[0].split(':')[0];

    // Standard distracting sites
    const distractingSites = [
      'youtube.com', 'reddit.com', 'tiktok.com', 'twitter.com', 'x.com',
      'instagram.com', 'facebook.com', 'netflix.com', 'twitch.tv', 'pinterest.com',
      'bilibili.com', 'discord.com', 'weibo.com', '9gag.com', 'buzzfeed.com'
    ];

    // Check custom blocked sites and NSFW
    const isCustomBlocked = state.settings?.customBlockedSites?.some(site => {
      const cleanSite = site.toLowerCase().replace(/^https?:\\/\\//, '').replace(/^www\\./, '').split('/')[0].split(':')[0];
      return cleanHost === cleanSite || cleanHost.endsWith('.' + cleanSite);
    });

    const isDistraction = distractingSites.some(d => cleanHost === d || cleanHost.endsWith('.' + d)) ||
      (DOMAIN_PRESETS && DOMAIN_PRESETS.distraction && DOMAIN_PRESETS.distraction.some(d => cleanHost === d || cleanHost.endsWith('.' + d))) ||
      isCustomBlocked ||
      this.isNsfwDomain(cleanHost);

    if (isDistraction) {
      session.distractionsCount = (session.distractionsCount || 0) + 1;
      const nudgeMessage = \`Hey! This isn't \${disciplineName}! Mochimori needs your focus! Let's get back to work!\`;
      return {
        isOnTopic: false,
        nudgeNeeded: true,
        nudgeMessage,
        distractionsCount: session.distractionsCount
      };
    }

    // On-topic browsing advances timer and awards bonus XP
    session.remainingSeconds = Math.max(0, session.remainingSeconds - elapsedSeconds);
    const bonusXp = Math.max(1, Math.round(elapsedSeconds * 0.25));
    state.pet.xp = (state.pet.xp || 0) + bonusXp;
    state.pet.level = this.calculateLevel(state.pet.xp);

    return {
      isOnTopic: true,
      nudgeNeeded: false,
      bonusXp,
      remainingSeconds: session.remainingSeconds
    };
  }

  /**
   * Completes focus session successfully and awards Koban & bonus XP
   */
  static completeFocusSession(state) {
    if (!state || !state.focusSession || !state.focusSession.isActive) {
      return { success: false, reason: 'no_active_session' };
    }
    state.focusSession.isActive = false;
    state.focusSession.remainingSeconds = 0;
    
    // Reward: 50 Koban + 150 XP bonus
    const kobanReward = 50;
    const xpReward = 150;
    state.koban = (state.koban || 0) + kobanReward;
    state.pet.xp = (state.pet.xp || 0) + xpReward;
    state.pet.level = this.calculateLevel(state.pet.xp);
    state.pet.kizuna = Math.min(100, (state.pet.kizuna || 0) + 10);

    return {
      success: true,
      kobanReward,
      xpReward,
      session: state.focusSession
    };
  }

  /**
   * Cancels ongoing focus session without rewards
   */
  static cancelFocusSession(state) {
    if (!state || !state.focusSession) return { success: false };
    state.focusSession.isActive = false;
    return { success: true };
  }

  /**
   * Sets custom given name for the companion
   */
  static setPetCustomName(state, name) {
    if (!state || !state.pet) return { success: false, reason: 'no_pet' };
    if (!name || typeof name !== 'string') return { success: false, reason: 'invalid_name' };
    const trimmed = name.trim();
    if (trimmed.length < 1) return { success: false, reason: 'empty_name' };
    if (trimmed.length > 20) return { success: false, reason: 'name_too_long' };

    state.pet.name = trimmed;
    if (Array.isArray(state.roster) && state.roster[state.activeRosterIndex || 0]) {
      state.roster[state.activeRosterIndex || 0].name = trimmed;
    }
    return { success: true, name: trimmed };
  }

  /**
   * Adds an unlocked creature to player's companion roster
   */
  static addToRoster(state, companion) {
    if (!state) return { success: false, reason: 'no_state' };
    if (!Array.isArray(state.roster)) {
      state.roster = [{ ...state.pet }];
    }
    state.roster.push({
      creatureId: companion.creatureId || state.pet.creatureId,
      name: companion.name || 'Companion',
      stage: companion.stage || 1,
      level: companion.level || 1,
      theme: companion.theme || 'classic_default'
    });
    return { success: true, roster: state.roster };
  }

  /**
   * Switches active companion from roster
   */
  static switchActivePet(state, rosterIndex) {
    if (!state || !Array.isArray(state.roster)) return { success: false, reason: 'no_roster' };
    const companion = state.roster[rosterIndex];
    if (!companion) return { success: false, reason: 'companion_not_found' };

    state.activeRosterIndex = rosterIndex;
    state.pet.creatureId = companion.creatureId;
    state.pet.name = companion.name;
    state.pet.stage = companion.stage || state.pet.stage;
    state.pet.level = companion.level || state.pet.level;
    if (companion.theme) state.pet.theme = companion.theme;

    return { success: true, pet: state.pet };
  }

  /**
   * Lists all unlocked creature theme palettes based on pet's stage
   */
  static getUnlockedCreatureThemes(pet) {
    const stage = pet?.stage || 1;
    const isKomyo = !!pet?.isKomyo;
    const unlocked = [];

    if (!CREATURE_THEMES) return [];

    for (const theme of Object.values(CREATURE_THEMES)) {
      if (theme.id === 'celestial_shiny') {
        if (stage >= 6 || isKomyo) {
          unlocked.push(theme);
        }
      } else if (stage >= (theme.minStage || 1)) {
        unlocked.push(theme);
      }
    }
    return unlocked;
  }

  /**
   * Sets creature theme palette
   */
  static setCreatureTheme(state, themeId) {
    if (!state || !state.pet) return { success: false, reason: 'no_pet' };
    if (!CREATURE_THEMES || !CREATURE_THEMES[themeId]) return { success: false, reason: 'invalid_theme' };
    state.pet.theme = themeId;
    if (Array.isArray(state.roster) && state.roster[state.activeRosterIndex || 0]) {
      state.roster[state.activeRosterIndex || 0].theme = themeId;
    }
    return { success: true, theme: themeId };
  }
`;

// Insert new methods right before the closing brace of PoyoriEngine class
const lastBraceIndex = code.lastIndexOf('}');
code = code.slice(0, lastBraceIndex) + newMethods + '\n}\n';

fs.writeFileSync(enginePath, code, 'utf8');
console.log('Successfully updated shared/game-engine.js');
