import * as React from 'react';
import createStory from '../create-story';
import {InputWithOptions} from '../../src/baseComponents/InputWithOptions';
import * as InputWithOptionsSource from '!raw-loader!../../src/baseComponents/InputWithOptions/InputWithOptions.tsx';
import {OptionFactory} from '../../src/baseComponents/DropdownOption';

const options =
  Array.from(Array(20))
    .map((x, index) => OptionFactory.create(index, false, true, `value${index}`));

options[2] = OptionFactory.create(2, true, true, `Disabled item`);
options[5] = OptionFactory.createDivider();
options[8].value = 'This is a very very very very very long option';
options[12] = OptionFactory.createDivider({value: 'Divider'});

export const story = () => createStory({
  category: 'Base Components',
  name: 'InputWithOptions',
  storyName: 'InputWithOptions',
  component: InputWithOptions,
  source: InputWithOptionsSource,
  componentProps: {
    'data-hook': 'storybook-inputwithoptions',
    options,
    inputProps: {}
  },
  exampleProps: {
    fixedFooter: [null, <div>Fixed Footer</div>],
    fixedHeader: [null, <div>Fixed Header</div>],
    initialSelectedIds: [[], [1]]
  }
});
