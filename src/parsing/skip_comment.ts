import { hasSlashComment } from "@lib/ast";
import { pipe } from "fp-ts/function";

export function hasSkipComment(code: string): boolean {
  // Check if the code has a skip comment.
  return pipe("skip-can-i", hasSlashComment(code));
}
