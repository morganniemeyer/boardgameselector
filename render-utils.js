export function renderGameCard(game) {
    const li = document.createElement('li');
    li.classList.add('gamecard');

    const h1 = document.createElement('h1');
    h1.classList.add('game-title');
    h1.textContent = game.title;

    const pcount = document.createElement('p');
    pcount.classList.add('player-range');
    pcount.textContent = `${game.min_players} to ${game.max_players}`;

    const ptype = document.createElement('p');
    ptype.classList.add('game-type');
    ptype.textContent = game.type;

    const img = document.createElement('img');
    img.classList.add('game-box');
    img.src = game.image;

    li.append(h1, pcount, ptype, img);
    return li;
}