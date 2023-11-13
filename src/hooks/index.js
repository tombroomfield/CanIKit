import { canI } from "./canI.js";
import { searchForPolicies } from "./policySearch.js";

export function handle(
  { error } = { error: (_code, _opts) => {} },
  {
    pagePolicies,
    pageSevers,
    layoutPolicies,
    layoutServers,
    apiServers,
    apiPolicies,
  } = {}
) {
  return async ({ event, resolve }) => {
    if (!event.route.id) {
      return await resolve(event);
    }

    const policies = searchForPolicies({
      path: event.route.id,
      pagePolicies,
      pageSevers,
      layoutServers,
      layoutPolicies,
      apiServers,
      apiPolicies,
      error,
    });
    let ranIt = false;

    event.locals.skipCanI = () => {
      ranIt = true;
    };

    event.locals.canI = canI({ policies, event, error }, () => (ranIt = true));

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
      throw new error(500, `CanI not called for route ${event.route.id}`);
    }

    return response;
  };
}
