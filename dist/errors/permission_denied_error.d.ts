export default class PermissionDeniedError extends Error {
    policy: any;
    constructor(policy: any);
}
