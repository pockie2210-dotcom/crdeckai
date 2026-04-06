
// Helper to generate DeckShop.pro check URLs
// Uses strict 2-letter codes.

const TWO_LETTER_CODES = {
    'Archer Queen': 'aq',
    'Archers': 'ac',
    'Arrows': 'ar',
    'Baby Dragon': 'bd',
    'Balloon': 'bl',
    'Bandit': 'bi', // Verified (implicit, no conflict report)
    'Barbarian Barrel': 'bb',
    'Barbarian Hut': 'bu',
    'Barbarians': 'bs',
    'Bats': 'ba', // Verified (implicit)
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
    'Goblin Curse': 'gr', // Verified
    'Goblin Demolisher': 'ge', // Verified
    'Goblin Drill': 'gd',
    'Goblin Gang': 'gg', // FIXED: User confirmed 'gg' is Goblin Gang
    'Goblin Giant': 'gn', // FIXED: User confirmed 'gn' is Goblin Giant
    'Goblin Hut': 'gh',
    'Goblin Machine': 'ga', // Verified
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
    'Mega Minion': 'mm', // Verified Correct
    'Mighty Miner': 'me', // FIXED: User confirmed 'me' is Mighty Miner
    'Miner': 'mn', // FIXED: User confirmed 'mn' is Miner
    'Mini P.E.K.K.A': 'mp',
    'Minion Horde': 'mh',
    'Minions': 'mi', // FIXED: User confirmed 'mi' is Minions
    'Mirror': 'mr',
    'Monk': 'mc', // FIXED: User confirmed 'mc' is Monk
    'Mortar': 'mo', // Verified Correct
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
    'Suspicious Bush': 'yb', // Verified
    'Tesla': 'te',
    'The Log': 'lo', // Verified Correct
    'Three Musketeers': '3m',
    'Tombstone': 'ts', // Verified Correct
    'Tornado': 'to', // Verified Correct
    'Valkyrie': 'va',
    'Void': 'vd',
    'Wall Breakers': 'wb',
    'Witch': 'wi',
    'Wizard': 'wd',
    'X-Bow': 'xb', // Verified Correct
    'Zap': 'za',
    'Zappies': 'zp',
};

function getSlug(name) {
    const clean = name.replace(/ Evolution$/i, '').trim();
    if (TWO_LETTER_CODES[clean]) return TWO_LETTER_CODES[clean];

    // Fallback shouldn't strictly be needed if map is complete,
    // but keeps robustness.
    const parts = clean.split(' ');
    if (parts.length >= 2) {
        return (parts[0][0] + parts[1][0]).toLowerCase();
    }
    return clean.substring(0, 2).toLowerCase();
}

window.openDeckShop = function () {
    const deck = window.builderDeck || window.currentAppDeck;
    if (!deck || deck.length === 0) {
        alert("Scan a player first!");
        return;
    }

    const slugs = deck.map(c => getSlug(c.name));

    // Format: deck1=codecodecode... (concatenated 2-letter codes)
    const codeString = slugs.join('');

    // Using 'deck1' parameter as observed in user requests
    const url = `https://www.deckshop.pro/deck-builder/clan-wars/build?e=2&h=1&deck1=${codeString}`;

    console.log("[DeckShop] Generated:", url);
    window.open(url, '_blank');
};
