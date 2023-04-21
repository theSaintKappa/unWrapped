<script lang="ts">
    export let count = 1;
</script>

{#each Array(count) as _, i}
    <div style="animation-delay: {i * 75}ms;" />
{/each}

<style>
    div {
        aspect-ratio: 1;
        border-radius: 0.5rem;
        background-color: var(--bg-secondary);
        animation: pulse 1.75s infinite ease-in-out;
    }

    @keyframes pulse {
        from,
        to {
            filter: brightness(1);
        }
        50% {
            filter: brightness(0.6);
        }
    }
</style>
