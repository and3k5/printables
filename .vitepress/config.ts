import { defineConfig } from "vitepress";
import { ThemeConfig } from "./theme/config-type";

// https://vitepress.dev/reference/site-config
export default defineConfig<ThemeConfig>({
    title: "printables",
    description: "stuff to print",
    srcDir: "./src/pages",
    themeConfig: {
        links: [
            {
                href: "/calendar",
                text: "Calendar",
            },
        ],
    },
});
