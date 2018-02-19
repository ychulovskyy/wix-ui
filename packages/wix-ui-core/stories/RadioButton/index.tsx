import * as React from 'react';
import createStory from '../create-story';

import {RadioButton} from '../../src/baseComponents/RadioButton';
import * as RadioButtonSource from '!raw-loader!../../src/baseComponents/RadioButton/RadioButton.tsx';

export const story = () => createStory({
    category: 'Components',
    name: 'RadioButton',
    storyName: 'RadioButton',
    component: RadioButton,
    componentProps: {
      content: <span style={{fontSize: '20px'}}>Horsie</span>,
      icon: <span style={{fontSize: '20px', marginRight: '0.5em'}}>🦄</span>
    },
    source: RadioButtonSource
  });
