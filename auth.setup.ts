import { expect, chromium } from '@playwright/test';
import LoginPage from './pageObjects/General/login.page'
import dotenv from 'dotenv'

dotenv.config()
const user1AuthFile = './user1_auth.json'
const user2AuthFile = './user2_auth.json'

async function authSetup(){
    async function user1Setup(){
        const browser = await chromium.launch() //{headless:true}
        const context = await browser.newContext()
        const page = await context.newPage()

        const email = `${process.env.USER_1}`
        const password = `${process.env.PASS_USER_1}`
        const loginPage = new LoginPage(page)

        await page.goto(`${process.env.BASE_URL}`)
        //await page.goto(`https://qnxdnavportal.aaps.deloitte.com/`)
        expect(page.url()).toContain('login.microsoftonline.com');
        await loginPage.login(email, password);
        // wait for redirection to finish
        //await page.waitForURL('https://qnxdnavportal.aaps.deloitte.com/');
        // expect(page.url()).toContain('https://qnxdnavportal.aaps.deloitte.com/');
        
        await page.context().storageState({ path: user1AuthFile });
    }

    async function user2Setup(){
        const browser = await chromium.launch() //{headless:true}
        const context = await browser.newContext()
        const page = await context.newPage()

        const email = `${process.env.USER_2}`
        const password = `${process.env.PASS_USER_2}`
        const loginPage = new LoginPage(page)

        await page.goto(`${process.env.BASE_URL}`)
        expect(page.url()).toContain('login.microsoftonline.com');

        //expect(page.url()).toBe('https://qnxdnavportal.aaps.deloitte.com/')
        await loginPage.login(email, password)
        // wait for the redirection to finish
        //await page.waitForURL('https://qnxdnavportal.aaps.deloitte.com/');
        // expect(page.url()).toContain('https://qnxdnavportal.aaps.deloitte.com/');
        await page.context().storageState({ path: user2AuthFile });
    }

    await (async () =>{
        await user1Setup(),
        await user2Setup()
    })()
}

export default authSetup;