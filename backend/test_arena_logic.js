
// Mock Window
global.window = {};

// Helper Logic from SimpleDeckBuilder (Copied for testing)
const Logic = {
    getArenaMetrics: function (playerData) {
        let arenaNum = 1;

        if (playerData) {
            if (playerData.arena && playerData.arena.name) {
                const name = playerData.arena.name;

                // Check Special Arenas FIRST
                if (name.includes("Ultimate Champion")) arenaNum = 30;
                else if (name.includes("Royal Champion")) arenaNum = 28; // > 25
                else if (name.includes("Grand Champion")) arenaNum = 26; // > 25
                else if (name.includes("Champion")) arenaNum = 24;
                else if (name.includes("Master")) arenaNum = 22;
                else if (name.includes("Challenger")) arenaNum = 20;
                else if (name.includes("Legendary")) arenaNum = 15;
                else if (name.includes("Arena")) {
                    const match = name.match(/Arena\s+(\d+)/);
                    if (match) arenaNum = parseInt(match[1]);
                }
            } else if (playerData.trophies) {
                const t = playerData.trophies;
                if (t > 7500) arenaNum = 30; // UC
                else if (t > 6500) arenaNum = 25; // Royal Champ range
                else if (t > 5000) arenaNum = 15;
                else if (t > 3000) arenaNum = 10;
                else if (t > 1000) arenaNum = 5;
            }
        }

        // 1. Evos: Arena 1-2 (0), 3-9 (1), 10+ (2)
        let maxEvos = 0;
        if (arenaNum >= 10) maxEvos = 2;
        else if (arenaNum >= 3) maxEvos = 1;

        // 2. Heroes: Arena 1-14 (0), 15-24 (1), 25+ (2)
        let maxHeroes = 0;
        if (arenaNum >= 25) maxHeroes = 2;
        else if (arenaNum >= 15) maxHeroes = 1;

        return { maxEvos, maxHeroes, arenaNum };
    },

    prioritizeEvolutions: function (deck, maxEvos) {
        deck.forEach(c => { if (c) c.evolutionLevel = 0; });
        if (maxEvos === 0) return;

        const candidates = deck.filter(c => c && c.iconUrls && c.iconUrls.evolutionMedium);

        candidates.forEach(c => {
            c.evoScore = 10;
            // Mock Win Conditions list
            const WC = ['Royal Giant', 'Hog Rider'];
            if (WC.includes(c.name)) c.evoScore += 100;
            if (['Knight', 'Bomber', 'Skeletons'].includes(c.name)) c.evoScore += 50;
        });

        candidates.sort((a, b) => b.evoScore - a.evoScore);

        for (let i = 0; i < Math.min(candidates.length, maxEvos); i++) {
            candidates[i].evolutionLevel = 1;
        }
    }
};

// TESTS
console.log("--- Testing Arena Metrics ---");
const arenaTests = [
    { name: 'Arena 1', data: { arena: { name: 'Arena 1' } }, expEvos: 0, expHeroes: 0 },
    { name: 'Arena 5', data: { arena: { name: 'Arena 5' } }, expEvos: 1, expHeroes: 0 },
    { name: 'Legendary (15)', data: { arena: { name: 'Legendary Arena' } }, expEvos: 2, expHeroes: 1 },
    { name: 'Ultimate Champion', data: { arena: { name: 'Ultimate Champion' } }, expEvos: 2, expHeroes: 1 }, // Wait, UC is > 25?
    // "Arena 25+" is unlikely to be named "Arena 25". Trophies likely used or "Ultimate Champion" treated as high.
    // In my logic: Challenger/Master/Champion/UC -> 20. So maxHeroes = 1.
    // User said: "25+ 2 heroes". 
    // UC is league 10. Trophies 9000. 
    // If I want 2 heroes for UC, I need to bump the arenaNum for UC to 30.
    { name: 'Trophies 200 (Arena 1)', data: { trophies: 200 }, expEvos: 0, expHeroes: 0 },
    { name: 'Trophies 6000 (Arena 15+)', data: { trophies: 6000 }, expEvos: 2, expHeroes: 1 }
];

let fail = false;
arenaTests.forEach(t => {
    const res = Logic.getArenaMetrics(t.data);
    if (res.maxEvos !== t.expEvos || res.maxHeroes !== t.expHeroes) {
        console.error(`❌ ${t.name}: Expected Evos=${t.expEvos}, Heroes=${t.expHeroes}. Got Evos=${res.maxEvos}, Heroes=${res.maxHeroes} (Arena ${res.arenaNum})`);
        fail = true;
    } else {
        console.log(`✅ ${t.name}: Evos=${res.maxEvos}, Heroes=${res.maxHeroes}`);
    }
});

console.log("\n--- Testing Evo Priority ---");
// Mock Cards
const rg = { name: 'Royal Giant', iconUrls: { evolutionMedium: 'url' } };
const knight = { name: 'Knight', iconUrls: { evolutionMedium: 'url' } };
const skels = { name: 'Skeletons', iconUrls: { evolutionMedium: 'url' } };
const spirit = { name: 'Ice Spirit', iconUrls: { evolutionMedium: 'url' } }; // Low priority

// Case 1: Max 1 Evo. Win Con (RG) should win.
let deck1 = [rg, knight, skels, spirit];
Logic.prioritizeEvolutions(deck1, 1);
if (rg.evolutionLevel !== 1 || knight.evolutionLevel !== 0) { console.error("❌ Priority 1 Failed: RG should be evo"); fail = true; }
else console.log("✅ Priority 1 (Win Con) Passed");

// Case 2: Max 1 Evo. No Win Con. Knight (Key Support) should win over Spirit.
let deck2 = [knight, spirit];
Logic.prioritizeEvolutions(deck2, 1);
if (knight.evolutionLevel !== 1 || spirit.evolutionLevel !== 0) { console.error("❌ Priority 2 Failed: Knight should be evo"); fail = true; }
else console.log("✅ Priority 2 (Key Support) Passed");

// Case 3: Max 2 Evos. RG and Knight should be evos.
let deck3 = [rg, knight, skels];
Logic.prioritizeEvolutions(deck3, 2);
if (rg.evolutionLevel !== 1 || knight.evolutionLevel !== 1 || skels.evolutionLevel !== 0) { console.error("❌ Priority 3 Failed: RG+Knight should be evo"); fail = true; }
else console.log("✅ Priority 3 (Multi) Passed");

if (fail) process.exit(1);
