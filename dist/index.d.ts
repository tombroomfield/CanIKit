import CanIKitPolicy from "./policies/policy";
import { handle } from "./hooks/index";
declare const CanIKit: {
    handle: typeof handle;
};
export default CanIKit;
export { CanIKitPolicy };
