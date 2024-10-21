import { Locator, Page, expect } from '@playwright/test'

export default class SideMenuComponent{
    readonly page: Page
    readonly dashboard: Locator
    readonly valuationAndReconciliation: Locator

    constructor(page: Page){
        this.page = page
        this.dashboard = this.page.locator('a[href="/US/dashboard"]')
        this.valuationAndReconciliation = this.page.locator('a[href="/US/modularized-procedures"]')
    }

    async clickDashboard(){
       await this.dashboard.click()
    }

    async clickModular(){
        await this.valuationAndReconciliation.locator(`div.ant-space-item>span.ant-typography >>text="Valuation & Reconciliation"`).click()
    }
}