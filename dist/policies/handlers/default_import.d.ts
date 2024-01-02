import type { OptionalFireable, FireableContext } from "src/types/handlers";
/**
 * Retrieves the default import function from a policy object.
 * @param functionName - The name of the function to retrieve.
 * @param policy - The policy object.
 * @returns The default import function if it exists, otherwise false.
 */
export declare function defaultImport({ policy, functionName, route }: FireableContext): OptionalFireable;
