import { hasCalledFunction } from "./has_called_function";

describe("hasCalledFunction", () => {
  const code = `
    function add(a, b) {
      return a + b;
    }

    function subtract(a, b) {
      return a - b;
    }

    function multiply(a, b) {
      return a * b;
    }
  `;

  const hasCalled = hasCalledFunction(code);

  it('should return true for function "add"', () => {
    expect(hasCalled("add")).toBe(true);
  });

  it('should return true for function "subtract"', () => {
    expect(hasCalled("subtract")).toBe(true);
  });

  it('should return true for function "multiply"', () => {
    expect(hasCalled("multiply")).toBe(true);
  });

  it('should return false for function "divide"', () => {
    expect(hasCalled("divide")).toBe(false);
  });
});
