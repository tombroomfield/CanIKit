import { crudMap } from "../utils/index";
import { replaceWithCustomPolicy } from "../utils/policyReplacer";
import { resolvePolicy } from "./policyResolver";
export function canI({ policies, event }, wasRun) {
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
        key,
        wasRun,
      };
      try {
        await resolvePolicy({
          context,
          system,
        });
      } catch (e) {
        if (e.policy.permissionDenied) {
          await e.policy.permissionDenied();
        } else {
          throw e;
        }
      }
    }
  };
}
//# sourceMappingURL=canI.js.map
