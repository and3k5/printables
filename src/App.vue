<script setup lang="ts"></script>

<template>
    <header class="d-print-none">
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">Printables</a>
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
                        <li class="nav-item">
                            <RouterLink to="/calendar" custom v-slot="{ isActive, href, navigate }">
                                <a
                                    :class="{ 'nav-link': true, active: isActive }"
                                    :aria-current="isActive ? 'page' : undefined"
                                    :href="href"
                                    >Calendar</a
                                >
                            </RouterLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </header>
    <RouterView></RouterView>
</template>
