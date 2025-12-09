<template>
    <settings>
        <div class="btn-group">
            <a class="btn btn-primary" :href="linkFor(prev)">&lt;</a>
            <span class="btn btn-outline-primary">
                {{ monthName(month, preferences.language) }} {{ year }}
            </span>
            <a class="btn btn-primary" :href="linkFor(next)">&gt;</a>
        </div>
        <div class="mx-3">
            <div class="input-group">
                <span class="input-group-text" id="basic-addon-months">months</span>
                <input
                    type="number"
                    class="form-control"
                    id="months-ctrl"
                    :value="months"
                    @input="updateMonths($event.target)"
                    aria-describedby="basic-addon-months"
                />
            </div>
        </div>
    </settings>
    <button type="button" class="btn btn-primary d-print-none" @click="print()">Print</button>
    <template v-for="n in monthItems" :key="n.year + '-' + n.month">
        <CalendarItem :year="n.year" :month="n.month"></CalendarItem>
    </template>
</template>

<script setup lang="ts">
import CalendarItem from "./calendar-item.vue";
import Settings from "../settings.vue";
import { monthName } from "../../utils/locale/monthName";
import { useRoute, useRouter } from "vitepress";
import { computed, onMounted } from "vue";
import { parseNumber } from "../../utils/parse/number";
import { usePreferences } from "../../stores/preferences";
import { linkFor } from "./linkFor";
import { get } from "http";

const route = useRoute();
const preferences = usePreferences();

const query = computed(() => {
    return new URLSearchParams(route.query);
});

const year = computed(() => {
    return parseNumber(query.value.get("year")) ?? new Date().getFullYear();
});

const month = computed(() => {
    return parseNumber(query.value.get("month")) ?? new Date().getMonth() + 1;
});

const months = computed(() => {
    return parseNumber(query.value.get("months")) ?? 1;
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

function getNextFor(year: number, month: number, add = 1) {
    let year2 = year;
    let month2 = month + add;
    while (month2 > 12) {
        month2 -= 12;
        year2 += 1;
    }
    return { year: year2, month: month2 };
}

const next = computed(() => {
    return getNextFor(year.value, month.value);
});

const monthItems = computed(() => {
    const result: { year: number; month: number }[] = [];
    for (let i = 1; i <= months.value; i++) {
        const n = getNextFor(year.value, month.value, i - 1);
        result.push({ year: n.year, month: n.month });
    }
    return result;
});

const router = useRouter();

function updateMonths(target) {
    if (!(target instanceof HTMLInputElement)) return;
    const val = parseNumber(target.value);
    if (val === undefined) return;
    router.go(linkFor({ year: year.value, month: month.value, months: val }));
}

onMounted(() => {
    window.addEventListener("keydown", (e) => {
        if (e.key === "ArrowLeft") {
            router.go(linkFor(prev.value));
        } else if (e.key === "ArrowRight") {
            router.go(linkFor(next.value));
        }
    });
});

function print() {
    window.print();
}
</script>
