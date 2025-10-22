// Dynamic Game Collection API
class GameCollectionAPI {
    constructor() {
        this.games = {};
        this.favorites = new Set();
        this.gameContainer = document.getElementById('gameContainer');
    }

    // Load game data from JSON file
    async loadGameData() {
        const apiUrl = './json/games.json';
        
        try {
            console.log('Fetching game data from API...');
            const response = await fetch(apiUrl);
            this.games = await response.json();
            
            // Generate all game cards dynamically
            this.generateAllGameCards();
            
        } catch (error) {
            console.error('Error loading game data:', error);
            this.loadFallbackData();
        }
    }

    // Generate HTML for a single game card
    createGameCard(gameId, gameData) {
        const cardCol = document.createElement('div');
        cardCol.className = 'col-md-6 col-lg-4 mb-4';
        
        cardCol.innerHTML = `
            <div class="card game-card h-100 shadow">
                <div class="position-relative">
                    <img src="${gameData.img || 'https://via.placeholder.com/300x250?text=' + encodeURIComponent(gameData.name)}" 
                         class="card-img-top" 
                         alt="${gameData.name} Thumbnail" 
                         id="${gameId}GameImg"
                         onerror="this.src='https://via.placeholder.com/300x250?text=' + encodeURIComponent('${gameData.name}')">
                    <button class="btn btn-outline-danger favorite-btn" 
                            id="${gameId}FavoriteBtn" 
                            data-game="${gameId}"
                            title="Add to favorites">
                        <i class="heart-icon">♡</i>
                    </button>
                </div>
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title" id="${gameId}GameTitle">${gameData.name}</h5>
                    <div class="mt-auto">
                        <div class="d-flex gap-2">
                            <button class="btn btn-primary flex-fill" id="${gameId}GameBtn">
                                Play Game
                            </button>
                            ${gameData.repo && gameData.repo.startsWith('http') ? 
                                `<button class="btn btn-outline-secondary" onclick="window.open('${gameData.repo}', '_blank')" title="View Source Code">
                                    <i class="fab fa-github"></i> Code
                                </button>` : ''
                            }
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Add event listeners after creating the card
        setTimeout(() => {
            this.attachCardEventListeners(gameId, gameData);
        }, 0);

        return cardCol;
    }

    // Attach event listeners to a game card
    attachCardEventListeners(gameId, gameData) {
        const playButton = document.getElementById(`${gameId}GameBtn`);
        const favoriteButton = document.getElementById(`${gameId}FavoriteBtn`);

        if (playButton && gameData.app) {
            playButton.addEventListener('click', () => {
                window.open(gameData.app, '_blank');
            });
        }

        if (favoriteButton) {
            favoriteButton.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.toggleFavorite(gameId);
            });
        }
    }

    // Generate all game cards from JSON data
    generateAllGameCards() {
        // Clear existing cards
        this.gameContainer.innerHTML = '';

        // Generate cards for all games in the JSON
        Object.entries(this.games).forEach(([gameId, gameData]) => {
            const gameCard = this.createGameCard(gameId, gameData);
            this.gameContainer.appendChild(gameCard);
        });

        // Load favorite status for all games
        this.loadAllFavoriteStatus();
        
        console.log(`Generated ${Object.keys(this.games).length} game cards`);
    }

    // Toggle favorite status for a game
    toggleFavorite(gameId) {
        const favoriteBtn = document.getElementById(`${gameId}FavoriteBtn`);
        const heartIcon = favoriteBtn.querySelector('.heart-icon');
        const cardElement = favoriteBtn.closest('.col-md-6, .col-lg-4');
        
        if (this.favorites.has(gameId)) {
            // Remove from favorites
            this.favorites.delete(gameId);
            favoriteBtn.classList.remove('favorited');
            favoriteBtn.title = 'Add to favorites';
            heartIcon.textContent = '♡';
            cardElement.classList.remove('favorited-card');
            this.setCookie(`${gameId}_favorite`, 'false', 365);
        } else {
            // Add to favorites
            this.favorites.add(gameId);
            favoriteBtn.classList.add('favorited');
            favoriteBtn.title = 'Remove from favorites';
            heartIcon.textContent = '♥';
            cardElement.classList.add('favorited-card');
            this.setCookie(`${gameId}_favorite`, 'true', 365);
        }
        
        // Reorder cards
        this.reorderCards();
    }

    // Load favorite status for all games
    loadAllFavoriteStatus() {
        Object.keys(this.games).forEach(gameId => {
            const favoriteStatus = this.getCookie(`${gameId}_favorite`);
            const favoriteBtn = document.getElementById(`${gameId}FavoriteBtn`);
            const heartIcon = favoriteBtn?.querySelector('.heart-icon');
            const cardElement = favoriteBtn?.closest('.col-md-6, .col-lg-4');
            
            if (favoriteStatus === 'true' && favoriteBtn) {
                this.favorites.add(gameId);
                favoriteBtn.classList.add('favorited');
                favoriteBtn.title = 'Remove from favorites';
                if (heartIcon) heartIcon.textContent = '♥';
                if (cardElement) cardElement.classList.add('favorited-card');
            }
        });
        
        // Initial reorder based on loaded favorites
        this.reorderCards();
    }

    // Reorder cards based on favorite status
    reorderCards() {
        const cards = Array.from(this.gameContainer.children);
        
        cards.sort((a, b) => {
            const aFavorited = a.classList.contains('favorited-card');
            const bFavorited = b.classList.contains('favorited-card');
            
            if (aFavorited && !bFavorited) return -1;
            if (!aFavorited && bFavorited) return 1;
            return 0;
        });
        
        // Reappend cards in new order
        cards.forEach(card => this.gameContainer.appendChild(card));
    }

    // Fallback data in case of API failure
    loadFallbackData() {
        console.log('Loading fallback data...');
        this.games = {
            gunnarGame: {
                name: "Gunnar's Game",
                repo: "An exciting adventure awaits! (Offline Mode)",
                app: "https://gunnar-schmidtt.github.io/project-bravo/",
                img: "assets/game-thumb.jpg"
            },
            jaceGame: {
                name: "Jace's Game", 
                repo: "Challenge yourself with this amazing game! (Offline Mode)",
                app: "https://jcalvert22.github.io/project-bravo/",
                img: "assets/game-thumb.png"
            }
        };
        
        this.generateAllGameCards();
    }

    // Cookie management
    setCookie(name, value, days) {
        const expires = new Date();
        expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
        document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
    }

    getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    // Public method to refresh games (useful for dynamic updates)
    async refreshGames() {
        await this.loadGameData();
    }

    // Initialize the API
    async init() {
        await this.loadGameData();
    }
}

// Initialize the Game Collection API when the page loads
const gameAPI = new GameCollectionAPI();

document.addEventListener('DOMContentLoaded', () => {
    gameAPI.init();
});

// Expose API for external use (e.g., console debugging or future features)
window.gameAPI = gameAPI;