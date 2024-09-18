import { Locator, Page, expect } from '@playwright/test'
import exp from 'constants'
import { ALL } from 'dns'
import { stat } from 'fs'
import { memoryUsage } from 'process'

export default class SideMenuComponent{
    readonly page: Page
    readonly dashboard: Locator
    readonly sidemenuicons: Locator
    fulldnav: Locator
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
    successmsg: Locator
    successtxt: string
    auditnamerecord: Locator
    clientnamerecord: Locator
    clientcard: Locator
    preparationstatus1: Locator
    deloittecard: Locator
    preparationstatus2: Locator
    msgboxloc1: Locator
    msgboxloc3: Locator
    msgboxloc2: Locator
    card: Locator
    clarificationtext: Locator
    btn_Save: Locator
    toggle_preparer: Locator
    email_preparedby: Locator
    toggle_reviewer: Locator
    email_reviewedby: Locator
    datapreparationrecord: Locator
    executionrecord: Locator
    valuationtab_investment: Locator
    valuationtab_derivative: Locator
    alert_description: Locator

    constructor(page: Page){
        this.page = page
        this.dashboard = this.page.locator('a[href="/US/dashboard"]')
        this.fulldnav = this.page.locator('//div[@class="ant-layout-sider-children"]/ul/li[2]') 
        this.btn_createaudit = this.page.locator('//button/span[text()="Create Audit"]')
        this.submodule_auditdirectory = this.page.getByRole('link', { name: 'Audit Directory' })
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
        this.successmsg = this.page.locator('//div[@class="ant-notification-notice-message"]')
        this.auditnamerecord = this.page.locator('.ant-table-row > td').first()
        this.clientnamerecord = this.page.locator('//tbody[@class="ant-table-tbody"]/tr[2]/td[2]')
        this.clientcard = this.page.locator('//span[@class="ant-page-header-heading-title" and @title="Client Data"]')
        this.preparationstatus1 = this.page.locator('//span[@class="ant-page-header-heading-title" and @title="Client Data"]/parent::div/following-sibling::span/div/div/span/span/span[2]')
        this.deloittecard = this.page.locator('//span[@class="ant-page-header-heading-title" and @title="Deloitte Data"]')
        this.preparationstatus2 = this.page.locator('//span[@class="ant-page-header-heading-title" and @title="Deloitte Data"]/parent::div/following-sibling::span/div/div/span/span/span[2]')
        this.msgboxloc1 = this.page.getByRole('row', { name: 'AutoFund Check if the assets (0) from the previous year are imported Message-' }).getByRole('button')
        this.msgboxloc2 = this.page.getByRole('row', { name: 'AutoFund Check if the transactions (0) are imported Message-Black' }).getByRole('button')
        this.msgboxloc3 = this.page.getByRole('row', { name: 'AutoFund Check if the accounts (0) from the previous year are imported Message-' }).getByRole('button')
        this.clarificationtext = this.page.locator('//textarea[@name="clarification"]')
        this.btn_Save = this.page.locator('//button/span[text()="Save"]')
        this.toggle_preparer = this.page.locator('//div[text()="Sign off by preparer"]/following-sibling::div[1]/button/div')
        this.email_preparedby = this.page.locator('//div[text()="Prepared by"]/following-sibling::div[1]')
        this.toggle_reviewer = this.page.locator('//div[text()="Sign off by reviewer"]/following-sibling::div[1]/button/div')
        this.email_reviewedby = this.page.locator('//div[text()="Reviewed by"]/following-sibling::div[1]')
        this.datapreparationrecord = this.page.getByText('Planning - In Preparation').first()
        this.executionrecord = this.page.getByText('Execution - In Preparation').first()
        this.valuationtab_investment = this.page.locator('#valuationTabs-tab-investments')
        this.valuationtab_derivative = this.page.locator('#valuationTabs-tab-derivatives')
        this.alert_description = this.page.locator('//div[@class="ant-alert-description"]')




    }

   

    
    async createnewAudit(cname:any,year:any,engId:any,dataimportid:any,date:any)
    {
        await this.fulldnav.click()
        await this.submodule_auditdirectory.click()
        // await this.selectsubmoudle(name)
        await this.btn_createaudit.click()
        await this.clientname.click()
        await this.clientnamedropdown.fill(cname)
        await this.page.keyboard.press('Enter');
        await this.fiscalYear.click()
        await this.fiscalYeardropdown.fill(year)
        await this.page.keyboard.press('Enter');
        await this.engagementId.click()
        await this.engagementIddropdown.fill(engId)
        await this.page.keyboard.press('Enter');
        await this.dataImportIdentifier.click()
        await this.dataImportIdentifierdropdown.fill(dataimportid)
        await this.page.keyboard.press('Enter');
        await this.btn_next.click()
        await this.opinionDate.click()
        await this.opinionDate.fill(date)
        await this.page.keyboard.press('Enter');
        this.formbutton.click()
        await this.page.waitForTimeout(4000)
        
        // await expect(this.successmsg).toBeVisible()
        this.successtxt = await this.successmsg.innerText()      
        console.log(this.successtxt)
        

        
    }
    async verifyaduitcreated(name:any)
    {

        console.log(this.successtxt)
        const splitmsg = this.successtxt.split(" ")
        const auditnumdata = splitmsg[0]+" "+splitmsg[1]
        console.log(auditnumdata)
        await this.auditnamerecord.hover()
        await expect(await this.clientnamerecord.innerText()).toEqual(name)



    }

