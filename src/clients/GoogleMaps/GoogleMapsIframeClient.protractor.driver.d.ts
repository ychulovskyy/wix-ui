import { BaseDriver, DriverFactory } from './../../common/BaseDriver.protractor';
import { ElementFinder } from 'protractor';
export interface GoogleMapsIframeClientDriver extends BaseDriver {
    getParsedResults: () => Promise<any>;
    getResultsElementWrapper: () => ElementFinder;
    enterText: (text: string) => Promise<void>;
    selectByValue: (value: string) => Promise<void>;
}
export declare const googleMapsIframeClientDriverFactory: DriverFactory<GoogleMapsIframeClientDriver>;
