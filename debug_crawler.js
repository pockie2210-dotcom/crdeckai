
const https = require('https');

// KNOWN CORRECT: Hog Rider = 'hr' (User verified)
// We will test if 'hr' behaves differently from 'xx' (invalid)

const CODES_TO_DEBUG = ['hr', 'xx', 'mi', 'mn', 'ms', 'to', 'ts', 'tm', 'gg', 'gn', 'gb', 'mm', 'mt', 'mo', 'nk'];

function checkCodeFull(code) {
    return new Promise((resolve) => {
        const url = `https://www.deckshop.pro/deck-builder/clan-wars/build?deck1=${code}`;
        console.log(`Fetching: ${url}`);

        https.get(url, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                resolve({
                    code,
                    status: res.statusCode,
                    headers: res.headers,
                    bodyLength: data.length,
                    // Grab first 500 chars to see if there's a redirect or error
                    snippet: data.substring(0, 500)
                });
            });
        }).on('error', (e) => resolve({ code, error: e.message }));
    });
}

async function debugCrawl() {
    console.log("--- DEBUGGING RESPONSE PATTERNS ---");

    // 1. Check known GOOD vs BAD
    const good = await checkCodeFull('hr');
    const bad = await checkCodeFull('xx');

    console.log("\n[KNOWN GOOD 'hr']");
    console.log(`Status: ${good.status}`);
    console.log(`Length: ${good.bodyLength}`);

    console.log("\n[KNOWN BAD 'xx']");
    console.log(`Status: ${bad.status}`);
    console.log(`Length: ${bad.bodyLength}`);

    // If lengths are significantly different, we can use length as a heuristic?
    const heuristicDiff = Math.abs(good.bodyLength - bad.bodyLength) > 500;
    console.log(`\nHeuristic (Length Diff > 500): ${heuristicDiff}`);

    if (heuristicDiff) {
        console.log("--- TRYING TO FIND MATCHES BASED ON LENGTH ---");
        for (const code of CODES_TO_DEBUG) {
            if (code === 'hr' || code === 'xx') continue; // already done
            const res = await checkCodeFull(code);
            // If length is closer to GOOD than BAD
            const diffGood = Math.abs(res.bodyLength - good.bodyLength);
            const diffBad = Math.abs(res.bodyLength - bad.bodyLength);

            if (diffGood < diffBad) {
                console.log(`[LIKELY VALID] Code: ${code} (Length: ${res.bodyLength})`);
            } else {
                console.log(`[LIKELY INVALID] Code: ${code} (Length: ${res.bodyLength})`);
            }
        }
    }
}

debugCrawl();
