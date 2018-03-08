import {dropdownContentDriverFactory} from '../DropdownContent/DropdownContent.protractor.driver';
import {ElementFinder} from 'protractor';

export const dropdownDriverFactory = component => {
  const getDropdownContentDriver = () => dropdownContentDriverFactory(component.$('[data-hook="popover-content"]'));

  return {
    element: () => component,
    isOpen: () => getDropdownContentDriver().element().isPresent(),
    getOptionsCount: () => getDropdownContentDriver().getOptionsCount(),
    selectOption: (index: number) => getDropdownContentDriver().selectOption(index),
    getOptionText: (index: number) => getDropdownContentDriver().getOptionText(index)
  };
};
