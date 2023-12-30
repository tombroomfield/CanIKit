import { ApplicationDefinition, PolicyList } from "../types/app";
export declare function fullSearch(path: string, app: ApplicationDefinition): any[];
export declare function ancestorSearch({}: {}): any;
export declare function searchForPolicies(path: string, { pagePolicies, pageSevers, layoutServers, layoutPolicies, apiServers, apiPolicies, }: ApplicationDefinition): PolicyList;
