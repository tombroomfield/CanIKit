import PermissionDeniedError from "../../../../../../../dist/errors/permission_denied_error.js";
import { error } from "@sveltejs/kit";

export async function load({ locals: { canI } }) {
  try {
    await canI({});
  } catch (e) {
    if (e.name == "PermissionDeniedError") throw error(403, "PERM DENIED");
    throw e;
  }
  return {
    foo: "bar",
  };
}
