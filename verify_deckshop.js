
// Mock window and alert
global.window = {};
global.alert = console.log;

// Pasting content of deckshop_helper.js (adapted for node)
const TWO_LETTER_CODES = {
    // --- CONFIRMED BY USER ---
    'Wall Breakers': 'wb',
    'Bomb Tower': 'bt',
    'Lightning': 'lk',      // User: lk
    'Hog Rider': 'hr',
    'The Log': 'lo',
    'Battle Ram': 'br',
    'Ram Rider': 'rr',
    'Mega Knight': 'mk',
    'Mini P.E.K.K.A': 'mp',
    'Dark Prince': 'dp',
    'Night Witch': 'nw',
    'Electro Wizard': 'ew',
    'Baby Dragon': 'bd',
    'Inferno Dragon': 'id',
    'Skeleton Army': 'sa',
    'Skeleton Barrel': 'sb', // User: sb
    'Goblin Barrel': 'gb',
    'Goblin Drill': 'gd',
    'Fireball': 'fb',
    'Graveyard': 'gy',
    'Poison': 'po',
    'Tornado': 'to',        // User: to
    'Earthquake': 'eq',
    'Zap': 'za',
    'Tesla': 'te',
    'X-Bow': 'xb',
    'Royal Giant': 'rg',
    'Magic Archer': 'ma',
    'Ice Golem': 'ig',
    'Electro Dragon': 'ed',
    'Electro Giant': 'eg',
    'Goblin Giant': 'gg',
    'Giant Skeleton': 'gs',
    'Ice Wizard': 'iw',
    'Lumberjack': 'lj',
    'Lava Hound': 'lh',
    'Minion Horde': 'mh',
    'P.E.K.K.A': 'pk',
    'Valkyrie': 'va',
    'Inferno Tower': 'it',
    'Goblin Cage': 'gc',
    'Cannon Cart': 'cc',
    'Flying Machine': 'fm',
    'Royal Hogs': 'rh',
    'Royal Recruits': 'rc', // Changed from rr (Ram Rider taken)
    'Electro Spirit': 'es',
    'Heal Spirit': 'hs',
    'Battle Healer': 'bh',
    'Fisherman': 'fn',
    'Mother Witch': 'mw',
    'Elixir Golem': 'el',
    'Zappies': 'zp',
    'Sparky': 'sp',
    'Bowler': 'bw',
    'Executioner': 'ex',
    'Cannon': 'cn',
    'Mortar': 'mo',
    'Princess': 'pr',
    'Dart Goblin': 'dg',
    'Archer Queen': 'aq',
    'Golden Knight': 'gk',
    'Skeleton King': 'sk',
    'Mighty Miner': 'mm',
    'Little Prince': 'lp',
    'Monk': 'mo',
    'Phoenix': 'ph',
    'Giant Snowball': 'sn',
    'Barbarian Barrel': 'bb',
    'Arrows': 'ar',
    'Royal Delivery': 'rd',
    'Rocket': 'rk',
    'Void': 'vd',
    'Freeze': 'fz',
    'Rage': 'ra',
    'Clone': 'cl',
    'Mirror': 'mr',
    'Knight': 'kn',
    'Archers': 'ac',
    'Goblins': 'go',
    'Spear Goblins': 'sg',
    'Bats': 'ba',
    'Minions': 'mi',
    'Mega Minion': 'mm',
    'Ice Spirit': 'is',
    'Fire Spirit': 'fs',
    'Elixir Collector': 'ec',
    'Three Musketeers': '3m'
};

// Conflict Cleanup (from file)
TWO_LETTER_CODES['Giant Snowball'] = 'sn';
TWO_LETTER_CODES['Skeleton Barrel'] = 'sb';

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
const test1 = testDeckShopHeader("Classic Log Bait", [
    "Princess", "Goblin Barrel", "The Log", "Goblin Gang", // Goblin Gang missing in map?
    "Knight", "Rocket", "Ice Spirit", "Inferno Tower"
]);

const test2 = testDeckShopHeader("Hog 2.6", [
    "Hog Rider", "Fireball", "Zap", "Ice Golem", // Zap not log? usually log. 
    "Ice Spirit", "Skeletons", "Musketeer", "Cannon"
]);

const test3 = testDeckShopHeader("Conflict Check", [
    "Giant Snowball", "Skeleton Barrel", "Ram Rider", "Battle Ram", "Royal Recruits"
]);

const test4 = testDeckShopHeader("Evolutions", [
    "Knight Evolution", "Bats Evolution", "Royal Giant Evolution"
]);
