import ts from "typescript";
/**
 * Converts a string of code into a typescript AST.
 * @param code The code to convert.
 * @returns The AST.
 * @category AST
 * @internal
 * @example
 * ```ts
 * const ast = toAst("const a = 1");
 */
export declare function toAst(code: string): ts.SourceFile;
