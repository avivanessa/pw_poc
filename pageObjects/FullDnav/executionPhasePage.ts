import { Page, Locator } from '@playwright/test';
import { CardComponent } from '../components/cardComponent';
import { PrepareReviewAssetPage } from './execution/prepareReviewAssetPage';
import { ValuationRoutinePage } from './execution/valuationRoutinePage';
import { ReconciliationRoutinePage } from './execution/reconciliationRoutinePage';
import { CostRollforwardRoutinePage } from './execution/costRollforwardRoutinePage';
import dotenv from 'dotenv'
import { DropdownComponent } from '../components/dropdownComponent';
import { UniquePositionsPage } from './execution/uniquePositionsPage';

dotenv.config()

export default class ExecutionPhasePage {

    private readonly page: Page;
    executionCard: CardComponent;
    backToAssetList: Locator;
    actionsButton: Locator;
    prepareReviewOption: Locator;
    allAssetLink: Locator;
    collapseButton: Locator;
    proceedButton: Locator;
    proceduresDropdown: DropdownComponent
    prepareReviewAssetPage: PrepareReviewAssetPage;
    valuationRoutinePage: ValuationRoutinePage;
    reconciliationRoutinePage: ReconciliationRoutinePage;
    costRollforwardRoutinePage: CostRollforwardRoutinePage;
    FDroutines: string[];
    breadCrumbAudit: Locator
    titlePage: Locator;
    reviewExceptionsRadiobutton: Locator;
    uniquePositionIcons: Locator;
    uniquePositionsPage: UniquePositionsPage;

    constructor(page: Page) {
        this.page = page;
        this.FDroutines = ['Valuation', 'Classification', 'Reconciliation', 'FX Rates', 'Book Value',
            'Quantity Rollforward', 'Cost Rollforward', 'Realized G/L', 'Unrealized P/L', 'Income'];
        this.executionCard = new CardComponent(this.page, 'Client Data');
        this.titlePage = this.page.locator('span.ant-page-header-heading-title').nth(1);   
        this.backToAssetList = this.page.getByText('Back to audit');
        this.actionsButton = this.page.getByRole('button', { name: 'Actions Caret-Down' });
        this.prepareReviewOption = this.page.getByText('Prepare / Review');
        this.allAssetLink = this.page.locator('//span[@class="ant-dropdown-menu-title-content"]/span[contains(text(),"All Assets")]');
        this.collapseButton = this.page.getByRole('button', { name: 'Collapse omnia-decrease', exact: true });
        this.proceedButton = this.page.getByRole('button', { name: 'Proceed' });
        this.proceduresDropdown = new DropdownComponent(this.page, 'Procedures');
        this.breadCrumbAudit = this.page.locator('.ant-breadcrumb-link').nth(1);
        this.reviewExceptionsRadiobutton = this.page.locator('span:has-text("Review Exceptions")').first();
        this.uniquePositionIcons = this.page.locator('button.ant-btn-circle.ant-btn-text.ant-btn-color-default.ant-btn-variant-text > span[aria-label="Warning-Circle-Warning"]');
        
        this.prepareReviewAssetPage = new PrepareReviewAssetPage(this.page);
        this.valuationRoutinePage = new ValuationRoutinePage(this.page);
        this.reconciliationRoutinePage = new ReconciliationRoutinePage(this.page);
        this.costRollforwardRoutinePage = new CostRollforwardRoutinePage(this.page);
        this.uniquePositionsPage = new UniquePositionsPage(this.page);
    }

    async verifyProcedures() {
        await this.page.waitForLoadState('load');
        await this.page.waitForTimeout(5000);
        await this.titlePage.waitFor({ state: 'visible' });
        console.log(`To verify procedures: ${this.FDroutines}`);
        for (const routine of this.FDroutines) {
            let subroutineCard = new CardComponent(this.page, routine);
            await subroutineCard.verifyCardVisible();
            await console.log(`The procedure card ${routine} is visible`);
        }
    }

