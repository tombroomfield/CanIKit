import { canI } from "src/authorization";
import { Event, HookResolve } from "../types/request";
import { pipe } from "fp-ts/function";

/**
 * Attaches a canI function to the event.locals object.
 * @param {Event} event The event object.
 * @param {HookResolve} resolve The resolve function.
 * @returns {Promise<any>} The result of the resolve function.
 */
export function handle() {
  return async ({ event, resolve }: { event: Event; resolve: HookResolve }) => {
    if (!event.route.id) return await resolve(event);

    event.locals.canI = pipe(
      { route: event.route.id, method: event.request.method },
      canI
    );

    return await resolve(event);
  };
}
