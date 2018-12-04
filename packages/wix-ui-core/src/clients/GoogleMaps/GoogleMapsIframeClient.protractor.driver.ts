import {BaseDriver, DriverFactory} from './../../common/BaseDriver.protractor';
import {ElementFinder} from 'protractor';

export interface GoogleMapsIframeClientDriver extends BaseDriver {
  getParsedResults: () => Promise<any>;
  getParsedError: () => Promise<{status: string, originalStatus: string, requestId: string}>;
  getResultsElementWrapper: () => ElementFinder;
  enterText: (text: string) => Promise<void>;
  selectByValue: (value: string) => Promise<void>;
  isResponseSuccess: () => Promise<boolean>;
}

export const googleMapsIframeClientDriverFactory: DriverFactory<GoogleMapsIframeClientDriver> = (component): GoogleMapsIframeClientDriver => {
  const getButtons = () => component.$$('button');
  const input = component.$('input');
  const resultsElementWrapper = component.$('pre');

  return {
    getParsedResults: async () => {
      const results = await resultsElementWrapper.getText();
      return JSON.parse(results);
    },
    getParsedError: async () => {
      const results = await resultsElementWrapper.getText();
      return JSON.parse(results);
    },
    isResponseSuccess: async ()=> {
      const status = await resultsElementWrapper.getAttribute('data-hook');
      return status === 'success';
    },
    getResultsElementWrapper: () => resultsElementWrapper,
    enterText: async (text: string) => {
      await input.clear();
      await input.sendKeys(text);
    },
    selectByValue: async (value: string) => {
      return await getButtons().getText()
        .then((names: string) => {
          const btnIdx = names.indexOf(value);
          getButtons().get(btnIdx).click();
        });
    },
    element: () => component
  };
};