    async preparationphase()
    {
        await this.fulldnav.click()
        await this.submodule_auditdirectory.click()
        await this.auditnamerecord.click()
        const locators = [this.clientcard,this.deloittecard]
        const statuscheck = [this.preparationstatus1,this.preparationstatus2]
        for(const loc of locators)
        {
            for(const st of statuscheck)
            {
            if(loc==st)
            {
    
            await expect(loc).toBeVisible()
            console.log(await st.innerText())
            // await expect(await loc.innerText()).toEqual('In Preparation')
            }
            }

        }
      
    }
    async verifycardvisible(cardname)
    {
        const card = this.page.locator('//span[@class="ant-page-header-heading-title" and @title="'+cardname+'"]')
        await card.isVisible()


    }

    async clickcard(cardname)
    {
        const card = await this.page.locator('//span[@class="ant-page-header-heading-title" and @title="'+cardname+'"]')
        await card.click()


    }
    async verifycardstatus(card, expectedstatus){
        const cardstatus = await this.page.locator('//span[@class="ant-page-header-heading-title" and @title="'+card+'"]/parent::div/following-sibling::span/div/div/span/span/span[2]')
        await expect(await cardstatus.innerText()).toEqual(expectedstatus)


    }
    async verifyDataPreparationPhase()
    {
        await this.fulldnav.click()
        await this.submodule_auditdirectory.click()
        await this.auditnamerecord.click()
        await this.verifycardvisible('Client Data')
        await this.verifycardstatus('Client Data','In Preparation')
        console.log("Client Data card in preparation status")      
        await this.verifycardvisible('Deloitte Data')     
        await this.verifycardstatus('Deloitte Data','In Preparation')
        console.log("Deloitte Data card in preparation status")

    }

    async toggleonprepareby(){
        await this.toggle_preparer.click()
        await this.page.waitForTimeout(5000)
        console.log(await this.email_preparedby.innerText())
        await expect(await this.email_preparedby).toBeVisible()


    }
    async toggleonreviewer(){
        await this.toggle_reviewer.click()
        await this.page.waitForTimeout(6000)
        console.log(await this.email_reviewedby.innerText())
        await expect(this.email_reviewedby).toBeVisible()
    }

    async verifyclientDatachecks(){

       
        await this.fulldnav.click()
        await this.submodule_auditdirectory.click()
        await this.auditnamerecord.click()
        await this.verifycardvisible('Client Data')
        await this.verifycardstatus('Client Data','In Preparation')
        await this.clickcard('Client Data')
        const msglocators = [this.msgboxloc1,this.msgboxloc2,this.msgboxloc3]
        for(const btn of msglocators)
        {
        await btn.click()
        await this.clarificationtext.fill('TestData')
        await this.btn_Save.click()
        }
        await this.toggleonprepareby()
        await this.page.goBack()
        await this.page.waitForTimeout(5000)
        await this.verifycardstatus('Client Data','In Review')


    }
    async logout()
    {
        const accountname = await this.page.locator('(//span[@class="ant-avatar-string"])[1]')
        await accountname.click()
        const logout = await this.page.locator('//div[text()="Log Out"]')
        await logout.click()
        await this.page.locator('//div[@data-test-id="audittest10002@deloitte.com"]').click()
        await this.page.waitForTimeout(6000)
        await this.page.locator('//div[@id="otherTile"]').click()

    }
    async credentialpage()
    {
        await this.page.locator('//div[@id="otherTile"]').click()


    }
    async reviewwithanotheruser()
    {
        await this.fulldnav.click()
        await this.submodule_auditdirectory.click()
        await this.auditnamerecord.click()
        await this.verifycardvisible('Client Data')
        await this.clickcard('Client Data')
        await this.toggleonreviewer()
        await this.page.goBack()
        await this.page.waitForTimeout(6000)
        await this.page.reload()
        await this.verifycardstatus('Client Data','Reviewed')
        await this.verifycardstatus('Deloitte Data','Reviewed')

    }

