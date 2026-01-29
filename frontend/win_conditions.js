// Exposed to window for global access
window.WIN_CONDITION_GUIDES = {
    'Hog Rider': {
        role: 'Cycle / Aggro',
        archetype: 'Cycle',
        difficulty: 'Medium (5/10)',
        hardCounters: [
            { name: 'Tornado', reason: 'Pulls Hog to King Tower.' },
            { name: 'Cannon', reason: 'Positive elixir trade.' },
            { name: 'Mini P.E.K.K.A', reason: 'One-shots Hog.' }
        ],
        imgUrl: 'https://raw.githubusercontent.com/RoyaleAPI/cr-api-assets/master/cards-75/hog-rider.png',
        description: 'Fast, building-targeting unit.',
        composition: [
            { role: 'Win Condition', abbr: 'WC', color: '#1abc9c', needed: true, examples: ['Hog Rider'], reason: 'Main tower taker.' },
            { role: 'Building', abbr: 'BD', color: '#95a5a6', needed: true, examples: ['Cannon', 'Tesla'], reason: 'Defense.' },
            { role: 'Air Defense', abbr: 'AD', color: '#e74c3c', needed: true, examples: ['Musketeer', 'Queen'], reason: 'Anti-air.' },
            { role: 'Mini Tank', abbr: 'MT', color: '#f1c40f', needed: true, examples: ['Ice Golem', 'Knight'], reason: 'Distraction.' },
            { role: 'Cycle 1', abbr: 'C1', color: '#2ecc71', needed: true, examples: ['Skeletons'], reason: 'Cycle.' },
            { role: 'Cycle 2', abbr: 'C2', color: '#2ecc71', needed: true, examples: ['Ice Spirit'], reason: 'Stun/Cycle.' },
            { role: 'Small Spell', abbr: 'SS', color: '#d456fd', needed: true, examples: ['The Log'], reason: 'Clear swarms.' },
            { role: 'Big Spell', abbr: 'BS', color: '#e67e22', needed: true, examples: ['Fireball', 'Earthquake'], reason: 'Kill buildings.' }
        ],
        strategy: ['Out-Cycle counters.', 'Prediction Log against Skarmy.']
    },
    'Balloon': {
        role: 'Beatdown / Cycle',
        archetype: 'Beatdown',
        difficulty: 'Hard (7/10)',
        hardCounters: [
            { name: 'Rocket', reason: 'Hard counter.' },
            { name: 'Hunter', reason: 'Shreds Balloon.' },
            { name: 'Ram Rider', reason: 'Snares Balloon permanently.' }
        ],
        imgUrl: 'https://raw.githubusercontent.com/RoyaleAPI/cr-api-assets/master/cards-75/balloon.png',
        description: 'High damage building targeter. Needs a tank.',
        composition: [
            { role: 'Win Condition', abbr: 'WC', color: '#1abc9c', needed: true, examples: ['Balloon'], reason: 'Tower destroyer.' },
            { role: 'Tank', abbr: 'MT', color: '#f1c40f', needed: true, examples: ['Lumberjack', 'Miner', 'Lava Hound'], reason: 'Tanks for Balloon.' },
            { role: 'Air Defense', abbr: 'AD', color: '#e74c3c', needed: true, examples: ['Musketeer', 'Mega Minion'], reason: 'Support.' },
            { role: 'Building', abbr: 'BD', color: '#95a5a6', needed: true, examples: ['Bomb Tower', 'Tesla'], reason: 'Defense.' },
            { role: 'Small Spell', abbr: 'SS', color: '#d456fd', needed: true, examples: ['Zap', 'Snowball'], reason: 'Reset/Knockback.' },
            { role: 'Big Spell', abbr: 'BS', color: '#e67e22', needed: true, examples: ['Freeze', 'Fireball'], reason: 'Surprise factor.' },
            { role: 'Cycle', abbr: 'CC', color: '#2ecc71', needed: true, examples: ['Skeletons', 'Ice Spirit'], reason: 'Cycle.' },
            { role: 'Ground Defense', abbr: 'MT', color: '#f1c40f', needed: true, examples: ['Ice Golem', 'Valkyrie'], reason: 'Distraction.' }
        ],
        strategy: ['LumberLoon push at bridge.', 'Freeze heavily punishes defense.']
    },
    'Giant': {
        role: 'Beatdown',
        archetype: 'Beatdown',
        difficulty: 'Easy (3/10)',
        hardCounters: [
            { name: 'P.E.K.K.A', reason: 'Shreds Giant.' },
            { name: 'Inferno Tower', reason: 'Melts Giant.' },
            { name: 'Fisherman', reason: 'Pulls Giant to King.' }
        ],
        imgUrl: 'https://raw.githubusercontent.com/RoyaleAPI/cr-api-assets/master/cards-75/giant.png',
        description: 'Classic tank. Simple and effective.',
        composition: [
            { role: 'Win Condition', abbr: 'WC', color: '#1abc9c', needed: true, examples: ['Giant'], reason: 'Main tank.' },
            { role: 'Support DPS', abbr: 'SC', color: '#2ecc71', needed: true, examples: ['Prince', 'Mini P.E.K.K.A', 'Sparky'], reason: 'Damage dealer.' },
            { role: 'Splash', abbr: 'AD', color: '#e74c3c', needed: true, examples: ['Dark Prince', 'Witch'], reason: 'Clear swarms.' },
            { role: 'Air Defense', abbr: 'AD', color: '#e74c3c', needed: true, examples: ['Musketeer', 'Electro Wizard'], reason: 'Anti-air.' },
            { role: 'Small Spell', abbr: 'SS', color: '#d456fd', needed: true, examples: ['Zap', 'Arrows'], reason: 'Reset/Swarm clear.' },
            { role: 'Big Spell', abbr: 'BS', color: '#e67e22', needed: true, examples: ['Fireball', 'Poison'], reason: 'Kill buildings.' },
            { role: 'Mini Tank', abbr: 'MT', color: '#f1c40f', needed: true, examples: ['Miner', 'Fisherman'], reason: 'Secondary tank.' },
            { role: 'Cycle', abbr: 'CC', color: '#2ecc71', needed: true, examples: ['Mega Minion', 'Phoenix'], reason: 'Support.' }
        ],
        strategy: ['Giant + Prince push.', 'Build push from back.']
    },
    'Royal Giant': {
        role: 'Ranged Tank',
        archetype: 'Beatdown',
        difficulty: 'Easy (3/10)',
        hardCounters: [
            { name: 'P.E.K.K.A', reason: 'Kills RG fast.' },
            { name: 'Inferno Tower', reason: 'Melts RG.' }
        ],
        imgUrl: 'https://raw.githubusercontent.com/RoyaleAPI/cr-api-assets/master/cards-75/royal-giant.png',
        description: 'Ranged tank.',
        composition: [
            { role: 'Win Condition', abbr: 'WC', color: '#1abc9c', needed: true, examples: ['Royal Giant'], reason: 'The King.' },
            { role: 'Fisherman', abbr: 'UT', color: '#f1c40f', needed: true, examples: ['Fisherman'], reason: 'Pull counters.' },
            { role: 'Hunter', abbr: 'TK', color: '#e74c3c', needed: true, examples: ['Hunter'], reason: 'Defense.' },
            { role: 'Cycle', abbr: 'CC', color: '#2ecc71', needed: true, examples: ['Skeletons'], reason: 'Cycle.' },
            { role: 'Air Defense', abbr: 'AD', color: '#e74c3c', needed: true, examples: ['Mother Witch', 'E-Wiz'], reason: 'Anti-swarm.' },
            { role: 'Big Spell', abbr: 'BS', color: '#e67e22', needed: true, examples: ['Fireball', 'Lightning'], reason: 'Reset/Kill buildings.' },
            { role: 'Small Spell', abbr: 'SS', color: '#d456fd', needed: true, examples: ['The Log'], reason: 'Defense.' },
            { role: 'Flex', abbr: 'BD', color: '#95a5a6', needed: false, examples: ['Monk', 'Ghost'], reason: 'Support.' }
        ],
        strategy: ['Use Fisherman to clear path.', 'Pocket RG for finish.']
    },
    'Goblin Giant': {
        role: 'Beatdown',
        archetype: 'Beatdown',
        difficulty: 'Medium (5/10)',
        hardCounters: [
            { name: 'P.E.K.K.A', reason: 'Shreds him.' },
            { name: 'Inferno Tower', reason: 'Melts him.' }
        ],
        imgUrl: 'https://raw.githubusercontent.com/RoyaleAPI/cr-api-assets/master/cards-75/goblin-giant.png',
        description: 'Mobile tank with spear goblins.',
        composition: [
            { role: 'Win Condition', abbr: 'WC', color: '#1abc9c', needed: true, examples: ['Goblin Giant'], reason: 'Tank.' },
            { role: 'Partner', abbr: 'SC', color: '#2ecc71', needed: true, examples: ['Sparky', 'Double Prince'], reason: 'Damage source.' },
            { role: 'Bait', abbr: 'UT', color: '#f1c40f', needed: true, examples: ['Minion Horde', 'Spear Goblins'], reason: 'Zap bait.' },
            { role: 'Rage', abbr: 'SS', color: '#d456fd', needed: true, examples: ['Rage'], reason: 'Speed boost.' },
            { role: 'Air Defense', abbr: 'AD', color: '#e74c3c', needed: true, examples: ['Hunter', 'Musketeer'], reason: 'Anti-air.' },
            { role: 'Mini Tank', abbr: 'MT', color: '#f1c40f', needed: true, examples: ['Dark Prince'], reason: 'Splash.' },
            { role: 'Small Spell', abbr: 'SS', color: '#d456fd', needed: true, examples: ['Zap'], reason: 'Reset.' },
            { role: 'Big Spell', abbr: 'BS', color: '#e67e22', needed: false, examples: ['Fireball'], reason: 'Clear.' }
        ],
        strategy: ['Kiting with Goblin Giant.', 'Pair with Sparky.']
    },
    'Electro Giant': {
        role: 'Beatdown',
        archetype: 'Beatdown',
        difficulty: 'Easy (4/10)',
        hardCounters: [
            { name: 'P.E.K.K.A', reason: 'Kills him without triggering zap.' },
            { name: 'Cannon + Ice Spirit', reason: 'Distracts effectively.' }
        ],
        imgUrl: 'https://raw.githubusercontent.com/RoyaleAPI/cr-api-assets/master/cards-75/electro-giant.png',
        description: 'Zaps attackers. Needs Tornado.',
        composition: [
            { role: 'Win Condition', abbr: 'WC', color: '#1abc9c', needed: true, examples: ['Electro Giant'], reason: 'Tank.' },
            { role: 'Tornado', abbr: 'UT', color: '#d456fd', needed: true, examples: ['Tornado'], reason: 'MANDATORY combo.' },
            { role: 'Building', abbr: 'BD', color: '#95a5a6', needed: true, examples: ['Cannon', 'Cage'], reason: 'Defense.' },
            { role: 'Big Spell', abbr: 'BS', color: '#e67e22', needed: true, examples: ['Lightning'], reason: 'Reset.' },
            { role: 'Splash', abbr: 'AD', color: '#e74c3c', needed: true, examples: ['Bowler', 'Baby Dragon'], reason: 'Support.' },
            { role: 'Tank Killer', abbr: 'TK', color: '#f1c40f', needed: true, examples: ['Prince', 'Mini PEKKA'], reason: 'Defense.' },
            { role: 'Cycle', abbr: 'CC', color: '#2ecc71', needed: true, examples: ['Bomber'], reason: 'Cycle.' },
            { role: 'Air', abbr: 'AD', color: '#e74c3c', needed: true, examples: ['Phoenix'], reason: 'Air support.' }
        ],
        strategy: ['Tornado ranged units into E-Giant.']
    },
    'Lava Hound': {
        role: 'Aerial Beatdown',
        archetype: 'Beatdown',
        difficulty: 'Medium (4/10)',
        hardCounters: [
            { name: 'Executioner', reason: 'Kills pups.' },
            { name: 'Inferno Tower', reason: 'Melts.' }
        ],
        imgUrl: 'https://raw.githubusercontent.com/RoyaleAPI/cr-api-assets/master/cards-75/lava-hound.png',
        description: 'Air tank.',
        composition: [
            { role: 'Win Condition', abbr: 'WC', color: '#1abc9c', needed: true, examples: ['Lava Hound'], reason: 'Tank.' },
            { role: 'Support', abbr: 'SC', color: '#2ecc71', needed: true, examples: ['Balloon', 'Inferno Dragon'], reason: 'Damage.' },
            { role: 'Air Support', abbr: 'AD', color: '#e74c3c', needed: true, examples: ['Mega Minion', 'Flying Machine'], reason: 'Support.' },
            { role: 'Ground Defense', abbr: 'MT', color: '#f1c40f', needed: true, examples: ['Barbarians', 'Guards'], reason: 'Ground defense.' },
            { role: 'Building', abbr: 'BD', color: '#95a5a6', needed: true, examples: ['Tombstone'], reason: 'Distraction.' },
            { role: 'Spell 1', abbr: 'SS', color: '#d456fd', needed: true, examples: ['Zap', 'Arrows'], reason: 'Clear minions.' },
            { role: 'Spell 2', abbr: 'BS', color: '#e67e22', needed: true, examples: ['Fireball', 'Void'], reason: 'Kill buildings.' },
            { role: 'Miner', abbr: 'UT', color: '#f1c40f', needed: true, examples: ['Miner'], reason: 'Tank for pups.' }
        ],
        strategy: ['Overwhelm air counters.']
    },
    'Golem': {
        role: 'Beatdown',
        archetype: 'Beatdown',
        difficulty: 'Easy (3/10)',
        hardCounters: [{ name: 'Inferno Tower', reason: 'Melts.' }, { name: 'PEKKA', reason: 'Shreds.' }],
        imgUrl: 'https://raw.githubusercontent.com/RoyaleAPI/cr-api-assets/master/cards-75/golem.png',
        description: 'Massive tank.',
        composition: [
            { role: 'Win Condition', abbr: 'WC', color: '#1abc9c', needed: true, examples: ['Golem'], reason: 'Tank.' },
            { role: 'Support', abbr: 'SC', color: '#2ecc71', needed: true, examples: ['Night Witch', 'Lumberjack'], reason: 'Damage.' },
            { role: 'Air', abbr: 'AD', color: '#e74c3c', needed: true, examples: ['Baby Dragon', 'Phoenix'], reason: 'Support.' },
            { role: 'Reset', abbr: 'SP', color: '#e74c3c', needed: true, examples: ['Electro Dragon'], reason: 'Reset.' },
            { role: 'Building', abbr: 'BD', color: '#95a5a6', needed: true, examples: ['Tombstone', 'Barbarians'], reason: 'Defense.' },
            { role: 'Tornado', abbr: 'SS', color: '#d456fd', needed: true, examples: ['Tornado'], reason: 'Clump.' },
            { role: 'Heavy Spell', abbr: 'BS', color: '#e67e22', needed: true, examples: ['Lightning'], reason: 'Clear.' },
            { role: 'Pump', abbr: 'UT', color: '#f1c40f', needed: true, examples: ['Elixir Collector'], reason: 'Ramp.' }
        ],
        strategy: ['Ignore damage in single elixir.', 'Go big in double.']
    },
    'Elixir Golem': {
        role: 'Beatdown',
        archetype: 'Beatdown',
        difficulty: 'Easy (2/10)',
        hardCounters: [{ name: 'Bomb Tower', reason: 'Splash.' }, { name: 'Executioner', reason: 'Splash.' }],
        imgUrl: 'https://raw.githubusercontent.com/RoyaleAPI/cr-api-assets/master/cards-75/elixir-golem.png',
        description: 'Risky tank. Gives opponent elixir.',
        composition: [
            { role: 'Win Condition', abbr: 'WC', color: '#1abc9c', needed: true, examples: ['Elixir Golem'], reason: 'Tank.' },
            { role: 'Healer', abbr: 'UT', color: '#f1c40f', needed: true, examples: ['Battle Healer'], reason: 'Heals blob.' },
            { role: 'Splash', abbr: 'SP', color: '#e74c3c', needed: true, examples: ['Electro Dragon', 'Skeleton Dragons'], reason: 'Support.' },
            { role: 'Rage', abbr: 'SS', color: '#d456fd', needed: true, examples: ['Rage'], reason: 'Speed.' },
            { role: 'Tornado', abbr: 'SS', color: '#d456fd', needed: true, examples: ['Tornado'], reason: 'Clump.' },
            { role: 'Support', abbr: 'SC', color: '#2ecc71', needed: true, examples: ['Night Witch'], reason: 'Damage.' },
            { role: 'Defense', abbr: 'CC', color: '#95a5a6', needed: true, examples: ['Barb Barrel'], reason: 'Defense.' },
            { role: 'Spell', abbr: 'BS', color: '#e67e22', needed: true, examples: ['Arrows'], reason: 'Clear.' }
        ],
        strategy: ['Stack Healer and E-Drag behind Golem.']
    },
    'Miner': {
        role: 'Control',
        archetype: 'Control',
        difficulty: 'Hard (8/10)',
        hardCounters: [{ name: 'Tornado', reason: 'King Activation.' }],
        imgUrl: 'https://raw.githubusercontent.com/RoyaleAPI/cr-api-assets/master/cards-75/miner.png',
        description: 'Chip damage.',
        composition: [
            { role: 'Win Condition', abbr: 'WC', color: '#1abc9c', needed: true, examples: ['Miner'], reason: 'Chip.' },
            { role: 'Secondary', abbr: 'SC', color: '#2ecc71', needed: true, examples: ['Wall Breakers', 'Poison'], reason: 'Damage.' },
            { role: 'Mini Tank', abbr: 'MT', color: '#f1c40f', needed: true, examples: ['Knight', 'Valkyrie'], reason: 'Defense.' },
            { role: 'Building', abbr: 'BD', color: '#95a5a6', needed: true, examples: ['Bomb Tower', 'Tesla'], reason: 'Defense.' },
            { role: 'Air Defense', abbr: 'AD', color: '#e74c3c', needed: true, examples: ['Mucher', 'Musketeer'], reason: 'Anti-air.' },
            { role: 'Cycle', abbr: 'CC', color: '#2ecc71', needed: true, examples: ['Bats', 'Spears'], reason: 'Distraction.' },
            { role: 'Small Spell', abbr: 'SS', color: '#d456fd', needed: true, examples: ['Log'], reason: 'Clear.' },
            { role: 'Big Spell', abbr: 'BS', color: '#e67e22', needed: true, examples: ['Poison'], reason: 'Damage.' }
        ],
        strategy: ['Chip constantly.', 'Mix up placement.']
    },
    'Goblin Drill': {
        role: 'Control',
        archetype: 'Control',
        difficulty: 'Medium (6/10)',
        hardCounters: [{ name: 'Valkyrie', reason: 'Splash.' }, { name: 'Dark Prince', reason: 'Splash.' }],
        imgUrl: 'https://raw.githubusercontent.com/RoyaleAPI/cr-api-assets/master/cards-75/goblin-drill.png',
        description: 'Spawns building on tower.',
        composition: [
            { role: 'Win Condition', abbr: 'WC', color: '#1abc9c', needed: true, examples: ['Goblin Drill'], reason: 'Pressure.' },
            { role: 'Wall Breakers', abbr: 'SC', color: '#2ecc71', needed: true, examples: ['Wall Breakers', 'Bomber'], reason: 'Secondary.' },
            { role: 'Building', abbr: 'BD', color: '#95a5a6', needed: true, examples: ['Tesla', 'Bomb Tower'], reason: 'Defense.' },
            { role: 'Mini Tank', abbr: 'MT', color: '#f1c40f', needed: true, examples: ['Knight', 'Valkyrie'], reason: 'Tank.' },
            { role: 'Big Spell', abbr: 'BS', color: '#e67e22', needed: true, examples: ['Fireball'], reason: 'Clear.' },
            { role: 'Small Spell', abbr: 'SS', color: '#d456fd', needed: true, examples: ['Log', 'Tornado'], reason: 'Control.' },
            { role: 'Air', abbr: 'AD', color: '#e74c3c', needed: true, examples: ['Magic Archer'], reason: 'Support.' },
            { role: 'Flex', abbr: 'UT', color: '#f1c40f', needed: true, examples: ['Skeletons'], reason: 'Cycle.' }
        ],
        strategy: ['Use Drill as tank for Wall Breakers.']
    },
    'Goblin Barrel': {
        role: 'Bait',
        archetype: 'Bait',
        difficulty: 'Hard (7/10)',
        hardCounters: [{ name: 'Log', reason: 'Hard counter.' }, { name: 'Arrows', reason: 'Hard counter.' }],
        imgUrl: 'https://raw.githubusercontent.com/RoyaleAPI/cr-api-assets/master/cards-75/goblin-barrel.png',
        description: 'Log bait.',
        composition: [
            { role: 'Win Condition', abbr: 'WC', color: '#1abc9c', needed: true, examples: ['Goblin Barrel'], reason: 'Damage.' },
            { role: 'Bait 1', abbr: 'SC', color: '#2ecc71', needed: true, examples: ['Princess'], reason: 'Bait.' },
            { role: 'Bait 2', abbr: 'SC', color: '#2ecc71', needed: true, examples: ['Gang'], reason: 'Bait.' },
            { role: 'Tank', abbr: 'MT', color: '#f1c40f', needed: true, examples: ['Knight', 'Valkyrie'], reason: 'Tank.' },
            { role: 'Building', abbr: 'BD', color: '#95a5a6', needed: true, examples: ['Inferno Tower', 'Tesla'], reason: 'Stop tanks.' },
            { role: 'Big Spell', abbr: 'BS', color: '#e67e22', needed: true, examples: ['Rocket'], reason: 'Finish.' },
            { role: 'Spirit', abbr: 'CC', color: '#2ecc71', needed: true, examples: ['Ice Spirit'], reason: 'Cycle.' },
            { role: 'Small Spell', abbr: 'SS', color: '#d456fd', needed: true, examples: ['Log'], reason: 'Defense.' }
        ],
        strategy: ['Juke barrel placements.']
    },
    'Skeleton Barrel': {
        role: 'Bait',
        archetype: 'Bait',
        difficulty: 'Medium (5/10)',
        hardCounters: [{ name: 'Zap', reason: 'Kills all.' }, { name: 'Tornado', reason: 'Activates King.' }],
        imgUrl: 'https://raw.githubusercontent.com/RoyaleAPI/cr-api-assets/master/cards-75/skeleton-barrel.png',
        description: 'Swarm dropper.',
        composition: [
            { role: 'Win Condition', abbr: 'WC', color: '#1abc9c', needed: true, examples: ['Skeleton Barrel'], reason: 'Damage.' },
            { role: 'Tank', abbr: 'MT', color: '#f1c40f', needed: true, examples: ['Mega Knight', 'Miner'], reason: 'Tank.' },
            { role: 'Bait 1', abbr: 'SC', color: '#2ecc71', needed: true, examples: ['Spear Goblins'], reason: 'Bait.' },
            { role: 'Bait 2', abbr: 'SC', color: '#2ecc71', needed: true, examples: ['Bats'], reason: 'Bait.' },
            { role: 'Killer', abbr: 'TK', color: '#e74c3c', needed: true, examples: ['Prince'], reason: 'Defense.' },
            { role: 'Miner', abbr: 'SC', color: '#2ecc71', needed: true, examples: ['Miner'], reason: 'Tank.' },
            { role: 'Small Spell', abbr: 'SS', color: '#d456fd', needed: true, examples: ['Zap'], reason: 'Clear.' },
            { role: 'Flex', abbr: 'BS', color: '#e67e22', needed: false, examples: ['Fireball'], reason: 'Clear.' }
        ],
        strategy: ['Pair with Miner for timing push.']
    },
    'Wall Breakers': {
        role: 'Cycle',
        archetype: 'Cycle',
        difficulty: 'Very Hard (9/10)',
        hardCounters: [{ name: 'Log', reason: 'Kills them.' }, { name: 'Arrows', reason: 'Kills them.' }],
        imgUrl: 'https://raw.githubusercontent.com/RoyaleAPI/cr-api-assets/master/cards-75/wall-breakers.png',
        description: 'Cheap pressure.',
        composition: [
            { role: 'Win Condition', abbr: 'WC', color: '#1abc9c', needed: true, examples: ['Wall Breakers'], reason: 'Pressure.' },
            { role: 'Tank', abbr: 'MT', color: '#f1c40f', needed: true, examples: ['Miner', 'Drill'], reason: 'Tank.' },
            { role: 'Building', abbr: 'BD', color: '#95a5a6', needed: true, examples: ['Bomb Tower'], reason: 'Defense.' },
            { role: 'Cycle', abbr: 'CC', color: '#2ecc71', needed: true, examples: ['Spears'], reason: 'Chip.' },
            { role: 'Air', abbr: 'CC', color: '#2ecc71', needed: true, examples: ['Bats'], reason: 'DPS.' },
            { role: 'Spell 1', abbr: 'SS', color: '#d456fd', needed: true, examples: ['Log'], reason: 'Control.' },
            { role: 'Spell 2', abbr: 'BS', color: '#e67e22', needed: true, examples: ['Poison'], reason: 'Control.' },
            { role: 'Champion', abbr: 'UT', color: '#f1c40f', needed: true, examples: ['Mighty Miner'], reason: 'Defense.' }
        ],
        strategy: ['Split lane pressure.']
    },
    'Ram Rider': {
        role: 'Bridge Spam',
        archetype: 'Bridge Spam',
        difficulty: 'Medium (6/10)',
        hardCounters: [{ name: 'Building', reason: 'Kites.' }, { name: 'Mini PEKKA', reason: 'Kills.' }],
        imgUrl: 'https://raw.githubusercontent.com/RoyaleAPI/cr-api-assets/master/cards-75/ram-rider.png',
        description: 'Snare defense + Win con.',
        composition: [
            { role: 'Win Condition', abbr: 'WC', color: '#1abc9c', needed: true, examples: ['Ram Rider'], reason: 'Win con/Defense.' },
            { role: 'Spam 1', abbr: 'SC', color: '#2ecc71', needed: true, examples: ['Bandit'], reason: 'Pressure.' },
            { role: 'Spam 2', abbr: 'SC', color: '#2ecc71', needed: true, examples: ['Ghost'], reason: 'Pressure.' },
            { role: 'P.E.K.K.A', abbr: 'MT', color: '#f1c40f', needed: true, examples: ['P.E.K.K.A'], reason: 'Tank killer.' },
            { role: 'Air', abbr: 'AD', color: '#e74c3c', needed: true, examples: ['E-Wiz'], reason: 'Control.' },
            { role: 'Spell 1', abbr: 'SS', color: '#d456fd', needed: true, examples: ['Barb Barrel'], reason: 'Defense.' },
            { role: 'Spell 2', abbr: 'BS', color: '#e67e22', needed: true, examples: ['Fireball'], reason: 'Clear.' },
            { role: 'Flex', abbr: 'CC', color: '#95a5a6', needed: false, examples: ['Archer Queen'], reason: 'Support.' }
        ],
        strategy: ['Use defensively to snare Hog/Loon first.']
    },
    'Battle Ram': {
        role: 'Bridge Spam',
        archetype: 'Bridge Spam',
        difficulty: 'Medium (5/10)',
        hardCounters: [{ name: 'Building', reason: 'Kites.' }],
        imgUrl: 'https://raw.githubusercontent.com/RoyaleAPI/cr-api-assets/master/cards-75/battle-ram.png',
        description: 'Kiting + Pressure.',
        composition: [
            { role: 'Win Condition', abbr: 'WC', color: '#1abc9c', needed: true, examples: ['Battle Ram'], reason: 'Pressure.' },
            { role: 'PEKKA', abbr: 'MT', color: '#f1c40f', needed: true, examples: ['P.E.K.K.A'], reason: 'Defense.' },
            { role: 'Spam', abbr: 'SC', color: '#2ecc71', needed: true, examples: ['Bandit', 'Ghost'], reason: 'Pressure.' },
            { role: 'Stun', abbr: 'AD', color: '#e74c3c', needed: true, examples: ['E-Wiz'], reason: 'Control.' },
            { role: 'Sniper', abbr: 'AD', color: '#e74c3c', needed: true, examples: ['Magic Archer'], reason: 'Piece.' },
            { role: 'Spell 1', abbr: 'SS', color: '#d456fd', needed: true, examples: ['Zap'], reason: 'Reset.' },
            { role: 'Spell 2', abbr: 'BS', color: '#e67e22', needed: true, examples: ['Poison'], reason: 'Area.' },
            { role: 'Kite', abbr: 'UT', color: '#95a5a6', needed: false, examples: ['Ram kites too'], reason: 'Kite.' }
        ],
        strategy: ['Kite heavy units with Ram.']
    },
    'Royal Hogs': {
        role: 'Split Lane',
        archetype: 'Fireball Bait',
        difficulty: 'Hard (7/10)',
        hardCounters: [{ name: 'Fireball', reason: 'Hard counter.' }, { name: 'Mega Knight', reason: 'Splash.' }],
        imgUrl: 'https://raw.githubusercontent.com/RoyaleAPI/cr-api-assets/master/cards-75/royal-hogs.png',
        description: 'Split lane pigs.',
        composition: [
            { role: 'Win Condition', abbr: 'WC', color: '#1abc9c', needed: true, examples: ['Royal Hogs'], reason: 'Pressure.' },
            { role: 'Bait 1', abbr: 'SC', color: '#2ecc71', needed: true, examples: ['Recruits', 'Zappies'], reason: 'Fireball bait.' },
            { role: 'Bait 2', abbr: 'SC', color: '#2ecc71', needed: true, examples: ['Flying Machine'], reason: 'Bait.' },
            { role: 'Building', abbr: 'BD', color: '#95a5a6', needed: true, examples: ['Cage'], reason: 'Defense.' },
            { role: 'Spell 1', abbr: 'SS', color: '#d456fd', needed: true, examples: ['Arrow'], reason: 'Clear.' },
            { role: 'Spell 2', abbr: 'BS', color: '#e67e22', needed: false, examples: ['Fireball'], reason: 'Clear.' },
            { role: 'Killer', abbr: 'TK', color: '#f1c40f', needed: true, examples: ['Hunter'], reason: 'Defense.' },
            { role: 'Cycle', abbr: 'CC', color: '#2ecc71', needed: true, examples: ['E-Spirit'], reason: 'Cycle.' }
        ],
        strategy: ['Split pigs 2-2.']
    },
    'Three Musketeers': {
        role: 'Split Lane',
        archetype: 'Fireball Bait',
        difficulty: 'Very Hard (10/10)',
        hardCounters: [{ name: 'Fireball', reason: 'Kills/Maims.' }, { name: 'Lightning', reason: 'Dead.' }],
        imgUrl: 'https://raw.githubusercontent.com/RoyaleAPI/cr-api-assets/master/cards-75/three-musketeers.png',
        description: 'High risk high reward.',
        composition: [
            { role: 'Win Condition', abbr: 'WC', color: '#1abc9c', needed: true, examples: ['3M'], reason: 'Power.' },
            { role: 'Pump', abbr: 'UT', color: '#f1c40f', needed: true, examples: ['Collector'], reason: 'Bait.' },
            { role: 'Tank', abbr: 'MT', color: '#f1c40f', needed: true, examples: ['Ghost', 'Bandit'], reason: 'Tank.' },
            { role: 'Kite', abbr: 'MT', color: '#f1c40f', needed: true, examples: ['Ice Golem'], reason: 'Kite.' },
            { role: 'Ram', abbr: 'SC', color: '#2ecc71', needed: true, examples: ['Battle Ram'], reason: 'Pressure.' },
            { role: 'Bait', abbr: 'SC', color: '#2ecc71', needed: true, examples: ['Minion Horde'], reason: 'Bait.' },
            { role: 'Spell', abbr: 'SS', color: '#d456fd', needed: true, examples: ['Barb Barrel'], reason: 'Defense.' },
            { role: 'Heal', abbr: 'SS', color: '#d456fd', needed: false, examples: ['Heal Spirit'], reason: 'Sustain.' }
        ],
        strategy: ['Always split behind King.']
    },
    'Mortar': {
        role: 'Siege',
        archetype: 'Siege',
        difficulty: 'Hard (8/10)',
        hardCounters: [{ name: 'Royal Giant', reason: 'Counters siege.' }, { name: 'Earthquake', reason: 'Breaks it.' }],
        imgUrl: 'https://raw.githubusercontent.com/RoyaleAPI/cr-api-assets/master/cards-75/mortar.png',
        description: 'Cheap siege.',
        composition: [
            { role: 'Win Condition', abbr: 'WC', color: '#1abc9c', needed: true, examples: ['Mortar'], reason: 'Siege.' },
            { role: 'Secondary', abbr: 'SC', color: '#2ecc71', needed: true, examples: ['Miner', 'Hog'], reason: 'Chip.' },
            { role: 'Bait', abbr: 'UT', color: '#f1c40f', needed: true, examples: ['Gang', 'Minions'], reason: 'Bait.' },
            { role: 'Killer', abbr: 'TK', color: '#e74c3c', needed: true, examples: ['Cannon Cart', 'Prince'], reason: 'Defense.' },
            { role: 'Big Spell', abbr: 'BS', color: '#e67e22', needed: true, examples: ['Rocket', 'Fireball'], reason: 'Clear.' },
            { role: 'Small Spell', abbr: 'SS', color: '#d456fd', needed: true, examples: ['Log'], reason: 'Pushback.' },
            { role: 'Champion', abbr: 'UT', color: '#f1c40f', needed: true, examples: ['Skeleton King'], reason: 'Pressure.' },
            { role: 'Cycle', abbr: 'AD', color: '#2ecc71', needed: true, examples: ['Bats'], reason: 'DPS.' }
        ],
        strategy: ['Defensive mortar first.']
    },
    'X-Bow': {
        role: 'Siege',
        archetype: 'Siege',
        difficulty: 'Very Hard (9/10)',
        hardCounters: [{ name: 'RG', reason: 'Counter.' }, { name: 'EQ', reason: 'Counter.' }],
        imgUrl: 'https://raw.githubusercontent.com/RoyaleAPI/cr-api-assets/master/cards-75/x-bow.png',
        description: 'Precision siege.',
        composition: [
            { role: 'Win Condition', abbr: 'WC', color: '#1abc9c', needed: true, examples: ['X-Bow'], reason: 'Siege.' },
            { role: 'Building', abbr: 'BD', color: '#95a5a6', needed: true, examples: ['Tesla'], reason: 'Support.' },
            { role: 'Mini Tank', abbr: 'MT', color: '#f1c40f', needed: true, examples: ['Knight'], reason: 'Block.' },
            { role: 'Support', abbr: 'AD', color: '#e74c3c', needed: true, examples: ['Archers', 'Queen'], reason: 'DPS.' },
            { role: 'Cycle 1', abbr: 'C1', color: '#2ecc71', needed: true, examples: ['Skeletons'], reason: 'Cycle.' },
            { role: 'Cycle 2', abbr: 'C2', color: '#2ecc71', needed: true, examples: ['Ice Spirit'], reason: 'Cycle.' },
            { role: 'Small Spell', abbr: 'SS', color: '#d456fd', needed: true, examples: ['Log'], reason: 'Knockback.' },
            { role: 'Big Spell', abbr: 'BS', color: '#e67e22', needed: true, examples: ['Fireball'], reason: 'Clear.' }
        ],
        strategy: ['Protect the X-Bow.']
    },
    'Graveyard': {
        role: 'Control',
        archetype: 'Control',
        difficulty: 'Medium (6/10)',
        hardCounters: [{ name: 'Poison', reason: 'Kills.' }, { name: 'Mother Witch', reason: 'Curses.' }],
        imgUrl: 'https://raw.githubusercontent.com/RoyaleAPI/cr-api-assets/master/cards-75/graveyard.png',
        description: 'RNG Spawns.',
        composition: [
            { role: 'Win Condition', abbr: 'WC', color: '#1abc9c', needed: true, examples: ['Graveyard'], reason: 'Win con.' },
            { role: 'Tank', abbr: 'MT', color: '#f1c40f', needed: true, examples: ['Knight', 'Valk', 'Giant'], reason: 'Tank.' },
            { role: 'Splash', abbr: 'AD', color: '#e74c3c', needed: true, examples: ['Baby Dragon', 'Ice Wiz'], reason: 'Control.' },
            { role: 'Building', abbr: 'BD', color: '#95a5a6', needed: true, examples: ['Tombstone'], reason: 'Defense.' },
            { role: 'Spell', abbr: 'SS', color: '#d456fd', needed: true, examples: ['Poison'], reason: 'Clear.' },
            { role: 'Small Spell', abbr: 'SS', color: '#d456fd', needed: true, examples: ['Barb Barrel'], reason: 'Control.' },
            { role: 'Support', abbr: 'CC', color: '#2ecc71', needed: true, examples: ['Zappies'], reason: 'Stun.' },
            { role: 'Killer', abbr: 'UT', color: '#f1c40f', needed: true, examples: ['Cannon Cart'], reason: 'DPS.' }
        ],
        strategy: ['Counter-push only.']
    }
};
