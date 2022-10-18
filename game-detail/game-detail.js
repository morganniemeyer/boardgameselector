/* Imports */
// this will check if we have a user and set signout link if it exists
import '../auth/user.js';
import { getSingleGame } from '../fetch-utils.js';
import { renderBigCard } from '../render-utils.js';

/* Get DOM Elements */
const errorDisplay = document.getElementById('error-display');

/* State */
let error = null;
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
        renderBigCard(game);
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
