"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../utils/index");
class LayoutManager {
    constructor({ path, layoutServers, layoutPolicies, error, }) {
        this.path = path;
        this.layoutServers = layoutServers;
        this.layoutPolicies = layoutPolicies;
        this.error = error;
    }
    ensureServersHavePolicies() {
        for (let key in this.ancestorsServers()) {
            // Grab the layout policy for this layout server.
            key = key.replace("+layout.server", "layout\\.policy");
            key = key.split(".").slice(0, -1).join(".");
            const layoutPolicyRegex = new RegExp(`^\\${key}\\.(js|ts)\\b`);
            const layoutPolicyComponent = Object.values((0, index_1.filterGlobsByRegex)(this.layoutPolicies, layoutPolicyRegex))[0];
            if (!layoutPolicyComponent) {
                throw new this.error(500, `No layout policy found for ${key}, should be ${key
                    .replace("layout.server", "layout.policy")
                    .replace("+", "")}`);
            }
        }
    }
    ancestorPolicies() {
        const unsorted = (0, index_1.directoryLookup)(this.path, "layout\\.policy", this.layoutPolicies);
        return Object.entries(unsorted).sort((a, b) => a[0].length - b[0].length);
    }
    ancestorsServers() {
        return (0, index_1.directoryLookup)(this.path, "\\+layout\\.server", this.layoutServers);
    }
}
exports.default = LayoutManager;
//# sourceMappingURL=manager.js.map