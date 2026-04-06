import 'dotenv/config';
import express from "express";
import fetch from "node-fetch";
import cors from "cors";

// Fix for SSL Certificate issues (SELF_SIGNED_CERT_IN_CHAIN) in certain network environments
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const app = express();
app.use(cors());
app.use(express.json());

// Serve static frontend files
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, '../frontend')));

// Health Check for Uptime Monitoring
app.get('/health', (req, res) => res.sendStatus(200));

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

// NEW: Proxy for getting ALL Cards (for Matchup Analyzer Manual Mode)
app.get("/api/cards", async (req, res) => {
  const demoFallback = [
    { name: 'Knight', id: 26000000, elixirCost: 3, iconUrls: { medium: 'https://api-assets.clashroyale.com/cards/300/jAj1Q5rclXxU9kVImGqSJxa4wEMfEhvwNQ_4jiGUuqg.png' }, rarity: 'Common' },
    { name: 'Archers', id: 26000001, elixirCost: 3, iconUrls: { medium: 'https://api-assets.clashroyale.com/cards/300/W_ym0J6NFEHKljJU_BvM4YaGR3TsDLAb_gWKGA10yRA.png' }, rarity: 'Common' },
    { name: 'Goblins', id: 26000002, elixirCost: 2, iconUrls: { medium: 'https://api-assets.clashroyale.com/cards/300/D7E1vj3n-TS_1ANEZ3lv3Pfjmjgq3t5I1s60lvYilRc.png' }, rarity: 'Common' },
    { name: 'Giant', id: 26000003, elixirCost: 5, iconUrls: { medium: 'https://api-assets.clashroyale.com/cards/300/DHWM3J5SLZ34IXCj_sVVARWj8HP0VLkOVXlhg0CAlhM.png' }, rarity: 'Rare' },
    { name: 'P.E.K.K.A', id: 26000004, elixirCost: 7, iconUrls: { medium: 'https://api-assets.clashroyale.com/cards/300/MlArURKhn_zWAZY-Xj1qIlY6_0h4n1DcQci7iqIYmRk.png' }, rarity: 'Epic' },
    { name: 'Minions', id: 26000005, elixirCost: 3, iconUrls: { medium: 'https://api-assets.clashroyale.com/cards/300/yHGpoEnmUWPGV_hBbhn-Kk_PMBPXD8xCSfRwcFZf2vk.png' }, rarity: 'Common' },
    { name: 'Balloon', id: 26000006, elixirCost: 5, iconUrls: { medium: 'https://api-assets.clashroyale.com/cards/300/qBipxLo_BpTstkN3hIFj7BC1hZkiwXQZWjh7aymMUQw.png' }, rarity: 'Epic' },
    { name: 'Witch', id: 26000007, elixirCost: 5, iconUrls: { medium: 'https://api-assets.clashroyale.com/cards/300/cfwk1vzehVyHC-uloIftJ7T9AeCG8KAIx7WM1xZb0lg.png' }, rarity: 'Epic' },
    { name: 'Barbarians', id: 26000008, elixirCost: 5, iconUrls: { medium: 'https://api-assets.clashroyale.com/cards/300/TvJsuu2S4yhyk1jJ7P9gnAbOUxqM_onJjtiginsauJk.png' }, rarity: 'Common' },
    { name: 'Golem', id: 26000009, elixirCost: 8, iconUrls: { medium: 'https://api-assets.clashroyale.com/cards/300/npdmCnET7jmVjJvs5VTi8hOcUQIOp0OIXJ-aV-HNEtg.png' }, rarity: 'Epic' },
    { name: 'Skeletons', id: 26000010, elixirCost: 1, iconUrls: { medium: 'https://api-assets.clashroyale.com/cards/300/oO7iKMC_i5jHkAMhJdJn4KqM8hL5rPRzCV5H1fM0Y9E.png' }, rarity: 'Common' },
    { name: 'Valkyrie', id: 26000011, elixirCost: 4, iconUrls: { medium: 'https://api-assets.clashroyale.com/cards/300/_tJ7tVgLRKM12zLgrHltzhEN3crhQ6dqKIJw3wW7Uwc.png' }, rarity: 'Rare' },
    { name: 'Skeleton Army', id: 26000012, elixirCost: 3, iconUrls: { medium: 'https://api-assets.clashroyale.com/cards/300/fAOToOaxw0Y34KR4h26xzcZwNw1n8UPjkEY9XKNY-nI.png' }, rarity: 'Epic' },
    { name: 'Bomber', id: 26000013, elixirCost: 2, iconUrls: { medium: 'https://api-assets.clashroyale.com/cards/300/c7sqjOjuM16whL7eaeBbxScnn4TaPLhOJC7-vgWEe4g.png' }, rarity: 'Common' },
    { name: 'Musketeer', id: 26000014, elixirCost: 4, iconUrls: { medium: 'https://api-assets.clashroyale.com/cards/300/sw5tF-N07q2c9JNqwS8lyj26QGN4iTM464LGF8-FJnc.png' }, rarity: 'Rare' },
    { name: 'Baby Dragon', id: 26000015, elixirCost: 4, iconUrls: { medium: 'https://api-assets.clashroyale.com/cards/300/cjC6yRNZI6Vi3_jPONd4bnIwQCLUjR9vXWp6d5l89xs.png' }, rarity: 'Epic' },
    { name: 'Prince', id: 26000016, elixirCost: 5, iconUrls: { medium: 'https://api-assets.clashroyale.com/cards/300/WeJKAR43pjJyhC5kRXRyFHd62Y5SjYDMJvNOFnfLm1k.png' }, rarity: 'Epic' },
    { name: 'Wizard', id: 26000017, elixirCost: 5, iconUrls: { medium: 'https://api-assets.clashroyale.com/cards/300/lZgLZsEdwZGZyb5wMBTmae95GE5vQfTxOZ7YpriJ6tc.png' }, rarity: 'Rare' },
    { name: 'Mini P.E.K.K.A', id: 26000018, elixirCost: 4, iconUrls: { medium: 'https://api-assets.clashroyale.com/cards/300/Fmltc4j3Ve8vhpUiQ8jhwrxl0Gf5CzoHjTJMX0yWB6k.png' }, rarity: 'Rare' },
    { name: 'Hog Rider', id: 26000020, elixirCost: 4, iconUrls: { medium: 'https://api-assets.clashroyale.com/cards/300/Ubu0oZL4Fl8utZBIjF0afda6YPwvCfIftaQPQ3Bv3-o.png' }, rarity: 'Rare' },
    { name: 'Fireball', id: 28000000, elixirCost: 4, iconUrls: { medium: 'https://api-assets.clashroyale.com/cards/300/lZgLZsEdwZGZyb5wMBTmae95GE5vQfTxOZ7YpriJ6tc.png' }, rarity: 'Rare' },
    { name: 'Zap', id: 28000001, elixirCost: 2, iconUrls: { medium: 'https://api-assets.clashroyale.com/cards/300/Vthq6hqz1bN2J0Y0eMj8NvTOd0CJqTpNgFIlOowlPWA.png' }, rarity: 'Common' },
    { name: 'The Log', id: 28000003, elixirCost: 2, iconUrls: { medium: 'https://api-assets.clashroyale.com/cards/300/_iDwuWVQ4BT4FAOSyGCYaIuopwmqEoZJhVDCo8EZ6wo.png' }, rarity: 'Legendary' },
    { name: 'Arrows', id: 28000002, elixirCost: 3, iconUrls: { medium: 'https://api-assets.clashroyale.com/cards/300/Fyn5FYVyljJNTNjOmbFwbjp7hSSr-B00_XJQDJJMzxk.png' }, rarity: 'Common' },
    { name: 'Rocket', id: 28000006, elixirCost: 6, iconUrls: { medium: 'https://api-assets.clashroyale.com/cards/300/TwPTqLEg004LXmgPQbZ8u9HTiNj69j4cITPf3WqQpEk.png' }, rarity: 'Rare' },
    { name: 'Royal Giant', id: 26000024, elixirCost: 6, iconUrls: { medium: 'https://api-assets.clashroyale.com/cards/300/4JpqUWqkNJNrjlbJsYn6KAP1cZ~j-6J8p4E_VVAWexs.png' }, rarity: 'Common' },
    { name: 'Miner', id: 26000037, elixirCost: 3, iconUrls: { medium: 'https://api-assets.clashroyale.com/cards/300/eHGn41dFiVcD~p~j32otGvPIDBzwAGDy8_F4-yvwoHg.png' }, rarity: 'Legendary' },
    { name: 'Ice Golem', id: 26000077, elixirCost: 2, iconUrls: { medium: 'https://api-assets.clashroyale.com/cards/300/Yy6wB3IZWwkIrPM3mPZfS8ROB0vu5CIMVF3lSjwTBas.png' }, rarity: 'Rare' },
    { name: 'Electro Wizard', id: 26000042, elixirCost: 4, iconUrls: { medium: 'https://api-assets.clashroyale.com/cards/300/0RU27fKZCEsUqUON_6sK9GqY5qrDe0fLXHFI5FlJBMo.png' }, rarity: 'Legendary' },
    { name: 'Monk', id: 26000117, elixirCost: 5, iconUrls: { medium: 'https://api-assets.clashroyale.com/cards/300/2zkzcRc5J0x8.png' }, rarity: 'Champion' },
    { name: 'Archer Queen', id: 26000072, elixirCost: 5, iconUrls: { medium: 'https://api-assets.clashroyale.com/cards/300/ubHF5.png' }, rarity: 'Champion' },
    { name: 'Golden Knight', id: 26000067, elixirCost: 4, iconUrls: { medium: 'https://api-assets.clashroyale.com/cards/300/ubAqEz1l-gqX2OWXVVS6yD5f5BL6zRxJmNTqS78rZwo.png' }, rarity: 'Champion' },
    { name: 'Skeleton King', id: 26000071, elixirCost: 4, iconUrls: { medium: 'https://api-assets.clashroyale.com/cards/300/_R60gJp80cF74wnvoPLNShPCTAzP7bLPG2E0IJ3Qh0O.png' }, rarity: 'Champion' },
    { name: 'Mighty Miner', id: 26000108, elixirCost: 4, iconUrls: { medium: 'https://api-assets.clashroyale.com/cards/300/BjBl29_5dlqfNcaOvQ.png' }, rarity: 'Champion' },
    { name: 'Little Prince', id: 26000120, elixirCost: 3, iconUrls: { medium: 'https://api-assets.clashroyale.com/cards/300/RDQV_YTaUfC_8.png' }, rarity: 'Champion' }
  ];

  if (!API_TOKEN) {
    console.warn('API_TOKEN not set, using demo fallback');
    return res.json(demoFallback);
  }

  try {
    const response = await fetch('https://api.clashroyale.com/v1/cards', {
      headers: { 
        Authorization: `Bearer ${API_TOKEN}`,
        'User-Agent': 'Mozilla/5.0'
      }
    });

    if (!response.ok) {
      console.warn(`Upstream Card API failed: ${response.status}. Using demo fallback.`);
      return res.json(demoFallback);
    }

    const data = await response.json();
    res.json(data.items || demoFallback);
  } catch (err) {
    console.error("Failed to fetch cards, using fallback:", err);
    res.json(demoFallback);
  }
});