    async verifyplanningphase()
    {
        await this.fulldnav.click()
        await this.submodule_auditdirectory.click()
        await this.datapreparationrecord.click()
        await this.verifycardvisible('Materiality')
        await this.verifycardvisible('Portfolio Overview')

    }
    async materialityprocedurechecks()
    {
       
        this.clickcard('Materiality')
        await this.toggleonprepareby()
        await this.page.goBack()
        await this.page.waitForTimeout(5000)
        await this.verifycardstatus('Materiality','In Review')
        
    }

    async reviewmateriality()
    {
        await this.fulldnav.click()
        await this.submodule_auditdirectory.click()
        await this.auditnamerecord.click()
        await this.clickcard('Materiality')
        await this.toggleonreviewer()
        await this.page.goBack()
        await this.verifycardstatus('Materiality','Reviewed')



    }
    async porfoliooverviewchecks()
    {

        this.clickcard('Portfolio Overview')
        await this.toggleonprepareby()
        await this.page.goBack()
        await this.page.waitForTimeout(5000)
        await this.verifycardstatus('Portfolio Overview','In Review')

    }
    async reviewPortfolioOverview()
    {
        await this.fulldnav.click()
        await this.submodule_auditdirectory.click()
        await this.auditnamerecord.click()
        await this.clickcard('Portfolio Overview')
        await this.toggleonreviewer()
        await this.page.goBack()
        await this.verifycardstatus('Portfolio Overview','Reviewed')


    }
    async verifyprocedures()
    {
        await this.fulldnav.click()
        await this.submodule_auditdirectory.click()
        await this.executionrecord.click()
        const procedures = ['Valuation','Classification','Reconciliation','FX Rates',
            'Book Value','Quantity Rollforward','Cost Rollforward',
        'Realized G/L','Unrealized P/L','Income']

        for (const pro of procedures)
        {
            await this.page.locator('//span[@class="ant-page-header-heading-title" and @title="'+pro+'"]').isVisible()
            await console.log(pro," is displayed")


        }
    }

    async verifyvaluationtabs(pro:any)
    {
        await this.fulldnav.click()
        await this.submodule_auditdirectory.click()
        await this.executionrecord.click()
        await this.page.locator('//span[@class="ant-page-header-heading-title" and @title="'+pro+'"]').click()
        await expect(await this.valuationtab_investment.innerText()).toEqual('Investments and Exchange Traded Position')
        await expect(await this.valuationtab_derivative.innerText()).toEqual('OTC Derivatives')
        await expect(this.alert_description).toBeVisible()
        await this.valuationtab_derivative.click()
        await expect(this.alert_description).toBeVisible()

    }

    async verifyassets(pro)
    {
        await this.fulldnav.click()
        await this.submodule_auditdirectory.click()
        // const executionrecord = await this.page.getByText('Execution - In Preparation').first()
        await this.executionrecord.click()
        await this.page.locator('//span[@class="ant-page-header-heading-title" and @title="'+pro+'"]').click()
        const asset1 = await this.page.getByLabel('row-button').first()
        const asset2 = await this.page.getByLabel('row-button').nth(1)
        const assets = [asset1,asset2]
        for(const asset of assets)
        {
            asset.click()
            const assetsection = ['Audit Comment','Sign off','Item Details','Valuation','Attachments']
            for(const sec of assetsection)
            {
            await this.page.locator('//span[@class="ant-page-header-heading-title" and @title="'+sec+'"]').isVisible()
            console.log(sec," section is visible") 
            }
            await expect (this.page.getByText('ODP and Vendor Details')).toBeVisible()
            const backtoasset = await this.page.getByText('Back to audit')
            await backtoasset.click()
        }
                
    }
    

}


