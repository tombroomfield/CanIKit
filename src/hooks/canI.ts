import { System, Context, Action, SkipFunction } from "../types/app";
import { Event, SvelteKitError } from "../types/request";
import { crudMap } from "../utils/index";
import { replaceWithCustomPolicy } from "../utils/policyReplacer";
import { resolvePolicy } from "./policyResolver";

export function canI(
  {
    policies,
    event,
    error,
  }: {
    policies: any;
    event: Event;
    error: SvelteKitError;
  },
  wasRun: SkipFunction
) {
  return async ({
    user,
    resource,
    action,
    policy,
  }: {
    user: any;
    resource: any;
    action?: Action;
    policy: any;
  }) => {
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
      action = action || (crudMap[event.request.method] as Action);
      const context = {
        user,
        resource,
        action,
        route: event.route.id,
      } as Context;

      const system = {
        policy,
        error,
        key,
        wasRun,
      } as System;

      await resolvePolicy({
        context,
        system,
      });
    }
  };
}
