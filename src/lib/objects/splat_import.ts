export function objectIsSplatImportedModule(obj: any) {
  return typeof obj === "object" && !obj.default
}

export function objectIsntSplatImportedModule(obj: any) {
  return !objectIsSplatImportedModule(obj);
}

export function splatImportedModuleFunctionIsPresent(obj: any, func: string) {
  return !!(
    objectIsSplatImportedModule(obj) &&
    obj[func] &&
    typeof obj[func] === "function"
  );
}

export function splatImportedModuleFunctionIsntPresent(obj: any, func: string) {
  return !splatImportedModuleFunctionIsPresent(obj, func);
}
