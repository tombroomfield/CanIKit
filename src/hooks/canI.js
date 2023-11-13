import { crudMap } from "../utils/index.js";
import { replaceWithCustomPolicy } from "../utils/policyReplacer.js";
import { resolvePolicy } from "./policyResolver.js";

export function canI({ policies, event, error }, wasRun) {
  return async ({ user, resource, action, policy }) => {
    // This is a +server or +page.server, and it has skipCanI set.
    if (policies === true) {
      wasRun();
      return;
    }

    if (policy) {
      policies = replaceWithCustomPolicy(policies, policy);
    }

    for (let [key, policyFunc] of policies) {
      const policy = await policyFunc();
      action = action || crudMap[event.request.method];
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
      await resolvePolicy({
        context,
        system,
      });
    }
  };
}
