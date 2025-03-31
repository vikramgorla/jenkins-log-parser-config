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
      const text = line.textContent;
      if (text.includes('ERROR')) {
        line.style.color = '#FF0000';
        line.style.fontWeight = 'bold';
      } else if (text.includes('WARN')) {
        line.style.color = '#FFA500';
      } else if (text.includes('INFO')) {
        line.style.color = '#008000';
      }
    });
  }
});
