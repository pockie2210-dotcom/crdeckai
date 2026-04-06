
import puppeteer from 'puppeteer';
import fs from 'fs';

const LOG_FILE = 'debug_scan_log.txt';
const SCREENSHOT = 'debug_scan_manual.png';

function log(msg) {
    const timestamp = new Date().toISOString();
    const line = `[${timestamp}] ${msg}\n`;
    console.log(msg);
    fs.appendFileSync(LOG_FILE, line);
}

(async () => {
    fs.writeFileSync(LOG_FILE, ''); // Clear log

    log('Launching browser...');
    const browser = await puppeteer.launch({
        headless: 'new', // Use new headless mode
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();

    // Capture console and errors
    page.on('console', msg => log(`BROWSER_CONSOLE: ${msg.type().toUpperCase()} ${msg.text()}`));
    page.on('pageerror', err => log(`BROWSER_ERROR: ${err.toString()}`));
    page.on('requestfailed', req => log(`REQUEST_FAILED: ${req.url()} - ${req.failure().errorText}`));

    try {
        log('Navigating to http://localhost:3000...');
        await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });

        log('Page loaded.');

        // Input tag
        const tag = 'G9YV9GR8R';
        log(`Typing tag: ${tag}`);
        await page.type('#tagInput', tag);

        // Click scan
        log('Clicking scan button...');
        await page.click('#scanBtn');

        // Wait 10 seconds
        log('Waiting 10 seconds...');
        await new Promise(r => setTimeout(r, 10000));

        // Check for .deck-card
        const cardCount = await page.evaluate(() => document.querySelectorAll('.deck-card').length);
        log(`Found ${cardCount} .deck-card elements.`);

        // Check for ANY .card or img
        const imgCount = await page.evaluate(() => document.querySelectorAll('img').length);
        log(`Found ${imgCount} images.`);

        // Dump HTML of specific container if possible
        const containerHTML = await page.evaluate(() => {
            const el = document.getElementById('deckContainer') || document.querySelector('.deck-container');
            return el ? el.innerHTML : 'Container not found (tried #deckContainer and .deck-container)';
        });
        log(`Container HTML length: ${containerHTML.length}`);

        // Screenshot
        log(`Taking screenshot to ${SCREENSHOT}...`);
        await page.screenshot({ path: SCREENSHOT, fullPage: true });

    } catch (err) {
        log(`CRITICAL ERROR: ${err.message}`);
        log(err.stack);
    } finally {
        await browser.close();
        log('Browser closed.');
    }
})();
