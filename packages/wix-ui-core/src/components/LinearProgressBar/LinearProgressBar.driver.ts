import { BaseDriver, ComponentFactory, DriverFactory } from 'wix-ui-test-utils/driver-factory';

export interface LinearProgressBarDriver extends BaseDriver {
  /** Get the width of the foreground bar (the progress) */
  getWidth: () => string;
  /** Get the color of the background bar */
  getBackgroundColor: () => string;
  /** Get the color of the foreground bar */
  getForegroundColor: () => string;
  /** Returns boolean that indicates if the success icon exists */
  isSuccessIconDisplayed: () => boolean;
  /** Returns boolean that indicates if the error icon exists */
  isErrorIconDisplayed: () => boolean;
  /** Returns boolean that indicates if the progress percentages text exists */
  isPercentagesProgressDisplayed: () => boolean;
  /** Get the progress percentages text */
  getPercentagesProgressText: () => string;
}

export const linearProgressBarDriverFactory: DriverFactory<LinearProgressBarDriver> = ({ element }: ComponentFactory) => {
  const getProgressBarForeGroundStyle = () => window.getComputedStyle(element.querySelector('[data-hook="progressbar-foreground"]'));
  const getProgressBarBackgroundStyle = () => window.getComputedStyle(element.querySelector('[data-hook="progressbar-background"]'));
  const getElement = dataHook => element.querySelector(`[data-hook="${dataHook}"]`)

  const driver = {
    exists: () => !!element,
    getWidth: () => getProgressBarForeGroundStyle().width,
    getBackgroundColor: () => getProgressBarBackgroundStyle().background,
    getForegroundColor: () => getProgressBarForeGroundStyle().background,
    isSuccessIconDisplayed: () => !!getElement('success-icon'),
    isErrorIconDisplayed: () => !!getElement('error-icon'),
    isPercentagesProgressDisplayed: () => !!getElement('progress-percentages'),
    getPercentagesProgressText: () => getElement('progress-percentages').querySelector('span').innerHTML,
  }

  return driver;
};
