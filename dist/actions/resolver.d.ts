import { Method } from "@lib/types/request";
/**
 * Returns a function that will accept a suppled action and return the action or the mapped rest action if the suppled action is undefined.
 * @param {string} method The method to map to a rest action. Must be one of GET, POST, PUT, PATCH, or DELETE.
 * @example
 * ```ts
 * const action = resolve("GET")("custom") // "custom"
 * const action = resolve("GET")(undefined) // "view"
 * const action = resolve("POST")(undefined) // "create"
 * @returns A function that will accept a suppled action and return the action or the mapped rest action if the suppled action is undefined.
 */
export declare function resolve(method: Method): (suppledAction: string | undefined) => string;
