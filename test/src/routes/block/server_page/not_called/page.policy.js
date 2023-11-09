import ParentPolicy from "../../../../lib/parent_policy.js";

export default class Policy extends ParentPolicy {
  async view() {
    return true;
  }
}
