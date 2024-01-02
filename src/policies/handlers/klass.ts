import { objectIsntClass, classFunctionIsntPresent } from "@lib/objects/klass";
import type { OptionalFireable, FireableContext } from "src/types/handlers";

/**
 * Creates a function that invokes a method on a class instance.
 * @param functionName - The name of the method to invoke.
 * @param policy - The class to create an instance of.
 * @returns A function that invokes the specified method on the class instance.
 */
export function klass({ functionName, policy, route }: FireableContext): OptionalFireable {
  if (objectIsntClass(policy)) return false;

  if(classFunctionIsntPresent(policy, functionName)) return missingClassFunction(functionName, policy);

  return ({ user, resource }: { user: any, resource?: any }) => {
    const instance = new policy({ user, resource });
    return instance[functionName]();
  }
}

export function missingClassFunction(functionName: string, route: string): never {
  throw new Error(`Unable to fire ${functionName} from the policy for the route ${route}. The class does not have a ${functionName} method.`);
}