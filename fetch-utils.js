const SUPABASE_URL = 'https://xxthqkssauqxbvfqvxjw.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh4dGhxa3NzYXVxeGJ2ZnF2eGp3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjU3Njk2NzgsImV4cCI6MTk4MTM0NTY3OH0.Q87tH-nJiXpzJshzZkJhpTtywC-WdXx2KAOgieO-VT8';
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
