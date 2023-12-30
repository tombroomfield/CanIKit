import { pipe } from "fp-ts/function";

interface ThrowOrWarn {
  (message: string, warn: boolean): false;
}

export const throwOrWarn: ThrowOrWarn = (message, warn) => {
  if (warn) return pipe(message, printWarn, () => false);

  throw pipe(message, Error);
};

function printWarn(msg: string) {
  const yellow = "\x1b[33m";
  const reset = "\x1b[0m";
  console.log(yellow, msg, reset);
}
