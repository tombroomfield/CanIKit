import CanIKit from "../../src";

export const handle = CanIKit.handle({
  pagePolicies: import.meta.glob("./routes/**/page.policy.*"),
  pageSevers: import.meta.glob("./routes/**/+page.server.*"),
  layoutPolicies: import.meta.glob("./routes/**/layout.policy.*"),
  layoutServers: import.meta.glob("./routes/**/+layout.server.*"),
  apiServers: import.meta.glob("./routes/**/+server.*"),
  apiPolicies: import.meta.glob("./routes/**/policy.*"),
});
