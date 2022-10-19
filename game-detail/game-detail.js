/* Imports */
// this will check if we have a user and set signout link if it exists
import '../auth/user.js';
import { getSingleGame, gameToPersonalLibrary, getUser } from '../fetch-utils.js';
import { renderBigCard } from '../render-utils.js';

/* Get DOM Elements */
const errorDisplay = document.getElementById('error-display');
const bigCard = document.getElementById('big-gamecard');
const titleGame = document.getElementById('title-header');
const libAdd = document.getElementById('add-to-lib');

/* State */
let error = null;
let game = null;

/* Events */
window.addEventListener('load', async () => {
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');
    const response = await getSingleGame(id);
    error = response.error;
    game = response.data;
    if (error) {
        displayError();
    }

    if (!game) {
        location.assign('/');
    } else {
        titleGame.textContent = game.title;
        displayGame(game);
    }
});

libAdd.addEventListener('click', async () => {
    const userData = getUser();
    const id = userData.id;

    const searchParams = new URLSearchParams(location.search);
    const gameId = searchParams.get('id');
    let pgame = {
        game_id: gameId,
        user_id: id,
    };

    const response = await gameToPersonalLibrary(pgame);
    error = response.error;

    if (error) {
        displayError();
    }

    // location.replace('../profile/');
});

/* Display Functions */
function displayError() {
    if (error) {
        errorDisplay.textContent = error.message;
    } else {
        errorDisplay.textContent = '';
    }
}

function displayGame(game) {
    bigCard.innerHTML = '';
    const gameDisplay = renderBigCard(game);
    bigCard.append(gameDisplay);
}
