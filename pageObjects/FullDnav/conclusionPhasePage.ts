import { Page, Locator, expect } from '@playwright/test';


import { CardComponent } from '../components/cardComponent';
import { PrepareReviewComponent } from '../components/prepareReviewComponent';

export default class ConclusionPhasePage {
    private readonly page: Page;
    titlePage: Locator;
    prepareReviewComponent: PrepareReviewComponent
    CategoryzedExceptionCard: CardComponent

    constructor(page: Page) {
        this.page = page;
        this.titlePage = this.page.locator('span.ant-page-header-heading-title').nth(1);
        this.CategoryzedExceptionCard = new CardComponent(this.page, 'Categorized Exceptions');
        this.prepareReviewComponent = new PrepareReviewComponent(this.page);
    }

    async verifyPageIsOpen(auditName: string){
        await this.page.waitForLoadState('load');
        await expect(this.titlePage).toBeVisible();
        const pageTitle = await this.titlePage.innerText();
        expect(pageTitle).toContain(auditName)
        console.log(`Phase Detail Page is open with title: ${pageTitle}`);
    }

    /// Verify Categorized Exceptions in preparation phase
    async verifyConclusionPhaseInPreparation(){
        console.log("To verify Categorized Exceptions in preparation phase")
        //await this.verifyPageIsOpen('Client Data');
        await this.CategoryzedExceptionCard.verifyCardStatus('In Preparation');
    }

    /// Verify Categorized Exceptions cardin preparation phase
    async verifyConclusionInReview(){
        await this.CategoryzedExceptionCard.verifyCardStatus('In Review');
    }

    /// Verify Categorized Exceptions cardReviewed
    async verifyConclusionReviewed(){
        console.log("To verify Conclusion Phase Reviewed")
        await this.CategoryzedExceptionCard.verifyCardStatus('Reviewed');
    }

    async prepare(){
        await this.CategoryzedExceptionCard.clickCard()
        await this.prepareReviewComponent.toggleOnPrepareBy()
        await this.page.goBack()
        await this.page.waitForTimeout(2000)
        await this.page.reload()
        await this.verifyConclusionInReview()
    }

    async review(){
        await this.CategoryzedExceptionCard.clickCard()
        await this.prepareReviewComponent.toggleOnReview()
        await this.page.goBack()
        await this.page.waitForTimeout(2000)
        await this.page.reload()
        await this.verifyConclusionReviewed()
    }
}