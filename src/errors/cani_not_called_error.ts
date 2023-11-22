export default class CanINotCalledError extends Error {
  constructor(path: string) {
    super(`CanI not called for route ${path}`);
    this.name = "CanINotCalledError";
  }
}
