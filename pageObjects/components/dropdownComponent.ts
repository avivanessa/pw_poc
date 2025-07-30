import { Page, Locator } from '@playwright/test';

export class DropdownComponent {
  private dropdown: Locator;
  private input: Locator;

  /**
   * Constructor for the DropdownComponent
   * @param page - instance of Playwright Page
   * @param dropdownId - id del dropdown (variable)
   */
  constructor(private page: Page, dropdownId: string) {
    // selector of the dropdown based on the provided id
    this.dropdown = page.locator(`div[name="${dropdownId}"]`);
    // selector for the input inside the dropdown
    this.input = this.dropdown.locator('input.ant-select-selection-search-input');
  }

  /**
   * Open the dropdown by clicking on it
   */
  async open() {
    await this.dropdown.click();
  }

  /**
   * Select a value from the dropdown
   * This method opens the dropdown, clears the input, types the value, and clicks on
   * @param value - valor a seleccionar o ingresar
   */
  async selectValue(value: string) {
    await this.open();
    await this.input.fill('');
    await this.input.fill(value);
    // Press Enter to select the value
    await this.page.keyboard.press('Enter');
  }

  /**
   * Get the currently selected value from the dropdown
   */
  async getSelectedValue(): Promise<string> {
    return this.input.inputValue();
  }
}
