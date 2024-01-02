import { isValidServerCode, isInvalidServerCode } from "./valid_server_code";

describe("isValidServerCode", () => {
  it("should return true if the code has a skip comment", () => {
    const code = `
      // skip-can-i
      doSomething();
    `;
    expect(isValidServerCode(code)).toBe(true);
  });

  it("should return true if the code calls canI()", () => {
    const code = `
      // No skips here
      canI();
    `;
    expect(isValidServerCode(code)).toBe(true);
  });

  it("should return false if the code doesn't have a skip comment or call canI()", () => {
    const code = `
      console.log("Hello, world!");
    `;
    expect(isValidServerCode(code)).toBe(false);
  });
});

describe("isInvalidServerCode", () => {
  it("should return false if the code has a skip comment", () => {
    const code = `
      // skip-can-i
      doSomething();
    `;
    expect(isInvalidServerCode(code)).toBe(false);
  });

  it("should return false if the code calls canI()", () => {
    const code = `
      // No skips here
      canI();
    `;
    expect(isInvalidServerCode(code)).toBe(false);
  });

  it("should return true if the code doesn't have a skip comment or call canI()", () => {
    const code = `
      console.log("Hello, world!");
    `;
    expect(isInvalidServerCode(code)).toBe(true);
  });
});
