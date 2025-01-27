import { test, expect } from '@playwright/test'
import LoginPage from '../pageObjects/loginPage'
import DashboardPage from '../pageObjects/dashboardPage'
import SideMenuComponent from '../pageObjects/sideMenuComponent'
import homepage from '../pageObjects/homepage'
import dotenv from 'dotenv'
import { TIMEOUT } from 'dns/promises'
dotenv.config()

test.describe('Valuation and Reconciliation > Home Page', () => {
    test.use({ storageState: './user1_auth.json'})

    test.beforeEach(async ({ page }) => {
        await page.goto(`${process.env.BASE_URL}`)
        expect(page.url()).toBe(`${process.env.BASE_URL}`)
        const {loginPage} = initializePages(page)
        await loginPage.acceptCookies()
    })

    const initializePages = (page) => {
        return{
            loginPage: new LoginPage(page),
            dashboardPage: new DashboardPage(page),
            sideMenuComponent: new SideMenuComponent(page),
            homepage:new homepage(page)
        }
    } 

    test('TC09 - Verify user is able to see statistics data for all card types of Dashaboard', async ({page}) => {
        const {homepage} = initializePages(page)
        await homepage.verifyDashboardCards()
        //await page.pause()
    })

    test('TC10 - Verify user can see Recent Activity for Audit Directory and Modularized Procedure and navigate to respective page', async ({page}) => {
        const {homepage} = initializePages(page)
        await homepage.verifyRecentActivity()
        //await page.pause()
    })

    
    



}

)
