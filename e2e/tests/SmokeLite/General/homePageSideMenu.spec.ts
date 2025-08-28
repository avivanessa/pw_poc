import { test } from '../../../fixtures/users.fixture';
import LoginPage from '../../../pageObjects/General/login.page'
import homepage from '../../../pageObjects/General/home.page'
import '../../../../configs/env-config';

test.describe('Valuation and Reconciliation > Home Page', () => {

    const initializePages = (page) => {
        return{
            loginPage: new LoginPage(page),
            homepage:new homepage(page),
        }
    } 

    test('TC02 - Verify left navigation panel display appropriate modules', async ({userPreparePage}) => {
        const {loginPage, homepage} = initializePages(userPreparePage)
        await loginPage.navigateToLoginPage(userPreparePage);
        await homepage.verifySideMenuIcons()
    })

    test('TC03 - validate the submodules of Full DNAV and Modularized Procedures', async ({userPreparePage}) => {
        const {loginPage, homepage} = initializePages(userPreparePage)
        await loginPage.navigateToLoginPage(userPreparePage);
        await homepage.verifysubModules()
    })

   






    

   



}

)