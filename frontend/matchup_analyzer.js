export const MatchupAnalyzer = {
    // --- COMPREHENSIVE COUNTER DATABASE ---
    COUNTERS: {
        // WIN CONDITIONS
        'Goblin Barrel': ['The Log', 'Barbarian Barrel', 'Arrows', 'Zap', 'Snowball', 'Fire Spirit', 'Electro Spirit', 'Bowler', 'Dark Prince'],
        'Hog Rider': ['Cannon', 'Tesla', 'Bomb Tower', 'Inferno Tower', 'Tornado', 'Mini P.E.K.K.A', 'P.E.K.K.A', 'Mega Knight', 'Fisherman', 'Ram Rider', 'Hunter', 'Bowler'],
        'Balloon': ['Rocket', 'Fireball', 'Hunter', 'Minion Horde', 'Bats', 'Tesla', 'Inferno Tower', 'Musketeer', 'Electro Wizard', 'Ram Rider', 'Mega Minion', 'Phoenix'],
        'Sparky': ['Rocket', 'Electro Wizard', 'Zap', 'Lightning', 'Electro Dragon', 'Guards', 'Dark Prince', 'Evolutions Zap'],
        'P.E.K.K.A': ['Inferno Tower', 'Guards', 'Skeleton Army', 'Witch', 'Tombstone', 'Goblin Gang', 'Ice Golem'],
        'Mega Knight': ['P.E.K.K.A', 'Mini P.E.K.K.A', 'Inferno Tower', 'Inferno Dragon', 'Knight', 'Valkyrie', 'Prince'],
        'Golem': ['Inferno Tower', 'Inferno Dragon', 'P.E.K.K.A', 'Mini P.E.K.K.A', 'Hunter', 'Sparky', 'Elite Barbarians'],
        'Lava Hound': ['Inferno Tower', 'Inferno Dragon', 'Executioner', 'Wizard', 'Arrows', 'Tesla'],
        'X-Bow': ['Rocket', 'Earthquake', 'Royal Giant', 'Giant', 'Golem', 'P.E.K.K.A', 'Electro Giant', 'Knight'],
        'Mortar': ['Royal Giant', 'Earthquake', 'Bowler', 'Electro Giant'],
        'Graveyard': ['Poison', 'Mother Witch', 'Dart Goblin', 'Archers', 'Valkyrie', 'Dark Prince', 'Guards'],
        'Three Musketeers': ['Fireball', 'Lightning', 'Rocket', 'Mega Knight', 'Valkyrie', 'Dark Prince'],
        'Royal Giant': ['P.E.K.K.A', 'Mini P.E.K.K.A', 'Inferno Tower', 'Hunter', 'Elite Barbarians', 'Barbarians'],
        'Electro Giant': ['P.E.K.K.A', 'Mini P.E.K.K.A', 'Inferno Tower', 'Cannon', 'Tesla', 'Zappies', 'Fisherman'],
        'Goblin Giant': ['P.E.K.K.A', 'Mini P.E.K.K.A', 'Inferno Tower', 'Buildings'],
        'Wall Breakers': ['Arrows', 'The Log', 'Bomb Tower', 'Magic Archer', 'Bowler'],
        'Elixir Golem': ['Sparky', 'Wizard', 'Executioner', 'Valkyrie', 'Mega Knight', 'Bomb Tower'],
        'Miner': ['Knight', 'Valkyrie', 'Goblins', 'Skeletons', 'Tornado'],

        // SUPPORT / DEFENSE
        'Inferno Tower': ['Zap', 'Lightning', 'Electro Wizard', 'Electro Spirit', 'Freeze', 'Rocket'],
        'Inferno Dragon': ['Zap', 'Lightning', 'Electro Wizard', 'Electro Spirit', 'Minions'],
        'Princess': ['The Log', 'Arrows', 'Barbarian Barrel', 'Miner', 'Poison'],
        'Elixir Collector': ['Earthquake', 'Fireball', 'Rocket', 'Miner', 'Poison', 'Lightning'],
        'Witch': ['Valkyrie', 'Executioner', 'Bowler', 'Lightning', 'Poison'],
        'Night Witch': ['Executioner', 'Wizard', 'Poison', 'Baby Dragon'],
        'Wizard': ['Fireball', 'Lightning', 'Mini P.E.K.K.A', 'Valkyrie'],
        'Executioner': ['Lightning', 'Rocket', 'Mini P.E.K.K.A'],
        'Magic Archer': ['Fireball', 'Poison', 'Miner'],
        'Mother Witch': ['Fireball', 'Poison', 'Arrows'],
        'Flying Machine': ['Fireball', 'Poison', 'Arrows'],
        'Prince': ['Skeleton Army', 'Guards', 'Tombstone', 'Goblin Gang'],
        'Dark Prince': ['Knight', 'Valkyrie']
    },

    analyzeMatchup: function (myDeck, enemyDeck) {
        if (!myDeck || myDeck.length === 0 || !enemyDeck || enemyDeck.length === 0) {
            return { error: "Decks incoming..." };
        }

        const report = {
            winProbability: 50,
            score: 50, // Legacy support
            advantageText: "Even Matchup",
            keyInteractions: [],
            threats: [],
            tips: [],
            gameplan: {
                singleElixir: "Play passive and scout their deck.",
                doubleElixir: "Stick to your gameplan.",
                suddenDeath: "Don't make mistakes."
            }
        };

        // --- 1. KEY INTERACTIONS (HARD COUNTERS) ---
        let counterScore = 0;
        const enemyThreats = enemyDeck.filter(c => this.isThreat(c.name));

        enemyThreats.forEach(threat => {
            const counters = this.findCounters(threat.name, myDeck);
            if (counters.length > 0) {
                // We have answers
                report.keyInteractions.push({
                    threat: threat.name,
                    counters: counters.map(c => c.name),
                    status: 'CHECKED',
                    desc: `Use ${counters[0].name} against ${threat.name}.`
                });
                counterScore += 5;
            } else {
                // No answer
                report.keyInteractions.push({
                    threat: threat.name,
                    counters: [],
                    status: 'DANGER',
                    desc: `No hard counter for ${threat.name}.`
                });
                counterScore -= 8; // Penalty provided
                report.threats.push(threat.name);
            }
        });

        // --- 2. OFFENSIVE POTENTIAL ---
        let offenseScore = 0;
        const myThreats = myDeck.filter(c => this.isThreat(c.name));
        myThreats.forEach(threat => {
            const enemyCounters = this.findCounters(threat.name, enemyDeck);
            if (enemyCounters.length > 0) {
                offenseScore -= 4; // They can stop us
            } else {
                offenseScore += 8; // They can't stop us!
                report.tips.push(`🔥 HUGE BREAK: They have no answer for ${threat.name}!`);
            }
        });

        // --- 3. CYCLE & SPELL CHECKS ---
        const myAvg = this.calcAvgElixir(myDeck);
        const enemyAvg = this.calcAvgElixir(enemyDeck);
        const cycleDiff = myAvg - enemyAvg; // Negative = I am faster
        let cycleScore = 0;

        if (cycleDiff < -0.4) {
            cycleScore += 5;
            report.gameplan.singleElixir = "Aggressive cycle! Pressure them before they build elixir.";
            report.tips.push(`⚡ Faster Cycle: You are ${Math.abs(cycleDiff).toFixed(1)} elixir cheaper.`);
        } else if (cycleDiff > 0.4) {
            cycleScore -= 2;
            report.gameplan.singleElixir = "Play defensive. Don't overcommit on offense.";
            report.gameplan.doubleElixir = "Build massive pushes behind your tank.";
            report.tips.push(`🛡️ Heavier Deck: Defend efficiently and counter-push.`);
        }

        // --- 4. CALCULATE WIN PROBABILITY ---
        // Base 50%
        // Adjust by counter score (defense)
        // Adjust by offense score (attack)
        // Adjust by cycle
        let totalScore = 50 + counterScore + offenseScore + cycleScore;

        // Cap visual score
        report.winProbability = Math.max(20, Math.min(80, totalScore));
        report.score = report.winProbability; // Sync

        // Text
        if (report.winProbability >= 60) report.advantageText = "Favorable Matchup";
        else if (report.winProbability >= 55) report.advantageText = "Slight Advantage";
        else if (report.winProbability <= 40) report.advantageText = "Hard Countered";
        else if (report.winProbability <= 45) report.advantageText = "Disadvantage";
        else report.advantageText = "Even Matchup";

        return report;
    },

    findCounters: function (threatName, deck) {
        // Direct map lookup
        let hardCounters = this.COUNTERS[threatName] || [];

        // Smart Check: Buildings usually counter building-targeters
        const BUILDING_TARGETERS = ['Hog Rider', 'Giant', 'Golem', 'Royal Giant', 'Balloon', 'Ram Rider', 'Battle Ram'];
        if (BUILDING_TARGETERS.includes(threatName)) {
            // Add generic buildings from 'deck' if not explicitly listed? 
            // Logic: Check if deck has building
            const buildings = deck.filter(c => this.isBuilding(c));
            // Merge arrays? For simplicity, just return explicit counters found in deck
        }

        return deck.filter(c => hardCounters.includes(c.name));
    },

    isThreat: function (cardName) {
        const THREATS = [
            'Hog Rider', 'Balloon', 'Goblin Barrel', 'Golem', 'P.E.K.K.A', 'Mega Knight',
            'Sparky', 'Lava Hound', 'X-Bow', 'Mortar', 'Royal Giant', 'Giant',
            'Electro Giant', 'Goblin Giant', 'Miner', 'Graveyard', 'Three Musketeers',
            'Wall Breakers', 'Ram Rider', 'Battle Ram', 'Elixir Golem', 'Princess'
        ];
        return THREATS.includes(cardName);
    },

    isBuilding: function (card) {
        // Minimal helper
        const BUILDINGS = ['Cannon', 'Tesla', 'Inferno Tower', 'Bomb Tower', 'Mortar', 'X-Bow', 'Goblin Cage', 'Tombstone', 'Furnace', 'Barbarian Hut', 'Goblin Hut', 'Elixir Collector'];
        return BUILDINGS.includes(card.name);
    },

    calcAvgElixir: function (deck) {
        if (!deck.length) return 0;
        const total = deck.reduce((sum, c) => sum + (c.elixirCost || c.elixir || 0), 0);
        return total / deck.length;
    }
};
