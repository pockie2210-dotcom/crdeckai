// Helper to generate DeckShop.pro check URLs
// Uses widely accepted community abbreviations for 2-3 char slugs.

const DECKSHOP_SLUGS = {
    // --- KNOWN ABBREVIATIONS ---
    'Wall Breakers': 'wb',
    'Bomb Tower': 'bt',
    'Royal Giant': 'rg',
    'Magic Archer': 'ma',
    'Mega Knight': 'mk',
    'Goblin Barrel': 'gb',
    'Battle Ram': 'ram',
    'Hog Rider': 'hog',
    'Ice Golem': 'ig',
    'Baby Dragon': 'bd',
    'Dark Prince': 'dp',
    'Electro Dragon': 'edrag',
    'Electro Giant': 'egiant',
    'Electro Wizard': 'ewiz',
    'Goblin Giant': 'gg',
    'Giant Skeleton': 'gs',
    'Graveyard': 'gy',
    'Inferno Dragon': 'id',
    'Ice Wizard': 'icewiz',
    'Lumberjack': 'lj',
    'Lava Hound': 'lh',
    'Mini P.E.K.K.A': 'mp',
    'Minion Horde': 'mh',
    'Night Witch': 'nw',
    'P.E.K.K.A': 'pekka',
    'Ram Rider': 'rr',
    'Skeleton Army': 'skarmy',
    'Valkyrie': 'valk',
    'Inferno Tower': 'it',
    'Goblin Cage': 'cage',
    'Cannon Cart': 'cc',
    'Flying Machine': 'fm',
    'Royal Hogs': 'hogs',
    'Royal Recruits': 'recruits',
    'Electro Spirit': 'espirit',
    'Heal Spirit': 'healspirit',
    'Battle Healer': 'healer',
    'Fisherman': 'fish',
    'Mother Witch': 'mw',
    'Elixir Golem': 'egolem',
    'Zappies': 'zappies',
    'Sparky': 'sparky',
    'Bowler': 'bowler',
    'Executioner': 'exe',
    'Cannon': 'cannon',
    'Tesla': 'tesla',
    'X-Bow': 'xbow',
    'Mortar': 'mortar',
    'Princess': 'princess',
    'Dart Goblin': 'dg',
    'Archer Queen': 'aq',
    'Golden Knight': 'gk',
    'Skeleton King': 'sk',
    'Mighty Miner': 'mm',
    'Little Prince': 'lp',
    'Monk': 'monk',
    'Phoenix': 'phoenix',
    'Goblin Drill': 'drill',

    // --- SPELLS ---
    'The Log': 'log',
    'Zap': 'zap',
    'Giant Snowball': 'snowball',
    'Barbarian Barrel': 'barb-barrel',
    'Arrows': 'arrows',
    'Royal Delivery': 'delivery',
    'Fireball': 'fireball',
    'Poison': 'poison',
    'Rocket': 'rocket',
    'Lightning': 'lightning',
    'Earthquake': 'eq',
    'Void': 'void',
    'Tornado': 'tornado',
    'Freeze': 'freeze',
    'Rage': 'rage',
    'Clone': 'clone',
    'Mirror': 'mirror',

    // --- TROOPS (Fallbacks if no shortcode known) ---
    'Knight': 'knight',
    'Archers': 'archers',
    'Goblins': 'goblins',
    'Spear Goblins': 'spear-goblins',
    'Bats': 'bats',
    'Minions': 'minions',
    'Mega Minion': 'mega-minion',
    'Ice Spirit': 'ice-spirit',
    'Fire Spirit': 'fire-spirit',
    'Elixir Collector': 'elixir-collector',
    'Three Musketeers': '3m'
};

function getSlug(name) {
    // 1. Normalize name (Strip Evolution)
    const clean = name.replace(/ Evolution$/i, '').trim();

    // 2. Check override map
    if (DECKSHOP_SLUGS[clean]) return DECKSHOP_SLUGS[clean];

    // 3. Fallback: Lowercase, replace space with hyphen, remove dots
    // e.g. "Mega Knight" -> "mega-knight"
    return clean.toLowerCase()
        .replace(/\./g, '')
        .replace(/\s+/g, '-');
}

window.openDeckShop = function () {
    const deck = window.currentAppDeck;
    if (!deck || deck.length === 0) {
        alert("Scan a player first!");
        return;
    }

    const slugs = deck.map(c => getSlug(c.name));

    // Construct URL
    const url = `https://www.deckshop.pro/check/?deck=${slugs.join('-')}`;
    console.log("[DeckShop] Opening:", url);
    window.open(url, '_blank');
};
