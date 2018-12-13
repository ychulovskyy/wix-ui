import {BaseDriver, DriverFactory} from '../../common/BaseDriver.protractor';
import {$, browser, ElementFinder} from 'protractor';
import {mouseEnter, mouseLeave} from 'wix-ui-test-utils/protractor';

export interface PopoverDriver extends BaseDriver {
  /** Returns the target element (`<Popover.Element/>`) */
  getTargetElement: () => ElementFinder;

  /** Returns the content element (`<Popover.Content/>`) */
  getContentElement: () => ElementFinder;

  /** Returns `true` whether the target element (`<Popover.Element/>`) exists */
  isTargetElementExists: () => Promise<boolean>;

  /** Returns `true` whether the target element (`<Popover.Element/>`) exists */
  isContentElementExists: () => Promise<boolean>;

  /** Trigger `mouseEnter` on the element */
  mouseEnter: () => Promise<void>;

  /** Trigger `mouseLeave` on the element */
  mouseLeave: () => Promise<void>;

  /** Click on the element */
  click: () => Promise<void>;
}

export const popoverDriverFactory: DriverFactory<PopoverDriver> = component => {
  const getTargetElement = () => $('[data-hook="popover-element"]');
  const getContentElement = () => $('[data-hook="popover-content"]');

  return {
    element: () => component,
    getTargetElement: () => getTargetElement(),
    getContentElement: () => getContentElement(),
    isTargetElementExists: async () => getTargetElement().isPresent(),
    isContentElementExists: async () => getContentElement().isPresent(),
    mouseEnter: () => mouseEnter(component),
    mouseLeave,
    click: async () => component.click()
  };
};