    // Click on a Routine Card 
    async openRoutine(routine: string) {
        let subroutineCard = new CardComponent(this.page, routine);
        await subroutineCard.clickCard();
        console.log(`The routine ${routine} is opened`);
    }

    // Verify Routine Status 
    async verifyRoutineStatus(routine: string, expectedStatus: string) {
        let subroutineCard = new CardComponent(this.page, routine);
        await this.page.waitForTimeout(3000);
        await subroutineCard.verifyCardStatus(expectedStatus);
        console.log(`The routine ${routine} is in ${expectedStatus} status`);
    }

    async verifyAssets(routine) {
        await this.openRoutine(routine);
        const asset1 = await this.page.getByLabel('row-button').first();
        const asset2 = await this.page.getByLabel('row-button').nth(1);
        const assets = [asset1, asset2];
        for (const asset of assets) {
            asset.click();
            const assetsection = ['Audit Comment', 'Sign off', 'Item Details', 'Valuation', 'Attachments'];
            for (const sec of assetsection) {
                await this.page.locator('//span[@class="ant-page-header-heading-title" and @title="' + sec + '"]').isVisible();
                console.log(sec, " section is visible");
            }
            await this.backToAssetList.click();
        }
    }

    async bulkCommentsForPrepare() {
        await this.gotoBulkPrepare();
        await this.prepareReviewAssetPage.addCommentsAndSave()
    }

    async gotoBulkPrepare() {
        await this.page.waitForTimeout(4000);
        if (!await this.prepareReviewAssetPage.commentSectionInput.isVisible()) {
            console.log("gotoBulkPrepareReview - To click on actions dropdown and select Prepare/Review option");
            await this.actionsButton.hover();
            await this.actionsButton.click({ force: true });
            await this.page.waitForTimeout(2000);
            await this.prepareReviewOption.hover();
            await this.prepareReviewOption.click();
            await this.page.waitForTimeout(2000);
            await this.allAssetLink.click();
            await this.proceedButton.click();
        }
    }


    async gotoBulkReview() {
        await this.page.waitForTimeout(4000);
        if (!await this.prepareReviewAssetPage.commentSectionInput.isVisible()) {
            console.log("gotoBulkPrepareReview - To click on actions dropdown and select Prepare/Review option");
            await this.actionsButton.hover();
            await this.actionsButton.click({ force: true });
            await this.page.waitForTimeout(2000);
            await this.prepareReviewOption.hover();
            await this.prepareReviewOption.click();
            await this.page.waitForTimeout(2000);
            await this.allAssetLink.click();
            await this.reviewExceptionsRadiobutton.click();
            //await this.proceduresDropdown.selectValue('Review');
            await this.proceedButton.click();
        }
    }

    async completeBulkPrepare() {
        console.log("completeBulkPrepare");
        await this.bulkCommentsForPrepare();
        await this.gotoBulkPrepare();
        await this.prepareReviewAssetPage.enableTogglePreparerExecution();
    }

    async gotoAuditFromBreadCrumb(){
        await this.breadCrumbAudit.click();
    }

    async completeBulkReview() {
        console.log("completeBulkReview");
        await this.gotoBulkReview();
        await this.prepareReviewAssetPage.enableToggleReviewExecution();
    }

    async reviewUniqueItems() {
        console.log("reviewUniqueItems");

        /*const items = await this.uniquePositionIcons.elementHandles()
        console.log(`Number of unique positions pending to review: ${items.length}`);

        for (let index = 0; index < items.length; index++) {

            const itemsUpdated = await this.uniquePositionIcons.elementHandles()
            const iconButton = itemsUpdated[index]
            await this.uniquePositionIcons.first().waitFor({ state: 'visible' });
            await iconButton.click()
            await this.uniquePositionsPage.reviewUniqueItems();
        }*/

        await this.uniquePositionIcons.first().waitFor({ state: 'visible' });
        await this.uniquePositionIcons.first().click(); 
        await this.uniquePositionsPage.reviewUniqueItems();
        console.log("Unique items reviewed successfully");
    }
}