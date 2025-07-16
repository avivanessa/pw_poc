import { Locator, Page, expect } from '@playwright/test'
import SideMenuComponent from '../pageObjects/components/sideMenuComponent'

export default class FullDNAVPage {
    readonly page: Page
    readonly sidemenuicons: Locator
    pageTitle: Locator
    btn_createaudit: Locator
    clientname: Locator
    clientnamedropdown: Locator
    fiscalYear: Locator
    fiscalYearDropdown: Locator
    engagementId: Locator
    engagementIdDropdown: Locator
    dataImportIdentifier: Locator
    dataImportIdentifierDropdown: Locator
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
    itemsPendingComments: Locator
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
    icon: Locator
    executionreviewrecord: Locator
    btn_actionsdropdown: Locator
    prepare_review: Locator
    all_asset_lnk: Locator
    exe_toggleon_preaprer: Locator
    btn_confirm: Locator
    btn_collapse: Locator
    btn_proceed: Locator
    btn_exceptioncategory: Locator
    txt_commentsection: Locator
    radiobtn_review: Locator
    exe_toggleon_reviewer: Locator
    conclusionrecord: Locator
    conclusionreviewrecord: Locator
    reportingentity: Locator
    reportingentitydropdown: Locator
    messageAuditCreated: RegExp

