import { fireable } from "./fireable";

describe("fireable", () => {
  describe("With functions policy", () => {
    const mockPolicy = {
      someFunction: jest.fn().mockResolvedValue(true),
    };

    it("When the policy and function exist, should return the function", () => {
      const result = fireable(mockPolicy, "someFunction", "someRoute");
      expect(result).toBe(mockPolicy.someFunction);
    });

    it("When the policy does not exist, should throw an error", () => {
      expect(() => {
        fireable(undefined, "someFunction", "someRoute");
      }).toThrowError("Policy not provided for route someRoute");
    });

    it("When the function does not exist, should throw an error", () => {
      expect(() => {
        fireable(mockPolicy, "someOtherFunction", "someRoute");
      }).toThrowError(
        'Function "someOtherFunction" does not exist in the policy for the route someRoute'
      );
    });
  });

  describe("With a class policy", () => {
    class MockPolicy {
      async someFunction() {
        return true;
      }
    }

    const mockPolicy = new MockPolicy();

    it("When the policy and function exist, should return the function", () => {
      const result = fireable(mockPolicy, "someFunction", "someRoute");
      expect(result).toBe(mockPolicy.someFunction);
    });

    it("When the policy does not exist, should throw an error", () => {
      expect(() => {
        fireable(undefined, "someFunction", "someRoute");
      }).toThrowError("Policy not provided for route someRoute");
    });

    it("When the function does not exist, should throw an error", () => {
      expect(() => {
        fireable(mockPolicy, "someOtherFunction", "someRoute");
      }).toThrowError(
        'Function "someOtherFunction" does not exist in the policy for the route someRoute'
      );
    });
  });
});
