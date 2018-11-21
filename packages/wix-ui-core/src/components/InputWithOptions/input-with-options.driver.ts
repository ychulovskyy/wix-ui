import {dropdownDriverFactory} from '../Dropdown/dropdown.driver';
import {inputDriverFactory} from '../Input/input.driver';

export const inputWithOptionsDriverFactory = ({element, eventTrigger}) => {
  const inputDriver = inputDriverFactory({
    element: element.querySelector('[data-hook=input]'),
    eventTrigger
  });

  const dropdownDriver = dropdownDriverFactory({element, eventTrigger});

  return Object.assign({}, inputDriver, dropdownDriver);
};
