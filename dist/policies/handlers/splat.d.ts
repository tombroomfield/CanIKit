import type { OptionalFireable, FireableContext } from "src/types/handlers";
/**
 * Executes the specified function from the policy object.
 * @param functionName - The name of the function to execute.
 * @param policy - The policy object containing the function.
 * @returns A function that takes a user and resource object and executes the specified function from the policy object.
 */
export declare function splat({ functionName, policy, route }: FireableContext): OptionalFireable;
