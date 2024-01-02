/**
 * Check if the file is a server file. This will accept any file that matches the pattern `+*.server.(ts|js)`.
 * @param path The path to check.
 * @returns `true` if the file is a server file, otherwise `false`.
 * @example
 * ```ts
 * isServerFile("./routes/+page.server.ts"); // true
 * ```
 * @category Parsing
 * @internal
 */
export declare function isServerFile(path: string): boolean;
/**
 * Check if the file is not a server file. This will accept any file that does not match the pattern `+*.server.(ts|js)`.
 * @param path The path to check.
 * @returns `true` if the file is not a server file, otherwise `false`.
 * @example
 * ```ts
 * notServerFile("./routes/+page.server.ts"); // false
 * ```
 * @category Parsing
 * @internal
 */
export declare function notServerFile(path: string): boolean;
