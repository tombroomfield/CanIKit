import { ClientGlob, ImportFunction, PolicyList } from "../types/app";
export default class PageManager {
    path: string;
    pageSevers: ClientGlob;
    pagePolicies: ClientGlob;
    constructor({ path, pageSevers, pagePolicies, }: {
        path: string;
        pageSevers: ClientGlob;
        pagePolicies: ClientGlob;
    });
    resolvePrincipalPolicy(): PolicyList;
    findPageServer(): ImportFunction | undefined;
    findPagePolicyComponent(): PolicyList;
}
