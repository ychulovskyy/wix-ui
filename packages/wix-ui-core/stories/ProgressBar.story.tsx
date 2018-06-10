import * as React from 'react';
import {ProgressBar} from '../src/components/ProgressBar';
import { ProgressBarProps } from '../src/components/ProgressBar/ProgressBar';

const ProgressBarStory = (props: ProgressBarProps) => {
  return (<ProgressBar value={props.value} error={props.error}/>);
};

export default {
  category: 'Components',
  name: 'ProgressBar',
  storyName: 'ProgressBar',
  component: ProgressBarStory,
  componentPath: '../src/components/ProgressBar',

  componentProps: setState => ({
    'data-hook': 'storybook-progress-bar',
    value: 10,
    error: true
  }),
}