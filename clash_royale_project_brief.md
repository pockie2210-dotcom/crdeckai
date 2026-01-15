# Clash Royale Deck Helper Project Brief

**Project Goal:**
Create a website to help Clash Royale players **scan player tags**, view decks, and receive deck-building guidance, using a combination of APIs (Supercell API, Deck AI) and AI tools (ChatGPT, Gemini, Claude). The website has a **black, gold, and purple theme** and will include a frontend for user input and a backend for API interaction.

---

## 1. Frontend

**Technologies:**
- HTML, CSS, JavaScript
- Black, gold, and purple color scheme
- Input box for player tag
- Scan Player button
- Display output (JSON or formatted deck info)

### Key Elements:
```html
<!DOCTYPE html>
<html>
<head>
  <title>Clash Royale Deck Helper</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>

  <h1>Clash Royale Deck Helper</h1>

  <div class="card">
    <input placeholder="#PLAYER TAG">
    <br><br>
    <button onclick="scan()">Scan Player</button>
  </div>

  <pre id="output"></pre>

  <script>
    async function scan() {
      const input = document.querySelector("input");
      const output = document.getElementById("output");

      if (!input.value.trim()) {
        output.textContent = "Please enter a player tag.";
        return;
      }

      const cleanTag = input.value.trim().replace("#", "");

      try {
        const response = await fetch(
          `http://localhost:3000/player/${encodeURIComponent(cleanTag)}`
        );

        if (!response.ok) {
          const text = await response.text();
          output.textContent = "Error: " + text;
          return;
        }

        const data = await response.json();
        output.textContent = JSON.stringify(data, null, 2);
      } catch (err) {
        output.textContent = "Fetch failed. Is the backend running?";
        console.error(err);
      }
    }
  </script>
</body>
</html>
```

**Notes:**
- Can accept `#` or non-`#` tags.
- `<pre>` element shows JSON output.
- Scan Player button calls the `scan()` function.

---

## 2. Backend

**Technologies:**
- Node.js (v24+)
- Express.js
- Node-fetch v2
- CORS

### File Structure:
```
clash-royale-site/
  ├─ index.html
  ├─ style.css
  ├─ backend/
       ├─ package.json
       └─ server.js
```

### package.json Example:
```json
{
  "name": "backend",
  "version": "1.0.0",
  "main": "server.js",
  "type": "module",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "node-fetch": "^2.6.12",
    "cors": "^2.8.5"
  }
}
```

### server.js Example:
```js
import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const API_TOKEN = "YOUR_API_KEY_HERE";

app.get("/player/:tag", async (req, res) => {
  const tag = req.params.tag.replace("#", "%23");

  try {
    const response = await fetch(
      `https://api.clashroyale.com/v1/players/${tag}`,
      { headers: { Authorization: `Bearer ${API_TOKEN}` } }
    );

    if (!response.ok) {
      return res.status(response.status).json({ error: "Player not found or invalid key" });
    }

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching player data" });
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
```

**Notes:**
- Run backend via `node server.js`.
- API token required from **Supercell Developer Portal**.
- Only global server tags work — Chinese/private server tags return `notFound`.

---

## 3. API / Supercell Notes

- Supercell API requires:
  - API key (token)
  - Allowed IP addresses (cannot be private like 192.168.x.x)
- Tags must be valid global server tags.
- Invalid/private tags → `notFound`.

---

## 4. Testing Steps

### Backend Test
1. Navigate to backend folder in PowerShell:
   ```
   cd C:\Users\User\Desktop\clash-royale-site\backend
   node server.js
   ```
2. Open browser:
   ```
   http://localhost:3000/player/YOURTAG
   ```
3. JSON output confirms backend is running.

### Frontend Test
1. Navigate to frontend folder:
   ```
   cd C:\Users\User\Desktop\clash-royale-site
   http-server
   ```
2. Open:
   ```
   http://127.0.0.1:8080
   ```
3. Enter tag in input box, click **Scan Player** → JSON output appears.

---

## 5. Known Issues & Lessons Learned

- `Cannot GET /player/` → empty or `#`-only tags in URL.
- `notFound` → invalid tags, private server, or mistyped characters.
- `EADDRINUSE` → port 3000 already in use; do not restart backend unnecessarily.
- Frontend and backend work correctly; errors are **tag/API related**.

---

## 6. Future Work / Next Steps

1. Display **player’s deck in a readable format**.
2. Integrate **Deck AI / recommendations**.
3. Connect **ChatGPT / Claude / Gemini** for tips.
4. Add **1v1 deck simulations** or other helper features.
5. Finalize **black, gold, purple styling**.

---

## ✅ Key Takeaways

- Frontend + backend communication is **fully functional**.
- Supercell API works if tag is **correct**.
- Copy tags from **mobile app**, not website, for guaranteed results.
- Project is ready for **deck display and AI integration**.

