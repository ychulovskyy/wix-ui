import { BaseDriver, DriverFactory } from './../../common/BaseDriver.protractor';
export interface InputDriver extends BaseDriver {
    enterText: (text: string) => Promise<void>;
    focus: () => Promise<void>;
    getText: () => Promise<string>;
}
export declare const inputDriverFactory: DriverFactory<InputDriver>;
