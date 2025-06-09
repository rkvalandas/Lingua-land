/**
 * Smoothly scrolls to an element with the specified ID
 * @param elementId - The ID of the element to scroll to
 * @param offset - Optional vertical offset in pixels (default: 0)
 */
export const scrollToElement = (
  elementId: string,
  offset: number = 0
): void => {
  const element = document.getElementById(elementId);
  
  if (element) {
    console.log(`Found element with ID "${elementId}"`);
    
    // Get the element's position relative to the document
    const elementRect = element.getBoundingClientRect();
    const elementTop = elementRect.top + window.pageYOffset;
    const targetPosition = elementTop - offset;
    
    console.log(`Current scroll position: ${window.pageYOffset}`);
    console.log(`Element position: ${elementTop}`);
    console.log(`Target position: ${targetPosition}`);
    
    // Try using scrollIntoView first as it's more reliable
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest"
    });
    
    // Adjust for offset if needed
    if (offset > 0) {
      setTimeout(() => {
        const currentPosition = window.pageYOffset;
        window.scrollTo({
          top: currentPosition - offset,
          behavior: "smooth"
        });
      }, 100);
    }
    
  } else {
    console.error(`Element with ID "${elementId}" not found`);
  }
};
