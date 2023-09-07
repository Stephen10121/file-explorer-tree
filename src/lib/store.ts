import { writable } from "svelte/store";

export const currentDragged = writable<string | null>(null);