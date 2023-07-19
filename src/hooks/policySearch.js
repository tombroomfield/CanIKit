import { filterKeysByRegex, directoryLookup } from "../utils.js";

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
  path = path.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  let pagePolicyComponent;

  const pageSerRegex = new RegExp(
    `^\\.\\/routes${path}\/\\+(page)\\.server\\.(js|ts)\\b`
  );
  const pageServerComponent = Object.values(
    filterKeysByRegex(pageSevers, pageSerRegex)
  )[0];

  // We have a page server, so we must have a page policy.
  if (pageServerComponent) {
    const policyRegex = new RegExp(
      `^\\.\\/routes${path}\/page\.policy\\.(js|ts)\\b`
    );
    pagePolicyComponent = Object.entries(
      filterKeysByRegex(pagePolicies, policyRegex)
    );
    if (!pagePolicyComponent[0]) {
      throw new Error(`No page policy found for ${path}`);
    }
  } else {
    const serRegex = new RegExp(`^\\.\\/routes${path}\/\\+server\\.(js|ts)\\b`);
    const serverComponent = Object.values(
      filterKeysByRegex(apiServers, serRegex)
    )[0];
    // We have a +server, so we must have a policy.
    if (serverComponent) {
      if (serverComponent.config?.skipCanI) {
        return true;
      }
      const policyRegex = new RegExp(
        `^\\.\\/routes${path}\/policy\\.(js|ts)\\b`
      );
      pagePolicyComponent = Object.entries(
        filterKeysByRegex(apiPolicies, policyRegex)
      );
      if (!pagePolicyComponent[0]) {
        throw new Error(`No server policy found for ${path}`);
      }
    }
  }

  // Grab all the layout servers at or above this level.
  const ancestorLayoutServers = directoryLookup(
    path,
    "\\+layout\\.server",
    layoutServers
  );

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

  const ancestoryLayoutPolicies = directoryLookup(
    path,
    "layout\\.policy",
    layoutPolicies
  );

  // Layouts first, shortest path first, then page.
  const layoutsToFire = Object.entries(ancestoryLayoutPolicies).sort(
    (a, b) => a[0].length - b[0].length
  );

  return [...layoutsToFire, ...pagePolicyComponent];
}
