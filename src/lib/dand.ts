import { currentDragged } from "./store.js";

export function draggable(node: HTMLElement, data: {id: string, currentDrag: (id: string) => void}) {
    let state = data;

    node.draggable = true;
    // node.style.cursor = "grab";

    function handle_dragstart(e: DragEvent) {
        data.currentDrag(data.id)
        //@ts-ignore
        e.dataTransfer.setData("text/plain", state.id);
    }

    node.addEventListener("dragstart", handle_dragstart);

    return {
        update() {
            state = data;
        },
        destroy() {
            node.removeEventListener("dragstart", handle_dragstart);
        }
    }
}

export function dropzone(node: HTMLElement, options: { on_dropzone: (data: {id: string, parents: string[]}) => void, parents: string[], buttonType: string }) {
    if (options.buttonType ==="file")return
    let stateConfig = {
        dropEffect: "move",
        dragover_class: "droppable"
    }
    let optionsState = options;
    let currentDragged2: {id: string, parents: string[]} | null = null;
    currentDragged.subscribe(value => currentDragged2 = value);

    function handle_dragenter(e: DragEvent) {
        if (currentDragged2 && options.parents.includes(currentDragged2.id)) return;
        //@ts-ignore
        e.target.classList.add(stateConfig.dragover_class);
    }

    function handle_dragleave(e: DragEvent) {
        //@ts-ignore
        e.target.classList.remove(stateConfig.dragover_class);
    }

    function handle_dragover(e: DragEvent) {
        e.preventDefault();
        if (currentDragged2 && options.parents.includes(currentDragged2.id)) {
            //@ts-ignore
            e.dataTransfer.dropEffect = "none";
            return;
        }
        //@ts-ignore
        e.dataTransfer.dropEffect = stateConfig.dropEffect;
    }

    function handle_drop(e: DragEvent) {
        e.preventDefault();
        
        if (currentDragged2 && options.parents.includes(currentDragged2.id)) return;
        //@ts-ignore
        e.target.classList.remove(stateConfig.dragover_class);
        optionsState.on_dropzone(currentDragged2!)
    }

    node.addEventListener("dragenter", handle_dragenter);
    node.addEventListener("dragleave", handle_dragleave);
    node.addEventListener("dragover", handle_dragover);
    node.addEventListener("drop", handle_drop)

    return {
        update() {
            optionsState = options;
        },
        destroy() {
            node.removeEventListener("dragenter", handle_dragenter);
            node.removeEventListener("dragleave", handle_dragleave);
            node.removeEventListener("dragover", handle_dragover);
            node.removeEventListener("drop", handle_drop);
        }
    }
}