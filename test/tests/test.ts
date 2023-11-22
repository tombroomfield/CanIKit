import { expect, test } from "@playwright/test";

test.describe("When visiting a page with no server page", () => {
  test.describe("And no policies", () => {
    test("Then the page should load", async ({ page }) => {
      await page.goto("/allow/no_backend");
      await expect(page.getByTestId("msg")).toHaveText(
        "LOADED - NO BACKEND NO POLICY"
      );
    });
  });
  test.describe("And there is a policy", async () => {
    test("Then the page should load", async ({ page }) => {
      await page.goto("/allow/no_backend");
      await expect(page.getByTestId("msg")).toHaveText(
        "LOADED - NO BACKEND NO POLICY"
      );
    });
  });
});

test.describe("When visiting a page with a server page", () => {
  test.describe("And no policies", () => {
    test("Then the page gives a 500 error", async ({ page }) => {
      await page.goto("/block/server_page/no_policy");
      await expect(page.locator(".message")).toHaveText(
        "No page policy found for /block/server_page/no_policy"
      );
      await expect(page.locator(".status")).toHaveText("500");
    });
  });

  test.describe("And a policy that isn't called", () => {
    test.describe("When we use a class policy", () => {
      test("Then the page gives a 500 error", async ({ page }) => {
        await page.goto("/block/server_page/not_called/klass");
        await expect(page.locator(".message")).toHaveText(
          "CanI not called for route /block/server_page/not_called/klass"
        );
        await expect(page.locator(".status")).toHaveText("500");
      });
    });

    test.describe("When we use a function policy", () => {
      test("Then the page gives a 500 error", async ({ page }) => {
        await page.goto("/block/server_page/not_called/functions");
        await expect(page.locator(".message")).toHaveText(
          "CanI not called for route /block/server_page/not_called/functions"
        );
        await expect(page.locator(".status")).toHaveText("500");
      });
    });
  });

  test.describe("And the policy fails", () => {
    test.describe("When we use a class policy", () => {
      test("Then the page gives a 403 error", async ({ page }) => {
        await page.goto("/block/server_page/not_allowed/klass");
        await expect(page.locator("p")).toHaveText("Permission denied");
        await expect(page.locator("h1")).toHaveText("403");
      });
    });

    test.describe("When we use a function policy", () => {
      test("Then the page gives a 403 error", async ({ page }) => {
        await page.goto("/block/server_page/not_allowed/functions");
        await expect(page.locator("p")).toHaveText("Permission denied");
        await expect(page.locator("h1")).toHaveText("403");
      });
    });
  });

  test.describe("And the policy passes", () => {
    test.describe("When we use a class policy", () => {
      test("Then page should be rendered", async ({ page }) => {
        await page.goto("/allow/server_page/allowed/klass");
        await expect(page.locator("#msg")).toHaveText(
          "LOADED - BACKEND, POLICY, ALLOWED"
        );
      });
    });

    test.describe("When we use a function policy", () => {
      test("Then page should be rendered", async ({ page }) => {
        await page.goto("/allow/server_page/allowed/functions");
        await expect(page.locator("#msg")).toHaveText(
          "LOADED - BACKEND, POLICY, ALLOWED"
        );
      });
    });
  });
});
