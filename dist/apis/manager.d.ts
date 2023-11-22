import { ClientGlob, PolicyList, ImportFunction } from "../types/app";
export default class ApiManager {
    path: string;
    apiServers: ClientGlob;
    apiPolicies: ClientGlob;
    constructor({ path, apiServers, apiPolicies, }: {
        path: string;
        apiServers: ClientGlob;
        apiPolicies: ClientGlob;
    });
    resolvePrincipalPolicy(): PolicyList;
    findApiServer(): ImportFunction | undefined;
    findApiPolicy(): PolicyList;
}
