// Helper to generate DeckShop.pro check URLs
// Based on "Best Guess" slugs.

const DECKSHOP_SLUGS = {
    'The Log': 'log',
    'P.E.K.K.A': 'pekka',
    'Mini P.E.K.K.A': 'mini-pekka',
    'X-Bow': 'x-bow',
    'Royal Recruits': 'royal-recruits',
    'Skeleton Army': 'skarmy',
    'Three Musketeers': '3m', // or three-musketeers
    'Goblin Giant': 'goblin-giant',
    'Electro Giant': 'electro-giant',
    'Battle Healer': 'battle-healer',
    'Elixir Golem': 'elixir-golem',
    'Royal Hogs': 'royal-hogs',
    'Wall Breakers': 'wall-breakers',
    'Knight': 'knight',
    'Archers': 'archers',
    'Goblins': 'goblins',
    'Spear Goblins': 'spear-goblins',
    'Bats': 'bats',
    'Minions': 'minions',
    'Minion Horde': 'minion-horde',
    'Mega Minion': 'mega-minion',
    'Ice Spirit': 'ice-spirit',
    'Electro Spirit': 'electro-spirit',
    'Fire Spirit': 'fire-spirit',
    'Heal Spirit': 'heal-spirit',
    'Ice Golem': 'ice-golem',
    'Elixir Collector': 'elixir-collector',
    'Rocket': 'rocket',
    'Lightning': 'lightning',
    'Fireball': 'fireball',
    'Poison': 'poison',
    'Zap': 'zap',
    'Giant Snowball': 'snowball', // "Snowball" or "Giant Snowball"? usually snowball
    'Barbarian Barrel': 'barb-barrel', // often short
    'Arrows': 'arrows',
    'Clone': 'clone',
    'Mirror': 'mirror',
    'Tornado': 'tornado',
    'Rage': 'rage',
    'Freeze': 'freeze',
    'Earthquake': 'earthquake',
    'Void': 'void'
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

    // Sort deck by elixir cost? Deckshop doesn't care order usually.
    const slugs = deck.map(c => getSlug(c.name));

    // Construct URL
    const url = `https://www.deckshop.pro/check/?deck=${slugs.join('-')}`;
    console.log("[DeckShop] Opening:", url);
    window.open(url, '_blank');
};
