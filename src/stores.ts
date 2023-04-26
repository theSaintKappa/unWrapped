import { readable, writable } from 'svelte/store';
import type { ContentType, TimeRange, User } from './types';

const APP_URI = `${location.protocol}//${location.host}${location.pathname}`;
const CLIENT_ID = '81d2121083774c79b9f34569b04e6551';
export const appUri = readable(APP_URI);
export const clientId = readable(CLIENT_ID);

const getCode = () => {
    const code = new URLSearchParams(window.location.search).get('code');
    history.pushState({}, null, APP_URI);
    return code ?? null;
};

export const code = writable(getCode());

export const token = writable(localStorage.getItem('access-token') ?? null);
token.subscribe((value) => {
    if (value) localStorage.setItem('access-token', value);
});

export const refreshToken = writable(localStorage.getItem('refresh-token') ?? null);
refreshToken.subscribe((value) => {
    if (value) localStorage.setItem('refresh-token', value);
});

export const user = writable<User>(null);

export const activeContentType = writable<ContentType>('tracks');
export const activeTimeRange = writable<TimeRange>('short_term');
