import { pipe } from "fp-ts/function";
import { hasCalledFunction } from "@lib/ast";

export function callsCanI(code: string): boolean {
  // Check if the code calls the canI function.
  return pipe("canI", hasCalledFunction(code));
}
