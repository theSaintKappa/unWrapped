import { get } from 'svelte/store';
import { accessToken, clientId, refreshToken } from './stores';

export default async function _refreshToken() {
    if (!get(refreshToken)) {
        accessToken.set(null);
        refreshToken.set(null);
        return;
    }

    const body = new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: get(refreshToken),
        client_id: get(clientId),
    });

    // Reminder: token is empty string while it's refreshing and null when not authenticated
    accessToken.set('');
    refreshToken.set('');

    await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body,
    }).then(async (res) => {
        const data: AccessTokenResponse = await res.json();

        if (!res.ok) {
            console.error('Failed to fetch refresh token', data);
            accessToken.set(null);
            refreshToken.set(null);
            return;
        }

        console.log('Fetched refresh token');

        accessToken.set(data.access_token);
        refreshToken.set(data.refresh_token);
    });
}
