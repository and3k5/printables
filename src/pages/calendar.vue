<template>
    <main class="calendar-page">
        <h1>{{ monthName(month, preferences.language) }} {{ year }}</h1>
        <settings>
            <div class="btn-group">
                <RouterLink
                    class="btn btn-primary"
                    :to="{ name: 'calendar', params: { year: prev.year, month: prev.month } }"
                    >&lt;</RouterLink
                >
                <span class="btn btn-outline-primary">
                    {{ monthName(month, preferences.language) }}
                </span>
                <RouterLink
                    class="btn btn-primary"
                    :to="{ name: 'calendar', params: { year: next.year, month: next.month } }"
                    >&gt;</RouterLink
                >
            </div>
        </settings>
        <div class="calendar">
            <div class="day-header" v-for="n in 7" :key="n">{{ weekDayName(n) }}</div>
            <div
                class="day-item"
                v-for="day in days"
                :key="day.spacer ? 'spacer-' + Math.random() : 'day-' + day.n"
            >
                <span v-if="!day.spacer">{{ day.n }}</span>
            </div>
        </div>
    </main>
</template>

<script setup lang="ts">
import Settings from "@/components/settings.vue";
import { usePreferences } from "@/stores/preferences";
import { leadingMonthDays } from "@/utils/calculation/leadingMonthDays";
import { monthName } from "@/utils/locale/monthName";
import { weekDayName } from "@/utils/locale/weekDayName";
import { computed } from "vue";

const props = defineProps<{
    year: number;
    month: number;
}>();

const preferences = usePreferences();

const totalDaysInMonth = computed(() => {
    const d = new Date(props.year, props.month - 1, 1);
    d.setMonth(d.getMonth() + 1);
    d.setDate(0);
    return d.getDate();
});

const leadDays = computed(() => {
    return leadingMonthDays(props.year, props.month);
});

const days = computed(() => {
    const result: { n: number; spacer?: boolean }[] = [];
    for (let i = 0; i < leadDays.value; i++) {
        result.push({ n: 0, spacer: true });
    }
    for (let i = 1; i <= totalDaysInMonth.value; i++) {
        result.push({ n: i });
    }
    return result;
});

const prev = computed(() => {
    let year = props.year;
    let month = props.month - 1;
    if (month < 1) {
        month = 12;
        year -= 1;
    }
    return { year, month };
});

const next = computed(() => {
    let year = props.year;
    let month = props.month + 1;
    if (month > 12) {
        month = 1;
        year += 1;
    }
    return { year, month };
});
</script>

<style scoped lang="scss">
.calendar-page {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    flex: 1;
}

.calendar {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    grid-template-rows: 0fr auto;
    height: 100%;
}

%grid-item {
    border: 1px solid #ccc;
    padding: 4px;
}

.day-item {
    @extend %grid-item;
    padding: 4px;
}

.day-header {
    @extend %grid-item;
    font-weight: bold;
    text-align: center;
    padding: 8px 0;
    height: min-content;
    background-color: var(--header-background);
}
</style>
