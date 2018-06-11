import * as React from 'react';
import {LinearProgressBar} from '../src/components/LinearProgressBar';
import { LinearProgressBarProps } from '../src/components/LinearProgressBar/LinearProgressBar';

export default {
  category: 'Components',
  name: 'LinearProgressBar',
  storyName: 'LinearProgressBar',
  component: LinearProgressBar,
  componentPath: '../src/components/LinearProgressBar',

  componentProps: setState => ({
    'data-hook': 'progress-bar',
    value: 10
  }),
}