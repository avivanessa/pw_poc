import { test } from '../../../fixtures/auth.fixture';
import { expect, BrowserContext, Page } from '@playwright/test';
import dotenv from 'dotenv'
import LoginPage from '../../../pageObjects/loginPage2';
import SideMenuPage from '../../../pageObjects/General/sideMenu.page';
import FullDnavPage from '../../../pageObjects/FullDnav/FullDnav.page';
import ClientDataPhasePage from '../../../pageObjects/FullDnav/clientDataPhasePage';
import PlanningPhasePage from '../../../pageObjects/FullDnav/planningPhasePage';

dotenv.config()

test.describe.serial('Full DNAV - Validate 5 Phases', () => {

    test.use({ storageState: './user1_auth.json'})

    test.beforeEach(async ({ page, loginPage}) => {
        console.log("process.env.baseurl")
        await page.goto('/')
        expect(page.url()).toContain(`${process.env.BASE_URL}`)
        await loginPage.acceptCookies()
    })

    const inicializeNewPages = (page) => {
        return{
            loginPage2: new LoginPage(page),
            sideMenuPage2: new SideMenuPage(page),
            fullDnavPage2:new FullDnavPage(page),
            clientDataPhasePage2: new ClientDataPhasePage(page),
            planningPhasePage2: new PlanningPhasePage(page)
        }
    } 

    test('TC15 - Verify user is able to create new audit', async ({page, sideMenuPage, fullDnavPage, clientDataPhasePage}) => {
        await sideMenuPage.clickAuditDirectory()
        await fullDnavPage.createNewAudit(`${process.env.CLIENT_NAME}`,`${process.env.FISCAL_YEAR}`,`${process.env.ENGAGEMENT_ID}`,
            `${process.env.DATA_IMPORT_IDENTIFIER}`,'12/15/2025')
        globalThis.auditIdSmoke = await fullDnavPage.verifyAuditCreated(`${process.env.CLIENT_NAME}`)
        // TC20 - Verify client and deloitte data are in preparation phase
        await fullDnavPage.openFirstAudit(globalThis.auditIdSmoke)
        await clientDataPhasePage.verifyDataPreparationPhase()

        //globalThis.auditIdSmoke = 8942
    })

    test('TC21/23 - Verify user is able to prepare and review the client data checks', async ({sideMenuPage, fullDnavPage, loginPage, clientDataPhasePage, browser}) => {
        await sideMenuPage.clickAuditDirectory()
        // Open the created audit
        await fullDnavPage.openFirstAudit(globalThis.auditIdSmoke)
        await clientDataPhasePage.prepareClientData()
        await loginPage.logout()
        // Reinitialize pages with new storage state

        // Login with Reviewer User
        //User 2 New Context and Page
        const contextUser2: BrowserContext = await browser.newContext({ storageState: './user2_auth.json' });
        const pageUser2: Page = await contextUser2.newPage();
        
        const {loginPage2, sideMenuPage2, fullDnavPage2, clientDataPhasePage2} = inicializeNewPages(pageUser2);

        console.log("Login with the second user")
        await pageUser2.goto('/')
        expect(pageUser2.url()).toContain(`${process.env.BASE_URL}`)

        await loginPage2.acceptCookies()
        await sideMenuPage2.clickAuditDirectory()
        await fullDnavPage2.openFirstAudit(globalThis.auditIdSmoke)
        await clientDataPhasePage2.reviewClientData()      
    })

    test('TC24 - Verify user is able to see the materiality and portfolio', async ({sideMenuPage, fullDnavPage, planningPhasePage}) => {
        await sideMenuPage.clickAuditDirectory()
        // Open the created audit
        await fullDnavPage.openFirstAudit(globalThis.auditIdSmoke)
        await planningPhasePage.verifyPlanningPhaseInPreparation()     
    })

    test('TC26/29 - Verify User can review and signoff the materiality procedure and portfolio overview', async ({page, sideMenuPage, fullDnavPage, loginPage, planningPhasePage, browser}) => {
        await sideMenuPage.clickAuditDirectory()
        // Open the created audit
        await fullDnavPage.openFirstAudit(globalThis.auditIdSmoke)
        await planningPhasePage.prepare()
        await loginPage.logout()
        // Reinitialize pages with new storage state

        // Login with Reviewer User
        //User 2 New Context and Page
        const contextUser2: BrowserContext = await browser.newContext({ storageState: './user2_auth.json' });
        const pageUser2: Page = await contextUser2.newPage();
        
        const {loginPage2, sideMenuPage2, fullDnavPage2, planningPhasePage2} = inicializeNewPages(pageUser2);

        console.log("Login with the second user")
        await pageUser2.goto('/')
        expect(pageUser2.url()).toContain(`${process.env.BASE_URL}`)

        await loginPage2.acceptCookies()
        await sideMenuPage2.clickAuditDirectory()
        await fullDnavPage2.openFirstAudit(globalThis.auditIdSmoke)
        await planningPhasePage2.review()    
    })

})