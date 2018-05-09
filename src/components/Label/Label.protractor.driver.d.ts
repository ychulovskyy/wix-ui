import { BaseDriver, DriverFactory } from './../../common/BaseDriver.protractor';
export interface LabelDriver extends BaseDriver {
    getLabelText: () => Promise<string>;
    click: () => Promise<void>;
}
export declare const labelDriverFactory: DriverFactory<LabelDriver>;
