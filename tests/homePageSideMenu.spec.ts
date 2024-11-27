import { test, expect } from '@playwright/test'
import LoginPage from '../pageObjects/loginPage'
import DashboardPage from '../pageObjects/dashboardPage'
import SideMenuComponent from '../pageObjects/sideMenuComponent'
//import ValuationPage from '../pageObjects/valuationPage'
import homepage from '../pageObjects/homepage'
import LoginPage2 from '../pageObjects/loginPage2'

import dotenv from 'dotenv'
dotenv.config()

test.describe('Valuation and Reconciliation > Home Page', () => {
    test.use({ storageState: './user1_auth.json'})

    test.beforeEach(async ({ page }) => {
        await page.goto(`${process.env.BASE_URL}`)
        expect(page.url()).toBe('https://qnxdnavportal.aaps.deloitte.com/')
        const {loginPage} = initializePages(page)
        await loginPage.acceptCookies()
    })

    const initializePages = (page) => {
        return{
            loginPage: new LoginPage(page),
            dashboardPage: new DashboardPage(page),
            sideMenuComponent: new SideMenuComponent(page),
//            valuationPage: new ValuationPage(page),
            homepage:new homepage(page),
            LoginPage2: new LoginPage2(page),

        }
    } 

    test('TC02 - Verify left navigation panel display appropriate modules', async ({page}) => {
        const {homepage} = initializePages(page)
        await homepage.verifySideMenuIcons()
        await page.pause()
        // await page.close()
    })

    test.only('TC03 - validate the submodules of Full DNAV and Modularized Procedures', async ({page}) => {
        const {homepage} = initializePages(page)
        await homepage.verifysubModules()
        await page.pause()
    })

   






    

   



}

)