import type { CanIKitError } from "../../errors/types";
import type { Event } from "../../types/request";
export declare function handleError({ error, _event, }: {
    error: CanIKitError;
    _event: Event;
}): {
    message: string;
} | undefined;
