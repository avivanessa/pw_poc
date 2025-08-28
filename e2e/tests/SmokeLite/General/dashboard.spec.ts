import { test } from '../../../fixtures/users.fixture';
import LoginPage from '../../../pageObjects/General/login.page'
import DashboardPage from '../../../pageObjects/Dashboard/dashboard.page'
import SideMenuPage from '../../../pageObjects/General/sideMenu.page'
import HomePage from '../../../pageObjects/General/home.page'
import dotenv from 'dotenv'
dotenv.config()

test.describe('Valuation and Reconciliation > Home Page', () => {

    const initializePages = (page) => {
        return{
            loginPage: new LoginPage(page),
            dashboardPage: new DashboardPage(page),
            sideMenuComponent: new SideMenuPage(page),
            homePage:new HomePage(page)
        }
    } 

    test('TC09 - Verify user is able to see statistics data for all card types of Dashaboard', async ({userPreparePage}) =>  {
        const {loginPage, homePage} = initializePages(userPreparePage)
        await loginPage.navigateToLoginPage(userPreparePage);
        await homePage.verifyDashboardCards()
    })

    test('TC10 - Verify user can see Recent Activity for Audit Directory and Modularized Procedure and navigate to respective page', async ({userPreparePage}) =>  {
        const {loginPage, homePage} = initializePages(userPreparePage)
        await loginPage.navigateToLoginPage(userPreparePage);
        await homePage.verifyRecentActivity()
    })
})
