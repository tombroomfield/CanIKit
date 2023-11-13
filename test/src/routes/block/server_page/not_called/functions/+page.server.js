export async function load({ locals: { canI } }) {
  // await canI({}); NOT CALLED
  return {
    foo: "bar",
  };
}
