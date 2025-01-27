import { Locator, Page, expect } from '@playwright/test'

export default class SideMenuComponent{
    readonly page: Page
    readonly dashboard: Locator
    readonly valuationAndReconciliation: Locator
    readonly fullDnav: Locator
    readonly submenu_auditDirectory: Locator

    constructor(page: Page){
        this.page = page
        this.dashboard = this.page.locator('a[href="/US/dashboard"]')
        this.valuationAndReconciliation = this.page.locator('a[href="/US/modularized-procedures"]')
        this.fullDnav = this.page.getByRole('menuitem', { name: 'Full DNAV' })
        this.submenu_auditDirectory = this.page.getByRole("menuitem", { name: "Audit Directory"})
    }

    async clickDashboard(){
       await this.dashboard.click()
    }

    async clickModular(){
        await this.valuationAndReconciliation.locator(`div.ant-space-item>span.ant-typography >>text="Valuation & Reconciliation"`).click()
    }

    async clickAuditDirectory(){
        await this.fullDnav.click()
        await this.submenu_auditDirectory.click()
    }
}