import { ClientGlob, ImportFunction, PolicyList } from "../types/app";
import RequiredPagePolicy from "../policies/required_page_policy";
export default class PageManager {
    path: string;
    pageSevers: ClientGlob;
    pagePolicies: ClientGlob;
    constructor({ path, pageSevers, pagePolicies, }: {
        path: string;
        pageSevers: ClientGlob;
        pagePolicies: ClientGlob;
    });
    resolvePrincipalPolicy(): PolicyList | RequiredPagePolicy;
    findPageServer(): ImportFunction | undefined;
    findPagePolicyComponent(): PolicyList;
}
