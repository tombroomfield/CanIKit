export default class PermissionDeniedError extends Error {
  policy: any;

  constructor(policy: any) {
    super("Permission denied");
    this.name = "PermissionDeniedError";
    this.policy = policy;
  }
}
