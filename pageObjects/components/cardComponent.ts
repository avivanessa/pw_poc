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
    await this.page.waitForLoadState('load');
    this.card.waitFor({ state: 'visible' });
    expect (await this.card).toBeVisible();
    console.log(`Card with name "${this.cardName}" is visible.`);
  }

  async clickCard(){
      await this.card.click();
  }

  async verifyCardStatus(expectedStatus: string){
    await this.cardStatus.waitFor({state: 'attached'})
    const maxRetries = 5; // Set the maximum number of retries
    let attempt = 0;
    let success = false;
    while (attempt <= maxRetries && !success) {
      const currentStatus = await this.cardStatus.innerText();
      try {
        console.log(`Verifying if the card status is '${expectedStatus}'`);
        await expect(currentStatus).toContain(expectedStatus);
        success = true; // If no error, mark as successful
      } catch (error) {
        attempt++;
        console.log(`Attempt ${attempt} verifing card status, retrying...`);
        await this.page.waitForTimeout(5000)
        if (attempt === maxRetries) {
            throw new Error(`Failed - Card Status is still in '${currentStatus}' after ${maxRetries} attempts.`);
        }
      }
    }

    // await this.page.waitForFunction(async selector => await selector.innerText() === expectedStatus, this.cardStatus);
    /*await this.page.waitForFunction(async (selector, expectedStatus) => {
      const text = await selector.innerText();  
    })*/
    await expect(await this.cardStatus.innerText()).toEqual(expectedStatus)
  }
}