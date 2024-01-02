import { objectIsntSplatImportedModule, splatImportedModuleFunctionIsntPresent } from "@lib/objects/splat_import";
import type { OptionalFireable, FireableContext } from "src/types/handlers";

/**
 * Executes the specified function from the policy object.
 * @param functionName - The name of the function to execute.
 * @param policy - The policy object containing the function.
 * @returns A function that takes a user and resource object and executes the specified function from the policy object.
 */
export function splat({ functionName, policy, route }: FireableContext): OptionalFireable {
  if(objectIsntSplatImportedModule(policy)) return false;
  
  if(splatImportedModuleFunctionIsntPresent(policy, functionName)) return missingSplatImportedModuleFunction(functionName, route);

  return policy[functionName];
}

function missingSplatImportedModuleFunction(functionName: string, route: any): never {
  throw new Error(`Unable to fire "${functionName}" from the policy for the route ${route}. The module does not have a "${functionName}" function.`);
}