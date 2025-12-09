<template>
    <div class="settings-box d-print-none card">
        <div class="card-header">Settings</div>
        <div class="card-body d-flex flex-row">
            <slot></slot>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.settings-box {
    h2 {
        font-size: 1em;
        font-weight: bold;
    }
}

@media print {
    .settings-box {
        display: none !important;
    }
}
</style>
