import { UnhandledPermissionDeniedError } from "src/errors";
import { RequestContext } from "src/types/request";
import { resolveAction } from "src/actions";
import { fireable } from "src/policies";

export function canI(request: RequestContext) {
  return async (
    policy: any,
    {
      user,
      resource,
      action,
      denied,
    }: { user?: any; resource?: any; action?: string; denied?: any } = {}
  ) => {
    /* Grab the name of the function to call on the policy. */
    const functionName = resolveAction(request.method)(action);

    /**
     * Go get a fireable function from the policy. This will throw errors if no policy is provided or if the function does not exist.
     * Then call the fireable function with the user and resource.
     */
    const result = await fireable(
      policy,
      functionName,
      request.route
    )({ user, resource });

    // User is authorized, return true.
    if (result) return true;

    /**
     * If the user isn't authorized, call the denied function if it exists, otherwise throw a PermissionDeniedError.
     */
    
    const deniedFunction = denied || policy.denied;
    if (!deniedFunction) throw new UnhandledPermissionDeniedError(request);
    await deniedFunction({ user, resource });
  };
}
