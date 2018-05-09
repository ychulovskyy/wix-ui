import { DriverFactory } from '../../common/BaseDriver.protractor';
import { PopoverDriver } from '../../components/Popover/Popover.protractor.driver';
import { DropdownContentDriver } from '../DropdownContent/DropdownContent.protractor.driver';
export interface DropdownDriver extends PopoverDriver {
    dropdownContent: () => DropdownContentDriver;
}
export declare const dropdownDriverFactory: DriverFactory<DropdownDriver>;
