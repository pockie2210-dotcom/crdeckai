
const champNames = ['goldenknight', 'skeletonking', 'archerqueen', 'mightyminer', 'monk', 'littleprince', 'giant', 'musketeer', 'minipekka', 'knight', 'icegolem', 'wizard'];

function testCard(name, rarity) {
    const normName = name.toLowerCase().replace(/[^a-z]/g, '');
    // Logic from index.html
    const isChamp = champNames.some(n => normName === n) ||
        (rarity && (rarity.toLowerCase() === 'champion' || rarity.toLowerCase() === 'hero'));

    // Label logic
    const isRealChamp = rarity && rarity.toLowerCase() === 'champion';
    const label = isRealChamp ? '👑 CHAMPION' : '👑 HERO';

    return { name, isChamp, label };
}

console.log("Testing Hero Logic...");

const cases = [
    { name: 'Royal Giant', rarity: 'Common', expected: false },
    { name: 'Monk', rarity: 'Champion', expected: true, expectedLabel: '👑 CHAMPION' },
    { name: 'Giant', rarity: 'Rare', expected: true, expectedLabel: '👑 HERO' },
    { name: 'Electro Wizard', rarity: 'Legendary', expected: false },
    { name: 'Wizard', rarity: 'Rare', expected: true, expectedLabel: '👑 HERO' },
    { name: 'Golden Knight', rarity: 'Champion', expected: true, expectedLabel: '👑 CHAMPION' }
];

let fail = false;
cases.forEach(c => {
    const res = testCard(c.name, c.rarity);
    if (res.isChamp !== c.expected) {
        console.error(`❌ ${c.name}: Expected isChamp=${c.expected}, got ${res.isChamp}`);
        fail = true;
    } else if (c.expected && res.label !== c.expectedLabel) {
        console.error(`❌ ${c.name}: Expected label="${c.expectedLabel}", got "${res.label}"`);
        fail = true;
    } else {
        console.log(`✅ ${c.name}: ${res.isChamp ? res.label : 'Not Hero'}`);
    }
});

if (fail) process.exit(1);
console.log("\nALL TESTS PASSED");
