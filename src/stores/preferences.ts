import { ref } from "vue";
import { defineStore } from "pinia";

export const usePreferences = defineStore("preferences", () => {
    const language = ref(navigator.language);

    return { language };
});
