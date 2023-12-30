/**
 * Checks if a given function name has been called in the provided code.
 * @param code The code to search for function calls.
 * @returns A function that takes a function name and returns a boolean indicating if it has been called.
 */
export function hasCalledFunction(
  code: string
): (functionName: string) => boolean {
  return (functionName) => new RegExp(`${functionName}\\s*\\(`, "g").test(code);
}
