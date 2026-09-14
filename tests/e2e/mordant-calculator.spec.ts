import { expect, test } from "@playwright/test";

test("home page links to all three tools", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Natural Dye Mordant Calculator" })).toBeVisible();
  await expect(page.getByTestId("tool-card-mordant-calculator")).toBeVisible();
  await expect(page.getByTestId("tool-card-iron-modifier-calculator")).toBeVisible();
  await expect(page.getByTestId("tool-card-mordant-reference")).toBeVisible();
});

test("mordant calculator: protein fiber shows a single alum step, no tannin", async ({ page }) => {
  await page.goto("/mordant-calculator");
  await page.getByTestId("fiber-weight-input").fill("100");
  await page.getByTestId("fiber-type-select").selectOption("wool");

  const plan = page.getByTestId("mordant-plan");
  await expect(plan).toContainText("Alum");
  await expect(plan).not.toContainText("Tannin");
  await expect(page.getByTestId("plan-step-0")).toContainText("12 g");
});

test("mordant calculator: cellulose fiber adds tannin then required soda ash before alum", async ({
  page,
}) => {
  await page.goto("/mordant-calculator");
  await page.getByTestId("fiber-weight-input").fill("200");
  await page.getByTestId("fiber-type-select").selectOption("cotton");

  await expect(page.getByTestId("plan-step-0")).toContainText("Tannin");
  await expect(page.getByTestId("plan-step-1")).toContainText("Soda ash");
  await expect(page.getByTestId("plan-step-1")).toContainText("4 g");
  await expect(page.getByTestId("plan-step-2")).toContainText("Alum");
  await expect(page.getByTestId("plan-step-2")).toContainText("30 g");
});

test("mordant calculator: switching tannin type changes the dose", async ({ page }) => {
  await page.goto("/mordant-calculator");
  await page.getByTestId("fiber-weight-input").fill("100");
  await page.getByTestId("fiber-type-select").selectOption("cotton");

  await page.getByTestId("tannin-select").selectOption("gallnut-extract");
  const gallnutText = await page.getByTestId("plan-step-0").textContent();

  await page.getByTestId("tannin-select").selectOption("myrobalan");
  const myrobalanText = await page.getByTestId("plan-step-0").textContent();

  expect(gallnutText).not.toBe(myrobalanText);
});

test("mordant calculator: cream of tartar toggle only appears for protein fibers and adds a step", async ({
  page,
}) => {
  await page.goto("/mordant-calculator");
  await page.getByTestId("fiber-type-select").selectOption("wool");
  await expect(page.getByTestId("cream-of-tartar-toggle")).toBeVisible();

  await page.getByTestId("cream-of-tartar-toggle").check();
  await expect(page.getByTestId("plan-step-1")).toContainText("Cream of tartar");

  await page.getByTestId("fiber-type-select").selectOption("cotton");
  await expect(page.getByTestId("cream-of-tartar-toggle")).toHaveCount(0);
});

test("iron modifier calculator: risk banner reflects the cited source's own thresholds", async ({
  page,
}) => {
  await page.goto("/iron-modifier-calculator");
  await page.getByTestId("iron-fiber-weight-input").fill("100");

  await page.getByTestId("iron-wof-input").fill("2");
  await expect(page.getByTestId("iron-risk-banner")).toContainText("2% WOF sample dose");

  await page.getByTestId("iron-wof-input").fill("3");
  await expect(page.getByTestId("iron-risk-banner")).toContainText("Caution");

  await page.getByTestId("iron-wof-input").fill("5");
  await expect(page.getByTestId("iron-risk-banner")).toContainText("High risk");
});

test("iron modifier calculator shows disposal and health safety copy", async ({ page }) => {
  await page.goto("/iron-modifier-calculator");
  await expect(page.getByText(/never into a stream/i)).toBeVisible();
  await expect(page.getByText(/harmful if swallowed/i)).toBeVisible();
});

test("reference page renders sourced tables", async ({ page }) => {
  await page.goto("/mordant-reference");
  await expect(page.getByRole("heading", { name: "Mordant Reference Chart" })).toBeVisible();
  await expect(page.getByText("naturaldyes.ca")).toBeVisible();
});
