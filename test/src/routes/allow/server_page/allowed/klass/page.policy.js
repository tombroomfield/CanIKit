import ParentPolicy from "../../../../../lib/parent_policy";

export default class Policy extends ParentPolicy {
  async view() {
    return true; // Allowed
  }
}
