import { Locator, Page, expect } from '@playwright/test'

export default class SideMenuPage{
    readonly page: Page
    readonly dashboard: Locator
    readonly valuationAndReconciliation: Locator
    readonly fullDnav: Locator    

    constructor(page: Page){
        this.page = page
        this.dashboard = this.page.locator('a[href="/US/dashboard"]')
        this.valuationAndReconciliation = this.page.locator('a[href="/US/modularized-procedures"]')
        // this.fullDnav = this.page.locator('a[href="/US/audits"]') 
        this.fullDnav = this.page.locator('span.ant-menu-title-content >> text="Audit Directory"') 
        
    }

    async clickDashboard(){
       await this.dashboard.click()
    }

    async clickModular(){
        await this.valuationAndReconciliation.locator(`div.ant-space-item>span.ant-typography >>text="Valuation & Reconciliation"`).click()
    }

    async clickAuditDirectory(){
        await this.fullDnav.locator(`div.ant-space-item>span.ant-typography >>text="Audit Directory"`).click()
    }
}