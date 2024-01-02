import { fireable } from "./fireable";

describe("fireable", () => {
  describe("With functions policy", () => {
    const mockPolicy = {
      someFunction: jest.fn().mockResolvedValue(true),
    };

    it("When the policy and function exist, should return the function", () => {
      const result = fireable({ policy: mockPolicy, functionName: "someFunction", route: "someRoute" });
      expect(result).toBe(mockPolicy.someFunction);
    });

    it("When the policy does not exist, should throw an error", () => {
      expect(() => {
        fireable({ policy: undefined, functionName: "someFunction", route: "someRoute" });
      }).toThrowError("Policy not provided for route someRoute");
    });

    it("When the function does not exist, should throw an error", () => {
      expect(() => {
        fireable({ policy: mockPolicy, functionName: "someOtherFunction", route: "someRoute" });
      }).toThrowError(
        'Unable to fire \"someOtherFunction\" from the policy for the route someRoute. The module does not have a \"someOtherFunction\" function.'
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
      const result = fireable({ policy: mockPolicy, functionName: "someFunction", route: "someRoute" });
      expect(result).toBe(mockPolicy.someFunction);
    });

    it("When the policy does not exist, should throw an error", () => {
      expect(() => {
        fireable({ policy: undefined, functionName: "someFunction", route: "someRoute" });
      }).toThrowError("Policy not provided for route someRoute");
    });

    it("When the function does not exist, should throw an error", () => {
      expect(() => {
        fireable({ policy: mockPolicy, functionName: "someOtherFunction", route: "someRoute" });
      }).toThrowError(
        'Unable to fire \"someOtherFunction\" from the policy for the route someRoute. The module does not have a \"someOtherFunction\" function.'
      );
    });
  });
});
