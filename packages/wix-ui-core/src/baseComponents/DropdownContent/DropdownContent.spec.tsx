import * as React from 'react';
import {dropdownContentDriverFactory} from './DropdownContent.driver';
import {createDriverFactory} from 'wix-ui-test-utils/driver-factory';
import {sleep} from 'wix-ui-test-utils/react-helpers';
import {OptionFactory} from '../DropdownOption';
import {DropdownContent} from './';
import {optionsExample} from '../DropdownOption/OptionsExample';

describe('DropdownContent', () => {
  const createDriver = createDriverFactory(dropdownContentDriverFactory);
  const createDropdownContent = (props = {}) => (
    <DropdownContent {...Object.assign({
      options: [],
      onOptionClick: () => null,
      selectedIds: []
    }, props)}/>
  );

  it('should render default dropdown content', () => {
    const driver = createDriver(createDropdownContent());
    expect(driver.exists()).toBeTruthy();
  });

  describe('mouse events', () => {
    it('should select selectable options', () => {
      const onOptionClick = jest.fn();
      const driver = createDriver(createDropdownContent({options: optionsExample, onOptionClick}));

      driver.optionAt(0).click();
      expect(onOptionClick).toHaveBeenCalledWith(optionsExample[0]);

      driver.optionAt(1).click();
      expect(onOptionClick).toHaveBeenCalledWith(optionsExample[1]);

      driver.optionAt(4).click();
      expect(onOptionClick).toHaveBeenCalledWith(optionsExample[4]);
    });

    it('should not select non selectable options', () => {
      const onOptionClick = jest.fn();
      const driver = createDriver(createDropdownContent({options: optionsExample, onOptionClick}));

      driver.optionAt(2).click();
      expect(onOptionClick).not.toHaveBeenCalled();

      driver.optionAt(5).click();
      expect(onOptionClick).not.toHaveBeenCalled();
    });
  });
});
