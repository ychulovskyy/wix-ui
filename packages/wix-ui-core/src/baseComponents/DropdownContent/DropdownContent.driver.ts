import {isAttributeExists} from 'wix-ui-test-utils/vanilla';
import {DropdownContent} from './';

const getOptions = (element: Element) => element.querySelectorAll('[data-hook="option"]');
const getOptionAt = (element: Element, index: number) => getOptions(element)[index];

export const dropdownContentDriverFactory = ({element, eventTrigger}) => ({
  exists: () => !!element,
  getOptionsCount: () => getOptions(element).length,
  optionAt: (index: number) => {
    const option = element ? getOptionAt(element, index) : null;
    return {
      click: () => option && eventTrigger.click(option),
      isHovered: () => option && isAttributeExists(option, attribute => attribute.name.includes('hover') && attribute.value === 'true')
    };
  }
});
