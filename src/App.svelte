<script lang="ts">
    import { code, appUri, clientId, token, user, refreshToken } from './stores';
    import _refreshToken from './refreshToken';
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

        const data = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body,
        }).then((res) => {
            if (res.status === 401) return _refreshToken();
            return res.json();
        });

        token.set(data.access_token);
        refreshToken.set(data.refresh_token);

        localStorage.removeItem('code-verifier');
    };

    $: $token && hello($token);

    const hello = async (token: string) => {
        const data = await fetch('https://api.spotify.com/v1/me', {
            headers: { Authorization: 'Bearer ' + token },
        }).then((res) => {
            if (res.status === 401) return _refreshToken();
            return res.json();
        });

        $user = { displayName: data.display_name, avatar: data.images[0]?.url ?? null, url: data.external_urls.spotify };
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