    constructor(page: Page){
        this.page = page
        this.fulldnav = this.page.locator('//div[@class="ant-layout-sider-children"]/ul/li[2]') 
        this.btn_createaudit = this.page.locator('//button/span[text()="Create Audit"]')
        this.submodule_auditdirectory = this.page.getByRole('link', { name: 'Audit Directory' })
        this.clientname = this.page.locator('div[name="clientName"]')
        this.clientnamedropdown = this.page.locator('div[name="clientName"] input.ant-select-selection-search-input')
        this.fiscalYear = this.page.locator('div[name="fiscalYear"]')
        this.fiscalYearDropdown = this.page.locator('div[name="fiscalYear"] input.ant-select-selection-search-input')
        this.engagementId = this.page.locator('div[name="engagementId"]')
        this.engagementIdDropdown = this.page.locator('div[name="engagementId"] input.ant-select-selection-search-input')
        this.reportingentity = this.page.locator('div[name="engagementReportingEntity"]')
        this.reportingentitydropdown = this.page.locator('div[name="engagementReportingEntity"] input.ant-select-selection-search-input')
        this.dataImportIdentifier = this.page.locator('div[name="dataImportIdentifier"]')
        this.dataImportIdentifierDropdown = this.page.locator('div[name="dataImportIdentifier"] input.ant-select-selection-search-input')
        this.btn_next = this.page.locator('//button/span[text()="Next"]')
        this.opinionDate = this.page.locator('input[name="opinionDate"]')
        this.formbutton = this.page.locator('(//button/span[text()="Create Audit"])[2]')
        this.successmsg = this.page.locator('//div[@class="ant-notification-notice-message"]')
        this.auditnamerecord = this.page.locator('.ant-table-row > td').first()
        this.clientnamerecord = this.page.locator('//tbody[@class="ant-table-tbody"]/tr[2]/td[2]')
        this.clientcard = this.page.locator('//span[@class="ant-page-header-heading-title" and @title="Client Data"]')
        this.preparationstatus1 = this.page.locator('//span[@class="ant-page-header-heading-title" and @title="Client Data"]/parent::div/following-sibling::span/div/div/span/span/span[2]')
        this.deloittecard = this.page.locator('//span[@class="ant-page-header-heading-title" and @title="Deloitte Data"]')
        this.preparationstatus2 = this.page.locator('//span[@class="ant-page-header-heading-title" and @title="Deloitte Data"]/parent::div/following-sibling::span/div/div/span/span/span[2]')
        // this.msgboxloc1 = this.page.getByRole('row', { name: 'AutoFund Check if the assets (0) from the previous year are imported Message-' }).getByRole('button')
        // this.msgboxloc2 = this.page.getByRole('row', { name: 'AutoFund Check if the transactions (0) are imported Message-Black' }).getByRole('button')
        // this.msgboxloc3 = this.page.getByRole('row', { name: 'AutoFund Check if the accounts (0) from the previous year are imported Message-' }).getByRole('button')
        this.itemsPendingComments = this.page.locator('(//span[@aria-label="Message-Black"])')
        this.clarificationtext = this.page.locator('//textarea[@name="clarification"]')
        this.btn_Save = this.page.locator('//button/span[text()="Save"]')
        this.toggle_preparer = this.page.locator('//div[text()="Sign off by preparer"]/following-sibling::div[1]/button/div')
        this.email_preparedby = this.page.locator('//div[text()="Prepared by"]/following-sibling::div[1]')
        this.toggle_reviewer = this.page.locator('//div[text()="Sign off by reviewer"]/following-sibling::div[1]/button/div')
        this.email_reviewedby = this.page.locator('//div[text()="Reviewed by"]/following-sibling::div[1]')
        this.datapreparationrecord = this.page.getByText('Planning - In Preparation').first()
        this.executionrecord = this.page.getByText('Execution - In Preparation').first()
        this.executionreviewrecord = this.page.getByText('Execution - In Review').first()
        this.conclusionrecord = this.page.getByText('Conclusion - In Preparation').first()
        this.conclusionreviewrecord = this.page.getByText('Conclusion - In Review').first()
        this.valuationtab_investment = this.page.locator('#valuationTabs-tab-investments')
        this.valuationtab_derivative = this.page.locator('#valuationTabs-tab-derivatives')
        this.alert_description = this.page.locator('//div[@class="ant-alert-description"]')
        // this.btn_actionsdropdown = this.page.locator('//div[text()="Actions"]')
        this.btn_actionsdropdown = this.page.getByRole('button', { name: 'Actions Caret-Down' })     
        this.prepare_review = this.page.getByText('Prepare / Review')
        this.all_asset_lnk = this.page.locator('//span[@class="ant-dropdown-menu-title-content"]/span[contains(text(),"All Assets")]')
        this.exe_toggleon_preaprer = this.page.locator('(//span[@class="ant-switch-inner"])[1]')
        this.btn_confirm =  this.page.getByRole('button', { name: 'Confirm' })
        this.btn_collapse = this.page.getByRole('button', { name: 'Collapse omnia-decrease', exact: true })
        this.btn_proceed = this.page.getByRole('button', { name: 'Proceed' })
        // this.btn_exceptioncategory = this.page.locator('(//span[@class="ant-select-selection-search"])[2]')
        this.btn_exceptioncategory = this.page.locator('//label[@title="Exception Category"]/parent::div/following-sibling::div')
        this.txt_commentsection = this.page.locator('//textarea[@name="commentText"]')
        this.radiobtn_review = this.page.locator('//span[text()="Review Exceptions"]')
        this.exe_toggleon_reviewer = this.page.locator('(//span[@class="ant-switch-inner"])[2]')
        this.messageAuditCreated = new RegExp("^Audit (\d+) for ([\w\W]+) was successfully create")
   }

   sideMenuComponent() {
        return new SideMenuComponent(this.page)
   }

    async createNewAudit(cname:string,year:any,engId:any,dataimportid:any,date:any){
        await this.btn_createaudit.click()
        await this.clientname.click()
        await this.clientnamedropdown.fill(cname)
        await this.page.keyboard.press('Enter');
        await expect(this.fiscalYear).toBeEnabled()
        await this.fiscalYear.click()
        await this.fiscalYearDropdown.fill(year)
        await this.page.keyboard.press('Enter');
        await expect(this.engagementId).toBeEnabled()
        await this.engagementId.click()
        await this.engagementIdDropdown.fill(engId)
        await this.page.keyboard.press('Enter');
        await this.dataImportIdentifier.click()
        await this.dataImportIdentifierDropdown.fill(dataimportid)
        await this.page.keyboard.press('Enter');
        await expect(this.btn_next).toBeEnabled()
        await this.btn_next.click()
        await this.opinionDate.click()
        await this.opinionDate.fill(date)
        await this.page.keyboard.press('Enter');
        // await this.page.waitForTimeout(2000)
        console.log("To click on Create Audit button")
        await this.formbutton.click()
        //await this.page.waitForTimeout(4000)
        // await expect(this.successmsg).toBeVisible()
        this.successtxt = await this.successmsg.innerText()      
        console.log(this.successtxt)        
    }

