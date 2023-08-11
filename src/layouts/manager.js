import { directoryLookup } from "../utils/index.js";

export default class LayoutManager {
  constructor({ path, layoutServers, layoutPolicies }) {
    this.path = path;
    this.layoutServers = layoutServers;
    this.layoutPolicies = layoutPolicies;
  }

  ensureServersHavePolicies() {
    for (let key in this.ancestorsServers()) {
      // Grab the layout policy for this layout server.
      key = key.replace("+layout.server", "layout\\.policy");
      key = key.split(".").slice(0, -1).join(".");
      const layoutPolicyRegex = new RegExp(`^\\${key}\\.(js|ts)\\b`);
      const layoutPolicyComponent = Object.values(
        filterKeysByRegex(this.layoutPolicies, layoutPolicyRegex)
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

  ancestorPolicies() {
    const unsorted = directoryLookup(
      this.path,
      "layout\\.policy",
      this.layoutPolicies
    );

    return Object.entries(unsorted).sort((a, b) => a[0].length - b[0].length);
  }

  ancestorsServers() {
    return directoryLookup(this.path, "\\+layout\\.server", this.layoutServers);
  }
}
