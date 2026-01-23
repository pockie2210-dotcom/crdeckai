import os

file_path = r'c:\Users\User\Desktop\clash-royale-site\frontend\index.html'

with open(file_path, 'rb') as f:
    lines = f.readlines()

new_lines = []
for line in lines:
    s_line = line.decode('latin-1')  # Decode loosely to checking text
    
    # Verification Check
    if 'Verification Check (DeckShop)' in s_line and 'id=' not in s_line and 'button' not in s_line:
        # Replacement with Magnifying Glass Left (U+1F50D) 🔍 -> F0 9F 94 8D
        new_lines.append(b'          \xf0\x9f\x94\x8d Verification Check (DeckShop)\n')
        continue

    # Offense
    if 'id="offScore"' in s_line and 'Offense' in s_line:
        # Crossed Swords ⚔️ (U+2694 U+FE0F) -> E2 9A 94 EF B8 8F
        new_lines.append(b'          <div class="stat-row"><span>\xe2\x9a\x94\xef\xb8\x8f Offense</span> <span id="offScore" class="stat-score">0</span></div>\n')
        continue

    # Defense
    if 'id="defScore"' in s_line and 'Defense' in s_line:
        # Shield 🛡️ (U+1F6E1 U+FE0F) -> F0 9F 9B A1 EF B8 8F
        new_lines.append(b'          <div class="stat-row"><span>\xf0\x9f\x9b\xa1\xef\xb8\x8f Defense</span> <span id="defScore" class="stat-score">0</span></div>\n')
        continue

    # Synergy
    if 'id="synScore"' in s_line and 'Synergy' in s_line:
        # Handshake 🤝 (U+1F91D) -> F0 9F A4 9D
        new_lines.append(b'          <div class="stat-row"><span>\xf0\x9f\xa4\x9d Synergy</span> <span id="synScore" class="stat-score">0</span></div>\n')
        continue

    # Playstyles
    if 'data-style="any"' in s_line:
        # Game Die 🎲 (U+1F3B2) -> F0 9F 8E B2
        new_lines.append(b'          <button class="playstyle-btn" data-style="any" style="background:#555;">\xf0\x9f\x8e\xb2 Any</button>\n')
        continue
    if 'data-style="cycle"' in s_line:
        # High Voltage ⚡ (U+26A1) -> E2 9A A1
        new_lines.append(b'          <button class="playstyle-btn" data-style="cycle" style="background:#3498db;">\xe2\x9a\xa1 Cycle</button>\n')
        continue
    if 'data-style="control"' in s_line:
        # Shield 🛡️
        new_lines.append(b'          <button class="playstyle-btn" data-style="control" style="background:#9b59b6;">\xf0\x9f\x9b\xa1\xef\xb8\x8f Control</button>\n')
        continue
    if 'data-style="beatdown"' in s_line:
        # Oncoming Fist 👊 (U+1F44A) -> F0 9F 91 8A
        new_lines.append(b'          <button class="playstyle-btn" data-style="beatdown" style="background:#e74c3c;">\xf0\x9f\x91\x8a Beatdown</button>\n')
        continue
    if 'data-style="bridgespam"' in s_line:
        # Rocket 🚀 (U+1F680) -> F0 9F 9A 80
        new_lines.append(b'          <button class="playstyle-btn" data-style="bridgespam" style="background:#e67e22;">\xf0\x9f\x9a\x80 Bridge Spam</button>\n')
        continue
    if 'data-style="bait"' in s_line:
        # Mouse Trap 🪤 (U+1FAA4) -> F0 9F AA A4
        new_lines.append(b'          <button class="playstyle-btn" data-style="bait" style="background:#27ae60;">\xf0\x9f\xaa\xa4 Log Bait</button>\n')
        continue
    if 'data-style="siege"' in s_line:
        # Bow and Arrow 🏹 (U+1F3F9) -> F0 9F 8F B9
        new_lines.append(b'          <button class="playstyle-btn" data-style="siege" style="background:#2c3e50;">\xf0\x9f\x8f\xb9 Siege</button>\n')
        continue
    if 'data-style="graveyard"' in s_line:
        # Skull 💀 (U+1F480) -> F0 9F 92 80
        new_lines.append(b'          <button class="playstyle-btn" data-style="graveyard" style="background:#8e44ad;">\xf0\x9f\x92\x80 Graveyard</button>\n')
        continue
    if 'data-style="miner"' in s_line:
        # Pick ⛏️ (U+26CF U+FE0F) -> E2 9B 8F EF B8 8F
        new_lines.append(b'          <button class="playstyle-btn" data-style="miner" style="background:#16a085;">\xe2\x9b\x8f\xef\xb8\x8f Miner</button>\n')
        continue

    # Matchup Analyzer Button Text
    if b'Matchup Analyzer' in line and b'button' not in line and b'span' not in line and b'h2' not in line:
        # Check if it was "Matchup Analyzer" inside the button (indented)
        if line.strip().endswith(b'Matchup Analyzer') and line.strip().startswith(b'\xe2') == False: # Avoid re-replacing if already correct
            # Wait, valid line starts with E2 ...
            # Clean line check:
             # The old one started with E2 9A 94 (Swords) but was incomplete perhaps?
             # Just replace based on text.
             new_lines.append(b'        \xe2\x9a\x94\xef\xb8\x8f Matchup Analyzer\n')
             continue
    
    # Matchup Modal Title
    if '<span>' in s_line and 'Matchup Analyzer</span>' in s_line:
         new_lines.append(b'        <span>\xe2\x9a\x94\xef\xb8\x8f Matchup Analyzer</span>\n')
         continue

    # Analyze Button inside modal
    if 'Analyze Matchup' in s_line and 'button' not in s_line and 'Analyze Matchup' == s_line.strip().split()[-1] + ' ' + s_line.strip().split()[-1]: 
        # Wait, s_line logic is flaky.
        pass
    
    if b'Analyze Matchup' in line and b'button' not in line:
        # Avoid already correct (E2 9A 96 ...)
        # Analyze Matchup ends with newline.
        # Check if it's the text line by indentation or neighbors.
        # It's usually indented.
        new_lines.append(b'          \xe2\x9a\x96\xef\xb8\x8f Analyze Matchup\n')
        continue

    # Threats
    if 'Threats</h4>' in s_line and 'h4' in s_line:
        new_lines.append(b'            <h4 style="color:#e74c3c;">\xe2\x9a\xa0\xef\xb8\x8f Threats</h4>\n')
        continue

    # Strategy Tips (Chunk 16 failed?? Error log didn't explicitly say 16... wait)
    # Failed Chunks: 2, 4, 5, 6, 8, 12, 13, 14, 15.
    # 16 (Tips) is NOT in list. So it passed?
    # Let's verify.
    # The diff shows:
    # -            <h4 style="color:#f1c40f;">ðŸ§  Strategy Tips</h4>
    # +            <h4 style="color:#f1c40f;">🧠 Strategy Tips</h4>
    # So 16 passed. I don't need to redo it.

    new_lines.append(line)

with open(file_path, 'wb') as f:
    f.writelines(new_lines)
