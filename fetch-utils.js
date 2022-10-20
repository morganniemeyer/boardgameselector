const SUPABASE_URL = 'https://xxthqkssauqxbvfqvxjw.supabase.co';
const SUPABASE_KEY =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh4dGhxa3NzYXVxeGJ2ZnF2eGp3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjU3Njk2NzgsImV4cCI6MTk4MTM0NTY3OH0.Q87tH-nJiXpzJshzZkJhpTtywC-WdXx2KAOgieO-VT8';

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

/* Auth related functions */

export function getUser() {
    return client.auth.user();
}

export async function signUpUser(email, password) {
    return await client.auth.signUp({
        email,
        password,
    });
}

export async function signInUser(email, password) {
    return await client.auth.signIn({
        email,
        password,
    });
}

export async function signOutUser() {
    return await client.auth.signOut();
}

/* Data functions */

export async function uploadImage(bucketName, imagePath, imageFile) {
    const bucket = client.storage.from(bucketName);
    const response = await bucket.upload(imagePath, imageFile, {
        cacheControl: '3600',
        upsert: true,
    });

    if (response.error) {
        return null;
    }

    const url = `${SUPABASE_URL}/storage/v1/object/public/${response.data.Key}`;

    return url;
}

export async function upsertProfile(profile) {
    return await client.from('profiles').upsert(profile).single().eq('user_id', profile.user_id);
}
export async function getProfile(id) {
    return await client.from('profiles').select().eq('user_id', id).single();
}

export async function gameToLibrary(game, id) {
    return await client.from('games').upsert(game).single().eq('id', id);
}
export async function gameToPersonalLibrary(game) {
    return await client.from('user_lib').insert(game).single();
}

export async function deleteFromPersonalLibrary(game, id) {
    return await client.from('user_lib').delete().single().match({ game_id: game.id, user_id: id });
}

export async function getGames() {
    return await client.from('games').select('*');
}
export async function getPersonalGames(id) {
    return await client.from('user_lib').select('*, games (*)').eq('user_id', id);
}

export async function getGamesByQuery(title) {
    let query = client.from('games').select('*');

    if (title) {
        query = query.ilike('title', `%${title}%`);
    }

    const response = await query;
    return response;
}

export async function getSingleGame(id) {
    return await client.from('games').select().eq('id', id).single();
}
