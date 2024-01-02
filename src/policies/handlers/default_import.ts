import { objectIsntDefaultImportedModule, defaultImportedModuleFunctionIsntPresent } from "@lib/objects/default_import";
import type { OptionalFireable, FireableContext } from "src/types/handlers";

/**
 * Retrieves the default import function from a policy object.
 * @param functionName - The name of the function to retrieve.
 * @param policy - The policy object.
 * @returns The default import function if it exists, otherwise false.
 */
export function defaultImport({ policy, functionName, route }: FireableContext): OptionalFireable {
  if (objectIsntDefaultImportedModule(policy)) return false;

  if(defaultImportedModuleFunctionIsntPresent(policy, functionName)) return missingDefaultImportedModuleFunction(functionName, route);

  return policy.default[functionName];
}

function missingDefaultImportedModuleFunction(functionName: string, route: string): never {
  throw new Error(`Unable to fire ${functionName} for the policy of the route: ${route}. The module does not have a ${functionName} function.`);
}