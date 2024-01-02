export type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
export interface Request {
    method: Method;
}
export interface Route {
    id: string;
}
