import { functionExists } from "./function_exists";

describe("functionExists", () => {
  it("should return true if the function is present in the policy", () => {
    const policy = {
      someFunction: () => {},
    };
    const functionName = "someFunction";
    const route = "/example";
    expect(functionExists(policy, functionName, route)).toBe(true);
  });

  it("should throw an error if the function is not present in the policy", () => {
    const policy = {};
    const functionName = "someFunction";
    const route = "/example";
    expect(() => functionExists(policy, functionName, route)).toThrowError(
      `Function "${functionName}" does not exist in the policy for the route ${route}`
    );
  });
});
