import { test, expect } from '@playwright/test'
import LoginPage from '../pageObjects/loginPage'
import DashboardPage from '../pageObjects/dashboardPage'
import SideMenuComponent from '../pageObjects/components/sideMenuComponent'
import HomePage from '../pageObjects/homePage'
import LoginPage2 from '../pageObjects/loginPage2'
import fullDNAVPage from '../pageObjects/fullDNAVPage'

import dotenv from 'dotenv'
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
            fulldnav:new fullDNAVPage(page),
            dashboardPage: new DashboardPage(page),
            sideMenuComponent: new SideMenuComponent(page),
            homepage:new HomePage(page),
            LoginPage2: new LoginPage2(page)

        }
    } 

    test('TC02 - Verify left navigation panel display appropriate modules', async ({page}) => {
        const {homepage} = initializePages(page)
        await homepage.verifySideMenuIcons()
        //await page.pause()
        // await page.close()
    })

    test('TC03 - validate the submodules of Full DNAV and Modularized Procedures', async ({page}) => {
        const {homepage, sideMenuComponent} = initializePages(page)
        await sideMenuComponent.clickAuditDirectory()

        //await page.pause()
    })

    test('TC04 - Validate is avable to go into Full DNAV - Audit Directory', async ({page}) => {
        const {sideMenuComponent, fulldnav} = initializePages(page)
        await sideMenuComponent.clickAuditDirectory()
        //console.log(fulldnav.pageTitle.textContent())
        await expect(fulldnav.pageTitle).toBeVisible({timeout: 50000})
        //await page.pause()
    })

})
