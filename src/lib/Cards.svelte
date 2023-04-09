<script lang="ts">
    import Skeleton from './Skeleton.svelte';
    import type { Card } from '../types';
    export let cardsContent: Card[] = [];
</script>

{#if cardsContent}
    {#each cardsContent as card, i}
        <a href={card.url} target="_blank">
            <figure data-index={`#${i + 1}`}>
                <img src={card.image} alt={card.caption} />
                <figcaption>{card.caption}</figcaption>
            </figure>
        </a>
    {/each}
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
        position: absolute;
        top: -0.1rem;
        left: 0.3rem;
        font-size: 2rem;
        -webkit-text-fill-color: rgba(255, 255, 255, 0.85);
        -webkit-text-stroke-width: 0.05em;
        -webkit-text-stroke-color: var(--bg-primary);
    }

    figure figcaption {
        position: absolute;
        left: 1rem;
        bottom: 0.5rem;
    }
</style>
