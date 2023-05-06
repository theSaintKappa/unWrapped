<script lang="ts">
    import { code, appURI, clientId, accessToken, user, refreshToken } from './stores';
    import _refreshToken from './refreshToken';
    import Landing from './lib/Landing.svelte';
    import Content from './lib/Content.svelte';

    $: if ($code) getToken($code);

    async function getToken(code: string) {
        let codeVerifier = localStorage.getItem('code-verifier');

        let body = new URLSearchParams({
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: $appURI,
            client_id: $clientId,
            code_verifier: codeVerifier,
        });

        const res = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body,
        });
        if (res.status === 401) return _refreshToken();

        const data: AccessTokenResponse = await res.json();

        accessToken.set(data.access_token);
        refreshToken.set(data.refresh_token);

        localStorage.removeItem('code-verifier');
    }

    $: if ($accessToken) hello($accessToken);

    async function hello(token: string) {
        const res = await fetch('https://api.spotify.com/v1/me', {
            headers: { Authorization: 'Bearer ' + token },
        });
        if (res.status === 401) return _refreshToken();

        const data: UserPrivate = await res.json();

        $user = { displayName: data.display_name, avatar: data.images[0]?.url ?? null, url: data.external_urls.spotify };
    }
</script>

<main class:landing={!$accessToken}>
    {#if $accessToken !== null}
        <Content />
    {:else}
        <Landing />
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
