# Clash Royale Deck Helper — Local Setup

Short setup and run instructions.

Prerequisites
- Node.js (v18+ recommended)

Backend
1. Set your Clash Royale API token in the environment:

PowerShell:
```powershell
$env:CLASH_API_TOKEN = "your_token_here"
node backend/server.js
```

Or create a `.env` and use a tool like `dotenv` (not included here).

Frontend
1. Serve the `frontend` folder with a static server (e.g., `http-server`):

```powershell
cd frontend
npx http-server -p 8080
```

2. Open `http://127.0.0.1:8080` and enter a player tag.

Security notes
- Remove any committed API tokens and rotate keys if exposed.
- Add `CLASH_API_TOKEN` to CI/host secret store for deployments.
