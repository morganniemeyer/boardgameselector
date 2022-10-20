/* Imports */
// this will check if we have a user and set signout link if it exists
import '../auth/user.js';
import { uploadImage, upsertProfile, getUser, getProfile } from '../fetch-utils.js';

/* Get DOM Elements */
const preview = document.getElementById('image-preview');
const errorDisplay = document.getElementById('error-display');
const imageInput = document.getElementById('image-input');
const form = document.querySelector('form');
const userText = document.getElementById('user-name');
const bio = document.getElementById('bio');
const favorite = document.getElementById('favorite');

/* State */
let error = null;
let profile = {};

/* Events */
// window load form updates EL
window.addEventListener('load', async () => {
    const userData = getUser();
    const id = userData.id;
    const response = await getProfile(id);
    profile = response.data;
    if (response) {
        userText.value = profile.user_name;
        bio.value = profile.bio;
        favorite.value = profile.favorite;

        if (profile.avatar.length > 95) {
            preview.src = profile.avatar;
        }
    }
});

// image preview event listener
imageInput.addEventListener('change', () => {
    const avatar = imageInput.files[0];
    if (avatar) {
        preview.src = URL.createObjectURL(avatar);
    } else {
        preview.src = '/assets/default.jpg';
    }
});

//profile upsert form submission
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    let url = null;
    const imageFile = formData.get('image');

    if (imageFile.size > 2) {
        const randomFolder = Math.floor(Date.now() * Math.random());
        const imagePath = `post/${randomFolder}/${imageFile.name}`;
        url = await uploadImage('bucket1', imagePath, imageFile);

        profile = {
            user_name: formData.get('user_name'),
            bio: formData.get('bio'),
            avatar: url,
            favorite: formData.get('favorite'),
        };
    } else {
        profile = {
            user_name: formData.get('user_name'),
            bio: formData.get('bio'),
            favorite: formData.get('favorite'),
        };
    }

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
