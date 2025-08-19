import { Locator, Page, expect } from '@playwright/test'

export default class SideMenuPage{
    readonly page: Page
    readonly dashboard: Locator
    readonly valuationAndReconciliation: Locator
    readonly fullDnav: Locator 
    readonly auditDirectorySubMenu: Locator   
    auditDirectoryTitle: Locator
    spiner: Locator

    constructor(page: Page){
        this.page = page
        this.dashboard = this.page.locator('a[href="/US/dashboard"]')
        this.valuationAndReconciliation = this.page.locator('a[href="/US/modularized-procedures"]')
        this.spiner = this.page.locator('div.ant-spin.ant-spin-spinning')
        // this.fullDnav = this.page.locator('a[href="/US/audits"]') 
        //this.fullDnav = this.page.locator('span.ant-menu-title-content >> text="Audit Directory"') 

        this.fullDnav = this.page.locator('//div[@class="ant-layout-sider-children"]/ul/li[2]')
        this.auditDirectorySubMenu = this.page.getByRole('link', { name: 'Audit Directory' })
        this.auditDirectoryTitle = this.page.locator('span.ant-page-header-heading-title >> text="Audit Directory"')
    }

    async clickDashboard(){
        await this.waitForPage()
        await this.dashboard.click()
    }

    async clickModular(){
        await this.waitForPage()
        await this.valuationAndReconciliation.locator(`div.ant-space-item>span.ant-typography >>text="Valuation & Reconciliation"`).click()
    }

    async clickAuditDirectory(){
        await this.waitForPage()
        await this.fullDnav.waitFor({state: 'attached'})
        await this.fullDnav.click()
        await this.auditDirectorySubMenu.waitFor({ state: 'visible' })
        await this.auditDirectorySubMenu.click()
        await this.auditDirectoryTitle.waitFor({ state: 'visible' })
        await expect(this.auditDirectoryTitle).toBeVisible();
    }

    async waitForPage() {
        await this.spiner.waitFor({state:'hidden'})
    }
}