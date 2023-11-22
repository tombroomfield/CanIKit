import { error } from "@sveltejs/kit";
export async function view() {
  return false; // Not allowed
}

export async function permissionDenied({ user, resource, action, event }) {
  throw error(403, "Permission denied");
}
