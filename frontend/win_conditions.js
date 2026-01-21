window.WIN_CONDITION_GUIDES = {
    'Miner': {
        role: 'Chip / Control',
        imgUrl: 'https://raw.githubusercontent.com/RoyaleAPI/cr-api-assets/master/cards-75/miner.png',
        description: 'The Miner is a unique win condition that can be placed anywhere on the arena. He deals reduced damage to towers but is excellent for consistent chip damage and tanking for other troops.',
        composition: [
            {
                role: 'Win Condition (The Star)',
                abbr: 'WC',
                color: '#1abc9c', // Cyan
                needed: true,
                examples: ['Miner'],
                reason: 'The core of your deck. Use him to chip towers and tank for the Wall Breakers or Bats.'
            },
            {
                role: 'Secondary Win Condition',
                abbr: 'SC',
                color: '#2ecc71', // Green
                needed: true,
                examples: ['Wall Breakers', 'Mortar', 'Balloon', 'Poison'],
                reason: 'Miner often struggles to take towers alone. Pair him with a card that benefits from his tanking.'
            },
            {
                role: 'Mini Tank / Distraction',
                abbr: 'MT',
                color: '#f1c40f', // Yellow
                needed: true,
                examples: ['Knight', 'Valkyrie', 'Ice Golem', 'Mighty Miner'],
                reason: 'You need a solid defensive unit to absorb damage while your towers and other troops defend.'
            },
            {
                role: 'Building / Tank Killer',
                abbr: 'BD',
                color: '#95a5a6', // Grey
                needed: true,
                examples: ['Bomb Tower', 'Tesla', 'Inferno Tower'],
                reason: 'Essential for pulling Hogs, Giants, and Golems to the center.'
            },
            {
                role: 'Air Defense',
                abbr: 'AD',
                color: '#e74c3c', // Red
                needed: true,
                examples: ['Magic Archer', 'Musketeer'],
                reason: 'Your main ranged damage dealer. Protect this alignment!'
            },
            {
                role: 'Cheap Air / Cycle',
                abbr: 'CC',
                color: '#2ecc71', // Green
                needed: true,
                examples: ['Spear Goblins', 'Bats', 'Minions'],
                reason: 'Cheap DPS units that can distract enemies or swarm tanks.'
            },
            {
                role: 'Small Spell',
                abbr: 'SS',
                color: '#d456fd', // Purple
                needed: true,
                examples: ['The Log', 'Zap', 'Snowball'],
                reason: 'To clear swarms guarding user towers (like Skarmy or Goblin Gang).'
            },
            {
                role: 'Big Spell',
                abbr: 'BS',
                color: '#e67e22', // Orange
                needed: true,
                examples: ['Poison', 'Fireball'],
                reason: 'Miner + Poison is the bread and butter. Kills units near tower while damaging tower.'
            }
        ],
        strategy: [
            '**The "Chip" Game:** Never overcommit on a Miner push. Support him with cheap troops like Wall Breakers or Bats. Your goal is to get hundreds of damage, not thousands, in one go.',
            '**Tanking:** Send the Miner to the tower right before your counter-attacking troops (like Bats or Minions) cross the bridge. The tower attempts to shoot the Miner, allowing your fragile troops to wreak havoc.',
            '**Placement:** Variate your Miner placement to avoid predictions (catching him with a Knight or Skeletons).',
            '**Defense First:** Miner decks usually rely on strong defense (Control). Defend efficiently, then use surviving troops for a counter-push with a fresh Miner.'
        ]
    },
    'Hog Rider': {
        role: 'Cycle / Aggro',
        imgUrl: 'https://raw.githubusercontent.com/RoyaleAPI/cr-api-assets/master/cards-75/hog-rider.png',
        description: 'The Hog Rider is a fast, building-targeting unit that jumps over the river. He punishes opponents who are low on elixir or lack a building.',
        composition: [
            {
                role: 'Win Condition',
                abbr: 'WC',
                color: '#1abc9c',
                needed: true,
                examples: ['Hog Rider'],
                reason: 'Your main tower taker. Keep pressuring!'
            },
            {
                role: 'Building',
                abbr: 'BD',
                color: '#95a5a6',
                needed: true,
                examples: ['Cannon', 'Tesla', 'Bomb Tower'],
                reason: 'Hog decks are fast. You need a cheap building to kite tanks like Golem or E-Giant.'
            },
            {
                role: 'Anti-Air / Support',
                abbr: 'AD',
                color: '#e74c3c', // Red
                needed: true,
                examples: ['Musketeer', 'Archer Queen', 'Firecracker'],
                reason: 'Your main defense against air (Lava Hound, Balloon).'
            },
            {
                role: 'Mini Tank',
                abbr: 'MT',
                color: '#f1c40f',
                needed: true,
                examples: ['Ice Golem', 'Knight', 'Valkyrie'],
                reason: 'To tank for your Hog or distract enemy troops (kiting PEKKA).'
            },
            {
                role: 'Cycle Card 1',
                abbr: 'C1',
                color: '#2ecc71',
                needed: true,
                examples: ['Skeletons', 'Goblins'],
                reason: 'Cheapest distraction. Cycle back to Hog faster.'
            },
            {
                role: 'Cycle Card 2',
                abbr: 'C2',
                color: '#2ecc71',
                needed: true,
                examples: ['Ice Spirit', 'Electro Spirit'],
                reason: 'Freeze/Stun units for 1 elixir. Helps Hog get an extra hit.'
            },
            {
                role: 'Small Spell',
                abbr: 'SS',
                color: '#d456fd',
                needed: true,
                examples: ['The Log', 'Zap'],
                reason: 'Clear Skarmy/Goblins that block your Hog.'
            },
            {
                role: 'Big Spell',
                abbr: 'BS',
                color: '#e67e22',
                needed: true,
                examples: ['Fireball', 'Earthquake'],
                reason: 'Kill buildings (Cannon/Tesla) that stop your Hog.'
            }
        ],
        strategy: [
            '**Out-Cycle:** The main goal is to play your Hog Rider faster than they can play their counter (like a Cannon or Tornado). Use cheap cards to cycle back quickly.',
            '**Prediction:** If they always defend with Skeleton Army, pre-fire your Log. If they use a Cannon, prepare your Earthquake.',
            '**Punish:** If the opponent plays a heavy tank (Golem/Lava Hound) in the back, immediately attack the OTHER lane with Hog Rider to force them to spend elixir defending.'
        ]
    },
    'Golem': {
        role: 'Beatdown',
        imgUrl: 'https://raw.githubusercontent.com/RoyaleAPI/cr-api-assets/master/cards-75/golem.png',
        description: 'The Golem is a massive tank that explodes into Golemites. It costs 8 Elixir, so playing it is a commitment to a massive, overwhelming push.',
        composition: [
            {
                role: 'Win Condition',
                abbr: 'WC',
                color: '#1abc9c',
                needed: true,
                examples: ['Golem'],
                reason: 'The Tank. Do not play him until you have an advantage or its Double Elixir.'
            },
            {
                role: 'Support Units (DPS)',
                abbr: 'SC',
                color: '#2ecc71', // Green
                needed: true,
                examples: ['Night Witch', 'Lumberjack', 'Mini PEKKA'],
                reason: 'Golem does low damage. These guys do the heavy hitting behind him.'
            },
            {
                role: 'Air Support',
                abbr: 'AD',
                color: '#e74c3c',
                needed: true,
                examples: ['Baby Dragon', 'Mega Minion', 'Phoenix'],
                reason: 'To kill Minions or defenders hitting your Golem.'
            },
            {
                role: 'Splash / Reset',
                abbr: 'SP',
                color: '#e74c3c',
                needed: true,
                examples: ['Electro Dragon', 'Skeleton Dragons'],
                reason: 'Chain damage to clear swarms and reset Inferno Towers.'
            },
            {
                role: 'Building / Defense',
                abbr: 'BD',
                color: '#95a5a6',
                needed: true,
                examples: ['Tombstone', 'Goblin Cage', 'Barbarians'], // Barbarians act as "Building" equivalent for defense
                reason: 'Defensive ground unit to stop Hogs/Princes when you are low elixir.'
            },
            {
                role: 'Spell / Reset',
                abbr: 'SS',
                color: '#d456fd',
                needed: true,
                examples: ['Tornado', 'Zap'],
                reason: 'Tornado pulls all defenders into your Golem death damage or Baby Dragon splash.'
            },
            {
                role: 'Heavy Spell',
                abbr: 'BS',
                color: '#e67e22',
                needed: true,
                examples: ['Lightning', 'Rocket'],
                reason: 'Delete their defensive building or heavy hitter (Wizard/Musk).'
            },
            {
                role: 'Utility / Pump',
                abbr: 'UT',
                color: '#f1c40f',
                needed: true,
                examples: ['Elixir Collector', 'Bomber', 'Barbarian Barrel'],
                reason: 'Elixir Collector forces them to spell it, protecting your support troops.'
            }
        ],
        strategy: [
            '**Sacrifice Tower Health:** In Single Elixir, it is okay to take some damage to build an elixir lead. Do not defend everything.',
            '**The Golem Push:** Ideally, play Golem in the back only during Double Elixir (2:00) or if you have a massive advantage. Placing him at the bridge is risky but can work as a surprise.',
            '**Behind the Golem:** Always place Night Witch or Lumberjack BEHIND the Golem so the Golem tanks all the shots.',
            '**Spell Value:** Save Lightning to hit 3 targets (Tower + Building + Troop) for maximum value.'
        ]
    },
    'Graveyard': {
        role: 'Control / RNG',
        imgUrl: 'https://raw.githubusercontent.com/RoyaleAPI/cr-api-assets/master/cards-75/graveyard.png',
        description: 'Graveyard spawns skeletons anywhere in the arena. It is deadly if the tower is distracted by a tank.',
        composition: [
            {
                role: 'Win Condition',
                abbr: 'WC',
                color: '#1abc9c',
                needed: true,
                examples: ['Graveyard'],
                reason: 'Your win condition. Only play when you have a tank!'
            },
            {
                role: 'Main Tank',
                abbr: 'MT',
                color: '#f1c40f',
                needed: true,
                examples: ['Knight', 'Valkyrie', 'Giant'],
                reason: 'Tanks the tower shots so skeletons can accumulate.'
            },
            {
                role: 'Splash Control',
                abbr: 'AD',
                color: '#e74c3c',
                needed: true,
                examples: ['Baby Dragon', 'Ice Wizard', 'Bowler'],
                reason: 'Defends against swarms and then walks in front of the Graveyard.'
            },
            {
                role: 'Defensive Building',
                abbr: 'BD',
                color: '#95a5a6',
                needed: true,
                examples: ['Tombstone', 'Goblin Cage', 'Bomb Tower'],
                reason: 'Key for Splashyard defense against ground tanks.'
            },
            {
                role: 'Utility Spell',
                abbr: 'SS',
                color: '#d456fd',
                needed: true,
                examples: ['Poison', 'Freeze'],
                reason: 'Poison kills the archers/minions defending your Graveyard.'
            },
            {
                role: 'Small Spell',
                abbr: 'SS',
                color: '#d456fd',
                needed: true,
                examples: ['Barbarian Barrel', 'Tornado'],
                reason: 'Barb Barrel distracts wizards; Tornado activates King Tower.'
            },
            {
                role: 'Cycle / Support',
                abbr: 'CC',
                color: '#2ecc71',
                needed: true,
                examples: ['Zappies', 'Electro Wizard', 'Skeletons'],
                reason: 'Stun/Reset units are great in Graveyard control.'
            },
            {
                role: 'Response Card',
                abbr: 'UT',
                color: '#f1c40f',
                needed: true,
                examples: ['Cannon Cart', 'Hunter', 'Mega Minion'],
                reason: 'High DPS to kill tanks quickly.'
            }
        ],
        strategy: [
            '**Counter-Push Only:** Rarely play Graveyard naked. Defend a push with a Knight or Baby Dragon, and when that unit crosses the bridge with full HP, drop Graveyard.',
            '**Poison Timing:** If you know they have Minions or Skarmy, hover Poison over their tower as soon as you play Graveyard.',
            '**King Tower Safety:** Be careful with placement. If you place it too close to the King Tower, a stray Skeleton might activate it, which ruins Graveyard effectiveness.'
        ]
    },
    'X-Bow': {
        role: 'Siege',
        imgUrl: 'https://raw.githubusercontent.com/RoyaleAPI/cr-api-assets/master/cards-75/x-bow.png',
        description: 'The X-Bow is a building that can target the enemy tower from your side of the river. It requires extreme precision and defense.',
        composition: [
            {
                role: 'Win Condition',
                abbr: 'WC',
                color: '#1abc9c',
                needed: true,
                examples: ['X-Bow'],
                reason: 'Protect this at all costs!'
            },
            {
                role: 'Defensive Building',
                abbr: 'BD',
                color: '#95a5a6',
                needed: true,
                examples: ['Tesla'],
                reason: 'Place next to X-Bow to kill tanks.'
            },
            {
                role: 'Mini Tank',
                abbr: 'MT',
                color: '#f1c40f',
                needed: true,
                examples: ['Knight', 'Ice Golem', 'Valkyrie'],
                reason: 'Blocks the bridge so units cannot lock onto X-Bow.'
            },
            {
                role: 'Ranged Support',
                abbr: 'AD',
                color: '#e74c3c',
                needed: true,
                examples: ['Archers', 'Queen', 'Musketeer'],
                reason: 'DPS to kill tanks from a distance.'
            },
            {
                role: 'Cycle 1',
                abbr: 'C1',
                color: '#2ecc71',
                needed: true,
                examples: ['Skeletons', 'Goblins'],
                reason: 'Cycle fast to get back to X-Bow or Tesla.'
            },
            {
                role: 'Cycle 2',
                abbr: 'C2',
                color: '#2ecc71',
                needed: true,
                examples: ['Ice Spirit', 'Electro Spirit'],
                reason: 'Chain stuns to protect X-Bow.'
            },
            {
                role: 'Small Spell',
                abbr: 'SS',
                color: '#d456fd',
                needed: true,
                examples: ['The Log', 'Snowball'],
                reason: 'Knockback is crucial to push units away from X-Bow.'
            },
            {
                role: 'Big Spell',
                abbr: 'BS',
                color: '#e67e22',
                needed: true,
                examples: ['Fireball', 'Rocket'],
                reason: 'Rocket logic: Defend until overtime, then Rocket cycle the tower.'
            }
        ],
        strategy: [
            '**Lock On:** The goal is to clear all ground troops so the X-Bow locks onto the tower.',
            '**Defensive X-Bow:** If playing against a heavy tank (Golem), use X-Bow defensively in the middle first. Do not attack until you have a huge elixir lead.',
            '**Protect the Siege:** Place Tesla right next to X-Bow or pre-place troops to block their bridge spam attacks.'
        ]
    },
    'Lava Hound': {
        role: 'Aerial Beatdown',
        imgUrl: 'https://raw.githubusercontent.com/RoyaleAPI/cr-api-assets/master/cards-75/lava-hound.png',
        description: 'The ultimate air tank. When it dies, it pops into Lava Pups which do high damage.',
        composition: [
            {
                role: 'Win Condition',
                abbr: 'WC',
                color: '#1abc9c',
                needed: true,
                examples: ['Lava Hound'],
                reason: 'Wait for 10 elixir, play it in the corner.'
            },
            {
                role: 'Air Support 1',
                abbr: 'SC',
                color: '#2ecc71',
                needed: true,
                examples: ['Balloon', 'Inferno Dragon'],
                reason: 'The main damage source behind the Hound.'
            },
            {
                role: 'Air Support 2',
                abbr: 'AD',
                color: '#e74c3c',
                needed: true,
                examples: ['Flying Machine', 'Mega Minion'],
                reason: 'Snipes units and travels over the river.'
            },
            {
                role: 'Ground Distraction 1',
                abbr: 'MT',
                color: '#f1c40f',
                needed: true,
                examples: ['Barbarians', 'Guards'],
                reason: 'To kill Hog Riders and E-Giants on defense.'
            },
            {
                role: 'Ground Distraction 2 / Building',
                abbr: 'BD',
                color: '#95a5a6',
                needed: true,
                examples: ['Tombstone', 'Goblin Cage'],
                reason: 'Pulls tanks to the middle.'
            },
            {
                role: 'Spell 1',
                abbr: 'SS',
                color: '#d456fd',
                needed: true,
                examples: ['Zap', 'Arrows'],
                reason: 'Crucial for Minion Hordes.'
            },
            {
                role: 'Spell 2',
                abbr: 'BS',
                color: '#e67e22',
                needed: true,
                examples: ['Fireball', 'Void'],
                reason: 'Kills Musketeers/Wizards.'
            },
            {
                role: 'Support/Miner',
                abbr: 'UT',
                color: '#f1c40f',
                needed: true,
                examples: ['Miner', 'Skeleton Dragons'],
                reason: 'Miner can tank for the Lava Pups when the Hound pops.'
            }
        ],
        strategy: [
            '**Air Superiority:** Most decks only have 2-3 air counters. If you overwhelm them with 4-5 air cards, they cannot defend.',
            '**Soaking Damage:** Let the Lava Hound tank the tower shots while the Balloon sneaks in behind it.',
            '**Tower Trade:** Like Golem, you often sacrifice a tower to take a 3-crown victory.'
        ]
    },
    'Giant': {
        role: 'Beatdown',
        imgUrl: 'https://raw.githubusercontent.com/RoyaleAPI/cr-api-assets/master/cards-75/giant.png',
        description: 'The original tank. Cheap (5 Elixir) and effective when paired with high damage support.',
        composition: [
            { role: 'Win Condition', abbr: 'WC', color: '#1abc9c', needed: true, examples: ['Giant'], reason: 'The meat shield.' },
            { role: 'Heavy Hitter', abbr: 'SC', color: '#2ecc71', needed: true, examples: ['Prince', 'Mini P.E.K.K.A', 'Sparky'], reason: 'Giant + Prince is a classic. Giant tanks, Prince kills everything.' },
            { role: 'Splash Support', abbr: 'AD', color: '#e74c3c', needed: true, examples: ['Dark Prince', 'Bowler'], reason: 'Clears ground swarms like Skarmy.' },
            { role: 'Air Defense', abbr: 'AD', color: '#e74c3c', needed: true, examples: ['Musketeer', 'Electro Wizard', 'Mega Minion'], reason: 'Protects Giant from Minions/Inferno Dragon.' },
            { role: 'Spell 1', abbr: 'SS', color: '#d456fd', needed: true, examples: ['Zap', 'Arrows'], reason: 'Reset Infernos or kill swarms.' },
            { role: 'Spell 2', abbr: 'BS', color: '#e67e22', needed: true, examples: ['Fireball', 'Poison'], reason: 'Kill defensive buildings.' },
            { role: 'Mini Tank', abbr: 'MT', color: '#f1c40f', needed: true, examples: ['Miner', 'Fisherman'], reason: 'Fisherman pulls tank killers away from Giant.' },
            { role: 'Cycle / Utility', abbr: 'CC', color: '#2ecc71', needed: true, examples: ['Mega Minion', 'Phoenix'], reason: 'Versatile support.' }
        ],
        strategy: ['**Double Trouble:** Giant + Prince is scary. If they defend the Giant, the Prince charges the tower.', '**Graveyard Synergy:** Giant is also the best tank for Graveyard decks.']
    },
    'Royal Giant': {
        role: 'Ranged Tank',
        imgUrl: 'https://raw.githubusercontent.com/RoyaleAPI/cr-api-assets/master/cards-75/royal-giant.png',
        description: 'A tank that shoots from range. He guarantees damage if you can break through their building.',
        composition: [
            { role: 'Win Condition', abbr: 'WC', color: '#1abc9c', needed: true, examples: ['Royal Giant'], reason: 'The King. Play him at the bridge or in the back.' },
            { role: 'Support (Fisherman)', abbr: 'UT', color: '#f1c40f', needed: true, examples: ['Fisherman'], reason: 'MANDATORY. Pulls P.E.K.K.A and Mini P.E.K.K.A away from your RG.' },
            { role: 'Support (Hunter)', abbr: 'TK', color: '#e74c3c', needed: true, examples: ['Hunter', 'Phoenix'], reason: 'Hunter splashes swarms and one-shots tanks at close range.' },
            { role: 'Cycle Card', abbr: 'CC', color: '#2ecc71', needed: true, examples: ['Skeletons', 'Electro Spirit'], reason: 'Cycle back to RG quickly.' },
            { role: 'Air Defense', abbr: 'AD', color: '#e74c3c', needed: true, examples: ['Mother Witch', 'Electro Wizard'], reason: 'Mother Witch turns their defensive graveyard/skarmy into piggies.' },
            { role: 'Big Spell', abbr: 'BS', color: '#e67e22', needed: true, examples: ['Fireball', 'Lightning'], reason: 'Lightning is great to reset Infernos and kill buildings.' },
            { role: 'Small Spell', abbr: 'SS', color: '#d456fd', needed: true, examples: ['The Log', 'Barbarian Barrel'], reason: 'Standard defense.' },
            { role: 'Building? (Uncommon)', abbr: 'BD', color: '#95a5a6', needed: false, examples: ['Tombstone', 'Furnace'], reason: 'RG decks often rely on Fisherman/Hunter for defense instead of buildings.' }
        ],
        strategy: ['**Fisherman God:** Place Fisherman in the middle. When they drop a heavy tank killer on your RG, the Fisherman pulls it to the other lane.', '**Pocket RG:** Once you take a tower, perform a "Pocket RG" (place him in the middle of their side) for instant lock-on.']
    },
    'Electro Giant': {
        role: 'Beatdown / Control',
        imgUrl: 'https://raw.githubusercontent.com/RoyaleAPI/cr-api-assets/master/cards-75/electro-giant.png',
        description: 'A walking Tesla. He zaps anything that hits him. Destroys swarms and inferno towers naturally.',
        composition: [
            { role: 'Win Condition', abbr: 'WC', color: '#1abc9c', needed: true, examples: ['Electro Giant'], reason: 'Needs Tornado to work properly.' },
            { role: 'The Synergist', abbr: 'UT', color: '#d456fd', needed: true, examples: ['Tornado'], reason: 'MANDATORY. Pull ranged units (Musketeer/Archer) INTO the E-Giant so they zap themselves to death.' },
            { role: 'Building', abbr: 'BD', color: '#95a5a6', needed: true, examples: ['Cannon', 'Goblin Cage'], reason: 'E-Giant is expensive. You need cheap defense.' },
            { role: 'Heavy Spell', abbr: 'BS', color: '#e67e22', needed: true, examples: ['Lightning'], reason: 'To kill buildings that pull the E-Giant safely.' },
            { role: 'Splash Support', abbr: 'AD', color: '#e74c3c', needed: true, examples: ['Bowler', 'Baby Dragon'], reason: 'Clear ground counters.' },
            { role: 'Tank Killer', abbr: 'TK', color: '#f1c40f', needed: true, examples: ['Prince', 'Mini P.E.K.K.A'], reason: 'To kill the E-Barbs or PEKKA attacking your E-Giant.' },
            { role: 'Cycle', abbr: 'CC', color: '#2ecc71', needed: true, examples: ['Bomber', 'Skeletons'], reason: 'Fast cycle.' },
            { role: 'Air Defense', abbr: 'AD', color: '#e74c3c', needed: true, examples: ['Mother Witch', 'Phoenix'], reason: 'Anti-swarm.' }
        ],
        strategy: ['**Tornado Tech:** If a Musketeer shoots your E-Giant from afar, Tornado her into him. She will die instantly from the reflect damage.']
    },
    'Goblin Giant': {
        role: 'Beatdown',
        imgUrl: 'https://raw.githubusercontent.com/RoyaleAPI/cr-api-assets/master/cards-75/goblin-giant.png',
        description: 'A fast tank that carries two Spear Goblins on his back. They keep fighting even after he dies!',
        composition: [
            { role: 'Win Condition', abbr: 'WC', color: '#1abc9c', needed: true, examples: ['Goblin Giant'], reason: 'Kiting master and tank.' },
            { role: 'The Partner', abbr: 'SC', color: '#2ecc71', needed: true, examples: ['Sparky', 'Double Prince'], reason: 'Goblin Giant + Sparky is the classic "GG Sparky" deck.' },
            { role: 'Bait Element', abbr: 'UT', color: '#f1c40f', needed: true, examples: ['Minion Horde', 'Spear Goblins'], reason: 'Bait out their Zap so Sparky can shoot.' },
            { role: 'Rage', abbr: 'SS', color: '#d456fd', needed: true, examples: ['Rage'], reason: 'Makes the Sparky and Goblins attack insanely fast.' },
            { role: 'Air Defense', abbr: 'AD', color: '#e74c3c', needed: true, examples: ['Hunter', 'Electro Wizard'], reason: 'Protect the Sparky from air.' },
            { role: 'Mini Tank', abbr: 'MT', color: '#f1c40f', needed: true, examples: ['Dark Prince', 'Mini PEKKA'], reason: 'Secondary pressure.' },
            { role: 'Small Spell', abbr: 'SS', color: '#d456fd', needed: true, examples: ['Zap', 'Arrows'], reason: 'Clear skeletons.' },
            { role: 'Heavy Spell', abbr: 'BS', color: '#e67e22', needed: false, examples: ['Fireball'], reason: 'Optional if run Rage.' }
        ],
        strategy: ['**Kiting:** You can use Goblin Giant to pull enemy troops to the middle while his backpack goblins shoot at them.']
    },
    'Elixir Golem': {
        role: 'Beatdown (All-in)',
        imgUrl: 'https://raw.githubusercontent.com/RoyaleAPI/cr-api-assets/master/cards-75/elixir-golem.png',
        description: 'Very cheap tank (3 Elixir) but gives the opponent 4 Elixir when destroyed. You MUST 3-crown them before they spend that elixir.',
        composition: [
            { role: 'Win Condition', abbr: 'WC', color: '#1abc9c', needed: true, examples: ['Elixir Golem'], reason: 'The risky tank.' },
            { role: 'Healer', abbr: 'UT', color: '#f1c40f', needed: true, examples: ['Battle Healer'], reason: 'MANDATORY. Keeps the blobs alive indefinitely.' },
            { role: 'Splash Dragon', abbr: 'SP', color: '#e74c3c', needed: true, examples: ['Electro Dragon'], reason: 'Chain lightning allows blobs to connect.' },
            { role: 'Dragon 2', abbr: 'SP', color: '#e74c3c', needed: true, examples: ['Skeleton Dragons', 'Baby Dragon'], reason: 'More fireball bait.' },
            { role: 'Clone/Rage', abbr: 'SS', color: '#d456fd', needed: true, examples: ['Tornado', 'Rage'], reason: 'Grouping enemies for E-Drag + Healer stack.' },
            { role: 'Heavy Hitter', abbr: 'SC', color: '#2ecc71', needed: true, examples: ['Night Witch', 'Lumberjack'], reason: 'Additional swarm/damage.' },
            { role: 'Utility', abbr: 'CC', color: '#95a5a6', needed: true, examples: ['Barbarian Barrel'], reason: 'Cheap defense.' },
            { role: 'Big Spell', abbr: 'BS', color: '#e67e22', needed: true, examples: ['Fireball', 'Arrows'], reason: 'To clear Minion Horde.' }
        ],
        strategy: ['**Egolem Blob:** The goal is to stack Battle Healer, E-Drag, and E-Golem in one massive ball. The healing makes them unkillable.']
    }
    , // Comma from previous block verification
    'Ram Rider': {
        role: 'Bridge Spam / Defense',
        imgUrl: 'https://raw.githubusercontent.com/RoyaleAPI/cr-api-assets/master/cards-75/ram-rider.png',
        description: 'A win condition that defends! Her snare stops Balloons and Hog Riders in their tracks, then she counter-attacks.',
        composition: [
            { role: 'Win Condition', abbr: 'WC', color: '#1abc9c', needed: true, examples: ['Ram Rider'], reason: 'Defensive snare + building crusher.' },
            { role: 'Bridge Spam 1', abbr: 'SC', color: '#2ecc71', needed: true, examples: ['Bandit', 'Royal Ghost'], reason: 'Pressure the bridge instantly.' },
            { role: 'Bridge Spam 2', abbr: 'SC', color: '#2ecc71', needed: true, examples: ['Lumberjack', 'Dark Prince'], reason: 'Overwhelm their defenses.' },
            { role: 'P.E.K.K.A', abbr: 'MT', color: '#f1c40f', needed: true, examples: ['P.E.K.K.A', 'Mega Knight'], reason: 'Big tank killer to defend Golems.' },
            { role: 'Air Support', abbr: 'AD', color: '#e74c3c', needed: true, examples: ['Electro Wizard', 'Magic Archer'], reason: 'Zap/Pierce support.' },
            { role: 'Small Spell', abbr: 'SS', color: '#d456fd', needed: true, examples: ['Barbarian Barrel', 'Zap'], reason: 'Clear skarmy.' },
            { role: 'Big Spell', abbr: 'BS', color: '#e67e22', needed: true, examples: ['Fireball', 'Poison'], reason: 'Kill Musketeers.' },
            { role: 'Cycle', abbr: 'CC', color: '#95a5a6', needed: false, examples: ['Skeletons'], reason: 'Not always needed in Bridge Spam.' }
        ],
        strategy: ['**Defensive Snare:** Use her on defense first! She can fully stop a Hog Rider or Balloon for free, then charge the other lane.']
    },
    'Battle Ram': {
        role: 'Bridge Spam',
        imgUrl: 'https://raw.githubusercontent.com/RoyaleAPI/cr-api-assets/master/cards-75/battle-ram.png',
        description: 'Two Barbarians holding a log. They charge at buildings. Excellent for kiting and tanking lightning.',
        composition: [
            { role: 'Win Condition', abbr: 'WC', color: '#1abc9c', needed: true, examples: ['Battle Ram'], reason: 'Main pressure card.' },
            { role: 'The PEKKA', abbr: 'MT', color: '#f1c40f', needed: true, examples: ['P.E.K.K.A'], reason: 'Classic PEKKA Bridge Spam partner.' },
            { role: 'Pressure Unit', abbr: 'SC', color: '#2ecc71', needed: true, examples: ['Bandit', 'Royal Ghost'], reason: 'Punish them for spending elixir.' },
            { role: 'Zap/Stun', abbr: 'AD', color: '#e74c3c', needed: true, examples: ['Electro Wizard'], reason: 'Stuns infernos connecting to PEKKA.' },
            { role: 'Sniper', abbr: 'AD', color: '#e74c3c', needed: true, examples: ['Magic Archer', 'Marcher'], reason: 'Geometry value through the bridge.' },
            { role: 'Small Spell', abbr: 'SS', color: '#d456fd', needed: true, examples: ['Zap'], reason: 'Instant stun.' },
            { role: 'Big Spell', abbr: 'BS', color: '#e67e22', needed: true, examples: ['Poison', 'Fireball'], reason: 'Area denial.' },
            { role: 'Kite Unit', abbr: 'UT', color: '#95a5a6', needed: false, examples: ['Battle Ram can kite too!'], reason: 'Battle Ram pulls units to the other lane (Kiting).' }
        ],
        strategy: ['**The Kite:** Place Battle Ram in the middle to pull a P.E.K.K.A or Knight to the other lane while your tower shoots them.']
    },
    'Royal Hogs': {
        role: 'Split Push / Fireball Bait',
        imgUrl: 'https://raw.githubusercontent.com/RoyaleAPI/cr-api-assets/master/cards-75/royal-hogs.png',
        description: 'Four fast piggies that jump the river. Best used to split-push or overwhelm single-target infernos.',
        composition: [
            { role: 'Win Condition', abbr: 'WC', color: '#1abc9c', needed: true, examples: ['Royal Hogs'], reason: 'Dual lane pressure.' },
            { role: 'Fireball Bait 1', abbr: 'SC', color: '#2ecc71', needed: true, examples: ['Royal Recruits', 'Zappies'], reason: 'Force them to fireball the recruits, so hogs are safe.' },
            { role: 'Fireball Bait 2', abbr: 'SC', color: '#2ecc71', needed: true, examples: ['Flying Machine'], reason: 'If they fireball hogs, Flying Machine gets infinite value.' },
            { role: 'Cage/Building', abbr: 'BD', color: '#95a5a6', needed: true, examples: ['Goblin Cage'], reason: 'Counter-push building.' },
            { role: 'Buff', abbr: 'SS', color: '#d456fd', needed: false, examples: ['Heal Spirit'], reason: 'Since removing Heal Spell, Heal Spirit is mostly for Hogs.' },
            { role: 'Small Spell', abbr: 'SS', color: '#d456fd', needed: true, examples: ['Barbarian Barrel', 'Arrows'], reason: 'Defense.' },
            { role: 'Tank Killer', abbr: 'TK', color: '#f1c40f', needed: true, examples: ['Hunter', 'Elite Barbarians'], reason: 'High DPS.' },
            { role: 'Cycle', abbr: 'CC', color: '#2ecc71', needed: true, examples: ['Electro Spirit'], reason: 'Chain reaction.' }
        ],
        strategy: ['**Split Piggies:** Place them in the middle of the river. 2 go left, 2 go right. Forces opponent to defend both lanes.']
    },
    'Wall Breakers': {
        role: 'Cycle / Chip',
        imgUrl: 'https://raw.githubusercontent.com/RoyaleAPI/cr-api-assets/master/cards-75/wall-breakers.png',
        description: 'Two suicidal skeletons with bombs. For 2 elixir, they demand an answer or deal massive damage.',
        composition: [
            { role: 'Win Condition', abbr: 'WC', color: '#1abc9c', needed: true, examples: ['Wall Breakers'], reason: 'Cheap pressure.' },
            { role: 'Main Tank', abbr: 'MT', color: '#f1c40f', needed: true, examples: ['Miner', 'Drill'], reason: 'Tank for them!' },
            { role: 'Defense', abbr: 'BD', color: '#95a5a6', needed: true, examples: ['Bomb Tower'], reason: 'Splash defense.' },
            { role: 'Cycle 1', abbr: 'CC', color: '#2ecc71', needed: true, examples: ['Spear Goblins'], reason: 'Chip.' },
            { role: 'Cycle 2', abbr: 'CC', color: '#2ecc71', needed: true, examples: ['Bats'], reason: 'Aerial DPS.' },
            { role: 'Small Spell', abbr: 'SS', color: '#d456fd', needed: true, examples: ['The Log'], reason: 'Pushback.' },
            { role: 'Big Spell', abbr: 'BS', color: '#e67e22', needed: true, examples: ['Fireball', 'Poison'], reason: 'Control.' },
            { role: 'Champion', abbr: 'UT', color: '#f1c40f', needed: true, examples: ['Mighty Miner', 'Knight'], reason: 'Lane control and tankiness.' }
        ],
        strategy: ['**Split:** You can split them, but usually they are best sent together behind a Miner.']
    },
    'Balloon': {
        role: 'Loon Cycle / Beatdown',
        imgUrl: 'https://raw.githubusercontent.com/RoyaleAPI/cr-api-assets/master/cards-75/balloon.png',
        description: 'A floating terror that deals massive damage. Usually paired with a fast tank (Lumberjack/Miner) or a big tank (Lava Hound).',
        composition: [
            { role: 'Win Condition', abbr: 'WC', color: '#1abc9c', needed: true, examples: ['Balloon'], reason: 'Get it to the tower!' },
            { role: 'Tank/Rage', abbr: 'MT', color: '#f1c40f', needed: true, examples: ['Lumberjack', 'Miner'], reason: 'Lumberjack rages the Loon; Miner tanks for it.' },
            { role: 'Air Defense', abbr: 'AD', color: '#e74c3c', needed: true, examples: ['Musketeer', 'Electro Dragon'], reason: 'Kill opposing minions.' },
            { role: 'Building', abbr: 'BD', color: '#95a5a6', needed: true, examples: ['Bomb Tower', 'Tesla', 'Inferno Tower'], reason: 'Reliable defense.' },
            { role: 'Freeze/Spell', abbr: 'SS', color: '#d456fd', needed: true, examples: ['Freeze', 'Fireball'], reason: 'Freeze is the classic surprise tactic.' },
            { role: 'Small Spell', abbr: 'SS', color: '#d456fd', needed: true, examples: ['Snowball', 'Zap', 'Barbarian Barrel'], reason: 'Knockback loon counters.' },
            { role: 'Cycle Card', abbr: 'CC', color: '#2ecc71', needed: true, examples: ['Ice Spirit', 'Skeletons'], reason: 'Cycle fast.' },
            { role: 'Ground Defense', abbr: 'MT', color: '#f1c40f', needed: true, examples: ['Ice Golem', 'Valkyrie'], reason: 'Distract ground troops.' }
        ],
        strategy: ['**LumberLoon:** Place Lumberjack at the bridge, then Balloon immediately behind him. If Lumberjack dies, Balloon gets raged.', '**Miner Loon:** Send Miner to the back of the tower, then Balloon at the bridge.']
    },
    'Mortar': {
        role: 'Siege / Bait',
        imgUrl: 'https://raw.githubusercontent.com/RoyaleAPI/cr-api-assets/master/cards-75/mortar.png',
        description: 'A 4-elixir siege building. It can play defense or offense. Often paired with bait cards.',
        composition: [
            { role: 'Win Condition', abbr: 'WC', color: '#1abc9c', needed: true, examples: ['Mortar'], reason: 'Defensive rock, offensive pressure.' },
            { role: 'Secondary Win Con', abbr: 'SC', color: '#2ecc71', needed: true, examples: ['Miner', 'Skeleton King', 'Hog Rider'], reason: 'Mortar barely takes towers alone.' },
            { role: 'Bait Element', abbr: 'UT', color: '#f1c40f', needed: true, examples: ['Goblin Gang', 'Spear Goblins', 'Minion Horde'], reason: 'Protect the blind spot.' },
            { role: 'Tank Killer', abbr: 'TK', color: '#e74c3c', needed: true, examples: ['Cannon Cart', 'Prince', 'Hunter'], reason: 'Defend big pushes.' },
            { role: 'Big Spell', abbr: 'BS', color: '#e67e22', needed: true, examples: ['Fireball', 'Rocket'], reason: 'Burn damage.' },
            { role: 'Small Spell', abbr: 'SS', color: '#d456fd', needed: true, examples: ['The Log', 'Tornado'], reason: 'Knockback into Mortar range.' },
            { role: 'Champion', abbr: 'UT', color: '#f1c40f', needed: true, examples: ['Skeleton King', 'Mighty Miner'], reason: 'Counter-push threat.' },
            { role: 'Cycle/Air', abbr: 'AD', color: '#2ecc71', needed: true, examples: ['Bats', 'Dart Goblin'], reason: 'High DPS glass cannons.' }
        ],
        strategy: ['**Defensive Mortar:** Place high in the center to pull Hogs and Giants.', '**The Lock:** If Mortar locks onto a tower, protect it with gang/knights!']
    },
    'Goblin Barrel': {
        role: 'Log Bait',
        imgUrl: 'https://raw.githubusercontent.com/RoyaleAPI/cr-api-assets/master/cards-75/goblin-barrel.png',
        description: 'Spawns 3 Goblins on the tower. If they used their Log, they are in trouble.',
        composition: [
            { role: 'Win Condition', abbr: 'WC', color: '#1abc9c', needed: true, examples: ['Goblin Barrel'], reason: 'The damage dealer.' },
            { role: 'Bait Card 1', abbr: 'SC', color: '#2ecc71', needed: true, examples: ['Princess', 'Dart Goblin'], reason: 'Force them to Log this.' },
            { role: 'Bait Card 2', abbr: 'SC', color: '#2ecc71', needed: true, examples: ['Goblin Gang', 'Skeleton Barrel'], reason: 'More Log bait.' },
            { role: 'The Wall', abbr: 'MT', color: '#f1c40f', needed: true, examples: ['Knight', 'Valkyrie', 'Mighty Miner'], reason: 'Tank hits while you throw barrels.' },
            { role: 'Building', abbr: 'BD', color: '#95a5a6', needed: true, examples: ['Inferno Tower', 'Tesla', 'Cannon'], reason: 'Stop tanks.' },
            { role: 'Big Spell', abbr: 'BS', color: '#e67e22', needed: true, examples: ['Rocket', 'Fireball'], reason: 'Finish the game when damage is low.' },
            { role: 'Spirit', abbr: 'CC', color: '#2ecc71', needed: true, examples: ['Ice Spirit', 'Electro Spirit'], reason: 'Cycle/Stun.' },
            { role: 'Small Spell', abbr: 'SS', color: '#d456fd', needed: true, examples: ['The Log'], reason: 'Standard defense.' }
        ],
        strategy: ['**Juke Barrel:** If they keep logging it perfectly, throw a "tricky barrel" deep behind the tower.', '**Princess Defense:** Place Princess in the opposite lane so they can\'t Log her AND the Barrel easily.']
    },
    'Goblin Drill': {
        role: 'Cycle / Control',
        imgUrl: 'https://raw.githubusercontent.com/RoyaleAPI/cr-api-assets/master/cards-75/goblin-drill.png',
        description: 'Like a miner, but spawns a building that spawns goblins. Deadly if ignored.',
        composition: [
            { role: 'Win Condition', abbr: 'WC', color: '#1abc9c', needed: true, examples: ['Goblin Drill'], reason: 'Pressure card.' },
            { role: 'Wall Breakers', abbr: 'SC', color: '#2ecc71', needed: true, examples: ['Wall Breakers', 'Bomber'], reason: 'Synergy: Drill tanks for WBs.' },
            { role: 'Control Building', abbr: 'BD', color: '#95a5a6', needed: true, examples: ['Tesla', 'Bomb Tower'], reason: 'Solid defense.' },
            { role: 'Mini Tank', abbr: 'MT', color: '#f1c40f', needed: true, examples: ['Knight', 'Valkyrie', 'Golden Knight'], reason: 'Bridge blocker.' },
            { role: 'Big Spell', abbr: 'BS', color: '#e67e22', needed: true, examples: ['Fireball', 'Poison'], reason: 'Kills wizard/witch defending drill.' },
            { role: 'Small Spell', abbr: 'SS', color: '#d456fd', needed: true, examples: ['The Log', 'Tornado'], reason: 'Defense.' },
            { role: 'Cycle/Air', abbr: 'AD', color: '#e74c3c', needed: true, examples: ['Magic Archer', 'Skeletons'], reason: 'Geometric damage.' },
            { role: 'Disruptor', abbr: 'UT', color: '#f1c40f', needed: true, examples: ['Tornado', 'E-Spirit'], reason: 'Control.' }
        ],
        strategy: ['**Tanking:** Drill can tank tower shots for Wall Breakers.', '**Defense:** You can use Drill defensively to pull a Golem to the center!']
    },
    'Three Musketeers': {
        role: 'Split Lane / Fireball Bait',
        imgUrl: 'https://raw.githubusercontent.com/RoyaleAPI/cr-api-assets/master/cards-75/three-musketeers.png',
        description: '9 Elixir for massive firepower. Split them behind the King Tower to attack both lanes.',
        composition: [
            { role: 'Win Condition', abbr: 'WC', color: '#1abc9c', needed: true, examples: ['Three Musketeers'], reason: 'High risk, high reward.' },
            { role: 'Pump', abbr: 'UT', color: '#f1c40f', needed: true, examples: ['Elixir Collector'], reason: 'MANDATORY. Force out their big spell.' },
            { role: 'Tank 1', abbr: 'MT', color: '#f1c40f', needed: true, examples: ['Royal Ghost', 'Bandit'], reason: 'Bridge spam pressure.' },
            { role: 'Tank 2', abbr: 'MT', color: '#f1c40f', needed: true, examples: ['Ice Golem', 'Golden Knight'], reason: 'Kiting and tanking.' },
            { role: 'Hogs/Ram', abbr: 'SC', color: '#2ecc71', needed: true, examples: ['Royal Hogs', 'Battle Ram'], reason: 'Something to tank for the muskies.' },
            { role: 'Baity Unit', abbr: 'SC', color: '#2ecc71', needed: true, examples: ['Minion Horde', 'Hunters'], reason: 'More fireball bait.' },
            { role: 'Small Spell', abbr: 'SS', color: '#d456fd', needed: true, examples: ['Zap', 'Barbarian Barrel'], reason: 'Cheap defense.' },
            { role: 'Heal/Rage', abbr: 'SS', color: '#d456fd', needed: false, examples: ['Heal Spirit'], reason: 'Keep them alive.' }
        ],
        strategy: ['**The Split:** Almost always split them. 2 in one lane, 1 in the other.', '**Pump Up:** Play pump first. If they fireball it, your 3M are safe.']
    },
    'Skeleton Barrel': {
        role: 'Zap Bait / Speed',
        imgUrl: 'https://raw.githubusercontent.com/RoyaleAPI/cr-api-assets/master/cards-75/skeleton-barrel.png',
        description: 'A poor man\'s balloon. Pops on the tower for massive skeleton damage. Great synergy with Mega Knight.',
        composition: [
            { role: 'Win Condition', abbr: 'WC', color: '#1abc9c', needed: true, examples: ['Skeleton Barrel'], reason: 'The annoyance.' },
            { role: 'The Tank', abbr: 'MT', color: '#f1c40f', needed: true, examples: ['Mega Knight', 'Miner'], reason: 'MK is the classic partner.' },
            { role: 'Bait 1', abbr: 'SC', color: '#2ecc71', needed: true, examples: ['Spear Goblins', 'Goblin Gang'], reason: 'Bait Zap.' },
            { role: 'Bait 2', abbr: 'SC', color: '#2ecc71', needed: true, examples: ['Bats', 'Inferno Dragon'], reason: 'Bait Snowball.' },
            { role: 'Tank Killer', abbr: 'TK', color: '#e74c3c', needed: true, examples: ['Prince', 'Mini PEKKA'], reason: 'Destroy Golems.' },
            { role: 'Miner', abbr: 'SC', color: '#2ecc71', needed: true, examples: ['Miner'], reason: 'Tanks for the pop.' },
            { role: 'Small Spell', abbr: 'SS', color: '#d456fd', needed: true, examples: ['Zap', 'Snowball'], reason: 'Standard.' },
            { role: 'Big Spell', abbr: 'BS', color: '#e67e22', needed: false, examples: ['Fireball'], reason: 'Area control.' }
        ],
        strategy: ['**Explosion:** The death damage kills bats/skeletons. Use it to clear swarms!', '**Miner Timing:** Send Miner so he arrives exactly when the Barrel pops.']
    }
};
