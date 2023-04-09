<script lang="ts">
    import { appUri, clientId } from '../stores';

    const SCOPE = 'user-read-private user-read-email user-top-read';
    const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    const generateRandomString = (length: number) => {
        const randomBytes = new Uint8Array(length);
        window.crypto.getRandomValues(randomBytes);

        return Array.from(randomBytes, (byte) => CHARACTERS[byte % CHARACTERS.length]).join('');
    };

    const generateCodeChallenge = async (codeVerifier: string) => {
        const data = new TextEncoder().encode(codeVerifier);
        const digest = await window.crypto.subtle.digest('SHA-256', data);

        return btoa(String.fromCharCode.apply(null, new Uint8Array(digest)))
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=+$/, '');
    };

    const logIn = async () => {
        const codeVerifier = generateRandomString(128);
        const state = generateRandomString(16);
        const codeChallenge = await generateCodeChallenge(codeVerifier);

        localStorage.setItem('code-verifier', codeVerifier);

        let args = new URLSearchParams({
            response_type: 'code',
            client_id: $clientId,
            scope: SCOPE,
            redirect_uri: $appUri,
            state,
            code_challenge_method: 'S256',
            code_challenge: codeChallenge,
        });

        window.location.href = 'https://accounts.spotify.com/authorize?' + args;
    };
</script>

<button on:click={logIn}>Login with Spotify</button>

<style>
    button {
        padding: 1rem 1.15rem;
        transition: transform 125ms, box-shadow 200ms;
        border: 2px solid var(--spotify-green);
        border-radius: 0.5rem;
    }

    button:hover {
        transform: scale(1.15);
        box-shadow: 0 0 75px var(--spotify-green);
    }

    button:active {
        box-shadow: none;
        transform: scale(0.95);
    }
</style>
