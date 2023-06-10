import { canI } from "./canI";
import { searchForPolicies } from "./policySearch";

export function hook({
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

    return response;
  };
}
