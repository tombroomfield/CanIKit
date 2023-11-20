import { ClientGlob, PolicyList, ImportFunction } from "../types/app";
import { SvelteKitError } from "../types/request";
export default class ApiManager {
    path: string;
    apiServers: ClientGlob;
    apiPolicies: ClientGlob;
    error: SvelteKitError;
    constructor({ path, apiServers, apiPolicies, error, }: {
        path: string;
        apiServers: ClientGlob;
        apiPolicies: ClientGlob;
        error: SvelteKitError;
    });
    resolvePrincipalPolicy(): PolicyList;
    findApiServer(): ImportFunction | undefined;
    findApiPolicy(): PolicyList;
}
