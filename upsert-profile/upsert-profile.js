/* Imports */
// this will check if we have a user and set signout link if it exists
import '../auth/user.js';
import { uploadImage, upsertProfile } from '../fetch-utils.js';

/* Get DOM Elements */
const preview = document.getElementById('image-preview');
const errorDisplay = document.getElementById('error-display');
const imageInput = document.getElementById('image-input');
const form = document.querySelector('form');

/* State */
let error = null;

/* Events */
imageInput.addEventListener('change', () => {
    const avatar = imageInput.files[0];
    if (avatar) {
        preview.src = URL.createObjectURL(avatar);
    } else {
        preview.src = '/assets/default.jpg';
    }
});

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    let url = null;
    const imageFile = formData.get('form');

    if (imageFile) {
        const randomFolder = Math.floor(Date.now() * Math.random());
        const imagePath = `post/${randomFolder}/${imageFile.name}`;
        url = await uploadImage('bucket1', imagePath, imageFile);
    }

    let profile = {
        user_name: formData.get('user_name'),
        bio: formData.get('bio'),
        avatar: url,
        favorite: formData.get('favorite'),
    };

    const response = await upsertProfile(profile);
    error = response.error;

    if (error) {
        displayError();
    } else {
        location.assign('../profile/index.html');
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
