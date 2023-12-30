import * as policy from "./page.policy";
import { error } from "@sveltejs/kit";

export async function load({ locals: { canI } }) {
  await canI(policy, {
    denied: () => {
      throw error(403, "DENIED");
    },
  });
  return {
    foo: "bar",
  };
}
