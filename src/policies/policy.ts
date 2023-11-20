export default class CanIKitPolicy {
  user?: any;
  resource?: any;

  constructor({ user, resource }: { user: any; resource: any }) {
    this.user = user;
    this.resource = resource;
  }
}
