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
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }
};
