export function scrubPath(path: string) {
  return path.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
