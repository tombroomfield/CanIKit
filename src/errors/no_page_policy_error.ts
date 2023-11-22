export default class NoPagePolicyError extends Error {
  constructor(path: string) {
    super(`No page policy found for ${path}`);
    this.name = "NoPagePolicyError";
  }
}
