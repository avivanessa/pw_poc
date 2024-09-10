import { test, expect } from '@playwright/test'
import LoginPage from '../pageObjects/loginPage'
import DashboardPage from '../pageObjects/dashboardPage'
import SideMenuComponent from '../pageObjects/sideMenuComponent'
import ValuationPage from '../pageObjects/valuationPage'
import dotenv from 'dotenv'
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
            valuationPage: new ValuationPage(page)
        }
    } 

    test('TC306 - Validate user can create a project with templates', async ({page}) => {
        const {dashboardPage, sideMenuComponent, valuationPage} = initializePages(page)
        await sideMenuComponent.clickDashboard()
        await dashboardPage.navigate('Valuation & Reconciliation')
        await valuationPage.selectClient('3M Company')
        await valuationPage.addProject()
        await page.pause()
    })
})