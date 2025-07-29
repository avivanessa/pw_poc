import { Page, Locator, expect } from '@playwright/test';

export class CardComponent {
  private card: Locator;
  private cardName: string
  private containerDiv: Locator
  private cardStatus: Locator

  /**
   * Constructor for the CardComponent
   * @param page - instance of Playwright Page
   * @param cardName - name on card (variable)
   */
  constructor(private page: Page, cardname: string) {
    // selector of the card based on the provided name
    this.cardName = cardname;
    this.card = page.locator(`span.ant-page-header-heading-title[title="${cardname}"]`);
    this.containerDiv = this.card.locator('xpath=..'); // Get de parent of the Card 
    this.cardStatus = this.containerDiv.locator('xpath=following-sibling::span');

  }

  async verifyCardVisible(){
      expect (await this.card.isVisible()).toBeTruthy();
      console.log(`Card with name "${this.cardName}" is visible.`);
  }

  async clickCard(){
      await this.card.click();
  }

  async verifyCardStatus(expectedstatus){
      await expect(await this.cardStatus.innerText()).toEqual(expectedstatus)
  }
  
}