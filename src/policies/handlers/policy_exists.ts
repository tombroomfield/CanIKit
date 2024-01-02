import { exists } from "@lib/objects";

export function policyExists(policy: any, route: string): boolean {
  if (exists(policy)) return true;
  console.log(`Policy not provided for route ${route}`, policy);
  throw new Error(`Policy not provided for route ${route}`);
}
