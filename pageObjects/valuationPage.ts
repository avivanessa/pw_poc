import { Locator, Page, expect } from '@playwright/test'

export default class ValuationPage{
    readonly page: Page
    readonly clientInput: Locator
    readonly actionsButton: Locator
    readonly addProjectButton: Locator
    readonly fileInput: Locator

    constructor(page: Page){
        this.page = page
        this.clientInput = this.page.locator('input.ant-select-selection-search-input')
        this.actionsButton = this.page.locator('.ant-space-item:has-text("Actions")')
        this.addProjectButton = this.page.getByText('Add Project')
        this.fileInput = this.page.locator('input[type="file"]')
    }

    async selectClient(client: string){ 
        await this.clientInput.click()
        await this.clientInput.fill(client)
        await this.page.getByText(client).click()
    }

    async addProject(){
        const filePath = 'C:/Users/Joaco/Arroyo Projects/Playwright Dnav/pw_poc/test-data/DNAV_Client_Data_Template.xlsm/pw_poc/test-data/DNAV_Client_Data_Template.xlsm'
        await this.actionsButton.click() 
        await this.addProjectButton.click()
        await this.fileInput.setInputFiles(filePath)
    }
}