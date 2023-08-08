import { filterKeysByRegex, directoryLookup } from "../utils/index.js";

export function searchForPolicies({
  path,
  pagePolicies,
  pageSevers,
  layoutServers,
  layoutPolicies,
  apiServers,
  apiPolicies,
  i = 0,
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

  // Grab all the layout servers at or above this level.
  const ancestorLayoutServers = directoryLookup(
    path,
    "\\+layout\\.server",
    layoutServers
  );

  ensureLayoutServersHavePolicies(ancestorLayoutServers, layoutPolicies);

  const ancestoryLayoutPolicies = sortLayoutPolicies(
    directoryLookup(path, "layout\\.policy", layoutPolicies)
  );

  return [...ancestoryLayoutPolicies, ...pagePolicyComponent];
}

function scrubPath(path) {
  return path.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
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

function ensureLayoutServersHavePolicies(
  ancestorLayoutServers,
  layoutPolicies
) {
  for (let key in ancestorLayoutServers) {
    // Grab the layout policy for this layout server.
    key = key.replace("+layout.server", "layout\\.policy");
    key = key.split(".").slice(0, -1).join(".");
    const layoutPolicyRegex = new RegExp(`^\\${key}\\.(js|ts)\\b`);
    const layoutPolicyComponent = Object.values(
      filterKeysByRegex(layoutPolicies, layoutPolicyRegex)
    )[0];

    if (!layoutPolicyComponent) {
      throw new Error(
        `No layout policy found for ${key}, should be ${key
          .replace("layout.server", "layout.policy")
          .replace("+", "")}`
      );
    }
  }
}

function sortLayoutPolicies(layoutPolicies) {
  return Object.entries(layoutPolicies).sort(
    (a, b) => a[0].length - b[0].length
  );
}