    async verifyAuditCreated(name:any){
        console.log(this.successtxt)
        const splitmsg = this.successtxt.split(" ")
        const auditnumdata = splitmsg[0]+" "+splitmsg[1]
        console.log(auditnumdata)
        await this.auditnamerecord.hover()
        await expect(await this.clientnamerecord.innerText()).toEqual(name)
    }

    async verifyCardVisible(cardname){
        const card = this.page.locator('//span[@class="ant-page-header-heading-title" and @title="'+cardname+'"]')
        await card.isVisible()
    }

    async clickCard(cardname){
        const card = await this.page.locator('//span[@class="ant-page-header-heading-title" and @title="'+cardname+'"]')
        await card.click()
    }

    async verifyCardStatus(card, expectedstatus){
        const cardstatus = await this.page.locator('//span[@class="ant-page-header-heading-title" and @title="'+card+'"]/parent::div/following-sibling::span/div/div/span/span/span[2]')
        await expect(await cardstatus.innerText()).toEqual(expectedstatus)
    }

    async verifyDataPreparationPhase(){
        await this.auditnamerecord.click()
        await this.verifyCardVisible('Client Data')
        await this.verifyCardStatus('Client Data','In Preparation')
        console.log("Client Data card in preparation status")      
        await this.verifyCardVisible('Deloitte Data')     
        await this.verifyCardStatus('Deloitte Data','In Preparation')
        console.log("Deloitte Data card in preparation status")
    }

    async toggleOnPrepareBy(){
        await this.toggle_preparer.click()
        await this.page.waitForTimeout(5000)
        console.log(await this.email_preparedby.innerText())
        await expect(await this.email_preparedby).toBeVisible()
    }

    async toggleOnReview(){
        await this.toggle_reviewer.click()
        await this.page.waitForTimeout(6000)
        console.log(await this.email_reviewedby.innerText())
        await expect(this.email_reviewedby).toBeVisible()
    }

    async verifyClientDataChecks(){       
        await this.fulldnav.click()
        await this.submodule_auditdirectory.click()
        await this.auditnamerecord.click()
        await this.verifyCardVisible('Client Data')
        await this.verifyCardStatus('Client Data','In Preparation')
        await this.clickCard('Client Data')
        await this.commentAllPendingItems()
        await this.toggleOnPrepareBy()
        await this.page.goBack()
        await this.page.waitForTimeout(5000)
        await this.verifyCardStatus('Client Data','In Review')
    }

    async commentAllPendingItems() {
        await this.page.reload()
        const items = await this.itemsPendingComments.elementHandles()
        for (const btn of items) {
            await btn.click()
            await this.clarificationtext.fill('TestData')
            await this.btn_Save.click()
        }
    }

    async logout(){
        const accountname = await this.page.locator('(//span[@class="ant-avatar-string"])[1]')
        await accountname.click()
        const logout = await this.page.locator('//div[text()="Log Out"]')
        await logout.click()
        await this.page.locator('//div[@data-test-id="audittest10002@deloitte.com"]').click()
        await this.page.waitForTimeout(6000)
        await this.page.locator('//div[@id="otherTile"]').click()
    }

    async credentialpage(){
        await this.page.locator('//div[@id="otherTile"]').click()
    }

