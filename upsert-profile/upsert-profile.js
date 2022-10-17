/* Imports */
// this will check if we have a user and set signout link if it exists
import './auth/user.js';

/* Get DOM Elements */
const preview = document.getElementById('image-preview');
const errorDisplay = document.getElementById('error-display');
const imageInput = document.getElementById('image-input');

/* State */
let error = null;
let profile = null;

/* Events */
imageInput.addEventListener('change', () => {
    const avatar = imageInput.files[0];
    if (avatar) {
        preview.src = URL.createObjectURL(avatar);
    } else {
        preview.src = '/assets/default.jpg';
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
