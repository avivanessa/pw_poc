import { Locator, Page, expect, BrowserContext } from '@playwright/test'
import exp from 'constants'
import { stat } from 'fs'
import { memoryUsage } from 'process'

export default class HomePage {
    readonly page: Page
    readonly dashboard: Locator
    readonly sidemenuicons: Locator
    fulldnav: Locator
    modularized: Locator
    pdf: Locator
    searchmodule: Locator
    clientmanagement: Locator
    financialstatementworkroom: Locator
    marketdatamonitor: Locator
    dashboardcards: Locator
    first_title: Locator
    submodulesfullDNAV: Locator
    submodulesmodularized: Locator
    statistics: Locator
    recentactivityHeaders: Locator
    auidtDirectorylink: Locator
    auditDirectorypageTitle: Locator
    ra_modularizedProcedureslink: Locator
    modularizedpageTitle: Locator
    btn_createaudit: Locator
    submodule_auditdirectory: Locator
    clientname: Locator
    clientnamedropdown: Locator
    fiscalYear: Locator
    fiscalYeardropdown: Locator
    engagementId: Locator
    engagementIddropdown: Locator
    dataImportIdentifier: Locator
    dataImportIdentifierdropdown: Locator
    btn_next: Locator
    opinionDate: Locator
    formbutton: Locator

    constructor(page: Page) {
        this.page = page
        this.dashboard = this.page.locator('a[href="/US/dashboard"]')
        this.fulldnav = this.page.locator('//div[@class="ant-layout-sider-children"]/ul/li[2]')
        this.modularized = this.page.locator('//div[@class="ant-layout-sider-children"]/ul/li[3]')
        this.pdf = this.page.locator('//div[@class="ant-layout-sider-children"]/ul/li[4]')
        this.searchmodule = this.page.locator('//div[@class="ant-layout-sider-children"]/ul/li[5]')
        this.clientmanagement = this.page.locator('//div[@class="ant-layout-sider-children"]/ul/li[6]')
        this.financialstatementworkroom = this.page.locator('//div[@class="ant-layout-sider-children"]/ul/li[7]')
        this.marketdatamonitor = this.page.locator('//div[@class="ant-layout-sider-children"]/ul/li[8]')
        this.sidemenuicons = this.page.locator('//div[@class="ant-layout-sider-children"]/ul/li')
        this.submodulesfullDNAV = this.page.locator('//li/span[@class="ant-menu-title-content"]/a')
        this.submodulesmodularized = this.page.locator('//li/span[@class="ant-menu-title-content"]/a')
        this.dashboardcards = this.page.locator('//div/span[@title="Dashboard"]/ancestor::div[4]/following-sibling::div[1]/div/div/a/div/div/div/div/span')
        this.statistics = this.page.locator('//div/span[@title="Dashboard"]/ancestor::div[4]/following-sibling::div[1]/div/div/a/div/div/div/div[2]/div/div[2]/div')
        this.recentactivityHeaders = this.page.locator('//div[@id="table-wrapper"]/div/div/span')
        this.auidtDirectorylink = this.page.locator('(//div[@id="table-wrapper"]/div[2]/div/div)[1]')
        this.auditDirectorypageTitle = this.page.locator('//span[@title="Audit Directory"]')
        this.ra_modularizedProcedureslink = this.page.locator('(//div[@id="table-wrapper"]/div[2]/div/div)[2]')
        this.modularizedpageTitle = this.page.locator('//span[@title="Valuation & Reconciliation"]')
        this.btn_createaudit = this.page.locator('//button/span[text()="Create Audit"]')
        this.submodule_auditdirectory = this.page.locator('//a[@href="/US/audits"]')
        this.clientname = this.page.locator('//div[@name="clientName"]')
        this.clientnamedropdown = this.page.locator('//div[@name="clientName"]/div/span/input')
        this.fiscalYear = this.page.locator('//div[@name="fiscalYear"]')
        this.fiscalYeardropdown = this.page.locator('//div[@name="fiscalYear"]/div/span/input')
        this.engagementId = this.page.locator('//div[@name="engagementId"]')
        this.engagementIddropdown = this.page.locator('//div[@name="engagementId"]/div/span/input')
        this.dataImportIdentifier = this.page.locator('//div[@name="dataImportIdentifier"]')
        this.dataImportIdentifierdropdown = this.page.locator('//div[@name="dataImportIdentifier"]/div/span/input')
        this.btn_next = this.page.locator('//button/span[text()="Next"]')
        this.opinionDate = this.page.locator('//input[@name="opinionDate"]')
        this.formbutton = this.page.locator('(//button/span[text()="Create Audit"])[2]')
        this.first_title = this.page.locator('//*[contains(text(),"Recently Viewed Clients")]/following-sibling::div[1]/div[1]/div/div/div/div[1]/span')
    }

    async verifySideMenuIcons() {
        await expect(this.dashboard).toBeVisible()
        await expect(this.dashboard).toContainText('Dashboard')
        await expect(this.fulldnav).toBeVisible()
        await expect(this.fulldnav).toContainText('Full DNAV')
        await expect(this.modularized).toBeVisible()
        await expect(this.modularized).toContainText('Modularized Procedures')
        await expect(this.pdf).toBeVisible()
        await expect(this.pdf).toContainText('Pdf Extraction')
        await expect(this.searchmodule).toBeVisible()
        await expect(this.searchmodule).toContainText('Search Module')
        await expect(this.clientmanagement).toBeVisible()
        await expect(this.clientmanagement).toContainText('Client Management')
        await expect(this.financialstatementworkroom).toBeVisible()
        await expect(this.financialstatementworkroom).toContainText('Financial Statement Workroom')
        await expect(this.marketdatamonitor).toBeVisible()
        await expect(this.marketdatamonitor).toContainText('Market Data Monitor')
    }

    async verifysubModules() {
        await this.fulldnav.click()
        await expect(this.submodulesfullDNAV).toContainText(['Audit Directory', 'Status Monitor', 'Procedure View'])
        await this.page.reload()
        await this.modularized.click()
        await expect(this.submodulesmodularized).toContainText(['Valuation & Reconciliation', 'Private Investment Module', 'Private Debt Calculator'])
    }

    async verifyDashboardCards() {
        await this.dashboard.click()
        await expect(this.dashboardcards).toContainText(['Audit Directory', 'Valuation & Reconciliation', 'Private Investment Module', 'Search Module'], { timeout: 20_000 })
        const statdata = await this.statistics.allTextContents()
        console.log(statdata)
    }

    async verifyRecentActivity() {
        await this.dashboard.click()
        await expect(this.recentactivityHeaders).toContainText(['Audit Directory', 'Modularized Procedures'], { timeout: 20_000 })
        await this.auidtDirectorylink.click()
        const audit_header_text = await this.auditDirectorypageTitle.innerText()
        await expect(audit_header_text).toEqual('Audit Directory')
        await this.page.goBack()
        await this.ra_modularizedProcedureslink.click()
        const module_header_text = await this.modularizedpageTitle.innerText()
        await expect(module_header_text).toEqual('Valuation & Reconciliation')
    }

    async selectsubmoudle(name: string) {
        this.fulldnav.click()
        const sub_mods = await this.submodulesfullDNAV.all()
        for (const mod of sub_mods) {
            if (await mod.innerText() == name) {
                mod.hover()
                mod.click()
            }
        }
    }
}
