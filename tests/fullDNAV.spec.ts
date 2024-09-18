import { test, expect } from '@playwright/test'
import LoginPage from '../pageObjects/loginPage'
import DashboardPage from '../pageObjects/dashboardPage'
import SideMenuComponent from '../pageObjects/sideMenuComponent'
import ValuationPage from '../pageObjects/valuationPage'
import homepage from '../pageObjects/homepage'
import LoginPage2 from '../pageObjects/loginPage2'
import dotenv from 'dotenv'
import fullDNAVPage from '../pageObjects/fullDNAVPage'
dotenv.config()

test.describe('Valuation and Reconciliation > Home Page', () => {
    test.use({ storageState: './user1_auth.json'})

    test.beforeEach(async ({ page }) => {
        await page.goto(`${process.env.BASE_URL}`)
        expect(page.url()).toBe('https://qa1dnavportal.aaps.deloitte.com/')
        const {loginPage} = initializePages(page)
        await loginPage.acceptCookies()
    })

    const initializePages = (page) => {
        return{
            loginPage: new LoginPage(page),
            dashboardPage: new DashboardPage(page),
            sideMenuComponent: new SideMenuComponent(page),
            valuationPage: new ValuationPage(page),
            homepage:new homepage(page),
            fulldnav:new fullDNAVPage(page),
            LoginPage2: new LoginPage2(page),

        }
    } 

    test('TC15 - Verify user is able to create new audit', async ({page}) => {
        const {fulldnav} = initializePages(page)
        await fulldnav.createnewAudit('3M Company','2021','MAT-US-126586-2021','AutoFund','10/13/2024')
        await fulldnav.verifyaduitcreated('3M Company')
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
        await fulldnav.createnewAudit('3M Company','2021','MAT-US-126586-2021','AutoFund','10/13/2024')
        await fulldnav.verifyclientDatachecks()
        await fulldnav.logout()
        const {LoginPage2} = initializePages(page)
        await LoginPage2.page2.goto(`${process.env.BASE_URL}`)
        expect(LoginPage2.page2.url()).toBe('https://qa1dnavportal.aaps.deloitte.com/')
        await fulldnav.credentialpage()
        await LoginPage2.login(`${process.env.USER_2}`,`${process.env.PASS_USER_2}`)
        await fulldnav.reviewwithanotheruser()
        await LoginPage2.acceptCookies()
        await page.pause()
    })

    test('TC24 - Verify user is able to see the materiality and portfolio', async ({page}) => {
        const {fulldnav} = initializePages(page)
        await fulldnav.verifyplanningphase()       
        await page.pause()
    })
    test('TC26 - Verify User can review and signoff the materiality procedure', async ({page}) => {
        const {fulldnav} = initializePages(page)
        await fulldnav.verifyplanningphase()    
        await fulldnav.materialityprocedurechecks()
        await fulldnav.logout()
        const {LoginPage2} = initializePages(page)
        await LoginPage2.page2.goto(`${process.env.BASE_URL}`)
        expect(LoginPage2.page2.url()).toBe('https://qa1dnavportal.aaps.deloitte.com/')
        await fulldnav.credentialpage()
        await LoginPage2.login(`${process.env.USER_2}`,`${process.env.PASS_USER_2}`)
        fulldnav.reviewmateriality()
        await page.pause()
    })
    test('TC29 - Verify User can review and signoff the Portfolio Overview', async ({page}) => {
        const {fulldnav} = initializePages(page)
        await fulldnav.verifyplanningphase()    
        await fulldnav.porfoliooverviewchecks()
        await fulldnav.logout()
        const {LoginPage2} = initializePages(page)
        await LoginPage2.page2.goto(`${process.env.BASE_URL}`)
        expect(LoginPage2.page2.url()).toBe('https://qa1dnavportal.aaps.deloitte.com/')
        await fulldnav.credentialpage()
        await LoginPage2.login(`${process.env.USER_2}`,`${process.env.PASS_USER_2}`)
        fulldnav.reviewPortfolioOverview()
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


}
)