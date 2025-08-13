import { Locator, Page } from '@playwright/test'

export default class LoginPage2 {
    readonly page2: Page
    readonly emailInput: Locator
    readonly passwordInput: Locator
    readonly nextButton: Locator
    readonly signinButton: Locator
    readonly acceptCookiesButton: Locator

    constructor(page2: Page){
        this.page2 = page2
        this.emailInput = this.page2.locator('[name="loginfmt"]')
        this.passwordInput = this.page2.getByPlaceholder('Password')
        this.nextButton = this.page2.getByRole('button', { name: 'Next' })
        this.signinButton = this.page2.getByRole('button', { name: 'Sign in' })
        this.acceptCookiesButton = this.page2.locator('#onetrust-accept-btn-handler')
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