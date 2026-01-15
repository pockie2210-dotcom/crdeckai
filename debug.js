    (function () {
      console.log('Main Script Started');
      const BASE_URL = 'http://localhost:3000';
      // Toggle placeholder layout to match mockup (green boxes)
      const PLACEHOLDER_LAYOUT = false; // set true to show green-box mockup
      const TIMEOUT_MS = 8000;

      const input = document.getElementById('tagInput');
      const btn = document.getElementById('scanBtn');
      const demoBtn = document.getElementById('demoBtn');
      const output = document.getElementById('output');

      const DEMO_DECK = [
        { name: 'Knight', level: 13, elixirCost: 3, iconUrls: { medium: 'https://api-assets.clashroyale.com/cards/300/jAj1Q5rclXxU9kVImGqSJxa4wEMfEhvwKQnmpY31TvU.png' } },
        { name: 'Archers', level: 13, elixirCost: 3, iconUrls: { medium: 'https://api-assets.clashroyale.com/cards/300/W4Hmp8MTSdXJOYzwv3oCxSsE2s.png' } },
        { name: 'Giant', level: 13, elixirCost: 5, iconUrls: { medium: 'https://api-assets.clashroyale.com/cards/300/Axr4ox5_b7edjd9sDiSRitiDqgJKZgDq8kZuVcdwGZ8.png' } },
        { name: 'Musketeer', level: 13, elixirCost: 4, iconUrls: { medium: 'https://api-assets.clashroyale.com/cards/300/Tex184ac3uJLppEA4qfprZGtn1v7Tx72gFSfF0rAX58.png' } },
        { name: 'Bomber', level: 13, elixirCost: 2, iconUrls: { medium: 'https://api-assets.clashroyale.com/cards/300/12n1CesxKIuo79kpf8zXPjSima5Iq7GqqQzCsTPboho.png' } },
        { name: 'Fireball', level: 13, elixirCost: 4, iconUrls: { medium: 'https://api-assets.clashroyale.com/cards/300/lUMIwH8wZSVuF0wIFiXa6qC8q8q0gV0ycfc7L8i.png' } },
        { name: 'Skeletons', level: 13, elixirCost: 1, iconUrls: { medium: 'https://api-assets.clashroyale.com/cards/300/oO7iKM9587-K7i8Z.png' } },
        { name: 'Mini P.E.K.K.A', level: 13, elixirCost: 4, iconUrls: { medium: 'https://api-assets.clashroyale.com/cards/300/F4442sP_Pclpeq.png' } }
      ];

      const DEMO_PLAYER = {
        name: 'DemoPlayer', tag: '#DEMO123', expLevel: 13, trophies: 4231, bestTrophies: 4500,
        wins: 1234, losses: 567, clan: { name: 'Demo Clan', tag: '#CLAN1' },
        supportCards: [{ name: 'Tower Princess', level: 13, iconUrls: { medium: 'https://api-assets.clashroyale.com/cards/300/NlU_6FQppMcgsjsxND4X5g2I14lDw4a3oX_197qj42s.png' } }]
      };

      // HELPER: Normalize Level based on Rarity (Global Scope)
      // HELPER: Normalize Level based on Rarity (Global Scope)
      // HELPER: Normalize Level based on Rarity (Global Scope)
      function normalizeLevel(card) {
        let val = card.level || card.cardLevel || 0;

        // Debug check: If we see a level >= 14, it's likely already normalized (Elite level 15)
        if (val >= 14) return val;

        let rarity = (card.rarity || '').toLowerCase();

        // BASES: Common=1, Rare=3, Epic=6, Legendary=9, Champion=11
        // MAX RELATIVE: Rare (13-3+1 = 11?), Epic (13-6+1=8?), Legendary (13-9+1=5?)
        // Actually, let's use the API standard:
        // Rare Level 11 in API = Level 13 in game?
        // Let's rely on specific Max Relative thresholds.

        let base = 1;
        let maxRelative = 14;

        if (rarity === 'rare') { base = 3; maxRelative = 13; } // Rare Lvl 11 (API) + 2 = 13. Wait. base 3 means +2 offset? No. Lvl 1 = 3. Lvl 11 = 13. Offset is +2. So (val + base - 1). (11+3-1)=13. Correct.
        else if (rarity === 'epic') { base = 6; maxRelative = 10; } // Epic Lvl 8 (API) -> 8+6-1 = 13.
        else if (rarity === 'legendary') { base = 9; maxRelative = 7; } // Leg Lvl 5 (API) -> 5+9-1 = 13.
        else if (rarity === 'champion') { base = 11; maxRelative = 5; } // Champ Lvl 3 (API) -> 3+11-1 = 13.

        // If value is small enough to be relative for this rarity, normalize it.
        if (base > 1 && val <= maxRelative) {
          const normalized = val + (base - 1);
          // Sanity check: Don't exceed 15
          return Math.min(normalized, 15);
        }

        return val;
      }

      function log(...args) { console.log('[DeckHelper]', ...args); }

      // keyboard support: Enter triggers scan when in input
      input.addEventListener('keydown', (e) => { if (e.key === 'Enter') scan(); });

      btn.addEventListener('click', scan);
      demoBtn.addEventListener('click', () => { renderPlayer(DEMO_PLAYER); renderDeck({ cards: DEMO_DECK }); });

      async function scan() {
        const raw = input.value || '';
        const tag = raw.trim();
        output.style.display = 'block';
        if (!tag) { output.textContent = 'Please enter a player tag.'; return; }

        btn.disabled = true;
        output.textContent = 'Loading...';

        try {
          log('scan start', tag);
          const controller = new AbortController();
          const id = setTimeout(() => controller.abort(), TIMEOUT_MS);
          const clean = encodeURIComponent(tag.startsWith('#') ? tag : '#' + tag);
          const url = `${BASE_URL}/player/${clean}`;
          log('fetch', url);
          const res = await fetch(url, { signal: controller.signal });
          clearTimeout(id);
          log('status', res.status);

          if (!res.ok) {
            const text = await res.text();
            let msg = `Error ${res.status}`;
            try {
              const json = JSON.parse(text);
              if (json.reason === 'notFound') msg = 'Player not found. Please check the tag.';
              else if (json.reason === 'accessDenied') msg = 'API Access Denied. Check server token.';
              else if (json.message) msg = json.message;
            } catch (e) {
              msg += ': ' + text;
            }
            output.innerHTML = `<span style="color: #ff6b6b">${escapeHtml(msg)}</span><br><br><span style="font-size:12px;color:#ccc">Try a valid tag like #G9YV9GR8R</span>`;
            return;
          }

          const data = await res.json();
          const playerTag = data.tag || data.playerTag || tag;
          document.querySelector('h1').textContent = `Player tag ${playerTag}`;
          document.querySelector('h1').style.color = '#D4AF37';

          log('data', data);
          renderPlayer(data);
          renderDeck(data);
        } catch (err) {
          log('fetch error', err && err.name ? err.name : err);
          output.textContent = 'Request failed: ' + String(err) + '\\nYou can click Show Demo Deck to test the UI.';
        } finally {
          btn.disabled = false;
        }
      }

      function extractCards(data) {
        if (!data) return [];
        if (Array.isArray(data.currentDeck) && data.currentDeck.length) return data.currentDeck;
        if (Array.isArray(data.cards)) return data.cards;
        if (Array.isArray(data.currentDeck?.cards)) return data.currentDeck.cards;
        for (const k of Object.keys(data || {})) {
          if (Array.isArray(data[k]) && data[k].length && data[k][0].name) return data[k];
        }
        return [];
      }

      function renderDeck(data) {
        const deck = extractCards(data);
        const supportCards = data.currentDeckSupportCards || data.supportCards || [];
        const container = document.getElementById('deckContainer');
        container.innerHTML = '';

        if (!deck.length) {
          output.style.display = 'block';
          output.textContent = JSON.stringify(data, null, 2);
          return;
        }
        output.style.display = 'none';

        // Normal rendering: build 4x2 grid and support column
        const leftGrid = document.createElement('div');
        leftGrid.className = 'deck-grid';
        const supportCol = document.createElement('div');
        supportCol.className = 'support-column';

        for (let i = 0; i < Math.min(deck.length, 8); i++) {
          const card = deck[i];
          const cardEl = buildCardElement(card, i);
          leftGrid.appendChild(cardEl);
        }

        if (Array.isArray(supportCards) && supportCards.length) {
          const supEl = buildCardElement(supportCards[0], 'support');
          supEl.classList.add('support-card-item');
          supportCol.appendChild(supEl);
        }

        container.appendChild(leftGrid);
        container.appendChild(supportCol);
      }

      // Use 2 Evo Slots (Index 0 and 1)
      function buildCardElement(card, i) {
        const title = card.name || card.card || `Card`;
        // FIX: Normalize Level
        const rawLevel = card.level || card.cardLevel || 1;
        const normalizedLevel = normalizeLevel(card);

        const elixir = card.elixirCost || '?';
        const imgUrl = card.iconUrls?.medium || '';
        const heroImg = card.iconUrls?.heroMedium || card.heroMedium;
        const evoImg = card.iconUrls?.evolutionMedium || card.evolutionMedium;

        // Logic: Slots 0 and 1 are Evo Slots
        const isEvoSlot = (typeof i === 'number' && (i === 0 || i === 1));
        // STRICT: Only show Evo Art if player has it unlocked (level > 0)
        const hasEvoUnlocked = (card.evolutionLevel || 0) > 0;
        const showEvoArt = isEvoSlot && hasEvoUnlocked && evoImg;

        const el = document.createElement('div');
        el.className = 'card-item';
        if (typeof i === 'number') el.style.animationDelay = `${i * 60}ms`;
        el.style.position = 'relative';

        // If placeholder layout enabled, show green box instead of real image
        let img;
        if (!PLACEHOLDER_LAYOUT) {
          img = document.createElement('img');
          img.alt = title;
          img.style.width = '100%';
          img.style.height = '100%';
          img.style.objectFit = 'contain';

          let src = imgUrl || '';

          // Rule: Use Evo Image ONLY if in Evo Slot (0 or 1) AND Unlocked
          if (showEvoArt) {
            src = evoImg;
            img.style.objectFit = 'cover';
          } else if (heroImg && !evoImg) {
            src = heroImg;
          }

          if (!isEvoSlot && imgUrl) {
            src = imgUrl;
          }

          img.src = src;
          const fallback = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="150" height="150"><rect fill="%237B3FE4" width="150" height="150"/><text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" fill="%23D4AF37" font-size="12">' + escapeHtml(title.substring(0, 15)) + '</text></svg>';
          img.onerror = function () { this.onerror = null; this.src = fallback; };
        } else {
          img = document.createElement('div');
          img.className = 'placeholder-box';
          img.setAttribute('aria-label', title);
        }

        const info = document.createElement('div');
        info.className = 'card-info';
        info.style.position = 'absolute';
        info.style.top = '4px';
        info.style.width = '100%';
        info.style.display = 'flex';
        info.style.justifyContent = 'space-between';
        info.style.padding = '4px';
        info.style.fontWeight = 'bold';

        const elixirSpan = document.createElement('span');
        elixirSpan.style.background = '#7B3FE4';
        elixirSpan.style.color = '#fff'; // White text
        elixirSpan.style.padding = '4px 8px';
        elixirSpan.style.borderRadius = '6px';
        elixirSpan.style.fontSize = '14px'; // Bigger
        elixirSpan.style.textShadow = '0 1px 2px #000';
        elixirSpan.textContent = elixir;

        const levelSpan = document.createElement('span');
        levelSpan.style.background = '#000'; // Black bg
        levelSpan.style.color = '#f1c40f'; // Gold text
        levelSpan.style.padding = '6px 10px'; // Increased padding for visibility
        levelSpan.style.borderRadius = '6px';
        levelSpan.style.fontSize = '16px'; // Larger font for better readability
        levelSpan.style.border = '2px solid #f1c40f'; // Thicker border
        levelSpan.style.fontWeight = 'bold';
        levelSpan.textContent = 'Lv ' + normalizedLevel;

        info.appendChild(elixirSpan);
        info.appendChild(levelSpan);

        const nameBar = document.createElement('div');
        nameBar.className = 'card-name';
        nameBar.style.position = 'absolute';
        nameBar.style.bottom = '0';
        nameBar.style.width = '100%';
        nameBar.style.background = 'rgba(11,11,15,0.95)';
        nameBar.style.color = '#D4AF37';
        nameBar.style.padding = '4px';
        nameBar.style.textAlign = 'center';
        nameBar.style.fontSize = '12px';
        nameBar.style.fontWeight = 'bold';
        nameBar.style.overflow = 'hidden';
        nameBar.style.textOverflow = 'ellipsis';
        nameBar.style.whiteSpace = 'nowrap';
        nameBar.textContent = title;

        // badges
        if (heroImg) {
          const hb = document.createElement('img');
          hb.className = 'badge hero-badge';
          hb.src = heroImg;
          hb.alt = 'hero';
          hb.onerror = function () { this.style.display = 'none'; };
          el.appendChild(hb);
        }

        // Only show Evo Badge if in Evo Slot (0 or 1)
        if (showEvoArt) {
          if (card.evolutionLevel) {
            const eb = document.createElement('div');
            eb.className = 'badge evo-badge';
            eb.textContent = 'E' + card.evolutionLevel;
            el.appendChild(eb);
          } else if (evoImg && !heroImg) {
            // Fallback if no level but has image
            const eb2 = document.createElement('img');
            eb2.className = 'badge evo-badge';
            eb2.src = evoImg;
            eb2.alt = 'evo';
            eb2.style.display = 'none'; // text content usually better
            // el.appendChild(eb2);

            const ebText = document.createElement('div');
            ebText.className = 'badge evo-badge';
            ebText.textContent = 'EVO';
            el.appendChild(ebText);
          }
        }
        if (card.starLevel) {
          const sb = document.createElement('div');
          sb.className = 'badge star-badge';
          sb.textContent = '★' + card.starLevel;
          el.appendChild(sb);
        }

        el.appendChild(img);
        el.appendChild(info);
        el.appendChild(nameBar);
        return el;
      }

      let currentPlayerData = null;

      function renderPlayer(data) {
        currentPlayerData = data;
        const stats = document.getElementById('statsContainer');
        stats.innerHTML = '';
        if (!data) return;
        const name = data.name || data.playerName || 'Unknown';
        const tag = data.tag || data.playerTag || '';
        const level = data.expLevel ?? data.level ?? '—';
        const trophies = data.trophies ?? '—';
        const best = data.bestTrophies ?? '—';
        const wins = data.wins ?? data.challengeCardsWon ?? '—';
        const losses = data.losses ?? '—';
        const clanName = data.clan?.name ?? '';

        const html = `
        <div class="stats-card">
          <div class="stats-row"><strong>${escapeHtml(name)}</strong> ${tag ? `<span class="muted">${escapeHtml(tag)}</span>` : ''}</div>
          <div class="stats-grid">
            <div><span class="muted">Level</span><div class="stat-val">${level}</div></div>
            <div><span class="muted">Trophies</span><div class="stat-val">${trophies}</div></div>
            <div><span class="muted">Best</span><div class="stat-val">${best}</div></div>
            <div><span class="muted">Wins</span><div class="stat-val">${wins}</div></div>
            <div><span class="muted">Losses</span><div class="stat-val">${losses}</div></div>
            <div><span class="muted">Clan</span><div class="stat-val">${escapeHtml(clanName)}</div></div>
          </div>
        </div>`;

        stats.innerHTML = html;
        const improveBtn = document.getElementById('improveBtn');
        if (improveBtn) improveBtn.style.display = 'inline-block';
        const buildBtn = document.getElementById('buildBtn');
        if (buildBtn) buildBtn.style.display = 'inline-block';
      }

      function escapeHtml(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }


      // --- Deck Builder Logic with Expert AI ---
      let isBuilderMode = false;
      let builderDeck = [];
      let selectedPlaystyle = 'any'; // NEW: Track selected playstyle
      let excludedCards = new Set(); // NEW: Cards user wants to ban

      const buildBtn = document.getElementById('buildBtn');
      const autofillBtn = document.getElementById('autofillBtn');
      const builderControls = document.getElementById('builderControls');
      const cardPicker = document.getElementById('cardPicker');
      const aiStatus = document.getElementById('aiStatus');

      if (buildBtn) buildBtn.addEventListener('click', toggleBuilderMode);

      // Playstyle Button Handlers
      document.querySelectorAll('.playstyle-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          // Remove active from all
          document.querySelectorAll('.playstyle-btn').forEach(b => b.classList.remove('active'));
          // Add active to clicked
          btn.classList.add('active');
          // Update selected playstyle
          selectedPlaystyle = btn.dataset.style;
        });
      });
      // Set default active
      document.querySelector('.playstyle-btn[data-style="any"]').classList.add('active');

      if (buildBtn) buildBtn.addEventListener('click', toggleBuilderMode);

      if (autofillBtn) {
        autofillBtn.addEventListener('click', () => {
          if (builderDeck.length >= 8) {
            alert('Deck is already full!');
            return;
          }
          runExpertAutofill();
        });
      }

      function toggleBuilderMode() {
        if (!currentPlayerData) {
          alert('Please scan a player first to load collection.');
          return;
        }
        isBuilderMode = !isBuilderMode;
        if (isBuilderMode) {
          buildBtn.textContent = 'Cancel Build';
          buildBtn.style.background = '#e74c3c';
          builderControls.style.display = 'block';
          document.getElementById('improveBtn').style.display = 'none';
          document.getElementById('demoBtn').style.display = 'none';
          builderDeck = [];
          renderBuilderUI();
        } else {
          buildBtn.textContent = 'Build Deck';
          buildBtn.style.background = 'linear-gradient(135deg, #e67e22, #d35400)';
          builderControls.style.display = 'none';
          document.getElementById('improveBtn').style.display = 'inline-block';
          document.getElementById('demoBtn').style.display = 'inline-block';
          renderDeck(currentPlayerData);
        }
      }

      function renderBuilderUI() {
        renderBuilderGrid();
        renderCardPicker();
      }

      function renderBuilderGrid() {
        const container = document.getElementById('deckContainer');
        container.innerHTML = '';
        const grid = document.createElement('div');
        grid.className = 'deck-grid';

        for (let i = 0; i < 8; i++) {
          if (i < builderDeck.length) {
            const card = builderDeck[i];
            const cardEl = buildCardElement(card, i);
            cardEl.style.cursor = 'pointer';
            cardEl.onclick = () => removeCardFromBuilder(i);
            const rm = document.createElement('div');
            rm.textContent = 'x';
            rm.style.cssText = 'position:absolute;top:-5px;right:-5px;background:red;color:white;border-radius:50%;width:20px;height:20px;text-align:center;line-height:20px;font-weight:bold;font-size:12px;';
            cardEl.appendChild(rm);
            grid.appendChild(cardEl);
          } else {
            const slot = document.createElement('div');
            slot.className = 'empty-slot';
            slot.textContent = '+';
            grid.appendChild(slot);
          }
        }
        container.appendChild(grid);

        // Support UI gap
        const support = document.createElement('div');
        support.className = 'support-column';
        container.appendChild(support);
      }

      function renderCardPicker() {
        cardPicker.innerHTML = '';
        if (!currentPlayerData) {
          cardPicker.innerHTML = '<div style="color:red">No player data loaded.</div>';
          return;
        }

        let allCards = [];
        if (currentPlayerData.cards && Array.isArray(currentPlayerData.cards)) {
          allCards = [...currentPlayerData.cards];
        } else if (currentPlayerData.currentDeck) {
          // Fallback for limited data
          allCards = [...currentPlayerData.currentDeck];
        }

        if (allCards.length === 0) {
          cardPicker.innerHTML = '<div style="color:orange">No cards found in player profile.</div>';
          return;
        }

        // Sort by Normalized Level
        allCards.sort((a, b) => {
          return normalizeLevel(b) - normalizeLevel(a);
        });

        allCards.forEach(card => {
          try {
            const isSelected = builderDeck.find(c => c.name === card.name);
            const isExcluded = excludedCards.has(card.name);

            const wrapper = document.createElement('div');
            wrapper.style.position = 'relative';
            wrapper.style.display = 'inline-block';

            const imgUrl = card.iconUrls?.medium;
            const el = document.createElement('img');
            el.src = imgUrl;
            el.className = 'picker-card';
            if (isSelected) el.classList.add('selected');
            if (isExcluded) {
              el.style.opacity = '0.3';
              el.style.filter = 'grayscale(100%)';
            }

            // Left click: Add to deck
            el.onclick = () => {
              if (!isExcluded) addCardToBuilder(card);
            };

            // Right click: Exclude/Include
            el.oncontextmenu = (e) => {
              e.preventDefault();
              if (excludedCards.has(card.name)) {
                excludedCards.delete(card.name);
              } else {
                excludedCards.add(card.name);
              }
              renderCardPicker();
            };

            wrapper.appendChild(el);

            // Exclusion indicator
            if (isExcluded) {
              const banIcon = document.createElement('div');
              banIcon.textContent = '🚫';
              banIcon.style.cssText = 'position:absolute; top:5px; right:5px; font-size:20px; pointer-events:none;';
              wrapper.appendChild(banIcon);
            }

            // Level Badge (Tiny)
            const lvlBadge = document.createElement('div');
            lvlBadge.textContent = normalizeLevel(card);
            lvlBadge.style.cssText = 'position:absolute; bottom:2px; right:2px; background:black; color:gold; font-size:10px; padding:1px 3px; border-radius:4px;';
            wrapper.appendChild(lvlBadge);

            cardPicker.appendChild(wrapper);
          } catch (err) {
            console.error('Error rendering card in picker:', card, err);
          }
        });
      }

      // --- Stat Metrics ---
      // Simple heuristic values (0-10) for demo
      const CARD_METRICS = {
        'Hog Rider': { off: 9, def: 0 }, 'Giant': { off: 8, def: 2 }, 'Golem': { off: 9, def: 1 },
        'Musketeer': { off: 6, def: 8 }, 'Archers': { off: 4, def: 6 }, 'Knight': { off: 3, def: 8 },
        'Ice Golem': { off: 1, def: 8 }, 'Skeletons': { off: 1, def: 5 }, 'Ice Spirit': { off: 1, def: 6 },
        'Cannon': { off: 0, def: 9 }, 'Tesla': { off: 0, def: 10 }, 'Inferno Tower': { off: 1, def: 10 },
        'Fireball': { off: 6, def: 7 }, 'Zap': { off: 4, def: 6 }, 'The Log': { off: 2, def: 8 },
        'Goblin Barrel': { off: 9, def: 0 }, 'Princess': { off: 6, def: 5 }, 'Rocket': { off: 8, def: 5 },
        'P.E.K.K.A': { off: 7, def: 10 }, 'Mega Knight': { off: 6, def: 9 }, 'Sparky': { off: 10, def: 4 },
        'Balloon': { off: 10, def: 0 }, 'Lava Hound': { off: 7, def: 2 }, 'Miner': { off: 6, def: 4 },
        'Electro Wizard': { off: 6, def: 8 }, 'Inferno Dragon': { off: 7, def: 9 }, 'Magic Archer': { off: 7, def: 5 },
        'Lumberjack': { off: 8, def: 4 }, 'Night Witch': { off: 6, def: 4 }, 'Royal Ghost': { off: 6, def: 5 },
        'Bandit': { off: 7, def: 4 }, 'Fisherman': { off: 1, def: 9 }, 'Mother Witch': { off: 5, def: 6 },
        'Royal Giant': { off: 9, def: 1 }, 'Elite Barbarians': { off: 9, def: 6 }, 'Royal Recruits': { off: 5, def: 10 },
        'Goblin Giant': { off: 8, def: 3 }, 'Electro Giant': { off: 9, def: 5 }, 'X-Bow': { off: 9, def: 7 },
        'Mortar': { off: 7, def: 7 }, 'Graveyard': { off: 9, def: 1 }, 'Drill': { off: 8, def: 3 },
        'Wall Breakers': { off: 8, def: 0 }, 'Battle Ram': { off: 7, def: 3 }, 'Ram Rider': { off: 8, def: 6 },
        'Skeleton Barrel': { off: 7, def: 1 }, 'Flying Machine': { off: 6, def: 5 }, 'Zappies': { off: 2, def: 8 },
        'Mini P.E.K.K.A': { off: 7, def: 8 }, 'Valkyrie': { off: 4, def: 9 }, 'Executioner': { off: 5, def: 9 },
        'Bowler': { off: 4, def: 9 }, 'Dark Prince': { off: 6, def: 7 }, 'Baby Dragon': { off: 5, def: 6 },
        'Hunter': { off: 6, def: 9 }, 'Witch': { off: 5, def: 5 }, 'Wizard': { off: 6, def: 4 },
        'Prince': { off: 8, def: 6 }, 'Guards': { off: 2, def: 9 }, 'Goblin Gang': { off: 5, def: 5 },
        'Minions': { off: 5, def: 4 }, 'Minion Horde': { off: 8, def: 4 }, 'Bats': { off: 4, def: 5 },
        'Spear Goblins': { off: 3, def: 3 }, 'Goblin Gang': { off: 5, def: 5 }, 'Rascals': { off: 5, def: 8 }
      };

      function updateStats() {
        const statsPanel = document.getElementById('statsPanel');
        if (builderDeck.length === 0) {
          statsPanel.style.display = 'none';
          return;
        }
        statsPanel.style.display = 'grid';

        // 1. Avg Elixir & Cycle
        const costs = builderDeck.map(c => c.elixirCost || 3);
        const totalCost = costs.reduce((a, b) => a + b, 0);
        const avg = (totalCost / (builderDeck.length || 1)).toFixed(1);

        const sortedCosts = [...costs].sort((a, b) => a - b);
        const cycle = sortedCosts.slice(0, 4).reduce((a, b) => a + b, 0);

        document.getElementById('avgElixir').textContent = avg;
        document.getElementById('cycleCost').textContent = cycle;

        // 2. Offense / Defense
        let offSum = 0, defSum = 0;
        builderDeck.forEach(c => {
          let m = CARD_METRICS[c.name];

          // If no manual metric, derive from Role
          if (!m) {
            m = { off: 4, def: 5 }; // Default support
            if (CARD_ROLES.winCon.includes(c.name)) m = { off: 9, def: 1 };
            else if (CARD_ROLES.building.includes(c.name)) m = { off: 1, def: 9 };
            else if (CARD_ROLES.spellBig.includes(c.name)) m = { off: 7, def: 5 };
            else if (CARD_ROLES.spellSmall.includes(c.name)) m = { off: 3, def: 7 };
            else if (CARD_ROLES.tankKiller.includes(c.name)) m = { off: 6, def: 9 };
            else if (CARD_ROLES.airCounter.includes(c.name)) m = { off: 5, def: 6 };
          }

          offSum += m.off;
          defSum += m.def;
        });

        // Max possible is approx 70-80 for a full deck, scale to 100
        // Lower denominator to make 100 reachable (approx 45 points = 100%)
        const offPct = Math.min(100, Math.round((offSum / 40) * 100));
        const defPct = Math.min(100, Math.round((defSum / 40) * 100));

        // UPDATE: Show the PERCENTAGE (0-100) not the raw sum
        document.getElementById('offScore').textContent = offPct;
        document.getElementById('defScore').textContent = defPct;

        document.getElementById('offBar').style.width = `${offPct}%`;
        document.getElementById('defBar').style.width = `${defPct}%`;

        // 3. Meta Score (Win Rate Sim)
        // STRICT MODE: Earn your S-Tier.
        // Base 30 (F-Tier)
        let metaScore = 30;

        // A. Level Factor
        const avgLevel = builderDeck.reduce((a, c) => a + (c.level || 0), 0) / (builderDeck.length || 1);
        metaScore += (avgLevel - 9) * 4;

        // B. Synergy Factor
        let synCount = 0;
        for (const c1 of builderDeck) {
          for (const c2 of builderDeck) {
            if (c1 === c2) continue;
            // Named Synergy
            for (const pair of SYNERGIES) {
              if (pair.includes(c1.name) && pair.includes(c2.name)) {
                synCount += 4; // Solid bonus
                break;
              }
            }
          }
        }
        metaScore += Math.min(25, synCount); // Cap at 25 (Need ~6 pairs for max)

        // C. Tactical Integrity (Strict)
        const roles = getDeckRoles(builderDeck);

        // 1. Spell Balance (Strict: Need BOTH for +10)
        if (roles.hasSmallSpell && roles.hasBigSpell) metaScore += 10;
        else if (roles.hasSmallSpell || roles.hasBigSpell) metaScore += 2; // Participation trophy reduced

        // 2. Win Condition (Strict: Need valid WinCon)
        if (roles.hasWinCon) metaScore += 10;
        else metaScore -= 10; // Penalty for no WC

        // 3. Defense Coverage (Strict: Reset + Air + Killer)
        const hasAir = builderDeck.some(c => getCardRole(c.name).includes('airCounter'));
        const hasKiller = builderDeck.some(c => getCardRole(c.name).includes('tankKiller') || c.name === 'Inferno Tower' || c.name === 'Inferno Dragon');

        const resetCards = ['Zap', 'Electro Wizard', 'Electro Spirit', 'Lightning', 'Freeze', 'Giant Snowball', 'Zappies', 'E-Dragon'];
        const hasReset = builderDeck.some(c => resetCards.includes(c.name));

        if (hasAir) metaScore += 5;
        if (hasKiller) metaScore += 5;
        if (hasReset) metaScore += 5;

        // 4. Elixir Curve
        const eCurveCosts = builderDeck.map(c => c.elixirCost || 3);
        const total = eCurveCosts.reduce((a, b) => a + b, 0);
        const avgEl = total / 8;
        if (avgEl >= 2.6 && avgEl <= 4.1) metaScore += 5;
        else metaScore -= 5;

        // 5. Evolution Bonus
        const hasEvo = builderDeck.some(c => (c.evolutionLevel || 0) > 0);
        if (hasEvo) metaScore += 5;

        // Cap at 100
        metaScore = Math.min(100, Math.round(metaScore));

        // Scale 0-100 logic
        // Approx 20-30 syn points is "good" -> 100%
        const synPct = Math.min(100, Math.round(synCount * 4));
        document.getElementById('synScore').textContent = Math.round(synPct);
        document.getElementById('synBar').style.width = `${synPct}%`;

        // Tier
        let tier = 'C';
        if (metaScore > 80) tier = 'S+';
        else if (metaScore > 70) tier = 'A';
        else if (metaScore > 60) tier = 'B';

        document.getElementById('metaScoreBadge').textContent = `Meta Score: ${Math.round(metaScore)} (${tier})`;
        document.getElementById('metaScoreBadge').style.color = metaScore > 75 ? '#2ecc71' : (metaScore > 60 ? '#f1c40f' : '#e74c3c');
        document.getElementById('metaScoreBadge').style.borderColor = document.getElementById('metaScoreBadge').style.color;

        // 6. WIN RATE PREDICTION (NEW!)
        // Sophisticated model based on multiple factors
        let winRate = 50; // Base 50% win rate

        // Factor 1: Average Level (±10%)
        // Higher levels = higher win rate
        const levelBonus = Math.min(10, (avgLevel - 11) * 2.5); // +2.5% per level above 11
        winRate += levelBonus;

        // Factor 2: Synergy (±8%)
        // More synergies = better combos = higher win rate
        const synergyBonus = Math.min(8, synCount * 0.4); // +0.4% per synergy point
        winRate += synergyBonus;

        // Factor 3: Deck Completeness (±12%)
        let completenessBonus = 0;
        if (roles.hasWinCon) completenessBonus += 4;
        if (roles.hasSmallSpell && roles.hasBigSpell) completenessBonus += 4;
        if (hasAir) completenessBonus += 2;
        if (hasKiller) completenessBonus += 2;
        winRate += completenessBonus;

        // Factor 4: Meta Quality (±5%)
        // Using S-tier cards increases win rate
        let metaBonus = (metaScore - 60) * 0.1; //  +0.1% per point above 60
        metaBonus = Math.max(-5, Math.min(5, metaBonus));
        winRate += metaBonus;

        // Factor 5: Elixir Efficiency (±3%)
        // Optimal elixir cost improves win rate
        let elixirBonus = 0;
        if (avgEl >= 2.6 && avgEl <= 4.0) elixirBonus = 3; // Perfect range
        else if (avgEl < 2.3 || avgEl > 4.5) elixirBonus = -3; // Too extreme
        winRate += elixirBonus;

        // Factor 6: Archetype Purity (±2%)
        // Focused decks perform better
        const archetypeBonus = synCount >= 15 ? 2 : 0;
        winRate += archetypeBonus;

        // Cap win rate between 40-65% (realistic range)
        winRate = Math.max(40, Math.min(65, Math.round(winRate)));

        // Display Win Rate
        const winRateDisplay = document.getElementById('winRateDisplay');
        const winRateFactors = document.getElementById('winRateFactors');

        if (winRateDisplay) {
          winRateDisplay.textContent = `${winRate}%`;
          winRateDisplay.style.color = winRate >= 55 ? '#2ecc71' : winRate >= 50 ? '#f1c40f' : '#e74c3c';
          winRateDisplay.style.textShadow = `0 0 10px ${winRate >= 55 ? 'rgba(46, 204, 113, 0.5)' : winRate >= 50 ? 'rgba(241, 196, 15, 0.5)' : 'rgba(231, 76, 60, 0.5)'}`;
        }

        if (winRateFactors) {
          const factors = [];
          if (levelBonus > 0) factors.push(`+${levelBonus.toFixed(1)}% Levels`);
          if (synergyBonus > 0) factors.push(`+${synergyBonus.toFixed(1)}% Synergy`);
          if (completenessBonus > 0) factors.push(`+${completenessBonus}% Complete`);
          winRateFactors.textContent = factors.join(' • ') || 'Based on deck analysis';
        }
      }

      function addCardToBuilder(card) {
        if (builderDeck.length >= 8) return;
        if (builderDeck.find(c => c.name === card.name)) return;
        builderDeck.push(card);
        renderBuilderUI();
        updateStats(); // <--- Update on change
      }

      function removeCardFromBuilder(index) {
        builderDeck.splice(index, 1);
        renderBuilderUI();
        updateStats(); // <--- Update on change
      }


      // --- Expert Knowledge Base ---
      const CARD_ROLES = {
        winCon: ['Hog Rider', 'Giant', 'Golem', 'Royal Giant', 'Balloon', 'Goblin Barrel', 'Miner', 'Graveyard', 'Lava Hound', 'X-Bow', 'Mortar', 'Ram Rider', 'Elixir Golem', 'Electro Giant', 'Royal Hogs', 'Three Musketeers', 'Sparky', 'Battle Ram', 'Skeleton Barrel', 'Wall Breakers', 'Drill'],
        spellSmall: ['Zap', 'The Log', 'Snowball', 'Arrows', 'Barbarian Barrel', 'Tornado', 'Royal Delivery'],
        spellBig: ['Fireball', 'Poison', 'Rocket', 'Lightning', 'Earthquake', 'Void'],
        building: ['Cannon', 'Tesla', 'Inferno Tower', 'Bomb Tower', 'Tombstone', 'Goblin Cage', 'Furnace', 'Barbarian Hut', 'Goblin Hut', 'Elixir Collector'],
        // MASSIVELY EXPANDED AIR DEFENSE LIST - 35+ cards!
        airCounter: [
          // S-Tier Air Defense
          'Musketeer', 'Electro Wizard', 'Mega Minion', 'Bats', 'Minions',
          'Baby Dragon', 'Inferno Dragon', 'Flying Machine', 'Magic Archer',
          // A-Tier Air Defense  
          'Archers', 'Firecracker', 'Princess', 'Dart Goblin', 'Spear Goblins',
          'Hunter', 'Mother Witch', 'Ice Wizard',
          // B-Tier Air Defense (Situational but valid)
          'Wizard', 'Executioner', 'Witch', 'Night Witch',
          'Tesla', 'Inferno Tower', 'Cannon', 'Bomb Tower',
          // C-Tier Air Defense (Can target air)
          'Arrows', 'Fireball', 'Poison', 'Lightning', 'Zap',
          'Rocket', 'Tornado', 'Snowball',
          // D-Tier (Weak but technically targets air)
          'Minion Horde', 'Skeleton Dragons', 'Phoenix',
          'Electro Dragon', 'Balloon', 'Lava Hound',
          // Special mentions
          'Queen', 'Little Prince', 'Archer Queen', 'Golden Knight'
        ],
        tankKiller: ['Mini P.E.K.K.A', 'P.E.K.K.A', 'Prince', 'Lumberjack', 'Elite Barbarians', 'Inferno Dragon', 'Mighty Miner', 'Hunter', 'Barbarians']
      };

      const SYNERGIES = [
        // Hog
        ['Hog Rider', 'Earthquake'], ['Hog Rider', 'Ice Golem'], ['Hog Rider', 'Firecracker'],
        ['Hog Rider', 'Musketeer'], ['Hog Rider', 'The Log'], ['Hog Rider', 'Cannon'],
        ['Hog Rider', 'Valkyrie'], ['Hog Rider', 'Tesla'],
        // Golem
        ['Golem', 'Night Witch'], ['Golem', 'Lightning'], ['Golem', 'Baby Dragon'],
        ['Golem', 'Lumberjack'], ['Golem', 'Mega Minion'], ['Golem', 'Tornado'],
        ['Golem', 'Electro Dragon'], ['Golem', 'Skeleton King'],
        // Air
        ['Lava Hound', 'Balloon'], ['Lava Hound', 'Mega Minion'], ['Lava Hound', 'Inferno Dragon'],
        ['Lava Hound', 'Skeleton Dragons'], ['Lava Hound', 'Fireball'], ['Lava Hound', 'Zap'],
        ['Lava Hound', 'Barbarians'], ['Balloon', 'Lumberjack'], ['Balloon', 'Miner'], ['Balloon', 'Freeze'],
        // Giant variants
        ['Giant', 'Witch'], ['Giant', 'Prince'], ['Giant', 'Miner'], ['Giant', 'Sparky'],
        ['Goblin Giant', 'Sparky'], ['Goblin Giant', 'Rage'], ['Goblin Giant', 'Dark Prince'],
        ['Electro Giant', 'Tornado'], ['Electro Giant', 'Lightning'], ['Electro Giant', 'Golden Knight'],
        ['Royal Giant', 'Fisherman'], ['Royal Giant', 'Mother Witch'], ['Royal Giant', 'Lightning'],
        ['Royal Giant', 'Hunter'], ['Royal Giant', 'Electro Spirit'],
        // Cycle / Bait
        ['Goblin Barrel', 'Princess'], ['Goblin Barrel', 'Goblin Gang'], ['Goblin Barrel', 'Dart Goblin'],
        ['Goblin Barrel', 'Rocket'], ['Goblin Barrel', 'Knight'], ['Goblin Barrel', 'Inferno Tower'],
        ['Goblin Barrel', 'Skeleton King'], ['Skeleton Barrel', 'Mega Knight'],
        ['Wall Breakers', 'Miner'], ['Wall Breakers', 'Magic Archer'],
        ['Goblin Drill', 'Bomber'], ['Goblin Drill', 'Fireball'], ['Goblin Drill', 'Wall Breakers'],
        // Siege
        ['X-Bow', 'Tesla'], ['X-Bow', 'Knight'], ['X-Bow', 'Archers'], ['X-Bow', 'The Log'],
        ['Mortar', 'Skeleton King'], ['Mortar', 'Miner'], ['Mortar', 'Dart Goblin'],
        // Control
        ['Graveyard', 'Poison'], ['Graveyard', 'Baby Dragon'], ['Graveyard', 'Knight'],
        ['Graveyard', 'Ice Wizard'], ['Graveyard', 'Tornado'], ['Graveyard', 'Bowler'],
        ['Graveyard', 'Skeleton King'], ['Graveyard', 'Barbarian Barrel'],
        // Bridgespam
        ['P.E.K.K.A', 'Battle Ram'], ['P.E.K.K.A', 'Electro Wizard'], ['P.E.K.K.A', 'Bandit'],
        ['P.E.K.K.A', 'Royal Ghost'], ['P.E.K.K.A', 'Magic Archer'],
        ['Mega Knight', 'Bats'], ['Mega Knight', 'Inferno Dragon'], ['Mega Knight', 'Wall Breakers'],
        ['Mega Knight', 'Ram Rider'], ['Mega Knight', 'Bandit'],
        ['Royal Hogs', 'Royal Recruits'], ['Royal Hogs', 'Fireball'], ['Royal Hogs', 'Flying Machine'],
        ['Elite Barbarians', 'Rage'], ['Elite Barbarians', 'Heal Spirit'],
        // Utility
        ['Tornado', 'Executioner'], ['Tornado', 'Ice Wizard'], ['Tornado', 'Baby Dragon'],
        ['Tornado', 'Magic Archer'], ['Tornado', 'Sparky'],
        ['Miner', 'Poison'], ['Miner', 'Magic Archer']
      ];

      const ARCHETYPES = [
        { name: '2.6 Hog Cycle', cards: ['Hog Rider', 'Musketeer', 'Ice Golem', 'Ice Spirit', 'Skeletons', 'Cannon', 'Fireball', 'The Log'] },
        { name: 'Log Bait', cards: ['Goblin Barrel', 'Princess', 'Goblin Gang', 'Rocket', 'Knight', 'Inferno Tower', 'Ice Spirit', 'The Log'] },
        { name: 'Golem Beatdown', cards: ['Golem', 'Night Witch', 'Baby Dragon', 'Lightning', 'Mega Minion', 'Barbarian Barrel', 'Tornado', 'Lumberjack'] },
        { name: 'Lavaloon', cards: ['Lava Hound', 'Balloon', 'Mega Minion', 'Minions', 'Barbarians', 'Zap', 'Fireball', 'Tombstone'] },
        { name: 'Pekka Bridge Spam', cards: ['P.E.K.K.A', 'Battle Ram', 'Bandit', 'Royal Ghost', 'Electro Wizard', 'Magic Archer', 'Zap', 'Poison'] },
        { name: 'Royal Giant FishBoy', cards: ['Royal Giant', 'Fisherman', 'Mother Witch', 'Lightning', 'The Log', 'Skeletons', 'Electro Spirit', 'Mega Minion'] },
        { name: 'Splashyard', cards: ['Graveyard', 'Baby Dragon', 'Ice Wizard', 'Tornado', 'Valkyrie', 'Poison', 'Barbarian Barrel', 'Tombstone'] },
        { name: 'Recruits Hogs', cards: ['Royal Recruits', 'Royal Hogs', 'Flying Machine', 'Goblin Cage', 'Fireball', 'Barbarian Barrel', 'Zappies', 'Electro Spirit'] },
        { name: 'E-Giant Mirror', cards: ['Electro Giant', 'Lightning', 'Tornado', 'Golden Knight', 'Bomber', 'Cannon', 'Mirror', 'Barbarian Barrel'] },
        { name: 'Goblin Drill Cycle', cards: ['Goblin Drill', 'Wall Breakers', 'Bomber', 'Fireball', 'Tesla', 'Skeletons', 'The Log', 'Knight'] },
        { name: 'Mega Knight Bait', cards: ['Mega Knight', 'Skeleton Barrel', 'Miner', 'Goblin Gang', 'Spear Goblins', 'Bats', 'Zap', 'Inferno Dragon'] },
        { name: 'Sparky Goblin Giant', cards: ['Goblin Giant', 'Sparky', 'Rage', 'Dark Prince', 'Electro Wizard', 'Mega Minion', 'Zap', 'Heal Spirit'] },
        { name: 'X-Bow 3.0', cards: ['X-Bow', 'Tesla', 'Knight', 'Archers', 'Skeletons', 'Electro Spirit', 'Fireball', 'The Log'] },
        { name: 'Miner Control', cards: ['Miner', 'Poison', 'Wall Breakers', 'Magic Archer', 'Bomb Tower', 'Skeletons', 'The Log', 'Knight'] }
      ];

      // GLOBAL HISTORY TRACKER
      let cardUsageHistory = {};
      let previousDeckNames = new Set();
      let generationCount = 0;

      async function runExpertAutofill() {
        console.log("--- AI AUTOFILL START ---");

        // 1. Identify Playstyle & Archetype
        const selectedPlaystyle = document.querySelector('.playstyle-btn.active').dataset.style;
        console.log("Selected Playstyle:", selectedPlaystyle);

        // FIX: Calculate Peak Level for dynamic scoring
        let playerPeakLevel = 14;
        if (currentPlayerData && currentPlayerData.cards) {
          playerPeakLevel = Math.max(...currentPlayerData.cards.map(c => normalizeLevel(c)));
          console.log("Player Peak Level detected:", playerPeakLevel);
        }

        // INCREMENT GENERATION COUNT
        generationCount++;
        // Decay history every 3 generations so we don't run out of cards eventually
        if (generationCount % 3 === 0) {
          console.log("Clearing Card History (Fresh Start)");
          cardUsageHistory = {};
        }

        // 2. Score all available cards
        // Filter out cards already in deck
        const currentNames = new Set(builderDeck.map(c => c.name));

        if (builderDeck.length >= 8) return;

        autofillBtn.disabled = true;
        const originalText = autofillBtn.textContent;
        autofillBtn.textContent = 'AI Processing...';
        autofillBtn.style.background = '#8e44ad'; // Purple

        const slotsToFill = 8 - builderDeck.length;

        // Visual Scanner Steps (Simulate deep thought)
        const steps = [
          'Connecting to RoyaleAPI Database...',
          'Scanning Global Meta Decks...',
          'Analyzing Card Synergies...',
          'Optimizing for Card Levels...',
          'Finalizing Deck Structure...'
        ];

        for (const step of steps) {
          aiStatus.textContent = step;
          await new Promise(r => setTimeout(r, 800)); // 800ms per step = 4 sec total thought
        }

        // --- Core Logic ---

        // 1. Identify Archetype Strategy
        let bestArchetype = null;
        let maxMatch = 0;

        for (const arch of ARCHETYPES) {
          const matchCount = builderDeck.filter(c => arch.cards.includes(c.name)).length;
          if (matchCount > maxMatch && matchCount > 0) {
            maxMatch = matchCount;
            bestArchetype = arch;
          }
        }

        if (bestArchetype) aiStatus.textContent = `Match Found: ${bestArchetype.name} Strategy`;
        else aiStatus.textContent = `Building Custom Meta Deck...`;

        await new Promise(r => setTimeout(r, 1000));

        // --- META QUALITY TIER LIST (ENHANCED - STRONGER SCORING) ---
        // BOOSTED scores for top-tier cards to ensure they're always picked
        const META_QUALITY = {
          // S+ Tier Spells (Meta Staples) - BOOSTED
          'The Log': 150, 'Fireball': 140, 'Poison': 130, 'Tornado': 140,
          'Zap': 145, 'Arrows': 110, 'Lightning': 125, 'Earthquake': 120,
          'Barbarian Barrel': 125, 'Snowball': 120, 'Giant Snowball': 120,

          // S Tier Win Conditions (Reliable Damage Dealers) - BOOSTED
          'Hog Rider': 135, 'Miner': 140, 'Royal Giant': 120, 'Goblin Barrel': 130,
          'Wall Breakers': 125, 'Graveyard': 130, 'X-Bow': 120, 'Mortar': 110,
          'Goblin Drill': 125, 'Ram Rider': 115, 'Battle Ram': 105,

          // S Tier Support (Universal Utility) - BOOSTED
          'Knight': 150, 'Musketeer': 140, 'Ice Spirit': 145, 'Skeletons': 150,
          'Electro Spirit': 140, 'Valkyrie': 130, 'Baby Dragon': 130,
          'Electro Wizard': 140, 'Mega Minion': 125, 'Bats': 135,
          'Ice Golem': 120, 'Archers': 125, 'Flying Machine': 115,

          // A Tier (Strong Meta Picks)
          'Goblin Gang': 100, 'Cannon': 115, 'Tesla': 125,
          'Inferno Tower': 120, 'Lumberjack': 105, 'Magic Archer': 110,
          'Dark Prince': 95, 'Hunter': 50, 'Firecracker': 115,  // Hunter REDUCED to prevent forcing underleveled
          'Mini P.E.K.K.A': 120, 'Prince': 105, 'Bandit': 110,
          'Fisherman': 100, 'Mother Witch': 110, 'Royal Delivery': 100,
          'Dart Goblin': 110, 'Princess': 105, 'Minions': 105,

          // B Tier (Archetype-Specific Strong)
          'Giant': 80, 'Golem': 75, 'Lava Hound': 75, 'Balloon': 90,
          'Royal Hogs': 85, 'P.E.K.K.A': 85, 'Mega Knight': 75,
          'Sparky': 65, 'Executioner': 75, 'Bowler': 75,
          'Phoenix': 85, 'Electro Giant': 70, 'Goblin Giant': 75,
          'Night Witch': 90, 'Witch': 30, 'Royal Ghost': 85,
          'Inferno Dragon': 100, 'Skeleton Dragons': 85,

          // C Tier (Needs Specific Synergy)
          'Bomber': 50, 'Giant Skeleton': 35, 'Skeleton Army': 55,
          'Minion Horde': 50, 'Tombstone': 65, 'Rocket': 75,
          'Barbarians': 65, 'Elite Barbarians': 40, 'Royal Recruits': 75,
          'Rascals': 65, 'Guards': 70, 'Spear Goblins': 55,
          'Zappies': 50, 'Bomb Tower': 70, 'Goblin Cage': 80,

          // D/F Tier (Almost Never Optimal) - HARSHER PENALTIES
          'Wizard': -80, 'Goblin Hut': -100, 'Furnace': -80,
          'Barbarian Hut': -200, 'Mirror': -220, 'Clone': -240,
          'Elixir Golem': -300, 'Battle Healer': -200, 'Three Musketeers': -180,
          'Rage': -100, 'Freeze': 50, 'Heal Spirit': 80,
          'Elixir Collector': 35, 'Void': 100
        };

        // 5. DECKSHOP VERIFICATION
        const checkBtn = document.getElementById('checkDeckBtn');
        if (checkBtn) {
          checkBtn.onclick = () => {
            // Use the current builderDeck
            if (!builderDeck || builderDeck.length === 0) {
              alert("Please generate a deck first!");
              return;
            }

            // Generate URL slug
            // Deckshop uses: /check/?deck=Card1-Card2-Card3...
            const slugs = builderDeck.map(c => {
              // Convert names to Deckshop slugs
              // e.g. "Hog Rider" -> "Hog"
              // "Royal Hogs" -> "RoyalHogs"
              // "The Log" -> "TheLog"
              return c.name.replace(/\s+/g, '').replace(/\./g, '');
            });

            // Custom overrides for Deckshop naming weirdness
            const formattedSlugs = slugs.map(s => {
              if (s === 'Skeletons') return 'Skellies';
              if (s === 'SkeletonArmy') return 'Skarmy';
              if (s === 'ElectroSpirit') return 'Espirit';
              return s;
            });

            const url = `https://www.deckshop.pro/check/?deck=${formattedSlugs.join('-')}`;
            window.open(url, '_blank');
          };
        }
        try {
          const names = builderDeck.map(c => c.name);
          const res = await fetch('http://localhost:3000/api/check-deck', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ deck: names })
          });

          if (!res.ok) throw new Error("Server error");

          const data = await res.json();

          if (data.evaluation) {
            // New Grid Layout for DeckShop Results
            let html = `<div style="text-align:center; margin-bottom:15px; font-weight:bold; color:#f1c40f; letter-spacing:1px;">VERIFIED WITH DECKSHOP.PRO</div>`;

            html += `<div class="deck-grade-grid">`;

            for (const [key, val] of Object.entries(data.evaluation)) {
              let color = '#95a5a6'; // default grey
              let cleanVal = val.replace('Of', '');

              if (val.includes('Godly')) color = '#e74c3c';
              else if (val.includes('Great') || val.includes('Good')) color = '#2ecc71';
              else if (val.includes('Mediocre')) color = '#f1c40f';
              else if (val.includes('Bad') || val.includes('RIP')) color = '#7f8c8d';

              html += `
                    <div class="grade-box">
                        <div class="grade-label">${key}</div>
                        <div class="grade-val" style="color:${color}">${cleanVal}</div>
                    </div>
                  `;
            }
            html += `</div>`;

            html += `
                <a href="${data.url}" target="_blank" 
                   style="display:block; margin-top:20px; text-align:center; 
                          background:rgba(52, 152, 219, 0.2); padding:10px; border-radius:8px; 
                          color:#3498db; text-decoration:none; font-weight:bold; transition:all 0.3s;">
                   View Full Report ↗
                </a>
              `;

            checkResult.innerHTML = html;
          } else {
            checkResult.textContent = "Could not retrieve ratings. Check console.";
          }

        } catch (e) {
          checkResult.textContent = "Error verifying deck: " + e.message;
        } finally {
          checkDeckBtn.disabled = false;
          checkDeckBtn.textContent = "🔍 Verification Check (DeckShop)";
        }
      });


      // 4. STRATEGY GUIDE GENERATOR (ENHANCED: ~50 words per paragraph)
      function generateStrategyGuide(deck) {
        const guidePanel = document.getElementById('strategyGuide');
        const deckNames = deck.map(c => c.name);
        const winCon = deck.find(c => getCardRole(c.name).includes('winCon'));
        const winConName = winCon ? winCon.name : "your main troops";
        const building = deck.find(c => getCardRole(c.name).includes('building'));

        const heavySpell = deck.find(c => getCardRole(c.name).includes('spellBig'));
        const lightSpell = deck.find(c => getCardRole(c.name).includes('spellSmall'));

        const avgElixir = (deck.reduce((a, c) => a + (c.elixirCost || 0), 0) / 8).toFixed(1);
        const playstyle = avgElixir < 3.3 ? "Cycle" : avgElixir > 4.0 ? "Beatdown" : "Control";

        let html = `<h3>🧠 AI Strategy Coach</h3>`;

        // P1: Gameplan (~50 words)
        let gp = [];
        gp.push(`<strong>Gameplan (${playstyle}):</strong> Your primary objective is to control the flow of the match by efficiently trading elixir and strategically setting up ${winConName} for a breakthrough.`);
        if (playstyle === 'Cycle') {
          gp.push(`Since your deck is extremely cheap (${avgElixir} average elixir), you must force your opponent to play at your speed by constantly applying pressure. Cycle your cheap cards rapidly to get back to ${winConName} before they have their counter ready, and relentlessly chip away at their tower health with each cycle. The key to success is maintaining unrelenting pressure while defending efficiently with minimal elixir investment.`);
        } else if (playstyle === 'Beatdown') {
          gp.push(`With a heavy average cost of ${avgElixir} elixir, patience must be utilized as your greatest weapon in this archetype. You must be willing to sacrifice some tower health in the early game to build a massive elixir advantage, then overwhelm them with an unstoppable push featuring ${winConName} during Double Elixir time. Focus on making small positive trades on defense, and never overcommit until you have the elixir to support your tank properly with multiple supporting units.`);
        } else {
          gp.push(`This Control deck relies on establishing a rock-solid defense that frustrates your opponent at every turn. Counter their pushes efficiently for positive elixir trades, then immediately transition that surviving defense into a deadly counter-attack with ${winConName} while they are low on elixir and vulnerable. Your goal is to outlast them through superior defensive play and punish every mistake they make with precise counter-pushes that capitalize on their elixir disadvantage.`);
        }
        html += `<p>${gp.join(' ')}</p>`;

        // P2: Starting Hand (~50 words)
        let sh = [];
        sh.push(`<strong>Starting Hand:</strong> The first minute sets the tempo for the entire match and reveals critical information about your opponent's deck.`);
        const cycles = deck.filter(c => (c.elixirCost || 0) <= 2 && c.name !== 'Zap' && c.name !== 'Log');
        if (cycles.length > 0) {
          sh.push(`Your optimal opening move is to play <strong>${cycles[0].name}</strong> either at the bridge to apply early pressure or split in the back to safely build elixir. This forces your opponent to react first and reveal their deck archetype without you committing significant elixir, allowing you to identify their win condition and save your hard counters for the perfect moment. Never leak elixir in the opening, and pay close attention to what cards they play.`);
        } else if (playstyle === 'Beatdown') {
          sh.push(`Do not be the first player to make a move unless you are at maximum elixir and about to leak. If your opponent also waits, play your cheapest supporting unit in the very back corner to safely bank elixir. Never drop your expensive Tank first in single elixir unless you want to be severely punished by an aggressive opposite-lane push that you cannot adequately defend. Patience wins games with heavy decks, so take your time and let the match develop naturally.`);
        } else {
          sh.push(`If you have a defensive Building in your starting hand, only place it reactively in the center if they rush the opposite lane aggressively. Otherwise, split Archers safely in the back or cycle a cheap Spirit at the bridge. Never reveal your ${winConName} first in the opening unless you are punishing a heavy elixir commitment they made in the back. The goal is to force them to show their hand while keeping yours hidden and flexible.`);
        }
        html += `<p>${sh.join(' ')}</p>`;

        // P3: Offense tips (~50 words)
        let off = [];
        off.push(`<strong>Offense:</strong>`);
        if (deckNames.includes('Miner') && deckNames.includes('Wall Breakers')) {
          off.push(`This is a high-skill tempo combo that can devastate unprepared opponents. Send the Miner to the tower first to tank defensive building and tower shots, then immediately drop Wall Breakers at the bridge so the Miner absorbs damage while the Wall Breakers connect. If your opponent panics and misplays their counter, they will lose half their tower in seconds. Master the timing between Miner deploy and Wall Breaker drop (approximately 1 second delay) for maximum effectiveness and tower damage.`);
        } else if (deckNames.includes('Hog Rider')) {
          off.push(`Hog Rider is aggressive and fast but is easily hard-countered by buildings and swarms if you are not prepared. You must carefully track their best counter card throughout the match (such as a Building, Tornado, or Skeleton Army). Pre-select your ${lightSpell ? lightSpell.name : 'spell'} immediately after deploying Hog Rider and be ready to fire it instantly the precise moment they drop their defensive counter. Prediction spells are extremely powerful if you can read their defensive patterns and anticipate their play.`);
        } else if (deckNames.includes('Golem') || deckNames.includes('Giant')) {
          off.push(`A lone Tank without support is easily killed and represents a massive wasted elixir investment. Always build a proper push by placing ${winConName} in the very back corner during single elixir, then methodically layer strong supporting troops like ${deck.find(c => c.elixirCost === 4)?.name || 'Musketeer'} directly behind it as you approach the bridge. These support units will protect your tank from swarms, air units, and Infernal buildings while also providing significant additional damage. Patience and proper push building are absolutely essential for beatdown success.`);
        } else {
          off.push(`Effective offense with ${winConName} requires excellent timing and game sense rather than mindless aggression. Wait patiently until you have either built a clear elixir advantage through efficient defense, or your opponent has just used their best counter card and cannot cycle back to it. Support your ${winConName} aggressively with spell support to eliminate their defensive answers and ensure tower connections. Every push should have a clear purpose and strategic reasoning behind it rather than random deployment.`);
        }
        html += `<p>${off.join(' ')}</p>`;

        // P4: Defense tips (~50 words)
        let def = [];
        def.push(`<strong>Defense:</strong>`);
        def.push(`A perfect defense always translates directly into a winning counter-attack offense, so treat every defensive sequence as an investment.`);
        if (heavySpell) def.push(`Hold your ${heavySpell.name} spell for extremely high-value targets like a Witch or Night Witch stacked directly behind a Giant push, or save it to finish off a low-health tower during overtime pressure. Do not waste this valuable spell on single low-value targets unless it is absolutely necessary for survival, as you will desperately need it later for game-winning moments. Spell discipline often determines match outcomes.`);
        if (building) def.push(`Your ${building.name} building is the anchor and foundation of your entire defensive strategy. Place it precisely 4 tiles from the river in the middle to pull tanks like Hog Rider or Giant into the center kill zone, allowing both of your Princess Towers to simultaneously target them for maximum damage output. Proper building placement is a fundamental skill that separates good players from great ones.`);
        def.push(`Learn to use your Tower's health as a strategic resource rather than something sacred to preserve. It is often better to take 500-700 damage and maintain an elixir advantage than to panic and spend 6 elixir desperately defending against a 3 elixir troop. Overcommitting on defense is one of the biggest mistakes players make, leading to devastating counter-pushes that you cannot stop.`);
        html += `<p>${def.join(' ')}</p>`;

        guidePanel.innerHTML = html;
        guidePanel.style.display = 'block';
      }

      // 2. Scoring Algorithm
      function scoreCard(card) {
        const cardRoles = getCardRole(card.name); // Moved to top for consistent access

        // FACTOR 0: Random Jitter (Variation for Regenerate)
        // INCREASED VARIANCE: +/- 400 points (Was +/- 150).
        // This allows valid "A-Tier" cards to frequently beat "S-Tier" cards.
        let score = (Math.random() * 1200) - 600; // Increased to +/- 600 for more variety

        // FACTOR 0.1: FREQUENCY PENALTY (FOR VARIETY)
        // If the card has been used in previous generations, penalize it CUMULATIVELY.
        // This forces rotation. "You used Knight last time? Try Valkyrie this time."
        // Exception: If it's the KEY CARD for the playstyle (e.g. Miner), don't penalize it.
        const isKeyCard = (selectedPlaystyle === 'miner' && card.name === 'Miner') ||
          (selectedPlaystyle === 'hog' && card.name === 'Hog Rider') ||
          (selectedPlaystyle === 'xbow' && card.name === 'X-Bow');

        if (!isKeyCard) {
          // BINARY ROTATION LOGIC:
          // If it was in the LAST deck, it is BANNED this time (-20,000).
          if (previousDeckNames.has(card.name)) {
            score -= 20000; // Nuclear option.
            console.log(`ROTATION BAN: ${card.name} was just used.`);
          }
        }

        // FACTOR 0.5: Meta Quality (The "Good Card" filter)
        if (META_QUALITY[card.name]) {
          score += (META_QUALITY[card.name] * 0.8); // Reduced weight (was 1.0)
        }

        // FACTOR 0.6: WORLD-CLASS PLAYSTYLE ENFORCEMENT (MASSIVELY ENHANCED!)
        // Give HUGE bonuses for archetype-specific cards
        if (selectedPlaystyle !== 'any') {
          const playstyleCards = {
            // CYCLE: Ultra-fast, cheap cards
            'cycle': {
              core: ['Hog Rider', 'Miner', 'Ice Spirit', 'Skeletons', 'The Log', 'Cannon', 'Musketeer', 'Ice Golem', 'Electro Spirit', 'Fireball', 'Earthquake'],
              support: ['Archers', 'Knight', 'Tesla', 'Firecracker', 'Larry'],
              banned: ['Golem', 'Lava Hound', 'Electro Giant', 'Three Musketeers', 'Elixir Collector', 'Mega Knight', 'P.E.K.K.A']
            },
            // CONTROL: Balance, counter-push focused
            'control': {
              core: ['X-Bow', 'Mortar', 'Tesla', 'Archers', 'Knight', 'The Log', 'Rocket', 'Tornado', 'Ice Wizard', 'Inferno Tower', 'Skeletons'],
              support: ['Mega Minion', 'Electro Spirit', 'Fireball', 'Poison'],
              banned: ['Golem', 'Lava Hound', 'Giant', 'Electro Giant', 'Elixir Collector']
            },
            // BEATDOWN: Heavy tanks, big pushes
            'beatdown': {
              core: ['Golem', 'Lava Hound', 'Giant', 'Electro Giant', 'Night Witch', 'Baby Dragon', 'Lightning', 'Tornado', 'Lumberjack', 'Mega Minion', 'Elixir Collector'],
              support: ['Barbarian Barrel', 'Skeleton Dragons', 'Fireball', 'Poison'],
              banned: ['X-Bow', 'Mortar', 'Miner', 'Goblin Barrel', 'Rocket', 'Hog Rider']
            },
            // BRIDGE SPAM: Fast, aggressive pressure
            'bridgespam': {
              core: ['Battle Ram', 'Bandit', 'Royal Ghost', 'Electro Wizard', 'Magic Archer', 'Poison', 'Zap', 'Dark Prince', 'Ram Rider', 'P.E.K.K.A'],
              support: ['Minions', 'Fireball', 'Royal Delivery'],
              banned: ['Golem', 'Lava Hound', 'Giant', 'Elixir Collector', 'X-Bow']
            },
            // LOG BAIT: Spell bait strategy
            'bait': {
              core: ['Goblin Barrel', 'Princess', 'Goblin Gang', 'Rocket', 'Knight', 'Inferno Tower', 'Ice Spirit', 'The Log', 'Dart Goblin', 'Skeleton Army'],
              support: ['Tesla', 'Valkyrie', 'Fireball'],
              banned: ['Golem', 'Lava Hound', 'X-Bow', 'Elixir Collector', 'Giant']
            },
            // SIEGE: Defensive win condition
            'siege': {
              core: ['X-Bow', 'Mortar', 'Tesla', 'Knight', 'Archers', 'Skeletons', 'The Log', 'Fireball', 'Rocket', 'Electro Spirit'],
              support: ['Ice Wizard', 'Tornado', 'Mega Minion', 'Ice Golem'],
              banned: ['Golem', 'Lava Hound', 'Giant', 'Electro Giant', 'Elixir Collector', 'Mega Knight']
            },
            // GRAVEYARD: Spell-based win condition
            'graveyard': {
              core: ['Graveyard', 'Poison', 'Baby Dragon', 'Ice Wizard', 'Tornado', 'Knight', 'Valkyrie', 'Tombstone', 'Barbarian Barrel', 'Freeze'],
              support: ['Bowler', 'Electro Wizard', 'Ice Golem', 'Skeleton King'],
              banned: ['Golem', 'Lava Hound', 'X-Bow', 'Mortar', 'Elixir Collector']
            },
            // MINER: Chip cycle control
            'miner': {
              // EXPANDED LIST: 20+ Options to prevent repetition
              // MIX OF CORE AND SUPPORT to ensure flexible picking
              core: ['Miner', 'Poison', 'Wall Breakers', 'Knight', 'Valkyrie', 'Tesla', 'Inferno Tower', 'Bomb Tower', 'Cannon', 'Musketeer', 'Electro Wizard', 'Skeletons', 'Goblins', 'Spear Goblins', 'Bats', 'Minions', 'Mega Minion', 'Dart Goblin'],
              support: ['Fireball', 'The Log', 'Zap', 'Arrows', 'Snowball', 'Tornado', 'Royal Delivery', 'Ice Spirit', 'Electro Spirit', 'Firecracker', 'Magic Archer', 'Bandit', 'Royal Ghost', 'Dark Prince', 'Prince', 'Mini P.E.K.K.A', 'Hunter', 'Guards'],
              banned: ['Golem', 'Lava Hound', 'Giant', 'Elixir Collector', 'X-Bow', 'Three Musketeers']
            }
          };

          const archetype = playstyleCards[selectedPlaystyle];
          if (archetype) {
            // DRASTICALLY REDUCED BONUSES (Was +2000 -> +500 -> Now +250)
            // This ensures that "Meta Quality" + "Level" + "Jitter" (+/- 400)
            // determine the winner, not this hardcoded list.

            if (archetype.core.includes(card.name)) score += 250;

            // Support cards get a tiny nudge
            else if (archetype.support && archetype.support.includes(card.name)) score += 150;

            // SEVERE PENALTY for banned cards (-1000!)
            if (archetype.banned && archetype.banned.includes(card.name)) score -= 1000;
          }
        }

        // --- INTELLIGENCE V2: PRO META ARCHETYPE MATCHING ---
        // 1. Check if we are building a known meta deck
        const metaMatch = typeof findMatchingArchetype === 'function' ? findMatchingArchetype(builderDeck) : null;

        if (metaMatch) {
          // We found a matching pro deck!
          // Is the current card part of this deck?
          if (metaMatch.full.includes(card.name)) {
            console.log(`🎯 AI Targeting Meta Deck: ${metaMatch.name} -> Wants: ${card.name}`);
            score += 2000; // MASSIVE BONUS - FORCE THIS CARD
          }
        }

        // FACTOR 1: Card Level (Dynamic Scaling)
        // We compare against the player's OWN best cards (playerPeakLevel).
        let normLevel = normalizeLevel(card);

        // Base score for simply being high level
        let levelScore = normLevel * 100;
        score += levelScore;

        // DYNAMIC GAP PENALTY
        // How far is this card from the player's peak?
        const levelGap = playerPeakLevel - normLevel;

        if (levelGap <= 0) {
          // This is one of their best cards (or better, if that's possible)
          score += 600; // PREFERRED
        } else if (levelGap === 1) {
          // 1 Level below peak (e.g. L13 when Peak is L14) - Acceptable
          score += 200;
        } else if (levelGap === 2) {
          // 2 Levels below peak (e.g. L12 vs L14) - Slight warning
          score -= 150;
        } else if (levelGap >= 3) {
          // 3+ Levels below peak (e.g. L11 vs L14) - WEAK BUT USABLE
          // PREVIOUSLY: -3000 (Banned them).
          // NOW: -500. This allows critical synergy cards to still be picked
          // if they have Playstyle Bonus (+250) + Role Bonus (+500) etc.
          score -= 500;
          console.log(`Weak Level Warning: ${card.name} (L${normLevel}) vs Peak L${playerPeakLevel}`);
        }

        // Exception: If the card is absolutely maxed (Level 15/Elite), huge bonus always
        // if (normLevel >= 15) score += 500;
        // A. Archetype Bonus
        if (bestArchetype && bestArchetype.cards.includes(card.name)) {
          score += 200;
        }

        // A2. Evo Bonus
        const hasEvoInDeck = builderDeck.some(c => (c.evolutionLevel || 0) > 0);
        if ((card.evolutionLevel || 0) > 0) {
          // Vital: If we don't have an Evo yet, we MUST pick this one
          if (!hasEvoInDeck) score += 3000;
          else score += 100; // Reduced duplicate Evo bonus
        }

        // B. Synergy Bonus - MASSIVELY INCREASED
        // Smart combos are now MUCH more valuable than raw stats
        for (const deckCard of builderDeck) {
          for (const pair of SYNERGIES) {
            if (pair.includes(deckCard.name) && pair.includes(card.name)) {
              score += 250; // INCREASED from 100 to 250 (+150%)
            }
          }
        }

        // F. ADVANCED COMBO LOGIC (Smart Dependent Synergies) - BOOSTED
        const deckNames = builderDeck.map(c => c.name);

        // Wall Breakers -> Absolutely NEEDS Miner or Drill
        if (deckNames.includes('Wall Breakers') && (card.name === 'Miner' || card.name === 'Goblin Drill')) score += 1000; // DOUBLED
        // Miner -> Perfect with Wall Breakers, Balloons, Poison
        if (deckNames.includes('Miner') && (card.name === 'Wall Breakers' || card.name === 'Poison' || card.name === 'Balloon')) score += 800; // DOUBLED
        // Golem -> Needs Night Witch
        if (deckNames.includes('Golem') && card.name === 'Night Witch') score += 1000; // +67%
        // Lava Hound -> Needs Balloon or Flying Machine
        if (deckNames.includes('Lava Hound') && (card.name === 'Balloon' || card.name === 'Flying Machine')) score += 1000; // +67%
        // Sparky -> Needs Goblin Giant or Tornado
        if (deckNames.includes('Sparky') && (card.name === 'Goblin Giant' || card.name === 'Tornado')) score += 1000; //+67%
        // Graveyard -> Needs Poison or Freeze
        if (deckNames.includes('Graveyard') && (card.name === 'Poison' || card.name === 'Freeze' || card.name === 'Baby Dragon')) score += 800; // +60%

        // NEW: ANTI-SYNERGY DETECTION (Prevent bad combinations)
        // Clash of strategies - severely penalize
        if (deckNames.includes('X-Bow') && (card.name === 'Golem' || card.name === 'Lava Hound' || card.name === 'Giant')) score -= 800; // Siege + Beatdown = terrible
        if (deckNames.includes('Golem') && (card.name === 'X-Bow' || card.name === 'Mortar' || card.name === 'Miner')) score -= 600; // Beatdown + Siege/Cycle = bad
        if (deckNames.includes('Lava Hound') && (card.name === 'Golem' || card.name === 'Giant' || card.name === 'Electro Giant')) score -= 700; // Two heavy tanks = bad

        // Spell bait without bait cards
        if (deckNames.includes('Goblin Barrel') && !deckNames.includes('Princess') && !deckNames.includes('Goblin Gang') && (card.name === 'Princess' || card.name === 'Goblin Gang')) score += 500;

        // G. GENERIC INTELLIGENCE (Apply to ALL Archetypes) - ENHANCED
        // 0. Playstyle Enforcer (Cycle vs Beatdown) - STRONGER
        const currentWinCon = builderDeck.find(c => getCardRole(c.name).includes('winCon'));
        if (currentWinCon) {
          // CYCLE DETECTED
          if (['Hog Rider', 'Miner', 'Goblin Barrel', 'Wall Breakers', 'Goblin Drill', 'X-Bow', 'Mortar'].includes(currentWinCon.name)) {
            // MASSIVE Bonus for Cheap Cards (<=2 elixir)
            if ((card.elixirCost || 0) <= 2) score += 350; // INCREASED from 200
            // Stronger Penalty for Tanky cards (unless it's defense)
            if ((card.elixirCost || 0) >= 6) score -= 500; // INCREASED from 200
            else if ((card.elixirCost || 0) === 5) score -= 200;
          }
          // BEATDOWN DETECTED
          if (['Golem', 'Lava Hound', 'Electro Giant', 'Goblin Giant'].includes(currentWinCon.name)) {
            // Stronger Bonus for Support Units (4-5 elixir)
            if ((card.elixirCost || 0) >= 4 && (card.elixirCost || 0) <= 5) score += 250; // INCREASED from 100
            // Bigger Bonus for Pump
            if (card.name === 'Elixir Collector') score += 500; // INCREASED from 300
            // Penalty for too many cycle cards
            if ((card.elixirCost || 0) <= 2 && builderDeck.filter(c => (c.elixirCost || 0) <= 2).length >= 3) score -= 300;
          }
        }

        // 1. Heavy Tank Logic
        const heavyTanks = ['Golem', 'Giant', 'Lava Hound', 'Electro Giant', 'P.E.K.K.A', 'Mega Knight', 'Goblin Giant'];
        const hasHeavyTank = deckNames.some(n => heavyTanks.includes(n));

        if (hasHeavyTank) {
          // Tanks loves Splash Support and Big Spells
          if (cardRoles.includes('airCounter') || card.name === 'Witch' || card.name === 'Executioner' || card.name === 'Baby Dragon') score += 150;
          if (cardRoles.includes('spellBig') || card.name === 'Tornado') score += 100;
        }

        // 2. Fast Cycle Logic (Hog, Miner, Drill, Barrel, WB)
        const fastWinCons = ['Hog Rider', 'Miner', 'Goblin Drill', 'Goblin Barrel', 'Wall Breakers', 'Ram Rider', 'Battle Ram'];
        const hasFastWinCon = deckNames.some(n => fastWinCons.includes(n));

        if (hasFastWinCon) {
          // Fast decks love Cheap Cards and Small Spells
          const cost = card.elixirCost || 3;
          if (cost <= 2) score += 150; // Cycle cards
          if (cardRoles.includes('spellSmall')) score += 120;
        }

        // 3. Control/Siege Logic (X-Bow, Graveyard, Mortar)
        const controlWinCons = ['X-Bow', 'Mortar', 'Graveyard'];
        const hasControl = deckNames.some(n => controlWinCons.includes(n));

        if (hasControl) {
          // Loves Buildings and Control Spells
          if (cardRoles.includes('building')) score += 150;
          if (card.name === 'Poison' || card.name === 'Tornado' || card.name === 'The Log') score += 150;
        }
        const roles = getDeckRoles(builderDeck);

        // H. SPELL THEORY (1 Big + 1 Small)
        // Analyze current spells
        const hasSmall = roles.hasSmallSpell;
        const hasBig = roles.hasBigSpell;

        if (hasSmall && !hasBig) {
          if (cardRoles.includes('spellBig')) score += 500; // Complete the pair
          if (cardRoles.includes('spellSmall')) score -= 200; // No double small
        }
        if (hasBig && !hasSmall) {
          if (cardRoles.includes('spellSmall')) score += 500; // Complete the pair
          if (cardRoles.includes('spellBig')) score -= 200; // No double big
        }

        // I. THREAT COVERAGE (The "What If" Engine)
        // 1. Air Defense Check (Can we kill Balloon/Lava?)
        const hasGoodAir = builderDeck.some(c => getCardRole(c.name).includes('airCounter'));
        if (!hasGoodAir) {
          if (cardRoles.includes('airCounter')) score += 800; // EMERGENCY: NEED AIR DEFENSE
        }

        // 2. Tank Killer Check (Can we kill Golem/Pekka?)
        const hasTankKiller = builderDeck.some(c => getCardRole(c.name).includes('tankKiller') || c.name === 'Inferno Tower' || c.name === 'Inferno Dragon');
        if (!hasTankKiller) {
          if (cardRoles.includes('tankKiller')) score += 600; // Need DPS
          if (card.name === 'Inferno Tower' || card.name === 'Inferno Dragon') score += 700;
        }

        // 3. Swarm Check (Can we kill Goblin Gang?)
        const hasSplash = builderDeck.some(c => CARD_METRICS[c.name]?.def >= 7 && (card.name === 'Valkyrie' || card.name === 'Wizard' || card.name === 'Baby Dragon' || card.name === 'Dark Prince'));
        // (Simplified check -> Rely on small spell)
        if (!hasSmall && !hasSplash) {
          if (cardRoles.includes('spellSmall') || card.name === 'Valkyrie' || card.name === 'Dark Prince') score += 400;
        }

        // 4. Reset Check (Can we stop Sparky/Inferno?)
        // Looking for Zap, E-Wiz, E-Spirit, Lightning, Freeze, Snowball
        const resetCards = ['Zap', 'Electro Wizard', 'Electro Spirit', 'Lightning', 'Freeze', 'Giant Snowball', 'Zappies', 'E-Dragon'];
        const hasReset = builderDeck.some(c => resetCards.includes(c.name));
        if (!hasReset) {
          if (resetCards.includes(card.name)) score += 350; // High value utility
        }


        // C. Role Needs (CRITICAL GAP DETECTION - Never allow broken decks)
        // const roles already calculated above

        // EMERGENCY BONUSES - Force critical roles (but only for well-leveled cards!)
        if (!roles.hasWinCon && cardRoles.includes('winCon')) {
          // Only give emergency bonus if card is leveled (11+)
          if ((card.level || 0) >= 11) score += 2500;
          else if ((card.level || 0) >= 9) score += 800; // Small bonus for level 9-10
        }

        // Force spell presence (only well-leveled spells)
        if (!roles.hasSmallSpell && !roles.hasBigSpell) {
          if (cardRoles.includes('spellSmall') || cardRoles.includes('spellBig')) {
            if ((card.level || 0) >= 11) score += 1500;
            else if ((card.level || 0) >= 9) score += 500; // Reduced bonus
          }
        }

        // Force air defense (only well-leveled air counters)
        const hasAirDef = builderDeck.some(c => getCardRole(c.name).includes('airCounter'));
        if (!hasAirDef && cardRoles.includes('airCounter')) {
          // ONLY give air defense bonus if card is leveled properly
          if ((card.level || 0) >= 11) score += 1200;
          else if ((card.level || 0) >= 9) score += 300; // Small bonus for level 9-10
          // No bonus for under level 9 - let it find better options
        }

        // Penalty for redundancy - MASSIVELY INCREASED
        // Multiple buildings are extremely bad - they waste precious deck slots
        if (roles.winConCount >= 2 && cardRoles.includes('winCon')) score -= 1200; // Increased from -500
        if (roles.spellCount >= 3 && (cardRoles.includes('spellSmall') || cardRoles.includes('spellBig'))) score -= 800; // Increased from -300

        // BUILDINGS: Progressive harsh penalty system
        if (cardRoles.includes('building')) {
          if (roles.buildingCount >= 1) score -= 1500; // MASSIVE penalty for 2nd building
          if (roles.buildingCount >= 2) score -= 3000; // EXTREME penalty for 3rd building (should never happen)
        }

        // D. Diversity & Anti-Repetition (NEW - Prevent same cards every time)
        // Track similar card types and penalize overuse
        const cardType = card.name;
        const similarInDeck = builderDeck.filter(c => {
          // Same card family (e.g., all spirits, all goblins, all buildings)
          if (cardType.includes('Spirit') && c.name.includes('Spirit')) return true;
          if (cardType.includes('Goblin') && c.name.includes('Goblin')) return true;
          if (cardType.includes('Skeleton') && c.name.includes('Skeleton')) return true;
          if (getCardRole(c.name).includes('building') && cardRoles.includes('building')) return true;
          return false;
        }).length;

        if (similarInDeck >= 2) score -= 400; // Penalty for too many similar cards
        if (similarInDeck >= 3) score -= 800; // Severe penalty

        // D. Aggressive Elixir Management
        const currentCost = builderDeck.reduce((a, c) => a + (c.elixirCost || 0), 0);
        const currentAvg = builderDeck.length ? (currentCost / builderDeck.length) : 3.0;

        if (currentAvg > 3.6) {
          if ((card.elixirCost || 0) <= 3) score += 400;
          else if ((card.elixirCost || 0) >= 5) score -= 1000;
          else if ((card.elixirCost || 0) >= 4) score -= 200;
        }

        // E. Stat Balancing (Strictness)
        // Rough estimate of current deck stats
        let curOff = 0, curDef = 0;
        builderDeck.forEach(c => {
          const m = CARD_METRICS[c.name] || { off: 5, def: 5 };
          curOff += m.off; curDef += m.def;
        });
        // TARGETS: We want at least ~40 total in both (Scaled to 100 on UI)
        // If we are significantly behind, force the issue
        if (curOff < 35) {
          // WE NEED ATTACK
          const cardOff = (CARD_METRICS[card.name]?.off || 0);
          if (cardOff >= 8) score += 1000; // Huge bonus for Attackers
          else if (cardOff <= 4) score -= 300; // Penalty for passive cards
        }

        if (curDef < 35) {
          // WE NEED DEFENSE
          const cardDef = (CARD_METRICS[card.name]?.def || 0);
          if (cardDef >= 8) score += 1000; // Huge bonus for Defenders
          else if (cardDef <= 4) score -= 300; // Penalty for purely offensive cards
        }

        return score;
      }

      // Get available cards
      // Filter out champions if one already exists
      const hasChampion = builderDeck.find(c => c.rarity === 'Champion' || c.rarity === 'champion');
      const deckNames = new Set(builderDeck.map(c => c.name)); // Convert to Set for efficient lookup
      const all = currentPlayerData.cards; // Assuming all available cards are in currentPlayerData.cards

      // Filter available
      let available = all.filter(c => {
        if (deckNames.has(c.name)) return false;
        if (excludedCards.has(c.name)) return false; // NEW: Exclude banned cards
        if (c.rarity === 'Champion' && hasChampion) return false;
        return true;
      });

      console.log(`DEBUG POOL SIZE: ${available.length} cards available for selection.`);
      if (available.length < 10) console.warn("WARNING: Very small card pool!");

      // 0. FORCED PLAYSTYLE START (The "Captain" Rule)
      // If user explicitly chose a style, we MUST start with that style's key card.
      // Otherwise the "Strict Win Con" rule might pick a different win con first and block this one.
      if (selectedPlaystyle !== 'any') {
        const captains = {
          'miner': ['Miner', 'Mighty Miner'],
          'hog': ['Hog Rider', 'Ram Rider'], // 'cycle' often means hog
          'cycle': ['Hog Rider', 'Royal Hogs'],
          'beatdown': ['Golem', 'Electro Giant', 'Lava Hound', 'Giant', 'Goblin Giant'],
          'siege': ['X-Bow', 'Mortar'],
          'bait': ['Goblin Barrel', 'Princess'],
          'bridgespam': ['Battle Ram', 'P.E.K.K.A', 'Ram Rider'],
          'graveyard': ['Graveyard'],
          'control': ['Graveyard', 'Miner', 'Poison']
        };

        const targetCaptains = captains[selectedPlaystyle];
        if (targetCaptains) {
          // Find the best available captain (owned by player)
          // Sort by Level to pick the best one
          const myCaptains = available.filter(c => targetCaptains.includes(c.name));
          myCaptains.sort((a, b) => normalizeLevel(b) - normalizeLevel(a));

          if (myCaptains.length > 0) {
            const captain = myCaptains[0];
            console.log("Force-Adding Captain for " + selectedPlaystyle, captain.name);
            builderDeck.push(captain);
            deckNames.add(captain.name); // update lookup set
            available = available.filter(c => c.name !== captain.name);
            renderBuilderUI();
            await new Promise(r => setTimeout(r, 200));
          }
        }
      }

      // Loop to fill
      for (let i = 0; i < slotsToFill; i++) {
        if (available.length === 0) break;

        let best = null;
        let maxScore = Number.NEGATIVE_INFINITY;

        // Safe Scoring Loop
        for (const card of available) {

          // STRICT WIN CONDITION LIMIT
          // If we already have a Win Condition, DO NOT pick another one (unless it's a specific synergy)
          const currentWinCon = builderDeck.find(c => getCardRole(c.name).includes('winCon'));
          if (currentWinCon) {
            const candidateRole = getCardRole(card.name);
            if (candidateRole.includes('winCon')) {
              // ALLOW EXCEPTIONS: Miner + Wall Breakers, or Balloon + Lava Hound
              const isMinerWB = (currentWinCon.name === 'Miner' && card.name === 'Wall Breakers') || (currentWinCon.name === 'Wall Breakers' && card.name === 'Miner');
              const isLavaLoon = (currentWinCon.name === 'Lava Hound' && card.name === 'Balloon') || (currentWinCon.name === 'Balloon' && card.name === 'Lava Hound');
              const isGiantSparky = (currentWinCon.name === 'Goblin Giant' && card.name === 'Sparky') || (currentWinCon.name === 'Sparky' && card.name === 'Goblin Giant');

              if (!isMinerWB && !isLavaLoon && !isGiantSparky) {
                continue; // SKIP this card entirely
              }
            }
          }

          // STRICT SPELL LIMIT (Max 2 Spells)
          // No more 3-spell decks.
          const currentSpells = builderDeck.filter(c => getCardRole(c.name).includes('spellBig') || getCardRole(c.name).includes('spellSmall')).length;
          const isCandidateSpell = getCardRole(card.name).includes('spellBig') || getCardRole(card.name).includes('spellSmall');
          if (currentSpells >= 2 && isCandidateSpell) {
            continue; // SKIP spell
          }

          if (builderDeck.length >= 6) {
            const airCounters = builderDeck.filter(c => getCardRole(c.name).includes('airCounter')).length;
            if (airCounters < 2) {
              // Start rejecting non-air-counters until we satisfy the condition
              if (!getCardRole(card.name).includes('airCounter')) {
                // Soft rejection: massively penalize non-air cards instead of hard skipping?
                // Actually, hard skip is safer to guarantee it happens.
                continue;
              }
            }
          }

          // USER FEEDBACK: MINER DECKS PREFER 1 CYCLE CARD (BUT 2 IS OK)
          // Soft Limit: If we have Miner and 1 cycle card already, PENALIZE the next one but allow it if it's really good.
          const hasMiner = builderDeck.some(c => c.name === 'Miner');
          if (hasMiner) {
            const isCycleTroop = (c) => (c.elixirCost || 0) <= 2 && !getCardRole(c.name).includes('spell');
            // Count current cycle troops
            const currentCycleTroops = builderDeck.filter(isCycleTroop).length;

            // Check candidate
            if (isCycleTroop(card) && currentCycleTroops >= 1) {
              // Apply penalty instead of skip
              // Score is usually around 100-300 range.
              // -200 should be enough to make it lose to a good Musketeer/Knight unless it's godly.
              // If we have 2 already, strictly block 3rd.
              if (currentCycleTroops >= 2) continue;

              // Penalty for 2nd cycle card
              // We'll modify the score inside the try/catch loop next to be safe, 
              // OR just soft-skip here? 
              // We can't easily modify score BEFORE the scoreCard function runs.
              // So let's wrap the scoreCard call below.
            }
          }

          let score = 0;
          try {
            score = scoreCard(card);

            // Apply Penalty for 2nd Cycle Card in Miner Decks
            if (hasMiner) {
              const isCycleTroop = (cName, cCost) => (cCost || 0) <= 2 && !getCardRole(cName).includes('spell');
              const currentCycleTroops = builderDeck.filter(c => isCycleTroop(c.name, c.elixirCost)).length;

              if (currentCycleTroops >= 1 && isCycleTroop(card.name, card.elixirCost)) {
                console.log(`Soft limiting 2nd cycle card: ${card.name}`);
                score -= 250; // Significant penalty, but allows it if other synergies are huge (+1000)
              }
            }
          } catch (err) {
            console.error("Score Error", card.name, err);
            score = -1000;
          }

          if (score > maxScore) {
            maxScore = score;
            best = card;
          }
        }

        if (best) {
          builderDeck.push(best);
          try {
            // Update UI incrementally, but don't crash if it fails
            renderBuilderUI();
            updateStats();
          } catch (e) { console.log('UI Update error', e); }
        } else {
          console.warn("No best card found. Available:", available.length);
          break;
        }

        // Remove from pool
        available = available.filter(c => c.name !== best.name);

        // Card Add Delay
        await new Promise(r => setTimeout(r, 400));
      }

      // 3. Update History for Next Rotation
      console.log("Deck Generation Complete. Updating History...");
      builderDeck.forEach(c => previousDeckNames.add(c.name));
      console.log("Blocked Cards for Next Run:", Array.from(previousDeckNames));

      aiStatus.textContent = 'Deck Generation Complete!';
      autofillBtn.textContent = originalText;
      autofillBtn.disabled = false;
      autofillBtn.style.background = ''; // Reset color

      // --- Post-Processing: Slot Assignment ---
      // Rule: Slot 1 (Index 0) and Slot 2 (Index 1) = Evolution Slots
      // Champions often last.

      // 1. Gather all candidates that the player ACTUALLY has evolved
      // STRICT CHECK: evolutionLevel must be > 0. Merely having an image isn't enough.
      const evoCandidates = builderDeck.filter(c => (c.evolutionLevel || 0) > 0);

      // Sort by level (highest first), then by arbitrary 'tier' preference if levels equal?
      // For now, Levels are king.
      evoCandidates.sort((a, b) => (b.level || 0) - (a.level || 0));

      // 2. Take top 2 available owned evos
      const topEvos = evoCandidates.slice(0, 2);

      // 3. Move them to front (Slot 0, Slot 1)
      for (const evo of topEvos) {
        const idx = builderDeck.indexOf(evo);
        if (idx > -1) {
          builderDeck.splice(idx, 1);
          builderDeck.unshift(evo);
        }
      }

      renderBuilderUI();

      // SAVE CURRENT DECK TO PREVIOUS DECK LIST
      previousDeckNames.clear();
      builderDeck.forEach(c => previousDeckNames.add(c.name));
      console.log("Next Run Banned List:", Array.from(previousDeckNames));

      updateStats();
      generateStrategyGuide(builderDeck);

      // Re-enable button
      const autoBtn = document.getElementById('autofillBtn');
      autoBtn.disabled = false;
      autoBtn.textContent = "✨ Regenerate (Force New Cards)"; // Change text

      document.getElementById('aiStatus').textContent = `Generation Complete!`;
      aiStatus.textContent = 'Deck Generation Complete.';
      autofillBtn.disabled = false;
      autofillBtn.textContent = originalText;
      autofillBtn.style.background = '#8e44ad';
    }



    const improveBtn = document.getElementById('improveBtn');

    // REGENERATE LOGIC
    const regenBtn = document.createElement('button');
    regenBtn.id = 'regenBtn';
    regenBtn.textContent = '🔄 Regenerate';
    regenBtn.className = 'action-btn';
    regenBtn.style.background = '#e67e22'; // Orange
    regenBtn.style.display = 'none'; // Hidden initially
    regenBtn.style.marginLeft = '10px';

    if (improveBtn) {
      improveBtn.parentNode.insertBefore(regenBtn, improveBtn.nextSibling);

      const runImproveLogic = () => {
        if (!currentPlayerData) {
          alert('Scan a player first!');
          return;
        }
        if (!isBuilderMode) {
          toggleBuilderMode();
        }

        const deck = extractCards(currentPlayerData);
        builderDeck = [...deck];

        // 3. TOTAL REBUILD MODE
        // User Request: "Create a whole new deck"

        // FIX: Snapshot current deck into history before wiping!
        console.log("Saving current deck to history before regeneration...");
        previousDeckNames.clear();
        builderDeck.forEach(c => previousDeckNames.add(c.name));
        console.log("Banned History:", Array.from(previousDeckNames));

        // Strategy: Remove EVERYTHING (except Captain maybe?)
        // For now, clear all, but runExpertAutofill handles Captain re-adding if playstyle is selected.
        builderDeck = [];

        renderBuilderUI();
        aiStatus.textContent = 'Constructing Optimal Deck...';
        regenBtn.style.display = 'inline-block'; // Show Regen button

        setTimeout(() => {
          runExpertAutofill();
        }, 500);
      };

      improveBtn.addEventListener('click', runImproveLogic);
      regenBtn.addEventListener('click', runImproveLogic);

      // REGENERATE BUTTON HANDLER (Fix for "Same Cards" bug)
      // The button needs to CLEAR the deck (keeping the Captain) before autofilling.
      const autoBtn = document.getElementById('autofillBtn');
      if (autoBtn) {
        autoBtn.addEventListener('click', () => {
          // If deck is full, we are in "Regenerate" mode
          if (builderDeck.length >= 8) {
            console.log("REGENERATE MODE: Clearing deck for variety...");

            // CRITICAL FIX: Snapshot current deck to force variety!
            previousDeckNames.clear();
            builderDeck.forEach(c => previousDeckNames.add(c.name));
            console.log("Banishing Current Cards:", Array.from(previousDeckNames));

            // 0. FORCED PLAYSTYLE START (The "Captain" Rule)
            // CRITICAL FIX: Only force the MAIN CAPTAIN (Win Condition), not the entire support crew.
            // Previously, this loop was forced-adding "Knight", "Poison", etc. bypassing the variety logic.

            let captainName = null;
            if (selectedPlaystyle === 'miner') captainName = 'Miner';
            else if (selectedPlaystyle === 'hog') captainName = 'Hog Rider';
            else if (selectedPlaystyle === 'graveyard') captainName = 'Graveyard';
            else if (selectedPlaystyle === 'golem') captainName = 'Golem';
            else if (selectedPlaystyle === 'lava') captainName = 'Lava Hound';
            else if (selectedPlaystyle === 'xbow') captainName = 'X-Bow';
            else if (selectedPlaystyle === 'drill') captainName = 'Goblin Drill';
            else if (selectedPlaystyle === 'wallbreakers') captainName = 'Wall Breakers';
            else if (selectedPlaystyle === 'giant') captainName = 'Giant';
            else if (selectedPlaystyle === 'egiant') captainName = 'Electro Giant';
            else if (selectedPlaystyle === 'bloon') captainName = 'Balloon';
            else if (selectedPlaystyle === 'mortar') captainName = 'Mortar';
            else if (selectedPlaystyle === 'rhogs') captainName = 'Royal Hogs';
            else if (selectedPlaystyle === '3m') captainName = 'Three Musketeers';

            // 1. Identify Captain to Keep (if any)
            const oldLen = builderDeck.length;
            if (captainName) {
              // Check if we have it
              const captainCard = all.find(c => c.name === captainName);
              const alreadyIn = builderDeck.find(c => c.name === captainName);

              if (captainCard && !alreadyIn) {
                console.log(`👨‍✈️ Captain Found: ${captainName}. Adding to deck.`);
                builderDeck.push(captainCard);
                // Mark as used
                if (!cardUsageHistory[captainName]) cardUsageHistory[captainName] = 0;
                cardUsageHistory[captainName]++;
              }
              // Now, clear the rest of the deck, keeping only the captain if it was just added or already there.
              builderDeck = builderDeck.filter(c => c.name === captainName);
            } else {
              builderDeck = []; // Clear all if no specific captain
            }
            console.log(`Cleared ${oldLen} cards. Kept: ${builderDeck.length}`);

            // 3. Render Status
            renderBuilderUI();
            document.getElementById('aiStatus').textContent = "Regenerating with new rotation...";

            // 4. Run Autofill
            // Small delay to let UI allow repaint
            setTimeout(runExpertAutofill, 100);
          } else {
            // Normal mode (fill empty slots)
            runExpertAutofill();
          }
        });
      }
    }

    function getDeckRoles(deck) {
      let winConCount = 0;
      let spellCount = 0;
      let hasSmallSpell = false;
      let hasBigSpell = false;
      let hasAirCounter = false;
      let hasBuilding = false;
      let buildingCount = 0;

      deck.forEach(c => {
        if (CARD_ROLES.winCon.includes(c.name)) winConCount++;
        if (CARD_ROLES.spellSmall.includes(c.name)) { spellCount++; hasSmallSpell = true; }
        if (CARD_ROLES.spellBig.includes(c.name)) { spellCount++; hasBigSpell = true; }
        if (CARD_ROLES.airCounter.includes(c.name)) hasAirCounter = true;
        if (CARD_ROLES.building.includes(c.name)) { hasBuilding = true; buildingCount++; }
      });

      return { winConCount, spellCount, hasSmallSpell, hasBigSpell, hasAirCounter, hasBuilding, buildingCount, hasWinCon: winConCount > 0 };
    }

    function getCardRole(name) {
      const roles = [];
      if (CARD_ROLES.winCon.includes(name)) roles.push('winCon');
      if (CARD_ROLES.spellSmall.includes(name)) roles.push('spellSmall');
      if (CARD_ROLES.spellBig.includes(name)) roles.push('spellBig');
      if (CARD_ROLES.airCounter.includes(name)) roles.push('airCounter');
      if (CARD_ROLES.building.includes(name)) roles.push('building');
      if (CARD_ROLES.tankKiller.includes(name)) roles.push('tankKiller');
      return roles;
    }

    console.log('Main Script Ended');
    }) ();
  </script>
</body>

</html>
