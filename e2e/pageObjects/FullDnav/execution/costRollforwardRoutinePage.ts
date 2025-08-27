import { Page, Locator, expect } from '@playwright/test';
import { PrepareReviewAssetPage } from './prepareReviewAssetPage';

export class CostRollforwardRoutinePage {

    private readonly page: Page;
    investmentTab: Locator
    derivativeTab: Locator
    pendingIcons: Locator
    prepareReviewAssetPage: PrepareReviewAssetPage
    prepareReviewOption: Locator
    closeIcon: Locator
    
    constructor(page: Page) {
        this.page = page;
        this.investmentTab = this.page.locator('#rc-tabs-0-tab-investmentsexchange')
        this.derivativeTab = this.page.locator('#rc-tabs-0-tab-derivatives')
        this.pendingIcons = this.page.getByRole('button', { name: 'Menu-' })
        this.prepareReviewAssetPage = new PrepareReviewAssetPage(this.page);
        this.prepareReviewOption = this.page.getByText('Prepare/Review');
    }

    async verifyCostRollforwardTabs(){
        await expect(await this.investmentTab.innerText()).toEqual('Investments/Exchange')
        await expect(await this.derivativeTab.innerText()).toEqual('Derivatives')
    }

    async gotoTabInvestments(){
        await expect(await this.investmentTab).toBeVisible()
        await this.investmentTab.click()
    }

    async gotoTabDerivatives(){
        console.log('Open Derivatives tab');
        await expect(await this.derivativeTab).toBeVisible()
        await this.derivativeTab.click()
    }

    async prepareAllItems(){
        await this.page.waitForLoadState('domcontentloaded');
        await this.pendingIcons.first().waitFor({ state: 'visible' });
        const items = await this.pendingIcons.elementHandles()
        console.log(`Number of items pending to prepare: ${items.length}`);

        for (let index = 0; index < items.length; index++) {

        const itemsUpdated = await this.pendingIcons.elementHandles()
            const iconButton = itemsUpdated[index] 
            await this.pendingIcons.first().waitFor({ state: 'visible' });
            await iconButton.click()
            await this.prepareReviewOption.click()
            await this.prepareReviewAssetPage.commentSectionInput.waitFor({ state: 'visible' });
            if (await this.prepareReviewAssetPage.commentSectionInput.isEditable()) 
            {
                console.log("Preparing item - adding comments and saving Prepare/Review");
                await this.prepareReviewAssetPage.addCommentsAndSave();
                await this.page.waitForTimeout(2000)
                const itemsUpdated = await this.pendingIcons.elementHandles()
                const currentIconButton = itemsUpdated[index] 
                await currentIconButton.click()
                //await iconButton.click()
                await this.page.waitForTimeout(2000)
                await this.prepareReviewOption.click()
                await this.prepareReviewAssetPage.enableTogglePreparerExecution();
                await this.page.waitForTimeout(2000)
            } else {
                console.log("Closing Prepare / Review popup");
                await this.prepareReviewAssetPage.close();
            }
        }
    }


    async reviewAllItems(){
        await this.page.waitForLoadState('domcontentloaded');
        await this.pendingIcons.first().waitFor({ state: 'visible' });
        const items = await this.pendingIcons.elementHandles()
        console.log(`Number of items pending to review: ${items.length}`);

        for (let index = 0; index < items.length; index++) {

        const itemsUpdated = await this.pendingIcons.elementHandles()
            const iconButton = itemsUpdated[index] 
            await this.pendingIcons.first().waitFor({ state: 'visible' });
            await iconButton.click()
            await this.prepareReviewOption.click()
            await this.prepareReviewAssetPage.commentSectionInput.waitFor({ state: 'visible' });
            if (await this.prepareReviewAssetPage.reviewerToggle.isEditable()) 
            {
                console.log("Reiviewing item ");
                await this.prepareReviewAssetPage.enableToggleReviewExecution();
                await this.page.waitForTimeout(2000)
            } else {
                console.log("Closing Prepare / Review popup");
                await this.prepareReviewAssetPage.close();
            }
        }
    }
}