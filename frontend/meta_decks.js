// Brain of the AI: Top Tier Meta Decks (2025 Era)
// This file helps the AI recognize patterns and suggest 'Pro' moves.

// Brain of the AI: Top Tier Meta Decks (2025 Era)
// This file helps the AI recognize patterns and suggest 'Pro' moves.

let META_DECKS = [
    // --- CYLCE ARCHETYPES ---
    {
        name: "Hog 2.6 Cycle",
        core: ["Hog Rider", "Cannon", "Musketeer"],
        full: ["Hog Rider", "Cannon", "Musketeer", "Ice Golem", "Ice Spirit", "Skeletons", "Fireball", "The Log"],
        playstyle: "Cycle"
    },
    {
        name: "Hog Earthquake",
        core: ["Hog Rider", "Earthquake"],
        full: ["Hog Rider", "Earthquake", "Firecracker", "Valkyrie", "Tesla", "Skeletons", "Ice Spirit", "The Log"],
        playstyle: "Cycle"
    },
    {
        name: "Classic Log Bait",
        core: ["Goblin Barrel", "Princess", "Goblin Gang"],
        full: ["Goblin Barrel", "Princess", "Goblin Gang", "Knight", "Inferno Tower", "Rocket", "Ice Spirit", "The Log"],
        playstyle: "Bait"
    },
    {
        name: "Miner Wall Breakers",
        core: ["Miner", "Wall Breakers"],
        full: ["Miner", "Wall Breakers", "Magic Archer", "Bomb Tower", "Valkyrie", "Spear Goblins", "Fireball", "Zap"],
        playstyle: "Cycle"
    },
    {
        name: "Goblin Drill Cycle",
        core: ["Goblin Drill", "Wall Breakers"],
        full: ["Goblin Drill", "Wall Breakers", "Bomber", "Fireball", "Tesla", "Skeletons", "Knight", "The Log"],
        playstyle: "Cycle"
    },

    // --- CONTROL ARCHETYPES ---
    {
        name: "Splashyard (Graveyard Control)",
        core: ["Graveyard", "Poison", "Baby Dragon", "Tornado"],
        full: ["Graveyard", "Poison", "Baby Dragon", "Ice Wizard", "Tornado", "Knight", "Barbarian Barrel", "Tombstone"], // Knight/Valk often interchangeable
        playstyle: "Control"
    },
    {
        name: "P.E.K.K.A Bridge Spam",
        core: ["P.E.K.K.A", "Battle Ram"],
        full: ["P.E.K.K.A", "Battle Ram", "Bandit", "Royal Ghost", "Magic Archer", "Electro Wizard", "Poison", "Zap"],
        playstyle: "BridgeSpam"
    },
    {
        name: "Miner Poison Control",
        core: ["Miner", "Poison"],
        full: ["Miner", "Poison", "Inferno Tower", "Knight", "Skeletons", "Electro Spirit", "The Log", "Wall Breakers"],
        playstyle: "Control"
    },
    {
        name: "Royal Hogs Evo",
        core: ["Royal Hogs", "Royal Recruits"],
        full: ["Royal Hogs", "Royal Recruits", "Flying Machine", "Goblin Cage", "Zappies", "Fireball", "Barbarian Barrel", "Arrows"],
        playstyle: "SplitLane"
    },

    // --- BEATDOWN ARCHETYPES ---
    {
        name: "Golem Beatdown",
        core: ["Golem", "Night Witch"],
        full: ["Golem", "Night Witch", "Baby Dragon", "Lightning", "Lumberjack", "Mega Minion", "Tornado", "Barbarian Barrel"],
        playstyle: "Beatdown"
    },
    {
        name: "LavaLoon",
        core: ["Lava Hound", "Balloon"],
        full: ["Lava Hound", "Balloon", "Mega Minion", "Minions", "Barbarians", "Fireball", "Zap", "Tombstone"],
        playstyle: "Beatdown"
    },
    {
        name: "Electro Giant Beatdown",
        core: ["Electro Giant", "Tornado", "Lightning"],
        full: ["Electro Giant", "Tornado", "Lightning", "Golden Knight", "Cannon", "Bomber", "Phoenix", "Barbarian Barrel"],
        playstyle: "Beatdown"
    },
    {
        name: "Goblin Giant Sparky",
        core: ["Goblin Giant", "Sparky"],
        full: ["Goblin Giant", "Sparky", "Rage", "Mini P.E.K.K.A", "Mega Minion", "Zap", "Dark Prince", "Electro Wizard"],
        playstyle: "Beatdown"
    },
    {
        name: "Giant Double Prince",
        core: ["Giant", "Prince", "Dark Prince"],
        full: ["Giant", "Prince", "Dark Prince", "Mega Minion", "Electro Wizard", "Fireball", "Zap", "Miner"],
        playstyle: "Beatdown"
    },

    // --- SIEGE ---
    {
        name: "X-Bow 3.0",
        core: ["X-Bow", "Tesla"],
        full: ["X-Bow", "Tesla", "Archers", "Knight", "Fireball", "The Log", "Skeletons", "Electro Spirit"],
        playstyle: "Siege"
    }
];

// Helper to check if a deck matches a core
function findMatchingArchetype(currentCards) {
    const currentNames = currentCards.map(c => c.name);

    // Sort by specificity (most matched core cards first)
    const candidates = META_DECKS.filter(deck => {
        // Check if we have at least ONE core card from this deck
        return deck.core.some(coreCard => currentNames.includes(coreCard));
    });

    if (candidates.length === 0) return null;

    // Find the BEST match (most core cards present)
    candidates.sort((a, b) => {
        const aMatch = a.core.filter(c => currentNames.includes(c)).length;
        const bMatch = b.core.filter(c => currentNames.includes(c)).length;
        return bMatch - aMatch;
    });

    // Return the best match if we have at least 1 core card overlap
    // But wait, if we only have "Skeletons", we shouldn't force "Hog 2.6".
    // Let's require the WIN CONDITION or KEY CARD to be present.
    const best = candidates[0];
    const hasCoreWinCon = best.core.some(c => currentNames.includes(c) && (c === 'Hog Rider' || c === 'Golem' || c === 'X-Bow' || c === 'Lava Hound' || c === 'Graveyard' || c === 'Miner' || c === 'Goblin Barrel'));

    if (hasCoreWinCon) return best;
    return null;
}

// Allow injecting live data from server
window.addLiveDecks = function (liveDecks) {
    if (!Array.isArray(liveDecks)) return;
    console.log('[AI] Injecting ' + liveDecks.length + ' live meta decks from server...');
    // Add to top of list so they are prioritized
    META_DECKS = [...liveDecks, ...META_DECKS];
};
