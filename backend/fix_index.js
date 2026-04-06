import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, '../frontend/index.html');
const lines = fs.readFileSync(filePath, 'utf8').split('\n');

const startLine = 5018; // 1-based, so index 5017
const endLine = 5136;   // 1-based, so index 5135

// Verify context (just logging to be sure we are hitting loosely the right area)
if (lines.length > startLine) {
    console.log("Line 5018:", lines[startLine - 1]);
} else {
    console.error("File too short!");
    process.exit(1);
}

if (lines.length > endLine) {
    console.log("Line 5136:", lines[endLine - 1]);
}

const newCode = `    // Enhanced Scanner Function
    window.scanPlayerFromInput = async function () {
      const tagInput = document.getElementById('tagInput');
      const deckContainer = document.getElementById('deckContainer');
      const statsContainer = document.getElementById('statsContainer');
      const scanBtn = document.getElementById('scanBtn');
      const dropdown = document.getElementById('recentSearches');

      if (!tagInput || !deckContainer) {
        alert('Page elements not found!');
        return;
      }

      const rawTag = tagInput.value.trim();
      if (!rawTag) {
        alert('Please enter a player tag!');
        return;
      }

      const tag = rawTag.startsWith('#') ? rawTag : '#' + rawTag;
      const encodedTag = encodeURIComponent(tag);

      // Hide dropdown
      dropdown.style.display = 'none';

      // Enhanced Loading State
      if (scanBtn) {
        scanBtn.disabled = true;
        scanBtn.innerHTML = '⏳ Loading...';
      }

      deckContainer.innerHTML = \`
        <div style="text-align:center; padding:40px;">
          <div class="loader" style="margin:0 auto 20px;"></div>
          <p style="color:#aaa; font-size:14px; animation: pulse 1.5s infinite;">🔍 Fetching player data...</p>
        </div>
      \`;

      try {
        console.log('[SCAN] Fetching:', \`\${API_BASE_URL}/player/\${encodedTag}\`);

        const response = await fetch(\`\${API_BASE_URL}/player/\${encodedTag}\`, {
            method: 'GET',
            headers: { 'Accept': 'application/json' }
        });

        console.log('[SCAN] Response status:', response.status);

        if (!response.ok) {
            const errText = await response.text();
            let userMessage = response.status === 404 ? '❌ Player not found!' : \`❌ Error \${response.status}\`;

            // FALLBACK TO DEMO MODE (Mo Light)
            console.warn("API Error, falling back to Demo Mode for verification:", userMessage);
            
            if (confirm("⚠️ API Token Missing or Error.\\n\\nWould you like to load 'Mo Light' demo data to verify features?")) {
                const demoData = {
                    name: "Mo Light",
                    tag: "#G9YV9GR8R",
                    expLevel: 14,
                    trophies: 9000,
                    bestTrophies: 9000,
                    wins: 5542,
                    arena: { name: "Ultimate Champion" },
                    clan: { name: "Light Gaming" },
                    currentDeck: [
                        { name: 'Monk', elixirCost: 5, iconUrls: { medium: 'https://raw.githubusercontent.com/RoyaleAPI/cr-api-assets/master/cards-75/monk.png' }, level: 14, maxLevel: 14, rarity: 'champion' },
                        { name: 'Royal Giant', elixirCost: 6, iconUrls: { medium: 'https://raw.githubusercontent.com/RoyaleAPI/cr-api-assets/master/cards-75/royal-giant.png' }, level: 14, maxLevel: 14, evolutionLevel: 1 },
                        { name: 'Phoenix', elixirCost: 4, iconUrls: { medium: 'https://raw.githubusercontent.com/RoyaleAPI/cr-api-assets/master/cards-75/phoenix.png' }, level: 14, maxLevel: 14 },
                        { name: 'Fisherman', elixirCost: 3, iconUrls: { medium: 'https://raw.githubusercontent.com/RoyaleAPI/cr-api-assets/master/cards-75/fisherman.png' }, level: 14, maxLevel: 14 },
                        { name: 'Electro Spirit', elixirCost: 1, iconUrls: { medium: 'https://raw.githubusercontent.com/RoyaleAPI/cr-api-assets/master/cards-75/electro-spirit.png' }, level: 14, maxLevel: 14 },
                        { name: 'Goblins', elixirCost: 2, iconUrls: { medium: 'https://raw.githubusercontent.com/RoyaleAPI/cr-api-assets/master/cards-75/goblins.png' }, level: 14, maxLevel: 14 },
                        { name: 'The Log', elixirCost: 2, iconUrls: { medium: 'https://raw.githubusercontent.com/RoyaleAPI/cr-api-assets/master/cards-75/the-log.png' }, level: 14, maxLevel: 14 },
                        { name: 'Fireball', elixirCost: 4, iconUrls: { medium: 'https://raw.githubusercontent.com/RoyaleAPI/cr-api-assets/master/cards-75/fireball.png' }, level: 14, maxLevel: 14 }
                    ]
                };
                processScanData(demoData);
                return;
            }
            throw new Error(userMessage);
        }

        const data = await response.json();
        processScanData(data); // Extracted helper
      } catch (err) {
        console.error('[SCAN] Error:', err);
        deckContainer.innerHTML = \`
            <div style="text-align:center; padding:30px; background:#2a1515; border:2px solid #e74c3c; border-radius:12px; margin:20px 0;">
              <div style="font-size:48px; margin-bottom:15px;">😞</div>
              <p style="color:#e74c3c; font-size:16px; font-weight:bold; margin-bottom:10px;">\${err.message}</p>
              <p style="color:#aaa; font-size:13px;">Make sure the player tag is correct (e.g., #2PP)</p>
              <button onclick="window.showRecentSearches()" style="margin-top:15px; background:#3498db; color:#fff; border:none; padding:8px 16px; border-radius:6px; cursor:pointer;">
                View Recent Searches
              </button>
            </div>
          \`;
        if (statsContainer) statsContainer.innerHTML = '';
      } finally {
        if (scanBtn) {
          scanBtn.disabled = false;
          scanBtn.innerHTML = 'Scan Player';
        }
      }
    };

    function processScanData(data) {
        const deckContainer = document.getElementById('deckContainer');
        const statsContainer = document.getElementById('statsContainer');

        console.log('[SCAN] Processing Data:', data);
        window.currentPlayerData = data;
        if(window.RecentSearches) RecentSearches.add(data.tag || '#MO-LIGHT');

        let currentDeck = [];
        if (data.currentDeck && data.currentDeck.length > 0) {
          currentDeck = data.currentDeck.map(card => ({
            name: card.name,
            elixirCost: card.elixirCost || 0,
            iconUrl: card.iconUrls?.medium || '',
            level: card.level || 1,
            maxLevel: card.maxLevel || 14,
            evolutionLevel: card.evolutionLevel || 0,
            rarity: card.rarity
          }));
        }

        window.currentAppDeck = currentDeck;

        if (currentDeck.length === 0) {
          deckContainer.innerHTML = '<p style="color:#f39c12; text-align:center;">⚠️ No current deck found for this player.</p>';
        } else {
          deckContainer.innerHTML = currentDeck.map(card => {
            const isEvolved = (card.evolutionLevel || 0) > 0;
            return \`
            <div class="deck-card" title="\${card.name}" style="animation: fadeInUp 0.4s ease-out;">
              <img src="\${card.iconUrl}" alt="\${card.name}" style="width:80px; height:auto; border-radius:8px; \${isEvolved ? 'box-shadow: 0 0 15px rgba(138,43,226,0.8);' : ''}">
              <div style="font-size:12px; text-align:center; margin-top:5px; color:\${isEvolved ? '#a855f7' : '#fff'};\${card.name}</div>
              <div style="font-size:10px; color:#888; text-align:center;">Lv.\${card.level}\${isEvolved ? ' ⚡' : ''}</div>
            </div>
          \`;
          }).join('');

          deckContainer.style.display = 'flex';
          deckContainer.style.flexWrap = 'wrap';
          deckContainer.style.gap = '10px';
          deckContainer.style.justifyContent = 'center';
        }

        // Render Stats
        if (statsContainer) {
          const arena = data.arena?.name || 'Unknown Arena';
          const expLevel = data.expLevel || 1;
          const clan = data.clan?.name || 'No Clan';

          statsContainer.innerHTML = \`
            <div style="background:linear-gradient(135deg, #1a1a1a, #2a2a2a); padding:20px; border-radius:12px; border:2px solid var(--gold); margin-top:15px; box-shadow:0 4px 20px rgba(255,215,0,0.15); animation: fadeIn 0.5s;">
              <h3 style="color:var(--gold); margin-top:0; font-size:20px; display:flex; align-items:center; gap:10px;">
                👤 \${data.name || 'Unknown'}
                <span style="background:linear-gradient(135deg, #667eea, #764ba2); padding:3px 8px; border-radius:6px; font-size:11px; color:#fff;">Lv. \${expLevel}</span>
              </h3>
              <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-top:15px;">
                <div style="background:#151515; padding:10px; border-radius:8px; border:1px solid #333;">
                  <p style="color:#888; margin:0; font-size:11px;">🏆 Trophies</p>
                  <p style="color:#f1c40f; margin:5px 0 0; font-size:18px; font-weight:bold;">\${data.trophies || 0}</p>
                </div>
                <div style="background:#151515; padding:10px; border-radius:8px; border:1px solid #333;">
                  <p style="color:#888; margin:0; font-size:11px;">⭐ Best</p>
                  <p style="color:#e67e22; margin:5px 0 0; font-size:18px; font-weight:bold;">\${data.bestTrophies || 0}</p>
                </div>
                <div style="background:#151515; padding:10px; border-radius:8px; border:1px solid #333;">
                  <p style="color:#888; margin:0; font-size:11px;">🎮 Wins</p>
                  <p style="color:#2ecc71; margin:5px 0 0; font-size:18px; font-weight:bold;">\${data.wins || 0}</p>
                </div>
                <div style="background:#151515; padding:10px; border-radius:8px; border:1px solid #333;">
                  <p style="color:#888; margin:0; font-size:11px;">🎯 Arena</p>
                  <p style="color:#9b59b6; margin:5px 0 0; font-size:12px; font-weight:bold;">\${arena}</p>
                </div>
              </div>
              <div style="margin-top:15px; padding:10px; background:#151515; border-radius:8px; border:1px solid #333;">
                <p style="color:#888; margin:0; font-size:11px;">👥 Clan</p>
                <p style="color:#3498db; margin:5px 0 0; font-size:14px; font-weight:bold;">\${clan}</p>
              </div>
            </div>
          \`;
        }

        const hiddenBtns = ['optimizeDeckBtn', 'synergyBtn', 'radarBtn', 'substitutionBtn', 'checkDeckBtn'];
        hiddenBtns.forEach(id => {
          const btn = document.getElementById(id);
          if (btn) btn.style.display = 'inline-block';
        });

        console.log('[SCAN] Complete!');
    };\n`;

lines.splice(startLine - 1, endLine - startLine + 1, newCode);

fs.writeFileSync(filePath, lines.join('\n'));
console.log("Fixed index.html");
