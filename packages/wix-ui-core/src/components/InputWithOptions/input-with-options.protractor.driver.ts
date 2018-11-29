import {BaseDriver, DriverFactory} from '../../common/BaseDriver.protractor';
import {inputDriverFactory, InputDriver} from '../Input/input.protractor.driver';
import {dropdownDriverFactory, DropdownDriver} from '../Dropdown/dropdown.protractor.driver';

export interface InputWithOptionsDriver extends InputDriver, DropdownDriver {
}

export const inputWithOptionsDriverFactory: DriverFactory<InputWithOptionsDriver> = component => {
  const dropdownDriver = dropdownDriverFactory(component);
  const inputDriver = inputDriverFactory(dropdownDriver.getTargetElement().$('[data-hook=input]'));

  return Object.assign(
    {},
    dropdownDriver,
    inputDriver);
};
