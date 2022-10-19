/* Imports */
// this will check if we have a user and set signout link if it exists
import '../auth/user.js';
import { getPersonalGames, getProfile, getUser } from '../fetch-utils.js';
import { renderProfile } from '../render-utils.js';
import { renderProfileGameCard } from '../render-utils.js';

/* Get DOM Elements */
const errorDisplay = document.getElementById('error-display');
const profileDisplay = document.getElementById('user-display');
const cardHolder = document.getElementById('card-holder');
const randomButton = document.getElementById('random-game');
const userName = document.getElementById('title-head');

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
        userName.textContent = `${profile.user_name}'s Profile`;
        displayProfile(profile);
        displayCards(games, id);
    }
});

randomButton.addEventListener('click', async () => {
    const userData = getUser();
    const id = userData.id;
    const response = await getPersonalGames(id);
    error = response.error;
    games = response.data;

    if (error) {
        displayError();
    } else {
        const randomGame = games[Math.floor(Math.random() * games.length)];
        const chosenGameDetails = randomGame.games;
        location.assign(`/game-detail/?id=${chosenGameDetails.id}`);
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

function displayCards(games, id) {
    cardHolder.innerHTML = '';

    for (const game_id of games) {
        const game = game_id.games;

        const gameEl = renderProfileGameCard(game, id);
        cardHolder.append(gameEl);
    }
}
