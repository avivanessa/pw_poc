import { Page, Locator, expect } from '@playwright/test';

export class ValuationRoutinePage {

    private readonly page: Page;
    investmentTab: Locator
    derivativeTab: Locator
    alertDescription: Locator
    
    constructor(page: Page) {
        this.page = page;
        this.investmentTab = this.page.locator('#valuationTabs-tab-investments')
        this.derivativeTab = this.page.locator('#valuationTabs-tab-derivatives')
        this.alertDescription = this.page.locator('//div[@class="ant-alert-description"]')
    }

    async verifyValuationTabs(){
        // await this.page.locator('//span[@class="ant-page-header-heading-title" and @title="'+pro+'"]').click()
        await expect(await this.investmentTab.innerText()).toEqual('Investments and Exchange Traded Position')
        await expect(await this.derivativeTab.innerText()).toEqual('OTC Derivatives')
        await expect(this.alertDescription).toBeVisible()
        await this.derivativeTab.click()
        await expect(this.alertDescription).toBeVisible()
    }

    async gotoTabOtcDerivatives(){
        await expect(await this.derivativeTab).toBeVisible()
        await this.derivativeTab.click()
    }
}