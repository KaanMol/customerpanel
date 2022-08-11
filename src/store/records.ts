import { writable } from "svelte/store";

export const recordsStore = (() => {
    const { subscribe, set, update } = writable([
        {
            name: "",
            type: "",
            value: "",
            ttl: 0
        }
    ]);

    return {
        subscribe,
        set,
        update
    }
})();

