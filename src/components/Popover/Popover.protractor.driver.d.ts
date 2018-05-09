import { BaseDriver, DriverFactory } from '../../common/BaseDriver.protractor';
import { ElementFinder } from 'protractor';
export interface PopoverDriver extends BaseDriver {
    getTargetElement: () => ElementFinder;
    getContentElement: () => ElementFinder;
    isTargetElementExists: () => Promise<boolean>;
    isContentElementExists: () => Promise<boolean>;
    mouseEnter: () => Promise<void>;
    mouseLeave: () => Promise<void>;
    click: () => Promise<void>;
}
export declare const popoverDriverFactory: DriverFactory<PopoverDriver>;
