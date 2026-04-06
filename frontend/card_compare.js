/**
 * CARD COMPARE MODULE
 * Compare up to 4 cards side-by-side with full stats
 */
window.CardCompare = (() => {

    const MAX_SLOTS = 4;
    let selectedCards = []; // Array of { name, stats, imgUrl, isHero, isEvo, isChampion }
    let currentFilter = 'all';
    let currentLevel = 11; // Tournament standard default
    let isOpen = false;

    // ---- Helpers ----

    function getProxyImg(url) {
        return (url && url.startsWith('http')) ? `/api/proxy-image?src=${encodeURIComponent(url)}` : url;
    }

    function findCardArt(name) {
        // Look in window.allCards for icon URLs
        const cards = window.allCards || [];
        const stats = window.CARD_STATS[name] || {};

        // For evolutions, find the base card and use evolutionMedium
        if (stats.isEvo) {
            const baseName = name.replace(' Evolution', '');
            const base = cards.find(c => c.name === baseName);
            if (base && base.iconUrls && base.iconUrls.evolutionMedium) {
                return getProxyImg(base.iconUrls.evolutionMedium);
            }
            // Fallback: try exact name match in allCards
            const exact = cards.find(c => c.name === name);
            if (exact) return getProxyImg(exact.iconUrls?.evolutionMedium || exact.iconUrls?.medium || exact.iconUrl);
        }

        // For Hero cards, find the base card art
        if (stats.isHero && name.startsWith('Hero ')) {
            const baseName = name.replace('Hero ', '');
            const base = cards.find(c => c.name === baseName);
            if (base) return getProxyImg(base.iconUrls?.medium || base.iconUrl);
        }

        // For regular cards / champions
        const card = cards.find(c => c.name === name);
        if (card) return getProxyImg(card.iconUrls?.medium || card.iconUrl);

        // Final fallback
        return `https://placehold.co/120x160/111/888?text=${encodeURIComponent(name)}`;
    }

    // ---- Build all card entries for picker (merge CARD_STATS keys + allCards) ----

    function getAllCardEntries() {
        const entries = [];
        const statsKeys = Object.keys(window.CARD_STATS || {});
        const cards = window.allCards || [];

        // Start with CARD_STATS entries (we have stats for them)
        statsKeys.forEach(name => {
            const s = window.CARD_STATS[name];
            entries.push({
                name,
                type: s.type || 'Troop',
                rarity: s.rarity || 'Common',
                isHero: !!s.isHero,
                isEvo: !!s.isEvo,
                isChampion: !!s.isChampion,
                elixir: s.elixir || 0,
                imgUrl: findCardArt(name)
            });
        });

        // Also add any allCards entries not already in CARD_STATS
        cards.forEach(c => {
            if (!statsKeys.includes(c.name)) {
                entries.push({
                    name: c.name,
                    type: 'Troop',
                    rarity: c.rarity || 'Common',
                    isHero: false,
                    isEvo: false,
                    isChampion: c.rarity === 'Champion',
                    elixir: c.elixirCost || 0,
                    imgUrl: getProxyImg(c.iconUrls?.medium || c.iconUrl)
                });
            }
        });

        // Sort: Heroes first, Champions, then Evos, then by name
        entries.sort((a, b) => {
            if (a.isHero !== b.isHero) return a.isHero ? -1 : 1;
            if (a.isChampion !== b.isChampion) return a.isChampion ? -1 : 1;
            if (a.isEvo !== b.isEvo) return a.isEvo ? -1 : 1;
            return a.name.localeCompare(b.name);
        });
        return entries;
    }

    // ---- Filter Logic ----

    function matchesFilter(entry, filter, query) {
        const q = (query || '').toLowerCase().trim();
        const nameMatch = !q || entry.name.toLowerCase().includes(q);
        if (!nameMatch) return false;

        switch (filter) {
            case 'all': return true;
            case 'troops': return entry.type === 'Troop' && !entry.isHero && !entry.isEvo && !entry.isChampion;
            case 'spells': return entry.type === 'Spell' && !entry.isHero;
            case 'buildings': return entry.type === 'Building' && !entry.isEvo;
            case 'heroes': return entry.isHero;
            case 'champions': return entry.isChampion;
            case 'evolutions': return entry.isEvo;
            default: return true;
        }
    }

    // ---- Rendering ----

    function createOverlay() {
        let overlay = document.getElementById('ccOverlay');
        if (overlay) return overlay;

        overlay = document.createElement('div');
        overlay.id = 'ccOverlay';
        overlay.className = 'cc-overlay';
        overlay.innerHTML = `
      <div class="cc-container">
        <div class="cc-header">
          <div class="cc-title">📊 CARD COMPARE <span>Up to 4 Cards</span></div>
          <div class="cc-level-control" title="Set default level for all selected cards">
            <label for="ccLevelSlider">Global Lvl: <span id="ccLevelDisplay">${currentLevel}</span></label>
            <input type="range" id="ccLevelSlider" min="1" max="16" value="${currentLevel}" class="cc-level-slider">
          </div>
          <button class="cc-close-btn" id="ccCloseBtn">&times;</button>
        </div>

        <!-- Selected Card Slots -->
        <div class="cc-slots-header" style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 8px; padding: 0 10px;">
           <span style="color: #666; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px;">Selected Cards</span>
           <button class="cc-clear-all-btn" id="ccClearAllBtn" onclick="window.CardCompare.clearAll()">Clear All &times;</button>
        </div>
        <div class="cc-slots" id="ccSlots"></div>

        <!-- Search & Filter -->
        <div class="cc-search-area">
          <div class="cc-search-row">
            <input type="search" class="cc-search-input" id="ccSearch" placeholder="🔍 Search cards... (e.g. Knight, Monk, Archers)" autocomplete="off">
            <div class="cc-filter-tabs" id="ccFilters">
              <button class="cc-filter-tab active" data-filter="all">All</button>
              <button class="cc-filter-tab" data-filter="troops">Troops</button>
              <button class="cc-filter-tab" data-filter="spells">Spells</button>
              <button class="cc-filter-tab" data-filter="buildings">Buildings</button>
              <button class="cc-filter-tab" data-filter="heroes">👑 Heroes</button>
              <button class="cc-filter-tab" data-filter="champions">⭐ Champions</button>
              <button class="cc-filter-tab" data-filter="evolutions">🟣 Evos</button>
            </div>
          </div>
          <div class="cc-picker" id="ccPicker"></div>
        </div>

        <!-- Comparison Table -->
        <div id="ccTableArea"></div>
      </div>
    `;
        document.body.appendChild(overlay);

        // Event: Close
        document.getElementById('ccCloseBtn').onclick = close;
        overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });

        // Event: Global Level Slider
        const slider = document.getElementById('ccLevelSlider');
        const display = document.getElementById('ccLevelDisplay');
        slider.addEventListener('input', (e) => {
            currentLevel = parseInt(e.target.value, 10);
            display.textContent = currentLevel;
            
            // Sync all currently selected cards to the new global level
            selectedCards.forEach(c => { if(c) c.level = currentLevel; });
            
            renderSlots(); // Re-render to show updated individual level inputs
            renderTable(); // Re-render table with new stats
        });

        // Event: Search
        document.getElementById('ccSearch').addEventListener('input', (e) => {
            renderPicker(e.target.value);
        });

        // Event: Filter tabs
        document.getElementById('ccFilters').addEventListener('click', (e) => {
            if (!e.target.classList.contains('cc-filter-tab')) return;
            currentFilter = e.target.dataset.filter;
            document.querySelectorAll('#ccFilters .cc-filter-tab').forEach(t => {
                t.className = 'cc-filter-tab';
            });
            // Apply correct active class
            if (currentFilter === 'heroes') e.target.className = 'cc-filter-tab active-hero';
            else if (currentFilter === 'champions') e.target.className = 'cc-filter-tab active-hero';
            else if (currentFilter === 'evolutions') e.target.className = 'cc-filter-tab active-evo';
            else e.target.className = 'cc-filter-tab active';

            renderPicker(document.getElementById('ccSearch').value);
        });

        return overlay;
    }

    function renderSlots() {
        const container = document.getElementById('ccSlots');
        if (!container) return;
        container.innerHTML = '';

        for (let i = 0; i < MAX_SLOTS; i++) {
            const card = selectedCards[i];
            const slot = document.createElement('div');
            slot.className = 'cc-slot' + (card ? ' filled' : '');

            if (card) {
                // Determine type
                if (card.isHero || card.isChampion) slot.classList.add('hero-slot');
                else if (card.isEvo) slot.classList.add('evo-slot');

                slot.innerHTML = `
          <img src="${card.imgUrl}" onerror="this.src='https://placehold.co/120x160/111/888?text=Card'">
          <button class="cc-slot-remove" onclick="window.CardCompare.removeCard(${i})">&times;</button>
          <div class="cc-slot-name">${card.name}</div>
          <div class="cc-slot-level-wrapper">
             <label for="lvl-${i}" title="Individual Card Level">Lvl</label>
             <input type="number" id="lvl-${i}" class="cc-slot-level-input" min="1" max="16" value="${card.level || currentLevel}" onchange="window.CardCompare.changeCardLevel(${i}, this.value)">
          </div>
          ${card.isHero ? '<div class="cc-slot-badge hero">👑 HERO</div>' : ''}
          ${card.isChampion ? '<div class="cc-slot-badge hero">⭐ CHAMP</div>' : ''}
          ${card.isEvo ? '<div class="cc-slot-badge evo">🟣 EVO</div>' : ''}
        `;
                slot.classList.add('just-added');
            } else {
                slot.innerHTML = '+';
                slot.title = 'Select a card below';
            }
            container.appendChild(slot);
        }
        
        // Show/hide Clear All button
        const clearBtn = document.getElementById('ccClearAllBtn');
        if (clearBtn) {
             clearBtn.style.display = selectedCards.length > 0 ? 'block' : 'none';
        }
    }

    function renderPicker(query) {
        const picker = document.getElementById('ccPicker');
        if (!picker) return;

        const entries = getAllCardEntries();
        const selectedNames = selectedCards.map(c => c.name);

        const filtered = entries.filter(e => matchesFilter(e, currentFilter, query));

        if (filtered.length === 0) {
            picker.innerHTML = '<div style="grid-column:1/-1; text-align:center; color:#555; padding:20px; font-size:13px;">No cards match your search.</div>';
            return;
        }

        picker.innerHTML = filtered.map(e => {
            const isSelected = selectedNames.includes(e.name);
            return `
        <div class="cc-pick-card${isSelected ? ' selected' : ''}" 
             onclick="window.CardCompare.addCard('${e.name.replace(/'/g, "\\'")}')"
             title="${e.name} (${e.elixir} Elixir)">
          <img src="${e.imgUrl}" onerror="this.src='https://placehold.co/60x75/111/888?text=${encodeURIComponent(e.name)}'">
          <div class="cc-pick-name">${e.name}</div>
          ${e.isHero ? '<div class="cc-pick-badge hero">👑</div>' : ''}
          ${e.isChampion ? '<div class="cc-pick-badge hero">⭐</div>' : ''}
          ${e.isEvo ? '<div class="cc-pick-badge evo">EVO</div>' : ''}
        </div>
      `;
        }).join('');
    }

    // ---- Stat Scaling Logic ----
    
    // Scale stat based on 1.1^(level - 11)
    function getScaledStat(baseStat, level) {
         if (baseStat === null || baseStat === undefined || typeof baseStat !== 'number') return baseStat;
         if (level === 11) return baseStat;
         const multiplier = Math.pow(1.1, level - 11);
         return Math.round(baseStat * multiplier);
    }
    
    // Some stats are strings with ramps "40->204->409", scale those too
    function scaleRampStat(rampStr, level) {
         if (!rampStr || typeof rampStr !== 'string' || !rampStr.includes('→')) return rampStr;
         const parts = rampStr.split('→');
         const scaledParts = parts.map(p => {
              const num = parseInt(p, 10);
              return isNaN(num) ? p : getScaledStat(num, level);
         });
         return scaledParts.join('→');
    }
    
    // ---- 1v1 Simulation Logic ----
    function simulate1v1(c1, c2, lvl1, lvl2) {
        const s1 = c1.stats || {};
        const s2 = c2.stats || {};
        
        // Calculate effective HP
        const hp1Raw = getScaledStat(s1.hitpoints, lvl1);
        const hp2Raw = getScaledStat(s2.hitpoints, lvl2);
        const count1 = s1.count || 1;
        const count2 = s2.count || 1;
        
        let hp1 = hp1Raw * count1;
        let hp2 = hp2Raw * count2;
        
        // Check if either is a spell
        if (s1.type === 'Spell') {
             const dmg1 = getScaledStat(s1.damage || s1.crownTowerDamage || 0, lvl1);
             hp2 -= dmg1;
             if (hp2 <= 0) {
                 return { winner: c1, reason: `Spell destroys target instantly.` };
             } else {
                  const pct = Math.round((hp2 / (hp2Raw * count2)) * 100);
                  return { winner: c2, reason: `Survives spell damage`, remainingHpPct: pct };
             }
        }
        if (s2.type === 'Spell') {
             const dmg2 = getScaledStat(s2.damage || s2.crownTowerDamage || 0, lvl2);
             hp1 -= dmg2;
             if (hp1 <= 0) {
                 return { winner: c2, reason: `Spell destroys target instantly.` };
             } else {
                  const pct = Math.round((hp1 / (hp1Raw * count1)) * 100);
                  return { winner: c1, reason: `Survives spell damage`, remainingHpPct: pct };
             }
        }
        
        // If both are spells and didn't destroy each other (impossible, but fallback)
        if (s1.type === 'Spell' && s2.type === 'Spell') return null;
        
        // Calculate effective DPS
        // Note: For ramps, we use average DPS roughly, but let's stick to base for simplicity or take max
        
        // Helper to check if a card deals area splash
        const isAoE = (cardName, stats) => {
            const aoeCards = [
                'Mega Knight', 'Bowler', 'Executioner', 'Wizard', 'Ice Wizard', 'Electro Wizard', 
                'Magic Archer', 'Firecracker', 'Bomber', 'Valkyrie', 'Dark Prince', 'Baby Dragon',
                'Skeleton Dragons', 'Princess', 'Sparky'
            ];
            if (aoeCards.some(name => cardName.includes(name))) return true;
            
            if (!stats.ability) return false;
            const text = stats.ability.toLowerCase();
            return text.includes('splash') || text.includes('area') || text.includes('spin');
        };
        const c1AoE = isAoE(c1.name, s1);
        const c2AoE = isAoE(c2.name, s2);
        
        let dps1_val = s1.dps;
        if (typeof dps1_val === 'string' && dps1_val.includes('→')) dps1_val = dps1_val.split('→').map(Number).reduce((a,b)=>a+b)/3;
        let dps1 = getScaledStat(typeof dps1_val === 'number' ? dps1_val : (s1.damage || 0), lvl1) * count1;
        if (s1.hitSpeed) dps1 = (getScaledStat(s1.damage || 0, lvl1) / parseFloat(s1.hitSpeed)) * count1;
        // If c1 has AoE, it effectively applies its DPS to the entire c2 swarm simultaneously
        if (c1AoE && count2 > 1) dps1 *= count2;
        
        let dps2_val = s2.dps;
        if (typeof dps2_val === 'string' && dps2_val.includes('→')) dps2_val = dps2_val.split('→').map(Number).reduce((a,b)=>a+b)/3;
        let dps2 = getScaledStat(typeof dps2_val === 'number' ? dps2_val : (s2.damage || 0), lvl2) * count2;
        if (s2.hitSpeed) dps2 = (getScaledStat(s2.damage || 0, lvl2) / parseFloat(s2.hitSpeed)) * count2;
        // If c2 has AoE, it effectively applies its DPS to the entire c1 swarm simultaneously
        if (c2AoE && count1 > 1) dps2 *= count1;

        // Targeting Rules
        const can1Target2 = (s1.targets === 'Air & Ground' || s1.targets === 'Ground' && s2.targets !== 'Air'); 
        // Building targeters ignore troops. Note: We assume s2 is a troop here unless type is building.
        const can1Hit2 = (!s1.targets?.includes('Building') || s2.type === 'Building') && can1Target2;
        
        const can2Target1 = (s2.targets === 'Air & Ground' || s2.targets === 'Ground' && s1.targets !== 'Air');
        const can2Hit1 = (!s2.targets?.includes('Building') || s1.type === 'Building') && can2Target1;

        if (!can1Hit2 && !can2Hit1) return { winner: null, reason: `Mutual Ignore (Cannot target each other)` };
        if (!can1Hit2) return { winner: c2, reason: `${c1.name} cannot attack ${c2.name}`, remainingHpPct: 100 };
        if (!can2Hit1) return { winner: c1, reason: `${c2.name} cannot attack ${c1.name}`, remainingHpPct: 100 };
        
        // Ranges
        const r1 = parseFloat(s1.range) || 1; // Melee is approx 1
        const r2 = parseFloat(s2.range) || 1;
        
        // Time to kill
        let ttk1 = hp2 / (dps1 || 1); 
        let ttk2 = hp1 / (dps2 || 1);
        
        // Apply range advantage (first hit logic approx)
        if (r1 > r2) ttk1 -= (r1 - r2) * 0.3; // 0.3s advantage per tile
        if (r2 > r1) ttk2 -= (r2 - r1) * 0.3;
        
        if (ttk1 <= 0) ttk1 = 0.1;
        if (ttk2 <= 0) ttk2 = 0.1;

        if (Math.abs(ttk1 - ttk2) < 0.5) {
             return { winner: null, reason: `Mutual Destruction (Tie)` };
        } else if (ttk1 < ttk2) {
             const hpRemaining = Math.max(0, hp1 - (ttk1 * dps2));
             const pct = Math.round((hpRemaining / (hp1Raw * count1)) * 100);
             return { winner: c1, reason: `Faster Time-To-Kill`, remainingHpPct: pct };
        } else {
             const hpRemaining = Math.max(0, hp2 - (ttk2 * dps1));
             const pct = Math.round((hpRemaining / (hp2Raw * count2)) * 100);
             return { winner: c2, reason: `Faster Time-To-Kill`, remainingHpPct: pct };
        }
    }

    function renderTable() {
        const area = document.getElementById('ccTableArea');
        if (!area) return;

        if (selectedCards.length === 0) {
            area.innerHTML = `
        <div class="cc-empty-state">
          <div class="cc-empty-icon">⚔️</div>
          <div>Select up to 4 cards above to compare their stats side by side</div>
        </div>
      `;
            return;
        }

        // Define stat rows
        const statRows = [
            { key: 'elixir', label: 'Elixir Cost', icon: '💧', higherBetter: false },
            { key: 'hitpoints', label: 'Hitpoints', icon: '❤️', higherBetter: true },
            { key: 'damage', label: 'Damage', icon: '⚔️', higherBetter: true },
            { key: 'crownTowerDamage', label: 'Crown Tower', icon: '🏰', higherBetter: true },
            { key: 'hitSpeed', label: 'Hit Speed', icon: '⏱️', higherBetter: false, suffix: 'sec' },
            { key: 'dps', label: 'DPS', icon: '🔥', higherBetter: true },
            { key: 'range', label: 'Range', icon: '🎯', higherBetter: null },
            { key: 'speed', label: 'Move Speed', icon: '💨', higherBetter: null },
            { key: 'targets', label: 'Targets', icon: '🎪', higherBetter: null },
            { key: 'count', label: 'Deploy Count', icon: '👥', higherBetter: null },
            { key: 'type', label: 'Type', icon: '📦', higherBetter: null },
            { key: 'rarity', label: 'Rarity', icon: '💎', higherBetter: null },
        ];
        
        let html = '';

        // Inject 1v1 Predictor if exactly 2 cards
        if (selectedCards.length === 2 && selectedCards[0] && selectedCards[1]) {
            const c1 = selectedCards[0];
            const c2 = selectedCards[1];
            const result = simulate1v1(c1, c2, c1.level || currentLevel, c2.level || currentLevel);
            
            if (result) {
                let winDesc = '';
                let winClass = 'tie';
                if (result.winner) {
                     const hpText = result.remainingHpPct !== undefined ? ` (${result.remainingHpPct}% HP left)` : '';
                     winDesc = `<span style="color: #4ade80; font-weight:800;">${result.winner.name} Wins!</span>${hpText}<br><small style="color:#aaa;">${result.reason}</small>`;
                     winClass = result.winner === c1 ? 'card1-wins' : 'card2-wins';
                } else {
                     winDesc = `<span style="color: #facc15; font-weight:800;">Draw</span><br><small style="color:#aaa;">${result.reason}</small>`;
                }
                
                html += `
                <div class="cc-predictor-box ${winClass}">
                    <div class="cc-predictor-title">⚔️ 1v1 Predictor Scenario</div>
                    <div class="cc-predictor-result">${winDesc}</div>
                </div>
                `;
            }
        }

        // Build header
        html += '<div class="cc-table-wrap"><table class="cc-table">';
        html += '<thead><tr><th>Stat</th>';
        selectedCards.forEach(c => {
            html += `<th>${c.name}</th>`;
        });
        html += '</tr></thead><tbody>';

        // Build stat rows
        statRows.forEach(row => {
            const values = selectedCards.map(c => {
                const s = c.stats || {};
                let val = s[row.key];
                
                // Get the specific assigned card level, fallback to global
                const cardLevel = c.level || currentLevel;
                
                // Apply scaling for HP, Damage, DPS, Crown Tower
                if (['hitpoints', 'damage', 'dps', 'crownTowerDamage'].includes(row.key)) {
                     if (typeof val === 'number') {
                         val = getScaledStat(val, cardLevel);
                     } else if (typeof val === 'string' && val.includes('→')) {
                         val = scaleRampStat(val, cardLevel);
                     }
                }
                
                return val;
            });

            // Find max absolute value to scale progress bars
            let maxVal = 0;
            // Also track best/worst indices
            let bestIdx = -1;
            let worstIdx = -1;
            
            if (row.higherBetter !== null) {
                const nums = values.map(v => {
                    if (typeof v === 'number') return v;
                    if (typeof v === 'string' && v.includes('→')) {
                        // For ramps, use the final value for the progress bar max
                        const parts = v.split('→');
                        return parseInt(parts[parts.length - 1], 10);
                    }
                    return null;
                });
                
                const validNums = nums.filter(n => n !== null && !isNaN(n));
                if (validNums.length > 0) {
                     maxVal = Math.max(...validNums);
                }
                
                if (validNums.length >= 2) {
                    const best = row.higherBetter ? Math.max(...validNums) : Math.min(...validNums);
                    const worst = row.higherBetter ? Math.min(...validNums) : Math.max(...validNums);
                    if (best !== worst) { // Only highlight if there's a difference
                        bestIdx = nums.indexOf(best);
                        worstIdx = nums.indexOf(worst);
                    }
                }
            }

            html += `<tr><td><span class="cc-stat-icon">${row.icon}</span>${row.label}</td>`;
            values.forEach((v, i) => {
                let display = v !== null && v !== undefined ? v : '—';
                if (row.suffix && typeof v === 'number') display = v + row.suffix;

                let cls = '';
                if (i === bestIdx) cls = 'cc-best';
                else if (i === worstIdx) cls = 'cc-worst';

                // Progress Bar Logic
                let barHtml = '';
                let deltaHtml = '';
                
                if (row.higherBetter !== null && maxVal > 0) {
                    let numForBar = null;
                    if (typeof v === 'number') numForBar = v;
                    else if (typeof v === 'string' && v.includes('→')) {
                        const parts = v.split('→');
                        numForBar = parseInt(parts[parts.length - 1], 10);
                    }
                    
                    if (numForBar !== null && !isNaN(numForBar)) {
                        // Inverse scaling if lower is better (e.g. hitSpeed)
                        let percent = (numForBar / maxVal) * 100;
                        if (!row.higherBetter) {
                             // For hit speed, lower is better. 
                             // If max is 2.5s and this is 1.0s, this should have a full bar.
                             percent = (Math.min(...values.filter(x => typeof x === 'number')) / numForBar) * 100;
                        }
                        percent = Math.max(5, Math.min(100, percent)); // Clamp between 5% and 100%
                        
                        let barType = 'cc-bar-neutral';
                        if (i === bestIdx) barType = 'cc-bar-best';
                        if (i === worstIdx) barType = 'cc-bar-worst';
                        
                        barHtml = `
                            <div class="cc-progress-bg">
                                <div class="cc-progress-fill ${barType}" style="width: ${percent}%;"></div>
                            </div>
                        `;
                        
                        // Delta Logic (Only if exactly 2 cards)
                        if (selectedCards.length === 2 && i === 1 && typeof v === 'number' && typeof values[0] === 'number') {
                             const card1Val = values[0];
                             const card2Val = values[1];
                             if (card1Val !== card2Val) {
                                 let diffRaw = card2Val - card1Val;
                                 let diffPct = ((card2Val - card1Val) / card1Val) * 100;
                                 
                                 let sign = diffPct > 0 ? '+' : '';
                                 let deltaClass = 'cc-delta-neutral';
                                 
                                 // Determine if this delta is "good" or "bad" for Card 2
                                 if (row.higherBetter) {
                                     deltaClass = diffRaw > 0 ? 'cc-delta-good' : 'cc-delta-bad';
                                 } else {
                                     deltaClass = diffRaw < 0 ? 'cc-delta-good' : 'cc-delta-bad';
                                 }

                                 deltaHtml = `<span class="cc-delta-pill ${deltaClass}">${sign}${diffPct.toFixed(1)}%</span>`;
                             }
                        }
                    }
                }

                html += `<td class="${cls}">
                    <div class="cc-stat-val-row">
                        <span>${display}</span>
                        ${deltaHtml}
                    </div>
                    ${barHtml}
                </td>`;
            });
            html += '</tr>';
        });

        // Ability row
        html += `<tr><td><span class="cc-stat-icon">⭐</span>Ability / Special</td>`;
        selectedCards.forEach(c => {
            const s = c.stats || {};
            const ability = s.ability || '—';
            let cls = 'cc-ability-cell';
            if (c.isHero || c.isChampion) cls += ' hero-ability';
            else if (c.isEvo) cls += ' evo-ability';
            html += `<td class="${cls}">${ability}</td>`;
        });
        html += '</tr>';

        html += '</tbody></table></div>';
        area.innerHTML = html;
    }

    // ---- Public API ----

    function open() {
        const overlay = createOverlay();
        overlay.classList.add('active');
        isOpen = true;

        // Ensure allCards is loaded
        if (!window.allCards || window.allCards.length === 0) {
            fetch('/api/cards').then(r => r.json()).then(cards => {
                window.allCards = cards;
                renderPicker('');
                renderSlots();
                renderTable();
            });
        } else {
            renderPicker('');
            renderSlots();
            renderTable();
        }
    }

    function close() {
        const overlay = document.getElementById('ccOverlay');
        if (overlay) overlay.classList.remove('active');
        isOpen = false;
    }

    function addCard(name) {
        if (selectedCards.length >= MAX_SLOTS) return;
        if (selectedCards.find(c => c.name === name)) return;

        const stats = window.CARD_STATS[name] || {};
        selectedCards.push({
            name,
            stats,
            imgUrl: findCardArt(name),
            isHero: !!stats.isHero,
            isEvo: !!stats.isEvo,
            isChampion: !!stats.isChampion,
            level: currentLevel // Assign current global level upon adding
        });

        renderSlots();
        renderPicker(document.getElementById('ccSearch')?.value || '');
        renderTable();
    }

    function removeCard(index) {
        selectedCards.splice(index, 1);
        renderSlots();
        renderPicker(document.getElementById('ccSearch')?.value || '');
        renderTable();
    }

    function clearAll() {
        if (selectedCards.length === 0) return;
        selectedCards = [];
        renderSlots();
        renderPicker(document.getElementById('ccSearch')?.value || '');
        renderTable();
    }
    
    function changeCardLevel(index, newLevel) {
        if (!selectedCards[index]) return;
        let lv = parseInt(newLevel, 10);
        if (isNaN(lv)) lv = 11;
        if (lv < 1) lv = 1;
        if (lv > 16) lv = 16;
        
        selectedCards[index].level = lv;
        renderSlots(); // Ensure input display aligns with parsed value
        renderTable();
    }

    return { open, close, addCard, removeCard, clearAll, changeCardLevel };

})();
