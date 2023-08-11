import { filterKeysByRegex } from "../utils/index.js";

export default class PageManager {
  constructor({ path, pageSevers, pagePolicies }) {
    this.path = path;
    this.pageSevers = pageSevers;
    this.pagePolicies = pagePolicies;
  }

  resolvePrincipalPolicy() {
    const pageServer = this.findPageServer();
    const pagePolicy = this.findPagePolicyComponent();

    // If we have a page server, we must have a page policy.
    if (pageServer && !pagePolicy[0]) {
      throw new Error(`No page policy found for ${this.path}`);
    }

    return pagePolicy;
  }

  findPageServer() {
    const pageSerRegex = new RegExp(
      `^\\.\\/routes${this.path}\/\\+(page)\\.server\\.(js|ts)\\b`
    );
    return Object.values(filterKeysByRegex(this.pageSevers, pageSerRegex))[0];
  }

  findPagePolicyComponent() {
    const policyRegex = new RegExp(
      `^\\.\\/routes${this.path}\/page\.policy\\.(js|ts)\\b`
    );
    return Object.entries(filterKeysByRegex(this.pagePolicies, policyRegex));
  }
}
