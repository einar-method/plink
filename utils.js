export function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}; // Easy random int between two numbers. 

export function fadeInElements(elementIds) {
    requestAnimationFrame(function () {
        elementIds.forEach(function (elementId) {
        // Check the computed style to ensure the initial styles are applied
        window.getComputedStyle(document.getElementById(elementId)).opacity;
  
        // Set opacity to 1 after the initial styles are applied
        document.getElementById(elementId).style.opacity = 1;
      });
    });
};

export function dialogFade(element, opacity) {
    element.style.opacity = opacity;
    element.style.transition = "none"; // Disable transition temporarily
    requestAnimationFrame(() => {
      element.style.transition = ""; // Re-enable transition
    });
};

export function callTip(txt) {
    document.getElementById("tip-txt").innerHTML = txt;
    document.getElementById("tip").open = true;
    fadeInElements(["tip"])
    setTimeout(() => {
        document.getElementById("tip").open = false;
        dialogFade(document.getElementById("tip"), 0)
    }, 3500);
};

export function convertHtmlToArray(htmlString) {
    // Split the HTML string by new lines and trim each line
    return htmlString
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0);  // Remove empty lines
};

export function truncateToWords(str) {
    const secondEntry = str[1];
  
    // Create a temporary DOM element to use the browser's HTML parser to strip tags
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = secondEntry;
  
    // Extract the text content from the temporary element
    const extractedText = tempDiv.textContent || tempDiv.innerText || '';
  
    const words = extractedText.split(' ');
    if (words.length > 20) {
      return words.slice(0, 20).join(' ') + '...';
    }
    return extractedText;
};