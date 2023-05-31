<script lang="ts">
    import { accessToken, activeContentType, activeTimeRange, user } from '../stores';
    import _refreshToken from '../refreshToken';
    import Header from './Header.svelte';
    import User from './User.svelte';
    import TypeTabs from './ContentTypeTabs.svelte';
    import ImageDownload from './ImageDownload.svelte';
    import Cards from './Cards.svelte';
    import TimeRangeTabs from './TimeRangeTabs.svelte';

    let randomKey = 0;

    const urlParams = [`&offset=0&limit=49`, `&offset=49&limit=50`] as const;

    let content: Content = { tracks: {}, artists: {} };
    async function fetchContent(type: ContentType, timeRange: TimeRange) {
        window.scrollTo({ top: 0 });
        randomKey = Math.random();

        if (content[type][timeRange]) return;

        const res: UsersTopResponse[] = await Promise.all(
            urlParams.map((params) =>
                fetch(`https://api.spotify.com/v1/me/top/${type}?time_range=${timeRange}${params}`, { headers: { Authorization: 'Bearer ' + $accessToken } }).then((res) => {
                    if (res.status === 401) return _refreshToken();
                    return res.json();
                })
            )
        );

        if (!res[0] || !res[1]) return;

        const data = [...res[0]?.items, ...res[1]?.items];

        content[type][timeRange] = data.map((item: UsersTopItem) => {
            return {
                caption: item.name,
                image: item.type === 'artist' ? item.images[0]?.url ?? './artist-empty.svg' : item.album.images[0]?.url ?? './track-empty.svg',
                url: item.external_urls.spotify,
            };
        });
    }

    $: if ($accessToken) fetchContent($activeContentType, $activeTimeRange);
</script>

<Header />
<!-- <User /> -->
<TypeTabs />
{#if content[$activeContentType][$activeTimeRange] && $user}
    <ImageDownload contentType={$activeContentType} timeRange={$activeTimeRange} user={$user} content={content[$activeContentType][$activeTimeRange].slice(0, 12)} />
{/if}
<div class="grid">
    {#key randomKey}
        <Cards cardsContent={content[$activeContentType][$activeTimeRange]} />
    {/key}
</div>
<div class="time-range-tabs">
    <TimeRangeTabs />
</div>

<style>
    .grid {
        display: grid;
        margin: 1rem 0 5rem;
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        width: min(100% - 2rem, 1200px);
        gap: 0.75rem;
        transition: gap 250ms;
    }

    @media screen and (max-width: 650px) {
        .grid {
            grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
            gap: 0.5rem;
        }
    }

    .time-range-tabs {
        position: fixed;
        width: 100vw;
        display: flex;
        justify-content: center;
        background-image: linear-gradient(to top, rgba(0, 0, 0, 0.8) 30%, rgba(0, 0, 0, 0.4) 65%, transparent 100%);
        bottom: 0;
        padding-bottom: 1rem;
    }
</style>
