import {inputDriverFactory} from '../../components/Input/Input.protractor.driver';
import {dropdownDriverFactory} from '../Dropdown/Dropdown.protractor.driver';

export const inputWithOptionsDriverFactory = component => {
  const inputDriver = inputDriverFactory(component.$('input'));
  const getDropdownDriver = () => dropdownDriverFactory(component);

  return {
    element: () => component,
    focusInput: inputDriver.focus,
    enterText: inputDriver.enterText,
    getText: inputDriver.getText,
    isOpen: () => getDropdownDriver().isOpen(),
    getOptionsCount: () => getDropdownDriver().getOptionsCount(),
    selectOption: (index: number) => getDropdownDriver().selectOption(index)
  };
};
