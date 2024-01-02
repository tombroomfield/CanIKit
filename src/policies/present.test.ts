import { present, missing, functionPresent, functionMissing } from "./present";

describe("present", () => {
  it("should return true if the policy is present", () => {
    const policy = {
      someKey: "someValue",
    };
    expect(present(policy)).toBe(true);
  });

  it("should return false if the policy is not present", () => {
    const policy = {};
    expect(present(policy)).toBe(false);
  });
});

describe("missing", () => {
  it("should return false if the policy is present", () => {
    const policy = {
      someKey: "someValue",
    };
    expect(missing(policy)).toBe(false);
  });

  it("should return true if the policy is not present", () => {
    const policy = {};
    expect(missing(policy)).toBe(true);
  });
});

describe("functionPresent", () => {
  it("should return true if the function is present in the policy", () => {
    const policy = {
      someFunction: true,
    };
    expect(functionPresent(policy)("someFunction")).toBe(true);
  });

  it("should return false if the function is not present in the policy", () => {
    const policy = {
      someOtherFunction: true,
    };
    expect(functionPresent(policy)("someFunction")).toBe(false);
  });
});

describe("functionMissing", () => {
  it("should return false if the function is present in the policy", () => {
    const policy = {
      someFunction: true,
    };
    expect(functionMissing(policy)("someFunction")).toBe(false);
  });

  it("should return true if the function is not present in the policy", () => {
    const policy = {
      someOtherFunction: true,
    };
    expect(functionMissing(policy)("someFunction")).toBe(true);
  });
});
