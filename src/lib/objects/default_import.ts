export function objectIsDefaultImportedModule(obj: any) {
  return typeof obj === "object" && !!obj.default;
}

export function defaultImportedModuleFunctionIsPresent(obj: any, func: string) {
  return !!(
    objectIsDefaultImportedModule(obj) &&
    obj.default[func] &&
    typeof obj.default[func] === "function"
  );
}

export default {
  foo: () => {},
};
