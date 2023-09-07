<script lang="ts">
    import { slide } from "svelte/transition";
    import Folder from "./Folder.svelte";
    import type { TreeStructure } from "./treeTypes.js";
    import Button from "./Button.svelte";

    export let structure: TreeStructure;
    export let showFiles = false;
    export let folderSelected: undefined | string = undefined;
    export let fileSelected: undefined | string = undefined;
</script>

<div>
    {#each structure.folders as folder}
        <Folder {fileSelected} {folderSelected} name={folder.name} id={folder.id} folders={folder.folders} files={folder.files} {showFiles} on:folderClicked on:fileClicked />
    {/each}
</div>
{#if structure.files && showFiles}
    <div transition:slide>
        {#each structure.files as file}
            <div><Button selected={fileSelected} id={file.id} buttonType="file" on:fileClicked name={file.name} /></div>
        {/each}
    </div>
{/if}