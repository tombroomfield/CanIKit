import { Request, Method, Route } from "@lib/types/request";
export interface Event {
    request: Request;
    route: Route;
    locals: {
        canI: any;
    };
}
export type HookResolve = (event: Event) => Promise<any>;
export interface RequestContext {
    method: Method;
    route: string;
}
