import * as React from 'react';
import createStory from '../create-story';

import {RadioButton} from '../../src/baseComponents/RadioButton';
import * as RadioButtonSource from '!raw-loader!../../src/baseComponents/RadioButton/RadioButton.tsx';

export const story = () => createStory({
    category: 'Components',
    name: 'RadioButton',
    storyName: 'RadioButton',
    component: RadioButton,
    componentProps: (setState, getState) => ({
      content: <span style={{fontSize: '20px'}}>Horsie</span>,
      // icon: <span style={getState().checked ? {borderColor: 'red'} : null}>🦄</span>,
      icon: <span style={{fontSize: '20px'}}>🦄</span>,
      onChange: () => setState({checked: true}),
    }),
    source: RadioButtonSource
  });
