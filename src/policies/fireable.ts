import { policyExists, klass, splat, defaultImport } from "./handlers";
import { FireableContext } from "../types/handlers";

/**
 * Returns a function that takes fireable policy function.
 * @param policy - The policy object.
 * @param functionName - The name of the function.
 * @param route - The route.
 * @returns A function that takes a user and resource object and returns an async policy function.
 */
export function fireable(
  { policy, functionName, route }: FireableContext
): ({ user, resource }: { user: any; resource?: any }) => Promise<boolean> {
  policyExists(policy, route);

  const fireableContext = { functionName, policy, route };

  return klass(fireableContext) || splat(fireableContext) || defaultImport(fireableContext) || unableToFire(functionName, route);
}

function unableToFire(functionName: string, route: string): never {
  throw new Error(`Unable to fire ${functionName} for the policy of the route: ${route}. The policy is not a supported type.`);
}