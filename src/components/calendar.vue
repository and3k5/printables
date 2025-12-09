<template>
    <main class="calendar-page container-fluid mb-2">
        <div class="d-flex flex-row align-items-center">
            <h1>{{ monthName(month, preferences.language) }} {{ year }}</h1>
            <button type="button" class="btn btn-primary d-print-none" @click="print()">
                Print
            </button>
        </div>
        <settings>
            <div class="btn-group">
                <a class="btn btn-primary" :href="linkFor(prev)">&lt;</a>
                <span class="btn btn-outline-primary">
                    {{ monthName(month, preferences.language) }}
                </span>
                <a class="btn btn-primary" :href="linkFor(next)">&gt;</a>
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
import Settings from "./settings.vue";
import { usePreferences } from "../stores/preferences";
import { leadingMonthDays } from "../utils/calculation/leadingMonthDays";
import { monthName } from "../utils/locale/monthName";
import { weekDayName } from "../utils/locale/weekDayName";
import { computed, onMounted } from "vue";

import { useRoute, useRouter } from "vitepress";
import { parseNumber } from "../utils/parse/number";

const route = useRoute();

const query = computed(() => {
    return new URLSearchParams(route.query);
});

const year = computed(() => {
    return parseNumber(query.value.get("year")) ?? new Date().getFullYear();
});

const month = computed(() => {
    return parseNumber(query.value.get("month")) ?? new Date().getMonth() + 1;
});

const preferences = usePreferences();

const totalDaysInMonth = computed(() => {
    const d = new Date(year.value, month.value - 1, 1);
    d.setMonth(d.getMonth() + 1);
    d.setDate(0);
    return d.getDate();
});

const leadDays = computed(() => {
    return leadingMonthDays(year.value, month.value);
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
    let year2 = year.value;
    let month2 = month.value - 1;
    if (month2 < 1) {
        month2 = 12;
        year2 -= 1;
    }
    return { year: year2, month: month2 };
});

const next = computed(() => {
    let year2 = year.value;
    let month2 = month.value + 1;
    if (month2 > 12) {
        month2 = 1;
        year2 += 1;
    }
    return { year: year2, month: month2 };
});

function linkFor(prev: { year: number; month: number }) {
    return `calendar.html?year=${prev.year}&month=${prev.month}`;
}

function print() {
    window.print();
}

const router = useRouter();

onMounted(() => {
    window.addEventListener("keydown", (e) => {
        if (e.key === "ArrowLeft") {
            router.go(linkFor(prev.value));
        } else if (e.key === "ArrowRight") {
            router.go(linkFor(next.value));
        }
    });
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
