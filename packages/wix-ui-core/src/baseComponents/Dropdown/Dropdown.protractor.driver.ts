import {dropdownContentDriverFactory} from '../DropdownContent/DropdownContent.protractor.driver';

export const dropdownDriverFactory = component => {
  const getDropdownContentDriver = () => dropdownContentDriverFactory(component.$('[data-hook="popover-content"] > div'));

  return {
    element: () => component,
    isOpen: () => !!getDropdownContentDriver().element,
    getOptionsCount: () => getDropdownContentDriver().getOptionsCount(),
    selectOption: (index: number) => getDropdownContentDriver().selectOption(index),
    getOptionText: (index: number) => getDropdownContentDriver().getOptionText(index)
  };
};
