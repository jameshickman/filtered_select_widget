/**
 * Test suite for the themed filtered select implementation
 */
module.exports = {
  '@tags': ['themed'],
  
  'Themed Filtered Select - Theme Attribute': function(browser) {
    browser
      .url(browser.launch_url + '/themed-demo.html')
      .waitForElementPresent('#dark-select')
      .execute(function() {
        // Get the dark themed element and check its applied styles
        const darkSelect = document.getElementById('dark-select');
        const displayButton = darkSelect.shadowRoot.querySelector('.select-widget__display-current');
        const computedStyle = window.getComputedStyle(displayButton);
        
        return {
          backgroundColor: computedStyle.backgroundColor,
          color: computedStyle.color,
          borderColor: computedStyle.borderColor
        };
      }, [], function(result) {
        // Verify the dark theme colors are applied
        // Note: exact color values may vary by browser, so we do approximate checks
        const rgbColor = result.value.backgroundColor;
        
        // Check if backgroundColor is a dark color (approximate check)
        const isBackgroundDark = rgbColor.includes('51') || rgbColor.includes('33') || rgbColor.includes('rgb(51') || rgbColor.includes('rgb(33');
        browser.assert.ok(isBackgroundDark, 'Dark theme background color is applied');
      });
      
    browser.end();
  },
  
  'Themed Filtered Select - Set Theme Method': function(browser) {
    browser
      .url(browser.launch_url + '/themed-demo.html')
      .waitForElementPresent('#switchable-select')
      .click('.btn-dark') // Apply dark theme
      .pause(500) // Wait for the theme to be applied
      
      .execute(function() {
        // Get the switchable element and check its applied styles after clicking the dark theme button
        const switchableSelect = document.getElementById('switchable-select');
        const displayButton = switchableSelect.shadowRoot.querySelector('.select-widget__display-current');
        const computedStyle = window.getComputedStyle(displayButton);
        
        return {
          backgroundColor: computedStyle.backgroundColor,
          color: computedStyle.color,
          borderColor: computedStyle.borderColor
        };
      }, [], function(result) {
        // Again, verify dark theme colors are applied after programmatic change
        const rgbColor = result.value.backgroundColor;
        const isBackgroundDark = rgbColor.includes('51') || rgbColor.includes('33') || rgbColor.includes('rgb(51') || rgbColor.includes('rgb(33');
        browser.assert.ok(isBackgroundDark, 'Dark theme background color is applied via setTheme()');
      })
      
      // Now switch to rounded theme
      .click('.btn-rounded')
      .pause(500)
      
      .execute(function() {
        // Check for rounded styles
        const switchableSelect = document.getElementById('switchable-select');
        const displayButton = switchableSelect.shadowRoot.querySelector('.select-widget__display-current');
        const computedStyle = window.getComputedStyle(displayButton);
        
        return {
          borderRadius: computedStyle.borderRadius
        };
      }, [], function(result) {
        // Check if the border radius is applied (should be greater than 0)
        const borderRadius = parseFloat(result.value.borderRadius);
        browser.assert.ok(borderRadius > 0, 'Rounded theme border-radius is applied');
      });
      
    browser.end();
  },
  
  'Themed Filtered Select - Placeholder Attribute': function(browser) {
    browser
      .url(browser.launch_url + '/themed-demo.html')
      .waitForElementPresent('#dark-select')
      
      .execute(function() {
        // Get the dark themed element and check its placeholder
        const darkSelect = document.getElementById('dark-select');
        const searchInput = darkSelect.shadowRoot.querySelector('.select-widget__input-text');
        return searchInput.placeholder;
      }, [], function(result) {
        // Verify the default placeholder
        browser.assert.equal(result.value, 'Search...', 'Default placeholder text is correct');
      })
      
      .execute(function() {
        // Update the placeholder attribute
        const darkSelect = document.getElementById('dark-select');
        darkSelect.setAttribute('placeholder', 'Find an option...');
        return darkSelect.shadowRoot.querySelector('.select-widget__input-text').placeholder;
      }, [], function(result) {
        // Verify the new placeholder
        browser.assert.equal(result.value, 'Find an option...', 'Updated placeholder text is correct');
      });
      
    browser.end();
  },
  
  'Themed Filtered Select - Disabled Attribute': function(browser) {
    browser
      .url(browser.launch_url + '/themed-demo.html')
      .waitForElementPresent('#default-select')
      
      .execute(function() {
        // Check initial disabled state
        const defaultSelect = document.getElementById('default-select');
        const displayButton = defaultSelect.shadowRoot.querySelector('.select-widget__display-current');
        const initialDisabled = displayButton.disabled;
        
        // Set disabled attribute
        defaultSelect.setAttribute('disabled', '');
        
        // Get updated disabled state
        const updatedDisabled = defaultSelect.shadowRoot.querySelector('.select-widget__display-current').disabled;
        
        return {
          initialDisabled: initialDisabled,
          updatedDisabled: updatedDisabled
        };
      }, [], function(result) {
        // Verify disabled state changes
        browser.assert.equal(result.value.initialDisabled, false, 'Element is initially enabled');
        browser.assert.equal(result.value.updatedDisabled, true, 'Element is disabled after attribute is set');
      })
      
      // Try clicking on the disabled select (should not open)
      .execute(function() {
        const defaultSelect = document.getElementById('default-select');
        const displayButton = defaultSelect.shadowRoot.querySelector('.select-widget__display-current');
        
        // Simulate click
        displayButton.click();
        
        // Check if dropdown is visible
        const dropdown = defaultSelect.shadowRoot.querySelector('.select-widget__dropdown-container');
        return getComputedStyle(dropdown).display !== 'none';
      }, [], function(result) {
        // Verify dropdown doesn't open when disabled
        browser.assert.equal(result.value, false, 'Dropdown does not open when select is disabled');
      });
      
    browser.end();
  }
};