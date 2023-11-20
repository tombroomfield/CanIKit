export type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
export interface Request {
  method: Method;
}
export interface Route {
  id: string;
}
export interface Event {
  request: Request;
  route: Route;
  locals: {
    skipCanI: () => void;
    canI: any;
  };
}
export type SvelteKitError = {
  new (code: number, message: string): Error;
};

export type HookResolve = (event: Event) => Promise<any>;
