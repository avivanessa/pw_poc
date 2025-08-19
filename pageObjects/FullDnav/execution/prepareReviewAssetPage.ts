import { Page, Locator, expect } from '@playwright/test';
import { DropdownComponent } from '../../components/dropdownComponent';
import { ToasterMessageComponent } from '../../components/toasterMessageComponent';

export class PrepareReviewAssetPage{
    prepareToggle: Locator
    emailPreparedByLabel: Locator
    reviewerToggle: Locator
    emailReviewerByLabel: Locator
    confirmButton: Locator
    popupTitle: Locator
    exceptionCategoryDropdown: DropdownComponent;
    commentSectionInput: Locator;
    savePrepareReviewButton: Locator;
    closeIcon: Locator;
    toasterMessage: ToasterMessageComponent ;
    
    constructor(private page: Page) {
        this.emailPreparedByLabel = this.page.locator('div:has-text("Prepared by") + div').nth(0)
        this.reviewerToggle = this.page.locator('span.ant-switch-inner').nth(1)
        this.emailReviewerByLabel = this.page.locator('div:has-text("Reviewed by") + div').nth(0)
        
        this.exceptionCategoryDropdown = new DropdownComponent(this.page, 'commentCategory');
        this.prepareToggle = page.locator('span.ant-switch-inner').nth(0); // this.page.locator('(//span[@class="ant-switch-inner"])[1]');
        this.confirmButton = this.page.getByRole('button', { name: 'Confirm' });
        this.popupTitle = this.page.locator('');

        this.commentSectionInput =  this.page.locator('//textarea[@name="commentText"]'); // page.getByRole('textbox', { name: 'commentText' });
        this.savePrepareReviewButton = this.page.locator('//button/span[text()="Save"]');
        this.confirmButton = this.page.getByRole('button', { name: 'Confirm' });
        
        this.closeIcon = this.page.getByRole('button', { name: 'Close', exact: true });
        this.toasterMessage = new ToasterMessageComponent(this.page);
        
    }

    async addCommentsAndSave() {
        console.log("addCommentsAndSave - To add comments and save Prepare/Review");
        await this.exceptionCategoryDropdown.selectOption('Finding');
        await this.commentSectionInput.fill("Automation from PW text");
        if (await this.savePrepareReviewButton.isEnabled()) {
            await this.savePrepareReviewButton.click();
            await this.confirmButton.waitFor();
            if (await this.confirmButton.isVisible()) {
                await this.confirmButton.click();
                await this.toasterMessage.verifyToasterMessage('Category');
                // await this.savePrepareReviewButton.waitFor({ state: 'hidden' });
            }
        }
    }

    /*
    This method is used to enable the toggle for Preparer Execution into the Prepare/Review popup.
    It waits for the toggle to be visible, clicks it, and confirms the action.
    */
    async enableTogglePreparerExecution() {
        await this.prepareToggle.waitFor({ state: 'visible' });
        await this.prepareToggle.click();
        await this.confirmButton.waitFor({ state: 'visible' });
        await this.confirmButton.click();
        await this.toasterMessage.verifyToasterMessage('Prepare signed off');
    }

    async enableToggleReviewExecution() {
        await this.reviewerToggle.waitFor({ state: 'visible' });
        await this.reviewerToggle.click();
        await this.confirmButton.waitFor({ state: 'visible' });
        await this.confirmButton.click();
        await this.toasterMessage.verifyToasterMessage('Review signed off');
    }

    async close() {
        console.log("Closing Prepare / Review popup");
        await this.closeIcon.click();
        await this.page.waitForTimeout(2000);
    }
}


