import * as React from 'react';
import createStory from '../create-story';

import {RadioButton} from '../../src/baseComponents/RadioButton';
import * as RadioButtonSource from '!raw-loader!../../src/baseComponents/RadioButton/RadioButton.tsx';

const content = <span>CONTENT</span>;
const icon = <span>ICON</span>;

export const story = () => createStory({
    category: 'Components',
    name: 'RadioButton',
    storyName: 'RadioButton',
    component: RadioButton,
    componentProps: {
      content,
      icon
    },
    source: RadioButtonSource
  });
