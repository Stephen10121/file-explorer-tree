<script lang="ts">
    import { invalidateAll } from "$app/navigation";
    import FileTree from "$lib/FileTree.svelte";

    let showFiles = false;

    function build_path(...args: string[]) {
        return args.map((part, i) => {
            if (i === 0) {
            return part.trim().replace(/[\/]*$/g, '')
            } else {
            return part.trim().replace(/(^[\/]*|[\/]*$)/g, '')
            }
        }).filter(x=>x.length).join('/')
    }

    async function somethingDragged({ detail }: { detail: { selected: string, target: string, targetParents: string[], selectedParents: string[] } }) {
        let from = build_path("/", detail.selectedParents.join("/"), detail.selected);
        let to = build_path("/", detail.targetParents.join("/"), detail.target,detail.selected);
        console.log({from, to});

        const res = await fetch("/api/move", {
            method: "POST",
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ from, to }),
        });

        invalidateAll();
    }

    let selected: undefined | string;

    export let data;
</script>
<h1>Hi MOM</h1>
<label>
    <p>Show Files: </p>
    <input type="checkbox" bind:checked={showFiles}>
</label>

<FileTree folderSelected={selected} fileSelected={selected} structure={data.directory.allFiles} {showFiles} on:folderClicked={(e) => selected=e.detail} on:fileClicked={(e) => selected=e.detail} on:dragAction={somethingDragged} />

<style>
    label {display: flex}
</style>