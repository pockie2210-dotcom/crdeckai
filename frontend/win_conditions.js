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
        description: 'Fast, building-targeting unit that relies on out-cycling counters.',
        composition: [
            { role: 'Win Condition', abbr: 'WC', color: '#1abc9c', needed: true, examples: ['Hog Rider'], reason: 'Your primary source of tower damage. Play him at the bridge when counters are out of hand.' },
            { role: 'Building', abbr: 'BD', color: '#95a5a6', needed: true, examples: ['Cannon', 'Tesla'], reason: 'Essential defense to pull tanks and win conditions away from your tower for a positive trade.' },
            { role: 'Air Defense', abbr: 'AD', color: '#e74c3c', needed: true, examples: ['Musketeer', 'Queen'], reason: 'Long-range support that can snipe air units and support Hog pushes from the river.' },
            { role: 'Mini Tank', abbr: 'MT', color: '#f1c40f', needed: true, examples: ['Ice Golem', 'Knight'], reason: 'Cheap tank to distract support troops or kite tanks while your tower deals damage.' },
            { role: 'Cycle 1', abbr: 'C1', color: '#2ecc71', needed: true, examples: ['Skeletons'], reason: 'Use to distract single-target hitters (PEKKA, Prince) and cycle back to Hog faster.' },
            { role: 'Cycle 2', abbr: 'C2', color: '#2ecc71', needed: true, examples: ['Ice Spirit'], reason: 'Provides a brief stun to reset attacks or freeze opponents for your Hog to get an extra hit.' },
            { role: 'Small Spell', abbr: 'SS', color: '#d456fd', needed: true, examples: ['The Log'], reason: 'Clears swarms like Skeleton Army or Goblin Gang that would otherwise melt your Hog.' },
            { role: 'Big Spell', abbr: 'BS', color: '#e67e22', needed: true, examples: ['Fireball', 'Earthquake'], reason: 'Destroy defensive buildings (Cannon/Tesla) or finish off low-health towers.' }
        ],
        strategy: [
            'Identify your opponent\'s counters early (e.g., Tornado, Building).',
            'Use your cheap cycle cards to get back to the Hog Rider faster than they can cycle back to their counter.',
            'Play "prediction" spells (like Log) if they predictively play swarms to stop your Hog.',
            'Defend cheaply with Cannon and Musketeer, then counter-push.'
        ]
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
        description: 'High damage air unit. Devastating if it connects, but fragile alone.',
        composition: [
            { role: 'Win Condition', abbr: 'WC', color: '#1abc9c', needed: true, examples: ['Balloon'], reason: 'Primary damage dealer. Needs to reach the tower to drop its massive death bomb or connect.' },
            { role: 'Tank', abbr: 'MT', color: '#f1c40f', needed: true, examples: ['Lumberjack', 'Miner', 'Lava Hound'], reason: 'Essential to tank tower shots so the Balloon can sneak in. Lumberjack drops Rage on death!' },
            { role: 'Air Defense', abbr: 'AD', color: '#e74c3c', needed: true, examples: ['Musketeer', 'Mega Minion'], reason: 'Defends against balloons or dragons and supports your counter-push.' },
            { role: 'Building', abbr: 'BD', color: '#95a5a6', needed: true, examples: ['Bomb Tower', 'Tesla'], reason: 'Pull Hogs/Tanks to the center to defend while you set up your Balloon push.' },
            { role: 'Small Spell', abbr: 'SS', color: '#d456fd', needed: true, examples: ['Zap', 'Snowball'], reason: 'Reset Inferno Towers or knock back Bats that harass your Balloon.' },
            { role: 'Big Spell', abbr: 'BS', color: '#e67e22', needed: true, examples: ['Freeze', 'Fireball'], reason: 'Freeze stops all defense for free hits; Fireball clears Minions/Wizards.' },
            { role: 'Cycle', abbr: 'CC', color: '#2ecc71', needed: true, examples: ['Skeletons', 'Ice Spirit'], reason: 'Cycle your deck faster to out-pace their air counters.' },
            { role: 'Ground Defense', abbr: 'MT', color: '#f1c40f', needed: true, examples: ['Ice Golem', 'Valkyrie'], reason: 'Distract ground troops or kiting units while your air cards do the work.' }
        ],
        strategy: [
            'Pair Balloon with a Tank (Lumberjack/Miner) to soak damage.',
            'Use "LumberLoon" at the bridge: Lumberjack first, then Balloon immediately behind.',
            'Be careful with Freeze; timing is everything. Use it only when the Balloon is about to connect.',
            'If they have a Rocket, try to bait it out or out-cycle them.'
        ]
    },
    'Giant': {
        role: 'Beatdown',
        archetype: 'Beatdown',
        difficulty: 'Easy (3/10)',
        hardCounters: [
            { name: 'P.E.K.K.A', reason: 'Shreds Giant rapidly.' },
            { name: 'Inferno Tower', reason: 'Melts Giant if not reset.' },
            { name: 'Fisherman', reason: 'Pulls Giant to King Tower activation.' }
        ],
        imgUrl: 'https://raw.githubusercontent.com/RoyaleAPI/cr-api-assets/master/cards-75/giant.png',
        description: 'Classic tank. The foundation of a "School of Fish" or Prince beatdown.',
        composition: [
            { role: 'Win Condition', abbr: 'WC', color: '#1abc9c', needed: true, examples: ['Giant'], reason: 'The meat shield. Place him in front of your high-damage support troops to soak hits.' },
            { role: 'Support DPS', abbr: 'SC', color: '#2ecc71', needed: true, examples: ['Prince', 'Mini P.E.K.K.A', 'Sparky'], reason: 'The actual threat. Units that deal massive damage while the tower shoots the Giant.' },
            { role: 'Splash', abbr: 'AD', color: '#e74c3c', needed: true, examples: ['Dark Prince', 'Witch'], reason: 'Clears distraction swarms (Skeletons/Goblins) so your Prince/Giant can connect.' },
            { role: 'Air Defense', abbr: 'AD', color: '#e74c3c', needed: true, examples: ['Musketeer', 'Electro Wizard'], reason: 'Essential to stop Infernos or Minions from melting your tank.' },
            { role: 'Small Spell', abbr: 'SS', color: '#d456fd', needed: true, examples: ['Zap', 'Arrows'], reason: 'Instant reset for Inferno Towers or clearing Bats/Spear Goblins.' },
            { role: 'Big Spell', abbr: 'BS', color: '#e67e22', needed: true, examples: ['Fireball', 'Poison'], reason: 'Kill defensive buildings or glass cannons (Wizard/Musketeer) behind the tower.' },
            { role: 'Mini Tank', abbr: 'MT', color: '#f1c40f', needed: true, examples: ['Miner', 'Fisherman'], reason: 'Secondary tank or utility to remove blockers (Fisherman pulls PEKKA away).' },
            { role: 'Cycle', abbr: 'CC', color: '#2ecc71', needed: true, examples: ['Mega Minion', 'Phoenix'], reason: 'High DPS air support that is hard to kill.' }
        ],
        strategy: [
            'Basic "Giant Double Prince": Giant in front, Princes behind. Lethal charge.',
            'In Single Elixir, play slow. Defend and counter-push. Don\'t overcommit.',
            'In Double Elixir, build massive pushes starting with Giant in the back.',
            'Always have Zap/Arrows ready for swarms or Inferno resets.'
        ]
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
        description: 'Ranged tank that dominates when counters are removed.',
        composition: [
            { role: 'Win Condition', abbr: 'WC', color: '#1abc9c', needed: true, examples: ['Royal Giant'], reason: 'Guaranteed damage if protected. He dictates the pace of the game.' },
            { role: 'Fisherman', abbr: 'UT', color: '#f1c40f', needed: true, examples: ['Fisherman'], reason: 'The playing partner. Use him to pull Mini-PEKKAs or Hunters away from your RG.' },
            { role: 'Hunter', abbr: 'TK', color: '#e74c3c', needed: true, examples: ['Hunter'], reason: 'Point-blank defense against tanks and balloons. Protects the RG from swarms.' },
            { role: 'Cycle', abbr: 'CC', color: '#2ecc71', needed: true, examples: ['Skeletons', 'Electro Spirit'], reason: 'Fast cycle to get back to RG or Fisherman quickly.' },
            { role: 'Air Defense', abbr: 'AD', color: '#e74c3c', needed: true, examples: ['Mother Witch', 'Phoenix'], reason: 'Mother Witch turns defensive swarms into your own offensive hogs.' },
            { role: 'Big Spell', abbr: 'BS', color: '#e67e22', needed: true, examples: ['Fireball', 'Lightning'], reason: 'Lightning is king here—resets Infernos and kills heavy hitters/buildings.' },
            { role: 'Small Spell', abbr: 'SS', color: '#d456fd', needed: true, examples: ['The Log'], reason: 'Pushback and area denial for ground swarms.' },
            { role: 'Flex', abbr: 'BD', color: '#95a5a6', needed: false, examples: ['Monk', 'Ghost'], reason: 'Monk reflects spells; Ghost provides invisible splash damage.' }
        ],
        strategy: [
            'Use Fisherman aggressively to pull their tank killer away from your RG.',
            'RG at the bridge is a valid play if you know they are low on elixir.',
            'In the endgame, the "Pocket RG" (placed in their base once a tower is down) is deadly.',
            'Lightning value: Reset Inferno + Hit Tower + Kill a unit.'
        ]
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
        description: 'Fast tank with built-in Spear Goblins. Synergizes perfectly with Sparky.',
        composition: [
            { role: 'Win Condition', abbr: 'WC', color: '#1abc9c', needed: true, examples: ['Goblin Giant'], reason: 'Fast movement speed tank. His backpack goblins defend him while he targets buildings.' },
            { role: 'Partner', abbr: 'SC', color: '#2ecc71', needed: true, examples: ['Sparky', 'Double Prince'], reason: 'Sparky creates a "checkmate" situation; they can\'t defend both the Giant and the Sparky.' },
            { role: 'Bait', abbr: 'UT', color: '#f1c40f', needed: true, examples: ['Minion Horde', 'Spear Goblins'], reason: 'Bait out their Zap/Small spells so your Sparky can survive and shoot.' },
            { role: 'Rage', abbr: 'SS', color: '#d456fd', needed: true, examples: ['Rage'], reason: 'Makes the entire push explosively fast and high-DPS.' },
            { role: 'Air Defense', abbr: 'AD', color: '#e74c3c', needed: true, examples: ['Hunter', 'Musketeer'], reason: 'Reliable air defense if the backpack goblins are overwhelmed.' },
            { role: 'Mini Tank', abbr: 'MT', color: '#f1c40f', needed: true, examples: ['Dark Prince'], reason: 'Splash support and a shield to tank hits for the Sparky.' },
            { role: 'Small Spell', abbr: 'SS', color: '#d456fd', needed: true, examples: ['Zap'], reason: 'Stun towers or reset Infernos.' },
            { role: 'Big Spell', abbr: 'BS', color: '#e67e22', needed: false, examples: ['Fireball'], reason: 'Clear blocked paths or finish towers.' }
        ],
        strategy: [
            'Place Goblin Giant at the bridge and Sparky in the back? No—supports first, Giant in front.',
            'Kiting: You can pull enemy troops to the center with Goblin Giant while his spears chip them.',
            'Always Rage your Sparky push.',
            'Punish opposite lane if they commit heavy elixir.'
        ]
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
        description: 'Defensive powerhouse that reflects damage. Needs Tornado to function.',
        composition: [
            { role: 'Win Condition', abbr: 'WC', color: '#1abc9c', needed: true, examples: ['Electro Giant'], reason: 'The "Walking Tesla". Any unit nearby that attacks him gets zapped back.' },
            { role: 'Tornado', abbr: 'UT', color: '#d456fd', needed: true, examples: ['Tornado'], reason: 'MANDATORY. Pull ranged units (Musketeer, Wizard) INTO his zap radius to kill them instantly.' },
            { role: 'Building', abbr: 'BD', color: '#95a5a6', needed: true, examples: ['Cannon', 'Goblin Cage'], reason: 'Defensive structure to survive while you build elixir for the E-Giant.' },
            { role: 'Big Spell', abbr: 'BS', color: '#e67e22', needed: true, examples: ['Lightning'], reason: 'The ultimate counter to buildings. Reset Infernos and destroy Cannons clearing the path.' },
            { role: 'Splash', abbr: 'AD', color: '#e74c3c', needed: true, examples: ['Bowler', 'Baby Dragon'], reason: 'Support behind E-Giant to clean up swarms he doesn\'t zap.' },
            { role: 'Tank Killer', abbr: 'TK', color: '#f1c40f', needed: true, examples: ['Prince', 'Mini PEKKA'], reason: 'You need high single-target damage for defense against enemy tanks.' },
            { role: 'Cycle', abbr: 'CC', color: '#2ecc71', needed: true, examples: ['Bomber'], reason: 'Cheap splash to cycle your heavy deck.' },
            { role: 'Air', abbr: 'AD', color: '#e74c3c', needed: true, examples: ['Phoenix'], reason: 'Rebirth mechanic serves as great support and defense.' }
        ],
        strategy: [
            'Never play E-Giant as a starting play. He is expensive.',
            'Wait for Double Elixir to build a Lightning + Tornado + E-Giant push.',
            'The "Nado Pull": When they play a sniper, Tornado it onto your E-Giant.',
            'Use Lightning to remove buildings—don\'t hesitate.'
        ]
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
        description: 'Air tank that pops into many angry partially-digested pups.',
        composition: [
            { role: 'Win Condition', abbr: 'WC', color: '#1abc9c', needed: true, examples: ['Lava Hound'], reason: 'A slow flying tank. Ignore its low damage; the threat is the Pups it spawns on death.' },
            { role: 'Support', abbr: 'SC', color: '#2ecc71', needed: true, examples: ['Balloon', 'Inferno Dragon'], reason: 'Cards that hide behind the Hound. Towers target Hound, these kill the Tower.' },
            { role: 'Air Support', abbr: 'AD', color: '#e74c3c', needed: true, examples: ['Mega Minion', 'Flying Machine'], reason: 'Flying units are required. Overwhelm their anti-air capabilities.' },
            { role: 'Ground Defense', abbr: 'MT', color: '#f1c40f', needed: true, examples: ['Barbarians', 'Guards'], reason: 'You need a "ground anchor" to stop E-Giants or Hogs since your deck is all air.' },
            { role: 'Building', abbr: 'BD', color: '#95a5a6', needed: true, examples: ['Tombstone'], reason: 'Distracts ground units cheaply. Spawns skeletons that build up pressure.' },
            { role: 'Spell 1', abbr: 'SS', color: '#d456fd', needed: true, examples: ['Zap', 'Arrows'], reason: 'Arrows are best to clear Minions that counter your Hound.' },
            { role: 'Spell 2', abbr: 'BS', color: '#e67e22', needed: true, examples: ['Fireball', 'Void'], reason: 'Clear Wizards, Musketeers, or buildings.' },
            { role: 'Miner', abbr: 'UT', color: '#f1c40f', needed: true, examples: ['Miner'], reason: 'Send him to tank for the Lava Pups right before the Hound pops!' }
        ],
        strategy: [
            'Lava Hound in the corner creates a slow push.',
            'Air Superiority: If they have 2 air counters and you have 4 air threats, you win.',
            'Placement: "Balloon Parade" behind the Hound.',
            'Miner timing is key: Tank for the pups.'
        ]
    },
    'Golem': {
        role: 'Beatdown',
        archetype: 'Beatdown',
        difficulty: 'Easy (3/10)',
        hardCounters: [{ name: 'Inferno Tower', reason: 'Melts.' }, { name: 'P.E.K.K.A', reason: 'Shreds.' }],
        imgUrl: 'https://raw.githubusercontent.com/RoyaleAPI/cr-api-assets/master/cards-75/golem.png',
        description: 'The ultimate tank. Ignore damage, build a deathball, and 3-crown.',
        composition: [
            { role: 'Win Condition', abbr: 'WC', color: '#1abc9c', needed: true, examples: ['Golem'], reason: 'Highest HP unit. When it explodes, it deals death damage and spawns Golemites.' },
            { role: 'Support', abbr: 'SC', color: '#2ecc71', needed: true, examples: ['Night Witch', 'Lumberjack'], reason: 'Night Witch spawns bats (air support), Lumberjack drops rage. Both scary behind Golem.' },
            { role: 'Air', abbr: 'AD', color: '#e74c3c', needed: true, examples: ['Baby Dragon', 'Phoenix'], reason: 'Splash damage to protect Golem from swarms.' },
            { role: 'Reset', abbr: 'SP', color: '#e74c3c', needed: true, examples: ['Electro Dragon'], reason: 'Chain lightning resets Inferno Towers/Dragons and slows attack speed.' },
            { role: 'Building', abbr: 'BD', color: '#95a5a6', needed: true, examples: ['Tombstone', 'Barbarians'], reason: 'Defense against Hogs/Princes while you pump up.' },
            { role: 'Tornado', abbr: 'SS', color: '#d456fd', needed: true, examples: ['Tornado'], reason: 'Pull all defenders into one spot so your Electro Dragon/Baby Dragon splashes them all.' },
            { role: 'Heavy Spell', abbr: 'BS', color: '#e67e22', needed: true, examples: ['Lightning'], reason: 'Essential to break defensive buildings and kill heavy hitters.' },
            { role: 'Pump', abbr: 'UT', color: '#f1c40f', needed: true, examples: ['Elixir Collector'], reason: 'Forces them to fireball the pump, leaving them helpless against your troops.' }
        ],
        strategy: [
            'Sacrifice tower health in Single Elixir to build an Elixir advantage (Pump up).',
            'In Double Elixir, drop Golem in the back and stack EVERYTHING behind it.',
            'Ignore small pushes in the other lane if you can take their King Tower.',
            'Tornado + Splash damage is your main way to clear defenders.'
        ]
    },
    'Elixir Golem': {
        role: 'Beatdown',
        archetype: 'Beatdown',
        difficulty: 'Easy (2/10)',
        hardCounters: [{ name: 'Bomb Tower', reason: 'Splash.' }, { name: 'Executioner', reason: 'Splash.' }],
        imgUrl: 'https://raw.githubusercontent.com/RoyaleAPI/cr-api-assets/master/cards-75/elixir-golem.png',
        description: 'High risk, high reward. Gives opponent elixir when destroyed, so you MUST 3-crown.',
        composition: [
            { role: 'Win Condition', abbr: 'WC', color: '#1abc9c', needed: true, examples: ['Elixir Golem'], reason: 'Cheap tank (3 elixir) with stats of a 6-7 elixir card. But gives 4 elixir to enemy upon death.' },
            { role: 'Healer', abbr: 'UT', color: '#f1c40f', needed: true, examples: ['Battle Healer'], reason: 'Heals the Elixir Golem blobs, keeping the push alive indefinitely.' },
            { role: 'Splash', abbr: 'SP', color: '#e74c3c', needed: true, examples: ['Electro Dragon', 'Skeleton Dragons'], reason: 'You need massive splash damage to protect the blobs.' },
            { role: 'Rage', abbr: 'SS', color: '#d456fd', needed: true, examples: ['Rage'], reason: 'Increases attack speed and healing speed of the Battle Healer.' },
            { role: 'Tornado', abbr: 'SS', color: '#d456fd', needed: true, examples: ['Tornado'], reason: 'Clumps defenders together for your E-Dragon chains.' },
            { role: 'Support', abbr: 'SC', color: '#2ecc71', needed: true, examples: ['Night Witch'], reason: 'Adds excessive DPS and bat swarm.' },
            { role: 'Defense', abbr: 'CC', color: '#95a5a6', needed: true, examples: ['Barbarian Barrel'], reason: 'Cheap defense.' },
            { role: 'Spell', abbr: 'BS', color: '#e67e22', needed: true, examples: ['Arrows'], reason: 'Clear minion hordes or firecrackers.' }
        ],
        strategy: [
            'Play E-Golem at the bridge in Double Elixir?',
            'Healer + E-Dragon + Rage is the core synergy.',
            'You will lose on defense. You must win on offense.',
            'Don\'t leak the elixir blobs for no reason.'
        ]
    },
    'Miner': {
        role: 'Control',
        archetype: 'Control',
        difficulty: 'Hard (8/10)',
        hardCounters: [{ name: 'Tornado', reason: 'King Activation.' }],
        imgUrl: 'https://raw.githubusercontent.com/RoyaleAPI/cr-api-assets/master/cards-75/miner.png',
        description: 'Chip damage specialist. Can be placed anywhere.',
        composition: [
            { role: 'Win Condition', abbr: 'WC', color: '#1abc9c', needed: true, examples: ['Miner'], reason: 'Your primary way to deal damage. Send him to the tower constantly to chip it down.' },
            { role: 'Secondary', abbr: 'SC', color: '#2ecc71', needed: true, examples: ['Wall Breakers'], reason: 'Miner tanks for these cards (WB) acts as consistent chip damage.' },
            { role: 'Mini Tank', abbr: 'MT', color: '#f1c40f', needed: true, examples: ['Knight', 'Valkyrie'], reason: 'Standard defense against support troops. Cheap and durable.' },
            { role: 'Building', abbr: 'BD', color: '#95a5a6', needed: true, examples: ['Bomb Tower', 'Tesla'], reason: 'Required to stop Hogs and Balloons since you have low DPS.' },
            { role: 'Air Defense', abbr: 'AD', color: '#e74c3c', needed: true, examples: ['Magic Archer', 'Musketeer'], reason: 'Geometric damage (Marcher) or solid single target DPS (Musk) from a distance.' },
            { role: 'Cycle', abbr: 'CC', color: '#2ecc71', needed: true, examples: ['Bats', 'Spears'], reason: 'Pair with Miner for a cheap push. Miner tanks, Bats deal the damage.' },
            { role: 'Small Spell', abbr: 'SS', color: '#d456fd', needed: true, examples: ['The Log'], reason: 'Pushback and chip damage. Essential for survivability.' },
            { role: 'Big Spell', abbr: 'BS', color: '#e67e22', needed: true, examples: ['Poison'], reason: 'The "Miner Poison" classic. Kill their defense and damage the tower simultaneously.' }
        ],
        strategy: [
            'Switch up your Miner placement every time to avoid predictions.',
            'Use Miner to snipe Princesses or buildings if needed.',
            'Defense is priority #1. Chip away slowly; don\'t rush.',
            'Magic Archer lining up through a tank onto the tower is your secondary win condition.'
        ]
    },
    'Goblin Drill': {
        role: 'Control',
        archetype: 'Control',
        difficulty: 'Medium (6/10)',
        hardCounters: [{ name: 'Valkyrie', reason: 'Splash.' }, { name: 'Dark Prince', reason: 'Splash.' }],
        imgUrl: 'https://raw.githubusercontent.com/RoyaleAPI/cr-api-assets/master/cards-75/goblin-drill.png',
        description: 'Spawns a building on their tower that releases Goblins.',
        composition: [
            { role: 'Win Condition', abbr: 'WC', color: '#1abc9c', needed: true, examples: ['Goblin Drill'], reason: 'Pressure card. Forces a response even if they have a counter.' },
            { role: 'Wall Breakers', abbr: 'SC', color: '#2ecc71', needed: true, examples: ['Wall Breakers', 'Bomber'], reason: 'Use Drill to tank tower shots, then send Wall Breakers in for massive damage.' },
            { role: 'Building', abbr: 'BD', color: '#95a5a6', needed: true, examples: ['Tesla', 'Bomb Tower'], reason: 'Standard defense to pull tanks to the middle.' },
            { role: 'Mini Tank', abbr: 'MT', color: '#f1c40f', needed: true, examples: ['Knight', 'Valkyrie'], reason: 'Cheap defensive tank to protect your squishy high-dps cards.' },
            { role: 'Big Spell', abbr: 'BS', color: '#e67e22', needed: true, examples: ['Fireball'], reason: 'Use to knock back units trying to surround your drill, or finish towers.' },
            { role: 'Small Spell', abbr: 'SS', color: '#d456fd', needed: true, examples: ['The Log', 'Tornado'], reason: 'Control swarms or maximize Magic Archer value.' },
            { role: 'Air', abbr: 'AD', color: '#e74c3c', needed: true, examples: ['Magic Archer'], reason: 'Align him with the Drill to pierce through defenders onto the tower.' },
            { role: 'Flex', abbr: 'UT', color: '#f1c40f', needed: true, examples: ['Skeletons'], reason: 'Cycle and distraction.' }
        ],
        strategy: [
            'Place Drill "front-inner" usually, but mix it up to avoid Valkyries.',
            'Tank with Drill first, THEN send Wall Breakers.',
            'Drill on defense can pull Hogs/Golems in an emergency.'
        ]
    },
    'Goblin Barrel': {
        role: 'Bait',
        archetype: 'Bait',
        difficulty: 'Hard (7/10)',
        hardCounters: [{ name: 'The Log', reason: 'Hard counter.' }, { name: 'Arrows', reason: 'Hard counter.' }],
        imgUrl: 'https://raw.githubusercontent.com/RoyaleAPI/cr-api-assets/master/cards-75/goblin-barrel.png',
        description: 'Classic Log Bait. Force them to use their spell, then punish.',
        composition: [
            { role: 'Win Condition', abbr: 'WC', color: '#1abc9c', needed: true, examples: ['Goblin Barrel'], reason: 'Deals massive damage if ignored. The goal is to make them waste their Log on something else first.' },
            { role: 'Bait 1', abbr: 'SC', color: '#2ecc71', needed: true, examples: ['Princess'], reason: 'Forces a response at the bridge. If they Log her, throw the Barrel.' },
            { role: 'Bait 2', abbr: 'SC', color: '#2ecc71', needed: true, examples: ['Goblin Gang'], reason: 'Defensive swarm. If they Zap/Log this, your Barrel is safe.' },
            { role: 'Tank', abbr: 'MT', color: '#f1c40f', needed: true, examples: ['Knight', 'Valkyrie'], reason: 'Tanks for your Princess or Gang. "Knight at the bridge" is a classic pressure move.' },
            { role: 'Building', abbr: 'BD', color: '#95a5a6', needed: true, examples: ['Inferno Tower', 'Tesla'], reason: 'You need this to stop Golems, Pekkas, and Hogs since your troops are squishy.' },
            { role: 'Big Spell', abbr: 'BS', color: '#e67e22', needed: true, examples: ['Rocket'], reason: 'The finisher. If you can\'t break through, defend and Rocket cycle.' },
            { role: 'Spirit', abbr: 'CC', color: '#2ecc71', needed: true, examples: ['Ice Spirit', 'Electro Spirit'], reason: 'Freeze/Stun buy time for your Inferno Tower or Princess to work.' },
            { role: 'Small Spell', abbr: 'SS', color: '#d456fd', needed: true, examples: ['The Log'], reason: 'Critical for winning the "Log vs Log" matchup.' }
        ],
        strategy: [
            'Juke barrel placements: "Tricky Barrel" (behind tower) if they pre-log.',
            'Protect the Princess: She gives infinite value if alive.',
            'Rocket Cycle: In triple elixir, shift to pure defense and Rocket the tower.'
        ]
    },
    'Skeleton Barrel': {
        role: 'Bait',
        archetype: 'Bait',
        difficulty: 'Medium (5/10)',
        hardCounters: [{ name: 'Zap', reason: 'Kills all.' }, { name: 'Tornado', reason: 'Activates King.' }],
        imgUrl: 'https://raw.githubusercontent.com/RoyaleAPI/cr-api-assets/master/cards-75/skeleton-barrel.png',
        description: 'Floating barrel that drops a swarm. bait for Zap/Snowball.',
        composition: [
            { role: 'Win Condition', abbr: 'WC', color: '#1abc9c', needed: true, examples: ['Skeleton Barrel'], reason: 'Drops skeletons on the tower. Deals death damage too.' },
            { role: 'Tank', abbr: 'MT', color: '#f1c40f', needed: true, examples: ['Mega Knight', 'Miner'], reason: 'Mega Knight jumps on their counterpush; Miner tanks for the skeletons.' },
            { role: 'Bait 1', abbr: 'SC', color: '#2ecc71', needed: true, examples: ['Spear Goblins'], reason: 'Annoying chip damage that demands a Zap.' },
            { role: 'Bait 2', abbr: 'SC', color: '#2ecc71', needed: true, examples: ['Bats'], reason: 'High DPS air swarm. Deadly if not Zapped.' },
            { role: 'Killer', abbr: 'TK', color: '#e74c3c', needed: true, examples: ['Prince'], reason: 'Threatening charger that forces a response while they deal with swarms.' },
            { role: 'Miner', abbr: 'SC', color: '#2ecc71', needed: true, examples: ['Miner'], reason: 'Send him to the tower right before the barrel pops.' },
            { role: 'Small Spell', abbr: 'SS', color: '#d456fd', needed: true, examples: ['Zap', 'Snowball'], reason: 'Reset attackers targeting your Swarm.' },
            { role: 'Flex', abbr: 'BS', color: '#e67e22', needed: false, examples: ['Fireball'], reason: 'Clear Wizards/Witches.' }
        ],
        strategy: [
            'Pair with Miner for timing push.',
            'Mega Knight drops on bridge spam, then Skeleton Barrel behind him.',
            'Overwhelm their small spells (Zap Bait).'
        ]
    },
    'Wall Breakers': {
        role: 'Cycle',
        archetype: 'Cycle',
        difficulty: 'Very Hard (9/10)',
        hardCounters: [{ name: 'The Log', reason: 'Kills them.' }, { name: 'Arrows', reason: 'Kills them.' }],
        imgUrl: 'https://raw.githubusercontent.com/RoyaleAPI/cr-api-assets/master/cards-75/wall-breakers.png',
        description: 'Super cheap, super fast pressure. Connects for massive damage.',
        composition: [
            { role: 'Win Condition', abbr: 'WC', color: '#1abc9c', needed: true, examples: ['Wall Breakers'], reason: 'Used to force out elixir or deal big damage for only 2 elixir.' },
            { role: 'Tank', abbr: 'MT', color: '#f1c40f', needed: true, examples: ['Miner', 'Goblin Drill'], reason: 'Miner tanks the tower shots so Wall Breakers can connect.' },
            { role: 'Building', abbr: 'BD', color: '#95a5a6', needed: true, examples: ['Bomb Tower'], reason: 'The rock of your defense. Splash damage + pulls tanks.' },
            { role: 'Cycle', abbr: 'CC', color: '#2ecc71', needed: true, examples: ['Spear Goblins'], reason: 'Chip damage and distraction.' },
            { role: 'Air', abbr: 'CC', color: '#2ecc71', needed: true, examples: ['Bats'], reason: 'DPS support. Forces a Zap.' },
            { role: 'Spell 1', abbr: 'SS', color: '#d456fd', needed: true, examples: ['The Log'], reason: 'Control ground and cycle.' },
            { role: 'Spell 2', abbr: 'BS', color: '#e67e22', needed: true, examples: ['Poison', 'Fireball'], reason: 'Clear standard placements of defensive units.' },
            { role: 'Champion', abbr: 'UT', color: '#f1c40f', needed: true, examples: ['Mighty Miner'], reason: 'Lane switching threat and tank killer.' }
        ],
        strategy: [
            'Split Wall Breakers in the center: one goes left, one goes right.',
            'Requires precise counting of opponent\'s elixir.',
            'Use "Magic Archer geometry" with Tornado if running MA variant.'
        ]
    },
    'Ram Rider': {
        role: 'Bridge Spam',
        archetype: 'Bridge Spam',
        difficulty: 'Medium (6/10)',
        hardCounters: [{ name: 'Building', reason: 'Kites.' }, { name: 'Mini PEKKA', reason: 'Kills.' }],
        imgUrl: 'https://raw.githubusercontent.com/RoyaleAPI/cr-api-assets/master/cards-75/ram-rider.png',
        description: 'Win condition that defends. Her snare stops units like Hog or Balloon.',
        composition: [
            { role: 'Win Condition', abbr: 'WC', color: '#1abc9c', needed: true, examples: ['Ram Rider'], reason: 'Charges tower. On defense, she throws bolas to freeze enemies.' },
            { role: 'Spam 1', abbr: 'SC', color: '#2ecc71', needed: true, examples: ['Bandit'], reason: 'Dashing invulnerability. Pressure the other lane.' },
            { role: 'Spam 2', abbr: 'SC', color: '#2ecc71', needed: true, examples: ['Royal Ghost'], reason: 'Invisible threat. Forces a response.' },
            { role: 'P.E.K.K.A', abbr: 'MT', color: '#f1c40f', needed: true, examples: ['P.E.K.K.A'], reason: 'The big wall. Drops on E-Giants, Golems, and Mega Knights.' },
            { role: 'Air', abbr: 'AD', color: '#e74c3c', needed: true, examples: ['Electro Wizard'], reason: 'Spawn zap + stun. Essential synergy with PEKKA.' },
            { role: 'Spell 1', abbr: 'SS', color: '#d456fd', needed: true, examples: ['Barbarian Barrel'], reason: 'Cheap defense + mini tank.' },
            { role: 'Spell 2', abbr: 'BS', color: '#e67e22', needed: true, examples: ['Fireball', 'Lightning'], reason: 'Clear support troops or reset Infernos.' },
            { role: 'Flex', abbr: 'CC', color: '#95a5a6', needed: false, examples: ['Archer Queen', 'Magic Archer'], reason: 'High DPS ranged support.' }
        ],
        strategy: [
            'Use Ram Rider on DEFENSE first to stop a Hog/Loon, then counter-push.',
            'PEKKA is defensive. Don\'t play her at the bridge unless desperate.',
            'Apply dual lane pressure with Bandit/Ghost.'
        ]
    },
    'Battle Ram': {
        role: 'Bridge Spam',
        archetype: 'Bridge Spam',
        difficulty: 'Medium (5/10)',
        hardCounters: [{ name: 'Building', reason: 'Kites.' }],
        imgUrl: 'https://raw.githubusercontent.com/RoyaleAPI/cr-api-assets/master/cards-75/battle-ram.png',
        description: 'Charges building. Spawns two Barbarians. Can separate kiting troops.',
        composition: [
            { role: 'Win Condition', abbr: 'WC', color: '#1abc9c', needed: true, examples: ['Battle Ram'], reason: 'Shield allows it to tank a hit (like Sparky/Lightning) before Barbs spawn.' },
            { role: 'P.E.K.K.A', abbr: 'MT', color: '#f1c40f', needed: true, examples: ['P.E.K.K.A'], reason: 'The boss. Kills tanks. Support her with spam cards.' },
            { role: 'Spam', abbr: 'SC', color: '#2ecc71', needed: true, examples: ['Bandit', 'Ghost'], reason: 'Cheap punishment cards. Play them when opponent taps out.' },
            { role: 'Stun', abbr: 'AD', color: '#e74c3c', needed: true, examples: ['Electro Wizard'], reason: 'Stops Sparky, I-Dragon, and I-Tower. Key PEKKA support.' },
            { role: 'Sniper', abbr: 'AD', color: '#e74c3c', needed: true, examples: ['Magic Archer'], reason: 'Poke damage through units. Forces them to react awkwardly.' },
            { role: 'Spell 1', abbr: 'SS', color: '#d456fd', needed: true, examples: ['Zap'], reason: 'Instant stun to help Ram connect.' },
            { role: 'Spell 2', abbr: 'BS', color: '#e67e22', needed: true, examples: ['Poison'], reason: 'Area denial. Kills skeletons/minions that protect their tower.' },
            { role: 'Kite', abbr: 'UT', color: '#95a5a6', needed: false, examples: ['Battle Ram'], reason: 'Use Ram to kite PEKKA/Knight to the other lane on defense.' }
        ],
        strategy: [
            'Kite heavy units (like enemy PEKKA) with your Battle Ram.',
            'Bridge spam logic: Defend -> Counterpush -> Punish low elixir.',
            'Never let them settle. Keep attacking.'
        ]
    },
    'Royal Hogs': {
        role: 'Split Lane',
        archetype: 'Fireball Bait',
        difficulty: 'Hard (7/10)',
        hardCounters: [{ name: 'Fireball', reason: 'Hard counter.' }, { name: 'Mega Knight', reason: 'Splash.' }],
        imgUrl: 'https://raw.githubusercontent.com/RoyaleAPI/cr-api-assets/master/cards-75/royal-hogs.png',
        description: 'Four pigs that jump the river. Best played split lane.',
        composition: [
            { role: 'Win Condition', abbr: 'WC', color: '#1abc9c', needed: true, examples: ['Royal Hogs'], reason: 'Fast, swarmy building targeter. If they Fireball the Hogs, punish with Recruits.' },
            { role: 'Bait 1', abbr: 'SC', color: '#2ecc71', needed: true, examples: ['Royal Recruits', 'Zappies'], reason: 'Both are Fireball bait. Overload their splash counters.' },
            { role: 'Bait 2', abbr: 'SC', color: '#2ecc71', needed: true, examples: ['Flying Machine'], reason: 'High range DPS. If they don\'t have Fireball, this locks on tower forever.' },
            { role: 'Building', abbr: 'BD', color: '#95a5a6', needed: true, examples: ['Goblin Cage'], reason: 'The Cage Brawler is a mini-tank for your counterpush.' },
            { role: 'Spell 1', abbr: 'SS', color: '#d456fd', needed: true, examples: ['Arrows'], reason: 'Kill Minions/Firecrackers guarding the tower.' },
            { role: 'Spell 2', abbr: 'BS', color: '#e67e22', needed: false, examples: ['Fireball'], reason: 'Your own heavy response.' },
            { role: 'Killer', abbr: 'TK', color: '#f1c40f', needed: true, examples: ['Hunter'], reason: 'Shotgun blast defense.' },
            { role: 'Cycle', abbr: 'CC', color: '#2ecc71', needed: true, examples: ['Electro Spirit'], reason: 'Chain damage and cycle.' }
        ],
        strategy: [
            'Always split pigs 2-2 at the river to pressure both lanes.',
            'If they use Fireball on your Recruits, play Hogs immediately.',
            'If they use Fireball on Hogs, play Flying Machine.'
        ]
    },
    'Three Musketeers': {
        role: 'Split Lane',
        archetype: 'Fireball Bait',
        difficulty: 'Very Hard (10/10)',
        hardCounters: [{ name: 'Fireball', reason: 'Kills/Maims.' }, { name: 'Lightning', reason: 'Dead.' }],
        imgUrl: 'https://raw.githubusercontent.com/RoyaleAPI/cr-api-assets/master/cards-75/three-musketeers.png',
        description: 'High risk high reward. 9 Elixir card that controls the whole map if kept alive.',
        composition: [
            { role: 'Win Condition', abbr: 'WC', color: '#1abc9c', needed: true, examples: ['Three Musketeers'], reason: 'The ladies. Split them 2-1. They shred towers in seconds.' },
            { role: 'Pump', abbr: 'UT', color: '#f1c40f', needed: true, examples: ['Elixir Collector'], reason: 'MANDATORY. Use it to bait out the big spell so 3M are safe.' },
            { role: 'Tank', abbr: 'MT', color: '#f1c40f', needed: true, examples: ['Royal Ghost', 'Bandit'], reason: 'Cheap tanks to place in front of the split musketeers.' },
            { role: 'Kite', abbr: 'MT', color: '#f1c40f', needed: true, examples: ['Ice Golem'], reason: 'Kite enemies into the 3M firing range.' },
            { role: 'Ram', abbr: 'SC', color: '#2ecc71', needed: true, examples: ['Battle Ram'], reason: 'Lightning rod (blocks lightning for 3M) and pressure.' },
            { role: 'Bait', abbr: 'SC', color: '#2ecc71', needed: true, examples: ['Minion Horde'], reason: 'Additional fireball bait. Punish if they spell the pump.' },
            { role: 'Spell', abbr: 'SS', color: '#d456fd', needed: true, examples: ['Barbarian Barrel'], reason: 'Cheap ground defense.' },
            { role: 'Heal', abbr: 'SS', color: '#d456fd', needed: false, examples: ['Heal Spirit'], reason: 'Keeps the Musketeers topped up.' }
        ],
        strategy: [
            'Never play 3M in single elixir unless you have a massive advantage.',
            'Always split 3M behind the King Tower: 2 go one lane, 1 goes the other.',
            'Pump up to force them to spell the collector.'
        ]
    },
    'Mortar': {
        role: 'Siege',
        archetype: 'Siege',
        difficulty: 'Hard (8/10)',
        hardCounters: [{ name: 'Royal Giant', reason: 'Counters siege.' }, { name: 'Earthquake', reason: 'Breaks it.' }],
        imgUrl: 'https://raw.githubusercontent.com/RoyaleAPI/cr-api-assets/master/cards-75/mortar.png',
        description: 'Cheap siege building that defends AND attacks. Splash damage.',
        composition: [
            { role: 'Win Condition', abbr: 'WC', color: '#1abc9c', needed: true, examples: ['Mortar'], reason: 'Place at bridge to target tower. Or center to defend.' },
            { role: 'Secondary', abbr: 'SC', color: '#2ecc71', needed: true, examples: ['Miner', 'Hog Rider'], reason: 'If Mortar can\'t lock on tower, rely on Miner/Hog for damage.' },
            { role: 'Bait', abbr: 'UT', color: '#f1c40f', needed: true, examples: ['Goblin Gang', 'Minions'], reason: 'Swarm that protects Mortar. Also bait for spells.' },
            { role: 'Killer', abbr: 'TK', color: '#e74c3c', needed: true, examples: ['Cannon Cart', 'Prince'], reason: 'High Health + High Damage counter-attacker.' },
            { role: 'Big Spell', abbr: 'BS', color: '#e67e22', needed: true, examples: ['Rocket', 'Fireball'], reason: 'Rocket cycle is a valid win condition if you can\'t break through.' },
            { role: 'Small Spell', abbr: 'SS', color: '#d456fd', needed: true, examples: ['The Log'], reason: 'Knock back units so Mortar can retarget to the tower.' },
            { role: 'Champion', abbr: 'UT', color: '#f1c40f', needed: true, examples: ['Skeleton King'], reason: 'Summons swarm. Synergizes with bait.' },
            { role: 'Cycle', abbr: 'AD', color: '#2ecc71', needed: true, examples: ['Bats'], reason: 'Cheap air DPS.' }
        ],
        strategy: [
            'Default to Defensive Mortar in high position to pull Hogs.',
            'Target Selection: Mortar has a blind spot. Use it to lock tower.',
            'If they have RG, stick to Miner chip and defensive mortar.'
        ]
    },
    'X-Bow': {
        role: 'Siege',
        archetype: 'Siege',
        difficulty: 'Very Hard (9/10)',
        hardCounters: [{ name: 'RG', reason: 'Counter.' }, { name: 'EQ', reason: 'Counter.' }],
        imgUrl: 'https://raw.githubusercontent.com/RoyaleAPI/cr-api-assets/master/cards-75/x-bow.png',
        description: 'The machine gun. Lock onto the tower and game over.',
        composition: [
            { role: 'Win Condition', abbr: 'WC', color: '#1abc9c', needed: true, examples: ['X-Bow'], reason: '6 Elixir investment. You must defend it with your life once placed.' },
            { role: 'Building', abbr: 'BD', color: '#95a5a6', needed: true, examples: ['Tesla'], reason: 'Place next to X-Bow to protect it. Tesla hides underground, safe from spells.' },
            { role: 'Mini Tank', abbr: 'MT', color: '#f1c40f', needed: true, examples: ['Knight'], reason: 'Good stats for cost. Place in front of X-Bow to block hits.' },
            { role: 'Support', abbr: 'AD', color: '#e74c3c', needed: true, examples: ['Archers', 'Queen'], reason: 'Ranged DPS to snipe reliance or air troops attacking your bow.' },
            { role: 'Cycle 1', abbr: 'C1', color: '#2ecc71', needed: true, examples: ['Skeletons'], reason: 'Distraction and cycle.' },
            { role: 'Cycle 2', abbr: 'C2', color: '#2ecc71', needed: true, examples: ['Ice Spirit'], reason: 'Freeze delay gives your X-Bow precious extra seconds.' },
            { role: 'Small Spell', abbr: 'SS', color: '#d456fd', needed: true, examples: ['The Log'], reason: 'Protects X-Bow from swarms/barrels. Pushback helps retarget.' },
            { role: 'Big Spell', abbr: 'BS', color: '#e67e22', needed: true, examples: ['Fireball'], reason: 'Clear Barbs or Minion Hordes that threaten your X-Bow.' }
        ],
        strategy: [
            'Gameplay is 90% Defense, 10% Offense.',
            'Don\'t play offensive X-Bow until you have an elixir lead or their big tank is out of cycle.',
            'Defensive X-Bow prevents opponents from breaking through.'
        ]
    },
    'Graveyard': {
        role: 'Control',
        archetype: 'Control',
        difficulty: 'Medium (6/10)',
        hardCounters: [{ name: 'Poison', reason: 'Kills.' }, { name: 'Mother Witch', reason: 'Curses.' }],
        imgUrl: 'https://raw.githubusercontent.com/RoyaleAPI/cr-api-assets/master/cards-75/graveyard.png',
        description: 'Spawns skeletons anywhere. Deadly RNG.',
        composition: [
            { role: 'Win Condition', abbr: 'WC', color: '#1abc9c', needed: true, examples: ['Graveyard'], reason: 'Cast on enemy tower. Skeletons spawn randomly. If not countered, takes tower.' },
            { role: 'Tank', abbr: 'MT', color: '#f1c40f', needed: true, examples: ['Knight', 'Valkyrie', 'Giant'], reason: 'The "Splash Yard" tank. Tower must shoot this, not the skeletons.' },
            { role: 'Splash', abbr: 'AD', color: '#e74c3c', needed: true, examples: ['Baby Dragon', 'Ice Wiz'], reason: 'Defensive control. Slows down pushes and survives to tank for Graveyard.' },
            { role: 'Building', abbr: 'BD', color: '#95a5a6', needed: true, examples: ['Tombstone'], reason: 'Classic defense. Spawns more skeletons effectively.' },
            { role: 'Spell', abbr: 'SS', color: '#d456fd', needed: true, examples: ['Poison'], reason: 'Mandatory. Kills the Minions/Archers they place to defend your Graveyard.' },
            { role: 'Small Spell', abbr: 'SS', color: '#d456fd', needed: true, examples: ['Barbarian Barrel'], reason: 'Tank + Defense in one card.' },
            { role: 'Support', abbr: 'CC', color: '#2ecc71', needed: true, examples: ['Zappies'], reason: 'Stun lock capability.' },
            { role: 'Killer', abbr: 'UT', color: '#f1c40f', needed: true, examples: ['Cannon Cart'], reason: 'The "Tank on Wheels". Turn into a building on death.' }
        ],
        strategy: [
            'Never play Graveyard without a tank (Knight/BabyD) tanking the tower.',
            'Wait for their Poison to be out of cycle.',
            'Counter-push: Defend with troops, then pop Graveyard when they cross the bridge.'
        ]
    }
};

