type PolicyClass = {
    new ({ user, resource }: {
        user: any;
        resource: any;
    }): any;
};
export type PolicyClassImport = {
    default: PolicyClass;
};
export type PolicyFunctionsImport = any;
type Policy = PolicyClass | PolicyFunctionsImport;
/**
 * Determines if a user can perform an action on a resource.
 * @param policy
 * @param options
 * @returns
 */
export interface CanI {
    (policy: Policy, options?: {
        user?: any;
        resource?: any;
        denied?: (options: {
            user: any;
            resource: any;
        }) => void;
    }): Promise<boolean>;
}
export {};
