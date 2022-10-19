/* Imports */
// this will check if we have a user and set signout link if it exists
import '../auth/user.js';
import { getPersonalGames, getProfile, getUser } from '../fetch-utils.js';
import { renderProfile } from '../render-utils.js';
import { renderGameCard } from '../render-utils.js';

/* Get DOM Elements */
const errorDisplay = document.getElementById('error-display');
const profileDisplay = document.getElementById('user-display');
const cardHolder = document.getElementById('card-holder');

// /* State */
let error = null;
let profile = null;
let games = [];

// /* Events */
window.addEventListener('load', async () => {
    const userData = getUser();
    const id = userData.id;
    const response = await getProfile(id);

    const resp2 = await getPersonalGames(id);

    games = resp2.data;

    error = response.error;
    profile = response.data;

    if (error) {
        displayError();
    } else {
        displayProfile(profile);
        displayCards(games);
    }
});
// /* Display Functions */
function displayError() {
    if (error) {
        errorDisplay.textContent = error.message;
    } else {
        errorDisplay.textContent = '';
    }
}

function displayProfile(profile) {
    profileDisplay.innerHTML = '';
    const profileContent = renderProfile(profile);
    profileDisplay.append(profileContent);
}

function displayCards(games) {
    cardHolder.innerHTML = '';

    for (const game_id of games) {
        const game = game_id.games;

        const gameEl = renderGameCard(game);
        cardHolder.append(gameEl);
    }
}
