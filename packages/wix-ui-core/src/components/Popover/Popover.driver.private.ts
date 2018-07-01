import { Simulate } from 'react-dom/test-utils';
const queryDocumentOrElement = (element, query) => ((element && element.querySelectorAll(query)[0]) || document && document.querySelector(query));
const getTargetElement = (element: Element | undefined) => element && element.querySelectorAll('[data-hook="popover-element"]')[0];
const getContentElement = (element: Element | undefined) => queryDocumentOrElement(element, '[data-hook="popover-content"]');
const getArrowElement = (element: Element | undefined) => queryDocumentOrElement(element, '[data-hook="popover-arrow"]');
const getPortalElement = (element: Element | undefined) => queryDocumentOrElement(element, '[data-hook="popover-portal"]');

export class PopoverDriverPrivate {
  readonly element:HTMLElement;
  readonly eventTrigger: typeof Simulate;

  constructor({element, eventTrigger}) {
    this.element = element;
    this.eventTrigger = eventTrigger || Simulate;
  }

  getTargetElement = () =>  getTargetElement(this.element);
  getContentElement = () =>  getContentElement(this.element);
  isTargetElementExists = () =>  !!getTargetElement(this.element);
  isContentElementExists = () =>  !!getContentElement(this.element);
  mouseEnter = () =>  this.eventTrigger.mouseEnter(this.element);
  mouseLeave = () =>  this.eventTrigger.mouseLeave(this.element);
  inlineStyles = () =>  this.element.style;
  getArrowOffset = () => {
    const {top, left, right, bottom} = (getArrowElement(this.element) as HTMLElement).style;
    return {top, left, right, bottom};
  }
  getPortalElement = () =>  getPortalElement(this.element);

};
