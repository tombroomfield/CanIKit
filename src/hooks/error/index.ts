import { dev } from "$app/environment";
import type { CanIKitError } from "../../errors/types";
import type { Event } from "../../types/request";

const canIKitErrorNames = ["NoPagePolicyError", "CanINotCalledError"];

export function handleError({
  error,
  _event,
}: {
  error: CanIKitError;
  _event: Event;
}) {
  if (canIKitErrorNames.includes(error.name)) {
    return {
      message:
        process.env.NODE_ENV == "production" ? "Internal error" : error.message,
    };
  }
}
