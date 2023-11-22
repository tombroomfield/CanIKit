export default class NoPagePolicyError extends Error {
    constructor(path) {
        super(`No page policy found for ${path}`);
        this.name = "NoPagePolicyError";
    }
}
//# sourceMappingURL=no_page_policy_error.js.map