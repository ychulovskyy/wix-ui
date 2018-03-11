import {dropdownOptionDriverFactory} from '../DropdownOption/DropdownOption.driver';

const getOptions = (element: Element) => element.querySelectorAll('[data-hook="option"]');
export const dropdownContentDriverFactory = ({element, eventTrigger}) => ({
  exists: () => !!element,
  getOptionsCount: () => getOptions(element).length,
  optionAt: (index: number) => {
    const option = element ? getOptions(element)[index] : null;
    return dropdownOptionDriverFactory({element: option, eventTrigger});
  }
});
