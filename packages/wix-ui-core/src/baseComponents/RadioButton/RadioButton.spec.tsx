import * as React from 'react';
import {radioButtonDriverFactory} from './RadioButton.driver';
import {createDriverFactory} from 'wix-ui-test-utils/driver-factory';
import {RadioButton} from './';

describe('RadioButton', () => {
  const createDriver = createDriverFactory(radioButtonDriverFactory);
});
