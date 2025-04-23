/**
 * Test suite for the modern filtered select implementation (custom element)
 */
module.exports = {
  '@tags': ['modern'],
  
  before: function(browser) {
    // Add ID attributes to the custom elements to make them easier to select
    browser.execute(function() {
      // Add IDs to the filtered-select elements
      const filteredSelects = document.querySelectorAll('filtered-select');
      
      // Assign IDs to the first two filtered selects if they don't have IDs
      if (filteredSelects[0] && !filteredSelects[0].id) {
        filteredSelects[0].id = 'basic-select-container';
      }
      
      if (filteredSelects[1] && !filteredSelects[1].id) {
        filteredSelects[1].id = 'grouped-select-container';
      }
      
      return true;
    });
  },
  
  'Modern Filtered Select - Basic Select - Basic Functionality': function(browser) {
    const page = browser.page.ModernFilteredSelectPage();
    
    page
      .navigate()
      .waitForElementPresent('@basicFilteredSelect');
    
    // Open dropdown
    page.openBasicSelect();
    
    // Verify dropdown is open (by checking if we can select an option)
    page.assertOptionExistsInBasicSelect('One', function(exists) {
      this.assert.equal(exists, true, 'Basic select option "One" exists');
    });
    
    // Close dropdown with close button
    page.closeBasicSelect();
    
    // Open dropdown again
    page.openBasicSelect();
    
    // Close dropdown with escape key
    page.pressEscapeKey();
    
    // Open dropdown again
    page.openBasicSelect();
    
    // Close dropdown by clicking outside
    page.clickOutsideDropdown();
    
    browser.end();
  },
  
  'Modern Filtered Select - Basic Select - Option Selection': function(browser) {
    const page = browser.page.ModernFilteredSelectPage();
    
    page
      .navigate()
      .waitForElementPresent('@basicFilteredSelect');
    
    // Open dropdown
    page.openBasicSelect();
    
    // Verify all options are available
    page.assertOptionExistsInBasicSelect('One', function(exists) {
      this.assert.equal(exists, true, 'Basic select option "One" exists');
    });
    
    page.assertOptionExistsInBasicSelect('Two', function(exists) {
      this.assert.equal(exists, true, 'Basic select option "Two" exists');
    });
    
    page.assertOptionExistsInBasicSelect('Three', function(exists) {
      this.assert.equal(exists, true, 'Basic select option "Three" exists');
    });
    
    page.assertOptionExistsInBasicSelect('Four', function(exists) {
      this.assert.equal(exists, true, 'Basic select option "Four" exists');
    });
    
    page.assertOptionExistsInBasicSelect('Five', function(exists) {
      this.assert.equal(exists, true, 'Basic select option "Five" exists');
    });
    
    // Select an option
    page.selectOptionByTextInBasicSelect('Three');
    
    // Verify the selection is reflected in the display, original select, and output
    page.getBasicSelectDisplayText(function(result) {
      this.assert.equal(result.value, 'Three');
    });
    
    page.getBasicSelectValue(function(result) {
      this.assert.equal(result.value, '3');
    });
    
    page.getBasicSelectOutputText(function(result) {
      this.assert.equal(result.value, 'Selected: Three');
    });
    
    browser.end();
  },
  
  'Modern Filtered Select - Basic Select - Search Functionality': function(browser) {
    const page = browser.page.ModernFilteredSelectPage();
    
    page
      .navigate()
      .waitForElementPresent('@basicFilteredSelect');
    
    // Open dropdown
    page.openBasicSelect();
    
    // Search for "o" (should match "One", "Four", "Two")
    page.searchBasicSelect('o');
    
    // Verify matches
    page.assertOptionExistsInBasicSelect('One', function(exists) {
      this.assert.equal(exists, true, 'Basic select option "One" exists after search');
    });
    
    page.assertOptionExistsInBasicSelect('Two', function(exists) {
      this.assert.equal(exists, true, 'Basic select option "Two" exists after search');
    });
    
    page.assertOptionExistsInBasicSelect('Four', function(exists) {
      this.assert.equal(exists, true, 'Basic select option "Four" exists after search');
    });
    
    // Select an option from the filtered results
    page.selectOptionByTextInBasicSelect('Four');
    
    // Verify the selection
    page.getBasicSelectDisplayText(function(result) {
      this.assert.equal(result.value, 'Four');
    });
    
    page.getBasicSelectValue(function(result) {
      this.assert.equal(result.value, '4');
    });
    
    browser.end();
  },
  
  'Modern Filtered Select - Grouped Select - Basic Functionality': function(browser) {
    const page = browser.page.ModernFilteredSelectPage();
    
    page
      .navigate()
      .waitForElementPresent('@groupedFilteredSelect');
    
    // Open dropdown
    page.openGroupedSelect();
    
    // Verify options from different groups are available
    page.assertOptionExistsInGroupedSelect('One', function(exists) {
      this.assert.equal(exists, true, 'Grouped select option "One" exists');
    });
    
    page.assertOptionExistsInGroupedSelect('Alpha', function(exists) {
      this.assert.equal(exists, true, 'Grouped select option "Alpha" exists');
    });
    
    // Close dropdown
    page.closeGroupedSelect();
    
    browser.end();
  },
  
  'Modern Filtered Select - Grouped Select - Option Selection': function(browser) {
    const page = browser.page.ModernFilteredSelectPage();
    
    page
      .navigate()
      .waitForElementPresent('@groupedFilteredSelect');
    
    // Open dropdown
    page.openGroupedSelect();
    
    // Select an option from first group
    page.selectOptionByTextInGroupedSelect('Two');
    
    // Verify the selection
    page.getGroupedSelectDisplayText(function(result) {
      this.assert.equal(result.value, 'Two');
    });
    
    page.getGroupedSelectValue(function(result) {
      this.assert.equal(result.value, '2');
    });
    
    page.getGroupedSelectOutputText(function(result) {
      this.assert.equal(result.value, 'Selected: Two');
    });
    
    // Open dropdown again
    page.openGroupedSelect();
    
    // Select an option from second group
    page.selectOptionByTextInGroupedSelect('Bravo');
    
    // Verify the selection
    page.getGroupedSelectDisplayText(function(result) {
      this.assert.equal(result.value, 'Bravo');
    });
    
    page.getGroupedSelectValue(function(result) {
      this.assert.equal(result.value, 'B');
    });
    
    page.getGroupedSelectOutputText(function(result) {
      this.assert.equal(result.value, 'Selected: Bravo');
    });
    
    browser.end();
  },
  
  'Modern Filtered Select - Grouped Select - Search Functionality': function(browser) {
    const page = browser.page.ModernFilteredSelectPage();
    
    page
      .navigate()
      .waitForElementPresent('@groupedFilteredSelect');
    
    // Open dropdown
    page.openGroupedSelect();
    
    // Search for "a"
    page.searchGroupedSelect('a');
    
    // Verify matches (Alpha, Bravo, Charlie)
    page.assertOptionExistsInGroupedSelect('Alpha', function(exists) {
      this.assert.equal(exists, true, 'Grouped select option "Alpha" exists after search');
    });
    
    page.assertOptionExistsInGroupedSelect('Bravo', function(exists) {
      this.assert.equal(exists, true, 'Grouped select option "Bravo" exists after search');
    });
    
    page.assertOptionExistsInGroupedSelect('Charlie', function(exists) {
      this.assert.equal(exists, true, 'Grouped select option "Charlie" exists after search');
    });
    
    // Select an option from the filtered results
    page.selectOptionByTextInGroupedSelect('Charlie');
    
    // Verify the selection
    page.getGroupedSelectDisplayText(function(result) {
      this.assert.equal(result.value, 'Charlie');
    });
    
    page.getGroupedSelectValue(function(result) {
      this.assert.equal(result.value, 'C');
    });
    
    browser.end();
  },
  
  'Modern Filtered Select - Dynamic Select - Update Options': function(browser) {
    const page = browser.page.ModernFilteredSelectPage();
    
    page
      .navigate()
      .waitForElementPresent('@dynamicFilteredSelect');
    
    // Open dropdown to check initial options
    page.openDynamicSelect();
    
    // Close the dropdown
    page.clickOutsideDropdown();
    
    // Click the update options button
    page.clickUpdateOptionsButton();
    
    // Open dropdown again to check updated options
    page.openDynamicSelect();
    
    // Verify that new options exist
    page.execute(function() {
      const select = document.querySelector('#dynamic-select-container');
      const options = select.shadowRoot.querySelectorAll('.select-widget__item');
      let containsNewOption = false;
      
      for (let i = 0; i < options.length; i++) {
        if (options[i].textContent === 'New Option 1') {
          containsNewOption = true;
          break;
        }
      }
      
      return containsNewOption;
    }, [], function(result) {
      this.assert.equal(result.value, true, 'Dynamic select contains new option after update');
    });
    
    // Verify that old options no longer exist
    page.execute(function() {
      const select = document.querySelector('#dynamic-select-container');
      const options = select.shadowRoot.querySelectorAll('.select-widget__item');
      let containsOldOption = false;
      
      for (let i = 0; i < options.length; i++) {
        if (options[i].textContent === 'Original Option 1') {
          containsOldOption = true;
          break;
        }
      }
      
      return containsOldOption;
    }, [], function(result) {
      this.assert.equal(result.value, false, 'Dynamic select does not contain old option after update');
    });
    
    // Select one of the new options
    page.execute(function() {
      const select = document.querySelector('#dynamic-select-container');
      const options = select.shadowRoot.querySelectorAll('.select-widget__item');
      
      for (let i = 0; i < options.length; i++) {
        if (options[i].textContent === 'New Option 2') {
          options[i].click();
          return true;
        }
      }
      
      return false;
    });
    
    // Verify the selection was updated correctly
    browser.pause(500); // Wait for the selection to take effect
    
    page.execute(function() {
      const select = document.querySelector('#dynamic-select-container');
      const displayButton = select.shadowRoot.querySelector('.select-widget__display-current');
      return displayButton.textContent;
    }, [], function(result) {
      this.assert.equal(result.value, 'New Option 2', 'Display text updated to selected option');
    });
    
    page.getValue('@dynamicOriginalSelect', function(result) {
      this.assert.equal(result.value, 'new2', 'Original select value updated correctly');
    });
    
    page.getText('@dynamicSelectOutput', function(result) {
      this.assert.equal(result.value, 'Selected: New Option 2', 'Output text updated correctly');
    });
    
    browser.end();
  }
};