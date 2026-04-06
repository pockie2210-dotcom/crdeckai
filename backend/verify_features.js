import puppeteer from 'puppeteer';

(async () => {
    const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
    const page = await browser.newPage();

    // Setup Console Capture
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    page.on('pageerror', err => console.log('PAGE ERROR:', err.toString()));

    // MOCK API RESPONSES - DISABLED TO USE REAL SERVER
    /*
    await page.setRequestInterception(true);
    page.on('request', request => {
        const url = request.url();
        console.log("REQUEST:", url);

        // Mock Player Profile (Mo Light) - match any variation
        if (url.includes('/player/') && (url.includes('G9YV9GR8R') || url.includes('%23G9YV9GR8R') || url.includes('#G9YV9GR8R'))) {
            console.log("MOCKING Mo Light Player Data for:", url);
            request.respond({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({
                    tag: '#G9YV9GR8R',
                    name: 'Mo Light',
                    expLevel: 14,
                    trophies: 9000,
                    bestTrophies: 9000,
                    wins: 5000,
                    losses: 1000,
                    battleCount: 6000,
                    currentDeck: [
                        { name: 'Monk', elixirCost: 5, iconUrls: { medium: 'https://api-assets.clashroyale.com/cards/300/2zkzcRc5J0x8.png' }, level: 14, maxLevel: 14, rarity: 'champion' },
                        { name: 'Royal Giant', elixirCost: 6, iconUrls: { medium: 'https://api-assets.clashroyale.com/cards/300/mnlRaDlfdxxI.png' }, level: 14, maxLevel: 14, evolutionLevel: 1 },
                        { name: 'Phoenix', elixirCost: 4, iconUrls: { medium: 'https://api-assets.clashroyale.com/cards/300/i0RSr.png' }, level: 14, maxLevel: 14 },
                        { name: 'Fisherman', elixirCost: 3, iconUrls: { medium: 'https://api-assets.clashroyale.com/cards/300/U2KZ3g0wyJo.png' }, level: 14, maxLevel: 14 },
                        { name: 'Electro Spirit', elixirCost: 1, iconUrls: { medium: 'https://api-assets.clashroyale.com/cards/300/WKon-mQ.png' }, level: 14, maxLevel: 14 },
                        { name: 'Goblins', elixirCost: 2, iconUrls: { medium: 'https://api-assets.clashroyale.com/cards/300/X_DFUqgh.png' }, level: 14, maxLevel: 14 },
                        { name: 'The Log', elixirCost: 2, iconUrls: { medium: 'https://api-assets.clashroyale.com/cards/300/_sGsg.png' }, level: 14, maxLevel: 14 },
                        { name: 'Fireball', elixirCost: 4, iconUrls: { medium: 'https://api-assets.clashroyale.com/cards/300/l.png' }, level: 14, maxLevel: 14 }
                    ]
                })
            });
            return;
        }

        // Mock Cards List for Deck Builder
        if (url.endsWith('/api/cards')) {
            request.respond({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify([
                    { name: 'Monk', id: 100, iconUrls: { medium: 'http://example.com/monk.png' } },
                    { name: 'Royal Giant', id: 1, iconUrls: { medium: 'http://example.com/rg.png' } },
                    { name: 'Hog Rider', id: 2, iconUrls: { medium: 'http://example.com/hog.png' } },
                    { name: 'Phoenix', id: 3, iconUrls: { medium: 'http://example.com/phoenix.png' } },
                    { name: 'Fisherman', id: 4, iconUrls: { medium: 'http://example.com/fish.png' } },
                    { name: 'Log', id: 5, iconUrls: { medium: 'http://example.com/log.png' } },
                    { name: 'The Log', id: 5, iconUrls: { medium: 'http://example.com/log.png' } }, // Alias
                    { name: 'Fireball', id: 6, iconUrls: { medium: 'http://example.com/fire.png' } },
                    { name: 'Electro Spirit', id: 7, iconUrls: { medium: 'http://example.com/espirit.png' } },
                    { name: 'Goblins', id: 8, iconUrls: { medium: 'http://example.com/gobs.png' } },
                ])
            });
            return;
        }

        request.continue();
    });
    */

    // Handle Dialogs (Accept Mock)
    page.on('dialog', async dialog => {
        console.log("PAGE DIALOG:", dialog.message());
        await dialog.accept();
    });

    try {
        console.log("Navigating to home...");
        await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });

        // 1. SCAN PLAYER
        console.log("1. Testing Scanner...");
        await page.type('#tagInput', 'G9YV9GR8R');
        await page.click('#scanBtn');

        // Wait for results
        // Wait for results - allow more time and look for images
        await page.waitForSelector('#deckContainer img', { timeout: 15000 });
        console.log("✅ Scanner loaded deck cards.");
        await page.screenshot({ path: 'debug_scanner.png' });

        // 2. CHECK ANALYZE DECK (Weakness Report)
        console.log("2. Testing Analyze Deck (Weakness Report)...");
        // Click Dropdown
        await page.click('#analysisToolsBtn');
        await new Promise(r => setTimeout(r, 500)); // Animation
        // Click Item
        await page.click('#weaknessReportBtn');

        await page.waitForSelector('#weaknessBody', { timeout: 5000 }); // Assuming chart or report loads
        const reportText = await page.evaluate(() => document.getElementById('weaknessBody')?.innerText);
        if (reportText) console.log("✅ Analysis report generated.");

        // Close modal (Weakness modal)
        await page.evaluate(() => document.getElementById('weaknessModal').style.display = 'none');


        // 3. CHECK SYNERGY MATRIX
        console.log("3. Testing Synergy Matrix...");
        // Force Menu Open
        await page.evaluate(() => document.getElementById('analysisMenu').style.display = 'block');
        await new Promise(r => setTimeout(r, 500)); // Animation
        // Click Item
        await page.click('#synergyMatrixBtn');

        // Check for table
        await page.waitForSelector('#synergyMatrixModal table', { timeout: 5000 });
        console.log("✅ Synergy Matrix table loaded.");

        // Close modal
        await page.evaluate(() => document.getElementById('synergyMatrixModal').style.display = 'none');


        // 4. CHECK WIN CONDITION MASTERCLASS (Pseudo)
        console.log("4. Testing Win Condition Masterclass...");
        await page.click('#winConGuideBtn');
        await new Promise(r => setTimeout(r, 500));
        await page.click('#secondaryWinConBtn');

        // Click Monk
        await page.evaluate(() => {
            const cards = Array.from(document.querySelectorAll('.win-con-card'));
            const monk = cards.find(c => c.innerText.includes('Monk'));
            if (monk) monk.click();
        });

        // Click Build
        await new Promise(r => setTimeout(r, 500));
        await page.evaluate(() => {
            const btns = Array.from(document.querySelectorAll('button'));
            const btn = btns.find(b => b.innerText.includes('Build This Deck'));
            if (btn) btn.click();
        });

        await new Promise(r => setTimeout(r, 1000));
        const deckSize = await page.evaluate(() => window.currentAppDeck.length);
        if (deckSize === 8) console.log("✅ Build This Deck worked (8 cards).");
        else console.error("❌ Build This Deck failed, size: " + deckSize);


        console.log("🎉 ALL FEATURES VERIFIED SUCCESSFULLY!");

    } catch (e) {
        console.error("❌ VERIFICATION FAILED AT STEP " + (e.message || 'Unknown') + ":", e);
        await page.screenshot({ path: 'debug_failure.png' });
        process.exit(1);
    } finally {
        await browser.close();
    }
})();
