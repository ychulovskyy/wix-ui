import * as React from 'react';
import {radioButtonDriverFactory} from './RadioButton.driver';
import {createDriverFactory} from 'wix-ui-test-utils/driver-factory';
import {RadioButton} from './';

function createRadio(props = {}) {
  return <RadioButton content="Horsie" icon="🦄" {...props}/>
}

describe('RadioButton', () => {
  const createDriver = createDriverFactory(radioButtonDriverFactory);

  it('renders to the screen', () => {
    const radio = createDriver(createRadio());

    expect(radio.exists).toBeTruthy();
  });

  it('invokes callback for onChange', () => {
    const onChange = jest.fn();
    const radio = createDriver(createRadio({onChange}));

    radio.select();

    expect(onChange).toHaveBeenCalled();
  });
});
