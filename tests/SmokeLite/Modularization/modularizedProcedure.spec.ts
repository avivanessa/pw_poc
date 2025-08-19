import { test } from '../../../fixtures/users.fixture';
import { expect } from '@playwright/test'
import LoginPage from '../../../pageObjects/General/login.page'
import SideMenuPage from '../../../pageObjects/General/sideMenu.page'
import ModularPage from '../../../pageObjects/Modular/Modular.page'
import dotenv from 'dotenv'
dotenv.config()

test.describe.skip('Valuation and Reconciliation > Home Page', () => {
    // test.use({ storageState: './user1_auth.json'})

    const initializePages = (page) => {
        return{
            loginPage: new LoginPage(page),
            sideMenuPage: new SideMenuPage(page),
            valuationPage: new ModularPage(page)
        }
    } 

    test('TC306 - Validate user can create a project with templates', async ({userPreparePage}) => {
        const {loginPage, sideMenuPage, valuationPage} = initializePages(userPreparePage)
        await loginPage.navigateToLoginPage(userPreparePage);
        await sideMenuPage.clickDashboard()
        await sideMenuPage.clickModular()
        await valuationPage.selectClient(`${process.env.CLIENT_NAME}`)
        await valuationPage.addProject(`${process.env.FOLDER_NAME}`, `${process.env.PROJECT_NAME}`)
        // TODO: Validate creation  - with toaster message 
    })
})