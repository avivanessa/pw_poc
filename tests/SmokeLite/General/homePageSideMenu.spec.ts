// import { test } from '../../fixtures/auth.fixture';
import { test, expect } from '@playwright/test'
import LoginPage from '../../../pageObjects/General/login.page'
import homepage from '../../../pageObjects/General/home.page'

import dotenv from 'dotenv'
dotenv.config()

test.describe('Valuation and Reconciliation > Home Page', () => {
    test.use({ storageState: './user1_auth.json'})

    test.beforeEach(async ({ page }) => {
        await page.goto(`${process.env.BASE_URL}`)
        expect(page.url()).toContain(`${process.env.BASE_URL}`)
        const {loginPage} = initializePages(page)
        await loginPage.acceptCookies()
    })

    const initializePages = (page) => {
        return{
            loginPage: new LoginPage(page),
            homepage:new homepage(page),
        }
    } 

    test('TC02 - Verify left navigation panel display appropriate modules', async ({page}) => {
        const {homepage} = initializePages(page)
        await homepage.verifySideMenuIcons()
    })

    test('TC03 - validate the submodules of Full DNAV and Modularized Procedures', async ({page}) => {
        const {homepage} = initializePages(page)
        await homepage.verifysubModules()
    })

   






    

   



}

)