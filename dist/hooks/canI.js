"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.canI = void 0;
const index_1 = require("../utils/index");
const policyReplacer_1 = require("../utils/policyReplacer");
const policyResolver_1 = require("./policyResolver");
function canI({ policies, event, error, }, wasRun) {
    return async ({ user, resource, action, policy, }) => {
        // This is a +server or +page.server, and it has skipCanI set.
        if (policies === true) {
            wasRun();
            return;
        }
        if (policy) {
            policies = (0, policyReplacer_1.replaceWithCustomPolicy)(policies, policy);
        }
        for (let [key, policyFunc] of policies) {
            const policy = await policyFunc();
            action = action || index_1.crudMap[event.request.method];
            const context = {
                user,
                resource,
                action,
                route: event.route.id,
            };
            const system = {
                policy,
                error,
                key,
                wasRun,
            };
            await (0, policyResolver_1.resolvePolicy)({
                context,
                system,
            });
        }
    };
}
exports.canI = canI;
//# sourceMappingURL=canI.js.map