// SmartAI: The "Pro Player" Logic
// This module upgrades the AI from "Random Good Cards" to "Synergy-Based Builder".

const SmartAI = (() => {

    // --- 1. THE BRAIN: SYNERGY MAP ---
    // "If you play X, you MUST play Y and Z."
    const SYNERGY_MAP = {
        'Hog Rider': {
            mustHave: ['Cannon', 'Musketeer', 'Ice Spirit', 'Skeletons', 'The Log'], // 2.6 Coreish
            alternates: ['Earthquake', 'Firecracker', 'Valkyrie', 'Tesla', 'Mighty Miner'],
            archetype: 'Cycle',
            advice: "Hog Rider needs a fast cycle to outpace counters. Keep pressure up!"
        },
        'Golem': {
            mustHave: ['Night Witch', 'Lumberjack', 'Tornado'],
            alternates: ['Baby Dragon', 'Mega Minion', 'Lightning', 'Barbarian Barrel', 'Electro Dragon', 'Elixir Collector'],
            archetype: 'Beatdown',
            advice: "Golem is a Beatdown deck. Sacrifice tower health to build a massive push in double elixir."
        },
        'Graveyard': {
            mustHave: ['Poison', 'Tornado', 'Ice Wizard', 'Baby Dragon'], // Splashyard Core
            alternates: ['Knight', 'Barbarian Barrel', 'Tombstone', 'Bowler', 'Skeleton King'],
            archetype: 'Control',
            advice: "Graveyard relies on counter-attacks. Tank for the Graveyard with a Knight or Baby Dragon."
        },
        'Lava Hound': {
            mustHave: ['Balloon', 'Mega Minion'],
            alternates: ['Minions', 'Barbarians', 'Fireball', 'Zap', 'Inferno Dragon', 'Skeleton Dragons'],
            archetype: 'Beatdown',
            advice: "LavaLoon dominates the air. Bait out their air counters before committing to the full push."
        },
        'Goblin Barrel': {
            mustHave: ['Princess', 'Goblin Gang', 'The Log', 'Rocket'], // Log Bait
            alternates: ['Knight', 'Inferno Tower', 'Ice Spirit', 'Valkyrie', 'Guards'],
            archetype: 'Bait',
            advice: "Log Bait is about chip damage. Force them to use their Log on Princess/Gang, then punish with Barrel."
        },
        'X-Bow': {
            mustHave: ['Tesla', 'Archers', 'The Log'],
            alternates: ['Knight', 'Fireball', 'Skeletons', 'Ice Spirit', 'Electro Spirit'],
            archetype: 'Siege',
            advice: "Protect the X-Bow at all costs. Use Tesla to defend it and cycle spells if you can't break through."
        },
        'Miner': {
            mustHave: ['Poison', 'Wall Breakers'],
            alternates: ['Magic Archer', 'Tornado', 'Bomb Tower', 'Valkyrie', 'Spear Goblins', 'Marcher'],
            archetype: 'Control',
            advice: "Miner Control is about chip damage and sturdy defense. Use Miner to snipe support troops too."
        },
        'Royal Giant': {
            mustHave: ['Fisherman', 'Hunter'],
            alternates: ['Electro Spirit', 'The Log', 'Fireball', 'Skeletons', 'Royal Ghost', 'Lightning'],
            archetype: 'Beatdown',
            advice: "RG + Fisherman is a deadly combo. Pull their tank killers (PEKKA/Mini PEKKA) away from your RG."
        },
        'Electro Giant': {
            mustHave: ['Tornado', 'Lightning'],
            alternates: ['Golden Knight', 'Cannon', 'Bomber', 'Phoenix', 'Bowler'],
            archetype: 'Beatdown',
            advice: "E-Giant + Tornado reflects massive damage. Pull their ranged troops into his Zap radius."
        },
        'Balloon': {
            mustHave: ['Lava Hound'], // Often pairs with Lava
            alternates: ['Lumberjack', 'Freeze', 'Miner', 'Snowball'], // Loon Cycle
            archetype: 'Beatdown',
            advice: "Balloon is a secondary win condition here. Wait for the Lava Hound to tank the tower shots."
        },
        'Giant': {
            mustHave: ['Prince', 'Dark Prince'], // Double Prince
            alternates: ['Mega Minion', 'Electro Wizard', 'Miner', 'Zap', 'Phoenix'],
            archetype: 'Beatdown',
            advice: "Giant Double Prince creates immense pressure. Charge both princes behind the Giant."
        },
        'Goblin Drill': {
            mustHave: ['Wall Breakers', 'Bomber'],
            alternates: ['Fireball', 'Tesla', 'Knight', 'Skeletons', 'Magic Archer'],
            archetype: 'Cycle',
            advice: "Drill applies constant pressure. Use Wall Breakers on the other lane to split their focus."
        },
        'P.E.K.K.A': {
            mustHave: ['Battle Ram', 'Poison'],
            alternates: ['Bandit', 'Royal Ghost', 'Electro Wizard', 'Magic Archer', 'Zap', 'Marcher'],
            archetype: 'BridgeSpam',
            advice: "PEKKA Bridge Spam punishes over-investments. Defend with PEKKA, then counter-push hard."
        },
        'Mega Knight': {
            mustHave: ['Wall Breakers', 'Miner'], // MK Bait
            alternates: ['Zap', 'Inferno Dragon', 'Bats', 'Goblin Gang'],
            archetype: 'BridgeSpam',
            advice: "Mega Knight is a defensive wall. Drop him on their push, then counter-attack with fast units."
        },
        'Mortar': {
            mustHave: ['Skeleton King', 'Miner'], // Modern Mortar
            alternates: ['Cannon Cart', 'Spear Goblins', 'Fireball', 'The Log', 'Dart Goblin'],
            archetype: 'Siege',
            advice: "Mortar has a blind spot! Use it defensively to pull hogs, or offensively to chip the tower."
        }
    };

    // --- 2. GENERATION LOGIC ---

    function optimize(partialDeck, fullCollection) {
        console.log("🧠 SmartAI: Thinking...");

        // A. IDENTIFY CAPTAIN (The most expensive/defining Win Condition)
        let captain = identifyCaptain(partialDeck);
        if (!captain) {
            if (partialDeck.length > 0) captain = partialDeck[0];
        }

        console.log("🧠 SmartAI: Captain is", captain ? captain.name : "Unknown");

        // B. SYNERGY FILL
        let smartDeck = [...partialDeck];
        const deckNames = new Set(smartDeck.map(c => c.name));

        if (captain && SYNERGY_MAP[captain.name]) {
            const synergy = SYNERGY_MAP[captain.name];

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

            // 2. Add Alternates
            for (const name of synergy.alternates) {
                if (smartDeck.length >= 8) break;
                if (!deckNames.has(name) && (Math.random() > 0.3 || smartDeck.length < 4)) {
                    const card = findCard(name, fullCollection);
                    if (card) {
                        smartDeck.push(card);
                        deckNames.add(name);
                    }
                }
            }
        }

        // C. ROLE FILL
        fillRole(smartDeck, deckNames, 'spellSmall', ['The Log', 'Zap', 'Barbarian Barrel', 'Arrows', 'Giant Snowball'], fullCollection);
        fillRole(smartDeck, deckNames, 'spellBig', ['Fireball', 'Poison', 'Rocket', 'Lightning', 'Earthquake'], fullCollection);

        const isBeatdown = captain && SYNERGY_MAP[captain.name]?.archetype === 'Beatdown';
        if (!isBeatdown) {
            fillRole(smartDeck, deckNames, 'building', ['Cannon', 'Tesla', 'Inferno Tower', 'Bomb Tower', 'Tombstone'], fullCollection);
        }

        // D. FINAL FILL
        fillRemaining(smartDeck, deckNames, fullCollection);

        return smartDeck;
    }

    // --- HELPERS ---

    function identifyCaptain(deck) {
        const winCons = deck.filter(c => getCardRole(c.name).includes('winCon'));
        if (winCons.length === 0) return null;
        winCons.sort((a, b) => b.elixirCost - a.elixirCost);
        return winCons[0];
    }

    function findCard(name, collection) {
        let c = collection.find(x => x.name === name);
        if (c) return c;
        c = collection.find(x => x.name.includes(name));
        return c;
    }

    function fillRole(deck, deckNames, roleTag, candidates, collection) {
        if (deck.length >= 8) return;
        const hasRole = deck.some(c => getCardRole(c.name).includes(roleTag));
        if (hasRole) return;
        for (const name of candidates) {
            if (!deckNames.has(name)) {
                const card = findCard(name, collection);
                if (card) {
                    deck.push(card);
                    deckNames.add(name);
                    return;
                }
            }
        }
    }

    function fillRemaining(deck, deckNames, collection) {
        const sorted = [...collection].sort((a, b) => (getMetaScore(b.name) - getMetaScore(a.name)));
        for (const card of sorted) {
            if (deck.length >= 8) break;
            if (!deckNames.has(card.name)) {
                deck.push(card);
                deckNames.add(card.name);
            }
        }
    }

    function getCardRole(name) {
        if (window.getCardRole) return window.getCardRole(name);
        return [];
    }

    function getMetaScore(name) {
        if (window.META_QUALITY) return window.META_QUALITY[name] || 50;
        return 50;
    }


    return {
        optimize: optimize,
        SYNERGY_MAP: SYNERGY_MAP,

        /**
         * Enhanced Suggestion Engine
         * @param {Array} deck 
         * @returns {Array} Array of string suggestions
         */
        generateCoachNotes: function (deck) {
            const notes = [];

            // 0. CAPTAIN & ARCHETYPE DETECTION
            const captain = identifyCaptain(deck);
            const deckNames = new Set(deck.map(c => c.name));

            if (captain) {
                notes.push(`👑 <strong>Core Strategy:</strong> Built around <strong>${captain.name}</strong>.`);

                // SYNERGY CHECK
                if (SYNERGY_MAP[captain.name]) {
                    const info = SYNERGY_MAP[captain.name];

                    // Advice
                    if (info.advice) notes.push(`ℹ️ ${info.advice}`);

                    // Missing Keys
                    const missingKeys = info.mustHave.filter(key => !deckNames.has(key));
                    if (missingKeys.length > 0) {
                        // Suggest the most important missing one
                        const suggestion = missingKeys[0];
                        notes.push(`💡 <strong>Pro Tip:</strong> ${captain.name} has huge synergy with <strong>${suggestion}</strong>. Consider adding it!`);
                    }
                }
            } else {
                notes.push("❌ <strong>Critical:</strong> You have no clear Win Condition! Add a card like Hog Rider, Golem, or Miner to target towers.");
            }

            // 1. SPELL BALANCE
            const smallSpells = deck.filter(c => ['The Log', 'Zap', 'Giant Snowball', 'Arrows', 'Barbarian Barrel', 'Tornado', 'Rage', 'Royal Delivery'].includes(c.name));
            const bigSpells = deck.filter(c => ['Fireball', 'Poison', 'Rocket', 'Lightning', 'Earthquake', 'Void'].includes(c.name));

            if (smallSpells.length === 0) {
                notes.push("⚠️ <strong>Defense Gap:</strong> You need a Small Spell (Log/Zap/Arrows) to clear swarms!");
            }
            if (bigSpells.length === 0) {
                notes.push("⚠️ <strong>Offense Gap:</strong> You need a Big Spell (Fireball/Poison) to finish towers and kill Wizards/Witches.");
            }
            if (smallSpells.length + bigSpells.length > 3) {
                notes.push("⚖️ <strong>Spell Heavy:</strong> You have 4+ spells. Swap one for a troop to have better board presence.");
            }

            // 2. CYCLE & ELIXIR
            const avg = deck.reduce((a, b) => a + (b.elixirCost || 3), 0) / 8;
            notes.push(`📊 <strong>Average Elixir:</strong> ${avg.toFixed(1)}`);

            if (avg > 4.3) notes.push("🐢 <strong>Too Slow:</strong> Your deck is extremely expensive. You will struggle against fast cycle decks.");
            if (avg < 2.8 && captain && SYNERGY_MAP[captain.name]?.archetype === 'Beatdown') {
                notes.push("🤔 <strong>Too Fast?</strong> Beatdown decks usually need more weight behind them. Consider beefier support units.");
            }

            // 3. AIR COUNTERS
            const airCounters = deck.filter(c => ['Musketeer', 'Wizard', 'Executioner', 'Hunter', 'Electro Wizard', 'Witch', 'Firecracker', 'Phoenix', 'Archer Queen', 'Little Prince', 'Minions', 'Bats', 'Dart Goblin', 'Magic Archer', 'Ice Wizard', 'Inferno Dragon'].includes(c.name));

            if (airCounters.length === 0) {
                notes.push("🚨 <strong>CRITICAL:</strong> You have ZERO air defense! Balloon or Lava Hound will 3-crown you instantly.");
            } else if (airCounters.length === 1) {
                notes.push(`⚠️ <strong>Risky:</strong> You only have 1 air counter (${airCounters[0].name}). If they spell it down, you lose. Add one more.`);
            }

            // 4. BUILDING CHECK (Contextual)
            const hasBuilding = deck.some(c => getCardRole(c.name).includes('building'));
            if (!hasBuilding && (!captain || SYNERGY_MAP[captain.name]?.archetype !== 'Beatdown')) {
                notes.push("🏠 <strong>Defense:</strong> No building? Hog Riders and Giants will connect easily. A Cannon or Tesla would help.");
            }

            return notes;
        }
    };

})();
window.SmartAI = SmartAI;
