import { Page, Locator, expect } from '@playwright/test';

export class ToasterMessageComponent {
    toasterMessage: Locator;

    constructor(private page: Page) {
        this.toasterMessage = this.page.locator('div.ant-notification-notice-message');
    }

    async verifyToasterMessage(expectedMessage: string) {
        await this.toasterMessage.waitFor({ state: 'visible' }); 
        await expect(this.toasterMessage).toContainText(expectedMessage);
        console.log(`Toaster message verified: ${expectedMessage}`);
    }
}