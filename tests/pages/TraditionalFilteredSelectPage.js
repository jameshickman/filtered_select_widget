/**
 * Page object for the traditional filtered select implementation
 */
module.exports = {
  url: function() {
    return this.api.launch_url + '/index.html';
  },
  
  elements: {
    // Simple select container and elements
    simpleSelectContainer: '.select-container-simple',
    simpleSelectButton: '.select-container-simple .select-widget__display-current',
    simpleSelectChevron: '.select-container-simple .select-widget__chevron',
    simpleSelectDropdown: '.select-container-simple .select-widget__dropdown-container',
    simpleSelectSearch: '.select-container-simple .select-widget__input-text',
    simpleSelectResults: '.select-container-simple .select-widget__results',
    simpleSelectCloseButton: '.select-container-simple .select-widget__dropdown-close',
    
    // Grouped select container and elements
    groupedSelectContainer: '.select-container-groups',
    groupedSelectButton: '.select-container-groups .select-widget__display-current',
    groupedSelectChevron: '.select-container-groups .select-widget__chevron',
    groupedSelectDropdown: '.select-container-groups .select-widget__dropdown-container',
    groupedSelectSearch: '.select-container-groups .select-widget__input-text',
    groupedSelectResults: '.select-container-groups .select-widget__results',
    groupedSelectGroupLabel: '.select-container-groups .select-widget__group-label',
    groupedSelectCloseButton: '.select-container-groups .select-widget__dropdown-close',
    
    // Original select elements (hidden)
    simpleOriginalSelect: '#select-control',
    groupedOriginalSelect: '#select-control-groups'
  },
  
  commands: [{
    /**
     * Open the simple select dropdown
     */
    openSimpleSelect: function() {
      return this
        .waitForElementVisible('@simpleSelectButton')
        .click('@simpleSelectButton')
        .waitForElementVisible('@simpleSelectDropdown');
    },
    
    /**
     * Open the grouped select dropdown
     */
    openGroupedSelect: function() {
      return this
        .waitForElementVisible('@groupedSelectButton')
        .click('@groupedSelectButton')
        .waitForElementVisible('@groupedSelectDropdown');
    },
    
    /**
     * Close the simple select dropdown
     */
    closeSimpleSelect: function() {
      return this
        .waitForElementVisible('@simpleSelectCloseButton')
        .click('@simpleSelectCloseButton')
        .waitForElementNotVisible('@simpleSelectDropdown');
    },
    
    /**
     * Close the grouped select dropdown
     */
    closeGroupedSelect: function() {
      return this
        .waitForElementVisible('@groupedSelectCloseButton')
        .click('@groupedSelectCloseButton')
        .waitForElementNotVisible('@groupedSelectDropdown');
    },
    
    /**
     * Search in the simple select dropdown
     */
    searchSimpleSelect: function(term) {
      return this
        .waitForElementVisible('@simpleSelectSearch')
        .clearValue('@simpleSelectSearch')
        .setValue('@simpleSelectSearch', term);
    },
    
    /**
     * Search in the grouped select dropdown
     */
    searchGroupedSelect: function(term) {
      return this
        .waitForElementVisible('@groupedSelectSearch')
        .clearValue('@groupedSelectSearch')
        .setValue('@groupedSelectSearch', term);
    },
    
    /**
     * Select an option in the simple select by text
     */
    selectOptionByTextInSimpleSelect: function(text) {
      return this
        .useXpath()
        .waitForElementVisible(`//div[contains(@class, "select-container-simple")]//button[contains(@class, "select-widget__item") and text()="${text}"]`)
        .click(`//div[contains(@class, "select-container-simple")]//button[contains(@class, "select-widget__item") and text()="${text}"]`)
        .useCss()
        .waitForElementNotVisible('@simpleSelectDropdown');
    },
    
    /**
     * Select an option in the grouped select by text
     */
    selectOptionByTextInGroupedSelect: function(text) {
      return this
        .useXpath()
        .waitForElementVisible(`//div[contains(@class, "select-container-groups")]//button[contains(@class, "select-widget__group-item") or contains(@class, "select-widget__item") and text()="${text}"]`)
        .click(`//div[contains(@class, "select-container-groups")]//button[contains(@class, "select-widget__group-item") or contains(@class, "select-widget__item") and text()="${text}"]`)
        .useCss()
        .waitForElementNotVisible('@groupedSelectDropdown');
    },
    
    /**
     * Get the current display text of the simple select
     */
    getSimpleSelectDisplayText: function(callback) {
      return this.getText('@simpleSelectButton', callback);
    },
    
    /**
     * Get the current display text of the grouped select
     */
    getGroupedSelectDisplayText: function(callback) {
      return this.getText('@groupedSelectButton', callback);
    },
    
    /**
     * Get the value of the original simple select
     */
    getSimpleSelectValue: function(callback) {
      return this.getValue('@simpleOriginalSelect', callback);
    },
    
    /**
     * Get the value of the original grouped select
     */
    getGroupedSelectValue: function(callback) {
      return this.getValue('@groupedOriginalSelect', callback);
    },
    
    /**
     * Check if an option exists in the simple select dropdown
     */
    assertOptionExistsInSimpleSelect: function(text) {
      return this
        .useXpath()
        .assert.elementPresent(`//div[contains(@class, "select-container-simple")]//button[contains(@class, "select-widget__item") and text()="${text}"]`)
        .useCss();
    },
    
    /**
     * Check if an option does not exist in the simple select dropdown
     */
    assertOptionNotExistsInSimpleSelect: function(text) {
      return this
        .useXpath()
        .assert.not.elementPresent(`//div[contains(@class, "select-container-simple")]//button[contains(@class, "select-widget__item") and text()="${text}"]`)
        .useCss();
    },
    
    /**
     * Check if an option exists in the grouped select dropdown
     */
    assertOptionExistsInGroupedSelect: function(text) {
      return this
        .useXpath()
        .assert.elementPresent(`//div[contains(@class, "select-container-groups")]//button[(contains(@class, "select-widget__group-item") or contains(@class, "select-widget__item")) and text()="${text}"]`)
        .useCss();
    },
    
    /**
     * Check if an option does not exist in the grouped select dropdown
     */
    assertOptionNotExistsInGroupedSelect: function(text) {
      return this
        .useXpath()
        .assert.not.elementPresent(`//div[contains(@class, "select-container-groups")]//button[(contains(@class, "select-widget__group-item") or contains(@class, "select-widget__item")) and text()="${text}"]`)
        .useCss();
    },
    
    /**
     * Press escape key to close the dropdown
     */
    pressEscapeKey: function() {
      return this.keys(this.api.Keys.ESCAPE);
    },
    
    /**
     * Click outside the dropdown to close it
     */
    clickOutsideDropdown: function() {
      return this.click('body');
    }
  }]
};