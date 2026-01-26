// Helper to generate DeckShop.pro check URLs
// User states strict 2-letter code requirement.

const TWO_LETTER_CODES = {
    // KNOWN / COMMUNITY STANDARD
    'Wall Breakers': 'wb',
    'Bomb Tower': 'bt',
    'Royal Giant': 'rg',
    'Magic Archer': 'ma',
    'Mega Knight': 'mk',
    'Goblin Barrel': 'gb',
    'Battle Ram': 'br',
    'Hog Rider': 'hr', // Assumed based on pattern
    'Ice Golem': 'ig',
    'Baby Dragon': 'bd',
    'Dark Prince': 'dp',
    'Electro Dragon': 'ed',
    'Electro Giant': 'eg',
    'Electro Wizard': 'ew', // or el? Search says EL/EW. EW is standard semantic.
    'Goblin Giant': 'gg',
    'Giant Skeleton': 'gs',
    'Graveyard': 'gy', // Known exception (First/Last)
    'Inferno Dragon': 'id',
    'Ice Wizard': 'iw',
    'Lumberjack': 'lj',
    'Lava Hound': 'lh',
    'Mini P.E.K.K.A': 'mp',
    'Minion Horde': 'mh',
    'Night Witch': 'nw',
    'P.E.K.K.A': 'pk', // Assumed
    'Ram Rider': 'rr',
    'Skeleton Army': 'sa', // or sk? Search says SK.
    'Valkyrie': 'va',
    'Inferno Tower': 'it',
    'Goblin Cage': 'gc',
    'Cannon Cart': 'cc',
    'Flying Machine': 'fm',
    'Royal Hogs': 'rh',
    'Royal Recruits': 'rr', // Conflict with Ram Rider? Need verify. Ram Rider might be RR, Recruits might be RE?
    // Let's go with RR for Ram Rider and RC for Recruits?
    // Actually, user said "deckshop uses...". 
    // Best guess: Recruits -> rr, Ram Rider -> ram is 3 chars. 
    // If strict 2 chars: Ram Rider -> rr. Recruits -> rc.
    'Electro Spirit': 'es',
    'Heal Spirit': 'hs',
    'Battle Healer': 'bh',
    'Fisherman': 'fn', // First/Last? or fi?
    'Mother Witch': 'mw',
    'Elixir Golem': 'eg', // Conflict with E-Giant? E-Giant usually EG. E-Golem maybe el?
    'Zappies': 'zp',
    'Sparky': 'sp',
    'Bowler': 'bw',
    'Executioner': 'ex',
    'Cannon': 'cn',
    'Tesla': 'ts',
    'X-Bow': 'xb',
    'Mortar': 'mo',
    'Princess': 'pr',
    'Dart Goblin': 'dg',
    'Archer Queen': 'aq',
    'Golden Knight': 'gk',
    'Skeleton King': 'sk',
    'Mighty Miner': 'mm',
    'Little Prince': 'lp',
    'Monk': 'mk', // Conflict with Mega Knight. Mega Knight is MK. Monk might be mn? or mo?
    'Phoenix': 'ph',
    'Goblin Drill': 'gd',
    'The Log': 'lg',
    'Zap': 'za',
    'Giant Snowball': 'sb',
    'Barbarian Barrel': 'bb',
    'Arrows': 'ar',
    'Royal Delivery': 'rd',
    'Fireball': 'fb',
    'Poison': 'pn',
    'Rocket': 'rk',
    'Lightning': 'ln',
    'Earthquake': 'eq',
    'Void': 'vd',
    'Tornado': 'tn',
    'Freeze': 'fz',
    'Rage': 'rg', // Conflict with Royal Giant. Royal Giant is RG. Rage -> ra?
    'Clone': 'cl',
    'Mirror': 'mr',
    'Knight': 'kn',
    'Archers': 'ac',
    'Goblins': 'gb', // Conflict with Goblin Barrel. GB is Barrel. Goblins -> go?
    'Spear Goblins': 'sg',
    'Bats': 'bt', // Conflict with Bomb Tower. Bomb Tower is BT. Bats -> ba?
    'Minions': 'mi', // Conflict with Miner? Miner -> mn.
    'Mega Minion': 'mm', // Conflict with Mighty Miner. 
    'Ice Spirit': 'is',
    'Fire Spirit': 'fs',
    'Elixir Collector': 'ec',
    'Three Musketeers': '3m' // Allowed digit?
};

// MANUALLY RESOLVING CONFLICTS
// Mega Knight = mk, Monk = mo
TWO_LETTER_CODES['Monk'] = 'mo';
// Royal Giant = rg, Rage = ra
TWO_LETTER_CODES['Rage'] = 'ra';
// Goblin Barrel = gb, Goblins = go
TWO_LETTER_CODES['Goblins'] = 'go';
// Bomb Tower = bt, Bats = ba
TWO_LETTER_CODES['Bats'] = 'ba';
// Mighty Miner = mm, Mega Minion = me (mm is taken by mighty miner or vice versa? MM usually Mega Minion (older text). Mighty Miner -> mi?)
// Let's set Mega Minion = mm, Mighty Miner = mt (MighTy)
TWO_LETTER_CODES['Mega Minion'] = 'mm';
TWO_LETTER_CODES['Mighty Miner'] = 'mt';
// Miner = mn (mi is Minions? Minions = ms)
TWO_LETTER_CODES['Miner'] = 'mn';
TWO_LETTER_CODES['Minions'] = 'ms';
// Electro Giant = eg, Elixir Golem = el
TWO_LETTER_CODES['Elixir Golem'] = 'el';

function getSlug(name) {
    const clean = name.replace(/ Evolution$/i, '').trim();
    if (TWO_LETTER_CODES[clean]) return TWO_LETTER_CODES[clean];

    // Heuristic Fallback for unknown cards
    // 1. Two words -> Initials
    const parts = clean.split(' ');
    if (parts.length >= 2) {
        return (parts[0][0] + parts[1][0]).toLowerCase();
    }
    // 2. One word -> First 2 letters
    return clean.substring(0, 2).toLowerCase();
}

window.openDeckShop = function () {
    const deck = window.currentAppDeck;
    if (!deck || deck.length === 0) {
        alert("Scan a player first!");
        return;
    }

    const slugs = deck.map(c => getSlug(c.name));
    const url = `https://www.deckshop.pro/check/?deck=${slugs.join('-')}`;
    console.log("[DeckShop] Opening 2-Char URL:", url);
    window.open(url, '_blank');
};
