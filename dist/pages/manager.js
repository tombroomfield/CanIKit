"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../utils/index");
class PageManager {
    constructor({ path, pageSevers, pagePolicies, error, }) {
        this.path = path;
        this.pageSevers = pageSevers;
        this.pagePolicies = pagePolicies;
        this.error = error;
    }
    resolvePrincipalPolicy() {
        const pageServer = this.findPageServer();
        const pagePolicy = this.findPagePolicyComponent();
        // If we have a page server, we must have a page policy.
        if (pageServer && !pagePolicy[0]) {
            throw new this.error(500, `No page policy found for ${this.path}`);
        }
        return pagePolicy;
    }
    findPageServer() {
        const pageSerRegex = new RegExp(`^\\.\\/routes${this.path}\/\\+(page)\\.server\\.(js|ts)\\b`);
        return Object.values((0, index_1.filterGlobsByRegex)(this.pageSevers, pageSerRegex))[0];
    }
    findPagePolicyComponent() {
        const policyRegex = new RegExp(`^\\.\\/routes${this.path}\/page\.policy\\.(js|ts)\\b`);
        return Object.entries((0, index_1.filterGlobsByRegex)(this.pagePolicies, policyRegex));
    }
}
exports.default = PageManager;
//# sourceMappingURL=manager.js.map