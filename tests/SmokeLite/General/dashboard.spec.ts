import { expect, test } from '@playwright/test'
//import { test } from '../../fixtures/auth.fixture';
import LoginPage from '../../../pageObjects/General/login.page'

import DashboardPage from '../../../pageObjects/Dashboard/dashboard.page'
import SideMenuPage from '../../../pageObjects/General/sideMenu.page'
import HomePage from '../../../pageObjects/General/home.page'
import dotenv from 'dotenv'
import { TIMEOUT } from 'dns/promises'
dotenv.config()

test.describe('Valuation and Reconciliation > Home Page', () => {
    test.use({ storageState: './user1_auth.json'})

    test.beforeEach(async ({ page }) => {
        await page.goto(`${process.env.BASE_URL}`)
        //expect(page.url()).toBe('https://qnxdnavportal.aaps.deloitte.com/')
        const {loginPage} = initializePages(page)
        await loginPage.acceptCookies()
    })

    const initializePages = (page) => {
        return{
            loginPage: new LoginPage(page),
            dashboardPage: new DashboardPage(page),
            sideMenuComponent: new SideMenuPage(page),
            homePage:new HomePage(page)
        }
    } 

    test('TC09 - Verify user is able to see statistics data for all card types of Dashaboard', async ({page}) => {
        const {homePage} = initializePages(page)
        await homePage.verifyDashboardCards()
        //await page.pause()
    })

    test('TC10 - Verify user can see Recent Activity for Audit Directory and Modularized Procedure and navigate to respective page', async ({page}) => {
        const {homePage} = initializePages(page)
        await homePage.verifyRecentActivity()
        //await page.pause()
    })
})
