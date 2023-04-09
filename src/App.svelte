<script lang="ts">
    import { code, appUri, clientId, token } from './stores';
    import Landing from './lib/Landing.svelte';
    import Content from './lib/Content.svelte';

    $: $code && getToken($code);

    const getToken = async (code: string) => {
        let codeVerifier = localStorage.getItem('code-verifier');

        let body = new URLSearchParams({
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: $appUri,
            client_id: $clientId,
            code_verifier: codeVerifier,
        });

        const response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body,
        });
        const data = await response.json();
        localStorage.setItem('access-token', data.access_token);
        $token = data.access_token;
    };

    $: $token && hello($token);

    const hello = async (token: string) => {
        const response = await fetch('https://api.spotify.com/v1/me', {
            headers: { Authorization: 'Bearer ' + token },
        });
        if (!response.ok) {
            console.info('Token expired. Please log in again.');
            $token = null;
            localStorage.removeItem('access-token');
            return;
        }
        const data = await response.json();
        console.log(`Hello, ${data.display_name}!`);
    };
</script>

<main class:landing={!$token}>
    {#if !$token}
        <Landing />
    {:else}
        <Content />
    {/if}
</main>

<style>
    main {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    main.landing {
        justify-content: center;
    }
</style>
