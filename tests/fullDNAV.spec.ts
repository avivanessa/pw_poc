import { test, expect } from '@playwright/test'
import LoginPage from '../pageObjects/loginPage'
import DashboardPage from '../pageObjects/dashboardPage'
import SideMenuComponent from '../pageObjects/sideMenuComponent'
// import ValuationPage from '../pageObjects/valuationPage'
import homepage from '../pageObjects/homepage'
import LoginPage2 from '../pageObjects/loginPage2'
import dotenv from 'dotenv'
import fullDNAVPage from '../pageObjects/fullDNAVPage'
dotenv.config()

test.describe('Valuation and Reconciliation > Home Page', () => {
    test.use({ storageState: './user1_auth.json'})

    test.beforeEach(async ({ page }) => {
        // await page.goto(`${process.env.BASE_URL}`)
        await page.goto('https://qnxdnavportal.aaps.deloitte.com/')
        expect(page.url()).toBe('https://qnxdnavportal.aaps.deloitte.com/')
        const {loginPage} = initializePages(page)
        await loginPage.login("AuditTest10002@deloitte.com","Nsc{RAxj}72CtS_?LYq9/T<")
        await loginPage.acceptCookies()
    })

    const initializePages = (page) => {
        return{
            loginPage: new LoginPage(page),
            dashboardPage: new DashboardPage(page),
            sideMenuComponent: new SideMenuComponent(page),
            // valuationPage: new ValuationPage(page),
            homepage:new homepage(page),
            fulldnav:new fullDNAVPage(page),
            LoginPage2: new LoginPage2(page),

        }
    } 

    test('TC15 - Verify user is able to create new audit', async ({page}) => {
        const {fulldnav} = initializePages(page)
        await fulldnav.createnewAudit('Ingeteam, Inc.','2019','MAT-US-83398-2019','CRFIN','12/12/2024')
        await fulldnav.verifyaduitcreated('Ingeteam, Inc.')
        await page.pause()
    })

    test('TC20 - Verify client and deloitte data are in preparation phase', async ({page}) => {
        const {fulldnav} = initializePages(page)
        await fulldnav.verifyDataPreparationPhase()
        // await fulldnav.preparationphase()
        await page.pause()
    })

    test('TC21/23 - Verify user is able to create and review the client data checks', async ({page}) => {
        const {fulldnav} = initializePages(page)
        await fulldnav.createnewAudit('Ingeteam, Inc.','2019','MAT-US-83398-2019','CRFIN','12/15/2024')
        await fulldnav.verifyclientDatachecks()
        await fulldnav.logout()
        const {LoginPage2} = initializePages(page)
        // await LoginPage2.page2.goto(`${process.env.BASE_URL}`) -- to check env config later
        await LoginPage2.page2.goto('https://qnxdnavportal.aaps.deloitte.com/')
        expect(LoginPage2.page2.url()).toBe('https://qnxdnavportal.aaps.deloitte.com/')
        await fulldnav.credentialpage()
        // await LoginPage2.login(`${process.env.USER_2}`,`${process.env.PASS_USER_2}`) -- to check env config later
        await LoginPage2.login('audittest10005@deloitte.com','X9~WmZsqZ6<%wZ(Fxpj8T6*x')
        await fulldnav.reviewwithanotheruser()
        await LoginPage2.acceptCookies()
        await page.pause()
    })

    test('TC24 - Verify user is able to see the materiality and portfolio', async ({page}) => {
        const {fulldnav} = initializePages(page)
        await fulldnav.verifyplanningphase()       
        await page.pause()
    })
    test('TC26/29 - Verify User can review and signoff the materiality procedure and portfolio overview', async ({page}) => {
        const {fulldnav} = initializePages(page)
        await fulldnav.verifyplanningphase()    
        await fulldnav.planningpahsechecks()
        await fulldnav.logout()
        const {LoginPage2} = initializePages(page)
        // await LoginPage2.page2.goto(`${process.env.BASE_URL}`) --To check env config later
        await LoginPage2.page2.goto('https://qnxdnavportal.aaps.deloitte.com/')
        expect(LoginPage2.page2.url()).toBe('https://qnxdnavportal.aaps.deloitte.com/')
        await fulldnav.credentialpage()
        // await LoginPage2.login(`${process.env.USER_2}`,`${process.env.PASS_USER_2}`) -- To check env config later
        await LoginPage2.login('audittest10005@deloitte.com','X9~WmZsqZ6<%wZ(Fxpj8T6*x')
        await fulldnav.reviewplanningphase()
        await page.pause()
    })

    test('TC30 - Verify user is able to see all the 10 procedures in execution phase ', async ({page}) => {
        const {fulldnav} = initializePages(page)     
        await fulldnav.verifyprocedures()       
        await page.pause()

   })
   
    test('TC31 - Verify user can see Investments and Exchange Traded Positions, OTC Derivatives in valuation procedure ', async ({page}) => {
        const {fulldnav} = initializePages(page)  
        await fulldnav.verifyvaluationtabs('Valuation')   
        await page.pause()

   })
   test('TC44 - Verify the IDV page of assets-Investments and Exchange Traded Positions ', async ({page}) => {
        const {fulldnav} = initializePages(page)  
        await fulldnav.verifyassets('Valuation')   
        await page.pause()

   })
   test.only('Executionphase all cases - Verify the valuation asset on IDV page and asset status changes to prepared and reviewed ', async ({page}) => {
        const {fulldnav} = initializePages(page)  
        // await fulldnav.logout()
        await fulldnav.executionstatusprepareby()   
        const {LoginPage2} = initializePages(page)
        // // await LoginPage2.page2.goto(`${process.env.BASE_URL}`) --
        await LoginPage2.page2.goto('https://qnxdnavportal.aaps.deloitte.com/')
        expect(LoginPage2.page2.url()).toBe('https://qnxdnavportal.aaps.deloitte.com/')
        await fulldnav.credentialpage()
        // // await LoginPage2.login(`${process.env.USER_2}`,`${process.env.PASS_USER_2}`) --
        await LoginPage2.login('audittest10005@deloitte.com','X9~WmZsqZ6<%wZ(Fxpj8T6*x')
        await fulldnav.executionreview()
        await page.pause()

    })
    test('Verify the IDV page of Cost Rollforward and reconciliation', async ({page}) => {
        const {fulldnav} = initializePages(page)
        // await fulldnav.reconcilliationchecks()  
        await fulldnav.CostRollforwardchecks('Cost Rollforward')   
        await page.pause() //Execution - In Review

    })
    test('TC-212 Verify the audit directory concusion', async ({page}) => {
        const {fulldnav} = initializePages(page)
        await fulldnav.verifyconclusion()
        await fulldnav.logout()
        const {LoginPage2} = initializePages(page)
        await LoginPage2.page2.goto(`${process.env.BASE_URL}`)
        expect(LoginPage2.page2.url()).toBe('https://qa1dnavportal.aaps.deloitte.com/')
        await fulldnav.credentialpage()
        await LoginPage2.login(`${process.env.USER_2}`,`${process.env.PASS_USER_2}`)
        await fulldnav.reviewconclusion()
        await page.pause() 

    })
    test('TC-213 Verify Data extraction functionality', async ({page}) => {
        const {fulldnav} = initializePages(page)
        await fulldnav.verifyDataextraction()
        await fulldnav.logout()
        const {LoginPage2} = initializePages(page)
        await LoginPage2.page2.goto(`${process.env.BASE_URL}`)
        expect(LoginPage2.page2.url()).toBe('https://qa1dnavportal.aaps.deloitte.com/')
        await fulldnav.credentialpage()
        await LoginPage2.login(`${process.env.USER_2}`,`${process.env.PASS_USER_2}`)
        await fulldnav.reviewDataextraction()
        await page.pause() 

    })
}
)