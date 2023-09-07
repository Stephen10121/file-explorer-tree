<script lang="ts">
    import { draggable, dropzone } from "./dand.js";

    let zone1: any = {"test1": "test drag"};
    let zone2: any = {"test2": "test drag2"};
</script>
<div class="box box1" use:dropzone={{
    on_dropzone(data) {
        if (Object.keys(zone1).includes(data)) return;
        zone1[data] = zone2[data];
        delete zone2[data];
        zone1 = zone1;
        zone2 = zone2;
    },
}}>
    box1
    {#each Object.keys(zone1) as zone (zone)} 
        <button use:draggable={zone}>{zone1[zone]}</button>
    {/each}
</div>
<div class="box box2" use:dropzone={{
    on_dropzone(data) {
        if (Object.keys(zone2).includes(data)) return;
        zone2[data] = zone1[data];
        delete zone1[data];
        zone1 = zone1;
        zone2 = zone2;
    },
}}>
    box2
    {#each Object.keys(zone2) as zone (zone)} 
        <button use:draggable={zone}>{zone2[zone]}</button>
    {/each}
</div>

<style>
    .box {
        width: 300px;
        height: 300px;
        border: 1px solid black;
        padding: 5px;
    }

    .box:global(.droppable) {
        outline: 1px dashed black;
        /* outline-offset: 1px; */
    }
    .box:global(.droppable) * {
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
        margin: 2px 0 2px;
        display: block;
    }
</style>