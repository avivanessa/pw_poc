import { test } from '../../../fixtures/users.fixture';
import { expect } from '@playwright/test';
import dotenv from 'dotenv'
import LoginPage from '../../../pageObjects/General/login.page';
import SideMenuPage from '../../../pageObjects/General/sideMenu.page';
import FullDnavPage from '../../../pageObjects/FullDnav/FullDnav.page';
import ClientDataPhasePage from '../../../pageObjects/FullDnav/clientDataPhasePage';
import PlanningPhasePage from '../../../pageObjects/FullDnav/planningPhasePage';
import { ValuationRoutinePage } from '../../../pageObjects/FullDnav/execution/valuationRoutinePage';

dotenv.config()

test.describe.serial('Full DNAV - Validate 5 Phases', () => {

let loginPage: LoginPage
let sideMenuPage: SideMenuPage
let fullDnavPage: FullDnavPage
let clientDataPhasePage: ClientDataPhasePage
let planningPhasePage: PlanningPhasePage
let valuationRoutinePage: ValuationRoutinePage
let auditID: number

    const inicializePages = (page) => {
        // this.auditID 
        //  globalThis.auditIdSmoke = 8999;
        return{
            loginPage: new LoginPage(page),
            sideMenuPage: new SideMenuPage(page),
            fullDnavPage:new FullDnavPage(page),
            clientDataPhasePage: new ClientDataPhasePage(page),
            planningPhasePage: new PlanningPhasePage(page),
            executionPhasePage: new FullDnavPage(page).executionPhasePage,
            valuationRoutinePage: new ValuationRoutinePage(page)
        }
    } 

    test('TC15 [Create Audit] Verify user is able to create new audit', 
        async ({userPreparePage}) => {
            const { loginPage, sideMenuPage, fullDnavPage, clientDataPhasePage } = inicializePages(userPreparePage)
            await loginPage.navigateToLoginPage(userPreparePage);
            
            await sideMenuPage.clickAuditDirectory()
            await fullDnavPage.createNewAudit(`${process.env.CLIENT_NAME}`,`${process.env.FISCAL_YEAR}`,`${process.env.ENGAGEMENT_ID}`,
                `${process.env.DATA_IMPORT_IDENTIFIER}`,'12/15/2025')
            globalThis.auditIdSmoke = await fullDnavPage.verifyAuditCreated(`${process.env.CLIENT_NAME}`)
            // TC20 - Verify client and deloitte data are in preparation phase
            await fullDnavPage.openFirstAudit(globalThis.auditIdSmoke)
            await clientDataPhasePage.verifyDataPreparationPhase()
    })

    /* 
        Client Phase
    */
    test('TC21 [Client Data Phase][Prepare] Verify user is able to prepare client data checks', 
        async ({userPreparePage}) => {
            const { loginPage, sideMenuPage, fullDnavPage, clientDataPhasePage } = inicializePages(userPreparePage)
            await loginPage.navigateToLoginPage(userPreparePage);
            await sideMenuPage.clickAuditDirectory()
            // Open the created audit
            await fullDnavPage.openFirstAudit(globalThis.auditIdSmoke)
            await clientDataPhasePage.prepareClientData()
    })

    test('TC23 [Client Data Phase][Review] Verify user is able to review the client data and Deloitte Data turning green', 
        async ({userReviewPage}) => {
            const { loginPage, sideMenuPage, fullDnavPage, clientDataPhasePage } = inicializePages(userReviewPage)
            // Login with Reviewer User
            loginPage.navigateToLoginPage(userReviewPage);
            
            // Login with Reviewer User
            //User 2 New Context and Page
            
            await sideMenuPage.clickAuditDirectory()
            await fullDnavPage.openFirstAudit(globalThis.auditIdSmoke)
            await clientDataPhasePage.reviewClientData()      
    })


    /* 
        Planning Phase
    */
    test('TC24 [Planning Phase] Verify user is able to see the materiality and portfolio', 
        async ({userPreparePage}) => {
            const { loginPage, sideMenuPage, fullDnavPage, planningPhasePage } = inicializePages(userPreparePage)
            await loginPage.navigateToLoginPage(userPreparePage);
            await sideMenuPage.clickAuditDirectory()
            // Open the created audit
            await fullDnavPage.openFirstAudit(globalThis.auditIdSmoke)
            await planningPhasePage.verifyPlanningPhaseInPreparation()     
    })

    test('TC26 [Planning Phase] [Prepare] Verify User can prepare and signoff the materiality procedure and portfolio overview', 
        async ({userPreparePage}) => {
            const { loginPage, sideMenuPage, fullDnavPage, planningPhasePage } = inicializePages(userPreparePage)
            await loginPage.navigateToLoginPage(userPreparePage);
            await sideMenuPage.clickAuditDirectory()
            // Open the created audit
            await fullDnavPage.openFirstAudit(globalThis.auditIdSmoke)
            await planningPhasePage.prepare()  
    })

    test('TC29 [Planning Phase] [Review] Verify User can review and signoff the materiality procedure and portfolio overview', 
        async ({userReviewPage}) => {
            const { loginPage, sideMenuPage, fullDnavPage, planningPhasePage } = inicializePages(userReviewPage)
            // Login with Reviewer User
            loginPage.navigateToLoginPage(userReviewPage);
            //User 2 New Context and Page
            
            await sideMenuPage.clickAuditDirectory()
            await fullDnavPage.openFirstAudit(globalThis.auditIdSmoke)
            await planningPhasePage.review()    
    })

    /* 
        Execution Phase - Prepare
    */
    test.skip('TC30 [Execution Phase] Verify user is able to see all the 10 procedures in execution phase', 
        async ({userPreparePage}) => {
            const { loginPage, sideMenuPage, fullDnavPage, executionPhasePage } = inicializePages(userPreparePage)
            await loginPage.navigateToLoginPage(userPreparePage);
            await sideMenuPage.clickAuditDirectory()
            // Open the created audit
            await fullDnavPage.openFirstAudit(globalThis.auditIdSmoke)
            await executionPhasePage.verifyProcedures()     
    })

    test('TC31 [Execution Phase] Verify user can see Investments and Exchange Traded Positions, OTC Derivatives in valuation procedure ', 
        async ({userPreparePage}) => {
            const { loginPage, sideMenuPage, fullDnavPage, executionPhasePage, valuationRoutinePage } = inicializePages(userPreparePage)
            await loginPage.navigateToLoginPage(userPreparePage);
            await sideMenuPage.clickAuditDirectory()
            // Open the created audit
            await fullDnavPage.openFirstAudit(globalThis.auditIdSmoke)
            await executionPhasePage.openRoutine('Valuation')
            await valuationRoutinePage.verifyValuationTabs()   
    })



    test.describe('[Execution Phase] [Prepare] All phases', () => {
        // test.use({ pararel})
        test('TC44 [Execution Phase] Verify the IDV page of assets- Valuation Phase - Investments and Exchange Traded Positions ', 
            async ({userPreparePage}) => {
                const { loginPage, sideMenuPage, fullDnavPage, executionPhasePage } = inicializePages(userPreparePage)
                await loginPage.navigateToLoginPage(userPreparePage);
                // Open the created audit
                await sideMenuPage.clickAuditDirectory()
                await fullDnavPage.openFirstAudit(globalThis.auditIdSmoke)
                await executionPhasePage.verifyAssets('Valuation')   
        })

        test('[Execution Phase][Prepare][Valuation Routine] Verify the valuation asset on IDV page and asset status changes to prepared',
            async ({userPreparePage}) => {
                const { loginPage, sideMenuPage, fullDnavPage, executionPhasePage } = inicializePages(userPreparePage)
                await loginPage.navigateToLoginPage(userPreparePage);
                // Open the created audit
                await sideMenuPage.clickAuditDirectory()
                await fullDnavPage.openFirstAudit(globalThis.auditIdSmoke)
                await executionPhasePage.openRoutine('Valuation');
                await executionPhasePage.completeBulkPrepare();
                await executionPhasePage.valuationRoutinePage.gotoTabOtcDerivatives();
                await executionPhasePage.completeBulkPrepare();
                
                await executionPhasePage.gotoAuditFromBreadCrumb();
                await executionPhasePage.verifyRoutineStatus('Valuation', 'In Review');
        })

        test('[Execution Phase][Prepare][Classification Routine] Verify the Classification asset on IDV page and asset status changes to prepared',
            async ({userPreparePage}) => {
                const { loginPage, sideMenuPage, fullDnavPage, executionPhasePage } = inicializePages(userPreparePage)
                await loginPage.navigateToLoginPage(userPreparePage);
                // Open the created audit
                await sideMenuPage.clickAuditDirectory()
                await fullDnavPage.openFirstAudit(globalThis.auditIdSmoke)
                await executionPhasePage.openRoutine('Classification');
                await executionPhasePage.completeBulkPrepare();

                await executionPhasePage.gotoAuditFromBreadCrumb();
                await executionPhasePage.verifyRoutineStatus('Classification', 'In Review');
        })

        test('[Execution Phase][Prepare][Reconciliation Routine] Verify the Reconciliation asset on IDV page and asset status changes to prepared',
            async ({userPreparePage}) => {
                const { loginPage, sideMenuPage, fullDnavPage, executionPhasePage } = inicializePages(userPreparePage)
                await loginPage.navigateToLoginPage(userPreparePage);
                // Open the created audit
                await sideMenuPage.clickAuditDirectory()
                await fullDnavPage.openFirstAudit(globalThis.auditIdSmoke)
                await executionPhasePage.openRoutine('Reconciliation');
                
                // Custody to Reconciliation tab
                await executionPhasePage.completeBulkPrepare();

                // Futures to Reconciliation tab
                await executionPhasePage.reconciliationRoutinePage.gotoTabFutures();
                await executionPhasePage.completeBulkPrepare();

                // Forward to Reconciliation tab
                await executionPhasePage.reconciliationRoutinePage.gotoTabForward();
                await executionPhasePage.completeBulkPrepare();
                
                // Loans to Reconciliation tab
                await executionPhasePage.reconciliationRoutinePage.gotoTabLoans();
                await executionPhasePage.completeBulkPrepare();

                await executionPhasePage.gotoAuditFromBreadCrumb();
                await executionPhasePage.verifyRoutineStatus('Reconciliation', 'In Review');
        })

        test('[Execution Phase][Prepare][FX Rates Routine] Verify the FX Rates asset on IDV page and asset status changes to prepared',
            async ({userPreparePage}) => {
                const { loginPage, sideMenuPage, fullDnavPage, executionPhasePage } = inicializePages(userPreparePage)
                await loginPage.navigateToLoginPage(userPreparePage);
                // Open the created audit
                await sideMenuPage.clickAuditDirectory()
                await fullDnavPage.openFirstAudit(globalThis.auditIdSmoke)
                await executionPhasePage.openRoutine('FX Rates');
                await executionPhasePage.gotoAuditFromBreadCrumb();
                await executionPhasePage.verifyRoutineStatus('FX Rates', 'Reviewed');
        })

        test('[Execution Phase][Prepare][Book Value Routine] Verify the Book Value asset on IDV page and asset status changes to prepared',
            async ({userPreparePage}) => {
                const { loginPage, sideMenuPage, fullDnavPage, executionPhasePage } = inicializePages(userPreparePage)
                await loginPage.navigateToLoginPage(userPreparePage);
                // Open the created audit
                await sideMenuPage.clickAuditDirectory()
                await fullDnavPage.openFirstAudit(globalThis.auditIdSmoke)
                await executionPhasePage.openRoutine('Book Value');
                await executionPhasePage.completeBulkPrepare();
                
                await executionPhasePage.gotoAuditFromBreadCrumb();
                await executionPhasePage.verifyRoutineStatus('Book Value', 'In Review');
        })

        test('[Execution Phase][Prepare][Quantity Rollforward Routine] Verify the Quantity Rollforward asset on IDV page and asset status changes to prepared',
            async ({userPreparePage}) => {
                const { loginPage, sideMenuPage, fullDnavPage, executionPhasePage } = inicializePages(userPreparePage)
                await loginPage.navigateToLoginPage(userPreparePage);
                // Open the created audit
                await sideMenuPage.clickAuditDirectory()
                await fullDnavPage.openFirstAudit(globalThis.auditIdSmoke)
                await executionPhasePage.openRoutine('Quantity Rollforward');
                await executionPhasePage.completeBulkPrepare();
                
                await executionPhasePage.gotoAuditFromBreadCrumb();
                await executionPhasePage.verifyRoutineStatus('Quantity Rollforward', 'In Review');
        })

        test('[Execution Phase][Prepare][Cost Rollforward Routine] Verify the Cost Rollforward asset on IDV page and asset status changes to prepared',
            async ({userPreparePage}) => {
                const { loginPage, sideMenuPage, fullDnavPage, executionPhasePage } = inicializePages(userPreparePage)
                await loginPage.navigateToLoginPage(userPreparePage);
                // Open the created audit
                await sideMenuPage.clickAuditDirectory()
                await fullDnavPage.openFirstAudit(globalThis.auditIdSmoke)
                await executionPhasePage.openRoutine('Cost Rollforward');
                await executionPhasePage.costRollforwardRoutinePage.verifyCostRollforwardTabs();
                await executionPhasePage.costRollforwardRoutinePage.prepareAllItems();
                await executionPhasePage.costRollforwardRoutinePage.gotoTabDerivatives();
                await executionPhasePage.costRollforwardRoutinePage.prepareAllItems();
                //await executionPhasePage.completeBulkPrepare();
                // await executionPhasePage.completeBulkPrepare();
                
                await executionPhasePage.gotoAuditFromBreadCrumb();
                await executionPhasePage.verifyRoutineStatus('Cost Rollforward', 'In Review');
        })

        test('[Execution Phase][Prepare][Realized G/L Routine] Verify the Realized G/L asset on IDV page and asset status changes to prepared',
            async ({userPreparePage}) => {
                const { loginPage, sideMenuPage, fullDnavPage, executionPhasePage } = inicializePages(userPreparePage)
                await loginPage.navigateToLoginPage(userPreparePage);
                // Open the created audit
                await sideMenuPage.clickAuditDirectory()
                await fullDnavPage.openFirstAudit(globalThis.auditIdSmoke)
                await executionPhasePage.openRoutine('Realized G/L');
                await executionPhasePage.completeBulkPrepare();
                
                await executionPhasePage.gotoAuditFromBreadCrumb();
                await executionPhasePage.verifyRoutineStatus('Realized G/L', 'In Review');
        })

        test('[Execution Phase][Prepare][Unrealized P/L Routine] Verify the Unrealized P/L asset on IDV page and asset status changes to prepared',
            async ({userPreparePage}) => {
                const { loginPage, sideMenuPage, fullDnavPage, executionPhasePage } = inicializePages(userPreparePage)
                await loginPage.navigateToLoginPage(userPreparePage);
                // Open the created audit
                await sideMenuPage.clickAuditDirectory()
                await fullDnavPage.openFirstAudit(globalThis.auditIdSmoke)
                await executionPhasePage.openRoutine('Unrealized P/L');
                await executionPhasePage.completeBulkPrepare();
                
                await executionPhasePage.gotoAuditFromBreadCrumb();
                await executionPhasePage.verifyRoutineStatus('Unrealized P/L', 'In Review');
        })

        test('[Execution Phase][Prepare][Income Routine] Verify the Income asset on IDV page and asset status changes to prepared',
            async ({userPreparePage}) => {
                const { loginPage, sideMenuPage, fullDnavPage, executionPhasePage } = inicializePages(userPreparePage)
                await loginPage.navigateToLoginPage(userPreparePage);
                // Open the created audit

                await sideMenuPage.clickAuditDirectory()
                await fullDnavPage.openFirstAudit(globalThis.auditIdSmoke)
                await executionPhasePage.openRoutine('Income');
                await executionPhasePage.completeBulkPrepare();
                
                await executionPhasePage.gotoAuditFromBreadCrumb();
                await executionPhasePage.verifyRoutineStatus('Income', 'In Review');
        })

    })

    test.describe('[Execution Phase] [Review] All phases', () => {
        test('TC44 [Execution Phase] Verify the IDV page of assets- Valuation Phase - Investments and Exchange Traded Positions ', 
            async ({userReviewPage}) => {
                const { loginPage, sideMenuPage, fullDnavPage, executionPhasePage } = inicializePages(userReviewPage)
                await loginPage.navigateToLoginPage(userReviewPage);
                // Open the created audit
                await sideMenuPage.clickAuditDirectory()
                await fullDnavPage.openFirstAudit(globalThis.auditIdSmoke)
                await executionPhasePage.verifyAssets('Valuation')   
        })

        test('[Execution Phase][Review][Valuation Routine] Verify the valuation asset on IDV page and asset status changes to prepared',
            async ({userReviewPage}) => {
                const { loginPage, sideMenuPage, fullDnavPage, executionPhasePage } = inicializePages(userReviewPage)
                await loginPage.navigateToLoginPage(userReviewPage);
                // Open the created audit
                await sideMenuPage.clickAuditDirectory()
                await fullDnavPage.openFirstAudit(globalThis.auditIdSmoke)
                await executionPhasePage.openRoutine('Valuation');
                await executionPhasePage.completeBulkReview();
                await executionPhasePage.valuationRoutinePage.gotoTabOtcDerivatives();
                await executionPhasePage.completeBulkReview();
                
                await executionPhasePage.gotoAuditFromBreadCrumb();
                await executionPhasePage.verifyRoutineStatus('Valuation', 'Reviewed');
        })

        test('[Execution Phase][Review][Classification Routine] Verify the Classification asset on IDV page and asset status changes to prepared',
            async ({userReviewPage}) => {
                const { loginPage, sideMenuPage, fullDnavPage, executionPhasePage } = inicializePages(userReviewPage)
                await loginPage.navigateToLoginPage(userReviewPage);
                // Open the created audit
                await sideMenuPage.clickAuditDirectory()
                await fullDnavPage.openFirstAudit(globalThis.auditIdSmoke)
                await executionPhasePage.openRoutine('Classification');
                await executionPhasePage.completeBulkReview();

                await executionPhasePage.gotoAuditFromBreadCrumb();
                await executionPhasePage.verifyRoutineStatus('Classification', 'Reviewed');
        })

        test('[Execution Phase][Review][Reconciliation Routine] Verify the Reconciliation asset on IDV page and asset status changes to prepared',
            async ({userReviewPage}) => {
                const { loginPage, sideMenuPage, fullDnavPage, executionPhasePage } = inicializePages(userReviewPage)
                await loginPage.navigateToLoginPage(userReviewPage);
                // Open the created audit
                await sideMenuPage.clickAuditDirectory()
                await fullDnavPage.openFirstAudit(globalThis.auditIdSmoke)
                await executionPhasePage.openRoutine('Reconciliation');
                
                // Custody to Reconciliation tab
                await executionPhasePage.completeBulkReview();

                // Futures to Reconciliation tab
                await executionPhasePage.reconciliationRoutinePage.gotoTabFutures();
                await executionPhasePage.completeBulkReview();

                // Forward to Reconciliation tab
                await executionPhasePage.reconciliationRoutinePage.gotoTabForward();
                await executionPhasePage.completeBulkReview();
                
                // Loans to Reconciliation tab
                await executionPhasePage.reconciliationRoutinePage.gotoTabLoans();
                await executionPhasePage.completeBulkReview();

                await executionPhasePage.gotoAuditFromBreadCrumb();
                await executionPhasePage.verifyRoutineStatus('Reconciliation', 'Reviewed');
        })

        test('[Execution Phase][Review][FX Rates Routine] Verify the FX Rates asset on IDV page and asset status changes to prepared',
            async ({userReviewPage}) => {
                const { loginPage, sideMenuPage, fullDnavPage, executionPhasePage } = inicializePages(userReviewPage)
                await loginPage.navigateToLoginPage(userReviewPage);
                // Open the created audit
                await sideMenuPage.clickAuditDirectory()
                await fullDnavPage.openFirstAudit(globalThis.auditIdSmoke)
                await executionPhasePage.openRoutine('FX Rates');
                await executionPhasePage.gotoAuditFromBreadCrumb();
                await executionPhasePage.verifyRoutineStatus('FX Rates', 'Reviewed');
        })

        test('[Execution Phase][Review][Book Value Routine] Verify the Book Value asset on IDV page and asset status changes to prepared',
            async ({userReviewPage}) => {
                const { loginPage, sideMenuPage, fullDnavPage, executionPhasePage } = inicializePages(userReviewPage)
                await loginPage.navigateToLoginPage(userReviewPage);
                // Open the created audit
                await sideMenuPage.clickAuditDirectory()
                await fullDnavPage.openFirstAudit(globalThis.auditIdSmoke)
                await executionPhasePage.openRoutine('Book Value');
                await executionPhasePage.completeBulkReview();
                
                await executionPhasePage.gotoAuditFromBreadCrumb();
                await executionPhasePage.verifyRoutineStatus('Book Value', 'Reviewed');
        })

        test('[Execution Phase][Review][Quantity Rollforward Routine] Verify the Quantity Rollforward asset on IDV page and asset status changes to prepared',
            async ({userReviewPage}) => {
                const { loginPage, sideMenuPage, fullDnavPage, executionPhasePage } = inicializePages(userReviewPage)
                await loginPage.navigateToLoginPage(userReviewPage);
                // Open the created audit
                await sideMenuPage.clickAuditDirectory()
                await fullDnavPage.openFirstAudit(globalThis.auditIdSmoke)
                await executionPhasePage.openRoutine('Quantity Rollforward');
                await executionPhasePage.completeBulkReview();
                
                await executionPhasePage.gotoAuditFromBreadCrumb();
                await executionPhasePage.verifyRoutineStatus('Quantity Rollforward', 'Reviewed');
        })

        test('[Execution Phase][Review][Cost Rollforward Routine] Verify the Cost Rollforward asset on IDV page and asset status changes to prepared',
            async ({userReviewPage}) => {
                const { loginPage, sideMenuPage, fullDnavPage, executionPhasePage } = inicializePages(userReviewPage)
                await loginPage.navigateToLoginPage(userReviewPage);
                // Open the created audit
                await sideMenuPage.clickAuditDirectory()
                await fullDnavPage.openFirstAudit(globalThis.auditIdSmoke)
                await executionPhasePage.openRoutine('Cost Rollforward');
                await executionPhasePage.costRollforwardRoutinePage.reviewAllItems();
                await executionPhasePage.costRollforwardRoutinePage.gotoTabDerivatives();
                await executionPhasePage.costRollforwardRoutinePage.reviewAllItems();
                
                await executionPhasePage.gotoAuditFromBreadCrumb();
                await executionPhasePage.verifyRoutineStatus('Cost Rollforward', 'Reviewed');
        })

        test('[Execution Phase][Review][Realized G/L Routine] Verify the Realized G/L asset on IDV page and asset status changes to prepared',
            async ({userReviewPage}) => {
                const { loginPage, sideMenuPage, fullDnavPage, executionPhasePage } = inicializePages(userReviewPage)
                await loginPage.navigateToLoginPage(userReviewPage);
                // Open the created audit
                await sideMenuPage.clickAuditDirectory()
                await fullDnavPage.openFirstAudit(globalThis.auditIdSmoke)
                await executionPhasePage.openRoutine('Realized G/L');
                await executionPhasePage.completeBulkReview();
                
                await executionPhasePage.gotoAuditFromBreadCrumb();
                await executionPhasePage.verifyRoutineStatus('Realized G/L', 'Reviewed');
        })

        test('[Execution Phase][Review][Unrealized P/L Routine] Verify the Unrealized P/L asset on IDV page and asset status changes to prepared',
            async ({userReviewPage}) => {
                const { loginPage, sideMenuPage, fullDnavPage, executionPhasePage } = inicializePages(userReviewPage)
                await loginPage.navigateToLoginPage(userReviewPage);
                // Open the created audit
                await sideMenuPage.clickAuditDirectory()
                await fullDnavPage.openFirstAudit(globalThis.auditIdSmoke)
                await executionPhasePage.openRoutine('Unrealized P/L');
                await executionPhasePage.completeBulkReview();
                
                await executionPhasePage.gotoAuditFromBreadCrumb();
                await executionPhasePage.verifyRoutineStatus('Unrealized P/L', 'Reviewed');
        })

        test('[Execution Phase][Review][Income Routine] Verify the Income asset on IDV page and asset status changes to prepared',
            async ({userReviewPage}) => {
                const { loginPage, sideMenuPage, fullDnavPage, executionPhasePage } = inicializePages(userReviewPage)
                await loginPage.navigateToLoginPage(userReviewPage);
                // Open the created audit

                await sideMenuPage.clickAuditDirectory()
                await fullDnavPage.openFirstAudit(globalThis.auditIdSmoke)
                await executionPhasePage.openRoutine('Income');
                await executionPhasePage.completeBulkReview();
                
                await executionPhasePage.gotoAuditFromBreadCrumb();
                await executionPhasePage.verifyRoutineStatus('Income', 'Reviewed');
        })

        test('[Execution Phase][Review][Unique Positions] Verify the Income asset on IDV page and asset status changes to prepared',
            async ({userReviewPage}) => {
                const { loginPage, sideMenuPage, fullDnavPage, executionPhasePage } = inicializePages(userReviewPage)
                await loginPage.navigateToLoginPage(userReviewPage);
                // Open the created audit

                await sideMenuPage.clickAuditDirectory()
                await fullDnavPage.openFirstAudit(globalThis.auditIdSmoke)
                await executionPhasePage.verifyRoutineStatus('Income', 'Reviewed');
                await executionPhasePage.reviewUniqueItems();
        })

    })

    /* 
        Conclusion Phase
    */
    test('[Conclusion Phase] Verify user is able to see the Categorized Exception', 
        async ({userPreparePage}) => {
            const { loginPage, sideMenuPage, fullDnavPage, planningPhasePage } = inicializePages(userPreparePage)
            await loginPage.navigateToLoginPage(userPreparePage);
            await sideMenuPage.clickAuditDirectory()
            // Open the created audit
            await fullDnavPage.openFirstAudit(globalThis.auditIdSmoke)
            await planningPhasePage.verifyPlanningPhaseInPreparation()     
    })

    test('[Conclusion Phase] [Prepare] Verify User can prepare and signoff the materiality procedure and portfolio overview', 
        async ({userPreparePage}) => {
            const { loginPage, sideMenuPage, fullDnavPage, planningPhasePage } = inicializePages(userPreparePage)
            await loginPage.navigateToLoginPage(userPreparePage);
            await sideMenuPage.clickAuditDirectory()
            // Open the created audit
            await fullDnavPage.openFirstAudit(globalThis.auditIdSmoke)
            await planningPhasePage.prepare()  
    })

    test('[Conclusion Phase] [Review] Verify User can review and signoff the materiality procedure and portfolio overview', 
        async ({userReviewPage}) => {
            const { loginPage, sideMenuPage, fullDnavPage, planningPhasePage } = inicializePages(userReviewPage)
            // Login with Reviewer User
            loginPage.navigateToLoginPage(userReviewPage);
            //User 2 New Context and Page
            
            await sideMenuPage.clickAuditDirectory()
            await fullDnavPage.openFirstAudit(globalThis.auditIdSmoke)
            await planningPhasePage.review()    
    })
})