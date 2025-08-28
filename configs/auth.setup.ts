import { expect, chromium } from '@playwright/test';
import LoginPage from '../e2e/pageObjects/General/login.page'
import { findUser } from '../e2e/utils/userUtils';
import './env-config';
/*import dotenv from 'dotenv'
dotenv.config()*/

const userPrepareAuthFile = './configs/users_auth/user_prepare_auth.json'
const userReviewAuthFile = './configs/users_auth/user_review_auth.json'

export async function authSetup(){
    async function userPrepareSetup(){
        const browser = await chromium.launch() //{headless:true}
        const context = await browser.newContext()
        const page = await context.newPage()
        const user = findUser({ role: 'Engagement Manager', username: 'AuditTest10019@deloitte.com'}); 

        if (!user) 
            throw new Error('User not found');

        const loginPage = new LoginPage(page)
        await page.goto(`${process.env.BASE_URL}`)
        expect(page.url()).toContain('login.microsoftonline.com');
        console.log(`Logging in with user: ${user.username} and password: ${user.password}`);
        await loginPage.login(user.username, user.password);
        
        await page.context().storageState({ path: userPrepareAuthFile });
    }

    async function userReviewSetup(){
        const browser = await chromium.launch() //{headless:true}
        const context = await browser.newContext()
        const page = await context.newPage()
        const user = findUser({ role: 'Engagement Manager', username: 'AuditTest10087@deloitte.com'}); 

        if (!user) 
            throw new Error('User not found');

        const loginPage = new LoginPage(page)
        await page.goto(`${process.env.BASE_URL}`)
        expect(page.url()).toContain('login.microsoftonline.com');

        console.log(`Logging in with user: ${user.username} and password: ${user.password}`);
        await loginPage.login(user.username, user.password)
        await page.context().storageState({ path: userReviewAuthFile });
    }

    await (async () =>{
        await userPrepareSetup(),
        await userReviewSetup()
    })()
}