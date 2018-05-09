import { BaseDriver, DriverFactory } from './../../common/BaseDriver.protractor';
export interface ToggleSwitchDriver extends BaseDriver {
    click: () => Promise<void>;
    isDisabled: () => Promise<boolean>;
    checked: () => Promise<boolean>;
}
export declare const toggleSwitchDriverFactory: DriverFactory<ToggleSwitchDriver>;
