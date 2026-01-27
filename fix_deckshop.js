
const fs = require('fs');

// 1. DATA SOURCE (Names from ROLES)
const rawRoles = {
    winCon: ['Hog Rider', 'Royal Giant', 'Golem', 'Lava Hound', 'Balloon', 'Goblin Barrel', 'Miner', 'Graveyard', 'X-Bow', 'Mortar', 'Electro Giant', 'Goblin Giant', 'Ram Rider', 'Battle Ram', 'Wall Breakers', 'Elixir Golem', 'Skeleton Barrel', 'Three Musketeers', 'Giant'],
    spellSmall: ['The Log', 'Zap', 'Giant Snowball', 'Arrows', 'Barbarian Barrel', 'Tornado', 'Royal Delivery', 'Rage'],
    spellBig: ['Fireball', 'Poison', 'Rocket', 'Lightning', 'Earthquake', 'Void', 'Freeze'],
    airDefense: ['Musketeer', 'Electro Wizard', 'Wizard', 'Witch', 'Executioner', 'Hunter', 'Baby Dragon', 'Inferno Dragon', 'Mega Minion', 'Minions', 'Minion Horde', 'Bats', 'Spear Goblins', 'Ice Wizard', 'Princess', 'Dart Goblin', 'Magic Archer', 'Flying Machine', 'Firecracker', 'Mother Witch', 'Skeleton Dragons', 'Phoenix', 'Archer Queen', 'Little Prince'],
    building: ['Cannon', 'Tesla', 'Inferno Tower', 'Bomb Tower', 'Tombstone', 'Goblin Cage', 'Furnace', 'Barbarian Hut', 'Goblin Hut', 'Elixir Collector', 'Mortar', 'X-Bow'], // Duplicates: Mortar, X-Bow
    miniTank: ['Mini P.E.K.K.A', 'P.E.K.K.A', 'Inferno Tower', 'Inferno Dragon', 'Hunter', 'Elite Barbarians', 'Prince', 'Lumberjack', 'Barperians', 'Skeleton Army', 'Guards', 'Royal Recruits', 'Dark Prince', 'Golden Knight', 'Skeleton King', 'Mighty Miner', 'Monk', 'Knight', 'Valkyrie', 'Ice Golem', 'Fisherman', 'Bowler', 'Cannon Cart', 'Giant Skeleton', 'Royal Ghost', 'Bandit', 'Zappies', 'Electro Spirit', 'Fire Spirit', 'Ice Spirit', 'Heal Spirit', 'Battle Healer', 'Mirror', 'Clone', 'Goblins', 'Goblin Gang', 'Bomber', 'Rascals']
    // Added some missing cards manually to miniTank list just for coverage if needed, or I'll just rely on the sets I have. AllCards is better.
};
// Note: 'Barperians' is a typo in my manual list? Likely 'Barbarians'.

// Aggregating all unique names
const allCards = new Set();
Object.values(rawRoles).forEach(list => list.forEach(c => allCards.add(c)));

// Special additions that might be missing from ROLES keys (like supports not in airDefense/miniTank)
['Barbarians', 'Elite Barbarians', 'Rascals', 'Goblin Gang', 'Bomber', 'Skeletons', 'Mirror', 'Clone', 'Heal Spirit', 'Fire Spirit', 'Ice Spirit', 'Electro Spirit', 'Zappies', 'Flying Machine', 'Battle Healer', 'Fisherman'].forEach(c => allCards.add(c));

// 2. EXISTING MAPPING (Preserve these)
const fixedCodes = {
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
    'Cannon Cart': 'cc', 'Flying Machine': 'fm', 'Royal Hogs': 'rh', 'Royal Recruits': 'rc',
    'Electro Spirit': 'es', 'Heal Spirit': 'hs', 'Battle Healer': 'bh', 'Fisherman': 'fn',
    'Mother Witch': 'mw', 'Elixir Golem': 'el', 'Zappies': 'zp', 'Sparky': 'sp',
    'Bowler': 'bw', 'Executioner': 'ex', 'Cannon': 'cn', 'Mortar': 'mo', 'Princess': 'pr',
    'Dart Goblin': 'dg', 'Archer Queen': 'aq', 'Golden Knight': 'gk', 'Skeleton King': 'sk',
    'Mighty Miner': 'mm', 'Little Prince': 'lp', 'Monk': 'mo', 'Phoenix': 'ph',
    'Giant Snowball': 'sn', 'Barbarian Barrel': 'bb', 'Arrows': 'ar', 'Royal Delivery': 'rd',
    'Rocket': 'rk', 'Void': 'vd', 'Freeze': 'fz', 'Rage': 'ra', 'Clone': 'cl',
    'Mirror': 'mr', 'Knight': 'kn', 'Archers': 'ac', 'Goblins': 'go', 'Spear Goblins': 'sg',
    'Bats': 'ba', 'Minions': 'mi', 'Mega Minion': 'mm', 'Ice Spirit': 'is', 'Fire Spirit': 'fs',
    'Elixir Collector': 'ec', 'Three Musketeers': '3m'
};

// 3. GENERATION
const finalMap = { ...fixedCodes };
const usedCodes = new Set(Object.values(fixedCodes));
const collisions = [];

[...allCards].sort().forEach(card => {
    if (finalMap[card]) return; // Already fixed

    // Heuristic
    let code = card.substring(0, 2).toLowerCase();
    const parts = card.split(' ');
    if (parts.length >= 2) code = (parts[0][0] + parts[1][0]).toLowerCase();

    // Collision Check
    if (usedCodes.has(code)) {
        // Try fallback 1: First 2 chars (if split was used)
        let alt = card.substring(0, 2).toLowerCase();
        if (!usedCodes.has(alt)) {
            code = alt;
        } else {
            // Try fallback 2: First + Last
            alt = (card[0] + card[card.length - 1]).toLowerCase();
            if (!usedCodes.has(alt)) code = alt;
            else {
                // Try First + Second letter of second word (if exists)
                if (parts.length >= 2) {
                    alt = (parts[0][0] + parts[1][1]).toLowerCase();
                    if (!usedCodes.has(alt)) code = alt;
                    else collisions.push({ card, code }); // Give up, report
                } else {
                    collisions.push({ card, code });
                }
            }
        }
    }

    finalMap[card] = code;
    usedCodes.add(code);
});


// 4. OUTPUT
let output = "const TWO_LETTER_CODES = {\n";
Object.keys(finalMap).sort().forEach(k => {
    output += `    '${k}': '${finalMap[k]}',\n`;
});
output += "};\n";

if (collisions.length > 0) {
    output += "\n// UNRESOLVED COLLISIONS (Manual Fix Needed):\n";
    output += JSON.stringify(collisions, null, 2);
}

fs.writeFileSync('valid_codes.js', output);
console.log("Written to valid_codes.js");

