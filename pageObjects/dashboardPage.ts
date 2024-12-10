import { Locator, Page, expect } from '@playwright/test'

export default class DashboardPage{
    readonly page: Page

    constructor(page: Page){
        this.page = page
    }

    async navigate(optionText: String): Promise<void>{
       const menuOption = this.page.locator(`a[href="/US/modularized-procedures"] div.ant-space-item>span.ant-typography >>text="${optionText}"`)
       await menuOption.click()
    }
}