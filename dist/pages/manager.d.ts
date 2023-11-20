import { ClientGlob, ImportFunction, PolicyList } from "../types/app";
import { SvelteKitError } from "../types/request";
export default class PageManager {
    path: string;
    pageSevers: ClientGlob;
    pagePolicies: ClientGlob;
    error: SvelteKitError;
    constructor({ path, pageSevers, pagePolicies, error, }: {
        path: string;
        pageSevers: ClientGlob;
        pagePolicies: ClientGlob;
        error: SvelteKitError;
    });
    resolvePrincipalPolicy(): PolicyList;
    findPageServer(): ImportFunction | undefined;
    findPagePolicyComponent(): PolicyList;
}
