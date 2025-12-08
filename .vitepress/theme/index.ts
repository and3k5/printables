// https://vitepress.dev/guide/custom-theme
import Layout from "./Layout.vue";
import type { Theme } from "vitepress";
import "bootstrap/dist/css/bootstrap.min.css";
//import { router } from "../../src/router";

//const app = createApp(App);

import "./style.scss";
import { createPinia } from "pinia";

export default {
    Layout,
    enhanceApp({ app }) {
        // ...
        app.use(createPinia());
        //app.use(router);
    },
} satisfies Theme;
