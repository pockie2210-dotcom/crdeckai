
const fs = require('fs');

// --- MOCK ENVIRONMENT ---
global.window = {};
global.console = {
    log: (msg) => logBuffer.push(String(msg)),
    error: (msg) => logBuffer.push('[ERROR] ' + String(msg))
};
let logBuffer = [];

// --- LOAD DATA (Simulating Imports) ---

// 1. ROLES & CONSTANTS (from index.html)
const ROLES = {
    winCon: ['Hog Rider', 'Royal Giant', 'Golem', 'Lava Hound', 'Balloon', 'Goblin Barrel', 'Miner', 'Graveyard', 'X-Bow', 'Mortar', 'Electro Giant', 'Goblin Giant', 'Ram Rider', 'Battle Ram', 'Wall Breakers', 'Elixir Golem', 'Skeleton Barrel', 'Three Musketeers', 'Giant'],
    spellSmall: ['The Log', 'Zap', 'Giant Snowball', 'Arrows', 'Barbarian Barrel', 'Tornado', 'Royal Delivery', 'Rage'],
    spellBig: ['Fireball', 'Poison', 'Rocket', 'Lightning', 'Earthquake', 'Void', 'Freeze'],
    building: ['Cannon', 'Tesla', 'Inferno Tower', 'Bomb Tower', 'Tombstone', 'Goblin Cage', 'Furnace', 'Barbarian Hut', 'Goblin Hut', 'Elixir Collector', 'Mortar', 'X-Bow']
};

const META_QUALITY = {
    'Hog Rider': 250, 'Miner': 240, 'The Log': 150, 'Zap': 145,
    'Knight': 150, 'Archers': 125, 'Goblins': 100,
    'Mega Minion': 125, 'Mighty Miner': 140, // Guess
    'Goblin Giant': 75, 'Goblin Gang': 100
};

// 2. HELPER FUNCTIONS
function getCardRole(cardName) {
    const cleanName = cardName.replace(/ Evolution$/i, '').trim();
    let foundRoles = [];
    for (const [role, cards] of Object.entries(ROLES)) {
        if (cards.includes(cleanName)) foundRoles.push(role);
    }
    return foundRoles.length > 0 ? foundRoles : ['troop'];
}
function getMetaScore(name) {
    const cleanName = name.replace(/ Evolution$/i, '').trim();
    return META_QUALITY[name] || META_QUALITY[cleanName] || 50;
}
function identifyCaptain(deck) {
    const winCons = deck.filter(c => getCardRole(c.name).includes('winCon'));
    if (winCons.length === 0) return null;
    winCons.sort((a, b) => b.elixirCost - a.elixirCost); // Mock sort
    return winCons[0];
}

// 3. AI LOGIC (Simulated from smart_ai.js)
const SmartAI = {
    recommendSwap: function (deck, cardToAdd) {
        const rolesToAdd = getCardRole(cardToAdd.name);

        // WIN CON PROTECTION
        const captain = identifyCaptain(deck);

        let candidates = deck.filter(c => {
            const role = getCardRole(c.name);
            // NEVER remove captain
            if (captain && c.name === captain.name) return false;
            // NEVER remove Win Con if not adding one
            if (role.includes('winCon') && !rolesToAdd.includes('winCon')) return false;
            // PROTECT EVOLUTIONS
            if (c.name.includes('Evolution')) return false;
            return true;
        });

        if (candidates.length === 0) {
            // Fallback: anything not captain
            candidates = deck.filter(c => c.name !== (captain ? captain.name : ''));
        }

        candidates.sort((a, b) => getMetaScore(a.name) - getMetaScore(b.name));
        return { remove: candidates[0] };
    }
};

