export const MatchupAnalyzer = {
    // A simple knowledge base of HARD counters
    // Key = Card being countered, Value = Array of counters
    COUNTERS: {
        'Goblin Barrel': ['The Log', 'Barbarian Barrel', 'Arrows', 'Zap', 'Snowball', 'Fire Spirit'],
        'Hog Rider': ['Cannon', 'Tesla', 'Bomb Tower', 'Inferno Tower', 'Tornado', 'Mini P.E.K.K.A', 'P.E.K.K.A', 'Mega Knight', 'Fisherman'],
        'Balloon': ['Rocket', 'Fireball', 'Hunter', 'Minion Horde', 'Bats', 'Tesla', 'Inferno Tower', 'Musketeer', 'Electro Wizard', 'Ram Rider'],
        'Sparky': ['Rocket', 'Electro Wizard', 'Zap', 'Lightning', 'Electro Dragon', 'Guards', 'Dark Prince'],
        'P.E.K.K.A': ['Inferno Tower', 'Guards', 'Skeleton Army', 'Witch', 'Tombstone'],
        'Mega Knight': ['P.E.K.K.A', 'Mini P.E.K.K.A', 'Inferno Tower', 'Inferno Dragon', 'Knight', 'Valkyrie'],
        'Golem': ['Inferno Tower', 'Inferno Dragon', 'P.E.K.K.A', 'Mini P.E.K.K.A', 'Hunter', 'Sparky'],
        'Lava Hound': ['Inferno Tower', 'Inferno Dragon', 'Executioner', 'Wizard', 'Arrows'],
        'X-Bow': ['Rocket', 'Earthquake', 'Royal Giant', 'Giant', 'Golem', 'P.E.K.K.A', 'Electro Giant'],
        'Mortar': ['Royal Giant', 'Earthquake', 'Bowler'],
        'Graveyard': ['Poison', 'Mother Witch', 'Dart Goblin', 'Archers', 'Valkyrie', 'Dark Prince'],
        'Three Musketeers': ['Fireball', 'Lightning', 'Rocket', 'Mega Knight', 'Valkyrie'],
        'Inferno Tower': ['Zap', 'Lightning', 'Electro Wizard', 'Electro Spirit', 'Freeze'],
        'Inferno Dragon': ['Zap', 'Lightning', 'Electro Wizard', 'Electro Spirit'],
        'Princess': ['The Log', 'Arrows', 'Barbarian Barrel', 'Miner'],
        'Elixir Collector': ['Earthquake', 'Fireball', 'Rocket', 'Miner', 'Poison']
    },

    analyzeMatchup: function (myDeck, enemyDeck) {
        if (!myDeck || myDeck.length === 0 || !enemyDeck || enemyDeck.length === 0) {
            return { error: "Decks incoming..." };
        }

        const report = {
            score: 50, // 0-100. 50 is even. >50 is good for me.
            advantageText: "Even Matchup",
            keyInteractions: [],
            threats: [],
            tips: []
        };

        // 1. Identify Enemy Win Conditions & Threats
        const enemyThreats = enemyDeck.filter(c => this.isThreat(c.name));

        enemyThreats.forEach(threat => {
            const counters = this.findCounters(threat.name, myDeck);
            if (counters.length > 0) {
                report.keyInteractions.push({
                    threat: threat.name,
                    counters: counters.map(c => c.name),
                    status: 'CHECKED' // We have answers
                });
                report.score += 5; // Good!
            } else {
                report.keyInteractions.push({
                    threat: threat.name,
                    counters: [],
                    status: 'DANGER' // No direct counter found
                });
                report.score -= 10; // Bad!
                report.threats.push(threat.name);
                report.tips.push(`⚠️ WARNING: You have no direct hard counter for ${threat.name}. Save high DPS units or trade towers.`);
            }
        });

        // 2. Identify My Win Conditions vs Their Defense
        const myThreats = myDeck.filter(c => this.isThreat(c.name));
        myThreats.forEach(threat => {
            const enemyCounters = this.findCounters(threat.name, enemyDeck);
            if (enemyCounters.length > 0) {
                // They have a counter
                report.score -= 5;
                report.tips.push(`🧠 They have ${enemyCounters[0].name} for your ${threat.name}. Out-cycle it!`);
            } else {
                // They have NO counter
                report.score += 10;
                report.tips.push(`🔥 HUGE ADVANTAGE: They have no clean answer for ${threat.name}. Punish them!`);
            }
        });

        // 3. Spell Cycle Check
        // Do I have a big spell for their pump/3M/Sparky?
        // Simple heavy spell check if they have "Bait" elements
        const hasZapBait = enemyDeck.some(c => ['Skeleton Army', 'Goblin Gang', 'Bats', 'Sparky', 'Inferno Tower'].includes(c.name));
        const mySmallSpell = myDeck.find(c => ['Zap', 'The Log', 'Snowball', 'Arrows', 'Barbarian Barrel', 'Tornado'].includes(c.name));

        if (hasZapBait && !mySmallSpell) {
            report.score -= 10;
            report.tips.push("⚠️ You are weak to Swarm/Bait (No Small Spell).");
        }

        // 4. Cycle Speed Logic
        const myAvg = this.calcAvgElixir(myDeck);
        const enemyAvg = this.calcAvgElixir(enemyDeck);
        const diff = myAvg - enemyAvg;

        if (diff < -0.5) {
            report.tips.push(`⚡ You have a faster cycle (${myAvg.toFixed(1)} vs ${enemyAvg.toFixed(1)}). Out-cycle their counters.`);
            report.score += 5; // Faster is usually slightly better in control
        } else if (diff > 0.5) {
            report.tips.push(`🛡️ You have a heavier deck. Do not overcommit. Build big pushes.`);
        }

        // Final Score Text
        if (report.score >= 65) report.advantageText = "Big Advantage";
        else if (report.score >= 55) report.advantageText = "Slight Advantage";
        else if (report.score <= 35) report.advantageText = "Hard Countered";
        else if (report.score <= 45) report.advantageText = "Disadvantage";

        return report;
    },

    findCounters: function (threatName, deck) {
        const hardCounters = this.COUNTERS[threatName] || [];
        // Find cards in 'deck' that are in the hardCounters list
        return deck.filter(c => hardCounters.includes(c.name));
    },

    isThreat: function (cardName) {
        // Simple heuristic list of cards that MUST be answered
        const THREATS = [
            'Hog Rider', 'Balloon', 'Goblin Barrel', 'Golem', 'P.E.K.K.A', 'Mega Knight',
            'Sparky', 'Lava Hound', 'X-Bow', 'Mortar', 'Royal Giant', 'Giant',
            'Electro Giant', 'Goblin Giant', 'Miner', 'Graveyard', 'Three Musketeers',
            'Wall Breakers', 'Ram Rider', 'Battle Ram', 'Skeleton Barrel', 'Elixir Golem',
            'Princess', 'Dart Goblin' // Pseudo threats
        ];
        return THREATS.includes(cardName);
    },

    calcAvgElixir: function (deck) {
        if (!deck.length) return 0;
        const total = deck.reduce((sum, c) => sum + (c.elixir || 0), 0);
        return total / deck.length;
    }
};
