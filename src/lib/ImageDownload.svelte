<script lang="ts">
    import { toPng } from 'html-to-image';

    export let contentType: ContentType, timeRange: TimeRange, user: User;
    export let content: Card[];

    let imageContainer: HTMLDivElement;

    let downloadButtonContent = 'Download image';
    function downloadImage() {
        downloadButtonContent = 'Downloading...';

        toPng(imageContainer, { cacheBust: true, pixelRatio: 2, width: 1080, style: { transform: 'scale(1)' } })
            .then((dataUrl) => {
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
                }, 2500);
            })
            .catch((err) => {
                downloadButtonContent = 'Download failed';
                console.error(err);
            });
    }
    let imageString: string;
    $: imageString = `${user.displayName}'s top ${contentType} ${timeRange === 'long_term' ? 'of all time' : `in the last ${timeRange === 'medium_term' ? '6 months' : '4 weeks'}`}`;
</script>

<button on:click={downloadImage}>{downloadButtonContent}</button>

<div class="image-container" bind:this={imageContainer}>
    <div>
        <h1 style="font-size: {imageString.length < 50 ? 40 - (imageString.length - 40) : 40 - (imageString.length - 40) * 0.7}px;">{imageString}</h1>
        <div class="grid">
            {#each content as card, i}
                <figure data-index={`#${i + 1}`}>
                    <img src={card.image} alt={card.caption} />
                    <figcaption>{card.caption}</figcaption>
                </figure>
            {/each}
        </div>
        <h2>unwrapped.saintkappa.xyz</h2>
    </div>
</div>

<style>
    :root {
        --image-padding: 0.75rem;
    }

    .image-container {
        transform: scale(0) !important;
        pointer-events: none;
        position: absolute;
        top: 0;
        left: 0;
        padding: var(--image-padding);
    }

    .image-container > div {
        width: calc(1080px - 2 * var(--image-padding));
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: var(--image-padding);
    }

    h1,
    h2 {
        text-shadow: 4px 4px 4px black;
    }

    .grid {
        display: grid;
        gap: var(--image-padding);
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
        box-shadow: 4px 4px 4px black;
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
        font-size: 2rem;
        -webkit-text-fill-color: rgba(255, 255, 255, 0.85);
        -webkit-text-stroke-width: 0.05em;
        -webkit-text-stroke-color: var(--bg-primary);
        text-shadow: 4px 4px 2px black;
    }

    figure figcaption {
        position: absolute;
        left: 1rem;
        bottom: 0.5rem;
        font-size: 1.25rem;
        text-shadow: 4px 4px 2px black;
    }

    button {
        position: relative;
        display: flex;
        justify-content: center;
        margin-top: 0.25rem;
        transition: scale 125ms ease;
        color: #e1289f;
        filter: invert(1);
        /* color: var(--spotify-green); */
    }

    button::before {
        content: '';
        position: absolute;
        width: 102.5%;
        height: 35%;
        left: 0;
        bottom: 7.5%;
        transition: height 150ms ease;
        mix-blend-mode: difference;
        background-color: #e1289f;
        /* background-color: var(--spotify-green); */
    }

    button:hover::before {
        height: calc(100% - 4px);
    }
</style>
