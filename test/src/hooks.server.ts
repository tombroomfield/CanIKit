import CanIKit from "../../src";
import { dev } from "$app/environment";
import { error } from "@sveltejs/kit";

export const handle = CanIKit.handle(
  {
    dev,
    error,
  },
  {
    pagePolicies: import.meta.glob("./routes/**/page.policy.*"),
    pageSevers: import.meta.glob("./routes/**/+page.server.*"),
    layoutPolicies: import.meta.glob("./routes/**/layout.policy.*"),
    layoutServers: import.meta.glob("./routes/**/+layout.server.*"),
    apiServers: import.meta.glob("./routes/**/+server.*"),
    apiPolicies: import.meta.glob("./routes/**/policy.*"),
  }
);
