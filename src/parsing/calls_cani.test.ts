import { callsCanI } from "./calls_cani";

describe("callsCanI", () => {
  it("should return true if code calls `canI()`", () => {
    const code = `
      function test() {
        canI();
      }
    `;
    expect(callsCanI(code)).toBe(true);
  });

  it("should return false if code does not call `canI()`", () => {
    const code = `
      function test() {
        console.log("Hello, world!");
      }
    `;
    expect(callsCanI(code)).toBe(false);
  });
});
