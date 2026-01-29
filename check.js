    // --- SYNERGY MATRIX LOGIC ---
    const SynergyMatrix = {
      analyze: function (deck) {
        if (!deck || deck.length === 0) return [];
        const smart = window.SmartAI;
        if (!smart) return [];

        const synergies = [];
        const deckNames = deck.map(c => c.name);
        const processed = new Set(); // Prevent duplicates

        // 1. Check Explicit Pairs (SYNERGIES array)
        if (smart.SYNERGIES) {
          smart.SYNERGIES.forEach(pair => {
            const c1 = pair.cards?.[0] || pair[0];
            const c2 = pair.cards?.[1] || pair[1];
            const tier = pair.tier || 'S';
            const desc = pair.desc || this.getDesc(c1, c2);

            const key = [c1, c2].sort().join('|');

            if (deckNames.includes(c1) && deckNames.includes(c2) && !processed.has(key)) {
              synergies.push({
                cards: [c1, c2], // Keep as array for visualization
                score: tier === 'S' || tier === 'God' ? 95 : tier === 'A' ? 85 : tier === 'B' ? 75 : 65,
                tier: tier,
                desc: desc
              });
              processed.add(key);
            }
          });
        }

        // 2. Check Synergy Map (Captain interactions)
        if (smart.SYNERGY_MAP) {
          deck.forEach(c => {
            const info = smart.SYNERGY_MAP[c.name];
            if (info) {
              // Helper to add synergy
              const checkAndAdd = (list, tier) => {
                if (!list) return;
                list.forEach(target => {
                  const key = [c.name, target].sort().join('|');
                  if (deckNames.includes(target) && !processed.has(key)) {
                    synergies.push({
                      cards: [c.name, target],
                      score: tier === 'S' || tier === 'God' ? 95 : tier === 'A' ? 85 : 75,
                      tier: tier,
                      desc: `Strong synergy found between ${c.name} and ${target}.`
                    });
                    processed.add(key);
                  }
                });
              };
              checkAndAdd(info.must_have, 'S');
              checkAndAdd(info.high_synergy, 'A');
              checkAndAdd(info.good_with, 'B');
            }
          });
        }
        return synergies;
      },

      render: function (deck) {
        if (!deck || deck.length === 0) {
          alert("Scan a player or load a deck first!");
          return;
        }

        const modal = document.getElementById('synergyMatrixModal');
        const body = document.getElementById('synergyBody');
        const smart = window.SmartAI;

        if (!smart) {
          alert("SmartAI not loaded.");
          return;
        }

        modal.style.display = 'flex';
        body.innerHTML = `<div class="loader" style="margin: 50px auto;"></div>`;

        // Analyze using the new method
        const synergies = this.analyze(deck);

        // Calculate Teamwork Score for UI
        // Count unique cards involved in at least one synergy
        const involvedCards = new Set();
        synergies.forEach(s => {
          involvedCards.add(s.cards[0]);
          involvedCards.add(s.cards[1]);
        });

        const teamworkScore = Math.min(100, Math.round((involvedCards.size / 8) * 100));
        let scoreColor = '#2ecc71';
        if (teamworkScore < 50) scoreColor = '#e74c3c';
        else if (teamworkScore < 80) scoreColor = '#f1c40f';

        // --- VISUALIZATION: SVG GRAPH ---
        const size = 340;
        const center = size / 2;
        const radius = 120;

        // Map deck to circular positions
        const nodes = deck.map((c, i) => {
          const angle = (2 * Math.PI * i) / deck.length - (Math.PI / 2); // Start at top
          return {
            name: c.name,
            x: center + radius * Math.cos(angle),
            y: center + radius * Math.sin(angle),
            img: c.iconUrls?.medium || c.iconUrl || '',
            angle: angle
          };
        });

        // Generate Lines
        let svgLines = '';
        synergies.forEach(s => {
          const n1 = nodes.find(n => n.name === s.cards[0]);
          const n2 = nodes.find(n => n.name === s.cards[1]);

          if (n1 && n2) {
            let stroke = '#999';
            let width = 1.5;
            if (s.tier === 'S' || s.tier === 'God') { stroke = '#C130D1'; width = 3; }
            else if (s.tier === 'A') { stroke = '#f1c40f'; width = 2.5; }
            else if (s.tier === 'B') { stroke = '#2ecc71'; width = 2; }

            svgLines += `<line x1="${n1.x}" y1="${n1.y}" x2="${n2.x}" y2="${n2.y}" 
                              stroke="${stroke}" stroke-width="${width}" opacity="0.8" />`;
          }
        });

        // Generate Nodes
        const svgNodes = nodes.map(n => `
            <g class="synergy-node" 
               onclick="SynergyMatrix.explore('${n.name}')" 
               style="cursor:pointer;"
               onmouseover="evt.target.setAttribute('opacity', 0.8)"
               onmouseout="evt.target.setAttribute('opacity', 1)">
                <defs>
                    <clipPath id="clip-${n.name.replace(/[^a-zA-Z0-9]/g, '')}">
                        <circle cx="${n.x}" cy="${n.y}" r="24" />
                    </clipPath>
                </defs>
                <circle cx="${n.x}" cy="${n.y}" r="25" fill="#111" stroke="#555" stroke-width="2" />
                <image href="${n.img}" x="${n.x - 24}" y="${n.y - 24}" width="48" height="48" 
                       clip-path="url(#clip-${n.name.replace(/[^a-zA-Z0-9]/g, '')})" />
                <title>Click to Explore ${n.name}</title>
            </g>
        `).join('');

        // Render HTML
        let html = `
            <!-- Tier Filter Controls -->
            <div style="display:flex; gap:8px; justify-content:center; margin-bottom:15px; flex-wrap:wrap;">
              <button id="tierFilterS" onclick="SynergyMatrix.toggleTier('S')" class="action-btn" style="background:#C130D1; padding:6px 12px; font-size:12px; opacity:1;">
                S-Tier
              </button>
              <button id="tierFilterA" onclick="SynergyMatrix.toggleTier('A')" class="action-btn" style="background:#f1c40f; color:#000; padding:6px 12px; font-size:12px; opacity:1;">
                A-Tier
              </button>
              <button id="tierFilterB" onclick="SynergyMatrix.toggleTier('B')" class="action-btn" style="background:#2ecc71; color:#000; padding:6px 12px; font-size:12px; opacity:1;">
                B-Tier
              </button>
              <button id="tierFilterC" onclick="SynergyMatrix.toggleTier('C')" class="action-btn" style="background:#95a5a6; padding:6px 12px; font-size:12px; opacity:1;">
                C-Tier
              </button>
            </div>

            <div id="synergyGraphContainer" style="display:flex; justify-content:center; margin-bottom:20px;">
                <svg id="synergyGraphSVG" width="${size}" height="${size}" style="background:rgba(0,0,0,0.2); border-radius:50%;">
                    ${svgLines}
                    ${svgNodes}
                </svg>
            </div>

            <div style="text-align:center; margin-bottom:25px;">
                <div style="font-size:14px; color:#aaa; text-transform:uppercase; letter-spacing:1px;">Teamwork Rating</div>
                <div style="font-size:56px; font-weight:900; color:${scoreColor}; text-shadow:0 0 20px ${scoreColor}40;">${teamworkScore}%</div>
                <div style="font-size:13px; color:#ccc; max-width:400px; margin:0 auto;">
                    ${teamworkScore === 100 ? "Incredible! Every card supports another." : "Try to include more combos to boost this score."}
                </div>
            </div>
            
            <h3 style="color:#fff; border-bottom:1px solid #444; padding-bottom:10px; margin-bottom:15px;">Active Synergies</h3>
        `;

        if (synergies.length === 0) {
          html += `<div style="text-align:center; padding:30px; color:#aaa; font-style:italic;">No explicit synergies found. Try pairing a Tank with a Splasher!</div>`;
        } else {
          synergies.sort((a, b) => b.score - a.score);

          html += `<div style="display:grid; grid-template-columns: 1fr; gap:10px;">`;
          synergies.forEach(s => {
            const c1 = deck.find(x => x.name === s.cards[0]);
            const c2 = deck.find(x => x.name === s.cards[1]);
            const img1 = c1 ? (c1.iconUrls?.medium || c1.iconUrl) : '';
            const img2 = c2 ? (c2.iconUrls?.medium || c2.iconUrl) : '';

            let tierColor = '#3498db';
            if (s.tier === 'God') tierColor = '#C130D1';
            if (s.tier === 'S') tierColor = '#f1c40f';

            html += `
                    <div style="background:rgba(255,255,255,0.05); border-left:4px solid ${tierColor}; padding:15px; border-radius:8px; display:flex; align-items:center; gap:15px;">
                        <div style="display:flex; align-items:center;">
                            <img src="${img1}" style="width:50px; height:auto; margin-right:-10px; z-index:1; border-radius:4px; border:1px solid #000;">
                            <img src="${img2}" style="width:50px; height:auto; border-radius:4px; border:1px solid #000;">
                        </div>
                        <div style="flex:1;">
                            <div style="display:flex; justify-content:space-between; margin-bottom:5px;">
                                <div style="color:#fff; font-weight:bold; font-size:14px;">${s.cards[0]} + ${s.cards[1]}</div>
                                <div style="background:${tierColor}; color:#000; padding:1px 6px; border-radius:4px; font-size:10px; font-weight:bold;">${s.tier} TIER</div>
                            </div>
                            <div style="color:#bbb; font-size:12px; line-height:1.4;">${s.desc}</div>
                        </div>
                    </div>
                `;
          });
          html += `</div>`;
        }

        body.innerHTML = html;
      },

      explore: function (cardName) {
        const body = document.getElementById('synergyBody');
        const smart = window.SmartAI;

        body.innerHTML = `<div class="loader" style="margin: 50px auto;"></div>`;

        // Find syneriges
        const found = [];

        // 1. Scan Global List
        if (smart.SYNERGIES) {
          smart.SYNERGIES.forEach(pair => {
            const c1 = pair.cards?.[0] || pair[0];
            const c2 = pair.cards?.[1] || pair[1];
            const tier = pair.tier || 'S';
            const desc = pair.desc || this.getDesc(c1, c2);

            if (c1 === cardName) found.push({ mate: c2, tier: tier, desc: desc });
            else if (c2 === cardName) found.push({ mate: c1, tier: tier, desc: desc });
          });
        }

        // 2. Scan Captain List (Must Haves)
        if (smart.SYNERGY_MAP) {
          // If I am the captain
          if (smart.SYNERGY_MAP[cardName]) {
            smart.SYNERGY_MAP[cardName].mustHave.forEach(mate => {
              // Dedup
              if (!found.some(f => f.mate === mate)) {
                found.push({ mate: mate, tier: 'S', desc: `Core Synergy: ${cardName} NEEDS ${mate}.` });
              }
            });
          }
          // If I am the support
          for (const [cap, info] of Object.entries(smart.SYNERGY_MAP)) {
            if (info.mustHave.includes(cardName)) {
              if (!found.some(f => f.mate === cap)) {
                found.push({ mate: cap, tier: 'S', desc: `Core Synergy: Supports ${cap}.` });
              }
            }
          }
        }

        found.sort((a, b) => this.getTierScore(b.tier) - this.getTierScore(a.tier));

        // Render
        let html = `
            <button onclick="SynergyMatrix.render(window.currentAppDeck)" style="background:transparent; border:none; color:#aaa; cursor:pointer; margin-bottom:10px;">← Back to Matrix</button>
            <div style="display:flex; align-items:center; gap:15px; margin-bottom:20px;">
                 <img src="${window.findCardImage ? window.findCardImage(cardName) : ''}" style="width:60px; border-radius:6px;">
                 <div>
                    <h2 style="color:#fff; margin:0;">${cardName}</h2>
                    <div style="color:#aaa; font-size:12px;">Known Synergies: ${found.length}</div>
                 </div>
            </div>
         `;

        if (found.length === 0) {
          html += `<div style="padding:20px; text-align:center; color:#666;">No recorded synergies for this card yet.</div>`;
        } else {
          html += `<div style="display:grid; gap:10px;">`;
          found.forEach(s => {
            let tierColor = '#999';
            if (s.tier === 'S') tierColor = '#C130D1';
            if (s.tier === 'A') tierColor = '#f1c40f';
            if (s.tier === 'B') tierColor = '#2ecc71';
            if (s.tier === 'C') tierColor = '#95a5a6';

            // Attempt to find image
            let imgUrl = window.findCardImage ? window.findCardImage(s.mate) : '';

            html += `
                    <div style="background:rgba(255,255,255,0.05); padding:10px; border-radius:6px; display:flex; align-items:center; gap:10px; border-left:3px solid ${tierColor};">
                        <img src="${imgUrl}" style="width:40px; border-radius:4px;">
                        <div>
                             <div style="font-weight:bold; color:white; font-size:13px;">${s.mate} <span style="background:${tierColor}; color:black; font-size:9px; padding:1px 4px; border-radius:3px; margin-left:5px;">${s.tier}</span></div>
                             <div style="color:#aaa; font-size:11px;">${s.desc}</div>
                        </div>
                    </div>
                 `;
          });
          html += `</div>`;
        }

        body.innerHTML = html;
      },

      getTierScore: function (tier) {
        if (tier === 'S' || tier === 'God') return 100;
        if (tier === 'A') return 80;
        if (tier === 'B') return 60;
        if (tier === 'C') return 40;
        return 20;

      },

      toggleTier: function (tier) {
        // Initialize filter state if not exists
        if (!window._synergyFilterState) {
          window._synergyFilterState = { S: true, A: true, B: true, C: true, God: true };
        }

        // Toggle the tier
        window._synergyFilterState[tier] = !window._synergyFilterState[tier];

        // Update button appearance
        const btn = document.getElementById(`tierFilter${tier}`);
        if (btn) {
          btn.style.opacity = window._synergyFilterState[tier] ? '1' : '0.3';
          btn.style.textDecoration = window._synergyFilterState[tier] ? 'none' : 'line-through';
        }

        // Get filtered synergies from current deck
        const deck = window.currentAppDeck;
        if (!deck) {
          alert('No deck loaded');
          return;
        }

        const smart = window.SmartAI;
        const deckNames = deck.map(c => c.name);
        const synergies = [];

        if (smart.SYNERGIES) {
          smart.SYNERGIES.forEach(pair => {
            const c1 = pair.cards?.[0] || pair[0];
            const c2 = pair.cards?.[1] || pair[1];
            const tierValue = pair.tier || 'S';

            // Apply filter
            if (!window._synergyFilterState[tierValue]) return;

            const desc = pair.desc || this.getDesc(c1, c2);
            if (deckNames.includes(c1) && deckNames.includes(c2)) {
              synergies.push({
                cards: [c1, c2],
                score: tierValue === 'S' ? 95 : tierValue === 'A' ? 85 : tierValue === 'B' ? 75 : 65,
                tier: tierValue,
                desc: desc
              });
            }
          });
        }

        // Update synergy list display only (keep graph unchanged)
        const body = document.getElementById('synergyBody');
        const synergyListSection = body.querySelector('div[style*="grid-template-columns"]')?.parentElement;

        let listHTML = '';
        if (synergies.length === 0) {
          listHTML = `<div style="text-align:center; padding:30px; color:#aaa; font-style:italic;">No synergies for selected tiers.</div>`;
        } else {
          synergies.sort((a, b) => b.score - a.score);
          listHTML = `<div style="display:grid; grid-template-columns: 1fr; gap:10px;">`;

          synergies.forEach(s => {
            const c1 = deck.find(x => x.name === s.cards[0]);
            const c2 = deck.find(x => x.name === s.cards[1]);
            const img1 = c1 ? (c1.iconUrls?.medium || c1.iconUrl) : '';
            const img2 = c2 ? (c2.iconUrls?.medium || c2.iconUrl) : '';

            let tierColor = '#3498db';
            if (s.tier === 'God') tierColor = '#C130D1';
            if (s.tier === 'S') tierColor = '#f1c40f';
            if (s.tier === 'A') tierColor = '#f1c40f';
            if (s.tier === 'B') tierColor = '#2ecc71';

            listHTML += `
              <div style="background:rgba(255,255,255,0.05); border-left:4px solid ${tierColor}; padding:15px; border-radius:8px; display:flex; align-items:center; gap:15px;">
                <div style="display:flex; align-items:center;">
                  <img src="${img1}" style="width:50px; height:auto; margin-right:-10px; z-index:1; border-radius:4px; border:1px solid #000;">
                  <img src="${img2}" style="width:50px; height:auto; border-radius:4px; border:1px solid #000;">
                </div>
                <div style="flex:1;">
                  <div style="display:flex; justify-content:space-between; margin-bottom:5px;">
                    <div style="color:#fff; font-weight:bold; font-size:14px;">${s.cards[0]} + ${s.cards[1]}</div>
                    <div style="background:${tierColor}; color:#000; padding:1px 6px; border-radius:4px; font-size:10px; font-weight:bold;">${s.tier} TIER</div>
                  </div>
                  <div style="color:#bbb; font-size:12px; line-height:1.4;">${s.desc}</div>
                </div>
              </div>
            `;
          });
          listHTML += `</div>`;
        }

        // Find and update the synergies section
        const h3 = Array.from(body.querySelectorAll('h3')).find(el => el.textContent === 'Active Synergies');
        if (h3 && h3.nextElementSibling) {
          h3.nextElementSibling.innerHTML = listHTML;
        }
      },

      exportAsPNG: function () {
        const svg = document.getElementById('synergyGraphSVG');
        if (!svg) {
          alert('Graph not found!');
          return;
        }

        // Show loading feedback
        const btn = event?.target;
        if (btn) {
          btn.textContent = '⏳ Preparing...';
          btn.disabled = true;
        }

        // Clone SVG to avoid modifying original
        const svgClone = svg.cloneNode(true);
        const size = 340;

        // Get card images and convert to data URLs
        const images = svgClone.querySelectorAll('image');
        let loaded = 0;
        const total = images.length;

        const processImage = (imgEl) => {
          return new Promise((resolve) => {
            const href = imgEl.getAttribute('href') || imgEl.getAttributeNS('http://www.w3.org/1999/xlink', 'href');
            if (!href || href.startsWith('data:')) {
              resolve();
              return;
            }

            const tempCanvas = document.createElement('canvas');
            tempCanvas.width = 48;
            tempCanvas.height = 48;
            const tempCtx = tempCanvas.getContext('2d');

            const tempImg = new Image();
            tempImg.crossOrigin = 'anonymous';

            tempImg.onload = () => {
              try {
                tempCtx.drawImage(tempImg, 0, 0, 48, 48);
                const dataURL = tempCanvas.toDataURL('image/png');
                imgEl.setAttribute('href', dataURL);
                imgEl.setAttributeNS('http://www.w3.org/1999/xlink', 'href', dataURL);
              } catch (e) {
                console.warn('Image conversion failed:', e);
              }
              resolve();
            };

            tempImg.onerror = () => {
              console.warn('Image load failed');
              resolve();
            };

            // Add cache buster for CORS
            tempImg.src = href + (href.includes('?') ? '&' : '?') + 't=' + Date.now();
          });
        };

        // Process all images
        Promise.all(Array.from(images).map(processImage)).then(() => {
          // Create final canvas
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          canvas.width = size;
          canvas.height = size;

          // Draw background
          ctx.fillStyle = '#1a1a1f';
          ctx.fillRect(0, 0, size, size);
          ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
          ctx.beginPath();
          ctx.arc(size / 2, size / 2, size / 2, 0, 2 * Math.PI);
          ctx.fill();

          // Serialize SVG
          const svgData = new XMLSerializer().serializeToString(svgClone);
          const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
          const url = URL.createObjectURL(svgBlob);

          const finalImg = new Image();
          finalImg.onload = function () {
            ctx.drawImage(finalImg, 0, 0, size, size);
            URL.revokeObjectURL(url);

            // Download
            canvas.toBlob(function (blob) {
              const a = document.createElement('a');
              const date = new Date().toISOString().slice(0, 10);
              a.download = `synergy-matrix-${date}.png`;
              a.href = URL.createObjectURL(blob);
              a.click();
              URL.revokeObjectURL(a.href);

              // Success feedback
              if (btn) {
                btn.textContent = '✅ Downloaded!';
                btn.style.background = '#2ecc71';
                btn.disabled = false;
                setTimeout(() => {
                  btn.textContent = '📥 Export PNG';
                  btn.style.background = '#3498db';
                }, 2000);
              }
            });
          };

          finalImg.onerror = () => {
            alert('Export failed. Try again.');
            if (btn) {
              btn.textContent = '📥 Export PNG';
              btn.disabled = false;
            }
          };

          finalImg.src = url;
        });
      },

      getDesc: function (c1, c2) {
        const deckNames = [c1, c2];
        // Basic fallback descriptions if detailed logic fails
        return `Effective pair: ${c1} + ${c2}`;
      }
    }; // Close SynergyMatrix

    // --- GLOBAL FUNCTIONS (MOVED FROM MODULES) ---

    // 0. Helper Functions
    window.toggleAnalysisButtons = (show) => {
      const display = show ? 'inline-block' : 'none';
      ['synergyBtn', 'radarBtn', 'substitutionBtn', 'checkDeckBtn', 'optimizeDeckBtn'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = display;
      });
    };

    // 1. Manual Build Start
    window.startManualBuild = () => {
      // Clear current deck
      window.currentAppDeck = [null, null, null, null, null, null, null, null];

      // Reset UI
      const container = document.getElementById('deckContainer');
      if (container) {
        container.innerHTML = '';
        // Render 8 empty slots
        for (let i = 0; i < 8; i++) {
          const el = document.createElement('div');
          el.className = 'card-slot empty-slot';
          el.style.border = '2px dashed #444';
          el.innerHTML = '<div style="font-size:40px; color:#444;">+</div><div style="font-size:12px; color:#666;">Add</div>';
          el.onclick = () => {
            window.currentSlotIndex = i;
            const modal = document.getElementById('cardPickerModal');
            if (modal) {
              modal.style.display = 'flex';
              const search = document.getElementById('cardSearch');
              if (search) search.focus();
              // Ensure picker is created
              if (window.createCardPicker) window.createCardPicker();
            } else {
              alert("Error: Card Picker Modal not found. Reloading...");
              location.reload();
            }
          };
          container.appendChild(el);
        }
      }

      // Hide Stats
      const stats = document.getElementById('statsContainer');
      if (stats) stats.innerHTML = '<div style="text-align:center; padding:20px; color:#888;">Pick 8 cards to enable analysis tools.</div>';

      // Disable Buttons
      toggleAnalysisButtons(false);
    };

    // 2. Create Card Picker
    window.createCardPicker = () => {
      const grid = document.getElementById('cardPickerGrid');
      if (!grid) return;

      // Only render if empty to save performance
      if (grid.children.length > 0 && window.allCards && window.allCards.length > 0) return;

      grid.innerHTML = '';

      // Ensure we have cards
      if (!window.allCards || window.allCards.length === 0) {
        grid.innerHTML = '<div style="padding:20px;">Loading cards... please wait.</div>';
        return;
      }

      window.allCards.forEach(card => {
        const imgUrl = card.iconUrls?.medium || card.iconUrl;
        const el = document.createElement('div');
        el.className = 'picker-card';
        el.style.cursor = 'pointer';
        el.style.textAlign = 'center';

        el.onclick = () => {
          if (window.currentSlotIndex !== null && window.currentSlotIndex >= 0) {
            // Update Deck
            window.currentAppDeck[window.currentSlotIndex] = card;

            // Re-render Deck Slot
            const container = document.getElementById('deckContainer');
            const slot = container.children[window.currentSlotIndex];
            if (slot) {
              slot.innerHTML = '';
              slot.className = 'card-slot';
              slot.style.border = 'none';

              const img = document.createElement('img');
              img.src = imgUrl;
              img.style.width = '100%';
              slot.appendChild(img);

              const nameBar = document.createElement('div');
              nameBar.className = 'card-name';
              nameBar.textContent = card.name;
              slot.appendChild(nameBar);

              // Allow clicking to change again
              slot.onclick = () => {
                window.currentSlotIndex = Array.from(container.children).indexOf(slot);
                document.getElementById('cardPickerModal').style.display = 'flex';
              };
            }

            // Check if full
            const isFull = window.currentAppDeck.every(c => c !== null);
            if (isFull) {
              document.getElementById('statsContainer').innerHTML = '';
              toggleAnalysisButtons(true);
            }

            // Close Modal
            document.getElementById('cardPickerModal').style.display = 'none';
            window.currentSlotIndex = null;
          }
        };

        el.innerHTML = `
                <img src="${imgUrl}" loading="lazy" style="width:100%; border-radius:4px;">
                <div class="name" style="font-size:12px; margin-top:4px; color:#ccc;">${card.name}</div>
             `;
        grid.appendChild(el);
      });
    };

    // 3. Live Meta Tracker
    window.fetchLiveMeta = async () => {
      const modal = document.getElementById('liveMetaModal');
      const body = document.getElementById('liveMetaBody');
      if (!modal) return;

      modal.style.display = 'flex';
      body.innerHTML = '<div class="loader" style="margin:50px auto;"></div><div style="text-align:center; margin-top:10px; color:#aaa;">Scraping DeckShop for Top Decks...</div>';

      try {
        const res = await fetch('/api/meta-snapshot');
        const decks = await res.json();

        if (!decks || decks.length === 0) {
          body.innerHTML = '<div style="text-align:center; padding:20px; color:#e74c3c;">Failed to load live meta. Try again later.</div>';
          return;
        }

        let html = '<div style="display:grid; grid-template-columns:1fr; gap:15px;">';

        decks.forEach((d, i) => {
          const cardImages = d.full.map(name => {
            const card = window.allCards ? window.allCards.find(c => c.name === name) : null;
            const src = card ? (card.iconUrls?.medium || card.iconUrl) : '';
            return `<img src="${src}" style="width:40px; height:auto;" title="${name}">`;
          }).join('');

          html += `
                    <div style="background:rgba(255,255,255,0.05); padding:15px; border-radius:8px; display:flex; align-items:center; justify-content:space-between;">
                        <div>
                            <div style="font-weight:bold; color:#e67e22; margin-bottom:5px;">#${i + 1} ${d.name || 'Meta Deck'}</div>
                            <div style="display:flex; gap:2px;">${cardImages}</div>
                        </div>
                        <button onclick='window.loadMetaDeck(${JSON.stringify(d.full)})' 
                                style="background:#27ae60; border:none; color:white; padding:8px 16px; border-radius:4px; cursor:pointer;"
                        >Load</button>
                    </div>
                `;
        });

        html += '</div>';
        body.innerHTML = html;

      } catch (e) {
        console.error(e);
        body.innerHTML = `<div style="text-align:center; padding:20px; color:#e74c3c;">Error: ${e.message}</div>`;
      }
    };

    // 4. Load Meta Deck Helper
    window.loadMetaDeck = (cardNames) => {
      if (!window.allCards) { alert("Cards not loaded yet!"); return; }

      const newDeck = [];
      cardNames.forEach(name => {
        const c = window.allCards.find(x => x.name === name);
        if (c) newDeck.push(c);
      });

      if (newDeck.length === 8) {
        window.currentAppDeck = newDeck;
        // Manually trigger simple render
        const container = document.getElementById('deckContainer');
        container.innerHTML = '';
        newDeck.forEach((card, i) => {
          // Render card slot
          const el = document.createElement('div');
          el.className = 'card-slot';
          el.style.border = 'none';
          el.innerHTML = `<img src="${card.iconUrls?.medium || card.iconUrl}" style="width:100%"><div class="card-name">${card.name}</div>`;
          el.onclick = () => {
            window.currentSlotIndex = i;
            if (document.getElementById('cardPickerModal')) document.getElementById('cardPickerModal').style.display = 'flex';
          };
          container.appendChild(el);
        });

        toggleAnalysisButtons(true);
        document.getElementById('liveMetaModal').style.display = 'none';
        // Render Stats
        if (window.DeckRadar) {
          const stats = window.DeckRadar.calculate(newDeck);
          document.getElementById('statsContainer').innerHTML = window.DeckRadar.renderRadarChart(stats.scores);
        }
      } else {
        alert("Could not load all cards for this deck.");
      }
    };


    // 5. Win Condition Masterclass
    window.showGuide = (name) => {
      const guide = window.WIN_CONDITION_GUIDES ? window.WIN_CONDITION_GUIDES[name] : null;
      if (!guide) {
        if (!window.WIN_CONDITION_GUIDES) console.warn("Win Guides not loaded yet");
        return;
      }

      const list = document.getElementById('guideList');
      const detail = document.getElementById('guideDetail');
      if (list) list.style.display = 'none';
      if (detail) detail.style.display = 'block';

      const title = document.getElementById('guideTitle');
      const body = document.getElementById('guideBody');

      // Style Injection for Masterclass (Idempotent)
      if (!document.getElementById('masterclass-style')) {
        const style = document.createElement('style');
        style.id = 'masterclass-style';
        style.textContent = `
        .role-grid-container { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin-top: 15px; }
        .role-card { aspect-ratio: 1; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 1.2em; border-radius: 8px; cursor: pointer; transition: transform 0.2s, box-shadow 0.2s; border: 2px solid rgba(0,0,0,0.2); text-shadow: 1px 1px 2px black; position: relative; }
        .role-card:hover { transform: translateY(-3px); box-shadow: 0 5px 15px rgba(0,0,0,0.4); z-index: 10; }
        .role-card.selected { border-color: white; box-shadow: 0 0 15px var(--gold); transform: scale(1.05); }
        .diff-bar-bg { width: 100%; height: 8px; background: #333; border-radius: 4px; overflow: hidden; margin-top: 5px; }
        .diff-bar-fill { height: 100%; border-radius: 4px; }
        .counter-badge { display: inline-block; padding: 4px 8px; background: #c0392b; color: white; border-radius: 4px; font-size: 0.85em; margin-right: 5px; margin-bottom: 5px; }
        `;
        document.head.appendChild(style);
      }

      // Title Area
      if (title) title.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <span>${name}</span>
          <span style="font-size:12px; background:#333; padding:4px 8px; border-radius:4px; border:1px solid #555;">${guide.archetype || 'General'}</span>
        </div>
        <div style="font-size:14px; color:#aaa; font-weight:normal; margin-top:5px;">Often played as: <span style="color:var(--gold)">${guide.role}</span></div>
      `;

      // Difficulty Visual
      let diffColor = '#2ecc71'; // Green
      let diffVal = 30;
      if (guide.difficulty) {
        const d = guide.difficulty.toLowerCase();
        if (d.includes('medium')) { diffColor = '#f1c40f'; diffVal = 60; }
        if (d.includes('hard')) { diffColor = '#e74c3c'; diffVal = 90; }
      }

      // Strategy HTML
      let strategyHTML = guide.strategy.map(tip => `
        <li style="margin-bottom:10px; color:#ddd; line-height:1.4;">${tip.replace(/\*\*(.*?)\*\*/g, '<strong style="color:var(--gold)">$1</strong>')}</li>
      `).join('');

      // Counters HTML
      const counters = guide.hardCounters ? guide.hardCounters.map(c => `
        <div class="counter-badge" onclick="alert('${c.name}: ${c.reason}')" style="cursor:pointer; display:inline-flex; align-items:center;">
          <span style="font-size:1.2em; margin-right:4px;">⚠️</span>
          <span>${c.name}</span>
        </div>
      `).join('') : '<span style="color:#777">None specified</span>';

      // Build the ROLE GRID
      const rolesContainer = document.createElement('div');
      rolesContainer.className = 'role-grid-container';

      guide.composition.forEach((comp) => {
        const card = document.createElement('div');
        card.className = 'role-card';
        card.textContent = comp.abbr || '??';
        card.style.backgroundColor = comp.color || '#555';
        card.title = comp.role;

        card.onclick = () => {
          document.querySelectorAll('.role-card').forEach(c => c.classList.remove('selected'));
          card.classList.add('selected');
          const detailArea = document.getElementById('roleDetailArea');
          detailArea.style.display = 'block';
          detailArea.innerHTML = `
          <div style="border-left: 4px solid ${comp.color}; padding-left: 10px; background: rgba(0,0,0,0.2); padding: 10px; border-radius: 0 8px 8px 0;">
            <div style="color:${comp.color}; font-size:1.2em; font-weight:bold; margin-bottom:5px;">${comp.role}</div>
            <div style="font-size:0.95em; color:#eee; margin-bottom:8px;">${comp.reason}</div>
            <div style="font-size:0.85em; color:#bbb;">
              Top Picks: <span style="color:#fff; font-weight:bold;">${comp.examples.join(', ')}</span>
            </div>
          </div>
          `;
        };
        rolesContainer.appendChild(card);
      });

      // Set Main Body Content
      if (body) body.innerHTML = `
        <div style="display:flex; gap:15px; margin-bottom:15px;">
          <img src="${guide.imgUrl}" style="width:60px; height:auto; object-fit:contain;">
          <div>
            <div style="font-style:italic; color:#ddd; font-size:0.95em;">"${guide.description}"</div>
            <div style="margin-top:8px;">
              <div style="font-size:11px; color:#aaa; margin-bottom:2px;">DIFFICULTY: <span style="color:${diffColor}">${guide.difficulty || 'Normal'}</span></div>
              <div class="diff-bar-bg">
                <div class="diff-bar-fill" style="width:${diffVal}%; background:${diffColor}"></div>
              </div>
            </div>
          </div>
        </div>
        <h3 style="color:var(--gold); border-bottom:1px solid #444; padding-bottom:5px; margin-top:20px;">☠️ Hard Counters</h3>
        <div style="margin-top:5px; margin-bottom:20px;">${counters}</div>
        <h3 style="color:var(--gold); border-bottom:1px solid #444; padding-bottom:5px;">Required Deck Components (Click to View)</h3>
        <div id="rolesWrapper"></div>
        <div id="roleDetailArea" style="margin-top:10px; display:none;"></div>
        <h3 style="color:var(--gold); border-bottom:1px solid #444; padding-bottom:5px; margin-top:30px;">Strategy Guide</h3>
        <ul style="padding-left:20px; text-align:left;">${strategyHTML}</ul>
      `;

      if (document.getElementById('rolesWrapper')) document.getElementById('rolesWrapper').appendChild(rolesContainer);
    };

    window.renderWinConditionList = () => {
      const grid = document.getElementById('winConditionGrid');
      if (!grid || !window.WIN_CONDITION_GUIDES) return;

      grid.innerHTML = '';
      // Grid CSS (Idempotent)
      if (!document.getElementById('masterclass-grid-style')) {
        const style = document.createElement('style');
        style.id = 'masterclass-grid-style';
        style.textContent = `
        .masterclass-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 12px; padding: 10px; }
        .wc-card { background: #2d3436; border: 1px solid #444; border-radius: 8px; overflow: hidden; cursor: pointer; transition: transform 0.2s, border-color 0.2s; position: relative; }
        .wc-card:hover { transform: translateY(-4px); border-color: var(--gold); box-shadow: 0 4px 15px rgba(0,0,0,0.5); }
        .wc-card img { width: 100%; height: 120px; object-fit: contain; background: #222; padding: 10px; }
        .wc-info { padding: 8px; text-align: center; }
        .wc-name { font-weight: bold; font-size: 0.95em; color: #fff; margin-bottom: 4px; }
        .wc-meta { font-size: 0.75em; color: #aaa; }
        .wc-diff-badge { position: absolute; top: 5px; right: 5px; font-size: 0.7em; padding: 2px 6px; border-radius: 4px; font-weight: bold; color: black; box-shadow: 0 2px 4px rgba(0,0,0,0.5); }
        `;
        document.head.appendChild(style);
      }
      grid.className = 'masterclass-grid';

      Object.keys(window.WIN_CONDITION_GUIDES).forEach(name => {
        const guide = window.WIN_CONDITION_GUIDES[name];
        let diffColor = '#2ecc71';
        let diffText = 'Easy';
        if (guide.difficulty) {
          if (guide.difficulty.toLowerCase().includes('medium')) { diffColor = '#f1c40f'; diffText = 'Med'; }
          if (guide.difficulty.toLowerCase().includes('hard')) { diffColor = '#e74c3c'; diffText = 'Hard'; }
        }

        const div = document.createElement('div');
        div.className = 'wc-card';
        div.onclick = () => window.showGuide(name);
        div.innerHTML = `
          <div class="wc-diff-badge" style="background:${diffColor}">${diffText}</div>
          <img src="${guide.imgUrl}" alt="${name}" onerror="this.src='https://via.placeholder.com/150?text=${name}'">
          <div class="wc-info">
            <div class="wc-name">${name}</div>
            <div class="wc-meta">${guide.archetype || 'General'}</div>
          </div>
        `;
        grid.appendChild(div);
      });
    }

    // --- INITIALIZATION ---
    window.addEventListener('load', () => {
      // 0. Load Win Conditions Data
      const wcScript = document.createElement('script');
      wcScript.src = 'win_conditions.js';
      document.head.appendChild(wcScript);

      // Wire up Win Con Button
      const winConBtn = document.getElementById('winConGuideBtn');
      const wcModal = document.getElementById('winConditionModal');
      const wcBack = document.getElementById('backToGuideList');
      const wcList = document.getElementById('guideList');
      const wcDetail = document.getElementById('guideDetail');

      if (winConBtn) {
        winConBtn.onclick = () => {
          if (wcModal) wcModal.style.display = 'flex';
          if (window.renderWinConditionList) window.renderWinConditionList();
        };
      }
      if (wcBack) {
        wcBack.onclick = () => {
          if (wcDetail) wcDetail.style.display = 'none';
          if (wcList) wcList.style.display = 'block';
        };
      }
      // 1. Populate allCards
      if (window.SmartAI && window.SmartAI.CARDS) {
        if (Array.isArray(window.SmartAI.CARDS)) {
          window.allCards = window.SmartAI.CARDS;
        }
      }
      if (!window.allCards || window.allCards.length === 0) {
        fetch('/api/cards')
          .then(r => r.json())
          .then(cards => {
            window.allCards = cards;
            if (document.getElementById('cardPickerModal').style.display === 'flex') {
              window.createCardPicker();
            }
          })
          .catch(e => console.warn('Failed to fetch cards:', e));
      }

      // 2. Initialize SynergyMatrix
      window.SynergyMatrix = SynergyMatrix;
      const synBtn = document.getElementById('synergyBtn');
      if (synBtn) {
        synBtn.onclick = () => window.SynergyMatrix.render(window.currentAppDeck);
      }
    });

    // Filtering
    window.filterCards = (query) => {
      const q = query.toLowerCase();
      const cards = document.querySelectorAll('.picker-card');
      cards.forEach(c => {
        const name = c.querySelector('.name').textContent.toLowerCase();
        c.style.display = name.includes(q) ? 'inline-block' : 'none';
      });
    };

    const searchInput = document.getElementById('cardSearch');
    if (searchInput) searchInput.addEventListener('input', (e) => window.filterCards(e.target.value));

  </script>