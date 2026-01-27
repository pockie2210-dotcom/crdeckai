// SmartAI: The "Pro Player" Logic (V2 - Grand Champion Update)
// This module upgrades the AI from "Random Good Cards" to "Synergy-Based Builder" + "Meta Deck Completion".

const SmartAI = (() => {

    // --- 1. THE BRAIN: SYNERGY MAP ---
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
        },
        'Goblin Giant': {
            mustHave: ['Sparky', 'Rage'],
            alternates: ['Mini P.E.K.K.A', 'Mega Minion', 'Zap', 'Dark Prince', 'Electro Wizard'],
            archetype: 'Beatdown',
            advice: "Goblin Giant protects Sparky perfectly. Rage them both for destructive power."
        }
    };

    const ROLES = {
        winCon: ['Hog Rider', 'Ram Rider', 'Battle Ram', 'Golem', 'Elixir Golem', 'Giant', 'Royal Giant', 'Goblin Giant', 'Electro Giant', 'Lava Hound', 'Balloon', 'Graveyard', 'Goblin Barrel', 'Wall Breakers', 'Miner', 'Mortar', 'X-Bow', 'Three Musketeers', 'Sparky', 'Skeleton Barrel', 'Goblin Drill', 'Royal Hogs'],
        spellSmall: ['The Log', 'Zap', 'Giant Snowball', 'Arrows', 'Barbarian Barrel', 'Royal Delivery', 'Rage', 'Tornado'],
        spellBig: ['Fireball', 'Poison', 'Rocket', 'Lightning', 'Earthquake', 'Void'],
        airCounter: ['Musketeer', 'Wizard', 'Executioner', 'Hunter', 'Electro Wizard', 'Ice Wizard', 'Witch', 'Mother Witch', 'Firecracker', 'Archer Queen', 'Little Prince', 'Princess', 'Dart Goblin', 'Magic Archer', 'Flying Machine', 'Minions', 'Minion Horde', 'Bats', 'Mega Minion', 'Phoenix', 'Inferno Dragon', 'Spear Goblins', 'Tesla', 'Inferno Tower', 'Zappies'],
        building: ['Cannon', 'Tesla', 'Inferno Tower', 'Bomb Tower', 'Tombstone', 'Goblin Cage', 'Furnace', 'Barbarian Hut', 'Goblin Hut', 'Elixir Collector', 'Mortar', 'X-Bow'],
        swarm: ['Skeleton Army', 'Goblin Gang', 'Guards', 'Skeletons', 'Bats', 'Minions', 'Minion Horde', 'Goblins', 'Spear Goblins'],
        miniTank: ['Knight', 'Valkyrie', 'Ice Golem', 'Royal Ghost', 'Bandit', 'Dark Prince', 'Golden Knight', 'Skeleton King', 'Mighty Miner', 'Miner', 'Fisherman', 'Lumberjack', 'Prince', 'Mega Knight', 'Monk'],
        tankKiller: ['Mini P.E.K.K.A', 'P.E.K.K.A', 'Prince', 'Lumberjack', 'Elite Barbarians', 'Inferno Dragon', 'Mighty Miner', 'Hunter', 'Inferno Tower', 'Barbarians', 'Cannon Cart']
    };

    // TIERED SYNERGIES (V10) - Revised for Accuracy & Meta Relevance
    const SYNERGIES = [
        // S-TIER (God Combo - Core Win Conditions)
        { cards: ['Hog Rider', 'Ice Golem'], tier: 'S', desc: "Pig Push: Ice Golem kites and pushes Hog past buildings like Tesla or Cannon. Deploy Ice Golem first to tank, then drop Hog behind at the bridge. Most effective when opponent is low on elixir or their defensive building is already placed elsewhere." },
        { cards: ['Hog Rider', 'Earthquake'], tier: 'S', desc: "Hard Counter to Buildings: Earthquake pre-emptively destroys Tesla, Cannon, or Tombstone before they can block the Hog. Drop EQ on the building first, then send Hog immediately while tower is exposed. Forces opponent into awkward defensive troop placements." },
        { cards: ['Golem', 'Night Witch'], tier: 'S', desc: "Beatdown Core: Night Witch spawns Bats that swarm behind the Golem's massive HP pool. Deploy Golem in the back, then Night Witch behind once Golem crosses the bridge. If left unanswered, the death damage from both units guarantees tower destruction." },
        { cards: ['Lava Hound', 'Balloon'], tier: 'S', desc: "LavaLoon: Hound tanks all air-targeting damage while Balloon flies straight to the tower. Deploy Hound first to draw fire, then Balloon in the opposite lane or behind Hound. Extremely difficult to defend without strong air counters like Wizard or Electro Dragon." },
        { cards: ['Miner', 'Wall Breakers'], tier: 'S', desc: "Speed Cycle Burst: Miner tanks tower shots allowing Wall Breakers to connect for massive damage. Send Miner to tank first, then deploy WBs at the bridge 1 second later. Works best when opponent has no swarm troops in cycle or just used their spell." },
        { cards: ['Miner', 'Poison'], tier: 'S', desc: "Miner Control: Miner provides guaranteed chip damage while Poison denies area for defending troops. Drop Miner on tower, then Poison the defending units to deny elixir value. Over time, this combo wins through attrition and cycle advantage." },
        { cards: ['X-Bow', 'Tesla'], tier: 'S', desc: "Siege Fortress: Tesla protects X-Bow from tanks like Giant and swarms like Skeleton Army. Place X-Bow at the river when you have elixir advantage, then Tesla in the center to kite threats. This defensive core is nearly impossible to break without Lightning or Earthquake." },
        { cards: ['Tornado', 'Executioner'], tier: 'S', desc: "Exenado: Tornado clumps all ground and air units together for Executioner's double-hit axe. Pull troops to the king tower with Tornado while Exe slices everything. This combo deletes swarms, beatdown pushes, and even Graveyard skeletons effortlessly." },
        { cards: ['Goblin Barrel', 'Princess'], tier: 'S', desc: "Log Bait: Opponent can only Log one threat - the other deals damage. Cycle Princess to force out their Log, then punish with Goblin Barrel on opposite lane. Without Log, Barrel guarantees 500+ tower damage every time." },
        { cards: ['Royal Giant', 'Fisherman'], tier: 'S', desc: "RG Bodyguard: Fisherman pulls Pekka, Mini Pekka, or Prince away from the Royal Giant, saving it from heavy damage. Deploy RG first, then Fisherman to hook counters away. This extends RG's lifetime by 3-4 seconds, turning 1 shot into 3-4 shots on tower." },
        { cards: ['Electro Giant', 'Tornado'], tier: 'S', desc: "Zap Reflex Trap: Tornado pulls ranged units (Musketeer, Wizard, Electro Dragon) into E-Giant's zap reflection radius. Drop E-Giant at bridge, then Tornado defenders toward him to trigger instant zaps. Turns their defensive troops into liabilities instead of answers." },
        { cards: ['Goblin Drill', 'Bomber'], tier: 'S', desc: "Drill Cycle Protection: Bomber splashes all the swarms and skeletons that try to catch the underground Drill. Send Drill first, then Bomber right behind to clear Skarmy, Goblins, or Guards. This combo forces opponent to use heavy spells (Fireball) just to stop 4 elixir." },
        { cards: ['Royal Recruits', 'Royal Hogs'], tier: 'S', desc: "Fireball Bait Overload: Both cards cost 6+ elixir and flood both lanes with units. If opponent Fireballs one lane, the other lane wins. If they split defense, both lanes deal chip damage. This dual-lane pressure is unstoppable without splash troops in both lanes." },

        // A-TIER (Strong Meta Combos)
        { cards: ['P.E.K.K.A', 'Battle Ram'], tier: 'A', desc: "Bridge Spam Cycle: Pekka defends against beatdown pushes while Battle Ram applies instant opposite-lane pressure. Use Pekka to shut down their push, then immediately drop Battle Ram at bridge while they're low on elixir. This forces opponent to defend both lanes with limited resources." },
        { cards: ['Giant', 'Prince'], tier: 'A', desc: "Double Prince Beatdown: Giant tanks while Prince charges for 1000+ burst damage. Deploy Giant in back, then Prince once they cross bridge together. The charge mechanic combined with Giant's HP overwhelms standard defenses like Mini Pekka or Valkyrie." },
        { cards: ['Mega Knight', 'Zap'], tier: 'A', desc: "MK Entry Protection: Zap resets Inferno Tower/Dragon and kills Bats/Skeletons before MK jumps in. Drop MK at bridge, then Zap any swarms or Inferno threats immediately. Without these counters, MK's jump deals 1000+ damage and clears the path to tower." },
        { cards: ['Balloon', 'Lumberjack'], tier: 'A', desc: "LumberLoon Rush: Lumberjack dies and drops Rage, speeding Balloon to tower in 2 seconds instead of 4. Send Lumberjack first to tank, then Balloon right behind. If Lumberjack dies near tower, the Rage effect makes Balloon nearly unstoppable." },
        { cards: ['Sparky', 'Goblin Giant'], tier: 'A', desc: "Mobile Shield Tank: Goblin Giant's Spear Goblins and HP provide a moving wall that protects Sparky from resets. Deploy Sparky behind tower, then Goblin Giant in front once they push together. Sparky gets 2-3 charged shots off before opponent can Zap or Electro Wizard reset." },
        { cards: ['Graveyard', 'Freeze'], tier: 'A', desc: "GY Freeze Cheese: Freeze locks tower and defenders for 4 seconds while Graveyard Skeletons deal 1500+ damage unopposed. Drop Graveyard first, wait 1 second for defenders to appear, then Freeze everything. High risk (9 elixir) but guarantees tower if opponent has no spell." },
        { cards: ['Lava Hound', 'Flying Machine'], tier: 'A', desc: "Air Sniper Support: Flying Machine shoots from max range behind Lava Hound, staying safe from tower damage. Deploy Hound first, then Flying Machine 3 tiles behind. Together they outrange Musketeer and Wizard, forcing opponent into awkward spell investments." },
        { cards: ['Magic Archer', 'Tornado'], tier: 'A', desc: "Geometry Abuse: Tornado aligns all enemies in a line for Magic Archer's piercing arrows to hit multiple times. Place Magic Archer at bridge angle, then Tornado defenders into a row. Each arrow can hit 3-4 units, turning a 4-elixir card into a full push wipe." },
        { cards: ['Elixir Golem', 'Battle Healer'], tier: 'A', desc: "Blob Spam Sustain: Battle Healer's passive healing keeps Elixir Golem's blobs alive while they snowball. Deploy Egolem in back, then Healer behind. If opponent can't burst kill the Egolem quickly, the healing snowballs into an unstoppable 20+ elixir push." },
        { cards: ['Mortar', 'Skeleton King'], tier: 'A', desc: "Siege Bait Souls: Skeleton King farms souls from cheap bait cards, then uses ability to tank for Mortar. Play defensive Mortar at river, then Skeleton King to soak damage. Once King has 10+ souls, his ability summons Skeletons that distract every defender, guaranteeing Mortar locks." },

        // B-TIER (Good Synergies)
        { cards: ['Valkyrie', 'Hog Rider'], tier: 'B', desc: "Valk Hog: Clears swarms ahead of the Hog." },
        { cards: ['Knight', 'Graveyard'], tier: 'B', desc: "Tank spread: Knight tanks tower while Skeletons accumulate." },
        { cards: ['Baby Dragon', 'Tornado'], tier: 'B', desc: "Splashnado: Maximizes Baby D's splash radius." },
        { cards: ['Hunter', 'Fisherman'], tier: 'B', desc: "FishHunter: Pulls tanks into Hunter's point-blank range." },
        { cards: ['Bandit', 'Battle Ram'], tier: 'B', desc: "Bridge Rush: two charging threats at once." },
        { cards: ['Giant Skeleton', 'Clone'], tier: 'B', desc: "Nuke Clone: Doubles the death damage. Gimmicky but strong." },
        { cards: ['Electro Dragon', 'Golem'], tier: 'B', desc: "Edrag Support:  Stuns infernos/towers for the Golem." },

        // C-TIER (Decent / Situational)
        { cards: ['Archers', 'Knight'], tier: 'C', desc: "X-Bow Defense: Cheap, sturdy defensive core." },
        { cards: ['Musketeer', 'Ice Spirit'], tier: 'C', desc: "2.6 Defense: Freeze allows Musketeer to finish targets." },
        { cards: ['Cannon', 'Skeletons'], tier: 'C', desc: "Cycle Defense: Pulls Hog/Giant to center." },
        { cards: ['Bats', 'Clone'], tier: 'C', desc: "Glass Cannon: Deadly DPS if not Zapped." },
        { cards: ['Wall Breakers', 'Skeletons'], tier: 'C', desc: "Split Lane pressure." }
    ];

    // Legacy Support: Convert object style to simple pairs if needed
    // But for now, we exported SYNERGIES in V1, let's keep it as is but note it's objects now.
    // NOTE: The previous code anticipated array of strings. We need to update usages.

    function normalizeLevel(card) {
        // Simple normalization: Max is 14/15, Min is 1
        return card.level || card.cardLevel || 9;
    }

    // --- 2. HELPERS ---

    function getCardRole(name) {
        // Use our robust internal list
        const roles = [];
        for (const [role, list] of Object.entries(ROLES)) {
            // Check exact match or evolution removal
            const clean = name.replace(/ Evolution$/, '');
            if (list.includes(name) || list.includes(clean)) roles.push(role);
        }
        return roles;
    }

    function getMetaScore(name) {
        const cleanName = name.replace(/ Evolution$/i, '').trim();
        if (window.META_QUALITY) {
            return window.META_QUALITY[name] || window.META_QUALITY[cleanName] || 50;
        }
        return 50;
    }

    function identifyCaptain(deck) {
        const winCons = deck.filter(c => getCardRole(c.name).includes('winCon'));
        if (winCons.length === 0) return null;
        winCons.sort((a, b) => (b.elixirCost || 0) - (a.elixirCost || 0));
        return winCons[0];
    }

    function findCard(name, collection) {
        // ... (this function seems useful, keep it)
        let c = collection.find(x => x.name === name);
        if (c) return c;
        c = collection.find(x => x.name.includes(name));
        return c;
    }

    // Helper to check if tags roughly match (Moved here to fix ReferenceError)
    function tagsMatch(a, b) {
        const roleA = getCardRole(a.name);
        const roleB = getCardRole(b.name);
        return roleA.some(r => roleB.includes(r));
    }


    // --- 3. GENERATION LOGIC ---

    function optimize(partialDeck, fullCollection) {
        console.log("🧠 SmartAI: Thinking (V2)...");
        let captain = identifyCaptain(partialDeck);
        if (!captain && partialDeck.length > 0) captain = partialDeck[0];

        let smartDeck = [...partialDeck];
        const deckNames = new Set(smartDeck.map(c => c.name));

        // 1. Core Synergy (Must Haves)
        if (captain && SYNERGY_MAP[captain.name]) {
            const synergy = SYNERGY_MAP[captain.name];
            for (const name of synergy.mustHave) {
                if (smartDeck.length >= 8) break;
                if (!deckNames.has(name)) {
                    const card = findCard(name, fullCollection);
                    if (card) { smartDeck.push(card); deckNames.add(name); }
                }
            }
        }
        // 2. Fill Critical Roles
        fillRole(smartDeck, deckNames, 'spellSmall', ROLES.spellSmall, fullCollection);
        fillRole(smartDeck, deckNames, 'spellBig', ROLES.spellBig, fullCollection);

        const isBeatdown = captain && SYNERGY_MAP[captain.name]?.archetype === 'Beatdown';
        if (!isBeatdown) {
            // Control/Cycle decks want buildings usually
            fillRole(smartDeck, deckNames, 'building', ['Cannon', 'Tesla', 'Inferno Tower', 'Bomb Tower', 'Tombstone'], fullCollection);
        }

        // 3. Fill Remaining with Meta Cards
        fillRemaining(smartDeck, deckNames, fullCollection);
        return smartDeck;
    }

    function fillRole(deck, deckNames, roleTag, candidates, collection) {
        if (deck.length >= 8) return;
        const hasRole = deck.some(c => getCardRole(c.name).includes(roleTag));
        if (hasRole) return;

        // Try to find highest rated candidate available
        const sortedCandidates = candidates.sort((a, b) => getMetaScore(b) - getMetaScore(a));

        for (const name of sortedCandidates) {
            if (!deckNames.has(name)) {
                const card = findCard(name, collection);
                if (card) { deck.push(card); deckNames.add(name); return; }
            }
        }
    }

    function fillRemaining(deck, deckNames, collection) {
        const sorted = [...collection].sort((a, b) => (getMetaScore(b.name) - getMetaScore(a.name)));
        for (const card of sorted) {
            if (deck.length >= 8) break;
            if (!deckNames.has(card.name)) { deck.push(card); deckNames.add(card.name); }
        }
    }

    // --- 4. EXPORTED FUNCTIONS ---

    return {
        optimize: optimize,
        SYNERGY_MAP: SYNERGY_MAP,
        SYNERGIES: SYNERGIES,

        /**
         * Enhanced Suggestion Engine (Coach Notes)
         */
        generateCoachNotes: function (deck) {
            const notes = [];
            const captain = identifyCaptain(deck);
            const deckNames = new Set(deck.map(c => c.name));

            // Win Con Check
            if (captain) {
                notes.push(`👑 <strong>Core Strategy:</strong> Built around <strong>${captain.name}</strong>.`);
                if (SYNERGY_MAP[captain.name]) {
                    const info = SYNERGY_MAP[captain.name];
                    if (info.advice) notes.push(`ℹ️ ${info.advice}`);
                    const missingKeys = info.mustHave.filter(key => !deckNames.has(key));
                    if (missingKeys.length > 0) {
                        notes.push(`💡 <strong>Pro Tip:</strong> ${captain.name} relies on <strong>${missingKeys[0]}</strong>.`);
                    }
                }
            } else {
                notes.push("❌ <strong>Critical:</strong> You have no clear Win Condition!");
            }

            // Role Gaps
            const roles = {
                spellSmall: deck.filter(c => getCardRole(c.name).includes('spellSmall')),
                spellBig: deck.filter(c => getCardRole(c.name).includes('spellBig')),
                air: deck.filter(c => getCardRole(c.name).includes('airCounter'))
            };

            if (roles.spellSmall.length === 0) notes.push("⚠️ <strong>Defense Gap:</strong> You need a Small Spell!");
            if (roles.spellBig.length === 0) notes.push("⚠️ <strong>Offense Gap:</strong> You need a Big Spell!");
            if (roles.air.length < 2) notes.push("🚨 <strong>CRITICAL:</strong> Weak air defense (need 2+ counters).");

            const avg = deck.reduce((a, b) => a + (b.elixirCost || 3), 0) / 8;
            notes.push(`📊 <strong>Average Elixir:</strong> ${avg.toFixed(1)}`);

            return notes;
        },

        /**
         * RECOMMENDER: User picks a card -> AI suggests removal
         */
        recommendSwap: function (deck, cardToAdd) {
            const rolesToAdd = getCardRole(cardToAdd.name);
            const deckNames = new Set(deck.map(c => c.name));
            const captain = identifyCaptain(deck);

            // CONTEXT AWARENESS (V3)
            const avgElixir = deck.reduce((a, b) => a + (b.elixirCost || 3), 0) / 8;
            const isHeavyDeck = avgElixir > 4.0;
            const isCycleDeck = avgElixir < 3.0;

            // --- META DECK IDENTIFICATION (V8) ---
            let bestMetaMatch = null;
            if (window.META_DECKS) {
                let maxOverlap = 0;
                const currentNames = deck.map(c => c.name);
                window.META_DECKS.forEach(meta => {
                    const overlap = meta.full.filter(name => currentNames.includes(name)).length;
                    // If we have >= 5 cards of a meta deck (and <=7 because if 8 we are done), we consider it a target
                    if (overlap >= 5 && overlap < 8) {
                        if (overlap > maxOverlap) {
                            maxOverlap = overlap;
                            bestMetaMatch = meta;
                        }
                    }
                });
            }

            // 1. DUPLICATE ROLE CHECK
            if (rolesToAdd.includes('winCon')) {
                const winCons = deck.filter(c => getCardRole(c.name).includes('winCon'));
                if (winCons.length > 0) {
                    const weakest = winCons.sort((a, b) => getMetaScore(a.name) - getMetaScore(b.name))[0];
                    return {
                        remove: weakest,
                        reason: `Swap <strong>${weakest.name}</strong> for <strong>${cardToAdd.name}</strong> to switch Win Conditions.`
                    };
                }
            }

            // 2. SPELL CAP (Context: Cycle decks can handle 3 spells, others 2)
            const maxSpells = isCycleDeck ? 3 : 2;
            if (rolesToAdd.includes('spellSmall') || rolesToAdd.includes('spellBig')) {
                const spells = deck.filter(c => getCardRole(c.name).includes('spellSmall') || getCardRole(c.name).includes('spellBig'));
                if (spells.length > maxSpells) { // Rigid strict cap
                    const weakest = spells.sort((a, b) => getMetaScore(a.name) - getMetaScore(b.name))[0];
                    return {
                        remove: weakest,
                        reason: `${maxSpells} spells is optimal for this deck. Swap <strong>${weakest.name}</strong>.`
                    };
                }
            }

            // 3. GENERIC VALUE SWAP
            let candidates = deck.filter(c => {
                const r = getCardRole(c.name);

                // CRITICAL: Protect the Captain
                if (captain && c.name === captain.name) return false;

                // CRITICAL: Don't remove ANY Win Condition unless we are adding one
                // (Prevents swapping Wall Breakers for Archers)
                if (r.includes('winCon') && !rolesToAdd.includes('winCon')) return false;

                // CONTEXT: Elixir Management
                // If deck is heavy, protect cheap cards (<= 2 elixir) unless adding a cheap card
                if (isHeavyDeck && (c.elixirCost || 3) <= 2 && (cardToAdd.elixirCost || 3) > 3) return false;

                // CRITICAL (V4): Role Scarcity Guard
                // Don't remove the ONLY card of a critical role (Air, Big Spell, Killer, Small Spell)
                if (r.includes('airCounter')) {
                    const airCounters = deck.filter(c => getCardRole(c.name).includes('airCounter'));
                    // If this is the only air counter (or one of only 2), don't remove unless adding one
                    if (airCounters.length <= 2 && !rolesToAdd.includes('airCounter')) return false;
                }
                if (r.includes('tankKiller')) {
                    const killers = deck.filter(c => getCardRole(c.name).includes('tankKiller'));
                    if (killers.length <= 1 && !rolesToAdd.includes('tankKiller')) return false;
                }

                // CRITICAL (V8): Small Spell Bodyguard
                // A deck without a small spell is suicide. Never remove the last one.
                if (r.includes('spellSmall')) {
                    const smallSpells = deck.filter(c => getCardRole(c.name).includes('spellSmall'));
                    if (smallSpells.length <= 1 && !rolesToAdd.includes('spellSmall')) return false;
                }

                // CRITICAL (V5): Bodyguard Rule
                // If we have a fragile Win Condition (Barrel, GY, Wall Breakers), we MUST keep a Mini Tank
                if (r.includes('miniTank')) {
                    const tanks = deck.filter(c => getCardRole(c.name).includes('miniTank'));
                    // If this is the last mini tank, protect it
                    if (tanks.length <= 1 && !rolesToAdd.includes('miniTank') && !rolesToAdd.includes('winCon')) return false;
                }

                return true;
            });

            // Fallback: If EVERYTHING is protected (rare), relax ONLY the "Optional" rules
            if (candidates.length === 0) {
                // Relax: Elixir Guard & Role Scarcity Guard
                // Keep: Captain & Win Condition Guard
                candidates = deck.filter(c => {
                    // 1. Captain Protect
                    if (captain && c.name === captain.name) return false;

                    // 2. Win Con Protect
                    const r = getCardRole(c.name);
                    if (r.includes('winCon') && !rolesToAdd.includes('winCon')) return false;

                    return true;
                });
            }

            // Prioritize removing duplicates in role
            for (const r of rolesToAdd) {
                const dups = candidates.filter(c => getCardRole(c.name).includes(r));
                if (dups.length > 0) {
                    candidates = dups; // Focus on these
                    break;
                }
            }

            // SORT CANDIDATES BY "VALUE SCORE" (V3 Strategy)
            // Value = MetaScore + SynergyBonus + RoleBonus + LEVEL_BONUS
            candidates.sort((a, b) => {
                let scoreA = getMetaScore(a.name);
                let scoreB = getMetaScore(b.name);

                // --- 0. META DECK PROTECTION (V8) ---
                // If we are building a specific Meta Deck, PROTECT its components at all costs.
                if (bestMetaMatch) {
                    if (bestMetaMatch.full.includes(a.name)) scoreA += 500; // DO NOT TOUCH
                    if (bestMetaMatch.full.includes(b.name)) scoreB += 500;
                }

                // 1. SYNERGY BONUS (Captain Specific)
                if (captain && SYNERGY_MAP[captain.name]?.mustHave.includes(a.name)) scoreA += 50;
                if (captain && SYNERGY_MAP[captain.name]?.mustHave.includes(b.name)) scoreB += 50;

                // 2. GENERIC SYNERGY SCAN (V7)
                // Does this card synergize with ANY other card in the deck?
                deck.forEach(mate => {
                    if (mate.name === a.name) return;
                    // Check SYNERGIES list (Object Structure V9)
                    const pairA = SYNERGIES.find(p => p.cards.includes(a.name) && p.cards.includes(mate.name));
                    if (pairA) scoreA += 15; // Moderate bonus for known combos
                });
                deck.forEach(mate => {
                    if (mate.name === b.name) return;
                    const pairB = SYNERGIES.find(p => p.cards.includes(b.name) && p.cards.includes(mate.name));
                    if (pairB) scoreB += 15;
                });

                // 3. LEVEL AWARENESS (V7)
                // Huge weight for levels. Level 14 vs 11 is a massive difference.
                const levelA = normalizeLevel(a);
                const levelB = normalizeLevel(b);
                scoreA += (levelA * 5); // Example: Lvl 14 = +70 pts, Lvl 10 = +50 pts
                scoreB += (levelB * 5);

                return scoreA - scoreB; // Ascending (remove lowest score)
            });

            const remove = candidates[0] || deck[0];

            // Rich Reasoning Generation
            const newMeta = getMetaScore(cardToAdd.name);
            const oldMeta = getMetaScore(remove.name);
            const qualityDiff = newMeta - oldMeta;

            let reason = "";

            // Meta Deck Reason Override
            if (bestMetaMatch && bestMetaMatch.full.includes(cardToAdd.name)) {
                reason = `🎯 <strong>Essential Piece!</strong> Adding <strong>${cardToAdd.name}</strong> helps complete the <strong>${bestMetaMatch.name}</strong> archetype.`;
            }
            else if (tagsMatch(cardToAdd, remove)) reason = `<strong>${remove.name}</strong> performs the same role but <strong>${cardToAdd.name}</strong> is stronger here.`;
            else if (qualityDiff > 15) reason = `<strong>${cardToAdd.name}</strong> is a massive upgrade in the current meta (+${qualityDiff}% Strength).`;
            else if ((cardToAdd.elixirCost || 3) < (remove.elixirCost || 3)) reason = `<strong>${cardToAdd.name}</strong> provides similar value for less Elixir.`;
            else reason = `<strong>${remove.name}</strong> is the best cut to make room for <strong>${cardToAdd.name}</strong>.`;

            return {
                remove: remove,
                reason: reason
            };
        },


        /**
         * NEW: Propose Specific Swaps (The SMART Logic)
         */
        proposeSwaps: function (deck) {
            const proposals = [];
            const currentNames = deck.map(c => c.name);
            const captain = identifyCaptain(deck);

            // 1. META DECK COMPLETION (The "Genius" Move)
            if (window.META_DECKS) {
                let bestMatch = null;
                let maxOverlap = 0;

                window.META_DECKS.forEach(meta => {
                    const overlap = meta.full.filter(name => currentNames.includes(name)).length;
                    // Strict threshold: Must have 5+ cards of a specific deck to suggest completing it
                    // This prevents suggesting "Hog 2.6" just because you have Skeletons.
                    if (overlap >= 5 && overlap < 8) {
                        if (overlap > maxOverlap) {
                            maxOverlap = overlap;
                            bestMatch = meta;
                        }
                    }
                });

                if (bestMatch) {
                    const missing = bestMatch.full.filter(name => !currentNames.includes(name));
                    // Suggest the first 2 missing cards
                    missing.slice(0, 2).forEach(miss => {
                        // Find a candidate to remove (not in meta deck)
                        const toRemove = deck.find(c => !bestMatch.full.includes(c.name));
                        if (toRemove) {
                            proposals.push({
                                remove: toRemove,
                                add: miss,
                                reason: `🎯 <strong>Meta Match:</strong> You are building <strong>${bestMatch.name}</strong> (${maxOverlap}/8). Swap <strong>${toRemove.name}</strong> for <strong>${miss}</strong>.`,
                                priority: 1, // CRITICAL
                                score: 100
                            });
                        }
                    });
                    if (proposals.length > 0) return proposals; // Return immediately if we found a pro deck match
                }
            }

            // 2. CRITICAL GAPS
            const roles = {
                winCon: deck.filter(c => getCardRole(c.name).includes('winCon')),
                spellSmall: deck.filter(c => getCardRole(c.name).includes('spellSmall')),
                spellBig: deck.filter(c => getCardRole(c.name).includes('spellBig')),
                airCounter: deck.filter(c => getCardRole(c.name).includes('airCounter'))
            };

            // A. No Win Condition
            if (roles.winCon.length === 0) {
                const suggestion = 'Hog Rider'; // Generic good pick
                const worst = deck.sort((a, b) => getMetaScore(a.name) - getMetaScore(b.name))[0];
                proposals.push({
                    remove: worst,
                    add: suggestion,
                    reason: "🛑 <strong>No Win Condition!</strong> You need a tower-targeter. Add <strong>Hog Rider</strong> (or Giant/Miner).",
                    priority: 1, // CRITICAL
                    score: 90
                });
            }

            // B. No Small Spell (Critical for Swarms)
            if (roles.spellSmall.length === 0) {
                const worst = deck.find(c => !getCardRole(c.name).includes('winCon')); // Don't remove WC
                if (worst) {
                    proposals.push({
                        remove: worst,
                        add: 'The Log',
                        reason: "⚠️ <strong>Vulnerable to Swarms.</strong> Add <strong>The Log</strong> or Zap.",
                        priority: 2, // HIGH
                        score: 80
                    });
                }
            }

            // C. No Big Spell (Critical for Pumps/Sparky)
            if (roles.spellBig.length === 0) {
                const worst = deck.find(c => !getCardRole(c.name).includes('winCon') && !getCardRole(c.name).includes('spellSmall'));
                if (worst) {
                    proposals.push({
                        remove: worst,
                        add: 'Fireball',
                        reason: "⚠️ <strong>No Heavy Spell.</strong> Add <strong>Fireball</strong> to finish towers or pumps.",
                        priority: 2, // HIGH
                        score: 75
                    });
                }
            }

            // D. No Air Counters
            if (roles.airCounter.length < 2) {
                const worst = deck.find(c => !getCardRole(c.name).includes('winCon') && !getCardRole(c.name).includes('spellSmall') && !getCardRole(c.name).includes('spellBig') && !getCardRole(c.name).includes('airCounter'));
                if (worst) {
                    proposals.push({
                        remove: worst,
                        add: 'Musketeer',
                        reason: "🦅 <strong>Weak Air Defense.</strong> Add <strong>Musketeer</strong> or Wizard.",
                        priority: 2, // HIGH
                        score: 70
                    });
                }
            }

            // 3. SYNERGY_MAP Fallback
            if (captain && SYNERGY_MAP[captain.name] && proposals.length === 0) {
                const info = SYNERGY_MAP[captain.name];
                const missingKey = info.mustHave.find(key => !currentNames.includes(key));
                if (missingKey) {
                    const worst = deck.find(c => c.name !== captain.name);
                    proposals.push({
                        remove: worst,
                        add: missingKey,
                        reason: `🔗 <strong>Synergy:</strong> ${captain.name} works best with <strong>${missingKey}</strong>.`,
                        priority: 3, // MEDIUM
                        score: 60
                    });
                }
            }

            return proposals;
        }
    };

})();
window.SmartAI = SmartAI;
