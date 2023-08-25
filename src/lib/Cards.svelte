<script lang="ts">
    import { blur } from 'svelte/transition';
    import Skeleton from './Skeleton.svelte';
    export let cardsContent: Card[];
</script>

{#if cardsContent}
    {#each cardsContent as card, i}
        <a href={card.url} target="_blank" in:blur={{ delay: i * 20, duration: 350 }}>
            <figure data-index={`#${i + 1}`}>
                <img src={card.image} alt={card.caption} loading="lazy" decoding="async" />
                <figcaption>{card.caption}</figcaption>
            </figure>
        </a>
    {/each}
    <div class="back-to-top" in:blur={{ delay: cardsContent.length * 20, duration: 350 }}>
        <button on:click={() => window.scrollTo({ top: 0 })} aria-label="back to top">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path
                    d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM385 231c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-71-71V376c0 13.3-10.7 24-24 24s-24-10.7-24-24V193.9l-71 71c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9L239 119c9.4-9.4 24.6-9.4 33.9 0L385 231z"
                />
            </svg>
        </button>
    </div>
{:else}
    <Skeleton count={20} />
{/if}

<style>
    figure {
        position: relative;
        border-radius: 0.5rem;
        overflow: hidden;
        aspect-ratio: 1;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    figure::before {
        content: '';
        position: absolute;
        inset: 0;
        background-image: linear-gradient(to top, rgba(0, 0, 0, 0.8) 10%, transparent 60%);
    }

    figure::after {
        content: attr(data-index);
        font-family: GothamBlack;
        position: absolute;
        top: -0.2rem;
        left: 0.35rem;
        font-size: 1.75rem;
        -webkit-text-fill-color: rgba(255, 255, 255, 0.85);
        -webkit-text-stroke-width: 0.05em;
        -webkit-text-stroke-color: var(--bg-primary);
    }

    figure figcaption {
        position: absolute;
        left: 1rem;
        font-size: clamp(1rem, 2vw, 1.25rem);
        bottom: 0.5rem;
    }

    .back-to-top {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: var(--bg-secondary);
        border-radius: 0.5rem;
        aspect-ratio: 1;
        position: relative;
    }

    .back-to-top::after {
        content: 'Back to top';
        position: absolute;
        left: 1rem;
        font-size: clamp(1rem, 2vw, 1.25rem);
        bottom: 0.5rem;
    }

    .back-to-top > button {
        fill: var(--spotify-green);
        width: 50%;
        cursor: pointer;
        transition: scale 150ms ease;
    }

    .back-to-top > button:hover {
        scale: 1.1;
    }

    .back-to-top > button:active {
        scale: 1;
    }
</style>
