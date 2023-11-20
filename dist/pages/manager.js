import { filterGlobsByRegex } from "../utils/index";
export default class PageManager {
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
        return Object.values(filterGlobsByRegex(this.pageSevers, pageSerRegex))[0];
    }
    findPagePolicyComponent() {
        const policyRegex = new RegExp(`^\\.\\/routes${this.path}\/page\.policy\\.(js|ts)\\b`);
        return Object.entries(filterGlobsByRegex(this.pagePolicies, policyRegex));
    }
}
//# sourceMappingURL=manager.js.map