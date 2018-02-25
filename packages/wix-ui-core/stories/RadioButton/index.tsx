import * as React from 'react';
import createStory from '../create-story';

import {RadioButton} from '../../src/components/RadioButton';
import * as RadioButtonSource from '!raw-loader!../../src/components/RadioButton/RadioButton.tsx';

export const story = () => createStory({
    category: 'Components',
    name: 'RadioButton',
    storyName: 'RadioButton',
    component: RadioButton,
    componentProps: (setState, getState) => ({
        label: <span style={{fontSize: '20px'}}>Radio Label</span>,
        checkedIcon: <span style={{fontSize: '20px'}}>🔘</span>,
        uncheckedIcon: <span style={{fontSize: '20px'}}>⚪</span>,
        onChange: () => setState({checked: true}),
        'data-hook': 'radio-story'
    }),
    source: RadioButtonSource
  });
