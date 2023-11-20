import { ClientGlob } from "../types/app";

export function filterGlobsByRegex(obj: ClientGlob, regex: RegExp) {
  let results: any = {};
  for (var k in obj) {
    if (regex.test(k)) {
      results[k] = obj[k];
    }
  }
  return results;
}
