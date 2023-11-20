import LayoutManager from "../layouts/manager";
import PageManager from "../pages/manager";
import ApiManager from "../apis/manager";
import { scrubPath } from "../utils/index";
export function searchForPolicies(path, { pagePolicies, pageSevers, layoutServers, layoutPolicies, apiServers, apiPolicies, }, error) {
    path = scrubPath(path);
    const pageManager = new PageManager({
        path,
        pageSevers,
        pagePolicies,
        error,
    });
    let principalPolicy = pageManager.resolvePrincipalPolicy();
    if (!principalPolicy) {
        const apiManager = new ApiManager({
            path,
            apiServers,
            apiPolicies,
            error,
        });
        principalPolicy = apiManager.resolvePrincipalPolicy();
    }
    const layoutManager = new LayoutManager({
        path,
        layoutServers,
        layoutPolicies,
        error,
    });
    layoutManager.ensureServersHavePolicies();
    return [...layoutManager.ancestorPolicies(), ...principalPolicy];
}
//# sourceMappingURL=policySearch.js.map