import type { OptionalFireable, FireableContext } from "src/types/handlers";
/**
 * Creates a function that invokes a method on a class instance.
 * @param functionName - The name of the method to invoke.
 * @param policy - The class to create an instance of.
 * @returns A function that invokes the specified method on the class instance.
 */
export declare function klass({ functionName, policy, route }: FireableContext): OptionalFireable;
export declare function missingClassFunction(functionName: string, route: string): never;
