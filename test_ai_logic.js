
// MOCK BROWSER ENV
global.window = {};

// MOCK DATA (Simplified)
const META = { 'Wall Breakers': 80, 'Miner': 80, 'Archers': 60, 'Spear Goblins': 50, 'Skeletons': 50 };
function getMetaScore(n) { return META[n] || 50; }

function getCardRole(name) {
    const r = [];
    if (['Wall Breakers', 'Miner'].includes(name)) r.push('winCon');
    if (['Archers'].includes(name)) r.push('airCounter');
    return r;
}

// MOCK DECK
const deck = [
    { name: 'Miner', elixirCost: 3 },
    { name: 'Wall Breakers', elixirCost: 2 },
    { name: 'Spear Goblins', elixirCost: 2 },
    { name: 'Skeletons', elixirCost: 1 }
];
const cardToAdd = { name: 'Archers', elixirCost: 3 };
const rolesToAdd = getCardRole(cardToAdd.name);
const captain = deck[0]; // Miner

console.log("--- TEST START ---");

// LOGIC UNDER TEST
let candidates = deck.filter(c => {
    const r = getCardRole(c.name);

    if (c.name === captain.name) {
        console.log("KEEP_CAPTAIN: " + c.name);
        return false;
    }

    if (r.includes('winCon') && !rolesToAdd.includes('winCon')) {
        console.log("KEEP_WINCON: " + c.name);
        return false;
    }
    return true;
});

// RANKING
candidates.sort((a, b) => getMetaScore(a.name) - getMetaScore(b.name));
console.log("SUGGESTED_CUT: " + (candidates[0] ? candidates[0].name : "NONE"));
