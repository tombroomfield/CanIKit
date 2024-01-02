import { FireableContext } from "../types/handlers";
/**
 * Returns a function that takes fireable policy function.
 * @param policy - The policy object.
 * @param functionName - The name of the function.
 * @param route - The route.
 * @returns A function that takes a user and resource object and returns an async policy function.
 */
export declare function fireable({ policy, functionName, route }: FireableContext): ({ user, resource }: {
    user: any;
    resource?: any;
}) => Promise<boolean>;
