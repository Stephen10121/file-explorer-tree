<script lang="ts">
    import { createEventDispatcher } from "svelte";

    export let buttonType: "file" | "folder";
    export let selected: string | undefined;
    export let id: string;
    export let name: string;

    const dispatch = createEventDispatcher();
</script>

<button class="{selected===id ? "selected" : ""}" on:click={() => dispatch(buttonType==="file" ? "fileClicked" : "folderClicked", id)}>{name}</button>

<style>
    button {
        border: 1px solid black;
        font-family: sans-serif;
        font-weight: bold;
        background: none;
        padding: 5px 7px;
        cursor: pointer;
        border-radius: 100vw;
        margin: 2px 0 2px;
        display: block;
    }

    button.selected {
        background-color: #dfdfdf;
    }
</style>