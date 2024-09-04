import { test, expect, chromium } from '@playwright/test'
import LoginPage from '../pageObjects/loginPage'
import dotenv from 'dotenv'

dotenv.config()
test.use({ storageState: './user1_auth.json'})

test.describe('Example', () => {
    test('DNAV login', async ({page}) => {
        const loginPage = new LoginPage(page)
        await page.goto(`${process.env.BASE_URL}`)
        expect(page.url()).toBe('https://qa1dnavportal.aaps.deloitte.com/')
        await loginPage.acceptCookies()
    })
})