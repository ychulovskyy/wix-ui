import { BaseDriver, DriverFactory } from './../../common/BaseDriver.protractor';
export interface RadioButtonDriver extends BaseDriver {
    select: () => Promise<void>;
    isSelected: () => Promise<boolean>;
}
export declare const radioButtonDriverFactory: DriverFactory<RadioButtonDriver>;
