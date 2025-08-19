import { Page } from '@playwright/test';

import { CardComponent } from '../components/cardComponent';
import { PrepareReviewComponent } from '../components/prepareReviewComponent';

export default class ReportingPhasePage {
    private readonly page: Page;
    prepareReviewComponent: PrepareReviewComponent
    dataExtractionCard: CardComponent

    constructor(page: Page) {
        this.page = page;
        this.dataExtractionCard = new CardComponent(this.page, 'Data Extraction');
        this.prepareReviewComponent = new PrepareReviewComponent(this.page);
    }

    /// Verify Data Extraction is in preparation phase
    async verifyReportingInPreparation(){
        console.log("To verify Data Extraction card is in preparation phase")
        await this.dataExtractionCard.verifyCardStatus('In Preparation');
    }

    /// Verify Data Extraction card in review phase
    async verifyReportingInReview(){
        await this.dataExtractionCard.verifyCardStatus('In Review');
    }

    /// Verify Data Extraction card Reviewed
    async verifyReportingReviewed(){
        console.log("To verify Client Data in Review and Deloitte Data cards Reviewed")
        await this.dataExtractionCard.verifyCardStatus('Reviewed');
    }

    async prepare(){
        await this.dataExtractionCard.clickCard()
        await this.prepareReviewComponent.toggleOnPrepareBy()
        await this.page.goBack()
        await this.page.waitForTimeout(2000)
        await this.page.reload()
        await this.verifyReportingInReview()
    }

    async review(){
        await this.dataExtractionCard.clickCard()
        await this.prepareReviewComponent.toggleOnReview()
        await this.page.goBack()
        await this.page.waitForTimeout(2000)
        await this.page.reload()
        await this.verifyReportingReviewed()
    }
}