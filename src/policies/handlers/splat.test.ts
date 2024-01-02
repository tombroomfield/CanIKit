import { splat } from "./splat";

describe("splat", () => {
  it("should return false if the policy is not a splat", () => {
    class TestClass {
      testFunction() {}
    }

    const result = splat({ functionName: "testFunction", policy: TestClass, route: "someRoute" });

    expect(result).toBe(false);
  });
  
  it("should call the policy function with the correct arguments", () => {
    const policy = {
      functionName: jest.fn(),
    };
    const user = {};
    const resource = {};

    const result = splat({ functionName: "functionName", policy, route: "someRoute" }) as Function;
    result({ user, resource })

    expect(policy.functionName).toHaveBeenCalledWith({ user, resource });
  });

  it("should throw an error if the policy does not have the function", () => {
    const policy = {};
    expect(() => {
      splat({ functionName: "functionName", policy, route: "someRoute" });
    }).toThrowError(
      'Unable to fire "functionName" from the policy for the route someRoute. The module does not have a "functionName" function.'
    );
  });
});