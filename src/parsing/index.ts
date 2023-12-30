import { isInvalidServerCode } from "./valid_server_code";
import { invalidServer } from "src/errors/handlers";
import { pipe } from "fp-ts/function";

export function validServer(
  fileName: string,
  code: string,
  lax: boolean
): boolean {
  /* 
    Take the code in the server file,
    check to ensure it has a call to `canI()` or a `// skip-can-i` comment.
    If it doesn't, throw an error or log a warning depending on the lax option.
  */
  return pipe(code, isInvalidServerCode, invalidServer({ lax, fileName }));
}
