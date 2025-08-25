import { Page, Locator, expect } from '@playwright/test';

import { DropdownComponent } from '../components/dropdownComponent';
import { TableComponent } from '../components/tableComponent';
import ExecutionPhasePage from './executionPhasePage';


export default class FullDnavPage {
    private readonly page: Page;
    createAuditButton: Locator
    clientNameDropdown: DropdownComponent
    clientNameInput: Locator
    engagementIdDropdown: DropdownComponent
    fiscalYearDropdown: DropdownComponent
    dataImportIdentifierDropdown: DropdownComponent
    nextButton: Locator
    opinionDateInput: Locator
    saveCreateAuditButton: Locator
    successToastmsg: Locator
    successMessage: string
    auditTable: TableComponent
    auditIdCreated: number
    executionPhasePage: ExecutionPhasePage

    constructor(page: Page) {
        this.page = page
        this.createAuditButton = this.page.getByRole('button', { name: 'Create Audit' })
        this.clientNameDropdown = new DropdownComponent(this.page, 'clientName')
        this.engagementIdDropdown = new DropdownComponent(this.page, 'engagementId')
        this.fiscalYearDropdown = new DropdownComponent(this.page, 'fiscalYear')
        this.dataImportIdentifierDropdown = new DropdownComponent(this.page, 'dataImportIdentifier')
        this.nextButton = this.page.getByRole('button', { name: 'Next' })
        this.opinionDateInput = this.page.locator('input[name="opinionDate"]')
        this.saveCreateAuditButton = this.page.getByRole('button', { name: 'Create Audit' }).nth(1) // this.page.locator('(//button/span[text()="Create Audit"])[2]') // this.page.getByRole('button', { name: 'Create Audit' });
        this.successToastmsg = this.page.locator('div.ant-notification-notice-message')
        this.auditTable = new TableComponent(this.page);
        this.executionPhasePage = new ExecutionPhasePage(this.page);
    }

    async createNewAudit(cname:string,year:any,engId:any,dataimportid:any,date:any){
        await this.createAuditButton.click()
        await this.clientNameDropdown.selectValue(cname)
        await this.fiscalYearDropdown.selectValue(year)
        await this.engagementIdDropdown.selectValue(engId)
        await this.dataImportIdentifierDropdown.selectValue(dataimportid)
        await this.page.keyboard.press('Enter');
        await expect(this.nextButton).toBeEnabled()
        await this.nextButton.click()
        await this.opinionDateInput.click()
        await this.opinionDateInput.fill(date)
        await this.page.keyboard.press('Enter')
        console.log("To click on Create Audit button")
        await this.saveCreateAuditButton.click()
        await this.successToastmsg.waitFor({state: 'visible', timeout: 15000})
        this.successMessage = await this.successToastmsg.innerText()      
        console.log(this.successMessage)        
    }

    async verifyAuditCreated(clientName:any){
        // Get Audit ID from success message
        console.log(this.successMessage)
        const splitmsg = this.successMessage.split(" ")
        this.auditIdCreated = parseInt(splitmsg[1]);
        expect(this.auditIdCreated).toBeGreaterThan(0);
        console.log("Audit ID Created: " + this.auditIdCreated);
        await this.auditTable.verifyIsVisible();

        // Verify Table is not empty
        await this.page.waitForTimeout(2000)
        const rows = await this.auditTable.getRowCount();
        console.log("Row Count: " + rows );
        expect(rows).toBeGreaterThan(0);


        // Verify Audit ID in Audit Table
        const firstCellText = await this.auditTable.getCellText(1, 1);
        console.log(firstCellText)
        expect(firstCellText).toContain(clientName);
        return this.auditIdCreated;
    }

    async openFirstAudit(auditId) {
        await this.auditTable.verifyIsVisible();
        await this.page.waitForTimeout(2000);
        await this.auditTable.clickCell(1, 1);
        expect(this.page.url()).toContain("/"+auditId+"/");
    }

    async verifyStatusFirstAudit(status) {
        await this.auditTable.verifyIsVisible();
        
        const maxRetries = 5; // Set the maximum number of retries
        let attempt = 0;
        let success = false;
        while (attempt <= maxRetries && !success) {
            var currentStatus = await this.auditTable.getCellText(1, 4);
            try {
                console.log(`Status by Audit in the list is '${currentStatus}'`)
                await expect(currentStatus).toContain(status);
                success = true; // If no error, mark as successful
            } catch (error) {
                attempt++;
                console.log(`Attempt ${attempt} Creating audit is in correct status, retrying...`);
                await this.page.waitForTimeout(5000)
                if (attempt === maxRetries) {
                    throw new Error(`Failed - Created Audit is still in '${currentStatus}' after ${maxRetries} attempts.`);
                }
            }
        }

    }
}