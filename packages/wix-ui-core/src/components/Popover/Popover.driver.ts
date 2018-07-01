import {PopoverDriverPrivate} from './Popover.driver.private';
import {BaseDriver, DriverArgs} from '../../common/BaseDriver';
 
export class PopoverDriver extends BaseDriver {
  private readonly p: PopoverDriverPrivate;

  constructor(driverArgs: DriverArgs) {
    super(driverArgs);
    this.p = new PopoverDriverPrivate(driverArgs);
  }

  getTargetElement = () => this.p.getTargetElement();
  getContentElement = () => this.p.getContentElement();
  isTargetElementExists = () => this.p.isTargetElementExists();
  isContentElementExists = () => this.p.isContentElementExists();   
  inlineStyles = () => this.element.style
}

export const popoverDriverFactory = (driverArgs: DriverArgs) => {
  return {
    ...new PopoverDriver(driverArgs)
  };
};
