test("isServerFile", () => {});
import { isServerFile, notServerFile } from "./is_server_file";

test("isServerFile", () => {
  expect(isServerFile("./routes/+page.server.ts")).toBe(true);
  expect(isServerFile("./routes/page.ts")).toBe(false);
});

test("notServerFile", () => {
  expect(notServerFile("./routes/+page.server.ts")).toBe(false);
  expect(notServerFile("./routes/page.ts")).toBe(true);
});
