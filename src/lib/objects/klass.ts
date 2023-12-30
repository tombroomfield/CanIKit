export function objectIsClass(obj: any) {
  return typeof obj === "function" && !!obj.prototype;
}

export function classFunctionIsPresent(klass: any, func: string) {
  return !!(objectIsClass(klass) && klass.prototype[func]);
}
