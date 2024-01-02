import { throwOrWarn } from "./throw_or_warn";

describe("throwOrWarn", () => {
  it("should throw an error when 'warn' is false", () => {
    expect(() => throwOrWarn("Error message", false)).toThrowError(
      "Error message"
    );
  });

  it("should return false when 'warn' is true", () => {
    expect(throwOrWarn("Warning message", true)).toBe(false);
  });
});
