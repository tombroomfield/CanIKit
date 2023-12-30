import { Action, SkipFunction } from "../types/app";
import { Event } from "../types/request";
export declare function canI({ policies, event, }: {
    policies: any;
    event: Event;
}, wasRun: SkipFunction): ({ user, resource, action, policy, }: {
    user?: any;
    resource?: any;
    action?: Action | undefined;
    policy?: any;
}) => any;
