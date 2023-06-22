import { crudMap } from "../utils";

export function canI({ policies, event }, wasRun) {
  return async ({ user, resource, action }) => {
    // This is a +server or +page.server, and it has skipCanI set.
    if (policies === true) {
      wasRun();
      return;
    }

    for (let [key, policyFunc] of policies) {
      const policy = await policyFunc();
      const polClass = policy.default;
      if (polClass) {
        const pol = new polClass({ user, resource });
        const func = action || crudMap[event.request.method];
        if (!pol[func]) {
          if (!key.includes("layout.policy")) {
            throw new Error(
              `The policy for ${event.route.id} does not have the "${func}" function.`
            );
          }
        } else {
          const result = await pol[func]();
          wasRun();
          if (!result) {
            throw new Error(`You are not allowed to ${func} ${event.route.id}`);
          }
        }
      }
    }
  };
}
