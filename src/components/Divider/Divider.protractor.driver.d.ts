import { BaseDriver, DriverFactory } from './../../common/BaseDriver.protractor';
export interface DividerDriver extends BaseDriver {
    exists: () => Promise<boolean>;
}
export declare const dividerDriverFactory: DriverFactory<DividerDriver>;
