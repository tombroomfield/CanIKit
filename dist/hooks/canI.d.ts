import { Action, SkipFunction } from "../types/app";
import { Event, SvelteKitError } from "../types/request";
export declare function canI({ policies, event, error, }: {
    policies: any;
    event: Event;
    error: SvelteKitError;
}, wasRun: SkipFunction): ({ user, resource, action, policy, }: {
    user: any;
    resource: any;
    action?: Action | undefined;
    policy: any;
}) => Promise<void>;
