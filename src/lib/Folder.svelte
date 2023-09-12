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
    export let parents: string[] = [];
    let opened = false;
</script>

<div class="folder">
    <div class="buttons">
        <button disabled={Object.keys(folders).length + (showFiles?files.length:0) < 2} class="opener {opened ? "open" : ""}" on:click={() => opened=!opened} title="{!folders ? "" :(opened ? "Collapse folder" : "Expand folder")}">
            <img src={triangle} alt="Triangle button">
        </button>
        <Button {parents} selected={folderSelected} {id} buttonType="folder" on:folderClicked {name} on:dragAction />
    </div>
    {#if Object.keys(folders).length + files.length > 1 && opened}
        <div class="sub-folders" transition:slide>
            {#each Object.keys(folders) as folder}
                {#if folder!=="G_files"}
                    <svelte:self on:dragAction parents={[...parents, id]} {fileSelected} {folderSelected} on:fileClicked on:folderClicked name={folder} id={folder} files={folders[folder].G_files} folders={folders[folder]} {showFiles} />
                {/if}
            {/each}
            {#if files && showFiles}
        <div class="files" transition:slide>
            {#each files as file}
                <Button selected={fileSelected} id={file.name} buttonType="file" on:fileClicked name={file.name} on:dragAction parents={[...parents, id]} />
            {/each}
        </div>
    {/if}
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