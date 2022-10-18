export function renderGameCard(game) {
    const li = document.createElement('li');
    li.classList.add('gamecard');

    const a = document.createElement('a');
    a.href = `/game-detail/?id=${game.id}`;

    const h1 = document.createElement('h1');
    h1.classList.add('game-title');
    h1.textContent = game.title;

    const pcount = document.createElement('p');
    pcount.classList.add('player-range');
    pcount.textContent = `${game.min_players} to ${game.max_players}`;

    const ptype = document.createElement('ol');
    for (const type of game.type) {
        const typeEl = document.createElement('li');
        typeEl.textContent = type;
        typeEl.classList.add('game-type');
        ptype.append(typeEl);
    }

    const img = document.createElement('img');
    img.classList.add('game-box');
    img.src = game.image;

    a.append(h1, pcount, ptype, img);

    li.append(a);
    return li;
}

export function renderBigCard(game) {
    const div = document.createElement('div');

    const h1 = document.createElement('h1');
    h1.classList.add('game-title');
    h1.textContent = game.title;

    const pcount = document.createElement('p');
    pcount.classList.add('player-range');
    pcount.textContent = `${game.min_players} to ${game.max_players}`;

    const ptime = document.createElement('p');
    ptype.classList.add('time');
    pcount.textContent = `${game.time} minutes`;

    const pcomp = document.createElement('p');
    pcomp.classList.add('complexity');
    pcomp.textContent = game.complexity;

    if (game.rules === !null) {
        const rules = document.createElement('a');
        rules.classList.add('rules-link');
        rules.textContent = 'Rules Link';
        rules.href = game.rules;
    }

    const paest = document.createElement('p');
    paest.classList.add('aesthetic');
    paest.textContent = game.aesthetic;

    const ptype = document.createElement('ol');
    for (const type of game.type) {
        const typeEl = document.createElement('li');
        typeEl.textContent = type;
        typeEl.classList.add('game-type');
        ptype.append(typeEl);
    }

    const img = document.createElement('img');
    img.classList.add('game-box');
    img.src = game.image;
}
