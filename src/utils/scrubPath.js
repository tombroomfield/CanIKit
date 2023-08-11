export function scrubPath(path) {
  return path.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
