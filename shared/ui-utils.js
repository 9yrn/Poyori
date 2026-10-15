export function triggerCelebration(evo, celebrationModal, state, PoyoriEngine, getCreatureSprite, saveState, renderCallback) {
  if (!evo || !evo.evolved || !celebrationModal) return false;
  const isHatch = evo.stage === 2;
  celebrationModal.show({
    type: isHatch ? 'hatch' : 'evolution',
    title: isHatch ? 'EGG HATCHED!' : (evo.isKomyo ? 'MYTHIC ASCENSION!' : 'EVOLUTION UNLOCKED!'),
    subtitle: isHatch ? '生まれ (Umare) - A New Life Begins!' : '神獣進化 (Shinju Shinka) - Divine Evolution!',
    name: `${evo.creature.name} (${evo.creature.jaName})`,
    badgeText: `STAGE ${evo.stage || 2} ・ ${evo.creature.branch.toUpperCase()}`,
    spriteUrl: getCreatureSprite(evo.newId, 'idle1', state.pet.accessory),
    description: evo.creature.desc || 'Your dedication and focused habits have guided Poyori to evolve!',
    actionLabel: 'Name & Continue!',
    enableNaming: true,
    currentName: state.pet.name,
    onAction: async (newName) => {
      if (newName && newName.trim()) {
        PoyoriEngine.setPetCustomName(state, newName.trim());
        if (saveState) await saveState(state);
        if (renderCallback) renderCallback();
      }
    }
  });
  return true;
}
