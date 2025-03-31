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
      
      // Check for INFO/WARN/ERROR patterns with or without timestamps
      if (text.match(/^\s*INFO:|\[.*?\]\s*INFO:|^\s*INFO\s/i)) {
        line.style.color = '#3fb950'; // GitHub green
      } 
      else if (text.match(/^\s*ERROR:|\[.*?\]\s*ERROR:|^\s*ERROR\s/i)) {
        line.style.color = '#f85149'; // GitHub red
        line.style.fontWeight = 'bold';
      }
      else if (text.match(/^\s*WARN(ING)?:|\[.*?\]\s*WARN(ING)?:|^\s*WARN(ING)?\s/i)) {
        line.style.color = '#f0883e'; // GitHub orange
      }
      // Color timestamp lines differently
      else if (text.match(/^\[\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z\]/)) {
        line.style.color = '#8b949e'; // GitHub gray for timestamps
      }
    });
  }
});
