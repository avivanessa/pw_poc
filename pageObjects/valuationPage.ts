import { Locator, Page, expect } from '@playwright/test'
import { randomFutureDayCurrentMonth } from '../utils/functions'

export default class ValuationPage{
    readonly page: Page
    readonly clientInput: Locator
    readonly actionsButton: Locator
    readonly addProjectTitle: Locator
    readonly fileInput: Locator
    readonly nextButton: Locator
    readonly folderInput: Locator
    readonly folderName: Locator
    readonly projectInput: Locator
    readonly projectName: Locator
    readonly projectList: Locator
    readonly opinionDate: Locator
    readonly valuationDate: Locator
    readonly allProcedures: Locator
    readonly addProjectButton: Locator
    readonly monthPicker: Locator

    constructor(page: Page){
        this.page = page
        this.clientInput = this.page.locator('input.ant-select-selection-search-input')
        this.actionsButton = this.page.locator('.ant-space-item:has-text("Actions")')
        this.addProjectTitle = this.page.getByText('Add Project')
        this.fileInput = this.page.locator('input[type="file"]')
        this.nextButton = this.page.locator('//button[span[text()="Next"]]')
        this.folderInput = this.page.locator('#rc_select_4')
        this.folderName = this.page.locator('//div[text()="Automation PW"]') // --> this locator should parameterize the folder name somehow.
        this.projectInput = this.page.locator('.ant-select-selection-overflow')
        this.projectList = this.page.locator('rc-virtual-list-holder-inner')
        this.projectName = this.page.locator('//div[text()="GD"]') // --> this locator should parameterize the project name somehow.
        this.opinionDate = this.page.locator('input[name="opinionDate"]')
        this.valuationDate = this.page.locator('input[name="valuationDate"]')
        this.allProcedures = this.page.getByLabel('All Procedures')
        this.addProjectButton = this.page.locator('//button[@type="submit"]/span[contains(text(),"Add Project")]')
        this.monthPicker = this.page.locator('//button[@class="ant-picker-month-btn"]')
    }

    async selectClient(client: string){ 
        await this.clientInput.click()
        await this.clientInput.fill(client)
        await this.page.getByText(client).click()
    }

    async addProject(){
        const clientDataFilePath = './test-data/DNAV_Client_Data_Template 1.xlsm'
        const counterPartyFilePath = './test-data/DNAV_CounterParty_Data_Template 1 1.xlsm'
        const opinionDate = randomFutureDayCurrentMonth()

        await this.actionsButton.click() 
        await this.addProjectTitle.click()
        await this.fileInput.setInputFiles(clientDataFilePath)
        await this.nextButton.click()
        await this.folderInput.click()
        await this.folderName.click()
        await this.projectInput.click()
        await this.projectName.click()
        await this.projectInput.click()
        await this.opinionDate.click()
        await this.opinionDate.click()
        await this.page.getByText(opinionDate, { exact: true }).click()
        await this.valuationDate.click()
        await this.monthPicker.click()
        //await this.allProcedures.click()
        //await this.fileInput.setInputFiles(counterPartyFilePath)
        //await this.addProjectButton.click()
    }
}
