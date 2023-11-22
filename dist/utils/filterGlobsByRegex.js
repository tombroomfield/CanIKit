export function filterGlobsByRegex(obj, regex) {
    let results = {};
    for (var k in obj) {
        if (regex.test(k)) {
            results[k] = obj[k];
        }
    }
    return results;
}
//# sourceMappingURL=filterGlobsByRegex.js.map