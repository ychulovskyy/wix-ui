import { BaseDriver, DriverFactory } from './../../common/BaseDriver.protractor';
import { HBoxDriver } from './HBox.protractor.driver';
export interface HBoxDriver extends BaseDriver {
}
export declare const hBoxDriverFactory: DriverFactory<HBoxDriver>;
