import { Locator, Page, expect } from '@playwright/test'

export default class ValuationPage{
    readonly page: Page
    readonly clientInput: Locator

    constructor(page: Page){
        this.page = page
        this.clientInput = this.page.locator('input.ant-select-selection-search-input')
    }

    async selectClient(client: string){ 
        await this.clientInput.click()
        await this.clientInput.fill(client)
        await this.page.getByText(client).click()
    }
}