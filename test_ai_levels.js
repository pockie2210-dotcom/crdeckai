
// MOCK BROWSER ENV
global.window = {};

// MOCK DATA
// Mock getMetaScore to return equal values so ONLY Level breaks the tie
const META = { 'Musketeer': 70, 'Wizard': 70, 'Hog Rider': 80 };
function getMetaScore(n) { return META[n] || 50; }

function getCardRole(name) {
    if (name === 'Hog Rider') return ['winCon'];
    return ['airCounter'];
}

function normalizeLevel(card) {
    return card.level || 9;
}

// MOCK SYNERGY (Empty for this test to isolate Levels)
const SYNERGY_MAP = {};
const SYNERGIES = [];

// MOCK DECK
// We have a Level 9 Musketeer and a Level 14 Wizard.
// Both are Air Counters with same Meta Score (70).
const deck = [
    { name: 'Hog Rider', level: 14 }, // Captain
    { name: 'Musketeer', level: 9 },  // LOW LEVEL - Should be cut
    { name: 'Wizard', level: 14 },    // HIGH LEVEL - Should be kept
    { name: 'Skeletons', level: 14 }
];

const cardToAdd = { name: 'Executioner', level: 11 }; // Adding another Air Counter
const rolesToAdd = ['airCounter'];
const captain = deck[0];

console.log("--- LEVEL TEST ---");

// LOGIC UNDER TEST (Simplified Paste from smart_ai.js V7)
let candidates = deck.filter(c => {
    // Basic guards
    if (c.name === captain.name) return false;
    return true;
});

// THE NEW SORTING LOGIC
candidates.sort((a, b) => {
    let scoreA = getMetaScore(a.name);
    let scoreB = getMetaScore(b.name);

    // LEVEL AWARENESS (The feature we are testing)
    const levelA = normalizeLevel(a);
    const levelB = normalizeLevel(b);
    scoreA += (levelA * 5);
    scoreB += (levelB * 5);

    // ASCENDING: Lowest score is removed first
    return scoreA - scoreB;
});

const remove = candidates[0];

console.log(`Lvl 9 Musketeer Score: ${(70 + 9 * 5)}`);
console.log(`Lvl 14 Wizard Score:   ${(70 + 14 * 5)}`);
console.log(`SUGGESTED CUT: ${remove.name} (Lvl ${remove.level})`);

if (remove.name === 'Musketeer') console.log("PASS: AI removed low level card.");
else console.log("FAIL: AI removed high level card!");
