<script lang="ts">
    import { fade } from 'svelte/transition';
    import * as htmlToImage from 'html-to-image';
    import type { ContentType, TimeRange, User, Card } from '../types';

    export let contentType: ContentType, timeRange: TimeRange, user: User;
    export let content: Card[];

    let imageElement: HTMLElement;

    let downloadButtonContent = 'Download image';
    function downloadImage() {
        downloadButtonContent = 'Downloading...';

        const asd = document.querySelector('.image-wrapper') as HTMLElement;
        asd.style.display = 'block';

        htmlToImage
            .toPng(imageElement, { cacheBust: true, preferredFontFormat: 'woff2', width: 1080, quality: 1 })
            .then((dataUrl) => {
                asd.style.display = 'none';
                const link = document.createElement('a');
                // prettier-ignore
                const username = user.displayName.match(/[a-z0-9]/gi).join('').toLowerCase() || 'unwrapped';
                link.download = `${username}-${contentType}-${timeRange}.png`;
                link.href = dataUrl;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                downloadButtonContent = 'Downloaded successfully!';
                setTimeout(() => {
                    downloadButtonContent = 'Download image';
                }, 2000);
            })
            .catch((err) => {
                downloadButtonContent = 'Download failed';
                console.error(err);
            });
    }
</script>

{#key downloadButtonContent}
    <button on:click={downloadImage} in:fade={{ duration: 100 }}>{downloadButtonContent}</button>
{/key}

<div class="image-wrapper">
    <div class="image" bind:this={imageElement}>
        <h1>{`${user.displayName}'s top ${contentType} ${timeRange === 'long_term' ? 'of all time' : `in the last ${timeRange === 'medium_term' ? '6 months' : '4 weeks'}`}`}</h1>
        <div class="grid">
            {#each content as card, i}
                <figure data-index={`#${i + 1}`}>
                    <img src={card.image} alt={card.caption} />
                    <figcaption>{card.caption}</figcaption>
                </figure>
            {/each}
        </div>
    </div>
</div>

<style>
    .image-wrapper {
        display: none;
    }

    .image {
        display: flex;
        width: 1080px;
        /* background-color: #191414; */
        flex-direction: column;
        align-items: center;
        gap: 1rem;
    }

    h1 {
        font-size: 3rem;
    }

    .grid {
        display: grid;
        /* gap: ; */
        grid-template-columns: repeat(4, 1fr);
    }

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
        top: -0.15rem;
        left: 0.3rem;
        font-size: 1.5rem;
        -webkit-text-fill-color: rgba(255, 255, 255, 0.85);
        -webkit-text-stroke-width: 0.05em;
        -webkit-text-stroke-color: var(--bg-primary);
    }

    figure figcaption {
        position: absolute;
        left: 1rem;
        bottom: 0.5rem;
    }

    button {
        position: relative;
        display: flex;
        justify-content: center;
        margin-top: 0.25rem;

        /* color: var(--spotify-green); */

        color: #e1289f;
        filter: invert(1);
        transition: scale 125ms ease;
    }

    button::before {
        content: '';
        position: absolute;
        width: 102.5%;
        height: 30%;
        bottom: 1px;
        transition: height 125ms ease;
        mix-blend-mode: difference;

        /* background-color: var(--spotify-green); */

        background-color: #e1289f;
    }

    button:hover::before {
        height: calc(100% - 5px);
    }
</style>
