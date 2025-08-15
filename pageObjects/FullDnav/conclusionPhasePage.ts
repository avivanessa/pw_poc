import { Page } from '@playwright/test';

import { CardComponent } from '../components/cardComponent';
import { PrepareReviewComponent } from '../components/prepareReviewComponent';

export default class ConclusionPhasePage {
    private readonly page: Page;
    prepareReviewComponent: PrepareReviewComponent
    categorizedExceptionsCard: CardComponent

    constructor(page: Page) {
        this.page = page;
        this.categorizedExceptionsCard = new CardComponent(this.page, 'Categorized Exceptions');
        this.prepareReviewComponent = new PrepareReviewComponent(this.page);
    }

    /// Verify Categorized Exceptions is in preparation phase
    async verifyConclusionPhaseInPreparation(){
        console.log("To verify Categorized Exceptions card is in preparation phase")
        await this.categorizedExceptionsCard.verifyCardStatus('In Preparation');
    }

    /// Verify Categorized Exceptions card in review phase
    async verifyConclusionInReview(){
        await this.categorizedExceptionsCard.verifyCardStatus('In Review');
    }

    /// Verify Categorized Exceptions card Reviewed
    async verifyConclusionReviewed(){
        console.log("To verify Client Data in Review and Deloitte Data cards Reviewed")
        await this.categorizedExceptionsCard.verifyCardStatus('Reviewed');
    }

    async prepare(){
        await this.categorizedExceptionsCard.clickCard()
        await this.prepareReviewComponent.toggleOnPrepareBy()
        await this.page.goBack()
        await this.page.waitForTimeout(2000)
        await this.page.reload()
        await this.verifyConclusionInReview()
    }

    async review(){
        await this.categorizedExceptionsCard.clickCard()
        await this.prepareReviewComponent.toggleOnReview()
        await this.page.goBack()
        await this.page.waitForTimeout(2000)
        await this.page.reload()
        await this.verifyConclusionReviewed()
    }
}