import { directoryLookup, filterGlobsByRegex } from "../utils/index";
import { ClientGlob } from "../types/app";
import { PolicyList } from "../types/app";
import { error } from "@sveltejs/kit";

export default class LayoutManager {
  path: string;
  layoutServers: ClientGlob;
  layoutPolicies: ClientGlob;

  constructor({
    path,
    layoutServers,
    layoutPolicies,
  }: {
    path: string;
    layoutServers: ClientGlob;
    layoutPolicies: ClientGlob;
  }) {
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
        filterGlobsByRegex(this.layoutPolicies, layoutPolicyRegex)
      )[0];

      if (!layoutPolicyComponent) {
        throw error(
          500,
          `No layout policy found for ${key}, should be ${key
            .replace("layout.server", "layout.policy")
            .replace("+", "")}`
        );
      }
    }
  }

  ancestorPolicies(): PolicyList {
    const unsorted = directoryLookup(
      this.path,
      "layout\\.policy",
      this.layoutPolicies
    );

    return Object.entries(unsorted).sort(
      (a, b) => a[0].length - b[0].length
    ) as PolicyList;
  }

  ancestorsServers() {
    return directoryLookup(this.path, "\\+layout\\.server", this.layoutServers);
  }
}
