import { test, expect } from "@playwright/test";
test("guided matching, detail dialog, bag quantities and removal", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Find their perfect gift" }).click();
  for (let i = 0; i < 4; i++)
    await page.getByRole("button", { name: "Next step" }).click();
  await page.getByRole("button", { name: "No food", exact: true }).click();
  await page.getByRole("button", { name: "See my gift matches" }).click();
  await expect(
    page.getByRole("heading", { name: "Their kind of lovely." }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "A Quiet Moment" }),
  ).toHaveCount(0);
  await page.getByRole("button", { name: "Explore this gift" }).first().click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page
    .getByRole("button", { name: "Add to demo bag", exact: true })
    .click();
  await page.getByRole("button", { name: /Open demo bag, 1 items/ }).click();
  await expect(
    page.getByRole("heading", { name: "Your demo bag (1)" }),
  ).toBeVisible();
  await page.getByRole("button", { name: /Increase .* quantity/ }).click();
  await expect(
    page.getByRole("heading", { name: "Your demo bag (2)" }),
  ).toBeVisible();
  await page.getByRole("button", { name: /Decrease .* quantity/ }).click();
  await page.getByRole("button", { name: /Decrease .* quantity/ }).click();
  await expect(
    page.getByRole("heading", { name: "A little room for something lovely." }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).not.toBeVisible();
});
test("empty match keeps constraints and supports budget correction", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Next step" }).click();
  await page.getByRole("button", { name: "Next step" }).click();
  await page.getByRole("button", { name: "Up to $50", exact: true }).click();
  await page.getByRole("button", { name: "Next step" }).click();
  await page.getByRole("button", { name: "Next step" }).click();
  await page.getByRole("button", { name: "See my gift matches" }).click();
  await expect(
    page.getByRole("heading", { name: /A little too specific/ }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Adjust budget" }).click();
  await expect(
    page.getByRole("heading", { name: "What feels right for your budget?" }),
  ).toBeFocused();
});
test("builder total and corporate multiple recipient brief", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("tab", { name: /Build your own/ }).click();
  await expect(
    page.getByRole("button", { name: "Add to demo bag", exact: true }),
  ).toBeDisabled();
  await page.getByRole("button", { name: /Stoneware mug/ }).click();
  await page.getByRole("button", { name: /Herbal tea/ }).click();
  await expect(page.locator(".box-total")).toContainText("$48");
  await page
    .getByRole("button", { name: "Add to demo bag", exact: true })
    .click();
  await page.getByRole("tab", { name: /Gift for a team/ }).click();
  await page.getByLabel("How many recipients?").fill("40");
  await page.getByLabel("Budget per person").selectOption("75");
  await page
    .getByLabel("Where are the gifts going?")
    .selectOption("Multiple recipients & addresses");
  await page.getByRole("button", { name: "Create my demo brief" }).click();
  await expect(page.locator(".brief-result")).toContainText("$3,000");
  await expect(page.locator(".brief-result")).toContainText(
    "No addresses collected",
  );
});
test("responsive layout and keyboard tab navigation", async ({ page }) => {
  await page.goto("/");
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBeTruthy();
  await page.getByRole("tab", { name: /Find a gift/ }).focus();
  await page.keyboard.press("ArrowRight");
  await expect(
    page.getByRole("tab", { name: /Build your own/ }),
  ).toHaveAttribute("aria-selected", "true");
  await page.keyboard.press("End");
  await expect(
    page.getByRole("tab", { name: /Gift for a team/ }),
  ).toHaveAttribute("aria-selected", "true");
});
test("accessibility scans of all pathways, dialog and presentation", async ({
  page,
}) => {
  const { default: AxeBuilder } = await import("@axe-core/playwright");
  async function scan() {
    const result = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(
      result.violations.map((v) => ({
        id: v.id,
        nodes: v.nodes.map((n) => ({
          target: n.target,
          summary: n.failureSummary,
        })),
      })),
    ).toEqual([]);
  }
  await page.goto("/");
  await scan();
  for (let i = 0; i < 4; i++)
    await page.getByRole("button", { name: "Next step" }).click();
  await page.getByRole("button", { name: "See my gift matches" }).click();
  await scan();
  await page.getByRole("button", { name: "Explore this gift" }).first().click();
  await scan();
  await page.keyboard.press("Escape");
  await page.getByRole("tab", { name: /Build your own/ }).click();
  await scan();
  await page.getByRole("tab", { name: /Gift for a team/ }).click();
  await scan();
  await page.goto("/presentation");
  await scan();
});
