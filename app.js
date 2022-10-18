/* Imports */
// this will check if we have a user and set signout link if it exists
import './auth/user.js';
import { renderGameCard } from './render-utils.js';
import { getGames } from './fetch-utils.js';

/* Get DOM Elements */
const gameCardHolder = document.getElementById('gamecard-holder');
const errorDisplay = document.getElementById('error-display');

/* State */
let error = null;
let games = [];

/* Events */
window.addEventListener('load', async () => {
    const response = await getGames();
    error = response.error;
    games = response.data;
    if (error) {
        displayError();
    } else {
        displayCards();
    }
});

/* Display Functions */
function displayError() {
    if (error) {
        errorDisplay.textContent = error.message;
    } else {
        errorDisplay.textContent = '';
    }
}

function displayCards() {
    gameCardHolder.innerHTML = '';

    for (const game of games) {
        const gameEl = renderGameCard(game);
        gameCardHolder.append(gameEl);
    }
}
