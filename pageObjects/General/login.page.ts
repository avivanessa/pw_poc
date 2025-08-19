import { expect, Locator, Page } from '@playwright/test'

export default class LoginPage {
    readonly page: Page
    readonly emailInput: Locator
    readonly passwordInput: Locator
    readonly nextButton: Locator
    readonly signinButton: Locator
    readonly acceptCookiesButton: Locator
    readonly accountName: Locator
    readonly logoutOption: Locator

    constructor(page: Page){
        this.page = page
        this.emailInput = this.page.locator('input[name="loginfmt"]');
        this.passwordInput = this.page.locator('input[name="passwd"]');
        this.nextButton = this.page.getByRole('button', { name: 'Next' });
        this.signinButton = this.page.getByRole('button', { name: 'Sign in' });
        this.acceptCookiesButton = this.page.locator('button[id="onetrust-accept-btn-handler"]')
        this.accountName = this.page.locator('span.ant-avatar-string').first()
        this.logoutOption = this.page.locator('//div[text()="Log Out"]')
    }

    async navigateToLoginPage(page: Page) {
        console.log("Loading DNAV Page")
        await page.goto('/')
        expect(page.url()).toContain(`${process.env.BASE_URL}`)
        await this.acceptCookies();
    }

    async login(email: string, password: string){
        await this.emailInput.fill(email)
        await this.nextButton.click()
        await this.passwordInput.fill(password)
        await this.signinButton.click()
    }

    async acceptCookies(){
        await this.acceptCookiesButton.waitFor({ state: 'visible' })
        await this.acceptCookiesButton.click()
    }

    async logout(){
        await this.accountName.click()
        await this.logoutOption.click()
        await this.page.close()
    }
}