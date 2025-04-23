/**
 * Test suite for the traditional filtered select implementation
 */
module.exports = {
  '@tags': ['traditional'],
  
  'Traditional Filtered Select - Simple Select - Basic Functionality': function(browser) {
    const page = browser.page.TraditionalFilteredSelectPage();
    
    page
      .navigate()
      .waitForElementVisible('@simpleSelectContainer');
    
    // Test initial state
    page.assert.visible('@simpleSelectButton');
    page.assert.visible('@simpleSelectChevron');
    page.assert.not.visible('@simpleSelectDropdown');
    
    // Open dropdown
    page.openSimpleSelect();
    page.assert.visible('@simpleSelectDropdown');
    page.assert.visible('@simpleSelectSearch');
    page.assert.visible('@simpleSelectResults');
    
    // Close dropdown with close button
    page.closeSimpleSelect();
    page.assert.not.visible('@simpleSelectDropdown');
    
    // Open dropdown again
    page.openSimpleSelect();
    page.assert.visible('@simpleSelectDropdown');
    
    // Close dropdown with escape key
    page.pressEscapeKey();
    page.assert.not.visible('@simpleSelectDropdown');
    
    // Open dropdown again
    page.openSimpleSelect();
    page.assert.visible('@simpleSelectDropdown');
    
    // Close dropdown by clicking outside
    page.clickOutsideDropdown();
    page.assert.not.visible('@simpleSelectDropdown');
    
    browser.end();
  },
  
  'Traditional Filtered Select - Simple Select - Option Selection': function(browser) {
    const page = browser.page.TraditionalFilteredSelectPage();
    
    page
      .navigate()
      .waitForElementVisible('@simpleSelectContainer');
    
    // Open dropdown
    page.openSimpleSelect();
    
    // Verify all options are visible
    page.assertOptionExistsInSimpleSelect('One');
    page.assertOptionExistsInSimpleSelect('Two');
    page.assertOptionExistsInSimpleSelect('Three');
    page.assertOptionExistsInSimpleSelect('Four');
    page.assertOptionExistsInSimpleSelect('Five');
    
    // Select an option
    page.selectOptionByTextInSimpleSelect('Three');
    
    // Verify the selection is reflected in the display and original select
    page.getSimpleSelectDisplayText(function(result) {
      this.assert.equal(result.value, 'Three');
    });
    
    page.getSimpleSelectValue(function(result) {
      this.assert.equal(result.value, '3');
    });
    
    browser.end();
  },
  
  'Traditional Filtered Select - Simple Select - Search Functionality': function(browser) {
    const page = browser.page.TraditionalFilteredSelectPage();
    
    page
      .navigate()
      .waitForElementVisible('@simpleSelectContainer');
    
    // Open dropdown
    page.openSimpleSelect();
    
    // Search for "o" (should match "One", "Four", "Two")
    page.searchSimpleSelect('o');
    
    // Verify filtered results
    page.assertOptionExistsInSimpleSelect('One');
    page.assertOptionExistsInSimpleSelect('Two');
    page.assertOptionExistsInSimpleSelect('Four');
    page.assertOptionNotExistsInSimpleSelect('Three');
    page.assertOptionNotExistsInSimpleSelect('Five');
    
    // Search for "t" (should match "Two", "Three")
    page.searchSimpleSelect('t');
    
    // Verify filtered results
    page.assertOptionExistsInSimpleSelect('Two');
    page.assertOptionExistsInSimpleSelect('Three');
    page.assertOptionNotExistsInSimpleSelect('One');
    page.assertOptionNotExistsInSimpleSelect('Four');
    page.assertOptionNotExistsInSimpleSelect('Five');
    
    // Search for non-existent text
    page.searchSimpleSelect('xyz');
    
    // Verify no results
    page.assertOptionNotExistsInSimpleSelect('One');
    page.assertOptionNotExistsInSimpleSelect('Two');
    page.assertOptionNotExistsInSimpleSelect('Three');
    page.assertOptionNotExistsInSimpleSelect('Four');
    page.assertOptionNotExistsInSimpleSelect('Five');
    
    // Clear search
    page.searchSimpleSelect('');
    
    // Verify all options are visible again
    page.assertOptionExistsInSimpleSelect('One');
    page.assertOptionExistsInSimpleSelect('Two');
    page.assertOptionExistsInSimpleSelect('Three');
    page.assertOptionExistsInSimpleSelect('Four');
    page.assertOptionExistsInSimpleSelect('Five');
    
    browser.end();
  },
  
  'Traditional Filtered Select - Grouped Select - Basic Functionality': function(browser) {
    const page = browser.page.TraditionalFilteredSelectPage();
    
    page
      .navigate()
      .waitForElementVisible('@groupedSelectContainer');
    
    // Test initial state
    page.assert.visible('@groupedSelectButton');
    page.assert.visible('@groupedSelectChevron');
    page.assert.not.visible('@groupedSelectDropdown');
    
    // Open dropdown
    page.openGroupedSelect();
    page.assert.visible('@groupedSelectDropdown');
    page.assert.visible('@groupedSelectSearch');
    page.assert.visible('@groupedSelectResults');
    
    // Verify group label is shown (since we have groups)
    page.assert.visible('@groupedSelectGroupLabel');
    
    // Close dropdown with close button
    page.closeGroupedSelect();
    page.assert.not.visible('@groupedSelectDropdown');
    
    browser.end();
  },
  
  'Traditional Filtered Select - Grouped Select - Option Selection': function(browser) {
    const page = browser.page.TraditionalFilteredSelectPage();
    
    page
      .navigate()
      .waitForElementVisible('@groupedSelectContainer');
    
    // Open dropdown
    page.openGroupedSelect();
    
    // Verify options from different groups are visible
    page.assertOptionExistsInGroupedSelect('One');
    page.assertOptionExistsInGroupedSelect('Alpha');
    page.assertOptionExistsInGroupedSelect('Alabama');
    
    // Select an option from first group
    page.selectOptionByTextInGroupedSelect('Two');
    
    // Verify the selection is reflected in the display and original select
    page.getGroupedSelectDisplayText(function(result) {
      this.assert.equal(result.value, 'Two');
    });
    
    page.getGroupedSelectValue(function(result) {
      this.assert.equal(result.value, '2');
    });
    
    // Open dropdown again
    page.openGroupedSelect();
    
    // Select an option from second group
    page.selectOptionByTextInGroupedSelect('Brovo');
    
    // Verify the selection is reflected in the display and original select
    page.getGroupedSelectDisplayText(function(result) {
      this.assert.equal(result.value, 'Brovo');
    });
    
    page.getGroupedSelectValue(function(result) {
      this.assert.equal(result.value, 'B');
    });
    
    browser.end();
  },
  
  'Traditional Filtered Select - Grouped Select - Search Functionality': function(browser) {
    const page = browser.page.TraditionalFilteredSelectPage();
    
    page
      .navigate()
      .waitForElementVisible('@groupedSelectContainer');
    
    // Open dropdown
    page.openGroupedSelect();
    
    // Search for "a" (should match options from multiple groups)
    page.searchGroupedSelect('a');
    
    // Verify filtered results
    page.assertOptionExistsInGroupedSelect('Alpha');
    page.assertOptionExistsInGroupedSelect('Alabama');
    page.assertOptionExistsInGroupedSelect('Alaska');
    
    // Search for "al" (should narrow down the results)
    page.searchGroupedSelect('al');
    
    // Verify filtered results
    page.assertOptionExistsInGroupedSelect('Alabama');
    page.assertOptionExistsInGroupedSelect('Alaska');
    page.assertOptionNotExistsInGroupedSelect('Alpha');
    
    // Search for non-existent text
    page.searchGroupedSelect('xyz');
    
    // Verify no options are visible
    page.assertOptionNotExistsInGroupedSelect('Alpha');
    page.assertOptionNotExistsInGroupedSelect('Alabama');
    page.assertOptionNotExistsInGroupedSelect('One');
    
    // Clear search
    page.searchGroupedSelect('');
    
    // Verify options from different groups are visible again
    page.assertOptionExistsInGroupedSelect('One');
    page.assertOptionExistsInGroupedSelect('Alpha');
    page.assertOptionExistsInGroupedSelect('Alabama');
    
    browser.end();
  }
};