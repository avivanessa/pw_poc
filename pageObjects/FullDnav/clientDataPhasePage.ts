import { Page, Locator, expect } from '@playwright/test';
import { TableComponent } from '../components/tableComponent';
import { CardComponent } from '../components/cardComponent';
import { PrepareReviewComponent } from '../components/prepareReviewComponent';


export default class ClientDataPage {
    private readonly page: Page;
    titlePage: Locator;
    itemsPendingComments: Locator
    clarificationText: Locator
    saveButton: Locator
    spiner: Locator
    prepareReviewComponent: PrepareReviewComponent

    itemsTable: TableComponent
    ClientDataCard: CardComponent
    DeloitteDataCard: CardComponent
    
    
    constructor(page: Page) {
        this.page = page;
        this.ClientDataCard = new CardComponent(this.page, 'Client Data');
        this.DeloitteDataCard = new CardComponent(this.page, 'Deloitte Data');
        this.titlePage = this.page.locator('span.ant-page-header-heading-title').nth(1);    
        this.itemsPendingComments = this.page.locator('span[aria-label="Message-Black"]')     
        this.clarificationText = this.page.locator('textarea[name="clarification"]')
        this.saveButton = this.page.locator('button:has(span:has-text("Save"))')
        this.spiner = this.page.locator('div.ant-spin.ant-spin-spinning');
        this.itemsTable = new TableComponent(this.page);
        this.prepareReviewComponent = new PrepareReviewComponent(this.page);
    }

    async verifyPageIsOpen(auditName: string){
        await this.waitForPage()
        await this.page.waitForLoadState('load');
        await expect(this.titlePage).toBeVisible();
        const pageTitle = await this.titlePage.innerText();
        expect(pageTitle).toContain(auditName)
        console.log(`Phase Detail Page is open with title: ${pageTitle}`);
    }

    /// Verify Client Data and Deloitte Data cards are in preparation phase
    async verifyDataPreparationPhase(){
        console.log("To verify Client Data and Deloitte Data cards are in preparation phase")
        await this.ClientDataCard.verifyCardStatus('In Preparation');
        await this.DeloitteDataCard.verifyCardStatus('In Preparation');  
    }

    /// Verify Client Data in Review and  Deloitte Data cards in preparation phase
    async verifyClientDataInReview(){
        await this.ClientDataCard.verifyCardStatus('In Review');
        await this.DeloitteDataCard.verifyCardStatus('In Preparation');
    }

    /// Verify Client Data in Review and  Deloitte Data cards Reviewed
    async verifyDeloitteDataInReview(){
        console.log("To verify Client Data in Review and Deloitte Data cards Reviewed")
        await this.ClientDataCard.verifyCardStatus('Reviewed');
        await this.DeloitteDataCard.verifyCardStatus('Reviewed');
    }

    /// Prepare Client Data phase
    async prepareClientData(){
        await this.waitForPage()
        await this.verifyDataPreparationPhase();
        await this.ClientDataCard.clickCard();
        await this.verifyClientDataChecks()
        await this.prepare()
        await this.page.goBack()
        await this.titlePage.waitFor({ state: 'visible' })
        await this.page.reload()
        await this.waitForPage()
        await this.titlePage.waitFor({ state: 'visible' })
        await this.verifyClientDataInReview()
    }

    /// Review Client Data phase
    async reviewClientData(){
        await this.waitForPage()
        await this.ClientDataCard.clickCard();
        await this.page.waitForTimeout(2000)
        await this.review()
        await this.page.goBack()
        const maxRetries = 10; // Set the maximum number of retries
        let attempt = 0;
        let success = false;
        while (attempt <= maxRetries && !success) {
            try {
                await this.verifyDeloitteDataInReview();
                success = true; // If no error, mark as successful
            } catch (error) {
                attempt++;
                console.log(`Attempt ${attempt} to validate Deloitte Data is turning Green failed, retrying...`);
                // Optionally: wait a bit before retrying
                await this.page.reload()
                await this.waitForPage()
                await this.page.waitForLoadState('load', {timeout: 15000})
                await this.page.waitForTimeout(5000)
                if (attempt === maxRetries) {
                    throw new Error(`Failed to validate Deloitte Data turning green after ${maxRetries} attempts.`);
                }
            }
        }
    }

    async verifyClientDataChecks(){
        await this.waitForPage()
        await this.page.waitForTimeout(3000)
        await this.commentAllPendingItems()
    }
    
    async commentAllPendingItems() {
        await this.waitForPage()
        await this.itemsTable.verifyIsVisible();
        const items = await this.itemsPendingComments.elementHandles()
        console.log(`Number of items pending comments: ${items.length}`);
        for (const btn of await items) {
            await this.itemsPendingComments.first().click()
            await this.clarificationText.fill('Test Data from Automation Testing')
            await this.saveButton.click()
        }
    }

    async prepare(){
        await this.prepareReviewComponent.toggleOnPrepareBy()
    }

    async review(){
        await this.prepareReviewComponent.toggleOnReview()
    }

    async waitForPage() {
        await this.spiner.waitFor({state: 'hidden', timeout: 10000})
        await this.page.waitForLoadState('domcontentloaded');
    }

}