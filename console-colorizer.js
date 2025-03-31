(function() {
  // Function to colorize console text
  function colorizeConsole() {
    console.log("[Colorizer] Starting console colorization...");
    
    // Try multiple possible selectors for console output
    const consoleElements = document.querySelectorAll('.console-output, .jenkins-console-log-view');
    
    if (consoleElements.length === 0) {
      console.log("[Colorizer] No console elements found. Will retry later.");
      return false;
    }
    
    consoleElements.forEach(consoleElement => {
      // Process pre elements (older Jenkins)
      const preElements = consoleElement.querySelectorAll('pre');
      if (preElements.length > 0) {
        preElements.forEach(processElement);
      }
      
      // Process span elements (newer Jenkins)
      const spanElements = consoleElement.querySelectorAll('span');
      if (spanElements.length > 0) {
        spanElements.forEach(processElement);
      }
      
      // Direct text nodes or other structures
      if (preElements.length === 0 && spanElements.length === 0) {
        processElement(consoleElement);
      }
    });
    
    console.log("[Colorizer] Colorization complete");
    return true;
  }
  
  function processElement(element) {
    const text = element.textContent || '';
    
    // Apply coloring with !important to override Jenkins styles
    if (text.match(/\bERROR\b/i)) {
      element.setAttribute('style', 'color: #FF0000 !important; font-weight: bold !important');
    } else if (text.match(/\bWARN(ING)?\b/i)) {
      element.setAttribute('style', 'color: #FFA500 !important');
    } else if (text.match(/\bINFO\b/i)) {
      element.setAttribute('style', 'color: #008000 !important');
    }
  }
  
  // Initial run
  function initialize() {
    // Try immediately
    if (!colorizeConsole()) {
      // If no console found, wait for DOM to be more complete
      setTimeout(colorizeConsole, 1000);
    }
    
    // Set up observer for dynamic content
    const observer = new MutationObserver(function(mutations) {
      colorizeConsole();
    });
    
    // Start observing the document body for console-related changes
    observer.observe(document.body, { 
      childList: true, 
      subtree: true 
    });
  }
  
  // Run on page load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
  } else {
    initialize();
  }
})();
