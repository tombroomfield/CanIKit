import "./hooks.server.js";
class CanIKitPolicy {
  constructor({ user, resource }) {
    this.user = user;
    this.resource = resource;
  }
}
class ParentPolicy extends CanIKitPolicy {
}
export {
  ParentPolicy as P
};
