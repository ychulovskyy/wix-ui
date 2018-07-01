import { Simulate } from 'react-dom/test-utils';

export interface DriverArgs {
  element: HTMLElement;
  eventTrigger?: typeof Simulate;
}

export class BaseDriver {
  readonly element : HTMLElement;
  readonly eventTrigger: typeof Simulate;

  constructor({element, eventTrigger}: DriverArgs) {
    this.element = element;
    this.eventTrigger = eventTrigger || Simulate;
  }

  exists = () => !!this.element;
  mouseEnter = () =>  this.eventTrigger.mouseEnter(this.element);
  mouseLeave = () =>  this.eventTrigger.mouseLeave(this.element);
  click = () => this.eventTrigger.click(this.element);
}
