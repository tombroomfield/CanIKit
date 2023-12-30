import { RequestContext } from "src/types/request";
export declare function canI(request: RequestContext): (policy: any, { user, resource, action, denied, }?: {
    user?: any;
    resource?: any;
    action?: string | undefined;
    denied?: any;
}) => Promise<true | undefined>;
