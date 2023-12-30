import ts from "typescript";
/**
 * Returns a function that checks if a given typescript node calls a function with the given name.
 *
 * @param functionName The name of the function to check for.
 * @returns A function that checks if a given node calls a function with the given name.
 * @example
 * ```ts
 * const hasCanICall = hasCalledFunction("canI")(node) // true
 * ```
 */
export declare function isAFunctionCalled(name: string): (node: ts.Node) => boolean;
