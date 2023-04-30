<script lang="ts">
    import { token, activeContentType, activeTimeRange, user } from '../stores';
    import _refreshToken from '../refreshToken';
    import Header from './Header.svelte';
    import User from './User.svelte';
    import TypeTabs from './ContentTypeTabs.svelte';
    import DownloadImage from './DownloadImage.svelte';
    import Cards from './Cards.svelte';
    import TimeRangeTabs from './TimeRangeTabs.svelte';
    import type { Content, ContentType, TimeRange } from '../types';

    let content: Content = { tracks: {}, artists: {} };
    const fetchContent = async (type: ContentType, timeRange: TimeRange) => {
        if (content[type][timeRange]) return;

        window.scrollTo({ top: 0 });

        const data = await fetch(`https://api.spotify.com/v1/me/top/${type}?time_range=${timeRange}&limit=50`, {
            headers: { Authorization: 'Bearer ' + $token },
        }).then((res) => {
            if (res.status === 401) return _refreshToken();
            return res.json();
        });

        content[type][timeRange] = data?.items.map((item: any) => {
            return {
                caption: item.name,
                image: item.type === 'artist' ? item.images[0]?.url ?? './artist-empty.svg' : item.album.images[0]?.url ?? './track-empty.svg',
                url: item.external_urls.spotify,
            };
        });
    };

    $: fetchContent($activeContentType, $activeTimeRange);
</script>

<Header />
<User />
<TypeTabs />
{#if content[$activeContentType][$activeTimeRange]}
    <DownloadImage contentType={$activeContentType} timeRange={$activeTimeRange} user={$user} content={content[$activeContentType][$activeTimeRange].slice(0, 12)} />
{/if}
<div class="grid">
    <Cards cardsContent={content[$activeContentType][$activeTimeRange]} />
</div>
<div class="time-range-tabs">
    <TimeRangeTabs />
</div>

<style>
    .grid {
        display: grid;
        margin: 1rem 0 5rem;
        grid-template-columns: repeat(auto-fill, minmax(225px, 1fr));
        width: min(100% - 2rem, 1200px);
        gap: 0.75rem;
    }

    @media screen and (max-width: 600px) {
        .grid {
            grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
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
