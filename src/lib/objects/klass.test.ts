import { objectIsClass, classFunctionIsPresent } from "./klass";

describe("objectIsClass", () => {
  it("should return true if the object is a class", () => {
    class MyClass {}
    expect(objectIsClass(MyClass)).toBe(true);
  });

  it("should return false if the object is not a class", () => {
    const obj = {};
    expect(objectIsClass(obj)).toBe(false);
  });

  it("should return false if the object is a function without a prototype", () => {
    const func = () => {};
    expect(objectIsClass(func)).toBe(false);
  });
});

describe("classFunctionIsPresent", () => {
  it("should return true if the class has the specified function", () => {
    class MyClass {
      myFunction() {}
    }
    expect(classFunctionIsPresent(MyClass, "myFunction")).toBe(true);
  });

  it("should return false if the class does not have the specified function", () => {
    class MyClass {}
    expect(classFunctionIsPresent(MyClass, "myFunction")).toBe(false);
  });

  it("should return false if the object is not a class", () => {
    const obj = {};
    expect(classFunctionIsPresent(obj, "myFunction")).toBe(false);
  });

  it("should return false if the object is a function without a prototype", () => {
    const func = () => {};
    expect(classFunctionIsPresent(func, "myFunction")).toBe(false);
  });
});
