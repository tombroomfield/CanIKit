import { classFunctionIsPresent, classFunctionIsntPresent, objectIsClass, objectIsntClass } from './klass';

describe('classFunctionIsPresent', () => {
  class TestClass {
    testFunction() {}
  }

  it('should return true if the class and function are present', () => {
    const result = classFunctionIsPresent(TestClass, 'testFunction');
    expect(result).toBe(true);
  });

  it('should return false if the class is not present', () => {
    const result = classFunctionIsPresent(undefined, 'testFunction');
    expect(result).toBe(false);
  });

  it('should return false if the function is not present', () => {
    const result = classFunctionIsPresent(TestClass, 'nonExistentFunction');
    expect(result).toBe(false);
  });
});

describe('classFunctionIsntPresent', () => {
  class TestClass {
    testFunction() {}
  }

  it('should return false if the class and function are present', () => {
    const result = classFunctionIsntPresent(TestClass, 'testFunction');
    expect(result).toBe(false);
  });

  it('should return true if the class is not present', () => {
    const result = classFunctionIsntPresent(undefined, 'testFunction');
    expect(result).toBe(true);
  });

  it('should return true if the function is not present', () => {
    const result = classFunctionIsntPresent(TestClass, 'nonExistentFunction');
    expect(result).toBe(true);
  });
});

describe('objectIsClass', () => {
  it('should return true if the object is a class', () => {
    class TestClass {}
    const result = objectIsClass(TestClass);
    expect(result).toBe(true);
  });

  it('should return false if the object is not a class', () => {
    const obj = {};
    const result = objectIsClass(obj);
    expect(result).toBe(false);
  });
});

describe('objectIsntClass', () => {
  it('should return false if the object is a class', () => {
    class TestClass {}
    const result = objectIsntClass(TestClass);
    expect(result).toBe(false);
  });

  it('should return true if the object is not a class', () => {
    const obj = {};
    const result = objectIsntClass(obj);
    expect(result).toBe(true);
  });
});