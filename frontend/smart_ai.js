// Smart AI: The "Pro Player" Logic
// This module upgrades the AI from "Random Good Cards" to "Synergy-Based Builder".

const SmartAI = (() => {

    // --- 1. THE BRAIN: SYNERGY MAP ---
    // "If you play X, you MUST play Y and Z."
    const SYNERGY_MAP = {
        'Hog Rider': {
            mustHave: ['Cannon', 'Musketeer', 'Ice Spirit', 'Skeletons'], // 2.6 Core
            alternates: ['Earthquake', 'Firecracker', 'Valkyrie', 'Tesla'], // EQ Version
            archetype: 'Cycle'
        },
        'Golem': {
            mustHave: ['Night Witch', 'Lumberjack', 'Tornado'],
            alternates: ['Baby Dragon', 'Mega Minion', 'Lightning', 'Barbarian Barrel', 'Electro Dragon'],
            archetype: 'Beatdown'
        },
        'Graveyard': {
            mustHave: ['Poison', 'Tornado', 'Ice Wizard'], // Splashyard Core
            alternates: ['Baby Dragon', 'Knight', 'Barbarian Barrel', 'Tombstone', 'Bowler'],
            archetype: 'Control'
        },
        'Lava Hound': {
            mustHave: ['Balloon', 'Mega Minion'],
            alternates: ['Minions', 'Barbarians', 'Fireball', 'Zap', 'Inferno Dragon'],
            archetype: 'Beatdown'
        },
        'Goblin Barrel': {
            mustHave: ['Princess', 'Goblin Gang'], // Log Bait
            alternates: ['Knight', 'Inferno Tower', 'Rocket', 'Ice Spirit', 'The Log'],
            archetype: 'Bait'
        },
        'X-Bow': {
            mustHave: ['Tesla', 'Archers'],
            alternates: ['Knight', 'The Log', 'Fireball', 'Skeletons', 'Ice Spirit'],
            archetype: 'Siege'
        },
        'Miner': {
            mustHave: ['Poison', 'Wall Breakers'],
            alternates: ['Magic Archer', 'Tornado', 'Bomb Tower', 'Valkyrie', 'Spear Goblins'],
            archetype: 'Control'
        },
        'Royal Giant': {
            mustHave: ['Fisherman', 'Hunter'],
            alternates: ['Electro Spirit', 'The Log', 'Fireball', 'Skeletons', 'Royal Ghost'],
            archetype: 'Beatdown'
        },
        'Electro Giant': {
            mustHave: ['Tornado', 'Lightning'],
            alternates: ['Golden Knight', 'Cannon', 'Bomber', 'Phoenix'],
            archetype: 'Beatdown'
        },
        'Balloon': {
            mustHave: ['Lava Hound'], // Often pairs with Lava
            alternates: ['Lumberjack', 'Freeze', 'Miner'], // Loon Cycle
            archetype: 'Beatdown'
        },
        'Giant': {
            mustHave: ['Price', 'Dark Prince'], // Double Prince
            alternates: ['Mega Minion', 'Electro Wizard', 'Miner', 'Zap'],
            archetype: 'Beatdown'
        },
        'Goblin Drill': {
            mustHave: ['Wall Breakers', 'Bomber'],
            alternates: ['Fireball', 'Tesla', 'Knight', 'Skeletons'],
            archetype: 'Cycle'
        },
        'P.E.K.K.A': {
            mustHave: ['Battle Ram', 'Poison'],
            alternates: ['Bandit', 'Royal Ghost', 'Electro Wizard', 'Magic Archer', 'Zap'],
            archetype: 'BridgeSpam'
        },
        'Mega Knight': {
            mustHave: ['Wall Breakers', 'Miner'], // MK Bait
            alternates: ['Zap_Bait_Cards', 'Inferno Dragon', 'Bats'],
            archetype: 'BridgeSpam'
        },
        'Mortar': {
            mustHave: ['Skeleton King', 'Miner'], // Modern Mortar
            alternates: ['Cannon Cart', 'Spear Goblins', 'Fireball', 'The Log'],
            archetype: 'Siege'
        }
    };

    // --- 2. GENERATION LOGIC ---

    function optimize(partialDeck, fullCollection) {
        console.log("🧠 SmartAI: Thinking...");

        // A. IDENTIFY CAPTAIN (The most expensive/defining Win Condition)
        let captain = identifyCaptain(partialDeck);
        if (!captain) {
            // If no captain, pick one from the partial deck or default to Hog if empty??
            // Ideally, we shouldn't be here if deck is empty, but let's handle it.
            if (partialDeck.length > 0) captain = partialDeck[0];
        }

        console.log("🧠 SmartAI: Captain is", captain ? captain.name : "Unknown");

        // B. SYNERGY FILL
        let smartDeck = [...partialDeck];
        const deckNames = new Set(smartDeck.map(c => c.name));

        if (captain && SYNERGY_MAP[captain.name]) {
            const synergy = SYNERGY_MAP[captain.name];
            console.log("🧠 SmartAI: Found Synergy Data", synergy);

            // 1. Add Must-Haves
            for (const name of synergy.mustHave) {
                if (smartDeck.length >= 8) break;
                if (!deckNames.has(name)) {
                    const card = findCard(name, fullCollection);
                    if (card) {
                        smartDeck.push(card);
                        deckNames.add(name);
                    }
                }
            }

            // 2. Add Alternates if space remains
            for (const name of synergy.alternates) {
                if (smartDeck.length >= 8) break;
                // 50% chance to add alternate to add variety, OR if we really need slots filled
                if (!deckNames.has(name) && (Math.random() > 0.3 || smartDeck.length < 4)) {
                    const card = findCard(name, fullCollection);
                    if (card) {
                        smartDeck.push(card);
                        deckNames.add(name);
                    }
                }
            }
        }

        // C. ROLE FILL (The "Safe" Logic)
        // Ensure 1 Small Spell, 1 Big Spell, 1 Mini Tank/Building
        // We use the existing meta pool or collection to find these if missing.

        fillRole(smartDeck, deckNames, 'spellSmall', ['The Log', 'Zap', 'Barbarian Barrel', 'Arrows', 'Giant Snowball'], fullCollection);
        fillRole(smartDeck, deckNames, 'spellBig', ['Fireball', 'Poison', 'Rocket', 'Lightning', 'Earthquake'], fullCollection);

        // Only force building/miniTank if not Beatdown (Beatdown often ignores them for more offense)
        const isBeatdown = captain && SYNERGY_MAP[captain.name]?.archetype === 'Beatdown';
        if (!isBeatdown) {
            fillRole(smartDeck, deckNames, 'building', ['Cannon', 'Tesla', 'Inferno Tower', 'Bomb Tower', 'Tombstone'], fullCollection);
        }

        // D. FINAL FILL
        // If still < 8 cards, fill with "Good Cards" that fit the curve.
        fillRemaining(smartDeck, deckNames, fullCollection);

        return smartDeck;
    }

    // --- HELPERS ---

    function identifyCaptain(deck) {
        // Find the "biggest" win condition
        // Priority: Golem > Lava > Giant > Hog > Miner
        const winCons = deck.filter(c => getCardRole(c.name).includes('winCon'));
        if (winCons.length === 0) return null;

        // Sort by elixir cost descending (usually identifies the main tank)
        winCons.sort((a, b) => b.elixirCost - a.elixirCost);
        return winCons[0];
    }

    function findCard(name, collection) {
        // Try strict match first
        let c = collection.find(x => x.name === name);
        if (c) return c;

        // Try loose match
        c = collection.find(x => x.name.includes(name));
        return c;
    }

    function fillRole(deck, deckNames, roleTag, candidates, collection) {
        if (deck.length >= 8) return;

        // Check if role exists
        const hasRole = deck.some(c => getCardRole(c.name).includes(roleTag));
        if (hasRole) return;

        // Try to find a candidate
        for (const name of candidates) {
            if (!deckNames.has(name)) {
                const card = findCard(name, collection);
                if (card) {
                    deck.push(card);
                    deckNames.add(name);
                    return; // Filled one, stop.
                }
            }
        }
    }

    function fillRemaining(deck, deckNames, collection) {
        // Sort collection by Meta Quality
        const sorted = [...collection].sort((a, b) => (META_QUALITY[b.name] || 0) - (META_QUALITY[a.name] || 0));

        for (const card of sorted) {
            if (deck.length >= 8) break;
            if (!deckNames.has(card.name)) {
                // Don't add multiple buildings or too many spells?
                // For now, just fill.
                deck.push(card);
                deckNames.add(card.name);
            }
        }
    }

    // Reuse the Global getCardRole from index.html (We assume it's available or we duplicate it?)
    // Ideally we duplicate a simplified version to be safe, or we attach this to window after load.
    // For safety, let's use a robust lookup here or assume the global exists. 
    // Since this is a module, let's assume `window.getCardRole` works or we define a proxy.
    function getCardRole(name) {
        if (window.getCardRole) return window.getCardRole(name);
        return [];
    }

    // Access global META_QUALITY
    function getMetaScore(name) {
        if (window.META_QUALITY) return window.META_QUALITY[name] || 50;
        return 50;
    }


    return {
        optimize: optimize,
        SYNERGY_MAP: SYNERGY_MAP,

        generateCoachNotes: function (deck) {
            const notes = [];

            // 1. Spell Check
            const smallSpells = deck.filter(c => ['The Log', 'Zap', 'Giant Snowball', 'Arrows', 'Barbarian Barrel', 'Tornado', 'Rage', 'Royal Delivery'].includes(c.name));
            const bigSpells = deck.filter(c => ['Fireball', 'Poison', 'Rocket', 'Lightning', 'Earthquake', 'Void'].includes(c.name));

            if (smallSpells.length === 0) notes.push("⚠️ Missing a Small Spell (Log, Zap, etc) for swarms.");
            if (bigSpells.length === 0) notes.push("⚠️ Missing a Big Spell (Fireball, Poison) to finish towers.");
            if (smallSpells.length + bigSpells.length > 3) notes.push("💡 You have many spells. Consider swapping one for a troop.");

            // 2. Cycle Check
            const avg = deck.reduce((a, b) => a + (b.elixirCost || 3), 0) / 8;
            const winCon = identifyCaptain(deck);
            if (winCon) {
                if (['Hog Rider', 'Miner', 'Wall Breakers', 'Goblin Drill', 'Goblin Barrel'].includes(winCon.name)) {
                    if (avg > 3.6) notes.push(`💡 Your ${winCon.name} deck is heavy (${avg.toFixed(1)}). Try to lower it for faster cycle.`);
                }
                if (['Golem', 'Lava Hound', 'Electro Giant'].includes(winCon.name)) {
                    if (avg < 3.5) notes.push(`💡 Your Beatdown deck is quite light (${avg.toFixed(1)}). Ensure you have enough support punch.`);
                }
            } else {
                notes.push("❌ No clear Win Condition found.");
            }

            // 3. Air Check
            const airCounters = deck.filter(c => ['Musketeer', 'Wizard', 'Executioner', 'Hunter', 'Electro Wizard', 'Witch', 'Firecracker', 'Phoenix', 'Archer Queen', 'Little Prince', 'Minions', 'Bats', 'Dart Goblin'].includes(c.name));
            if (airCounters.length < 2) notes.push("⚠️ Weak Anti-Air. Add a Musketeer or Hunter.");

            // 4. Positive Reinforcement
            if (notes.length === 0) {
                notes.push("✅ Solid Balance! Spells and Cycle look good.");
                notes.push("🔥 Ready for the Arena.");
            }

            return notes;
        }
    };

})();
window.SmartAI = SmartAI;