    async reviewWithAnotherUser(){
        await this.fulldnav.click()
        await this.submodule_auditdirectory.click()
        await this.auditnamerecord.click()
        await this.verifyCardVisible('Client Data')
        await this.clickCard('Client Data')
        await this.toggleOnReview()
        await this.page.goBack()
        await this.page.waitForTimeout(10000)
        await this.page.reload()
        await this.verifyCardStatus('Client Data','Reviewed')
        await this.page.waitForTimeout(10000)
        await this.page.reload()
        await this.verifyCardStatus('Deloitte Data','Reviewed')
    }

    async verifyplanningphase(){
        await this.selectAuditrecord('Planning - In Preparation')
        await this.verifyCardVisible('Materiality')
        await this.verifyCardVisible('Portfolio Overview')
    }

    async planningpahsechecks(){
        this.clickCard('Materiality')
        await this.toggleOnPrepareBy()
        await this.page.goBack()
        this.clickCard('Portfolio Overview')
        await this.toggleOnPrepareBy()
        await this.page.goBack()
        await this.page.waitForTimeout(5000)
        await this.verifyCardStatus('Materiality','In Review')
        await this.verifyCardStatus('Portfolio Overview','In Review')
    }

    async reviewplanningphase(){
        await this.auditnamerecord.click()
        await this.clickCard('Materiality')
        await this.toggleOnReview()
        await this.page.goBack()
        await this.clickCard('Portfolio Overview')
        await this.toggleOnReview()
        await this.page.goBack()
        await this.page.waitForTimeout(5000)
        await this.verifyCardStatus('Materiality','Reviewed')
        await this.verifyCardStatus('Portfolio Overview','Reviewed')
    }
    async materialityprocedurechecks(){    
        this.clickCard('Materiality')
        await this.toggleOnPrepareBy()
        await this.page.goBack()
        await this.page.waitForTimeout(5000)
        await this.verifyCardStatus('Materiality','In Review')   
    }

    async reviewmateriality(){
        await this.auditnamerecord.click()
        await this.clickCard('Materiality')
        await this.toggleOnReview()
        await this.page.goBack()
        await this.verifyCardStatus('Materiality','Reviewed')
    }

    async porfoliooverviewchecks(){
        this.clickCard('Portfolio Overview')
        await this.toggleOnPrepareBy()
        await this.page.goBack()
        await this.page.waitForTimeout(5000)
        await this.verifyCardStatus('Portfolio Overview','In Review')
    }

    async reviewPortfolioOverview(){
        await this.auditnamerecord.click()
        await this.clickCard('Portfolio Overview')
        await this.toggleOnReview()
        await this.page.goBack()
        await this.verifyCardStatus('Portfolio Overview','Reviewed')
    }

    async verifyprocedures(){
        await this.executionrecord.click()
        const procedures = ['Valuation','Classification','Reconciliation','FX Rates',
            'Book Value','Quantity Rollforward','Cost Rollforward',
        'Realized G/L','Unrealized P/L','Income']
        for (const pro of procedures){
            await this.page.locator('//span[@class="ant-page-header-heading-title" and @title="'+pro+'"]').isVisible()
            await console.log(pro," is displayed")
        }
    }

    async verifyvaluationtabs(pro:any){
        await this.executionrecord.click()
        await this.page.locator('//span[@class="ant-page-header-heading-title" and @title="'+pro+'"]').click()
        await expect(await this.valuationtab_investment.innerText()).toEqual('Investments and Exchange Traded Position')
        await expect(await this.valuationtab_derivative.innerText()).toEqual('OTC Derivatives')
        await expect(this.alert_description).toBeVisible()
        await this.valuationtab_derivative.click()
        await expect(this.alert_description).toBeVisible()
    }

    async clickExecutionProcedure(pro){
        await this.page.locator('//span[@class="ant-page-header-heading-title" and @title="'+pro+'"]').click()
    }

