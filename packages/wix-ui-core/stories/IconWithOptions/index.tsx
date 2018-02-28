import * as React from 'react';
import createStory from '../create-story';
import {IconWithOptions} from '../../src/components/IconWithOptions';
import * as IconWithOptionsSource from '!raw-loader!../../src/components/IconWithOptions/IconWithOptions.tsx';
import {OptionFactory} from '../../src/baseComponents/DropdownOption';

const options =
  Array.from(Array(20))
    .map((x, index) => OptionFactory.create(index, false, true, `value${index}`));

options[2] = OptionFactory.create(2, true, true, `Disabled item`);
options[5] = OptionFactory.createDivider();
options[8].value = 'This is a very very very very very long option';
options[12] = OptionFactory.createDivider({value: 'Divider'});

export const story = () => createStory({
  category: 'Components',
  name: 'IconWithOptions',
  storyName: 'IconWithOptions',
  component: IconWithOptions,
  source: IconWithOptionsSource,
  componentProps: {
    'data-hook': 'storybook-iconwithoptions',
    options,
    inputProps: {},
    iconUrl: 'https://cdn3.iconfinder.com/data/icons/caps-hats/512/Ladies_cap-128.png'
  }
});
