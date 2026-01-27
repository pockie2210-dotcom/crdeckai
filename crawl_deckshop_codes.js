
const https = require('https');

// We want to test which code is valid for specific cards.
// We suspect:
// Miner: mi vs mn
// Minions: mi vs ms
// Minion Horde: mh
// Mega Minion: mm
// Mighty Miner: mm vs mt
// Goblin Gang: gg vs gn vs gb
// Goblin Giant: gg
// Tornado: to
// Tombstone: ts vs to vs tm
// Monk: mo vs nk

const CANDIDATES = {
    'Miner': ['mi', 'mn', 'mr', 'me'],
    'Minions': ['mi', 'ms', 'mn', 'mo'],
    'Goblin Gang': ['gg', 'gn', 'gb', 'ga'],
    'Goblin Giant': ['gg', 'gt', 'gi'],
    'Mighty Miner': ['mm', 'mt', 'mi'],
    'Mega Minion': ['mm', 'mg', 'mn'],
    'Tombstone': ['ts', 'tm', 'to', 'tb'],
    'Tornado': ['to', 'tr', 'td'],
    'Monk': ['mo', 'mk', 'nk', 'mn']
};

function checkCode(code) {
    return new Promise((resolve) => {
        // DeckShop URL for a single card deck
        const url = `https://www.deckshop.pro/deck-builder/clan-wars/build?deck1=${code}`;

        https.get(url, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                // Heuristic: If the code is invalid, DeckShop likely either:
                // 1. Returns a specific error message/layout
                // 2. Ignores it (empty deck)
                // 3. Redirects

                // We check if the response contains the card name or some indicator of success.
                // Since we can't easily parse the HTML name here without a lot of logic,
                // we will look for the image tag or alt text which normally appears for valid cards.
                // e.g. <img src="..." alt="Miner">

                resolve({ code, status: res.statusCode, length: data.length, body: data });
            });
        }).on('error', (e) => resolve({ code, error: e.message }));
    });
}

async function runTests() {
    console.log("Starting Crawler for DeckShop codes...");

    for (const [cardName, codes] of Object.entries(CANDIDATES)) {
        console.log(`\nTesting ${cardName}...`);
        for (const code of codes) {
            const result = await checkCode(code);

            // Check if BODY contains the card name (Case sensitive usually better to ignore case)
            const isValid = result.body.toLowerCase().includes(`alt="${cardName.toLowerCase()}"`) ||
                result.body.toLowerCase().includes(`alt='${cardName.toLowerCase()}'`) ||
                result.body.toLowerCase().includes(`title="${cardName}"`);

            if (isValid) {
                console.log(`[SUCCESS] Code for ${cardName} is likely: "${code}"`);
            } else {
                // console.log(`[FAIL] Code "${code}" did not return expected page content.`);
            }
        }
    }
}

runTests();
