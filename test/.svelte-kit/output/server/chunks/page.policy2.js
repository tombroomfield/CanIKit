import { P as ParentPolicy } from "./parent_policy.js";
class Policy extends ParentPolicy {
  async view() {
    return false;
  }
}
export {
  Policy as default
};
