import { Event, HookResolve } from "../types/request";
/**
 * Attaches a canI function to the event.locals object.
 * @param {Event} event The event object.
 * @param {HookResolve} resolve The resolve function.
 * @returns {Promise<any>} The result of the resolve function.
 */
export declare function handle(): ({ event, resolve }: {
    event: Event;
    resolve: HookResolve;
}) => Promise<any>;
