import { test, expect, BrowserContext, Page } from '@playwright/test'
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

    test('TC29 - Verify User can review and signoff the Portfolio Overview', async ({browser}) => {
        //User 1:
        const user1Context = await browser.newContext({ storageState: './user1_auth.json'});
        const user1Page = await user1Context.newPage();
        
        await user1Page.goto(`${process.env.BASE_URL}`)
        expect(user1Page.url()).toBe('https://qa1dnavportal.aaps.deloitte.com/')
        const {loginPage} = initializePages(user1Page)
        await loginPage.acceptCookies()

        await user1Page.close()

        //User 2:
        const user2Context = await browser.newContext({ storageState: './user2_auth.json'});
        const user2Page = await user2Context.newPage();
        
        await user2Page.goto(`${process.env.BASE_URL}`)
        expect(user2Page.url()).toBe('https://qa1dnavportal.aaps.deloitte.com/')
        const {loginPage: loginPageUser2} = initializePages(user2Page)
        await loginPageUser2.acceptCookies()

        await user2Page.pause()
    })
})