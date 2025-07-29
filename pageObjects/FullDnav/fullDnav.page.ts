import { Page, Locator, expect } from '@playwright/test';
// import { test } from '../../fixtures/auth.fixture';

import { DropdownComponent } from '../components/dropdownComponent';
import { TableComponent } from '../components/tableComponent';
import { CardComponent } from '../components/cardComponent';


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


    constructor(page: Page) {
        this.page = page
        this.createAuditButton = this.page.getByRole('button', { name: 'Create Audit' })
        this.clientNameDropdown = new DropdownComponent(page, 'clientName')
        this.engagementIdDropdown = new DropdownComponent(page, 'engagementId')
        this.fiscalYearDropdown = new DropdownComponent(page, 'fiscalYear')
        this.dataImportIdentifierDropdown = new DropdownComponent(page, 'dataImportIdentifier')
        this.nextButton = this.page.getByRole('button', { name: 'Next' });
        this.opinionDateInput = this.page.locator('input[name="opinionDate"]') // this.page.getByRole('button', { name: 'opinionDate' });
        this.saveCreateAuditButton = this.page.getByRole('button', { name: 'Create Audit' }).nth(1) // this.page.locator('(//button/span[text()="Create Audit"])[2]') // this.page.getByRole('button', { name: 'Create Audit' });
        this.successToastmsg = this.page.locator('div.ant-notification-notice-message')
        this.auditTable = new TableComponent(page);

        // this.titlePage = this.page.locator('span.ant-page-header-heading-title >> text="Phase Detail"');
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
        // Verify Table is not empty
        const rows = await this.auditTable.getRowCount();
        console.log("Row Count: " + rows );
        expect(rows).toBeGreaterThan(0);
        // Verify Audit ID in Audit Table
        const firstCellText = await this.auditTable.getCellText(1, 1);
        console.log(firstCellText)
        expect(firstCellText).toContain(clientName);
    }

    async openFirstAudit() {
        await this.page.waitForTimeout(3000)
        await this.auditTable.verifyIsVisible();
        await this.auditTable.clickCell(1, 1);
        // TODO: Include validation of Audit ID - Validate if this is the created one 
    }
}