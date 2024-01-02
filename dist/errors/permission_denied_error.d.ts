import { RequestContext } from "src/types/request";
export default class UnhandledPermissionDeniedError extends Error {
    constructor(request: RequestContext);
}
