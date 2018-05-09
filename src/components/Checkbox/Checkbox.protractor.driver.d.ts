import { BaseDriver, DriverFactory } from './../../common/BaseDriver.protractor';
export interface CheckboxDriver extends BaseDriver {
    click: () => Promise<void>;
    isDisabled: () => Promise<boolean>;
    isChecked: () => Promise<boolean>;
}
export declare const checkboxDriverFactory: DriverFactory<CheckboxDriver>;
