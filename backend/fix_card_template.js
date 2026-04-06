import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, '../frontend/index.html');
let content = fs.readFileSync(filePath, 'utf8');

// Fix the malformed HTML on line 5154
// BEFORE: color:${isEvolved ? '#a855f7' : '#fff'};${card.name}</div>
// AFTER:  color:${isEvolved ? '#a855f7' : '#fff'};">${card.name}</div>

const before = `color:\${isEvolved ? '#a855f7' : '#fff'};\${card.name}</div>`;
const after = `color:\${isEvolved ? '#a855f7' : '#fff'};\">\${card.name}</div>`;

if (content.includes(before)) {
    content = content.replace(before, after);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log("✅ Fixed malformed HTML in deck card template");
} else {
    console.log("❌ Pattern not found - might already be fixed or different format");
    console.log("Searching for similar patterns...");
    const lines = content.split('\n');
    lines.forEach((line, idx) => {
        if (line.includes('card.name') && line.includes('isEvolved') && line.includes('#a855f7')) {
            console.log(`Line ${idx + 1}: ${line.trim()}`);
        }
    });
}
