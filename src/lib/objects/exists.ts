/**
 * Checks if an object exists (not undefined or null).
 * 
 * @param object - The object to check.
 * @returns True if the object exists, false otherwise.
 */
export function exists(object:any) {
  return object !== undefined && object !== null;
}