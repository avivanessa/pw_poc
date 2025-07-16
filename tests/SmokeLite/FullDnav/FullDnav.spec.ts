// import { test } from '../../fixtures/auth.fixture';
import { expect, test } from '@playwright/test';
import dotenv from 'dotenv'
import LoginPage from '../../../pageObjects/General/login.page'

import DashboardPage from '../../../pageObjects/Dashboard/dashboard.page'
import SideMenuPage from '../../../pageObjects/General/sideMenu.page'
import HomePage from '../../../pageObjects/General/home.page'
import FullDNAVPage from '../../../pageObjects/fullDNAVPage'

dotenv.config()

test.describe('Full DNAV - Validate 5 Phases', () => {
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
            dashboardPage: new DashboardPage(page),
            sideMenuPage: new SideMenuPage(page),
            homepage:new HomePage(page),
            fulldnav:new FullDNAVPage(page),
        }
    } 

    test('TC15 - Verify user is able to create new audit', async ({page}) => {
        const {sideMenuPage, fulldnav} = initializePages(page)
        // await sideMenuComponent.clickAuditDirectory()
        await fulldnav.createNewAudit(`${process.env.CLIENT_NAME}`,`${process.env.FISCAL_YEAR}`,`${process.env.ENGAGEMENT_ID}`,
            `${process.env.DATA_IMPORT_IDENTIFIER}`,'12/15/2025')
        await fulldnav.verifyAuditCreated(`${process.env.CLIENT_NAME}`)
        
    })
})