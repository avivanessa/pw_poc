import { test } from '../../../fixtures/auth.fixture';
import { expect } from '@playwright/test';
import dotenv from 'dotenv'
import LoginPage from '../../../pageObjects/loginPage2';
//import LoginPage from '../../../pageObjects/General/login.page'
//import DashboardPage from '../../../pageObjects/Dashboard/dashboard.page'
//import SideMenuPage from '../../../pageObjects/General/sideMenu.page'
//import HomePage from '../../../pageObjects/General/home.page'
//import FullDNAVPage from '../../../pageObjects/fullDNAVPage'

dotenv.config()

let username2:string = process.env.USER_2!
let password2:string = process.env.PASS_USER_2!

test.describe('Full DNAV - Validate 5 Phases', () => {

    test.use({ storageState: './user1_auth.json'})

    test.beforeEach(async ({ page, loginPage}) => {
        console.log("process.env.baseurl")
        await page.goto('/')
        expect(page.url()).toContain(`${process.env.BASE_URL}`)
        await loginPage.acceptCookies()
    })

    test('TC15 - Verify user is able to create new audit', async ({page, sideMenuPage, fullDnavPage, phaseDetailPage}) => {
        await sideMenuPage.clickAuditDirectory()
        await fullDnavPage.createNewAudit(`${process.env.CLIENT_NAME}`,`${process.env.FISCAL_YEAR}`,`${process.env.ENGAGEMENT_ID}`,
            `${process.env.DATA_IMPORT_IDENTIFIER}`,'12/15/2025')
        await fullDnavPage.verifyAuditCreated(`${process.env.CLIENT_NAME}`)
        // TC20 - Verify client and deloitte data are in preparation phase
        await fullDnavPage.openFirstAudit()
        await phaseDetailPage.verifyDataPreparationPhase()
    })

    test('TC21/23 - Verify user is able to create and review the client data checks', async ({page, sideMenuPage, fullDnavPage, loginPage, phaseDetailPage, clientDataPhasePage}) => {
        await sideMenuPage.clickAuditDirectory()
        await fullDnavPage.openFirstAudit()
        await phaseDetailPage.prepareClientData()
        await loginPage.logout()
        // Login with Reviewer User
        await loginPage.login(username2,password2)
        await loginPage.acceptCookies()
        await sideMenuPage.clickAuditDirectory()
        await fullDnavPage.openFirstAudit()
        await phaseDetailPage.reviewClientData()        
    })
})