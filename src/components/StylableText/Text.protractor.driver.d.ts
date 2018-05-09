import { BaseDriver, DriverFactory } from './../../common/BaseDriver.protractor';
export interface TextDriver extends BaseDriver {
    getText: () => Promise<string>;
}
export declare const textDriverFactory: DriverFactory<TextDriver>;
