export function leadingMonthDays(year: number, month: number): number {
    const firstDayOfMonth = new Date(year, month - 1, 1);
    const weekDay = firstDayOfMonth.getDay(); // 0 (Sun) to 6 (Sat)
    return (weekDay + 6) % 7; // Convert to 0 (Mon) to 6 (Sun)
}
