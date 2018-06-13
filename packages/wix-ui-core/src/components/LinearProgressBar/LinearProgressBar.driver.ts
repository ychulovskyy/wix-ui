import { BaseDriver, ComponentFactory, DriverFactory } from 'wix-ui-test-utils/driver-factory';
import {StylableDOMUtil} from 'stylable/test-utils';
import style from './LinearProgressBar.st.css';

export interface LinearProgressBarDriver extends BaseDriver {
  /** Get the width of the foreground bar (the progress) */
  getWidth: () => string;
  /** Returns boolean that indicates if the success icon exists */
  isSuccessIconDisplayed: () => boolean;
  /** Returns boolean that indicates if the error icon exists */
  isErrorIconDisplayed: () => boolean;
  /** Returns boolean that indicates if the progress percentages text exists */
  isPercentagesProgressDisplayed: () => boolean;
  /** Get the progress percentages value */
  getValue: () => string;
  /** Returms true if has progress completed (value is 100) */
  isCompleted: () => boolean;
  /** Returms true if has error */
  hasError: () => boolean;
}

export const linearProgressBarDriverFactory: DriverFactory<LinearProgressBarDriver> = ({ element }: ComponentFactory) => {
  const stylableDOMUtil = new StylableDOMUtil(style);
  
  const getProgressBarForeGroundStyle = () => window.getComputedStyle(element.querySelector('[data-hook="progressbar-foreground"]'));
  const getProgressBarBackgroundStyle = () => window.getComputedStyle(element.querySelector('[data-hook="progressbar-background"]'));
  const getElement = dataHook => element.querySelector(`[data-hook="${dataHook}"]`)
  const getValue = () => getElement('progress-percentages').querySelector('span').innerHTML;

  const driver = {
    exists: () => !!element,
    getWidth: () => getProgressBarForeGroundStyle().width,
    isSuccessIconDisplayed: () => !!getElement('success-icon'),
    isErrorIconDisplayed: () => !!getElement('error-icon'),
    isPercentagesProgressDisplayed: () => !!getElement('progress-percentages'),
    getValue: () => getValue(),
    isCompleted: () => getValue() === '100',
    hasError: () => stylableDOMUtil.hasStyleState(element, 'error'),
  }

  return driver;
};
