import { Page, Locator, expect } from '@playwright/test';

export class TableComponent {
  readonly page: Page;
  readonly table: Locator;
  readonly rows: Locator;
  readonly headers: Locator;

  /** Constructor to initialize the TableComponent with a Playwright Page.
    * @param {Page} page - The Playwright Page object.   
    * This is used to interact with the table on the page.
    */
  constructor(page: Page) {
    this.page = page;
    this.table = page.locator('.ant-table-container table');
    this.rows = this.table.locator('tbody > tr:not(.ant-table-measure-row)');
    this.headers = this.table.locator('thead.ant-table-thead th');
  }

  /**
   * Get the amount of rows into the table 
   * @returns {number} - Amount of rows in the table
   */
  async getRowCount(): Promise<number> {
    return await this.rows.count();
  }

  /**
   * Get the amount of columns into the table 
   * @returns {number} - Amount of columns in the table
   */
  async getColumnCount(): Promise<number> {
    return this.headers.count();
  }

  /**
   * Get the text into a specific row and column 
   * @param rowIdx - index of the row (0-based)
   * @param colIdx - index of the column (0-based)
   * @returns {string} - Text content of the specified cell
   */
  async getCellText(rowIdx: number, colIdx: number): Promise<string> {
    return await this.table.locator(`tbody tr`).nth(rowIdx)
      .locator('td').nth(colIdx).innerText();
  }

  /**
   * Click into a specific cell by row and column 
   * @param rowIdx - index of the row (0-based)
   * @param colIdx - index of the column (0-based)
   */
  async clickCell(rowIdx: number, colIdx: number) {
    await this.table.locator(`tbody tr`).nth(rowIdx)
      .locator('td').nth(colIdx).click();
  }

  /**
   * Sorting the table by a specific header
   * @param headerText - text of the header to sort by
   */
  async sortByHeader(headerText: string) {
    await this.table.locator('thead th', { hasText: headerText }).click();
  }

  async verifyIsVisible() {
    expect (await this.table.isVisible()).toBeTruthy();
    expect (await this.table.locator(`tbody tr`));
    expect (await this.rows.count()).toBeGreaterThan(0);
  }
}