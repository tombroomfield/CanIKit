import { filterGlobsByRegex } from "../utils/index";
import { error } from "@sveltejs/kit";
export default class ApiManager {
    constructor({ path, apiServers, apiPolicies, }) {
        this.path = path;
        this.apiServers = apiServers;
        this.apiPolicies = apiPolicies;
    }
    resolvePrincipalPolicy() {
        const apiServer = this.findApiServer();
        const apiPolicy = this.findApiPolicy();
        // If we have a page server, we must have a page policy.
        if (apiServer && !apiPolicy[0]) {
            throw error(404, `No api policy found for ${this.path}`);
        }
        return apiPolicy;
    }
    findApiServer() {
        const serRegex = new RegExp(`^\\.\\/routes${this.path}\/\\+server\\.(js|ts)\\b`);
        return Object.values(filterGlobsByRegex(this.apiServers, serRegex))[0];
    }
    findApiPolicy() {
        const policyRegex = new RegExp(`^\\.\\/routes${this.path}\/policy\\.(js|ts)\\b`);
        return Object.entries(filterGlobsByRegex(this.apiPolicies, policyRegex));
    }
}
//# sourceMappingURL=manager.js.map