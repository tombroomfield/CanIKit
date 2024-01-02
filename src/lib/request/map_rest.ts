import { Method } from "@lib/types/request";

export function mapRest(method: Method): string {
  switch (method) {
    case "GET":
      return "view";
    case "POST":
      return "create";
    case "PUT":
      return "update";
    case "PATCH":
      return "update";
    case "DELETE":
      return "delete";
    default:
      throw new Error(`Invalid method: ${method}`);
  }
}