// 4. DECKSHOP LOGIC (from deckshop_helper.js)
const TWO_LETTER_CODES = {
    'Wall Breakers': 'wb', 'Bomb Tower': 'bt', 'Lightning': 'lk', 'Hog Rider': 'hr',
    'The Log': 'lo', 'Battle Ram': 'br', 'Ram Rider': 'rr', 'Mega Knight': 'mk',
    'Mini P.E.K.K.A': 'mp', 'Dark Prince': 'dp', 'Night Witch': 'nw', 'Electro Wizard': 'ew',
    'Baby Dragon': 'bd', 'Inferno Dragon': 'id', 'Skeleton Army': 'sa', 'Skeleton Barrel': 'sb',
    'Goblin Barrel': 'gb', 'Goblin Drill': 'gd', 'Fireball': 'fb', 'Graveyard': 'gy',
    'Poison': 'po', 'Tornado': 'to', 'Earthquake': 'eq', 'Zap': 'za', 'Tesla': 'te',
    'X-Bow': 'xb', 'Royal Giant': 'rg', 'Magic Archer': 'ma', 'Ice Golem': 'ig',
    'Electro Dragon': 'ed', 'Electro Giant': 'eg', 'Goblin Giant': 'gg', 'Giant Skeleton': 'gs',
    'Ice Wizard': 'iw', 'Lumberjack': 'lj', 'Lava Hound': 'lh', 'Minion Horde': 'mh',
    'P.E.K.K.A': 'pk', 'Valkyrie': 'va', 'Inferno Tower': 'it', 'Goblin Cage': 'gc',
    'Cannon Cart': 'cc', 'Flying Machine': 'fm', 'Royal Hogs': 'rh',
    'Royal Recruits': 'rc',
    'Electro Spirit': 'es', 'Heal Spirit': 'hs', 'Battle Healer': 'bh', 'Fisherman': 'fn',
    'Mother Witch': 'mw', 'Elixir Golem': 'el', 'Zappies': 'zp', 'Sparky': 'sp',
    'Bowler': 'bw', 'Executioner': 'ex', 'Cannon': 'cn', 'Mortar': 'mo', 'Princess': 'pr',
    'Dart Goblin': 'dg', 'Archer Queen': 'aq', 'Golden Knight': 'gk', 'Skeleton King': 'sk',
    'Mighty Miner': 'mm', 'Little Prince': 'lp', 'Monk': 'mo', 'Phoenix': 'ph',
    'Giant Snowball': 'sn', 'Barbarian Barrel': 'bb', 'Arrows': 'ar', 'Royal Delivery': 'rd',
    'Rocket': 'rk', 'Void': 'vd', 'Freeze': 'fz', 'Rage': 'ra', 'Clone': 'cl',
    'Mirror': 'mr', 'Knight': 'kn', 'Archers': 'ac', 'Goblins': 'go', 'Spear Goblins': 'sg',
    'Bats': 'ba', 'Minions': 'mi',
    'Mega Minion': 'mm', // Potential Conflict with Mighty Miner
    'Ice Spirit': 'is', 'Fire Spirit': 'fs', 'Elixir Collector': 'ec', 'Three Musketeers': '3m'
};

// Conflict Cleanup
TWO_LETTER_CODES['Giant Snowball'] = 'sn';
TWO_LETTER_CODES['Skeleton Barrel'] = 'sb';

function getSlug(name) {
    const clean = name.replace(/ Evolution$/i, '').trim();
    if (TWO_LETTER_CODES[clean]) return TWO_LETTER_CODES[clean];
    const parts = clean.split(' ');
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toLowerCase();
    return clean.substring(0, 2).toLowerCase();
}

// --- RUN TESTS ---

logBuffer.push("=== DECKSHOP CODE VERIFICATION ===");
const conflictTests = [
    { name: 'Goblin Giant', expect: 'gg' }, // Defined
    { name: 'Goblin Gang', expect: 'gg' },   // Heuristic -> gg (CONFLICT!)
    { name: 'Skeletons', expect: 'sk' },     // Heuristic -> sk (CONFLICT with Skeleton King?)
    { name: 'Skeleton King', expect: 'sk' }, // Defined
    { name: 'Mega Minion', expect: 'mm' },   // Defined
    { name: 'Mighty Miner', expect: 'mm' }   // Defined (CONFLICT!)
];

conflictTests.forEach(t => {
    const slug = getSlug(t.name);
    logBuffer.push(`Card: "${t.name}" -> Code: "${slug}" (Expected: ${t.expect})`);
});

logBuffer.push("\n=== AI WIN CONDITION PROTECTION ===");
const deck = [
    { name: 'Hog Rider', elixirCost: 4 }, // Win Con
    { name: 'Musketeer', elixirCost: 4 },
    { name: 'Cannon', elixirCost: 3 },
    { name: 'Ice Spirit', elixirCost: 1 },
    { name: 'Skeletons', elixirCost: 1 },
    { name: 'The Log', elixirCost: 2 },
    { name: 'Fireball', elixirCost: 4 },
    { name: 'Knight Evolution', elixirCost: 3 } // Evo
];

// Test 1: Adding a Troop (Mega Minion) -> Should NOT remove Hog or Evo Knight
const swap1 = SmartAI.recommendSwap(deck, { name: 'Mega Minion' });
logBuffer.push(`Swap Recommendation (Add Mega Minion): Remove "${swap1.remove.name}"`);
if (swap1.remove.name === 'Hog Rider') logBuffer.push("[FAIL] Removed Win Condition!");
else if (swap1.remove.name.includes('Evolution')) logBuffer.push("[FAIL] Removed Evolution!");
else logBuffer.push("[PASS] Win Condition & Evo Protected.");

// Test 2: Adding a Win Con (Ram Rider) -> Can remove Hog
const swap2 = SmartAI.recommendSwap(deck, { name: 'Ram Rider' });
logBuffer.push(`Swap Recommendation (Add Ram Rider): Remove "${swap2.remove.name}"`);

// --- OUTPUT ---
fs.writeFileSync('verification_result.txt', logBuffer.join('\n'));
console.log("Verification complete. Results written to verification_result.txt");
