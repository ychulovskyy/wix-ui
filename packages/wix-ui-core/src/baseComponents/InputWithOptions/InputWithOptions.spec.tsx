import * as React from 'react';
import {createDriverFactory} from 'wix-ui-test-utils/driver-factory';
import {inputWithOptionsDriverFactory} from './InputWithOptions.driver';
import {InputWithOptions} from './';
import {OptionFactory} from '../../baseComponents/DropdownOption';
import {generateOptions} from '../DropdownOption/OptionsExample';

describe('InputWithOptions', () => {
  const createDriver = createDriverFactory(inputWithOptionsDriverFactory);
  const options = generateOptions();
  const createInputWithOptions = (props = {}) => (
    <InputWithOptions {...Object.assign({
      options: [],
      inputProps: {}
    }, props)}/>
  );

  it('should render default component', () => {
    const driver = createDriver(createInputWithOptions({options}));
    expect(driver.isTargetElementExists()).toBeTruthy();
    expect(driver.isContentElementExists()).toBeFalsy();
  });

  it('should trigger onManualInput', () => {
    const onManualInput = jest.fn();

    const driver = createDriver(createInputWithOptions({options, onManualInput}));
    driver.keyDown('a');
    driver.keyDown('Enter');

    expect(onManualInput).toHaveBeenCalled();
  });

  it('should trigger onManualInput with the actual value', () => {
    const onManualInput = jest.fn();
    let inputValue = 'a';

    const driver = createDriver(createInputWithOptions({
      options,
      onManualInput,
      inputProps: {
        value: inputValue
      }
    }));

    driver.keyDown('Enter');
    expect(onManualInput).toHaveBeenCalledWith('a');
  });

  it('should trigger onManualInput with the actual value even if option list is empty', () => {
    const onManualInput = jest.fn();
    let inputValue = 'a';

    const driver = createDriver(createInputWithOptions({
      options: [],
      onManualInput,
      inputProps: {
        value: inputValue
      }
    }));

    driver.keyDown('Enter');
    expect(onManualInput).toHaveBeenCalledWith('a');
  });
});
