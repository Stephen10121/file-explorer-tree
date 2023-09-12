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
    {#each Object.keys(structure) as folder}
        {#if folder!=="G_files"}
            <Folder {fileSelected} {folderSelected} name={folder} id={folder} folders={structure[folder]} files={structure[folder].G_files} {showFiles} on:folderClicked on:fileClicked on:dragAction />
        {/if}
    {/each}
</div>
{#if structure.G_files && showFiles}
    <div transition:slide>
        {#each structure.G_files as file}
            <div>
                <Button selected={fileSelected} id={file.name} buttonType="file" on:fileClicked name={file.name} on:dragAction />
            </div>
        {/each}
    </div>
{/if}