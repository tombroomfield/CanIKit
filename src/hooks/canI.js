import { crudMap } from "../utils";

export function canI({ policies, event }, wasRun) {
  return async ({ user, resource }) => {
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
        const func = crudMap[event.request.method];
        if (!pol[func]) {
          if (!key.includes("layout.policy")) {
            throw new Error(
              `The policy for ${event.route.id} does not have the "${
                crudMap[event.request.method]
              }" function.`
            );
          }
        } else {
          const result = await pol[func]();
          wasRun();
          if (!result) {
            throw error(403, `You are not authorized to view this page.`);
            // await pol.handleCant({ event, resolve });
          }
        }
      }
    }
  };
}
