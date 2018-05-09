import { BaseDriver, DriverFactory } from './../../common/BaseDriver.protractor';
export interface LinkDriver extends BaseDriver {
    click: () => Promise<void>;
    exists: () => Promise<boolean>;
}
export declare const linkDriverFactory: DriverFactory<LinkDriver>;
