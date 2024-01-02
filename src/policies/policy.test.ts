import CanIKitPolicy from "./policy";

describe("CanIKitPolicy", () => {
  it("should create an instance of CanIKitPolicy with user and resource properties", () => {
    const user = { id: 1, name: "John" };
    const resource = { id: 1, name: "Resource" };
    const policy = new CanIKitPolicy({ user, resource });

    expect(policy.user).toEqual(user);
    expect(policy.resource).toEqual(resource);
  });
});
