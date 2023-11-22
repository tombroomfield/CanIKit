import { canI } from "./canI";
import { ApplicationDefinition } from "../types/app";
import { Event, HookResolve } from "../types/request";
import { searchForPolicies } from "./policySearch";
import PermissionDeniedError from "../errors/permission_denied_error";
import CanINotCalledError from "../errors/cani_not_called_error";

export function handle({
  pagePolicies,
  pageSevers,
  layoutPolicies,
  layoutServers,
  apiServers,
  apiPolicies,
}: ApplicationDefinition) {
  return async ({ event, resolve }: { event: Event; resolve: HookResolve }) => {
    if (!event.route.id) {
      return await resolve(event);
    }

    const policies = searchForPolicies(event.route.id, {
      pagePolicies,
      pageSevers,
      layoutServers,
      layoutPolicies,
      apiServers,
      apiPolicies,
    });

    let ranIt = false;

    event.locals.skipCanI = () => {
      ranIt = true;
    };

    event.locals.canI = canI({ policies, event }, () => (ranIt = true));

    const response = await resolve(event);

    const apiRoute = !!(
      apiServers &&
      (apiServers[`./routes${event.route.id}/+server.ts`] ||
        apiServers[`./routes${event.route.id}/+server.js`])
    );

    const serverRoute = !!(
      pageSevers &&
      (pageSevers[`./routes${event.route.id}/+page.server.ts`] ||
        pageSevers[`./routes${event.route.id}/+page.server.js`])
    );

    if (!ranIt && (apiRoute || serverRoute)) {
      throw new CanINotCalledError(event.route.id);
    }

    return response;
  };
}

export { PermissionDeniedError };
