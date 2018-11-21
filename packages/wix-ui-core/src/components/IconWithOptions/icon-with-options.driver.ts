import {dropdownDriverFactory} from '../Dropdown/dropdown.driver';

export const iconWithOptionsDriverFactory = args => {
  const dropdownDriver = dropdownDriverFactory(args);

  return Object.assign(dropdownDriver, {});
};
