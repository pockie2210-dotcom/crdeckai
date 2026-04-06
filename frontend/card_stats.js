/**
 * CARD STATS DATABASE - Tournament Standard (Level 11)
 * Stats verified against clashroyale.fandom.com, liquipedia.net, noff.gg, sportskeeda.com
 * Last updated: March 2026
 */
window.CARD_STATS = {
    // ============ COMMON TROOPS ============
    'Knight': {
        hitpoints: 1766, damage: 202, hitSpeed: 1.2, dps: 168, range: 'Melee: Medium', speed: 'Medium', targets: 'Ground', count: 1, type: 'Troop', rarity: 'Common', elixir: 3,
        ability: null, isHero: false, isEvo: false, evoName: 'Knight Evolution'
    },
    'Knight Evolution': {
        hitpoints: 1766, damage: 202, hitSpeed: 1.2, dps: 168, range: 'Melee: Medium', speed: 'Medium', targets: 'Ground', count: 1, type: 'Troop', rarity: 'Common', elixir: 3,
        ability: 'While moving, gains armor that significantly reduces incoming ranged damage. Stronger in melee combat.', isHero: false, isEvo: true
    },
    'Archers': {
        hitpoints: 304, damage: 112, hitSpeed: 1.1, dps: 101, range: '5.5', speed: 'Medium', targets: 'Air & Ground', count: 2, type: 'Troop', rarity: 'Common', elixir: 3,
        ability: null, isHero: false, isEvo: false, evoName: 'Archers Evolution'
    },
    'Archers Evolution': {
        hitpoints: 304, damage: 112, hitSpeed: 1.1, dps: 101, range: '5.5 / 8 (far)', speed: 'Medium', targets: 'Air & Ground', count: 2, type: 'Troop', rarity: 'Common', elixir: 3,
        ability: 'Gains extra range and increased damage to faraway targets.', isHero: false, isEvo: true
    },
    'Goblins': {
        hitpoints: 202, damage: 120, hitSpeed: 1.1, dps: 109, range: 'Melee: Short', speed: 'Very Fast', targets: 'Ground', count: 3, type: 'Troop', rarity: 'Common', elixir: 2,
        ability: null, isHero: false, isEvo: false, evoName: 'Goblins Evolution'
    },
    'Goblins Evolution': {
        hitpoints: 202, damage: 120, hitSpeed: 1.1, dps: 109, range: 'Melee: Short', speed: 'Very Fast', targets: 'Ground', count: 3, type: 'Troop', rarity: 'Common', elixir: 2,
        ability: 'Spawns an additional Goblin after a short delay.', isHero: false, isEvo: true
    },
    'Minions': {
        hitpoints: 252, damage: 111, hitSpeed: 1.0, dps: 111, range: 'Melee: Long', speed: 'Fast', targets: 'Air & Ground', count: 3, type: 'Troop', rarity: 'Common', elixir: 3,
        ability: null, isHero: false, isEvo: false
    },
    'Bomber': {
        hitpoints: 376, damage: 327, hitSpeed: 1.8, dps: 181, range: '4.5', speed: 'Medium', targets: 'Ground', count: 1, type: 'Troop', rarity: 'Common', elixir: 2,
        ability: 'Area splash damage.', isHero: false, isEvo: false, evoName: 'Bomber Evolution'
    },
    'Bomber Evolution': {
        hitpoints: 376, damage: 327, hitSpeed: 1.8, dps: 181, range: '4.5', speed: 'Medium', targets: 'Ground', count: 1, type: 'Troop', rarity: 'Common', elixir: 2,
        ability: 'Splits into 2 smaller Bombers on death.', isHero: false, isEvo: true
    },
    'Skeletons': {
        hitpoints: 81, damage: 81, hitSpeed: 1.0, dps: 81, range: 'Melee: Short', speed: 'Fast', targets: 'Ground', count: 3, type: 'Troop', rarity: 'Common', elixir: 1,
        ability: null, isHero: false, isEvo: false, evoName: 'Skeletons Evolution'
    },
    'Skeletons Evolution': {
        hitpoints: 81, damage: 81, hitSpeed: 1.0, dps: 81, range: 'Melee: Short', speed: 'Fast', targets: 'Ground', count: 4, type: 'Troop', rarity: 'Common', elixir: 1,
        ability: 'Spawns 4 Skeletons instead of 3. An extra Skeleton spawns from the grave shortly after.', isHero: false, isEvo: true
    },
    'Spear Goblins': {
        hitpoints: 133, damage: 75, hitSpeed: 1.7, dps: 44, range: '5', speed: 'Very Fast', targets: 'Air & Ground', count: 3, type: 'Troop', rarity: 'Common', elixir: 2,
        ability: null, isHero: false, isEvo: false
    },
    'Minion Horde': {
        hitpoints: 252, damage: 111, hitSpeed: 1.0, dps: 111, range: 'Melee: Long', speed: 'Fast', targets: 'Air & Ground', count: 6, type: 'Troop', rarity: 'Common', elixir: 5,
        ability: null, isHero: false, isEvo: false
    },
    'Barbarians': {
        hitpoints: 670, damage: 159, hitSpeed: 1.4, dps: 113, range: 'Melee: Medium', speed: 'Medium', targets: 'Ground', count: 5, type: 'Troop', rarity: 'Common', elixir: 5,
        ability: null, isHero: false, isEvo: false, evoName: 'Barbarians Evolution'
    },
    'Barbarians Evolution': {
        hitpoints: 670, damage: 159, hitSpeed: 1.4, dps: 113, range: 'Melee: Medium', speed: 'Medium', targets: 'Ground', count: 5, type: 'Troop', rarity: 'Common', elixir: 5,
        ability: 'Each Barbarian gains a 2-second Rage effect (35% boost to damage, hit speed, move speed) when hitting an enemy troop or building.', isHero: false, isEvo: true
    },
    'Royal Giant': {
        hitpoints: 2544, damage: 188, hitSpeed: 1.7, dps: 110, range: '5', speed: 'Slow', targets: 'Buildings', count: 1, type: 'Troop', rarity: 'Common', elixir: 6,
        ability: null, isHero: false, isEvo: false, evoName: 'Royal Giant Evolution'
    },
    'Royal Giant Evolution': {
        hitpoints: 2544, damage: 188, hitSpeed: 1.7, dps: 110, range: '5', speed: 'Slow', targets: 'Buildings', count: 1, type: 'Troop', rarity: 'Common', elixir: 6,
        ability: 'Deploys with a cannon on his back that shoots nearby enemies while he focuses buildings.', isHero: false, isEvo: true
    },
    'Bats': {
        hitpoints: 81, damage: 81, hitSpeed: 1.1, dps: 73, range: 'Melee: Medium', speed: 'Very Fast', targets: 'Air & Ground', count: 5, type: 'Troop', rarity: 'Common', elixir: 2,
        ability: null, isHero: false, isEvo: false, evoName: 'Bats Evolution'
    },
    'Bats Evolution': {
        hitpoints: 122, damage: 81, hitSpeed: 1.1, dps: 73, range: 'Melee: Medium', speed: 'Very Fast', targets: 'Air & Ground', count: 5, type: 'Troop', rarity: 'Common', elixir: 2,
        ability: 'Vampire Bats: Heal themselves on each attack. Can overheal up to 3x normal HP. Spawn with 50% bonus hitpoints.', isHero: false, isEvo: true
    },
    'Fire Spirit': {
        hitpoints: 252, damage: 229, hitSpeed: null, dps: null, range: '2', speed: 'Very Fast', targets: 'Air & Ground', count: 1, type: 'Troop', rarity: 'Common', elixir: 1,
        ability: 'Kamikaze — jumps at and splashes enemy for area damage.', isHero: false, isEvo: false
    },
    'Ice Spirit': {
        hitpoints: 252, damage: 100, hitSpeed: null, dps: null, range: '2.5', speed: 'Very Fast', targets: 'Air & Ground', count: 1, type: 'Troop', rarity: 'Common', elixir: 1,
        ability: 'Kamikaze — jumps and freezes targets for 1 second.', isHero: false, isEvo: false
    },
    'Electro Spirit': {
        hitpoints: 120, damage: 91, hitSpeed: null, dps: null, range: '2.5', speed: 'Very Fast', targets: 'Air & Ground', count: 1, type: 'Troop', rarity: 'Common', elixir: 1,
        ability: 'Kamikaze — chains electric damage to up to 9 targets.', isHero: false, isEvo: false
    },
    'Firecracker': {
        hitpoints: 252, damage: 182, hitSpeed: 2.4, dps: 75, range: '6', speed: 'Medium', targets: 'Air & Ground', count: 1, type: 'Troop', rarity: 'Common', elixir: 3,
        ability: 'Knockback on shot. Projectile penetrates through targets.', isHero: false, isEvo: false, evoName: 'Firecracker Evolution'
    },
    'Firecracker Evolution': {
        hitpoints: 252, damage: 182, hitSpeed: 2.4, dps: 75, range: '6', speed: 'Medium', targets: 'Air & Ground', count: 1, type: 'Troop', rarity: 'Common', elixir: 3,
        ability: 'Fires 3 firecrackers in a spread pattern instead of 1.', isHero: false, isEvo: true
    },
    'Skeleton Dragons': {
        hitpoints: 554, damage: 127, hitSpeed: 1.9, dps: 66, range: '3.5', speed: 'Fast', targets: 'Air & Ground', count: 2, type: 'Troop', rarity: 'Common', elixir: 4,
        ability: 'Flying. Area splash damage.', isHero: false, isEvo: false
    },
    'Elite Barbarians': {
        hitpoints: 1010, damage: 254, hitSpeed: 1.4, dps: 181, range: 'Melee: Medium', speed: 'Very Fast', targets: 'Ground', count: 2, type: 'Troop', rarity: 'Common', elixir: 6,
        ability: null, isHero: false, isEvo: false
    },
    'Zappies': {
        hitpoints: 554, damage: 91, hitSpeed: 1.6, dps: 56, range: '4.5', speed: 'Medium', targets: 'Air & Ground', count: 3, type: 'Troop', rarity: 'Common', elixir: 4,
        ability: 'Stuns target on hit (0.5s reset).', isHero: false, isEvo: false
    },
    'Rascals': {
        hitpoints: 1087, damage: 167, hitSpeed: 1.1, dps: 151, range: 'Melee/5', speed: 'Medium', targets: 'Air & Ground', count: 3, type: 'Troop', rarity: 'Common', elixir: 5,
        ability: 'Rascal Boy (melee tank) + 2 Rascal Girls (ranged).', isHero: false, isEvo: false
    },
    'Goblin Gang': {
        hitpoints: 202, damage: 120, hitSpeed: 1.1, dps: 109, range: 'Melee/5', speed: 'Very Fast', targets: 'Air & Ground', count: 5, type: 'Troop', rarity: 'Common', elixir: 3,
        ability: '3 Goblins + 2 Spear Goblins.', isHero: false, isEvo: false
    },
    'Royal Recruits': {
        hitpoints: 504, damage: 111, hitSpeed: 1.3, dps: 85, range: 'Melee: Long', speed: 'Medium', targets: 'Ground', count: 6, type: 'Troop', rarity: 'Common', elixir: 7,
        ability: 'Split deploy — 3 per lane. Each has a shield (199 HP).', isHero: false, isEvo: false
    },
    'Skeleton Barrel': {
        hitpoints: 598, damage: null, hitSpeed: null, dps: null, range: 'Melee', speed: 'Fast', targets: 'Buildings', count: 1, type: 'Troop', rarity: 'Common', elixir: 3,
        ability: 'Flying. Drops 7 Skeletons on death.', isHero: false, isEvo: false, evoName: 'Skeleton Barrel Evolution'
    },

    // ============ RARE TROOPS ============
    'Giant': {
        hitpoints: 3968, damage: 253, hitSpeed: 1.5, dps: 168, range: 'Melee: Long', speed: 'Slow', targets: 'Buildings', count: 1, type: 'Troop', rarity: 'Rare', elixir: 5,
        ability: null, isHero: false, isEvo: false, heroName: 'Hero Giant'
    },
    'Musketeer': {
        hitpoints: 720, damage: 218, hitSpeed: 1.0, dps: 218, range: '6', speed: 'Medium', targets: 'Air & Ground', count: 1, type: 'Troop', rarity: 'Rare', elixir: 4,
        ability: null, isHero: false, isEvo: false, evoName: 'Musketeer Evolution', heroName: 'Hero Musketeer'
    },
    'Hog Rider': {
        hitpoints: 1697, damage: 317, hitSpeed: 1.6, dps: 198, range: 'Melee: Medium', speed: 'Very Fast', targets: 'Buildings', count: 1, type: 'Troop', rarity: 'Rare', elixir: 4,
        ability: null, isHero: false, isEvo: false
    },
    'Valkyrie': {
        hitpoints: 1907, damage: 266, hitSpeed: 1.5, dps: 177, range: 'Melee: Medium', speed: 'Medium', targets: 'Ground', count: 1, type: 'Troop', rarity: 'Rare', elixir: 4,
        ability: '360° splash damage.', isHero: false, isEvo: false, evoName: 'Valkyrie Evolution'
    },
    'Valkyrie Evolution': {
        hitpoints: 1907, damage: 266, hitSpeed: 1.5, dps: 177, range: 'Melee: Medium', speed: 'Medium', targets: 'Ground', count: 1, type: 'Troop', rarity: 'Rare', elixir: 4,
        ability: 'Spins and pulls nearby ground enemies towards her.', isHero: false, isEvo: true
    },
    'Mini P.E.K.K.A': {
        hitpoints: 657, damage: 355, hitSpeed: 1.7, dps: 221, range: 'Melee: Medium', speed: 'Fast', targets: 'Ground', count: 1, type: 'Troop', rarity: 'Rare', elixir: 4,
        ability: null, isHero: false, isEvo: false, heroName: 'Hero Mini P.E.K.K.A'
    },
    'Wizard': {
        hitpoints: 755, damage: 281, hitSpeed: 1.4, dps: 200, range: '5.5', speed: 'Medium', targets: 'Air & Ground', count: 1, type: 'Troop', rarity: 'Rare', elixir: 5,
        ability: 'Area splash damage.', isHero: false, isEvo: false, evoName: 'Wizard Evolution', heroName: 'Hero Wizard'
    },
    'Heal Spirit': {
        hitpoints: 252, damage: 104, hitSpeed: null, dps: null, range: '2.5', speed: 'Very Fast', targets: 'Air & Ground', count: 1, type: 'Troop', rarity: 'Rare', elixir: 1,
        ability: 'Kamikaze — heals nearby friendly troops on jump.', isHero: false, isEvo: false
    },
    'Ice Golem': {
        hitpoints: 1056, damage: 81, hitSpeed: 2.5, dps: 32, range: 'Melee: Short', speed: 'Slow', targets: 'Buildings', count: 1, type: 'Troop', rarity: 'Rare', elixir: 2,
        ability: 'Death damage (84) slows nearby enemies for 2 seconds.', isHero: false, isEvo: false, heroName: 'Hero Ice Golem'
    },
    'Battle Ram': {
        hitpoints: 756, damage: 252, hitSpeed: 1.2, dps: 210, range: 'Melee: Medium', speed: 'Medium', targets: 'Buildings', count: 1, type: 'Troop', rarity: 'Rare', elixir: 4,
        ability: 'Charges at buildings. Spawns 2 Barbarians on death.', isHero: false, isEvo: false
    },
    'Mega Minion': {
        hitpoints: 756, damage: 281, hitSpeed: 1.5, dps: 187, range: 'Melee: Long', speed: 'Medium', targets: 'Air & Ground', count: 1, type: 'Troop', rarity: 'Rare', elixir: 3,
        ability: 'Flying.', isHero: false, isEvo: false, heroName: 'Hero Mega Minion'
    },
    'Flying Machine': {
        hitpoints: 504, damage: 127, hitSpeed: 1.0, dps: 127, range: '6', speed: 'Fast', targets: 'Air & Ground', count: 1, type: 'Troop', rarity: 'Rare', elixir: 4,
        ability: 'Flying.', isHero: false, isEvo: false
    },
    'Dart Goblin': {
        hitpoints: 252, damage: 100, hitSpeed: 0.65, dps: 153, range: '6.5', speed: 'Very Fast', targets: 'Air & Ground', count: 1, type: 'Troop', rarity: 'Rare', elixir: 3,
        ability: null, isHero: false, isEvo: false, evoName: 'Dart Goblin Evolution'
    },
    'Three Musketeers': {
        hitpoints: 656, damage: 218, hitSpeed: 1.0, dps: 218, range: '6', speed: 'Medium', targets: 'Air & Ground', count: 3, type: 'Troop', rarity: 'Rare', elixir: 9,
        ability: 'Split deployment: 1 left, 2 right lane.', isHero: false, isEvo: false
    },
    'Royal Hogs': {
        hitpoints: 598, damage: 60, hitSpeed: 1.2, dps: 50, range: 'Melee: Medium', speed: 'Very Fast', targets: 'Buildings', count: 4, type: 'Troop', rarity: 'Rare', elixir: 5,
        ability: 'Split deployment (2+2).', isHero: false, isEvo: false, evoName: 'Royal Hogs Evolution'
    },
    'Royal Hogs Evolution': {
        hitpoints: 598, damage: 60, hitSpeed: 1.2, dps: 50, range: 'Melee: Medium', speed: 'Very Fast', targets: 'Buildings', count: 4, type: 'Troop', rarity: 'Rare', elixir: 5,
        ability: 'One Royal Hog wears a crown and has bonus hitpoints as a mini-tank.', isHero: false, isEvo: true
    },
    'Hunter': {
        hitpoints: 756, damage: 62, hitSpeed: 2.2, dps: 282, range: '4', speed: 'Medium', targets: 'Air & Ground', count: 1, type: 'Troop', rarity: 'Rare', elixir: 4,
        ability: 'Fires 10 pellets per shot (62 dmg each = 620 max). Massive damage at close range.', isHero: false, isEvo: false, evoName: 'Hunter Evolution'
    },
    'Battle Healer': {
        hitpoints: 1500, damage: 120, hitSpeed: 1.5, dps: 80, range: 'Melee: Long', speed: 'Slow', targets: 'Ground', count: 1, type: 'Troop', rarity: 'Rare', elixir: 4,
        ability: 'Heals nearby friendly troops each time she attacks. Flying when idle.', isHero: false, isEvo: false
    },
    'Elixir Golem': {
        hitpoints: 1056, damage: 120, hitSpeed: 1.3, dps: 92, range: 'Melee: Medium', speed: 'Slow', targets: 'Buildings', count: 1, type: 'Troop', rarity: 'Rare', elixir: 3,
        ability: 'Splits into Golemites then Blobs on death. Gives opponent elixir per death stage.', isHero: false, isEvo: false
    },
    'Cannon Cart': {
        hitpoints: 670, damage: 218, hitSpeed: 1.2, dps: 181, range: '5', speed: 'Fast', targets: 'Air & Ground', count: 1, type: 'Troop', rarity: 'Rare', elixir: 5,
        ability: 'Has a shield (670 HP). Becomes a building when shield breaks.', isHero: false, isEvo: false
    },

    // ============ EPIC TROOPS ============
    'Prince': {
        hitpoints: 1920, damage: 391, hitSpeed: 1.4, dps: 279, range: 'Melee: Long', speed: 'Medium', targets: 'Ground', count: 1, type: 'Troop', rarity: 'Epic', elixir: 5,
        ability: 'Charge: Double damage on first hit after charging (783).', isHero: false, isEvo: false
    },
    'Baby Dragon': {
        hitpoints: 1064, damage: 133, hitSpeed: 1.5, dps: 88, range: '3.5', speed: 'Fast', targets: 'Air & Ground', count: 1, type: 'Troop', rarity: 'Epic', elixir: 4,
        ability: 'Area splash damage. Flying unit.', isHero: false, isEvo: false
    },
    'P.E.K.K.A': {
        hitpoints: 3760, damage: 816, hitSpeed: 1.8, dps: 453, range: 'Melee: Long', speed: 'Slow', targets: 'Ground', count: 1, type: 'Troop', rarity: 'Epic', elixir: 7,
        ability: null, isHero: false, isEvo: false, evoName: 'P.E.K.K.A Evolution'
    },
    'P.E.K.K.A Evolution': {
        hitpoints: 3760, damage: 816, hitSpeed: 1.8, dps: 453, range: 'Melee: Long', speed: 'Slow', targets: 'Ground', count: 1, type: 'Troop', rarity: 'Epic', elixir: 7,
        ability: 'Healing Blade: Heals 12.5% of max HP per kill. Can overheal up to 50% above max HP (needs 4+ kills).', isHero: false, isEvo: true
    },
    'Witch': {
        hitpoints: 840, damage: 136, hitSpeed: 1.0, dps: 136, range: '5.5', speed: 'Medium', targets: 'Air & Ground', count: 1, type: 'Troop', rarity: 'Epic', elixir: 5,
        ability: 'Spawns 3 Skeletons every 7 seconds. Area splash.', isHero: false, isEvo: false, evoName: 'Witch Evolution'
    },
    'Balloon': {
        hitpoints: 1679, damage: 640, hitSpeed: 3.0, dps: 213, range: 'Melee: Short', speed: 'Medium', targets: 'Buildings', count: 1, type: 'Troop', rarity: 'Epic', elixir: 5,
        ability: 'Death damage (240 area splash). Flying unit.', isHero: false, isEvo: false
    },
    'Skeleton Army': {
        hitpoints: 81, damage: 81, hitSpeed: 1.0, dps: 81, range: 'Melee: Short', speed: 'Fast', targets: 'Ground', count: 15, type: 'Troop', rarity: 'Epic', elixir: 3,
        ability: null, isHero: false, isEvo: false
    },
    'Goblin Barrel': {
        hitpoints: 202, damage: 120, hitSpeed: 1.1, dps: 109, range: 'Melee: Short', speed: 'Very Fast', targets: 'Ground', count: 3, type: 'Spell', rarity: 'Epic', elixir: 3,
        ability: 'Deploys 3 Goblins anywhere on the arena.', isHero: false, isEvo: false, evoName: 'Goblin Barrel Evolution'
    },
    'Goblin Barrel Evolution': {
        hitpoints: 202, damage: 120, hitSpeed: 1.1, dps: 109, range: 'Melee: Short', speed: 'Very Fast', targets: 'Ground', count: 3, type: 'Spell', rarity: 'Epic', elixir: 3,
        ability: 'Barrel bounces after landing, deploying goblins a second time.', isHero: false, isEvo: true
    },
    'Dark Prince': {
        hitpoints: 900, damage: 230, hitSpeed: 1.3, dps: 176, range: 'Melee: Medium', speed: 'Medium', targets: 'Ground', count: 1, type: 'Troop', rarity: 'Epic', elixir: 4,
        ability: 'Charge attack with area splash. Shield (199 HP).', isHero: false, isEvo: false
    },
    'Bowler': {
        hitpoints: 1764, damage: 281, hitSpeed: 2.5, dps: 112, range: '7.5', speed: 'Slow', targets: 'Ground', count: 1, type: 'Troop', rarity: 'Epic', elixir: 5,
        ability: 'Boulder pushes back and pierces through all units in a line.', isHero: false, isEvo: false
    },
    'Executioner': {
        hitpoints: 1100, damage: 218, hitSpeed: 2.4, dps: 90, range: '4.5', speed: 'Medium', targets: 'Air & Ground', count: 1, type: 'Troop', rarity: 'Epic', elixir: 5,
        ability: 'Throws returning boomerang axe — hits enemies twice.', isHero: false, isEvo: false, evoName: 'Executioner Evolution'
    },
    'Giant Skeleton': {
        hitpoints: 2744, damage: 218, hitSpeed: 1.5, dps: 145, range: 'Melee: Medium', speed: 'Medium', targets: 'Ground', count: 1, type: 'Troop', rarity: 'Epic', elixir: 6,
        ability: 'Drops a bomb on death dealing massive area damage (957).', isHero: false, isEvo: false
    },
    'Goblin Giant': {
        hitpoints: 2544, damage: 159, hitSpeed: 1.5, dps: 106, range: 'Melee: Long', speed: 'Medium', targets: 'Buildings', count: 1, type: 'Troop', rarity: 'Epic', elixir: 6,
        ability: '2 Spear Goblins ride on back hitting air & ground. They survive when Giant dies.', isHero: false, isEvo: false, evoName: 'Goblin Giant Evolution'
    },
    'Electro Dragon': {
        hitpoints: 756, damage: 159, hitSpeed: 2.1, dps: 75, range: '3.5', speed: 'Medium', targets: 'Air & Ground', count: 1, type: 'Troop', rarity: 'Epic', elixir: 5,
        ability: 'Chain lightning hits up to 3 targets. Stuns briefly.', isHero: false, isEvo: false, evoName: 'Electro Dragon Evolution'
    },
    'Inferno Dragon': {
        hitpoints: 1064, damage: '43→158→847', hitSpeed: 0.4, dps: '107→395→2117', range: '4', speed: 'Medium', targets: 'Air & Ground', count: 1, type: 'Troop', rarity: 'Epic', elixir: 4,
        ability: 'Inferno beam ramps in 3 stages (~2s each). Resets on stun/freeze/retarget. Flying.', isHero: false, isEvo: false, evoName: 'Inferno Dragon Evolution'
    },
    'Guards': {
        hitpoints: 81, damage: 100, hitSpeed: 1.1, dps: 90, range: 'Melee: Long', speed: 'Fast', targets: 'Ground', count: 3, type: 'Troop', rarity: 'Epic', elixir: 3,
        ability: 'Shield (199 HP) blocks all damage until destroyed.', isHero: false, isEvo: false
    },
    'Golem': {
        hitpoints: 5120, damage: 312, hitSpeed: 2.5, dps: 124, range: 'Melee: Medium', speed: 'Slow', targets: 'Buildings', count: 1, type: 'Troop', rarity: 'Epic', elixir: 8,
        ability: 'Splits into 2 Golemites on death. Both deal death damage (225).', isHero: false, isEvo: false
    },
    'Night Witch': {
        hitpoints: 756, damage: 264, hitSpeed: 1.5, dps: 176, range: 'Melee: Medium', speed: 'Medium', targets: 'Ground', count: 1, type: 'Troop', rarity: 'Epic', elixir: 4,
        ability: 'Spawns 2 Bats every 5 seconds. Spawns 4 Bats on death.', isHero: false, isEvo: false
    },
    'Phoenix': {
        hitpoints: 800, damage: 65, hitSpeed: 0.7, dps: 92, range: '4', speed: 'Fast', targets: 'Air & Ground', count: 1, type: 'Troop', rarity: 'Epic', elixir: 4,
        ability: 'Drops an egg on death. If egg not destroyed, Phoenix reborns at full HP.', isHero: false, isEvo: false
    },
    'Wall Breakers': {
        hitpoints: 252, damage: 382, hitSpeed: null, dps: null, range: 'Melee: Short', speed: 'Very Fast', targets: 'Buildings', count: 2, type: 'Troop', rarity: 'Epic', elixir: 2,
        ability: 'Suicide bombers: run to nearest building and explode.', isHero: false, isEvo: false, evoName: 'Wall Breakers Evolution'
    },
    'Wall Breakers Evolution': {
        hitpoints: 252, damage: 382, hitSpeed: null, dps: null, range: 'Melee: Short', speed: 'Very Fast', targets: 'Buildings', count: 2, type: 'Troop', rarity: 'Epic', elixir: 2,
        ability: 'If they don\'t reach a building, they leave a bomb on the ground that explodes.', isHero: false, isEvo: true
    },
    'Electro Giant': {
        hitpoints: 3232, damage: 159, hitSpeed: 1.8, dps: 88, range: 'Melee: Short', speed: 'Slow', targets: 'Buildings', count: 1, type: 'Troop', rarity: 'Epic', elixir: 7,
        ability: 'Passive aura zaps any troop attacking him — reflect damage + stun.', isHero: false, isEvo: false
    },

    // ============ LEGENDARY TROOPS ============
    'Miner': {
        hitpoints: 1210, damage: 194, hitSpeed: 1.3, dps: 149, range: 'Melee: Medium', speed: 'Fast', targets: 'Ground', count: 1, type: 'Troop', rarity: 'Legendary', elixir: 3,
        ability: 'Deploy anywhere on the arena. Reduced crown tower damage (49).', isHero: false, isEvo: false
    },
    'Princess': {
        hitpoints: 252, damage: 166, hitSpeed: 3.0, dps: 55, range: '9', speed: 'Medium', targets: 'Air & Ground', count: 1, type: 'Troop', rarity: 'Legendary', elixir: 3,
        ability: 'Very long range. Area splash damage.', isHero: false, isEvo: false
    },
    'Sparky': {
        hitpoints: 1451, damage: 1331, hitSpeed: 4.0, dps: 332, range: '4.5', speed: 'Slow', targets: 'Ground', count: 1, type: 'Troop', rarity: 'Legendary', elixir: 6,
        ability: 'Charges devastating area electric blast. Resets on stun/freeze.', isHero: false, isEvo: false
    },
    'Electro Wizard': {
        hitpoints: 714, damage: 117, hitSpeed: 1.7, dps: 137, range: '5', speed: 'Fast', targets: 'Air & Ground', count: 1, type: 'Troop', rarity: 'Legendary', elixir: 4,
        ability: 'Spawn zap (192 dmg). Attacks 2 targets simultaneously with stun.', isHero: false, isEvo: false
    },
    'Bandit': {
        hitpoints: 750, damage: 160, hitSpeed: 1.0, dps: 160, range: 'Melee: Medium', speed: 'Fast', targets: 'Ground', count: 1, type: 'Troop', rarity: 'Legendary', elixir: 3,
        ability: 'Dash attack deals double damage (320). Invulnerable during dash.', isHero: false, isEvo: false
    },
    'Royal Ghost': {
        hitpoints: 1210, damage: 261, hitSpeed: 1.8, dps: 145, range: 'Melee: Medium', speed: 'Fast', targets: 'Ground', count: 1, type: 'Troop', rarity: 'Legendary', elixir: 3,
        ability: 'Turns invisible when not attacking. Cannot be targeted while invisible. Area dmg.', isHero: false, isEvo: false, evoName: 'Royal Ghost Evolution'
    },
    'Ice Wizard': {
        hitpoints: 688, damage: 89, hitSpeed: 1.7, dps: 52, range: '5.5', speed: 'Medium', targets: 'Air & Ground', count: 1, type: 'Troop', rarity: 'Legendary', elixir: 3,
        ability: 'Slows targets hit. Area splash damage.', isHero: false, isEvo: false
    },
    'Lava Hound': {
        hitpoints: 3500, damage: 45, hitSpeed: 1.3, dps: 34, range: 'Melee: Short', speed: 'Slow', targets: 'Buildings', count: 1, type: 'Troop', rarity: 'Legendary', elixir: 7,
        ability: 'Flying. Splits into 6 Lava Pups on death.', isHero: false, isEvo: false
    },
    'Lumberjack': {
        hitpoints: 1060, damage: 233, hitSpeed: 0.8, dps: 291, range: 'Melee: Medium', speed: 'Very Fast', targets: 'Ground', count: 1, type: 'Troop', rarity: 'Legendary', elixir: 4,
        ability: 'Drops a Rage bottle on death that boosts nearby troops.', isHero: false, isEvo: false, evoName: 'Lumberjack Evolution'
    },
    'Magic Archer': {
        hitpoints: 504, damage: 112, hitSpeed: 1.1, dps: 101, range: '7', speed: 'Medium', targets: 'Air & Ground', count: 1, type: 'Troop', rarity: 'Legendary', elixir: 4,
        ability: 'Arrow pierces through all troops in line (11 tile range).', isHero: false, isEvo: false, heroName: 'Hero Magic Archer'
    },
    'Ram Rider': {
        hitpoints: 1461, damage: 220, hitSpeed: 1.8, dps: 122, range: 'Melee: Medium', speed: 'Medium', targets: 'Buildings/Ground', count: 1, type: 'Troop', rarity: 'Legendary', elixir: 5,
        ability: 'Charges at buildings. Rider throws snare slowing nearest enemy.', isHero: false, isEvo: false
    },
    'Mega Knight': {
        hitpoints: 3300, damage: 240, hitSpeed: 1.7, dps: 141, range: 'Melee: Medium', speed: 'Medium', targets: 'Ground', count: 1, type: 'Troop', rarity: 'Legendary', elixir: 7,
        ability: 'Spawn/jump dealing 480 area damage. Dash jump when targets are far.', isHero: false, isEvo: false, evoName: 'Mega Knight Evolution'
    },
    'Mother Witch': {
        hitpoints: 504, damage: 133, hitSpeed: 1.0, dps: 133, range: '5.5', speed: 'Medium', targets: 'Air & Ground', count: 1, type: 'Troop', rarity: 'Legendary', elixir: 4,
        ability: 'Curses enemies. Cursed troops turn into Piggies when they die.', isHero: false, isEvo: false
    },
    'Fisherman': {
        hitpoints: 1056, damage: 193, hitSpeed: 1.5, dps: 128, range: 'Melee: Long', speed: 'Medium', targets: 'Ground', count: 1, type: 'Troop', rarity: 'Legendary', elixir: 3,
        ability: 'Hooks and pulls nearest enemy troop towards him (7 tile range).', isHero: false, isEvo: false
    },

    // ============ BUILDINGS ============
    'Tesla': {
        hitpoints: 954, damage: 218, hitSpeed: 1.1, dps: 198, range: '5.5', speed: null, targets: 'Air & Ground', count: 1, type: 'Building', rarity: 'Common', elixir: 4,
        ability: 'Hidden underground when idle. Cannot be targeted while hidden.', isHero: false, isEvo: false, evoName: 'Tesla Evolution'
    },
    'Tesla Evolution': {
        hitpoints: 954, damage: 218, hitSpeed: 1.1, dps: 198, range: '5.5', speed: null, targets: 'Air & Ground', count: 1, type: 'Building', rarity: 'Common', elixir: 4,
        ability: 'Periodically releases chain lightning to multiple nearby enemies.', isHero: false, isEvo: true
    },
    'Cannon': {
        hitpoints: 742, damage: 218, hitSpeed: 0.8, dps: 272, range: '5.5', speed: null, targets: 'Ground', count: 1, type: 'Building', rarity: 'Common', elixir: 3,
        ability: null, isHero: false, isEvo: false
    },
    'Inferno Tower': {
        hitpoints: 1408, damage: '43→158→847', hitSpeed: 0.4, dps: '107→395→2117', range: '6', speed: null, targets: 'Air & Ground', count: 1, type: 'Building', rarity: 'Rare', elixir: 5,
        ability: 'Inferno beam ramps in 3 stages (~2s each). Resets on stun/freeze. 30s lifetime.', isHero: false, isEvo: false
    },
    'Bomb Tower': {
        hitpoints: 1356, damage: 218, hitSpeed: 1.6, dps: 136, range: '6', speed: null, targets: 'Ground', count: 1, type: 'Building', rarity: 'Rare', elixir: 4,
        ability: 'Death damage (area splash).', isHero: false, isEvo: false
    },
    'Furnace': {
        hitpoints: 1056, damage: null, hitSpeed: null, dps: null, range: 'Melee', speed: 'Slow', targets: 'Buildings', count: 1, type: 'Troop', rarity: 'Rare', elixir: 4,
        ability: 'Walks and spawns Fire Spirits every 10 seconds.', isHero: false, isEvo: false
    },
    'Goblin Cage': {
        hitpoints: 756, damage: null, hitSpeed: null, dps: null, range: null, speed: null, targets: null, count: 1, type: 'Building', rarity: 'Rare', elixir: 4,
        ability: 'Releases a Goblin Brawler when destroyed.', isHero: false, isEvo: false
    },
    'Tombstone': {
        hitpoints: 504, damage: null, hitSpeed: null, dps: null, range: null, speed: null, targets: null, count: 1, type: 'Building', rarity: 'Rare', elixir: 3,
        ability: 'Spawns Skeletons every 3.5s. Spawns 4 on death.', isHero: false, isEvo: false
    },
    'Goblin Hut': {
        hitpoints: 1056, damage: null, hitSpeed: null, dps: null, range: null, speed: null, targets: null, count: 1, type: 'Building', rarity: 'Rare', elixir: 5,
        ability: 'Spawns Spear Goblins every 4.9 seconds.', isHero: false, isEvo: false
    },
    'Barbarian Hut': {
        hitpoints: 1452, damage: null, hitSpeed: null, dps: null, range: null, speed: null, targets: null, count: 1, type: 'Building', rarity: 'Rare', elixir: 7,
        ability: 'Spawns 2 Barbarians every 14 seconds.', isHero: false, isEvo: false
    },
    'Elixir Collector': {
        hitpoints: 880, damage: null, hitSpeed: null, dps: null, range: null, speed: null, targets: null, count: 1, type: 'Building', rarity: 'Rare', elixir: 6,
        ability: 'Generates 8 elixir over its lifetime. Net gain of 2 elixir.', isHero: false, isEvo: false
    },
    'X-Bow': {
        hitpoints: 1360, damage: 34, hitSpeed: 0.3, dps: 113, range: '11.5', speed: null, targets: 'Ground', count: 1, type: 'Building', rarity: 'Epic', elixir: 6,
        ability: 'Very long range. 3.5 second deploy time.', isHero: false, isEvo: false
    },
    'Mortar': {
        hitpoints: 1220, damage: 218, hitSpeed: 5.0, dps: 43, range: '11.5', speed: null, targets: 'Ground', count: 1, type: 'Building', rarity: 'Epic', elixir: 4,
        ability: 'Area splash. Cannot target troops in close range (3.5 tile blind spot).', isHero: false, isEvo: false
    },
    'Goblin Drill': {
        hitpoints: 1220, damage: null, hitSpeed: null, dps: null, range: null, speed: null, targets: null, count: 1, type: 'Building', rarity: 'Epic', elixir: 4,
        ability: 'Deploys anywhere. Spawns Goblins over time.', isHero: false, isEvo: false
    },

    // ============ SPELLS ============
    'Fireball': {
        hitpoints: null, damage: 689, hitSpeed: null, dps: null, range: '2.5', speed: null, targets: 'Air & Ground', count: null, type: 'Spell', rarity: 'Rare', elixir: 4,
        ability: 'Area damage spell. Knockback on small troops.', crownTowerDamage: 207, isHero: false, isEvo: false
    },
    'Zap': {
        hitpoints: null, damage: 192, hitSpeed: null, dps: null, range: '2.5', speed: null, targets: 'Air & Ground', count: null, type: 'Spell', rarity: 'Common', elixir: 2,
        ability: 'Instant stun (0.5s). Resets Inferno Tower/Dragon.', crownTowerDamage: 58, isHero: false, isEvo: false
    },
    'The Log': {
        hitpoints: null, damage: 266, hitSpeed: null, dps: null, range: '11.1', speed: null, targets: 'Ground', count: null, type: 'Spell', rarity: 'Legendary', elixir: 2,
        ability: 'Rolls across ground knocking back all ground troops.', crownTowerDamage: 58, isHero: false, isEvo: false
    },
    'Arrows': {
        hitpoints: null, damage: 355, hitSpeed: null, dps: null, range: '4', speed: null, targets: 'Air & Ground', count: null, type: 'Spell', rarity: 'Common', elixir: 3,
        ability: 'Wide area damage spell.', crownTowerDamage: 142, isHero: false, isEvo: false
    },
    'Rocket': {
        hitpoints: null, damage: 1484, hitSpeed: null, dps: null, range: '2', speed: null, targets: 'Air & Ground', count: null, type: 'Spell', rarity: 'Rare', elixir: 6,
        ability: 'Massive damage. Slow travel time.', crownTowerDamage: 371, isHero: false, isEvo: false
    },
    'Poison': {
        hitpoints: null, damage: 600, hitSpeed: null, dps: null, range: '3.5', speed: null, targets: 'Air & Ground', count: null, type: 'Spell', rarity: 'Epic', elixir: 4,
        ability: 'Deals 75 DPS over 8 seconds. Slows.', crownTowerDamage: 240, isHero: false, isEvo: false
    },
    'Lightning': {
        hitpoints: null, damage: 1057, hitSpeed: null, dps: null, range: '3.5', speed: null, targets: 'Air & Ground', count: null, type: 'Spell', rarity: 'Epic', elixir: 6,
        ability: 'Strikes 3 highest-HP targets. Stuns briefly.', crownTowerDamage: 286, isHero: false, isEvo: false
    },
    'Earthquake': {
        hitpoints: null, damage: 243, hitSpeed: null, dps: null, range: '3.5', speed: null, targets: 'Ground', count: null, type: 'Spell', rarity: 'Rare', elixir: 3,
        ability: 'DoT over 3 seconds. 3.5x damage to Buildings (849). Slows troops.', crownTowerDamage: 65, isHero: false, isEvo: false
    },
    'Freeze': {
        hitpoints: null, damage: 95, hitSpeed: null, dps: null, range: '3', speed: null, targets: 'Air & Ground', count: null, type: 'Spell', rarity: 'Epic', elixir: 4,
        ability: 'Freezes all troops and buildings in area for 4 seconds.', isHero: false, isEvo: false
    },
    'Giant Snowball': {
        hitpoints: null, damage: 159, hitSpeed: null, dps: null, range: '7.5', speed: null, targets: 'Air & Ground', count: null, type: 'Spell', rarity: 'Common', elixir: 2,
        ability: 'Knockback and slows movement speed briefly.', isHero: false, isEvo: false
    },
    'Barbarian Barrel': {
        hitpoints: null, damage: 231, hitSpeed: null, dps: null, range: '6.5', speed: null, targets: 'Ground', count: null, type: 'Spell', rarity: 'Epic', elixir: 2,
        ability: 'Rolls forward dealing damage. Spawns a Barbarian at the end.', isHero: false, isEvo: false
    },
    'Rage': {
        hitpoints: null, damage: null, hitSpeed: null, dps: null, range: '5', speed: null, targets: 'Friendly', count: null, type: 'Spell', rarity: 'Epic', elixir: 2,
        ability: 'Boosts troop movement and attack speed by 35% for 7.5 seconds.', isHero: false, isEvo: false
    },
    'Clone': {
        hitpoints: null, damage: null, hitSpeed: null, dps: null, range: '3', speed: null, targets: 'Friendly', count: null, type: 'Spell', rarity: 'Epic', elixir: 3,
        ability: 'Clones all friendly troops in area. Clones have 1 HP.', isHero: false, isEvo: false
    },
    'Mirror': {
        hitpoints: null, damage: null, hitSpeed: null, dps: null, range: null, speed: null, targets: null, count: null, type: 'Spell', rarity: 'Legendary', elixir: null,
        ability: 'Copies last played card at +1 Level. Costs +1 elixir.', isHero: false, isEvo: false
    },
    'Royal Delivery': {
        hitpoints: null, damage: 362, hitSpeed: null, dps: null, range: '3', speed: null, targets: 'Air & Ground', count: null, type: 'Spell', rarity: 'Common', elixir: 3,
        ability: 'Drops from sky (3s delay). Spawns a Royal Recruit.', isHero: false, isEvo: false
    },
    'Graveyard': {
        hitpoints: null, damage: 81, hitSpeed: 1.0, dps: 81, range: '5', speed: null, targets: 'Ground', count: 20, type: 'Spell', rarity: 'Legendary', elixir: 5,
        ability: 'Spawns Skeletons in an area over 10 seconds.', isHero: false, isEvo: false
    },
    'Tornado': {
        hitpoints: null, damage: 65, hitSpeed: null, dps: null, range: '5.5', speed: null, targets: 'Air & Ground', count: null, type: 'Spell', rarity: 'Epic', elixir: 3,
        ability: 'Pulls all troops to center. 2 second duration.', isHero: false, isEvo: false
    },

    // ============ CHAMPIONS ============
    'Monk': {
        hitpoints: 2214, damage: 140, hitSpeed: 0.8, dps: 175, range: 'Melee: Medium', speed: 'Fast', targets: 'Ground', count: 1, type: 'Troop', rarity: 'Champion', elixir: 5,
        ability: 'Pensive Protection: Reduces incoming damage by 80% and reflects ranged projectiles for 4s. 3rd hit deals 422 dmg + knockback. Costs 1 elixir.', isHero: false, isEvo: false, isChampion: true
    },
    'Archer Queen': {
        hitpoints: 1140, damage: 264, hitSpeed: 1.2, dps: 220, range: '5', speed: 'Medium', targets: 'Air & Ground', count: 1, type: 'Troop', rarity: 'Champion', elixir: 5,
        ability: 'Cloaking Cape: Invisible + 80% attack speed boost for 3.5s. Costs 1 elixir. 17s cooldown.', isHero: false, isEvo: false, isChampion: true
    },
    'Golden Knight': {
        hitpoints: 2000, damage: 160, hitSpeed: 0.9, dps: 177, range: 'Melee: Medium', speed: 'Medium', targets: 'Ground', count: 1, type: 'Troop', rarity: 'Champion', elixir: 4,
        ability: 'Dashing Dash: Chains dashes to up to 10 enemies (310 dmg per dash). Invulnerable during dashes. Costs 1 elixir. 8s cooldown.', isHero: false, isEvo: false, isChampion: true
    },
    'Skeleton King': {
        hitpoints: 2300, damage: 205, hitSpeed: 1.6, dps: 128, range: 'Melee: Medium', speed: 'Medium', targets: 'Ground', count: 1, type: 'Troop', rarity: 'Champion', elixir: 4,
        ability: 'Soul Summoning: Collects souls from dying troops. Activate to summon 6-16 Skeletons. Costs 2 elixir. 20s cooldown.', isHero: false, isEvo: false, isChampion: true
    },
    'Mighty Miner': {
        hitpoints: 2400, damage: '40→204→409', hitSpeed: 0.4, dps: '100→510→1022', range: 'Melee: Medium', speed: 'Medium', targets: 'Ground', count: 1, type: 'Troop', rarity: 'Champion', elixir: 4,
        ability: 'Explosive Escape: Tunnels to opposite lane, drops bomb (334 area dmg). Damage ramps (40→204→409). Costs 1 elixir. 13s cooldown.', isHero: false, isEvo: false, isChampion: true
    },
    'Little Prince': {
        hitpoints: 700, damage: 104, hitSpeed: 1.2, dps: 87, range: '5', speed: 'Medium', targets: 'Air & Ground', count: 1, type: 'Troop', rarity: 'Champion', elixir: 3,
        ability: 'Royal Rescue: Summons Guardienne pony (1600 HP, 217 Dmg). Costs 3 elixir. Hit speed ramps (87→130→260 DPS). 30s cooldown.', isHero: false, isEvo: false, isChampion: true
    },

    // ============ HERO CARDS (Dec 2025 onwards) ============
    'Hero Knight': {
        hitpoints: 1766, damage: 202, hitSpeed: 1.2, dps: 168, range: 'Melee: Medium', speed: 'Medium', targets: 'Ground', count: 1, type: 'Troop', rarity: 'Hero', elixir: 3,
        ability: 'Triumphant Taunt: Taunts all enemies in 7.5 tile radius to attack him. Gains shield for 5 seconds. Costs 2 elixir. 25s cooldown.', isHero: true, isEvo: false
    },
    'Hero Giant': {
        hitpoints: 3968, damage: 253, hitSpeed: 1.5, dps: 168, range: 'Melee: Long', speed: 'Slow', targets: 'Buildings', count: 1, type: 'Troop', rarity: 'Hero', elixir: 5,
        ability: 'Heroic Hurl: Grabs highest HP enemy troop within 2 tiles and throws it across the arena, dealing damage on landing. Costs 2 elixir.', isHero: true, isEvo: false
    },
    'Hero Mini P.E.K.K.A': {
        hitpoints: 657, damage: 355, hitSpeed: 1.7, dps: 221, range: 'Melee: Medium', speed: 'Fast', targets: 'Ground', count: 1, type: 'Troop', rarity: 'Hero', elixir: 4,
        ability: 'Breakfast Boost: Eats pancakes to gain +1 level per pancake (max +5 levels). Heals 40% HP on activation. Gets stronger over time.', isHero: true, isEvo: false
    },
    'Hero Musketeer': {
        hitpoints: 656, damage: 218, hitSpeed: 1.0, dps: 218, range: '6', speed: 'Medium', targets: 'Air & Ground', count: 1, type: 'Troop', rarity: 'Hero', elixir: 4,
        ability: 'Trusty Turret: Deploys a short-range auto-turret that deals area damage and targets air & ground. Costs 1 elixir.', isHero: true, isEvo: false
    },
    'Hero Ice Golem': {
        hitpoints: 1056, damage: 81, hitSpeed: 2.5, dps: 32, range: 'Melee: Short', speed: 'Slow', targets: 'Buildings', count: 1, type: 'Troop', rarity: 'Hero', elixir: 2,
        ability: 'Snowstorm: Unleashes a brain-freezing blizzard that freezes nearby enemy units. Costs 2 elixir. 17s cooldown.', isHero: true, isEvo: false
    },
    'Hero Wizard': {
        hitpoints: 755, damage: 281, hitSpeed: 1.4, dps: 200, range: '5.5', speed: 'Medium', targets: 'Air & Ground', count: 1, type: 'Troop', rarity: 'Hero', elixir: 5,
        ability: 'Flame Wave: Releases a massive fire wave dealing heavy area damage in a cone. Costs 2 elixir.', isHero: true, isEvo: false
    },
    'Hero Goblins': {
        hitpoints: 202, damage: 120, hitSpeed: 1.1, dps: 109, range: 'Melee: Short', speed: 'Very Fast', targets: 'Ground', count: 3, type: 'Troop', rarity: 'Hero', elixir: 2,
        ability: 'Banner Brigade: When last Goblin dies, drops a banner. Activate to spawn 4 new Goblins around it. Costs 1 elixir.', isHero: true, isEvo: false
    },
    'Hero Mega Minion': {
        hitpoints: 756, damage: 281, hitSpeed: 1.5, dps: 187, range: 'Melee: Long', speed: 'Medium', targets: 'Air & Ground', count: 1, type: 'Troop', rarity: 'Hero', elixir: 3,
        ability: 'Wounding Warp: Teleports to lowest max-HP enemy troop anywhere on arena. 50% bonus damage on first hit after warp (468 dmg). One-time use. Costs 2 elixir.', isHero: true, isEvo: false
    },
    'Hero Barbarian Barrel': {
        hitpoints: null, damage: 231, hitSpeed: null, dps: null, range: '6.5', speed: null, targets: 'Ground', count: null, type: 'Spell', rarity: 'Hero', elixir: 2,
        ability: 'Rowdy Reroll: The Barbarian rolls a second time dealing additional damage. After reroll, heals 50% of damage taken. Costs 1 elixir.', isHero: true, isEvo: false
    },
    'Hero Magic Archer': {
        hitpoints: 504, damage: 112, hitSpeed: 1.1, dps: 101, range: '7', speed: 'Medium', targets: 'Air & Ground', count: 1, type: 'Troop', rarity: 'Hero', elixir: 4,
        ability: 'Triple Threat: Dashes backward 5 tiles, leaves decoy (691 HP), fires triple-arrow blast with 15.5 tile range. Costs 1 elixir.', isHero: true, isEvo: false
    },

    // ============ MISSING EVOLUTIONS ============
    'Dart Goblin Evolution': {
        hitpoints: 252, damage: 100, hitSpeed: 0.65, dps: 153, range: '6.5', speed: 'Very Fast', targets: 'Air & Ground', count: 1, type: 'Troop', rarity: 'Rare', elixir: 3,
        ability: 'Toxic darts apply poison damage over time to hit targets.', isHero: false, isEvo: true
    },
    'Lumberjack Evolution': {
        hitpoints: 1060, damage: 233, hitSpeed: 0.8, dps: 291, range: 'Melee: Medium', speed: 'Very Fast', targets: 'Ground', count: 1, type: 'Troop', rarity: 'Legendary', elixir: 4,
        ability: 'Enhanced rage effect and chaos-inducing berserker attacks.', isHero: false, isEvo: true
    },
    'Hunter Evolution': {
        hitpoints: 756, damage: 62, hitSpeed: 2.2, dps: 282, range: '4', speed: 'Medium', targets: 'Air & Ground', count: 1, type: 'Troop', rarity: 'Rare', elixir: 4,
        ability: 'Net Gun: Ensnares closest troop disabling movement and attacks for 4 seconds. Flying units pulled to ground.', isHero: false, isEvo: true
    },
    'Executioner Evolution': {
        hitpoints: 1100, damage: 218, hitSpeed: 2.4, dps: 90, range: '4.5', speed: 'Medium', targets: 'Air & Ground', count: 1, type: 'Troop', rarity: 'Epic', elixir: 5,
        ability: 'Enhanced axe boomerang with improved damage on return hit.', isHero: false, isEvo: true
    },
    'Witch Evolution': {
        hitpoints: 840, damage: 136, hitSpeed: 1.0, dps: 136, range: '5.5', speed: 'Medium', targets: 'Air & Ground', count: 1, type: 'Troop', rarity: 'Epic', elixir: 5,
        ability: 'Spawns higher-level skeletons that heal her when defeated. Increased HP and devastating AoE.', isHero: false, isEvo: true
    },
    'Inferno Dragon Evolution': {
        hitpoints: 1064, damage: '43→158→847→1694', hitSpeed: 0.4, dps: '107→395→2117→4235', range: '4', speed: 'Medium', targets: 'Air & Ground', count: 1, type: 'Troop', rarity: 'Epic', elixir: 4,
        ability: 'Beam Momentum: Keeps beam strength for 9s after killing target. 4th damage stage (2x Stage 3) after 20s. Resets on stun only, not retarget.', isHero: false, isEvo: true
    },
    'Skeleton Barrel Evolution': {
        hitpoints: 598, damage: null, hitSpeed: null, dps: null, range: 'Melee', speed: 'Fast', targets: 'Buildings', count: 2, type: 'Troop', rarity: 'Common', elixir: 3,
        ability: 'Spawns 2 barrels instead of 1. Drops first barrel at 75% HP. Each carries 7 Skeletons. Increased death damage.', isHero: false, isEvo: true
    },
    'Baby Dragon Evolution': {
        hitpoints: 1064, damage: 133, hitSpeed: 1.5, dps: 88, range: '3.5', speed: 'Fast', targets: 'Air & Ground', count: 1, type: 'Troop', rarity: 'Epic', elixir: 4,
        ability: 'Reliable splash with added survivability — gains shield or HP regeneration on kill.', isHero: false, isEvo: true
    },
    'Royal Ghost Evolution': {
        hitpoints: 1210, damage: 261, hitSpeed: 1.8, dps: 145, range: 'Melee: Medium', speed: 'Fast', targets: 'Ground', count: 1, type: 'Troop', rarity: 'Legendary', elixir: 3,
        ability: 'Spawns 2 small ghosts with spawn damage. Extra damage on first hit after going invisible.', isHero: false, isEvo: true
    },
    'Goblin Giant Evolution': {
        hitpoints: 2544, damage: 159, hitSpeed: 1.5, dps: 106, range: 'Melee: Long', speed: 'Medium', targets: 'Buildings', count: 1, type: 'Troop', rarity: 'Epic', elixir: 6,
        ability: 'Enhanced Spear Goblins on back with increased attack rate and damage.', isHero: false, isEvo: true
    },
    'Cannon Evolution': {
        hitpoints: 742, damage: 218, hitSpeed: 0.8, dps: 272, range: '5.5', speed: null, targets: 'Ground', count: 1, type: 'Building', rarity: 'Common', elixir: 3,
        ability: 'Gains ability to shoot cannonballs that bounce to a second target.', isHero: false, isEvo: true
    },
    'Mortar Evolution': {
        hitpoints: 1220, damage: 218, hitSpeed: 5.0, dps: 43, range: '11.5', speed: null, targets: 'Ground', count: 1, type: 'Building', rarity: 'Epic', elixir: 4,
        ability: 'Every few shots fires a larger shell that deals increased area damage.', isHero: false, isEvo: true
    },
    'Musketeer Evolution': {
        hitpoints: 656, damage: 218, hitSpeed: 1.0, dps: 218, range: '6', speed: 'Medium', targets: 'Air & Ground', count: 1, type: 'Troop', rarity: 'Rare', elixir: 4,
        ability: 'Enhanced shots with increased damage and occasional double-shot burst.', isHero: false, isEvo: true
    },
    'Wizard Evolution': {
        hitpoints: 598, damage: 281, hitSpeed: 1.4, dps: 200, range: '5.5', speed: 'Medium', targets: 'Air & Ground', count: 1, type: 'Troop', rarity: 'Rare', elixir: 5,
        ability: 'Gains fire trail effect — fireballs leave burning ground dealing damage over time.', isHero: false, isEvo: true
    },
    'Zap Evolution': {
        hitpoints: null, damage: 192, hitSpeed: null, dps: null, range: '2.5', speed: null, targets: 'Air & Ground', count: null, type: 'Spell', rarity: 'Common', elixir: 2,
        ability: 'Chains a second zap to nearby enemies after initial hit. Enhanced stun duration.', crownTowerDamage: 58, isHero: false, isEvo: true
    },
    'Giant Snowball Evolution': {
        hitpoints: null, damage: 159, hitSpeed: null, dps: null, range: '7.5', speed: null, targets: 'Air & Ground', count: null, type: 'Spell', rarity: 'Common', elixir: 2,
        ability: 'Snowball grows larger as it travels, dealing more damage and bigger knockback at distance.', crownTowerDamage: 48, isHero: false, isEvo: true
    },
    'Ice Spirit Evolution': {
        hitpoints: 252, damage: 100, hitSpeed: null, dps: null, range: '2.5', speed: 'Very Fast', targets: 'Air & Ground', count: 1, type: 'Troop', rarity: 'Common', elixir: 1,
        ability: 'Splits into 2 smaller Ice Spirits on jump, each freezing a separate group.', isHero: false, isEvo: true
    },
    'Mega Knight Evolution': {
        hitpoints: 3300, damage: 240, hitSpeed: 1.7, dps: 141, range: 'Melee: Medium', speed: 'Medium', targets: 'Ground', count: 1, type: 'Troop', rarity: 'Legendary', elixir: 7,
        ability: 'Enhanced spawn/jump damage with shockwave that stuns surrounding troops.', isHero: false, isEvo: true
    },
    'Electro Dragon Evolution': {
        hitpoints: 756, damage: 159, hitSpeed: 2.1, dps: 75, range: '3.5', speed: 'Medium', targets: 'Air & Ground', count: 1, type: 'Troop', rarity: 'Epic', elixir: 5,
        ability: 'Chain lightning hits up to 5 targets (up from 3). Enhanced stun duration.', isHero: false, isEvo: true
    },
    'Goblin Cage Evolution': {
        hitpoints: 756, damage: null, hitSpeed: null, dps: null, range: null, speed: null, targets: null, count: 1, type: 'Building', rarity: 'Rare', elixir: 4,
        ability: 'Releases an enraged Goblin Brawler with bonus damage and speed when destroyed.', isHero: false, isEvo: true
    },
    'Royal Recruits Evolution': {
        hitpoints: 504, damage: 111, hitSpeed: 1.3, dps: 85, range: 'Melee: Long', speed: 'Medium', targets: 'Ground', count: 6, type: 'Troop', rarity: 'Common', elixir: 7,
        ability: 'Recruits gain enhanced shields and one recruit per lane spawns with a rage boost.', isHero: false, isEvo: true
    },
    'Goblin Drill Evolution': {
        hitpoints: 1220, damage: null, hitSpeed: null, dps: null, range: null, speed: null, targets: null, count: 1, type: 'Building', rarity: 'Epic', elixir: 4,
        ability: 'Spawns Goblins faster and the drill can re-burrow to a new location once.', isHero: false, isEvo: true
    }
};
