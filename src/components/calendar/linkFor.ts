export function linkFor(prev: { year: number; month: number; months?: number }) {
    let result = `calendar.html?year=${prev.year}&month=${prev.month}`;
    if (prev.months != null) {
        result += `&months=${prev.months}`;
    }
    return result;
}
