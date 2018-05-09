import { ILocation } from 'wix-ui-test-utils/protractor';
import { DriverFactory } from '../../common/BaseDriver.protractor';
import { PopoverDriver } from '../Popover/Popover.protractor.driver';
export interface TooltipDriver extends PopoverDriver {
    getTooltipLocation: () => Promise<ILocation>;
}
export declare const tooltipDriverFactory: DriverFactory<TooltipDriver>;
