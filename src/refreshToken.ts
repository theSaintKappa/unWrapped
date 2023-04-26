import { get } from 'svelte/store';
import { clientId, token, refreshToken } from './stores';

export default async function _refreshToken() {
    console.log('Refreshing token...');

    const body = new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: get(refreshToken),
        client_id: get(clientId),
    });

    try {
        const data = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body,
        }).then((res) => res.json());

        token.set(data.access_token);

        refreshToken.set(data.refresh_token);
    } catch (err) {
        console.error('Error when fetching refresh token: ', err);
    }
}
