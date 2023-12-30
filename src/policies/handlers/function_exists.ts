import { functionPresent } from "../present";

export function functionExists(
  policy: any,
  functionName: string,
  route: string
): boolean {
  if (functionPresent(policy)(functionName)) return true;

  throw new Error(
    `Function "${functionName}" does not exist in the policy for the route ${route}`
  );
}
