document.addEventListener('DOMContentLoaded', function() {
  // Apply GitHub Actions style to console
  const consoleArea = document.querySelector('.console-output');
  if (consoleArea) {
    // Set background color and base styles
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
    const consoleLines = document.querySelectorAll('.console-output span');
    
    consoleLines.forEach(line => {
      const fullText = line.textContent || '';
      
      // Extract content after timestamp if present
      const timestampMatch = fullText.match(/^\[[\d\-T:.Z]+\]\s*(.*)/);
      const content = timestampMatch ? timestampMatch[1] : fullText;
      
      // Default text color for timestamp format lines
      line.style.color = '#e6edf3'; // GitHub default text
      
      // Check various patterns in the content after timestamp
      if (content.match(/\bINFO\b/i) || content.match(/^INFO:/i)) {
        line.style.color = '#3fb950'; // GitHub green
      } 
      else if (content.match(/\bERROR\b/i) || content.match(/^ERROR:/i)) {
        line.style.color = '#f85149'; // GitHub red
        line.style.fontWeight = 'bold';
      }
      else if (content.match(/\bWARN(ING)?\b/i) || content.match(/^WARN(ING)?:/i)) {
        line.style.color = '#f0883e'; // GitHub orange
      }
      // Shell commands (lines starting with +)
      else if (content.trim().startsWith('+')) {
        line.style.color = '#58a6ff'; // GitHub blue for commands
      }
      // Success messages
      else if (content.match(/success|successfully/i)) {
        line.style.color = '#3fb950'; // GitHub green
      }
      // Notice messages
      else if (content.match(/notice|warning/i)) {
        line.style.color = '#f0883e'; // GitHub orange
      }
      // Progress bars and download indicators
      else if (content.includes('━━━')) {
        line.style.color = '#58a6ff'; // GitHub blue
      }
    });
  }
});
