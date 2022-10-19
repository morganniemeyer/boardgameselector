/* Imports */
// this will check if we have a user and set signout link if it exists
import '../auth/user.js';
import { getProfile, getUser } from '../fetch-utils.js';
import { renderProfile } from '../render-utils.js';

/* Get DOM Elements */
const errorDisplay = document.getElementById('error-display');
const profileDisplay = document.getElementById('user-display');

// /* State */
let error = null;
let profile = null;

// /* Events */
window.addEventListener('load', async () => {
    const userData = getUser();
    const id = userData.id;
    const response = await getProfile(id);

    error = response.error;
    profile = response.data;

    if (error) {
        displayError();
    } else {
        displayProfile(profile);
    }
})
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