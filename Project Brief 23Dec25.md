# Clash Royale Deck Helper - Project Brief (Updated 23 Dec 2025)

## Project Overview
A web-based Clash Royale player deck helper application that allows users to search for player statistics and view their current deck composition in real-time using the Supercell Clash Royale API.

## Completed Features

### ✅ Backend Infrastructure
- **Node.js + Express.js** server running on port 3000
- **CORS middleware** enabled for cross-origin requests from frontend
- **Secure token management** using dotenv (.env file)
- **API proxy route** `/player/:tag` that proxies requests to Supercell API
- **Enhanced logging** for debugging API requests and responses
- **Dependencies**: express, node-fetch, cors, dotenv

### ✅ Security Implementation
- Removed hard-coded API token from source code
- Implemented .env file configuration (included in .gitignore)
- Created git history cleanup scripts:
  - `scripts/purge_git_token.ps1` (PowerShell version)
  - `scripts/purge_git_token.sh` (Bash version)
- Added `.gitignore` protecting sensitive files (node_modules, .env, *.zip, *.log)

### ✅ Frontend UI (HTML/CSS/JavaScript)
- **Responsive single-page application** with black/gold/purple Clash Royale theme
- **Input field** for player tag entry with Enter key support
- **Buttons**: "Scan Player" (live API) and "Show Demo Deck" (demo mode)
- **Player stats display** showing:
  - Player name and tag
  - Level, trophies, best trophies
  - Wins, losses
  - Clan name
- **Animated card grid** displaying player's current deck with:
  - Real card images from Supercell API
  - Elixir cost overlay
  - Card level indicator
  - Staggered fade-in animations (60ms delays)
  - Hover effects with scale and glow
- **Demo mode** with hardcoded sample player (DemoPlayer) and 8-card deck for testing without API

