import { Page, Locator, expect } from '@playwright/test';

import { CardComponent } from '../components/cardComponent';
import { PrepareReviewComponent } from '../components/prepareReviewComponent';
import { TableComponent } from '../components/tableComponent';
import { PopupComponent } from '../components/popupComponent';

export default class ReportingPhasePage {
    private readonly page: Page;
    titlePage: Locator;
    prepareReviewComponent: PrepareReviewComponent
    DataExtractionCard: CardComponent
    generateDataExtractButton: Locator
    alertWarningMessage: Locator
    alertSuccessMessage: Locator
    spiner: Locator
    spinerInstedTable: Locator
    loadingMessage: Locator
    dataExtractTable: TableComponent
    popupConfirmation: PopupComponent

    constructor(page: Page) {
        this.page = page;
        this.titlePage = this.page.locator('span.ant-page-header-heading-title').nth(1);
        this.generateDataExtractButton = this.page.getByRole('button', {name: 'Generate Data Extract'})
        this.DataExtractionCard = new CardComponent(this.page, 'Data Extraction');
        this.prepareReviewComponent = new PrepareReviewComponent(this.page);
        this.alertWarningMessage = this.page.locator('div.ant-alert.ant-alert-warning');
        this.alertSuccessMessage = this.page.locator('div.ant-alert.ant-alert-success');
        this.spiner = this.page.locator('div.ant-spin.ant-spin-spinning')
        this.spinerInstedTable = this.page.locator('div.ant-spin-nested-loading')
        this.loadingMessage = this.page.locator('.ant-layout-content div:has-text("Loading...")')
    }

    async verifyPageIsOpen(auditName: string){
        await this.page.waitForLoadState('load');
        await expect(this.titlePage).toBeVisible();
        const pageTitle = await this.titlePage.innerText();
        expect(pageTitle).toContain(auditName)
        console.log(`Phase Detail Page is open with title: ${pageTitle}`);
    }

    /// Verify Data Extraction in preparation phase
    async verifyReportingPhaseInPreparation(){
        console.log("To verify Data Extraction in preparation phase")
        await this.DataExtractionCard.verifyCardStatus('In Preparation');
    }

    /// Verify Data Extraction card in preparation phase
    async verifyReportingInReview(){
        await this.DataExtractionCard.verifyCardStatus('In Review');
    }

    /// Verify Data Extraction card Reviewed
    async verifyReportingReviewed(){
        console.log("To verify Reporting Phase Reviewed")
        await this.DataExtractionCard.verifyCardStatus('Reviewed');
    }

    /// Generate Data Extraction files
    async generateDataExtraction(){
        await this.waitForPage()
        console.log("Generating Data Extraction")
        await this.generateDataExtractButton.waitFor({state: 'visible'})
        await this.generateDataExtractButton.click().then(async () => {
            console.log('Generate Data Extract button is clicked')
            this.popupConfirmation = new PopupComponent(this.page, 'Generate Data Extract')
            await this.popupConfirmation.verifyPopupVisible()
            await this.popupConfirmation.clickSubmit('Generate Data Extract')
            this.dataExtractTable = new TableComponent(this.page);
            await this.alertWarningMessage.filter({ hasText: 'Data extractions process is in progress'}).waitFor({state: 'hidden'})
            await this.alertSuccessMessage.filter({ hasText: 'Data extractions process is finished. Audit is unlocked'}).waitFor({state: 'visible'})
            await this.spinerInstedTable.waitFor({state:'hidden'})
            await this.dataExtractTable.verifyIsVisible();
            await console.log('Data extractions process is finished. Audit is unlocked')
        })
    }

    async prepare(){
        
        await this.DataExtractionCard.clickCard();
        await this.generateDataExtraction();
        await this.prepareReviewComponent.toggleOnPrepareBy()
        await this.page.goBack()
        await this.page.waitForTimeout(2000)
        await this.page.reload()
        await this.verifyReportingInReview()
    }

    async review(){
        await this.DataExtractionCard.clickCard()
        await this.prepareReviewComponent.toggleOnReview()
        await this.page.goBack()
        await this.page.waitForTimeout(2000)
        await this.page.reload()
        await this.verifyReportingReviewed()
    }

    async waitForPage() {
        await this.page.waitForLoadState('load');
        await this.loadingMessage.waitFor({state:'hidden'})
        await this.spiner.first().waitFor({state:'hidden'})
    }

}