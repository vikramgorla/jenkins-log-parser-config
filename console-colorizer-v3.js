document.addEventListener('DOMContentLoaded', function() {
  // Apply GitHub Actions style to console
  const consoleArea = document.querySelector('.console-output');
  if (consoleArea) {
    // Apply base styling
    consoleArea.style.backgroundColor = '#0d1117';
    consoleArea.style.color = '#e6edf3';
    consoleArea.style.padding = '10px';
    consoleArea.style.fontFamily = 'SFMono-Regular, Consolas, Liberation Mono, Menlo, monospace';
    consoleArea.style.borderRadius = '6px';
    consoleArea.style.border = '1px solid #30363d';
    consoleArea.style.lineHeight = '1.5';
    
    // Set up observer for dynamic content
    const observer = new MutationObserver(function() {
      colorizeConsole();
    });
    
    observer.observe(consoleArea, { 
      childList: true, 
      subtree: true 
    });
    
    // Run initial colorization
    colorizeConsole();
  }
  
  function colorizeConsole() {
    const consoleLines = document.querySelectorAll('.console-output span, .console-output pre');
    
    consoleLines.forEach(line => {
      const text = line.textContent || '';
      
      // Reset styles to prevent accumulation
      line.style.backgroundColor = 'transparent';
      
      // Apply styles based on log level - important to override any CSS
      if (text.match(/^\s*(INFO:|INFO\s|^\[.*?\]\s*INFO:)/i)) {
        line.style.color = '#3fb950'; // GitHub green
      } 
      else if (text.match(/^\s*(ERROR:|ERROR\s|^\[.*?\]\s*ERROR:)/i)) {
        line.style.color = '#f85149'; // GitHub red
        line.style.fontWeight = 'bold';
      }
      else if (text.match(/^\s*(WARN:|WARNING:|WARN\s|WARNING\s|^\[.*?\]\s*WARN:)/i)) {
        line.style.color = '#f0883e'; // GitHub orange
      }
      // Style timestamps
      else if (text.match(/^\[\d{4}-\d{2}-\d{2}/)) {
        line.style.color = '#8b949e'; // GitHub timestamps gray
      }
    });
  }
});
