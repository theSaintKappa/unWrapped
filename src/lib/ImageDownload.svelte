<script lang="ts">
    import { toPng } from 'html-to-image';
    import { FastAverageColor } from 'fast-average-color';

    export let contentType: ContentType, timeRange: TimeRange, user: User;
    export let content: Card[];

    let imageContainer: HTMLDivElement;

    let downloadButtonContent = 'Download image';
    function downloadImage() {
        downloadButtonContent = 'Downloading...';

        toPng(imageContainer, { cacheBust: true, pixelRatio: 1.5, width: 1080, style: { transform: 'scale(1)' } })
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

    const fac = new FastAverageColor();
    let pfpAverageColor = 'white';
    (async () => {
        await fac.getColorAsync(user.avatar).then((color) => {
            pfpAverageColor = color.rgba;
        });
    })();

    const timeRanges = {
        long_term: 'of all time',
        medium_term: 'in the last 6 months',
        short_term: 'in the last 4 weeks',
    } as const;
</script>

<button on:click={downloadImage}>{downloadButtonContent}</button>

<div class="image-container" bind:this={imageContainer} style="--avg-color: {pfpAverageColor};">
    <div>
        <h1>top {contentType} {timeRanges[timeRange]}</h1>
        <div class="grid">
            {#each content as card, i}
                <figure data-index={i + 1}>
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
        --border-radius: 1.15rem;
    }

    .image-container {
        transform: scale(0) !important;
        pointer-events: none;
        background-color: var(--bg-primary);
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
        font-family: GothamBlack, sans-serif;
        margin: 0.5rem;
        line-height: 1;
        text-shadow: 4px 4px 4px black;
    }

    h1 {
        font-size: 4.1rem;
    }

    h2 {
        font-size: 1.75rem;
    }

    .grid {
        display: grid;
        gap: var(--image-padding);
        grid-template-columns: repeat(4, 1fr);
    }

    figure {
        position: relative;
        aspect-ratio: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        box-shadow: 4px 4px 4px black;
        border-radius: var(--border-radius);
    }

    figure img {
        border-radius: var(--border-radius);
    }

    figure::before {
        content: '';
        position: absolute;
        inset: 0;
        border-radius: var(--border-radius);
        background-image: linear-gradient(to top, rgba(0, 0, 0, 0.8) 10%, transparent 60%);
    }

    figure::after {
        content: attr(data-index);
        position: absolute;
        font-family: GothamBlack;
        background-color: var(--avg-color);
        border-radius: 50%;
        border: 4px solid var(--bg-primary);
        width: 50px;
        aspect-ratio: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        top: -0.75rem;
        left: -0.75rem;
        font-size: 2rem;
        color: rgba(255, 255, 255, 0.85);
        -webkit-text-stroke: 0.075em var(--bg-primary);
    }

    figure figcaption {
        position: absolute;
        left: 0.75rem;
        bottom: 0.5rem;
        font-size: 1rem;
        text-shadow: 3px 3px 3px black;
    }

    button {
        position: relative;
        display: flex;
        justify-content: center;
        margin-top: 0.25rem;
        transition: scale 125ms ease;
        color: #e1289f;
        filter: invert(1);
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
    }

    button:hover::before {
        height: calc(100% - 4px);
    }
</style>
