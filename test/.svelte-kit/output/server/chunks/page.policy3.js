import { P as ParentPolicy } from "./parent_policy.js";
class Policy extends ParentPolicy {
  async view() {
    return true;
  }
}
export {
  Policy as default
};
