"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scrubPath = void 0;
function scrubPath(path) {
    return path.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
exports.scrubPath = scrubPath;
//# sourceMappingURL=scrubPath.js.map