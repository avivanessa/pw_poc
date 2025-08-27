import { Page, Locator, expect } from '@playwright/test';
import { ToasterMessageComponent } from '../../components/toasterMessageComponent';

export class UniquePositionsPage{
    backToAssetList: Locator;
    actionsButton: Locator;
    markAsSignOffOption: Locator;
    allAssetLink: Locator;
    confirmButton: Locator;
    toasterMessage: ToasterMessageComponent;

    constructor(private page: Page) {
        this.backToAssetList = this.page.getByText('Back to audit');
        this.actionsButton = this.page.getByRole('button', { name: 'Actions Caret-Down' });
        this.markAsSignOffOption = this.page.getByText('Mark as Sign off');
        this.allAssetLink = this.page.locator('//span[@class="ant-dropdown-menu-title-content"]/span[contains(text(),"All Assets")]');
        this.confirmButton = this.page.getByRole('button', { name: 'Confirm' });
        this.toasterMessage = new ToasterMessageComponent(this.page);
    }

    async clickBackToAssetList() {
        console.log("Clicking on Back to Asset List");
        await this.backToAssetList.click();
        await expect(this.page.getByText('Assets')).toBeVisible();
    }

    async clickActionsButton() {
        console.log("Clicking on Actions button");
        await this.actionsButton.click();
    }

    async clickMarkAsSignOff() {
        console.log("Clicking on Mark as Sign off option");
        await this.markAsSignOffOption.click();
        await expect(this.page.getByText('Mark as Sign off')).toBeVisible();
    }

    async clickAllAssetsLink() {
        console.log("Clicking on All Assets link");
        await this.allAssetLink.click();
        await expect(this.page.getByText('All Assets')).toBeVisible();
    }

    async reviewUniqueItems() {
        console.log("Reviewing unique items");
        await this.clickActionsButton();
        await this.clickMarkAsSignOff();
        await this.clickAllAssetsLink();
        await this.confirmButton.click();
        await this.toasterMessage.verifyToasterMessage('assets were successfully signed off');
        console.log("Unique items reviewed successfully");
    }
}