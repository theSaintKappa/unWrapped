<script lang="ts">
    import { activeContentType } from '../stores';

    const setContentType = (contentType: ContentType) => {
        $activeContentType = contentType;
    };
</script>

<nav class={$activeContentType}>
    <button on:click={() => setContentType('tracks')} class:active={$activeContentType === 'artists'}>Tracks</button>
    <button on:click={() => setContentType('artists')} class:active={$activeContentType === 'tracks'}>Artists</button>
</nav>

<style>
    nav {
        position: sticky;
        top: 1rem;
        backdrop-filter: blur(20px) brightness(0.9);
        z-index: 1;
        display: flex;
        border: 4px solid var(--spotify-green);
        border-radius: 4rem;
        box-shadow: inset 0 0 2px 2px var(--spotify-green);
    }

    nav::before {
        content: '';
        position: absolute;
        top: 0;
        width: 50%;
        height: 100%;
        background-color: var(--spotify-green);
        border-radius: 4rem;
        z-index: -1;
        transition: left cubic-bezier(0.65, 0, 0.35, 1) 200ms;
    }

    nav.tracks::before {
        left: -0.5%;
    }
    nav.artists::before {
        left: 50.5%;
    }

    button {
        font-family: GothamBlack;
        font-size: 1.75rem;
        padding: 0.75rem 1.5rem;
        color: var(--bg-primary);
        transition: color 200ms;
    }

    button.active {
        color: white;
    }
</style>
