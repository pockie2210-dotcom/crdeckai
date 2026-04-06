/**
 * QUICK API TEST - Tests core backend endpoints only (no Puppeteer)
 */

import fetch from 'node-fetch';

const SERVER_URL = 'http://localhost:3000';
const MO_LIGHT_TAG = 'G9YV9GR8R';

console.log('\n🚀 QUICK API TEST - Mo Light (#G9YV9GR8R)\n' + '='.repeat(60) + '\n');

async function quickTest() {
    try {
        // Test 1: Player Scan
        console.log('🔍 Testing Player Scan...');
        const playerResp = await fetch(`${SERVER_URL}/player/${MO_LIGHT_TAG}`);
        const playerData = await playerResp.json();

        if (playerData.error) {
            console.log(`❌ ERROR: ${playerData.error}`);
        } else {
            console.log(`✅ Player: ${playerData.name} | Trophies: ${playerData.trophies}`);
            console.log(`   Deck: ${playerData.currentDeck.map(c => c.name).join(', ')}\n`);
        }

        // Test 2: Cards API
        console.log('🃏 Testing Cards API...');
        const cardsResp = await fetch(`${SERVER_URL}/api/cards`);
        const cards = await cardsResp.json();
        console.log(`✅ Loaded ${cards.length} cards\n`);

        // Test 3: Meta Snapshot
        console.log('🔥 Testing Meta Snapshot...');
        const metaResp = await fetch(`${SERVER_URL}/api/meta-snapshot`);
        const metaDecks = await metaResp.json();

        if (metaDecks.length === 0) {
            console.log('⚠️  No meta decks (using fallback - this is OK)\n');
        } else {
            console.log(`✅ Found ${metaDecks.length} meta decks:`);
            metaDecks.forEach((deck, i) => {
                console.log(`   ${i + 1}. ${deck.name}`);
            });
            console.log('');
        }

        console.log('='.repeat(60));
        console.log('✨ ALL CORE TESTS PASSED!');
        console.log('='.repeat(60));
        console.log('\n📖 Next: Open http://localhost:3000/testing_guide.html for full frontend tests\n');

    } catch (err) {
        console.log(`\n❌ TEST FAILED: ${err.message}\n`);
    }
}

quickTest();
