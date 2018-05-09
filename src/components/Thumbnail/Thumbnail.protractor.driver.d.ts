import { BaseDriver, DriverFactory } from './../../common/BaseDriver.protractor';
export interface ThumbnailDriver extends BaseDriver {
    click: () => Promise<void>;
    mouseEnter: () => Promise<void>;
}
export declare const thumbnailDriverFactory: DriverFactory<ThumbnailDriver>;
