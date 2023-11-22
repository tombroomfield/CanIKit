import { ApplicationDefinition } from "../types/app";
import { Event, HookResolve } from "../types/request";
import { handleError } from "./error/index";
import PermissionDeniedError from "../errors/permission_denied_error";
export declare function handle({ pagePolicies, pageSevers, layoutPolicies, layoutServers, apiServers, apiPolicies, }: ApplicationDefinition): ({ event, resolve }: {
    event: Event;
    resolve: HookResolve;
}) => Promise<any>;
export { handleError, PermissionDeniedError };
