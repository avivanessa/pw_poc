import { Page, Locator } from '@playwright/test';

export class DropdownComponent {
  private dropdown: Locator;
  private input: Locator;
  private options: Locator;

  /**
   * Constructor for the DropdownSearchComponent This apply for Dropdowns that are the option to fill input for filtering
   * @param page - instance of Playwright Page
   * @param dropdownId - id del dropdown (variable)
   */
  constructor(private page: Page, dropdownId: string) {
    // selector of the dropdown based on the provided id
    this.dropdown = page.locator(`div[name="${dropdownId}"]`);
    // selector for the input inside the dropdown
    this.input = this.dropdown.locator('input.ant-select-selection-search-input');
    // selector for the options inside the dropdown
    this.options = page.locator('.ant-select-item-option');
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
   * @param value - value to select
   */
  async selectValue(value: string) {
    await this.open();
    await this.input.fill('');
    await this.input.fill(value);
    // Press Enter to select the value
    await this.page.keyboard.press('Enter');
  }

    /**
   * Select a value from the dropdown
   * This method opens the dropdown, and selects the first option that matches the provided value.
   * @param value - value to select
   */
  async selectOption(value: string) {
    await this.open();
    await this.options.filter({ hasText: value }).first().click();
  }

  /**
   * Get the currently selected value from the dropdown
   */
  async getSelectedValue(): Promise<string> {
    return this.input.inputValue();
  }






  // this method is for get the locator of a DropdownButton by the label identification name (ej. "Procedure")
  getDropdownButtonByLabel(labelText: string): Locator {
    return this.page.locator(`label:text-is("${labelText}")`).locator('..').locator('..').locator('button.ant-dropdown-trigger');
  }

  // This method allow to select a value into the dropdown with Button structure 
  async selectOptionForDropdownButton(labelText: string, optionText: string) {

    console.log (`selectOptionForDropdownButton - labelText: ${labelText}, optionText: ${optionText}`);
    // Get the dropdown button by label
    const dropdownButton = this.getDropdownButtonByLabel(labelText);

    // Open the dropdown 
    await dropdownButton.click();

    // Wait for the dropdown options to be visible
    const option = this.page.locator(`.ant-dropdown-menu-item >> text=${optionText}`);
    await option.waitFor({ state: 'visible' });
    await option.click();

    // Optional: wait for the dropdown button to be visible again
    await dropdownButton.waitFor({ state: 'visible' });
  }
}
