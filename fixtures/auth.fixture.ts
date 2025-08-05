import { test as base } from '@playwright/test';
import LoginPage from '../pageObjects/General/login.page';
import SideMenuPage from '../pageObjects/General/sideMenu.page';
import HomePage from "../pageObjects/General/home.page";
import FullDnavPage from '../pageObjects/FullDnav/FullDnav.page';
import ClientDataPhasePage from '../pageObjects/FullDnav/clientDataPhasePage';
import PlanningPhasePage from '../pageObjects/FullDnav/planningPhasePage';


export const test = base.extend<{ loginPage: LoginPage; sideMenuPage: SideMenuPage; homePage: HomePage, fullDnavPage: FullDnavPage, 
  clientDataPhasePage: ClientDataPhasePage, planningPhasePage: PlanningPhasePage}>({
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
  }

});