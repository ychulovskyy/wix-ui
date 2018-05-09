import { DriverFactory } from './../../common/BaseDriver.protractor';
import { InputDriver } from '../../components/Input/Input.protractor.driver';
import { DropdownDriver } from '../Dropdown/Dropdown.protractor.driver';
export interface InputWithOptionsDriver extends InputDriver, DropdownDriver {
}
export declare const inputWithOptionsDriverFactory: DriverFactory<InputWithOptionsDriver>;
