export type PolicyClass = {
  new ({ user, resource }: { user: any; resource: any }): any;
};

export type PolicyClassImport = {
  default: PolicyClass;
};

interface AnyFunction {
  create: () => Promise<boolean>;
}
type RespondsToAnyFunction = {
  (...args: any[]): any;
};
export type PolicyFunctionsImport = any;
export type SkipFunction = () => void;
export type ImportFunction = () => Promise<ImportedPolicy>;
export type ImportedPolicy = PolicyClassImport | PolicyFunctionsImport;
export type ClientGlob = Record<string, ImportFunction>;
export type PolicyList = [string, ImportFunction][];

export type Action = "create" | "view" | "update" | "delete";
import { SvelteKitError } from "./request";

export interface ApplicationDefinition {
  pagePolicies: ClientGlob;
  pageSevers: ClientGlob;
  layoutPolicies: ClientGlob;
  layoutServers: ClientGlob;
  apiServers: ClientGlob;
  apiPolicies: ClientGlob;
}

export interface System {
  error: SvelteKitError;
  policy: PolicyClassImport | PolicyFunctionsImport;
  key: string;
  wasRun: SkipFunction;
}

export interface Context {
  user: any;
  resource: any;
  route: string;
  action: Action;
}
