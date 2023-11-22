import ParentPolicy from "../../../../../lib/parent_policy.js";
import { error, redirect } from "@sveltejs/kit";

export default class Policy extends ParentPolicy {
  async view() {
    return false; // Not allowed
  }

  async permissionDenied({ user, resource, action, event }) {
    throw error(403, "Permission denied");
  }
}
