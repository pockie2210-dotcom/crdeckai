
// META DECK DATABASE (Pro Approved)
// This file provides the "Ground Truth" for the AI to suggest meta completions.

const META_DECKS = [
    // --- CYCLE ---
    { name: "2.6 Hog Cycle", full: ["Hog Rider", "Cannon", "Musketeer", "Ice Golem", "Skeletons", "Ice Spirit", "The Log", "Fireball"] },
    { name: "Hog EQ Firecracker", full: ["Hog Rider", "Earthquake", "Firecracker", "Valkyrie", "Tesla", "Skeletons", "Ice Spirit", "The Log"] },
    { name: "Classic Log Bait", full: ["Goblin Barrel", "Princess", "Goblin Gang", "Rocket", "Knight", "Inferno Tower", "Ice Spirit", "The Log"] },
    { name: "Prince Rascals Bait", full: ["Goblin Barrel", "Princess", "Goblin Gang", "Prince", "Rascals", "Dart Goblin", "The Log", "Rocket"] },
    { name: "Miner Wall Breakers", full: ["Miner", "Wall Breakers", "Magic Archer", "Bomb Tower", "Valkyrie", "Spear Goblins", "The Log", "Fireball"] },
    { name: "Miner Loon Cycle", full: ["Balloon", "Miner", "Inferno Tower", "Ice Golem", "Skeletons", "Snowball", "Barbarian Barrel", "Musketeer"] },
    { name: "X-Bow 3.0", full: ["X-Bow", "Tesla", "Archers", "Knight", "Skeletons", "Electro Spirit", "The Log", "Fireball"] },
    { name: "IceBow", full: ["X-Bow", "Ice Wizard", "Rocket", "Tornado", "Tesla", "Skeletons", "The Log", "Knight"] },
    { name: "Mortar Skeleton King", full: ["Mortar", "Skeleton King", "Miner", "Minions", "Goblin Gang", "Fireball", "The Log", "Cannon Cart"] },
    { name: "Drill Cycle", full: ["Goblin Drill", "Wall Breakers", "Bomber", "Fireball", "Tesla", "Skeletons", "The Log", "Knight"] },
    { name: "Royal Hogs AQ", full: ["Royal Hogs", "Archer Queen", "Royal Delivery", "Earthquake", "Cannon", "Skeletons", "Ice Spirit", "The Log"] },

    // --- CONTROL ---
    { name: "Splashyard", full: ["Graveyard", "Baby Dragon", "Ice Wizard", "Tornado", "Valkyrie", "Poison", "Barbarian Barrel", "Tombstone"] },
    { name: "Giant Graveyard", full: ["Giant", "Graveyard", "Musketeer", "Mini P.E.K.K.A", "Arrows", "Snowball", "Skeleton Army", "Bats"] },
    { name: "Pekka Bridge Spam", full: ["P.E.K.K.A", "Battle Ram", "Bandit", "Royal Ghost", "Electro Wizard", "Magic Archer", "Zap", "Poison"] },
    { name: "Ram Rider Bridge Spam", full: ["Ram Rider", "P.E.K.K.A", "Bandit", "Electro Wizard", "Barbarian Barrel", "Snowball", "Lightning", "Baby Dragon"] },
    { name: "Miner Poison Control", full: ["Miner", "Poison", "Inferno Tower", "Valkyrie", "Electro Wizard", "Skeletons", "The Log", "Ice Spirit"] },
    { name: "Mega Knight Zap Bait", full: ["Mega Knight", "Skeleton Barrel", "Miner", "Goblin Gang", "Spear Goblins", "Bats", "Zap", "Inferno Dragon"] },
    { name: "Mega Knight Ram Rider", full: ["Mega Knight", "Ram Rider", "Musketeer", "Bandit", "Snowball", "Barbarian Barrel", "Electro Spirit", "Inferno Dragon"] },

    // --- BEATDOWN ---
    { name: "Golem Beatdown", full: ["Golem", "Night Witch", "Baby Dragon", "Lightning", "Mega Minion", "Barbarian Barrel", "Tornado", "Lumberjack"] },
    { name: "Golem Clone", full: ["Golem", "Night Witch", "Baby Dragon", "Clone", "Lumberjack", "Skeleton Army", "Bats", "Flying Machine"] },
    { name: "Lavaloon", full: ["Lava Hound", "Balloon", "Mega Minion", "Minions", "Barbarians", "Zap", "Fireball", "Tombstone"] },
    { name: "Lava Miner", full: ["Lava Hound", "Miner", "Flying Machine", "Skeleton Dragons", "Barbarians", "Zap", "Fireball", "Mega Minion"] },
    { name: "Electro Giant Mirror", full: ["Electro Giant", "Lightning", "Tornado", "Golden Knight", "Bomber", "Cannon", "Mirror", "Barbarian Barrel"] },
    { name: "Goblin Giant Sparky", full: ["Goblin Giant", "Sparky", "Rage", "Dark Prince", "Electro Wizard", "Mega Minion", "Zap", "Heal Spirit"] },
    { name: "Royal Giant Fisher", full: ["Royal Giant", "Fisherman", "Mother Witch", "Lightning", "The Log", "Skeletons", "Electro Spirit", "Mega Minion"] },
    { name: "Giant Double Prince", full: ["Giant", "Prince", "Dark Prince", "Mega Minion", "Electro Wizard", "Zap", "Fireball", "Miner"] },
    { name: "Elixir Golem Healer", full: ["Elixir Golem", "Battle Healer", "Electro Dragon", "Tornado", "Rage", "Elite Barbarians", "Arrows", "Skeleton King"] },

    // --- SIEGE / HYBRID ---
    { name: "Mortar Bait", full: ["Mortar", "Miner", "Goblin Gang", "Minion Horde", "Rascals", "Spear Goblins", "The Log", "Fireball"] },
    { name: "Royal Recruits Hogs", full: ["Royal Recruits", "Royal Hogs", "Flying Machine", "Goblin Cage", "Fireball", "Barbarian Barrel", "Zappies", "Electro Spirit"] },
    { name: "Three Musketeers Pump", full: ["Three Musketeers", "Elixir Collector", "Battle Ram", "Royal Ghost", "Bandit", "Ice Golem", "Zap", "Hunter"] }
];

// Attach to window for global access
window.META_DECKS = META_DECKS;
