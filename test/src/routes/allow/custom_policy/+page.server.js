import Policy from "../server_page/allowed/klass/page.policy";

export async function load({ locals: { canI } }) {
  await canI({
    policy: Policy,
  });
  return {
    foo: "bar",
  };
}
