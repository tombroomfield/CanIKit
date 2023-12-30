/**
 * Returns a function that swaps the given replacement for the string "server".
 * It also removes a preceding "+".
 * @param replacement The string to swap for "server".
 * @returns A function that swaps the given replacement for the string "server".
 * @example
 * ```ts
 * const swapServerPath = swapServerPath("policy");
 * swapServerPath("src/lib/+page.server.ts"); // "src/lib/page.policy.ts"
 * ```
 */
export declare function swapServerPath(replacement: string): (serverPath: string) => string;
