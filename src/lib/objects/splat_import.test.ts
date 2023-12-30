import {
  objectIsSplatImportedModule,
  splatImportedModuleFunctionIsPresent,
} from "./splat_import";

import * as importModule from "./splat_import";

describe("objectIsSplatImportedModule", () => {
  it("should return false if the object has a 'default' property", () => {
    const obj = {
      default: {},
    };
    expect(objectIsSplatImportedModule(obj)).toBe(false);
  });

  it("should return true if the object does not have a 'default' property", () => {
    const obj = {};
    expect(objectIsSplatImportedModule(obj)).toBe(true);
  });

  it("should return false if the object is not of type 'object'", () => {
    const obj = "not an object";
    expect(objectIsSplatImportedModule(obj)).toBe(false);
  });

  it("should work for a real imported module", () => {
    expect(objectIsSplatImportedModule(importModule)).toBe(true);
  });
});

describe("importedModuleFunctionIsPresent", () => {
  it("should return false if the object is an imported module and the specified function is present", () => {
    const obj = {
      default: {
        func: () => {},
      },
    };
    const func = "func";
    expect(splatImportedModuleFunctionIsPresent(obj, func)).toBe(false);
  });

  it("should return true if the object is not an imported module", () => {
    const obj = {
      func: () => {},
    };
    const func = "func";
    expect(splatImportedModuleFunctionIsPresent(obj, func)).toBe(true);
  });

  it("should return false if the specified function is not present in the imported module", () => {
    const obj = {
      default: {},
    };
    const func = "func";
    expect(splatImportedModuleFunctionIsPresent(obj, func)).toBe(false);
  });
});
