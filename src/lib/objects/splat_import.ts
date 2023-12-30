export function objectIsSplatImportedModule(obj: any) {
  return typeof obj === "object" && !obj.default;
}

export function splatImportedModuleFunctionIsPresent(obj: any, func: string) {
  return !!(
    objectIsSplatImportedModule(obj) &&
    obj[func] &&
    typeof obj[func] === "function"
  );
}
