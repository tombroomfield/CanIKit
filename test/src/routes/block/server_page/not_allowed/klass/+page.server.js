export async function load({ locals: { canI } }) {
  await canI({});
  return {
    foo: "bar",
  };
}
