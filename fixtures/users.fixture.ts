import { test as base, BrowserContext, Page } from '@playwright/test';

type UsersFixture = {
  userPrepareContext: BrowserContext;
  userPreparePage: Page;
  userReviewContext: BrowserContext;
  userReviewPage: Page;
};

export const test = base.extend<UsersFixture>({
  userPrepareContext: async ({ browser }, use) => {
    const context = await browser.newContext({ storageState: './user1_auth.json' });
    await use(context);
    await context.close();
  },
  userPreparePage: async ({ userPrepareContext }, use) => {
    const page = await userPrepareContext.newPage();
    await use(page);
    await page.close();
  },
  userReviewContext: async ({ browser }, use) => {
    const context = await browser.newContext({ storageState: './user2_auth.json' });
    await use(context);
    await context.close();
  },
  userReviewPage: async ({ userReviewContext }, use) => {
    const page = await userReviewContext.newPage();
    await use(page);
    await page.close();
  },
});

