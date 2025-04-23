/**
 * Page object for the modern filtered select implementation (custom element)
 */
module.exports = {
  url: function() {
    return this.api.launch_url + '/modern-demo.html';
  },
  
  elements: {
    // Basic select custom element and original select
    basicFilteredSelect: '#basic-select-container',
    basicOriginalSelect: '#basic-select',
    basicSelectOutput: '#basic-select-output',
    
    // Grouped select custom element and original select
    groupedFilteredSelect: '#grouped-select-container',
    groupedOriginalSelect: '#grouped-select',
    groupedSelectOutput: '#grouped-select-output',
    
    // Dynamic select and update button
    dynamicFilteredSelect: '#dynamic-select-container',
    dynamicOriginalSelect: '#dynamic-select',
    dynamicSelectOutput: '#dynamic-select-output',
    updateOptionsButton: '#update-options-btn'
  },
  
  commands: [{
    /**
     * Open the basic select dropdown using the shadow DOM
     */
    openBasicSelect: function() {
      return this
        .waitForElementPresent('@basicFilteredSelect')
        .execute(function() {
          const select = document.querySelector('#basic-select-container');
          const button = select.shadowRoot.querySelector('.select-widget__display-current');
          button.click();
          return true;
        })
        .pause(500); // Wait for dropdown to appear
    },
    
    /**
     * Open the grouped select dropdown using the shadow DOM
     */
    openGroupedSelect: function() {
      return this
        .waitForElementPresent('@groupedFilteredSelect')
        .execute(function() {
          const select = document.querySelector('#grouped-select-container');
          const button = select.shadowRoot.querySelector('.select-widget__display-current');
          button.click();
          return true;
        })
        .pause(500); // Wait for dropdown to appear
    },
    
    /**
     * Open the dynamic select dropdown using the shadow DOM
     */
    openDynamicSelect: function() {
      return this
        .waitForElementPresent('@dynamicFilteredSelect')
        .execute(function() {
          const select = document.querySelector('#dynamic-select-container');
          const button = select.shadowRoot.querySelector('.select-widget__display-current');
          button.click();
          return true;
        })
        .pause(500); // Wait for dropdown to appear
    },
    
    /**
     * Close the basic select dropdown using the shadow DOM
     */
    closeBasicSelect: function() {
      return this
        .execute(function() {
          const select = document.querySelector('#basic-select-container');
          const closeButton = select.shadowRoot.querySelector('.select-widget__dropdown-close');
          closeButton.click();
          return true;
        })
        .pause(500); // Wait for dropdown to close
    },
    
    /**
     * Close the grouped select dropdown using the shadow DOM
     */
    closeGroupedSelect: function() {
      return this
        .execute(function() {
          const select = document.querySelector('#grouped-select-container');
          const closeButton = select.shadowRoot.querySelector('.select-widget__dropdown-close');
          closeButton.click();
          return true;
        })
        .pause(500); // Wait for dropdown to close
    },
    
    /**
     * Search in the basic select dropdown using the shadow DOM
     */
    searchBasicSelect: function(term) {
      return this
        .execute(function(searchTerm) {
          const select = document.querySelector('#basic-select-container');
          const searchInput = select.shadowRoot.querySelector('.select-widget__input-text');
          searchInput.value = '';
          searchInput.value = searchTerm;
          const event = new Event('keyup');
          searchInput.dispatchEvent(event);
          return true;
        }, [term])
        .pause(500); // Wait for search to complete
    },
    
    /**
     * Search in the grouped select dropdown using the shadow DOM
     */
    searchGroupedSelect: function(term) {
      return this
        .execute(function(searchTerm) {
          const select = document.querySelector('#grouped-select-container');
          const searchInput = select.shadowRoot.querySelector('.select-widget__input-text');
          searchInput.value = '';
          searchInput.value = searchTerm;
          const event = new Event('keyup');
          searchInput.dispatchEvent(event);
          return true;
        }, [term])
        .pause(500); // Wait for search to complete
    },
    
    /**
     * Select an option in the basic select dropdown by text using the shadow DOM
     */
    selectOptionByTextInBasicSelect: function(text) {
      return this
        .execute(function(optionText) {
          const select = document.querySelector('#basic-select-container');
          const options = select.shadowRoot.querySelectorAll('.select-widget__item');
          for (let i = 0; i < options.length; i++) {
            if (options[i].textContent === optionText) {
              options[i].click();
              return true;
            }
          }
          return false;
        }, [text])
        .pause(500); // Wait for selection to complete
    },
    
    /**
     * Select an option in the grouped select dropdown by text using the shadow DOM
     */
    selectOptionByTextInGroupedSelect: function(text) {
      return this
        .execute(function(optionText) {
          const select = document.querySelector('#grouped-select-container');
          const groupItems = select.shadowRoot.querySelectorAll('.select-widget__group-item');
          for (let i = 0; i < groupItems.length; i++) {
            if (groupItems[i].textContent === optionText) {
              groupItems[i].click();
              return true;
            }
          }
          
          // Try regular items as well
          const items = select.shadowRoot.querySelectorAll('.select-widget__item');
          for (let i = 0; i < items.length; i++) {
            if (items[i].textContent === optionText) {
              items[i].click();
              return true;
            }
          }
          
          return false;
        }, [text])
        .pause(500); // Wait for selection to complete
    },
    
    /**
     * Get the current display text of the basic select custom element
     */
    getBasicSelectDisplayText: function(callback) {
      this.execute(function() {
        const select = document.querySelector('#basic-select-container');
        const displayButton = select.shadowRoot.querySelector('.select-widget__display-current');
        return displayButton.textContent;
      }, [], callback);
      return this;
    },
    
    /**
     * Get the current display text of the grouped select custom element
     */
    getGroupedSelectDisplayText: function(callback) {
      this.execute(function() {
        const select = document.querySelector('#grouped-select-container');
        const displayButton = select.shadowRoot.querySelector('.select-widget__display-current');
        return displayButton.textContent;
      }, [], callback);
      return this;
    },
    
    /**
     * Get the value of the original basic select
     */
    getBasicSelectValue: function(callback) {
      return this.getValue('@basicOriginalSelect', callback);
    },
    
    /**
     * Get the value of the original grouped select
     */
    getGroupedSelectValue: function(callback) {
      return this.getValue('@groupedOriginalSelect', callback);
    },
    
    /**
     * Get the output text for basic select
     */
    getBasicSelectOutputText: function(callback) {
      return this.getText('@basicSelectOutput', callback);
    },
    
    /**
     * Get the output text for grouped select
     */
    getGroupedSelectOutputText: function(callback) {
      return this.getText('@groupedSelectOutput', callback);
    },
    
    /**
     * Check if an option exists in the basic select dropdown
     */
    assertOptionExistsInBasicSelect: function(text, callback) {
      this.execute(function(optionText) {
        const select = document.querySelector('#basic-select-container');
        const options = select.shadowRoot.querySelectorAll('.select-widget__item');
        for (let i = 0; i < options.length; i++) {
          if (options[i].textContent === optionText) {
            return true;
          }
        }
        return false;
      }, [text], function(result) {
        callback.call(this, result.value);
      });
      return this;
    },
    
    /**
     * Check if an option exists in the grouped select dropdown
     */
    assertOptionExistsInGroupedSelect: function(text, callback) {
      this.execute(function(optionText) {
        const select = document.querySelector('#grouped-select-container');
        const groupItems = select.shadowRoot.querySelectorAll('.select-widget__group-item');
        for (let i = 0; i < groupItems.length; i++) {
          if (groupItems[i].textContent === optionText) {
            return true;
          }
        }
        
        // Try regular items as well
        const items = select.shadowRoot.querySelectorAll('.select-widget__item');
        for (let i = 0; i < items.length; i++) {
          if (items[i].textContent === optionText) {
            return true;
          }
        }
        
        return false;
      }, [text], function(result) {
        callback.call(this, result.value);
      });
      return this;
    },
    
    /**
     * Click the update options button
     */
    clickUpdateOptionsButton: function() {
      return this
        .waitForElementVisible('@updateOptionsButton')
        .click('@updateOptionsButton')
        .pause(500); // Wait for options to update
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