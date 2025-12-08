export function weekDayName(day: number, locale: string): string {
    const date = new Date(2000, 0, day + 2); // January 2, 2000 is a Sunday
    return date.toLocaleString(locale, { weekday: "long" });
}
