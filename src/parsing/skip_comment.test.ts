import { hasSkipComment } from "./skip_comment";

describe("hasSkipComment", () => {
  it("should return true if the code has a skip comment", () => {
    const code = `
      // skip-can-i
      const x = 10;
    `;
    expect(hasSkipComment(code)).toBe(true);
  });

  it("should return false if the code does not have a skip comment", () => {
    const code = `
      const x = 10;
    `;
    expect(hasSkipComment(code)).toBe(false);
  });
});
