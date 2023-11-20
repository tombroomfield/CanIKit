"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvePolicy = void 0;
async function resolvePolicy({ context, system, }) {
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
exports.resolvePolicy = resolvePolicy;
async function resolveKlass({ context, system, }) {
    const polClass = system.policy.default;
    if (polClass) {
        const pol = new polClass(context);
        if (!pol[context.action]) {
            if (!system.key.includes("layout.policy")) {
                throw new Error(`The policy for ${context.route} does not have the "${context.action}" function.`);
            }
        }
        else {
            const result = await pol[context.action]();
            system.wasRun();
            if (!result) {
                throw new system.error(403, "Permission denied");
            }
        }
    }
}
async function resolveFunction({ context, system, }) {
    if (!system.policy[context.action]) {
        if (!system.key.includes("layout.policy")) {
            throw new Error(`The policy for ${context.route} does not have the "${context.action}" function.`);
        }
    }
    else {
        const result = await system.policy[context.action](context);
        system.wasRun();
        if (!result) {
            throw new system.error(403, "Permission denied");
        }
    }
}
//# sourceMappingURL=policyResolver.js.map