const fs = require('fs');

const html = fs.readFileSync('frontend/index.html', 'utf-8');

// Extract all script tag contents (inline only, not src)
const scriptRegex = /<script>([\s\S]*?)<\/script>/g;
let match;
let scriptIndex = 0;
let errors = [];

while ((match = scriptRegex.exec(html)) !== null) {
    const code = match[1];
    try {
        new Function(code);
        console.log(`Script ${scriptIndex}: OK (${code.length} chars)`);
    } catch (e) {
        console.log(`Script ${scriptIndex}: ERROR (${code.length} chars) - ${e.message}`);
        errors.push({ index: scriptIndex, error: e.message, snippet: code.substring(0, 100) });
    }
    scriptIndex++;
}

console.log('\n=== SUMMARY ===');
console.log(`Total scripts: ${scriptIndex}`);
console.log(`Errors: ${errors.length}`);
if (errors.length > 0) {
    console.log('\nErrors found:');
    errors.forEach(e => {
        console.log(`  Script ${e.index}: ${e.error}`);
        console.log(`    First 100 chars: ${e.snippet.replace(/\n/g, ' ')}`);
    });
}
