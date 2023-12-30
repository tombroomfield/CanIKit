import { InvalidHandle } from "src/types/handlers";
/**
 *
 * @param {InvalidHandle} params The parameters for the handler.
 * @param {boolean} params.lax Whether or not to throw an error or just log a warning.
 * @param {string} params.fileName The path of the server file.
 * @returns A function that handles an invalid server file, either throwing an error or logging a warning if the file is invalid.
 * @example
 * ```ts
 * missingPolicy({ lax: false, fileName: "src/routes/api.ts" })(true); // true
 * missingPolicy({ lax: false, fileName: "src/routes/api.ts" })(false); // throws an error
 * missingPolicy({ lax: true, fileName: "src/routes/api.ts" })(false); // logs a warning
 */
export declare function missingPolicy({ lax, fileName, }: InvalidHandle): (valid: boolean) => boolean;
