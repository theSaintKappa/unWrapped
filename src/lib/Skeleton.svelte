<script lang="ts">
    export let count = 1;
</script>

{#each Array(count) as _}
    <div />
{/each}

<style>
    div {
        aspect-ratio: 1;
        border-radius: 0.5rem;
        background-color: var(--bg-secondary);
    }
</style>
