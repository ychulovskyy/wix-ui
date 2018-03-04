import * as React from 'react';
import createStory from '../create-story';
import {InputWithOptions} from '../../src/baseComponents/InputWithOptions';
import * as InputWithOptionsSource from '!raw-loader!../../src/baseComponents/InputWithOptions/InputWithOptions.tsx';
import {OptionFactory} from '../../src/baseComponents/DropdownOption';
import {optionsExample} from '../../src/baseComponents/DropdownOption/OptionsExample';

export const story = () => createStory({
  category: 'Base Components',
  name: 'InputWithOptions',
  storyName: 'InputWithOptions',
  component: InputWithOptions,
  source: InputWithOptionsSource,
  componentProps: {
    'data-hook': 'storybook-inputwithoptions',
    options: optionsExample,
    inputProps: {}
  },
  exampleProps: {
    fixedFooter: [null, <div>Fixed Footer</div>],
    fixedHeader: [null, <div>Fixed Header</div>],
    initialSelectedIds: [[], [1]]
  }
});
