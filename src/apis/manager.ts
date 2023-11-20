import { filterGlobsByRegex } from "../utils/index";
import { ClientGlob, PolicyList, ImportFunction } from "../types/app";
import { SvelteKitError } from "../types/request";

export default class ApiManager {
  path: string;
  apiServers: ClientGlob;
  apiPolicies: ClientGlob;
  error: SvelteKitError;

  constructor({
    path,
    apiServers,
    apiPolicies,
    error,
  }: {
    path: string;
    apiServers: ClientGlob;
    apiPolicies: ClientGlob;
    error: SvelteKitError;
  }) {
    this.path = path;
    this.apiServers = apiServers;
    this.apiPolicies = apiPolicies;
    this.error = error;
  }

  resolvePrincipalPolicy(): PolicyList {
    const apiServer = this.findApiServer();
    const apiPolicy = this.findApiPolicy();

    // If we have a page server, we must have a page policy.
    if (apiServer && !apiPolicy[0]) {
      throw new this.error(500, `No api policy found for ${this.path}`);
    }

    return apiPolicy;
  }

  findApiServer(): ImportFunction | undefined {
    const serRegex = new RegExp(
      `^\\.\\/routes${this.path}\/\\+server\\.(js|ts)\\b`
    );
    return Object.values(filterGlobsByRegex(this.apiServers, serRegex))[0] as
      | ImportFunction
      | undefined;
  }

  findApiPolicy(): PolicyList {
    const policyRegex = new RegExp(
      `^\\.\\/routes${this.path}\/policy\\.(js|ts)\\b`
    );
    return Object.entries(filterGlobsByRegex(this.apiPolicies, policyRegex));
  }
}
