import { canI } from "./canI";
import { searchForPolicies } from "./policySearch";

export function handle({
  pagePolicies,
  pageSevers,
  layoutPolicies,
  layoutServers,
  apiServers,
  apiPolicies,
} = {}) {
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
    });
    let ranIt = false;

    event.locals.skipCanI = () => {
      ranIt = true;
    };

    event.locals.canI = canI({ policies, event }, () => (ranIt = true));

    const response = await resolve(event);

    const loadRoute = Object.keys(event).includes("isDataRequest");
    const dataLoadRoute = loadRoute && event.isDataRequest;

    const apiRoute =
      !!(
        apiServers &&
        (apiServers[`./routes${event.route.id}/+server.ts`] ||
          apiServers[`./routes${event.route.id}/+server.js`])
      ) && !dataLoadRoute;

    if (!ranIt && (dataLoadRoute || apiRoute)) {
      throw new Error(`Policy not ran for this route: ${event.route.id}`);
    }

    return response;
  };
}
