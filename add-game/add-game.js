/* Imports */
// this will check if we have a user and set signout link if it exists
import '../auth/user.js';
import { uploadImage, gameToLibrary, getSingleGame } from '../fetch-utils.js';

/* Get DOM Elements */
const errorDisplay = document.getElementById('error-display');
const form = document.getElementById('game-form');
const imageInput = document.getElementById('image-input');
const preview = document.getElementById('image-preview');
const title = document.getElementById('title');
const minPlayer = document.getElementById('min-players');
const maxPlayer = document.getElementById('max-players');
const time = document.getElementById('time');
const complexity = document.getElementById('complexity');
const rules = document.getElementById('rules-link');
const aesthetic = document.getElementById('aesthetic');

/* State */
let error = null;
let game = {};
let boxArray = [];
let id = null;

/* Events */
// image input event listener
imageInput.addEventListener('change', () => {
    const box = imageInput.files[0];
    if (box) {
        preview.src = URL.createObjectURL(box);
    } else {
        preview.src = '../assets/meeple.png';
    }
});

// create game form
window.addEventListener('load', async () => {
    const searchParams = new URLSearchParams(location.search);
    id = searchParams.get('id');
    const response = await getSingleGame(id);
    error = response.error;
    game = response.data;

    if (error) {
        displayError();
    }

    for (let i = 6; i < 28; i++) {
        boxArray.push(form.elements[i]);
    }

    if (response) {
        title.value = game.title;
        minPlayer.value = game.min_players;
        maxPlayer.value = game.max_players;
        time.value = game.time;
        complexity.value = game.complexity;
        rules.value = game.rules;
        aesthetic.value = game.aesthetic;
        preview.src = game.image;

        for (const type of game.type) {
            for (const input of boxArray) {
                if (type === input.value) {
                    input.checked = true;
                }
            }
        }
    }
});

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    let url = null;
    const imageFile = formData.get('image-input');

    if (imageFile.size > 2) {
        const randomFolder = Math.floor(Date.now() * Math.random());
        const imagePath = `post/${randomFolder}/${imageFile.name}`;
        url = await uploadImage('bucket2', imagePath, imageFile);

        if (game.id) {
            game = {
                id: game.id,
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
            const response = await gameToLibrary(game, game.id);
            error = response.error;
        }
        if (!game.id) {
            let newGame = {
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

            const response = await gameToLibrary(newGame);
            error = response.error;
        }
    } else {
        if (game.id) {
            game = {
                id: game.id,
                title: formData.get('title'),
                min_players: formData.get('min-players'),
                max_players: formData.get('max-players'),
                rules: formData.get('rules'),
                time: formData.get('time'),
                complexity: formData.get('complexity'),
                type: formData.getAll('game-type'),
                aesthetic: formData.get('aesthetic'),
                image: game.image,
            };
            const response = await gameToLibrary(game, game.id);
            error = response.error;
        }
        if (!game.id) {
            let newGame = {
                title: formData.get('title'),
                min_players: formData.get('min-players'),
                max_players: formData.get('max-players'),
                rules: formData.get('rules'),
                time: formData.get('time'),
                complexity: formData.get('complexity'),
                type: formData.getAll('game-type'),
                aesthetic: formData.get('aesthetic'),
            };

            const response = await gameToLibrary(newGame);
            error = response.error;
        }
    }

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
