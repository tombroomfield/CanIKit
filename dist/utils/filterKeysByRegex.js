"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterKeysByRegex = void 0;
function filterKeysByRegex(obj, regex) {
    let results = {};
    for (var k in obj) {
        if (regex.test(k)) {
            results[k] = obj[k];
        }
    }
    return results;
}
exports.filterKeysByRegex = filterKeysByRegex;
//# sourceMappingURL=filterKeysByRegex.js.map