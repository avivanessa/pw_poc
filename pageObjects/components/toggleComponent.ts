import { Page, Locator, expect } from '@playwright/test';

export class ToggleComponent{
    toggle:Locator

    constructor(private page: Page, private toggleName: string) {

        this.toggle = this.page.locator(`span.ant-switch-inner[title="${toggleName}"]`);
        
    }
}