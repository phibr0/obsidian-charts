<script>
    // Acknowledgements: https://svelte.dev/repl/a5f4d395b15a44d48a6b2239ef705fc4?version=3.35.0

    // based on suggestions from:
    // Inclusive Components by Heydon Pickering https://inclusive-components.design/collapsible-sections/
    export let headerText;

    let expanded = false
</script>

<div class="collapsible">
    <h3>
        <button aria-expanded={expanded} on:click={() => expanded = !expanded}>{headerText}
            <svg viewBox="0 0 20 20" fill="none" >
                <path class="vert" d="M10 1V19" stroke="black" stroke-width="2"/>
                <path d="M1 10L19 10" stroke="black" stroke-width="2"/>
            </svg>
        </button>
    </h3>

    <div class='contents' hidden={!expanded}>
        <slot></slot>
    </div>
</div>

<style>
    h3 {
        margin: 0;
    }

    button {
        display: flex;
        justify-content: space-between;
        width: 100%;
        border: none;
        margin: 0;
        padding: 1em 0.5em;
    }

    button {
        fill: currentColor;
    }

    svg {
        height: 0.7em;
        width: 0.7em;
    }
</style>