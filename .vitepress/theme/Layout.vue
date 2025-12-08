<script setup lang="ts">
import { useData } from "vitepress";
import { onMounted } from "vue";
import { ThemeConfig } from "./config-type";

// https://vitepress.dev/reference/runtime-api#usedata
const { site, frontmatter, theme } = useData<ThemeConfig>();

onMounted(async () => {
    await import("bootstrap/dist/js/bootstrap.min.js");
});
</script>

<template>
    <header class="d-print-none">
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">{{ site.title }}</a>
                <button
                    class="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNavDropdown"
                    aria-controls="navbarNavDropdown"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul class="navbar-nav">
                        <li class="nav-item" v-for="link in theme.links" :key="link.href">
                            <a :class="{ 'nav-link': true }" :href="link.href">{{ link.text }}</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </header>
    <!-- <RouterView></RouterView> -->

    <Content class="content" />
</template>
