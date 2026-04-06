
// Mock window and alert
global.window = {};
global.grid = {}; // Mock grid for console
global.alert = console.log;

// SINGLE SOURCE OF TRUTH: Copy of TWO_LETTER_CODES from frontend/deckshop_helper.js
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
    'Goblin Curse': 'gr',
    'Goblin Demolisher': 'ge',
    'Goblin Drill': 'gd',
    'Goblin Gang': 'gg',
    'Goblin Giant': 'gn',
    'Goblin Hut': 'gh',
    'Goblin Machine': 'ga',
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
    'Mighty Miner': 'me',
    'Miner': 'mn',
    'Mini P.E.K.K.A': 'mp',
    'Minion Horde': 'mh',
    'Minions': 'mi',
    'Mirror': 'mr',
    'Monk': 'mc',
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
    'Suspicious Bush': 'yb',
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

function getSlug(name) {
    const clean = name.replace(/ Evolution$/i, '').trim();
    if (TWO_LETTER_CODES[clean]) return TWO_LETTER_CODES[clean];

    // Heuristic Fallback
    const parts = clean.split(' ');
    if (parts.length >= 2) {
        return (parts[0][0] + parts[1][0]).toLowerCase();
    }
    return clean.substring(0, 2).toLowerCase();
}

// Test Function
function testDeckShopHeader(deckName, cards) {
    console.log(`\nTesting Deck: ${deckName}`);
    const deck = cards.map(name => ({ name }));
    const slugs = deck.map(c => getSlug(c.name));
    const codeString = slugs.join('');
    const url = `https://www.deckshop.pro/deck-builder/clan-wars/build?e=2&h=1&deck1=${codeString}`;

    console.log("Generated Slugs:", slugs.join(', '));
    console.log("URL:", url);
    return { slugs, url };
}

// TEST CASES
testDeckShopHeader("Classic Log Bait", [
    "Princess", "Goblin Barrel", "The Log", "Goblin Gang",
    "Knight", "Rocket", "Ice Spirit", "Inferno Tower"
]);

testDeckShopHeader("Hog 2.6", [
    "Hog Rider", "Fireball", "The Log", "Ice Golem",
    "Ice Spirit", "Skeletons", "Musketeer", "Cannon"
]);

testDeckShopHeader("Conflict Check", [
    "Giant Snowball", "Skeleton Barrel", "Ram Rider", "Battle Ram", "Royal Recruits"
]);

testDeckShopHeader("Evolutions", [
    "Knight Evolution", "Bats Evolution", "Royal Giant Evolution"
]);
