import { readable, writable } from 'svelte/store';

const APP_URI = `${location.protocol}//${location.host}${location.pathname}`;
const CLIENT_ID = '81d2121083774c79b9f34569b04e6551';
export const appURI = readable(APP_URI);
export const clientId = readable(CLIENT_ID);

function getCode() {
    const code = new URLSearchParams(window.location.search).get('code');
    history.pushState({}, null, APP_URI);
    return code ?? null;
}

export const code = readable(getCode());

export const accessToken = writable(localStorage.getItem('access-token') ?? null);
accessToken.subscribe((value) => {
    if (value) return localStorage.setItem('access-token', value);
    localStorage.removeItem('access-token');
});

export const refreshToken = writable(localStorage.getItem('refresh-token') ?? null);
refreshToken.subscribe((value) => {
    if (value) return localStorage.setItem('refresh-token', value);
    localStorage.removeItem('refresh-token');
});

export const user = writable<User>(null);

export const activeContentType = writable<ContentType>('tracks');
export const activeTimeRange = writable<TimeRange>('short_term');
