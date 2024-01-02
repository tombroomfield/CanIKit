import {
  objectIsDefaultImportedModule,
  defaultImportedModuleFunctionIsPresent,
} from "./default_import";

import * as importModule from "./default_import";

describe("objectIsDefaultImportedModule", () => {
  it("should return true if the object has a 'default' property", () => {
    const obj = {
      default: {},
    };
    expect(objectIsDefaultImportedModule(obj)).toBe(true);
  });

  it("should return false if the object does not have a 'default' property", () => {
    const obj = {};
    expect(objectIsDefaultImportedModule(obj)).toBe(false);
  });

  it("should return false if the object is not of type 'object'", () => {
    const obj = "not an object";
    expect(objectIsDefaultImportedModule(obj)).toBe(false);
  });

  it("should work for a real imported module", () => {
    expect(objectIsDefaultImportedModule(importModule)).toBe(true);
  });
});

describe("importedModuleFunctionIsPresent", () => {
  it("should return true if the object is an imported module and the specified function is present", () => {
    const obj = {
      default: {
        func: () => {},
      },
    };
    const func = "func";
    expect(defaultImportedModuleFunctionIsPresent(obj, func)).toBe(true);
  });

  it("should return false if the object is not an imported module", () => {
    const obj = {
      func: () => {},
    };
    const func = "func";
    expect(defaultImportedModuleFunctionIsPresent(obj, func)).toBe(false);
  });

  it("should return false if the specified function is not present in the imported module", () => {
    const obj = {
      default: {},
    };
    const func = "func";
    expect(defaultImportedModuleFunctionIsPresent(obj, func)).toBe(false);
  });

  it("should work for a real imported module", () => {
    const func = "foo";
    expect(defaultImportedModuleFunctionIsPresent(importModule, func)).toBe(
      true
    );
  });
});
