
const fs = require('fs');
const path = require('path');

// --- MOCK BROWSER ENVIRONMENT (No JSDOM) ---
const windowMock = {};
global.window = windowMock;

// Mock META_QUALITY for getMetaScore
global.window.META_QUALITY = {
    'Hog Rider': 85,
    'Cannon': 80,
    'Musketeer': 80,
    'Ice Golem': 85,
    'Skeletons': 90,
    'Ice Spirit': 90,
    'The Log': 95,
    'Fireball': 90,
    'Knight': 88,
    'Ice Wizard': 82,
    'Tornado': 90,
    'Balloon': 85,
    'Lava Hound': 80,
    'default': 70
};

// --- LOAD FILES ---
try {
    const metaDecksPath = path.join(__dirname, 'frontend/meta_decks.js');
    const metaDecksContent = fs.readFileSync(metaDecksPath, 'utf8');
    // Basic Eval
    eval(metaDecksContent);
    console.log(`✅ Loaded ${window.META_DECKS.length} Meta Decks.`);

    const smartAiPath = path.join(__dirname, 'frontend/smart_ai.js');
    const smartAiContent = fs.readFileSync(smartAiPath, 'utf8');
    eval(smartAiContent);

    if (window.SmartAI) {
        console.log(`✅ Loaded SmartAI.`);
    } else {
        throw new Error("SmartAI not found on window object.");
    }

} catch (error) {
    console.error("❌ ERROR LOADING SCRIPTS:", error);
    process.exit(1);
}

// --- TEST SCENARIO: 2.6 Hog Completion ---
const deck26 = [
    { name: "Hog Rider", elixirCost: 4, type: "Troop" },
    { name: "Cannon", elixirCost: 3, type: "Building" },
    { name: "Musketeer", elixirCost: 4, type: "Troop" },
    { name: "Skeletons", elixirCost: 1, type: "Troop" },
    { name: "Ice Spirit", elixirCost: 1, type: "Troop" },
    { name: "The Log", elixirCost: 2, type: "Spell" },
    { name: "Fireball", elixirCost: 4, type: "Spell" },
    { name: "Knight", elixirCost: 3, type: "Troop" } // The "Imposter"
];

const cardToAdd = { name: "Ice Golem", elixirCost: 2, type: "Troop" }; // The missing piece

console.log("\n--- RUNNING RECOMMENDATION ---");

try {
    const recommendation = window.SmartAI.recommendSwap(deck26, cardToAdd);

    console.log("Recommended Removal:", recommendation.remove ? recommendation.remove.name : "NONE");
    console.log("Reason:", recommendation.reason);

    let success = true;

    // 1. Check Removal Target
    if (recommendation.remove && recommendation.remove.name === "Knight") {
        console.log("✅ SUCCESS: AI correctly recommended removing the non-meta card (Knight).");
    } else {
        console.log("❌ FAILURE: AI removed " + (recommendation.remove ? recommendation.remove.name : "Nothing"));
        success = false;
    }

    // 2. Check Reason text
    if (recommendation.reason && (recommendation.reason.includes("complete") || recommendation.reason.includes("2.6 Hog Cycle"))) {
        console.log("✅ SUCCESS: Reason mentions meta deck completion.");
    } else {
        console.log("❌ FAILURE: Reason is generic: " + recommendation.reason);
        success = false;
    }

    if (!success) process.exit(1);

} catch (e) {
    console.error("❌ RUNTIME ERROR:", e);
    process.exit(1);
}
