export function present(policy: any): boolean {
  return policy && Object.keys(policy).length > 0;
}

export function missing(policy: any): boolean {
  return !present(policy);
}

export function functionPresent(
  policy: any
): (functionName: string) => boolean {
  return (functionName: string): boolean => {
    return !!(policy && policy[functionName]);
  };
}

export function functionMissing(
  policy: any
): (functionName: string) => boolean {
  return (functionName: string): boolean => {
    return !functionPresent(policy)(functionName);
  };
}
