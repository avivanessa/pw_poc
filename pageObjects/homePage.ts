import { Locator, Page, expect } from '@playwright/test'
import exp from 'constants'
import { stat } from 'fs'
import { memoryUsage } from 'process'

export default class SideMenuComponent{
    readonly page: Page
    readonly dashboard: Locator
    readonly sidemenuicons: Locator
    fulldnav: Locator
    modularized: Locator
    pdf: Locator
    searchmodule: Locator
    dashboardcards: Locator
    first_title: Locator

    constructor(page: Page){
        this.page = page
        this.dashboard = this.page.locator('a[href="/US/dashboard"]')
        this.fulldnav = this.page.locator('//div[@class="ant-layout-sider-children"]/ul/li[2]') 
        this.modularized = this.page.locator('//div[@class="ant-layout-sider-children"]/ul/li[3]')
        this.pdf = this.page.locator('//div[@class="ant-layout-sider-children"]/ul/li[4]') 
        this.searchmodule = this.page.locator('//div[@class="ant-layout-sider-children"]/ul/li[5]') 
        // this.fulldnav = this.page.locator('//div[@class="ant-layout-sider-children"]/ul/li[2]') 

        this.sidemenuicons = this.page.locator('//div[@class="ant-layout-sider-children"]/ul/li')
        // this.dashboardcards = this.page.locator('//a[@class="css-s7do8i"]/div/div/div/div/span')
        this.first_title =  this.page.locator('//*[contains(text(),"Recently Viewed Clients")]/following-sibling::div[1]/div[1]/div/div/div/div[1]/span')

    }

    async verifySideMenuIcons()
    {    
        const icons = await this.sidemenuicons.all()
            for (const i of icons)
            {  
                if(await i.innerText()=='Dashboard')    
                {
                    i.hover()
                    await expect(i).toHaveText('Dashboard')
                }
                else if(await i.innerText()=='Full DNAV')
                {
                    i.hover()
                    await expect(i).toHaveText('Full DNAV')
                }
                else if(await i.innerText()=='Modularized Procedures')
                {
                    i.hover()
                    await expect(i).toHaveText('Modularized Procedures')
                }
                else if(await i.innerText()=='Pdf Extraction')
                {
                    i.hover()
                    await expect(i).toHaveText('Pdf Extraction')
                }
                else if(await i.innerText()=='Search Module')
                {
                    i.hover()
                    await expect(i).toHaveText('Search Module')
                }
                else if(await i.innerText()=='Client Management')
                {
                    i.hover()
                    await expect(i).toHaveText('Client Management')
                }
                else if(await i.innerText()=='Financial Statement Workroom')
                {
                    i.hover()
                    await expect(i).toHaveText('Financial Statement Workroom')
                }
                else if(await i.innerText()=='Market Data Monitor')
                {
                    i.hover()
                    await expect(i).toHaveText('Market Data Monitor')
                }
                else{
                    console.log("no matching icon is found")
                }
                           
            }
    }
    
   
    async verifysubModules()
    {
        await this.fulldnav.click()
        const submodulesfullDNAV = await this.page.locator('//li/span[@class="ant-menu-title-content"]/a')
        await expect(submodulesfullDNAV).toContainText(['Audit Directory','Status Monitor','Procedure View'])
        await this.page.reload()
        await this.modularized.click()
        const submodulesmodularized = await this.page.locator('//li/span[@class="ant-menu-title-content"]/a')
        await expect(submodulesfullDNAV).toContainText(['Valuation & Reconciliation','Private Investment Module','Private Debt Calculator'])        
    
}

    async verifyDashboardCards()
    {
        await this.dashboard.click()
        const dashboardcards = await this.page.locator('//a[@class="css-s7do8i"]/div/div/div/div/span')
        await expect(dashboardcards).toContainText(['Audit Directory','Valuation & Reconciliation','Private Investment Module','Search Module'])
        const statistics = await this.page.locator('//a[@class="css-s7do8i"]/div/div/div/div[2]/div/div[2]/div')
        // await expect(statistics).toBeVisible()
        const statdata = await statistics.allTextContents()
        console.log(statdata)     


    }

    async verifyRecentActivity()
    {
        await this.dashboard.click()
        const recentactivityHeaders = await this.page.locator('//div[@id="table-wrapper"]/div/div/span')
        const items = await recentactivityHeaders.all()
        for(let it of items){
            console.log(it.textContent())
        }
        
        // await expect(recentactivityHeaders).toContainText(['Audit Directory','Modularized Procedures'])



    }
}