const queryDocumentOrElement = (element, query) => ((element && element.querySelectorAll(query)[0]) || document && document.querySelector(query));

const getArrowElement = (element: Element | undefined) => queryDocumentOrElement(element, '[data-hook="popover-arrow"]');
const getPortalElement = (element: Element | undefined) => queryDocumentOrElement(element, '[data-hook="popover-portal"]');

export const popoverPrivateDriverFactory = ({element, eventTrigger}) => ({
  getArrowOffset: () => {
    const {top, left, right, bottom} = (getArrowElement(element) as HTMLElement).style;
    return {top, left, right, bottom};
  },
  getPortalElement: () => getPortalElement(element),
});
