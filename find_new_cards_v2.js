const https = require('https');

const prefixes = ['g', 'd', 'm', 'c', 's', 'b'];
const chars = 'abcdefghijklmnopqrstuvwxyz';

async function checkCode(code) {
    return new Promise((resolve) => {
        const url = `https://www.deckshop.pro/card/detail/${code}`;
        const req = https.get(url, (res) => {
            if (res.statusCode !== 200) {
                // Silently ignore 404s to keep output clean, but verify control code
                if (code === 'gg') console.log(`[CONTROL] gg: ${res.statusCode}`);
                resolve(null);
                return;
            }

            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                const titleMatch = data.match(/<title>(.*?) \|/);
                if (titleMatch) {
                    const name = titleMatch[1].trim();
                    console.log(`[FOUND] ${code} -> ${name}`);
                    resolve({ code, name });
                } else {
                    resolve(null);
                }
            });
        });
        req.on('error', (e) => {
            console.error(`[ERR] ${code}: ${e.message}`);
            resolve(null);
        });
        req.end();
    });
}

async function run() {
    console.log("Starting Brute Force...");
    // Control Test
    const control = await checkCode('gg');
    console.log("Control Test Done (gg). Starting full scan...");

    for (const p of prefixes) {
        for (const c of chars) {
            const code = p + c;
            await checkCode(code);
            await new Promise(r => setTimeout(r, 100));
        }
    }
    console.log("Scan Complete.");
}

run();