    async verifyassets(pro){
        await this.executionrecord.click()
        await this.clickExecutionProcedure(pro)
        const asset1 = await this.page.getByLabel('row-button').first()
        const asset2 = await this.page.getByLabel('row-button').nth(1)
        const assets = [asset1,asset2]
        for(const asset of assets){
            asset.click()
            const assetsection = ['Audit Comment','Sign off','Item Details','Valuation','Attachments']
            for(const sec of assetsection){
                await this.page.locator('//span[@class="ant-page-header-heading-title" and @title="'+sec+'"]').isVisible()
                console.log(sec," section is visible") 
            }
            //await expect (this.page.getByText('ODP and Vendor Details')).toBeVisible()
            const backtoasset = await this.page.getByText('Back to audit')
            await backtoasset.click()
        }
    }

    async selectcategory(option){
        await this.btn_exceptioncategory.click()
        await this.page.waitForTimeout(4000)
        const category_option = await this.page.locator('//div[@title="'+option+'"]')
        await category_option.click()
    }

    async addcommentsandsave(){
        console.log("To click on actions dropdown")
        await this.page.waitForTimeout(2000)
        await expect(this.btn_actionsdropdown).toBeEnabled()
        await this.btn_actionsdropdown.hover()
        // await this.btn_actionsdropdown.click()
        await this.btn_actionsdropdown.click({force:true})
        await this.page.waitForTimeout(2000)
        await this.prepare_review.hover()
        await this.prepare_review.click()
        await this.page.waitForTimeout(2000)
        await this.all_asset_lnk.click()
        await this.btn_collapse.click()
        await this.btn_proceed.click()
        await this.selectcategory('Finding')
        this.txt_commentsection.fill("Sampme text")
        await this.btn_Save.click()
        if (await this.btn_confirm.isVisible()){
            await this.btn_confirm.click()     
        }
    }

    async enabletogglepreaprerExecution(){
        await this.page.waitForTimeout(2000)
        // const icon = this.page.locator('(//button[@class="ant-modal-close"])[2]')
        // await icon.click()
        // if (await icon.isVisible()){
        //     this.icon.click()
        // }
        await this.exe_toggleon_preaprer.click()
        await this.page.waitForTimeout(2000)
        await this.btn_confirm.click()
        await this.page.waitForTimeout(2000)
    } 

    async executionstatusprepareby(){
        await this.executionrecord.click()
        // const procedures = ['Valuation','FX Rates',
        //     'Book Value','Quantity Rollforward','Unrealized P/L','Realized G/L']
        const procedures = ['Valuation','Classification','FX Rates','Book Value','Unrealized P/L','Realized G/L','Quantity Rollforward']
        for(const pro of procedures){
            if(pro =='Valuation' || pro =='FX Rates' || pro == 'Book Value' || pro == 'Unrealized P/L' || pro =='Realized G/L' ){
                await this.clickExecutionProcedure(pro)
                await this.addcommentsandsave()
                // await expect(this.btn_actionsdropdown).toBeEnabled()
                await this.btn_actionsdropdown.click()
                await this.prepare_review.hover()
                await this.prepare_review.click()
                await this.page.waitForTimeout(2000)
                await this.all_asset_lnk.click()
                await this.btn_collapse.click()
                await this.btn_proceed.click()
                await this.enabletogglepreaprerExecution()
                await this.page.goBack()               
            }
            else if(pro=='Classification' || pro=='Quantity Rollforward'){
                console.log("Before click of procedure")
                await this.clickExecutionProcedure(pro)
                await this.addcommentsandsave()
                await this.enabletogglepreaprerExecution()
                await this.page.goBack()
            }
            
        }

        await this.reconcilliationchecks()
        await this.page.goBack()
        await this.CostRollforwardchecks('Cost Rollforward')
        await this.page.goBack()
        await this.valuationOTCDerivativeschecks()
        await this.page.goBack()
        await this.page.reload()
        await this.verifyCardStatus('Valuation','In Review')
        await this.verifyCardStatus('Classification','In Review')
        await this.verifyCardStatus('Book Value','In Review')
        await this.verifyCardStatus('Quantity Rollforward','In Review')
        await this.verifyCardStatus('Unrealized P/L','In Review')
        await this.verifyCardStatus('FX Rates','In Review')
        await this.verifyCardStatus('Reconciliation','In Review')
    }

