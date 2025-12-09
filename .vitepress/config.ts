import { defineConfig } from "vitepress";
import { ThemeConfig } from "./theme/config-type";

const base = "/printables/";

// https://vitepress.dev/reference/site-config
export default defineConfig<ThemeConfig>({
    title: "printables",
    description: "stuff to print",
    srcDir: "./src/pages",
    base,
    themeConfig: {
        links: [
            {
                href: "calendar",
                text: "Calendar",
            },
        ],
    },
});
