import { policyExists } from "./policy_exists";

describe("policyExists", () => {
  it("should return true if policy is present", () => {
    const policy = { name: "example" };
    const route = "/example";
    expect(policyExists(policy, route)).toBe(true);
  });

  it("should throw an error if policy is not present", () => {
    const policy = null;
    const route = "/example";
    expect(() => policyExists(policy, route)).toThrowError(
      "Policy not provided for route /example"
    );
  });
});
