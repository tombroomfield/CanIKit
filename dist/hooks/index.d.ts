import { ApplicationDefinition } from "../types/app";
import { Event, SvelteKitError, HookResolve } from "../types/request";
export declare function handle({ error }: {
    error: SvelteKitError;
}, { pagePolicies, pageSevers, layoutPolicies, layoutServers, apiServers, apiPolicies, }: ApplicationDefinition): ({ event, resolve }: {
    event: Event;
    resolve: HookResolve;
}) => Promise<any>;
