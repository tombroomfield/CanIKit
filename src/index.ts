import CanIKitPolicy from "./policies/policy";
import { handle, handleError } from "./hooks/index";

const CanIKit = {
  handle,
  handleError,
};

export default CanIKit;
export { CanIKitPolicy };
