import { BaseDriver, DriverFactory } from './../../common/BaseDriver.protractor';
import { DropdownOptionDriver } from '../DropdownOption/DropdownOption.protractor.driver';
export interface DropdownContentDriver extends BaseDriver {
    getOptionsCount: () => Promise<number>;
    optionAt: (index: number) => DropdownOptionDriver;
}
export declare const dropdownContentDriverFactory: DriverFactory<DropdownContentDriver>;
