import Policy from "./page.policy";

export async function load({ locals: { canI } }) {
  await canI(Policy, {});

  return {
    foo: "bar",
  };
}
