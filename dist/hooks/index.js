"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handle = void 0;
const canI_js_1 = require("./canI.js");
const policySearch_js_1 = require("./policySearch.js");
function handle({ error }, { pagePolicies, pageSevers, layoutPolicies, layoutServers, apiServers, apiPolicies, }) {
    return async ({ event, resolve }) => {
        if (!event.route.id) {
            return await resolve(event);
        }
        const policies = (0, policySearch_js_1.searchForPolicies)(event.route.id, {
            pagePolicies,
            pageSevers,
            layoutServers,
            layoutPolicies,
            apiServers,
            apiPolicies,
        }, error);
        let ranIt = false;
        event.locals.skipCanI = () => {
            ranIt = true;
        };
        event.locals.canI = (0, canI_js_1.canI)({ policies, event, error }, () => (ranIt = true));
        const response = await resolve(event);
        const apiRoute = !!(apiServers &&
            (apiServers[`./routes${event.route.id}/+server.ts`] ||
                apiServers[`./routes${event.route.id}/+server.js`]));
        const serverRoute = !!(pageSevers &&
            (pageSevers[`./routes${event.route.id}/+page.server.ts`] ||
                pageSevers[`./routes${event.route.id}/+page.server.js`]));
        if (!ranIt && (apiRoute || serverRoute)) {
            throw new error(500, `CanI not called for route ${event.route.id}`);
        }
        return response;
    };
}
exports.handle = handle;
//# sourceMappingURL=index.js.map