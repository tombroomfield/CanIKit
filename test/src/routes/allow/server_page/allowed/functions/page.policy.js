import { error } from "@sveltejs/kit";

export async function view({ user, resource }) {
  return false;
}

export async function denied({ user, resource }) {
  throw error(403, "Permission denied");
}
