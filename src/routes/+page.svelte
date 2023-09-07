<script lang="ts">
    import FileTree from "$lib/FileTree.svelte";
    import type { TreeStructure } from "$lib/treeTypes.js";

    let showFiles = false;
    let structure: TreeStructure = {
        files: [{
            name: "Home File",
            id: "file1"
        }, {
            name: "Home File2",
            id: "file1.5"
        }],
        folders: [{
            name: "Folder 1",
            id: "1",
            folders: [{
                name: "Folder 1.5",
                id: "f1.5"
            }]
        }, {
            name: "Folder 2",
            id: "2",
            files: [{
                name: "File 2",
                id: "file2"
            }],
            folders: [{
                id: "f2.5",
                name: "Folder 2.5",
                files: [{
                    name: "File 3",
                    id: "file3",
                }, {
                    name: "File 3.1",
                    id: "file3.1"
                }]
            }]
        }, {
            name: "Folder 3",
            id: "3",
            folders: [{
                name: "Folder 3.5",
                id: "f3.5"
            }]
        }]
    };

    let folderSelected: undefined | string;
    let fileSelected: undefined | string;
</script>

<label>
    <p>Show Files: </p>
    <input type="checkbox" bind:checked={showFiles}>
</label>

<FileTree {fileSelected} {folderSelected} {structure} {showFiles} on:folderClicked={(e) => folderSelected=e.detail} on:fileClicked={(e) => fileSelected=e.detail} />

<style>
    label {
        display: flex;
    }
</style>