// NEW: Image Proxy to bypass CORS/Hotlink protection
app.get("/api/proxy-image", async (req, res) => {
  const { src, name } = req.query;
  if (!src) return res.status(400).send("No src provided");

  const tryFetch = async (url) => {
    try {
      const response = await fetch(url, {
        headers: { 'User-Agent': 'Mozilla/5.0' },
        timeout: 3000
      });
      if (response && response.ok) return response;
    } catch (e) {
      console.warn(`Fetch to ${url} failed: ${e.message}`);
    }
    return null;
  };

  // 1. Try Primary (Supercell)
  let response = await tryFetch(src);

  // 2. If Primary Fails, Try Fallback (RoyaleAPI Github)
  if (!response && name) {
    // Standardize Name -> Kebab Case for RoyaleAPI
    let cleanName = name.replace(/ Evolution$/i, '').replace(/ Evo$/i, '').trim();
    const kebabName = cleanName.toLowerCase().replace(/\s+/g, '-').replace(/\./g, '');
    
    // Fallback URL 1: Standard Card
    const fallbackUrl = `https://royaleapi.github.io/cr-api-assets/cards/${kebabName}.png`;
    console.log(`Primary image failed for ${name}. Trying fallback: ${fallbackUrl}`);
    response = await tryFetch(fallbackUrl);

    // Special case for 'The Log' -> 'log' mapping
    if (!response && kebabName === 'the-log') {
        response = await tryFetch('https://royaleapi.github.io/cr-api-assets/cards/log.png');
    }
  }

  if (response && response.ok) {
    res.setHeader("Content-Type", response.headers.get("content-type") || 'image/png');
    res.setHeader("Cache-Control", "public, max-age=86400");
    response.body.pipe(res);
  } else {
    res.status(404).send("Image not found");
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

const PORT = process.env.PORT || 8888;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