    async executionreviewCostRollforward(){
        // The below 3 functions can be uncommented if this function needs to run independentl
        // await this.fulldnav.click()
        // await this.submodule_auditdirectory.click()
        // await this.executionreviewrecord.click()
        await this.clickExecutionProcedure("Cost Rollforward")
        const tab1 = await this.page.locator('//div[text()="Investments/Exchange"]')
        const tab2 = await this.page.locator('//div[text()="Derivatives"]')
        const tabs = [tab1,tab2]
        for(const tab of tabs){
            await tab.click()
            const locator1 = await this.page.getByRole('button', { name: 'Menu-' }).first()
            const locator2 = await this.page.getByRole('button', { name: 'Menu-' }).nth(1)
            const action_icons = [locator1,locator2]
            // await this.clickExecutionProcedure("Cost Rollforward")
            for(const icon of await action_icons){
                await icon.hover()
                await icon.click()
                await this.page.getByText('Prepare/Review').click();
                await this.exe_toggleon_reviewer.click()
                await this.btn_confirm.click()
            }
        }
    }

    async reviewreconciliation(){
        // The below 3 functions can be uncommented if this function needs to run independently
        // await this.fulldnav.click()
        // await this.submodule_auditdirectory.click()
        // await this.executionreviewrecord.click()
        const custody = this.page.locator('//div[text()="Custody"]')
        const loans = this.page.locator('//div[text()="Loans"]')
        const menutabs = [custody]
        await this.clickExecutionProcedure("Reconciliation")
        for(const tab of menutabs){
            await tab.click()
            await expect(this.btn_actionsdropdown).toBeEnabled()
            await this.btn_actionsdropdown.click()
            await this.prepare_review.hover()
            await this.prepare_review.click()
            await this.page.waitForTimeout(2000)
            await this.all_asset_lnk.click()       
            await this.radiobtn_review.click()
            await this.btn_proceed.click()
            await this.exe_toggleon_reviewer.click()
            await this.page.waitForTimeout(2000)
            await this.btn_confirm.click()
        }
        await this.page.goBack()
    }

    async executionreview(){
        await this.executionreviewrecord.click()
        const procedures = ['Classification','FX Rates',
                'Book Value','Quantity Rollforward','Unrealized P/L']
        for(const pro of procedures){
            await this.clickExecutionProcedure(pro)
            await expect(this.btn_actionsdropdown).toBeEnabled()
            await this.btn_actionsdropdown.click()
            await this.prepare_review.hover()
            await this.prepare_review.click()
            await this.page.waitForTimeout(2000)
            await this.all_asset_lnk.click()
            await this.radiobtn_review.click()
            await this.btn_proceed.click()
            await this.exe_toggleon_reviewer.click()
            await this.page.waitForTimeout(2000)
            await this.btn_confirm.click()
            await this.page.goBack()
            // await this.page.reload()
        }
        this.executionreviewCostRollforward()
        await this.page.goBack()
        this.reviewreconciliation()
        await this.page.goBack()
        await this.page.reload()
        await this.verifyCardStatus('Valuation','Reviewed')
        await this.verifyCardStatus('Classification','Reviewed')
        await this.verifyCardStatus('Book Value','Reviewed')
        await this.verifyCardStatus('Quantity Rollforward','Reviewed')
        await this.verifyCardStatus('Unrealized P/L','Reviewed')
        await this.verifyCardStatus('FX Rates','Reviewed')  
        await this.verifyCardStatus('Cost Rollforward','Reviewed') 
        await this.verifyCardStatus('Reconciliation','Reviewed')     
    }

