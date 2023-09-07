<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import { draggable, dropzone } from "./dand.js";
    import { currentDragged } from "./store.js";

    export let buttonType: "file" | "folder";
    export let selected: string | undefined;
    export let id: string;
    export let name: string;
    export let parents: string[] = [];

    const dispatch = createEventDispatcher();

    $: data = {
        on_dropzone(data: string) {
            console.log(`Placing ${data} into ${id}`);
        },
        parents
    }
</script>

<div class="button" use:dropzone={data}>
    <button class="{selected===id ? "selected" : ""}" on:click={() => dispatch(buttonType==="file" ? "fileClicked" : "folderClicked", id)} use:draggable={{id, currentDrag(id) {
        $currentDragged = id
    },}}>{name}</button>
</div>

<style>
    .button {
        display: flex;
        /* background-color: red; */
        padding: 4px;
        border-radius: 100vw;
    }

    .button:global(.droppable) {
        outline: 1px dashed black;
        outline-offset: -1px;
    }

    .button:global(.droppable) * {
        pointer-events: none;
    }

    button {
        border: 1px solid black;
        font-family: sans-serif;
        font-weight: bold;
        background: none;
        padding: 5px 7px;
        cursor: pointer;
        border-radius: 100vw;
        display: block;
    }

    button.selected {
        background-color: #dfdfdf;
    }
</style>