import * as React from 'react';
import createStory from '../create-story';

import {RadioButton} from '../../src/baseComponents/RadioButton';
import * as RadioButtonSource from '!raw-loader!../../src/baseComponents/RadioButton/RadioButton.tsx';

class StoryIcon extends React.Component<{checked: boolean}> {
  render() {
    const icon1 = <span style={{fontSize: '20px', opacity: 0.3}}>🔘</span>;
    const icon2 = <span style={{fontSize: '20px'}}>🔘</span>;
    return this.props.checked ? icon1 : icon2;
  }
}

export const story = () => createStory({
    category: 'Components',
    name: 'RadioButton',
    storyName: 'RadioButton',
    component: RadioButton,
    componentProps: (setState, getState) => ({
        label: <span style={{fontSize: '20px'}}>Radio Label</span>,
        icon: <StoryIcon checked={!!getState().checked} />,
        onChange: () => setState({checked: true})
    }),
    source: RadioButtonSource
  });
