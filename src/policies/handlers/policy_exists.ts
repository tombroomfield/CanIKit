import { present } from "../present";

export function policyExists(policy: any, route: string): boolean {
  if (present(policy)) return true;
  throw new Error(`Policy not provided for route ${route}`);
}
