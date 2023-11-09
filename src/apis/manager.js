import { filterKeysByRegex } from "../utils/index.js";

export default class ApiManager {
  constructor({ path, apiServers, apiPolicies, error }) {
    this.path = path;
    this.apiServers = apiServers;
    this.apiPolicies = apiPolicies;
    this.error = error;
  }

  resolvePrincipalPolicy() {
    const apiServer = this.findApiServer();
    const apiPolicy = this.findApiPolicy();

    // If we have a page server, we must have a page policy.
    if (apiServer && !apiPolicy[0]) {
      throw new this.error(500, `No api policy found for ${this.path}`);
    }

    return apiPolicy;
  }

  findApiServer() {
    const serRegex = new RegExp(
      `^\\.\\/routes${this.path}\/\\+server\\.(js|ts)\\b`
    );
    return Object.values(filterKeysByRegex(this.apiServers, serRegex))[0];
  }

  findApiPolicy() {
    const policyRegex = new RegExp(
      `^\\.\\/routes${this.path}\/policy\\.(js|ts)\\b`
    );
    return Object.entries(filterKeysByRegex(this.apiPolicies, policyRegex));
  }
}
