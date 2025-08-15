import { test as base } from '@playwright/test';
import LoginPage from '../pageObjects/General/login.page';
import SideMenuPage from '../pageObjects/General/sideMenu.page';
import HomePage from "../pageObjects/General/home.page";
import FullDnavPage from '../pageObjects/FullDnav/FullDnav.page';
import ClientDataPhasePage from '../pageObjects/FullDnav/clientDataPhasePage';
import PlanningPhasePage from '../pageObjects/FullDnav/planningPhasePage';
import ExecutionPhasePage from '../pageObjects/FullDnav/executionPhasePage';
import { ValuationRoutinePage } from '../pageObjects/FullDnav/execution/valuationRoutinePage';

export const test = base.extend<{ loginPage: LoginPage; sideMenuPage: SideMenuPage; homePage: HomePage, fullDnavPage: FullDnavPage, 
  clientDataPhasePage: ClientDataPhasePage, planningPhasePage: PlanningPhasePage, executionPhasePage: ExecutionPhasePage, 
  valuationRoutinePage: ValuationRoutinePage}>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  sideMenuPage: async ({ page }, use) => {
    await use(new SideMenuPage(page));
  },

  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },

  fullDnavPage: async ({ page }, use) => {
    await use(new FullDnavPage(page));
  },

  clientDataPhasePage: async ({ page }, use) => {
    await use(new ClientDataPhasePage(page));
  },

  planningPhasePage: async ({ page }, use) => {
    await use(new PlanningPhasePage(page));
  },

  executionPhasePage: async ({ page }, use) => {
    await use(new ExecutionPhasePage(page));
  },

  valuationRoutinePage: async ({ page }, use) => {
    await use(new ValuationRoutinePage(page));
  }

});