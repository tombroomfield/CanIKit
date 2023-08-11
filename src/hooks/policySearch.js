import LayoutManager from "../layouts/manager.js";
import {
  filterKeysByRegex,
  directoryLookup,
  scrubPath,
} from "../utils/index.js";

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

  let pagePolicyComponent;

  const pageServerComponent = findPageServerComponent(path, pageSevers);

  // We have a page server, so we must have a page policy.
  if (pageServerComponent) {
    pagePolicyComponent = findPagePolicyComponent(path, pagePolicies);
  } else {
    const serverComponent = findServerComponent(path, apiServers);
    // We have a +server, so we must have a policy.
    if (serverComponent) {
      pagePolicyComponent = findServerPolicy(path, apiPolicies);
    }
  }

  const layoutManager = new LayoutManager({
    path,
    layoutServers,
    layoutPolicies,
  });
  layoutManager.ensureServersHavePolicies();

  return [...layoutManager.ancestorPolicies(), ...pagePolicyComponent];
}

function findPageServerComponent(path, pageSevers) {
  const pageSerRegex = new RegExp(
    `^\\.\\/routes${path}\/\\+(page)\\.server\\.(js|ts)\\b`
  );
  return Object.values(filterKeysByRegex(pageSevers, pageSerRegex))[0];
}

function findPagePolicyComponent(path, pagePolicies) {
  const policyRegex = new RegExp(
    `^\\.\\/routes${path}\/page\.policy\\.(js|ts)\\b`
  );
  const component = Object.entries(
    filterKeysByRegex(pagePolicies, policyRegex)
  );
  if (!component[0]) {
    throw new Error(`No page policy found for ${path}`);
  }

  return component;
}

function findServerComponent(path, apiServers) {
  const serRegex = new RegExp(`^\\.\\/routes${path}\/\\+server\\.(js|ts)\\b`);
  const serverComponent = Object.values(
    filterKeysByRegex(apiServers, serRegex)
  )[0];

  return serverComponent;
}

function findServerPolicy(path, apiPolicies) {
  const policyRegex = new RegExp(`^\\.\\/routes${path}\/policy\\.(js|ts)\\b`);
  const policyComponent = Object.entries(
    filterKeysByRegex(apiPolicies, policyRegex)
  );

  if (!policyComponent[0]) {
    throw new Error(`No server policy found for ${path}`);
  }

  return pagePolicyComponent;
}
