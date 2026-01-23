const fs = require('fs');
const path = 'c:\\Users\\User\\Desktop\\clash-royale-site\\frontend\\index.html';

let buffer = fs.readFileSync(path);
// Convert to string using latin1 to preserve 1-to-1 byte mapping
let content = buffer.toString('latin1');

const replacements = [
    {
        // 🔍 Verification Check
        match: /^\s*.*Verification Check \(DeckShop\).*/m,
        unicode: '          🔍 Verification Check (DeckShop)'
    },
    {
        // ⚔️ Offense
        match: /^\s*<div class="stat-row">.*Offense<\/span>.*$/m,
        unicode: '          <div class="stat-row"><span>⚔️ Offense</span> <span id="offScore" class="stat-score">0</span></div>'
    },
    {
        // 🛡️ Defense
        match: /^\s*<div class="stat-row">.*Defense<\/span>.*$/m,
        unicode: '          <div class="stat-row"><span>🛡️ Defense</span> <span id="defScore" class="stat-score">0</span></div>'
    },
    {
        // 🤝 Synergy
        match: /^\s*<div class="stat-row">.*Synergy<\/span>.*$/m,
        unicode: '          <div class="stat-row"><span>🤝 Synergy</span> <span id="synScore" class="stat-score">0</span></div>'
    },
    {
        // 🎲 Any
        match: /.*data-style="any".*/m,
        unicode: '          <button class="playstyle-btn" data-style="any" style="background:#555;">🎲 Any</button>'
    },
    {
        // ⚡ Cycle
        match: /.*data-style="cycle".*/m,
        unicode: '          <button class="playstyle-btn" data-style="cycle" style="background:#3498db;">⚡ Cycle</button>'
    },
    {
        // 🛡️ Control
        match: /.*data-style="control".*/m,
        unicode: '          <button class="playstyle-btn" data-style="control" style="background:#9b59b6;">🛡️ Control</button>'
    },
    {
        // 👊 Beatdown
        match: /.*data-style="beatdown".*/m,
        unicode: '          <button class="playstyle-btn" data-style="beatdown" style="background:#e74c3c;">👊 Beatdown</button>'
    },
    {
        // 🚀 Bridge Spam
        match: /.*data-style="bridgespam".*/m,
        unicode: '          <button class="playstyle-btn" data-style="bridgespam" style="background:#e67e22;">🚀 Bridge Spam</button>'
    },
    {
        // 🪤 Log Bait
        match: /.*data-style="bait".*/m,
        unicode: '          <button class="playstyle-btn" data-style="bait" style="background:#27ae60;">🪤 Log Bait</button>'
    },
    {
        // 🏹 Siege
        match: /.*data-style="siege".*/m,
        unicode: '          <button class="playstyle-btn" data-style="siege" style="background:#2c3e50;">🏹 Siege</button>'
    },
    {
        // 💀 Graveyard
        match: /.*data-style="graveyard".*/m,
        unicode: '          <button class="playstyle-btn" data-style="graveyard" style="background:#8e44ad;">💀 Graveyard</button>'
    },
    {
        // ⛏️ Miner
        match: /.*data-style="miner".*/m,
        unicode: '          <button class="playstyle-btn" data-style="miner" style="background:#16a085;">⛏️ Miner</button>'
    },
    {
        // ⚔️ Matchup Analyzer (Button text)
        match: /^\s*.*Matchup Analyzer$/m,
        unicode: '        ⚔️ Matchup Analyzer'
    },
    {
        // ⚔️ Matchup Analyzer (Modal title)
        match: /<span>.*Matchup Analyzer<\/span>/m,
        unicode: '        <span>⚔️ Matchup Analyzer</span>'
    },
    {
        // ⚖️ Analyze Matchup
        match: /^\s*.*Analyze Matchup$/m,
        unicode: '          ⚖️ Analyze Matchup'
    },
    {
        // ⚠️ Threats
        match: /<h4.*>.*Threats<\/h4>/m,
        unicode: '            <h4 style="color:#e74c3c;">⚠️ Threats</h4>'
    }
];

for (const repl of replacements) {
    const replacementLatin1 = Buffer.from(repl.unicode, 'utf8').toString('latin1');
    content = content.replace(repl.match, replacementLatin1);
}

fs.writeFileSync(path, Buffer.from(content, 'latin1'));
console.log('Fixed emojis successfully.');
