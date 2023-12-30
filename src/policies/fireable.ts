import { policyExists, functionExists } from "./handlers";

export function fireable(
  policy: any,
  functionName: string,
  route: string
): ({ user, resource }: { user: any; resource?: any }) => Promise<boolean> {
  policyExists(policy, route);
  functionExists(policy, functionName, route);

  return policy[functionName];
}
