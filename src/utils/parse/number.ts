export function parseNumber(v: undefined | null | string | number | string[]) {
    if (Array.isArray(v)) v = v[0];
    if (v == null) return v;
    if (typeof v === "string") {
        if (v === "") {
            return undefined;
        }
        return parseInt(v);
    }
    return v;
}