### ✅ API Integration
- Successfully integrated with Supercell Clash Royale API
- JWT Bearer token authentication working
- Token management via environment variables
- Player data retrieval endpoint: `https://api.clashroyale.com/v1/players/{tag}`
- Supports both `#TAG` and `TAG` formats (auto-prefixes with # if missing)

### ✅ Development Environment
- Node.js v24+ with npm 11.6.2 installed
- Frontend served via http-server at http://127.0.0.1:8080
- Backend server at http://localhost:3000
- Both services successfully running and communicating

## Current Known Issues

### Minor: Card Info Display Overlay
- Card elixir cost and level labels are overlapping with card images
- Issue appears to be with HTML string escaping in inline styles
- **Fix needed**: Refine CSS positioning for card info overlays in renderDeck function
- **Impact**: Visual display only; functionality fully operational

## Technical Stack

### Backend
```
Node.js v24+
├── Express.js ^4.18.2
├── node-fetch ^2.7.0
├── cors ^2.8.5
└── dotenv ^16.0.0
```

### Frontend
```
HTML5 + Vanilla JavaScript
├── No build tools required
├── Self-executing IIFE for scope management
└── Pure CSS animations (no framework dependencies)
```

### Styling
- **Colors**: Black (#0B0B0F), Gold (#D4AF37), Purple (#7B3FE4)
- **Animations**: fadeUp keyframe with staggered delays
- **Card styling**: Gradient backgrounds, gold borders, purple glow shadows
- **Responsive**: Fixed card width with flex layout

## File Structure
```
clash-royale-site/
├── README.md                          (Setup instructions)
├── Project Brief 23Dec25.md           (This file)
├── clash_royale_project_brief.md      (Original brief)
├── .gitignore                         (Protects sensitive files)
├── backend/
│   ├── package.json                   (Dependencies)
│   ├── server.js                      (Express server, API proxy)
│   └── .env                           (Contains CLASH_API_TOKEN)
├── frontend/
│   ├── index.html                     (UI with IIFE logic)
│   └── style.css                      (Theming and animations)
└── scripts/
    ├── purge_git_token.ps1            (Git history cleanup - PowerShell)
    └── purge_git_token.sh             (Git history cleanup - Bash)
```

## Setup & Running

### Prerequisites
- Node.js v24+ with npm
- Windows PowerShell or Terminal for commands

### Installation
```powershell
cd C:\Users\User\Desktop\clash-royale-site\backend
& 'C:\Program Files\nodejs\node.exe' npm install
```

### Running the Application
1. **Start Backend**:
   ```powershell
   cd backend
   & 'C:\Program Files\nodejs\node.exe' server.js
   ```
   Server will run on http://localhost:3000

2. **Start Frontend** (in another terminal):
   ```powershell
   cd frontend
   & 'C:\Program Files\nodejs\npx.cmd' http-server -p 8080
   ```
   Frontend will be accessible at http://127.0.0.1:8080

3. **Access the Application**:
   - Open browser to http://127.0.0.1:8080
   - Enter a player tag (e.g., #UQGVYGV99)
   - Click "Scan Player" to see real data

## Features Demonstrated (24 Dec 2025)

### Working Features
- ✅ Real player data fetched from Supercell API
- ✅ Authenticated API requests using JWT token
- ✅ Player stats displayed (name, level, trophies, wins, losses, clan)
- ✅ Card images loaded and rendered
- ✅ Animated card grid with staggered fade-in effects
- ✅ Hover effects on cards (scale, glow)
- ✅ Demo mode for UI testing
- ✅ Responsive layout with Clash Royale theme

### Tested Successfully
- Player tag `#UQGVYGV99` (IHaveAMiniPekka):
  - Level 39, 6881 trophies
  - 705 wins, 599 losses
  - Clan: Aus Dominators
  - Current deck: 8 cards with images and stats

## Next Steps (TODO)

### Immediate (High Priority)
- [ ] Fix card info overlay CSS positioning (visual cleanup)
- [ ] Test with additional player tags to verify consistency
- [ ] Add error handling for invalid player tags

### Future Enhancements (Medium Priority)
- [ ] Add player search history/favorites
- [ ] Display full card details on hover
- [ ] Add deck win rate statistics
- [ ] Implement card comparison feature
- [ ] Add support for multiple decks per player

### Production Readiness (Lower Priority)
- [ ] Create .env.example file with dummy token format
- [ ] Add rate limiting handling for API
- [ ] Implement token refresh logic
- [ ] Add comprehensive error boundaries
- [ ] Create deployment guide for production environments

## Environment Variables

The backend requires the following in `.env`:
```
CLASH_API_TOKEN=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...
```

**Important**: 
- Obtain token from https://developer.clashroyale.com
- Token must have "Clash Royale" game scope
- Keep token secure and never commit to git
- Include .env in .gitignore (already configured)

## API Reference

### Backend Routes
```
GET /player/:tag
  Description: Proxies player lookup to Supercell API
  Parameters: tag (player tag with or without #)
  Example: /player/%23UQGVYGV99
  Returns: Player JSON object with cards, stats, achievements
```

### Supercell API Used
```
GET https://api.clashroyale.com/v1/players/{tag}
  Headers: Authorization: Bearer {token}
  Response: Complete player data including currentDeck array
```

## Performance Notes
- Frontend loads in ~100ms
- API requests typically complete in 500-1000ms
- Card images lazy-load from Supercell CDN
- Timeout set to 8 seconds for fetch requests
- Animations run at 60fps with GPU acceleration

## Known Limitations
- Requires active internet connection for API calls
- Token expiration not yet handled (API returns 403 if expired)
- Only shows current deck (not historical decks)
- Rate limiting not yet implemented (Supercell API has limits)
- Player tag format is case-sensitive in API

## Testing Checklist
- [x] Backend server starts without errors
- [x] Frontend loads and displays correctly
- [x] Supercell API authentication works
- [x] Real player data displays
- [x] Card images load and render
- [x] Animations play smoothly
- [x] Demo mode works
- [x] Responsive design works on different screen sizes
- [ ] Error handling tested (invalid tags, network failures)
- [ ] Multiple players tested

## Credits
- **API**: Supercell Clash Royale API
- **Frontend Framework**: Vanilla HTML5/CSS3/JavaScript
- **Backend Framework**: Node.js + Express
- **Hosting**: Localhost (development)

## Project Status
**Status**: 🟢 **FUNCTIONAL** - Core features working with minor visual polish needed

**Last Updated**: December 23, 2025 (Evening)
**Next Review**: December 24, 2025 (For CSS overlay fix)
