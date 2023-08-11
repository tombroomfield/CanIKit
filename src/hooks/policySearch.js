import LayoutManager from "../layouts/manager.js";
import PageManager from "../pages/manager.js";
import ApiManager from "../apis/manager.js";

import { scrubPath } from "../utils/index.js";

export function searchForPolicies({
  path,
  pagePolicies,
  pageSevers,
  layoutServers,
  layoutPolicies,
  apiServers,
  apiPolicies,
}) {
  path = scrubPath(path);

  const pageManager = new PageManager({
    path,
    pageSevers,
    pagePolicies,
  });

  let principalPolicy = pageManager.resolvePrincipalPolicy();

  if (!principalPolicy) {
    const apiManager = new ApiManager({
      path,
      apiServers,
      apiPolicies,
    });
    principalPolicy = apiManager.resolvePrincipalPolicy();
  }

  const layoutManager = new LayoutManager({
    path,
    layoutServers,
    layoutPolicies,
  });
  layoutManager.ensureServersHavePolicies();

  return [...layoutManager.ancestorPolicies(), ...principalPolicy];
}
