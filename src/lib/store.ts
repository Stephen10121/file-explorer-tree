import { writable } from "svelte/store";

export const currentDragged = writable<{id: string, parents: string[]} | null>(null);