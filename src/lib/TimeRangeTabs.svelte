<script lang="ts">
    import { activeTimeRange } from '../stores';

    const setTimeRange = (timeRange: TimeRange) => {
        $activeTimeRange = timeRange;
    };
</script>

<div>
    <button on:click={() => setTimeRange('short_term')} class:active={$activeTimeRange === 'short_term'}>4 weeks</button>
    <button on:click={() => setTimeRange('medium_term')} class:active={$activeTimeRange === 'medium_term'}>6 months</button>
    <button on:click={() => setTimeRange('long_term')} class:active={$activeTimeRange === 'long_term'}>lifetime</button>
</div>

<style>
    div {
        display: flex;
        gap: 2rem;
    }

    button {
        font-family: GothamBlack;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: clamp(1rem, 5.5vw, 2rem);
    }

    button::before {
        content: '';
        position: absolute;
        width: 0;
        height: 0.2rem;
        bottom: -3px;
        background-color: var(--spotify-green);
        transition: ease 300ms;
    }

    button.active::before {
        width: 115%;
    }
</style>
