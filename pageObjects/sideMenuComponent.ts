import { Locator, Page, expect } from '@playwright/test'

export default class SideMenuComponent{
    readonly page: Page
    readonly dashboard: Locator
    readonly modular: Locator
    readonly pim: Locator
    readonly fullDnav: Locator
    readonly submenu_auditDirectory: Locator
    readonly submenu_statusMonitor: Locator
    readonly submenu_procedureView: Locator

    constructor(page: Page){
        this.page = page
        this.dashboard = this.page.locator('a[href="/US/dashboard"]')
        this.modular = this.page.locator('a[href="/US/modularized-procedures"]')
        this.fullDnav = this.page.getByRole('menuitem', { name: 'Full DNAV' })
        this.submenu_auditDirectory = this.page.getByRole("menuitem", { name: "Audit Directory"})
        this.submenu_statusMonitor = this.page.getByRole("menuitem", { name: "Status Monitor"})
        this.submenu_procedureView = this.page.getByRole("menuitem", { name: "Procedure View"})
    }

    async clickDashboard(){
       await this.dashboard.click()
    }

    async clickModular(){
        await this.modular.locator(`div.ant-space-item>span.ant-typography >>text="Valuation & Reconciliation"`).click()
    }

    async clickPIM(){
        await this.modular.locator(`div.ant-space-item>span.ant-typography >>text="Private Investment Module"`).click()
    }
    
    async clickPDC(){
        await this.modular.locator(`div.ant-space-item>span.ant-typography >>text="Private Debt Calculator"`).click()
    }

    async clickAuditDirectory(){
        await this.fullDnav.click()
        await this.submenu_auditDirectory.click()
    }

    async clickStatusMonitor(){
        await this.fullDnav.click()
        await this.submenu_statusMonitor.click()
    }

    async clickProcedureView(){
        await this.fullDnav.click()
        await this.submenu_procedureView.click()
    }

}