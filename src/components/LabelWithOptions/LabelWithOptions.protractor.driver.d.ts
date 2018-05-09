import { LabelDriver } from '../../components/Label/Label.protractor.driver';
import { DropdownDriver } from '../../baseComponents/Dropdown/Dropdown.protractor.driver';
import { DriverFactory } from './../../common/BaseDriver.protractor';
export interface LabelWithOptionsDriver extends LabelDriver, DropdownDriver {
}
export declare const labelWithOptionsDriverFactory: DriverFactory<LabelWithOptionsDriver>;
