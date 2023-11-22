import { error } from "@sveltejs/kit";
import PermissionDeniedError from "../errors/permission_denied_error";
export async function resolvePolicy({ context, system, }) {
    if (system.policy.default) {
        return resolveKlass({
            context,
            system,
        });
    }
    return resolveFunction({
        context,
        system,
    });
}
async function resolveKlass({ context, system, }) {
    const polClass = system.policy.default;
    if (polClass) {
        const pol = new polClass(context);
        if (!pol[context.action]) {
            if (!system.key.includes("layout.policy")) {
                throw error(500, `The policy for ${context.route} does not have the "${context.action}" function.`);
            }
        }
        else {
            const result = await pol[context.action]();
            system.wasRun();
            if (!result) {
                throw new PermissionDeniedError(pol);
            }
        }
    }
}
async function resolveFunction({ context, system, }) {
    if (!system.policy[context.action]) {
        if (!system.key.includes("layout.policy")) {
            throw error(500, `The policy for ${context.route} does not have the "${context.action}" function.`);
        }
    }
    else {
        const result = await system.policy[context.action](context);
        system.wasRun();
        if (!result) {
            throw new PermissionDeniedError(system.policy);
        }
    }
}
//# sourceMappingURL=policyResolver.js.map