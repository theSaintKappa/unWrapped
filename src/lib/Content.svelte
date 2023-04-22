<script lang="ts">
    import { token, activeContentType, activeTimeRange } from '../stores';
    import Header from './Header.svelte';
    import User from './User.svelte';
    import TypeTabs from './ContentTypeTabs.svelte';
    import TimeRangeTabs from './TimeRangeTabs.svelte';
    import Cards from './Cards.svelte';
    import type { Content, ContentType, TimeRange } from '../types';

    let content: Content = { tracks: {}, artists: {} };
    const fetchContent = async (type: ContentType, timeRange: TimeRange) => {
        if (content[type][timeRange]) return;

        const response = await fetch(`https://api.spotify.com/v1/me/top/${type}?time_range=${timeRange}&limit=50`, {
            headers: { Authorization: 'Bearer ' + $token },
        });
        if (response.status === 401) {
            console.info('Token expired. Please log in again.');
            $token = null;
            localStorage.removeItem('access-token');
            return;
        }
        const data = await response.json();
        content[type][timeRange] = data.items.map((item: any) => {
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
<div class="grid">
    <Cards cardsContent={content[$activeContentType][$activeTimeRange]} />
</div>
<div class="time-range-tabs">
    <TimeRangeTabs />
</div>

<style>
    .grid {
        display: grid;
        margin: 2rem 0 5rem;
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        width: min(100% - 2rem, 1200px);
        grid-gap: 1rem;
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
