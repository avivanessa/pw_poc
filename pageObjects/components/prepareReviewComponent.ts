import { Page, Locator, expect } from '@playwright/test';

export class PrepareReviewComponent{
    preparerToggle: Locator
    emailPreparedByLabel: Locator
    reviewerToggle: Locator
    emailReviewerByLabel: Locator

    constructor(private page: Page) {

        this.preparerToggle = this.page.locator('div:has-text("Sign off by preparer") + div > button > div')
        this.emailPreparedByLabel = this.page.locator('div:has-text("Prepared by") + div').nth(0)
        this.reviewerToggle = this.page.locator('div:has-text("Sign off by reviewer") + div > button > div')
        this.emailReviewerByLabel = this.page.locator('div:has-text("Reviewed by") + div').nth(0)
        
    }

    async toggleOnPrepareBy(){
        await this.preparerToggle.click()
        await this.page.waitForTimeout(5000)
        console.log(await this.emailPreparedByLabel.innerText())
        await expect(await this.emailPreparedByLabel).toBeVisible()
    }

    async toggleOnReview(){
        await this.reviewerToggle.click()
        await this.page.waitForTimeout(5000)
        console.log(await this.emailReviewerByLabel.innerText())
        await expect(this.emailReviewerByLabel).toBeVisible()
    }
}