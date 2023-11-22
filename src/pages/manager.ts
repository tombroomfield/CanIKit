import { filterGlobsByRegex } from "../utils/index";
import { ClientGlob, ImportFunction, PolicyList } from "../types/app";
import NoPagePolicyError from "../errors/no_page_policy_error";

export default class PageManager {
  path: string;
  pageSevers: ClientGlob;
  pagePolicies: ClientGlob;

  constructor({
    path,
    pageSevers,
    pagePolicies,
  }: {
    path: string;
    pageSevers: ClientGlob;
    pagePolicies: ClientGlob;
  }) {
    this.path = path;
    this.pageSevers = pageSevers;
    this.pagePolicies = pagePolicies;
  }

  resolvePrincipalPolicy(): PolicyList {
    const pageServer = this.findPageServer();
    const pagePolicy = this.findPagePolicyComponent();

    // If we have a page server, we must have a page policy.
    if (pageServer && !pagePolicy[0]) {
      throw new NoPagePolicyError(this.path);
    }

    return pagePolicy;
  }

  findPageServer(): ImportFunction | undefined {
    const pageSerRegex = new RegExp(
      `^\\.\\/routes${this.path}\/\\+(page)\\.server\\.(js|ts)\\b`
    );
    return Object.values(
      filterGlobsByRegex(this.pageSevers, pageSerRegex)
    )[0] as ImportFunction;
  }

  findPagePolicyComponent(): PolicyList {
    const policyRegex = new RegExp(
      `^\\.\\/routes${this.path}\/page\.policy\\.(js|ts)\\b`
    );
    return Object.entries(filterGlobsByRegex(this.pagePolicies, policyRegex));
  }
}
