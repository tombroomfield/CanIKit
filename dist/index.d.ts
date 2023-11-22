import CanIKitPolicy from "./policies/policy";
import { handle, handleError } from "./hooks/index";
declare const CanIKit: {
    handle: typeof handle;
    handleError: typeof handleError;
};
export default CanIKit;
export { CanIKitPolicy };
