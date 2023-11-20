"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.replaceWithCustomPolicy = void 0;
function replaceWithCustomPolicy(policies, policy) {
    const filteredToRemovePages = policies.filter((p) => p[0].includes("layout.policy"));
    policies = [
        ...filteredToRemovePages,
        [
            policy.name,
            async () => {
                return { default: policy };
            },
        ],
    ];
    return policies;
}
exports.replaceWithCustomPolicy = replaceWithCustomPolicy;
//# sourceMappingURL=policyReplacer.js.map