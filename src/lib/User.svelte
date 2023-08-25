<script lang="ts">
    import { blur } from 'svelte/transition';
    import { user } from '../stores';
</script>

{#if $user}
    <div in:blur>
        <a href={$user.url} target="_blank"><img src={$user.avatar} alt={$user.displayName} title={$user.displayName} /></a>
    </div>
{/if}

<style>
    div {
        position: fixed;
        right: 0;
        margin: 1rem;
        border: 4px solid;
        border-color: var(--bg-secondary);
        border-radius: 50%;
        transition: border-color 100ms;
        cursor: pointer;
    }
    div:hover {
        border-color: #212121;
    }
    img {
        border-radius: 50%;
        width: 60px;
    }

    @media screen and (max-width: 750px) {
        div {
            display: none;
        }
    }
</style>
