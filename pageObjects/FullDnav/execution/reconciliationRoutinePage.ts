import { Page, Locator, expect } from '@playwright/test';

export class ReconciliationRoutinePage {

    private readonly page: Page;
    custodyTab: Locator
    futureTab: Locator
    forwardTab: Locator
    loansTab: Locator
    alertDescription: Locator
    
    constructor(page: Page) {
        this.page = page;
        this.custodyTab = this.page.locator('#reconciliation-confirmation-default-tabBar-tab-custody')
        this.futureTab = this.page.locator('#reconciliation-confirmation-default-tabBar-tab-futures')
        this.forwardTab = this.page.locator('#reconciliation-confirmation-default-tabBar-tab-forwards')
        this.loansTab = this.page.locator('#reconciliation-confirmation-default-tabBar-tab-loans')    
    }

    async verifyValuationTabs(){
        await expect(await this.custodyTab.innerText()).toEqual('Custody')
        await expect(await this.futureTab.innerText()).toEqual('Futures')
        await expect(await this.forwardTab.innerText()).toEqual('Forwards')
        await expect(await this.loansTab.innerText()).toEqual('Loans')
    }

    async gotoTabCustody(){
        await expect(await this.custodyTab).toBeVisible()
        await this.custodyTab.click()
    }

    async gotoTabFutures(){
        await expect(await this.futureTab).toBeVisible()
        await this.futureTab.click()
    }

    async gotoTabForward(){
        await expect(await this.forwardTab).toBeVisible()
        await this.forwardTab.click()
    }

    async gotoTabLoans(){
        await expect(await this.loansTab).toBeVisible()
        await this.loansTab.click()
    }
}