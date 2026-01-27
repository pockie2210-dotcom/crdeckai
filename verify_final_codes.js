
const fs = require('fs');

// 1. Mock the file content processing (since we can't easily require the browser JS directly)
const TWO_LETTER_CODES = {
    'Archer Queen': 'aq',
    'Archers': 'ac',
    'Arrows': 'ar',
    'Baby Dragon': 'bd',
    'Balloon': 'bl',
    'Bandit': 'bi',
    'Barbarian Barrel': 'bb',
    'Barbarian Hut': 'bu',
    'Barbarians': 'bs',
    'Bats': 'ba',
    'Battle Healer': 'bh',
    'Battle Ram': 'br',
    'Bomb Tower': 'bt',
    'Bomber': 'bo',
    'Bowler': 'bw',
    'Cannon': 'cn',
    'Cannon Cart': 'cc',
    'Clone': 'cl',
    'Dark Prince': 'dp',
    'Dart Goblin': 'dg',
    'Earthquake': 'eq',
    'Electro Dragon': 'ed',
    'Electro Giant': 'eg',
    'Electro Spirit': 'es',
    'Electro Wizard': 'ew',
    'Elite Barbarians': 'eb',
    'Elixir Collector': 'ec',
    'Elixir Golem': 'el',
    'Executioner': 'ex',
    'Fire Spirit': 'fs',
    'Fireball': 'fb',
    'Firecracker': 'fi',
    'Fisherman': 'fn',
    'Flying Machine': 'fm',
    'Freeze': 'fz',
    'Furnace': 'fu',
    'Giant': 'gi',
    'Giant Skeleton': 'gs',
    'Giant Snowball': 'sn',
    'Goblin Barrel': 'gb',
    'Goblin Cage': 'gc',
    'Goblin Drill': 'gd',
    'Goblin Gang': 'gn',
    'Goblin Giant': 'gg',
    'Goblin Hut': 'gh',
    'Goblins': 'go',
    'Golden Knight': 'gk',
    'Golem': 'gm',
    'Graveyard': 'gy',
    'Guards': 'gu',
    'Heal Spirit': 'hs',
    'Hog Rider': 'hr',
    'Hunter': 'hu',
    'Ice Golem': 'ig',
    'Ice Spirit': 'is',
    'Ice Wizard': 'iw',
    'Inferno Dragon': 'id',
    'Inferno Tower': 'it',
    'Knight': 'kn',
    'Lava Hound': 'lh',
    'Lightning': 'lk',
    'Little Prince': 'lp',
    'Lumberjack': 'lj',
    'Magic Archer': 'ma',
    'Mega Knight': 'mk',
    'Mega Minion': 'mm',
    'Mighty Miner': 'mt',
    'Miner': 'mi',
    'Mini P.E.K.K.A': 'mp',
    'Minion Horde': 'mh',
    'Minions': 'ms',
    'Mirror': 'mr',
    'Monk': 'nk',
    'Mortar': 'mo',
    'Mother Witch': 'mw',
    'Musketeer': 'mu',
    'Night Witch': 'nw',
    'P.E.K.K.A': 'pk',
    'Phoenix': 'ph',
    'Poison': 'po',
    'Prince': 'pe',
    'Princess': 'pr',
    'Rage': 'ra',
    'Ram Rider': 'rr',
    'Rascals': 'rs',
    'Rocket': 'rk',
    'Royal Delivery': 'rd',
    'Royal Ghost': 'ro',
    'Royal Giant': 'rg',
    'Royal Hogs': 'rh',
    'Royal Recruits': 'rc',
    'Skeleton Army': 'sa',
    'Skeleton Barrel': 'sb',
    'Skeleton Dragons': 'sd',
    'Skeleton King': 'sk',
    'Skeletons': 'ss',
    'Sparky': 'sp',
    'Spear Goblins': 'sg',
    'Tesla': 'te',
    'The Log': 'lo',
    'Three Musketeers': '3m',
    'Tombstone': 'ts',
    'Tornado': 'to',
    'Valkyrie': 'va',
    'Void': 'vd',
    'Wall Breakers': 'wb',
    'Witch': 'wi',
    'Wizard': 'wd',
    'X-Bow': 'xb',
    'Zap': 'za',
    'Zappies': 'zp',
};

// 2. CHECK FOR DUPLICATES
const codesSeen = new Map();
const duplicates = [];

Object.entries(TWO_LETTER_CODES).forEach(([card, code]) => {
    if (codesSeen.has(code)) {
        duplicates.push({ code: code, cards: [codesSeen.get(code), card] });
    } else {
        codesSeen.set(code, card);
    }
});

console.log("=== DUPLICATE CODE CHECK ===");
if (duplicates.length === 0) {
    console.log("PASS: No duplicate codes found.");
} else {
    console.error("FAIL: Duplicates found!", JSON.stringify(duplicates, null, 2));
}

// 3. CHECK SPECIFIC FIXES
const fixesToCheck = [
    { card: 'Goblin Gang', expected: 'gn' },
    { card: 'Goblin Giant', expected: 'gg' }, // Reference
    { card: 'Mighty Miner', expected: 'mt' },
    { card: 'Mega Minion', expected: 'mm' }, // Reference
    { card: 'Monk', expected: 'nk' },
    { card: 'Mortar', expected: 'mo' }, // Reference
    { card: 'Tombstone', expected: 'ts' },
    { card: 'Tornado', expected: 'to' }, // Reference
    { card: 'Bandit', expected: 'bi' },
    { card: 'Bats', expected: 'ba' }, // Reference
    { card: 'Minions', expected: 'ms' },
    { card: 'Miner', expected: 'mi' } // Reference
];

console.log("\n=== SPECIFIC FIX VERIFICATION ===");
fixesToCheck.forEach(check => {
    const actual = TWO_LETTER_CODES[check.card];
    if (actual === check.expected) {
        console.log(`PASS: ${check.card} -> ${actual}`);
    } else {
        console.error(`FAIL: ${check.card} -> ${actual} (Expected: ${check.expected})`);
    }
});

// 4. CHECK TOTAL CARD COUNT
console.log(`\nTotal Valid Cards Mapped: ${Object.keys(TWO_LETTER_CODES).length}`);
