import { filterKeysByRegex } from "./index.js";
export function directoryLookup(
  path,
  fileReg,
  files,
  foundComponents = {},
  i = 0
) {
  if (i > 100) return null;

  const regex = new RegExp(`^\\.\\/routes${path}\\/${fileReg}\\.(?:js|ts)\\b`);
  const found = filterKeysByRegex(files, regex);
  if (found) {
    foundComponents = { ...foundComponents, ...found };
  }
  if (path.length < 1) return foundComponents;
  const newPath = path.split("/").slice(0, -1).join("/");
  return directoryLookup(newPath, fileReg, files, foundComponents, i + 1);
}
