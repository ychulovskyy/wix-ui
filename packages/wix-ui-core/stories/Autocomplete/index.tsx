import * as React from 'react';
import {storiesOf} from '@storybook/react';
import {Autocomplete} from '../../src/components/Autocomplete';
import * as AutocompleteSource from '!raw-loader!../../src/components/Autocomplete/Autocomplete.tsx';
import createStory from '../create-story';
import {OptionFactory, Option} from '../../src/baseComponents/DropdownOption';
import {Divider} from '../../src/components/Divider';
import {optionsExample} from '../../src/baseComponents/DropdownOption/OptionsExample';

export const story = () => createStory({
  category: 'Components',
  name: 'Autocomplete',
  storyName: 'Autocomplete',
  component: Autocomplete,
  source: AutocompleteSource,
  componentProps: {
    'data-hook': 'storybook-autocomplete',
    options: optionsExample
  },
  exampleProps: {
    fixedFooter: [null, <div>Fixed Footer</div>],
    fixedHeader: [null, <div>Fixed Header</div>],
    onSelect: (option: Option) => option.value,
    initialSelectedId: [null, 1],
    onManualInput: (value: string) => `Manual input: ${value}`
  }
});
