/* Imports */
// this will check if we have a user and set signout link if it exists
import '../auth/user.js';
import { uploadImage, gameToLibrary } from '../fetch-utils.js';
/* Get DOM Elements */

/* State */

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
    const imageFile = formData.get('image');

    if (imageFile) {
        const randomFolder = Math.floor(Date.now() * Math.random());
        const imagePath = `post/${randomFolder}/${imageFile.name}`;
        url = await uploadImage('bucket2', imagePath, imageFile);
    }
    let game = {
        title: formData.get('title'),
        min_players: formData.get('min-players'),
        max_players: formData.get('max-players'),
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
