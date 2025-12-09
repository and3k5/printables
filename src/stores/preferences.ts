import { ref } from "vue";
import { defineStore } from "pinia";
import { languages as langs } from "../utils/locale/languages";

export const usePreferences = defineStore("preferences", () => {
    const language = ref(navigator.language);

    const languages = ref(
        langs.map((code) => ({
            name: new Intl.DisplayNames(["en"], { type: "language" }).of(code),
            code,
        })),
    );

    return { language, languages };
});
