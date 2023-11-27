import { System, Context, Action, SkipFunction } from "../types/app";
import { Event } from "../types/request";
import { crudMap } from "../utils/index";
import { replaceWithCustomPolicy } from "../utils/policyReplacer";
import { resolvePolicy } from "./policyResolver";

export function canI(
  {
    policies,
    event,
  }: {
    policies: any;
    event: Event;
  },
  wasRun: SkipFunction
) {
  return async ({
    user,
    resource,
    action,
    policy,
  }: {
    user?: any;
    resource?: any;
    action?: Action;
    policy?: any;
  }) => {
    // This is a +server or +page.server, and it has skipCanI set.
    if (policies === true) {
      wasRun();
      return;
    }

    if (policy) {
      policies = replaceWithCustomPolicy(policies, policy);
    } else {
      policies = findEntirePolicyStack();
    }

    for (let [key, policyFunc] of policies) {
      const policy = await policyFunc();
      action = action || (crudMap[event.request.method] as Action);
      const context = {
        user,
        resource,
        action,
        route: event.route.id,
      } as Context;

      const system = {
        policy,
        key,
        wasRun,
      } as System;

      try {
        await resolvePolicy({
          context,
          system,
        });
      } catch (e: any) {
        if (e.policy && e.policy.permissionDenied) {
          await e.policy.permissionDenied({
            user,
            resource,
            action,
            event,
          });
        } else {
          throw e;
        }
      }
    }
  };
}

searchForPolicies(event.route.id, {
  pagePolicies,
  pageSevers,
  layoutServers,
  layoutPolicies,
  apiServers,
  apiPolicies,
});
