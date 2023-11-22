import LayoutManager from "../layouts/manager";
import PageManager from "../pages/manager";
import ApiManager from "../apis/manager";
import { ApplicationDefinition, PolicyList } from "../types/app";
import { error } from "@sveltejs/kit";

import { scrubPath } from "../utils/index";

export function searchForPolicies(
  path: string,
  {
    pagePolicies,
    pageSevers,
    layoutServers,
    layoutPolicies,
    apiServers,
    apiPolicies,
  }: ApplicationDefinition
): PolicyList {
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
