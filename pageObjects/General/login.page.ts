import { Locator, Page } from '@playwright/test'

export default class LoginPage {
    readonly page: Page
    readonly emailInput: Locator
    readonly passwordInput: Locator
    readonly nextButton: Locator
    readonly signinButton: Locator
    readonly acceptCookiesButton: Locator

    constructor(page: Page){
        this.page = page
        this.emailInput = this.page.locator('input[name="loginfmt"]');
        this.passwordInput = this.page.locator('input[name="passwd"]');
        this.nextButton = this.page.getByRole('button', { name: 'Next' });
        this.signinButton = this.page.getByRole('button', { name: 'Sign in' });
        this.acceptCookiesButton = this.page.locator('button[id="onetrust-accept-btn-handler"]')
    }

    async login(email: string, password: string){
        await this.emailInput.fill(email)
        await this.nextButton.click()
        await this.passwordInput.fill(password)
        await this.signinButton.click()
    }

    async acceptCookies(){
        await this.acceptCookiesButton.click()
    }
}