export declare function fireable(policy: any, functionName: string, route: string): ({ user, resource }: {
    user: any;
    resource?: any;
}) => Promise<boolean>;
