/**
 * Checks if the given code is valid server code.
 * This doesn't check to see if the policy file exists, only that the code is valid and has a skip comment or calls `canI()`.
 * @param code The code to check.
 * @returns `true` if the code is valid server code, otherwise `false`.
 * @example
 * ```ts
 * validServerCode("canI()"); // true
 * ```
 *
 * @category Parsing
 * @internal
 */
export declare function isValidServerCode(code: string): boolean;
/**
 * Checks if the given code is invalid server code.
 * This doesn't check to see if the policy file exists, only that the code is invalid and doesn't have a skip comment or call `canI()`.
 * @param code The code to check.
 * @returns `true` if the code is invalid server code, otherwise `false`.
 * @example
 * ```ts
 * invalidServerCode("canI()"); // false
 * ```
 *
 * @category Parsing
 * @internal
 */
export declare function isInvalidServerCode(code: string): boolean;
