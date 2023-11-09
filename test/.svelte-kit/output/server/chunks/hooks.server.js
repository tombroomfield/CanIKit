import { D as DEV, e as error } from "./index.js";
const dev = DEV;
function directoryLookup(path, fileReg, files, foundComponents = {}, i = 0) {
  if (i > 100)
    return null;
  const regex = new RegExp(`^\\.\\/routes${path}\\/${fileReg}\\.(?:js|ts)\\b`);
  const found = filterKeysByRegex(files, regex);
  if (found) {
    foundComponents = { ...foundComponents, ...found };
  }
  if (path.length < 1)
    return foundComponents;
  const newPath = path.split("/").slice(0, -1).join("/");
  return directoryLookup(newPath, fileReg, files, foundComponents, i + 1);
}
function filterKeysByRegex(obj, regex) {
  let results = {};
  for (var k in obj) {
    if (regex.test(k)) {
      results[k] = obj[k];
    }
  }
  return results;
}
const crudMap = {
  GET: "view",
  POST: "create",
  PUT: "update",
  DELETE: "delete",
  PATCH: "update"
};
function scrubPath(path) {
  return path.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function replaceWithCustomPolicy(policies, policy) {
  const filteredToRemovePages = policies.filter(
    (p) => p[0].includes("layout.policy")
  );
  policies = [
    ...filteredToRemovePages,
    [
      policy.name,
      async () => {
        return { default: policy };
      }
    ]
  ];
  return policies;
}
function canI({ policies, event, error: error2 }, wasRun) {
  return async ({ user, resource, action, policy }) => {
    if (policies === true) {
      wasRun();
      return;
    }
    if (policy) {
      policies = replaceWithCustomPolicy(policies, policy);
    }
    for (let [key, policyFunc] of policies) {
      const policy2 = await policyFunc();
      const polClass = policy2.default;
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
            throw new error2(403, "Permission denied");
          }
        }
      }
    }
  };
}
class LayoutManager {
  constructor({ path, layoutServers, layoutPolicies, error: error2 }) {
    this.path = path;
    this.layoutServers = layoutServers;
    this.layoutPolicies = layoutPolicies;
    this.error = error2;
  }
  ensureServersHavePolicies() {
    for (let key in this.ancestorsServers()) {
      key = key.replace("+layout.server", "layout\\.policy");
      key = key.split(".").slice(0, -1).join(".");
      const layoutPolicyRegex = new RegExp(`^\\${key}\\.(js|ts)\\b`);
      const layoutPolicyComponent = Object.values(
        filterKeysByRegex(this.layoutPolicies, layoutPolicyRegex)
      )[0];
      if (!layoutPolicyComponent) {
        throw new this.error(
          500,
          `No layout policy found for ${key}, should be ${key.replace("layout.server", "layout.policy").replace("+", "")}`
        );
      }
    }
  }
  ancestorPolicies() {
    const unsorted = directoryLookup(
      this.path,
      "layout\\.policy",
      this.layoutPolicies
    );
    return Object.entries(unsorted).sort((a, b) => a[0].length - b[0].length);
  }
  ancestorsServers() {
    return directoryLookup(this.path, "\\+layout\\.server", this.layoutServers);
  }
}
class PageManager {
  constructor({ path, pageSevers, pagePolicies, error: error2 }) {
    this.path = path;
    this.pageSevers = pageSevers;
    this.pagePolicies = pagePolicies;
    this.error = error2;
  }
  resolvePrincipalPolicy() {
    const pageServer = this.findPageServer();
    const pagePolicy = this.findPagePolicyComponent();
    if (pageServer && !pagePolicy[0]) {
      throw new this.error(500, `No page policy found for ${this.path}`);
    }
    return pagePolicy;
  }
  findPageServer() {
    const pageSerRegex = new RegExp(
      `^\\.\\/routes${this.path}/\\+(page)\\.server\\.(js|ts)\\b`
    );
    return Object.values(filterKeysByRegex(this.pageSevers, pageSerRegex))[0];
  }
  findPagePolicyComponent() {
    const policyRegex = new RegExp(
      `^\\.\\/routes${this.path}/page.policy\\.(js|ts)\\b`
    );
    return Object.entries(filterKeysByRegex(this.pagePolicies, policyRegex));
  }
}
class ApiManager {
  constructor({ path, apiServers, apiPolicies, error: error2 }) {
    this.path = path;
    this.apiServers = apiServers;
    this.apiPolicies = apiPolicies;
    this.error = error2;
  }
  resolvePrincipalPolicy() {
    const apiServer = this.findApiServer();
    const apiPolicy = this.findApiPolicy();
    if (apiServer && !apiPolicy[0]) {
      throw new this.error(500, `No api policy found for ${this.path}`);
    }
    return apiPolicy;
  }
  findApiServer() {
    const serRegex = new RegExp(
      `^\\.\\/routes${this.path}/\\+server\\.(js|ts)\\b`
    );
    return Object.values(filterKeysByRegex(this.apiServers, serRegex))[0];
  }
  findApiPolicy() {
    const policyRegex = new RegExp(
      `^\\.\\/routes${this.path}/policy\\.(js|ts)\\b`
    );
    return Object.entries(filterKeysByRegex(this.apiPolicies, policyRegex));
  }
}
function searchForPolicies({
  path,
  pagePolicies,
  pageSevers,
  layoutServers,
  layoutPolicies,
  apiServers,
  apiPolicies,
  error: error2
}) {
  path = scrubPath(path);
  const pageManager = new PageManager({
    path,
    pageSevers,
    pagePolicies,
    error: error2
  });
  let principalPolicy = pageManager.resolvePrincipalPolicy();
  if (!principalPolicy) {
    const apiManager = new ApiManager({
      path,
      apiServers,
      apiPolicies,
      error: error2
    });
    principalPolicy = apiManager.resolvePrincipalPolicy();
  }
  const layoutManager = new LayoutManager({
    path,
    layoutServers,
    layoutPolicies
  });
  layoutManager.ensureServersHavePolicies();
  return [...layoutManager.ancestorPolicies(), ...principalPolicy];
}
function handle$1({ error: error2 } = { error: (_code, _opts) => {
} }, {
  pagePolicies,
  pageSevers,
  layoutPolicies,
  layoutServers,
  apiServers,
  apiPolicies
} = {}) {
  return async ({ event, resolve }) => {
    if (!event.route.id) {
      return await resolve(event);
    }
    const policies = searchForPolicies({
      path: event.route.id,
      pagePolicies,
      pageSevers,
      layoutServers,
      layoutPolicies,
      apiServers,
      apiPolicies,
      error: error2
    });
    let ranIt = false;
    event.locals.skipCanI = () => {
      ranIt = true;
    };
    event.locals.canI = canI({ policies, event, error: error2 }, () => ranIt = true);
    const response = await resolve(event);
    const apiRoute = !!(apiServers && (apiServers[`./routes${event.route.id}/+server.ts`] || apiServers[`./routes${event.route.id}/+server.js`]));
    const serverRoute = !!(pageSevers && (pageSevers[`./routes${event.route.id}/+page.server.ts`] || pageSevers[`./routes${event.route.id}/+page.server.js`]));
    if (!ranIt && (apiRoute || serverRoute)) {
      throw new error2(500, `CanI not called for route ${event.route.id}`);
    }
    return response;
  };
}
const CanIKit = {
  handle: handle$1
};
const CanIKit$1 = CanIKit;
const handle = CanIKit$1.handle(
  {
    dev,
    error
  },
  {
    pagePolicies: /* @__PURE__ */ Object.assign({ "./routes/allow/server_page/allowed/page.policy.js": () => import("./page.policy.js"), "./routes/block/server_page/not_allowed/page.policy.js": () => import("./page.policy2.js"), "./routes/block/server_page/not_called/page.policy.js": () => import("./page.policy3.js") }),
    pageSevers: /* @__PURE__ */ Object.assign({ "./routes/allow/server_page/allowed/+page.server.js": () => import("../entries/pages/allow/server_page/allowed/_page.server.js"), "./routes/block/server_page/no_policy/+page.server.js": () => import("../entries/pages/block/server_page/no_policy/_page.server.js"), "./routes/block/server_page/not_allowed/+page.server.js": () => import("../entries/pages/block/server_page/not_allowed/_page.server.js"), "./routes/block/server_page/not_called/+page.server.js": () => import("../entries/pages/block/server_page/not_called/_page.server.js") }),
    layoutPolicies: /* @__PURE__ */ Object.assign({}),
    layoutServers: /* @__PURE__ */ Object.assign({}),
    apiServers: /* @__PURE__ */ Object.assign({}),
    apiPolicies: /* @__PURE__ */ Object.assign({})
  }
);
export {
  handle
};
