export function filterKeysByRegex(obj, regex) {
  let results = {};
  for (var k in obj) {
    if (regex.test(k)) {
      results[k] = obj[k];
    }
  }
  return results;
}
