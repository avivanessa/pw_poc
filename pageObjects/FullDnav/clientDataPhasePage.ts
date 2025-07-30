import { Page, Locator, expect } from '@playwright/test';


export default class ClientDataPage {
    private readonly page: Page;
    titlePage: Locator;
    itemsPendingComments: Locator
    clarificationText: Locator
    saveButton: Locator
    preparerToggle: Locator
    emailPreparedByLabel: Locator
    reviewerToggle: Locator
    emailReviewerByLabel: Locator
    
    
    constructor(page: Page) {
        this.page = page;
        this.titlePage = this.page.locator('span.ant-page-header-heading-title');    
        this.itemsPendingComments = this.page.locator('span[aria-label="Message-Black"]')     
        this.clarificationText = this.page.locator('textarea[name="clarification"]')
        this.saveButton = this.page.locator('button:has(span:has-text("Save"))')
        this.preparerToggle = this.page.locator('div:has-text("Sign off by preparer") + div > button > div')
        this.emailPreparedByLabel = this.page.locator('div:has-text("Prepared by") + div')
        this.reviewerToggle = this.page.locator('div:has-text("Sign off by reviewer") + div > button > div')
        this.emailReviewerByLabel = this.page.locator('div:has-text("Reviewed by") + div')
    }

    async verifyPageIsOpen(auditName: string){
        await expect(this.titlePage).toBeVisible();
        const pageTitle = await this.titlePage.innerText();
        expect(pageTitle).toContain(auditName)
        console.log(`Phase Detail Page is open with title: ${pageTitle}`);
    }

    async verifyClientDataChecks(){
        await this.commentAllPendingItems()
        await this.toggleOnPrepareBy()
    }
    
    async commentAllPendingItems() {
        await this.page.reload()
        const items = await this.itemsPendingComments.elementHandles()
        for (const btn of items) {
            await btn.click()
            await this.clarificationText.fill('Test Data from Automation Testing')
            await this.saveButton.click()
        }
    }

    async toggleOnPrepareBy(){
        await this.preparerToggle.click()
        await this.page.waitForTimeout(5000)
        console.log(await this.emailPreparedByLabel.innerText())
        await expect(await this.emailPreparedByLabel).toBeVisible()
    }

    async toggleOnReview(){
        await this.emailReviewerByLabel.click()
        await this.page.waitForTimeout(6000)
        console.log(await this.emailReviewerByLabel.innerText())
        await expect(this.emailReviewerByLabel).toBeVisible()
    }
}