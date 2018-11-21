import {dropdownContentDriverFactory} from '../DropdownContent/dropdown-content.driver';
import {popoverDriverFactory} from '../Popover/popover.driver';
import {StylableDOMUtil} from '@stylable/dom-test-kit';
import style from './Dropdown.st.css';

const stylableUtil = new StylableDOMUtil(style);

export const dropdownDriverFactory = args => {
  const dropdownContentDriver =  dropdownContentDriverFactory(args);
  const popoverDriver = popoverDriverFactory(args);

  return Object.assign({
    hasStyleState: state => stylableUtil.hasStyleState(args.element, state),
  }, dropdownContentDriver, popoverDriver);
};
