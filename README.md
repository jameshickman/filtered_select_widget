# Filtered Select

Copyright 2022. Omer James Hickman.
Released under the GNU LGPL V2

## Overview

Filtered Select is a lightweight JavaScript library that enhances standard HTML select elements with searchable dropdown functionality. It transforms regular select elements into interactive, filterable components that improve user experience, especially for dropdowns with many options.

## Features

- **Searchable Dropdowns**: Filter options as you type
- **Group Support**: Handles `<optgroup>` elements with proper hierarchical display
- **Keyboard Navigation**: Close the dropdown with Escape key
- **Custom Styling**: Fully customizable through CSS
- **Event Handling**: Preserves original select element events
- **No Dependencies**: Pure JavaScript with no external libraries required

## Usage

This library is available in two implementations:
1. Traditional JavaScript function (original implementation)
2. Modern ES6 Web Component (custom element)

### Traditional Implementation

1. Include the required files in your HTML:
   ```html
   <script src="filtered_select.js"></script>
   <link rel="stylesheet" href="selctor.css" />
   ```

2. Create a select element wrapped in a container:
   ```html
   <div class="select-container">
     <select id="my-select">
       <option value="1">Option 1</option>
       <option value="2">Option 2</option>
       <!-- More options... -->
     </select>
   </div>
   ```

3. Initialize the filtered select:
   ```javascript
   _filtered_select(document.querySelector(".select-container"));
   ```

### Modern ES6 Custom Element

1. Include the custom element script:
   ```html
   <script src="filtered-select-element.js"></script>
   ```

2. Use the custom element with a slotted select:
   ```html
   <filtered-select>
     <select id="my-select">
       <option value="1">Option 1</option>
       <option value="2">Option 2</option>
       <!-- More options... -->
     </select>
   </filtered-select>
   ```

## Examples

### Traditional Implementation

#### Basic Select

```html
<div class="select-container-simple">
    <select id="select-control">
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
        <option value="4">Four</option>
        <option value="5">Five</option>
    </select>
</div>
```

#### Grouped Select

```html
<div class="select-container-groups">
    <select id="select-control-groups">
        <optgroup label="Numbers">
            <option value="1">One</option>
            <!-- More options... -->
        </optgroup>
        <optgroup label="Letters">
            <option value="A">Alpha</option>
            <!-- More options... -->
        </optgroup>
    </select>
</div>
```

### Modern ES6 Custom Element

#### Basic Select

```html
<filtered-select>
  <select id="basic-select">
    <option value="1">One</option>
    <option value="2">Two</option>
    <option value="3">Three</option>
    <option value="4">Four</option>
    <option value="5">Five</option>
  </select>
</filtered-select>
```

#### Grouped Select

```html
<filtered-select>
  <select id="grouped-select">
    <optgroup label="Numbers">
      <option value="1">One</option>
      <option value="2">Two</option>
      <option value="3">Three</option>
    </optgroup>
    <optgroup label="Letters">
      <option value="A" selected="selected">Alpha</option>
      <option value="B">Bravo</option>
      <option value="C">Charlie</option>
    </optgroup>
  </select>
</filtered-select>
```

## API

### Traditional Implementation

#### Main Function

```javascript
const widgetController = _filtered_select(containerElement);
```

#### Methods

- `widgetController.reload()`: Reloads the options from the select element (useful after dynamically changing options)

### Modern ES6 Custom Element

#### Methods

- `filteredSelectElement.reload()`: Reloads the options from the select element (useful after dynamically changing options)

```javascript
// Example of dynamically changing options and reloading
const select = document.querySelector('filtered-select > select');
// Clear and add new options to the select element
select.innerHTML = '';
// Add new options...
// Reload the filtered select
document.querySelector('filtered-select').reload();
```

### Events

Both implementations preserve the original select element's events:

```javascript
document.querySelector('#my-select').addEventListener('change', function(e) {
    // Handle change event
});
```

## Demo Files

- `index.html`: Demo of the traditional implementation
- `modern-demo.html`: Demo of the modern ES6 custom element implementation

## Browser Compatibility

- Traditional Implementation: Compatible with all modern browsers
- Modern ES6 Custom Element: Compatible with browsers that support Web Components (all modern browsers, may require polyfills for older browsers)

## License

GNU LGPL V2