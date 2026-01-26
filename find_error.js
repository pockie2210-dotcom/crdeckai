const fs = require('fs');

const html = fs.readFileSync('frontend/index.html', 'utf-8');
const match = html.match(/<script>([\s\S]*?)<\/script>/);

if (!match) {
    console.log('No script found');
    process.exit(1);
}

const code = match[1];
const lines = code.split('\n');

// Binary search to find the approximate line with the error
function hasError(subset) {
    try {
        new Function(subset);
        return false;
    } catch {
        return true;
    }
}

// Find first line that causes error when added
let goodLines = 0;
for (let i = 0; i < lines.length; i++) {
    const subset = lines.slice(0, i + 1).join('\n');
    if (hasError(subset)) {
        console.log(`Error appears around line ${i + 1}`);
        console.log(`Line ${i}: ${lines[i - 1]?.substring(0, 80)}`);
        console.log(`Line ${i + 1}: ${lines[i]?.substring(0, 80)}`);
        console.log(`Line ${i + 2}: ${lines[i + 1]?.substring(0, 80)}`);
        break;
    }
    goodLines = i;
}

console.log(`\nLast good line: ${goodLines}`);
