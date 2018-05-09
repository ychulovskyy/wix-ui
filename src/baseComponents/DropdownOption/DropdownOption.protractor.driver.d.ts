import { BaseDriver, DriverFactory } from './../../common/BaseDriver.protractor';
export interface DropdownOptionDriver extends BaseDriver {
    click: () => Promise<void>;
    getText: () => Promise<string>;
}
export declare const dropdownOptionDriverFactory: DriverFactory<DropdownOptionDriver>;
