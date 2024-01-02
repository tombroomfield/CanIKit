import { exists } from "@lib/objects";

export function policyExists(policy, route) {
  if(!exists(policy)) {
    throw new Error(`Policy for ${route} does not exist`);
  }
}