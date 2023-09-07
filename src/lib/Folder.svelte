<script lang="ts">
    import type { AFile, FolderType } from "./treeTypes.js";
    import { slide } from 'svelte/transition';
    import triangle from "../assets/triangle.svg";
    import Button from "./Button.svelte";

    export let name: string;
    export let id: string;
    export let files: undefined | AFile[] = undefined;
    export let folders: undefined | FolderType[] = undefined;
    export let showFiles = false;
    export let folderSelected: undefined | string = undefined;
    export let fileSelected: undefined | string = undefined;

    let opened = false;
</script>

<div class="folder">
    <div class="buttons">
        <button disabled={!folders} class="opener {opened ? "open" : ""}" on:click={() => opened=!opened} title="{!folders ? "" :(opened ? "Collapse folder" : "Expand folder")}">
            <img src={triangle} alt="Triangle button">
        </button>
        <Button selected={folderSelected} {id} buttonType="folder" on:folderClicked {name} />
    </div>
    {#if folders && opened}
        <div class="sub-folders" transition:slide>
            {#each folders as folder}
                <svelte:self {fileSelected} {folderSelected} on:fileClicked on:folderClicked name={folder.name} id={folder.id} files={folder.files} folders={folder.folders} {showFiles} />
            {/each}
        </div>
    {/if}
    {#if files && showFiles}
        <div class="files" transition:slide>
            {#each files as file}
                <Button selected={fileSelected} id={file.id} buttonType="file" on:fileClicked name={file.name} />
            {/each}
        </div>
    {/if}
</div>

<style>
    /* .folder {
        padding-left: 10px;
    } */

    .buttons {
        display: flex;
        position: relative;
    }

    .opener {
        width: 30px;
        padding: 0;
        margin: 0;
        background: none;
        display: flex;
        align-items: center;
        justify-content: center;
        border: none;
        cursor: pointer;
    }

    .sub-folders {
        padding-left: 25px;
    }
    .files {
        padding-left: 30px;
    }

    .opener img {
        transform: rotate(90deg);
        transition: transform 0.15s linear;
    }

    .opener.open img {
        transform: rotate(180deg);;
    }

    .opener:disabled img {
        filter: invert(0.5);
    }
</style>