    async CostRollforwardchecks(pro){
        // The below 3 functions can be uncommented if this function needs to run independently
        await this.executionrecord.click()
        await this.clickExecutionProcedure(pro)
        const tab1 = await this.page.locator('//div[text()="Investments/Exchange"]')
        const tab2 = await this.page.locator('//div[text()="Derivatives"]')
        const tabs = [tab1,tab2]
        for(const tab of tabs){
            tab.click()
            const icon1 = await this.page.getByRole('button', { name: 'Menu-' }).first()
            const icon2 = await this.page.getByRole('button', { name: 'Menu-' }).nth(1)
            const icon_actions = [icon1,icon2]
            for(const ic of icon_actions){
                await ic.click()
                await this.page.getByText('Prepare/Review').click()
                await this.selectcategory('Finding')
                await this.page.getByPlaceholder('Enter text').fill('TestData');
                await this.btn_Save.click()
                await this.btn_confirm.click()
                await this.page.waitForTimeout(3000)
                await ic.click()
                await this.page.getByText('Prepare/Review').click()
                await this.exe_toggleon_preaprer.click()
                await this.btn_confirm.click()
                await this.page.waitForTimeout(3000)
            }

        }
        await this.page.goBack() 
    }
    async valuationOTCDerivativeschecks(){
        await this.clickExecutionProcedure("Valuation")
        await this.valuationtab_derivative.click()
        await this.addcommentsandsave()
        // await expect(this.btn_actionsdropdown).toBeEnabled()
        await this.btn_actionsdropdown.click()
        await this.prepare_review.hover()
        await this.prepare_review.click()
        await this.page.waitForTimeout(2000)
        await this.all_asset_lnk.click()
        await this.btn_collapse.click()
        await this.btn_proceed.click()
        await this.enabletogglepreaprerExecution()
        await this.page.goBack() 

    }

    async reconcilliationchecks(){
        // The below 3 functions can be uncommented if this function needs to run independently
        // await this.fulldnav.click()
        // await this.submodule_auditdirectory.click()
        // await this.executionrecord.click()
        const custody = await this.page.locator('//div[text()="Custody"]')
        const loans = await this.page.locator('//div[text()="Loans"]')
        const menutabs = [custody]
        await this.clickExecutionProcedure("Reconciliation")
        for(const tab of menutabs){
            await tab.click()
            await this.addcommentsandsave()
            await this.enabletogglepreaprerExecution()
            
        }
        await this.page.goBack()
    }

    async verifyconclusion(){
        await this.conclusionrecord.click()
        await this.clickCard('Categorized Exceptions')
        await this.toggleOnPrepareBy()
        await this.page.goBack()
        await this.page.waitForTimeout(5000)
        await this.verifyCardStatus('Categorized Exceptions','In Review')
    }

    async reviewconclusion(){
        await this.conclusionreviewrecord.click()
        await this.clickCard('Categorized Exceptions')
        await this.toggleOnReview()
        await this.page.goBack()
        await this.page.waitForTimeout(5000)
        await this.verifyCardStatus('Categorized Exceptions','Reviewed')
    }

    async selectAuditrecord(record){
        const auditreocrd = await this.page.locator('(//span[text()="'+record+'"])[1]')
        await auditreocrd.click()
    }

    async verifyDataextraction(){
        await this.selectAuditrecord('Reporting - In Preparation')
        await this.clickCard('Data Extraction')
        const btn_dataextraction = await this.page.locator('#DataExtractionLanding-empty-DataExtractionButton')
        await btn_dataextraction.click()
        const modal_btn_extraction = await this.page.locator('//div[@class="ant-modal-footer"]/button/span[text()="Generate Data Extract"]')
        await modal_btn_extraction.click()
        await this.page.waitForTimeout(5000)
        await expect(this.page.locator('//tbody/tr[2]')).toBeVisible()
        await this.toggleOnPrepareBy()
        await this.page.goBack()
        await this.page.waitForTimeout(5000)
        await this.verifyCardStatus('Data Extraction','In Review')
    }

    async reviewDataextraction(){
        await this.selectAuditrecord('Reporting - In Review')
        await this.clickCard('Data Extraction')
        await this.toggleOnReview()
        await this.page.goBack()
        await this.page.waitForTimeout(5000)
        await this.verifyCardStatus('Data Extraction','Reviewed')
    }
}