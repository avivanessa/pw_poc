import { test, expect } from '@playwright/test'
import LoginPage from '../pageObjects/General/login.page'
import SideMenuPage from '../pageObjects/General/sideMenu.page'
import ModularPage from '../pageObjects/Modular/Modular.page'
import dotenv from 'dotenv'
dotenv.config()

test.describe('Valuation and Reconciliation > Home Page', () => {
    test.use({ storageState: './user1_auth.json'})

    test.beforeEach(async ({ page }) => {
        await page.goto(`${process.env.BASE_URL}`)
        expect(page.url()).toBe(`${process.env.BASE_URL}`)
        expect(page.url()).toBe(`${process.env.BASE_URL}`)
        const {loginPage} = initializePages(page)
        await loginPage.acceptCookies()
    })

    const initializePages = (page) => {
        return{
            loginPage: new LoginPage(page),
            sideMenuPage: new SideMenuPage(page),
            valuationPage: new ModularPage(page)
        }
    } 

    test('TC306 - Validate user can create a project with templates', async ({page}) => {
        const {sideMenuPage, valuationPage} = initializePages(page)
        await sideMenuPage.clickDashboard()
        await sideMenuPage.clickModular()
        await valuationPage.selectClient(`${process.env.CLIENT_NAME}`)
        await valuationPage.addProject(`${process.env.FOLDER_NAME}`, `${process.env.PROJECT_NAME}`)
        //await page.pause()
    })
})