export default class PermissionDeniedError extends Error {
    constructor(policy) {
        super("Permission denied");
        this.name = "PermissionDeniedError";
        this.policy = policy;
    }
}
//# sourceMappingURL=permission_denied_error.js.map