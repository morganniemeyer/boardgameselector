/* Imports */
// this will check if we have a user and set signout link if it exists
import '../auth/user.js';
import { uploadImage, gameToLibrary } from '../fetch-utils.js';
/* Get DOM Elements */
const errorDisplay = document.getElementById('error-display');
const form = document.getElementById('game-form');
const imageInput = document.getElementById('image-input');
const preview = document.getElementById('image-preview');
/* State */
let error = null;
/* Events */
imageInput.addEventListener('change', () => {
    const box = imageInput.files[0];
    if (box) {
        preview.src = URL.createObjectURL(box);
    } else {
        preview.src = '../assets/meeple.png';
    }
});

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    let url = null;
    const imageFile = formData.get('image-input');

    if (imageFile) {
        const randomFolder = Math.floor(Date.now() * Math.random());
        const imagePath = `post/${randomFolder}/${imageFile.name}`;
        url = await uploadImage('bucket2', imagePath, imageFile);
    }

    let game = {
        title: formData.get('title'),
        min_players: formData.get('min-players'),
        max_players: formData.get('max-players'),
        rules: formData.get('rules'),
        time: formData.get('time'),
        complexity: formData.get('complexity'),
        type: formData.getAll('game-type'),
        aesthetic: formData.get('aesthetic'),
        image: url,
    };

    const response = await gameToLibrary(game);
    error = response.error;

    if (error) {
        displayError();
    } else {
        location.assign('../');
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
