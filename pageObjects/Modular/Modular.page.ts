import { Locator, Page, expect } from '@playwright/test'
import { randomFutureDayCurrentMonth } from '../../utils/functions'

export default class ModularPage{
    readonly page: Page
    readonly clientInput: Locator
    readonly actionsButton: Locator
    readonly addProjectTitle: Locator
    readonly fileInput: Locator
    readonly nextButton: Locator
    readonly folderInputDropdown: Locator
    readonly folderName: Locator
    readonly projectInputDropdown: Locator
    readonly projectName: Locator
    readonly listOptionsContainer: Locator
    readonly opinionDate: Locator
    readonly valuationDate: Locator
    readonly allProcedures: Locator
    readonly addProjectButton: Locator
    readonly monthPicker: Locator
    readonly july: Locator
    readonly thirtyOne: Locator

    constructor(page: Page){
        this.page = page
        this.clientInput = this.page.locator('input.ant-select-selection-search-input')
        this.actionsButton = this.page.locator('.ant-space-item:has-text("Actions")')
        this.addProjectTitle = this.page.getByText('Add Project')
        this.fileInput = this.page.locator('input[type="file"]')
        this.nextButton = this.page.locator('//button[span[text()="Next"]]')
        this.folderInputDropdown = this.page.locator('div[name="folderId"] input.ant-select-selection-search-input')
        //this.folderInput = this.page.getByRole('div', { name: 'folderId'})
        // this.folderName = this.page.locator('div[contains(@class, "ant-select-item ant-select-item-option")] text()="Automation PW"]') // --> this locator should parameterize the folder name somehow.
        this.projectInputDropdown = this.page.locator('div[name="fundIds"] input.ant-select-selection-search-input')
        this.listOptionsContainer = this.page.locator('div.rc-virtual-list-holder-inner')
        // this.projectName = this.page.locator('//div[text()="GD"]') // --> this locator should parameterize the project name somehow.
        this.opinionDate = this.page.locator('input[name="opinionDate"]')
        this.valuationDate = this.page.locator('input[name="valuationDate"]')
        this.allProcedures = this.page.getByLabel('All Procedures')
        this.addProjectButton = this.page.locator('//button[@type="submit"]/span[contains(text(),"Add Project")]')
        this.monthPicker = this.page.locator('//button[@class="ant-picker-month-btn"]')
        this.july = this.page.getByText('Jul')
        this.thirtyOne = this.page.getByText('31')
    }

    async selectClient(client: string){ 
        await this.clientInput.click()
        await this.clientInput.fill(client)
        await this.page.getByText(client).click()
    }

    async addProject(folderName: string, projectName: string ){
        const clientDataFilePath = './test-data/DNAV_Client_Data_Template.xlsm'
        const counterPartyFilePath = './test-data/DNAV_CounterParty_Data_Template.xlsm'
        //const opinionDate = randomFutureDayCurrentMonth()

        await this.actionsButton.click() 
        await this.addProjectTitle.click()
        await this.fileInput.setInputFiles(clientDataFilePath)
        await this.nextButton.click()
        await this.folderInputDropdown.click()
        await this.page.locator('div.ant-select-item-option', { hasText: folderName }).click();
        await this.projectInputDropdown.click()
        await this.page.locator('div.ant-select-item-option', { hasText: projectName }).click();
        await this.opinionDate.click()
        await this.opinionDate.fill('12/08/2025')
        //await this.page.getByTitle(opinionDate).click()
        await this.valuationDate.click()
        await this.valuationDate.fill('12/08/2025')
        //valuation date process:
        /*await this.monthPicker.click()
        await this.july.click()
        await this.thirtyOne.nth(2).click()*/
        await this.allProcedures.click()
        await this.fileInput.setInputFiles(counterPartyFilePath)
        await this.addProjectButton.click()
    }
}
