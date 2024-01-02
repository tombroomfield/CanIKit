/**
 * Returns a function that checks if a given string contains a slash comment
 * @param comment The comment to check for, without the slashes.
 * @returns A function that checks if a given string contains a slash comment.
 * @example
 * ```ts
 * const hasSkipComment = hasSlashComment("skip-can-i");
 * hasSkipComment("// skip-can-i"); // true
 * ```
 * @category AST
 */
export declare function hasSlashComment(code: string): (comment: string) => boolean;
