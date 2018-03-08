import {inputDriverFactory} from '../../components/Input/Input.protractor.driver';
import {dropdownDriverFactory} from '../Dropdown/Dropdown.protractor.driver';

export const inputWithOptionsDriverFactory = component => {
  const inputDriver = inputDriverFactory(component.$('input'));
  const dropdownDriver = dropdownDriverFactory(component);

  return Object.assign(
    dropdownDriver,
    {
    focusInput: inputDriver.focus,
    enterText: inputDriver.enterText,
    getText: inputDriver.getText,
  });
};
