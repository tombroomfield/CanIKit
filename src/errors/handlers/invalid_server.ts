import { InvalidHandle } from "src/types/handlers";
import { throwOrWarn } from "@lib/errors/throw_or_warn";

/**
 *
 * @param {InvalidHandle} params The parameters for the handler.
 * @param {boolean} params.lax Whether or not to throw an error or just log a warning.
 * @param {string} params.fileName The path of the server file.
 * @returns A function that handles an invalid server file, either throwing an error or logging a warning if the file is invalid.
 * @example
 * ```ts
 * invalidServer({ lax: false, fileName: "src/routes/api.ts" })(true); // true
 * invalidServer({ lax: false, fileName: "src/routes/api.ts" })(false); // throws an error
 * invalidServer({ lax: true, fileName: "src/routes/api.ts" })(false); // logs a warning
 */
export function invalidServer({
  lax,
  fileName,
}: InvalidHandle): (valid: boolean) => boolean {
  return (valid: boolean): boolean => {
    return valid || throwOrWarn(msg(fileName), lax);
  };
}

function msg(fileName: string): string {
  return `The server file ${fileName} must call 'canI()' or contain a '// skip-can-i' comment.`;
}
