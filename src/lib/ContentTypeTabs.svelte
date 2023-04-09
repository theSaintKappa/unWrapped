<script lang="ts">
    import type { ContentType } from '../types';
    import { activeContentType } from '../stores';

    const setContentType = (contentType: ContentType) => {
        $activeContentType = contentType;
    };
</script>

<svelte:head>
    <title>unWrapped | top {$activeContentType}</title>
</svelte:head>

<div class="tabs {$activeContentType}">
    <button on:click={() => setContentType('tracks')} class:active={$activeContentType === 'artists'}>Tracks</button>
    <button on:click={() => setContentType('artists')} class:active={$activeContentType === 'tracks'}>Artists</button>
</div>

<style>
    .tabs {
        position: sticky;
        top: 1rem;
        backdrop-filter: blur(16px) brightness(0.85);
        z-index: 1;
        display: flex;
        border: 4px solid var(--spotify-green);
        border-radius: 4rem;
        box-shadow: inset 0 0 2px 2px var(--spotify-green);
    }

    .tabs::before {
        content: '';
        position: absolute;
        top: 0;
        width: 50%;
        height: 100%;
        background-color: var(--spotify-green);
        border-radius: 4rem;
        z-index: -1;
        transition: cubic-bezier(0.6, 0, 0.4, 1) 300ms;
    }

    .tabs.tracks::before {
        left: -0.5%;
    }
    .tabs.artists::before {
        left: 50.5%;
    }

    button {
        font-size: 1.4rem;
        padding: 0.75rem 1.75rem;
        color: var(--bg-primary);
        transition: color 200ms;
    }

    button.active {
        color: white;
    }
</style>
