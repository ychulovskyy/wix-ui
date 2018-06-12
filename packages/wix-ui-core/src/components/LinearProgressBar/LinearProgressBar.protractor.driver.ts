import {BaseDriver, DriverFactory} from './../../common/BaseDriver.protractor';
import { promise } from 'protractor';

export interface LinearProgressBarDriver extends BaseDriver {
  /** returns true if the root element is present */
  exists: () => promise.Promise<boolean>;
}

export const linearProgressBarDriverFactory: DriverFactory<LinearProgressBarDriver> = element => {
  
  const progressBar = element.$('[data-hook="progressbar-foreground"]');

  return {
    element: () => element,
    exists: () => element.isPresent()
  };
};
