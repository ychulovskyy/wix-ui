import { DriverFactory, BaseDriver } from '../../common/BaseDriver.protractor';
export interface ButtonDriver extends BaseDriver {
    /** returns true if the root element is present */
    exists: () => Promise<boolean>;
    /** returns the Button's text content */
    getButtonTextContent: () => Promise<string>;
    /** click the button */
    click: () => Promise<void>;
    /** checks wether the button is disabled */
    isButtonDisabled: () => Promise<boolean>;
}
export declare const buttonDriverFactory: DriverFactory<ButtonDriver>;
