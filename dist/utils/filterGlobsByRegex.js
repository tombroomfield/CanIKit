"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterGlobsByRegex = void 0;
function filterGlobsByRegex(obj, regex) {
    let results = {};
    for (var k in obj) {
        if (regex.test(k)) {
            results[k] = obj[k];
        }
    }
    return results;
}
exports.filterGlobsByRegex = filterGlobsByRegex;
//# sourceMappingURL=filterGlobsByRegex.js.map