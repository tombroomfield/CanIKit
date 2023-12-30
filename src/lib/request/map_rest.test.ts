import { mapRest } from "./map_rest";

describe("mapRest", () => {
  it('should return "view" for method "GET"', () => {
    expect(mapRest("GET")).toBe("view");
  });

  it('should return "create" for method "POST"', () => {
    expect(mapRest("POST")).toBe("create");
  });

  it('should return "update" for methods "PUT" and "PATCH"', () => {
    expect(mapRest("PUT")).toBe("update");
    expect(mapRest("PATCH")).toBe("update");
  });

  it('should return "delete" for method "DELETE"', () => {
    expect(mapRest("DELETE")).toBe("delete");
  });
});
