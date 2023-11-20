"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchForPolicies = void 0;
const manager_1 = __importDefault(require("../layouts/manager"));
const manager_2 = __importDefault(require("../pages/manager"));
const manager_3 = __importDefault(require("../apis/manager"));
const index_js_1 = require("../utils/index.js");
function searchForPolicies(path, { pagePolicies, pageSevers, layoutServers, layoutPolicies, apiServers, apiPolicies, }, error) {
    path = (0, index_js_1.scrubPath)(path);
    const pageManager = new manager_2.default({
        path,
        pageSevers,
        pagePolicies,
        error,
    });
    let principalPolicy = pageManager.resolvePrincipalPolicy();
    if (!principalPolicy) {
        const apiManager = new manager_3.default({
            path,
            apiServers,
            apiPolicies,
            error,
        });
        principalPolicy = apiManager.resolvePrincipalPolicy();
    }
    const layoutManager = new manager_1.default({
        path,
        layoutServers,
        layoutPolicies,
        error,
    });
    layoutManager.ensureServersHavePolicies();
    return [...layoutManager.ancestorPolicies(), ...principalPolicy];
}
exports.searchForPolicies = searchForPolicies;
//# sourceMappingURL=policySearch.js.map