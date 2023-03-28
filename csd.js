const csd = {
  // Helper function to process the class and extract the CSS rules
  processClass: function(className) {
    const rules = className.replace('csd-', '').split('-');
    let css = '';
    for (let i = 0; i < rules.length; i += 2) {
      const property = rules[i];
      const value = rules[i + 1];
      css += `${property}: ${value}; `;
    }
    return css;
  },
  
  // Helper function to generate a unique class name
  generateClassName: function() {
    return `csd-processed-${Math.floor(Math.random() * 10000)}`;
  },
  
  // Helper function to remove the processed class name
  removeProcessedClass: function(element) {
    const processedClass = Array.from(element.classList).find(className => className.startsWith('csd-processed-'));
    if (processedClass) {
      element.classList.remove(processedClass);
    }
  },
  
  // Main function to process the page and apply the CSS rules
  processPage: function() {
    const elements = document.querySelectorAll('[class*=csd-]');
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      const classNames = Array.from(element.classList);
      for (let j = 0; j < classNames.length; j++) {
        const className = classNames[j];
        if (className.startsWith('csd-')) {
          const css = csd.processClass(className);
          const processedClass = csd.generateClassName();
          element.classList.add(processedClass);
          element.style.cssText += css;
          csd.removeProcessedClass(element);
        }
      }
    }
  },
  
  // Function to toggle a CSS class and apply the CSS rules
  toggle: function(selector) {
    return {
      toggle: function(className) {
        const element = document.querySelector(selector);
        if (!element) return;
        element.classList.toggle(className);
        csd.processPage();
        return this;
      },
      has: function(className) {
        const element = document.querySelector(selector);
        if (!element) return false;
        return element.classList.contains(className);
      },
      get: function(className) {
        const element = document.querySelector(selector);
        if (!element) return '';
        return element.style.getPropertyValue(csd.processClass(className).split(':')[0].trim());
      },
      set: function(className, value) {
        const element = document.querySelector(selector);
        if (!element) return;
        element.style.setProperty(csd.processClass(className).split(':')[0].trim(), value);
        csd.processPage();
        return this;
      }
    };
  },
  
  // Function to get the element from a selector
  target: function(selector) {
    return csd.toggle(selector);
  }
};

// Process the page on load
window.addEventListener('load', csd.processPage);
