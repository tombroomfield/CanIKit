import { RequestContext } from "src/types/request";
export default class UnhandledPermissionDeniedError extends Error {
  constructor(request: RequestContext) {
    super(
      `Unhandled Permission denied for route: ${request.route} (method: ${request.method})`
    );
    this.name = "UnhandledPermissionDeniedError";
  }
}
