import { hasSlashComment } from "./has_slash_comment";

describe("hasSlashComment", () => {
  it("should return true when the code contains the specified slash comment", () => {
    const code = "// skip-can-i";
    const hasSkipComment = hasSlashComment(code);
    expect(hasSkipComment("skip-can-i")).toBe(true);
  });

  it("should return false when the code does not contain the specified slash comment", () => {
    const code = "// do-something";
    const hasSkipComment = hasSlashComment(code);
    expect(hasSkipComment("skip-can-i")).toBe(false);
  });

  it("should handle multiple slash comments correctly", () => {
    const code = "// skip-can-i\n// do-something";
    const hasSkipComment = hasSlashComment(code);
    const hasDoSomethingComment = hasSlashComment(code);

    expect(hasSkipComment("skip-can-i")).toBe(true);
    expect(hasDoSomethingComment("do-something")).toBe(true);
  });

  it("should handle code without slash comments correctly", () => {
    const code = "const x = 10;";
    const hasSkipComment = hasSlashComment(code);
    expect(hasSkipComment("skip-can-i")).toBe(false);
  });
});