window.SECONDARY_WIN_CONDITION_GUIDES = {
    'Mega Knight': {
        role: 'Tank / Defense',
        archetype: 'Control',
        difficulty: 'Easy (3/10)',
        hardCounters: [{ name: 'P.E.K.K.A', reason: 'Shreds him.' }, { name: 'Inferno Tower', reason: 'Melts.' }],
        imgUrl: 'https://raw.githubusercontent.com/RoyaleAPI/cr-api-assets/master/cards-75/mega-knight.png',
        description: 'The mid-ladder menace. Land with a force of 1000 mustaches.',
        composition: [
            { role: 'Win Condition', abbr: 'WC', color: '#1abc9c', needed: true, examples: ['Mega Knight'], reason: 'Use his spawn damage to kill support troops, then counter-push.' },
            { role: 'Win Condition 2', abbr: 'WC2', color: '#1abc9c', needed: true, examples: ['Wall Breakers', 'Ram Rider', 'Hog Rider'], reason: 'MK tanks, these deal the damage.' },
            { role: 'Air Defense', abbr: 'AD', color: '#e74c3c', needed: true, examples: ['Musketeer', 'Inferno Dragon'], reason: 'He can\'t hit air. You need strong air defense.' },
            { role: 'Bait', abbr: 'SC', color: '#2ecc71', needed: true, examples: ['Bats', 'Spear Goblins'], reason: 'Zap bait synergy with MK.' },
            { role: 'Small Spell', abbr: 'SS', color: '#d456fd', needed: true, examples: ['Zap', 'Snowball'], reason: 'Reset Infernos.' },
            { role: 'Big Spell', abbr: 'BS', color: '#e67e22', needed: false, examples: ['Fireball', 'Lightning'], reason: 'Clear support.' },
            { role: 'Support', abbr: 'SP', color: '#f39c12', needed: true, examples: ['Bandit', 'Prince'], reason: 'Bridge spam pressure.' },
            { role: 'Cycle', abbr: 'CC', color: '#95a5a6', needed: true, examples: ['Ice Spirit', 'Skeletons'], reason: 'Keep cycle fast.' }
        ],
        strategy: ['Never play at the bridge.', 'Drop on top of Wizard/Musketeer/Witch.', 'Let him tank for Wall Breakers.']
    },
    'P.E.K.K.A': {
        role: 'Tank Killer',
        archetype: 'Control',
        difficulty: 'Medium (5/10)',
        hardCounters: [{ name: 'Swarm', reason: 'Distracted easily.' }, { name: 'Inferno', reason: 'Melts.' }],
        imgUrl: 'https://raw.githubusercontent.com/RoyaleAPI/cr-api-assets/master/cards-75/pekka.png',
        description: 'BUTTERFLY. heavy hitter that stops all tanks.',
        composition: [
            { role: 'Win Condition', abbr: 'WC', color: '#1abc9c', needed: true, examples: ['Battle Ram', 'Hog Rider'], reason: 'PEKKA is defensive. You need a real win con.' },
            { role: 'Tank Killer', abbr: 'TK', color: '#f1c40f', needed: true, examples: ['P.E.K.K.A'], reason: 'Stops E-Giant, Golem, Mega Knight.' },
            { role: 'Splash', abbr: 'AD', color: '#e74c3c', needed: true, examples: ['Baby Dragon', 'Wizard'], reason: 'Clear swamps for her.' },
            { role: 'Stun', abbr: 'AD', color: '#e74c3c', needed: true, examples: ['Electro Wizard'], reason: 'Essential synergy.' },
            { role: 'Big Spell', abbr: 'BS', color: '#e67e22', needed: true, examples: ['Poison', 'Fireball'], reason: 'Clear graveyard/minions.' },
            { role: 'Small Spell', abbr: 'SS', color: '#d456fd', needed: true, examples: ['Zap'], reason: 'Reset infernos.' },
            { role: 'Pressure', abbr: 'PR', color: '#f39c12', needed: true, examples: ['Bandit', 'Royal Ghost'], reason: 'Support the push.' },
            { role: 'Cycle', abbr: 'CC', color: '#95a5a6', needed: true, examples: ['Skeletons', 'Minions'], reason: 'Distraction.' }
        ],
        strategy: ['Defense into counter-push.', 'Don\'t leak elixir.', 'Support with spells.']
    },
    'Sparky': {
        role: 'Glass Cannon',
        archetype: 'Beatdown',
        difficulty: 'Hard (8/10)',
        hardCounters: [{ name: 'Rocket', reason: 'Neutralizes.' }, { name: 'Electro Wizard', reason: 'Permastun.' }],
        imgUrl: 'https://raw.githubusercontent.com/RoyaleAPI/cr-api-assets/master/cards-75/sparky.png',
        description: 'Trash can on wheels? No, a nuclear weapon.',
        composition: [
            { role: 'Win Condition', abbr: 'WC', color: '#1abc9c', needed: true, examples: ['Goblin Giant'], reason: 'Fast tank for Sparky.' },
            { role: 'DPS', abbr: 'SC', color: '#2ecc71', needed: true, examples: ['Sparky'], reason: 'Protect her at all costs.' },
            { role: 'Rage', abbr: 'SS', color: '#d456fd', needed: true, examples: ['Rage'], reason: 'Speed is key.' },
            { role: 'Small Spell', abbr: 'SS', color: '#d456fd', needed: true, examples: ['Zap', 'Arrows'], reason: 'Clear swarms.' },
            { role: 'Anti-Air', abbr: 'AA', color: '#e74c3c', needed: true, examples: ['Minion Horde', 'Hunter'], reason: 'Protect from loon/minions.' },
            { role: 'Support', abbr: 'SP', color: '#f39c12', needed: true, examples: ['Mini P.E.K.K.A', 'Dark Prince'], reason: 'Ground defense.' },
            { role: 'Heavy Spell/Support', abbr: 'HS', color: '#e67e22', needed: true, examples: ['Mother Witch', 'Heal Spirit'], reason: 'Synergy.' },
            { role: 'Cycle', abbr: 'CC', color: '#95a5a6', needed: true, examples: ['Elixir Collector', 'Goblins'], reason: 'Ramp or defense.' }
        ],
        strategy: ['Bait out Zap/Rocket.', 'Sparky in the back.', 'Don\'t miss.']
    },
    'Elite Barbarians': {
        role: 'Punish',
        archetype: 'Bridge Spam',
        difficulty: 'Easy (2/10)',
        hardCounters: [{ name: 'Mega Knight', reason: 'Splats them.' }, { name: 'Rocket', reason: 'Positive trade.' }],
        imgUrl: 'https://raw.githubusercontent.com/RoyaleAPI/cr-api-assets/master/cards-75/elite-barbarians.png',
        description: 'Fast, angry, and high DPS. The bridge spam punishment.',
        composition: [
            { role: 'Win Condition', abbr: 'WC', color: '#1abc9c', needed: true, examples: ['Elite Barbarians'], reason: 'Rush when they are low on elixir.' },
            { role: 'Support', abbr: 'SC', color: '#2ecc71', needed: true, examples: ['Rage', 'Heal Spirit'], reason: 'Keep them moving and alive.' },
            { role: 'Spell', abbr: 'SS', color: '#d456fd', needed: true, examples: ['Zap', 'Arrows'], reason: 'Kill Skarmy instantly.' },
            { role: 'Tank/Mini Tank', abbr: 'TK', color: '#f1c40f', needed: true, examples: ['Valkyrie', 'Golem'], reason: 'Lead the charge.' },
            { role: 'Air Defense', abbr: 'AD', color: '#e74c3c', needed: true, examples: ['Musketeer', 'Firecracker'], reason: 'Clear air.' },
            { role: 'Big Spell', abbr: 'BS', color: '#e67e22', needed: true, examples: ['Fireball'], reason: 'Direct damage.' },
            { role: 'Bait', abbr: 'BT', color: '#2ecc71', needed: true, examples: ['Skeleton Army', 'Goblin Gang'], reason: 'Bait out spells.' },
            { role: 'Cycle', abbr: 'CC', color: '#95a5a6', needed: true, examples: ['Skeletons', 'Ice Spirit'], reason: 'Fast cycle.' }
        ],
        strategy: ['Wait for them to overcommit.', 'Split lane pressure.', 'Rage + E-Barbs = Win?']
    },
    'Giant Skeleton': {
        role: 'Defense / Bomb',
        archetype: 'Clone',
        difficulty: 'Medium',
        hardCounters: [{ name: 'DPS', reason: 'Melts before tower.' }],
        imgUrl: 'https://raw.githubusercontent.com/RoyaleAPI/cr-api-assets/master/cards-75/giant-skeleton.png',
        description: 'The big bomb. Stops massive pushes or nukes the tower.',
        composition: [
            { role: 'Tank', abbr: 'WC', color: '#1abc9c', needed: true, examples: ['Giant Skeleton'], reason: 'Death damage is the main value.' },
            { role: 'Clone', abbr: 'SS', color: '#d456fd', needed: true, examples: ['Clone'], reason: 'Double bomb, double trouble.' },
            { role: 'Swarm', abbr: 'SC', color: '#2ecc71', needed: true, examples: ['Skeleton Barrel'], reason: 'Bait spells for the clone.' },
            { role: 'Secondary Win Con', abbr: 'WC2', color: '#1abc9c', needed: true, examples: ['Hog Rider', 'Balloon'], reason: 'Reliable damage.' },
            { role: 'Air Defense', abbr: 'AD', color: '#e74c3c', needed: true, examples: ['Witch', 'Flying Machine'], reason: 'Clone synergy.' },
            { role: 'Defensive Building', abbr: 'DB', color: '#7f8c8d', needed: true, examples: ['Cannon', 'Furnace'], reason: 'Distract building targeters.' },
            { role: 'Spell', abbr: 'SS', color: '#d456fd', needed: true, examples: ['Tornado'], reason: 'Pull to bomb.' },
            { role: 'Cycle', abbr: 'CC', color: '#95a5a6', needed: true, examples: ['Guards', 'Skeletons'], reason: 'Defense.' }
        ],
        strategy: ['Defensive nuke.', 'Clone skip technique.', 'Tank for Hogs.']
    },
    'Prince': {
        role: 'Punish',
        archetype: 'Beatdown',
        difficulty: 'Medium',
        hardCounters: [{ name: 'Swarm', reason: 'Distracted.' }],
        imgUrl: 'https://raw.githubusercontent.com/RoyaleAPI/cr-api-assets/master/cards-75/prince.png',
        description: 'Charging lance deals double damage. Pressure card.',
        composition: [
            { role: 'Win Con', abbr: 'WC', color: '#1abc9c', needed: true, examples: ['Giant', 'Goblin Giant'], reason: 'Tanks for Prince.' },
            { role: 'Punish', abbr: 'TK', color: '#f1c40f', needed: true, examples: ['Prince'], reason: 'Threat in the other lane.' },
            { role: 'Spell', abbr: 'SS', color: '#d456fd', needed: true, examples: ['The Log', 'Zap'], reason: 'Clear swarm.' },
            { role: 'Support', abbr: 'SP', color: '#f39c12', needed: true, examples: ['Dark Prince'], reason: 'Double Prince synergy.' },
            { role: 'Air Defense', abbr: 'AD', color: '#e74c3c', needed: true, examples: ['Mega Minion', 'Electro Dragon'], reason: 'Support.' },
            { role: 'Big Spell', abbr: 'BS', color: '#e67e22', needed: true, examples: ['Fireball', 'Poison'], reason: 'Medium removal.' },
            { role: 'Cycle', abbr: 'CC', color: '#95a5a6', needed: true, examples: ['Skeletons', 'Spirit'], reason: 'Cycle.' },
            { role: 'Building', abbr: 'BD', color: '#7f8c8d', needed: false, examples: ['Goblin Cage', 'Tombstone'], reason: 'Defense.' }
        ],
        strategy: ['Charge!', 'Split push.', 'Defend then counter.']
    },
    'Bandit': {
        role: 'Bridge Spam',
        archetype: 'Bridge Spam',
        difficulty: 'High (Skill)',
        hardCounters: [{ name: 'Swarm', reason: 'Stops dash.' }],
        imgUrl: 'https://raw.githubusercontent.com/RoyaleAPI/cr-api-assets/master/cards-75/bandit.png',
        description: 'Dashes and becomes invulnerable.',
        composition: [
            { role: 'Pressure', abbr: 'WC', color: '#1abc9c', needed: true, examples: ['P.E.K.K.A', 'Battle Ram'], reason: 'Works well in Pekka BS.' },
            { role: 'Dash', abbr: 'TK', color: '#f1c40f', needed: true, examples: ['Bandit'], reason: 'Snipe princesses etc.' },
            { role: 'Air Defense', abbr: 'AD', color: '#e74c3c', needed: true, examples: ['Electro Wizard'], reason: 'Stun support.' },
            { role: 'Spell', abbr: 'SS', color: '#d456fd', needed: true, examples: ['Zap', 'Royal Delivery'], reason: 'Clear swarm.' },
            { role: 'Big Spell', abbr: 'BS', color: '#e67e22', needed: true, examples: ['Poison', 'Fireball'], reason: 'Area control.' },
            { role: 'Ghost', abbr: 'SP', color: '#f39c12', needed: true, examples: ['Royal Ghost'], reason: 'Invisible pressure.' },
            { role: 'Cycle', abbr: 'CC', color: '#95a5a6', needed: true, examples: ['Skeletons'], reason: 'Distraction.' },
            { role: 'Building/Fish', abbr: 'BD', color: '#7f8c8d', needed: false, examples: ['Fisherman', 'Cannon'], reason: 'Pull.' }
        ],
        strategy: ['Dash interaction knowledge.', 'Bridge spam.', 'Pressure.']
    },
    'Golden Knight': {
        role: 'Chain Dash',
        archetype: 'Beatdown / Bridge Spam',
        difficulty: 'Medium',
        hardCounters: [{ name: 'Air', reason: 'Cant hit air.' }],
        imgUrl: 'https://raw.githubusercontent.com/RoyaleAPI/cr-api-assets/master/cards-75/golden-knight.png',
        description: 'Dashing Handsome Boy. Dashes towards the tower if chained correctly.',
        composition: [
            { role: 'Tank', abbr: 'WC', color: '#1abc9c', needed: true, examples: ['Electro Giant', 'Golem'], reason: 'He supports tanks by clearing swarms.' },
            { role: 'Nado', abbr: 'SS', color: '#d456fd', needed: true, examples: ['Tornado'], reason: 'Pull units to create a dash chain to the tower.' },
            { role: 'Air Defense', abbr: 'AD', color: '#e74c3c', needed: true, examples: ['Phoenix', 'Baby Dragon'], reason: 'Air support.' },
            { role: 'Building', abbr: 'BD', color: '#7f8c8d', needed: true, examples: ['Cannon', 'Tombstone'], reason: 'Defense.' },
            { role: 'Big Spell', abbr: 'BS', color: '#e67e22', needed: true, examples: ['Lightning'], reason: 'Reset/Kill buildings.' },
            { role: 'Small Spell', abbr: 'SS', color: '#d456fd', needed: true, examples: ['Barbarian Barrel'], reason: 'Ground defense.' },
            { role: 'Champion', abbr: 'TK', color: '#f1c40f', needed: true, examples: ['Golden Knight'], reason: 'The carry.' },
            { role: 'Cycle', abbr: 'CC', color: '#95a5a6', needed: true, examples: ['Skeletons'], reason: 'Cycle.' }
        ],
        strategy: ['Use ability to chain onto tower.', 'Dash grants invulnerability.', 'Pressure lane.']
    },
    'Skeleton King': {
        role: 'Swarm Tank',
        archetype: 'Graveyard / Bait',
        difficulty: 'Medium',
        hardCounters: [{ name: 'Mother Witch', reason: 'Hard counter.' }, { name: 'Valkyrie', reason: 'Splash.' }],
        imgUrl: 'https://raw.githubusercontent.com/RoyaleAPI/cr-api-assets/master/cards-75/skeleton-king.png',
        description: 'Collects souls and spawns a graveyard on command.',
        composition: [
            { role: 'Swarm', abbr: 'SC', color: '#2ecc71', needed: true, examples: ['Tombstone', 'Skeleton Army'], reason: 'Feed his soul meter.' },
            { role: 'Win Con', abbr: 'WC', color: '#1abc9c', needed: true, examples: ['Graveyard', 'Mortar'], reason: 'Double danger.' },
            { role: 'Spell', abbr: 'SS', color: '#d456fd', needed: true, examples: ['Arrows', 'Zap'], reason: 'Clear minions.' },
            { role: 'Big Spell', abbr: 'BS', color: '#e67e22', needed: true, examples: ['Fireball', 'Poison'], reason: 'Area denial.' },
            { role: 'Air Defense', abbr: 'AD', color: '#e74c3c', needed: true, examples: ['Zappies', 'Musketeer'], reason: 'Stun/DPS.' },
            { role: 'Champion', abbr: 'MT', color: '#f1c40f', needed: true, examples: ['Skeleton King'], reason: 'The King himself.' },
            { role: 'Cycle', abbr: 'CC', color: '#95a5a6', needed: true, examples: ['Guards'], reason: 'Swarm.' },
            { role: 'Building', abbr: 'BD', color: '#7f8c8d', needed: true, examples: ['Cannon Cart'], reason: 'Counterpush.' }
        ],
        strategy: ['Charge ability before bridge.', 'Bait out splash first.', 'Tank for the swarm.']
    },
    'Archer Queen': {
        role: 'DPS / Cloak',
        archetype: 'Cycle / Beatdown',
        difficulty: 'Easy (Ability)',
        hardCounters: [{ name: 'Lightning', reason: 'Kills her.' }],
        imgUrl: 'https://raw.githubusercontent.com/RoyaleAPI/cr-api-assets/master/cards-75/archer-queen.png',
        description: 'Goes invisible and deals massive damage. The Queen Walk.',
        composition: [
            { role: 'Win Con', abbr: 'WC', color: '#1abc9c', needed: true, examples: ['Royal Hogs', 'X-Bow'], reason: 'She defends, then you counterpush.' },
            { role: 'Cycle', abbr: 'CC', color: '#2ecc71', needed: true, examples: ['Skeletons', 'Spirit'], reason: 'Cycle back to her ability.' },
            { role: 'Big Spell', abbr: 'BS', color: '#e67e22', needed: true, examples: ['Earthquake', 'Fireball'], reason: 'Clear buildings.' },
            { role: 'Small Spell', abbr: 'SS', color: '#d456fd', needed: true, examples: ['The Log'], reason: 'Pushback.' },
            { role: 'Mini Tank', abbr: 'MT', color: '#f1c40f', needed: true, examples: ['Knight', 'Valkyrie'], reason: 'Protect the queen.' },
            { role: 'Building', abbr: 'BD', color: '#7f8c8d', needed: true, examples: ['Cannon', 'Tesla'], reason: 'Defense.' },
            { role: 'Support', abbr: 'SP', color: '#f39c12', needed: true, examples: ['Fire Spirit'], reason: 'Cycle/Splash.' },
            { role: 'Champion', abbr: 'BU', color: '#95a5a6', needed: true, examples: ['Archer Queen'], reason: 'DPS Carry.' }
        ],
        strategy: ['Save ability for big interactions.', 'Cloak drops aggro.', 'Snipe tower from bridge.']
    },
    'Mighty Miner': {
        role: 'Lane Switch',
        archetype: 'Bait / Cycle',
        difficulty: 'Medium',
        hardCounters: [{ name: 'Air', reason: 'Helpless.' }],
        imgUrl: 'https://raw.githubusercontent.com/RoyaleAPI/cr-api-assets/master/cards-75/mighty-miner.png',
        description: 'Tank killer that switches lanes. Leaves a bomb behind.',
        composition: [
            { role: 'Bait', abbr: 'WC', color: '#1abc9c', needed: true, examples: ['Goblin Barrel', 'Wall Breakers'], reason: 'He tanks for bait cards.' },
            { role: 'Air Def', abbr: 'AD', color: '#e74c3c', needed: true, examples: ['Musketeer', 'Dart Goblin'], reason: 'Cover his weakness.' },
            { role: 'Big Spell', abbr: 'BS', color: '#e67e22', needed: true, examples: ['Rocket', 'Fireball'], reason: 'Finish tower.' },
            { role: 'Small Spell', abbr: 'SS', color: '#d456fd', needed: true, examples: ['The Log'], reason: 'Bait.' },
            { role: 'Building', abbr: 'BD', color: '#7f8c8d', needed: true, examples: ['Bomb Tower', 'Inferno Tower'], reason: 'Defense.' },
            { role: 'Cycle', abbr: 'CC', color: '#95a5a6', needed: true, examples: ['Goblins', 'Ice Spirit'], reason: 'Cycle.' },
            { role: 'Support', abbr: 'SP', color: '#f39c12', needed: true, examples: ['Princess'], reason: 'Bait.' },
            { role: 'Champion', abbr: 'MT', color: '#f1c40f', needed: true, examples: ['Mighty Miner'], reason: 'Tank Killer.' }
        ],
        strategy: [' Lane switch to escape counters.', 'Ramps up damage like Inferno.', 'Bomb kills swarms.']
    },
    'Monk': {
        role: 'Deflection',
        archetype: 'Control / RG',
        difficulty: 'Hard (Timing)',
        hardCounters: [{ name: 'Zappies', reason: 'Stun lock.' }],
        imgUrl: 'https://raw.githubusercontent.com/RoyaleAPI/cr-api-assets/master/cards-75/monk.png',
        description: 'Reflects projectiles. Protects your win condition from spells.',
        composition: [
            { role: 'Win Con', abbr: 'WC', color: '#1abc9c', needed: true, examples: ['Royal Giant', 'Hog Rider'], reason: 'Reflects rockets/log away from them.' },
            { role: 'DPS', abbr: 'SC', color: '#2ecc71', needed: true, examples: ['Phoenix'], reason: 'Push partner.' },
            { role: 'Champion', abbr: 'SP', color: '#f39c12', needed: true, examples: ['Monk'], reason: 'Reflect.' },
            { role: 'Small Spell', abbr: 'SS', color: '#d456fd', needed: true, examples: ['The Log'], reason: 'Clear swarm.' },
            { role: 'Big Spell', abbr: 'BS', color: '#e67e22', needed: true, examples: ['Fireball'], reason: 'Kill support.' },
            { role: 'Building', abbr: 'BD', color: '#7f8c8d', needed: true, examples: ['Tombstone'], reason: 'Defense.' },
            { role: 'Cycle', abbr: 'CC', color: '#95a5a6', needed: true, examples: ['Skeletons'], reason: 'Cycle.' },
            { role: 'Air Def', abbr: 'AD', color: '#e74c3c', needed: true, examples: ['Mother Witch', 'Hunter'], reason: 'Swarm control.' }
        ],
        strategy: ['Predict the Rocket/Log.', 'Push opponent back.', 'Protect the carry.']
    },
    'Magic Archer': {
        role: 'Geometry',
        archetype: 'Control / Bridge Spam',
        difficulty: 'Hard (Geometry)',
        hardCounters: [{ name: 'Fireball', reason: 'Die.' }],
        imgUrl: 'https://raw.githubusercontent.com/RoyaleAPI/cr-api-assets/master/cards-75/magic-archer.png',
        description: 'It\'s not about hitting the troop, it\'s about hitting the tower behind it.',
        composition: [
            { role: 'Tornado', abbr: 'SS', color: '#d456fd', needed: true, examples: ['Tornado'], reason: 'Line them up.' },
            { role: 'Tank', abbr: 'MT', color: '#f1c40f', needed: true, examples: ['P.E.K.K.A', 'Miner'], reason: 'Distraction.' },
            { role: 'Win Con', abbr: 'WC', color: '#1abc9c', needed: true, examples: ['Wall Breakers', 'Ram Rider'], reason: 'Pressure.' },
            { role: 'Big Spell', abbr: 'BS', color: '#e67e22', needed: true, examples: ['Fireball'], reason: 'Control.' },
            { role: 'Building', abbr: 'BD', color: '#7f8c8d', needed: true, examples: ['Bomb Tower'], reason: 'Splash.' },
            { role: 'Cycle', abbr: 'CC', color: '#95a5a6', needed: true, examples: ['Skeletons', 'Spirit'], reason: 'Cycle.' },
            { role: 'Geometry', abbr: 'SP', color: '#f39c12', needed: true, examples: ['Magic Archer'], reason: 'Geometry.' },
            { role: 'Air Def', abbr: 'AD', color: '#e74c3c', needed: true, examples: ['Electro Wizard'], reason: 'Control.' }
        ],
        strategy: ['Geometry is key.', 'Pierce through tanks.', 'Chip damage wins games.']
    }
};
