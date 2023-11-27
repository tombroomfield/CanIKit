export default class RequiredPagePolicy {
    path: string;
    missing: boolean;
    constructor(path: string);
    [Symbol.iterator](): {
        next: () => {
            value: any;
            done: boolean;
        };
    };
}
