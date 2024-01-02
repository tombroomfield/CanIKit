export type OptionalFireable = false | (({ user, resource }: {
    user: any;
    resource?: any;
}) => Promise<boolean>);
