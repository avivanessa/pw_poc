import { Locator, Page, expect } from '@playwright/test'

export default class SideMenuComponent{
    readonly page: Page
    readonly dashboard: Locator

    constructor(page: Page){
        this.page = page
        this.dashboard = this.page.locator('a[href="/US/dashboard"]')
    }

    async clickDashboard(){
       await this.dashboard.click()
    }
}