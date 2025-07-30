import { Page, Locator, expect } from '@playwright/test';


import ClientDataPhasePage from './clientDataPhasePage';
import { CardComponent } from '../components/cardComponent';


export default class PhaseDetailPage {
    private readonly page: Page;
    titlePage: Locator;
    ClientDataCard: CardComponent
    DeloitteDataCard: CardComponent
    itemsPendingComments: Locator
    clarificationText: Locator
    saveButton: Locator
    clientDataPhasePage: ClientDataPhasePage
    
    constructor(page: Page) {
        this.page = page;
        this.titlePage = this.page.locator('span.ant-page-header-heading-title').nth(2); 
        this.ClientDataCard = new CardComponent(page, 'Client Data');
        this.DeloitteDataCard = new CardComponent(page, 'Deloitte Data');   
        this.clientDataPhasePage = new ClientDataPhasePage(page);
    }

    async verifyPageIsOpen(auditName: string){
        await expect(this.titlePage).toBeVisible();
        const pageTitle = await this.titlePage.innerText();
        expect(pageTitle).toContain(auditName)
        console.log(`Phase Detail Page is open with title: ${pageTitle}`);
    }

///// Phase: Client Data 

    /// Verify Client Data and Deloitte Data cards are in preparation phase
    async verifyDataPreparationPhase(){
        await this.verifyPageIsOpen('Client Data');
        await this.ClientDataCard.verifyCardVisible();
        await this.ClientDataCard.verifyCardStatus('In Preparation');
        await this.DeloitteDataCard.verifyCardVisible();
        await this.DeloitteDataCard.verifyCardStatus('In Preparation');  
    }

    /// Verify Client Data in Review and  Deloitte Data cards in preparation phase
    async verifyClientDataInReview(){
        await this.ClientDataCard.verifyCardVisible();
        await this.ClientDataCard.verifyCardStatus('In Review');
        await this.DeloitteDataCard.verifyCardVisible();
        await this.DeloitteDataCard.verifyCardStatus('In Preparation');
    }

    /// Verify Client Data in Review and  Deloitte Data cards Reviewed
    async verifyDeloitteDataInReview(){
        await this.ClientDataCard.verifyCardVisible();
        await this.ClientDataCard.verifyCardStatus('Reviewed');
        // TODO: Include for each for refresh page and validate status
        await this.DeloitteDataCard.verifyCardVisible();
        await this.DeloitteDataCard.verifyCardStatus('Reviewed');
    }

    /// Prepare Client Data phase
    async prepareClientData(){
        await this.verifyDataPreparationPhase();
        await this.ClientDataCard.clickCard();
        await this.clientDataPhasePage.verifyClientDataChecks()
        await this.clientDataPhasePage.toggleOnPrepareBy()
        await this.page.goBack()
        await this.verifyClientDataInReview()
    }

    /// Review Client Data phase
    async reviewClientData(){
        await this.ClientDataCard.clickCard();
        await this.clientDataPhasePage.toggleOnReview()
        await this.page.goBack()
        await this.page.reload()
        await this.page.waitForTimeout(10000)
        await this.page.reload()
        await this.verifyDeloitteDataInReview();
    }
}