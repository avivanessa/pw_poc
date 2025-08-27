import { Page, Locator, expect } from '@playwright/test';

import { CardComponent } from '../components/cardComponent';
import { PrepareReviewComponent } from '../components/prepareReviewComponent';

export default class ClientDataPage {
    private readonly page: Page;
    titlePage: Locator;
    prepareReviewComponent: PrepareReviewComponent
    MaterialityCard: CardComponent
    PortfolioCard: CardComponent

    constructor(page: Page) {
        this.page = page;
        this.titlePage = this.page.locator('span.ant-page-header-heading-title').nth(1);
        this.MaterialityCard = new CardComponent(this.page, 'Materiality');
        this.PortfolioCard = new CardComponent(this.page, 'Portfolio Overview');
        this.prepareReviewComponent = new PrepareReviewComponent(this.page);
    }

    async verifyPageIsOpen(auditName: string){
        await this.page.waitForLoadState('load');
        await expect(this.titlePage).toBeVisible();
        const pageTitle = await this.titlePage.innerText();
        expect(pageTitle).toContain(auditName)
        console.log(`Phase Detail Page is open with title: ${pageTitle}`);
    }

    /// Verify Materiality and Portfolio cards are in preparation phase
    async verifyPlanningPhaseInPreparation(){
        console.log("To verify Materiality and Portfolio cards are in preparation phase")
        //await this.verifyPageIsOpen('Client Data');
        await this.MaterialityCard.verifyCardStatus('In Preparation');
        await this.PortfolioCard.verifyCardStatus('In Preparation');  
    }

    /// Verify Materiality and Portfolio cards in preparation phase
    async verifyPlanningInReview(){
        await this.MaterialityCard.verifyCardStatus('In Review');
        await this.PortfolioCard.verifyCardStatus('In Review');
    }

    /// Verify Materiality and Portfolio cards Reviewed
    async verifyPlanningReviewed(){
        console.log("To verify Client Data in Review and Deloitte Data cards Reviewed")
        await this.MaterialityCard.verifyCardStatus('Reviewed');
        await this.PortfolioCard.verifyCardStatus('Reviewed');
    }

    async prepare(){
        await this.MaterialityCard.clickCard()
        await this.prepareReviewComponent.toggleOnPrepareBy()
        await this.page.goBack()
        await this.page.waitForTimeout(2000)
        await this.page.reload()
        await this.PortfolioCard.clickCard()
        await this.prepareReviewComponent.toggleOnPrepareBy()
        await this.page.goBack()
        await this.page.waitForTimeout(2000)
        await this.page.reload()
        await this.verifyPlanningInReview()
    }

    async review(){
        await this.MaterialityCard.clickCard()
        await this.prepareReviewComponent.toggleOnReview()
        await this.page.goBack()
        await this.page.waitForTimeout(2000)
        await this.page.reload()
        await this.PortfolioCard.clickCard()
        await this.prepareReviewComponent.toggleOnReview()
        await this.page.goBack()
        await this.page.waitForTimeout(2000)
        await this.page.reload()
        await this.verifyPlanningReviewed()
    }
}