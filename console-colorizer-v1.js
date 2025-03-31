document.addEventListener('DOMContentLoaded', function() {
  // Run once on page load
  colorizeConsole();
  
  // Set up a mutation observer to handle dynamic content
  const observer = new MutationObserver(function(mutations) {
    colorizeConsole();
  });
  
  // Start observing the console output area
  const consoleArea = document.querySelector('.console-output');
  if (consoleArea) {
    observer.observe(consoleArea, { childList: true, subtree: true });
  }
  
  function colorizeConsole() {
    const consoleLines = document.querySelectorAll('.console-output span');
    consoleLines.forEach(line => {
      const text = line.textContent || '';
      
      // Check for prefixes - either at the start or after a timestamp
      if (text.match(/^\s*(INFO:|INFO\s|^\[.*?\]\s*INFO:)/i)) {
        line.style.color = '#008000'; // Green for INFO
      } 
      else if (text.match(/^\s*(ERROR:|ERROR\s|^\[.*?\]\s*ERROR:)/i)) {
        line.style.color = '#FF0000'; // Red for ERROR
        line.style.fontWeight = 'bold';
      }
      else if (text.match(/^\s*(WARN:|WARNING:|WARN\s|WARNING\s|^\[.*?\]\s*WARN:)/i)) {
        line.style.color = '#FFA500'; // Orange for WARN/WARNING
      }
    });
  }
});
