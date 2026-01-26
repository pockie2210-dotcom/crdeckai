window.openDeckShop = function () {
    const deck = window.currentAppDeck;
    if (!deck || deck.length === 0) {
        alert("Scan a player first!");
        return;
    }
    // DeckShop URL format: https://www.deckshop.pro/check/?deck=...
    // IDs are needed. But using names is unreliable.
    // Wait, the user provided a link builder: https://www.deckshop.pro/deck-builder/clan-wars/build
    // This allows adding cards.
    // Better: Use `https://www.deckshop.pro/check/?deck=...` with card keys.
    // We need a mapping of Name -> DeckShop Key.
    // Simplified: Just open the main checker and let them see (or search "DeckShop Check" + card names?)
    // Let's try to map generic names.
    // Example: "Hog Rider" -> "hog-rider" or "hog".
    // Most deckshop IDs are 8 chars or numeric.
    // Actually, simply opening the generic builder allows them to drag/drop quickly.
    window.open('https://www.deckshop.pro/deck-builder/clan-wars/build?e=2&h=1', '_blank');
};
