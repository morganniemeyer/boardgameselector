/* Imports */
// this will check if we have a user and set signout link if it exists
import './auth/user.js';
import { renderGameCard } from './render-utils.js';
import { getGames, getGamesByQuery } from './fetch-utils.js';

/* Get DOM Elements */
const gameCardHolder = document.getElementById('gamecard-holder');
const errorDisplay = document.getElementById('error-display');
const searchForm = document.getElementById('search-form');
const addGame = document.getElementById('add-button');

/* State */
let error = null;
let games = [];

/* Events */
//render library
window.addEventListener('load', async () => {
    const response = await getGames();
    error = response.error;
    games = response.data;

    if (error) {
        displayError();
    } else {
        games.sort(function () {
            return 0.5 - Math.random();
        });
        displayCards(games);
    }
});

searchForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(searchForm);
    const title = formData.get('search-input');

    findGames(title);
});

addGame.addEventListener('click', () => {
    location.assign('../add-game');
});

/* Display Functions */
function displayError() {
    if (error) {
        errorDisplay.textContent = error.message;
    } else {
        errorDisplay.textContent = '';
    }
}

async function findGames(title) {
    const response = await getGamesByQuery(title);
    error = response.error;
    games = response.data;
    if (error) {
        displayError();
    } else {
        displayCards(games);
    }
}
function displayCards(games) {
    gameCardHolder.innerHTML = '';

    for (const game of games) {
        const gameEl = renderGameCard(game);
        gameCardHolder.append(gameEl);
    }
}
