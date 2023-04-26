<script lang="ts">
    import { token, refreshToken } from '../stores';

    const logOut = () => {
        localStorage.removeItem('access-token');
        token.set(null);
        localStorage.removeItem('refresh-token');
        refreshToken.set(null);
    };
</script>

<button on:click={logOut} aria-label="log out">
    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
    </svg>
</button>

<style>
    button {
        padding: 0.5rem 0.25rem;
        transition: background-color 125ms, scale 175ms;
        border: 2px solid var(--spotify-green);
        border-radius: 0.5rem;
    }

    button svg {
        transition: stroke 125ms;
    }

    button:hover {
        background-color: var(--spotify-green);
    }

    button:active {
        scale: 0.9;
    }

    button:hover svg {
        stroke: var(--bg-primary);
    }
</style>
