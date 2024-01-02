export function objectIsDefaultImportedModule(obj: any) {
  return typeof obj === "object" && !!obj.default;
}

export function objectIsntDefaultImportedModule(obj: any) {
  return !objectIsDefaultImportedModule(obj);
}

export function defaultImportedModuleFunctionIsPresent(obj: any, func: string) {
  return !!(
    objectIsDefaultImportedModule(obj) &&
    obj.default[func] &&
    typeof obj.default[func] === "function"
  );
}

export function defaultImportedModuleFunctionIsntPresent(obj: any, func: string) {
  return !defaultImportedModuleFunctionIsPresent(obj, func);
}

// Used in tests
export default {
  foo: () => {},
};
