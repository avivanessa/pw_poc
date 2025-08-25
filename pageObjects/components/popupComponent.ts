import { Page, Locator, expect } from '@playwright/test';

export class PopupComponent {
  private popupTitle: Locator;
  private popupName: string
  private containerDiv: Locator

  /**
   * Constructor for the popupComponent
   * @param page - instance of Playwright Page
   * @param popupName - name on popup (variable)
   */
  constructor(private page: Page, popupName: string) {
    // selector of the popup based on the provided name
    this.popupName = popupName;
    this.popupTitle = this.page.locator(`span.ant-page-header-heading-title[title="${popupName}"]`);
    this.containerDiv = this.page.getByRole('dialog', { name: popupName }); // Get de parent of the Popup 

  }

  async verifyPopupVisible(){
    await this.containerDiv.waitFor({ state: 'visible' });
    // await this.popupTitle.waitFor({ state: 'visible' });
    expect (await this.containerDiv).toBeVisible();
    console.log(`popup with name "${this.popupName}" is visible.`);
  }

  async clickSubmit(submitName: string){
    const submitButton = this.containerDiv.getByRole('button', { name: submitName });
    await submitButton.waitFor({ state: 'visible' });
    await submitButton.click();
  }

}