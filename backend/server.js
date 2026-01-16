import 'dotenv/config';
import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// Serve static frontend files
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, '../frontend')));

const API_TOKEN = process.env.CLASH_API_TOKEN;

if (!API_TOKEN) {
  console.warn('Warning: CLASH_API_TOKEN is not set. API calls will fail until you set the environment variable.');
}

app.get("/player/:tag", async (req, res) => {
  if (!API_TOKEN) {
    return res.status(500).json({ error: 'Server misconfigured: CLASH_API_TOKEN not set' });
  }

  const rawTag = req.params.tag || '';
  const tag = rawTag.startsWith('#')
    ? encodeURIComponent(rawTag)
    : encodeURIComponent('#' + rawTag);

  console.log('Fetching player data for tag:', rawTag, '-> encoded:', tag);

  try {
    console.log('Making fetch request to Supercell API...');
    const response = await fetch(
      `https://api.clashroyale.com/v1/players/${tag}`,
      {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
        },
      }
    );

    console.log('Response received, status:', response.status);

    if (!response.ok) {
      const text = await response.text();
      console.log('Error response:', response.status, text);
      return res.status(response.status).send(text);
    }

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

import puppeteer from 'puppeteer';

app.post("/api/check-deck", async (req, res) => {
  const { deck } = req.body;
  if (!deck || !Array.isArray(deck) || deck.length === 0) {
    return res.status(400).json({ error: 'Invalid deck provided' });
  }

  // DeckShop now uses kebab-case with comma separator usually (e.g. /deck/detail/card-a,card-b)
  // or check/?deck=card-a;card-b  (semicolon also common)
  // Let's try the modern kebab-case + semicolon/comma.

  // SUPERCELL ID STRATEGY
  let url = '';
  let browser;

  try {
    const formattedDeck = deck.map(c => {
      // Safety: If it's already an ID (number or string numeric), use it.
      if (typeof c === 'number' || (typeof c === 'string' && /^\d+$/.test(c))) {
        return c;
      }

      let name = String(c).replace(/ Evolution$/i, '').trim();

      // Special cases where simple kebab might fail or differ
      const overrides = {
        'Skeletons': 'skeletons',
        'Skeleton Army': 'skarmy',
        'X-Bow': 'x-bow',
        'Mini P.E.K.K.A': 'mini-pekka',
        'P.E.K.K.A': 'pekka',
        'Royal Hogs': 'royal-hogs',
        'Goblin Drill': 'goblin-drill',
        'Mother Witch': 'mother-witch',
        'Electro Spirit': 'esper',
        'Heal Spirit': 'heal-spirit',
        'Battle Healer': 'battle-healer',
        'Royal Recruits': 'royal-recruits',
        'Royal Delivery': 'royal-delivery',
        'Mega Knight': 'mega-knight',
        'Golden Knight': 'golden-knight',
        'Skeleton King': 'skeleton-king',
        'Archer Queen': 'archer-queen',
        'Mighty Miner': 'mighty-miner',
        'Little Prince': 'little-prince',
        'Monk': 'monk'
      };

      if (overrides[name]) return overrides[name];

      // Fallback Slugs
      return name.toLowerCase().replace(/\./g, '').replace(/\s+/g, '-');
    });

    url = `https://www.deckshop.pro/check/?deck=${formattedDeck.join(';')}`;

    console.log('Checking DeckShop URL:', url);

    // Use new Headless mode
    // Use new Headless mode
    browser = await puppeteer.launch({
      headless: "new",
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();

    // Set User Agent to avoid bot detection
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

    // Block images/styles for speed
    await page.setRequestInterception(true);
    page.on('request', (req) => {
      if (['image', 'stylesheet', 'font'].includes(req.resourceType())) {
        req.abort();
      } else {
        req.continue();
      }
    });

    // Increased timeout to 30s. use networkidle2 to ensure ratings load.
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });

    // DEBUG: Take a Screenshot
    try {
      await page.screenshot({ path: path.join(__dirname, '../frontend/debug_deckshop.png'), fullPage: true });
      console.log("Debug screenshot saved to frontend/debug_deckshop.png");
    } catch (e) { console.error("Screenshot failed", e); }

    // Scrape Ratings
    // Enhanced Scraper
    const evaluation = await page.evaluate(() => {
      const results = {};
      const labels = ['Attack', 'Defense', 'Synergy', 'Versatility', 'F2P score'];

      // DEBUG: Capture text content for logs
      // const bodyText = document.body.innerText; 

      const candidates = document.querySelectorAll('*');

      labels.forEach(label => {
        for (const el of candidates) {
          if (el.textContent.trim().toLowerCase() === label.toLowerCase()) {
            let val = el.nextElementSibling?.textContent?.trim();
            if (!val) val = el.parentElement?.nextElementSibling?.textContent?.trim();
            if (!val && el.parentElement) {
              const siblings = Array.from(el.parentElement.children);
              const idx = siblings.indexOf(el);
              if (idx > -1 && siblings[idx + 1]) val = siblings[idx + 1].textContent.trim();
            }
            if (val && val.length < 20) {
              results[label] = val;
              break;
            }
          }
        }
      });

      // Try to find the "Verdict" or "Problems"
      // If results empty, grab title
      if (Object.keys(results).length === 0) {
        results['Error'] = document.title;
        const mainH1 = document.querySelector('h1')?.textContent;
        if (mainH1) results['PageHeader'] = mainH1;
      }
      return results;
    });

    if (evaluation['Error'] || Object.keys(evaluation).length < 2) {
      // If mostly empty, return the screenshot url so user can see
      return res.status(400).json({
        error: 'Verification incomplete',
        details: evaluation,
        debugImage: '/debug_deckshop.png'
      });
    }

    res.json({ url, evaluation });

  } catch (err) {
    console.error('Scraping Failed:', err);
    res.status(500).json({ error: 'Failed to verify deck', details: err.message, url, debugImage: '/debug_deckshop.png' });
  } finally {
    if (browser) await browser.close();
  }
});

// --- LIVE META SCRAPER ---
let metaCache = null;
let lastScrapeTime = 0;
const CACHE_DURATION = 1000 * 60 * 60; // 1 Hour

app.get("/api/meta-snapshot", async (req, res) => {
  const now = Date.now();

  // Return specific instruction for Frontend to use Demo mode if scraping fails or is too slow
  // But first try to return cache
  if (metaCache && (now - lastScrapeTime < CACHE_DURATION)) {
    console.log('Serving meta from cache');
    return res.json(metaCache);
  }

  console.log('Scraping live meta from DeckShop...');
  let browser;
  try {
    browser = await puppeteer.launch({
      headless: "new",
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();

    // Optimizations
    await page.setRequestInterception(true);
    page.on('request', (req) => {
      if (['image', 'stylesheet', 'font'].includes(req.resourceType())) req.abort();
      else req.continue();
    });

    // Go to DeckShop Best Decks
    // This URL is stable: https://www.deckshop.pro/deck/list/best
    await page.goto('https://www.deckshop.pro/deck/list/best', { waitUntil: 'domcontentloaded', timeout: 15000 });

    const scrapedDecks = await page.evaluate(() => {
      const decks = [];
      // DeckShop structure: .deck-container or similar?
      // Let's look for "card-picker" or image links inside deck rows
      // Strategy: Look for deck links.
      // Actually, let's grab the visible deck containers

      // Find all "deck-card" containers or similar
      // We will try to find sets of 8 card images grouped together.

      const rows = document.querySelectorAll('div.row.my-4'); // common layout
      // Fallback: look for any container with 8 images

      // More robust: Find all `a.deck_link` or similar containers
      // Deckshop uses <div class="deck-display"> usually

      const containers = document.querySelectorAll('.deck-display');

      containers.forEach(container => {
        if (decks.length >= 5) return; // Limit to Top 5

        const images = container.querySelectorAll('img');
        const cardNames = [];

        images.forEach(img => {
          // alt text usually contains card name
          let name = img.getAttribute('alt');
          if (name) cardNames.push(name.trim());
        });

        if (cardNames.length === 8) {
          // Basic Archetype Guessing
          let name = "Unknown Deck";
          if (cardNames.includes('Hog Rider')) name = "Hog Rider Meta";
          else if (cardNames.includes('Golem')) name = "Golem Beatdown";
          else if (cardNames.includes('P.E.K.K.A')) name = "PEKKA Bridge Spam";
          else if (cardNames.includes('Mega Knight')) name = "Mega Knight Control";
          else if (cardNames.includes('Lava Hound')) name = "LavaLoon";
          else if (cardNames.includes('Miner')) name = "Miner Control";
          else name = "Meta " + cardNames[0]; // Fallback

          decks.push({
            name: name + " (Live)",
            core: [cardNames[0], cardNames[1]], // Just grab first 2 as core for now? No, need smarter core.
            full: cardNames,
            playstyle: 'Meta'
          });
        }
      });

      return decks;
    });

    if (scrapedDecks.length > 0) {
      metaCache = scrapedDecks;
      lastScrapeTime = now;
      console.log(`Scraped ${scrapedDecks.length} decks.`);
      res.json(scrapedDecks);
    } else {
      throw new Error("No decks found in scraper.");
    }

  } catch (err) {
    console.error('Meta Scrape Failed:', err.message);
    // Return empty array so frontend falls back to hardcoded
    res.json([]);
  } finally {
    if (browser) await browser.close();
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

