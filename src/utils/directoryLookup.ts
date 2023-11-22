import { filterGlobsByRegex } from "./index";
import { ClientGlob, PolicyFunctionsImport } from "../types/app";
export function directoryLookup(
  path: string,
  fileReg: string,
  files: ClientGlob,
  foundComponents: any = {},
  i = 0
): PolicyFunctionsImport {
  if (i > 100) throw new Error("Too many directories searched");

  const regex = new RegExp(`^\\.\\/routes${path}\\/${fileReg}\\.(?:js|ts)\\b`);
  const found = filterGlobsByRegex(files, regex);
  if (found) {
    foundComponents = { ...foundComponents, ...found };
  }
  if (path.length < 1) return foundComponents;
  const newPath = path.split("/").slice(0, -1).join("/");
  return directoryLookup(newPath, fileReg, files, foundComponents, i + 1);
}
