"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.directoryLookup = void 0;
const index_js_1 = require("./index.js");
function directoryLookup(path, fileReg, files, foundComponents = {}, i = 0) {
    if (i > 100)
        throw new Error("Too many directories searched");
    const regex = new RegExp(`^\\.\\/routes${path}\\/${fileReg}\\.(?:js|ts)\\b`);
    const found = (0, index_js_1.filterGlobsByRegex)(files, regex);
    if (found) {
        foundComponents = { ...foundComponents, ...found };
    }
    if (path.length < 1)
        return foundComponents;
    const newPath = path.split("/").slice(0, -1).join("/");
    return directoryLookup(newPath, fileReg, files, foundComponents, i + 1);
}
exports.directoryLookup = directoryLookup;
//# sourceMappingURL=directoryLookup.js.map