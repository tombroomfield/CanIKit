import { ApplicationDefinition, PolicyList } from "../types/app";
import { SvelteKitError } from "../types/request";
export declare function searchForPolicies(path: string, { pagePolicies, pageSevers, layoutServers, layoutPolicies, apiServers, apiPolicies, }: ApplicationDefinition, error: SvelteKitError): PolicyList;
