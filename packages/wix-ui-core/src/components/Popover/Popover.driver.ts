import {PopoverDriverPrivate} from './Popover.driver.private';
import {BaseDriver, DriverArgs} from '../../common/BaseDriver';

const PRIVATE_DRIVER = Symbol('private driver');

export class PopoverDriver extends BaseDriver {

  private readonly [PRIVATE_DRIVER]: PopoverDriverPrivate;

  constructor(driverArgs: DriverArgs) {
    super(driverArgs);
    this[PRIVATE_DRIVER] = new PopoverDriverPrivate(driverArgs);
  }

  get p() {
    return this[PRIVATE_DRIVER];
  }

  getTargetElement = () => this.p.getTargetElement();
  getContentElement = () => this.p.getContentElement();
  isTargetElementExists = () => this.p.isTargetElementExists();
  isContentElementExists = () => this.p.isContentElementExists();
  inlineStyles = () => this.element.style;
}

export const popoverDriverFactory = (driverArgs: DriverArgs) => {
  return {
    ...new PopoverDriver(driverArgs)
  };
};
