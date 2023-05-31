<script lang="ts">
    import { user } from '../stores';
    import { blur } from 'svelte/transition';

    let dropdownOpen = false;
</script>

{#if $user}
    <!-- <button in:blur on:focus={() => (dropdownOpen = true)} on:blur={() => (dropdownOpen = false)}>
        <img src={$user.avatar} alt={$user.displayName} title={$user.displayName} />
    </button>
    <div class="dropdown" class:active={dropdownOpen}>
        <button on:focus={() => (dropdownOpen = true)} on:blur={() => (dropdownOpen = false)}>Log out</button>
    </div> -->
    <div class="dropdown">
        <button on:click={() => (dropdownOpen = !dropdownOpen)} class="profile">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class:active={dropdownOpen}>
                <path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z" />
            </svg>
            <img src={$user.avatar} alt={$user.displayName} />
        </button>

        <div class:active={dropdownOpen} class="dropdown-menu">
            <button>Log out</button>
            <button>Download image</button>
        </div>
    </div>
{/if}

<style>
    .dropdown {
        position: relative;
    }

    .dropdown-menu {
        position: absolute;
        display: flex;
        flex-direction: column;
        right: 1rem;
        z-index: 2;
        top: calc(100% + 4px);
        background-color: #212121;
        border-radius: 0.5rem;
        box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.1);
        opacity: 0;
        pointer-events: none;
        transform: translateY(-15px);
        transition: opacity 150ms, transform 200ms;
    }

    .dropdown-menu.active {
        opacity: 1;
        transform: translateY(0);
        pointer-events: auto;
    }

    .dropdown-menu button {
        padding: 0.75rem;
        border-radius: 0.5rem;
        white-space: nowrap;
    }

    .dropdown-menu button:hover {
        background-color: #333;
    }

    .profile {
        display: flex;
        align-items: center;
        background-color: #212121;
        border-radius: 1000px;
        height: 65px;
        overflow: hidden;
        padding: 4px;
    }

    img {
        border-radius: 50%;
        border: 4px solid var(--bg-secondary);
        height: 100%;
    }

    svg {
        fill: var(--spotify-green);
        height: 95%;
        margin: 12px;
        transition: transform 200ms ease-in-out;
    }

    svg path {
        transform: translateY(-10px);
    }

    svg.active {
        transform: rotate(180deg);
    }
</style>
