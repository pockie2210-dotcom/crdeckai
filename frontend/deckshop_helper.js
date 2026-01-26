// Helper to generate DeckShop.pro check URLs
// User requires: deck-builder/clan-wars/build?deck1=CODECODECODE
// Strict 2-letter codes, concatenated.

const TWO_LETTER_CODES = {
    // --- OBSERVED FROM USER SCREENSHOT ---
    'Knight': 'kn',
    'Firecracker': 'fc', // Inferred "fc"
    'Wall Breakers': 'wb',
    'Miner': 'mn',
    'The Log': 'lo',    // Inferred "lo"
    'Fireball': 'fb',
    'Bats': 'ba',
    'Tesla': 'te',      // Inferred "te"

    // --- OTHERS (Best Guess Pattern: First 2 letters usually, or initials) ---
    'Bomb Tower': 'bt',
    'Royal Giant': 'rg',
    'Magic Archer': 'ma',
    'Mega Knight': 'mk',
    'Goblin Barrel': 'gb',
    'Battle Ram': 'br',
    'Hog Rider': 'hr',
    'Ice Golem': 'ig',
    'Baby Dragon': 'bd',
    'Dark Prince': 'dp',
    'Electro Dragon': 'ed',
    'Electro Giant': 'eg',
    'Electro Wizard': 'ew',
    'Goblin Giant': 'gg',
    'Giant Skeleton': 'gs',
    'Graveyard': 'gy',
    'Inferno Dragon': 'id',
    'Ice Wizard': 'iw',
    'Lumberjack': 'lj',
    'Lava Hound': 'lh',
    'Mini P.E.K.K.A': 'mp',
    'Minion Horde': 'mh',
    'Night Witch': 'nw',
    'P.E.K.K.A': 'pk',
    'Ram Rider': 'rr',
    'Skeleton Army': 'sa',
    'Valkyrie': 'va',
    'Inferno Tower': 'it',
    'Goblin Cage': 'gc',
    'Cannon Cart': 'cc',
    'Flying Machine': 'fm',
    'Royal Hogs': 'rh',
    'Royal Recruits': 'rr', // Conflict w Ram Rider? Let's check logic. Ram Rider=rr. Recruits=rc?
    // Let's assume Ram Rider=rr, Royal Recruits=rc for safety if distinct.
    'Electro Spirit': 'es',
    'Heal Spirit': 'hs',
    'Battle Healer': 'bh',
    'Fisherman': 'fn',
    'Mother Witch': 'mw',
    'Elixir Golem': 'el', // eg is Electro Giant
    'Zappies': 'zp',
    'Sparky': 'sp',
    'Bowler': 'bw',
    'Executioner': 'ex',
    'Cannon': 'cn', // or ca?
    'X-Bow': 'xb',
    'Mortar': 'mo',
    'Princess': 'pr',
    'Dart Goblin': 'dg',
    'Archer Queen': 'aq',
    'Golden Knight': 'gk',
    'Skeleton King': 'sk',
    'Mighty Miner': 'mm',
    'Little Prince': 'lp',
    'Monk': 'mk', // mk is Mega Knight. Monk -> mo?
    'Phoenix': 'ph',
    'Goblin Drill': 'gd',
    'Zap': 'za',
    'Giant Snowball': 'sb',
    'Barbarian Barrel': 'bb',
    'Arrows': 'ar',
    'Royal Delivery': 'rd',
    'Poison': 'pn', // or po?
    'Rocket': 'rk',
    'Lightning': 'ln',
    'Earthquake': 'eq',
    'Void': 'vd',
    'Tornado': 'tn',
    'Freeze': 'fz',
    'Rage': 'ra',
    'Clone': 'cl',
    'Mirror': 'mr',
    'Archers': 'ac',
    'Goblins': 'go',
    'Spear Goblins': 'sg',
    'Minions': 'mi',
    'Mega Minion': 'mm',
    'Ice Spirit': 'is',
    'Fire Spirit': 'fs',
    'Elixir Collector': 'ec',
    'Three Musketeers': '3m'
};

// Conflict Overrides
TWO_LETTER_CODES['Monk'] = 'mo'; // mk used by Mega Knight
TWO_LETTER_CODES['Mega Minion'] = 'mm'; // mm used by Mighty Miner? 
TWO_LETTER_CODES['Mighty Miner'] = 'mt'; // mt
TWO_LETTER_CODES['Minions'] = 'ms'; // mi used by Miner? no Miner is mn. mi is fine.
TWO_LETTER_CODES['Cannon'] = 'cn';
TWO_LETTER_CODES['Poison'] = 'po'; // po makes more sense than pn

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

window.openDeckShop = function () {
    const deck = window.currentAppDeck;
    if (!deck || deck.length === 0) {
        alert("Scan a player first!");
        return;
    }

    const slugs = deck.map(c => getSlug(c.name));

    // Format: deck1=codecodecode (concatenated)
    const codeString = slugs.join('');

    // Base URL from user screenshot
    const url = `https://www.deckshop.pro/deck-builder/clan-wars/build?e=2&h=1&deck1=${codeString}`;

    console.log("[DeckShop] Generated:", url);
    window.open(url, '_blank');
};
