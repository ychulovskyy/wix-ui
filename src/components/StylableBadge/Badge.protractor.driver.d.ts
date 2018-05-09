import { BaseDriver, DriverFactory } from './../../common/BaseDriver.protractor';
export interface BadgeDriver extends BaseDriver {
    text: () => Promise<string>;
}
export declare const badgeDriverFactory: DriverFactory<BadgeDriver>;
