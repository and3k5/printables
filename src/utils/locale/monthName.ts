import { capitalize } from "./capitalize";

export function monthName(month: number, locale: string): string {
    const date = new Date(2000, month - 1, 1);
    const name = date.toLocaleString(locale, { month: "long" });
    return capitalize(name);
}
