import { test, expect } from '@playwright/test'
import LoginPage from '../pageObjects/General/login.page'
import SideMenuPage from '../pageObjects/General/sideMenu.page'
import homepage from '../pageObjects/General/home.page'
import LoginPage2 from '../pageObjects/loginPage2'
import dotenv from 'dotenv'
import fullDNAVPage from '../pageObjects/fullDNAVPage'
dotenv.config()

//test.describe.configure({ mode: 'serial' });

let username2:string = process.env.USER_2!
let password2:string = process.env.PASS_USER_2!

test.describe.skip('Valuation and Reconciliation > Home Page', () => {
    test.use({ storageState: './user1_auth.json'})
    
    test.beforeEach(async ({ page }) => {
        console.log("process.env.baseurl")
        await page.goto('/')
        expect(page.url()).toContain(`${process.env.BASE_URL}`)
        const {loginPage} = initializePages(page)
        await loginPage.acceptCookies()
    })

    const initializePages = (page) => {
        return{
            loginPage: new LoginPage(page),
            sideMenuPage: new SideMenuPage(page),
            homepage:new homepage(page),
            fulldnav:new fullDNAVPage(page),
            LoginPage2: new LoginPage2(page),
        }
    } 

    test('TC15 - Verify user is able to create new audit', async ({page}) => {
        const {sideMenuPage, fulldnav} = initializePages(page)
        await sideMenuPage.clickAuditDirectory()
        await fulldnav.createNewAudit(`${process.env.CLIENT_NAME}`,`${process.env.FISCAL_YEAR}`,`${process.env.ENGAGEMENT_ID}`,
            `${process.env.DATA_IMPORT_IDENTIFIER}`,'12/15/2025')
        await fulldnav.verifyAuditCreated(`${process.env.CLIENT_NAME}`)
        
    })

    test('TC20 - Verify client and deloitte data are in preparation phase', async ({page}) => {
        const {sideMenuPage, fulldnav} = initializePages(page)
        await sideMenuPage.clickAuditDirectory()
        await fulldnav.verifyDataPreparationPhase()
    })

    test('TC21/23 - Verify user is able to create and review the client data checks', async ({page}) => {
        const {sideMenuPage, fulldnav} = initializePages(page)
        await sideMenuPage.clickAuditDirectory()
        await fulldnav.createNewAudit(`${process.env.CLIENT_NAME}`,`${process.env.FISCAL_YEAR}`,`${process.env.ENGAGEMENT_ID}`,
            `${process.env.DATA_IMPORT_IDENTIFIER}`,'12/15/2025')
        await fulldnav.verifyClientDataChecks()
        await fulldnav.logout()
        const {LoginPage2} = initializePages(page)
        await LoginPage2.page2.goto('/')
        expect(LoginPage2.page2.url()).toBe(`${process.env.BASE_URL}`)
        await fulldnav.credentialpage()
        await LoginPage2.login(username2,password2)
        await fulldnav.reviewWithAnotherUser()
        //await LoginPage2.acceptCookies()
        
    })

    test('TC24 - Verify user is able to see the materiality and portfolio', async ({page}) => {
        const {sideMenuPage, fulldnav} = initializePages(page)
        await sideMenuPage.clickAuditDirectory()
        await fulldnav.verifyplanningphase()
        
    })
    test('TC26/29 - Verify User can review and signoff the materiality procedure and portfolio overview', async ({page}) => {
        const {sideMenuPage, fulldnav} = initializePages(page)
        await sideMenuPage.clickAuditDirectory()
        await fulldnav.verifyplanningphase()
        await fulldnav.planningpahsechecks()
        await fulldnav.logout()
        const {LoginPage2} = initializePages(page)
        await LoginPage2.page2.goto('/')
        expect(LoginPage2.page2.url()).toBe(`${process.env.BASE_URL}`)
        await fulldnav.credentialpage()
        await LoginPage2.login(username2, password2)
        await fulldnav.reviewplanningphase()
    })

    test('TC30 - Verify user is able to see all the 10 procedures in execution phase ', async ({page}) => {
        const {sideMenuPage, fulldnav} = initializePages(page)
        await sideMenuPage.clickAuditDirectory()
        await fulldnav.verifyprocedures()       
   })
   
    test('TC31 - Verify user can see Investments and Exchange Traded Positions, OTC Derivatives in valuation procedure ', async ({page}) => {
        const {sideMenuPage, fulldnav} = initializePages(page)
        await sideMenuPage.clickAuditDirectory()
        await fulldnav.verifyvaluationtabs('Valuation')   

   })
   
   test('TC44 - Verify the IDV page of assets-Investments and Exchange Traded Positions ', async ({page}) => {
        const {sideMenuPage, fulldnav} = initializePages(page)
        await sideMenuPage.clickAuditDirectory()
        await fulldnav.verifyassets('Valuation')   

   })

   test.skip('Executionphase all cases - Verify the valuation asset on IDV page and asset status changes to prepared and reviewed ', async ({page}) => {
        const {sideMenuPage, fulldnav} = initializePages(page)
        await sideMenuPage.clickAuditDirectory()
        // await fulldnav.logout()
        await fulldnav.executionstatusprepareby()   
        const {LoginPage2} = initializePages(page)
        await LoginPage2.page2.goto('/')
        expect(LoginPage2.page2.url()).toBe(`${process.env.BASE_URL}`)
        await fulldnav.credentialpage()
        await LoginPage2.login(`${process.env.USER_2}`,`${process.env.PASS_USER_2}`)
        await fulldnav.executionreview()
        await page.pause()
    })


    test('Verify the IDV page of Cost Rollforward and reconciliation', async ({page}) => {
        const {sideMenuPage, fulldnav} = initializePages(page)
        await sideMenuPage.clickAuditDirectory()
        // await fulldnav.reconcilliationchecks()  
        await fulldnav.CostRollforwardchecks('Cost Rollforward')   
         //Execution - In Review
    })

    test.skip('TC-212 Verify the audit directory concusion', async ({page}) => {
        const {sideMenuPage, fulldnav} = initializePages(page)
        await sideMenuPage.clickAuditDirectory()
        await fulldnav.verifyconclusion()
        await fulldnav.logout()
        const {LoginPage2} = initializePages(page)
        await LoginPage2.page2.goto('/')
        expect(LoginPage2.page2.url()).toBe(`${process.env.BASE_URL}`)
        await fulldnav.credentialpage()
        await LoginPage2.login(`${process.env.USER_2}`,`${process.env.PASS_USER_2}`)
        await fulldnav.reviewconclusion()
    })

    test.skip('TC-213 Verify Data extraction functionality', async ({page}) => {
        const {sideMenuPage, fulldnav} = initializePages(page)
        await sideMenuPage.clickAuditDirectory()
        await fulldnav.verifyDataextraction()
        await fulldnav.logout()
        const {LoginPage2} = initializePages(page)
        await LoginPage2.page2.goto('/')
        expect(LoginPage2.page2.url()).toBe(`${process.env.BASE_URL}`)
        await fulldnav.credentialpage()
        await LoginPage2.login(`${process.env.USER_2}`,`${process.env.PASS_USER_2}`)
        await fulldnav.reviewDataextraction()
    })

})